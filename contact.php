<?php
// On traite le formulaire
// On vérifie si $_POST n'est pas vide
if (!empty($_POST)) {
    // Ici $_POST n'est pas vide
    // On vérifie que tous les champs "obligatoires" sont remplis
    if (
        isset( $_POST['prenom'], $_POST['nom'], $_POST['email'], $_POST['message'])
        && !empty($_POST['prenom'])
        && !empty($_POST['nom'])
        && !empty($_POST['email'])
        && !empty($_POST['message'])
    ) {
        // Tous les champs existent et ne sont pas vides
        // On vérifie si les critères de remplissage sont respectés
        // Pseudo > 5 caractères
        // Email -> email
        // Pass > 12 caractères
        // On "nettoie" le contenu des champs texte -> protection contre les failles XSS (Cross Site Scripting)
        // On retire toute balise HTML ou on encode les caractères <, > en leurs équivalents HTML &lt;, &gt;...
        $prenom = htmlentities($_POST['prenom']);
        $nom = htmlspecialchars($_POST['nom']);
        $message = strip_tags($_POST['message']);
        
        // On vérifie si l'email est un email
        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            die('Email invalide');
        }



        // Les données sont prêtes à être stockées
        // On se connecte à la base
        require_once 'includes/connect.php';

        // On écrit la requête
        $sql = "INSERT INTO `contacts`(`firstname`,`lastname`,`email`,`message`) VALUES ( :prenom, :nom, :email, :message);";

        // On prépare la requête
        $requete = $db->prepare($sql);

        // On injecte les données
        $requete->bindValue(':prenom', $prenom);
        $requete->bindValue(':nom', $nom);
        $requete->bindValue(':email', $_POST['email']);
        $requete->bindValue(':message', $message);

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
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>livre</title>
    <link rel="stylesheet" type="text/css" href="css/styleins.css">

</head>

<body>
    <audio src="audio/Master KG - Jerusalema  Feat Nomcebo Official Music Video.mp3" autoplay="true" loop="true"></audio>

    <a id="logo" href="index.php">
        <img id="logo1" class="rotating" src="images/logoxcf.png" alt="logo1" width="100" height="100"></a>
    <div id="feuilles">
        <div class="feuille">
            <img src="images/feuille.jpg" alt="livre" width="100%">
            <div class="form">
                <h1>Formulaire de contact</h1>
            </div>
        </div>
        <div class="feuille">
            <img src="images/feuille.jpg" alt="livre" width="100%">
            <!-- formulaire de contact -->
            <div class="container">
                <form method="POST">
                    <label for="fname">Nom</label>
                    <input type="text" id="fname" name="nom" placeholder="Votre nom ">

                    <label for="sujet">prenom</label>
                    <input type="text" id="lname" name="prenom" placeholder="votre prenom">

                    <label for="emailAddress">Email</label>
                    <input id="emailAddress" type="email" name="email" placeholder="Votre email">


                    <label for="subject">Message</label>
                    <textarea id="subject" name="message" placeholder="Votre message" style="height:50px"></textarea>

                    <button type="submit">envoyer</button>
                </form>
            </div>


        </div>
    </div>

</body>