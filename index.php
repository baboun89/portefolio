<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>folio</title>
    <link rel="stylesheet" href="css/flipbook.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="shortcut icon" type="image/png" href="./images/logo.png" />
    <script src="js/flipbook.min.js" defer></script>
    <script src="js/js.js" defer></script>
</head>

<body>
    <header>
        <audio src="audio/Maroon_5_-_Memories_Official_Video.mp3" autoplay="true" loop="true"></audio>
        <nav class="navbar">
            <a id="logo" href="indexfin.html">
                <img id="logo1" class="rotating" src="images/logoxcf.png" alt="logo1" width="50" height="50"></a>
            <label for="btn" class="icon">
                <div class="burger">
                    <span></span>
                </div>
            </label>
            <input type="checkbox" id="btn">
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="indexpresen.html">Présentation</a>
                </li>
                <li class="nav-item">
                    <a href="indexforma.html">Formations</a>
                </li>
                <li class="nav-item">
                    <a href="indexcomp.html">Compétences</a>
                </li>
                <li class="nav-item">
                    <a href="indexexper.html">Expérience</a>
                </li>
                <li class="nav-item">
                    <a href="contact.php">Me contacter</a>
                </li>
                <li class="nav-item">
                    <a href="inscription.php">M'inscrire</a>
                </li>

            </ul>
        </nav>
    </header>
    <div class="soleil">
        <img id="soleil" src="images/soleil.png" alt="soleil" width=200>
    </div>

    <section class="title">
        <h2>Philippe Babouhot</h2>
        <h2>designer web</h2>
    </section>
    <section id="lo">
        <div class="c-flipbook" id="flipBook">
            <div class="c-flipbook__page">
                <img class="feuille" src="images/book2.jpg" alt="livre" width="100%">
            </div>
            <div class="c-flipbook__page">
                <img class="feuille" src="images/feuille.jpg" alt="livre" width="100%">
                <div class="texte1">
                    <h1>PRESENTATION</h1>
                </div>
            </div>
            <div class="c-flipbook__page">
                <img class="feuille" src="images/feuille.jpg" alt="livre" width="100%">
                <div class="texte">
                    <h2>BABOUHOT Philippe</h2>
                    <p> Bonjour , je m'appelle Philippe BABOUHOT, J'ai 44ans, je suis célibataire et j'ai 3 enfants.
                        J'habite a
                        JOIGNY dans l'Yonne, mon projet est de devenir designer web.</p>
                </div>
            </div>
            <div class="c-flipbook__page">
                <img class="feuille" src="images/feuille.jpg" alt="livre" width="100%">
                <div class="texte">
                    <h1>FORMATIONS</h1>
                    <h2>Formation online formapro</h2>
                    <h2>Titre Professionnel Designer Web</h2>
                    <P>Elaboration du design graphique d'un outil de communation nuérique: 161 h</P>
                    <p>Réalisation d'un outil de commucation numérique: 518 h</p>
                    <p>contribution à la gestion et au suivi d'un projet de communication numérique: 28 h</p>
                    <p>Intégration et acceuil: 28 h</p>
                </div>

            </div>
            <div class="c-flipbook__page">
                <img class="feuille" src="images/feuille.jpg" alt="livre" width="100%">
                <div class="texte">
                    <p>Anglas professionnel: 35 h</p>
                    <p>Eco-citoyenneté: 7 h</p>
                    <p>Savoir-être: 7 h</p>
                    <p>Entrepreunariat: 14 h</p>
                    <p>TRE et communication: 14 h</p>
                    <h2>Formation professionnellle: 798 h</h2>
                    <p>Formation en situation de travail en entreprise: 280 h</p>
                    <p>Validation de la formation: 21 h</p>
                    <h2>Durée totale du plan de formation: 1099 h</h2>
                </div>
            </div>
            <div class="c-flipbook__page">
                <img class="feuille" src="images/feuille.jpg" alt="livre" width=" 100%">
                <div class="texte">
                    <h1>COMPETENCES</h1>
                    <h1>designe</h1>
                    <ul>
                        <li>Gimp</li>
                        <li>Inksscape</li>
                        <li>Paint</li>
                    </ul>

                </div>
            </div>
            <div class="c-flipbook__page">
                <img class="feuille" src="images/feuille.jpg" alt="livre" width="100%">

                <div class="texte">

                    <P>HTML</P>
                    <p>CSS</p>
                    <p>bootstrap</p>
                    <p>js</p>
                    <p>jquery</p>
                    <p>AJAX</p>
                    <p>PHPadmin</p>
                </div>
            </div>
            <div class="c-flipbook__page">
                <img class="feuille" src="images/feuille.jpg" alt="livre" width="100%">
                <div class="texte">
                    <h1>EXPERIENCE</h1>
                </div>
            </div>
            <div class="c-flipbook__page">
                <img class="feuille" src="images/feuille.jpg" alt="livre" width="100%">
            </div>
            <?php
            // require 'includes/msg_session_users.php';

            // On se connecte à la base
            require_once 'includes/connect.php';

            // On écrit la requête
            // On ne met JAMAIS une donnée extérieure ($id) directement dans la requête
            $sql = "SELECT * FROM `projets` ";

            // Une requête contenant des paramètres SQL doit être "préparée"

            $requete = $db->query($sql);


            $projets = $requete->fetchAll();
            foreach ($projets as $projet) {



                echo "
                <div class='c-flipbook__page'>
                    <img class='feuille' src='images/feuille.jpg' alt='livre' width='100%'>
                    <div class='texte'>
                    <article>
                    <h1>PROJET  {$projet['title']}</h1>
                    <div>
                    <img class='image' src='uploads/projets/{$projet['img']}' alt='image' width='80%'>
                    </div>
                    </article>
                    </div>
                    </div>
                    <div class='c-flipbook__page'>
                    <img class='feuille' src='images/feuille.jpg' alt='livre' width='100%'>
                    <div class='texte'>
                    <h1>{$projet['title']}</h1>
                    <p>{$projet['content']}</p>
                    <a class='lien' href='{$projet['link']}'>{$projet['link']}</a>
                        <p>créer le :{$projet['created']}</p>
                        <p>mis à jour le :{$projet['updated']}</p>
                    </div>
                 </div>";
            }

            ?>
            <div class="c-flipbook__page">
                <img class="feuille" src="images/feuille.jpg" alt="livre" width="100%"></a>
            </div>
            <div class="c-flipbook__page">
                <img id="point3" class="feuille" src="images/feuille.jpg" alt="livre" width="100%">
                <div class="texte" id="fin">
                    <h1>FIN...</h1>
                </div>
                <img id="geek" src="images/geek.gif" alt="livre" width="85%">

            </div>
            <div class="c-flipbook__page">
                <img class="feuille" src="images/fbook.jpg" alt="livre" width="100%">
            </div>
        </div>
        <img id="logo2" class="rotating" src="images/logosvg.png" alt="logo2">
    </section>
    <label>
        <input type="checkbox" id="case" checked="">
        <span class="check"></span>
    </label>
    </section>
    <div id="projectContainer">
        <div id="starSuperContainer">
            <div id="starContainer"></div>
            <div id="starFade"></div>
        </div>
        <div id="fireworksContainer"></div>
    </div>

    </div>
</body>

</html>