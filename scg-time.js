day_duration = 1000;
retro_duration = 5000;
nb_iterations = 5;
nb_days = 10; 
var paper;


function playSong() {
    var song = document.getElementById('audio');
    song.play(); 
};

function playGong() {
    var song = document.getElementById('gong');
    //song.play(); 
};

function hideShowMark(iterations, i, j) {
    if (i < nb_days - 1) {
       var prevMark = iterations[j][1][i + 1];
       prevMark.hide();
    } ;
    
    var mark = iterations[j][1][i];
    mark.show();
};

function moveCircle(iterations, i, j) {
    var iteration = iterations[j];
    var circles = iteration[0];
    var circle = circles[i];

    hideShowMark(iterations, i, j);

    circle.cx =  500 + i*30;
    circle.animate({cx: circle.cx, fill: circle.cx - 100 ? "hsb(.3, .75, .75)" : "#000", "fill-opacity": +!!(circle.cx - 100)}, day_duration, "linear", 
      function() {
          moveCircles(iterations, i - 1, j);
      });
};

function text(text) {

    var t = paper.text(400, 500, text);
    t.attr("font-size", 40);

    return t;
};

function moveCircles(iterations, i, j) {

    if(i == (nb_days/2 - 1)) {
    	playGong();
        t = text("Vous avez de la chance ?");
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
            retroTime(iterations, i, j);
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


function retroTime(iterations, i, j) {

    var t = text("Rétrospective !");
    var marks = paper.set();
    var line = paper.rect(50, 423, 720, 4);
    marks.push(line);
    marks.push(paper.rect(49, 415, 2 , 20));
    marks.push(paper.rect(229, 420, 2 , 10));
    marks.push(paper.rect(409, 418, 2 , 14));
    marks.push(paper.rect(589, 420, 2 , 10));
    marks.push(paper.rect(769, 415, 2 , 20));

    var circle = paper.circle(50, 425, 25);
    marks.push(circle);
    circle.cx =  770;
    circle.animate({cx: circle.cx, fill: circle.cx - 100 ? "hsb(.3, .75, .75)" : "#000", "fill-opacity": +!!(circle.cx - 100)}, retro_duration, "linear",
      function () {
          t.remove();
          playGong();
          var retro = text("Rétrospective finie.\nUne nouvelle itération va commencer.");
          retro.click(
            function() {
                retro.remove();
                marks.remove();
                if (j < nb_iterations - 1) {
                    playGong();
                    moveCircle(iterations, nb_days - 1, j + 1);
                }
            }
          );
      }  
    ); 
};

function timeMark(day, iteration) {
    var marks = paper.set(); 
    marks.push(paper.rect(149 + day * 30, 95 + iteration * 60, 2 , 10).hide());
    marks.push(paper.rect(274 + day * 30, 93 + iteration * 60, 2 , 14).hide());
    marks.push(paper.rect(399 + day * 30, 95 + iteration * 60, 2 , 10).hide());
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
        paper.rect(50, 98 + j * 60, 720, 4); 
   
        for (i = 0; i < nb_days; i++) {  
            circles.push(paper.circle(50 + 30 * i, 100 + j*60, 25));
            marks.push(timeMark(i, j));
        }
        circles.attr({fill: "#000", stroke: "#fff", "fill-opacity": 100});
  
        iteration.push(circles);
        iteration.push(marks);
 
        iterations.push(iteration); 
    }

    var t = text("Démarrer").click(
      function() {
          moveCircles(iterations, nb_days - 1, 0);
          t.remove();
      }
    );

};

