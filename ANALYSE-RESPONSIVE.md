# VIGO SERVICES (VGS) — Analyse de l'expérience responsive

Phase 4 : passage d'un site optimisé desktop à une expérience pensée pour chaque appareil.

---

## 1. Méthode

Plutôt que de multiplier les media queries figées, deux leviers ont été combinés :

- **Fluide par défaut** : typographies, rythme vertical des sections et padding de conteneur utilisent désormais `clamp()`. Ils s'ajustent en continu à chaque pixel de largeur, sans à-coup, entre les paliers.
- **Recomposition par palier** : les media queries n'interviennent que là où le fluide seul ne suffit pas — nombre de colonnes, ordre des blocs, navigation, densité, cibles tactiles.

7 zones regroupent logiquement les 9 résolutions demandées dans le brief :

| Zone | Résolutions couvertes | Rôle |
|---|---|---|
| A | ≥ 1600px | Très grand écran |
| B (base) | 1280–1599px | Desktop de référence |
| C | 1024–1279px | Laptop / petit laptop |
| D | 768–1023px | Tablette (grande tablette + tablette) |
| E | 576–767px | Grand smartphone |
| F | 430–575px | Smartphone standard |
| G | ≤ 429px | Petit smartphone |

---

## 2. Améliorations par catégorie d'appareil

### Très grand écran (≥ 1600px)
Le conteneur passe de 1200px à 1320px pour éviter l'effet "site flottant dans le vide" sur un écran large, sans jamais dépasser une largeur de ligne confortable pour la lecture (les blocs de texte restent contraints indépendamment, ex. `.hero__content` à 560px, `.section-head` à 640px).

### Desktop / Laptop (1024–1599px)
- La grille des 5 pôles de service passait brutalement de 5 à 3 colonnes à 1080px ; le seuil est repoussé à 1279px pour éviter l'écrasement des cartes sur les petits laptops (1024–1279).
- Le pied de page passe à 2 colonnes avec la marque en pleine largeur, plus lisible qu'un simple `1fr 1fr` sur cette plage.
- La photo du bandeau CTA ("Besoin d'une démarche urgente ?") rétrécit proportionnellement (`clamp`) plutôt que de garder une largeur fixe de 280px qui écrasait le texte sur les petits laptops.

### Tablette (768–1023px) — le vrai travail de conception
C'était la zone la plus mal servie par la version précédente (un seul point de rupture à 860px, à cheval entre tablette et mobile). Elle reçoit maintenant sa propre composition :

- **Navigation** : le menu horizontal avec sous-menu au survol ne fonctionne pas au doigt. Bascule vers le menu plein écran dès 1023px — pensé pour la tablette, pas seulement "caché car pas de place".
- **Grilles de cartes** (services, documents administratifs, checklist) : 2 colonnes, ni écrasées (3), ni gaspillées (1). C'est la densité qui exploite le mieux la largeur d'une tablette.
- **Étapes numérotées** : passage en grille 2×2 alignée à gauche (au lieu du 1×4 avec traits pointillés, illisible en dessous de 1024px) ; les connecteurs pointillés ne s'affichent qu'à partir de 1024px, où la ligne complète a de la place.
- **Formulaires** (contact, rappel entreprise) : les champs passent en pleine largeur même si la mise en page générale (formulaire + visuel, ou formulaire + carte) reste sur 2 colonnes. Un champ de saisie à moitié de la largeur d'une tablette est inconfortable au doigt — mieux vaut l'étirer.
- **Icônes sociales** (footer, bandeau supérieur) : agrandies à 40×40px pour rester dans une zone tactile raisonnable.

### Grand smartphone (576–767px)
Bascule complète en une colonne : cartes, piliers (les 4 arguments "Pourquoi choisir VGS"), étapes, témoignages, CTA, mini-actions, pied de page. Les piliers passent en 2 colonnes courtes (pas 1), car leurs libellés sont brefs et 2 colonnes évitent une page qui s'étire inutilement. Les images (bandeau CTA) passent d'une hauteur minimale fixe à un `aspect-ratio: 16/9`, pour ne plus être coupées de façon disgracieuse une fois étalées en pleine largeur.

### Smartphone standard (430–575px) et petit smartphone (≤ 429px)
Densité affinée plutôt que redesign : padding de conteneur réduit (20px → 18px → 16px), boutons légèrement resserrés, chiffres-clés recentrés, piliers passés en ligne icône + texte (plus efficace qu'une icône centrée au-dessus du texte sur une colonne très étroite). Le seul bloc problématique — un encart "3 chiffres-clés" de la page Livraison, codé en `grid-template-columns: repeat(3,1fr)` fixe et inline — a été extrait en classe `.trio-stats` et passe en 1 colonne sur les petits écrans (il provoquait un retour à la ligne disgracieux du libellé "Rapide & fiable").

---

## 3. Ajustement HTML indispensable

Un seul changement HTML a été nécessaire : le bloc de statistiques sur `pages/livraison-courses/index.html` utilisait un `style="display:grid;grid-template-columns:repeat(3,1fr)..."` en ligne, impossible à piloter par media query. Il a été remplacé par `class="trio-stats"`, avec le même rendu visuel sur desktop et un comportement responsive propre en dessous de 430px. Aucun autre ajustement de structure n'a été nécessaire — l'architecture HTML des phases précédentes était déjà solide.

---

## 4. Principaux choix UX

1. **Le seuil de bascule vers le menu mobile est remonté de 860px à 1023px.** Une tablette est un écran tactile, pas un petit desktop : un menu pensé pour le survol de souris n'a pas sa place au-delà de la limite naturelle du clavier/souris.
2. **Le fluide remplace la multiplication de valeurs fixes** pour tout ce qui est continu (texte, espacement vertical) — conformément à la demande du brief d'éviter les valeurs figées quand une solution fluide est plus pertinente. Cela réduit aussi le volume de CSS et les risques de rupture visuelle "entre deux breakpoints".
3. **Les grilles ne sont jamais réduites mécaniquement.** Chaque palier a sa propre décision de colonnes (5 → 3 → 2 → 1, ou 4 → 2 → 2 → 2 pour les piliers) en fonction de ce que le contenu réel permet de lire confortablement à cette largeur, pas d'une règle automatique.
4. **Les formulaires suivent une logique différente de la mise en page qui les entoure** : ils passent en pleine largeur dès la tablette (1023px) alors que la mise en page en 2 blocs autour d'eux ne se replie qu'à 767px — une décision volontairement asymétrique, guidée par le confort de saisie au doigt plutôt que par la seule largeur disponible.
5. **Les cibles tactiles ont été vérifiées** (boutons, liens du menu mobile, icônes sociales, éléments de FAQ) pour rester au-dessus ou proches de 44×44px sur mobile et tablette.

---

## 5. Vérification

Le rendu a été contrôlé visuellement sur les 5 pages du site (accueil, démarches administratives, livraison & courses, entreprises, contact) aux largeurs 1680, 1440, 1150, 992, 768, 600, 414 et 360px, ainsi que sur l'ouverture du menu mobile plein écran. Aucune composition ne casse, aucun texte ne déborde, et chaque palier présente une hiérarchie visuelle propre à sa taille d'écran.
