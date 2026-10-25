// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });

            // Fermer le menu après un clic sur un élément, seulement pour les petits écrans
            if ($(window).width() < 768) {
                $('#nav-toggle').removeClass('is-active');
                $('ul.nav').removeClass('show');
            }
        } 
    });
});

// navbar toggle
$('#nav-toggle').click(function(){
    $(this).toggleClass('is-active');
    $('ul.nav').toggleClass('show');
});

// Fermer le menu quand un item est sélectionné (uniquement pour les petits écrans)
$('.nav .item').click(function() {
    if ($(window).width() < 768) {
        $('#nav-toggle').removeClass('is-active');
        $('ul.nav').removeClass('show');
    }
});

window.addEventListener("load", () => {
    const headerTagline = document.querySelector(".header-tagline");
    setTimeout(() => {
        headerTagline.classList.add("visible");
    }, 500);  /* Delay before the animation starts */
});
