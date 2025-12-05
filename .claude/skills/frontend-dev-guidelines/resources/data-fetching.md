# Data Fetching - Server Components & Client Patterns

## Next.js App Router - Server Components

### Fetch dans Server Components

```tsx
// app/products/page.tsx - Server Component par défaut
async function ProductsPage() {
  // Fetch directement dans le composant - pas de useEffect
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 },  // Revalidate every hour
  });
  const products = await res.json();

  return (
    <div>
      <h1>Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}

export default ProductsPage;
```

### Caching et Revalidation

```tsx
// Static Data - Cached indéfiniment (défaut)
const data = await fetch('https://api.example.com/static');

// Revalidate après un temps donné (ISR)
const data = await fetch('https://api.example.com/products', {
  next: { revalidate: 60 },  // Revalidate every 60 seconds
});

// Pas de cache - toujours frais
const data = await fetch('https://api.example.com/realtime', {
  cache: 'no-store',
});

// Revalidate par tag
const data = await fetch('https://api.example.com/products', {
  next: { tags: ['products'] },
});

// Server Action pour revalidation
'use server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function updateProduct(id: string, data: ProductData) {
  await db.products.update({ where: { id }, data });
  revalidateTag('products');
  // ou revalidatePath('/products');
}
```

### Parallel Data Fetching

```tsx
// app/dashboard/page.tsx
async function DashboardPage() {
  // Lancer les fetches en parallèle
  const [user, stats, notifications] = await Promise.all([
    fetchUser(),
    fetchStats(),
    fetchNotifications(),
  ]);

  return (
    <div>
      <UserProfile user={user} />
      <StatsOverview stats={stats} />
      <NotificationList notifications={notifications} />
    </div>
  );
}

// Fonctions de fetch séparées
async function fetchUser() {
  const res = await fetch('https://api.example.com/user', {
    next: { revalidate: 300 },
  });
  return res.json();
}

async function fetchStats() {
  const res = await fetch('https://api.example.com/stats', {
    cache: 'no-store',  // Données temps réel
  });
  return res.json();
}
```

### Streaming avec Suspense

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react';

async function DashboardPage() {
  // Données critiques chargées immédiatement
  const user = await fetchUser();

  return (
    <div>
      <UserHeader user={user} />

      {/* Streamed - Chargé progressivement */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  );
}

// Composant avec son propre fetch
async function StatsSection() {
  const stats = await fetchStats();  // Streamed après le shell
  return <StatsDisplay stats={stats} />;
}
```

## Client-Side Data Fetching

### TanStack Query (React Query)

```tsx
// providers/QueryProvider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, type ReactNode } from 'react';

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,  // 1 minute
            gcTime: 5 * 60 * 1000,  // 5 minutes
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

```tsx
// hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query hook
export function useProducts(categoryId?: string) {
  return useQuery({
    queryKey: ['products', { categoryId }],
    queryFn: () => fetchProducts(categoryId),
    staleTime: 5 * 60 * 1000,
  });
}

// Single item query
export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,  // Ne pas fetch si pas d'id
  });
}

// Mutation hook
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductData) => createProduct(data),
    onSuccess: () => {
      // Invalider le cache pour refetch
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Failed to create product:', error);
    },
  });
}

// Optimistic update
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      updateProduct(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['product', id] });

      const previousProduct = queryClient.getQueryData(['product', id]);

      queryClient.setQueryData(['product', id], (old: Product) => ({
        ...old,
        ...data,
      }));

      return { previousProduct };
    },
    onError: (err, variables, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(['product', variables.id], context.previousProduct);
      }
    },
    onSettled: (data, error, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['product', id] });
    },
  });
}
```

### useSuspenseQuery (React Query + Suspense)

```tsx
'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

// Composant avec Suspense intégré
function ProductList() {
  // Suspend automatiquement jusqu'à ce que les données soient prêtes
  const { data: products } = useSuspenseQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

// Parent avec Suspense boundary
function ProductsPage() {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList />
    </Suspense>
  );
}
```

## SWR Alternative

```tsx
'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Profile() {
  const { data, error, isLoading, mutate } = useSWR('/api/user', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 30000,  // Refresh every 30s
  });

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  );
}
```

## Server Actions (Next.js 14+)

```tsx
// app/actions/products.ts
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const ProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  description: z.string().optional(),
});

export async function createProduct(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    price: Number(formData.get('price')),
    description: formData.get('description'),
  };

  const validatedData = ProductSchema.parse(rawData);

  await db.products.create({ data: validatedData });

  revalidatePath('/products');
}

export async function deleteProduct(id: string) {
  await db.products.delete({ where: { id } });
  revalidatePath('/products');
}
```

```tsx
// app/products/new/page.tsx
import { createProduct } from '@/app/actions/products';

function NewProductPage() {
  return (
    <form action={createProduct}>
      <input name="name" required />
      <input name="price" type="number" required />
      <textarea name="description" />
      <button type="submit">Create Product</button>
    </form>
  );
}
```

### useFormState et useFormStatus

```tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createProduct } from '@/app/actions/products';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create Product'}
    </button>
  );
}

function ProductForm() {
  const [state, formAction] = useFormState(createProduct, { error: null });

  return (
    <form action={formAction}>
      {state.error && <p className="error">{state.error}</p>}
      <input name="name" required />
      <input name="price" type="number" required />
      <SubmitButton />
    </form>
  );
}
```

## Patterns à Éviter

### DON'T: useEffect pour le data fetching initial

```tsx
// BAD - Dans Next.js App Router
'use client';
function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  return <ProductList products={products} />;
}

// GOOD - Server Component
async function Products() {
  const products = await fetchProducts();
  return <ProductList products={products} />;
}

// GOOD - Si client nécessaire, utiliser React Query
'use client';
function Products() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Spinner />;
  return <ProductList products={products} />;
}
```

### DON'T: Prop drilling de données serveur

```tsx
// BAD - Fetch dans le parent, passer en props partout
async function Page() {
  const user = await fetchUser();
  const products = await fetchProducts();

  return (
    <Layout user={user}>
      <Sidebar user={user} />
      <Main products={products} user={user} />
    </Layout>
  );
}

// GOOD - Chaque composant fetch ce dont il a besoin
async function Page() {
  return (
    <Layout>
      <Sidebar />
      <Main />
    </Layout>
  );
}

async function Sidebar() {
  const user = await fetchUser();  // Dédupliqué par Next.js
  return <UserNav user={user} />;
}

async function Main() {
  const [user, products] = await Promise.all([
    fetchUser(),  // Même requête, réponse cachée
    fetchProducts(),
  ]);
  return <ProductList products={products} user={user} />;
}
```
