var highScore =0;
var scoreEntry;
jQuery("#scoresbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(scoreEntry);
});


jQuery("#creditsbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<div>" + "Game created by Phoenix" + "</div>"
    );
});
jQuery("#helpbtn").on("click", function() {
    jQuery("#content").empty();
    jQuery("#content").append(
        "<ul>"
            + "<li>" + "Press SPACE to fly" + "</li>"
            + "<li>" + "Avoid the incoming pipes" + "</li>"
        + "</ul>"
    );
});

function regScore(score) {
  var playerName = prompt("What's your name?");
  if(score > highScore) {
    highScore = score;
    scoreEntry = "<li>" + playerName + ":v" score.toString() + "</li>";
  }
}
