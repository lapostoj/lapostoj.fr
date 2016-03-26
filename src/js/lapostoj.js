/*!
* Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
* Code licensed under the Apache License v2.0.
* For details, see http://www.apache.org/licenses/LICENSE-2.0.
* 
* Modified by lapostoj to fit the needs for http://www.lapostoj.fr.
*/

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('body').on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Prevent the links to stay focus once hit
$("a").mouseup(function(){
    $(this).blur();
})

// Send the contact form to the server
function send() {
    var captchaResponse = grecaptcha.getResponse()
    if (captchaResponse) {
        var form = {
            captcha : captchaResponse,
            name: document.getElementById("contactForm").elements[0].value,
            email: document.getElementById("contactForm").elements[1].value,
            phone: document.getElementById("contactForm").elements[2].value,
            message: document.getElementById("contactForm").elements[3].value
        }
        var request = new XMLHttpRequest();     
        var url = "http://lapostoj-rest.appspot.com/gunmail";
        var params = JSON.stringify(form);
        request.open("POST", url, true);

        //Send the proper header information along with the request
        request.setRequestHeader("Content-type", "application/json;charset=UTF-8");

        request.onreadystatechange = function() { //Call a function when the state changes.
            if(request.readyState == 4 && request.status == 200) {
                alert(request.responseText);
            }
        }
        console.log("Sending form...")
        request.send(params);
        console.log("Form sent.")
        document.getElementById("contactForm").reset();
        grecaptcha.reset()
    }
}