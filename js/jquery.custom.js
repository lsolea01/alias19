// checks that an input string looks like a valid email address.
var isEmail_re       = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
function isEmail (s) {
   return String(s).search (isEmail_re) != -1;
}

$(document).ready(function(){
	// Smooth scrolling to internal anchors
	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	        || location.hostname == this.hostname) {

	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	           if (target.length) {
	             $('html,body').animate({
	                 scrollTop: target.offset().top
	            }, 600);
	            return false;
	        }
	    }
	});

	// ScrollSpy automatically updates nav targets based on scroll position
	// http://twitter.github.com/bootstrap/javascript.html#scrollspy
	$('#nav').scrollspy();

	// SelectNav.js is a JavaScript plugin that lets you convert your website navigation into a select drop-down menu. Used together with media queries it helps you to create a space saving, responsive navigation for small screen devices.
	// https://github.com/lukaszfiszer/selectnav.js
	selectnav('nav');

	// Handle Contact Form Submission
	$('form#contactForm button.submit').click(function() {
		var contactName = $('form#contactForm input#contactName').val();
		var contactTitle = $('form#contactForm input#contactTitle').val();
		var contactCompany = $('form#contactForm input#contactCompany').val();
		var contactEmail = $('form#contactForm input#contactEmail').val();
		var contactPhone = $('form#contactForm input#contactPhone').val();
		var contactMessage = $('form#contactForm #contactMessage').val();
		var contactCaptcha = $('form#contactForm input#contactCaptcha').val();
		var contactCaptchaAnswer = $('form#contactForm input#contactCaptchaAnswer').val();

		var dataString = 'contactName=' + contactName + '&contactTitle=' + contactTitle + '&contactCompany=' + contactCompany + '&contactEmail=' + contactEmail + '&contactPhone=' + contactPhone;
		
		var contactError = '';
		
		// Check name
		if( contactName == '' ) {
			contactError += 'Please enter your name<br />';
		}
		
		// Check e-mail
		if ( contactEmail == '') {
			contactError += 'Please enter your e-mail<br />';
		} else if ( isEmail(contactEmail) !== true ) {
			contactError += 'Please enter a valid e-mail address<br />';
		}
		
		if ( contactCaptcha !== contactCaptchaAnswer ) {
			contactError += 'Please enter the correct validation value <br />';
		}
		
		if ( contactError == '' ) {
			$.ajax({
				type: "POST",
				url: "includes/include.emailSender.php",
				data: dataString,
				success: function() {
					$('#contact-success').fadeIn();
					$('form#contactForm').fadeOut();
					$('#contact-warning').hide();
				}
			});
		} else {
			$('#contact-warning').html(contactError);
			$('#contact-warning').fadeIn();
		}

		return false;
		
	});

	// Assign classes to table rows and columns
	$('table').each(function () {
		$(this).find('tr:odd').addClass('odd');
		$(this).find('tr:even').addClass('even');
	});

	$('table tr').each(function () {
		$(this).find('td:eq(0)').addClass('column-first');;
		$(this).find('td:eq(1)').addClass('column-second');;
	});


});

/* ---------------------------------------------------- */
/* Back to Top											*/
/* ---------------------------------------------------- */

(function () {

    var extend = {
        button: '#back-top',
        text: 'Back to Top',
        min: 200,
        fadeIn: 400,
        fadeOut: 400,
        speed: 800
    }, oldiOS = false, oldAndroid = false;

    // Detect if older iOS device, which doesn't support fixed position
    if (/(iPhone|iPod|iPad)\sOS\s[0-4][_\d]+/i.test(nav.userAgent)) {
        oldiOS = true;
    }

    // Detect if older Android device, which doesn't support fixed position
    if (/Android\s+([0-2][\.\d]+)/i.test(nav.userAgent)) {
        oldAndroid = true;
    }
    console.log(extend.text);
    $('body').append('<a href="#" id="' + extend.button.substring(1) + '" title="' + extend.text + '">' + extend.text + '</a>');

    $(window).scroll(function () {
        var pos = $(window).scrollTop();

        if (oldiOS || oldAndroid) {
            $(extend.button).css({
                'position': 'absolute',
                'top': pos + $(window).height()
            });
        }

        if (pos > extend.min) {
            $(extend.button).fadeIn(extend.fadeIn);
        } else {
            $(extend.button).fadeOut(extend.fadeOut);
        }

    });

    $(extend.button).on('click', function (e) {
        $('html, body').animate({
            scrollTop: 0
        }, extend.speed);
        e.preventDefault();
    });

}());

/* end Back to Top */