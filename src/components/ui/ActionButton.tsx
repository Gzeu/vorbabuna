'use client';
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { forwardRef } from 'react';

interface ActionButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  icon: LucideIcon;
  label: string;
  variant?: 'default' | 'love' | 'audio' | 'share';
  isActive?: boolean;
  iconFill?: boolean;
}

const variantStyles = {
  default: {
    base: 'bg-white/90 backdrop-blur-sm hover:bg-folk-blue hover:text-white',
    active: 'bg-folk-blue text-white',
  },
  love: {
    base: 'bg-white/90 backdrop-blur-sm hover:bg-folk-red hover:text-white',
    active: 'bg-folk-red text-white',
  },
  audio: {
    base: 'bg-white/90 backdrop-blur-sm hover:bg-folk-blue hover:text-white',
    active: 'bg-folk-blue text-white',
  },
  share: {
    base: 'bg-white/90 backdrop-blur-sm hover:bg-folk-yellow hover:text-folk-brown',
    active: 'bg-folk-yellow text-folk-brown',
  },
};

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ icon: Icon, label, variant = 'default', isActive = false, iconFill = false, ...props }, ref) => {
    const styles = variantStyles[variant];

    return (
      <motion.button
        ref={ref}
        className={`p-3 rounded-full transition-all duration-300 shadow-lg ${
          isActive ? styles.active : styles.base
        }`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -5 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
        }}
        aria-label={label}
        {...props}
      >
        <motion.div
          animate={isActive ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Icon size={20} fill={iconFill && isActive ? 'currentColor' : 'none'} />
        </motion.div>
      </motion.button>
    );
  }
);

ActionButton.displayName = 'ActionButton';

export default ActionButton;
