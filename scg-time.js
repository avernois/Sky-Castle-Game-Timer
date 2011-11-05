time = 2000;
var paper;


function playSong() {
    var song = document.getElementById('audio');
    song.play(); 
};

function moveCircle(circles, i) {
    var circle = circles[i];
    circle.cx =  500 + i*30;
    circle.animate({cx: circle.cx, fill: circle.cx - 100 ? "hsb(.3, .75, .75)" : "#000", "fill-opacity": +!!(circle.cx - 100)}, time, "linear", 
      function() {
          moveCircles(circles, i - 1);
      });
};

function moveLastCircle(circles, i) {
    var circle = circles[i];
    circle.cx = 500 + i*30;
    circle.animate({cx: circle.cx, fill: circle.cx - 100 ? "hsb(.3, .75, .75)" : "#000", "fill-opacity": +!!(circle.cx - 100)}, time, "linear", 
      function() {
          playSong();
          t = paper.text(300, 100, "Rétrospective !");
          t.attr("font-size", 40);
          t.click(
            function() {
                t.remove();
            }
          );
      });
};

function moveCircles(circles, i) {
    var circle = circles[i];
   
    playSong();
   
    if(i == 10/2 - 1) {
        t = paper.text(300, 100, "Vous avez de la chance ?");
        t.attr("font-size", 40);
        t.click(
            function() {
                moveCircle(circles, i);
                t.remove();
            }
        );
    } else  {
        if ( i == 0) { // fin d'itération
            moveLastCircle(circles, i);
        } else {
            if ( i > 0) {
	        moveCircle(circles, i);
            }
        }
    }
};

function initForm () {
     paper = Raphael("scg", 800, 600);
     paper.rect(790, 590, 800, 600);
    var circles = paper.set();
   
    for (i = 0; i < 10; i++) {  
        circles.push(paper.circle(50 + 30 * i, 35, 25));
    }

    circles.attr({fill: "#000", stroke: "#fff", "fill-opacity": 100});
    moveCircles(circles, 9);
};

