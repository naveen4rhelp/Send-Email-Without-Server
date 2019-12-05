
(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
    $("form").submit(function (e) {
        e.preventDefault();
    });
    $('#btnSent').on('click', function () {
        //alert(IsValid());
        if (IsValid()) {
            $('.cssload-preloader').show();
            emailjs.init("user_LojN87z4KfxtenOKJTtBP");

            var templateParams = {
                subject: $('#txtSubject').val(),
                body: $('#txtBody').val(),
                to: $('#txtTo').val()
            };

            emailjs.send('gmail', 'sample', templateParams)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    $('#spnMsg').addClass('success');
                    $('#spnMsg').text('Mail sent successfully.');
                    $('input,textarea').val('');
                    $('.cssload-preloader').hide();
                    $('#spnMsg').show().delay(5000).fadeOut(1500);
                }, function (error) {
                        console.log('FAILED...', error);
                        $('#spnMsg').addClass('error');
                        $('#spnMsg').text('Something went wrong.');
                        $('.cssload-preloader').hide();
                        $('#spnMsg').show().delay(5000).fadeOut(1500);

                });
        }
    });

    function IsValid() {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    }

    


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }



})(jQuery);