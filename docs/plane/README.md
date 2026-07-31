# Import Plane — plateforme Pokémon

Le fichier `pokemon-roadmap-work-items.csv` contient les work items issus de la carte Wayfinder et de la roadmap produit.

## Import recommandé

1. Créer ou ouvrir le projet cible dans Plane.
2. Aller dans **Workspace Settings → Imports**.
3. Ouvrir la tuile **CSV**, puis cliquer sur **Import**.
4. Sélectionner le projet cible.
5. Importer `pokemon-roadmap-work-items.csv`.
6. Vérifier le résumé de migration et corriger les éventuelles lignes en erreur.

Le CSV utilise le format officiel Plane. Les labels, types et phases sont conservés dans la description pour ne pas dépendre de champs non supportés par l’importeur CSV. L’import crée de nouveaux work items à chaque exécution : ne l’importe pas deux fois.
