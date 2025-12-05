# Styling Patterns - CSS Modules, Tailwind & Best Practices

## CSS Modules (Recommandé)

### Structure de base

```tsx
// components/Button/Button.tsx
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
}: ButtonProps) {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        className
      )}
    >
      {children}
    </button>
  );
}
```

```css
/* components/Button/Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variants */
.primary {
  background-color: var(--color-primary);
  color: white;
}

.primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.secondary {
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.secondary:hover:not(:disabled) {
  background-color: var(--color-gray-100);
}

/* Sizes */
.sm {
  height: 2rem;
  padding: 0 0.75rem;
  font-size: 0.875rem;
}

.md {
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 1rem;
}

.lg {
  height: 3rem;
  padding: 0 1.5rem;
  font-size: 1.125rem;
}
```

### Variables CSS globales

```css
/* styles/globals.css */
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --color-secondary: #6b7280;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* Neutral */
  --color-white: #ffffff;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  /* Semantic */
  --color-text: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-border: var(--color-gray-200);
  --color-background: var(--color-white);
  --color-background-secondary: var(--color-gray-50);

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* Focus ring */
  --focus-ring: var(--color-primary);

  /* Z-index */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 300;
  --z-popover: 400;
  --z-tooltip: 500;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: var(--color-gray-100);
    --color-text-secondary: var(--color-gray-400);
    --color-border: var(--color-gray-700);
    --color-background: var(--color-gray-900);
    --color-background-secondary: var(--color-gray-800);
  }
}

/* Ou avec une classe */
.dark {
  --color-text: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-400);
  --color-border: var(--color-gray-700);
  --color-background: var(--color-gray-900);
  --color-background-secondary: var(--color-gray-800);
}
```

### Composition avec composes

```css
/* styles/shared.module.css */
.flexCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* components/Card/Card.module.css */
.card {
  composes: flexCenter from '../../styles/shared.module.css';
  /* ... autres styles */
}
```

## Tailwind CSS

### Configuration Next.js

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### Patterns Tailwind

```tsx
// Bon - Extraction de classes avec cn()
const buttonVariants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  ghost: 'bg-transparent hover:bg-gray-100',
};

const buttonSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
};

function Button({ variant = 'primary', size = 'md', className, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors duration-200',
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    />
  );
}

// Éviter - Classes inline trop longues
<button className="inline-flex items-center justify-center rounded-md font-medium bg-primary-500 text-white hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 h-10 px-4 text-base">
  Click me
</button>
```

### clsx + tailwind-merge

```tsx
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage - twMerge résout les conflits
cn('px-4 py-2', 'px-6');  // Résultat: 'py-2 px-6' (px-6 gagne)
cn('text-red-500', condition && 'text-blue-500');  // Conditionnel
cn('base', { 'active': isActive, 'disabled': isDisabled });  // Objet
```

## Responsive Design

### Mobile-first avec CSS Modules

```css
/* Base = mobile */
.container {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: var(--space-6);
    flex-direction: row;
    gap: var(--space-6);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: var(--space-8);
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### Mobile-first avec Tailwind

```tsx
// Mobile-first: pas de préfixe = mobile
// sm: = 640px+, md: = 768px+, lg: = 1024px+, xl: = 1280px+
<div className="
  p-4 flex flex-col gap-4
  md:p-6 md:flex-row md:gap-6
  lg:p-8 lg:max-w-5xl lg:mx-auto
">
  <aside className="w-full md:w-64 lg:w-72">
    Sidebar
  </aside>
  <main className="flex-1">
    Content
  </main>
</div>
```

## Animations

### CSS Keyframes

```css
/* styles/animations.css */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Usage */
.fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.slideUp {
  animation: slideUp 0.3s ease-out;
}

.spin {
  animation: spin 1s linear infinite;
}
```

### Transitions

```css
/* Transitions réutilisables */
.transition-colors {
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.transition-transform {
  transition: transform 0.2s ease;
}

.transition-opacity {
  transition: opacity 0.2s ease;
}

.transition-all {
  transition: all 0.2s ease;
}

/* Hover effects */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.hover-scale:hover {
  transform: scale(1.02);
}
```

### Respecter prefers-reduced-motion

```css
/* Désactiver les animations pour les utilisateurs qui le préfèrent */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Best Practices

### DO

```tsx
// Utiliser des variables CSS pour les valeurs répétées
.card {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

// Utiliser des noms de classes sémantiques
.userCard { }
.productGrid { }
.navigationMenu { }

// Grouper les styles liés
.button {
  /* Box model */
  display: inline-flex;
  padding: var(--space-2) var(--space-4);

  /* Typography */
  font-size: 1rem;
  font-weight: 500;

  /* Visual */
  background-color: var(--color-primary);
  border-radius: var(--radius-md);

  /* Interaction */
  cursor: pointer;
  transition: background-color 0.2s ease;
}
```

### DON'T

```css
/* Éviter les valeurs magiques */
.bad {
  padding: 17px;  /* Pourquoi 17? */
  margin-left: 23px;  /* Incohérent */
}

/* Éviter les sélecteurs trop spécifiques */
div.container > ul.list > li.item > a.link { }

/* Éviter !important sauf cas extrême */
.bad {
  color: red !important;
}

/* Éviter les styles inline */
<div style={{ marginTop: '20px', backgroundColor: '#f00' }}>
```

### Accessibilité

```css
/* Focus visible pour keyboard navigation */
:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

/* Ne pas supprimer outline sans alternative */
/* MAL */
button:focus {
  outline: none;
}

/* BIEN */
button:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

/* Contraste suffisant */
.text {
  color: var(--color-gray-700);  /* Au moins 4.5:1 sur fond blanc */
}

/* Taille de cible tactile minimum */
.touchTarget {
  min-width: 44px;
  min-height: 44px;
}
```
