# Modèle de Collectionner et Chasser

**Type :** grilling

## Question

Qu’est-ce qu’un utilisateur peut suivre et partager dans Collectionner et Chasser : Pokédex, formes, shiny, objectifs, méthodes, compteurs, temps de chasse, preuves et progression par jeu ?

## Decisions so far

- Collectionner suit trois états indépendants : Vu, Obtenu, À obtenir.
- Le suivi distingue Pokémon Gen 9, formes alternatives et shiny.
- La progression expose des compteurs par catégorie et des objectifs personnels.
- Collectionner et Chasser restent deux concepts liés mais séparés.

## Resolution

Collectionner suit la progression de complétion, tandis que Chasser suit des sessions actives.

Collectionner expose trois états indépendants — Vu, Obtenu, À obtenir — avec des suivis distincts pour les Pokémon Gen 9, les formes et les shiny. Les objectifs et compteurs sont personnels.

Chasser est shiny-first au MVP. Une session contient une cible, une méthode, un contexte Gen 9, un compteur de rencontres, une date de début, une durée, des odds estimées, des notes et un état trouvé/abandonné/en pause. Les preuves sont optionnelles.

Le modèle de chasse reste générique pour accueillir plus tard les IV, natures, talents, objets ou événements.
