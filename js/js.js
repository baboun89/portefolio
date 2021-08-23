window.onload = function () {
    $("#abook").turn({
        width: 320,
        height: 173,

    });
    let portraitLandscape = window.matchMedia("(orientation: landscape)");
    let mobile = window.matchMedia("(min-width: 568px, orientation: landscape)");
    let tabletPortrait = window.matchMedia("(min-width: 768px)");
    let tabletLandscape = window.matchMedia("(min-width: 768px, orientation: landscape)");
    let Portrait = window.matchMedia("(max-width: 1023px)");
    let Landscape = window.matchMedia("(max-width: 1023px, orientation: landscape)");


  
    // Manage orientation
    portraitLandscape.addEventListener("change", function (m) {
        if (m.matches) {
            $("#abook").width(380);
            $("#abook").height(270);

            // Changed to landscape
        } else {

            // Changed to portrait
            $("#abook").turn({
                width: 300,
                height: 173,


            });

        }
    });
    // Manage mobile
    mobile.addEventListener("change", function (m) {
        if (m.matches) {
            // Change to Mobile format
        }
    });
    // Manage tabletPortrait
    Portrait.addEventListener("change", function (m) {
        if (m.matches) {
            // Change to tabletPortrait format
            
        }
    });
    // Manage tabletLandscape
    Landscape.addEventListener("change", function (m) {
        if (m.matches) {
            // Change to tabletLandscape format
        } else {
            // Change to greater than 1199px
        }
    });
    if (portraitLandscape.matches) {
        // Loaded to landscape 

    } else {
        // Loaded to portrait

    }

    if (mobile.matches) {
        // Loaded to Mobile format

    }
    if (tabletPortrait.matches) {
        // Loaded to tabletPortrait format
    }
    if (tabletLandscape.matches) {
        // Loaded to tabletLandscape format
    } else {
        // Loaded to greater than 1199px
    }

}