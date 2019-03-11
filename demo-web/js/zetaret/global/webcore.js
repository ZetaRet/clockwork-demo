function ZetaRet_WebCore(doc, params) {
	function zrwc_extend(d, t) {
		for (var key in d) {
			if (t[key] === undefined) t[key] = d[key];
		}
		return t;
	}
	var defaultParams = {
		totalImages: 0,
		tesselation: 1,
		vertex: 1
	};
	zrwc_extend(defaultParams, params);
	var G = {
		s: "style",
		a: "attributes",
		sa: "setAttribute",
		ss: "setStyle",
		w: "width",
		h: "height",
		t: "top",
		l: "left",
		r: "right",
		b: "bottom",
		p: "px",
		gebi: "getElementById",
		gebcn: "getElementsByClassName",
		gebn: "getElementsByName",
		gebtn: "getElementsByTagName",
		cn: "className",
		ael: "addEventListener",
		rel: "removeEventListener",
		ce: "createElement",
		sc: "setChild",
		sp: "setParent",
		d: "draw",
		gcs: "getComputedStyle",
		de: "dispatchEvent",
		cev: "createEvent",
		dt: {
			mpfd: "multipart/form-data",
			ajs: "application/json",
			afue: "application/x-www-form-urlencoded"
		}
	};
	var obj = {
		doc: doc,
		params: params,
		canvas: [],
		autoCanvas: [],
		graphics: {},
		animation: {
			RAF: true,
			maxFrameTime: 40,
			maxFrameScale: 5,
			timeScale: 1,
			f: params.f || 60,
			tweens: [],
			easing: {}
		},
		totalImages: params.tI,
		tesselation: params.tesselation,
		vertex: params.vertex,
		stage: {
			x: 0,
			y: 0,
			sx: 1,
			sy: 1,
			maxs: 1,
			mins: 1,
			w: 0,
			h: 0,
			cx: 0,
			cy: 0
		},
		events: {},
		G: G,
		triggers: {}
	};
	obj.addext = function(ext) {
		ext(obj, G, defaultParams);
	};
	obj.extend = zrwc_extend;
	obj.initD = function(d) {
		if (!d) d = params.delay;
		if (!d) obj.init();
		else window.setTimeout(obj.init, d);
	};
	obj.init = function() {
		var bg = obj.getElement('#bg')[0];

		function onResize(e) {
			obj.de(obj.doc, "ZetaRet_WebCore_beforeResize");
			var d = obj.getDimensions();
			var w = d.w;
			var h = d.h;
			var oW = params.oW;
			var oH = params.oH;
			obj.stage.w = w;
			obj.stage.h = h;
			obj.stage.sx = w / oW;
			obj.stage.sy = h / oH;
			obj.stage.maxs = Math.max(obj.stage.sx, obj.stage.sy);
			obj.stage.mins = Math.min(obj.stage.sx, obj.stage.sy);
			obj.stage.cx = Math.round(obj.stage.w * 0.5);
			obj.stage.cy = Math.round(obj.stage.h * 0.5);
			var maxRatio = obj.stage.maxs;
			var bgW = Math.ceil(oW * maxRatio);
			var bgH = Math.ceil(oH * maxRatio);
			bg[G.s][G.w] = bgW + G.p;
			bg[G.s][G.h] = bgH + G.p;
			bg[G.s][G.t] = Math.round((h - bgH) / 2) + G.p;
			bg[G.s][G.l] = Math.round((w - bgW) / 2) + G.p;
			if (obj.autoCanvas) {
				for (var aci = 0; aci < obj.autoCanvas.length; aci++) {
					var c = obj.autoCanvas[aci].c;
					obj.de(c, 'canvas_invalidate');
					obj.de(c, 'canvas_beforeResize');
					c[G.w] = w;
					c[G.h] = h;
					obj.de(c, 'canvas_resize');
					obj.de(c, 'canvas_render');
				}
			}
			obj.de(obj.doc, "ZetaRet_WebCore_afterResize");
		}
		obj.initAnimation();
		window[G.ael]('resize', onResize);
		onResize();
		obj.triggers.onResize = onResize;
		obj.getElement('#body')[0][G.cn] = obj.params.bodyInitCN;
		if (params.init) params.init(obj);
		return obj;
	};
	obj.cev = function(t, d, b, c) {
		var e;
		if (obj.doc[G.cev]) {
			e = obj.doc[G.cev]('HTMLEvents');
			e.initEvent(t, b, c);
			if (d) e.eventData = d;
		} else e = new CustomEvent(t, d, b, c);
		return e;
	};
	obj.de = function(t, e) {
		t[G.de](obj.cev(e));
	};
	obj.ael = function(t, e, f, gid) {
		t[G.ael](e, f);
		if (gid) {
			if (!obj.events[gid]) obj.events[gid] = [];
			obj.events[gid].push({
				t: t,
				e: e,
				f: f
			});
		}
	};
	obj.relg = function(gid) {
		if (gid && obj.events[gid]) {
			var oo = obj.events[gid];
			for (var i = 0; i < oo.length; i++) {
				var o = oo[i];
				obj.rel(o.t, o.e, o.f);
			}
			delete obj.events[gid];
		}
	};
	obj.rel = function(t, e, f) {
		t[G.rel](e, f);
	};
	obj.loadImage = function() {
		obj.totalImages--;
		obj.updateProgress();
		return obj;
	};
	obj.applyParams = function(e, p) {
		if (p) {
			if (p.a && e[G.sa]) {
				for (var a in p.a) e[G.sa](a, p.a[a]);
			}
			if (p.s) {
				var s;
				if (e[G.ss]) {
					for (s in p.s) e[G.ss](s, p.s[s]);
				} else if (e[G.s]) {
					for (s in p.s) e[G.s][s] = p.s[s];
				}
			}
			if (p.f) {
				for (var f in p.f) {
					if (e[f]) e[f](p.f[f]);
				}
			}
			if (p.v) {
				for (var v in p.v) e[v] = p.v[v];
			}
		}
		return e;
	};
	obj.ap = obj.applyParams;
	obj.loadCanvas = function(parent, params, sid) {
		if (sid) {
			for (var i = 0; i < obj.canvas.length; i++) {
				if (obj.canvas[i].id === sid) return obj.canvas[i];
			}
			return null;
		}
		var wrapper = doc[G.ce]('div');
		var canvas = doc[G.ce]('canvas');
		var ctx = canvas.getContext('2d');
		var d = obj.getDimensions();
		var id = 'canvas' + obj.canvas.length;
		if (!params) params = {};
		if (params.a && params.a.id) id = params.a.id;
		obj.applyParams(canvas, {
			a: params.a,
			f: params.f,
			v: params.v
		});
		obj.applyParams(wrapper, {
			s: params.s
		});
		obj.graphics[id] = [];
		var cobj = {
			ctx: ctx,
			c: canvas,
			w: wrapper,
			p: params,
			id: id,
			invalidate: false,
			layers: []
		};
		wrapper.id = id + '-wrapper';
		if (params.auto) {
			obj.autoCanvas.push(cobj);
			canvas[G.w] = d.w;
			canvas[G.h] = d.h;
		}
		obj.ael(canvas, 'canvas_render', function(e) {
			ctx.clearRect(0, 0, canvas[G.w], canvas[G.h]);
			var gs = obj.graphics[id];
			ctx.save();
			for (var i = 0; i < gs.length; i++) gs[i].triggers[G.d]();
			ctx.restore();
		});
		obj.ael(canvas, 'canvas_save', function(e) {
			ctx.save();
		});
		obj.ael(canvas, 'canvas_restore', function(e) {
			ctx.restore();
		});
		obj.ael(canvas, 'canvas_resize', function(e) {
			for (var i = 0; i < cobj.layers.length; i++) {
				var l = cobj.layers[i];
				l[G.w] = canvas[G.w];
				l[G.h] = canvas[G.h];
			}
		});
		cobj.addLayers = function(c) {
			for (var i = 0; i < c; i++) {
				var cnvs = doc[G.ce]('canvas');
				cobj.layers[cobj.layers.length] = cnvs;
				cnvs[G.w] = canvas[G.w];
				cnvs[G.h] = canvas[G.h];
			}
			return cobj;
		};
		obj.canvas.push(cobj);
		wrapper.appendChild(canvas);
		if (parent) parent.appendChild(wrapper);
		return cobj;
	};
	obj.getDimensions = function(params) {
		return {
			w: window.innerWidth,
			h: window.innerHeight
		};
	};
	obj.getStyle = function(e) {
		if (window[G.gcs]) return window[G.gcs](e);
		return e[G.s];
	};
	obj.getElement = function(sel, top, params) {
		if (!top) top = obj.doc;
		if (!sel) return top;
		var selA = sel.split(' ');
		if (selA.length > 1) {
			top = [top];
			for (var si = 0; si < selA.length; si++) {
				var ntop = [];
				for (var t = 0; t < top.length; t++) {
					var el = obj.getElement(selA[si], top[t]);
					for (var e = 0; e < el.length; e++) ntop[ntop.length] = el[e];
				}
				top = ntop;
			}
			return top;
		}
		var fc = sel.charAt(0);
		if (fc === '#') return [obj.doc[G.gebi](sel.substr(1))];
		else if (fc === '.') return top[G.gebcn](sel.substr(1));
		else if (fc === '@') return top[G.gebn](sel.substr(1));
		return top[G.gebtn](sel);
	};
	obj.gel = obj.getElement;
	obj.debug = function(p) {
		console.log(p);
		return obj;
	};
	obj.rck = function(k, r) {
		return (r = RegExp('(^|;' + ' ' + ')' + encodeURIComponent(k) + '=([^;]*)').exec(obj.doc.cookie)) ? r[2] : null;
	};
	obj.wck = function(k, v, d) {
		var e, dd;
		if (d) {
			dd = new Date();
			dd.setTime(dd.getTime() + (d * 24 * 60 * 60 * 1000));
			e = "; expires=" + dd.toGMTString();
		} else {
			e = "";
		}
		obj.doc.cookie = k + "=" + v + e + "; path=/";
		return obj;
	};
	obj.dck = function(k) {
		obj.wck(k, '', -1);
		return obj;
	};
	obj.initAnimation = function() {
		var oa = obj.animation;
		if (oa.zrtween) return;
		oa.zrtween = function zrtween() {};
		oa.zrtween.prototype.render = function(e, p, ap) {
			var tween = this;
			if (e.constructor !== Array) e = [e];
			if (tween.tt === tween.ap.time) {
				tween.stop(e, p, ap);
				if (ap.cqi !== undefined) tween.qi = ap.cqi;
				var que = tween.q[tween.qi];
				if (ap.r) {
					if (ap.r > 0) ap.r--;
					tween.reset();
				} else if (que) {
					tween.p = que.p;
					tween.ap = que.ap;
					tween.qi++;
					tween.reset();
				} else if (tween.qi < 0) {
					tween.p = tween.op;
					tween.ap = tween.oap;
					tween.qi = 0;
					tween.reset();
				}
			}
			return tween;
		};
		oa.zrtween.prototype.reset = function() {
			var tween = this;
			tween.tt = tween.qt > 0 ? tween.qt : 0;
			tween.start(tween.e, tween.p, tween.ap);
			tween.update(tween.e, tween.p, tween.ap);
			return tween;
		};
		oa.zrtween.prototype.to = function(p, ap) {
			var tween = this;
			tween.q.push({
				p: p,
				ap: ap
			});
			return tween;
		};
		oa.zrtween.prototype.wait = function(t, f) {
			var tween = this;
			tween.q.push({
				p: {},
				ap: {
					time: t,
					onstop: f
				}
			});
			return tween;
		};
		oa.zrtween.prototype.update = function(e, p, ap) {
			var tween = this;
			if (e.constructor !== Array) e = [e];
			var timePercent = tween.tt / tween.ap.time;
			if (ap.ease && ap.ease !== 'linear' && ap.ease !== 'none') timePercent = obj.animation.easing['ease' + ap.ease](timePercent);
			for (var i = 0; i < e.length; i++) {
				var el = e[i],
					s = {},
					pl = {},
					asp = {},
					key, cp, tp, cpV, tpV, suf, vv;
				for (key in p) {
					cp = tween.cp[key];
					tp = tween.tp[key];
					if (ap.applyv) {
						cpV = cp;
						tpV = tp;
						vv = cpV + (tpV - cpV) * timePercent;
					} else {
						cpV = cp ? parseFloat(cp) : 0;
						tpV = tp ? parseFloat(tp) : 0;
						suf = ap.suf ? ap.suf[key] : (cp ? cp.split(cpV + '')[1] : '');
						vv = cpV + (tpV - cpV) * timePercent + suf;
					}
					if (ap.format[key]) vv = ap.format[key](vv);
					pl[key] = vv;
					if (ap.plugin[key]) {
						if (ap.plugin[key] !== 1) {
							ap.plugin[key](vv, timePercent, el, p, ap, cpV, tpV, key);
						}
					} else s[key] = vv;
				}
				if (ap.applyv) asp.v = s;
				else asp.s = s;
				if (ap._plugin) ap._plugin(pl, timePercent, el, p, ap);
				obj.applyParams(el, asp);
				if (ap.onupdate) ap.onupdate(el, p, ap, timePercent, pl);
				if (ap.updaten) {
					el[ap.updaten] = ap.updatev;
				}
			}
			return tween;
		};
		oa.zrtween.prototype.start = function(e, p, ap) {
			var tween = this;
			if (e.constructor !== Array) e = [e];
			var ps = ap.pluginset;
			if (ps && ps.constructor === Function) ps = ps();
			if (!ap.format) ap.format = {};
			if (!ap.plugin) ap.plugin = {};
			for (var i = 0; i < e.length; i++) {
				var el = e[i],
					key;
				for (key in p) {
					var pk = p[key],
						s = ap.applyv ? el : obj.getStyle(el),
						pp = ps && ps[key] !== undefined ? ps[key] : s[key];
					if (ap.method === 'from') {
						var npp = pk;
						pk = pp;
						pp = npp;
					}
					if (ap.applyv) {
						tween.tp[key] = pk;
						tween.cp[key] = pp;
					} else {
						tween.tp[key] = pk + '';
						tween.cp[key] = pp + '';
					}
				}
				if (ap.preset) obj.applyParams(el, ap.preset);
			}
			tween.status = 1;
			return tween;
		};
		oa.zrtween.prototype.stop = function(e, p, ap) {
			var tween = this;
			if (e.constructor !== Array) e = [e];
			tween.status = 2;
			tween.ap.r = tween.ap.or;
			if (tween.ap.onstop) tween.ap.onstop(e, p, ap);
			return tween;
		};
	};
	obj.animation.easing = {
		linear: function(t) {
			return t;
		},
		easeInQuad: function(t) {
			return t * t;
		},
		easeOutQuad: function(t) {
			return t * (2 - t);
		},
		easeInOutQuad: function(t) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		},
		easeInCubic: function(t) {
			return t * t * t;
		},
		easeOutCubic: function(t) {
			return (--t) * t * t + 1;
		},
		easeInOutCubic: function(t) {
			return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
		},
		easeInQuart: function(t) {
			return t * t * t * t;
		},
		easeOutQuart: function(t) {
			return 1 - (--t) * t * t * t;
		},
		easeInOutQuart: function(t) {
			return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
		},
		easeInQuint: function(t) {
			return t * t * t * t * t;
		},
		easeOutQuint: function(t) {
			return 1 + (--t) * t * t * t * t;
		},
		easeInOutQuint: function(t) {
			return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
		}
	};
	obj.animate = function(e, p, ap) {
		var oa = obj.animation,
			zrtpr = oa.zrtween.prototype;
		if (!oa.h) {
			oa.h2 = function() {};
			oa.h = function(ct) {
				if (ct === undefined) ct = new Date().getTime();
				var mt = Math.max(oa.ft, ct - oa.lt);
				mt = Math.min(mt, Math.round(oa.ft * oa.maxFrameScale));
				var tl = oa.tweens.length,
					tween;
				for (var i = 0; i < tl; i++) {
					tween = oa.tweens[i];
					if (tween.status != 1) continue;
					tween.tt += mt * oa.timeScale * tween.timeScale;
					tween.qt = tween.tt - tween.ap.time;
					if (tween.qt > 0) tween.tt = tween.ap.time;
					tween.update(tween.e, tween.p, tween.ap);
					tween.render(tween.e, tween.p, tween.ap);
				}
				oa.tt += mt * oa.timeScale;
				oa.lt = ct;
				for (i = tl - 1; i >= 0; i--) {
					tween = oa.tweens[i];
					if (tween.status === 2) oa.tweens.splice(i, 1);
				}
				if (obj.autoCanvas) {
					for (var aci = 0; aci < obj.autoCanvas.length; aci++) {
						if (obj.autoCanvas[aci].invalidate) {
							obj.autoCanvas[aci].c[G.de](obj.cev('canvas_render'));
						}
					}
				}
				obj.de(obj.doc, 'animate_update');
				if (oa.RAF) window.requestAnimationFrame(oa.h);
			};
		}
		var ct = new Date().getTime();
		if (!oa.iid) {
			oa.ft = Math.round(1000 / oa.f);
			oa.st = ct;
			oa.lt = ct;
			oa.tt = 0;
			if (oa.RAF) {
				oa.iid = window.setInterval(oa.h2, oa.ft);
				window.requestAnimationFrame(oa.h);
			} else {
				oa.iid = window.setInterval(oa.h, oa.ft);
			}
		}
		var tween = {
			st: ct,
			lt: ct,
			tt: 0,
			e: e,
			ap: ap,
			p: p,
			oap: ap,
			op: p,
			tp: {},
			cp: {},
			status: 0,
			q: [],
			qi: 0,
			qt: 0,
			timeScale: 1
		};
		tween.render = zrtpr.render;
		tween.reset = zrtpr.reset;
		tween.to = zrtpr.to;
		tween.wait = zrtpr.wait;
		tween.update = zrtpr.update;
		tween.start = zrtpr.start;
		tween.stop = zrtpr.stop;
		oa.tweens.push(tween);
		if (ap.or === undefined) ap.or = ap.r;
		if (!ap.nostart) tween.start(e, p, ap);
		if (ap.ur || ap.update) tween.update(e, p, ap);
		if (ap.ur || ap.render) tween.render(e, p, ap);
		return tween;
	};
	obj.an = obj.animate;
	obj.setVal = function(v, nv) {
		var cpV = v ? parseFloat(v) : 0;
		var suf = v ? v.split(cpV + '')[1] : '';
		return nv + suf;
	};
	obj.fitBox = function(w, h, tw, th) {
		w = parseFloat(w);
		h = parseFloat(h);
		tw = parseFloat(tw);
		th = parseFloat(th);
		var scx = Math.min(w, tw);
		var scy = Math.min(h, th);
		var sc = Math.min(scx / w, scy / h);
		return {
			w: w,
			h: h,
			tw: tw,
			th: th,
			scx: scx,
			scy: scy,
			sc: sc
		};
	};
	obj.urlParam = function(o) {
		var es = '';
		for (var p in o) {
			if (o.hasOwnProperty(p)) {
				if (es.length > 0) es += '&';
				es += encodeURI(p + '=' + o[p]);
			}
		}
		return es;
	};
	obj.encParam = function(o) {
		if (o) {
			return '?' + obj.urlParam(o);
		}
		return '';
	};
	obj.request = function(p) {
		var m = p.method || 'POST';
		var d = p.data || {};
		var u = p.url;
		var dt = p.type || 'json';
		var ct = p.contentType || G.dt.ajs;
		var pd = p.processData !== undefined ? p.processData : true;
		var rt = p.responseType || 'json';
		var sd = d;
		var h = p.headers;
		var key;
		var a = p.async !== undefined ? p.async : true;

		if (dt === 'form') {
			if (pd) {
				sd = new FormData();
				for (key in d) sd.append(key, d[key]);
			}
			if (ct === true) ct = G.dt.mpfd;
		} else if (dt === 'file') {
			if (ct === true) ct = sd.type;
		} else if (dt === 'json') {
			if (pd) sd = JSON.stringify(d);
			if (ct === true) ct = G.dt.ajs;
		} else {
			if (pd) sd = obj.urlParam(d);
			if (ct === true) ct = G.dt.afue;
		}

		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			if (p.response) p.response(xhr.responseText, xhr.status);
			if (xhr.status === 200) {
				if (p.complete) {
					var responseData = xhr.responseText;
					if (rt === 'json') responseData = JSON.parse(responseData);
					p.complete(responseData);
				}
			} else if (p.fail) p.fail(xhr.responseText, xhr.status);
		};
		xhr.onerror = function() {
			if (p.error) p.error();
		};
		xhr.open(m, u, a);
		if (ct != G.dt.mpfd) xhr.setRequestHeader('Content-Type', ct);
		if (h) {
			for (key in h) xhr.setRequestHeader(key, h[key]);
		}
		xhr.send(sd);
		return xhr;
	};
	obj.r = obj.request;
	obj.updateProgress = function(p) {
		return obj;
	};
	obj.onCreate = function() {
		if (params.onCreate) params.onCreate(obj);
		obj.updateProgress();
	};
	obj.updateProgress();
	window.setTimeout(obj.onCreate, 0);
	return obj;
}