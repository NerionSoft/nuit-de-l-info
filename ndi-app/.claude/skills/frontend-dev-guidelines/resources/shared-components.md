# Shared Components - Architecture de Composants Réutilisables

## Philosophie

Les composants partagés doivent être:
- **Atomiques**: Une seule responsabilité
- **Configurables**: Props pour personnaliser le comportement
- **Accessibles**: ARIA et keyboard navigation
- **Documentés**: Props clairement typées
- **Testables**: Faciles à tester en isolation

## Structure de Dossier

```
src/
├── components/
│   ├── ui/                    # Composants de base (atoms)
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Badge/
│   │   ├── Avatar/
│   │   ├── Spinner/
│   │   ├── Skeleton/
│   │   └── index.ts           # Barrel export
│   │
│   ├── forms/                 # Composants de formulaire
│   │   ├── FormField/
│   │   ├── Select/
│   │   ├── Checkbox/
│   │   ├── RadioGroup/
│   │   └── index.ts
│   │
│   ├── feedback/              # Retour utilisateur
│   │   ├── Alert/
│   │   ├── Toast/
│   │   ├── Modal/
│   │   ├── Tooltip/
│   │   └── index.ts
│   │
│   ├── navigation/            # Navigation
│   │   ├── Navbar/
│   │   ├── Sidebar/
│   │   ├── Breadcrumb/
│   │   ├── Pagination/
│   │   └── index.ts
│   │
│   ├── data-display/          # Affichage de données
│   │   ├── Table/
│   │   ├── List/
│   │   ├── DataGrid/
│   │   └── index.ts
│   │
│   └── layouts/               # Layouts réutilisables
│       ├── Container/
│       ├── Stack/
│       ├── Grid/
│       └── index.ts
```

## Button Component

```tsx
// components/ui/Button/Button.tsx
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { Spinner } from '../Spinner';
import styles from './Button.module.css';

const buttonVariants = {
  variant: {
    default: styles.variantDefault,
    destructive: styles.variantDestructive,
    outline: styles.variantOutline,
    secondary: styles.variantSecondary,
    ghost: styles.variantGhost,
    link: styles.variantLink,
  },
  size: {
    default: styles.sizeDefault,
    sm: styles.sizeSm,
    lg: styles.sizeLg,
    icon: styles.sizeIcon,
  },
} as const;

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  isLoading?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      isLoading = false,
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          styles.button,
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Spinner
            className={styles.spinner}
            size={size === 'sm' ? 'sm' : 'default'}
          />
        )}
        <span className={cn(isLoading && styles.hiddenContent)}>
          {children}
        </span>
      </Comp>
    );
  }
);

Button.displayName = 'Button';

// components/ui/Button/index.ts
export { Button, type ButtonProps } from './Button';
```

```css
/* components/ui/Button/Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  outline: none;
}

.button:focus-visible {
  ring: 2px;
  ring-offset: 2px;
}

.button:disabled {
  pointer-events: none;
  opacity: 0.5;
}

/* Variants */
.variantDefault {
  background-color: var(--primary);
  color: var(--primary-foreground);
}
.variantDefault:hover {
  background-color: var(--primary-hover);
}

.variantDestructive {
  background-color: var(--destructive);
  color: var(--destructive-foreground);
}

.variantOutline {
  border: 1px solid var(--border);
  background-color: transparent;
}
.variantOutline:hover {
  background-color: var(--accent);
}

.variantSecondary {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.variantGhost:hover {
  background-color: var(--accent);
}

.variantLink {
  color: var(--primary);
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* Sizes */
.sizeDefault {
  height: 2.5rem;
  padding: 0.5rem 1rem;
}

.sizeSm {
  height: 2.25rem;
  padding: 0 0.75rem;
  border-radius: 0.25rem;
}

.sizeLg {
  height: 2.75rem;
  padding: 0 2rem;
  border-radius: 0.375rem;
}

.sizeIcon {
  height: 2.5rem;
  width: 2.5rem;
}

/* Loading state */
.spinner {
  position: absolute;
}

.hiddenContent {
  visibility: hidden;
}
```

## Input Component

```tsx
// components/ui/Input/Input.tsx
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';
import styles from './Input.module.css';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          styles.input,
          error && styles.error,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
```

## Card Component (Composable)

```tsx
// components/ui/Card/Card.tsx
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';
import styles from './Card.module.css';

// Card Root
export const Card = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.card, className)} {...props} />
  )
);
Card.displayName = 'Card';

// Card Header
export const CardHeader = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.header, className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

// Card Title
export const CardTitle = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'h3'>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn(styles.title, className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

// Card Description
export const CardDescription = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<'p'>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn(styles.description, className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

// Card Content
export const CardContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.content, className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

// Card Footer
export const CardFooter = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.footer, className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

// components/ui/Card/index.ts
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';
```

## Modal/Dialog Component

```tsx
// components/feedback/Modal/Modal.tsx
'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import styles from './Modal.module.css';

interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Modal components must be used within Modal');
  return context;
}

// Modal Root
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <div className={styles.overlay} onClick={onClose}>
        <div
          className={styles.container}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
}

// Modal Header
export function ModalHeader({ children, className }: { children: ReactNode; className?: string }) {
  const { onClose } = useModal();

  return (
    <div className={cn(styles.header, className)}>
      {children}
      <button
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Close modal"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// Modal Title
export function ModalTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn(styles.title, className)}>{children}</h2>;
}

// Modal Body
export function ModalBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(styles.body, className)}>{children}</div>;
}

// Modal Footer
export function ModalFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(styles.footer, className)}>{children}</div>;
}

// Usage Example:
// <Modal isOpen={isOpen} onClose={onClose}>
//   <ModalHeader>
//     <ModalTitle>Confirm Action</ModalTitle>
//   </ModalHeader>
//   <ModalBody>
//     <p>Are you sure you want to proceed?</p>
//   </ModalBody>
//   <ModalFooter>
//     <Button variant="outline" onClick={onClose}>Cancel</Button>
//     <Button onClick={handleConfirm}>Confirm</Button>
//   </ModalFooter>
// </Modal>
```

## Form Field Component

```tsx
// components/forms/FormField/FormField.tsx
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import styles from './FormField.module.css';

interface FormFieldProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, hint, required, className, id, ...props }, ref) => {
    const fieldId = id || `field-${label.toLowerCase().replace(/\s/g, '-')}`;

    return (
      <div className={cn(styles.field, className)}>
        <label htmlFor={fieldId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>

        <Input
          id={fieldId}
          ref={ref}
          error={!!error}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          aria-invalid={!!error}
          {...props}
        />

        {hint && !error && (
          <p id={`${fieldId}-hint`} className={styles.hint}>
            {hint}
          </p>
        )}

        {error && (
          <p id={`${fieldId}-error`} className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

// Usage:
// <FormField
//   label="Email"
//   type="email"
//   required
//   error={errors.email?.message}
//   hint="We'll never share your email"
//   {...register('email')}
// />
```

## Barrel Export Pattern

```tsx
// components/ui/index.ts
export { Button, type ButtonProps } from './Button';
export { Input, type InputProps } from './Input';
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';
export { Badge, type BadgeProps } from './Badge';
export { Avatar, type AvatarProps } from './Avatar';
export { Spinner, type SpinnerProps } from './Spinner';
export { Skeleton } from './Skeleton';

// Usage dans d'autres fichiers:
// import { Button, Card, CardHeader, CardTitle } from '@/components/ui';
```

## Utility: cn (classnames)

```tsx
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage:
// cn('base-class', condition && 'conditional-class', className)
// cn('px-4 py-2', variant === 'primary' && 'bg-blue-500')
```

## Conventions de Nommage

| Élément | Convention | Exemple |
|---------|------------|---------|
| Fichier composant | PascalCase | `Button.tsx` |
| Fichier styles | ComponentName.module.css | `Button.module.css` |
| Fichier test | ComponentName.test.tsx | `Button.test.tsx` |
| Export barrel | index.ts | `index.ts` |
| Props interface | ComponentNameProps | `ButtonProps` |
| CSS class | camelCase | `styles.variantPrimary` |
| CSS custom property | kebab-case | `--primary-color` |
