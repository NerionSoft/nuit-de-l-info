# Next.js Components - Link, Image, Head, Script

## next/link

### Usage de base (Next.js 13+)

```tsx
import Link from 'next/link';

// Simple link - le composant Link génère maintenant automatiquement un <a>
<Link href="/about">About Us</Link>

// Avec className
<Link href="/about" className="text-blue-600 hover:underline">
  About Us
</Link>

// Avec styles inline (éviter)
<Link href="/about" style={{ color: 'blue' }}>
  About Us
</Link>
```

### Routes dynamiques

```tsx
// Route avec paramètre
<Link href={`/products/${product.id}`}>
  {product.name}
</Link>

// Avec query parameters
<Link
  href={{
    pathname: '/search',
    query: { q: searchTerm, category: 'electronics' },
  }}
>
  Search Results
</Link>

// Équivalent à /search?q=phone&category=electronics
```

### Prefetching

```tsx
// Prefetch activé par défaut pour les liens dans le viewport
<Link href="/dashboard">Dashboard</Link>

// Désactiver le prefetch (pour les liens rarement cliqués)
<Link href="/admin" prefetch={false}>
  Admin Panel
</Link>
```

### Navigation programmatique

```tsx
'use client';

import { useRouter } from 'next/navigation';

function NavigationButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.push('/dashboard')}>
      Go to Dashboard
    </button>
  );
}

// Autres méthodes du router
router.push('/path');        // Navigation avec historique
router.replace('/path');     // Remplace l'entrée actuelle
router.back();               // Retour en arrière
router.forward();            // Avancer
router.refresh();            // Rafraîchir la page (revalidate)
router.prefetch('/path');    // Prefetch manuel
```

### Link avec composant enfant personnalisé

```tsx
// Si vous avez besoin d'un composant enfant (rare depuis Next.js 13)
import Link from 'next/link';

// Utiliser legacyBehavior si nécessaire (migration)
<Link href="/about" legacyBehavior>
  <a className="custom-link">About</a>
</Link>

// PRÉFÉRÉ - Style directement sur Link
<Link href="/about" className="custom-link">
  About
</Link>
```

### Scroll behavior

```tsx
// Désactiver le scroll to top automatique
<Link href="/about" scroll={false}>
  About
</Link>

// Navigation vers un anchor
<Link href="/about#team">
  Meet the Team
</Link>
```

## next/image

### Props essentielles

| Prop | Type | Description |
|------|------|-------------|
| `src` | string | URL de l'image (requise) |
| `alt` | string | Texte alternatif (requis) |
| `width` | number | Largeur intrinsèque en pixels |
| `height` | number | Hauteur intrinsèque en pixels |
| `fill` | boolean | Remplit le conteneur parent |
| `priority` | boolean | Précharge l'image (LCP) |
| `sizes` | string | Configuration responsive |
| `quality` | number | Qualité 1-100 (défaut: 75) |
| `placeholder` | "blur" \| "empty" | Placeholder pendant le chargement |
| `loading` | "lazy" \| "eager" | Stratégie de chargement |

### Image avec dimensions fixes

```tsx
import Image from 'next/image';

// Image locale (importée)
import heroImage from '@/public/hero.jpg';

<Image
  src={heroImage}
  alt="Hero banner"
  // width et height sont automatiquement définis pour les imports
  priority // Image above the fold
/>

// Image locale (chemin public)
<Image
  src="/images/logo.png"
  alt="Company Logo"
  width={200}
  height={50}
/>
```

### Image responsive avec fill

```tsx
// Le conteneur DOIT avoir position: relative et des dimensions définies
<div className="relative w-full h-64 md:h-96">
  <Image
    src="/hero.jpg"
    alt="Hero image"
    fill
    className="object-cover"
    sizes="100vw"
    priority
  />
</div>

// Aspect ratio avec Tailwind
<div className="relative aspect-video w-full">
  <Image
    src="/video-thumbnail.jpg"
    alt="Video thumbnail"
    fill
    className="object-cover rounded-lg"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

### Sizes - Configuration responsive

```tsx
// sizes indique au navigateur quelle taille d'image charger
<Image
  src="/product.jpg"
  alt="Product"
  fill
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
/>

// Explications:
// - Mobile (< 640px): image = 100% viewport width
// - Tablet (640-1024px): image = 50% viewport width
// - Desktop (> 1024px): image = 33% viewport width
```

### Placeholder blur

```tsx
// Avec import statique (automatique)
import heroImage from '@/public/hero.jpg';

<Image
  src={heroImage}
  alt="Hero"
  placeholder="blur"
  // blurDataURL généré automatiquement
/>

// Avec URL dynamique - fournir blurDataURL
<Image
  src={dynamicUrl}
  alt="Dynamic image"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
/>

// Générer un placeholder simple
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#f3f4f6"/>
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

<Image
  src={url}
  alt=""
  width={700}
  height={475}
  placeholder="blur"
  blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
/>
```

### Images externes

```tsx
// next.config.js - Configuration requise
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
    ],
  },
};

// Usage
<Image
  src="https://images.unsplash.com/photo-xxx"
  alt="Unsplash image"
  width={800}
  height={600}
/>
```

### onLoad et onError

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

function ImageWithFallback({ src, fallbackSrc, alt, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {isLoading && <Skeleton className="absolute inset-0" />}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc);
        }}
      />
    </div>
  );
}
```

## Metadata (next/head remplacement)

### App Router (Next.js 13+) - Metadata API

```tsx
// app/layout.tsx ou app/page.tsx
import type { Metadata } from 'next';

// Static metadata
export const metadata: Metadata = {
  title: 'Mon Application',
  description: 'Description de mon application',
  keywords: ['next.js', 'react', 'typescript'],
  authors: [{ name: 'John Doe' }],
  openGraph: {
    title: 'Mon Application',
    description: 'Description de mon application',
    url: 'https://example.com',
    siteName: 'Mon Site',
    images: [
      {
        url: 'https://example.com/og.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mon Application',
    description: 'Description',
    images: ['https://example.com/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
```

### Metadata dynamique

```tsx
// app/products/[id]/page.tsx
import type { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default function ProductPage({ params }: Props) {
  // ...
}
```

### Template de titre

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | Mon Site',
    default: 'Mon Site',
  },
};

// app/about/page.tsx
export const metadata: Metadata = {
  title: 'À Propos', // Résultat: "À Propos | Mon Site"
};
```

## next/script

### Stratégies de chargement

```tsx
import Script from 'next/script';

// beforeInteractive - Charge avant que la page ne soit interactive
// Utiliser pour les scripts critiques (polyfills, etc.)
<Script
  src="https://example.com/critical.js"
  strategy="beforeInteractive"
/>

// afterInteractive (défaut) - Charge après hydration
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
  strategy="afterInteractive"
/>

// lazyOnload - Charge pendant le idle time
<Script
  src="https://example.com/analytics.js"
  strategy="lazyOnload"
/>

// worker - Charge dans un web worker (expérimental)
<Script
  src="https://example.com/heavy-script.js"
  strategy="worker"
/>
```

### Analytics (Google Analytics)

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
```

### Callbacks

```tsx
<Script
  src="https://example.com/script.js"
  onLoad={() => {
    console.log('Script loaded');
  }}
  onReady={() => {
    console.log('Script ready');
    // Exécuté après chaque navigation client-side
  }}
  onError={(e) => {
    console.error('Script error:', e);
  }}
/>
```

### Inline script

```tsx
// Avec ID (requis pour inline scripts)
<Script id="my-inline-script">
  {`
    console.log('Inline script executed');
  `}
</Script>

// Ou avec dangerouslySetInnerHTML
<Script
  id="my-script"
  dangerouslySetInnerHTML={{
    __html: `console.log('Hello');`,
  }}
/>
```
