time = 3000;
var paper;

function moveCircle(circles, i) {
    var circle = circles[i];
    var song = document.getElementById('audio');
    song.play(); 
    if(i == 10/2 - 1) {
        t = paper.text(100, 100, "Vous avez de la chance ?");
        t.attr("font-size", 40);
        t.click(
            function() {
            circle.cx = 300 + i*30;
            circle.animate({cx: circle.cx, fill: circle.cx - 100 ? "hsb(.3, .75, .75)" : "#000", "fill-opacity": +!!(circle.cx - 100)}, time, "linear", 
                function() {
                    moveCircle(circles, i - 1);
                });
            t.remove();
            }
        );
        
    } else {
        if ( i >= 0) {
            circle.cx = 300 + i*30;
            circle.animate({cx: circle.cx, fill: circle.cx - 100 ? "hsb(.3, .75, .75)" : "#000", "fill-opacity": +!!(circle.cx - 100)}, time, "linear", 
                function() {
                    moveCircle(circles, i - 1);
                });
        }
    }
};

function initForm () {
     paper = Raphael("sample-1", 800, 600);

    var circles = paper.set();
   
    for (i = 0; i < 10; i++) {  
        circles.push(paper.circle(50 + 30 * i, 35, 25));
    }

    circles.attr({fill: "#000", stroke: "#fff", "fill-opacity": 100});
    moveCircle(circles, 9);
};

