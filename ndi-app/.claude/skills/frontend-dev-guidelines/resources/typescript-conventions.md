# TypeScript Conventions - React & Next.js

## Types vs Interfaces

```tsx
// PRÉFÉRER interface pour les props de composants et objets extensibles
interface UserProps {
  name: string;
  email: string;
}

// Utiliser type pour les unions, intersections, et types utilitaires
type Status = 'idle' | 'loading' | 'success' | 'error';
type ButtonVariant = 'primary' | 'secondary' | 'ghost';

// Type pour les fonctions
type OnChange = (value: string) => void;
type AsyncAction<T> = () => Promise<T>;

// Type pour les tuples
type Coordinates = [number, number];
type UseStateReturn<T> = [T, React.Dispatch<React.SetStateAction<T>>];
```

## Typage des Props

### Props de base

```tsx
// Toujours exporter l'interface
export interface ButtonProps {
  // Props requises
  children: React.ReactNode;

  // Props optionnelles avec valeurs par défaut
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';

  // Callbacks
  onClick?: () => void;
  onHover?: (isHovered: boolean) => void;

  // Boolean - préfixer avec "is", "has", "should", "can"
  isLoading?: boolean;
  isDisabled?: boolean;
  hasIcon?: boolean;

  // Classes CSS additionnelles
  className?: string;
}

// Utiliser les props
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  isLoading = false,
  className,
}: ButtonProps) {
  // ...
}
```

### Étendre les props HTML natives

```tsx
import { type ComponentPropsWithoutRef, type ComponentPropsWithRef } from 'react';

// Sans ref
interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string;
}

// Avec ref (pour forwardRef)
interface InputProps extends ComponentPropsWithRef<'input'> {
  label: string;
  error?: string;
}

// Omettre certaines props natives
interface CustomInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'onChange'> {
  size: 'sm' | 'md' | 'lg';  // Redéfinir size
  onValueChange: (value: string) => void;  // Custom onChange
}
```

### Props avec children typés

```tsx
// Children générique
interface ContainerProps {
  children: React.ReactNode;
}

// Children spécifique (un seul élément)
interface SingleChildProps {
  children: React.ReactElement;
}

// Children fonction (render props)
interface DataLoaderProps<T> {
  children: (data: T) => React.ReactNode;
}

// Children optionnel
interface OptionalChildrenProps {
  children?: React.ReactNode;
}
```

## Typage des Hooks

### useState

```tsx
// Type inféré (préféré quand possible)
const [count, setCount] = useState(0);  // number

// Type explicite nécessaire pour null/undefined initial
const [user, setUser] = useState<User | null>(null);

// Type explicite pour arrays vides
const [items, setItems] = useState<Item[]>([]);

// Type explicite pour objets complexes
interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
}
const [form, setForm] = useState<FormState>({
  email: '',
  password: '',
  rememberMe: false,
});
```

### useRef

```tsx
// Ref mutable (vous contrôlez la valeur)
const intervalRef = useRef<number | null>(null);
intervalRef.current = window.setInterval(() => {}, 1000);

// Ref DOM (React contrôle la valeur)
const inputRef = useRef<HTMLInputElement>(null);

// Dans le composant
<input ref={inputRef} />

// Accès
inputRef.current?.focus();
```

### useCallback et useMemo

```tsx
// useCallback - typer les paramètres
const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
}, []);

const handleSubmit = useCallback(async (data: FormData): Promise<void> => {
  await submitForm(data);
}, []);

// useMemo - type inféré du retour
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);  // Type: Item[]

// useMemo - type explicite si nécessaire
const config = useMemo<Config>(() => ({
  theme: 'dark',
  locale: 'fr',
}), []);
```

### Custom Hooks

```tsx
// Typer le retour explicitement
interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

function useCounter(initialValue = 0): UseCounterReturn {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}

// Hook générique
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  // Retourne tuple typé
  return [value, setValue] as const;
}

// Usage
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
```

## Typage des Events

```tsx
// Events DOM
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {};
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};
const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {};
const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {};
const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {};

// Event handlers typés dans les props
interface FormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

// Custom events
interface CustomEventData {
  itemId: string;
  action: 'edit' | 'delete';
}

interface ItemProps {
  onAction: (data: CustomEventData) => void;
}
```

## Typage Context

```tsx
// Définir le type du contexte
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

// Créer avec null par défaut
const AuthContext = createContext<AuthContextValue | null>(null);

// Hook avec vérification
function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    login: async (credentials) => {
      const user = await authApi.login(credentials);
      setUser(user);
    },
    logout: () => setUser(null),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
```

## Types Utilitaires

```tsx
// Partial - toutes les props optionnelles
type PartialUser = Partial<User>;

// Required - toutes les props requises
type RequiredUser = Required<User>;

// Pick - sélectionner certaines props
type UserPreview = Pick<User, 'id' | 'name' | 'avatar'>;

// Omit - exclure certaines props
type PublicUser = Omit<User, 'password' | 'email'>;

// Record - objet avec clés typées
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;

// Extract/Exclude - filtrer des unions
type Status = 'idle' | 'loading' | 'success' | 'error';
type ActiveStatus = Exclude<Status, 'idle'>;  // 'loading' | 'success' | 'error'
type IdleOrLoading = Extract<Status, 'idle' | 'loading'>;  // 'idle' | 'loading'

// ReturnType - extraire le type de retour
type ApiResponse = ReturnType<typeof fetchUser>;

// Parameters - extraire les types des paramètres
type FetchParams = Parameters<typeof fetchUser>;

// NonNullable - exclure null et undefined
type DefiniteUser = NonNullable<User | null | undefined>;
```

## Génériques dans les Composants

```tsx
// Composant générique
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

// Usage avec inférence
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>

// Select générique
interface SelectProps<T> {
  options: T[];
  value: T | null;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
  getValue: (option: T) => string | number;
}

function Select<T>({ options, value, onChange, getLabel, getValue }: SelectProps<T>) {
  return (
    <select
      value={value ? String(getValue(value)) : ''}
      onChange={(e) => {
        const selected = options.find(o => String(getValue(o)) === e.target.value);
        if (selected) onChange(selected);
      }}
    >
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={getValue(option)} value={getValue(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
}
```

## Assertions et Guards

```tsx
// Type guard
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  );
}

// Usage
if (isUser(data)) {
  console.log(data.name);  // TypeScript sait que data est User
}

// Assertion function
function assertUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new Error('Expected User');
  }
}

// Non-null assertion (éviter si possible)
const element = document.getElementById('app')!;  // Affirme non-null

// Préférer optional chaining
const element = document.getElementById('app');
element?.focus();

// Type assertion (utiliser avec précaution)
const response = await fetch('/api/user');
const user = await response.json() as User;
```

## Conventions de Nommage

| Type | Convention | Exemple |
|------|------------|---------|
| Interface | PascalCase | `UserProfile` |
| Type alias | PascalCase | `ButtonVariant` |
| Generic | T, U, K, V ou descriptif | `T`, `TData`, `TError` |
| Props | ComponentNameProps | `ButtonProps` |
| Context value | ComponentNameContextValue | `AuthContextValue` |
| Hook return | UseHookNameReturn | `UseCounterReturn` |
