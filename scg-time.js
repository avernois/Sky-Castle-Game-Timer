time = 20000;
nb_iterations = 5;
var paper;


function playSong() {
    var song = document.getElementById('audio');
    song.play(); 
};

function playGong() {
    var song = document.getElementById('gong');
    song.play(); 
};

function moveCircle(iterations, i, j) {
    var circles = iterations[j];
    var circle = circles[i];
    circle.cx =  500 + i*30;
    circle.animate({cx: circle.cx, fill: circle.cx - 100 ? "hsb(.3, .75, .75)" : "#000", "fill-opacity": +!!(circle.cx - 100)}, time, "linear", 
      function() {
          moveCircles(iterations, i - 1, j);
      });
};

function moveCircles(iterations, i, j) {

    if(i == 10/2 - 1) {
    	playGong();
        t = paper.text(400, 500, "Vous avez de la chance ?");
        t.attr("font-size", 40);
        t.click(
            function() {
    		playGong();
                moveCircle(iterations, i, j);
                t.remove();
            }
        );
    } else  {
        if ( i < 0) { // fin d'itération
            playGong();
            t = paper.text(400, 500, "Rétrospective !");
            t.attr("font-size", 40);
            t.click(
              function() {
                t.remove();
                if (j < nb_iterations - 1) {
                    playGong();
	            moveCircle(iterations, 9, j + 1);
                }
              }
            );
        } else {
            if (i == 9) { // début d'itération
                playGong();
            } else {
                playSong();
            }
	    moveCircle(iterations, i, j);
        }
    }
};

function initForm () {
    paper = Raphael("scg", 800, 600);
    paper.rect(790, 590, 800, 600);

    var iterations = paper.set();

  
    for (j=0; j < nb_iterations; j++) {
        var circles = paper.set();
        paper.rect(50, 98 + j * 60, 740, 4); 

   
        for (i = 0; i < 10; i++) {  
            circles.push(paper.circle(50 + 30 * i, 100 + j*60, 25));
        }
        circles.attr({fill: "#000", stroke: "#fff", "fill-opacity": 100});
        iterations.push(circles); 
    }
   
    var t = paper.text(400, 500, "Démarrer").click(
      function() {
          moveCircles(iterations, 9, 0);
          t.remove();
      }
    );
};

