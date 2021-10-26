<?php

session_start();

// On traite le formulaire
// On vérifie si $_POST n'est pas vide
if (!empty($_POST)) {
    $_SESSION['post'] = $_POST;
    // Ici $_POST n'est pas vide
    // On vérifie que tous les champs "obligatoires" sont remplis
    if (
        isset($_POST['title'], $_POST['content'], $_POST['link'])
        && !empty($_POST['title'])
        && !empty($_POST['content'])
        && !empty($_POST['link'])
    ) {
        // Tous les champs existent et ne sont pas vides
        // On vérifie si les critères de remplissage sont respectés
        // Pseudo > 5 caractères
        // Email -> email
        // Pass > 12 caractères
        // On "nettoie" le contenu des champs texte -> protection contre les failles XSS (Cross Site Scripting)
        // On retire toute balise HTML ou on encode les caractères <, > en leurs équivalents HTML &lt;, &gt;...
        $title = strip_tags($_POST['title']);
        $content = htmlentities($_POST['content']);
        $link = htmlspecialchars($_POST['link']);

        // Gestion du fichier
        // On initialise le nom à null, pour les cas sans fichier
        $nomFichier = NULL;

        // On vérifie si on a un fichier
        if ($_FILES['fichier']['error'] == 0) {
            // On vérifie le type de fichier (PDF, TXT, JPG, PNG)
            $extensions = ['pdf', 'txt', 'jpg', 'jpeg', 'jfif', 'png'];
            $types = ['application/pdf', 'text/plain', 'image/jpeg', 'image/png'];

            // On récupère l'extension du fichier en minuscules
            $extFichier = strtolower(pathinfo($_FILES['fichier']['name'], PATHINFO_EXTENSION));

            if (!in_array($extFichier, $extensions) || !in_array($_FILES['fichier']['type'], $types)) {
                $_SESSION['message'][] = 'Le type de fichier n\'est pas autorisé (pdf, txt, jpg et png sont acceptés)';
            }

            // On vérifie la taille (max 4Mo)
            if ($_FILES['fichier']['size'] > 4194304) {
                $_SESSION['message'][] = 'Le fichier dépasse le maximum de 4Mo autorisé';
            }

            // En cas d'erreur, redirection
            if (!empty($_SESSION['message'])) {
                header('Location: ajoutprojet.php');
                exit;
            }

            // On génère le nom du fichier
            $nomFichier = md5(uniqid()) . '.' . $extFichier;

            // On déplace le fichier temporaire dans la destination tout en le renommant
            // On crée le chemin complet
            $chemin = __DIR__ . '/uploads/projets/' . $nomFichier;

            // On déplace
            if (!move_uploaded_file($_FILES['fichier']['tmp_name'], $chemin)){
                $_SESSION['message'][] = 'La copie de la pièce jointe a échoué';
                header('Location: ajoutprojet.php');
                exit;
            }
        }
        // Les données sont prêtes à être stockées
        // On se connecte à la base
        require_once 'includes/connect.php';

        // On écrit la requête
        $sql = "INSERT INTO `projets`(`title`, `content`,`img`, `link`) VALUES (:title, :content,:nomfichier, :link)";

        // On prépare la requête
        $requete = $db->prepare($sql);

        // On injecte les données
        $requete->bindValue(':title', $title);
        $requete->bindValue(':content', $content);
        $param = ($nomFichier != NULL) ? PDO::PARAM_STR : PDO::PARAM_NULL;
        $requete->bindValue(':nomfichier', $nomFichier, $param);
        $requete->bindValue(':link', $link);

        // On exécute la requête
        $requete->execute();


        // On redirige vers la page d'accueil
        header('Location: index.php');
        exit;
    } else {
        // Au moins 1 champ est inexistant ou vide
        $_SESSION['message'][] = 'Il faut tout remplir';
    }
}

?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/login-session-user.css">
    <title>Ajout d'un projet</title>
</head>

<body>
    <?php
    // require 'includes/msg_session_users.php';
    ?>
    <h1>Ajout d'un projet</h1>
    <?php
    if (isset($_SESSION['message'])) {
        foreach ($_SESSION['message'] as $message) {
            echo "<p>$message</p>";
        }
        unset($_SESSION['message']);
    }
    ?>
    <form method="post" enctype="multipart/form-data">
        <div>
            <label for="titre">nom</label>
            <input type="text" name="title" id="titre" value="<?php
                                                                // if(isset($_SESSION['post']['pseudo'])){
                                                                //     echo $_SESSION['post']['pseudo'];
                                                                // }
                                                                echo $_SESSION['post']['titre'] ?? "";
                                                                ?>">
        </div>
        <div>
            <label for="logo">déscriptif</label>
            <input type="text" name="content" id="logo" value="<?php
                                                                echo $_SESSION['post']['logo'] ?? "";
                                                                ?>">
        </div>
        <div>
            <label for="fichier">image</label>
            <input type="file" name="fichier" id="fichier" value="<?php
                                                                    echo $_SESSION['post']['fichier'] ?? "";
                                                                    ?>">
        </div>

        <div>
            <label for="lien">lien</label>
            <input type="url" name="link" id="lien" value="<?php
                                                            echo $_SESSION['post']['lien'] ?? "";
                                                            ?>">
        </div>
        <button type="submit">M'inscrire</button>
    </form>
    <?php unset($_SESSION['post']); ?>
</body>

</html>