$('.header__reg-link').on('click', function() {
    $('.message__inner').addClass('active');
});

$('.close__message').on('click', function() {
    $('.message__inner').removeClass('active');
});