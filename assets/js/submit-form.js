function initSubmitNewsletter() {
    $('#newsletter-form').on('submit', function(event) {
        event.preventDefault();

        var $email = $('#newsletter');
        var $successMessage = $('#newsletter-success');
        var $errorMessage = $('#newsletter-error');

        var isValid = true;

        function validateEmail(email) {
            var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return pattern.test(email);
        }

        if (isValid) {
            $successMessage.removeClass('hidden');
            $('#newsletter-form')[0].reset();
            setTimeout(function() {
                $successMessage.addClass('hidden');
            }, 3000);
        } else {
            $errorMessage.removeClass('hidden');
            $('#newsletter-form')[0].reset();
            setTimeout(function() {
                $errorMessage.addClass('hidden');
            }, 3000);
        }
    });
}

function initSubmitContact() {
    const $form = $('#contact-form');
    const $success = $('#success-message');
    const $error = $('#error-message');

    if (!$form.length) return;

    $form.on('submit', function (event) {
        event.preventDefault();

        const $submitBtn = $form.find('button[type="submit"]');
        const $btnText = $submitBtn.find('span');
        const originalText = $btnText.text();

        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const subject = $('#subject').val().trim();
        const projectType = $('#project-type').val().trim();
        const message = $('#Message').val().trim();

        let isValid = true;
        let errorMessage = "Oops! Form submission failed. Please try again.";

        function validateEmail(email) {
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return pattern.test(email);
        }

        // Detailed Validation
        if (name === "" || email === "" || subject === "" || message === "") {
            isValid = false;
            errorMessage = "Please fill in all required fields.";
        } else if (!validateEmail(email)) {
            isValid = false;
            errorMessage = "Please enter a valid email address.";
        } else if (projectType === "") {
            isValid = false;
            errorMessage = "Please select a Project Type from the dropdown.";
        }

        if (isValid) {
            // Show loading state
            $submitBtn.prop('disabled', true);
            $btnText.text("Sending...");

            const formData = $form.serialize();

            $.ajax({
                url: $form.attr('action'),
                type: 'POST',
                data: formData,
                dataType: 'json',
                headers: {
                    'Accept': 'application/json'
                },
                success: function(response) {
                    if (response.ok) {
                        $success.removeClass('hidden');
                        $form[0].reset();
                        $('.selected-text').text("Project Type").removeClass('has-value');
                        $('#project-type').val("");
                        
                        setTimeout(() => {
                            $success.addClass('hidden');
                        }, 5000);
                    } else {
                        $error.find('p').text("Formspree error: " + (response.error || "Submission failed"));
                        $error.removeClass('hidden');
                        setTimeout(() => $error.addClass('hidden'), 5000);
                    }
                },
                error: function(xhr) {
                    const errorData = xhr.responseJSON;
                    console.error("Formspree Error Details:", errorData);
                    
                    let finalMsg = "Network error. Please try again later.";
                    if (errorData && errorData.errors) {
                        finalMsg = errorData.errors.map(e => e.message).join(", ");
                    }

                    $error.find('p').text(finalMsg);
                    $error.removeClass('hidden');
                    setTimeout(() => $error.addClass('hidden'), 5000);
                },
                complete: function() {
                    // Reset button state
                    $submitBtn.prop('disabled', false);
                    $btnText.text(originalText);
                }
            });
        } else {
            $error.find('p').text(errorMessage);
            $error.removeClass('hidden');
            setTimeout(() => {
                $error.addClass('hidden');
            }, 3000);
        }
    });
}
