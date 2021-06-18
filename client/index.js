module.exports = async (socket, functions = []) => {
	let RFM = require("remote-functions/client").default;
	socket.rf = new RFM(functions);
	socket.on("_rfjs_server_signal", (d) => {
		socket.rf.RFMessageReceived(d);
	});

	await socket.rf.RFPrepare((d) => {
		socket.emit("_rfjs_client_signal", d);
	});
};
