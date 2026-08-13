---
name: Dact’n Furirous
description: Un cockpit de dactylographie où chaque touche devient de la vitesse.
colors:
  asphalt: "#0b1220"
  asphalt-soft: "#111c2e"
  garage-panel: "#16243a"
  garage-raised: "#1d304b"
  warm-paper: "#f3f2eb"
  telemetry-muted: "#aab7c9"
  turbo-lime: "#dcf35e"
  turbo-lime-dark: "#9db52b"
  engine-coral: "#ff6854"
  circuit-cyan: "#59d6d1"
  phantom-violet: "#9e83ff"
typography:
  display:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(42px, 5.4vw, 76px)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 800
    letterSpacing: "0.1em"
rounded:
  control: "9px"
  compact: "10px"
  panel: "14px"
  stage: "16px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "18px"
  lg: "28px"
  xl: "46px"
components:
  button-primary:
    backgroundColor: "{colors.turbo-lime}"
    textColor: "{colors.asphalt}"
    rounded: "{rounded.control}"
    padding: "0 19px"
    height: "46px"
  button-secondary:
    backgroundColor: "{colors.garage-raised}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.control}"
    padding: "0 19px"
    height: "46px"
  panel-dark:
    backgroundColor: "{colors.garage-panel}"
    textColor: "{colors.warm-paper}"
    rounded: "{rounded.panel}"
  panel-paper:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.asphalt}"
    rounded: "{rounded.stage}"
---

# Design System: Dact’n Furirous

## Overview

**Creative North Star: “Le garage arcade nocturne”**

Le produit ressemble à un cockpit de course pédagogique, pas à un tableau de bord scolaire décoré. L'asphalte bleu nuit accueille l'essentiel de la navigation ; le papier chaud est réservé aux zones où l'on apprend ou tape. Les pistes, bolides dessinés en CSS et panneaux de télémétrie sont des contenus fonctionnels : ils expliquent la progression autant qu'ils donnent du caractère.

**Key Characteristics:** piste dominante, signalétique citron, surfaces de télémétrie nettes, véhicules géométriques, résultats théâtraux, lecture immédiate.

## Colors

La couleur suit la mécanique du jeu : citron pour agir et progresser, corail pour la tension, cyan pour le contrôle, violet pour les récompenses avancées.

### Primary
- **Turbo Lime** (#dcf35e): départ, progression, focus, record et victoire.
- **Asphalt** (#0b1220): scène principale et texte sur surfaces claires.

### Secondary
- **Engine Coral** (#ff6854): erreurs, défis de vitesse et deuxième véhicule.
- **Circuit Cyan** (#59d6d1): précision, nitro et troisième véhicule.
- **Phantom Violet** (#9e83ff): contenu expert et véhicule rare.

### Neutral
- **Garage Panel** (#16243a): unités opérationnelles.
- **Garage Raised** (#1d304b): contrôles secondaires.
- **Warm Paper** (#f3f2eb): cours, frappe et télémétrie.
- **Telemetry Muted** (#aab7c9): métadonnées lisibles sur fond sombre.

**The Signal Rule.** Le citron indique toujours une action possible ou une progression positive ; il ne sert jamais de décoration aléatoire.

## Typography

**Display Font:** Outfit (with system-ui fallback)
**Body Font:** DM Sans (with system-ui fallback)

**Character:** Outfit donne aux titres la masse compacte d'une affiche de course. DM Sans garde les conseils et données lisibles pendant l'action.

### Hierarchy
- **Display** (800, 42–76px, 0.94): promesse, victoire et entrée de section.
- **Headline** (700, 30px, 1.05): missions, cours et défis.
- **Body** (400–600, 15–16px, 1.6): explications et instructions.
- **Label** (800, 9–11px, uppercase): télémétrie, module, récompense et état.

## Layout

La largeur utile est limitée à 1280px. Le premier écran associe une piste large à une console de mission plus étroite. Les pages Cours utilisent une colonne de module fixe et une liste de leçons ; les Défis et le Garage emploient leurs grilles uniquement parce que chaque unité possède un état, une règle et une action. Sous 980px, les compositions passent en colonne. Sous 650px, la navigation occupe une seconde ligne et le cockpit conserve toute sa largeur.

## Elevation & Depth

La profondeur vient des couches de piste, des silhouettes de ville, des ombres décalées et de la perspective. Les grands panneaux utilisent une ombre ambiante (`0 24px 60px rgba(2,7,16,.32)`). Le bouton principal et les touches du clavier ont une ombre dure vers le bas pour suggérer un vrai mécanisme à presser.

## Shapes

Les contrôles utilisent 9–10px ; les contenus opérationnels 14px ; les grandes scènes 16px. Les voitures ont une silhouette asymétrique et basse. Les cercles sont réservés aux statuts, roues, rangs et explosions de succès.

## Components

### Buttons
- **Primary:** Turbo Lime, texte Asphalt, 46px de haut, ombre dure de 7px.
- **Secondary:** Garage Raised, contour blanc translucide.
- **Feedback:** pression verticale rapide, focus de 3px visible et libellé d'action explicite.

### Course Rows
- Numéro ou validation à gauche, geste au centre, XP et action à droite.
- Les cours verrouillés restent visibles mais diminués pour rendre le parcours compréhensible.

### Keyboard Profile
- Bande compacte placée avant l'action principale : disposition détectée, langue active, recalibrage et changement FR/EN.
- Le profil reste visible dans le cockpit de course sous forme de label de télémétrie.

### Race Surface
- Trois voies, trois véhicules CSS et progression horizontale continue.
- La route défile seulement pendant la course ; le combo accélère le rythme visuel et la nitro ajoute un flux lumineux borné à la scène.
- La zone de frappe est claire, le caractère courant est souligné en corail et les données sont mises à jour en direct.

### Motion Identity
- **Personality:** énergique.
- **Signature easing:** `cubic-bezier(.16,1,.3,1)`.
- **Durations:** 120ms feedback, 240ms état, 600ms moment focal.
- **Focal sequence:** compte à rebours 3–2–1, démarrage de la piste, montée du combo, nitro puis podium.
- Les erreurs secouent brièvement le cockpit ; les succès utilisent un pop et une dispersion de particules.

## Do's and Don'ts

- Do: relier chaque animation à la vitesse, au feedback ou à la progression.
- Do: montrer la précision au même niveau que la vitesse.
- Do: respecter `prefers-reduced-motion` et permettre la pause.
- Do: rendre la disposition et la langue de frappe visibles avant le départ.
- Don't: masquer une leçon derrière une animation obligatoire.
- Don't: attribuer une victoire de défi si son objectif chiffré n'est pas atteint.
- Don't: inventer un classement distant ou des adversaires humains ; les rivaux sont locaux et simulés.
