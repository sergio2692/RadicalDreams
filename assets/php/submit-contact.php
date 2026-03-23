<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $subject_input = strip_tags(trim($_POST["subject"]));
    $projectType = strip_tags(trim($_POST["project-type"]));
    $message = strip_tags(trim($_POST["message"]));

    // Validation
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please complete all required fields and provide a valid email."]);
        exit;
    }

    // Recipient email
    $to = "info@radicaldreams.art";

    // Email Subject
    $email_subject = "New Contact Form Submission: " . (!empty($subject_input) ? $subject_input : "Inquiry from Website");

    // Email Content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Project Type: $projectType\n\n";
    $email_content .= "Message:\n$message\n";

    // Email Headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email
    if (mail($to, $email_subject, $email_content, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Your message has been sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "There was a problem sending your message. Please try again later."]);
    }

} else {
    // Not a POST request
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Forbidden request method."]);
}
?>
