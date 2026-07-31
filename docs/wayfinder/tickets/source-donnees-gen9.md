# Source de vérité des données Gen 9

**Type :** research

## Question

Quelle source structurée doit alimenter le MVP Gen 9, quelles données sont fiables, comment gérer les mises à jour et quelles limites de licence ou d’attribution devons-nous respecter ?

## Resolution

PokéAPI v2 est retenue comme source structurée d’import pour le MVP Gen 9. L’application ne dépendra pas directement du service public à chaque navigation : un snapshot versionné sera importé, validé, indexé puis servi par notre propre cache/API.

- Synchronisation contrôlée et reproductible, avec diff, validation et rollback.
- Données importées séparées des règles calculées pour la stratégie et les recommandations.
- Provenance, version/commit, date d’import et anomalies conservés avec chaque snapshot.
- Attribution PokéAPI et avis de non-affiliation Pokémon requis.
- Les assets, logos, textes et visuels de la franchise restent un sujet juridique distinct et ne sont pas présumés libres.

Voir [la recherche détaillée](../research/source-donnees-gen9.md).
