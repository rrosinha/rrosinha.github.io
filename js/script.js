var canvas;
var ctx;

window.onload = init;

function init() {
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");

    ctx.font = "80pt Arial";
    ctx.fillStyle = "#black";
    //ctx.strokeStyle = "black";
    ctx.fillText("R", 0, 80);
    //ctx.strokeText("R", 0, 80);
    ctx.scale(-1, 1);
    //ctx.fillStyle = "black";
    //ctx.strokeStyle = "#aaff34";
    ctx.fillText("R", -90, 80);
    //ctx.strokeText("R", -85, 80);
}