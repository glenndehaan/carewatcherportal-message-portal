class Socket {
    constructor(server) {
        this.io = require('socket.io')(server);

        this.init();
    }

    /**
     * Init the socket connection
     */
    init() {
        this.io.on('connection', function (socket) {
            /**
             * Triggered when a socket disconnects
             */
            socket.on('disconnect', function () {
                console.log(`[SOCKET] Client disconnected! ID: ${socket.id}`);
            });

            console.log(`[SOCKET] New client connected! ID: ${socket.id}`);
        });

        /**
         * Start listening on the right port/host for the Socket.IO server
         */
        console.log('[SYSTEM] Socket.IO started !');
    }

    /**
     * Broadcasts a new message to the sockets
     *
     * @param message
     */
    broadcastNewMessage(message) {
        this.io.emit('message', {
            _id: message._id,
            id: message.id,
            roomNumber: message.roomNumber,
            client_name: message.client_name,
            title: message.title,
            message: message.message,
            prio: message.prio,
            completed: message.completed
        });
    }

    /**
     * Broadcasts a message complete to the sockets
     *
     * @param id
     */
    broadcastMessageComplete(id) {
        this.io.emit('message_complete', {
            _id: id
        });
    }
}

module.exports = Socket;
