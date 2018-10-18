
var spotify = require('spotify-node-applescript')

spotify.getTrack(function(err, track){
    // Mostrar mensaje si nos se puede obtener data del track
    if(err) console.log(err)
    
    console.log(track)
    document.getElementById('currentTrack').innerText = `${track.artist} - ${track.album} - ${track.name}`

})


