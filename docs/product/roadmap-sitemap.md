# Blueprint produit — Sitemap et roadmap

Voir aussi les [diagrammes Mermaid](diagrams.md) : sitemap, flux PokéAPI, parcours utilisateur et roadmap visuelle.

## Promesse

Un hub Pokémon Gen 9 accessible immédiatement à tous : explorer les données, construire une équipe, suivre sa collection, lancer une chasse et jouer à un puzzle quotidien, sans choisir de profil ni créer de compte.

## Sitemap

```text
Accueil / bento
├── Explorer
│   ├── Recherche globale
│   ├── Pokémon
│   │   └── Fiche Pokémon
│   ├── Attaques
│   │   └── Fiche attaque
│   ├── Talents
│   │   └── Fiche talent
│   ├── Objets
│   │   └── Fiche objet
│   ├── Types
│   │   └── Fiche type
│   ├── Évolutions
│   └── Statistiques
├── Stratégie
│   ├── Mes équipes
│   ├── Créer une équipe
│   ├── Équipe / analyse
│   └── Importer / exporter Showdown
├── Outils
│   ├── Couverture d’équipe
│   ├── Faiblesses et résistances
│   └── Résumé des rôles
├── Collectionner
│   ├── Pokédex Gen 9
│   ├── Formes
│   ├── Shiny
│   └── Objectifs personnels
├── Chasser
│   ├── Nouvelle chasse
│   ├── Chasses en cours
│   ├── Historique
│   └── Fiche de chasse
├── Jouer
│   ├── Défi du jour
│   │   ├── Pokédle-like
│   │   └── Pokédoku-like
│   ├── Mode illimité
│   └── Statistiques personnelles
├── Partages publics
│   ├── Équipe partagée
│   ├── Résultat partagé
│   ├── Collection partagée
│   └── Chasse partagée
└── Préférences
    ├── Export / import local
    ├── Confidentialité
    └── Compte optionnel (phase ultérieure)
```

## Architecture de fiche Explorer

Chaque famille de données possède son index, ses filtres et sa fiche spécialisée. La recherche globale traverse toutes les familles mais regroupe les résultats par type.

Pour un Pokémon :

**Identité → Statistiques & faiblesses → Talents → Évolutions → Attaques → Données Gen 9 → Relations**

La fiche est une page continue avec sous-navigation sticky.

## Roadmap

### Phase 0 — Fondations

- Remplacer le scaffolding conférence par le produit Pokémon.
- Stabiliser les tokens Hearty Cloud et le bento responsive asymétrique.
- Importer un snapshot Gen 9 PokéAPI versionné.
- Séparer données importées, règles calculées et données utilisateur.
- Ajouter attribution PokéAPI et avis de non-affiliation.

### Phase 1 — Explorer

- Recherche globale.
- Index Pokémon, attaques, talents, objets et types.
- Fiches overview-first et liens croisés.
- Évolutions et statistiques.
- Cache/API interne et index de recherche.

### Phase 2 — Stratégie et Outils

- Team builder de six Pokémon.
- Talents, attaques, objets et statistiques.
- Couverture offensive/défensive.
- Faiblesses et résumé des rôles.
- Import/export Pokémon Showdown.
- Sauvegarde locale.

### Phase 3 — Collection et Chasse

- États Vu / Obtenu / À obtenir.
- Suivi des Pokémon, formes et shiny.
- Objectifs personnels.
- Sessions de chasse shiny-first.
- Compteur, méthode, durée, odds, notes et résultat.

### Phase 4 — Jouer

- Pokédle-like quotidien.
- Pokédoku-like quotidien.
- Reset à minuit UTC.
- Mode illimité.
- Partage sans spoiler.
- Statistiques personnelles locales.

### Phase 5 — Partage et synchronisation

- Instantanés publics explicites.
- Liens partageables pour équipes, résultats, collections et chasses.
- Révocation des partages.
- Compte optionnel et synchronisation multi-appareils.

### Phase 6 — Après MVP

- Calculateur de dégâts.
- Sets recommandés et métagame.
- Formats OU, VGC et Battle Stadium.
- Nouvelles générations avec adaptation des données.
- Guides, soluces, cartes et contributions éditoriales.
- Classements publics et fonctionnalités communautaires.

## Règles de produit

- Toutes les rubriques sont accessibles à tous.
- Aucun toggle de profil joueur.
- Aucune inscription obligatoire.
- Données privées par défaut.
- Les données Gen 9 sont la référence du MVP.
- Les jeux et outils doivent fonctionner à partir de données structurées ou de logique déterministe.
