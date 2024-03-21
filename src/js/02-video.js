import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_VIDEO_TIME="videoplayer-current-time";

const vimeoPlayer=document.querySelector('#vimeo-player');

const player = new Player(vimeoPlayer);

 function onPlay (data) {
       localStorage.setItem(CURRENT_VIDEO_TIME, data.seconds)
       console.log(data);
       if (data.percent === 1) {
        localStorage.removeItem(CURRENT_VIDEO_TIME);
        console.log('remove CURRENT_VIDEO_TIME');
       }
};

player.on('timeupdate', throttle(onPlay,1000));



const playerCurrentTime= localStorage.getItem(CURRENT_VIDEO_TIME);
if (playerCurrentTime) {
    player.setCurrentTime(playerCurrentTime).then(function(seconds) {
        console.log('the actual time that the player seeked to:',seconds);
    }).catch(function(error) {
        switch (error.name) {
            case 'RangeError':
                console.log('the time was less than 0 or greater than the video’s duration');// the time was less than 0 or greater than the video’s duration
                break;
    
            default:
                console.log('some other error occurred');
                break;
        }
    });
}

