# Wayfinder — Plateforme Pokémon polyvalente

## Destination

Produire un blueprint complet, prêt à transmettre au développement : promesse produit, vocabulaire partagé, sitemap, parcours principaux, périmètre MVP et roadmap par phases pour une plateforme Pokémon Gen 9 accessible à tous les joueurs.

## Notes

- Cette carte est temporairement suivie en Markdown ; elle sera migrée vers GitHub Issues dès que l’intégration aura les droits d’écriture.
- Wayfinder planifie les décisions ; il ne lance pas encore l’implémentation.
- Tous les espaces sont accessibles à tous. Aucun toggle de profil ou de mode joueur.
- Référence visuelle : fichier Paper « Hearty Cloud », avec une structure d’accueil bento éditoriale.
- Référence de composition : The Matter of Design, pour la grille asymétrique, la typographie et les modules vivants.
- MVP limité à la génération 9.
- Guides, soluces et contenus communautaires éditoriaux hors MVP.

## Decisions so far

- [Source de vérité des données Gen 9](tickets/source-donnees-gen9.md) — PokéAPI v2 importée dans un snapshot Gen 9 versionné, validé et mis en cache ; règles calculées et assets restent séparés.
- Architecture d’Explorer — familles de données séparées, recherche transversale regroupée par type et fiches spécialisées reliées entre elles.
- Fiches Explorer — pages continues overview-first : identité, statistiques/faiblesses, talents, évolutions, attaques, données Gen 9, relations ; sous-navigation sticky.
- Stratégie/Outils — team builder Gen 9 généraliste, analyse de couverture et rôles, import/export Showdown ; calculs avancés et formats compétitifs post-MVP.
- Collectionner/Chasser — progression Vu/Obtenu/À obtenir séparée des sessions de chasse shiny-first, avec compteur, méthode, durée et résultat.
- Jouer — deux puzzles quotidiens Gen 9, Pokédle-like et Pokédoku-like, reset à minuit UTC, mode illimité et statistiques personnelles sans classement public au MVP.
- Compte et partage — accès sans compte, progression locale, export/import, compte optionnel plus tard et partage par instantané public explicite.
- Bento responsive — grille mobile asymétrique en deux colonnes inspirée de The Matter of Design, Explorer dominant, blocs empilés/pleine largeur/en paire, accessible sans hover.
- Hub unique sans profils restrictifs — tous les joueurs accèdent à toutes les rubriques.
- Explorer est le bloc dominant de l’accueil et contient toutes les données structurées du jeu.
- La navigation expose directement Explorer, Stratégie, Outils, Collectionner, Chasser et Jouer.
- Gen 9 (Pokémon Écarlate/Violet) est la référence initiale.
- L’adaptation multi-générations est repoussée après le MVP.
- Le nom de produit reste un placeholder.
- Les guides et contributions éditoriales sont hors MVP.

## Not yet specified

- Niveau de profondeur des outils de stratégie et formats couverts.
- Comportement responsive et accessibilité du bento.
- Métriques de réussite et séquencement MVP.

## Out of scope

- Soluces, cartes détaillées, guides de routes et contenus éditoriaux communautaires au MVP.
- Gestion multi-générations et adaptation automatique des mécaniques au MVP.

## Frontier

- [Source de vérité des données Gen 9](tickets/source-donnees-gen9.md)
- [Architecture d’Explorer et recherche](tickets/architecture-explorer.md)
- [Promesse et profondeur de Stratégie/Outils](tickets/strategie-outils.md)
- [Modèle de Collectionner et Chasser](tickets/collection-chasse.md)
- [Boucle des mini-jeux](tickets/boucle-mini-jeux.md)
- [Compte, sauvegarde et partage](tickets/compte-sauvegarde.md)
- [Responsive et accessibilité du bento](tickets/bento-accessibilite.md)
