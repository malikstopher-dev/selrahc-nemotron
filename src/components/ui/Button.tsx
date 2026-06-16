'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-light';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({ href, onClick, children, variant = 'primary', className = '', type = 'button', disabled }: ButtonProps) {
  const baseStyles = 'inline-block text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 font-medium';
  
  const variants = {
    primary: 'bg-arch-black text-white hover:bg-arch-dark',
    secondary: 'bg-arch-bronze text-white hover:bg-arch-bronze/90',
    outline: 'border border-arch-black text-arch-black hover:bg-arch-black hover:text-white',
    'outline-light': 'border border-white text-white hover:bg-white hover:text-arch-black',
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={styles}
    >
      {children}
    </motion.button>
  );
}
