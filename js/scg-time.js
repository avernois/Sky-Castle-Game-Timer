DAY_DURATION = 500;
RETRO_DURATION = 1000;
NB_ITERATIONS = 5;
NB_DAYS = 10; 
var paper;
var sound = false;

var manual = false;

function nextDay(iterations, day_left, current_iteration) {

    if (manual || day_left == (NB_DAYS -1)) {
        t = text("Démarrer le jour " + (NB_DAYS - day_left));

        t.click(
          function() {
              t.remove();
              moveCircle(iterations, day_left, current_iteration);
          }
        );
    } else {
      moveCircle(iterations, day_left, current_iteration);
    }
}


function moveCircle(iterations, day_left, current_iteration) {
    var iteration = iterations[current_iteration];
    var circles = iteration[0];
    var circle = circles[day_left];

    hideShowMark(iterations, day_left, current_iteration);

    circle.cx =  500 + day_left*30;
    circle.animate({cx: circle.cx, fill: circle.cx - 100 ? "hsb(.3, .75, .75)" : "#000", "fill-opacity": +!!(circle.cx - 100)}, DAY_DURATION, "linear", 
      function() {
          moveCircles(iterations, day_left - 1, current_iteration);
      }
    );
};


function moveCircles(iterations, day_left, current_iteration) {

    if(day_left == (NB_DAYS/2 - 1)) {
    	playGong();
        t = text("Vous avez de la chance ?");
        t.click(
            function() {
    		        playGong();
                t.remove();
                nextDay(iterations, day_left, current_iteration);
            }
        );
    } else  {
        if ( day_left < 0) { // fin d'itération
            playGong();
            retroTime(iterations, current_iteration);
        } else {
            if (day_left == (NB_DAYS - 1)) { // début d'itération
                playGong();
            } else {
                playSong();
            }
	          nextDay(iterations, day_left, current_iteration);
        }
    }
};


function retroTime(iterations, current_iteration) {

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
    circle.animate({cx: circle.cx, fill: circle.cx - 100 ? "hsb(.3, .75, .75)" : "#000", "fill-opacity": +!!(circle.cx - 100)}, RETRO_DURATION, "linear",
      function () {
          t.remove();
          playGong();
          var retro = text("Rétrospective finie.\nUne nouvelle itération va commencer.");
          retro.click(
            function() {
                retro.remove();
                marks.remove();
                if (current_iteration < NB_ITERATIONS - 1) {
                    playGong();
                    nextDay(iterations, NB_DAYS - 1,current_iteration  + 1);
                }
            }
          );
      }  
    ); 
};



function initForm () {
    paper = Raphael("scg", 800, 600);

    var iterations = paper.set();
    
  
    for (current_iteration=0; current_iteration < NB_ITERATIONS; current_iteration++) {

        var iteration = paper.set();
        var circles = paper.set();
        var marks = paper.set();
        paper.rect(50, 98 + current_iteration * 60, 720, 4); 
   
        for (day = 0; day < NB_DAYS; day++) {  
            circles.push(paper.circle(50 + 30 * day, 100 + current_iteration*60, 25));
            marks.push(timeMark(day, current_iteration));
        }
        circles.attr({fill: "#000", stroke: "#fff", "fill-opacity": 100});
  
        iteration.push(circles);
        iteration.push(marks);
 
        iterations.push(iteration); 
    }

    nextDay(iterations, NB_DAYS - 1, 0);

    soundMgmt();
};


// Time mark
function timeMark(day, iteration) {
    var marks = paper.set(); 
    marks.push(paper.rect(149 + day * 30, 95 + iteration * 60, 2 , 10).hide());
    marks.push(paper.rect(274 + day * 30, 93 + iteration * 60, 2 , 14).hide());
    marks.push(paper.rect(399 + day * 30, 95 + iteration * 60, 2 , 10).hide());
    return marks;
};


function hideShowMark(iterations, day, current_iteration) {
    if (day < NB_DAYS - 1) {
       var prevMark = iterations[current_iteration][1][day + 1];
       prevMark.hide();
    } ;
    
    var mark = iterations[current_iteration][1][day];
    mark.show();
};


//
// Sound Management
//

function playSong() {
    if (sound) {
        var song = document.getElementById('audio');
        song.play();
    } 
};

function playGong() {
    if (sound) {
        var song = document.getElementById('gong');
        song.play(); 
    }
};

function soundOnButton() {
    return paper.path(soundOnPath).attr({fill: "#000", stroke: "none"});
}

function soundOffButton() {
    return paper.path(soundOffPath).attr({fill: "#000", stroke: "none"});
}

function soundMgmt() {
    var soundOn = soundOnButton().hide();
    var soundOff = soundOffButton().hide();

    soundOn.translate(770, 575).click(
      function () {
          soundOn.hide();
          soundOff.show();
          sound = false;
      }
    );
    
    soundOff.translate(770, 575).click(
      function () {
          soundOff.hide();
          soundOn.show();
          sound = true;
      }
    );

    if (sound) {
        soundOn.show();
    } else {
        soundOff.show();
    }
}



var soundOnPath = "M4.998,12.127v7.896h4.495l6.729,5.526l0.004-18.948l-6.73,5.526H4.998z M18.806,11.219c-0.393-0.389-1.024-0.389-1.415,0.002c-0.39,0.391-0.39,1.024,0.002,1.416v-0.002c0.863,0.864,1.395,2.049,1.395,3.366c0,1.316-0.531,2.497-1.393,3.361c-0.394,0.389-0.394,1.022-0.002,1.415c0.195,0.195,0.451,0.293,0.707,0.293c0.257,0,0.513-0.098,0.708-0.293c1.222-1.22,1.98-2.915,1.979-4.776C20.788,14.136,20.027,12.439,18.806,11.219z M21.101,8.925c-0.393-0.391-1.024-0.391-1.413,0c-0.392,0.391-0.392,1.025,0,1.414c1.45,1.451,2.344,3.447,2.344,5.661c0,2.212-0.894,4.207-2.342,5.659c-0.392,0.39-0.392,1.023,0,1.414c0.195,0.195,0.451,0.293,0.708,0.293c0.256,0,0.512-0.098,0.707-0.293c1.808-1.809,2.929-4.315,2.927-7.073C24.033,13.24,22.912,10.732,21.101,8.925z M23.28,6.746c-0.393-0.391-1.025-0.389-1.414,0.002c-0.391,0.389-0.391,1.023,0.002,1.413h-0.002c2.009,2.009,3.248,4.773,3.248,7.839c0,3.063-1.239,5.828-3.246,7.838c-0.391,0.39-0.391,1.023,0.002,1.415c0.194,0.194,0.45,0.291,0.706,0.291s0.513-0.098,0.708-0.293c2.363-2.366,3.831-5.643,3.829-9.251C27.115,12.389,25.647,9.111,23.28,6.746z";
var soundOffPath = "M4.998,12.127v7.896h4.495l6.729,5.526l0.004-18.948l-6.73,5.526H4.998z";


// Utilities

function text(text) {

    var t = paper.text(400, 500, text);
    t.attr("font-size", 40);

    return t;
};