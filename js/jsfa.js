var sparksAflyin = false;
var totalSparks = 0;
var sparksOn = true;

function initMouseEvents() {
(navigator.appName.substring(0,3)=="Mic") ? document.onmousedown = mouseDown : document.addEventListener("mousedown",mouseDown, false);
}

function mouseDown(e) {
var dde=(navigator.vendor) ? document.body : document.documentElement;
if (sparksOn) {
e =(!e) ? event : e;
var mousex =e.clientX + dde.scrollLeft;
var mousey =e.clientY + dde.scrollTop;
if (!sparksAflyin) {
for (var k = 0; k <= 9; k++){
SHOW("sDiv"+k);
sparksAflyin = true;
totalSparks = 0;
moveTo(k,0,mousex,mousey);
}
 }
   }
}

function moveTo(i,j, mousex, mousey){

var dde=(navigator.vendor) ? document.body : document.documentElement;

if (j < eval('anim_'+i+'_x.length') ){
var tempx = eval('anim_'+i+'_x[j]+mousex');
var tempy = eval('anim_'+i+'_y[j]+mousey');

if(navigator.appName.substring(0,5)=="Micro"){
hauteur=dde.offsetHeight
largeur=dde.offsetWidth
}
else{ 
hauteur=window.innerHeight
largeur=window.innerWidth
}

if(tempy+30 > (hauteur+dde.scrollTop)){
tempy = hauteur+dde.scrollTop-30;
}
if(tempx+30 > (largeur+dde.scrollLeft)){
tempx = largeur+dde.scrollLeft-30;
}
document.getElementById('sDiv'+i).style.left = tempx+'px';
document.getElementById('sDiv'+i).style.top  = tempy+'px';

j++;
setTimeout("moveTo("+i+","+j+","+mousex+","+mousey+")",50)
}

else {
HIDE("sDiv"+i);
totalSparks++;
}
if (totalSparks == 10) {
sparksAflyin = false;
totalSparks  = 0;
   }
}

function SHOW(divName){
document.getElementById(divName).style.visibility = "visible";;
}

function HIDE(divName){
document.getElementById(divName).style.visibility = "hidden";;
}

anim_0_x=new Array(20,20,10,0,0,0,0,0,0,0,0,0);
anim_0_y=new Array(-20,-40,-60,-80,-60,-40,-20,0,20,40,60,80);
anim_1_x=new Array(20,20,17,36,60,78,90,92,93,98,108,120,133,152,181);
anim_1_y=new Array(-20,-20,-33,-38,-38,-27,-2,25,51,84,113,141,162,212,253);
anim_2_x=new Array(20,20,2,3,4,5,6,7,8,9,10,12,13,15,18);
anim_2_y=new Array(-20,-20,-33,-38,-38,-27,-2,25,51,84,113,141,162,212,253);
anim_3_x=new Array(-20,-20,-2,-1,7,10,18,35,60,102,94,94,93,97,108,111,117,127);
anim_3_y=new Array(-20,-25,-64,-89,-104,-150,-173,-197,-213,-199,-151,-101,-66,-17,27,87,140,189);
anim_4_x=new Array(-20,-20,-10,-39,-30,-69,-64,-138,-154,-200,-181,-209,-191,-207,-203,-213,-202,-221,-211);
anim_4_y=new Array(-20,-20,-28,-51,-79,-100,-135,-154,-193,-183,-149,-134,-89,-60,8,51,107,157,201);
anim_5_x=new Array(-20,-29,-51,-72,-105,-133,-164,-189,-209,-229,-247,-270,-279,-282,-283,-283,-285,-286,-288);
anim_5_y=new Array(-20,-55,-86,-116,-154,-183,-205,-217,-217,-198,-169,-120,-44,-8,40,87,144,190,248);
anim_6_x=new Array(-20,-20,-7,14,44,79,143,186,217,226,234,244,250,259,265,274);
anim_6_y=new Array(-20,-21,-72,-113,-139,-166,-188,-181,-126,-68,-3,54,134,187,215,257);
anim_7_x=new Array(20,20,-3,-9,-13,-27,-33,-44,-54,-66,-77,-95,-107,-136,-150,-160,-164,-168,-171,-172,-172,-176,-175);
anim_7_y=new Array(-20,-26,-43,-63,-89,-116,-145,-169,-201,-222,-240,-253,-254,-245,-220,-195,-160,-124,-81,-53,-26,19,68);
anim_8_x=new Array(-20,20,-35,39,0,45,-1,24,-15,14,-20,35,-18,38,-11,16,49,64,81,93,100,103,109);
anim_8_y=new Array(-20,-20,-32,-42,-62,-76,-89,-107,-132,-147,-173,-180,-192,-209,-236,-193,-119,-73,-24,51,95,130,188);
anim_9_x=new Array(-20,-51,-89,-110,-165,-191,-228,-240,-259,-271,-277,-281,-287);
anim_9_y=new Array(-20,-20,-35,-37,-34,-16,10,47,105,150,189,227,273);







var Clrs = new Array('#ff0000','#00ff00','#000aff','#ff00ff','#ffa500','#ffff00','#00ff00','#ffffff','#fffff0');
var sClrs = new Array('#ffa500','#55ff66','#AC9DFC','#fff000','#fffff0');

function artifice(elem,coul){

if (coul=='multi'){
this.couleur='multi';
this.initialStarColor = '#ffa000';
}
else{
this.couleur='neutre';
this.initialStarColor = coul;
}
this.yBase;
this.xBase;
this.step;
this.currStep = 0;
this.Mtop = 250;
this.Mleft = 250;

var constrution=document.createElement('div');
constrution.id=elem;
constrution.style.position='absolute';

for (var i=0; i <7; i++) {
var point=document.createElement('div');
point.style.position='relative';
point.style.height=2+'px';
point.style.width=2+'px';
point.style.fontSize=2+'px';
point.style.backgroundColor=this.initialStarColor;
point.style.borderRadius=1+'px';
var point2=document.createElement('div');
point2.style.position='relative';
point2.style.height=3+'px';
point2.style.width=3+'px';
point2.style.fontSize=3+'px';
point2.style.backgroundColor=this.initialStarColor;
point2.style.borderRadius=1+'px';
constrution.appendChild(point);
constrution.appendChild(point2);
}
document.body.appendChild(constrution);

this.el=document.getElementById(elem);
this.Fireworks();
}


artifice.prototype.Fireworks=function() {

if (document.all) {
this.yBase = document.documentElement.offsetHeight / 3;
this.xBase = document.documentElement.offsetWidth / 8;
}
else {
this.yBase = window.innerHeight / 3;
this.xBase = window.innerWidth / 8;
}

var elem=this.el.getElementsByTagName("div")

this.step = 5;
for ( i = 0 ; i < elem.length ; i++ ) {
for (ai = 0; ai <Clrs.length; ai++) {
var c = Math.round(Math.random()*[ai]);
}
if (this.currStep < 90){

if (this.couleur=='multi'){
elem[i].style.backgroundColor=this.initialStarColor;
}
}
if (this.currStep > 90){

if (this.couleur=='multi'){
elem[i].style.backgroundColor=Clrs[c];
}
}
 
elem[i].style.top = (this.Mtop + this.yBase*Math.sin((this.currStep+i*5)/3)*Math.sin(550+this.currStep/100))+'px'
elem[i].style.left = (this.Mleft + this.yBase*Math.cos((this.currStep+i*5)/3)*Math.sin(550+this.currStep/100))+'px'
 }

this.currStep+= this.step;

var lui=this;

setTimeout(function() {lui.Fireworks()},30);
if (this.currStep == 220) {
this.currStep = -10;
for (n = 0; n <sClrs.length; n++) {
var k = Math.round(Math.random()*n);
}
this.initialStarColor = sClrs[k];

Dtop = document.documentElement.clientHeight - 250;
Dleft = this.xBase * 3.5;
this.Mtop = Math.round(Math.random()*Dtop);
this.Mleft = Math.round(Math.random()*Dleft);
var dde=(navigator.vendor) ? document.body : document.documentElement;
this.el.style.top = (this.Mtop+dde.scrollTop)+'px';
this.el.style.left = (this.Mleft+dde.scrollLeft)+'px';

if ((this.Mtop < 20) || (this.Mleft < 20)) {
this.Mtop += 90;
this.Mleft += 90;
 }
 }
}
onload=init


function init(){
artifice1=new artifice('starsDiv1');
setTimeout(function(){artifice2=new artifice('starsDiv2','yellow');},200);
setTimeout(function(){artifice3=new artifice('starsDiv3','multi');},400);
setTimeout(function(){artifice4=new artifice('starsDiv4','red');},600);
setTimeout(function(){artifice5=new artifice('starsDiv5','multi');},800);
setTimeout(function(){artifice6=new artifice('starsDiv6','multi');},1000);
setTimeout(function(){artifice7=new artifice('starsDiv7','multi');},1000);
};