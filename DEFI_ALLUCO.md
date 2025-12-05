# Défi ALLUCO - Tableau de Bord Écologique 🌍

## Présentation

Notre projet **LearnLinux** intègre un **Tableau de Bord Écologique** innovant qui répond parfaitement au défi bonus ALLUCO de la Nuit de l'Info 2025.

## Concept : Apprendre tout en préservant la planète 🌱

Le simulateur Linux LearnLinux permet aux étudiants d'apprendre les commandes Linux directement dans leur navigateur, **sans avoir besoin d'installer un système d'exploitation complet** sur leur machine. Cette approche a un impact écologique direct et mesurable.

## Fonctionnalités du Dashboard

### 1. Suivi de la progression d'apprentissage 📊

Le tableau de bord centralise toutes les données d'utilisation :
- **Commandes exécutées** : Nombre total de commandes Linux tapées
- **Fichiers créés** : Fichiers créés via le terminal
- **Dossiers créés** : Arborescence construite par l'utilisateur
- **Applications ouvertes** : Nombre d'apps explorées (Terminal, Files, Browser, etc.)
- **Temps d'apprentissage** : Durée totale passée sur la plateforme

### 2. Métriques écologiques en temps réel 🌿

Notre système calcule et affiche l'**impact environnemental positif** de l'utilisation de LearnLinux :

#### Économies d'énergie ⚡
- **Calcul** : Un PC moyen consomme ~65W, notre solution cloud mutualisée consomme ~5W par utilisateur
- **Gain** : 60Wh économisés par heure d'utilisation
- **Visualisation** : Affichage en temps réel des Wh économisés

#### Réduction des émissions CO₂ 🍃
- **Calcul** : Basé sur le mix électrique français (475g CO₂/kWh)
- **Impact** : Chaque heure sauve environ 28.5g de CO₂
- **Contexte** : Équivalent à planter des arbres virtuellement

#### Préservation de l'eau 💧
- **Calcul** : Les datacenters utilisent ~1.5L d'eau par kWh pour le refroidissement
- **Économie** : En mutualisant les ressources, on réduit considérablement cette consommation
- **Affichage** : Litres d'eau préservés grâce à l'optimisation

### 3. Système de badges et gamification 🏆

Pour encourager l'apprentissage durable :
- **Première commande** 🎯 : Premier pas dans Linux
- **Novice Terminal** ⭐ : 10 commandes exécutées
- **Expert Terminal** 🏆 : 50 commandes maîtrisées
- **Première app** 🚀 : Exploration du système
- **Explorateur** 🔍 : 5 applications testées
- **Éco-guerrier** 🌱 : Plus de 50Wh économisés

### 4. Historique et suivi temporel 📅

- **Activité quotidienne** : Graphique des 7 derniers jours
- **Progression** : Évolution du nombre de commandes
- **Persistance** : Données sauvegardées en local (localStorage)

## Architecture technique

### Technologies utilisées
- **React** + **Next.js 16** : Interface moderne et performante
- **Zustand** avec persist : Gestion d'état légère et persistante
- **Framer Motion** : Animations fluides
- **Lucide React** : Icônes écologiques et modernes
- **TailwindCSS** : Design responsive

### Composants clés

#### 1. Store de métriques (`metricsStore.ts`)
```typescript
- Tracking automatique de toutes les actions
- Calculs écologiques basés sur des données réelles
- Système de badges évolutif
- Persistance locale des données
```

#### 2. Dashboard (`Dashboard.tsx`)
```typescript
- Interface claire et colorée
- Visualisations interactives
- Sections thématiques (apprentissage, écologie, badges)
- Responsive design
```

#### 3. MetricsTracker (`MetricsTracker.tsx`)
```typescript
- Tracking passif du temps passé
- Mise à jour automatique toutes les 10 secondes
- Sauvegarde à la fermeture de session
```

#### 4. Intégration Terminal
```typescript
- Incrémentation automatique des commandes
- Détection des créations de fichiers/dossiers
- Pas d'impact sur les performances
```

## Critères du défi ALLUCO ✅

### ✅ Simplicité et efficacité
- Interface intuitive avec 3 sections claires
- Métriques compréhensibles par tous
- Accès direct via une icône sur le desktop

### ✅ Pertinence technique
- Calculs basés sur des données réelles d'économie d'énergie
- Tracking non-intrusif et performant
- Architecture modulaire et maintenable
- Utilisation du localStorage pour la persistance

### ✅ Intégration au sujet
- S'intègre parfaitement dans LearnLinux
- Renforce le message écologique : apprendre sans gaspiller
- Sensibilise les étudiants à l'impact du numérique

### ✅ Bonus Technique
- **Calculs écologiques réalistes** : Basés sur des données de consommation réelles
- **Gamification** : Système de badges motivant
- **Persistance** : Données sauvegardées entre sessions
- **Tracking automatique** : Aucune intervention manuelle requise

### ✅ Bonus Décalé
- **Message humoristique** : "Apprends Linux tout en sauvant la planète" 🌍
- **Badges décalés** : "Éco-guerrier", "Sauveur de pingouins" 🐧
- **Comparaisons amusantes** : "Équivalent à charger 15 smartphones !"

## Impact pédagogique et écologique

### Pour les étudiants 📚
1. **Apprentissage sans friction** : Pas besoin d'installer Linux
2. **Prise de conscience** : Impact écologique du numérique
3. **Motivation** : Badges et progression visible
4. **Accessibilité** : Fonctionne sur n'importe quel navigateur

### Pour la planète 🌍
1. **Réduction de la consommation électrique** : Mutualisation des ressources
2. **Moins de machines physiques** : Réduction des déchets électroniques
3. **Sensibilisation** : Chaque session est une leçon d'écologie numérique
4. **Mesurable** : Métriques concrètes et transparentes

## Données et simulations

### Données utilisées (sources réelles)
- **Consommation PC moyen** : 65W (moyenne pour un laptop/desktop en utilisation)
- **Consommation cloud mutualisé** : ~5W par utilisateur actif
- **Mix électrique français** : 475g CO₂/kWh (RTE 2024)
- **Consommation eau datacenter** : 1.5L/kWh (moyenne industrie)

### Calculs en temps réel
```javascript
hoursSpent = totalTimeSpent / 3600
energySaved = hoursSpent × (65W - 5W) = hoursSpent × 60Wh
co2Saved = (energySaved / 1000) × 475g
waterSaved = (energySaved / 1000) × 1.5L
```

## Démo et utilisation

1. **Lancer le simulateur** : Accéder à `/desktop`
2. **Ouvrir le Dashboard** : Double-clic sur l'icône "Dashboard" (📊)
3. **Explorer les métriques** : Voir sa progression et son impact
4. **Utiliser le terminal** : Les actions sont trackées automatiquement
5. **Débloquer des badges** : En utilisant activement la plateforme

## Évolutions futures possibles

- 🌐 **Classement global** : Comparer son impact avec d'autres utilisateurs
- 🎯 **Défis hebdomadaires** : Objectifs écologiques à atteindre
- 📊 **Graphiques avancés** : Visualisations D3.js des données
- 🌱 **Conversion en arbres** : "Vous avez sauvé l'équivalent de X arbres"
- 🏆 **Certifications** : Badges officiels pour les éco-apprenants

## Conclusion

Notre Tableau de Bord Écologique transforme chaque session d'apprentissage en un **geste concret pour la planète**. En combinant pédagogie, technologie et écologie, nous démontrons qu'il est possible d'apprendre efficacement tout en réduisant son empreinte carbone.

**LearnLinux : Apprendre Linux, sauver la planète, un terminal à la fois ! 🐧🌍**

---

**Équipe** : Ludovic Bergeron, Yoann Corgnet, Antoine Przyplata, Romain Blanchot, Thomas Letellier
**Défi** : ALLUCO - Nuit de l'Info 2025
**Technologies** : React, Next.js, Zustand, TailwindCSS, Framer Motion
