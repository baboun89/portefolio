new FlipBook('flipBook', {
    canClose: true,
})
let check = document.querySelector("input")
let soleil = document.querySelector(".soleil")
let label = document.querySelector("label")
let boutton = sessionStorage.getItem('click')

if (boutton == 1) {
    soleil.style.display = "initial";


} else {
    label.style.opacity = "0";

}
check.addEventListener("click", function () {
    if (check.checked == true) {
        init();
    } else {

    }
})

var Clrs = new Array('#ff0000', '#00ff00', '#000aff', '#ff00ff', '#ffa500', '#ffff00', '#00ff00', '#ffffff', '#fffff0');
var sClrs = new Array('#ffa500', '#55ff66', '#AC9DFC', '#fff000', '#fffff0');

function artifice(elem, coul) {

    if (coul == 'multi') {
        this.couleur = 'multi';
        this.initialStarColor = '#ffa000';
    } else {
        this.couleur = 'neutre';
        this.initialStarColor = coul;
    }
    this.yBase;
    this.xBase;
    this.step;
    this.currStep = 0;
    this.Mtop = 250;
    this.Mleft = 250;

    var constrution = document.createElement('div');
    constrution.id = elem;
    constrution.style.position = 'absolute';

    for (var i = 0; i < 7; i++) {
        var point = document.createElement('div');
        point.style.position = 'relative';
        point.style.height = 2 + 'px';
        point.style.width = 2 + 'px';
        point.style.fontSize = 2 + 'px';
        point.style.backgroundColor = this.initialStarColor;
        point.style.borderRadius = 1 + 'px';
        var point2 = document.createElement('div');
        point2.style.position = 'relative';
        point2.style.height = 3 + 'px';
        point2.style.width = 3 + 'px';
        point2.style.fontSize = 3 + 'px';
        point2.style.backgroundColor = this.initialStarColor;
        point2.style.borderRadius = 1 + 'px';
        constrution.appendChild(point);
        constrution.appendChild(point2);
    }
    document.body.appendChild(constrution);

    this.el = document.getElementById(elem);
    this.Fireworks();
}


artifice.prototype.Fireworks = function () {

    if (document.all) {
        this.yBase = document.documentElement.offsetHeight / 3;
        this.xBase = document.documentElement.offsetWidth / 8;
    } else {
        this.yBase = window.innerHeight / 3;
        this.xBase = window.innerWidth / 8;
    }

    var elem = this.el.getElementsByTagName("div")

    this.step = 5;
    for (i = 0; i < elem.length; i++) {
        for (ai = 0; ai < Clrs.length; ai++) {
            var c = Math.round(Math.random() * [ai]);
        }
        if (this.currStep < 90) {

            if (this.couleur == 'multi') {
                elem[i].style.backgroundColor = this.initialStarColor;
            }
        }
        if (this.currStep > 90) {

            if (this.couleur == 'multi') {
                elem[i].style.backgroundColor = Clrs[c];
            }
        }

        elem[i].style.top = (this.Mtop + this.yBase * Math.sin((this.currStep + i * 5) / 3) * Math.sin(550 + this.currStep / 100)) + 'px'
        elem[i].style.left = (this.Mleft + this.yBase * Math.cos((this.currStep + i * 5) / 3) * Math.sin(550 + this.currStep / 100)) + 'px'
    }

    this.currStep += this.step;

    var lui = this;

    setTimeout(function () {
        lui.Fireworks()
    }, 30);
    if (this.currStep == 220) {
        this.currStep = -10;
        for (n = 0; n < sClrs.length; n++) {
            var k = Math.round(Math.random() * n);
        }
        this.initialStarColor = sClrs[k];

        Dtop = document.documentElement.clientHeight - 250;
        Dleft = this.xBase * 3.5;
        this.Mtop = Math.round(Math.random() * Dtop);
        this.Mleft = Math.round(Math.random() * Dleft);
        var dde = (navigator.vendor) ? document.body : document.documentElement;
        this.el.style.top = (this.Mtop + dde.scrollTop) + 'px';
        this.el.style.left = (this.Mleft + dde.scrollLeft) + 'px';

        if ((this.Mtop < 20) || (this.Mleft < 20)) {
            this.Mtop += 90;
            this.Mleft += 90;
        }
    }
}


function init() {
    artifice1 = new artifice('starsDiv1');
    setTimeout(function () {
        artifice2 = new artifice('starsDiv2', 'yellow');
    }, 200);
    setTimeout(function () {
        artifice3 = new artifice('starsDiv3', 'multi');
    }, 400);
    setTimeout(function () {
        artifice4 = new artifice('starsDiv4', 'red');
    }, 600);
    setTimeout(function () {
        artifice5 = new artifice('starsDiv5', 'multi');
    }, 800);
    setTimeout(function () {
        artifice6 = new artifice('starsDiv6', 'multi');
    }, 1000);
    setTimeout(function () {
        artifice7 = new artifice('starsDiv7', 'multi');
    }, 1000);
};