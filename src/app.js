
var spotify = require('spotify-node-applescript')
var google = require('google')

var currentTrack

function getSpotifyCurrentTrack(callback){
    spotify.getTrack(function(err, track){
        // Mostrar mensaje si nos se puede obtener data del track
        if(err) console.log(err)

        currentTrack = track;
        
        // If track is not of a particular track , not load
        if(isNotAlbumType(currentTrack)){
            console.log('No es un track que perteneza a un album')
            return false;
        }

        console.log(currentTrack)
        document.getElementById('currentTrack').innerText = `${currentTrack.artist} - ${currentTrack.album} - ${currentTrack.name}`
    
        callback(currentTrack)
    })
}

function getWikipediaURL(track){
    // Check if album change and load new page
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


function isNotAlbumType(currentTrack){
    return (currentTrack.disc_number == 0) ? true : false
}


// Check if song is finished or user starts a new song and load new data
var statusSongInterval =  setInterval(function(){
    spotify.getState(function(err, state){
        if(err) console.log(err)

        var cleanDuration = String(currentTrack.duration).slice(0, 3)
        cleanDuration = Number(cleanDuration)

    
        var cleanPosition = String(state.position).slice(0, 3)
        cleanPosition = Number(cleanPosition)

        console.log(cleanDuration)
        console.log(cleanPosition)

        // The user starts a new song , load data ( TODO check if is necesary to do this) 
        if(cleanPosition == 0 || cleanPosition == 1){
            console.log('stars a new song')
            getSpotifyCurrentTrack(getWikipediaURL)
        }else{
            if(cleanPosition >= cleanDuration - 2){
                getSpotifyCurrentTrack(getWikipediaURL)
            }
        }
    });
}, 1000)




function init(){
    getSpotifyCurrentTrack(getWikipediaURL)
}


init()

