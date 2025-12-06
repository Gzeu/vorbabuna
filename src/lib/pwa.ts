/**
 * PWA Utilities
 * Install prompt, notifications, offline detection
 */

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

/**
 * Initialize PWA features
 */
export function initPWA(): void {
  if (typeof window === 'undefined') return;

  // Register service worker
  registerServiceWorker();

  // Listen for install prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    console.log('[PWA] Install prompt ready');
  });

  // Listen for app installed
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App installed');
    deferredPrompt = null;
  });

  // Listen for online/offline
  window.addEventListener('online', () => {
    console.log('[PWA] Back online');
    showToast('Conexiune restabilită', 'success');
  });

  window.addEventListener('offline', () => {
    console.log('[PWA] Gone offline');
    showToast('Mod offline activat', 'warning');
  });
}

/**
 * Register service worker
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.log('[PWA] Service workers not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('[PWA] Service worker registered:', registration.scope);

    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New version available
          showUpdateNotification();
        }
      });
    });

    return registration;
  } catch (error) {
    console.error('[PWA] Service worker registration failed:', error);
    return null;
  }
}

/**
 * Show install prompt
 */
export async function showInstallPrompt(): Promise<boolean> {
  if (!deferredPrompt) {
    console.log('[PWA] Install prompt not available');
    return false;
  }

  try {
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log('[PWA] Install prompt outcome:', outcome);
    deferredPrompt = null;
    
    return outcome === 'accepted';
  } catch (error) {
    console.error('[PWA] Install prompt error:', error);
    return false;
  }
}

/**
 * Check if app can be installed
 */
export function canInstall(): boolean {
  return deferredPrompt !== null;
}

/**
 * Check if app is installed
 */
export function isInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for standalone mode
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  
  // Check for iOS standalone
  const isIOSStandalone = (window.navigator as any).standalone === true;
  
  return isStandalone || isIOSStandalone;
}

/**
 * Check if device is online
 */
export function isOnline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine;
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  
  if (Notification.permission === 'granted') return true;
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  return false;
}

/**
 * Subscribe to push notifications
 */
export async function subscribeToPush(): Promise<PushSubscription | null> {
  const registration = await navigator.serviceWorker.ready;
  
  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
      )
    });
    
    console.log('[PWA] Push subscription created');
    return subscription;
  } catch (error) {
    console.error('[PWA] Push subscription failed:', error);
    return null;
  }
}

/**
 * Show update notification
 */
function showUpdateNotification(): void {
  showToast(
    'Versiune nouă disponibilă! Apăsați pentru a actualiza.',
    'info',
    () => {
      navigator.serviceWorker.controller?.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  );
}

/**
 * Show toast notification (simplified)
 */
function showToast(
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'info',
  onClick?: () => void
): void {
  console.log(`[Toast ${type}]:`, message);
  
  // This would integrate with your toast/notification component
  if (onClick) {
    // Add click listener to toast
  }
}

/**
 * Convert VAPID key
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}

/**
 * Background sync for offline actions
 */
export async function syncWhenOnline(tag: string): Promise<void> {
  if (!('serviceWorker' in navigator) || !('SyncManager' in window)) {
    console.log('[PWA] Background sync not supported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await (registration as any).sync.register(tag);
    console.log('[PWA] Background sync registered:', tag);
  } catch (error) {
    console.error('[PWA] Background sync failed:', error);
  }
}
