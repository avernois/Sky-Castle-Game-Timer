time = 1000;
nb_iterations = 5;
nb_days = 10; 
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
    var iteration = iterations[j];
    var circles = iteration[0];
    var circle = circles[i];


    if (i < nb_days - 1) {
       var prevMark = iterations[j][1][i + 1];
       prevMark.hide();
    } ;
    
    var mark = iterations[j][1][i];
    mark.show();

    circle.cx =  500 + i*30;
    circle.animate({cx: circle.cx, fill: circle.cx - 100 ? "hsb(.3, .75, .75)" : "#000", "fill-opacity": +!!(circle.cx - 100)}, time, "linear", 
      function() {
          moveCircles(iterations, i - 1, j);
      });
};

function moveCircles(iterations, i, j) {

    if(i == (nb_days/2 - 1)) {
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
	            moveCircle(iterations, nb_days - 1, j + 1);
                }
              }
            );
        } else {
            if (i == (nb_days - 1)) { // début d'itération
                playGong();
            } else {
                playSong();
            }
	    moveCircle(iterations, i, j);
        }
    }
};

function timeMark(day, iteration) {
    var marks = paper.set(); 
    marks.push(paper.rect(124 + day * 30, 95 + iteration * 60, 2 , 10).hide());
    marks.push(paper.rect(249 + day * 30, 93 + iteration * 60, 2 , 14).hide());
    marks.push(paper.rect(374 + day * 30, 95 + iteration * 60, 2 , 10).hide());
    return marks;
};


function initForm () {
    paper = Raphael("scg", 800, 600);
    paper.rect(790, 590, 10, 10);

    var iterations = paper.set();
    
  
    for (j=0; j < nb_iterations; j++) {

        var iteration = paper.set();
        var circles = paper.set();
        var marks = paper.set();
        paper.rect(50, 98 + j * 60, 740, 4); 
   
        for (i = 0; i < 10; i++) {  
            circles.push(paper.circle(50 + 30 * i, 100 + j*60, 25));
            marks.push(timeMark(i, j));
        }
        circles.attr({fill: "#000", stroke: "#fff", "fill-opacity": 100});
  
        iteration.push(circles);
        iteration.push(marks);
 
        iterations.push(iteration); 
    }

    var t = paper.text(400, 500, "Démarrer").click(
      function() {
          moveCircles(iterations, nb_days - 1, 0);
          t.remove();
      }
    );
};

