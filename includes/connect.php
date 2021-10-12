<?php
// ce fichier se connect à la base de données
// on définit les informations de connections
// DBHOST = serveur de base de données
const  DBHOST = 'localhost';

// DBUSER = Identifiant utilisateur de la base
const DBUSER = 'root';

// DBPASS = Mot de passe de la base de données
const DBPASS = '';

//DBNAME = nom de la base de données
const DBNAME = 'portefolio';

// NE RIEN MODIFIER SI-DESSOUS !!!!!!!!!
// on définit le DSN (Data Source Name) mysql
$dsn = 'mysql:dbname=' . DBNAME . ';host='  . DBHOST;

// on tente de se connecter au serveur
try{
//exécutée quoi qu"il arrive
$db = new PDO($dsn, DBUSER, DBPASS);

// on définit la méthode de fetch par défault
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);

//On définit le charset des transferts de données en UTF8
$db->exec('SET NAMES utf8');

}catch(PDOException $e){//on attrape l'exception PDO
// exécutée si le code dans try échoue
die($e->getMessage());
}