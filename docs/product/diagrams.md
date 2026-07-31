# Diagrammes produit

Ces diagrammes décrivent l’architecture cible du MVP. Ils utilisent Mermaid et peuvent être rendus dans GitHub, VS Code ou la plupart des lecteurs Markdown compatibles.

## 1. Sitemap

```mermaid
flowchart TD
    HOME[Accueil bento]
    HOME --> EX[Explorer]
    HOME --> ST[Stratégie]
    HOME --> OUT[Outils]
    HOME --> COL[Collectionner]
    HOME --> HUNT[Chasser]
    HOME --> PLAY[Jouer]

    EX --> SEARCH[Recherche globale]
    EX --> P[Pokémon]
    EX --> MOVES[Attaques]
    EX --> AB[Talents]
    EX --> ITEMS[Objets]
    EX --> TYPES[Types]
    EX --> EVO[Évolutions]
    EX --> STATS[Statistiques]
    P --> PF[Fiche Pokémon]
    MOVES --> MF[Fiche attaque]
    AB --> AF[Fiche talent]
    ITEMS --> IF[Fiche objet]

    ST --> TEAMS[Mes équipes]
    ST --> BUILDER[Créer une équipe]
    ST --> TEAM[Équipe / analyse]
    ST --> SHOWDOWN[Import / export Showdown]

    OUT --> COVER[Couverture d’équipe]
    OUT --> WEAK[Faiblesses / résistances]
    OUT --> ROLES[Résumé des rôles]

    COL --> DEX[Pokédex Gen 9]
    COL --> FORMS[Formes]
    COL --> SHINY[Shiny]
    COL --> GOALS[Objectifs personnels]

    HUNT --> NEW_HUNT[Nouvelle chasse]
    HUNT --> ACTIVE[Chasses en cours]
    HUNT --> HISTORY[Historique]

    PLAY --> DAILY[Défi quotidien]
    DAILY --> POKEDLE[Pokédle-like]
    DAILY --> POKEDOKU[Pokédoku-like]
    PLAY --> UNLIMITED[Mode illimité]
    PLAY --> PERSONAL[Statistiques personnelles]
```

## 2. Flux des données PokéAPI vers Explorer

```mermaid
flowchart LR
    API[PokéAPI v2]
    RELEASE[Version / commit source]
    IMPORT[Job d’import Gen 9]
    NORMALIZE[Normalisation du schéma]
    VALIDATE[Validation + tests de relations]
    SNAPSHOT[(Snapshot versionné)]
    INDEX[Index de recherche]
    APPAPI[API/cache du produit]
    EXPLORER[Explorer]
    ENTITY[Fiches spécialisées]
    DERIVED[Règles dérivées]

    API --> RELEASE --> IMPORT --> NORMALIZE --> VALIDATE
    VALIDATE -->|succès| SNAPSHOT
    VALIDATE -->|échec| ROLLBACK[Conserver le snapshot précédent]
    SNAPSHOT --> INDEX
    SNAPSHOT --> APPAPI
    INDEX --> APPAPI
    APPAPI --> EXPLORER
    EXPLORER --> ENTITY
    SNAPSHOT --> DERIVED
    DERIVED --> EXPLORER
```

Règle : le navigateur ne dépend pas directement de PokéAPI en production. Les données importées, les règles calculées et les assets sont conservés comme trois responsabilités distinctes.

## 3. Parcours utilisateur principaux

```mermaid
flowchart TD
    VISITOR[Visiteur sans compte]
    VISITOR --> HOME[Accueil bento]

    HOME -->|chercher une donnée| EXPLORE[Explorer]
    EXPLORE --> SEARCH[Recherche globale]
    SEARCH --> ENTITY[Fiche spécialisée]
    ENTITY --> RELATED[Données liées]

    HOME -->|construire| STRATEGY[Stratégie]
    STRATEGY --> TEAM[Équipe de six]
    TEAM --> ANALYSIS[Couverture + faiblesses + rôles]
    ANALYSIS --> EXPORT[Exporter Showdown]

    HOME -->|compléter| COLLECTION[Collectionner]
    COLLECTION --> STATES[Vu / Obtenu / À obtenir]
    STATES --> TARGET[Objectif personnel]

    HOME -->|chasser| HUNT[Chasser]
    HUNT --> SESSION[Session shiny]
    SESSION --> COUNTER[Compteur + durée + méthode]
    COUNTER --> RESULT[Trouvé / pause / abandonné]

    HOME -->|jouer| GAMES[Jouer]
    GAMES --> DAILY[Défi du jour]
    DAILY --> SCORE[Score personnel]
    SCORE --> SHARE[Partager sans spoiler]

    HOME --> LOCAL[(Sauvegarde locale)]
    LOCAL --> EXPORTDATA[Export / import]
    EXPORTDATA --> ACCOUNT[Compte optionnel plus tard]
```

## 4. Roadmap MVP / post-MVP

```mermaid
flowchart LR
    F0[Phase 0\nFondations] --> F1[Phase 1\nExplorer]
    F1 --> F2[Phase 2\nStratégie + Outils]
    F2 --> F3[Phase 3\nCollection + Chasse]
    F3 --> F4[Phase 4\nJouer]
    F4 --> F5[Phase 5\nPartage + sync]
    F5 --> POST[Post-MVP]

    F0 -.-> D0[Tokens + bento\nSnapshot Gen 9\nModèle de données]
    F1 -.-> D1[Recherche\nIndex + fiches\nLiens croisés]
    F2 -.-> D2[Team builder\nCouverture\nShowdown]
    F3 -.-> D3[Progression\nShiny tracker\nSessions]
    F4 -.-> D4[Pokédle\nPokédoku\nStats locales]
    F5 -.-> D5[Instantanés publics\nCompte optionnel]
    POST -.-> D6[Damage calc\nMétagame\nMulti-générations\nGuides + communauté]
```

## Lecture recommandée

L’ordre de construction suit le flux de confiance : d’abord rendre les données fiables et trouvables, puis aider à les utiliser, ensuite enregistrer la progression, et enfin ajouter les boucles de jeu et de partage.
