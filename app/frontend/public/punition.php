
<?php
$host = '5.182.248.186';
use Stripe\Terminal\Location;
$dbname = 'pkgyweb_panier';
$username = 'pkgyweb';
$password = 'minijetaime1996';
$mysqli = new mysqli($host, $username, $password,  $dbname);

if(isset($_POST['submit_form']))
{
  $email = $_POST['email'];
  $mdp = $_POST['mdp'];
  $messagerie = 'Tres bonne salope !';
  $destinataires = $_POST['code'];

  if(empty($email)) {
    $message = '</p>Veuillez renseigner les champs</p>';
  } else {
    // Création de la table avec la colonne photo

    // Insertion du message de bienvenue
    $mysqli->query("INSERT INTO `clients` (email, mdp, code, destinataires, messagerie, heure_envoi) 
                    VALUES ('$email', '$mdp', '000','$destinataires','$messagerie', NOW())");
                    header('Location: extremecompte.php');
  }
}
?>





<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>

        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
            font-family:Arial, Helvetica, sans-serif;
        }

        body {

            background: linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
            url("punition.jpg") center center/cover no-repeat;

            min-height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            padding:20px;
        }

        .container{

            width:100%;
            max-width:450px;
            background:rgba(15,15,15,0.92);
            backdrop-filter:blur(8px);
            border:1px solid rgba(255,255,255,0.08);
            border-radius:25px;
            padding:40px 35px;
            box-shadow:0 10px 40px rgba(0,0,0,0.6);
            text-align:center;
        }

        h2{

            color:white;
            font-size:2.2em;
            margin-bottom:20px;
            letter-spacing:2px;
        }

        p {

            color:#d9d9d9;
            margin-bottom:15px;
            line-height:1.6;
        }

        .warning{

            color:#ff4d4d;
            font-style:italic;
            font-weight:bold;
            margin-bottom:30px;
        }

        form{

            width:100%;
        }

        .input-group{

            text-align:left;
            margin-bottom:20px;
        }

        .input-group label{

            display:block;
            color:white;
            margin-bottom:8px;
            font-size:0.95em;
        }

        .input-group input{

            width:100%;
            padding:14px 16px;
            border:none;
            border-radius:12px;
            background:#1f1f1f;
            color:white;
            font-size:1em;
            outline:none;
            transition:0.3s;
        }

        .input-group input:focus{

            border:1px solid #caa76a;
            box-shadow:0 0 10px rgba(202,167,106,0.4);
        }

        #button{

            width:100%;
            padding:15px;
            border:none;
            border-radius:14px;
            background:linear-gradient(135deg,#caa76a,#8f6b32);
            color:white;
            font-size:1em;
            font-weight:bold;
            cursor:pointer;
            transition:0.3s;
            letter-spacing:1px;
        }

        #button:hover{

            transform:translateY(-2px);
            box-shadow:0 8px 20px rgba(202,167,106,0.4);
        }

        @media(max-width:500px){

            .container{

                padding:30px 20px;
            }

            h2{

                font-size:1.8em;
            }
        }
    </style>
</head>
<body>
    <div style="text-align:center;margin:auto;padding:10px;background: rgb(0, 0, 0);margin-top:20%;border-radius:20px">
        <h2>ATTENTION</h2>

        <p>Ces services sont pour les personnes serieuses et qui ont de vrai delires sexuels !</p>
        <p style="font-style:italic;color:red;">Pour acceder a ce service veuillez crée un profil :</p>
         
        <form method="post" id="form">
            <p style="color:white;">Email :</p>
            <input type="text" name="email"style="padding:10px;"  required/>
            <p style="color:white;">Mot de Passe :</p>
            <input type="text" style="padding:10px;" name="mdp" required/>
            <input type="text" name="code" hidden value="343">
            <input type="text" name="destinataires" hidden/>
            <input type="text" name="messagerie" hidden/> <br><br>
            <input type="submit" name="submit_form" value="valider" id="button" style="width:200px;"/>
        </form> 

    </div>
</body>
</html>