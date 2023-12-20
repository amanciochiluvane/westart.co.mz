    // -------   Mail Send ajax

    $(document).ready(function() {
        var form = $('#contactForm'); // contact form
        var submit = $('#submitButton'); // submit button
        var alert = $('.alert-msg'); // alert div for show alert message
    
        // form submit event
        form.on('submit', function(e) {
            e.preventDefault(); // prevent default form submit
    
            $.ajax({
                url: 'https://formsubmit.co/amanciochiluva@gmail.com', // form action url
                type: 'POST', // form submit method post
                dataType: 'html', // request type html
                data: form.serialize(), // serialize form data
                beforeSend: function() {
                    alert.fadeOut();
                    submit('Sending....'); // change submit button text
                },
                success: function(data) {
                    alert(data).fadeIn(); // fade in response data
                    form.trigger('reset'); // reset form
                    submit.attr("style", "display: none !important"); // reset submit button text
                },
                error: function(e) {
                    console.log(e)
                }
            });
        });
    });
    