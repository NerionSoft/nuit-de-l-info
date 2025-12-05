# Performance - Optimisation React & Next.js

## Core Web Vitals

| Métrique | Description | Bon | À améliorer |
|----------|-------------|-----|-------------|
| **LCP** (Largest Contentful Paint) | Temps de chargement du plus grand élément | < 2.5s | > 4s |
| **FID** (First Input Delay) | Temps de réponse à la première interaction | < 100ms | > 300ms |
| **CLS** (Cumulative Layout Shift) | Stabilité visuelle | < 0.1 | > 0.25 |
| **INP** (Interaction to Next Paint) | Réactivité globale | < 200ms | > 500ms |

## Images - Optimisation Next.js

### Priorité et chargement

```tsx
import Image from 'next/image';

// LCP - Image above the fold avec priority
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority  // Précharge immédiatement
/>

// Images below the fold - lazy loading par défaut
<Image
  src="/product.jpg"
  alt="Product"
  width={400}
  height={300}
  // loading="lazy" est le défaut
/>

// Placeholder blur pour éviter CLS
<Image
  src={dynamicUrl}
  alt=""
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={base64Placeholder}
/>
```

### Sizes pour le responsive

```tsx
// TOUJOURS spécifier sizes pour les images responsive
<Image
  src="/hero.jpg"
  alt=""
  fill
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 75vw,
    50vw
  "
/>

// Erreur commune - pas de sizes
<Image src="/hero.jpg" alt="" fill />  // Charge l'image la plus grande
```

## Code Splitting & Lazy Loading

### Dynamic imports (Next.js)

```tsx
import dynamic from 'next/dynamic';

// Composant lourd chargé uniquement quand nécessaire
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <Skeleton className="h-96" />,
  ssr: false,  // Désactiver SSR si nécessaire
});

// Charger uniquement côté client
const MapComponent = dynamic(
  () => import('@/components/Map'),
  { ssr: false }
);

// Lazy load avec condition
const AdminPanel = dynamic(() => import('@/components/AdminPanel'));

function Dashboard({ isAdmin }) {
  return (
    <div>
      <MainContent />
      {isAdmin && <AdminPanel />}  {/* Chargé seulement si admin */}
    </div>
  );
}
```

### React.lazy et Suspense

```tsx
import { lazy, Suspense } from 'react';

// Lazy loading de composants
const HeavyComponent = lazy(() => import('./HeavyComponent'));
const AnotherHeavy = lazy(() => import('./AnotherHeavy'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
      <AnotherHeavy />
    </Suspense>
  );
}

// Granular Suspense boundaries
function Dashboard() {
  return (
    <div>
      <Header />  {/* Chargé immédiatement */}

      <Suspense fallback={<Skeleton />}>
        <HeavyChart />  {/* Chargé en lazy */}
      </Suspense>

      <Suspense fallback={<Skeleton />}>
        <DataTable />  {/* Chargé indépendamment */}
      </Suspense>
    </div>
  );
}
```

## Memoization

### React.memo

```tsx
import { memo } from 'react';

// Mémoriser le composant si les props sont stables
const ExpensiveList = memo(function ExpensiveList({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map(item => (
        <ExpensiveItem key={item.id} item={item} />
      ))}
    </ul>
  );
});

// Avec comparaison personnalisée
const UserCard = memo(
  function UserCard({ user }: { user: User }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => prevProps.user.id === nextProps.user.id
);
```

### useMemo

```tsx
import { useMemo } from 'react';

function ProductList({ products, filters }) {
  // Mémoriser les calculs coûteux
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.category === filters.category)
      .filter(p => p.price >= filters.minPrice)
      .filter(p => p.price <= filters.maxPrice)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products, filters.category, filters.minPrice, filters.maxPrice]);

  // Ne pas mémoriser des calculs simples
  // BAD - overhead inutile
  const hasProducts = useMemo(() => products.length > 0, [products]);

  // GOOD - calcul simple, pas besoin de memo
  const hasProducts = products.length > 0;

  return <List items={filteredProducts} />;
}
```

### useCallback

```tsx
import { useCallback, useState } from 'react';

function ParentComponent() {
  const [items, setItems] = useState<Item[]>([]);

  // Mémoriser les callbacks passés aux enfants
  const handleDelete = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleUpdate = useCallback((id: string, data: Partial<Item>) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...data } : item))
    );
  }, []);

  return (
    <ItemList
      items={items}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  );
}

// Ne pas mémoriser si le composant enfant n'est pas mémorisé
// ou si la fonction n'est pas passée comme prop
function SimpleComponent() {
  // BAD - mémorisation inutile
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  // GOOD - pas besoin de mémoriser
  const handleClick = () => {
    console.log('clicked');
  };

  return <button onClick={handleClick}>Click</button>;
}
```

## State Management Performance

### Éviter les re-renders inutiles

```tsx
// BAD - Tout re-render quand le state change
function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);

  return (
    <div>
      <Header user={user} />  {/* Re-render si notifications change */}
      <ThemeToggle theme={theme} />  {/* Re-render si user change */}
      <NotificationList notifications={notifications} />
    </div>
  );
}

// GOOD - Contextes séparés
const UserContext = createContext(null);
const ThemeContext = createContext(null);
const NotificationContext = createContext(null);

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <NotificationProvider>
          <Header />
          <ThemeToggle />
          <NotificationList />
        </NotificationProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
```

### Sélecteurs avec Zustand

```tsx
import { create } from 'zustand';

interface Store {
  user: User | null;
  products: Product[];
  cart: CartItem[];
  setUser: (user: User) => void;
  addToCart: (product: Product) => void;
}

const useStore = create<Store>((set) => ({
  user: null,
  products: [],
  cart: [],
  setUser: (user) => set({ user }),
  addToCart: (product) =>
    set((state) => ({ cart: [...state.cart, { product, quantity: 1 }] })),
}));

// GOOD - Sélecteurs granulaires
function UserBadge() {
  // Ne re-render que si user change
  const user = useStore((state) => state.user);
  return <div>{user?.name}</div>;
}

function CartCount() {
  // Ne re-render que si cart.length change
  const count = useStore((state) => state.cart.length);
  return <span>{count}</span>;
}

// BAD - Sélectionner tout le store
function Component() {
  const store = useStore();  // Re-render à chaque changement
}
```

## Data Fetching Performance

### Server Components (Next.js 13+)

```tsx
// app/products/page.tsx - Server Component
// Pas de JavaScript client pour ce composant
async function ProductsPage() {
  // Fetch côté serveur - pas de waterfall client
  const products = await fetchProducts();

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Parallel Data Fetching

```tsx
// BAD - Waterfall
async function Dashboard() {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);  // Attend user
  const comments = await fetchComments(posts[0].id);  // Attend posts
}

// GOOD - Parallel quand possible
async function Dashboard() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts(),
  ]);

  // Ou avec Promise.allSettled pour gérer les erreurs individuellement
  const results = await Promise.allSettled([
    fetchUser(),
    fetchPosts(),
    fetchAnalytics(),
  ]);
}
```

### React Query / TanStack Query

```tsx
import { useQuery, useQueries } from '@tanstack/react-query';

// Stale-while-revalidate
function ProductList() {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,  // 5 minutes
    gcTime: 30 * 60 * 1000,    // 30 minutes (anciennement cacheTime)
  });
}

// Prefetch pour navigation instantanée
import { useQueryClient } from '@tanstack/react-query';

function ProductCard({ product }) {
  const queryClient = useQueryClient();

  const prefetchProduct = () => {
    queryClient.prefetchQuery({
      queryKey: ['product', product.id],
      queryFn: () => fetchProduct(product.id),
    });
  };

  return (
    <Link
      href={`/products/${product.id}`}
      onMouseEnter={prefetchProduct}
      onFocus={prefetchProduct}
    >
      {product.name}
    </Link>
  );
}
```

## Bundle Optimization

### Analyser le bundle

```bash
# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // config
});

# Lancer l'analyse
ANALYZE=true npm run build
```

### Tree Shaking

```tsx
// BAD - Importe tout lodash (~70kb)
import _ from 'lodash';
_.debounce(fn, 300);

// GOOD - Importe seulement debounce (~2kb)
import debounce from 'lodash/debounce';
debounce(fn, 300);

// BEST - Alternative légère
import { debounce } from 'lodash-es';  // ES modules, tree-shakeable
```

### Import dynamique conditionnel

```tsx
// Charger une dépendance lourde uniquement si nécessaire
async function handleExport() {
  const { exportToExcel } = await import('@/lib/excel');
  exportToExcel(data);
}

// Charger polyfills conditionnellement
if (!window.IntersectionObserver) {
  await import('intersection-observer');
}
```

## Checklist Performance

### Build Time
- [ ] Analyse du bundle avec `@next/bundle-analyzer`
- [ ] Imports granulaires (pas de `import * from`)
- [ ] Tree shaking actif (ES modules)
- [ ] Images optimisées et dans le bon format

### Runtime
- [ ] `priority` sur les images LCP
- [ ] `sizes` sur toutes les images responsive
- [ ] Lazy loading des composants non-critiques
- [ ] Mémorisation (memo, useMemo, useCallback) où justifié
- [ ] Server Components par défaut
- [ ] Pas de re-renders inutiles

### Network
- [ ] Données pré-fetchées ou en cache
- [ ] Parallel data fetching
- [ ] Prefetch des routes probables
- [ ] Compression activée (gzip/brotli)

### Monitoring
- [ ] Core Web Vitals mesurés
- [ ] Performance budget défini
- [ ] Alertes sur régression
