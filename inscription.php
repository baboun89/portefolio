<?php
// On traite le formulaire
// On vérifie si $_POST n'est pas vide
if (!empty($_POST)) {
    // Ici $_POST n'est pas vide
    // On vérifie que tous les champs "obligatoires" sont remplis
    if (
        isset($_POST['pseudo'], $_POST['prenom'], $_POST['nom'], $_POST['email'], $_POST['pass'])
        && !empty($_POST['pseudo'])
        && !empty($_POST['prenom'])
        && !empty($_POST['nom'])
        && !empty($_POST['email'])
        && !empty($_POST['pass'])
    ) {
        // Tous les champs existent et ne sont pas vides
        // On vérifie si les critères de remplissage sont respectés
        // Pseudo > 5 caractères
        // Email -> email
        // Pass > 12 caractères
        // On "nettoie" le contenu des champs texte -> protection contre les failles XSS (Cross Site Scripting)
        // On retire toute balise HTML ou on encode les caractères <, > en leurs équivalents HTML &lt;, &gt;...
        $pseudo = strip_tags($_POST['pseudo']);
        $prenom = htmlentities($_POST['prenom']);
        $nom = htmlspecialchars($_POST['nom']);

        // On vérifie la longueur du pseudo
        if (strlen($pseudo) < 5) {
            die('Le pseudo est trop court');
        }

        // Ici le pseudo est correct
        // On vérifie si l'email est un email
        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            die('Email invalide');
        }

        // On vérifie la longueur du mot de passe
        if (strlen($_POST['pass']) < 12) {
            die('Le mot de passe est trop court');
        }

        // On hashe le mot de passe
        $pass = password_hash($_POST['pass'], PASSWORD_ARGON2ID);

        // Les données sont prêtes à être stockées
        // On se connecte à la base
        require_once 'includes/connect.php';

        // On écrit la requête
        $sql = "INSERT INTO `users`(`user_name`, `firstname`, `lastname`, `email`, `password`, `roles`) VALUES (:pseudo, :prenom, :nom, :email, '$pass', '[\"ROLE_USERS\"]');";

        // On prépare la requête
        $requete = $db->prepare($sql);

        // On injecte les données
        $requete->bindValue(':pseudo', $pseudo);
        $requete->bindValue(':prenom', $prenom);
        $requete->bindValue(':nom', $nom);
        $requete->bindValue(':email', $_POST['email']);

        // On exécute la requête
        $requete->execute();
        // On redirige vers la page d"acceuil
        header('location: index.php');
        exit;
    } else {
        // Au moins 1 champ est inexistant ou vide
        die('Il faut tout remplir');
    }
}

?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>livre</title>
    <link rel="stylesheet" type="text/css" href="css/styleins.css">

</head>

<body>
    <audio src="audio/Master KG - Jerusalema  Feat Nomcebo Official Music Video.mp3" autoplay="true" loop="true"></audio>

    <div id="feuilles">
        <div class="feuille">
            <img src="images/feuille.jpg" alt="livre" width="100%">
            <div class="container">
                <div class="form">
                    <a id="logo" href="index.php">
                        <img id="logo1" class="rotating" src="images/logoxcf.png" alt="logo1" width="100" height="100"></a>
                    <h1>Inscription</h1>
                </div>
            </div>

        </div>
        <div class="feuille">
            <img src="images/feuille.jpg" alt="livre" width="100%">
            <div class="container">
                <form method="post">
                    <div>
                        <label for="pseudo">Pseudo</label>
                        <input type="text" name="pseudo" id="pseudo">
                    </div>
                    <div>
                        <label for="prenom">Prénom</label>
                        <input type="text" name="prenom" id="prenom">
                    </div>
                    <div>
                        <label for="nom">Nom</label>
                        <input type="text" name="nom" id="nom">
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email">
                    </div>
                    <div>
                        <label for="pass">Mot de passe</label>
                        <input type="password" name="pass" id="pass">
                    </div>
                    <button type="submit">Je m'inscris</button>
                </form>

            </div>
        </div>
    </div>

</body>