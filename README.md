# TP-final-cours-javascript

Création d'un site de partage de liens en communication avec un serveur web externe via requêtes AJAX.

Consignes :
    
    Etape 1 : Affichage des liens dispo
    - Le titre de chaque lien est cliquable et envoie vers son URL.
    - La couleur à donner au titre d’un lien est “#428bca”.
    - Conformément aux bonnes pratiques vues dans le cours, les nouveaux éléments du DOM doivent être créés et modifiés avant d’être ajoutés à la page.
    - Les variables JavaScript doivent respecter la norme camelCase et le fichier liensweb.js doit être correctement indenté.
    
    Etape 2 : Formulaire d'ajout de liens    
    - Le formulaire apparaît lors du clic sur le bouton “Ajouter un lien”.
    - La saisie des champs Titre, URL et Auteur du lien est obligatoire.
    - Si l’URL saisie ne commence ni par “http://” ni par “https://”, on lui ajoute “http://” au début.
    - Lorsque l’utilisateur valide le nouveau lien, celui-ci est ajouté en haut de la page, le formulaire d’ajout disparaît et un message d’information s’affiche pendant 2 secondes.
    
    Etape 3 : Connexion à un serveur Web externe    
    - Les liens affichés sont récupérés depuis le serveur.
    - Le nouveau lien n’est affiché sur la page qu’en cas de succès de l’ajout sur le serveur.
    - Le formulaire d’ajout est remplacé par le bouton “Ajouter un lien” quel que soit le résultat de l’ajout sur le serveur.
    - Les communications avec le serveur utilisent les fonctions ajaxGet et ajaxPost définies dans le cours.


    
