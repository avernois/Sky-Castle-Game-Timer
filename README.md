Sky Castle Game - Timer
=======================

Il s'agit d'un timer facilitant la gestion du temps lors du partie de Sky Castle Game.
Pour tout savoir du Sky Castle Game, le mieux est encore de visiter le site [http://www.skycastlegame.net](http://www.skycastlegame.net).

Utilisation
-----------
Récupérez l'ensemble du projet et ouvrez le fichier index.html dans un navigateur web. Et voilà, vous avez le plus dur :)
Le timer démarre en cliquant sur le texte en bas.

### Passage du temps
Les journées et le lancement des retrospectives peut être fait manuellement ou automatiquement.
Le mode se choisit en cliquant sur le texte "manuel" ou "auto" en bas à droite.

#### Manuel (défaut)
Pour lancer chaque jour, il suffit de cliquer sur le texte qui le demande.

Vous êtes dans ce mode quand le texte "manuel" est indiqué en bas à droite. Un click sur ce texte passera en mode automatique.

#### Automatique
Dans ce mode, les jours de l'itération défilent automatiquement. Le démarrage de l'itération et la reprise après le tirage de la carte chance reste manuel.

Vous êtes dans ce mode quand le texte "auto" est indiqué en bas à droite. Un click sur ce texte passera en mode manuel.

Configuration
-------------
La config se fait directement en modifiant les constantes dans le fichier scg.js.
Les valeurs par défaut sont celles conseillées pour le jeu.

 * DAY_DURATION la durée d'une journée, en ms (défaut 30000 = 30s)
 * RETRO_DURATION la durée de la rétrospective, en ms (défaut 300000 = 5min)
 * NB_ITERATIONS le nombre d'itérations (défaut 5)
 * NB_DAY le nombre de jours (défaut 10)

 * DEFAULT_SOUND_STATE true : le son est actif, false : le son est désactivé (défaut false)
 * DEFAULT_MANUAL_STATE true : passage des jours manuel, false : passage des jours automatique (défaut true)

Si vous essayez d'autres combinaisons, n'hésitez pas à nous faire part des résultats via notre [page de contact](http://www.skycasltegame.net/?contact)


Problèmes connus
----------------
Nous avons des problèmes d'utilisation avec Internet Explorer :

* les animations sont parfois saccadées
* les zones de click ne sont pas consistentes

Si vous rencontrez d'autres problèmes, merci de nous le signaler (en créant une issue par exemple).

 To do
----
* réécrire l'ensemble avec des tests ! (oui, il n'y a aucun test, et j'en suis mortifié de honte)
* déplacer les variables de configuration dans un fichier séparer
* extraire les textes pour faciliter l'internationalisation
* améliorer le placement des textes dans la page
* translate into english (and other language)