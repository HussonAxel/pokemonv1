# Architecture d’Explorer et recherche

**Type :** grilling

## Question

Comment organiser Explorer pour que Pokémon, formes, types, attaques, talents, objets, évolutions et statistiques soient trouvables en deux actions maximum, tout en gardant une recherche globale compréhensible ?

## Decisions so far

- Explorer adopte une architecture search-first, complétée par une navigation de catégories.
- Les familles de données restent séparées : Pokémon, attaques, talents, objets, types, évolutions et statistiques.
- Chaque famille possède son index, ses filtres et ses fiches spécialisées.
- La recherche globale peut traverser toutes les familles, mais les résultats sont regroupés par type d’entité.
- Les fiches créent des liens croisés entre entités liées sans fusionner leurs modèles.

## Resolution

Explorer est search-first, avec une sous-navigation persistante par famille de données : Pokémon, attaques, talents, objets, types, évolutions et statistiques. La recherche globale traverse ces familles mais regroupe toujours ses résultats par type d’entité.

Les fiches suivent un agencement overview-first inspiré de PokéStats, sans reprendre son UI :

**Identité → Statistiques & faiblesses → Talents → Évolutions → Attaques → Données Gen 9 → Relations**

La fiche est une page continue avec sous-navigation sticky. Le bloc identité vient en premier, puis statistiques et faiblesses sont visibles immédiatement après. Chaque section reste spécialisée et les relations entre entités sont navigables par liens croisés.
