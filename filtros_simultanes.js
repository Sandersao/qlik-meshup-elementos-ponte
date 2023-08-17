/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
const prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);
const config = {
	host: window.location.hostname,
	prefix: prefix,
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};
require.config({
	baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});

require(["js/qlik"], function (qlik) {
	qlik.on("error", function (error) {
		$('#popupText').append(error.message + "<br>");
		$('#popup').fadeIn(1000);
	});
	$("#closePopup").click(function () {
		$('#popup').hide();
	});

	//callbacks -- inserted here --
	//open apps -- inserted here --
	const appOne = createAppOne(qlik, config)
	const appTwo = createAppTwo(qlik, config)

	//get objects -- inserted here --

	//create cubes and lists -- inserted here --

	//custom scripts -- insert here --
	bridgeQlikElement(
		new PonteDados(appOne, '[Claim Type]'),
		new PonteDados(appTwo, '[Claim Type]')
	)

	document.addEventListener('custom-app-clear-all', () => {
		appOne.clearAll()
		appTwo.clearAll()
	})
});

const createAppOne = (qlik, config) => {
	const app = qlik.openApp('Insurance Claims 2023.qvf', config)
	app.getObject('QV01', 'upTHf')
	return app;
}

const createAppTwo = (qlik, config) => {
	const app = qlik.openApp('Insurance Claims 2023 2.qvf', config)
	app.getObject('QV02', 'upTHf')
	return app;
}

const clearAllFilters = () => {
	const event = new Event("custom-app-clear-all");
	document.dispatchEvent(event);
}