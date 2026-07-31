# Responsive et accessibilité du bento

**Type :** prototype

## Question

Comment faire évoluer le bento Hearty Cloud d’un accueil éditorial desktop vers mobile, clavier, zoom, contraste élevé et réduction de mouvement sans perdre la hiérarchie Explorer-dominante ?

## Resolution

Le responsive reprend le comportement compositionnel de The Matter of Design : le mobile conserve une grille asymétrique au lieu de réduire tous les blocs en une colonne uniforme.

- grille mobile en deux colonnes ;
- bloc Explorer dominant sur plusieurs lignes ;
- pile secondaire de cartes dans l’autre colonne ;
- blocs éditoriaux ponctuellement pleine largeur ;
- blocs finaux en paire côte à côte ;
- reflow des proportions, sans scroll horizontal imposé ;
- cartes utilisables au clavier et compréhensibles sans hover ;
- variante `prefers-reduced-motion` pour les expansions et déplacements ;
- zoom et contraste élevé conservant la hiérarchie et les libellés.
