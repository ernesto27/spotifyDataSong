
var spotify = require('spotify-node-applescript')
var google = require('google')



function getSpotifyCurrentTrack(callback){
    spotify.getTrack(function(err, track){
        // Mostrar mensaje si nos se puede obtener data del track
        if(err) console.log(err)
        
        console.log(track)
        document.getElementById('currentTrack').innerText = `${track.artist} - ${track.album} - ${track.name}`
    
        callback(track)
    })
}

function getWikipediaURL(track){
    google.resultsPerPage = 1
    let iframeLink;

    google(`${track.artist} ${track.album} wikipedia`, function (err, res){
        if (err) console.error(err)

        let firstResponse = res.links[0];
        iframeLink = firstResponse.link;
        console.log(iframeLink)

        document.getElementById('iframe').src = iframeLink
    })
}


function init(){
    getSpotifyCurrentTrack(getWikipediaURL)
}


init()

