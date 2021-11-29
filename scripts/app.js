
// On start
$('.title-menu').animate({bottom: 0}, {duration: 800, queue: false, complete: function() {

    $('.play-button').on('click', playButton);

}});

function playButton(e) {
    // Fade the menu, bring in the new menu. 
    e.preventDefault();

    $('.title-menu').fadeOut();

    


    // Make the button unusable
    $('.play-button').off('click', playButton);
}