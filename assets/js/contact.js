$(document).ready(function() {
    
    (function($) {
        "use strict";

        jQuery.validator.addMethod('answercheck', function(value, element) {
            return this.optional(element) || /^\bcat\b$/.test(value)
        }, "Digite a resposta correta -_-");

        // Valide o formulário de contato
        $(function() {
            $('#contactForm').validate({
                rules: {
                    Nome: {
                        required: true,
                        minlength: 2
                    },
                    Assunto: {
                        required: true,
                        minlength: 4
                    },
                    number: {
                        required: true,
                        minlength: 5
                    },
                    Email: {
                        required: true,
                        email: true
                    },
                    Mensagem: {
                        required: true,
                        minlength: 20
                    }
                },
                messages: {
                    Nome: {
                        required: "Por favor, informe seu nome.",
                        minlength: "Seu nome deve ter pelo menos 2 caracteres."
                    },
                    Assunto: {
                        required: "Por favor, informe o assunto.",
                        minlength: "O assunto deve ter pelo menos 4 caracteres."
                    },
                    Email: {
                        required: "É necessário informar um endereço de email válido.",
                        email: "Informe um email válido."
                    },
                    Mensagem: {
                        required: "Por favor, escreva uma mensagem para enviar este formulário.",
                        minlength: "Isso é tudo? Sua mensagem deve ter pelo menos 20 caracteres."
                    }
                },
                submitHandler: function(form) {
                    $(form).ajaxSubmit({
                        type: "POST",
                        data: $(form).serialize(),
                        url: "https://formsubmit.co/ajax/info@clubemoza.co.mz",
                        success: function() {
                            $('#contactForm :input').attr('disabled', 'disabled');
                            $('#contactForm').fadeTo("slow", 1, function() {
                                $(this).find(':input').attr('disabled', 'disabled');
                                $(this).find('label').css('cursor', 'default');
                                $('#success').fadeIn();
                                $('.modal').modal('hide');
		                        $('#success').modal('show');
                            })
                        },
                        error: function() {
                            $('#contactForm').fadeTo("slow", 1, function() {
                                $('#error').fadeIn();
                                $('.modal').modal('hide');
		                        $('#error').modal('show');
                            })
                        }
                    })
                }
            })
        })
        
    })(jQuery)
})
