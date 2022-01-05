

const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    }
})


let users = []

const addUser = (userId, socketId) => {
    console.log(socketId + " from con");
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId })


}

const removeUser = (socketId) => {
    console.log(socketId + " from dis");
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {

    return users.find(user => user.userId === userId)
}
console.log(users);
io.on("connection", (socket) => {
    //connect

    socket.on("addUser", (userId) => {
        console.log("connect");
        addUser(userId, socket.id)
        io.emit("getUser", users)
    })


    //send and get message
    socket.on("sendMessage", ({ userId, receiverId, text }) => {

        const user = getUser(receiverId)
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                userId, text

            })
        }

    })

    //disconnect
    socket.on("disconnect", () => {
        console.log('someone discconnect');
        removeUser(socket.id);
        io.emit("getUser", users)
    })

})