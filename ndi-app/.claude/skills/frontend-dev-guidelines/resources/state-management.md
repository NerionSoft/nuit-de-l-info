# State Management - React Patterns

## Hiérarchie des Solutions

| Niveau | Solution | Quand l'utiliser |
|--------|----------|------------------|
| 1 | `useState` | State local simple |
| 2 | `useReducer` | State local complexe |
| 3 | Context + useReducer | State partagé simple (theme, auth) |
| 4 | Zustand / Jotai | State global complexe |
| 5 | React Query | State serveur (cache, sync) |

## useState - State Local

```tsx
import { useState } from 'react';

function Counter() {
  // State simple
  const [count, setCount] = useState(0);

  // State avec initialisation lazy
  const [items, setItems] = useState<Item[]>(() => {
    // Exécuté une seule fois
    return expensiveComputation();
  });

  // Mise à jour basée sur la valeur précédente
  const increment = () => setCount(prev => prev + 1);

  // Mise à jour d'objet
  const [user, setUser] = useState({ name: '', email: '' });
  const updateName = (name: string) => {
    setUser(prev => ({ ...prev, name }));  // Toujours spread pour les objets
  };

  // Mise à jour de tableau
  const addItem = (item: Item) => {
    setItems(prev => [...prev, item]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

## useReducer - State Complexe

```tsx
import { useReducer } from 'react';

// Types
interface CartState {
  items: CartItem[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
  isLoading: false,
  error: null,
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      let newItems: CartItem[];
      if (existingIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };

    default:
      return state;
  }
}

// Usage
function Cart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  return (
    <div>
      {state.items.map(item => (
        <CartItemRow
          key={item.id}
          item={item}
          onRemove={() => removeItem(item.id)}
        />
      ))}
      <p>Total: ${state.total}</p>
    </div>
  );
}
```

## Context API

```tsx
import { createContext, useContext, useReducer, type ReactNode } from 'react';

// Types
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

// Context
const AuthContext = createContext<AuthContextValue | null>(null);

// Hook with type safety
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials: Credentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const user = await authApi.login(credentials);
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
      throw error;
    }
  };

  const logout = () => {
    authApi.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (data: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: data });
  };

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Usage
function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Contextes Multiples (Éviter les Re-renders)

```tsx
// Séparer les contextes par domaine
const UserContext = createContext<User | null>(null);
const ThemeContext = createContext<Theme>('light');
const NotificationContext = createContext<NotificationState>({ items: [] });

// Chaque contexte a son propre provider
function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

// Les composants ne re-render que si leur contexte spécifique change
function ThemeToggle() {
  const theme = useContext(ThemeContext);  // Ne re-render pas si User change
  return <button>{theme}</button>;
}
```

## Zustand - State Global Moderne

```tsx
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// Types
interface StoreState {
  // State
  user: User | null;
  cart: CartItem[];
  theme: 'light' | 'dark';

  // Actions
  setUser: (user: User | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleTheme: () => void;
}

// Store avec middleware
export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        cart: [],
        theme: 'light',

        // Actions
        setUser: (user) => set({ user }),

        addToCart: (item) =>
          set((state) => {
            const existing = state.cart.find((i) => i.id === item.id);
            if (existing) {
              return {
                cart: state.cart.map((i) =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
              };
            }
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }),

        removeFromCart: (id) =>
          set((state) => ({
            cart: state.cart.filter((item) => item.id !== id),
          })),

        clearCart: () => set({ cart: [] }),

        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === 'light' ? 'dark' : 'light',
          })),
      }),
      {
        name: 'app-storage',  // localStorage key
        partialize: (state) => ({ cart: state.cart, theme: state.theme }),
      }
    )
  )
);

// Sélecteurs granulaires - IMPORTANT pour la performance
export const useUser = () => useStore((state) => state.user);
export const useCart = () => useStore((state) => state.cart);
export const useCartCount = () => useStore((state) => state.cart.length);
export const useTheme = () => useStore((state) => state.theme);

// Usage
function Header() {
  const user = useUser();
  const cartCount = useCartCount();
  const toggleTheme = useStore((state) => state.toggleTheme);

  return (
    <header>
      <span>{user?.name}</span>
      <span>Cart: {cartCount}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
}
```

### Slices Pattern (Store Modulaire)

```tsx
import { create, type StateCreator } from 'zustand';

// User slice
interface UserSlice {
  user: User | null;
  setUser: (user: User | null) => void;
}

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});

// Cart slice
interface CartSlice {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
}

const createCartSlice: StateCreator<CartSlice> = (set) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  clearCart: () => set({ cart: [] }),
});

// Combined store
type StoreState = UserSlice & CartSlice;

export const useStore = create<StoreState>()((...args) => ({
  ...createUserSlice(...args),
  ...createCartSlice(...args),
}));
```

## Jotai - State Atomique

```tsx
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

// Atoms basiques
const countAtom = atom(0);
const userAtom = atom<User | null>(null);

// Atom dérivé (computed)
const doubleCountAtom = atom((get) => get(countAtom) * 2);

// Atom avec écriture personnalisée
const countWithMaxAtom = atom(
  (get) => get(countAtom),
  (get, set, newValue: number) => {
    const clamped = Math.min(newValue, 100);
    set(countAtom, clamped);
  }
);

// Atom async
const userDataAtom = atom(async (get) => {
  const userId = get(userIdAtom);
  if (!userId) return null;
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
});

// Usage
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const doubleCount = useAtomValue(doubleCountAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
}

// Optimisé - seulement lecture
function DisplayCount() {
  const count = useAtomValue(countAtom);
  return <span>{count}</span>;
}

// Optimisé - seulement écriture
function IncrementButton() {
  const setCount = useSetAtom(countAtom);
  return <button onClick={() => setCount((c) => c + 1)}>+</button>;
}
```

## Bonnes Pratiques

### DO

```tsx
// Colocate le state près de où il est utilisé
function SearchSection() {
  const [query, setQuery] = useState('');  // Local au composant
  return <SearchInput value={query} onChange={setQuery} />;
}

// Utiliser des sélecteurs granulaires
const userName = useStore((state) => state.user?.name);

// Séparer les contextes par domaine
<AuthProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</AuthProvider>
```

### DON'T

```tsx
// Éviter un seul store gigantesque
const useEverythingStore = create((set) => ({
  user: null,
  cart: [],
  products: [],
  orders: [],
  settings: {},
  ui: {},
  // 50 autres propriétés...
}));

// Éviter de sélectionner tout le state
const state = useStore();  // Re-render à chaque changement

// Éviter le prop drilling quand Context est approprié
<App user={user}>
  <Layout user={user}>
    <Sidebar user={user}>
      <UserMenu user={user} />
    </Sidebar>
  </Layout>
</App>
```

## Quand Utiliser Quoi

| Cas d'usage | Solution |
|-------------|----------|
| Toggle, compteur, input | `useState` |
| Formulaire complexe | `useReducer` |
| Theme, locale | Context |
| Auth state | Context ou Zustand |
| Panier e-commerce | Zustand avec persist |
| Données API | React Query |
| State temps réel | Zustand + WebSocket |
| State inter-composants proches | Lift state up |
| State global simple | Jotai |
