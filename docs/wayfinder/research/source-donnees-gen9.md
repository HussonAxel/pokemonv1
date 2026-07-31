# Recherche — source de données Gen 9

Date : 2026-07-31  
Ticket : `source-donnees-gen9`

## Décision recommandée

Utiliser **PokéAPI v2 comme source structurée de référence pour le MVP**, mais ne pas faire dépendre le navigateur de son service public en production. Importer les ressources nécessaires dans un snapshot versionné (ou une base locale) lors d’un job de synchronisation contrôlé, puis servir l’application depuis notre propre API/cache.

PokéAPI couvre les objets principaux de la série principale (Pokémon, formes, espèces, types, attaques, talents, objets, évolutions, statistiques, versions et localisations) et expose des ressources REST en lecture seule. La documentation indique que l’API est libre d’accès, sans authentification, mais demande explicitement de mettre en cache localement les ressources et de respecter une politique d’usage raisonnable : [documentation PokéAPI v2](https://pokeapi.co/docs/v2), [présentation du projet](https://pokeapi.co/about).

## Périmètre Gen 9 du MVP

Le filtre produit doit être explicite : génération 9 / Paldea et les ressources transversales nécessaires aux calculs. Inclure en première synchronisation :

- Pokémon et formes pertinentes de Gen 9 ;
- espèces, chaînes d’évolution et entrées de Pokédex ;
- types, talents, attaques, effets et méthodes d’apprentissage ;
- statistiques de base, expériences et caractéristiques utiles aux outils ;
- objets et catégories ;
- relations de versions/générations permettant de distinguer Gen 9.

Ne pas considérer PokéAPI comme une base complète des mécaniques compétitives de Pokémon Écarlate/Violet : les règles de format, les dégâts exacts selon une version, les données de rencontres détaillées ou les changements de méta doivent être modélisés séparément et validés par des tests métier.

## Qualité et provenance

PokéAPI est un projet communautaire open source. Son dépôt principal est sous licence BSD-3-Clause et les données sont maintenues par des contributeurs : [dépôt officiel](https://github.com/PokeAPI/pokeapi), [données statiques et schémas](https://github.com/PokeAPI/api-data). La licence du code ne transforme pas les noms, personnages, textes, illustrations ou marques Pokémon en contenu libre.

Chaque snapshot interne doit conserver :

1. la version ou le commit PokéAPI importé ;
2. la date d’import ;
3. le schéma de transformation appliqué ;
4. les anomalies connues et corrections locales ;
5. les URLs de provenance par famille de ressource.

Les données dérivées par notre logique (ex. couverture de types, filtres, recommandations) doivent être distinguées des données importées afin de pouvoir recalculer ou corriger une règle sans réimporter toute la source.

## Synchronisation proposée

- **Build initial** : importer un snapshot Gen 9 reproductible dans un format local (JSON/SQLite selon l’architecture), puis générer les index de recherche.
- **Mise à jour planifiée** : job hebdomadaire ou déclenché par une nouvelle release/commit de PokéAPI ; produire un diff avant publication.
- **Validation** : schéma, unicité des identifiants, relations d’évolution, présence des traductions requises et tests de régression sur les calculateurs.
- **Publication atomique** : ne promouvoir un snapshot que si les validations passent ; conserver le snapshot précédent pour rollback.
- **Runtime** : cache HTTP côté serveur et cache navigateur pour les lectures ; pas de boucle de requêtes directes vers PokéAPI à chaque navigation.

La page des releases montre que des corrections et ajouts Gen 9 sont régulièrement intégrés (par exemple croissance, entrées Paldea, traductions et incohérences de génération) : [releases PokéAPI](https://github.com/PokeAPI/pokeapi/releases). Il faut donc traiter la donnée comme versionnée, pas comme immuable.

## Licence, attribution et marque

Dans l’interface et la page « À propos », attribuer clairement PokéAPI et inclure le texte BSD-3-Clause pour les composants de code concernés. Ne pas présenter le site comme officiel, affilié à Nintendo, The Pokémon Company, Creatures ou Game Freak.

Les conditions officielles rappellent que les contenus, logos, captures, illustrations et autres éléments Pokémon sont protégés et que les marques appartiennent à leurs ayants droit : [conditions d’utilisation Pokémon](https://assets.pokemon.com/assets/cms2/pdf/trainer-club/pokemon_website_terms_of_use.pdf), [aide officielle sur l’utilisation des images et noms](https://support.pokemon.com/hc/fr/articles/360000634094-Puis-je-utiliser-les-noms-et-les-images-de-Pok%C3%A9mon-dans-mon-projet). Pour réduire le risque au MVP :

- privilégier les données textuelles et les visuels dont la provenance/licence est documentée ;
- éviter logos officiels, éléments marketing et assets extraits des jeux sans analyse juridique ;
- afficher un avis de non-affiliation et les crédits requis ;
- prévoir un mécanisme de retrait/correction des contenus et une revue avant monétisation.

## Conséquences pour les tickets suivants

- `architecture-explorer` doit définir un modèle interne versionné, un index de recherche et un pipeline d’import plutôt qu’un simple client PokéAPI.
- `strategie-outils` doit isoler les règles calculées et leurs sources, car PokéAPI ne garantit pas à lui seul la justesse de chaque mécanique de combat Gen 9.
- `collection-chasse` doit séparer les entités Pokémon/formes des objectifs utilisateur et des données de rencontre, ces dernières étant hors périmètre initial si elles ne sont pas couvertes de façon fiable.

## Conclusion

PokéAPI est le meilleur point de départ ouvert et structuré pour le MVP Gen 9, à condition de l’utiliser comme **source d’import versionnée**, avec cache, validation et attribution. Ce n’est ni une autorité officielle Pokémon ni une licence générale sur les assets de la franchise ; les données et visuels doivent donc être traités séparément sur le plan juridique.
