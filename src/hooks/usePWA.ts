/**
 * React hook for PWA features
 * Install prompt, offline detection, notifications
 */

import { useState, useEffect } from 'react';
import {
  initPWA,
  showInstallPrompt,
  canInstall,
  isInstalled,
  isOnline as checkOnline,
  requestNotificationPermission,
  subscribeToPush
} from '@/lib/pwa';

export function usePWA() {
  const [isOnline, setIsOnline] = useState(true);
  const [canBeInstalled, setCanBeInstalled] = useState(false);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Initialize PWA
    initPWA();

    // Check initial states
    setIsOnline(checkOnline());
    setIsPWAInstalled(isInstalled());
    setNotificationPermission(
      typeof Notification !== 'undefined' ? Notification.permission : 'default'
    );

    // Listen for install prompt
    const checkInstall = () => {
      setCanBeInstalled(canInstall());
    };

    window.addEventListener('beforeinstallprompt', checkInstall);
    window.addEventListener('appinstalled', () => {
      setCanBeInstalled(false);
      setIsPWAInstalled(true);
    });

    // Listen for online/offline
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', checkInstall);
      window.removeEventListener('appinstalled', checkInstall);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const install = async () => {
    const success = await showInstallPrompt();
    if (success) {
      setCanBeInstalled(false);
      setIsPWAInstalled(true);
    }
    return success;
  };

  const enableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationPermission(granted ? 'granted' : 'denied');
    
    if (granted) {
      await subscribeToPush();
    }
    
    return granted;
  };

  return {
    isOnline,
    canBeInstalled,
    isPWAInstalled,
    notificationPermission,
    install,
    enableNotifications,
    isNotificationGranted: notificationPermission === 'granted'
  };
}
