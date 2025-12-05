# Component Patterns - React Best Practices

## Component Structure

### Ordre des éléments dans un composant

```tsx
// 1. Imports
import { useState, useCallback, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  variant?: 'default' | 'outlined';
}

// 3. Constants (si nécessaire)
const VARIANTS = {
  default: 'bg-primary text-white',
  outlined: 'border border-primary text-primary',
} as const;

// 4. Component
export function MyComponent({ title, variant = 'default' }: MyComponentProps) {
  // 4a. Hooks (useState, useRef, useContext, custom hooks)
  const [isOpen, setIsOpen] = useState(false);

  // 4b. Derived state / Memos
  const variantClass = VARIANTS[variant];

  // 4c. Callbacks
  const handleClick = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // 4d. Effects (éviter si possible)

  // 4e. Early returns
  if (!title) return null;

  // 4f. Render
  return (
    <div className={cn('p-4', variantClass)}>
      <h2>{title}</h2>
      <button onClick={handleClick}>Toggle</button>
      {isOpen && <div>Content</div>}
    </div>
  );
}
```

## Patterns Fondamentaux

### 1. Composition Pattern

```tsx
// Préférer la composition aux props excessives
// components/Card/index.ts
export { Card } from './Card';
export { CardHeader } from './CardHeader';
export { CardTitle } from './CardTitle';
export { CardContent } from './CardContent';
export { CardFooter } from './CardFooter';

// Card.tsx
interface CardProps extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('rounded-lg border bg-card', className)} {...props}>
      {children}
    </div>
  );
}

// Usage
<Card>
  <CardHeader>
    <CardTitle>Welcome</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content here</p>
  </CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

### 2. Polymorphic Component Pattern

```tsx
import { type ElementType, type ComponentPropsWithoutRef } from 'react';

type PolymorphicProps<E extends ElementType> = {
  as?: E;
} & ComponentPropsWithoutRef<E>;

export function Text<E extends ElementType = 'p'>({
  as,
  className,
  children,
  ...props
}: PolymorphicProps<E>) {
  const Component = as || 'p';
  return (
    <Component className={cn('text-base', className)} {...props}>
      {children}
    </Component>
  );
}

// Usage
<Text>Paragraph</Text>
<Text as="span">Inline text</Text>
<Text as="h1" className="text-2xl font-bold">Heading</Text>
<Text as="label" htmlFor="input">Label</Text>
```

### 3. Render Props Pattern

```tsx
interface DataLoaderProps<T> {
  loader: () => Promise<T>;
  children: (data: T) => React.ReactNode;
  fallback?: React.ReactNode;
}

function DataLoader<T>({ loader, children, fallback }: DataLoaderProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loader().then(setData).finally(() => setLoading(false));
  }, [loader]);

  if (loading) return fallback ?? <Spinner />;
  if (!data) return null;

  return <>{children(data)}</>;
}

// Usage
<DataLoader loader={fetchUsers}>
  {(users) => (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )}
</DataLoader>
```

### 4. Compound Components Pattern

```tsx
// Tabs avec contexte partagé
import { createContext, useContext, useState } from 'react';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error('useTabs must be used within Tabs');
  return context;
}

// Parent
export function Tabs({ defaultTab, children }: { defaultTab: string; children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// Sub-components
Tabs.List = function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="tabs-list flex gap-2" role="tablist">{children}</div>;
};

Tabs.Tab = function Tab({ value, children }: { value: string; children: React.ReactNode }) {
  const { activeTab, setActiveTab } = useTabs();
  return (
    <button
      role="tab"
      aria-selected={activeTab === value}
      className={cn('tab', activeTab === value && 'tab-active')}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function TabsPanel({ value, children }: { value: string; children: React.ReactNode }) {
  const { activeTab } = useTabs();
  if (activeTab !== value) return null;
  return <div role="tabpanel">{children}</div>;
};

// Usage
<Tabs defaultTab="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="settings">Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">Overview content</Tabs.Panel>
  <Tabs.Panel value="settings">Settings content</Tabs.Panel>
</Tabs>
```

### 5. Controlled vs Uncontrolled Pattern

```tsx
interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'defaultValue'> {
  // Controlled
  value?: string;
  onValueChange?: (value: string) => void;
  // Uncontrolled
  defaultValue?: string;
}

export function Input({ value, onValueChange, defaultValue, onChange, ...props }: InputProps) {
  // Détermine si contrôlé
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onValueChange?.(newValue);
    onChange?.(e);
  };

  return (
    <input
      value={isControlled ? value : internalValue}
      onChange={handleChange}
      {...props}
    />
  );
}

// Usage contrôlé
const [email, setEmail] = useState('');
<Input value={email} onValueChange={setEmail} />

// Usage non contrôlé
<Input defaultValue="" name="email" />
```

## Hooks Patterns

### Custom Hook pour API

```tsx
// hooks/useApi.ts
import { useState, useCallback } from 'react';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useApi<T, Args extends unknown[]>(
  apiFunction: (...args: Args) => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(async (...args: Args) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiFunction(...args);
      setData(result);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [apiFunction, options.onSuccess, options.onError]);

  return { data, error, isLoading, execute };
}

// Usage
const { data: user, isLoading, execute: fetchUser } = useApi(getUserById);
```

### Custom Hook pour localStorage

```tsx
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('useLocalStorage error:', error);
    }
  };

  return [storedValue, setValue] as const;
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

## Error Boundaries

```tsx
// components/ErrorBoundary.tsx
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="p-4 bg-red-50 text-red-600 rounded">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary fallback={<ErrorFallback />} onError={logToSentry}>
  <MyComponent />
</ErrorBoundary>
```
