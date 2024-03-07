const chokidar = require('chokidar');
const io = require('socket.io-client');
const socket = io.connect('https://coursey-gpt-backend.herokuapp.com');

const fileWatcher = chokidar.watch('.');

fileWatcher.on('change', (path) => {
  if (path === 'resultz.json') {
    socket.emit('projectUpdate', { sId: "N2cB_XdyPOCcouvCAAYt" ,type: 'RESULT' });
  } else {
    socket.emit('projectUpdate', { sId: "N2cB_XdyPOCcouvCAAYt" ,type: 'FILE', path });
  }
});
