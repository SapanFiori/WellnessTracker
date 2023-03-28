/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ns01/moody/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
