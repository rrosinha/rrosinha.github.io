/**
 * 
 * Classes that will be used in this application
 * 
 */

// Create a class that represents an image
class Poster{
    constructor(url, desc, dataindex){
        this.url = url;
        this.desc = desc;
        this.dataindex = dataindex;
    }
}

// This Class represents a source for the video element
class Source{
    constructor(url, type){
        this.url = url;
        this.type = type;
    }
}

// This Class represents a track for the video element
class Track{
    constructor(url, kind, label, srclang){
        this.url = url;
        this.kind = kind;
        this.label = label;
        this.srclang = srclang;
    }
}

// This class represents the video element
class Video{
    constructor(id, name){
        this.dataindex = id;
        this.name = name;
        this.sources = [];
        this.tracks = [];
    }
    // add's a source to a video
    addSource(source){
        this.sources.push(source);
    }
    // add's a track to a video
    addTrack(track){
        this.tracks.push(track);
    }
}

// This class represents a video collection
class VideoColection{
    constructor(){
        this.videos = [];
    }
    // add's a video to the collection
    addVideo(video){
        this.videos.push(video);
    }
}

// Variables that will be used in the application
var posters = [];
var videoC = new VideoColection();
window.onload = init;

function init(){
    createPosters();
    populatePosters(posters);
    createVideoCollection();
    /* console.log(videoC.videos.length);
    for (var i = 0; videoC.videos.length; i++){
        var vd = videoC.videos[i];
        console.log("id: " + vd.dataindex + " Name: " + vd.name + " Sources: " + vd.sources.length + " Tracks: " + vd.tracks.length);
    } */

}

// Create poster for movies
function createPosters(){
    // create individual poster instance
    var poster0 = new Poster(
        "https://www.blender.org/wp-content/uploads/2013/07/poster-elephantsdream.jpg?x83513",
        "Elephants Dream", 0);
    var poster1 = new Poster("https://www.blender.org/wp-content/uploads/2013/07/poster-tearsofsteel.jpg?x83513",
        "Tears of Steel", 1);
    var poster2 = new Poster("https://www.blender.org/wp-content/uploads/2013/07/poster-sintel.jpg?x83513",
        "Sintel", 2);
    // add the poster the posters array
    posters.push(poster0);
    posters.push(poster1);
    posters.push(poster2);
}

// populate the posters section
function populatePosters(images){
    //console.log("Function populatePosters called");
    var posterSec = document.querySelector("#posters")
    images.forEach(function(element, i, arr) {
        var image = document.createElement("img");
        image.src = element.url;
        image.alt = element.desc;
        image.width = 150;
        image.dataset.index = element.dataindex;
        image.onclick = loadSelectedVideo;
        posterSec.appendChild(image);
    }, this);
}

// Create videos and add them to the colection
function createVideoCollection(){
    // Add Elephants Dream video
    var source0 = new Source("https://mainline.i3s.unice.fr/mooc/elephants-dream-medium.mp4", "video/mp4");
    var source1 = new Source("https://mainline.i3s.unice.fr/mooc/elephants-dream-medium.webm", "video/webm");
    var track0 = new Track("https://mainline.i3s.unice.fr/mooc/elephants-dream-subtitles-en.vtt", "subtitles", "English subtitles", "en");
    var track1 = new Track( "https://mainline.i3s.unice.fr/mooc/elephants-dream-subtitles-de.vtt", "subtitles", "Deutsch subtitles", "de");
    var track2 = new Track("https://mainline.i3s.unice.fr/mooc/elephants-dream-chapters-en.vtt", "chapters", "English chapters", "en");
    var videoObj0 = new Video(0, "Elephants Dream");
    videoObj0.addSource(source0);
    videoObj0.addSource(source1);
    videoObj0.addTrack(track0);
    videoObj0.addTrack(track1);
    videoObj0.addTrack(track2);
    videoC.addVideo(videoObj0);
    // Add Tears of Steel video
    source0 = new Source("http://media.xiph.org/mango/tears_of_steel_1080p.webm", "video/webm");
    track0 = new Track("TOS-en.vtt", "subtitles", "English", "en")
    track1 = new Track("TOS-fr.vtt", "subtitles", "French", "fr")
    videoObj0 = new Video(1, "Tears of Steel");
    videoObj0.addSource(source0);
    videoObj0.addTrack(track0);
    videoObj0.addTrack(track1);
    videoC.addVideo(videoObj0);
    // Add Sintel Video
    source0 = new Source("http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4", "video/mp4");
    track0 = new Track("sintel_en.vtt", "subtitles", "English", "en")
    track1 = new Track("sintel_fr.vtt", "subtitles", "French", "fr")
    videoObj0 = new Video(2, "Sintel");
    videoObj0.addSource(source0);
    videoObj0.addTrack(track0);
    videoObj0.addTrack(track1);
    videoC.addVideo(videoObj0);
}

// This function will load the slected video to the player section
function loadSelectedVideo(evt){
    
    var e = evt.target.dataset.index;
    var currentMovie = videoC.videos[e];
    var player = document.querySelector("#player");
    var vElement = document.createElement("video");
    player.innerHTML = ""
    // Lets start adding properties, sources and tracks to the video element
    // Add Sources
    for (var i = 0; i < currentMovie.sources.length; i++){
        var vSource = document.createElement("source");
        //console.log(i);
        vSource.src = currentMovie.sources[i].url;
        //console.log(currentMovie.sources[i].url);
        vSource.type = currentMovie.sources[i].type;
        //console.log(currentMovie.sources[i].type);
        vElement.appendChild(vSource);
    }
    // Add Tracks
    for (var i = 0; i < currentMovie.tracks.length; i++){
        var vTrack = document.createElement("track");
        //console.log(i);
        vTrack.src = currentMovie.tracks[i].url;
        //console.log(currentMovie.tracks[i].url);
        vTrack.kind = currentMovie.tracks[i].kind;
        //console.log(currentMovie.tracks[i].kind);
        vTrack.label = currentMovie.tracks[i].label;
        //console.log(currentMovie.tracks[i].label);
        vElement.appendChild(vTrack);
    }
    // Add properties and Append the video element to the player section
    vElement.width = "720";
    vElement.controls = true;
    vElement.crossOrigin = "anonymous";
    vElement.preload= "metadata";
    // Wait for video to have data before calling the function
    vElement.addEventListener("loadeddata", function(){
        loadVideoInformation(currentMovie);
    });
    player.appendChild(vElement);
    
}

function loadVideoInformation(video){
    // get the div where to display the movie information
    var videoInfo = document.querySelector("#movieInfo");
    // get the video element
    var vd = document.querySelector("video");
    // get all sources for the video element
    var htmlSources = document.querySelectorAll("source");
    // get all tracks for the video element
    var htmlTracks = document.querySelectorAll("track");
    // get tracks from the textTrack object
    var videoTracks = vd.textTracks;
    
    // Start displaying the video information
    videoInfo.innerHTML = "<h2>Selected Video Information</h2>";
    videoInfo.innerHTML += "<p>Name: " + video.name + "</p>";
    videoInfo.innerHTML += "<p>Sources: " + video.sources.length + "</p>";
    videoInfo.innerHTML += "<p>Tracks: " + video.tracks.length + "</p>";
    videoInfo.innerHTML +="<p>Ready State: " + vd.readyState + "</p>"
    videoInfo.innerHTML += "<br><hr><br>";
    videoInfo.innerHTML += "<h3>Sources Information</h3>";
    for (var i = 0; i < htmlSources.length; i++){
        videoInfo.innerHTML += "<p>index: " + i + "</p>";
        videoInfo.innerHTML += "<p>Source: " + htmlSources[i].src + "</p>";
        videoInfo.innerHTML += "<p>type: " + htmlSources[i].type + "</p><br>";
    }
    videoInfo.innerHTML += "<br><hr><br>";
    videoInfo.innerHTML += "<h3>Tracks Information</h3>";
    for (var i = 0; i<video.tracks.length; i++){
        videoInfo.innerHTML += "<p>index: " + i + "</p>";
        videoInfo.innerHTML += "<p>Url: " + htmlTracks[i].src + "</p>";
        videoInfo.innerHTML += "<p>Kind: " + htmlTracks[i].kind + "</p>";
        videoInfo.innerHTML += "<p>Label: " + htmlTracks[i].label + "</p>";
        videoInfo.innerHTML += "<p>ReadyState: " + htmlTracks[i].readyState + "</p>";
        videoInfo.innerHTML += "<p>Mode: " + videoTracks[i].mode + "</p><br>";
    }
    
}
