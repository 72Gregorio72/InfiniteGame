<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer\Exception.php';
require 'PHPMailer\PHPMailer.php';
require 'PHPMailer\SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];
  $to = "gregoriopicchio@gmail.com"; // Inserisci qui la tua email
  $subject = "Nuovo messaggio dal modulo di contatto";

  // Crea una nuova istanza di PHPMailer
  $mail = new PHPMailer(true);

  try {
    // Configura il server SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.example.com'; // Inserisci l'indirizzo del server SMTP
    $mail->Port = 587; // Inserisci la porta del server SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'gregoriopicchio@gmail.com'; // Inserisci il nome utente del tuo account email
    $mail->Password = 'GP290405'; // Inserisci la password del tuo account email

    // Imposta i dettagli del mittente e del destinatario
    $mail->setFrom($email, $name);
    $mail->addAddress($to);

    // Imposta il soggetto e il corpo dell'email
    $mail->Subject = $subject;
    $mail->Body = "Nome: " . $name . "\n";
    $mail->Body .= "Email: " . $email . "\n";
    $mail->Body .= "Messaggio: " . $message;

    // Invia l'email
    $mail->send();
    echo "Messaggio inviato con successo!";
  } catch (Exception $e) {
    echo "Si è verificato un errore durante l'invio del messaggio: " . $mail->ErrorInfo;
  }
}
?>
