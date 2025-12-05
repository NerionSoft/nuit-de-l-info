# Plan: Simulateur Ubuntu Desktop - Style PostHog

**Last Updated: 2025-12-05**

---

## Executive Summary

Créer une landing page interactive inspirée du style PostHog qui simule un environnement Ubuntu Desktop pour familiariser les jeunes avec Linux. L'interface reproduira un bureau Ubuntu avec des icônes cliquables, des fenêtres interactives, et une sidebar de navigation style PostHog.

### Objectifs principaux
1. **Landing page moderne** style PostHog avec illustrations et design attractif
2. **Desktop Ubuntu simulé** avec icônes fonctionnelles
3. **Applications interactives** (Terminal, File Manager, Settings, etc.)
4. **Expérience éducative** pour initier les jeunes à Linux

---

## Current State Analysis

### Stack technique actuel
- **Framework**: Next.js 16.0.7 (App Router)
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4
- **TypeScript**: 5.x
- **État**: Projet vierge (template Next.js par défaut)

### Ce qui manque
- Aucun composant UI
- Pas de système de fenêtres
- Pas d'assets (icônes Ubuntu, wallpapers)
- Pas de state management pour les fenêtres

---

## Proposed Architecture

```
src/
├── app/
│   ├── page.tsx              # Landing page style PostHog
│   ├── desktop/
│   │   └── page.tsx          # Ubuntu Desktop simulator
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── landing/              # Composants landing page
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── desktop/              # Composants Ubuntu Desktop
│   │   ├── Desktop.tsx
│   │   ├── Taskbar.tsx
│   │   ├── DesktopIcon.tsx
│   │   ├── Window.tsx
│   │   └── WindowManager.tsx
│   ├── apps/                 # Applications simulées
│   │   ├── Terminal.tsx
│   │   ├── FileManager.tsx
│   │   ├── Settings.tsx
│   │   ├── TextEditor.tsx
│   │   ├── Browser.tsx
│   │   └── Calculator.tsx
│   └── ui/                   # Composants UI partagés
│       ├── Button.tsx
│       ├── Card.tsx
│       └── index.ts
├── hooks/
│   ├── useWindowManager.ts
│   └── useFileSystem.ts
├── stores/
│   └── desktopStore.ts       # Zustand store
├── lib/
│   ├── fileSystem.ts         # Système de fichiers virtuel
│   └── terminal.ts           # Commandes terminal
├── types/
│   └── desktop.ts
└── assets/
    ├── icons/                # Icônes Ubuntu
    └── wallpapers/
```

---

## Design System (Style PostHog)

### Palette de couleurs

```css
/* PostHog inspired */
--primary: #F54E00;           /* Orange PostHog */
--primary-hover: #E04500;
--background: #EEEFE9;        /* Beige/cream */
--surface: #FFFFFF;
--text-primary: #151515;
--text-secondary: #6B6B6B;
--border: #D0D1C9;

/* Ubuntu theme */
--ubuntu-orange: #E95420;
--ubuntu-purple: #772953;
--ubuntu-dark: #2C001E;
--ubuntu-aubergine: #77216F;
```

### Composants visuels clés
- **Navbar** sticky avec logo, liens, CTA "Essayer"
- **Sidebar** gauche avec icônes flottantes (style PostHog)
- **Hero** avec illustration isométrique d'un desktop Ubuntu
- **Fenêtres** style desktop avec barre de titre, boutons fermer/min/max
- **Illustrations** style cartoon/isométrique

---

## Implementation Phases

### Phase 1: Foundation & Landing Page (Priorité: HAUTE)

#### 1.1 Setup & Configuration
| Task | Effort | Description |
|------|--------|-------------|
| 1.1.1 Installer dépendances | S | Zustand, lucide-react, framer-motion |
| 1.1.2 Configurer Tailwind | S | Ajouter couleurs custom, fonts |
| 1.1.3 Créer structure dossiers | S | Organiser src/ selon architecture |
| 1.1.4 Setup metadata & SEO | S | Title, description, OG images |

#### 1.2 Landing Page - Navbar & Hero
| Task | Effort | Description |
|------|--------|-------------|
| 1.2.1 Créer Navbar | M | Logo, liens nav, CTA sticky |
| 1.2.2 Créer Hero section | L | Titre accrocheur, boutons, preview desktop |
| 1.2.3 Créer Sidebar flottante | M | Icônes style PostHog avec labels |
| 1.2.4 Ajouter animations | M | Framer-motion pour transitions |

#### 1.3 Landing Page - Features & Content
| Task | Effort | Description |
|------|--------|-------------|
| 1.3.1 Section Features | M | Grid des fonctionnalités Ubuntu |
| 1.3.2 Section "Comment ça marche" | M | Steps visuels 1-2-3 |
| 1.3.3 Section Applications | M | Preview des apps disponibles |
| 1.3.4 Footer | S | Liens, crédits, social |

---

### Phase 2: Ubuntu Desktop Core (Priorité: HAUTE)

#### 2.1 Window Management System
| Task | Effort | Description |
|------|--------|-------------|
| 2.1.1 Créer Window component | L | Fenêtre draggable, resizable |
| 2.1.2 Créer WindowManager | L | Gestion z-index, focus, positions |
| 2.1.3 Créer Zustand store | M | État des fenêtres ouvertes |
| 2.1.4 Boutons fenêtre | S | Close, minimize, maximize |

#### 2.2 Desktop Environment
| Task | Effort | Description |
|------|--------|-------------|
| 2.2.1 Créer Desktop container | M | Wallpaper, grid pour icônes |
| 2.2.2 Créer DesktopIcon | M | Icône cliquable avec label |
| 2.2.3 Créer Taskbar | M | Barre du bas Ubuntu style |
| 2.2.4 Menu Applications | M | Grid des apps disponibles |
| 2.2.5 System tray | S | Horloge, wifi, volume, batterie |

#### 2.3 Desktop Icons Implementation
| Task | Effort | Description |
|------|--------|-------------|
| 2.3.1 Icône Home | S | Ouvre File Manager |
| 2.3.2 Icône Trash | S | Corbeille (visuelle) |
| 2.3.3 Icône Terminal | S | Lance Terminal app |
| 2.3.4 Icône Files | S | Lance File Manager |
| 2.3.5 Icône Settings | S | Lance Settings app |
| 2.3.6 Icône Firefox | S | Lance Browser simulé |

---

### Phase 3: Applications Ubuntu (Priorité: MOYENNE)

#### 3.1 Terminal Application
| Task | Effort | Description |
|------|--------|-------------|
| 3.1.1 UI Terminal | M | Style terminal Ubuntu |
| 3.1.2 Système de commandes | L | Parser et exécuter commandes |
| 3.1.3 Commandes basiques | L | ls, cd, pwd, cat, echo, clear, help |
| 3.1.4 Système de fichiers virtuel | L | Structure /home/user, /etc, etc. |
| 3.1.5 Historique commandes | S | Flèches haut/bas |

#### 3.2 File Manager (Nautilus)
| Task | Effort | Description |
|------|--------|-------------|
| 3.2.1 UI File Manager | M | Sidebar + grid fichiers |
| 3.2.2 Navigation dossiers | M | Clic pour entrer/sortir |
| 3.2.3 Affichage fichiers | M | Icônes selon type |
| 3.2.4 Actions fichiers | M | Preview, ouvrir avec app |

#### 3.3 Settings Application
| Task | Effort | Description |
|------|--------|-------------|
| 3.3.1 UI Settings | M | Liste catégories style GNOME |
| 3.3.2 Appearance | M | Changer wallpaper, thème |
| 3.3.3 About | S | Info "système" |

#### 3.4 Autres Applications
| Task | Effort | Description |
|------|--------|-------------|
| 3.4.1 Text Editor (Gedit) | M | Éditeur texte simple |
| 3.4.2 Calculator | S | Calculatrice fonctionnelle |
| 3.4.3 Browser simulé | M | Iframe ou page statique |

---

### Phase 4: Polish & Interactivité (Priorité: BASSE)

#### 4.1 Animations & UX
| Task | Effort | Description |
|------|--------|-------------|
| 4.1.1 Animations ouverture fenêtre | S | Scale + fade in |
| 4.1.2 Animations fermeture | S | Scale down + fade |
| 4.1.3 Hover effects icônes | S | Scale + glow |
| 4.1.4 Transitions smooth | M | Page transitions |

#### 4.2 Responsive & Mobile
| Task | Effort | Description |
|------|--------|-------------|
| 4.2.1 Landing responsive | M | Mobile-first |
| 4.2.2 Desktop message mobile | S | "Utilisez un ordinateur" |

#### 4.3 Easter Eggs & Fun
| Task | Effort | Description |
|------|--------|-------------|
| 4.3.1 Commande neofetch | S | Affiche info système stylisé |
| 4.3.2 Commande cowsay | S | ASCII art vache |
| 4.3.3 sudo command | S | Message humoristique |

---

## Risk Assessment

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Performance fenêtres multiples | Moyen | Moyenne | Limiter à 5 fenêtres max |
| Complexité window dragging | Moyen | Haute | Utiliser @dnd-kit ou react-rnd |
| Terminal commands edge cases | Faible | Haute | Whitelist de commandes supportées |
| Mobile UX pauvre | Moyen | Certaine | Landing seulement sur mobile |

---

## Success Metrics

1. **Landing Page**
   - [ ] Temps chargement < 3s
   - [ ] Score Lighthouse > 90
   - [ ] CTA visible above the fold

2. **Desktop Simulator**
   - [ ] 6+ icônes fonctionnelles
   - [ ] 5+ applications interactives
   - [ ] Terminal avec 10+ commandes
   - [ ] Fenêtres draggables sans lag

3. **Éducatif**
   - [ ] Tutorial intégré (optionnel)
   - [ ] Aide contextuelle
   - [ ] Commandes avec descriptions

---

## Dependencies & Resources

### NPM Packages à installer
```bash
npm install zustand lucide-react framer-motion @dnd-kit/core @dnd-kit/sortable react-rnd
```

### Assets nécessaires
- Icônes Ubuntu (Yaru icon theme ou Lucide)
- Wallpaper Ubuntu default
- Logo projet
- Illustrations isométriques (optionnel)

### Références
- [Ubuntu Yaru Theme](https://github.com/ubuntu/yaru)
- [GNOME HIG](https://developer.gnome.org/hig/)
- [PostHog Design](https://posthog.com)

---

## Estimated Timeline

| Phase | Durée estimée | Priorité |
|-------|---------------|----------|
| Phase 1: Landing Page | 1-2 jours | Haute |
| Phase 2: Desktop Core | 2-3 jours | Haute |
| Phase 3: Applications | 2-3 jours | Moyenne |
| Phase 4: Polish | 1 jour | Basse |

**Total estimé**: 6-9 jours de développement

---

## Next Steps

1. Installer les dépendances npm
2. Configurer Tailwind avec le design system
3. Créer les composants UI de base
4. Implémenter la landing page
5. Développer le système de fenêtres
6. Ajouter les applications une par une
