# Compte, sauvegarde et partage

**Type :** grilling

## Question

La progression personnelle doit-elle fonctionner d’abord en local, avec compte optionnel et partage par lien, ou exiger un compte dès le départ ? Quelle donnée reste privée par défaut ?

## Decisions so far

- L’accès complet fonctionne sans compte.
- La progression de base est stockée localement dans le navigateur.
- L’export/import manuel sert de sauvegarde et de transfert initial.
- Le compte est optionnel et réservé à une future synchronisation multi-appareils.
- Les données personnelles restent privées par défaut.

## Resolution

Le produit est local-first : tout est accessible sans compte, la progression de base reste dans le navigateur et l’utilisateur peut exporter/importer ses données. Le compte est optionnel et servira plus tard à synchroniser plusieurs appareils.

Le partage se fait uniquement par instantané public explicite : équipe, résultat quotidien, collection ou session de chasse. Un instantané n’expose pas l’historique privé complet ; il peut être révoqué lorsque la gestion de compte sera disponible.
