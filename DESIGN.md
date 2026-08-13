---
name: Dact’n Furirous
description: Apprends à taper en jouant sur une piste de course.
colors:
  ink: "#101827"
  panel: "#1c2a40"
  panel-raised: "#22334d"
  paper: "#f5f4ee"
  muted: "#aab6c7"
  lime: "#d9f25e"
  coral: "#ff6b57"
  cyan: "#66d7d3"
typography:
  display:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(37px, 5vw, 63px)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.05em"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  sm: "8px"
  md: "12px"
  lg: "18px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "28px"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "13px 18px"
  button-secondary:
    backgroundColor: "{colors.panel-raised}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "13px 18px"
---

# Design System: Dact’n Furirous

## Overview

**Creative North Star: “Le garage arcade”**

Dact’n Furirous est un cockpit d'apprentissage qui donne envie de démarrer en moins de dix secondes. Le bleu nuit crée la profondeur d'une piste éclairée en intérieur ; le citron est la ligne de conduite et le corail signale l'énergie, la vitesse et les moments de résultat. L'interface reste dense mais lisible : les informations utiles sont au bord de l'action, jamais dans un mur de cartes.

**Key Characteristics:** piste visible, surfaces techniques en tons bleus, accents citron/corail, humour léger, feedback immédiat.

## Colors

Palette pleine : le bleu nuit porte l'espace, le citron porte l'action et le corail porte la tension de course.

### Primary
- **Citron turbo** (#d9f25e): action principale, progression et objectifs atteints.

### Secondary
- **Corail moteur** (#ff6b57): rival, erreurs, énergie et résultats gagnés.
- **Cyan circuit** (#66d7d3): signal secondaire pour les surfaces de piste.

### Neutral
- **Bleu nuit** (#101827): fond et texte sombre.
- **Bleu panneau** (#1c2a40 / #22334d): panneaux et contrôles.
- **Papier chaud** (#f5f4ee): surfaces de lecture et zone de frappe.
- **Brume** (#aab6c7): texte secondaire sur fond sombre.

## Typography

**Display Font:** Outfit (with system-ui fallback)
**Body Font:** DM Sans (with system-ui fallback)

**Character:** Outfit donne aux titres une silhouette compacte de tableau de bord ; DM Sans garde les instructions et statistiques très lisibles.

### Hierarchy
- **Display** (700, clamp 37–63px, 0.96): promesse du cockpit et titre de course.
- **Headline** (700, 31–42px, 1): titres de section et résultat.
- **Body** (400–600, 13–15px, 1.55): instructions et descriptions.
- **Label** (700, 11–12px, tracked uppercase): circuits, catégories et métadonnées.

## Layout

Le contenu est limité à 1280px et s'organise en grand écran autour d'une piste dominante à gauche et d'un panneau de commande à droite. Les statistiques et quêtes suivent en bandes courtes. À 800px, tout passe en colonne ; à 520px, la navigation et les métriques se resserrent sans retirer l'action principale.

## Elevation & Depth

La profondeur est hybride : surfaces bleues tonales pour le garage, ombres douces décalées pour les grands blocs qui doivent flotter, et une ombre dure citron sous le bouton principal pour rappeler une commande physique.

### Shadow Vocabulary
- **Garage lift** (`0 20px 50px rgba(4,11,23,.24)`): stage et panneau principal.
- **Turbo press** (`0 8px 0 #9cb22d`): bouton principal au repos, disparaît naturellement au clic via son déplacement.

## Shapes

Les grands conteneurs ont des angles 15–18px, les contrôles 8–12px et l'avatar est circulaire. Les bords sont fins et translucides ; les accents ne se déploient pas comme des bordures de cartes, mais comme des lignes de piste ou des ombres de commande.

## Components

### Buttons
- **Shape:** tactile, radius 8–10px.
- **Primary:** citron turbo sur texte bleu nuit, padding 13px 18px.
- **Hover / Focus:** léger déplacement vertical, contour citron visible au focus clavier.
- **Secondary / Ghost:** panneau bleu pour les actions secondaires ; ghost citron pour les liens de navigation.

### Cards / Containers
- **Corner Style:** 14–18px pour les surfaces de scène, 12–15px pour les quêtes et niveaux.
- **Behavior:** une seule hiérarchie de surface ; les cartes sont réservées aux unités qui portent un état ou une action.

### Race Surface
- **Stage:** piste en perspective avec véhicule animé et arrivée visible.
- **Typing panel:** zone papier contrastée, texte courant rendu caractère par caractère, champ autofocus et métriques en direct.

## Do's and Don'ts

- Do: montrer l'action de course avant les explications.
- Do: utiliser le citron pour signaler ce que l'utilisateur peut faire maintenant.
- Do: garder la précision aussi visible que la vitesse.
- Don't: ajouter de compte, classement ou preuve distante à une expérience locale sans décision produit.
- Don't: remplacer la piste, le clavier ou le texte de frappe par des blocs décoratifs.
