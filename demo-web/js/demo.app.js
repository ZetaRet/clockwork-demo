var web, app, zcl, stage, interc, mousec, keybc, pagech, menu, globalmat, menublend, menubgalpha, lowq;

web = ZetaRet_WebCore(document, {
	oW: 1920,
	oH: 1080,
	tI: 10,
	bodyInitCN: "",
	init: oninit,
	delay: 0,
	onCreate: ZRWC_oncreate
});

function init() {
	app = new zetaret.global.packages.clockwork.data.AppData();
	app.debug = true;
	if (app.debug) console.log(app);
	app.initCapabilities();
	lowq = app.capabilities.lowq;
	app.detectEnvironment();
	app.initClockwork();
	zcl = app.zcl;
	zetaret.global.packages.clockwork.stacks.ClockworkTier0Init.init(zcl, window);
	web.de(web.doc, "clockwork_init");
	app.initClasses(zetaret.global.packages.clockwork.stacks.ClockworkTier0.getList());
	if (zcl.useXeltoSS) web.de(web.doc, "xeltoss_init");
	app.initStage();
	stage = app.stage;
	app.initInteraction();
	mousec = app.mousec;
	keybc = app.keybc;
	interc = app.interc;
	initApp();
}

function initApp() {
	web.de(web.doc, "initApp");
}

function oninit() {
	init();
}

function ZRWC_oncreate() {}

document.addEventListener('initApp', initApp_index);

function initApp_index(e) {
	var root = stage.root;
	var cc = stage.renderer;

	var initcontainer = new zetaret.global.packages.clockwork.ui.DisplayObjectContainer();
	initcontainer.name = "initcontainer";
	var menucontainer = new zetaret.global.packages.clockwork.ui.DisplayObjectContainer();
	menucontainer.name = "menucontainer";
	var pagecontainer = new zetaret.global.packages.clockwork.ui.DisplayObjectContainer();
	pagecontainer.name = "pagecontainer";
	pagech = new zetaret.global.packages.clockwork.controllers.PageController(pagecontainer, ['home', 'misc', 'game']);
	pagech.pagePackage = "zetaret.global.examples.ui.pages";

	root.addChild(initcontainer);
	root.addChild(pagecontainer);
	root.addChild(menucontainer);

	console.log(pagech);

	var btn = new zetaret.global.packages.clockwork.ui.Button();
	console.log(btn);
	btn.addEventListener("over", function(e, t) {
		console.log(e, t);
	});
	btn.addEventListener("out", function(e, t) {
		console.log(e, t);
	});
	btn.addEventListener("click", function(e, t) {
		console.log(e, t);
		e.nativeEvent.preventDefault();
		if (root.target.alpha == 1) {
			root.target.colortransform[1] = 0;
			root.target.colortransform[2] = 0;
			root.target.colortransform[4] = 500;
			root.target.colortransform[5] = -500;
			root.target.colortransform[6] = -500;
			root.target.alpha = 0.4;
		} else {
			root.target.colortransform[1] = 1;
			root.target.colortransform[2] = 1;
			root.target.colortransform[4] = 0;
			root.target.colortransform[5] = 0;
			root.target.colortransform[6] = 0;
			root.target.alpha = 1;
		}

		stage.invalidate = true;
	});

	var btnview = document.getElementById("nav1btn");
	var domm = new zetaret.global.packages.clockwork.mediators.DOMMediator(btn, btnview);
	domm.eventize("mouseover", zetaret.global.packages.clockwork.ui.Button.OVER, zetaret.global.packages.clockwork.events.MouseEvent, "over");
	domm.eventize("mouseout", zetaret.global.packages.clockwork.ui.Button.OUT, zetaret.global.packages.clockwork.events.MouseEvent, "out");
	domm.eventize("click", zetaret.global.packages.clockwork.ui.Button.CLICK, zetaret.global.packages.clockwork.events.MouseEvent, "click");

	document.getElementById("nav2btn").addEventListener("click", function(e) {
		e.preventDefault();

		if (root.target.sx === 1) {
			root.target.x = 10;
			root.target.y = 2;
			root.target.setScaleX(0.8);
			root.target.setRotation(2);
		} else {
			root.target.x = 0;
			root.target.y = 0;
			root.target.setScaleX(1);
			root.target.setRotation(0);
		}
		root.target.invalidateTransform = true;
		stage.invalidate = true;

		return true;
	});

	document.getElementById('nav3btn').addEventListener("click", function(e) {
		e.preventDefault();

		if (interc.drawDebug) {
			try {
				stage.htmlContainer.removeChild(interc.interactiveContext.canvas);
			} catch (e) {}
			interc.drawDebug = false;
		} else {
			stage.htmlContainer.appendChild(interc.interactiveContext.canvas);
			interc.drawDebug = true;
		}

		return true;
	});

	document.getElementById('material-select').addEventListener("change", function(e) {
		e.preventDefault();
		globalmat = "pat" + e.currentTarget.value;
		sh4.graphics.clear();
		drawSh4(sh4.graphics._offset || 0);
		var g = btnc.children[0].graphics;
		g.commands[0].bitmapData = globalmat;
		g.clearGraphicsData().clearCache();
		var btns = ["home", "misc", "game"],
			i;
		for (i = 0; i < btns.length; i++) {
			g = mainmenu.getChildByName(btns[i]).children[0].graphics;
			g.commands[0].bitmapData = globalmat;
			g.clearGraphicsData().clearCache();
		}
		mainmenu.cacheRedraw = true;
		stage.invalidate = true;
		return true;
	});

	document.getElementById('blend-select').addEventListener("change", function(e) {
		e.preventDefault();
		menublend = e.currentTarget.value;
		var btns = ["home", "misc", "game"],
			i, btn;
		for (i = 0; i < btns.length; i++) {
			btn = mainmenu.getChildByName(btns[i]);
			btn.blend = menublend;
		}
		mainmenu.cacheRedraw = true;
		stage.invalidate = true;
		return true;
	});

	document.getElementById('menualpha').addEventListener("change", function(e) {
		e.preventDefault();
		menubgalpha = e.currentTarget.value == '0' ? false : true;
		return true;
	});

	var ea = [];
	globalmat = "pat0";
	menublend = "luminosity";
	var sh = new zetaret.global.packages.clockwork.ui.Shape();
	sh.resetGraphics();
	sh.graphics.direct = false;
	sh.graphics.cachedIntArray = [3, 30, 0xff000000, 1, 5, 20, 200, 0, 100, 100, 5, 20, 200, 200, 100, 100, 1, 0];
	var sh2 = new zetaret.global.packages.clockwork.ui.Shape();
	sh2.resetGraphics();
	sh2.colortransform[3] = 0.7;
	sh2.skipalpha = true;
	sh2.graphics.cachedDirect = [
		"setFillStyle", [0xffff0000, 1],
		"fillRect", [0, 0, 99, 99],
		"setTextStyle", [0xffffffff, "26px Arial", 1],
		"fillText", ["Hello", 300, 300],
		"setShadowStyle", ["#333", 5, 3, 3],
		"transform", [Math.cos(12 * Math.PI / 180) * 1.1, Math.sin(12 * Math.PI / 180) + 0.2, -Math.sin(12 * Math.PI / 180), Math.cos(12 * Math.PI / 180) * 0.6, 10, 10],
		"beginPath", ea,
		"arc", [400, 50, 30, 0, Math.PI * 2],
		"moveTo", [500, 100],
		"lineTo", [530, 90],
		"lineTo", [540, 130],
		"bezierCurveTo", [540, 130, 410, 280, 480, 150],
		"lineTo", [500, 100],
		"fill", ea,
		"setLineStyle", [0xffff0000, 1, 1, 0, 0, 0, 0],
		"stroke", ea,
		"closePath", ea,
		"clearReset", ea
	];
	var sh3 = new zetaret.global.packages.clockwork.ui.Shape();
	sh3.resetGraphics();
	sh3.skipalpha = true;
	sh3.graphics.cachedDirect = [
		"setTextStyle", ["#333", "26px Arial", 1, true],
		"strokeText", ["Stroked", 300, 325],
		"setLineDash", [
			[12, 3]
		],
		"setLineStyle", ["#0000ff", 0.4, 8, 0, "bevel", 0, 0],
		"strokeRect", [21, 220, 49, 49],
		"setLineDash", [ea],
		"setLineStyle", ["#ff00ff", 1, 2, 0, 0, 0, 0],
		"strokeRect", [31, 230, 29, 29],
		"setLinearGradientStyle", [
			[31, 0, 60, 0],
			[
				[0, "#fff"],
				[1, 0xffaa00]
			], 1, false, true
		],
		"fillRect", [31, 230, 29, 29],
		"translate", [10, -10],
		"rotate", [-30 * Math.PI / 180],
		"scale", [3, 1.3],
		"setRadialGradientStyle", [
			[150, 250, 0, 150, 250, 20],
			[
				[0, 0x0000ff],
				[1, "black"]
			], 1
		],
		"fillRect", [140, 240, 20, 20],
		"closePath", ea,
		"clearReset", ea
	];
	var sh4 = new zetaret.global.packages.clockwork.ui.Shape();
	sh4.resetGraphics();
	sh4.graphics.enableGradientCache("gradient_sh4");
	var mask = new zetaret.global.packages.clockwork.ui.Shape();
	mask.resetGraphics();
	mask.graphics.drawRect(400, 200, 300, 100);
	var orm = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix(),
		rm;

	function drawSh4(offset) {
		sh4.graphics._offset = offset;
		rm = orm.rotate(offset).translate(10 + offset, 10 + offset * 0.2);
		sh4.graphics.drawRadient(100, -120, 90, [0x00ff00, 0x00ffff, 0xff0000, 0xffff00, 0xff00ff], 12, 50, offset)
			.textStyle("#333", "16px Arial", 1).text("ZetAd", 0, -100)
			.beginBitmapFill(globalmat, rm).updateLastCommand({
				imgid: globalmat + 'svgpat'
			})
			.drawRoundRect(0, 0, 280, 120, 8, 8, 8, 8)
			.endFill()
			.beginGradientFill("radial", [350, 15, 0, 350, 15, 50], [0x0000ff, "black"], null, [0, 1])
			.drawEllipse(300, 0, 100, 30)
			.endFill()
			.beginFill(0xffffff00, 1)
			.lineStyle(2, 0xffff0000)
			.drawCircle(430, 15, 15)
			.drawRect(455, 0, 20, 10);
		sh4.cacheRedraw = true;
	}
	drawSh4(0);
	sh4.x = 400;
	sh4.y = 300;
	sh4.notransform = true;
	sh4.cacheLevel = "sh4";
	sh4.drag(null, null, null, function(ix, iy, ddx, ddy, ds) {
		this.moveTo(ix + ddx, iy + ddy);
		this.cacheRedraw = true;
	});
	var twt;
	sh4.addEventListener('wheel', function(e, s) {
		e.preventDefault();
		var t = e.nativeEvent.deltaY / 100;
		if (Math.abs(t) < 1) t = t < 0 ? -1 : 1;
		var id = web.animation.tweens.indexOf(twt),
			to = sh4.graphics._offset;
		if (id !== -1) {
			web.animation.tweens.splice(id, 1);
			to = twt.tp.radialoffset;
		}
		twt = web.animate([sh4], {
			radialoffset: to + 20 * t
		}, {
			applyv: 1,
			time: 250,
			ease: "OutQuint",
			ur: 1,
			updatev: true,
			updaten: "invalidateTransform",
			pluginset: {
				radialoffset: sh4.graphics._offset
			},
			plugin: {
				radialoffset: radialoffsetplugin
			}
		});

		stage.invalidate = true;
	});
	console.log(sh4);
	console.log(sh);

	initcontainer.addChild(sh4);
	initcontainer.addChild(mask);
	initcontainer.addChild(sh3);
	initcontainer.addChild(sh2);
	initcontainer.addChild(sh);
	sh3.x = 45;
	sh2.x = 20;
	sh.setScaleY(0.8);
	sh.setRotation(-2);
	sh.x = 20;
	root.target.invalidateTransform = true;
	sh.invalidateTransform = true;
	sh2.invalidateTransform = true;
	sh3.invalidateTransform = true;
	sh4.invalidateTransform = true;

	for (var pati = 0; pati < 10; pati++) cc.context.cacheAsset("pat" + pati, document.getElementById("pat" + pati));

	var c = 0,
		fpsel = document.getElementById("fps");
	setInterval(function() {
		if (fpsv !== c) {
			fpsv = c;
			fpsel.innerHTML = fpsv + "fps";
		}
		c = 0;
	}, 1000);
	var fpsv = 0;
	web.animation.timeScale = 1;
	app.mouseEvent = new zetaret.global.packages.clockwork.events.MouseEvent();
	web.ael(web.doc, "animate_update", function() {
		if (web.animation.tweens.length > 0 || stage.invalidate) {
			web.de(web.doc, "before_render");
			stage.clearStage();
			stage.renderStage();
			web.de(web.doc, "after_render");
			mousec.remouse(app.mouseEvent);
		}
		c++;
	});
	var initred = sh.colortransform[4];

	function ctredplugin(vv, timePercent, el, p, ap, cpV, tpV) {
		el.colortransform[4] = vv;
		el.colortransform[5] = vv * 0.5;
	}
	var animestate = 0;
	if (animestate >= 0) web.animate([sh], {
		x: 150,
		sx: 1.2,
		rx: 15 * Math.PI / 180,
		ry: 15 * Math.PI / 180,
		ctred: 255
	}, {
		applyv: 1,
		time: 1500,
		ease: "InOutQuint",
		ur: 1,
		updatev: true,
		updaten: "invalidateTransform",
		pluginset: {
			ctred: initred
		},
		plugin: {
			ctred: ctredplugin
		}
	}).wait(1000).to({
		x: 20,
		sx: 1,
		rx: 0,
		ry: 0,
		ctred: 0
	}, {
		applyv: 1,
		time: 1500,
		ease: "InOutQuint",
		ur: 1,
		updatev: true,
		updaten: "invalidateTransform",
		pluginset: {
			ctred: 255
		},
		plugin: {
			ctred: ctredplugin
		}
	}).wait(1000, function(e, p, ap) {
		if (animestate >= 1)
			ap.cqi = -1;
	});

	var initradialoffset = 0;

	function radialoffsetplugin(vv, timePercent, el, p, ap, cpV, tpV) {
		el.graphics.clear();
		drawSh4(vv);
	}
	if (animestate >= 0) web.animate([sh4], {
		rx: 15 * Math.PI / 180,
		ry: 15 * Math.PI / 180,
		radialoffset: 30
	}, {
		applyv: 1,
		time: 1500,
		ease: "InOutQuint",
		ur: 1,
		updatev: true,
		updaten: "invalidateTransform",
		pluginset: {
			radialoffset: initradialoffset
		},
		plugin: {
			radialoffset: radialoffsetplugin
		}
	}).wait(500).to({
		rx: 0 * Math.PI / 180,
		ry: 0 * Math.PI / 180,
		radialoffset: 360
	}, {
		applyv: 1,
		time: 1500,
		ease: "InOutQuint",
		ur: 1,
		updatev: true,
		updaten: "invalidateTransform",
		pluginset: {
			radialoffset: 30
		},
		plugin: {
			radialoffset: radialoffsetplugin
		}
	}).wait(500, function(e, p, ap) {
		if (animestate >= 1)
			ap.cqi = -1;
	});

	var btnc = new zetaret.global.packages.clockwork.ui.ButtonContainer();
	initcontainer.addChild(btnc);
	btnc.buttonMode().setInteraction();
	btnc.addButtonShape().graphics.beginBitmapFill(globalmat)
		.drawRoundRect(0, 0, 150, 45, 8, 8, 8, 8)
		.endFill();
	btnc.drag();
	btnc.name = "dragbtn";

	var tf = new zetaret.global.packages.clockwork.ui.TextField();
	initcontainer.addChild(tf);
	tf.setText("Zeta Ret Clockwork").setStyle({
		color: "#0038b8",
		font: "18px Arial",
		width: 800,
		y: 26
	}).renderText();

	var mainmenu = new zetaret.global.examples.ui.menu.index_menu(mousec);
	menucontainer.autochild = false;
	menucontainer.addChild(mainmenu);

	function onPageChange(e, s) {
		pagech.ShowPage(e.target.name);
		stage.invalidate = true;
	}

	function drawMainMenuBg(color) {
		mainmenu.bg._menucolor = color;
		mainmenu.bg.graphics.clear().beginFill(color).drawRoundRect(0, 0, 2 * mainmenu.xoffset + mainmenu.btnsize * 3 + 2 * mainmenu.btnpad, 65, 9, 9, 9, 9);
	}
	mainmenu.setBackground();
	drawMainMenuBg(0x883377cc);
	mainmenu.addbtn("home", onPageChange);
	mainmenu.addbtn("misc", onPageChange);
	mainmenu.addbtn("game", onPageChange);
	mainmenu.arrange();
	mainmenu.x = 5;
	mainmenu.y = 430;
	mainmenu.invalidateTransform = true;
	mainmenu.cacheBox = true;
	mainmenu.cacheLevel = "mainmenu";
	mainmenu.cacheRedraw = true;

	initcontainer.autochild = true;

	stage.resetStage();

	interc.setInteractID(sh4, {
		mouseEnabled: true,
		mouseChildren: true
	});
	sh4.addEventListener("click", function(e, s) {
		console.log(e, s);
		var px = stage.renderer.context.getImageData(e.ox, e.oy, 1, 1);
		drawMainMenuBg(zetaret.global.packages.clockwork.color.utils.ColorUtil.FromARGB(menubgalpha ? 0xff : 0x88, px.data[0], px.data[1], px.data[2]));
		mainmenu.cacheRedraw = true;
		stage.invalidate = true;
	});
	btnc.addEventListener("mouseover", function(e, s) {
		keybc.setKeyboardFocus(btnc, true);
		console.log(e.type, e);
	});
	btnc.addEventListener("mouseout", function(e, s) {
		keybc.setKeyboardFocus(btnc, false);
		console.log(e.type, e);
	});
	btnc.addEventListener("click", function(e, s) {
		console.log(e.type, e);
	});
	btnc.addEventListener("dblclick", function(e, s) {
		console.log(e.type, e);
	});
	btnc.addEventListener("mousedown", function(e, s) {
		console.log(e.type, e);
	});
	btnc.addEventListener("mouseup", function(e, s) {
		console.log(e.type, e);
	});
	btnc.addEventListener("wheel", function(e, s) {
		console.log(e.type, e);
	});

	keybc.addInteractionData(btnc);
	var currentKeyDown;
	btnc.addEventListener("keydown", function(e, s) {
		e.preventDefault();
		currentKeyDown = e;
		console.log(e.type, e);
		if (e.keyCode == 8) {
			tf.setText(tf.text.substr(0, tf.text.length - 1)).renderText();
			stage.invalidate = true;
			e.nativeEvent.preventDefault();
		}
	});
	btnc.addEventListener("keyup", function(e, s) {
		e.preventDefault();
		console.log(e.type, e);
	});
	var kpmap = app.kpmap;
	btnc.addEventListener("keypress", function(e, s) {
		e.preventDefault();
		console.log(e.type, e);
		var kc = currentKeyDown.keyCode,
			tk = e.key;
		switch (kc) {
			case 13:
			case 27:
				break;
			case 8:
				e.nativeEvent.preventDefault();
				break;
			default:
				if (kpmap[kc] !== undefined) tk = kpmap[kc];
				tf.setText(tf.text + tk).renderText();
				stage.invalidate = true;
				e.nativeEvent.preventDefault();
		}
	});

	mainmenu.btns[0].addButtonEvent("click").click();

	function onscroll() {
		if (mousec.hasMouse()) mousec.stage.invalidate = true;
	}
	document.addEventListener('scroll', onscroll);
}

document.addEventListener('xeltoss_init', onXeltoSSInit_indexAddin);

function onXeltoSSInit_indexAddin(e) {
	zcl.addEmbedMap(zetaret.global.examples.ui.menu.index_menubtn, {
		mousec: zcl.argumentKeyMatch(),
		children: zcl.argumentKeyMatch(0, []),
		interactionQueue: zcl.argumentKeyMatch(0, null)
	});
	zcl.addEmbedMap(zetaret.global.examples.ui.menu.index_menu, {
		mousec: zcl.argumentKeyMatch()
	});

	zcl.runXeltoSS([
		zetaret.global.examples.ui.menu.index_menubtn,
		zetaret.global.examples.ui.menu.index_menu
	]);
}

window.package("zetaret.global.examples.ui.menu").internal({
	name: "SkinData",
	Silver: {
		width: 400,
		height: 250,
		radius: 8,
		margin: 6,
		closesize: 22,
		color: "#ababab",
		abwidth: 200,
		abheight: 100,
		bwidth: 64,
		bheight: 28,
		bradius: 7,
		btxtx: 32,
		btxty: 18,
		btxtstyle: {
			color: "white",
			font: "14px Arial",
			align: "center",
			width: 250
		},
		"btxtstyle:hover": {
			color: "beige"
		},
		txtx: 0,
		txty: 0,
		txtstyle: {
			color: "beige",
			font: "15px Arial",
			width: 200,
			y: 0,
			x: 100,
			baseline: "top",
			align: "center"
		},
		rbtxtx: 0,
		rbtxty: 4,
		rbradius: 4,
		rbtxtstyle: {
			color: "dimgray",
			font: "15px Arial",
			width: 150,
			y: 0,
			baseline: "top"
		},
		cbtxtx: 0,
		cbtxty: 4,
		cbradius: 4,
		cbtxtstyle: {
			color: "dimgray",
			font: "15px Arial",
			width: 150,
			y: 0,
			baseline: "top"
		},
		lbtxtstyle: {
			color: "dimgray",
			font: "15px Arial",
			width: 250,
			y: 0,
			baseline: "top"
		},
		bgcolor: "grey",
		strokecolor: "white",
		scrollbar: {
			bsize: 15
		}
	}
});

window.package("zetaret.global.examples.ui.menu").internal(
	function index_menubtn(mousec) {
		var o = this,
			a = arguments;
		o.tf = new zetaret.global.packages.clockwork.ui.TextField();
		o.super(a, null);
		o.mousec = mousec;
		var m = {};
		m.setText = function(txt) {
			o.tf.setText(txt).renderText();
			return o;
		};
		m._constructor = function() {
			if (mousec) {
				o.buttonMode().setInteraction(mousec);
			}
			o.addButtonShape().graphics.beginBitmapFill(globalmat)
				.drawRoundRect(0, 0, 150, 45, 8, 8, 8, 8)
				.endFill();
			o.addChild(o.tf);
			o.tf.moveTo(2, 12).styleList = [];
		};
		o.superize(a, m, true, true);
		m._constructor.call(o);
		return o;
	});
ProtoSS.headerSuper.push([zetaret.global.examples.ui.menu.index_menubtn, "zetaret.global.packages.clockwork.ui::ButtonContainer"]);

window.package("zetaret.global.examples.ui.menu").internal(
	function index_menu(mousec) {
		var o = this,
			a = arguments;
		o.mousec = mousec;
		o.bg = new zetaret.global.packages.clockwork.ui.Shape();
		o.btns = [];
		o.xoffset = 10;
		o.yoffset = 10;
		o.btnsize = 150;
		o.btnpad = 10;
		o.nstyle = {
			color: "#000000",
			font: "20px Arial",
			x: 75,
			y: 17,
			align: 'center',
			width: 150,
			stroked: true
		};
		o.overstyle = {
			color: "#fafafa"
		};
		o.super(a, null);
		var m = {};
		m.setBackground = function() {
			o.bg.resetGraphics();
			o.addChild(o.bg);
			return o.bg;
		};
		m.onoverbutton = function(e) {
			e.target.tf.addStyle(o.overstyle).applyStyles().renderText();
			o.cacheRedraw = true;
			o.stage.invalidate = true;
		};
		m.onoverbutton._p = 1;
		m.onoutbutton = function(e) {
			e.target.tf.removeStyle(o.overstyle).applyStyles().renderText();
			o.cacheRedraw = true;
			o.stage.invalidate = true;
		};
		m.onoutbutton._p = 1;
		m.addbtn = function(id, handler) {
			var btn = new zetaret.global.examples.ui.menu.index_menubtn(mousec);
			btn.name = id;
			btn.blend = menublend;
			btn.layer = true;
			o.btns.push(btn);
			btn.setText(id);
			btn.tf.addStyle(o.nstyle).applyStyles().renderText();
			o.addChild(btn);
			btn.addEventListener("mouseover", o.onoverbutton);
			btn.addEventListener("mouseout", o.onoutbutton);
			if (handler)
				btn.addEventListener("click", handler);
			return btn;
		};
		m.arrange = function() {
			var ch = o.btns,
				chl = ch.length,
				i;
			for (i = 0; i < chl; i++) {
				ch[i].x = i * (o.btnsize + o.btnpad) + o.xoffset;
				ch[i].y = o.yoffset;
				ch[i].invalidateTransform = true;
			}
		};
		m._constructor = function() {

		};
		o.superize(a, m, true, true);
		m._constructor.call(o);
		return o;
	});
ProtoSS.headerSuper.push([zetaret.global.examples.ui.menu.index_menu, "zetaret.global.packages.clockwork.ui::DisplayObjectContainer"]);

window.package("zetaret.global.examples.ui.pages").internal(
	function home_page() {
		var o = this,
			a = arguments;
		o.htmlimg = null;
		o.sh = null;
		o.super(a, true);
		var m = {};
		m.Build = function() {
			var tf = new zetaret.global.packages.clockwork.ui.TextField();
			o.addChild(tf);
			tf.setText("Home Page").setStyle({
				color: "dimgray",
				font: "26px Arial",
				width: 800,
				y: 26
			}).renderText();
			tf.moveTo(780, 0);
			var initcontainer = o.stage.root.getChildByName("initcontainer");
			initcontainer.visible = true;

			var htmlimg = new zetaret.global.packages.clockwork.ui.HTMLElement();
			o.htmlimg = htmlimg;
			htmlimg.createElement("img");
			htmlimg.setAttribute({
				src: "imgs/Canvas_createpattern.png"
			});
			htmlimg.moveTo(730, 30);
			htmlimg.setRotation(30);
			htmlimg.setScaleX(0.8);
			htmlimg.skew(40, 0);
			htmlimg.forceSelfInvalidate = true;
			initcontainer.addChild(htmlimg);
			console.log(htmlimg);

			var sh = new zetaret.global.packages.clockwork.ui.Shape();
			o.sh = sh;
			sh.resetGraphics();
			sh.graphics.beginFill(0x33ff0000).drawRect(0, 0, 86, 117).endFill();
			sh.x = htmlimg.x;
			sh.y = htmlimg.y;
			sh.setRotation(htmlimg.rx, true);
			sh.setScaleX(htmlimg.sx);
			sh.forceSelfInvalidate = true;
			sh.setSkew(htmlimg.skx, 0, true);
			initcontainer.addChild(sh);
		};
		m.BeforeDestroy = function() {
			var initcontainer = o.stage.root.getChildByName("initcontainer");
			initcontainer.visible = false;
			initcontainer.removeChild(o.htmlimg);
			o.htmlimg.clearElement();
			o.htmlimg = null;
			initcontainer.removeChild(o.sh);
			o.sh.graphics.clear();
			o.sh = null;
		};
		m._constructor = function() {
			console.log(o);
		};
		o.superize(a, m, true, true);
		m._constructor.call(o);
		return o;
	});
ProtoSS.headerSuper.push([zetaret.global.examples.ui.pages.home_page, "zetaret.global.packages.clockwork.ui::PageBase"]);

window.package("zetaret.global.examples.ui.pages").internal(
	function misc_page() {
		var o = this,
			a = arguments;
		o.image = null;
		o.txt = null;
		o.gallery = null;
		o.galid = null;
		o.txtch = null;
		o.txtcy = null;
		o.txtgr = null;
		o.txtar = null;
		o.txthb = null;
		o.txtko = null;
		o.htmlvideo = null;
		o.super(a, true);
		var m = {};
		m.Build = function() {
			var tf = new zetaret.global.packages.clockwork.ui.TextField();
			o.addChild(tf);
			tf.setText("Misc Page").setStyle({
				color: "dimgray",
				font: "26px Arial",
				width: 800,
				y: 26
			}).renderText();
			tf.moveTo(780, 0);
			o.txt = tf;
			var im = new zetaret.global.packages.clockwork.ui.Image();
			o.addChild(im);
			o.image = im;
			im.sy = 0.8;
			im.sx = 0.8;
			im.moveTo(300, 5).setupInteraction(true);
			im.drag();
			im.setDefaults()
				.setImageUrl("imgs/presentation-icon.png", "dragit")
				.loadImageFromUrl();

			var gal = new zetaret.global.packages.clockwork.ui.Gallery();
			gal.rotateGallery = true;
			o.gallery = gal;
			o.addChild(gal);
			var galitems = ["imgs/Heart-icon.png",
					"imgs/Heart-Inside-icon.png",
					"imgs/Heart-Pattern-icon.png"
				],
				git;
			for (var i = 0; i < galitems.length; i++) {
				git = gal.addGalleryItem();
				git.itemWidth = 200;
				git.itemHeight = 210;
				git.imageFit = zetaret.global.packages.clockwork.utils.FitTypes.TouchFromInside;
				git.setDefaults()
					.setImageUrl(galitems[i]);
			}
			gal.nextGalleryItem();
			o.galid = setInterval(function() {
				gal.nextGalleryItem();
			}, 3000);

			o.txtch = new zetaret.global.packages.clockwork.ui.TextField();
			o.addChild(o.txtch);
			o.txtch.moveTo(5, 300).setText("毎載力町評恥大用流断絶迫").setStyle({
				color: "#4499ee",
				font: "19px Arial",
				width: 800,
				y: 26
			}).renderText();

			o.txtcy = new zetaret.global.packages.clockwork.ui.TextField();
			o.addChild(o.txtcy);
			o.txtcy.moveTo(5, 280).setText("Лорем ипсум долор сит амет").setStyle({
				color: "#889933",
				font: "19px Arial",
				width: 800,
				y: 26
			}).renderText();

			o.txtgr = new zetaret.global.packages.clockwork.ui.TextField();
			o.addChild(o.txtgr);
			o.txtgr.moveTo(5, 260).setText("Λορεμ ιπσθμ δολορ σιτ αμετ").setStyle({
				color: "#dd4477",
				font: "19px Arial",
				width: 800,
				y: 26
			}).renderText();

			o.txtar = new zetaret.global.packages.clockwork.ui.TextField();
			o.addChild(o.txtar);
			o.txtar.moveTo(5, 240).setText("լոռեմ իպսում դոլոռ սիթ ամեթ").setStyle({
				color: "#7744ee",
				font: "19px Arial",
				width: 800,
				y: 26
			}).renderText();

			o.txthb = new zetaret.global.packages.clockwork.ui.TextField();
			o.addChild(o.txthb);
			o.txthb.moveTo(5, 320).setText("אקטואליה אנציקלופדיה עזה מה או שנתי חופשית עוד").setStyle({
				color: "#0038b8",
				font: "19px Arial",
				width: 800,
				y: 26
			}).renderText();

			o.txtko = new zetaret.global.packages.clockwork.ui.TextField();
			o.addChild(o.txtko);
			o.txtko.moveTo(5, 340).setText("전직대통령의 신분과 예우에 관하여는 법률로 정한다").setStyle({
				color: "#5599aa",
				font: "19px Arial",
				width: 800,
				y: 26
			}).renderText();

			var htmlvideo = new zetaret.global.packages.clockwork.ui.HTMLElement();
			o.htmlvideo = htmlvideo;
			htmlvideo.createElement("video");
			htmlvideo.setAttribute({
				loop: "",
				autoplay: "",
				autobuffer: "",
				onclick: "this.play();",
				width: "480",
				height: "270",
				poster: "imgs/clockwork_vposter.jpg",
				src: "imgs/clockwork.mp4"
			});
			htmlvideo.moveTo(430, 40);
			o.addChild(htmlvideo);
			console.log(htmlvideo);
		};
		m.BeforeDestroy = function() {
			o.image.destruct();
			o.gallery.destruct();
			window.clearInterval(o.galid);
			o.txt.destruct();
			o.image = null;
			o.gallery = null;
			o.txt = null;
			o.txtch.destruct();
			o.txtch = null;
			o.txtar.destruct();
			o.txtar = null;
			o.txtgr.destruct();
			o.txtgr = null;
			o.txthb.destruct();
			o.txthb = null;
			o.txtko.destruct();
			o.txtko = null;
			o.removeChild(o.htmlvideo);
			try {
				o.htmlvideo.element.pause();
			} catch (e) {}
			o.htmlvideo.clearElement();
			o.htmlvideo = null;
		};
		m._constructor = function() {
			console.log(o);
		};
		o.superize(a, m, true, true);
		m._constructor.call(o);
		return o;
	});
ProtoSS.headerSuper.push([zetaret.global.examples.ui.pages.misc_page, "zetaret.global.packages.clockwork.ui::PageBase"]);

window.package("zetaret.global.examples.ui.pages").internal(
	function game_page() {
		var o = this,
			a = arguments;
		o.alertbox = new zetaret.global.packages.clockwork.ui.AlertBox();
		o.checkbox = new zetaret.global.packages.clockwork.ui.Checkbox();
		o.radiob = new zetaret.global.packages.clockwork.ui.RadioButton();
		o.radiob1 = new zetaret.global.packages.clockwork.ui.RadioButton();
		o.radiob2 = new zetaret.global.packages.clockwork.ui.RadioButton();
		o.scrollp = new zetaret.global.packages.clockwork.ui.Scrollpane();
		o.scrollb = new zetaret.global.packages.clockwork.ui.Scrollbar();
		o.menu = new zetaret.global.packages.clockwork.ui.Menu();
		o.pl = new zetaret.global.packages.clockwork.ui.ProgressLoader();
		o.mo = new zetaret.global.packages.clockwork.ui.MaskedObject();
		o.winobj = new zetaret.global.packages.clockwork.ui.Window();
		o.label = new zetaret.global.packages.clockwork.ui.Label();
		o.ytbtn = new zetaret.global.packages.clockwork.ui.FlawlessButton();
		o.ytp = null;
		o.txt = null;
		o.super(a, true);
		var m = {};
		m.Build = function() {
			var tf = new zetaret.global.packages.clockwork.ui.TextField();
			o.addChild(tf);
			tf.setText("Game Page").setStyle({
				color: "dimgray",
				font: "26px Arial",
				width: 800,
				y: 26
			}).renderText();
			tf.moveTo(780, 0);
			o.txt = tf;

			o.addChild(o.winobj);
			o.winobj.moveTo(5, 5).initWindow(270, 400);
			o.winobj.body.initScrollpane(270, 400).setScrollSize(340, 600);
			(new zetaret.global.packages.clockwork.skin.silver.Scrollbar_SilverSkin()).initSkin(o.winobj.body.hscrollbar, zetaret.global.examples.ui.menu.SkinData.Silver);
			(new zetaret.global.packages.clockwork.skin.silver.Scrollbar_SilverSkin()).initSkin(o.winobj.body.vscrollbar, zetaret.global.examples.ui.menu.SkinData.Silver);

			o.winobj.body.addContent(o.checkbox);
			o.checkbox.checked = true;
			o.checkbox.bgcheck = true;
			o.checkbox.moveTo(10, 150).initBox(true, true);
			(new zetaret.global.packages.clockwork.skin.silver.Checkbox_SilverSkin()).initSkin(o.checkbox, zetaret.global.examples.ui.menu.SkinData.Silver);
			o.checkbox.txt.setText("checkbox label");
			o.checkbox.addEventListener("change", function(e, d) {
				if (o.ytp) o.ytp.setStyle({
					visibility: !o.checkbox.checked ? "hidden" : "visible"
				});
			});

			var rlinks = ["MQjhI9rB3RE", "zrIjnrD-wX8", "p_-SyFqGNZU"],
				selectedRB = 0;
			o.winobj.body.addContent(o.radiob);
			o.radiob.checked = true;
			o.radiob.bgcheck = true;
			o.radiob.moveTo(10, 180).initBox(true, true);
			(new zetaret.global.packages.clockwork.skin.silver.RadioButton_SilverSkin()).initSkin(o.radiob, zetaret.global.examples.ui.menu.SkinData.Silver);
			o.radiob.txt.setText("radio button label");
			o.winobj.body.addContent(o.radiob1);
			o.radiob1.bgcheck = true;
			o.radiob1.moveTo(10, 210).initBox(true, true);
			(new zetaret.global.packages.clockwork.skin.silver.RadioButton_SilverSkin()).initSkin(o.radiob1, zetaret.global.examples.ui.menu.SkinData.Silver);
			o.radiob1.txt.setText("radio button 1 label");
			o.winobj.body.addContent(o.radiob2);
			o.radiob2.bgcheck = true;
			o.radiob2.moveTo(10, 240).initBox(true, true);
			(new zetaret.global.packages.clockwork.skin.silver.RadioButton_SilverSkin()).initSkin(o.radiob2, zetaret.global.examples.ui.menu.SkinData.Silver);
			o.radiob2.txt.setText("radio button 2 label");

			function onRBChange(e, d) {
				var rg = o.radiob.radioGroup,
					i, l = rg.length,
					rb;
				selectedRB = -1;
				for (i = 0; i < l; i++) {
					rb = rg[i];
					if (rb.checked) {
						selectedRB = i;
						break;
					}
				}
			}
			o.radiob.addEventListener("createRadioGroup", function(e, d) {
				var rg = o.radiob.radioGroup,
					i, l = rg.length,
					rb;
				for (i = 0; i < l; i++) {
					rb = rg[i];
					rb.addEventListener("change", onRBChange);
				}
			});
			o.radiob.createRadioGroup([o.radiob1, o.radiob2]);

			o.winobj.body.addContent(o.ytbtn);
			o.ytbtn.craft(180, 45, {
				text: "Embed Video",
				normalGradient: ["rgb(15,153,217)", "rgb(1,119,175)"],
				normalLineGradient: ["rgb(27,159,220)", "rgb(13,126,178)"],
				normalTextColor: "rgb(231,244,250)",
				normalTextFont: "16px Arial",
				overGradient: ["rgb(54,191,254)", "rgb(2,152,222)"],
				overLineGradient: ["rgb(65,195,255)", "rgb(14,157,224)"],
				overTextColor: "rgb(255,255,255)",
				downGradient: ["rgb(0,109,160)", "rgb(0,97,142)"],
				downLineGradient: ["rgb(13,116,164)", "rgb(13,105,147)"],
				downTextColor: "rgb(204,225,234)"
			});
			o.ytbtn.addEventListener("click", function(e) {
				var el = o.ytp || new zetaret.global.packages.clockwork.ui.HTMLElement(),
					srb = selectedRB >= 0 ? selectedRB : Math.floor(Math.random() * rlinks.length);
				if (!o.ytp) {
					o.ytp = el;
					el.pointer = true;
					el.moveTo(535, 270);
					el.createElement("iframe");
					el.setAttribute({
						width: 400,
						height: 225,
						frameborder: 0,
						allow: "autoplay; encrypted-media",
						allowfullscreen: ""
					});
					o.addChild(el);
				}
				el.setAttribute({
					src: "https://www.youtube.com/embed/" + rlinks[srb]
				});
			});
			o.ytbtn.moveTo(20, 280);

			o.winobj.body.addContent(o.label);
			o.label.initLabel(zetaret.global.examples.ui.menu.SkinData.Silver.lbtxtstyle).setLabel("Clockwork components").moveTo(30, 30);

			o.addChild(o.scrollp);
			o.scrollp.initScrollpane(200, 200).setScrollSize(278, 50).addContent(o.menu);
			o.menu.setBackground().graphics.beginFill("beige").drawRect(0, 0, 278, 50).endFill();
			o.menu.initMenu();
			o.decoratebtn(o.menu.addbtn("dialog")).addEventListener("click", function(e, d) {
				o.alertbox.alert("Dialog title");
			});
			o.decoratebtn(o.menu.addbtn("act 1")).addEventListener("click", function(e, d) {
				o.alertbox.alert("Act 1");
			});
			o.decoratebtn(o.menu.addbtn("act 2")).addEventListener("click", function(e, d) {
				o.alertbox.alert("Act 2");
			});
			o.decoratebtn(o.menu.addbtn("act 3")).addEventListener("click", function(e, d) {
				o.alertbox.alert("Act 3");
			});
			o.menu.menulist.setConfig({
				xmargin: 10,
				ymargin: 10,
				xspace: 6,
				xarrange: true,
				listItemWidth: 60
			}).arrangeList().invalidateList();
			o.scrollp.moveTo(300, 20);
			o.scrollp.container.addEventListener("wheel", o.scrollb.onWheel);
			o.scrollp.bg.addEventListener("wheel", o.scrollb.onWheel);

			o.addChild(o.scrollb);
			o.scrollb.horizontal = true;
			o.scrollb.initBar(50, 200);
			(new zetaret.global.packages.clockwork.skin.silver.Scrollbar_SilverSkin()).initSkin(o.scrollb, zetaret.global.examples.ui.menu.SkinData.Silver);
			o.scrollb.moveTo(300, 220);
			o.scrollb.addEventListener("change", function(e, d) {
				o.scrollp.setScrollP(o.scrollb.percentage);
			});

			o.scrollp.addContent(o.mo);
			o.mo.initMask();
			o.mo.maskobj.graphics.drawEllipse(0, 0, 140, 10);
			o.mo.addContent(o.pl);
			o.pl.initProgress(140);
			(new zetaret.global.packages.clockwork.skin.silver.ProgressLoader_SilverSkin()).initSkin(o.pl, zetaret.global.examples.ui.menu.SkinData.Silver);
			o.mo.moveTo(60, 60);
			o.pl.setProgress(0);
			document.addEventListener('animate_update', o.onFrame);

			o.addChild(o.alertbox);
			o.alertbox.moveTo(545, 20).initBox(true, true, true, true, true).defaultButtons();
			o.alertbox.yesBtn.label.setText("Accept");
			o.alertbox.noBtn.label.setText("Cancel");
			(new zetaret.global.packages.clockwork.skin.silver.AlertBox_SilverSkin()).initSkin(o.alertbox, zetaret.global.examples.ui.menu.SkinData.Silver);
			o.alertbox.alert("Dialog title");
		};
		m.onFrame = function(e) {
			if (!o.ytp) o.pl.setProgress((o.pl.progress + 0.01) % 1);
		};
		m.onFrame._p = 1;
		m.decoratebtn = function(btn) {
			btn.addButtonShape('bg').graphics.beginFill("white").drawRect(0, 0, 60, 30).endFill();
			btn.tf.setStyle({
				font: "13px Arial",
				color: "black",
				baseline: 'middle',
				align: 'center',
				width: 60
			}).renderText();
			btn.tf.moveTo(30, 15);
			btn.initMenuButton();
			return btn;
		};
		m.BeforeDestroy = function() {
			o.alertbox.destruct();
			document.removeEventListener('animate_update', o.onFrame);
			o.alertbox = null;
			o.checkbox.destruct();
			o.checkbox = null;
			o.radiob.destruct();
			o.radiob = null;
			o.radiob1.destruct();
			o.radiob1 = null;
			o.radiob2.destruct();
			o.radiob2 = null;
			o.scrollp.destruct();
			o.scrollp = null;
			o.scrollb.destruct();
			o.scrollb = null;
			o.menu.destruct();
			o.menu = null;
			o.pl.destruct();
			o.pl = null;
			o.mo.destruct();
			o.mo = null;
			o.winobj.destruct();
			o.winobj = null;
			o.label.destruct();
			o.label = null;
			o.ytbtn.stage = stage;
			o.ytbtn.destruct();
			o.ytbtn.stage = null;
			o.ytbtn = null;
			if (o.ytp) {
				o.removeChild(o.ytp);
				o.ytp.removeElement();
				o.ytp.clearElement();
				o.ytp = null;
			}
		};
		m._constructor = function() {
			console.log(o);
		};
		o.superize(a, m, true, true);
		m._constructor.call(o);
		return o;
	});
ProtoSS.headerSuper.push([zetaret.global.examples.ui.pages.game_page, "zetaret.global.packages.clockwork.ui::PageBase"]);

document.addEventListener('initApp', initSkytoSS_index);

function initSkytoSS_index() {
	/* SkytoSS Accelerator */
	var r1 = false,
		skytoss = new SkytoSS();
	if (r1) {
		skytoss.debugGPU = true;
		skytoss.gpuShaderLogHandler = console.log;
	}
	SkytoSS.InitSkytoSSPrototypes();

	function initCanvas() {
		var sourcer = skytoss.gpuWrapRandomizer(skytoss.seedTemplate()),
			sourcev, sourcef, attr = {},
			prop = {};
		attr.aVertexPosition = {
			type: 'vec4'
		};
		attr.aVertexColor = {
			type: 'vec4'
		};
		attr.uModelViewMatrix = {
			type: 'mat4',
			attrname: 'uniform'
		};
		attr.uProjectionMatrix = {
			type: 'mat4',
			attrname: 'uniform'
		};
		attr.vColor = {
			type: 'lowp vec4',
			attrname: 'varying'
		};

		prop.gl_Position = {
			value: 'uProjectionMatrix * uModelViewMatrix * aVertexPosition'
		};
		prop.vColor = {
			value: 'aVertexColor'
		};
		sourcev = skytoss.sourceTemplate(attr, prop, sourcer.main, null, [sourcer.code]);

		var fmain = [''];
		attr = {};
		attr.vColor = {
			type: 'lowp vec4',
			attrname: 'varying'
		};
		prop = {};
		prop.gl_FragColor = {
			value: 'vColor'
		};
		sourcef = skytoss.sourceTemplate(attr, prop, fmain);

		var gpuid = skytoss.newGPU(sourcev, sourcef),
			gpu = skytoss.getGPU(gpuid);
		if (!gpu.gpu) return;
		(document.getElementById('gpucanvas') || document.body).appendChild(gpu.gpu.canvas);
		gpu.gpu.canvas.addEventListener('click', function(e) {
			pauseRender = !pauseRender;
		});

		var bfd = {};
		bfd.aVertexPosition = {
			data: [-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

				-1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

				-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

				-1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

				1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

				-1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0
			],
			size: 3
		};
		bfd.aVertexColor = {
			data: [
				[1.0, 1.0, 1.0, 1.0],
				[1.0, 0.0, 0.0, 1.0],
				[0.0, 1.0, 0.0, 1.0],
				[0.0, 0.0, 1.0, 1.0],
				[1.0, 1.0, 0.0, 1.0],
				[1.0, 0.0, 1.0, 1.0]
			],
			size: 4
		};
		var colors = [],
			c, c1, c2, c3, j;
		for (j = 0; j < bfd.aVertexColor.data.length; ++j) {
			c = bfd.aVertexColor.data[j];
			c1 = c.concat();
			c2 = c.concat();
			c3 = c.concat();
			c1[0] *= 0.8;
			c1[1] *= 0.8;
			c1[2] *= 0.8;
			c2[0] *= 0.2;
			c2[1] *= 0.2;
			c2[2] *= 0.2;
			c3[0] *= 0.5;
			c3[1] *= 0.5;
			c3[2] *= 0.5;
			colors = colors.concat(c, c1, c2, c3);
		}
		bfd.aVertexColor.data = colors;
		bfd.indices = {
			data: [
				0, 1, 2, 0, 2, 3,
				4, 5, 6, 4, 6, 7,
				8, 9, 10, 8, 10, 11,
				12, 13, 14, 12, 14, 15,
				16, 17, 18, 16, 18, 19,
				20, 21, 22, 20, 22, 23
			],
			type: Uint16Array,
			target: gpu.gpu.ELEMENT_ARRAY_BUFFER,
			noloc: true
		};

		var fieldOfView = 45 * Math.PI / 180,
			aspect = gpu.gpu.canvas.clientWidth / gpu.gpu.canvas.clientHeight,
			zNear = 0.1,
			zFar = 100.0,
			modelViewMatrix = new zetaret.global.packages.clockwork.data.Matrix(4, 4),
			projectionMatrix = new zetaret.global.packages.clockwork.data.Matrix(4, 4);

		function perspective(mm, fov, aspect, near, far) {
			var f = 1.0 / Math.tan(fov / 2),
				nf = 1 / (near - far),
				m;
			mm.identity();
			m = mm.data;
			m[0] = f / aspect;
			m[5] = f;
			m[10] = (far + near) * nf;
			m[11] = -1;
			m[14] = (2 * far * near) * nf;
			m[15] = 0;
			return mm;
		}

		function translate(mm, v) {
			var x = v[0],
				y = v[1],
				z = v[2],
				m = mm.data;
			m[12] += m[0] * x + m[4] * y + m[8] * z;
			m[13] += m[1] * x + m[5] * y + m[9] * z;
			m[14] += m[2] * x + m[6] * y + m[10] * z;
			m[15] += m[3] * x + m[7] * y + m[11] * z;
			return mm;
		}

		function rotate(mm, rad, axis) {
			var x = axis[0],
				y = axis[1],
				z = axis[2],
				len = Math.sqrt(x * x + y * y + z * z),
				m = mm.data,
				s, c, t,
				a00, a01, a02, a03,
				a10, a11, a12, a13,
				a20, a21, a22, a23,
				b00, b01, b02,
				b10, b11, b12,
				b20, b21, b22;

			len = 1 / len;
			x *= len;
			y *= len;
			z *= len;

			s = Math.sin(rad);
			c = Math.cos(rad);
			t = 1 - c;

			a00 = m[0];
			a01 = m[1];
			a02 = m[2];
			a03 = m[3];
			a10 = m[4];
			a11 = m[5];
			a12 = m[6];
			a13 = m[7];
			a20 = m[8];
			a21 = m[9];
			a22 = m[10];
			a23 = m[11];

			b00 = x * x * t + c;
			b01 = y * x * t + z * s;
			b02 = z * x * t - y * s;
			b10 = x * y * t - z * s;
			b11 = y * y * t + c;
			b12 = z * y * t + x * s;
			b20 = x * z * t + y * s;
			b21 = y * z * t - x * s;
			b22 = z * z * t + c;

			m[0] = a00 * b00 + a10 * b01 + a20 * b02;
			m[1] = a01 * b00 + a11 * b01 + a21 * b02;
			m[2] = a02 * b00 + a12 * b01 + a22 * b02;
			m[3] = a03 * b00 + a13 * b01 + a23 * b02;
			m[4] = a00 * b10 + a10 * b11 + a20 * b12;
			m[5] = a01 * b10 + a11 * b11 + a21 * b12;
			m[6] = a02 * b10 + a12 * b11 + a22 * b12;
			m[7] = a03 * b10 + a13 * b11 + a23 * b12;
			m[8] = a00 * b20 + a10 * b21 + a20 * b22;
			m[9] = a01 * b20 + a11 * b21 + a21 * b22;
			m[10] = a02 * b20 + a12 * b21 + a22 * b22;
			m[11] = a03 * b20 + a13 * b21 + a23 * b22;

			return mm;
		}
		perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

		var cubeRotation = 0.0,
			delta = 0.04,
			pauseRender = false;

		var settings = {};
		settings.drawMethod = 'drawElements';
		settings.drawArgs = [gpu.gpu.TRIANGLES, 36, gpu.gpu.UNSIGNED_SHORT, 0];
		settings.uniform = {};
		settings.attributes = {};

		gpu.gpu.enable(gpu.gpu.DEPTH_TEST);
		gpu.gpu.depthFunc(gpu.gpu.LEQUAL);

		function clear(gl, gpuData, id, settings) {
			gl.clearColor(212 / 255, 227 / 255, 1, 1);
			gl.clearDepth(1);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		}

		function logger(p, gpuData, id) {
			console.log(p);
		}

		function render() {
			if (pauseRender) return;
			modelViewMatrix.identity();
			translate(modelViewMatrix, [0, 0, -6]);
			rotate(modelViewMatrix, cubeRotation * .4, [0, 0, 1]);
			rotate(modelViewMatrix, cubeRotation * .3, [0, 1, 0]);
			rotate(modelViewMatrix, cubeRotation * .5, [1, 0, 0]);

			settings.uniform = {
				uProjectionMatrix: {
					num: 4,
					transpose: false,
					value: projectionMatrix.data,
					matrix: true
				},
				uModelViewMatrix: {
					num: 4,
					transpose: false,
					value: modelViewMatrix.data,
					matrix: true
				}
			};

			skytoss.useGPU(gpuid, null, settings, bfd, null, skytoss.gpuPreProgrammer, skytoss.gpuProgrammer, clear);

			cubeRotation += delta;
		}

		render();
		if (!r1) web.ael(web.doc, "animate_update", render);
	}
	setTimeout(initCanvas, 50);
};
