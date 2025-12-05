# Tasks: Simulateur Ubuntu Desktop

**Last Updated: 2025-12-05 - Session 2**

---

## PHASES 1-3 COMPLÈTES ✅

### Phase 1: Foundation & Landing Page ✅
- [x] Installer dépendances (zustand, lucide-react, framer-motion, react-rnd, clsx)
- [x] Configurer globals.css avec variables CSS
- [x] Créer structure dossiers
- [x] Créer types/desktop.ts
- [x] Landing: Navbar, Sidebar, Hero, Features, HowItWorks, AppShowcase, Footer

### Phase 2: Desktop Core ✅
- [x] stores/desktopStore.ts (Zustand)
- [x] Window.tsx avec react-rnd (drag, resize, focus)
- [x] Desktop.tsx, DesktopIcon.tsx, Taskbar.tsx, WindowManager.tsx
- [x] Icônes: Home, Trash, Terminal, Files, Firefox, Settings

### Phase 3: Applications ✅
- [x] Terminal.tsx avec 20+ commandes
- [x] lib/fileSystem.ts - VirtualFileSystem
- [x] lib/terminal.ts - commandes
- [x] FileManager.tsx, Settings.tsx, TextEditor.tsx, Calculator.tsx, Browser.tsx, Trash.tsx

---

## 🎮 PHASE 4: GAMIFICATION (EN COURS)

### 4.1 Foundation
| Task | Status | Description |
|------|--------|-------------|
| 4.1.1 | 🔲 TODO | Créer `types/tutorial.ts` - TutorialStep, QCM, etc. |
| 4.1.2 | 🔲 TODO | Créer `stores/tutorialStore.ts` - État Zustand |
| 4.1.3 | 🔲 TODO | Créer `lib/tutorialSteps.ts` - 11 étapes définies |

### 4.2 Composants Tutorial
| Task | Status | Description |
|------|--------|-------------|
| 4.2.1 | 🔲 TODO | `ProgressBar.tsx` - Barre progression en haut |
| 4.2.2 | 🔲 TODO | `StepCard.tsx` - Card QCM avec 4 options |
| 4.2.3 | 🔲 TODO | `ExplanationPopup.tsx` - Modal après succès |
| 4.2.4 | 🔲 TODO | `TutorialOverlay.tsx` - Fond sombre + spotlight |

### 4.3 Intégration
| Task | Status | Description |
|------|--------|-------------|
| 4.3.1 | 🔲 TODO | Modifier `Terminal.tsx` - ajouter onCommandExecuted |
| 4.3.2 | 🔲 TODO | Créer `TutorialProvider.tsx` - Context wrapper |
| 4.3.3 | 🔲 TODO | Modifier `desktop/page.tsx` - ?tutorial=true |
| 4.3.4 | 🔲 TODO | Ajouter bouton "Tutoriel" sur landing page |

### 4.4 Polish (Optionnel)
| Task | Status | Description |
|------|--------|-------------|
| 4.4.1 | 🔲 TODO | Animations Framer Motion |
| 4.4.2 | 🔲 TODO | Confetti à la fin |
| 4.4.3 | 🔲 TODO | Sauvegarde localStorage |

---

## Ordre de Priorité

### CRITIQUE (faire en premier)
1. `types/tutorial.ts`
2. `stores/tutorialStore.ts`
3. `lib/tutorialSteps.ts`

### HAUTE (composants UI)
4. `ProgressBar.tsx`
5. `StepCard.tsx`
6. `ExplanationPopup.tsx`

### MOYENNE (intégration)
7. Modifier `Terminal.tsx`
8. `TutorialProvider.tsx`
9. Modifier `desktop/page.tsx`
10. Bouton landing page

### BASSE (polish)
11. Animations
12. Confetti
13. localStorage

---

## Progress Summary

| Phase | Tasks | Done | Progress |
|-------|-------|------|----------|
| Phase 1-3: Base | 35 | 35 | 100% ✅ |
| Phase 4: Gamification | 14 | 0 | 0% |
| **TOTAL** | **49** | **35** | **71%** |

---

## Définition des 11 Étapes du Tutoriel

```
Étape 1: intro     - Bienvenue au Terminal
Étape 2: qcm+cmd   - pwd (Où suis-je ?)
Étape 3: qcm+cmd   - ls (Lister les fichiers)
Étape 4: qcm+cmd   - cd Documents (Se déplacer)
Étape 5: qcm+cmd   - cd .. (Remonter)
Étape 6: qcm+cmd   - cat notes.txt (Lire un fichier)
Étape 7: qcm+cmd   - mkdir mon_dossier (Créer dossier)
Étape 8: qcm+cmd   - touch fichier.txt (Créer fichier)
Étape 9: qcm+cmd   - echo Bonjour (Afficher texte)
Étape 10: qcm+cmd  - help (Obtenir de l'aide)
Étape 11: completion - Félicitations !
```

---

## Notes pour Prochaine Session

- Dossier components/tutorial/ à créer
- Utiliser `mkdir -p` pour créer la structure
- Le terminal a déjà un système de fichiers virtuel avec /home/user/Documents
- Le fichier notes.txt existe déjà dans /home/user
- Penser à créer notes.txt dans Documents pour l'étape 6
