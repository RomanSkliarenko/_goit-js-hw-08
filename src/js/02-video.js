import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const player = new Player(document.querySelector('iframe'));
player.setCurrentTime(+localStorage.getItem("videoplayer-current-time"))

player.on('timeupdate', throttle(({seconds})=>{
  localStorage.setItem("videoplayer-current-time", seconds);
},1000));

