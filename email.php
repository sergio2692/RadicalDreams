<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Set recipient email address
    $to = "info@radicaldreams.art"; // Replace with your actual email address

    // Set subject
    $subject = "New Message from $name";

    // Build the email message
    $email_message = "Name: $name\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Message:\n$message";

    // Set additional headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send the email
    $success = mail($to, $subject, $email_message, $headers);

    header("/");
    exit();
   
} else {
    // If the form is not submitted via POST, redirect to an error page
    header("/");
    exit();
}
?>
