/*
** Html5 video player
** W3Cx:  HTML5.1x HTML5 Coding Essentials and Best Practices
** Module 2 Optional Project
** Author: Ricardo Rosinha
** Date: 19/07/2017
*/

var player;
var movies;
var vm;

window.onload = init;

// Initialize variables and call functions for first use
function init() {
    player = document.querySelector("#vidPlayer");
    vm = document.getElementById("volMeter");
    vm.value = player.volume;
    movies = new Movies();

    movies.addTestMovies();
    reloadPosters();
    addImageEvents();

}

// Play pause the video and update the button lables
function playPause() {
    let btn = document.getElementById("playPause");
    if (player.paused) {
        player.play();
        btn.textContent = "Pause";
    }
    else {
        player.pause();
        btn.textContent = "Play";
    }
}

// Decrease volume and update volume slider
function volDown() {
    let vm = document.getElementById("volMeter");
    if (player.volume > 0) {
        player.volume -= 0.1;
        vm.value = player.volume;
    }
}

// Increase Volume and update volume slider
function volUp() {
    let vm = document.getElementById("volMeter");

    if (player.volume < 1) {
        player.volume += 0.1;
        vm.value = player.volume;
    }
}

// Mute/unMute the video and update buttons labels
function muteUnmute() {
    let btn = document.getElementById("muteUnmute");
    
    if (player.muted) {
        player.muted = false;
        btn.textContent = "Mute";
    }
    else {
        player.muted = true;
        btn.textContent = "UnMute";
    }
}

// Stop the video from playing
function stop() {
    let btn = document.getElementById("playPause");
    btn.textContent = "Play";
    player.currentTime = 0;
    player.pause();
}

// Add the onclick event to each poster
function addImageEvents() {
    let images = document.querySelectorAll("#posters img");
    
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener("click", function (e) {
            var elem = e.target;
            let index = elem.dataset.index;
            player.src = movies.movieList[index].movUrl;
            player.poster = movies.movieList[index].postUrl;
            player.preload = "metadata";
        })
    }
}

// This will automatically populate the section with the existing movie posters
function populatePosters() {
    let list = document.querySelector("#posters ul");
    var item = document.createElement("li");

    movies.movieList.forEach(function (current, i) {
        //var item = document.createElement("li");
        let image = document.createElement("img");
        image.src = current.postUrl;
        image.alt = current.name;
        image.dataset.index = i;
        item.appendChild(image);
        list.appendChild(item);
    });

    let addMovie = document.createElement("button");
    addMovie.id = "addMovie";
    addMovie.onclick = function () {
        let addMovSect = document.querySelector("#addMovieSec");
        //console.log("event aknowledged");
        addMovSect.style.display = "block";
        addMovSect.style.float = "left";
    }
    addMovie.textContent = "Add Movie";

    item.appendChild(addMovie);
    list.appendChild(item);
    
}

// Save the new movie entry to the collection of movies
function saveMovieToList() {
    let addMovSect = document.querySelector("#addMovieSec");
    // Get input fields values
    let fName = document.querySelector("#movName").value;
    let fMovUrl = document.querySelector("#movUrl").value;
    let fPostUrl = document.querySelector("#postUrl").value;
    let fType = document.querySelector("#movType").value;
    // create new movie
    let newMovie = new Movie(fName, fMovUrl, fPostUrl, fType);
    // add new movie to the collection
    movies.addMovie(newMovie);
    addMovSect.style.display = "none";
    reloadPosters();
    addImageEvents();
    //reset input fields
    fName.value = "";
    fMovUrl.value = "";
    fPostUrl.value = "";
    fType.value = "";
}

// After adding a new film, update the movie posters
function reloadPosters() {
    let list = document.querySelector("#posters ul");
    list.innerHTML = "";
    populatePosters();
}

/**
 * Classes that will be used in the application
 */
class Movie{
    constructor(name, movUrl, postUrl, type){
        this.name = name;
        this.movUrl = movUrl;
        this.postUrl = postUrl;
        this.type = "video/" + type;
    }
}

class Movies {
    constructor(){
        this.movieList = [];
    }

    addMovie(movie) {
        this.movieList.push(movie);
    }

    addTestMovies() {
        // To test your links, just update these variables (name, full movie url, full poster url, type)
        var movie1 = new Movie("Elephants Dream", "files/ed_1024.mp4", "files/poster-elephantsdream.jpg", "mp4");
        var movie2 = new Movie("Sintel", "files/sintel-1024-surround.mp4", "files/poster-sintel.jpg", "mp4");
        /*var movie3 = new Movie("Caminandes Llama Drama", "files/01_llama_drama_1080p.mp4", "", "mp4");*/
        var movie4 = new Movie("Caminandes Gran Dillama", "files/02_gran_dillama_1080p.mp4","files/poster-caminandes_grandillama.jpg",  "mp4");
        var movie5 = new Movie("Caminandes Llamigos", "files/03_caminandes_llamigos_1080p.mp4","files/poster-caminandes_llamigos.jpg", "mp4");

        this.addMovie(movie1);
        this.addMovie(movie2);
        /*this.addMovie(movie3);*/
        this.addMovie(movie4);
        this.addMovie(movie5);
    }
}