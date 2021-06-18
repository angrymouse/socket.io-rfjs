module.exports = (io) => {
	let RF = require("remote-functions");
	let rf = new RF();
	io.rf = rf;
	io.use(async function (socket, next) {
		let client = rf.connectClient((data) =>
			socket.emit("_rfjs_server_signal", data)
		);
		socket.on("_rfjs_client_signal", (data) => {
			client.handleMessage(data);
		});
		socket.on("disconnect", client.disconnected);
		let callQueue = [];
		let callFunc = (fname, fargs) => {
			callQueue.push({ fname, fargs });
		};

		socket.rfc = new Proxy(
			{},
			{
				get(target, prop) {
					return (...fargs) => {
						callFunc(prop, fargs);
					};
				},
			}
		);
		socket.rfc.df(1);
		next();
		await client.clientReady();

		callFunc = (fname, args = []) => {
			client.rfc[fname](...args);
		};
		callQueue.forEach((functionCall) => {
			callFunc(functionCall.fname, functionCall.fargs);
		});
		callQueue = null;
	});
};
