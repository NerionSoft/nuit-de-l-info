# Tasks: Simulateur Ubuntu Desktop

**Last Updated: 2025-12-05**

---

## Phase 1: Foundation & Landing Page

### 1.1 Setup & Configuration
- [ ] **1.1.1** Installer dépendances: `npm install zustand lucide-react framer-motion react-rnd`
- [ ] **1.1.2** Créer `tailwind.config.ts` avec couleurs custom (PostHog + Ubuntu)
- [ ] **1.1.3** Mettre à jour `globals.css` avec variables CSS
- [ ] **1.1.4** Créer structure dossiers: `components/`, `hooks/`, `stores/`, `lib/`, `types/`
- [ ] **1.1.5** Créer `types/desktop.ts` avec interfaces
- [ ] **1.1.6** Mettre à jour metadata dans `layout.tsx`

### 1.2 Composants UI de base
- [ ] **1.2.1** Créer `components/ui/Button.tsx`
- [ ] **1.2.2** Créer `components/ui/Card.tsx`
- [ ] **1.2.3** Créer `components/ui/index.ts` (barrel export)

### 1.3 Landing Page - Structure
- [ ] **1.3.1** Créer `components/landing/Navbar.tsx` - Logo, liens, CTA
- [ ] **1.3.2** Créer `components/landing/Sidebar.tsx` - Icônes flottantes style PostHog
- [ ] **1.3.3** Créer `components/landing/Hero.tsx` - Titre, description, boutons, preview
- [ ] **1.3.4** Créer `components/landing/Features.tsx` - Grid des fonctionnalités
- [ ] **1.3.5** Créer `components/landing/HowItWorks.tsx` - Steps 1-2-3
- [ ] **1.3.6** Créer `components/landing/AppShowcase.tsx` - Preview des apps
- [ ] **1.3.7** Créer `components/landing/Footer.tsx`
- [ ] **1.3.8** Assembler landing page dans `app/page.tsx`

### 1.4 Assets
- [ ] **1.4.1** Ajouter wallpaper Ubuntu dans `public/`
- [ ] **1.4.2** Créer/ajouter logo projet
- [ ] **1.4.3** Ajouter favicon

---

## Phase 2: Ubuntu Desktop Core

### 2.1 State Management
- [ ] **2.1.1** Créer `stores/desktopStore.ts` avec Zustand
- [ ] **2.1.2** Implémenter actions: openWindow, closeWindow, minimizeWindow
- [ ] **2.1.3** Implémenter actions: focusWindow, updatePosition, updateSize
- [ ] **2.1.4** Ajouter gestion wallpaper

### 2.2 Window System
- [ ] **2.2.1** Créer `components/desktop/Window.tsx` avec react-rnd
- [ ] **2.2.2** Ajouter barre de titre avec boutons (close, min, max)
- [ ] **2.2.3** Implémenter drag & resize
- [ ] **2.2.4** Implémenter focus (z-index management)
- [ ] **2.2.5** Ajouter animations ouverture/fermeture

### 2.3 Desktop Environment
- [ ] **2.3.1** Créer `components/desktop/Desktop.tsx` - Container principal
- [ ] **2.3.2** Créer `components/desktop/DesktopIcon.tsx` - Icône cliquable
- [ ] **2.3.3** Créer `components/desktop/Taskbar.tsx` - Barre inférieure
- [ ] **2.3.4** Créer `components/desktop/AppMenu.tsx` - Menu applications
- [ ] **2.3.5** Créer `components/desktop/SystemTray.tsx` - Horloge, indicateurs
- [ ] **2.3.6** Créer `app/desktop/page.tsx` - Assembler le tout

### 2.4 Desktop Icons
- [ ] **2.4.1** Icône "Home" → ouvre File Manager
- [ ] **2.4.2** Icône "Trash" → ouvre Corbeille (ou message)
- [ ] **2.4.3** Icône "Terminal" → ouvre Terminal
- [ ] **2.4.4** Icône "Files" → ouvre File Manager
- [ ] **2.4.5** Icône "Firefox" → ouvre Browser
- [ ] **2.4.6** Icône "Settings" → ouvre Settings

---

## Phase 3: Applications Ubuntu

### 3.1 Terminal Application
- [ ] **3.1.1** Créer `components/apps/Terminal.tsx` - UI de base
- [ ] **3.1.2** Créer `lib/fileSystem.ts` - Structure fichiers virtuelle
- [ ] **3.1.3** Créer `lib/terminal.ts` - Parser de commandes
- [ ] **3.1.4** Implémenter commande `ls`
- [ ] **3.1.5** Implémenter commande `cd`
- [ ] **3.1.6** Implémenter commande `pwd`
- [ ] **3.1.7** Implémenter commande `cat`
- [ ] **3.1.8** Implémenter commande `echo`
- [ ] **3.1.9** Implémenter commande `clear`
- [ ] **3.1.10** Implémenter commande `help`
- [ ] **3.1.11** Implémenter commande `mkdir`
- [ ] **3.1.12** Implémenter commande `touch`
- [ ] **3.1.13** Implémenter commande `whoami`
- [ ] **3.1.14** Implémenter commande `date`
- [ ] **3.1.15** Implémenter commande `uname`
- [ ] **3.1.16** Ajouter historique commandes (flèches haut/bas)
- [ ] **3.1.17** Ajouter auto-completion basique (Tab)

### 3.2 File Manager (Nautilus)
- [ ] **3.2.1** Créer `components/apps/FileManager.tsx` - Layout
- [ ] **3.2.2** Créer sidebar avec raccourcis (Home, Documents, Downloads...)
- [ ] **3.2.3** Créer vue grille/liste des fichiers
- [ ] **3.2.4** Implémenter navigation (double-clic dossier)
- [ ] **3.2.5** Implémenter breadcrumb path
- [ ] **3.2.6** Ajouter icônes selon type fichier

### 3.3 Settings Application
- [ ] **3.3.1** Créer `components/apps/Settings.tsx` - Layout
- [ ] **3.3.2** Créer section "Appearance" - Changer wallpaper
- [ ] **3.3.3** Créer section "About" - Info système simulé
- [ ] **3.3.4** Créer section "Keyboard" (info seulement)

### 3.4 Autres Applications
- [ ] **3.4.1** Créer `components/apps/TextEditor.tsx` - Éditeur simple
- [ ] **3.4.2** Créer `components/apps/Calculator.tsx` - Calculatrice fonctionnelle
- [ ] **3.4.3** Créer `components/apps/Browser.tsx` - Page web statique

---

## Phase 4: Polish & Finitions

### 4.1 Animations & Transitions
- [ ] **4.1.1** Animation ouverture fenêtre (scale + opacity)
- [ ] **4.1.2** Animation fermeture fenêtre
- [ ] **4.1.3** Animation minimize vers taskbar
- [ ] **4.1.4** Hover effects sur icônes desktop
- [ ] **4.1.5** Transitions page landing → desktop

### 4.2 Responsive
- [ ] **4.2.1** Landing page responsive (mobile-first)
- [ ] **4.2.2** Message "Desktop only" pour /desktop sur mobile
- [ ] **4.2.3** Tester sur différentes tailles d'écran

### 4.3 Easter Eggs (Bonus)
- [ ] **4.3.1** Commande `neofetch` - Affiche ASCII art + info
- [ ] **4.3.2** Commande `cowsay` - Vache ASCII
- [ ] **4.3.3** Commande `sudo` - Message humoristique
- [ ] **4.3.4** Konami code sur landing page?

### 4.4 Final Polish
- [ ] **4.4.1** Tester tous les parcours utilisateur
- [ ] **4.4.2** Optimiser performance (lazy loading)
- [ ] **4.4.3** Vérifier accessibilité (a11y)
- [ ] **4.4.4** Lighthouse score > 90
- [ ] **4.4.5** Cross-browser testing

---

## Progress Summary

| Phase | Total | Done | Progress |
|-------|-------|------|----------|
| Phase 1: Foundation | 18 | 0 | 0% |
| Phase 2: Desktop Core | 20 | 0 | 0% |
| Phase 3: Applications | 27 | 0 | 0% |
| Phase 4: Polish | 14 | 0 | 0% |
| **TOTAL** | **79** | **0** | **0%** |

---

## Priority Order (Recommended)

1. **CRITICAL**: 1.1.1 → 1.1.5 (Setup)
2. **CRITICAL**: 2.1.1 → 2.1.3 (Store)
3. **CRITICAL**: 2.2.1 → 2.2.4 (Window)
4. **CRITICAL**: 2.3.1 → 2.3.6 (Desktop)
5. **HIGH**: 1.3.1 → 1.3.8 (Landing)
6. **HIGH**: 3.1.1 → 3.1.10 (Terminal base)
7. **MEDIUM**: 3.2.1 → 3.2.6 (File Manager)
8. **MEDIUM**: 3.3.1 → 3.3.4 (Settings)
9. **LOW**: 3.4.x, 4.x (Polish)

---

## Notes

- Cocher les tâches au fur et à mesure avec `[x]`
- Mettre à jour "Last Updated" à chaque session
- Mettre à jour la table Progress Summary régulièrement
