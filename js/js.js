window.onload = () => {
    if (sessionStorage.nuit != null){
        document.getElementById("soleil").src = "images/lune.png";
        projectContainer.style.display = "initial";
        initialize();
    } else {
        projectContainer.style.display = "none";
    
}}
new FlipBook('flipBook', {
    canClose: true,
})
let check = document.querySelector("#case");
let soleil = document.querySelector(".soleil");
let nuage = document.querySelector(".nav-menu");
let label = check.parentElement;
let boutton = sessionStorage.getItem('point');
let nuit = sessionStorage.getItem('nuit');
let projectContainer = document.querySelector("#projectContainer");


if (boutton == 1) {
    soleil.style.display = "initial";
    nuage.style.borderRadius = "30%";
} else {
    label.style.opacity = "0";

}
check.addEventListener("click", function () {
    if (check.checked == true) {
        document.getElementById("soleil").src = "images/soleil.png";
        sessionStorage.setItem('jour', 1);
        sessionStorage.removeItem('nuit');
        projectContainer.style.display = "none";
    } else {
        document.getElementById("soleil").src = "images/lune.png";
        projectContainer.style.display = "initial";
        sessionStorage.setItem('nuit', 1);
        sessionStorage.removeItem('jour');
        initialize();
    }
})


var fireworkDimensions = 10; //make each firework 5px in width and height
var fireworkTransitionTime = 1000; //in milliseconds
var resizeTimer = false; //resize delay timer (not set)
var rayWidth = 2; //width of firework ray
var rayLength = 100; //length of firework ray
var fireworkRayPositions = [
    [0, 3],
    [10, 5],
    [8, 6],
    [5, 8],
    [2, 8],
    [2, 6],
    [0, 4],
    [0, 2],
    [2, 2],
    [4, 0],
    [8, 2],
    [10, 2]
]; //firework array positions in px format: bottom,right
//210
var blurLights = true;

// IF THE BROWSER IS INTERNET EXPLORER 10 OR 11
var UAString = navigator.userAgent;
if ((navigator.appVersion.indexOf("MSIE 10") != -1) || (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:11") !== -1)) {
    //ie 10 and 11 don't support filter blurring
    blurLights = false;
}

var fireworkCounter = 0;
var fireworkRayRotation = [0, -30, -60, -90, -120, -150, -180, -210, -240, 90, 60, 30];



function initialize() {
    fireworkTimers = [];
    createStars();
    createFireworks();

    function createStars() {
        var starContainer = document.getElementById('starContainer');
        starContainer.innerHTML = '';
        for (var i = 0; i != window.innerWidth; i++) {
            var star = document.createElement('div');
            star.className = 'star';
            star.style.opacity = Math.random() * 0.5;
            var randomDimensions = Math.floor(Math.random() * 4);
            star.style.width = randomDimensions + 'px';
            star.style.height = randomDimensions + 'px';
            star.style.top = Math.floor(Math.random() * starContainer.offsetHeight - randomDimensions) + 'px';
            star.style.left = Math.floor(Math.random() * starContainer.offsetWidth - randomDimensions) + 'px';
            starContainer.appendChild(star);
        }
    }

    function createFireworks() {
        var fireworkContainer = document.getElementById('fireworksContainer');
        fireworkContainer.innerHTML = '';
        var numFireworks = Math.floor(window.innerWidth / fireworkDimensions);
        var colors = ['#001EFF', '#DE0013', '#E2BC00', '#6600FF', '#78DD00', '#E06CBE'];
        //var colors = ['#FFC47A','#FF312D','#5CC1FF','#FF9137','#FFCE1E'];
        //#001EFF (blue), #DE0013 (red), #E2BC00 (yellow), #6600FF purple, #78DD00 (green), #E06CBE pink
        for (var i = 0; i != numFireworks; i++) {
            var firework = document.createElement('div');
            firework.className = 'fireworkContainer';
            firework.style.width = fireworkDimensions + 'px';
            firework.style.height = fireworkDimensions + 'px';
            var fireworkColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.backgroundColor = fireworkColor;
            firework.style.left = Math.floor(Math.random() * ((window.innerWidth - firework.offsetWidth) - (5 * firework.offsetWidth) + 1)) + (5 * firework.offsetWidth) + 'px';
            var numFireworkRay = Math.floor(Math.random() * 20);
            for (var j = 0; j != 12; j++) {
                var ray = document.createElement('div');
                ray.style.backgroundColor = fireworkColor;
                ray.style.bottom = fireworkRayPositions[j][0] + 'px';
                ray.style.right = fireworkRayPositions[j][1] + 'px';
                ray.className = 'fireworkRay';
                ray.style.transform = 'rotate(' + fireworkRayRotation[j] + 'deg)';
                firework.appendChild(ray);
                //fireworkRayPositions
                //fireworkRayRotation
            }
            if (blurLights == true) {
                var light = document.createElement('div');
                firework.appendChild(light);
                light.className = 'light';
            }
            fireworkContainer.appendChild(firework)
        }
        //console.log(fireworkContainer.children.length)
        fireworkTiming();
    }
}

function fireworkTiming() {
    var numCompletedFireworks = 0;
    var fireworks = document.getElementsByClassName('fireworkContainer');
    for (var i = 0; i != fireworks.length; i++) {
        createTimer(i, fireworks[i]);
    }

    function createTimer(i, firework) {
        fireworkTimers.push(window.setTimeout(function () {
            firework.style.bottom = Math.floor(Math.random() * ((window.innerHeight * .9) - (window.innerHeight * .7) + 1)) + (window.innerHeight * .7) + 'px';
            numCompletedFireworks++;
            explodeTimer(firework);
            if (numCompletedFireworks == fireworks.length - 1) {
                repositionFireworks();
                //console.log('fireworks cycled, reset them')
            }
            //Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
            //i*Math.floor(Math.random()*6000))
            fireworkCounter++;
            //console.log(fireworkCounter);
        }, i * Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000));
    }

    function explodeTimer(firework, i) {
        //var firework = firework;
        //console.log(firework.innerHTML)
        window.setTimeout(function () {
            var fireworkRays = firework.getElementsByClassName('fireworkRay');
            var light = firework.getElementsByClassName('light')[0];
            for (var i = 0; i != fireworkRays.length; i++) {
                fireworkRays[i].style.height = rayLength + 'px';
                fireworkRays[i].style.width = rayWidth + 'px';
                fireworkRays[i].style.boxShadow = "10px 10px 10px #fff";
            }
            if (blurLights == true) {
                light.style.width = 2 * rayLength + 'px';
                light.style.height = 2 * rayLength + 'px';
                light.style.backgroundColor = firework.style.backgroundColor;
            }
            //alert(light.length)
            window.setTimeout(function () {
                firework.style.opacity = '0';
            }, 800);
        }, fireworkTransitionTime - 200);
    }
}

function repositionFireworks() {
    var fireworks = document.getElementsByClassName('fireworkContainer');
    //var colors = ['#FFC47A','#FF312D','#5CC1FF','#FF9137','#FFCE1E'];
    var colors = ['#001EFF', '#DE0013', '#E2BC00', '#6600FF', '#78DD00', '#E06CBE'];
    for (var i = 0; i != fireworks.length; i++) {
        var fireworkColor = colors[Math.floor(Math.random() * colors.length)];
        fireworks[i].style.opacity = '1';
        fireworks[i].lastChild.removeAttribute('style');
        var fireworkRays = fireworks[i].getElementsByClassName('fireworkRay');
        for (var j = 0; j != fireworkRays.length; j++) {
            fireworkRays[j].style.width = '0px';
            fireworkRays[j].style.height = '0px';
            fireworkRays[j].style.backgroundColor = fireworkColor;
        }
        fireworks[i].style.backgroundColor = fireworkColor;
        fireworks[i].style.left = Math.floor(Math.random() * ((window.innerWidth - fireworks[i].offsetWidth) - fireworks[i].offsetWidth + 1)) + fireworks[i].offsetWidth + 'px';
        fireworks[i].style.bottom = '0';
    }
    for (var i = 0; i != fireworkTimers.length; i++) {
        window.clearTimeout(fireworkTimers[i]);
    }
    fireworkTiming();
}

window.addEventListener('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
        initialize();
    }, 100);
});