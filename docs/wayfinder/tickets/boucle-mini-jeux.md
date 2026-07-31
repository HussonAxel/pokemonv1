# Boucle des mini-jeux

**Type :** prototype

## Question

Quels mini-jeux déterministes lancer au MVP, avec quelle boucle quotidienne, quels scores, quelles difficultés et quelle rejouabilité sans dépendre d’une contribution éditoriale ?

## Decisions so far

- Le MVP contient deux formats : un jeu de devinette quotidien de type Pokédle et une grille quotidienne de type Pokédoku.
- Chaque joueur reçoit le même puzzle du jour.
- Les parties sont courtes, à tentatives limitées et partageables sans spoiler.
- Un mode illimité séparé pourra utiliser des puzzles générés à la demande.
- Les puzzles sont générés depuis les données Gen 9, sans contribution éditoriale.

## Resolution

Le MVP Jouer lance deux jeux quotidiens générés à partir des données Gen 9 :

- un jeu de devinette de type Pokédle, avec indices progressifs et six tentatives recommandées ;
- une grille 3×3 de type Pokédoku, avec réponses uniques par puzzle et nombre de coups limité.

Les deux jeux proposent un défi identique pour tous, renouvelé à minuit UTC, un mode illimité séparé et un partage sans spoiler. Les scores restent personnels au MVP : essais et indices pour Pokédle, erreurs et rareté des réponses pour Pokédoku. Les statistiques sont locales au départ ; aucun classement public n’est requis.
