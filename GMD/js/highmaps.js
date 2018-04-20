/*
 Highmaps JS v6.0.7 (2018-02-16)

 (c) 2011-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(S, J) {
	"object" === typeof module && module.exports ? module.exports = S.document ? J(S) : J: S.Highcharts = J(S)
})("undefined" !== typeof window ? window: this,
function(S) {
	var J = function() {
		var a = "undefined" === typeof S ? window: S,
		z = a.document,
		B = a.navigator && a.navigator.userAgent || "",
		y = z && z.createElementNS && !!z.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
		e = /(edge|msie|trident)/i.test(B) && !a.opera,
		g = -1 !== B.indexOf("Firefox"),
		t = -1 !== B.indexOf("Chrome"),
		u = g && 4 > parseInt(B.split("Firefox/")[1], 10);
		return a.Highcharts ? a.Highcharts.error(16, !0) : {
			product: "Highmaps",
			version: "6.0.7",
			deg2rad: 2 * Math.PI / 360,
			doc: z,
			hasBidiBug: u,
			hasTouch: z && void 0 !== z.documentElement.ontouchstart,
			isMS: e,
			isWebKit: -1 !== B.indexOf("AppleWebKit"),
			isFirefox: g,
			isChrome: t,
			isSafari: !t && -1 !== B.indexOf("Safari"),
			isTouchDevice: /(Mobile|Android|Windows Phone)/.test(B),
			SVG_NS: "http://www.w3.org/2000/svg",
			chartCount: 0,
			seriesTypes: {},
			symbolSizes: {},
			svg: y,
			win: a,
			marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
			noop: function() {},
			charts: []
		}
	} (); (function(a) {
		a.timers = [];
		var z = a.charts,
		B = a.doc,
		y = a.win;
		a.error = function(e, g) {
			e = a.isNumber(e) ? "Highcharts error #" + e + ": www.highcharts.com/errors/" + e: e;
			if (g) throw Error(e);
			y.console && console.log(e)
		};
		a.Fx = function(a, g, t) {
			this.options = g;
			this.elem = a;
			this.prop = t
		};
		a.Fx.prototype = {
			dSetter: function() {
				var a = this.paths[0],
				g = this.paths[1],
				t = [],
				u = this.now,
				q = a.length,
				r;
				if (1 === u) t = this.toD;
				else if (q === g.length && 1 > u) for (; q--;) r = parseFloat(a[q]),
				t[q] = isNaN(r) ? g[q] : u * parseFloat(g[q] - r) + r;
				else t = g;
				this.elem.attr("d", t, null, !0)
			},
			update: function() {
				var a = this.elem,
				g = this.prop,
				t = this.now,
				u = this.options.step;
				if (this[g + "Setter"]) this[g + "Setter"]();
				else a.attr ? a.element && a.attr(g, t, null, !0) : a.style[g] = t + this.unit;
				u && u.call(a, t, this)
			},
			run: function(e, g, t) {
				var u = this,
				q = u.options,
				r = function(a) {
					return r.stopped ? !1 : u.step(a)
				},
				m = y.requestAnimationFrame ||
				function(a) {
					setTimeout(a, 13)
				},
				f = function() {
					for (var h = 0; h < a.timers.length; h++) a.timers[h]() || a.timers.splice(h--, 1);
					a.timers.length && m(f)
				};
				e === g ? (delete q.curAnim[this.prop], q.complete && 0 === a.keys(q.curAnim).length && q.complete.call(this.elem)) : (this.startTime = +new Date, this.start = e, this.end = g, this.unit = t, this.now = this.start, this.pos = 0, r.elem = this.elem, r.prop = this.prop, r() && 1 === a.timers.push(r) && m(f))
			},
			step: function(e) {
				var g = +new Date,
				t, u = this.options,
				q = this.elem,
				r = u.complete,
				m = u.duration,
				f = u.curAnim;
				q.attr && !q.element ? e = !1 : e || g >= m + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), t = f[this.prop] = !0, a.objectEach(f,
				function(a) { ! 0 !== a && (t = !1)
				}), t && r && r.call(q), e = !1) : (this.pos = u.easing((g - this.startTime) / m), this.now = this.start + (this.end - this.start) * this.pos, this.update(), e = !0);
				return e
			},
			initPath: function(e, g, t) {
				function u(a) {
					var b, d;
					for (c = a.length; c--;) b = "M" === a[c] || "L" === a[c],
					d = /[a-zA-Z]/.test(a[c + 3]),
					b && d && a.splice(c + 1, 0, a[c + 1], a[c + 2], a[c + 1], a[c + 2])
				}
				function q(a, b) {
					for (; a.length < d;) {
						a[0] = b[d - a.length];
						var f = a.slice(0, k); [].splice.apply(a, [0, 0].concat(f));
						l && (f = a.slice(a.length - k), [].splice.apply(a, [a.length, 0].concat(f)), c--)
					}
					a[0] = "M"
				}
				function r(a, c) {
					for (var f = (d - a.length) / k; 0 < f && f--;) b = a.slice().splice(a.length / C - k, k * C),
					b[0] = c[d - k - f * k],
					n && (b[k - 6] = b[k - 2], b[k - 5] = b[k - 1]),
					[].splice.apply(a, [a.length / C, 0].concat(b)),
					l && f--
				}
				g = g || "";
				var m, f = e.startX,
				h = e.endX,
				n = -1 < g.indexOf("C"),
				k = n ? 7 : 3,
				d,
				b,
				c;
				g = g.split(" ");
				t = t.slice();
				var l = e.isArea,
				C = l ? 2 : 1,
				K;
				n && (u(g), u(t));
				if (f && h) {
					for (c = 0; c < f.length; c++) if (f[c] === h[0]) {
						m = c;
						break
					} else if (f[0] === h[h.length - f.length + c]) {
						m = c;
						K = !0;
						break
					}
					void 0 === m && (g = [])
				}
				g.length && a.isNumber(m) && (d = t.length + m * C * k, K ? (q(g, t), r(t, g)) : (q(t, g), r(g, t)));
				return [g, t]
			}
		};
		a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function() {
			this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
		};
		a.merge = function() {
			var e, g = arguments,
			t, u = {},
			q = function(e, m) {
				"object" !== typeof e && (e = {});
				a.objectEach(m,
				function(f, h) { ! a.isObject(f, !0) || a.isClass(f) || a.isDOMElement(f) ? e[h] = m[h] : e[h] = q(e[h] || {},
					f)
				});
				return e
			}; ! 0 === g[0] && (u = g[1], g = Array.prototype.slice.call(g, 2));
			t = g.length;
			for (e = 0; e < t; e++) u = q(u, g[e]);
			return u
		};
		a.pInt = function(a, g) {
			return parseInt(a, g || 10)
		};
		a.isString = function(a) {
			return "string" === typeof a
		};
		a.isArray = function(a) {
			a = Object.prototype.toString.call(a);
			return "[object Array]" === a || "[object Array Iterator]" === a
		};
		a.isObject = function(e, g) {
			return !! e && "object" === typeof e && (!g || !a.isArray(e))
		};
		a.isDOMElement = function(e) {
			return a.isObject(e) && "number" === typeof e.nodeType
		};
		a.isClass = function(e) {
			var g = e && e.constructor;
			return ! (!a.isObject(e, !0) || a.isDOMElement(e) || !g || !g.name || "Object" === g.name)
		};
		a.isNumber = function(a) {
			return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
		};
		a.erase = function(a, g) {
			for (var e = a.length; e--;) if (a[e] === g) {
				a.splice(e, 1);
				break
			}
		};
		a.defined = function(a) {
			return void 0 !== a && null !== a
		};
		a.attr = function(e, g, t) {
			var u;
			a.isString(g) ? a.defined(t) ? e.setAttribute(g, t) : e && e.getAttribute && (u = e.getAttribute(g)) : a.defined(g) && a.isObject(g) && a.objectEach(g,
			function(a, g) {
				e.setAttribute(g, a)
			});
			return u
		};
		a.splat = function(e) {
			return a.isArray(e) ? e: [e]
		};
		a.syncTimeout = function(a, g, t) {
			if (g) return setTimeout(a, g, t);
			a.call(0, t)
		};
		a.extend = function(a, g) {
			var e;
			a || (a = {});
			for (e in g) a[e] = g[e];
			return a
		};
		a.pick = function() {
			var a = arguments,
			g, t, u = a.length;
			for (g = 0; g < u; g++) if (t = a[g], void 0 !== t && null !== t) return t
		};
		a.css = function(e, g) {
			a.isMS && !a.svg && g && void 0 !== g.opacity && (g.filter = "alpha(opacity\x3d" + 100 * g.opacity + ")");
			a.extend(e.style, g)
		};
		a.createElement = function(e, g, t, u, q) {
			e = B.createElement(e);
			var r = a.css;
			g && a.extend(e, g);
			q && r(e, {
				padding: 0,
				border: "none",
				margin: 0
			});
			t && r(e, t);
			u && u.appendChild(e);
			return e
		};
		a.extendClass = function(e, g) {
			var t = function() {};
			t.prototype = new e;
			a.extend(t.prototype, g);
			return t
		};
		a.pad = function(a, g, t) {
			return Array((g || 2) + 1 - String(a).length).join(t || 0) + a
		};
		a.relativeLength = function(a, g, t) {
			return /%$/.test(a) ? g * parseFloat(a) / 100 + (t || 0) : parseFloat(a)
		};
		a.wrap = function(a, g, t) {
			var e = a[g];
			a[g] = function() {
				var a = Array.prototype.slice.call(arguments),
				g = arguments,
				m = this;
				m.proceed = function() {
					e.apply(m, arguments.length ? arguments: g)
				};
				a.unshift(e);
				a = t.apply(this, a);
				m.proceed = null;
				return a
			}
		};
		a.formatSingle = function(e, g, t) {
			var u = /\.([0-9])/,
			q = a.defaultOptions.lang;
			/f$/.test(e) ? (t = (t = e.match(u)) ? t[1] : -1, null !== g && (g = a.numberFormat(g, t, q.decimalPoint, -1 < e.indexOf(",") ? q.thousandsSep: ""))) : g = (t || a.time).dateFormat(e, g);
			return g
		};
		a.format = function(e, g, t) {
			for (var u = "{",
			q = !1,
			r, m, f, h, n = [], k; e;) {
				u = e.indexOf(u);
				if ( - 1 === u) break;
				r = e.slice(0, u);
				if (q) {
					r = r.split(":");
					m = r.shift().split(".");
					h = m.length;
					k = g;
					for (f = 0; f < h; f++) k && (k = k[m[f]]);
					r.length && (k = a.formatSingle(r.join(":"), k, t));
					n.push(k)
				} else n.push(r);
				e = e.slice(u + 1);
				u = (q = !q) ? "}": "{"
			}
			n.push(e);
			return n.join("")
		};
		a.getMagnitude = function(a) {
			return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
		};
		a.normalizeTickInterval = function(e, g, t, u, q) {
			var r, m = e;
			t = a.pick(t, 1);
			r = e / t;
			g || (g = q ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === u && (1 === t ? g = a.grep(g,
			function(a) {
				return 0 === a % 1
			}) : .1 >= t && (g = [1 / t])));
			for (u = 0; u < g.length && !(m = g[u], q && m * t >= e || !q && r <= (g[u] + (g[u + 1] || g[u])) / 2); u++);
			return m = a.correctFloat(m * t, -Math.round(Math.log(.001) / Math.LN10))
		};
		a.stableSort = function(a, g) {
			var e = a.length,
			u, q;
			for (q = 0; q < e; q++) a[q].safeI = q;
			a.sort(function(a, m) {
				u = g(a, m);
				return 0 === u ? a.safeI - m.safeI: u
			});
			for (q = 0; q < e; q++) delete a[q].safeI
		};
		a.arrayMin = function(a) {
			for (var g = a.length,
			e = a[0]; g--;) a[g] < e && (e = a[g]);
			return e
		};
		a.arrayMax = function(a) {
			for (var g = a.length,
			e = a[0]; g--;) a[g] > e && (e = a[g]);
			return e
		};
		a.destroyObjectProperties = function(e, g) {
			a.objectEach(e,
			function(a, u) {
				a && a !== g && a.destroy && a.destroy();
				delete e[u]
			})
		};
		a.discardElement = function(e) {
			var g = a.garbageBin;
			g || (g = a.createElement("div"));
			e && g.appendChild(e);
			g.innerHTML = ""
		};
		a.correctFloat = function(a, g) {
			return parseFloat(a.toPrecision(g || 14))
		};
		a.setAnimation = function(e, g) {
			g.renderer.globalAnimation = a.pick(e, g.options.chart.animation, !0)
		};
		a.animObject = function(e) {
			return a.isObject(e) ? a.merge(e) : {
				duration: e ? 500 : 0
			}
		};
		a.timeUnits = {
			millisecond: 1,
			second: 1E3,
			minute: 6E4,
			hour: 36E5,
			day: 864E5,
			week: 6048E5,
			month: 24192E5,
			year: 314496E5
		};
		a.numberFormat = function(e, g, t, u) {
			e = +e || 0;
			g = +g;
			var q = a.defaultOptions.lang,
			r = (e.toString().split(".")[1] || "").split("e")[0].length,
			m,
			f,
			h = e.toString().split("e"); - 1 === g ? g = Math.min(r, 20) : a.isNumber(g) ? g && h[1] && 0 > h[1] && (m = g + +h[1], 0 <= m ? (h[0] = ( + h[0]).toExponential(m).split("e")[0], g = m) : (h[0] = h[0].split(".")[0] || 0, e = 20 > g ? (h[0] * Math.pow(10, h[1])).toFixed(g) : 0, h[1] = 0)) : g = 2;
			f = (Math.abs(h[1] ? h[0] : e) + Math.pow(10, -Math.max(g, r) - 1)).toFixed(g);
			r = String(a.pInt(f));
			m = 3 < r.length ? r.length % 3 : 0;
			t = a.pick(t, q.decimalPoint);
			u = a.pick(u, q.thousandsSep);
			e = (0 > e ? "-": "") + (m ? r.substr(0, m) + u: "");
			e += r.substr(m).replace(/(\d{3})(?=\d)/g, "$1" + u);
			g && (e += t + f.slice( - g));
			h[1] && 0 !== +e && (e += "e" + h[1]);
			return e
		};
		Math.easeInOutSine = function(a) {
			return - .5 * (Math.cos(Math.PI * a) - 1)
		};
		a.getStyle = function(e, g, t) {
			if ("width" === g) return Math.min(e.offsetWidth, e.scrollWidth) - a.getStyle(e, "padding-left") - a.getStyle(e, "padding-right");
			if ("height" === g) return Math.min(e.offsetHeight, e.scrollHeight) - a.getStyle(e, "padding-top") - a.getStyle(e, "padding-bottom");
			y.getComputedStyle || a.error(27, !0);
			if (e = y.getComputedStyle(e, void 0)) e = e.getPropertyValue(g),
			a.pick(t, "opacity" !== g) && (e = a.pInt(e));
			return e
		};
		a.inArray = function(e, g) {
			return (a.indexOfPolyfill || Array.prototype.indexOf).call(g, e)
		};
		a.grep = function(e, g) {
			return (a.filterPolyfill || Array.prototype.filter).call(e, g)
		};
		a.find = Array.prototype.find ?
		function(a, g) {
			return a.find(g)
		}: function(a, g) {
			var e, u = a.length;
			for (e = 0; e < u; e++) if (g(a[e], e)) return a[e]
		};
		a.map = function(a, g) {
			for (var e = [], u = 0, q = a.length; u < q; u++) e[u] = g.call(a[u], a[u], u, a);
			return e
		};
		a.keys = function(e) {
			return (a.keysPolyfill || Object.keys).call(void 0, e)
		};
		a.reduce = function(e, g, t) {
			return (a.reducePolyfill || Array.prototype.reduce).call(e, g, t)
		};
		a.offset = function(a) {
			var g = B.documentElement;
			a = a.parentElement ? a.getBoundingClientRect() : {
				top: 0,
				left: 0
			};
			return {
				top: a.top + (y.pageYOffset || g.scrollTop) - (g.clientTop || 0),
				left: a.left + (y.pageXOffset || g.scrollLeft) - (g.clientLeft || 0)
			}
		};
		a.stop = function(e, g) {
			for (var t = a.timers.length; t--;) a.timers[t].elem !== e || g && g !== a.timers[t].prop || (a.timers[t].stopped = !0)
		};
		a.each = function(e, g, t) {
			return (a.forEachPolyfill || Array.prototype.forEach).call(e, g, t)
		};
		a.objectEach = function(a, g, t) {
			for (var e in a) a.hasOwnProperty(e) && g.call(t, a[e], e, a)
		};
		a.isPrototype = function(e) {
			return e === a.Axis.prototype || e === a.Chart.prototype || e === a.Point.prototype || e === a.Series.prototype || e === a.Tick.prototype
		};
		a.addEvent = function(e, g, t) {
			var u, q = e.addEventListener || a.addEventListenerPolyfill;
			u = a.isPrototype(e) ? "protoEvents": "hcEvents";
			u = e[u] = e[u] || {};
			q && q.call(e, g, t, !1);
			u[g] || (u[g] = []);
			u[g].push(t);
			return function() {
				a.removeEvent(e, g, t)
			}
		};
		a.removeEvent = function(e, g, t) {
			function u(f, h) {
				var m = e.removeEventListener || a.removeEventListenerPolyfill;
				m && m.call(e, f, h, !1)
			}
			function q(f) {
				var h, m;
				e.nodeName && (g ? (h = {},
				h[g] = !0) : h = f, a.objectEach(h,
				function(a, d) {
					if (f[d]) for (m = f[d].length; m--;) u(d, f[d][m])
				}))
			}
			var r, m;
			a.each(["protoEvents", "hcEvents"],
			function(f) {
				var h = e[f];
				h && (g ? (r = h[g] || [], t ? (m = a.inArray(t, r), -1 < m && (r.splice(m, 1), h[g] = r), u(g, t)) : (q(h), h[g] = [])) : (q(h), e[f] = {}))
			})
		};
		a.fireEvent = function(e, g, t, u) {
			var q, r, m, f, h;
			t = t || {};
			B.createEvent && (e.dispatchEvent || e.fireEvent) ? (q = B.createEvent("Events"), q.initEvent(g, !0, !0), a.extend(q, t), e.dispatchEvent ? e.dispatchEvent(q) : e.fireEvent(g, q)) : a.each(["protoEvents", "hcEvents"],
			function(n) {
				if (e[n]) for (r = e[n][g] || [], m = r.length, t.target || a.extend(t, {
					preventDefault: function() {
						t.defaultPrevented = !0
					},
					target: e,
					type: g
				}), f = 0; f < m; f++)(h = r[f]) && !1 === h.call(e, t) && t.preventDefault()
			});
			u && !t.defaultPrevented && u(t)
		};
		a.animate = function(e, g, t) {
			var u, q = "",
			r, m, f;
			a.isObject(t) || (f = arguments, t = {
				duration: f[2],
				easing: f[3],
				complete: f[4]
			});
			a.isNumber(t.duration) || (t.duration = 400);
			t.easing = "function" === typeof t.easing ? t.easing: Math[t.easing] || Math.easeInOutSine;
			t.curAnim = a.merge(g);
			a.objectEach(g,
			function(f, n) {
				a.stop(e, n);
				m = new a.Fx(e, t, n);
				r = null;
				"d" === n ? (m.paths = m.initPath(e, e.d, g.d), m.toD = g.d, u = 0, r = 1) : e.attr ? u = e.attr(n) : (u = parseFloat(a.getStyle(e, n)) || 0, "opacity" !== n && (q = "px"));
				r || (r = f);
				r && r.match && r.match("px") && (r = r.replace(/px/g, ""));
				m.run(u, r, q)
			})
		};
		a.seriesType = function(e, g, t, u, q) {
			var r = a.getOptions(),
			m = a.seriesTypes;
			r.plotOptions[e] = a.merge(r.plotOptions[g], t);
			m[e] = a.extendClass(m[g] ||
			function() {},
			u);
			m[e].prototype.type = e;
			q && (m[e].prototype.pointClass = a.extendClass(a.Point, q));
			return m[e]
		};
		a.uniqueKey = function() {
			var a = Math.random().toString(36).substring(2, 9),
			g = 0;
			return function() {
				return "highcharts-" + a + "-" + g++
			}
		} ();
		y.jQuery && (y.jQuery.fn.highcharts = function() {
			var e = [].slice.call(arguments);
			if (this[0]) return e[0] ? (new(a[a.isString(e[0]) ? e.shift() : "Chart"])(this[0], e[0], e[1]), this) : z[a.attr(this[0], "data-highcharts-chart")]
		})
	})(J); (function(a) {
		var z = a.each,
		B = a.isNumber,
		y = a.map,
		e = a.merge,
		g = a.pInt;
		a.Color = function(g) {
			if (! (this instanceof a.Color)) return new a.Color(g);
			this.init(g)
		};
		a.Color.prototype = {
			parsers: [{
				regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
				parse: function(a) {
					return [g(a[1]), g(a[2]), g(a[3]), parseFloat(a[4], 10)]
				}
			},
			{
				regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
				parse: function(a) {
					return [g(a[1]), g(a[2]), g(a[3]), 1]
				}
			}],
			names: {
				none: "rgba(255,255,255,0)",
				white: "#ffffff",
				black: "#000000"
			},
			init: function(g) {
				var e, q, r, m;
				if ((this.input = g = this.names[g && g.toLowerCase ? g.toLowerCase() : ""] || g) && g.stops) this.stops = y(g.stops,
				function(f) {
					return new a.Color(f[1])
				});
				else if (g && g.charAt && "#" === g.charAt() && (e = g.length, g = parseInt(g.substr(1), 16), 7 === e ? q = [(g & 16711680) >> 16, (g & 65280) >> 8, g & 255, 1] : 4 === e && (q = [(g & 3840) >> 4 | (g & 3840) >> 8, (g & 240) >> 4 | g & 240, (g & 15) << 4 | g & 15, 1])), !q) for (r = this.parsers.length; r--&&!q;) m = this.parsers[r],
				(e = m.regex.exec(g)) && (q = m.parse(e));
				this.rgba = q || []
			},
			get: function(a) {
				var g = this.input,
				q = this.rgba,
				r;
				this.stops ? (r = e(g), r.stops = [].concat(r.stops), z(this.stops,
				function(m, f) {
					r.stops[f] = [r.stops[f][0], m.get(a)]
				})) : r = q && B(q[0]) ? "rgb" === a || !a && 1 === q[3] ? "rgb(" + q[0] + "," + q[1] + "," + q[2] + ")": "a" === a ? q[3] : "rgba(" + q.join(",") + ")": g;
				return r
			},
			brighten: function(a) {
				var e, q = this.rgba;
				if (this.stops) z(this.stops,
				function(g) {
					g.brighten(a)
				});
				else if (B(a) && 0 !== a) for (e = 0; 3 > e; e++) q[e] += g(255 * a),
				0 > q[e] && (q[e] = 0),
				255 < q[e] && (q[e] = 255);
				return this
			},
			setOpacity: function(a) {
				this.rgba[3] = a;
				return this
			},
			tweenTo: function(a, g) {
				var e = this.rgba,
				r = a.rgba;
				r.length && e && e.length ? (a = 1 !== r[3] || 1 !== e[3], g = (a ? "rgba(": "rgb(") + Math.round(r[0] + (e[0] - r[0]) * (1 - g)) + "," + Math.round(r[1] + (e[1] - r[1]) * (1 - g)) + "," + Math.round(r[2] + (e[2] - r[2]) * (1 - g)) + (a ? "," + (r[3] + (e[3] - r[3]) * (1 - g)) : "") + ")") : g = a.input || "none";
				return g
			}
		};
		a.color = function(g) {
			return new a.Color(g)
		}
	})(J); (function(a) {
		var z = a.defined,
		B = a.each,
		y = a.extend,
		e = a.merge,
		g = a.pick,
		t = a.timeUnits,
		u = a.win;
		a.Time = function(a) {
			this.update(a, !1)
		};
		a.Time.prototype = {
			defaultOptions: {},
			update: function(q) {
				var r = g(q && q.useUTC, !0),
				m = this;
				this.options = q = e(!0, this.options || {},
				q);
				this.Date = q.Date || u.Date;
				this.timezoneOffset = (this.useUTC = r) && q.timezoneOffset;
				this.getTimezoneOffset = this.timezoneOffsetFunction(); (this.variableTimezone = !(r && !q.getTimezoneOffset && !q.timezone)) || this.timezoneOffset ? (this.get = function(a, h) {
					var f = h.getTime(),
					k = f - m.getTimezoneOffset(h);
					h.setTime(k);
					a = h["getUTC" + a]();
					h.setTime(f);
					return a
				},
				this.set = function(f, h, g) {
					var k;
					if ( - 1 !== a.inArray(f, ["Milliseconds", "Seconds", "Minutes"])) h["set" + f](g);
					else k = m.getTimezoneOffset(h),
					k = h.getTime() - k,
					h.setTime(k),
					h["setUTC" + f](g),
					f = m.getTimezoneOffset(h),
					k = h.getTime() + f,
					h.setTime(k)
				}) : r ? (this.get = function(a, h) {
					return h["getUTC" + a]()
				},
				this.set = function(a, h, m) {
					return h["setUTC" + a](m)
				}) : (this.get = function(a, h) {
					return h["get" + a]()
				},
				this.set = function(a, h, m) {
					return h["set" + a](m)
				})
			},
			makeTime: function(e, r, m, f, h, n) {
				var k, d, b;
				this.useUTC ? (k = this.Date.UTC.apply(0, arguments), d = this.getTimezoneOffset(k), k += d, b = this.getTimezoneOffset(k), d !== b ? k += b - d: d - 36E5 !== this.getTimezoneOffset(k - 36E5) || a.isSafari || (k -= 36E5)) : k = (new this.Date(e, r, g(m, 1), g(f, 0), g(h, 0), g(n, 0))).getTime();
				return k
			},
			timezoneOffsetFunction: function() {
				var g = this,
				e = this.options,
				m = u.moment;
				if (!this.useUTC) return function(a) {
					return 6E4 * (new Date(a)).getTimezoneOffset()
				};
				if (e.timezone) {
					if (m) return function(a) {
						return 6E4 * -m.tz(a, e.timezone).utcOffset()
					};
					a.error(25)
				}
				return this.useUTC && e.getTimezoneOffset ?
				function(a) {
					return 6E4 * e.getTimezoneOffset(a)
				}: function() {
					return 6E4 * (g.timezoneOffset || 0)
				}
			},
			dateFormat: function(g, e, m) {
				if (!a.defined(e) || isNaN(e)) return a.defaultOptions.lang.invalidDate || "";
				g = a.pick(g, "%Y-%m-%d %H:%M:%S");
				var f = this,
				h = new this.Date(e),
				n = this.get("Hours", h),
				k = this.get("Day", h),
				d = this.get("Date", h),
				b = this.get("Month", h),
				c = this.get("FullYear", h),
				l = a.defaultOptions.lang,
				C = l.weekdays,
				r = l.shortWeekdays,
				x = a.pad,
				h = a.extend({
					a: r ? r[k] : C[k].substr(0, 3),
					A: C[k],
					d: x(d),
					e: x(d, 2, " "),
					w: k,
					b: l.shortMonths[b],
					B: l.months[b],
					m: x(b + 1),
					y: c.toString().substr(2, 2),
					Y: c,
					H: x(n),
					k: n,
					I: x(n % 12 || 12),
					l: n % 12 || 12,
					M: x(f.get("Minutes", h)),
					p: 12 > n ? "AM": "PM",
					P: 12 > n ? "am": "pm",
					S: x(h.getSeconds()),
					L: x(Math.round(e % 1E3), 3)
				},
				a.dateFormats);
				a.objectEach(h,
				function(a, b) {
					for (; - 1 !== g.indexOf("%" + b);) g = g.replace("%" + b, "function" === typeof a ? a.call(f, e) : a)
				});
				return m ? g.substr(0, 1).toUpperCase() + g.substr(1) : g
			},
			getTimeTicks: function(a, e, m, f) {
				var h = this,
				n = [],
				k = {},
				d,
				b = new h.Date(e),
				c = a.unitRange,
				l = a.count || 1,
				C;
				if (z(e)) {
					h.set("Milliseconds", b, c >= t.second ? 0 : l * Math.floor(h.get("Milliseconds", b) / l));
					c >= t.second && h.set("Seconds", b, c >= t.minute ? 0 : l * Math.floor(h.get("Seconds", b) / l));
					c >= t.minute && h.set("Minutes", b, c >= t.hour ? 0 : l * Math.floor(h.get("Minutes", b) / l));
					c >= t.hour && h.set("Hours", b, c >= t.day ? 0 : l * Math.floor(h.get("Hours", b) / l));
					c >= t.day && h.set("Date", b, c >= t.month ? 1 : l * Math.floor(h.get("Date", b) / l));
					c >= t.month && (h.set("Month", b, c >= t.year ? 0 : l * Math.floor(h.get("Month", b) / l)), d = h.get("FullYear", b));
					c >= t.year && h.set("FullYear", b, d - d % l);
					c === t.week && h.set("Date", b, h.get("Date", b) - h.get("Day", b) + g(f, 1));
					d = h.get("FullYear", b);
					f = h.get("Month", b);
					var r = h.get("Date", b),
					x = h.get("Hours", b);
					e = b.getTime();
					h.variableTimezone && (C = m - e > 4 * t.month || h.getTimezoneOffset(e) !== h.getTimezoneOffset(m));
					b = b.getTime();
					for (e = 1; b < m;) n.push(b),
					b = c === t.year ? h.makeTime(d + e * l, 0) : c === t.month ? h.makeTime(d, f + e * l) : !C || c !== t.day && c !== t.week ? C && c === t.hour && 1 < l ? h.makeTime(d, f, r, x + e * l) : b + c * l: h.makeTime(d, f, r + e * l * (c === t.day ? 1 : 7)),
					e++;
					n.push(b);
					c <= t.hour && 1E4 > n.length && B(n,
					function(a) {
						0 === a % 18E5 && "000000000" === h.dateFormat("%H%M%S%L", a) && (k[a] = "day")
					})
				}
				n.info = y(a, {
					higherRanks: k,
					totalRange: c * l
				});
				return n
			}
		}
	})(J); (function(a) {
		var z = a.color,
		B = a.merge;
		a.defaultOptions = {
			colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
			symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
			lang: {
				loading: "Loading...",
				months: "January February March April May June July August September October November December".split(" "),
				shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
				weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
				decimalPoint: ".",
				numericSymbols: "kMGTPE".split(""),
				resetZoom: "Reset zoom",
				resetZoomTitle: "Reset zoom level 1:1",
				thousandsSep: " "
			},
			global: {},
			time: a.Time.prototype.defaultOptions,
			chart: {
				borderRadius: 0,
				defaultSeriesType: "line",
				ignoreHiddenSeries: !0,
				spacing: [10, 10, 15, 10],
				resetZoomButton: {
					theme: {
						zIndex: 6
					},
					position: {
						align: "right",
						x: -10,
						y: 10
					}
				},
				width: null,
				height: null,
				borderColor: "#335cad",
				backgroundColor: "#ffffff",
				plotBorderColor: "#cccccc"
			},
			title: {
				text: "Chart title",
				align: "center",
				margin: 15,
				widthAdjust: -44
			},
			subtitle: {
				text: "",
				align: "center",
				widthAdjust: -44
			},
			plotOptions: {},
			labels: {
				style: {
					position: "absolute",
					color: "#333333"
				}
			},
			legend: {
				enabled: !0,
				align: "center",
				layout: "horizontal",
				labelFormatter: function() {
					return this.name
				},
				borderColor: "#999999",
				borderRadius: 0,
				navigation: {
					activeColor: "#003399",
					inactiveColor: "#cccccc"
				},
				itemStyle: {
					color: "#333333",
					fontSize: "12px",
					fontWeight: "bold",
					textOverflow: "ellipsis"
				},
				itemHoverStyle: {
					color: "#000000"
				},
				itemHiddenStyle: {
					color: "#cccccc"
				},
				shadow: !1,
				itemCheckboxStyle: {
					position: "absolute",
					width: "13px",
					height: "13px"
				},
				squareSymbol: !0,
				symbolPadding: 5,
				verticalAlign: "bottom",
				x: 0,
				y: 0,
				title: {
					style: {
						fontWeight: "bold"
					}
				}
			},
			loading: {
				labelStyle: {
					fontWeight: "bold",
					position: "relative",
					top: "45%"
				},
				style: {
					position: "absolute",
					backgroundColor: "#ffffff",
					opacity: .5,
					textAlign: "center"
				}
			},
			tooltip: {
				enabled: !0,
				animation: a.svg,
				borderRadius: 3,
				dateTimeLabelFormats: {
					millisecond: "%A, %b %e, %H:%M:%S.%L",
					second: "%A, %b %e, %H:%M:%S",
					minute: "%A, %b %e, %H:%M",
					hour: "%A, %b %e, %H:%M",
					day: "%A, %b %e, %Y",
					week: "Week from %A, %b %e, %Y",
					month: "%B %Y",
					year: "%Y"
				},
				footerFormat: "",
				padding: 8,
				snap: a.isTouchDevice ? 25 : 10,
				backgroundColor: z("#f7f7f7").setOpacity(.85).get(),
				borderWidth: 1,
				headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
				pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
				shadow: !0,
				style: {
					color: "#333333",
					cursor: "default",
					fontSize: "12px",
					pointerEvents: "none",
					whiteSpace: "nowrap"
				}
			},
			credits: {
				enabled: !0,
				// href: "http://www.highcharts.com",
				position: {
					align: "right",
					x: -10,
					verticalAlign: "bottom",
					y: -5
				},
				style: {
					cursor: "pointer",
					color: "#999999",
					fontSize: "9px"
				},
				text: ""
			}
		};
		a.setOptions = function(y) {
			a.defaultOptions = B(!0, a.defaultOptions, y);
			a.time.update(B(a.defaultOptions.global, a.defaultOptions.time), !1);
			return a.defaultOptions
		};
		a.getOptions = function() {
			return a.defaultOptions
		};
		a.defaultPlotOptions = a.defaultOptions.plotOptions;
		a.time = new a.Time(B(a.defaultOptions.global, a.defaultOptions.time));
		a.dateFormat = function(y, e, g) {
			return a.time.dateFormat(y, e, g)
		}
	})(J); (function(a) {
		var z, B, y = a.addEvent,
		e = a.animate,
		g = a.attr,
		t = a.charts,
		u = a.color,
		q = a.css,
		r = a.createElement,
		m = a.defined,
		f = a.deg2rad,
		h = a.destroyObjectProperties,
		n = a.doc,
		k = a.each,
		d = a.extend,
		b = a.erase,
		c = a.grep,
		l = a.hasTouch,
		C = a.inArray,
		K = a.isArray,
		x = a.isFirefox,
		L = a.isMS,
		D = a.isObject,
		v = a.isString,
		w = a.isWebKit,
		G = a.merge,
		H = a.noop,
		I = a.objectEach,
		E = a.pick,
		p = a.pInt,
		F = a.removeEvent,
		O = a.stop,
		M = a.svg,
		N = a.SVG_NS,
		P = a.symbolSizes,
		Q = a.win;
		z = a.SVGElement = function() {
			return this
		};
		d(z.prototype, {
			opacity: 1,
			SVG_NS: N,
			textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
			init: function(a, b) {
				this.element = "span" === b ? r(b) : n.createElementNS(this.SVG_NS, b);
				this.renderer = a
			},
			animate: function(A, b, p) {
				b = a.animObject(E(b, this.renderer.globalAnimation, !0));
				0 !== b.duration ? (p && (b.complete = p), e(this, A, b)) : (this.attr(A, null, p), b.step && b.step.call(this));
				return this
			},
			colorGradient: function(A, b, p) {
				var c = this.renderer,
				d, f, l, F, h, w, N, R, g, n, M = [],
				O;
				A.radialGradient ? f = "radialGradient": A.linearGradient && (f = "linearGradient");
				f && (l = A[f], h = c.gradients, N = A.stops, n = p.radialReference, K(l) && (A[f] = l = {
					x1: l[0],
					y1: l[1],
					x2: l[2],
					y2: l[3],
					gradientUnits: "userSpaceOnUse"
				}), "radialGradient" === f && n && !m(l.gradientUnits) && (F = l, l = G(l, c.getRadialAttr(n, F), {
					gradientUnits: "userSpaceOnUse"
				})), I(l,
				function(a, A) {
					"id" !== A && M.push(A, a)
				}), I(N,
				function(a) {
					M.push(a)
				}), M = M.join(","), h[M] ? n = h[M].attr("id") : (l.id = n = a.uniqueKey(), h[M] = w = c.createElement(f).attr(l).add(c.defs), w.radAttr = F, w.stops = [], k(N,
				function(A) {
					0 === A[1].indexOf("rgba") ? (d = a.color(A[1]), R = d.get("rgb"), g = d.get("a")) : (R = A[1], g = 1);
					A = c.createElement("stop").attr({
						offset: A[0],
						"stop-color": R,
						"stop-opacity": g
					}).add(w);
					w.stops.push(A)
				})), O = "url(" + c.url + "#" + n + ")", p.setAttribute(b, O), p.gradient = M, A.toString = function() {
					return O
				})
			},
			applyTextOutline: function(A) {
				var p = this.element,
				c, d, f, l, F; - 1 !== A.indexOf("contrast") && (A = A.replace(/contrast/g, this.renderer.getContrast(p.style.fill)));
				A = A.split(" ");
				d = A[A.length - 1];
				if ((f = A[0]) && "none" !== f && a.svg) {
					this.fakeTS = !0;
					A = [].slice.call(p.getElementsByTagName("tspan"));
					this.ySetter = this.xSetter;
					f = f.replace(/(^[\d\.]+)(.*?)$/g,
					function(a, A, b) {
						return 2 * A + b
					});
					for (F = A.length; F--;) c = A[F],
					"highcharts-text-outline" === c.getAttribute("class") && b(A, p.removeChild(c));
					l = p.firstChild;
					k(A,
					function(a, A) {
						0 === A && (a.setAttribute("x", p.getAttribute("x")), A = p.getAttribute("y"), a.setAttribute("y", A || 0), null === A && p.setAttribute("y", 0));
						a = a.cloneNode(1);
						g(a, {
							"class": "highcharts-text-outline",
							fill: d,
							stroke: d,
							"stroke-width": f,
							"stroke-linejoin": "round"
						});
						p.insertBefore(a, l)
					})
				}
			},
			attr: function(a, b, p, c) {
				var A, d = this.element,
				f, l = this,
				k, F;
				"string" === typeof a && void 0 !== b && (A = a, a = {},
				a[A] = b);
				"string" === typeof a ? l = (this[a + "Getter"] || this._defaultGetter).call(this, a, d) : (I(a,
				function(A, b) {
					k = !1;
					c || O(this, b);
					this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(b) && (f || (this.symbolAttr(a), f = !0), k = !0); ! this.rotation || "x" !== b && "y" !== b || (this.doTransform = !0);
					k || (F = this[b + "Setter"] || this._defaultSetter, F.call(this, A, b, d), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(b) && this.updateShadows(b, A, F))
				},
				this), this.afterSetters());
				p && p.call(this);
				return l
			},
			afterSetters: function() {
				this.doTransform && (this.updateTransform(), this.doTransform = !1)
			},
			updateShadows: function(a, b, p) {
				for (var A = this.shadows,
				c = A.length; c--;) p.call(A[c], "height" === a ? Math.max(b - (A[c].cutHeight || 0), 0) : "d" === a ? this.d: b, a, A[c])
			},
			addClass: function(a, b) {
				var A = this.attr("class") || ""; - 1 === A.indexOf(a) && (b || (a = (A + (A ? " ": "") + a).replace("  ", " ")), this.attr("class", a));
				return this
			},
			hasClass: function(a) {
				return - 1 !== C(a, (this.attr("class") || "").split(" "))
			},
			removeClass: function(a) {
				return this.attr("class", (this.attr("class") || "").replace(a, ""))
			},
			symbolAttr: function(a) {
				var b = this;
				k("x y r start end width height innerR anchorX anchorY".split(" "),
				function(A) {
					b[A] = E(a[A], b[A])
				});
				b.attr({
					d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
				})
			},
			clip: function(a) {
				return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")": "none")
			},
			crisp: function(a, b) {
				var A;
				b = b || a.strokeWidth || 0;
				A = Math.round(b) % 2 / 2;
				a.x = Math.floor(a.x || this.x || 0) + A;
				a.y = Math.floor(a.y || this.y || 0) + A;
				a.width = Math.floor((a.width || this.width || 0) - 2 * A);
				a.height = Math.floor((a.height || this.height || 0) - 2 * A);
				m(a.strokeWidth) && (a.strokeWidth = b);
				return a
			},
			css: function(a) {
				var b = this.styles,
				A = {},
				c = this.element,
				f, l = "",
				k, F = !b,
				h = ["textOutline", "textOverflow", "width"];
				a && a.color && (a.fill = a.color);
				b && I(a,
				function(a, p) {
					a !== b[p] && (A[p] = a, F = !0)
				});
				F && (b && (a = d(b, A)), f = this.textWidth = a && a.width && "auto" !== a.width && "text" === c.nodeName.toLowerCase() && p(a.width), this.styles = a, f && !M && this.renderer.forExport && delete a.width, c.namespaceURI === this.SVG_NS ? (k = function(a, b) {
					return "-" + b.toLowerCase()
				},
				I(a,
				function(a, b) { - 1 === C(b, h) && (l += b.replace(/([A-Z])/g, k) + ":" + a + ";")
				}), l && g(c, "style", l)) : q(c, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
				return this
			},
			strokeWidth: function() {
				return this["stroke-width"] || 0
			},
			on: function(a, b) {
				var A = this,
				p = A.element;
				l && "click" === a ? (p.ontouchstart = function(a) {
					A.touchEventFired = Date.now();
					a.preventDefault();
					b.call(p, a)
				},
				p.onclick = function(a) { ( - 1 === Q.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (A.touchEventFired || 0)) && b.call(p, a)
				}) : p["on" + a] = b;
				return this
			},
			setRadialReference: function(a) {
				var b = this.renderer.gradients[this.element.gradient];
				this.element.radialReference = a;
				b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
				return this
			},
			translate: function(a, b) {
				return this.attr({
					translateX: a,
					translateY: b
				})
			},
			invert: function(a) {
				this.inverted = a;
				this.updateTransform();
				return this
			},
			updateTransform: function() {
				var a = this.translateX || 0,
				b = this.translateY || 0,
				p = this.scaleX,
				c = this.scaleY,
				d = this.inverted,
				f = this.rotation,
				l = this.matrix,
				k = this.element;
				d && (a += this.width, b += this.height);
				a = ["translate(" + a + "," + b + ")"];
				m(l) && a.push("matrix(" + l.join(",") + ")");
				d ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + E(this.rotationOriginX, k.getAttribute("x"), 0) + " " + E(this.rotationOriginY, k.getAttribute("y") || 0) + ")"); (m(p) || m(c)) && a.push("scale(" + E(p, 1) + " " + E(c, 1) + ")");
				a.length && k.setAttribute("transform", a.join(" "))
			},
			toFront: function() {
				var a = this.element;
				a.parentNode.appendChild(a);
				return this
			},
			align: function(a, p, c) {
				var A, d, f, l, k = {};
				d = this.renderer;
				f = d.alignedObjects;
				var F, h;
				if (a) {
					if (this.alignOptions = a, this.alignByTranslate = p, !c || v(c)) this.alignTo = A = c || "renderer",
					b(f, this),
					f.push(this),
					c = null
				} else a = this.alignOptions,
				p = this.alignByTranslate,
				A = this.alignTo;
				c = E(c, d[A], d);
				A = a.align;
				d = a.verticalAlign;
				f = (c.x || 0) + (a.x || 0);
				l = (c.y || 0) + (a.y || 0);
				"right" === A ? F = 1 : "center" === A && (F = 2);
				F && (f += (c.width - (a.width || 0)) / F);
				k[p ? "translateX": "x"] = Math.round(f);
				"bottom" === d ? h = 1 : "middle" === d && (h = 2);
				h && (l += (c.height - (a.height || 0)) / h);
				k[p ? "translateY": "y"] = Math.round(l);
				this[this.placed ? "animate": "attr"](k);
				this.placed = !0;
				this.alignAttr = k;
				return this
			},
			getBBox: function(a, b) {
				var p, c = this.renderer,
				A, l = this.element,
				F = this.styles,
				h, w = this.textStr,
				N, g = c.cache,
				G = c.cacheKeys,
				n;
				b = E(b, this.rotation);
				A = b * f;
				h = F && F.fontSize;
				m(w) && (n = w.toString(), -1 === n.indexOf("\x3c") && (n = n.replace(/[0-9]/g, "0")), n += ["", b || 0, h, F && F.width, F && F.textOverflow].join());
				n && !a && (p = g[n]);
				if (!p) {
					if (l.namespaceURI === this.SVG_NS || c.forExport) {
						try { (N = this.fakeTS &&
							function(a) {
								k(l.querySelectorAll(".highcharts-text-outline"),
								function(b) {
									b.style.display = a
								})
							}) && N("none"),
							p = l.getBBox ? d({},
							l.getBBox()) : {
								width: l.offsetWidth,
								height: l.offsetHeight
							},
							N && N("")
						} catch(W) {}
						if (!p || 0 > p.width) p = {
							width: 0,
							height: 0
						}
					} else p = this.htmlGetBBox();
					c.isSVG && (a = p.width, c = p.height, F && "11px" === F.fontSize && 17 === Math.round(c) && (p.height = c = 14), b && (p.width = Math.abs(c * Math.sin(A)) + Math.abs(a * Math.cos(A)), p.height = Math.abs(c * Math.cos(A)) + Math.abs(a * Math.sin(A))));
					if (n && 0 < p.height) {
						for (; 250 < G.length;) delete g[G.shift()];
						g[n] || G.push(n);
						g[n] = p
					}
				}
				return p
			},
			show: function(a) {
				return this.attr({
					visibility: a ? "inherit": "visible"
				})
			},
			hide: function() {
				return this.attr({
					visibility: "hidden"
				})
			},
			fadeOut: function(a) {
				var b = this;
				b.animate({
					opacity: 0
				},
				{
					duration: a || 150,
					complete: function() {
						b.attr({
							y: -9999
						})
					}
				})
			},
			add: function(a) {
				var b = this.renderer,
				p = this.element,
				c;
				a && (this.parentGroup = a);
				this.parentInverted = a && a.inverted;
				void 0 !== this.textStr && b.buildText(this);
				this.added = !0;
				if (!a || a.handleZ || this.zIndex) c = this.zIndexSetter();
				c || (a ? a.element: b.box).appendChild(p);
				if (this.onAdd) this.onAdd();
				return this
			},
			safeRemoveChild: function(a) {
				var b = a.parentNode;
				b && b.removeChild(a)
			},
			destroy: function() {
				var a = this,
				p = a.element || {},
				c = a.renderer.isSVG && "SPAN" === p.nodeName && a.parentGroup,
				d = p.ownerSVGElement,
				l = a.clipPath;
				p.onclick = p.onmouseout = p.onmouseover = p.onmousemove = p.point = null;
				O(a);
				l && d && (k(d.querySelectorAll("[clip-path],[CLIP-PATH]"),
				function(a) {
					var b = a.getAttribute("clip-path"),
					p = l.element.id; ( - 1 < b.indexOf("(#" + p + ")") || -1 < b.indexOf('("#' + p + '")')) && a.removeAttribute("clip-path")
				}), a.clipPath = l.destroy());
				if (a.stops) {
					for (d = 0; d < a.stops.length; d++) a.stops[d] = a.stops[d].destroy();
					a.stops = null
				}
				a.safeRemoveChild(p);
				for (a.destroyShadows(); c && c.div && 0 === c.div.childNodes.length;) p = c.parentGroup,
				a.safeRemoveChild(c.div),
				delete c.div,
				c = p;
				a.alignTo && b(a.renderer.alignedObjects, a);
				I(a,
				function(b, p) {
					delete a[p]
				});
				return null
			},
			shadow: function(a, b, p) {
				var c = [],
				d,
				A,
				l = this.element,
				f,
				k,
				F,
				h;
				if (!a) this.destroyShadows();
				else if (!this.shadows) {
					k = E(a.width, 3);
					F = (a.opacity || .15) / k;
					h = this.parentInverted ? "(-1,-1)": "(" + E(a.offsetX, 1) + ", " + E(a.offsetY, 1) + ")";
					for (d = 1; d <= k; d++) A = l.cloneNode(0),
					f = 2 * k + 1 - 2 * d,
					g(A, {
						isShadow: "true",
						stroke: a.color || "#000000",
						"stroke-opacity": F * d,
						"stroke-width": f,
						transform: "translate" + h,
						fill: "none"
					}),
					p && (g(A, "height", Math.max(g(A, "height") - f, 0)), A.cutHeight = f),
					b ? b.element.appendChild(A) : l.parentNode && l.parentNode.insertBefore(A, l),
					c.push(A);
					this.shadows = c
				}
				return this
			},
			destroyShadows: function() {
				k(this.shadows || [],
				function(a) {
					this.safeRemoveChild(a)
				},
				this);
				this.shadows = void 0
			},
			xGetter: function(a) {
				"circle" === this.element.nodeName && ("x" === a ? a = "cx": "y" === a && (a = "cy"));
				return this._defaultGetter(a)
			},
			_defaultGetter: function(a) {
				a = E(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
				/^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
				return a
			},
			dSetter: function(a, b, p) {
				a && a.join && (a = a.join(" "));
				/(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
				this[b] !== a && (p.setAttribute(b, a), this[b] = a)
			},
			dashstyleSetter: function(a) {
				var b, c = this["stroke-width"];
				"inherit" === c && (c = 1);
				if (a = a && a.toLowerCase()) {
					a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
					for (b = a.length; b--;) a[b] = p(a[b]) * c;
					a = a.join(",").replace(/NaN/g, "none");
					this.element.setAttribute("stroke-dasharray", a)
				}
			},
			alignSetter: function(a) {
				this.alignValue = a;
				this.element.setAttribute("text-anchor", {
					left: "start",
					center: "middle",
					right: "end"
				} [a])
			},
			opacitySetter: function(a, b, p) {
				this[b] = a;
				p.setAttribute(b, a)
			},
			titleSetter: function(a) {
				var b = this.element.getElementsByTagName("title")[0];
				b || (b = n.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
				b.firstChild && b.removeChild(b.firstChild);
				b.appendChild(n.createTextNode(String(E(a), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
			},
			textSetter: function(a) {
				a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
			},
			fillSetter: function(a, b, p) {
				"string" === typeof a ? p.setAttribute(b, a) : a && this.colorGradient(a, b, p)
			},
			visibilitySetter: function(a, b, p) {
				"inherit" === a ? p.removeAttribute(b) : this[b] !== a && p.setAttribute(b, a);
				this[b] = a
			},
			zIndexSetter: function(a, b) {
				var c = this.renderer,
				d = this.parentGroup,
				l = (d || c).element || c.box,
				f,
				k = this.element,
				F,
				A,
				c = l === c.box;
				f = this.added;
				var h;
				m(a) && (k.zIndex = a, a = +a, this[b] === a && (f = !1), this[b] = a);
				if (f) { (a = this.zIndex) && d && (d.handleZ = !0);
					b = l.childNodes;
					for (h = b.length - 1; 0 <= h && !F; h--) if (d = b[h], f = d.zIndex, A = !m(f), d !== k) if (0 > a && A && !c && !h) l.insertBefore(k, b[h]),
					F = !0;
					else if (p(f) <= a || A && (!m(a) || 0 <= a)) l.insertBefore(k, b[h + 1] || null),
					F = !0;
					F || (l.insertBefore(k, b[c ? 3 : 0] || null), F = !0)
				}
				return F
			},
			_defaultSetter: function(a, b, p) {
				p.setAttribute(b, a)
			}
		});
		z.prototype.yGetter = z.prototype.xGetter;
		z.prototype.translateXSetter = z.prototype.translateYSetter = z.prototype.rotationSetter = z.prototype.verticalAlignSetter = z.prototype.rotationOriginXSetter = z.prototype.rotationOriginYSetter = z.prototype.scaleXSetter = z.prototype.scaleYSetter = z.prototype.matrixSetter = function(a, b) {
			this[b] = a;
			this.doTransform = !0
		};
		z.prototype["stroke-widthSetter"] = z.prototype.strokeSetter = function(a, b, p) {
			this[b] = a;
			this.stroke && this["stroke-width"] ? (z.prototype.fillSetter.call(this, this.stroke, "stroke", p), p.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (p.removeAttribute("stroke"), this.hasStroke = !1)
		};
		B = a.SVGRenderer = function() {
			this.init.apply(this, arguments)
		};
		d(B.prototype, {
			Element: z,
			SVG_NS: N,
			init: function(a, b, p, c, d, l) {
				var f;
				c = this.createElement("svg").attr({
					version: "1.1",
					"class": "highcharts-root"
				}).css(this.getStyle(c));
				f = c.element;
				a.appendChild(f);
				g(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && g(f, "xmlns", this.SVG_NS);
				this.isSVG = !0;
				this.box = f;
				this.boxWrapper = c;
				this.alignedObjects = [];
				this.url = (x || w) && n.getElementsByTagName("base").length ? Q.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
				this.createElement("desc").add().element.appendChild(n.createTextNode("Created with Highmaps 6.0.7"));
				this.defs = this.createElement("defs").add();
				this.allowHTML = l;
				this.forExport = d;
				this.gradients = {};
				this.cache = {};
				this.cacheKeys = [];
				this.imgCount = 0;
				this.setSize(b, p, !1);
				var k;
				x && a.getBoundingClientRect && (b = function() {
					q(a, {
						left: 0,
						top: 0
					});
					k = a.getBoundingClientRect();
					q(a, {
						left: Math.ceil(k.left) - k.left + "px",
						top: Math.ceil(k.top) - k.top + "px"
					})
				},
				b(), this.unSubPixelFix = y(Q, "resize", b))
			},
			getStyle: function(a) {
				return this.style = d({
					fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
					fontSize: "12px"
				},
				a)
			},
			setStyle: function(a) {
				this.boxWrapper.css(this.getStyle(a))
			},
			isHidden: function() {
				return ! this.boxWrapper.getBBox().width
			},
			destroy: function() {
				var a = this.defs;
				this.box = null;
				this.boxWrapper = this.boxWrapper.destroy();
				h(this.gradients || {});
				this.gradients = null;
				a && (this.defs = a.destroy());
				this.unSubPixelFix && this.unSubPixelFix();
				return this.alignedObjects = null
			},
			createElement: function(a) {
				var b = new this.Element;
				b.init(this, a);
				return b
			},
			draw: H,
			getRadialAttr: function(a, b) {
				return {
					cx: a[0] - a[2] / 2 + b.cx * a[2],
					cy: a[1] - a[2] / 2 + b.cy * a[2],
					r: b.r * a[2]
				}
			},
			getSpanWidth: function(a) {
				return a.getBBox(!0).width
			},
			applyEllipsis: function(a, b, p, c) {
				var d = a.rotation,
				l = p,
				f, k = 0,
				F = p.length,
				h = function(a) {
					b.removeChild(b.firstChild);
					a && b.appendChild(n.createTextNode(a))
				},
				A;
				a.rotation = 0;
				l = this.getSpanWidth(a, b);
				if (A = l > c) {
					for (; k <= F;) f = Math.ceil((k + F) / 2),
					l = p.substring(0, f) + "\u2026",
					h(l),
					l = this.getSpanWidth(a, b),
					k === F ? k = F + 1 : l > c ? F = f - 1 : k = f;
					0 === F && h("")
				}
				a.rotation = d;
				return A
			},
			escapes: {
				"\x26": "\x26amp;",
				"\x3c": "\x26lt;",
				"\x3e": "\x26gt;",
				"'": "\x26#39;",
				'"': "\x26quot;"
			},
			buildText: function(a) {
				var b = a.element,
				d = this,
				l = d.forExport,
				f = E(a.textStr, "").toString(),
				F = -1 !== f.indexOf("\x3c"),
				h = b.childNodes,
				A,
				w,
				m,
				G,
				O = g(b, "x"),
				e = a.styles,
				x = a.textWidth,
				H = e && e.lineHeight,
				v = e && e.textOutline,
				P = e && "ellipsis" === e.textOverflow,
				D = e && "nowrap" === e.whiteSpace,
				r = e && e.fontSize,
				K,
				L,
				t = h.length,
				e = x && !a.added && this.box,
				Q = function(a) {
					var c;
					c = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize: r || d.style.fontSize || 12;
					return H ? p(H) : d.fontMetrics(c, a.getAttribute("style") ? a: b).h
				},
				u = function(a, b) {
					I(d.escapes,
					function(p, c) {
						b && -1 !== C(p, b) || (a = a.toString().replace(new RegExp(p, "g"), c))
					});
					return a
				};
				K = [f, P, D, H, v, r, x].join();
				if (K !== a.textCache) {
					for (a.textCache = K; t--;) b.removeChild(h[t]);
					F || v || P || x || -1 !== f.indexOf(" ") ? (A = /<.*class="([^"]+)".*>/, w = /<.*style="([^"]+)".*>/, m = /<.*href="([^"]+)".*>/, e && e.appendChild(b), f = F ? f.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [f], f = c(f,
					function(a) {
						return "" !== a
					}), k(f,
					function(p, c) {
						var f, F = 0;
						p = p.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
						f = p.split("|||");
						k(f,
						function(p) {
							if ("" !== p || 1 === f.length) {
								var k = {},
								//h = n.createElementNS(d.SVG_NS, "tspan"),
								e,
								C;
								//A.test(p) && (e = p.match(A)[1], g(h, "class", e));
								w.test(p) && (C = p.match(w)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), g(h, "style", C));
								//m.test(p) && !l && (g(h, "onclick", 'location.href\x3d"' + p.match(m)[1] + '"'), g(h, "class", "highcharts-anchor"), q(h, {
									//cursor: "pointer"
								//}));
								p = u(p.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
								if (" " !== p) {
									h.appendChild(n.createTextNode(p));
									F ? k.dx = 0 : c && null !== O && (k.x = O);
									g(h, k);
									// b.appendChild(h); ! F && L && (!M && l && q(h, {
									// 	display: "none"
									// }), g(h, "dy", Q(h)));
									if (x) {
										k = p.replace(/([^\^])-/g, "$1- ").split(" ");
										e = 1 < f.length || c || 1 < k.length && !D;
										var H = [],
										v,
										r = Q(h),
										E = a.rotation;
										for (P && (G = d.applyEllipsis(a, h, p, x)); ! P && e && (k.length || H.length);) a.rotation = 0,
										v = d.getSpanWidth(a, h),
										p = v > x,
										void 0 === G && (G = p),
										p && 1 !== k.length ? (h.removeChild(h.firstChild), H.unshift(k.pop())) : (k = H, H = [], k.length && !D && (h = n.createElementNS(N, "tspan"), g(h, {
											dy: r,
											x: O
										}), C && g(h, "style", C), b.appendChild(h)), v > x && (x = v)),
										k.length && h.appendChild(n.createTextNode(k.join(" ").replace(/- /g, "-")));
										a.rotation = E
									}
									F++
								}
							}
						});
						L = L || b.childNodes.length
					}), G && a.attr("title", u(a.textStr, ["\x26lt;", "\x26gt;"])), e && e.removeChild(b), v && a.applyTextOutline && a.applyTextOutline(v)) : b.appendChild(n.createTextNode(u(f)))
				}
			},
			getContrast: function(a) {
				a = u(a).rgba;
				return 510 < a[0] + a[1] + a[2] ? "#000000": "#FFFFFF"
			},
			button: function(a, b, p, c, f, l, k, F, h) {
				var A = this.label(a, b, p, h, null, null, null, null, "button"),
				w = 0;
				A.attr(G({
					padding: 8,
					r: 2
				},
				f));
				var N, g, m, n;
				f = G({
					fill: "#f7f7f7",
					stroke: "#cccccc",
					"stroke-width": 1,
					style: {
						color: "#333333",
						cursor: "pointer",
						fontWeight: "normal"
					}
				},
				f);
				N = f.style;
				delete f.style;
				l = G(f, {
					fill: "#e6e6e6"
				},
				l);
				g = l.style;
				delete l.style;
				k = G(f, {
					fill: "#e6ebf5",
					style: {
						color: "#000000",
						fontWeight: "bold"
					}
				},
				k);
				m = k.style;
				delete k.style;
				F = G(f, {
					style: {
						color: "#cccccc"
					}
				},
				F);
				n = F.style;
				delete F.style;
				y(A.element, L ? "mouseover": "mouseenter",
				function() {
					3 !== w && A.setState(1)
				});
				y(A.element, L ? "mouseout": "mouseleave",
				function() {
					3 !== w && A.setState(w)
				});
				A.setState = function(a) {
					1 !== a && (A.state = w = a);
					A.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
					A.attr([f, l, k, F][a || 0]).css([N, g, m, n][a || 0])
				};
				A.attr(f).css(d({
					cursor: "default"
				},
				N));
				return A.on("click",
				function(a) {
					3 !== w && c.call(A, a)
				})
			},
			crispLine: function(a, b) {
				a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
				a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
				return a
			},
			path: function(a) {
				var b = {
					fill: "none"
				};
				K(a) ? b.d = a: D(a) && d(b, a);
				return this.createElement("path").attr(b)
			},
			circle: function(a, b, p) {
				a = D(a) ? a: {
					x: a,
					y: b,
					r: p
				};
				b = this.createElement("circle");
				b.xSetter = b.ySetter = function(a, b, p) {
					p.setAttribute("c" + b, a)
				};
				return b.attr(a)
			},
			arc: function(a, b, p, c, d, f) {
				D(a) ? (c = a, b = c.y, p = c.r, a = c.x) : c = {
					innerR: c,
					start: d,
					end: f
				};
				a = this.symbol("arc", a, b, p, p, c);
				a.r = p;
				return a
			},
			rect: function(a, b, p, c, d, f) {
				d = D(a) ? a.r: d;
				var l = this.createElement("rect");
				a = D(a) ? a: void 0 === a ? {}: {
					x: a,
					y: b,
					width: Math.max(p, 0),
					height: Math.max(c, 0)
				};
				void 0 !== f && (a.strokeWidth = f, a = l.crisp(a));
				a.fill = "none";
				d && (a.r = d);
				l.rSetter = function(a, b, p) {
					g(p, {
						rx: a,
						ry: a
					})
				};
				return l.attr(a)
			},
			setSize: function(a, b, p) {
				var c = this.alignedObjects,
				d = c.length;
				this.width = a;
				this.height = b;
				for (this.boxWrapper.animate({
					width: a,
					height: b
				},
				{
					step: function() {
						this.attr({
							viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
						})
					},
					duration: E(p, !0) ? void 0 : 0
				}); d--;) c[d].align()
			},
			g: function(a) {
				var b = this.createElement("g");
				return a ? b.attr({
					"class": "highcharts-" + a
				}) : b
			},
			image: function(a, b, p, c, f) {
				var l = {
					preserveAspectRatio: "none"
				};
				1 < arguments.length && d(l, {
					x: b,
					y: p,
					width: c,
					height: f
				});
				l = this.createElement("image").attr(l);
				l.element.setAttributeNS ? l.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : l.element.setAttribute("hc-svg-href", a);
				return l
			},
			symbol: function(a, b, p, c, f, l) {
				var F = this,
				h, w = /^url\((.*?)\)$/,
				N = w.test(a),
				g = !N && (this.symbols[a] ? a: "circle"),
				A = g && this.symbols[g],
				G = m(b) && A && A.call(this.symbols, Math.round(b), Math.round(p), c, f, l),
				e,
				M;
				A ? (h = this.path(G), h.attr("fill", "none"), d(h, {
					symbolName: g,
					x: b,
					y: p,
					width: c,
					height: f
				}), l && d(h, l)) : N && (e = a.match(w)[1], h = this.image(e), h.imgwidth = E(P[e] && P[e].width, l && l.width), h.imgheight = E(P[e] && P[e].height, l && l.height), M = function() {
					h.attr({
						width: h.width,
						height: h.height
					})
				},
				k(["width", "height"],
				function(a) {
					h[a + "Setter"] = function(a, b) {
						var p = {},
						c = this["img" + b],
						d = "width" === b ? "translateX": "translateY";
						this[b] = a;
						m(c) && (this.element && this.element.setAttribute(b, c), this.alignByTranslate || (p[d] = ((this[b] || 0) - c) / 2, this.attr(p)))
					}
				}), m(b) && h.attr({
					x: b,
					y: p
				}), h.isImg = !0, m(h.imgwidth) && m(h.imgheight) ? M() : (h.attr({
					width: 0,
					height: 0
				}), r("img", {
					onload: function() {
						var a = t[F.chartIndex];
						0 === this.width && (q(this, {
							position: "absolute",
							top: "-999em"
						}), n.body.appendChild(this));
						P[e] = {
							width: this.width,
							height: this.height
						};
						h.imgwidth = this.width;
						h.imgheight = this.height;
						h.element && M();
						this.parentNode && this.parentNode.removeChild(this);
						F.imgCount--;
						if (!F.imgCount && a && a.onload) a.onload()
					},
					src: e
				}), this.imgCount++));
				return h
			},
			symbols: {
				circle: function(a, b, p, c) {
					return this.arc(a + p / 2, b + c / 2, p / 2, c / 2, {
						start: 0,
						end: 2 * Math.PI,
						open: !1
					})
				},
				square: function(a, b, p, c) {
					return ["M", a, b, "L", a + p, b, a + p, b + c, a, b + c, "Z"]
				},
				triangle: function(a, b, p, c) {
					return ["M", a + p / 2, b, "L", a + p, b + c, a, b + c, "Z"]
				},
				"triangle-down": function(a, b, p, c) {
					return ["M", a, b, "L", a + p, b, a + p / 2, b + c, "Z"]
				},
				diamond: function(a, b, p, c) {
					return ["M", a + p / 2, b, "L", a + p, b + c / 2, a + p / 2, b + c, a, b + c / 2, "Z"]
				},
				arc: function(a, b, p, c, d) {
					var f = d.start,
					l = d.r || p,
					k = d.r || c || p,
					F = d.end - .001;
					p = d.innerR;
					c = E(d.open, .001 > Math.abs(d.end - d.start - 2 * Math.PI));
					var h = Math.cos(f),
					w = Math.sin(f),
					N = Math.cos(F),
					F = Math.sin(F);
					d = .001 > d.end - f - Math.PI ? 0 : 1;
					l = ["M", a + l * h, b + k * w, "A", l, k, 0, d, 1, a + l * N, b + k * F];
					m(p) && l.push(c ? "M": "L", a + p * N, b + p * F, "A", p, p, 0, d, 0, a + p * h, b + p * w);
					l.push(c ? "": "Z");
					return l
				},
				callout: function(a, b, p, c, d) {
					var f = Math.min(d && d.r || 0, p, c),
					l = f + 6,
					k = d && d.anchorX;
					d = d && d.anchorY;
					var F;
					F = ["M", a + f, b, "L", a + p - f, b, "C", a + p, b, a + p, b, a + p, b + f, "L", a + p, b + c - f, "C", a + p, b + c, a + p, b + c, a + p - f, b + c, "L", a + f, b + c, "C", a, b + c, a, b + c, a, b + c - f, "L", a, b + f, "C", a, b, a, b, a + f, b];
					k && k > p ? d > b + l && d < b + c - l ? F.splice(13, 3, "L", a + p, d - 6, a + p + 6, d, a + p, d + 6, a + p, b + c - f) : F.splice(13, 3, "L", a + p, c / 2, k, d, a + p, c / 2, a + p, b + c - f) : k && 0 > k ? d > b + l && d < b + c - l ? F.splice(33, 3, "L", a, d + 6, a - 6, d, a, d - 6, a, b + f) : F.splice(33, 3, "L", a, c / 2, k, d, a, c / 2, a, b + f) : d && d > c && k > a + l && k < a + p - l ? F.splice(23, 3, "L", k + 6, b + c, k, b + c + 6, k - 6, b + c, a + f, b + c) : d && 0 > d && k > a + l && k < a + p - l && F.splice(3, 3, "L", k - 6, b, k, b - 6, k + 6, b, p - f, b);
					return F
				}
			},
			clipRect: function(b, p, c, d) {
				var f = a.uniqueKey(),
				l = this.createElement("clipPath").attr({
					id: f
				}).add(this.defs);
				b = this.rect(b, p, c, d, 0).add(l);
				b.id = f;
				b.clipPath = l;
				b.count = 0;
				return b
			},
			text: function(a, b, p, c) {
				var d = {};
				if (c && (this.allowHTML || !this.forExport)) return this.html(a, b, p);
				d.x = Math.round(b || 0);
				p && (d.y = Math.round(p));
				if (a || 0 === a) d.text = a;
				a = this.createElement("text").attr(d);
				c || (a.xSetter = function(a, b, p) {
					var c = p.getElementsByTagName("tspan"),
					d,
					f = p.getAttribute(b),
					l;
					for (l = 0; l < c.length; l++) d = c[l],
					d.getAttribute(b) === f && d.setAttribute(b, a);
					p.setAttribute(b, a)
				});
				return a
			},
			fontMetrics: function(a, b) {
				a = a || b && b.style && b.style.fontSize || this.style && this.style.fontSize;
				a = /px/.test(a) ? p(a) : /em/.test(a) ? parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f: 16) : 12;
				b = 24 > a ? a + 3 : Math.round(1.2 * a);
				return {
					h: b,
					b: Math.round(.8 * b),
					f: a
				}
			},
			rotCorr: function(a, b, p) {
				var c = a;
				b && p && (c = Math.max(c * Math.cos(b * f), 4));
				return {
					x: -a / 3 * Math.sin(b * f),
					y: c
				}
			},
			label: function(b, p, c, f, l, h, w, N, g) {
				var n = this,
				e = n.g("button" !== g && "label"),
				M = e.text = n.text("", 0, 0, w).attr({
					zIndex: 1
				}),
				O,
				x,
				C = 0,
				H = 3,
				v = 0,
				P,
				D,
				A,
				r,
				E,
				I = {},
				q,
				K,
				L = /^url\((.*?)\)$/.test(f),
				t = L,
				Q,
				u,
				R,
				T;
				g && e.addClass("highcharts-" + g);
				t = L;
				Q = function() {
					return (q || 0) % 2 / 2
				};
				u = function() {
					var a = M.element.style,
					b = {};
					x = (void 0 === P || void 0 === D || E) && m(M.textStr) && M.getBBox();
					e.width = (P || x.width || 0) + 2 * H + v;
					e.height = (D || x.height || 0) + 2 * H;
					K = H + n.fontMetrics(a && a.fontSize, M).b;
					t && (O || (e.box = O = n.symbols[f] || L ? n.symbol(f) : n.rect(), O.addClass(("button" === g ? "": "highcharts-label-box") + (g ? " highcharts-" + g + "-box": "")), O.add(e), a = Q(), b.x = a, b.y = (N ? -K: 0) + a), b.width = Math.round(e.width), b.height = Math.round(e.height), O.attr(d(b, I)), I = {})
				};
				R = function() {
					var a = v + H,
					b;
					b = N ? 0 : K;
					m(P) && x && ("center" === E || "right" === E) && (a += {
						center: .5,
						right: 1
					} [E] * (P - x.width));
					if (a !== M.x || b !== M.y) M.attr("x", a),
					void 0 !== b && M.attr("y", b);
					M.x = a;
					M.y = b
				};
				T = function(a, b) {
					O ? O.attr(a, b) : I[a] = b
				};
				e.onAdd = function() {
					M.add(e);
					e.attr({
						text: b || 0 === b ? b: "",
						x: p,
						y: c
					});
					O && m(l) && e.attr({
						anchorX: l,
						anchorY: h
					})
				};
				e.widthSetter = function(b) {
					P = a.isNumber(b) ? b: null
				};
				e.heightSetter = function(a) {
					D = a
				};
				e["text-alignSetter"] = function(a) {
					E = a
				};
				e.paddingSetter = function(a) {
					m(a) && a !== H && (H = e.padding = a, R())
				};
				e.paddingLeftSetter = function(a) {
					m(a) && a !== v && (v = a, R())
				};
				e.alignSetter = function(a) {
					a = {
						left: 0,
						center: .5,
						right: 1
					} [a];
					a !== C && (C = a, x && e.attr({
						x: A
					}))
				};
				e.textSetter = function(a) {
					void 0 !== a && M.textSetter(a);
					u();
					R()
				};
				e["stroke-widthSetter"] = function(a, b) {
					a && (t = !0);
					q = this["stroke-width"] = a;
					T(b, a)
				};
				e.strokeSetter = e.fillSetter = e.rSetter = function(a, b) {
					"r" !== b && ("fill" === b && a && (t = !0), e[b] = a);
					T(b, a)
				};
				e.anchorXSetter = function(a, b) {
					l = e.anchorX = a;
					T(b, Math.round(a) - Q() - A)
				};
				e.anchorYSetter = function(a, b) {
					h = e.anchorY = a;
					T(b, a - r)
				};
				e.xSetter = function(a) {
					e.x = a;
					C && (a -= C * ((P || x.width) + 2 * H));
					A = Math.round(a);
					e.attr("translateX", A)
				};
				e.ySetter = function(a) {
					r = e.y = Math.round(a);
					e.attr("translateY", r)
				};
				var y = e.css;
				return d(e, {
					css: function(a) {
						if (a) {
							var b = {};
							a = G(a);
							k(e.textProps,
							function(p) {
								void 0 !== a[p] && (b[p] = a[p], delete a[p])
							});
							M.css(b)
						}
						return y.call(e, a)
					},
					getBBox: function() {
						return {
							width: x.width + 2 * H,
							height: x.height + 2 * H,
							x: x.x - H,
							y: x.y - H
						}
					},
					shadow: function(a) {
						a && (u(), O && O.shadow(a));
						return e
					},
					destroy: function() {
						F(e.element, "mouseenter");
						F(e.element, "mouseleave");
						M && (M = M.destroy());
						O && (O = O.destroy());
						z.prototype.destroy.call(e);
						e = n = u = R = T = null
					}
				})
			}
		});
		a.Renderer = B
	})(J); (function(a) {
		var z = a.attr,
		B = a.createElement,
		y = a.css,
		e = a.defined,
		g = a.each,
		t = a.extend,
		u = a.isFirefox,
		q = a.isMS,
		r = a.isWebKit,
		m = a.pick,
		f = a.pInt,
		h = a.SVGRenderer,
		n = a.win,
		k = a.wrap;
		t(a.SVGElement.prototype, {
			htmlCss: function(a) {
				var b = this.element;
				if (b = a && "SPAN" === b.tagName && a.width) delete a.width,
				this.textWidth = b,
				this.updateTransform();
				a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
				this.styles = t(this.styles, a);
				y(this.element, a);
				return this
			},
			htmlGetBBox: function() {
				var a = this.element;
				return {
					x: a.offsetLeft,
					y: a.offsetTop,
					width: a.offsetWidth,
					height: a.offsetHeight
				}
			},
			htmlUpdateTransform: function() {
				if (this.added) {
					var a = this.renderer,
					b = this.element,
					c = this.translateX || 0,
					l = this.translateY || 0,
					k = this.x || 0,
					h = this.y || 0,
					m = this.textAlign || "left",
					n = {
						left: 0,
						center: .5,
						right: 1
					} [m],
					D = this.styles,
					v = D && D.whiteSpace;
					y(b, {
						marginLeft: c,
						marginTop: l
					});
					this.shadows && g(this.shadows,
					function(a) {
						y(a, {
							marginLeft: c + 1,
							marginTop: l + 1
						})
					});
					this.inverted && g(b.childNodes,
					function(c) {
						a.invertChild(c, b)
					});
					if ("SPAN" === b.tagName) {
						var D = this.rotation,
						w = this.textWidth && f(this.textWidth),
						G = [D, m, b.innerHTML, this.textWidth, this.textAlign].join(),
						H; (H = w !== this.oldTextWidth) && !(H = w > this.oldTextWidth) && ((H = this.textPxLength) || (y(b, {
							width: "",
							whiteSpace: v || "nowrap"
						}), H = b.offsetWidth), H = H > w);
						H && /[ \-]/.test(b.textContent || b.innerText) && (y(b, {
							width: w + "px",
							display: "block",
							whiteSpace: v || "normal"
						}), this.oldTextWidth = w);
						G !== this.cTT && (v = a.fontMetrics(b.style.fontSize).b, e(D) && D !== (this.oldRotation || 0) && this.setSpanRotation(D, n, v), this.getSpanCorrection(this.textPxLength || b.offsetWidth, v, n, D, m));
						y(b, {
							left: k + (this.xCorr || 0) + "px",
							top: h + (this.yCorr || 0) + "px"
						});
						this.cTT = G;
						this.oldRotation = D
					}
				} else this.alignOnAdd = !0
			},
			setSpanRotation: function(a, b, c) {
				var d = {},
				f = this.renderer.getTransformKey();
				d[f] = d.transform = "rotate(" + a + "deg)";
				d[f + (u ? "Origin": "-origin")] = d.transformOrigin = 100 * b + "% " + c + "px";
				y(this.element, d)
			},
			getSpanCorrection: function(a, b, c) {
				this.xCorr = -a * c;
				this.yCorr = -b
			}
		});
		t(h.prototype, {
			getTransformKey: function() {
				return q && !/Edge/.test(n.navigator.userAgent) ? "-ms-transform": r ? "-webkit-transform": u ? "MozTransform": n.opera ? "-o-transform": ""
			},
			html: function(a, b, c) {
				var d = this.createElement("span"),
				f = d.element,
				h = d.renderer,
				e = h.isSVG,
				n = function(a, b) {
					g(["opacity", "visibility"],
					function(c) {
						k(a, c + "Setter",
						function(a, c, d, f) {
							a.call(this, c, d, f);
							b[d] = c
						})
					})
				};
				d.textSetter = function(a) {
					a !== f.innerHTML && delete this.bBox;
					this.textStr = a;
					f.innerHTML = m(a, "");
					d.doTransform = !0
				};
				e && n(d, d.element.style);
				d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter = function(a, b) {
					"align" === b && (b = "textAlign");
					d[b] = a;
					d.doTransform = !0
				};
				d.afterSetters = function() {
					this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
				};
				d.attr({
					text: a,
					x: Math.round(b),
					y: Math.round(c)
				}).css({
					fontFamily: this.style.fontFamily,
					fontSize: this.style.fontSize,
					position: "absolute"
				});
				f.style.whiteSpace = "nowrap";
				d.css = d.htmlCss;
				e && (d.add = function(a) {
					var b, c = h.box.parentNode,
					k = [];
					if (this.parentGroup = a) {
						if (b = a.div, !b) {
							for (; a;) k.push(a),
							a = a.parentGroup;
							g(k.reverse(),
							function(a) {
								function f(b, p) {
									a[p] = b;
									"translateX" === p ? l.left = b + "px": l.top = b + "px";
									a.doTransform = !0
								}
								var l, p = z(a.element, "class");
								p && (p = {
									className: p
								});
								b = a.div = a.div || B("div", p, {
									position: "absolute",
									left: (a.translateX || 0) + "px",
									top: (a.translateY || 0) + "px",
									display: a.display,
									opacity: a.opacity,
									pointerEvents: a.styles && a.styles.pointerEvents
								},
								b || c);
								l = b.style;
								t(a, {
									classSetter: function(a) {
										return function(b) {
											this.element.setAttribute("class", b);
											a.className = b
										}
									} (b),
									on: function() {
										k[0].div && d.on.apply({
											element: k[0].div
										},
										arguments);
										return a
									},
									translateXSetter: f,
									translateYSetter: f
								});
								n(a, l)
							})
						}
					} else b = c;
					b.appendChild(f);
					d.added = !0;
					d.alignOnAdd && d.htmlUpdateTransform();
					return d
				});
				return d
			}
		})
	})(J); (function(a) {
		var z = a.correctFloat,
		B = a.defined,
		y = a.destroyObjectProperties,
		e = a.isNumber,
		g = a.merge,
		t = a.pick,
		u = a.deg2rad;
		a.Tick = function(a, e, g, f) {
			this.axis = a;
			this.pos = e;
			this.type = g || "";
			this.isNewLabel = this.isNew = !0;
			g || f || this.addLabel()
		};
		a.Tick.prototype = {
			addLabel: function() {
				var a = this.axis,
				e = a.options,
				m = a.chart,
				f = a.categories,
				h = a.names,
				n = this.pos,
				k = e.labels,
				d = a.tickPositions,
				b = n === d[0],
				c = n === d[d.length - 1],
				h = f ? t(f[n], h[n], n) : n,
				f = this.label,
				d = d.info,
				l;
				a.isDatetimeAxis && d && (l = e.dateTimeLabelFormats[d.higherRanks[n] || d.unitName]);
				this.isFirst = b;
				this.isLast = c;
				e = a.labelFormatter.call({
					axis: a,
					chart: m,
					isFirst: b,
					isLast: c,
					dateTimeLabelFormat: l,
					value: a.isLog ? z(a.lin2log(h)) : h,
					pos: n
				});
				if (B(f)) f && f.attr({
					text: e
				});
				else {
					if (this.label = f = B(e) && k.enabled ? m.renderer.text(e, 0, 0, k.useHTML).css(g(k.style)).add(a.labelGroup) : null) f.textPxLength = f.getBBox().width;
					this.rotation = 0
				}
			},
			getLabelSize: function() {
				return this.label ? this.label.getBBox()[this.axis.horiz ? "height": "width"] : 0
			},
			handleOverflow: function(a) {
				var e = this.axis,
				g = e.options.labels,
				f = a.x,
				h = e.chart.chartWidth,
				n = e.chart.spacing,
				k = t(e.labelLeft, Math.min(e.pos, n[3])),
				n = t(e.labelRight, Math.max(e.isRadial ? 0 : e.pos + e.len, h - n[1])),
				d = this.label,
				b = this.rotation,
				c = {
					left: 0,
					center: .5,
					right: 1
				} [e.labelAlign || d.attr("align")],
				l = d.getBBox().width,
				C = e.getSlotWidth(),
				q = C,
				x = 1,
				L,
				D = {};
				if (b || !1 === g.overflow) 0 > b && f - c * l < k ? L = Math.round(f / Math.cos(b * u) - k) : 0 < b && f + c * l > n && (L = Math.round((h - f) / Math.cos(b * u)));
				else if (h = f + (1 - c) * l, f - c * l < k ? q = a.x + q * (1 - c) - k: h > n && (q = n - a.x + q * c, x = -1), q = Math.min(C, q), q < C && "center" === e.labelAlign && (a.x += x * (C - q - c * (C - Math.min(l, q)))), l > q || e.autoRotation && (d.styles || {}).width) L = q;
				L && (D.width = L, (g.style || {}).textOverflow || (D.textOverflow = "ellipsis"), d.css(D))
			},
			getPosition: function(e, g, m, f) {
				var h = this.axis,
				n = h.chart,
				k = f && n.oldChartHeight || n.chartHeight;
				return {
					x: e ? a.correctFloat(h.translate(g + m, null, null, f) + h.transB) : h.left + h.offset + (h.opposite ? (f && n.oldChartWidth || n.chartWidth) - h.right - h.left: 0),
					y: e ? k - h.bottom + h.offset - (h.opposite ? h.height: 0) : a.correctFloat(k - h.translate(g + m, null, null, f) - h.transB)
				}
			},
			getLabelPosition: function(a, e, g, f, h, n, k, d) {
				var b = this.axis,
				c = b.transA,
				l = b.reversed,
				m = b.staggerLines,
				q = b.tickRotCorr || {
					x: 0,
					y: 0
				},
				x = h.y,
				r = f || b.reserveSpaceDefault ? 0 : -b.labelOffset * ("center" === b.labelAlign ? .5 : 1);
				B(x) || (x = 0 === b.side ? g.rotation ? -8 : -g.getBBox().height: 2 === b.side ? q.y + 8 : Math.cos(g.rotation * u) * (q.y - g.getBBox(!1, 0).height / 2));
				a = a + h.x + r + q.x - (n && f ? n * c * (l ? -1 : 1) : 0);
				e = e + x - (n && !f ? n * c * (l ? 1 : -1) : 0);
				m && (g = k / (d || 1) % m, b.opposite && (g = m - g - 1), e += b.labelOffset / m * g);
				return {
					x: a,
					y: Math.round(e)
				}
			},
			getMarkPath: function(a, e, g, f, h, n) {
				return n.crispLine(["M", a, e, "L", a + (h ? 0 : -g), e + (h ? g: 0)], f)
			},
			renderGridLine: function(a, e, g) {
				var f = this.axis,
				h = f.options,
				n = this.gridLine,
				k = {},
				d = this.pos,
				b = this.type,
				c = f.tickmarkOffset,
				l = f.chart.renderer,
				m = b ? b + "Grid": "grid",
				r = h[m + "LineWidth"],
				x = h[m + "LineColor"],
				h = h[m + "LineDashStyle"];
				n || (k.stroke = x, k["stroke-width"] = r, h && (k.dashstyle = h), b || (k.zIndex = 1), a && (k.opacity = 0), this.gridLine = n = l.path().attr(k).addClass("highcharts-" + (b ? b + "-": "") + "grid-line").add(f.gridGroup));
				if (!a && n && (a = f.getPlotLinePath(d + c, n.strokeWidth() * g, a, !0))) n[this.isNew ? "attr": "animate"]({
					d: a,
					opacity: e
				})
			},
			renderMark: function(a, e, g) {
				var f = this.axis,
				h = f.options,
				n = f.chart.renderer,
				k = this.type,
				d = k ? k + "Tick": "tick",
				b = f.tickSize(d),
				c = this.mark,
				l = !c,
				m = a.x;
				a = a.y;
				var r = t(h[d + "Width"], !k && f.isXAxis ? 1 : 0),
				h = h[d + "Color"];
				b && (f.opposite && (b[0] = -b[0]), l && (this.mark = c = n.path().addClass("highcharts-" + (k ? k + "-": "") + "tick").add(f.axisGroup), c.attr({
					stroke: h,
					"stroke-width": r
				})), c[l ? "attr": "animate"]({
					d: this.getMarkPath(m, a, b[0], c.strokeWidth() * g, f.horiz, n),
					opacity: e
				}))
			},
			renderLabel: function(a, g, m, f) {
				var h = this.axis,
				n = h.horiz,
				k = h.options,
				d = this.label,
				b = k.labels,
				c = b.step,
				h = h.tickmarkOffset,
				l = !0,
				C = a.x;
				a = a.y;
				d && e(C) && (d.xy = a = this.getLabelPosition(C, a, d, n, b, h, f, c), this.isFirst && !this.isLast && !t(k.showFirstLabel, 1) || this.isLast && !this.isFirst && !t(k.showLastLabel, 1) ? l = !1 : !n || b.step || b.rotation || g || 0 === m || this.handleOverflow(a), c && f % c && (l = !1), l && e(a.y) ? (a.opacity = m, d[this.isNewLabel ? "attr": "animate"](a), this.isNewLabel = !1) : (d.attr("y", -9999), this.isNewLabel = !0))
			},
			render: function(e, g, m) {
				var f = this.axis,
				h = f.horiz,
				n = this.getPosition(h, this.pos, f.tickmarkOffset, g),
				k = n.x,
				d = n.y,
				f = h && k === f.pos + f.len || !h && d === f.pos ? -1 : 1;
				m = t(m, 1);
				this.isActive = !0;
				this.renderGridLine(g, m, f);
				this.renderMark(n, m, f);
				this.renderLabel(n, g, m, e);
				this.isNew = !1;
				a.fireEvent(this, "afterRender")
			},
			destroy: function() {
				y(this, this.axis)
			}
		}
	})(J);
	var V = function(a) {
		var z = a.addEvent,
		B = a.animObject,
		y = a.arrayMax,
		e = a.arrayMin,
		g = a.color,
		t = a.correctFloat,
		u = a.defaultOptions,
		q = a.defined,
		r = a.deg2rad,
		m = a.destroyObjectProperties,
		f = a.each,
		h = a.extend,
		n = a.fireEvent,
		k = a.format,
		d = a.getMagnitude,
		b = a.grep,
		c = a.inArray,
		l = a.isArray,
		C = a.isNumber,
		K = a.isString,
		x = a.merge,
		L = a.normalizeTickInterval,
		D = a.objectEach,
		v = a.pick,
		w = a.removeEvent,
		G = a.splat,
		H = a.syncTimeout,
		I = a.Tick,
		E = function() {
			this.init.apply(this, arguments)
		};
		a.extend(E.prototype, {
			defaultOptions: {
				dateTimeLabelFormats: {
					millisecond: "%H:%M:%S.%L",
					second: "%H:%M:%S",
					minute: "%H:%M",
					hour: "%H:%M",
					day: "%e. %b",
					week: "%e. %b",
					month: "%b '%y",
					year: "%Y"
				},
				endOnTick: !1,
				labels: {
					enabled: !0,
					style: {
						color: "#666666",
						cursor: "default",
						fontSize: "11px"
					},
					x: 0
				},
				maxPadding: .01,
				minorTickLength: 2,
				minorTickPosition: "outside",
				minPadding: .01,
				startOfWeek: 1,
				startOnTick: !1,
				tickLength: 10,
				tickmarkPlacement: "between",
				tickPixelInterval: 100,
				tickPosition: "outside",
				title: {
					align: "middle",
					style: {
						color: "#666666"
					}
				},
				type: "linear",
				minorGridLineColor: "#f2f2f2",
				minorGridLineWidth: 1,
				minorTickColor: "#999999",
				lineColor: "#ccd6eb",
				lineWidth: 1,
				gridLineColor: "#e6e6e6",
				tickColor: "#ccd6eb"
			},
			defaultYAxisOptions: {
				endOnTick: !0,
				tickPixelInterval: 72,
				showLastLabel: !0,
				labels: {
					x: -8
				},
				maxPadding: .05,
				minPadding: .05,
				startOnTick: !0,
				title: {
					rotation: 270,
					text: "Values"
				},
				stackLabels: {
					allowOverlap: !1,
					enabled: !1,
					formatter: function() {
						return a.numberFormat(this.total, -1)
					},
					style: {
						fontSize: "11px",
						fontWeight: "bold",
						color: "#000000",
						textOutline: "1px contrast"
					}
				},
				gridLineWidth: 1,
				lineWidth: 0
			},
			defaultLeftAxisOptions: {
				labels: {
					x: -15
				},
				title: {
					rotation: 270
				}
			},
			defaultRightAxisOptions: {
				labels: {
					x: 15
				},
				title: {
					rotation: 90
				}
			},
			defaultBottomAxisOptions: {
				labels: {
					autoRotation: [ - 45],
					x: 0
				},
				title: {
					rotation: 0
				}
			},
			defaultTopAxisOptions: {
				labels: {
					autoRotation: [ - 45],
					x: 0
				},
				title: {
					rotation: 0
				}
			},
			init: function(a, b) {
				var p = b.isX,
				d = this;
				d.chart = a;
				d.horiz = a.inverted && !d.isZAxis ? !p: p;
				d.isXAxis = p;
				d.coll = d.coll || (p ? "xAxis": "yAxis");
				d.opposite = b.opposite;
				d.side = b.side || (d.horiz ? d.opposite ? 0 : 2 : d.opposite ? 1 : 3);
				d.setOptions(b);
				var f = this.options,
				k = f.type;
				d.labelFormatter = f.labels.formatter || d.defaultLabelFormatter;
				d.userOptions = b;
				d.minPixelPadding = 0;
				d.reversed = f.reversed;
				d.visible = !1 !== f.visible;
				d.zoomEnabled = !1 !== f.zoomEnabled;
				d.hasNames = "category" === k || !0 === f.categories;
				d.categories = f.categories || d.hasNames;
				d.names || (d.names = [], d.names.keys = {});
				d.plotLinesAndBandsGroups = {};
				d.isLog = "logarithmic" === k;
				d.isDatetimeAxis = "datetime" === k;
				d.positiveValuesOnly = d.isLog && !d.allowNegativeLog;
				d.isLinked = q(f.linkedTo);
				d.ticks = {};
				d.labelEdge = [];
				d.minorTicks = {};
				d.plotLinesAndBands = [];
				d.alternateBands = {};
				d.len = 0;
				d.minRange = d.userMinRange = f.minRange || f.maxZoom;
				d.range = f.range;
				d.offset = f.offset || 0;
				d.stacks = {};
				d.oldStacks = {};
				d.stacksTouched = 0;
				d.max = null;
				d.min = null;
				d.crosshair = v(f.crosshair, G(a.options.tooltip.crosshairs)[p ? 0 : 1], !1);
				b = d.options.events; - 1 === c(d, a.axes) && (p ? a.axes.splice(a.xAxis.length, 0, d) : a.axes.push(d), a[d.coll].push(d));
				d.series = d.series || [];
				a.inverted && !d.isZAxis && p && void 0 === d.reversed && (d.reversed = !0);
				D(b,
				function(a, b) {
					z(d, b, a)
				});
				d.lin2log = f.linearToLogConverter || d.lin2log;
				d.isLog && (d.val2lin = d.log2lin, d.lin2val = d.lin2log)
			},
			setOptions: function(a) {
				this.options = x(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], x(u[this.coll], a))
			},
			defaultLabelFormatter: function() {
				var b = this.axis,
				c = this.value,
				d = b.chart.time,
				f = b.categories,
				l = this.dateTimeLabelFormat,
				h = u.lang,
				e = h.numericSymbols,
				h = h.numericSymbolMagnitude || 1E3,
				w = e && e.length,
				g, n = b.options.labels.format,
				b = b.isLog ? Math.abs(c) : b.tickInterval;
				if (n) g = k(n, this, d);
				else if (f) g = c;
				else if (l) g = d.dateFormat(l, c);
				else if (w && 1E3 <= b) for (; w--&&void 0 === g;) d = Math.pow(h, w + 1),
				b >= d && 0 === 10 * c % d && null !== e[w] && 0 !== c && (g = a.numberFormat(c / d, -1) + e[w]);
				void 0 === g && (g = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ""));
				return g
			},
			getSeriesExtremes: function() {
				var a = this,
				c = a.chart;
				a.hasVisibleSeries = !1;
				a.dataMin = a.dataMax = a.threshold = null;
				a.softThreshold = !a.isXAxis;
				a.buildStacks && a.buildStacks();
				f(a.series,
				function(p) {
					if (p.visible || !c.options.chart.ignoreHiddenSeries) {
						var d = p.options,
						f = d.threshold,
						k;
						a.hasVisibleSeries = !0;
						a.positiveValuesOnly && 0 >= f && (f = null);
						if (a.isXAxis) d = p.xData,
						d.length && (p = e(d), k = y(d), C(p) || p instanceof Date || (d = b(d, C), p = e(d), k = y(d)), d.length && (a.dataMin = Math.min(v(a.dataMin, d[0], p), p), a.dataMax = Math.max(v(a.dataMax, d[0], k), k)));
						else if (p.getExtremes(), k = p.dataMax, p = p.dataMin, q(p) && q(k) && (a.dataMin = Math.min(v(a.dataMin, p), p), a.dataMax = Math.max(v(a.dataMax, k), k)), q(f) && (a.threshold = f), !d.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
					}
				})
			},
			translate: function(a, b, d, c, f, k) {
				var p = this.linkedParent || this,
				l = 1,
				F = 0,
				h = c ? p.oldTransA: p.transA;
				c = c ? p.oldMin: p.min;
				var e = p.minPixelPadding;
				f = (p.isOrdinal || p.isBroken || p.isLog && f) && p.lin2val;
				h || (h = p.transA);
				d && (l *= -1, F = p.len);
				p.reversed && (l *= -1, F -= l * (p.sector || p.len));
				b ? (a = (a * l + F - e) / h + c, f && (a = p.lin2val(a))) : (f && (a = p.val2lin(a)), a = C(c) ? l * (a - c) * h + F + l * e + (C(k) ? h * k: 0) : void 0);
				return a
			},
			toPixels: function(a, b) {
				return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
			},
			toValue: function(a, b) {
				return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
			},
			getPlotLinePath: function(a, b, d, c, f) {
				var p = this.chart,
				k = this.left,
				l = this.top,
				F, h, e = d && p.oldChartHeight || p.chartHeight,
				g = d && p.oldChartWidth || p.chartWidth,
				w;
				F = this.transB;
				var N = function(a, b, p) {
					if (a < b || a > p) c ? a = Math.min(Math.max(b, a), p) : w = !0;
					return a
				};
				f = v(f, this.translate(a, null, null, d));
				f = Math.min(Math.max( - 1E5, f), 1E5);
				a = d = Math.round(f + F);
				F = h = Math.round(e - f - F);
				C(f) ? this.horiz ? (F = l, h = e - this.bottom, a = d = N(a, k, k + this.width)) : (a = k, d = g - this.right, F = h = N(F, l, l + this.height)) : (w = !0, c = !1);
				return w && !c ? null: p.renderer.crispLine(["M", a, F, "L", d, h], b || 1)
			},
			getLinearTickPositions: function(a, b, d) {
				var p, c = t(Math.floor(b / a) * a);
				d = t(Math.ceil(d / a) * a);
				var f = [],
				k;
				t(c + a) === c && (k = 20);
				if (this.single) return [b];
				for (b = c; b <= d;) {
					f.push(b);
					b = t(b + a, k);
					if (b === p) break;
					p = b
				}
				return f
			},
			getMinorTickInterval: function() {
				var a = this.options;
				return ! 0 === a.minorTicks ? v(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null: a.minorTickInterval
			},
			getMinorTickPositions: function() {
				var a = this,
				b = a.options,
				d = a.tickPositions,
				c = a.minorTickInterval,
				k = [],
				l = a.pointRangePadding || 0,
				h = a.min - l,
				l = a.max + l,
				e = l - h;
				if (e && e / c < a.len / 3) if (a.isLog) f(this.paddedTicks,
				function(b, d, p) {
					d && k.push.apply(k, a.getLogTickPositions(c, p[d - 1], p[d], !0))
				});
				else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) k = k.concat(a.getTimeTicks(a.normalizeTimeTickInterval(c), h, l, b.startOfWeek));
				else for (b = h + (d[0] - h) % c; b <= l && b !== k[0]; b += c) k.push(b);
				0 !== k.length && a.trimTicks(k);
				return k
			},
			adjustForMinRange: function() {
				var a = this.options,
				b = this.min,
				d = this.max,
				c, k, l, h, g, w, n, m;
				this.isXAxis && void 0 === this.minRange && !this.isLog && (q(a.min) || q(a.max) ? this.minRange = null: (f(this.series,
				function(a) {
					w = a.xData;
					for (h = n = a.xIncrement ? 1 : w.length - 1; 0 < h; h--) if (g = w[h] - w[h - 1], void 0 === l || g < l) l = g
				}), this.minRange = Math.min(5 * l, this.dataMax - this.dataMin)));
				d - b < this.minRange && (k = this.dataMax - this.dataMin >= this.minRange, m = this.minRange, c = (m - d + b) / 2, c = [b - c, v(a.min, b - c)], k && (c[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = y(c), d = [b + m, v(a.max, b + m)], k && (d[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), d = e(d), d - b < m && (c[0] = d - m, c[1] = v(a.min, d - m), b = y(c)));
				this.min = b;
				this.max = d
			},
			getClosest: function() {
				var a;
				this.categories ? a = 1 : f(this.series,
				function(b) {
					var d = b.closestPointRange,
					c = b.visible || !b.chart.options.chart.ignoreHiddenSeries; ! b.noSharedTooltip && q(d) && c && (a = q(a) ? Math.min(a, d) : d)
				});
				return a
			},
			nameToX: function(a) {
				var b = l(this.categories),
				d = b ? this.categories: this.names,
				p = a.options.x,
				f;
				a.series.requireSorting = !1;
				q(p) || (p = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b ? c(a.name, d) : v(d.keys[a.name], -1)); - 1 === p ? b || (f = d.length) : f = p;
				void 0 !== f && (this.names[f] = a.name, this.names.keys[a.name] = f);
				return f
			},
			updateNames: function() {
				var b = this,
				d = this.names;
				0 < d.length && (f(a.keys(d.keys),
				function(a) {
					delete d.keys[a]
				}), d.length = 0, this.minRange = this.userMinRange, f(this.series || [],
				function(a) {
					a.xIncrement = null;
					if (!a.points || a.isDirtyData) a.processData(),
					a.generatePoints();
					f(a.points,
					function(d, c) {
						var p;
						d.options && (p = b.nameToX(d), void 0 !== p && p !== d.x && (d.x = p, a.xData[c] = p))
					})
				}))
			},
			setAxisTranslation: function(a) {
				var b = this,
				d = b.max - b.min,
				c = b.axisPointRange || 0,
				p, k = 0,
				l = 0,
				h = b.linkedParent,
				e = !!b.categories,
				w = b.transA,
				g = b.isXAxis;
				if (g || e || c) p = b.getClosest(),
				h ? (k = h.minPointOffset, l = h.pointRangePadding) : f(b.series,
				function(a) {
					var d = e ? 1 : g ? v(a.options.pointRange, p, 0) : b.axisPointRange || 0;
					a = a.options.pointPlacement;
					c = Math.max(c, d);
					b.single || (k = Math.max(k, K(a) ? 0 : d / 2), l = Math.max(l, "on" === a ? 0 : d))
				}),
				h = b.ordinalSlope && p ? b.ordinalSlope / p: 1,
				b.minPointOffset = k *= h,
				b.pointRangePadding = l *= h,
				b.pointRange = Math.min(c, d),
				g && (b.closestPointRange = p);
				a && (b.oldTransA = w);
				b.translationSlope = b.transA = w = b.options.staticScale || b.len / (d + l || 1);
				b.transB = b.horiz ? b.left: b.bottom;
				b.minPixelPadding = w * k
			},
			minFromRange: function() {
				return this.max - this.range
			},
			setTickInterval: function(b) {
				var c = this,
				p = c.chart,
				k = c.options,
				l = c.isLog,
				h = c.log2lin,
				e = c.isDatetimeAxis,
				w = c.isXAxis,
				g = c.isLinked,
				m = k.maxPadding,
				G = k.minPadding,
				x = k.tickInterval,
				H = k.tickPixelInterval,
				D = c.categories,
				E = c.threshold,
				I = c.softThreshold,
				r, K, u, y;
				e || D || g || this.getTickAmount();
				u = v(c.userMin, k.min);
				y = v(c.userMax, k.max);
				g ? (c.linkedParent = p[c.coll][k.linkedTo], p = c.linkedParent.getExtremes(), c.min = v(p.min, p.dataMin), c.max = v(p.max, p.dataMax), k.type !== c.linkedParent.options.type && a.error(11, 1)) : (!I && q(E) && (c.dataMin >= E ? (r = E, G = 0) : c.dataMax <= E && (K = E, m = 0)), c.min = v(u, r, c.dataMin), c.max = v(y, K, c.dataMax));
				l && (c.positiveValuesOnly && !b && 0 >= Math.min(c.min, v(c.dataMin, c.min)) && a.error(10, 1), c.min = t(h(c.min), 15), c.max = t(h(c.max), 15));
				c.range && q(c.max) && (c.userMin = c.min = u = Math.max(c.dataMin, c.minFromRange()), c.userMax = y = c.max, c.range = null);
				n(c, "foundExtremes");
				c.beforePadding && c.beforePadding();
				c.adjustForMinRange(); ! (D || c.axisPointRange || c.usePercentage || g) && q(c.min) && q(c.max) && (h = c.max - c.min) && (!q(u) && G && (c.min -= h * G), !q(y) && m && (c.max += h * m));
				C(k.softMin) && !C(c.userMin) && (c.min = Math.min(c.min, k.softMin));
				C(k.softMax) && !C(c.userMax) && (c.max = Math.max(c.max, k.softMax));
				C(k.floor) && (c.min = Math.max(c.min, k.floor));
				C(k.ceiling) && (c.max = Math.min(c.max, k.ceiling));
				I && q(c.dataMin) && (E = E || 0, !q(u) && c.min < E && c.dataMin >= E ? c.min = E: !q(y) && c.max > E && c.dataMax <= E && (c.max = E));
				c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : g && !x && H === c.linkedParent.options.tickPixelInterval ? x = c.linkedParent.tickInterval: v(x, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, D ? 1 : (c.max - c.min) * H / Math.max(c.len, H));
				w && !b && f(c.series,
				function(a) {
					a.processData(c.min !== c.oldMin || c.max !== c.oldMax)
				});
				c.setAxisTranslation(!0);
				c.beforeSetTickPositions && c.beforeSetTickPositions();
				c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval));
				c.pointRange && !x && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
				b = v(k.minTickInterval, c.isDatetimeAxis && c.closestPointRange); ! x && c.tickInterval < b && (c.tickInterval = b);
				e || l || x || (c.tickInterval = L(c.tickInterval, null, d(c.tickInterval), v(k.allowDecimals, !(.5 < c.tickInterval && 5 > c.tickInterval && 1E3 < c.max && 9999 > c.max)), !!this.tickAmount));
				this.tickAmount || (c.tickInterval = c.unsquish());
				this.setTickPositions()
			},
			setTickPositions: function() {
				var a = this.options,
				b, c = a.tickPositions;
				b = this.getMinorTickInterval();
				var d = a.tickPositioner,
				f = a.startOnTick,
				k = a.endOnTick;
				this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
				this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval / 5 : b;
				this.single = this.min === this.max && q(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
				this.tickPositions = b = c && c.slice(); ! b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()], b[0] === b[1] && (b.length = 1)), this.tickPositions = b, d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = b = d);
				this.paddedTicks = b.slice(0);
				this.trimTicks(b, f, k);
				this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), c || d || this.adjustTickAmount())
			},
			trimTicks: function(a, b, c) {
				var d = a[0],
				p = a[a.length - 1],
				f = this.minPointOffset || 0;
				if (!this.isLinked) {
					if (b && -Infinity !== d) this.min = d;
					else for (; this.min - f > a[0];) a.shift();
					if (c) this.max = p;
					else for (; this.max + f < a[a.length - 1];) a.pop();
					0 === a.length && q(d) && !this.options.tickPositions && a.push((p + d) / 2)
				}
			},
			alignToOthers: function() {
				var a = {},
				b, c = this.options; ! 1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || this.isLog || f(this.chart[this.coll],
				function(c) {
					var d = c.options,
					d = [c.horiz ? d.left: d.top, d.width, d.height, d.pane].join();
					c.series.length && (a[d] ? b = !0 : a[d] = 1)
				});
				return b
			},
			getTickAmount: function() {
				var a = this.options,
				b = a.tickAmount,
				c = a.tickPixelInterval; ! q(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2); ! b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
				4 > b && (this.finalTickAmt = b, b = 5);
				this.tickAmount = b
			},
			adjustTickAmount: function() {
				var a = this.tickInterval,
				b = this.tickPositions,
				c = this.tickAmount,
				d = this.finalTickAmt,
				f = b && b.length,
				k = v(this.threshold, this.softThreshold ? 0 : null);
				if (this.hasData()) {
					if (f < c) {
						for (; b.length < c;) b.length % 2 || this.min === k ? b.push(t(b[b.length - 1] + a)) : b.unshift(t(b[0] - a));
						this.transA *= (f - 1) / (c - 1);
						this.min = b[0];
						this.max = b[b.length - 1]
					} else f > c && (this.tickInterval *= 2, this.setTickPositions());
					if (q(d)) {
						for (a = c = b.length; a--;)(3 === d && 1 === a % 2 || 2 >= d && 0 < a && a < c - 1) && b.splice(a, 1);
						this.finalTickAmt = void 0
					}
				}
			},
			setScale: function() {
				var a, b;
				this.oldMin = this.min;
				this.oldMax = this.max;
				this.oldAxisLength = this.len;
				this.setAxisSize();
				b = this.len !== this.oldAxisLength;
				f(this.series,
				function(b) {
					if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
				});
				b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
				n(this, "afterSetScale")
			},
			setExtremes: function(a, b, c, d, k) {
				var p = this,
				l = p.chart;
				c = v(c, !0);
				f(p.series,
				function(a) {
					delete a.kdTree
				});
				k = h(k, {
					min: a,
					max: b
				});
				n(p, "setExtremes", k,
				function() {
					p.userMin = a;
					p.userMax = b;
					p.eventArgs = k;
					c && l.redraw(d)
				})
			},
			zoom: function(a, b) {
				var c = this.dataMin,
				d = this.dataMax,
				p = this.options,
				f = Math.min(c, v(p.min, c)),
				p = Math.max(d, v(p.max, d));
				if (a !== this.min || b !== this.max) this.allowZoomOutside || (q(c) && (a < f && (a = f), a > p && (a = p)), q(d) && (b < f && (b = f), b > p && (b = p))),
				this.displayBtn = void 0 !== a || void 0 !== b,
				this.setExtremes(a, b, !1, void 0, {
					trigger: "zoom"
				});
				return ! 0
			},
			setAxisSize: function() {
				var b = this.chart,
				c = this.options,
				d = c.offsets || [0, 0, 0, 0],
				f = this.horiz,
				k = this.width = Math.round(a.relativeLength(v(c.width, b.plotWidth - d[3] + d[1]), b.plotWidth)),
				l = this.height = Math.round(a.relativeLength(v(c.height, b.plotHeight - d[0] + d[2]), b.plotHeight)),
				h = this.top = Math.round(a.relativeLength(v(c.top, b.plotTop + d[0]), b.plotHeight, b.plotTop)),
				c = this.left = Math.round(a.relativeLength(v(c.left, b.plotLeft + d[3]), b.plotWidth, b.plotLeft));
				this.bottom = b.chartHeight - l - h;
				this.right = b.chartWidth - k - c;
				this.len = Math.max(f ? k: l, 0);
				this.pos = f ? c: h
			},
			getExtremes: function() {
				var a = this.isLog,
				b = this.lin2log;
				return {
					min: a ? t(b(this.min)) : this.min,
					max: a ? t(b(this.max)) : this.max,
					dataMin: this.dataMin,
					dataMax: this.dataMax,
					userMin: this.userMin,
					userMax: this.userMax
				}
			},
			getThreshold: function(a) {
				var b = this.isLog,
				c = this.lin2log,
				d = b ? c(this.min) : this.min,
				b = b ? c(this.max) : this.max;
				null === a ? a = d: d > a ? a = d: b < a && (a = b);
				return this.translate(a, 0, 1, 0, 1)
			},
			autoLabelAlign: function(a) {
				a = (v(a, 0) - 90 * this.side + 720) % 360;
				return 15 < a && 165 > a ? "right": 195 < a && 345 > a ? "left": "center"
			},
			tickSize: function(a) {
				var b = this.options,
				c = b[a + "Length"],
				d = v(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
				if (d && c) return "inside" === b[a + "Position"] && (c = -c),
				[c, d]
			},
			labelMetrics: function() {
				var a = this.tickPositions && this.tickPositions[0] || 0;
				return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
			},
			unsquish: function() {
				var a = this.options.labels,
				b = this.horiz,
				c = this.tickInterval,
				d = c,
				k = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
				l,
				h = a.rotation,
				e = this.labelMetrics(),
				g,
				w = Number.MAX_VALUE,
				m,
				n = function(a) {
					a /= k || 1;
					a = 1 < a ? Math.ceil(a) : 1;
					return a * c
				};
				b ? (m = !a.staggerLines && !a.step && (q(h) ? [h] : k < v(a.autoRotationLimit, 80) && a.autoRotation)) && f(m,
				function(a) {
					var b;
					if (a === h || a && -90 <= a && 90 >= a) g = n(Math.abs(e.h / Math.sin(r * a))),
					b = g + Math.abs(a / 360),
					b < w && (w = b, l = a, d = g)
				}) : a.step || (d = n(e.h));
				this.autoRotation = m;
				this.labelRotation = v(l, h);
				return d
			},
			getSlotWidth: function() {
				var a = this.chart,
				b = this.horiz,
				c = this.options.labels,
				d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
				f = a.margin[3];
				return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / d || !b && (c.style && parseInt(c.style.width, 10) || f && f - a.spacing[3] || .33 * a.chartWidth)
			},
			renderUnsquish: function() {
				var a = this.chart,
				b = a.renderer,
				c = this.tickPositions,
				d = this.ticks,
				k = this.options.labels,
				l = this.horiz,
				h = this.getSlotWidth(),
				e = Math.max(1, Math.round(h - 2 * (k.padding || 5))),
				g = {},
				w = this.labelMetrics(),
				m = k.style && k.style.textOverflow,
				n,
				G,
				x = 0,
				H;
				K(k.rotation) || (g.rotation = k.rotation || 0);
				f(c,
				function(a) { (a = d[a]) && a.label && a.label.textPxLength > x && (x = a.label.textPxLength)
				});
				this.maxLabelLength = x;
				if (this.autoRotation) x > e && x > w.h ? g.rotation = this.labelRotation: this.labelRotation = 0;
				else if (h && (n = e, !m)) for (G = "clip", e = c.length; ! l && e--;) if (H = c[e], H = d[H].label) H.styles && "ellipsis" === H.styles.textOverflow ? H.css({
					textOverflow: "clip"
				}) : H.textPxLength > h && H.css({
					width: h + "px"
				}),
				H.getBBox().height > this.len / c.length - (w.h - w.f) && (H.specificTextOverflow = "ellipsis");
				g.rotation && (n = x > .5 * a.chartHeight ? .33 * a.chartHeight: a.chartHeight, m || (G = "ellipsis"));
				if (this.labelAlign = k.align || this.autoLabelAlign(this.labelRotation)) g.align = this.labelAlign;
				f(c,
				function(a) {
					var b = (a = d[a]) && a.label;
					b && (b.attr(g), !n || k.style && k.style.width || !(n < b.textPxLength || "SPAN" === b.element.tagName) || b.css({
						width: n,
						textOverflow: b.specificTextOverflow || G
					}), delete b.specificTextOverflow, a.rotation = g.rotation)
				});
				this.tickRotCorr = b.rotCorr(w.b, this.labelRotation || 0, 0 !== this.side)
			},
			hasData: function() {
				return this.hasVisibleSeries || q(this.min) && q(this.max) && this.tickPositions && 0 < this.tickPositions.length
			},
			addTitle: function(a) {
				var b = this.chart.renderer,
				c = this.horiz,
				d = this.opposite,
				f = this.options.title,
				k;
				this.axisTitle || ((k = f.textAlign) || (k = (c ? {
					low: "left",
					middle: "center",
					high: "right"
				}: {
					low: d ? "right": "left",
					middle: "center",
					high: d ? "left": "right"
				})[f.align]), this.axisTitle = b.text(f.text, 0, 0, f.useHTML).attr({
					zIndex: 7,
					rotation: f.rotation || 0,
					align: k
				}).addClass("highcharts-axis-title").css(x(f.style)).add(this.axisGroup), this.axisTitle.isNew = !0);
				f.style.width || this.isRadial || this.axisTitle.css({
					width: this.len
				});
				this.axisTitle[a ? "show": "hide"](!0)
			},
			generateTick: function(a) {
				var b = this.ticks;
				b[a] ? b[a].addLabel() : b[a] = new I(this, a)
			},
			getOffset: function() {
				var a = this,
				b = a.chart,
				c = b.renderer,
				d = a.options,
				k = a.tickPositions,
				l = a.ticks,
				h = a.horiz,
				e = a.side,
				g = b.inverted && !a.isZAxis ? [1, 0, 3, 2][e] : e,
				w,
				n,
				m = 0,
				G,
				x = 0,
				H = d.title,
				C = d.labels,
				E = 0,
				I = b.axisOffset,
				b = b.clipOffset,
				r = [ - 1, 1, 1, -1][e],
				K = d.className,
				L = a.axisParent,
				t = this.tickSize("tick");
				w = a.hasData();
				a.showAxis = n = w || v(d.showEmpty, !0);
				a.staggerLines = a.horiz && C.staggerLines;
				a.axisGroup || (a.gridGroup = c.g("grid").attr({
					zIndex: d.gridZIndex || 1
				}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (K || "")).add(L), a.axisGroup = c.g("axis").attr({
					zIndex: d.zIndex || 2
				}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (K || "")).add(L), a.labelGroup = c.g("axis-labels").attr({
					zIndex: C.zIndex || 7
				}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (K || "")).add(L));
				w || a.isLinked ? (f(k,
				function(b, c) {
					a.generateTick(b, c)
				}), a.renderUnsquish(), a.reserveSpaceDefault = 0 === e || 2 === e || {
					1 : "left",
					3 : "right"
				} [e] === a.labelAlign, v(C.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && f(k,
				function(a) {
					E = Math.max(l[a].getLabelSize(), E)
				}), a.staggerLines && (E *= a.staggerLines), a.labelOffset = E * (a.opposite ? -1 : 1)) : D(l,
				function(a, b) {
					a.destroy();
					delete l[b]
				});
				H && H.text && !1 !== H.enabled && (a.addTitle(n), n && !1 !== H.reserveSpace && (a.titleOffset = m = a.axisTitle.getBBox()[h ? "height": "width"], G = H.offset, x = q(G) ? 0 : v(H.margin, h ? 5 : 10)));
				a.renderLine();
				a.offset = r * v(d.offset, I[e]);
				a.tickRotCorr = a.tickRotCorr || {
					x: 0,
					y: 0
				};
				c = 0 === e ? -a.labelMetrics().h: 2 === e ? a.tickRotCorr.y: 0;
				x = Math.abs(E) + x;
				E && (x = x - c + r * (h ? v(C.y, a.tickRotCorr.y + 8 * r) : C.x));
				a.axisTitleMargin = v(G, x);
				I[e] = Math.max(I[e], a.axisTitleMargin + m + r * a.offset, x, w && k.length && t ? t[0] + r * a.offset: 0);
				d = d.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
				b[g] = Math.max(b[g], d)
			},
			getLinePath: function(a) {
				var b = this.chart,
				c = this.opposite,
				d = this.offset,
				f = this.horiz,
				k = this.left + (c ? this.width: 0) + d,
				d = b.chartHeight - this.bottom - (c ? this.height: 0) + d;
				c && (a *= -1);
				return b.renderer.crispLine(["M", f ? this.left: k, f ? d: this.top, "L", f ? b.chartWidth - this.right: k, f ? d: b.chartHeight - this.bottom], a)
			},
			renderLine: function() {
				this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
					stroke: this.options.lineColor,
					"stroke-width": this.options.lineWidth,
					zIndex: 7
				}))
			},
			getTitlePosition: function() {
				var a = this.horiz,
				b = this.left,
				c = this.top,
				d = this.len,
				f = this.options.title,
				k = a ? b: c,
				l = this.opposite,
				h = this.offset,
				e = f.x || 0,
				g = f.y || 0,
				w = this.axisTitle,
				n = this.chart.renderer.fontMetrics(f.style && f.style.fontSize, w),
				w = Math.max(w.getBBox(null, 0).height - n.h - 1, 0),
				d = {
					low: k + (a ? 0 : d),
					middle: k + d / 2,
					high: k + (a ? d: 0)
				} [f.align],
				b = (a ? c + this.height: b) + (a ? 1 : -1) * (l ? -1 : 1) * this.axisTitleMargin + [ - w, w, n.f, -w][this.side];
				return {
					x: a ? d + e: b + (l ? this.width: 0) + h + e,
					y: a ? b + g - (l ? this.height: 0) + h: d + g
				}
			},
			renderMinorTick: function(a) {
				var b = this.chart.hasRendered && C(this.oldMin),
				c = this.minorTicks;
				c[a] || (c[a] = new I(this, a, "minor"));
				b && c[a].isNew && c[a].render(null, !0);
				c[a].render(null, !1, 1)
			},
			renderTick: function(a, b) {
				var c = this.isLinked,
				d = this.ticks,
				f = this.chart.hasRendered && C(this.oldMin);
				if (!c || a >= this.min && a <= this.max) d[a] || (d[a] = new I(this, a)),
				f && d[a].isNew && d[a].render(b, !0, .1),
				d[a].render(b)
			},
			render: function() {
				var b = this,
				c = b.chart,
				d = b.options,
				k = b.isLog,
				l = b.lin2log,
				h = b.isLinked,
				e = b.tickPositions,
				w = b.axisTitle,
				g = b.ticks,
				n = b.minorTicks,
				m = b.alternateBands,
				G = d.stackLabels,
				x = d.alternateGridColor,
				v = b.tickmarkOffset,
				E = b.axisLine,
				r = b.showAxis,
				q = B(c.renderer.globalAnimation),
				K,
				L;
				b.labelEdge.length = 0;
				b.overlap = !1;
				f([g, n, m],
				function(a) {
					D(a,
					function(a) {
						a.isActive = !1
					})
				});
				if (b.hasData() || h) b.minorTickInterval && !b.categories && f(b.getMinorTickPositions(),
				function(a) {
					b.renderMinorTick(a)
				}),
				e.length && (f(e,
				function(a, c) {
					b.renderTick(a, c)
				}), v && (0 === b.min || b.single) && (g[ - 1] || (g[ - 1] = new I(b, -1, null, !0)), g[ - 1].render( - 1))),
				x && f(e,
				function(d, f) {
					L = void 0 !== e[f + 1] ? e[f + 1] + v: b.max - v;
					0 === f % 2 && d < b.max && L <= b.max + (c.polar ? -v: v) && (m[d] || (m[d] = new a.PlotLineOrBand(b)), K = d + v, m[d].options = {
						from: k ? l(K) : K,
						to: k ? l(L) : L,
						color: x
					},
					m[d].render(), m[d].isActive = !0)
				}),
				b._addedPlotLB || (f((d.plotLines || []).concat(d.plotBands || []),
				function(a) {
					b.addPlotBandOrLine(a)
				}), b._addedPlotLB = !0);
				f([g, n, m],
				function(a) {
					var b, d = [],
					f = q.duration;
					D(a,
					function(a, b) {
						a.isActive || (a.render(b, !1, 0), a.isActive = !1, d.push(b))
					});
					H(function() {
						for (b = d.length; b--;) a[d[b]] && !a[d[b]].isActive && (a[d[b]].destroy(), delete a[d[b]])
					},
					a !== m && c.hasRendered && f ? f: 0)
				});
				E && (E[E.isPlaced ? "animate": "attr"]({
					d: this.getLinePath(E.strokeWidth())
				}), E.isPlaced = !0, E[r ? "show": "hide"](!0));
				w && r && (d = b.getTitlePosition(), C(d.y) ? (w[w.isNew ? "attr": "animate"](d), w.isNew = !1) : (w.attr("y", -9999), w.isNew = !0));
				G && G.enabled && b.renderStackTotals();
				b.isDirty = !1
			},
			redraw: function() {
				this.visible && (this.render(), f(this.plotLinesAndBands,
				function(a) {
					a.render()
				}));
				f(this.series,
				function(a) {
					a.isDirty = !0
				})
			},
			keepProps: "extKey hcEvents names series userMax userMin".split(" "),
			destroy: function(a) {
				var b = this,
				d = b.stacks,
				k = b.plotLinesAndBands,
				l;
				a || w(b);
				D(d,
				function(a, b) {
					m(a);
					d[b] = null
				});
				f([b.ticks, b.minorTicks, b.alternateBands],
				function(a) {
					m(a)
				});
				if (k) for (a = k.length; a--;) k[a].destroy();
				f("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),
				function(a) {
					b[a] && (b[a] = b[a].destroy())
				});
				for (l in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[l] = b.plotLinesAndBandsGroups[l].destroy();
				D(b,
				function(a, d) { - 1 === c(d, b.keepProps) && delete b[d]
				})
			},
			drawCrosshair: function(a, b) {
				var c, d = this.crosshair,
				f = v(d.snap, !0),
				k,
				l = this.cross;
				a || (a = this.cross && this.cross.e);
				this.crosshair && !1 !== (q(b) || !f) ? (f ? q(b) && (k = this.isXAxis ? b.plotX: this.len - b.plotY) : k = a && (this.horiz ? a.chartX - this.pos: this.len - a.chartY + this.pos), q(k) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x: v(b.stackY, b.y)), null, null, null, k) || null), q(c) ? (b = this.categories && !this.isRadial, l || (this.cross = l = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category ": "thin ") + d.className).attr({
					zIndex: v(d.zIndex, 2)
				}).add(), l.attr({
					stroke: d.color || (b ? g("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
					"stroke-width": v(d.width, 1)
				}).css({
					"pointer-events": "none"
				}), d.dashStyle && l.attr({
					dashstyle: d.dashStyle
				})), l.show().attr({
					d: c
				}), b && !d.width && l.attr({
					"stroke-width": this.transA
				}), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
			},
			hideCrosshair: function() {
				this.cross && this.cross.hide()
			}
		});
		return a.Axis = E
	} (J); (function(a) {
		var z = a.Axis,
		B = a.getMagnitude,
		y = a.map,
		e = a.normalizeTickInterval,
		g = a.pick;
		z.prototype.getLogTickPositions = function(a, u, q, r) {
			var m = this.options,
			f = this.len,
			h = this.lin2log,
			n = this.log2lin,
			k = [];
			r || (this._minorAutoInterval = null);
			if (.5 <= a) a = Math.round(a),
			k = this.getLinearTickPositions(a, u, q);
			else if (.08 <= a) for (var f = Math.floor(u), d, b, c, l, C, m = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < q + 1 && !C; f++) for (b = m.length, d = 0; d < b && !C; d++) c = n(h(f) * m[d]),
			c > u && (!r || l <= q) && void 0 !== l && k.push(l),
			l > q && (C = !0),
			l = c;
			else u = h(u),
			q = h(q),
			a = r ? this.getMinorTickInterval() : m.tickInterval,
			a = g("auto" === a ? null: a, this._minorAutoInterval, m.tickPixelInterval / (r ? 5 : 1) * (q - u) / ((r ? f / this.tickPositions.length: f) || 1)),
			a = e(a, null, B(a)),
			k = y(this.getLinearTickPositions(a, u, q), n),
			r || (this._minorAutoInterval = a / 5);
			r || (this.tickInterval = a);
			return k
		};
		z.prototype.log2lin = function(a) {
			return Math.log(a) / Math.LN10
		};
		z.prototype.lin2log = function(a) {
			return Math.pow(10, a)
		}
	})(J); (function(a, z) {
		var B = a.arrayMax,
		y = a.arrayMin,
		e = a.defined,
		g = a.destroyObjectProperties,
		t = a.each,
		u = a.erase,
		q = a.merge,
		r = a.pick;
		a.PlotLineOrBand = function(a, f) {
			this.axis = a;
			f && (this.options = f, this.id = f.id)
		};
		a.PlotLineOrBand.prototype = {
			render: function() {
				var g = this,
				f = g.axis,
				h = f.horiz,
				n = g.options,
				k = n.label,
				d = g.label,
				b = n.to,
				c = n.from,
				l = n.value,
				C = e(c) && e(b),
				K = e(l),
				x = g.svgElem,
				L = !x,
				D = [],
				v = n.color,
				w = r(n.zIndex, 0),
				G = n.events,
				D = {
					"class": "highcharts-plot-" + (C ? "band ": "line ") + (n.className || "")
				},
				H = {},
				I = f.chart.renderer,
				E = C ? "bands": "lines",
				p = f.log2lin;
				f.isLog && (c = p(c), b = p(b), l = p(l));
				K ? (D = {
					stroke: v,
					"stroke-width": n.width
				},
				n.dashStyle && (D.dashstyle = n.dashStyle)) : C && (v && (D.fill = v), n.borderWidth && (D.stroke = n.borderColor, D["stroke-width"] = n.borderWidth));
				H.zIndex = w;
				E += "-" + w; (v = f.plotLinesAndBandsGroups[E]) || (f.plotLinesAndBandsGroups[E] = v = I.g("plot-" + E).attr(H).add());
				L && (g.svgElem = x = I.path().attr(D).add(v));
				if (K) D = f.getPlotLinePath(l, x.strokeWidth());
				else if (C) D = f.getPlotBandPath(c, b, n);
				else return;
				L && D && D.length ? (x.attr({
					d: D
				}), G && a.objectEach(G,
				function(a, b) {
					x.on(b,
					function(a) {
						G[b].apply(g, [a])
					})
				})) : x && (D ? (x.show(), x.animate({
					d: D
				})) : (x.hide(), d && (g.label = d = d.destroy())));
				k && e(k.text) && D && D.length && 0 < f.width && 0 < f.height && !D.flat ? (k = q({
					align: h && C && "center",
					x: h ? !C && 4 : 10,
					verticalAlign: !h && C && "middle",
					y: h ? C ? 16 : 10 : C ? 6 : -4,
					rotation: h && !C && 90
				},
				k), this.renderLabel(k, D, C, w)) : d && d.hide();
				return g
			},
			renderLabel: function(a, f, h, e) {
				var k = this.label,
				d = this.axis.chart.renderer;
				k || (k = {
					align: a.textAlign || a.align,
					rotation: a.rotation,
					"class": "highcharts-plot-" + (h ? "band": "line") + "-label " + (a.className || "")
				},
				k.zIndex = e, this.label = k = d.text(a.text, 0, 0, a.useHTML).attr(k).add(), k.css(a.style));
				e = f.xBounds || [f[1], f[4], h ? f[6] : f[1]];
				f = f.yBounds || [f[2], f[5], h ? f[7] : f[2]];
				h = y(e);
				d = y(f);
				k.align(a, !1, {
					x: h,
					y: d,
					width: B(e) - h,
					height: B(f) - d
				});
				k.show()
			},
			destroy: function() {
				u(this.axis.plotLinesAndBands, this);
				delete this.axis;
				g(this)
			}
		};
		a.extend(z.prototype, {
			getPlotBandPath: function(a, f) {
				var h = this.getPlotLinePath(f, null, null, !0),
				e = this.getPlotLinePath(a, null, null, !0),
				k = [],
				d = this.horiz,
				b = 1,
				c;
				a = a < this.min && f < this.min || a > this.max && f > this.max;
				if (e && h) for (a && (c = e.toString() === h.toString(), b = 0), a = 0; a < e.length; a += 6) d && h[a + 1] === e[a + 1] ? (h[a + 1] += b, h[a + 4] += b) : d || h[a + 2] !== e[a + 2] || (h[a + 2] += b, h[a + 5] += b),
				k.push("M", e[a + 1], e[a + 2], "L", e[a + 4], e[a + 5], h[a + 4], h[a + 5], h[a + 1], h[a + 2], "z"),
				k.flat = c;
				return k
			},
			addPlotBand: function(a) {
				return this.addPlotBandOrLine(a, "plotBands")
			},
			addPlotLine: function(a) {
				return this.addPlotBandOrLine(a, "plotLines")
			},
			addPlotBandOrLine: function(e, f) {
				var h = (new a.PlotLineOrBand(this, e)).render(),
				g = this.userOptions;
				h && (f && (g[f] = g[f] || [], g[f].push(e)), this.plotLinesAndBands.push(h));
				return h
			},
			removePlotBandOrLine: function(a) {
				for (var f = this.plotLinesAndBands,
				h = this.options,
				e = this.userOptions,
				k = f.length; k--;) f[k].id === a && f[k].destroy();
				t([h.plotLines || [], e.plotLines || [], h.plotBands || [], e.plotBands || []],
				function(d) {
					for (k = d.length; k--;) d[k].id === a && u(d, d[k])
				})
			},
			removePlotBand: function(a) {
				this.removePlotBandOrLine(a)
			},
			removePlotLine: function(a) {
				this.removePlotBandOrLine(a)
			}
		})
	})(J, V); (function(a) {
		var z = a.each,
		B = a.extend,
		y = a.format,
		e = a.isNumber,
		g = a.map,
		t = a.merge,
		u = a.pick,
		q = a.splat,
		r = a.syncTimeout,
		m = a.timeUnits;
		a.Tooltip = function() {
			this.init.apply(this, arguments)
		};
		a.Tooltip.prototype = {
			init: function(a, h) {
				this.chart = a;
				this.options = h;
				this.crosshairs = [];
				this.now = {
					x: 0,
					y: 0
				};
				this.isHidden = !0;
				this.split = h.split && !a.inverted;
				this.shared = h.shared || this.split
			},
			cleanSplit: function(a) {
				z(this.chart.series,
				function(f) {
					var h = f && f.tt;
					h && (!h.isActive || a ? f.tt = h.destroy() : h.isActive = !1)
				})
			},
			getLabel: function() {
				var a = this.chart.renderer,
				h = this.options;
				this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, h.shape || "callout", null, null, h.useHTML, null, "tooltip").attr({
					padding: h.padding,
					r: h.borderRadius
				}), this.label.attr({
					fill: h.backgroundColor,
					"stroke-width": h.borderWidth
				}).css(h.style).shadow(h.shadow)), this.label.attr({
					zIndex: 8
				}).add());
				return this.label
			},
			update: function(a) {
				this.destroy();
				t(!0, this.chart.options.tooltip.userOptions, a);
				this.init(this.chart, t(!0, this.options, a))
			},
			destroy: function() {
				this.label && (this.label = this.label.destroy());
				this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
				clearTimeout(this.hideTimer);
				clearTimeout(this.tooltipTimeout)
			},
			move: function(a, h, e, k) {
				var d = this,
				b = d.now,
				c = !1 !== d.options.animation && !d.isHidden && (1 < Math.abs(a - b.x) || 1 < Math.abs(h - b.y)),
				f = d.followPointer || 1 < d.len;
				B(b, {
					x: c ? (2 * b.x + a) / 3 : a,
					y: c ? (b.y + h) / 2 : h,
					anchorX: f ? void 0 : c ? (2 * b.anchorX + e) / 3 : e,
					anchorY: f ? void 0 : c ? (b.anchorY + k) / 2 : k
				});
				d.getLabel().attr(b);
				c && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
					d && d.move(a, h, e, k)
				},
				32))
			},
			hide: function(a) {
				var f = this;
				clearTimeout(this.hideTimer);
				a = u(a, this.options.hideDelay, 500);
				this.isHidden || (this.hideTimer = r(function() {
					f.getLabel()[a ? "fadeOut": "hide"]();
					f.isHidden = !0
				},
				a))
			},
			getAnchor: function(a, h) {
				var f, k = this.chart,
				d = k.inverted,
				b = k.plotTop,
				c = k.plotLeft,
				l = 0,
				e = 0,
				m, x;
				a = q(a);
				f = a[0].tooltipPos;
				this.followPointer && h && (void 0 === h.chartX && (h = k.pointer.normalize(h)), f = [h.chartX - k.plotLeft, h.chartY - b]);
				f || (z(a,
				function(a) {
					m = a.series.yAxis;
					x = a.series.xAxis;
					l += a.plotX + (!d && x ? x.left - c: 0);
					e += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!d && m ? m.top - b: 0)
				}), l /= a.length, e /= a.length, f = [d ? k.plotWidth - e: l, this.shared && !d && 1 < a.length && h ? h.chartY - b: d ? k.plotHeight - l: e]);
				return g(f, Math.round)
			},
			getPosition: function(a, h, e) {
				var f = this.chart,
				d = this.distance,
				b = {},
				c = f.inverted && e.h || 0,
				l, g = ["y", f.chartHeight, h, e.plotY + f.plotTop, f.plotTop, f.plotTop + f.plotHeight],
				n = ["x", f.chartWidth, a, e.plotX + f.plotLeft, f.plotLeft, f.plotLeft + f.plotWidth],
				x = !this.followPointer && u(e.ttBelow, !f.inverted === !!e.negative),
				m = function(a, f, k, l, h, e) {
					var p = k < l - d,
					g = l + d + k < f,
					w = l - d - k;
					l += d;
					if (x && g) b[a] = l;
					else if (!x && p) b[a] = w;
					else if (p) b[a] = Math.min(e - k, 0 > w - c ? w: w - c);
					else if (g) b[a] = Math.max(h, l + c + k > f ? l: l + c);
					else return ! 1
				},
				D = function(a, c, f, k) {
					var l;
					k < d || k > c - d ? l = !1 : b[a] = k < f / 2 ? 1 : k > c - f / 2 ? c - f - 2 : k - f / 2;
					return l
				},
				v = function(a) {
					var b = g;
					g = n;
					n = b;
					l = a
				},
				w = function() { ! 1 !== m.apply(0, g) ? !1 !== D.apply(0, n) || l || (v(!0), w()) : l ? b.x = b.y = 0 : (v(!0), w())
				}; (f.inverted || 1 < this.len) && v();
				w();
				return b
			},
			defaultFormatter: function(a) {
				var f = this.points || q(this),
				e;
				e = [a.tooltipFooterHeaderFormatter(f[0])];
				e = e.concat(a.bodyFormatter(f));
				e.push(a.tooltipFooterHeaderFormatter(f[0], !0));
				return e
			},
			refresh: function(a, h) {
				var f, k = this.options,
				d, b = a,
				c, l = {},
				e = [];
				f = k.formatter || this.defaultFormatter;
				var l = this.shared,
				g;
				k.enabled && (clearTimeout(this.hideTimer), this.followPointer = q(b)[0].series.tooltipOptions.followPointer, c = this.getAnchor(b, h), h = c[0], d = c[1], !l || b.series && b.series.noSharedTooltip ? l = b.getLabelConfig() : (z(b,
				function(a) {
					a.setState("hover");
					e.push(a.getLabelConfig())
				}), l = {
					x: b[0].category,
					y: b[0].y
				},
				l.points = e, b = b[0]), this.len = e.length, l = f.call(l, this), g = b.series, this.distance = u(g.tooltipOptions.distance, 16), !1 === l ? this.hide() : (f = this.getLabel(), this.isHidden && f.attr({
					opacity: 1
				}).show(), this.split ? this.renderSplit(l, q(a)) : (k.style.width || f.css({
					width: this.chart.spacingBox.width
				}), f.attr({
					text: l && l.join ? l.join("") : l
				}), f.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + u(b.colorIndex, g.colorIndex)), f.attr({
					stroke: k.borderColor || b.color || g.color || "#666666"
				}), this.updatePosition({
					plotX: h,
					plotY: d,
					negative: b.negative,
					ttBelow: b.ttBelow,
					h: c[2] || 0
				})), this.isHidden = !1))
			},
			renderSplit: function(f, h) {
				var e = this,
				k = [],
				d = this.chart,
				b = d.renderer,
				c = !0,
				l = this.options,
				g = 0,
				m = this.getLabel();
				a.isString(f) && (f = [!1, f]);
				z(f.slice(0, h.length + 1),
				function(a, f) {
					if (!1 !== a) {
						f = h[f - 1] || {
							isHeader: !0,
							plotX: h[0].plotX
						};
						var x = f.series || e,
						n = x.tt,
						w = f.series || {},
						G = "highcharts-color-" + u(f.colorIndex, w.colorIndex, "none");
						n || (x.tt = n = b.label(null, null, null, "callout", null, null, l.useHTML).addClass("highcharts-tooltip-box " + G).attr({
							padding: l.padding,
							r: l.borderRadius,
							fill: l.backgroundColor,
							stroke: l.borderColor || f.color || w.color || "#333333",
							"stroke-width": l.borderWidth
						}).add(m));
						n.isActive = !0;
						n.attr({
							text: a
						});
						n.css(l.style).shadow(l.shadow);
						a = n.getBBox();
						w = a.width + n.strokeWidth();
						f.isHeader ? (g = a.height, w = Math.max(0, Math.min(f.plotX + d.plotLeft - w / 2, d.chartWidth - w))) : w = f.plotX + d.plotLeft - u(l.distance, 16) - w;
						0 > w && (c = !1);
						a = (f.series && f.series.yAxis && f.series.yAxis.pos) + (f.plotY || 0);
						a -= d.plotTop;
						k.push({
							target: f.isHeader ? d.plotHeight + g: a,
							rank: f.isHeader ? 1 : 0,
							size: x.tt.getBBox().height + 1,
							point: f,
							x: w,
							tt: n
						})
					}
				});
				this.cleanSplit();
				a.distribute(k, d.plotHeight + g);
				z(k,
				function(a) {
					var b = a.point,
					f = b.series;
					a.tt.attr({
						visibility: void 0 === a.pos ? "hidden": "inherit",
						x: c || b.isHeader ? a.x: b.plotX + d.plotLeft + u(l.distance, 16),
						y: a.pos + d.plotTop,
						anchorX: b.isHeader ? b.plotX + d.plotLeft: b.plotX + f.xAxis.pos,
						anchorY: b.isHeader ? a.pos + d.plotTop - 15 : b.plotY + f.yAxis.pos
					})
				})
			},
			updatePosition: function(a) {
				var f = this.chart,
				e = this.getLabel(),
				e = (this.options.positioner || this.getPosition).call(this, e.width, e.height, a);
				this.move(Math.round(e.x), Math.round(e.y || 0), a.plotX + f.plotLeft, a.plotY + f.plotTop)
			},
			getDateFormat: function(a, h, e, k) {
				var d = this.chart.time,
				b = d.dateFormat("%m-%d %H:%M:%S.%L", h),
				c,
				f,
				g = {
					millisecond: 15,
					second: 12,
					minute: 9,
					hour: 6,
					day: 3
				},
				n = "millisecond";
				for (f in m) {
					if (a === m.week && +d.dateFormat("%w", h) === e && "00:00:00.000" === b.substr(6)) {
						f = "week";
						break
					}
					if (m[f] > a) {
						f = n;
						break
					}
					if (g[f] && b.substr(g[f]) !== "01-01 00:00:00.000".substr(g[f])) break;
					"week" !== f && (n = f)
				}
				f && (c = k[f]);
				return c
			},
			getXDateFormat: function(a, h, e) {
				h = h.dateTimeLabelFormats;
				var f = e && e.closestPointRange;
				return (f ? this.getDateFormat(f, a.x, e.options.startOfWeek, h) : h.day) || h.year
			},
			tooltipFooterHeaderFormatter: function(a, h) {
				h = h ? "footer": "header";
				var f = a.series,
				k = f.tooltipOptions,
				d = k.xDateFormat,
				b = f.xAxis,
				c = b && "datetime" === b.options.type && e(a.key),
				l = k[h + "Format"];
				c && !d && (d = this.getXDateFormat(a, k, b));
				c && d && z(a.point && a.point.tooltipDateKeys || ["key"],
				function(a) {
					l = l.replace("{point." + a + "}", "{point." + a + ":" + d + "}")
				});
				return y(l, {
					point: a,
					series: f
				},
				this.chart.time)
			},
			bodyFormatter: function(a) {
				return g(a,
				function(a) {
					var f = a.series.tooltipOptions;
					return (f[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, f[(a.point.formatPrefix || "point") + "Format"])
				})
			}
		}
	})(J); (function(a) {
		var z = a.addEvent,
		B = a.attr,
		y = a.charts,
		e = a.color,
		g = a.css,
		t = a.defined,
		u = a.each,
		q = a.extend,
		r = a.find,
		m = a.fireEvent,
		f = a.isNumber,
		h = a.isObject,
		n = a.offset,
		k = a.pick,
		d = a.splat,
		b = a.Tooltip;
		a.Pointer = function(a, b) {
			this.init(a, b)
		};
		a.Pointer.prototype = {
			init: function(a, d) {
				this.options = d;
				this.chart = a;
				this.runChartClick = d.chart.events && !!d.chart.events.click;
				this.pinchDown = [];
				this.lastValidTouch = {};
				b && (a.tooltip = new b(a, d.tooltip), this.followTouchMove = k(d.tooltip.followTouchMove, !0));
				this.setDOMEvents()
			},
			zoomOption: function(a) {
				var b = this.chart,
				c = b.options.chart,
				d = c.zoomType || "",
				b = b.inverted;
				/touch/.test(a.type) && (d = k(c.pinchType, d));
				this.zoomX = a = /x/.test(d);
				this.zoomY = d = /y/.test(d);
				this.zoomHor = a && !b || d && b;
				this.zoomVert = d && !b || a && b;
				this.hasZoom = a || d
			},
			normalize: function(a, b) {
				var c;
				c = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
				b || (this.chartPosition = b = n(this.chart.container));
				return q(a, {
					chartX: Math.round(c.pageX - b.left),
					chartY: Math.round(c.pageY - b.top)
				})
			},
			getCoordinates: function(a) {
				var b = {
					xAxis: [],
					yAxis: []
				};
				u(this.chart.axes,
				function(c) {
					b[c.isXAxis ? "xAxis": "yAxis"].push({
						axis: c,
						value: c.toValue(a[c.horiz ? "chartX": "chartY"])
					})
				});
				return b
			},
			findNearestKDPoint: function(a, b, d) {
				var c;
				u(a,
				function(a) {
					var f = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
					a = a.searchPoint(d, f);
					if ((f = h(a, !0)) && !(f = !h(c, !0))) var f = c.distX - a.distX,
					k = c.dist - a.dist,
					l = (a.series.group && a.series.group.zIndex) - (c.series.group && c.series.group.zIndex),
					f = 0 < (0 !== f && b ? f: 0 !== k ? k: 0 !== l ? l: c.series.index > a.series.index ? -1 : 1);
					f && (c = a)
				});
				return c
			},
			getPointFromEvent: function(a) {
				a = a.target;
				for (var b; a && !b;) b = a.point,
				a = a.parentNode;
				return b
			},
			getChartCoordinatesFromPoint: function(a, b) {
				var c = a.series,
				d = c.xAxis,
				c = c.yAxis,
				f = k(a.clientX, a.plotX);
				if (d && c) return b ? {
					chartX: d.len + d.pos - f,
					chartY: c.len + c.pos - a.plotY
				}: {
					chartX: f + d.pos,
					chartY: a.plotY + c.pos
				}
			},
			getHoverData: function(b, d, f, e, g, m, n) {
				var c, l = [],
				G = n && n.isBoosting;
				e = !(!e || !b);
				n = d && !d.stickyTracking ? [d] : a.grep(f,
				function(a) {
					return a.visible && !(!g && a.directTouch) && k(a.options.enableMouseTracking, !0) && a.stickyTracking
				});
				d = (c = e ? b: this.findNearestKDPoint(n, g, m)) && c.series;
				c && (g && !d.noSharedTooltip ? (n = a.grep(f,
				function(a) {
					return a.visible && !(!g && a.directTouch) && k(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
				}), u(n,
				function(a) {
					var b = r(a.points,
					function(a) {
						return a.x === c.x && !a.isNull
					});
					h(b) && (G && (b = a.getPoint(b)), l.push(b))
				})) : l.push(c));
				return {
					hoverPoint: c,
					hoverSeries: d,
					hoverPoints: l
				}
			},
			runPointActions: function(b, d) {
				var c = this.chart,
				f = c.tooltip && c.tooltip.options.enabled ? c.tooltip: void 0,
				l = f ? f.shared: !1,
				e = d || c.hoverPoint,
				h = e && e.series || c.hoverSeries,
				h = this.getHoverData(e, h, c.series, !!d || h && h.directTouch && this.isDirectTouch, l, b, {
					isBoosting: c.isBoosting
				}),
				g,
				e = h.hoverPoint;
				g = h.hoverPoints;
				d = (h = h.hoverSeries) && h.tooltipOptions.followPointer;
				l = l && h && !h.noSharedTooltip;
				if (e && (e !== c.hoverPoint || f && f.isHidden)) {
					u(c.hoverPoints || [],
					function(b) { - 1 === a.inArray(b, g) && b.setState()
					});
					u(g || [],
					function(a) {
						a.setState("hover")
					});
					if (c.hoverSeries !== h) h.onMouseOver();
					c.hoverPoint && c.hoverPoint.firePointEvent("mouseOut");
					if (!e.series) return;
					e.firePointEvent("mouseOver");
					c.hoverPoints = g;
					c.hoverPoint = e;
					f && f.refresh(l ? g: e, b)
				} else d && f && !f.isHidden && (e = f.getAnchor([{}], b), f.updatePosition({
					plotX: e[0],
					plotY: e[1]
				}));
				this.unDocMouseMove || (this.unDocMouseMove = z(c.container.ownerDocument, "mousemove",
				function(b) {
					var c = y[a.hoverChartIndex];
					if (c) c.pointer.onDocumentMouseMove(b)
				}));
				u(c.axes,
				function(c) {
					var d = k(c.crosshair.snap, !0),
					f = d ? a.find(g,
					function(a) {
						return a.series[c.coll] === c
					}) : void 0;
					f || !d ? c.drawCrosshair(b, f) : c.hideCrosshair()
				})
			},
			reset: function(a, b) {
				var c = this.chart,
				f = c.hoverSeries,
				k = c.hoverPoint,
				l = c.hoverPoints,
				e = c.tooltip,
				h = e && e.shared ? l: k;
				a && h && u(d(h),
				function(b) {
					b.series.isCartesian && void 0 === b.plotX && (a = !1)
				});
				if (a) e && h && (e.refresh(h), k && (k.setState(k.state, !0), u(c.axes,
				function(a) {
					a.crosshair && a.drawCrosshair(null, k)
				})));
				else {
					if (k) k.onMouseOut();
					l && u(l,
					function(a) {
						a.setState()
					});
					if (f) f.onMouseOut();
					e && e.hide(b);
					this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
					u(c.axes,
					function(a) {
						a.hideCrosshair()
					});
					this.hoverX = c.hoverPoints = c.hoverPoint = null
				}
			},
			scaleGroups: function(a, b) {
				var c = this.chart,
				d;
				u(c.series,
				function(f) {
					d = a || f.getPlotBox();
					f.xAxis && f.xAxis.zoomEnabled && f.group && (f.group.attr(d), f.markerGroup && (f.markerGroup.attr(d), f.markerGroup.clip(b ? c.clipRect: null)), f.dataLabelsGroup && f.dataLabelsGroup.attr(d))
				});
				c.clipRect.attr(b || c.clipBox)
			},
			dragStart: function(a) {
				var b = this.chart;
				b.mouseIsDown = a.type;
				b.cancelClick = !1;
				b.mouseDownX = this.mouseDownX = a.chartX;
				b.mouseDownY = this.mouseDownY = a.chartY
			},
			drag: function(a) {
				var b = this.chart,
				c = b.options.chart,
				d = a.chartX,
				f = a.chartY,
				k = this.zoomHor,
				h = this.zoomVert,
				g = b.plotLeft,
				w = b.plotTop,
				G = b.plotWidth,
				m = b.plotHeight,
				n, E = this.selectionMarker,
				p = this.mouseDownX,
				r = this.mouseDownY,
				q = c.panKey && a[c.panKey + "Key"];
				E && E.touch || (d < g ? d = g: d > g + G && (d = g + G), f < w ? f = w: f > w + m && (f = w + m), this.hasDragged = Math.sqrt(Math.pow(p - d, 2) + Math.pow(r - f, 2)), 10 < this.hasDragged && (n = b.isInsidePlot(p - g, r - w), b.hasCartesianSeries && (this.zoomX || this.zoomY) && n && !q && !E && (this.selectionMarker = E = b.renderer.rect(g, w, k ? 1 : G, h ? 1 : m, 0).attr({
					fill: c.selectionMarkerFill || e("#335cad").setOpacity(.25).get(),
					"class": "highcharts-selection-marker",
					zIndex: 7
				}).add()), E && k && (d -= p, E.attr({
					width: Math.abs(d),
					x: (0 < d ? 0 : d) + p
				})), E && h && (d = f - r, E.attr({
					height: Math.abs(d),
					y: (0 < d ? 0 : d) + r
				})), n && !E && c.panning && b.pan(a, c.panning)))
			},
			drop: function(a) {
				var b = this,
				c = this.chart,
				d = this.hasPinched;
				if (this.selectionMarker) {
					var k = {
						originalEvent: a,
						xAxis: [],
						yAxis: []
					},
					e = this.selectionMarker,
					h = e.attr ? e.attr("x") : e.x,
					n = e.attr ? e.attr("y") : e.y,
					w = e.attr ? e.attr("width") : e.width,
					G = e.attr ? e.attr("height") : e.height,
					H;
					if (this.hasDragged || d) u(c.axes,
					function(c) {
						if (c.zoomEnabled && t(c.min) && (d || b[{
							xAxis: "zoomX",
							yAxis: "zoomY"
						} [c.coll]])) {
							var f = c.horiz,
							l = "touchend" === a.type ? c.minPixelPadding: 0,
							e = c.toValue((f ? h: n) + l),
							f = c.toValue((f ? h + w: n + G) - l);
							k[c.coll].push({
								axis: c,
								min: Math.min(e, f),
								max: Math.max(e, f)
							});
							H = !0
						}
					}),
					H && m(c, "selection", k,
					function(a) {
						c.zoom(q(a, d ? {
							animation: !1
						}: null))
					});
					f(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
					d && this.scaleGroups()
				}
				c && f(c.index) && (g(c.container, {
					cursor: c._cursor
				}), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
			},
			onContainerMouseDown: function(a) {
				a = this.normalize(a);
				2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
			},
			onDocumentMouseUp: function(b) {
				y[a.hoverChartIndex] && y[a.hoverChartIndex].pointer.drop(b)
			},
			onDocumentMouseMove: function(a) {
				var b = this.chart,
				c = this.chartPosition;
				a = this.normalize(a, c); ! c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
			},
			onContainerMouseLeave: function(b) {
				var c = y[a.hoverChartIndex];
				c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
			},
			onContainerMouseMove: function(b) {
				var c = this.chart;
				t(a.hoverChartIndex) && y[a.hoverChartIndex] && y[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
				b = this.normalize(b);
				b.returnValue = !1;
				"mousedown" === c.mouseIsDown && this.drag(b); ! this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
			},
			inClass: function(a, b) {
				for (var c; a;) {
					if (c = B(a, "class")) {
						if ( - 1 !== c.indexOf(b)) return ! 0;
						if ( - 1 !== c.indexOf("highcharts-container")) return ! 1
					}
					a = a.parentNode
				}
			},
			onTrackerMouseOut: function(a) {
				var b = this.chart.hoverSeries;
				a = a.relatedTarget || a.toElement;
				this.isDirectTouch = !1;
				if (! (!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
			},
			onContainerClick: function(a) {
				var b = this.chart,
				c = b.hoverPoint,
				d = b.plotLeft,
				f = b.plotTop;
				a = this.normalize(a);
				b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (m(c.series, "click", q(a, {
					point: c
				})), b.hoverPoint && c.firePointEvent("click", a)) : (q(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - f) && m(b, "click", a)))
			},
			setDOMEvents: function() {
				var b = this,
				d = b.chart.container,
				f = d.ownerDocument;
				d.onmousedown = function(a) {
					b.onContainerMouseDown(a)
				};
				d.onmousemove = function(a) {
					b.onContainerMouseMove(a)
				};
				d.onclick = function(a) {
					b.onContainerClick(a)
				};
				this.unbindContainerMouseLeave = z(d, "mouseleave", b.onContainerMouseLeave);
				a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = z(f, "mouseup", b.onDocumentMouseUp));
				a.hasTouch && (d.ontouchstart = function(a) {
					b.onContainerTouchStart(a)
				},
				d.ontouchmove = function(a) {
					b.onContainerTouchMove(a)
				},
				a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = z(f, "touchend", b.onDocumentTouchEnd)))
			},
			destroy: function() {
				var b = this;
				b.unDocMouseMove && b.unDocMouseMove();
				this.unbindContainerMouseLeave();
				a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
				clearInterval(b.tooltipTimeout);
				a.objectEach(b,
				function(a, d) {
					b[d] = null
				})
			}
		}
	})(J); (function(a) {
		var z = a.charts,
		B = a.each,
		y = a.extend,
		e = a.map,
		g = a.noop,
		t = a.pick;
		y(a.Pointer.prototype, {
			pinchTranslate: function(a, e, g, m, f, h) {
				this.zoomHor && this.pinchTranslateDirection(!0, a, e, g, m, f, h);
				this.zoomVert && this.pinchTranslateDirection(!1, a, e, g, m, f, h)
			},
			pinchTranslateDirection: function(a, e, g, m, f, h, n, k) {
				var d = this.chart,
				b = a ? "x": "y",
				c = a ? "X": "Y",
				l = "chart" + c,
				r = a ? "width": "height",
				q = d["plot" + (a ? "Left": "Top")],
				x,
				t,
				D = k || 1,
				v = d.inverted,
				w = d.bounds[a ? "h": "v"],
				G = 1 === e.length,
				H = e[0][l],
				I = g[0][l],
				E = !G && e[1][l],
				p = !G && g[1][l],
				F;
				g = function() { ! G && 20 < Math.abs(H - E) && (D = k || Math.abs(I - p) / Math.abs(H - E));
					t = (q - I) / D + H;
					x = d["plot" + (a ? "Width": "Height")] / D
				};
				g();
				e = t;
				e < w.min ? (e = w.min, F = !0) : e + x > w.max && (e = w.max - x, F = !0);
				F ? (I -= .8 * (I - n[b][0]), G || (p -= .8 * (p - n[b][1])), g()) : n[b] = [I, p];
				v || (h[b] = t - q, h[r] = x);
				h = v ? 1 / D: D;
				f[r] = x;
				f[b] = e;
				m[v ? a ? "scaleY": "scaleX": "scale" + c] = D;
				m["translate" + c] = h * q + (I - h * H)
			},
			pinch: function(a) {
				var q = this,
				r = q.chart,
				m = q.pinchDown,
				f = a.touches,
				h = f.length,
				n = q.lastValidTouch,
				k = q.hasZoom,
				d = q.selectionMarker,
				b = {},
				c = 1 === h && (q.inClass(a.target, "highcharts-tracker") && r.runTrackerClick || q.runChartClick),
				l = {};
				1 < h && (q.initiated = !0);
				k && q.initiated && !c && a.preventDefault();
				e(f,
				function(a) {
					return q.normalize(a)
				});
				"touchstart" === a.type ? (B(f,
				function(a, b) {
					m[b] = {
						chartX: a.chartX,
						chartY: a.chartY
					}
				}), n.x = [m[0].chartX, m[1] && m[1].chartX], n.y = [m[0].chartY, m[1] && m[1].chartY], B(r.axes,
				function(a) {
					if (a.zoomEnabled) {
						var b = r.bounds[a.horiz ? "h": "v"],
						d = a.minPixelPadding,
						c = a.toPixels(t(a.options.min, a.dataMin)),
						f = a.toPixels(t(a.options.max, a.dataMax)),
						k = Math.max(c, f);
						b.min = Math.min(a.pos, Math.min(c, f) - d);
						b.max = Math.max(a.pos + a.len, k + d)
					}
				}), q.res = !0) : q.followTouchMove && 1 === h ? this.runPointActions(q.normalize(a)) : m.length && (d || (q.selectionMarker = d = y({
					destroy: g,
					touch: !0
				},
				r.plotBox)), q.pinchTranslate(m, f, b, d, l, n), q.hasPinched = k, q.scaleGroups(b, l), q.res && (q.res = !1, this.reset(!1, 0)))
			},
			touch: function(e, g) {
				var r = this.chart,
				m, f;
				if (r.index !== a.hoverChartIndex) this.onContainerMouseLeave({
					relatedTarget: !0
				});
				a.hoverChartIndex = r.index;
				1 === e.touches.length ? (e = this.normalize(e), (f = r.isInsidePlot(e.chartX - r.plotLeft, e.chartY - r.plotTop)) && !r.openMenu ? (g && this.runPointActions(e), "touchmove" === e.type && (g = this.pinchDown, m = g[0] ? 4 <= Math.sqrt(Math.pow(g[0].chartX - e.chartX, 2) + Math.pow(g[0].chartY - e.chartY, 2)) : !1), t(m, !0) && this.pinch(e)) : g && this.reset()) : 2 === e.touches.length && this.pinch(e)
			},
			onContainerTouchStart: function(a) {
				this.zoomOption(a);
				this.touch(a, !0)
			},
			onContainerTouchMove: function(a) {
				this.touch(a)
			},
			onDocumentTouchEnd: function(e) {
				z[a.hoverChartIndex] && z[a.hoverChartIndex].pointer.drop(e)
			}
		})
	})(J); (function(a) {
		var z = a.addEvent,
		B = a.charts,
		y = a.css,
		e = a.doc,
		g = a.extend,
		t = a.noop,
		u = a.Pointer,
		q = a.removeEvent,
		r = a.win,
		m = a.wrap;
		if (!a.hasTouch && (r.PointerEvent || r.MSPointerEvent)) {
			var f = {},
			h = !!r.PointerEvent,
			n = function() {
				var d = [];
				d.item = function(a) {
					return this[a]
				};
				a.objectEach(f,
				function(a) {
					d.push({
						pageX: a.pageX,
						pageY: a.pageY,
						target: a.target
					})
				});
				return d
			},
			k = function(d, b, c, f) {
				"touch" !== d.pointerType && d.pointerType !== d.MSPOINTER_TYPE_TOUCH || !B[a.hoverChartIndex] || (f(d), f = B[a.hoverChartIndex].pointer, f[b]({
					type: c,
					target: d.currentTarget,
					preventDefault: t,
					touches: n()
				}))
			};
			g(u.prototype, {
				onContainerPointerDown: function(a) {
					k(a, "onContainerTouchStart", "touchstart",
					function(a) {
						f[a.pointerId] = {
							pageX: a.pageX,
							pageY: a.pageY,
							target: a.currentTarget
						}
					})
				},
				onContainerPointerMove: function(a) {
					k(a, "onContainerTouchMove", "touchmove",
					function(a) {
						f[a.pointerId] = {
							pageX: a.pageX,
							pageY: a.pageY
						};
						f[a.pointerId].target || (f[a.pointerId].target = a.currentTarget)
					})
				},
				onDocumentPointerUp: function(a) {
					k(a, "onDocumentTouchEnd", "touchend",
					function(a) {
						delete f[a.pointerId]
					})
				},
				batchMSEvents: function(a) {
					a(this.chart.container, h ? "pointerdown": "MSPointerDown", this.onContainerPointerDown);
					a(this.chart.container, h ? "pointermove": "MSPointerMove", this.onContainerPointerMove);
					a(e, h ? "pointerup": "MSPointerUp", this.onDocumentPointerUp)
				}
			});
			m(u.prototype, "init",
			function(a, b, c) {
				a.call(this, b, c);
				this.hasZoom && y(b.container, {
					"-ms-touch-action": "none",
					"touch-action": "none"
				})
			});
			m(u.prototype, "setDOMEvents",
			function(a) {
				a.apply(this); (this.hasZoom || this.followTouchMove) && this.batchMSEvents(z)
			});
			m(u.prototype, "destroy",
			function(a) {
				this.batchMSEvents(q);
				a.call(this)
			})
		}
	})(J); (function(a) {
		var z = a.addEvent,
		B = a.css,
		y = a.discardElement,
		e = a.defined,
		g = a.each,
		t = a.isFirefox,
		u = a.marginNames,
		q = a.merge,
		r = a.pick,
		m = a.setAnimation,
		f = a.stableSort,
		h = a.win,
		n = a.wrap;
		a.Legend = function(a, d) {
			this.init(a, d)
		};
		a.Legend.prototype = {
			init: function(a, d) {
				this.chart = a;
				this.setOptions(d);
				d.enabled && (this.render(), z(this.chart, "endResize",
				function() {
					this.legend.positionCheckboxes()
				}))
			},
			setOptions: function(a) {
				var d = r(a.padding, 8);
				this.options = a;
				this.itemStyle = a.itemStyle;
				this.itemHiddenStyle = q(this.itemStyle, a.itemHiddenStyle);
				this.itemMarginTop = a.itemMarginTop || 0;
				this.padding = d;
				this.initialItemY = d - 5;
				this.itemHeight = this.maxItemWidth = 0;
				this.symbolWidth = r(a.symbolWidth, 16);
				this.pages = []
			},
			update: function(a, d) {
				var b = this.chart;
				this.setOptions(q(!0, this.options, a));
				this.destroy();
				b.isDirtyLegend = b.isDirtyBox = !0;
				r(d, !0) && b.redraw()
			},
			colorizeItem: function(a, d) {
				a.legendGroup[d ? "removeClass": "addClass"]("highcharts-legend-item-hidden");
				var b = this.options,
				c = a.legendItem,
				f = a.legendLine,
				k = a.legendSymbol,
				e = this.itemHiddenStyle.color,
				b = d ? b.itemStyle.color: e,
				h = d ? a.color || e: e,
				g = a.options && a.options.marker,
				m = {
					fill: h
				};
				c && c.css({
					fill: b,
					color: b
				});
				f && f.attr({
					stroke: h
				});
				k && (g && k.isMarker && (m = a.pointAttribs(), d || (m.stroke = m.fill = e)), k.attr(m))
			},
			positionItem: function(a) {
				var d = this.options,
				b = d.symbolPadding,
				d = !d.rtl,
				c = a._legendItemPos,
				f = c[0],
				c = c[1],
				k = a.checkbox; (a = a.legendGroup) && a.element && a.translate(d ? f: this.legendWidth - f - 2 * b - 4, c);
				k && (k.x = f, k.y = c)
			},
			destroyItem: function(a) {
				var d = a.checkbox;
				g(["legendItem", "legendLine", "legendSymbol", "legendGroup"],
				function(b) {
					a[b] && (a[b] = a[b].destroy())
				});
				d && y(a.checkbox)
			},
			destroy: function() {
				function a(a) {
					this[a] && (this[a] = this[a].destroy())
				}
				g(this.getAllItems(),
				function(d) {
					g(["legendItem", "legendGroup"], a, d)
				});
				g("clipRect up down pager nav box title group".split(" "), a, this);
				this.display = null
			},
			positionCheckboxes: function() {
				var a = this.group && this.group.alignAttr,
				d, b = this.clipHeight || this.legendHeight,
				c = this.titleHeight;
				a && (d = a.translateY, g(this.allItems,
				function(f) {
					var k = f.checkbox,
					e;
					k && (e = d + c + k.y + (this.scrollOffset || 0) + 3, B(k, {
						left: a.translateX + f.checkboxOffset + k.x - 20 + "px",
						top: e + "px",
						display: e > d - 6 && e < d + b - 6 ? "": "none"
					}))
				},
				this))
			},
			renderTitle: function() {
				var a = this.options,
				d = this.padding,
				b = a.title,
				c = 0;
				b.text && (this.title || (this.title = this.chart.renderer.label(b.text, d - 3, d - 4, null, null, null, a.useHTML, null, "legend-title").attr({
					zIndex: 1
				}).css(b.style).add(this.group)), a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
					translateY: c
				}));
				this.titleHeight = c
			},
			setText: function(f) {
				var d = this.options;
				f.legendItem.attr({
					text: d.labelFormat ? a.format(d.labelFormat, f, this.chart.time) : d.labelFormatter.call(f)
				})
			},
			renderItem: function(a) {
				var d = this.chart,
				b = d.renderer,
				c = this.options,
				f = "horizontal" === c.layout,
				k = this.symbolWidth,
				e = c.symbolPadding,
				h = this.itemStyle,
				g = this.itemHiddenStyle,
				m = this.padding,
				n = f ? r(c.itemDistance, 20) : 0,
				w = !c.rtl,
				G = c.width,
				H = c.itemMarginBottom || 0,
				I = this.itemMarginTop,
				E = a.legendItem,
				p = !a.series,
				t = !p && a.series.drawLegendSymbol ? a.series: a,
				u = t.options,
				M = this.createCheckboxForItem && u && u.showCheckbox,
				u = k + e + n + (M ? 20 : 0),
				N = c.useHTML,
				P = a.options.className;
				E || (a.legendGroup = b.g("legend-item").addClass("highcharts-" + t.type + "-series highcharts-color-" + a.colorIndex + (P ? " " + P: "") + (p ? " highcharts-series-" + a.index: "")).attr({
					zIndex: 1
				}).add(this.scrollGroup), a.legendItem = E = b.text("", w ? k + e: -e, this.baseline || 0, N).css(q(a.visible ? h: g)).attr({
					align: w ? "left": "right",
					zIndex: 2
				}).add(a.legendGroup), this.baseline || (k = h.fontSize, this.fontMetrics = b.fontMetrics(k, E), this.baseline = this.fontMetrics.f + 3 + I, E.attr("y", this.baseline)), this.symbolHeight = c.symbolHeight || this.fontMetrics.f, t.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, E, N), M && this.createCheckboxForItem(a));
				this.colorizeItem(a, a.visible);
				h.width || E.css({
					width: (c.itemWidth || c.width || d.spacingBox.width) - u
				});
				this.setText(a);
				b = E.getBBox();
				h = a.checkboxOffset = c.itemWidth || a.legendItemWidth || b.width + u;
				this.itemHeight = b = Math.round(a.legendItemHeight || b.height || this.symbolHeight);
				f && this.itemX - m + h > (G || d.spacingBox.width - 2 * m - c.x) && (this.itemX = m, this.itemY += I + this.lastLineHeight + H, this.lastLineHeight = 0);
				this.maxItemWidth = Math.max(this.maxItemWidth, h);
				this.lastItemY = I + this.itemY + H;
				this.lastLineHeight = Math.max(b, this.lastLineHeight);
				a._legendItemPos = [this.itemX, this.itemY];
				f ? this.itemX += h: (this.itemY += I + b + H, this.lastLineHeight = b);
				this.offsetWidth = G || Math.max((f ? this.itemX - m - (a.checkbox ? 0 : n) : h) + m, this.offsetWidth)
			},
			getAllItems: function() {
				var a = [];
				g(this.chart.series,
				function(d) {
					var b = d && d.options;
					d && r(b.showInLegend, e(b.linkedTo) ? !1 : void 0, !0) && (a = a.concat(d.legendItems || ("point" === b.legendType ? d.data: d)))
				});
				return a
			},
			getAlignment: function() {
				var a = this.options;
				return a.floating ? "": a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
			},
			adjustMargins: function(a, d) {
				var b = this.chart,
				c = this.options,
				f = this.getAlignment();
				f && g([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/],
				function(k, h) {
					k.test(f) && !e(a[h]) && (b[u[h]] = Math.max(b[u[h]], b.legend[(h + 1) % 2 ? "legendHeight": "legendWidth"] + [1, -1, -1, 1][h] * c[h % 2 ? "x": "y"] + r(c.margin, 12) + d[h] + (0 === h ? b.titleOffset + b.options.title.margin: 0)))
				})
			},
			render: function() {
				var a = this,
				d = a.chart,
				b = d.renderer,
				c = a.group,
				e, h, m, n, r = a.box,
				D = a.options,
				v = a.padding;
				a.itemX = v;
				a.itemY = a.initialItemY;
				a.offsetWidth = 0;
				a.lastItemY = 0;
				c || (a.group = c = b.g("legend").attr({
					zIndex: 7
				}).add(), a.contentGroup = b.g().attr({
					zIndex: 1
				}).add(c), a.scrollGroup = b.g().add(a.contentGroup));
				a.renderTitle();
				e = a.getAllItems();
				f(e,
				function(a, b) {
					return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
				});
				D.reversed && e.reverse();
				a.allItems = e;
				a.display = h = !!e.length;
				a.lastLineHeight = 0;
				g(e,
				function(b) {
					a.renderItem(b)
				});
				m = (D.width || a.offsetWidth) + v;
				n = a.lastItemY + a.lastLineHeight + a.titleHeight;
				n = a.handleOverflow(n);
				n += v;
				r || (a.box = r = b.rect().addClass("highcharts-legend-box").attr({
					r: D.borderRadius
				}).add(c), r.isNew = !0);
				r.attr({
					stroke: D.borderColor,
					"stroke-width": D.borderWidth || 0,
					fill: D.backgroundColor || "none"
				}).shadow(D.shadow);
				0 < m && 0 < n && (r[r.isNew ? "attr": "animate"](r.crisp.call({},
				{
					x: 0,
					y: 0,
					width: m,
					height: n
				},
				r.strokeWidth())), r.isNew = !1);
				r[h ? "show": "hide"]();
				a.legendWidth = m;
				a.legendHeight = n;
				g(e,
				function(b) {
					a.positionItem(b)
				});
				h && (b = d.spacingBox, /(lth|ct|rth)/.test(a.getAlignment()) && (b = q(b, {
					y: b.y + d.titleOffset + d.options.title.margin
				})), c.align(q(D, {
					width: m,
					height: n
				}), !0, b));
				d.isResizing || this.positionCheckboxes()
			},
			handleOverflow: function(a) {
				var d = this,
				b = this.chart,
				c = b.renderer,
				f = this.options,
				e = f.y,
				k = this.padding,
				b = b.spacingBox.height + ("top" === f.verticalAlign ? -e: e) - k,
				e = f.maxHeight,
				h,
				m = this.clipRect,
				n = f.navigation,
				v = r(n.animation, !0),
				w = n.arrowSize || 12,
				G = this.nav,
				H = this.pages,
				I,
				E = this.allItems,
				p = function(a) {
					"number" === typeof a ? m.attr({
						height: a
					}) : m && (d.clipRect = m.destroy(), d.contentGroup.clip());
					d.contentGroup.div && (d.contentGroup.div.style.clip = a ? "rect(" + k + "px,9999px," + (k + a) + "px,0)": "auto")
				};
				"horizontal" !== f.layout || "middle" === f.verticalAlign || f.floating || (b /= 2);
				e && (b = Math.min(b, e));
				H.length = 0;
				a > b && !1 !== n.enabled ? (this.clipHeight = h = Math.max(b - 20 - this.titleHeight - k, 0), this.currentPage = r(this.currentPage, 1), this.fullHeight = a, g(E,
				function(a, b) {
					var c = a._legendItemPos[1],
					d = Math.round(a.legendItem.getBBox().height),
					f = H.length;
					if (!f || c - H[f - 1] > h && (I || c) !== H[f - 1]) H.push(I || c),
					f++;
					a.pageIx = f - 1;
					I && (E[b - 1].pageIx = f - 1);
					b === E.length - 1 && c + d - H[f - 1] > h && (H.push(c), a.pageIx = f);
					c !== I && (I = c)
				}), m || (m = d.clipRect = c.clipRect(0, k, 9999, 0), d.contentGroup.clip(m)), p(h), G || (this.nav = G = c.g().attr({
					zIndex: 1
				}).add(this.group), this.up = c.symbol("triangle", 0, 0, w, w).on("click",
				function() {
					d.scroll( - 1, v)
				}).add(G), this.pager = c.text("", 15, 10).addClass("highcharts-legend-navigation").css(n.style).add(G), this.down = c.symbol("triangle-down", 0, 0, w, w).on("click",
				function() {
					d.scroll(1, v)
				}).add(G)), d.scroll(0), a = b) : G && (p(), this.nav = G.destroy(), this.scrollGroup.attr({
					translateY: 1
				}), this.clipHeight = 0);
				return a
			},
			scroll: function(a, d) {
				var b = this.pages,
				c = b.length;
				a = this.currentPage + a;
				var f = this.clipHeight,
				e = this.options.navigation,
				h = this.pager,
				k = this.padding;
				a > c && (a = c);
				0 < a && (void 0 !== d && m(d, this.chart), this.nav.attr({
					translateX: k,
					translateY: f + this.padding + 7 + this.titleHeight,
					visibility: "visible"
				}), this.up.attr({
					"class": 1 === a ? "highcharts-legend-nav-inactive": "highcharts-legend-nav-active"
				}), h.attr({
					text: a + "/" + c
				}), this.down.attr({
					x: 18 + this.pager.getBBox().width,
					"class": a === c ? "highcharts-legend-nav-inactive": "highcharts-legend-nav-active"
				}), this.up.attr({
					fill: 1 === a ? e.inactiveColor: e.activeColor
				}).css({
					cursor: 1 === a ? "default": "pointer"
				}), this.down.attr({
					fill: a === c ? e.inactiveColor: e.activeColor
				}).css({
					cursor: a === c ? "default": "pointer"
				}), this.scrollOffset = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({
					translateY: this.scrollOffset
				}), this.currentPage = a, this.positionCheckboxes())
			}
		};
		a.LegendSymbolMixin = {
			drawRectangle: function(a, d) {
				var b = a.symbolHeight,
				c = a.options.squareSymbol;
				d.legendSymbol = this.chart.renderer.rect(c ? (a.symbolWidth - b) / 2 : 0, a.baseline - b + 1, c ? b: a.symbolWidth, b, r(a.options.symbolRadius, b / 2)).addClass("highcharts-point").attr({
					zIndex: 3
				}).add(d.legendGroup)
			},
			drawLineMarker: function(a) {
				var d = this.options,
				b = d.marker,
				c = a.symbolWidth,
				f = a.symbolHeight,
				e = f / 2,
				h = this.chart.renderer,
				k = this.legendGroup;
				a = a.baseline - Math.round(.3 * a.fontMetrics.b);
				var g;
				g = {
					"stroke-width": d.lineWidth || 0
				};
				d.dashStyle && (g.dashstyle = d.dashStyle);
				this.legendLine = h.path(["M", 0, a, "L", c, a]).addClass("highcharts-graph").attr(g).add(k);
				b && !1 !== b.enabled && (d = Math.min(r(b.radius, e), e), 0 === this.symbol.indexOf("url") && (b = q(b, {
					width: f,
					height: f
				}), d = 0), this.legendSymbol = b = h.symbol(this.symbol, c / 2 - d, a - d, 2 * d, 2 * d, b).addClass("highcharts-point").add(k), b.isMarker = !0)
			}
		}; (/Trident\/7\.0/.test(h.navigator.userAgent) || t) && n(a.Legend.prototype, "positionItem",
		function(a, d) {
			var b = this,
			c = function() {
				d._legendItemPos && a.call(b, d)
			};
			c();
			setTimeout(c)
		})
	})(J); (function(a) {
		var z = a.addEvent,
		B = a.animate,
		y = a.animObject,
		e = a.attr,
		g = a.doc,
		t = a.Axis,
		u = a.createElement,
		q = a.defaultOptions,
		r = a.discardElement,
		m = a.charts,
		f = a.css,
		h = a.defined,
		n = a.each,
		k = a.extend,
		d = a.find,
		b = a.fireEvent,
		c = a.grep,
		l = a.isNumber,
		C = a.isObject,
		K = a.isString,
		x = a.Legend,
		L = a.marginNames,
		D = a.merge,
		v = a.objectEach,
		w = a.Pointer,
		G = a.pick,
		H = a.pInt,
		I = a.removeEvent,
		E = a.seriesTypes,
		p = a.splat,
		F = a.syncTimeout,
		O = a.win,
		M = a.Chart = function() {
			this.getArgs.apply(this, arguments)
		};
		a.chart = function(a, b, c) {
			return new M(a, b, c)
		};
		k(M.prototype, {
			callbacks: [],
			getArgs: function() {
				var a = [].slice.call(arguments);
				if (K(a[0]) || a[0].nodeName) this.renderTo = a.shift();
				this.init(a[0], a[1])
			},
			init: function(b, c) {
				var d, f, e = b.series,
				h = b.plotOptions || {};
				b.series = null;
				d = D(q, b);
				for (f in d.plotOptions) d.plotOptions[f].tooltip = h[f] && D(h[f].tooltip) || void 0;
				d.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
				d.series = b.series = e;
				this.userOptions = b;
				f = d.chart;
				e = f.events;
				this.margin = [];
				this.spacing = [];
				this.bounds = {
					h: {},
					v: {}
				};
				this.labelCollectors = [];
				this.callback = c;
				this.isResizing = 0;
				this.options = d;
				this.axes = [];
				this.series = [];
				this.time = b.time && a.keys(b.time).length ? new a.Time(b.time) : a.time;
				this.hasCartesianSeries = f.showAxes;
				var k = this;
				k.index = m.length;
				m.push(k);
				a.chartCount++;
				e && v(e,
				function(a, b) {
					z(k, b, a)
				});
				k.xAxis = [];
				k.yAxis = [];
				k.pointCount = k.colorCounter = k.symbolCounter = 0;
				k.firstRender()
			},
			initSeries: function(b) {
				var c = this.options.chart; (c = E[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
				c = new c;
				c.init(this, b);
				return c
			},
			orderSeries: function(a) {
				var b = this.series;
				for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
			},
			isInsidePlot: function(a, b, c) {
				var d = c ? b: a;
				a = c ? a: b;
				return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
			},
			redraw: function(c) {
				var d = this.axes,
				f = this.series,
				e = this.pointer,
				h = this.legend,
				g = this.isDirtyLegend,
				l, p, w = this.hasCartesianSeries,
				m = this.isDirtyBox,
				G, H = this.renderer,
				E = H.isHidden(),
				r = [];
				this.setResponsive && this.setResponsive(!1);
				a.setAnimation(c, this);
				E && this.temporaryDisplay();
				this.layOutTitles();
				for (c = f.length; c--;) if (G = f[c], G.options.stacking && (l = !0, G.isDirty)) {
					p = !0;
					break
				}
				if (p) for (c = f.length; c--;) G = f[c],
				G.options.stacking && (G.isDirty = !0);
				n(f,
				function(a) {
					a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), g = !0);
					a.isDirtyData && b(a, "updatedData")
				});
				g && h.options.enabled && (h.render(), this.isDirtyLegend = !1);
				l && this.getStacks();
				w && n(d,
				function(a) {
					a.updateNames();
					a.setScale()
				});
				this.getMargins();
				w && (n(d,
				function(a) {
					a.isDirty && (m = !0)
				}), n(d,
				function(a) {
					var c = a.min + "," + a.max;
					a.extKey !== c && (a.extKey = c, r.push(function() {
						b(a, "afterSetExtremes", k(a.eventArgs, a.getExtremes()));
						delete a.eventArgs
					})); (m || l) && a.redraw()
				}));
				m && this.drawChartBox();
				b(this, "predraw");
				n(f,
				function(a) { (m || a.isDirty) && a.visible && a.redraw();
					a.isDirtyData = !1
				});
				e && e.reset(!0);
				H.draw();
				b(this, "redraw");
				b(this, "render");
				E && this.temporaryDisplay(!0);
				n(r,
				function(a) {
					a.call()
				})
			},
			get: function(a) {
				function b(b) {
					return b.id === a || b.options && b.options.id === a
				}
				var c, f = this.series,
				e;
				c = d(this.axes, b) || d(this.series, b);
				for (e = 0; ! c && e < f.length; e++) c = d(f[e].points || [], b);
				return c
			},
			getAxes: function() {
				var a = this,
				c = this.options,
				d = c.xAxis = p(c.xAxis || {}),
				c = c.yAxis = p(c.yAxis || {});
				b(this, "beforeGetAxes");
				n(d,
				function(a, b) {
					a.index = b;
					a.isX = !0
				});
				n(c,
				function(a, b) {
					a.index = b
				});
				d = d.concat(c);
				n(d,
				function(b) {
					new t(a, b)
				})
			},
			getSelectedPoints: function() {
				var a = [];
				n(this.series,
				function(b) {
					a = a.concat(c(b.data || [],
					function(a) {
						return a.selected
					}))
				});
				return a
			},
			getSelectedSeries: function() {
				return c(this.series,
				function(a) {
					return a.selected
				})
			},
			setTitle: function(a, b, c) {
				var d = this,
				f = d.options,
				e;
				e = f.title = D({
					style: {
						color: "#333333",
						fontSize: f.isStock ? "16px": "18px"
					}
				},
				f.title, a);
				f = f.subtitle = D({
					style: {
						color: "#666666"
					}
				},
				f.subtitle, b);
				n([["title", a, e], ["subtitle", b, f]],
				function(a, b) {
					var c = a[0],
					f = d[c],
					e = a[1];
					a = a[2];
					f && e && (d[c] = f = f.destroy());
					a && !f && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
						align: a.align,
						"class": "highcharts-" + c,
						zIndex: a.zIndex || 4
					}).add(), d[c].update = function(a) {
						d.setTitle(!b && a, b && a)
					},
					d[c].css(a.style))
				});
				d.layOutTitles(c)
			},
			layOutTitles: function(a) {
				var b = 0,
				c, d = this.renderer,
				f = this.spacingBox;
				n(["title", "subtitle"],
				function(a) {
					var c = this[a],
					e = this.options[a];
					a = "title" === a ? -3 : e.verticalAlign ? 0 : b + 2;
					var h;
					c && (h = e.style.fontSize, h = d.fontMetrics(h, c).b, c.css({
						width: (e.width || f.width + e.widthAdjust) + "px"
					}).align(k({
						y: a + h
					},
					e), !1, "spacingBox"), e.floating || e.verticalAlign || (b = Math.ceil(b + c.getBBox(e.useHTML).height)))
				},
				this);
				c = this.titleOffset !== b;
				this.titleOffset = b; ! this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && G(a, !0) && this.isDirtyBox && this.redraw())
			},
			getChartSize: function() {
				var b = this.options.chart,
				c = b.width,
				b = b.height,
				d = this.renderTo;
				h(c) || (this.containerWidth = a.getStyle(d, "width"));
				h(b) || (this.containerHeight = a.getStyle(d, "height"));
				this.chartWidth = Math.max(0, c || this.containerWidth || 600);
				this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight: 400))
			},
			temporaryDisplay: function(b) {
				var c = this.renderTo;
				if (b) for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle),
				c.hcOrigDetached && (g.body.removeChild(c), c.hcOrigDetached = !1),
				c = c.parentNode;
				else for (; c && c.style;) {
					g.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, g.body.appendChild(c));
					if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
						display: c.style.display,
						height: c.style.height,
						overflow: c.style.overflow
					},
					b = {
						display: "block",
						overflow: "hidden"
					},
					c !== this.renderTo && (b.height = 0),
					a.css(c, b),
					c.offsetWidth || c.style.setProperty("display", "block", "important");
					c = c.parentNode;
					if (c === g.body) break
				}
			},
			setClassName: function(a) {
				this.container.className = "highcharts-container " + (a || "")
			},
			getContainer: function() {
				var b, c = this.options,
				d = c.chart,
				f, h;
				b = this.renderTo;
				var p = a.uniqueKey(),
				w;
				b || (this.renderTo = b = d.renderTo);
				K(b) && (this.renderTo = b = g.getElementById(b));
				b || a.error(13, !0);
				f = H(e(b, "data-highcharts-chart"));
				l(f) && m[f] && m[f].hasRendered && m[f].destroy();
				e(b, "data-highcharts-chart", this.index);
				b.innerHTML = "";
				d.skipClone || b.offsetWidth || this.temporaryDisplay();
				this.getChartSize();
				f = this.chartWidth;
				h = this.chartHeight;
				w = k({
					position: "relative",
					overflow: "hidden",
					width: f + "px",
					height: h + "px",
					textAlign: "left",
					lineHeight: "normal",
					zIndex: 0,
					"-webkit-tap-highlight-color": "rgba(0,0,0,0)"
				},
				d.style);
				this.container = b = u("div", {
					id: p
				},
				w, b);
				this._cursor = b.style.cursor;
				this.renderer = new(a[d.renderer] || a.Renderer)(b, f, h, null, d.forExport, c.exporting && c.exporting.allowHTML);
				this.setClassName(d.className);
				this.renderer.setStyle(d.style);
				this.renderer.chartIndex = this.index
			},
			getMargins: function(a) {
				var b = this.spacing,
				c = this.margin,
				d = this.titleOffset;
				this.resetMargins();
				d && !h(c[0]) && (this.plotTop = Math.max(this.plotTop, d + this.options.title.margin + b[0]));
				this.legend && this.legend.display && this.legend.adjustMargins(c, b);
				this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
				this.adjustPlotArea && this.adjustPlotArea();
				a || this.getAxisMargins()
			},
			getAxisMargins: function() {
				var a = this,
				b = a.axisOffset = [0, 0, 0, 0],
				c = a.margin;
				a.hasCartesianSeries && n(a.axes,
				function(a) {
					a.visible && a.getOffset()
				});
				n(L,
				function(d, f) {
					h(c[f]) || (a[d] += b[f])
				});
				a.setChartSize()
			},
			reflow: function(b) {
				var c = this,
				d = c.options.chart,
				f = c.renderTo,
				e = h(d.width) && h(d.height),
				k = d.width || a.getStyle(f, "width"),
				d = d.height || a.getStyle(f, "height"),
				f = b ? b.target: O;
				if (!e && !c.isPrinting && k && d && (f === O || f === g)) {
					if (k !== c.containerWidth || d !== c.containerHeight) clearTimeout(c.reflowTimeout),
					c.reflowTimeout = F(function() {
						c.container && c.setSize(void 0, void 0, !1)
					},
					b ? 100 : 0);
					c.containerWidth = k;
					c.containerHeight = d
				}
			},
			initReflow: function() {
				var a = this,
				b;
				b = z(O, "resize",
				function(b) {
					a.reflow(b)
				});
				z(a, "destroy", b)
			},
			setSize: function(c, d, e) {
				var h = this,
				k = h.renderer;
				h.isResizing += 1;
				a.setAnimation(e, h);
				h.oldChartHeight = h.chartHeight;
				h.oldChartWidth = h.chartWidth;
				void 0 !== c && (h.options.chart.width = c);
				void 0 !== d && (h.options.chart.height = d);
				h.getChartSize();
				c = k.globalAnimation; (c ? B: f)(h.container, {
					width: h.chartWidth + "px",
					height: h.chartHeight + "px"
				},
				c);
				h.setChartSize(!0);
				k.setSize(h.chartWidth, h.chartHeight, e);
				n(h.axes,
				function(a) {
					a.isDirty = !0;
					a.setScale()
				});
				h.isDirtyLegend = !0;
				h.isDirtyBox = !0;
				h.layOutTitles();
				h.getMargins();
				h.redraw(e);
				h.oldChartHeight = null;
				b(h, "resize");
				F(function() {
					h && b(h, "endResize", null,
					function() {--h.isResizing
					})
				},
				y(c).duration)
			},
			setChartSize: function(a) {
				var b = this.inverted,
				c = this.renderer,
				d = this.chartWidth,
				f = this.chartHeight,
				e = this.options.chart,
				h = this.spacing,
				k = this.clipOffset,
				g, l, p, w;
				this.plotLeft = g = Math.round(this.plotLeft);
				this.plotTop = l = Math.round(this.plotTop);
				this.plotWidth = p = Math.max(0, Math.round(d - g - this.marginRight));
				this.plotHeight = w = Math.max(0, Math.round(f - l - this.marginBottom));
				this.plotSizeX = b ? w: p;
				this.plotSizeY = b ? p: w;
				this.plotBorderWidth = e.plotBorderWidth || 0;
				this.spacingBox = c.spacingBox = {
					x: h[3],
					y: h[0],
					width: d - h[3] - h[1],
					height: f - h[0] - h[2]
				};
				this.plotBox = c.plotBox = {
					x: g,
					y: l,
					width: p,
					height: w
				};
				d = 2 * Math.floor(this.plotBorderWidth / 2);
				b = Math.ceil(Math.max(d, k[3]) / 2);
				c = Math.ceil(Math.max(d, k[0]) / 2);
				this.clipBox = {
					x: b,
					y: c,
					width: Math.floor(this.plotSizeX - Math.max(d, k[1]) / 2 - b),
					height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, k[2]) / 2 - c))
				};
				a || n(this.axes,
				function(a) {
					a.setAxisSize();
					a.setAxisTranslation()
				})
			},
			resetMargins: function() {
				var a = this,
				b = a.options.chart;
				n(["margin", "spacing"],
				function(c) {
					var d = b[c],
					f = C(d) ? d: [d, d, d, d];
					n(["Top", "Right", "Bottom", "Left"],
					function(d, e) {
						a[c][e] = G(b[c + d], f[e])
					})
				});
				n(L,
				function(b, c) {
					a[b] = G(a.margin[c], a.spacing[c])
				});
				a.axisOffset = [0, 0, 0, 0];
				a.clipOffset = [0, 0, 0, 0]
			},
			drawChartBox: function() {
				var a = this.options.chart,
				c = this.renderer,
				d = this.chartWidth,
				f = this.chartHeight,
				e = this.chartBackground,
				h = this.plotBackground,
				k = this.plotBorder,
				g, l = this.plotBGImage,
				p = a.backgroundColor,
				w = a.plotBackgroundColor,
				m = a.plotBackgroundImage,
				G, n = this.plotLeft,
				H = this.plotTop,
				E = this.plotWidth,
				r = this.plotHeight,
				x = this.plotBox,
				v = this.clipRect,
				I = this.clipBox,
				D = "animate";
				e || (this.chartBackground = e = c.rect().addClass("highcharts-background").add(), D = "attr");
				g = a.borderWidth || 0;
				G = g + (a.shadow ? 8 : 0);
				p = {
					fill: p || "none"
				};
				if (g || e["stroke-width"]) p.stroke = a.borderColor,
				p["stroke-width"] = g;
				e.attr(p).shadow(a.shadow);
				e[D]({
					x: G / 2,
					y: G / 2,
					width: d - G - g % 2,
					height: f - G - g % 2,
					r: a.borderRadius
				});
				D = "animate";
				h || (D = "attr", this.plotBackground = h = c.rect().addClass("highcharts-plot-background").add());
				h[D](x);
				h.attr({
					fill: w || "none"
				}).shadow(a.plotShadow);
				m && (l ? l.animate(x) : this.plotBGImage = c.image(m, n, H, E, r).add());
				v ? v.animate({
					width: I.width,
					height: I.height
				}) : this.clipRect = c.clipRect(I);
				D = "animate";
				k || (D = "attr", this.plotBorder = k = c.rect().addClass("highcharts-plot-border").attr({
					zIndex: 1
				}).add());
				k.attr({
					stroke: a.plotBorderColor,
					"stroke-width": a.plotBorderWidth || 0,
					fill: "none"
				});
				k[D](k.crisp({
					x: n,
					y: H,
					width: E,
					height: r
				},
				-k.strokeWidth()));
				this.isDirtyBox = !1;
				b(this, "afterDrawChartBox")
			},
			propFromSeries: function() {
				var a = this,
				b = a.options.chart,
				c, d = a.options.series,
				f, e;
				n(["inverted", "angular", "polar"],
				function(h) {
					c = E[b.type || b.defaultSeriesType];
					e = b[h] || c && c.prototype[h];
					for (f = d && d.length; ! e && f--;)(c = E[d[f].type]) && c.prototype[h] && (e = !0);
					a[h] = e
				})
			},
			linkSeries: function() {
				var a = this,
				b = a.series;
				n(b,
				function(a) {
					a.linkedSeries.length = 0
				});
				n(b,
				function(b) {
					var c = b.options.linkedTo;
					K(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = G(b.options.visible, c.options.visible, b.visible))
				})
			},
			renderSeries: function() {
				n(this.series,
				function(a) {
					a.translate();
					a.render()
				})
			},
			renderLabels: function() {
				var a = this,
				b = a.options.labels;
				b.items && n(b.items,
				function(c) {
					var d = k(b.style, c.style),
					f = H(d.left) + a.plotLeft,
					e = H(d.top) + a.plotTop + 12;
					delete d.left;
					delete d.top;
					a.renderer.text(c.html, f, e).attr({
						zIndex: 2
					}).css(d).add()
				})
			},
			render: function() {
				var a = this.axes,
				b = this.renderer,
				c = this.options,
				d, f, e;
				this.setTitle();
				this.legend = new x(this, c.legend);
				this.getStacks && this.getStacks();
				this.getMargins(!0);
				this.setChartSize();
				c = this.plotWidth;
				d = this.plotHeight = Math.max(this.plotHeight - 21, 0);
				n(a,
				function(a) {
					a.setScale()
				});
				this.getAxisMargins();
				f = 1.1 < c / this.plotWidth;
				e = 1.05 < d / this.plotHeight;
				if (f || e) n(a,
				function(a) { (a.horiz && f || !a.horiz && e) && a.setTickInterval(!0)
				}),
				this.getMargins();
				this.drawChartBox();
				this.hasCartesianSeries && n(a,
				function(a) {
					a.visible && a.render()
				});
				this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
					zIndex: 3
				}).add());
				this.renderSeries();
				this.renderLabels();
				this.addCredits();
				this.setResponsive && this.setResponsive();
				this.hasRendered = !0
			},
			// addCredits: function(a) {
			// 	var b = this;
			// 	a = D(!0, this.options.credits, a);
			// 	//a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click",
			// 	function() {
			// 		a.href && (O.location.href = a.href)
			// 	}).attr({
			// 		align: a.position.align,
			// 		zIndex: 8
			// 	}).css(a.style).add().align(a.position), this.credits.update = function(a) {
			// 		b.credits = b.credits.destroy();
			// 		b.addCredits(a)
			// 	})
			// },
			destroy: function() {
				var c = this,
				d = c.axes,
				f = c.series,
				e = c.container,
				h, k = e && e.parentNode;
				b(c, "destroy");
				c.renderer.forExport ? a.erase(m, c) : m[c.index] = void 0;
				a.chartCount--;
				c.renderTo.removeAttribute("data-highcharts-chart");
				I(c);
				for (h = d.length; h--;) d[h] = d[h].destroy();
				this.scroller && this.scroller.destroy && this.scroller.destroy();
				for (h = f.length; h--;) f[h] = f[h].destroy();
				n("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "),
				function(a) {
					var b = c[a];
					b && b.destroy && (c[a] = b.destroy())
				});
				e && (e.innerHTML = "", I(e), k && r(e));
				v(c,
				function(a, b) {
					delete c[b]
				})
			},
			firstRender: function() {
				var a = this,
				c = a.options;
				if (!a.isReadyToRender || a.isReadyToRender()) {
					a.getContainer();
					b(a, "init");
					a.resetMargins();
					a.setChartSize();
					a.propFromSeries();
					a.getAxes();
					n(c.series || [],
					function(b) {
						a.initSeries(b)
					});
					a.linkSeries();
					b(a, "beforeRender");
					w && (a.pointer = new w(a, c));
					a.render();
					if (!a.renderer.imgCount && a.onload) a.onload();
					a.temporaryDisplay(!0)
				}
			},
			onload: function() {
				n([this.callback].concat(this.callbacks),
				function(a) {
					a && void 0 !== this.index && a.apply(this, [this])
				},
				this);
				b(this, "load");
				b(this, "render");
				h(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
				this.onload = null
			}
		})
	})(J); (function(a) {
		var z, B = a.each,
		y = a.extend,
		e = a.erase,
		g = a.fireEvent,
		t = a.format,
		u = a.isArray,
		q = a.isNumber,
		r = a.pick,
		m = a.removeEvent;
		a.Point = z = function() {};
		a.Point.prototype = {
			init: function(a, e, m) {
				this.series = a;
				this.color = a.color;
				this.applyOptions(e, m);
				a.options.colorByPoint ? (e = a.options.colors || a.chart.options.colors, this.color = this.color || e[a.colorCounter], e = e.length, m = a.colorCounter, a.colorCounter++, a.colorCounter === e && (a.colorCounter = 0)) : m = a.colorIndex;
				this.colorIndex = r(this.colorIndex, m);
				a.chart.pointCount++;
				g(this, "afterInit");
				return this
			},
			applyOptions: function(a, e) {
				var f = this.series,
				h = f.options.pointValKey || f.pointValKey;
				a = z.prototype.optionsToObject.call(this, a);
				y(this, a);
				this.options = this.options ? y(this.options, a) : a;
				a.group && delete this.group;
				h && (this.y = this[h]);
				this.isNull = r(this.isValid && !this.isValid(), null === this.x || !q(this.y, !0));
				this.selected && (this.state = "select");
				"name" in this && void 0 === e && f.xAxis && f.xAxis.hasNames && (this.x = f.xAxis.nameToX(this));
				void 0 === this.x && f && (this.x = void 0 === e ? f.autoIncrement(this) : e);
				return this
			},
			optionsToObject: function(a) {
				var f = {},
				e = this.series,
				k = e.options.keys,
				d = k || e.pointArrayMap || ["y"],
				b = d.length,
				c = 0,
				g = 0;
				if (q(a) || null === a) f[d[0]] = a;
				else if (u(a)) for (!k && a.length > b && (e = typeof a[0], "string" === e ? f.name = a[0] : "number" === e && (f.x = a[0]), c++); g < b;) k && void 0 === a[c] || (f[d[g]] = a[c]),
				c++,
				g++;
				else "object" === typeof a && (f = a, a.dataLabels && (e._hasPointLabels = !0), a.marker && (e._hasPointMarkers = !0));
				return f
			},
			getClassName: function() {
				return "highcharts-point" + (this.selected ? " highcharts-point-select": "") + (this.negative ? " highcharts-negative": "") + (this.isNull ? " highcharts-null-point": "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex: "") + (this.options.className ? " " + this.options.className: "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
			},
			getZone: function() {
				var a = this.series,
				e = a.zones,
				a = a.zoneAxis || "y",
				g = 0,
				k;
				for (k = e[g]; this[a] >= k.value;) k = e[++g];
				k && k.color && !this.options.color && (this.color = k.color);
				return k
			},
			destroy: function() {
				var a = this.series.chart,
				h = a.hoverPoints,
				g;
				a.pointCount--;
				h && (this.setState(), e(h, this), h.length || (a.hoverPoints = null));
				if (this === a.hoverPoint) this.onMouseOut();
				if (this.graphic || this.dataLabel) m(this),
				this.destroyElements();
				this.legendItem && a.legend.destroyItem(this);
				for (g in this) this[g] = null
			},
			destroyElements: function() {
				for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], e, g = 6; g--;) e = a[g],
				this[e] && (this[e] = this[e].destroy())
			},
			getLabelConfig: function() {
				return {
					x: this.category,
					y: this.y,
					color: this.color,
					colorIndex: this.colorIndex,
					key: this.name || this.category,
					series: this.series,
					point: this,
					percentage: this.percentage,
					total: this.total || this.stackTotal
				}
			},
			tooltipFormatter: function(a) {
				var f = this.series,
				e = f.tooltipOptions,
				k = r(e.valueDecimals, ""),
				d = e.valuePrefix || "",
				b = e.valueSuffix || "";
				B(f.pointArrayMap || ["y"],
				function(c) {
					c = "{point." + c;
					if (d || b) a = a.replace(c + "}", d + c + "}" + b);
					a = a.replace(c + "}", c + ":,." + k + "f}")
				});
				return t(a, {
					point: this,
					series: this.series
				},
				f.chart.time)
			},
			firePointEvent: function(a, e, m) {
				var f = this,
				d = this.series.options; (d.point.events[a] || f.options && f.options.events && f.options.events[a]) && this.importEvents();
				"click" === a && d.allowPointSelect && (m = function(a) {
					f.select && f.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
				});
				g(this, a, e, m)
			},
			visible: !0
		}
	})(J); (function(a) {
		var z = a.addEvent,
		B = a.animObject,
		y = a.arrayMax,
		e = a.arrayMin,
		g = a.correctFloat,
		t = a.defaultOptions,
		u = a.defaultPlotOptions,
		q = a.defined,
		r = a.each,
		m = a.erase,
		f = a.extend,
		h = a.fireEvent,
		n = a.grep,
		k = a.isArray,
		d = a.isNumber,
		b = a.isString,
		c = a.merge,
		l = a.objectEach,
		C = a.pick,
		K = a.removeEvent,
		x = a.splat,
		L = a.SVGElement,
		D = a.syncTimeout,
		v = a.win;
		a.Series = a.seriesType("line", null, {
			lineWidth: 2,
			allowPointSelect: !1,
			showCheckbox: !1,
			animation: {
				duration: 1E3
			},
			events: {},
			marker: {
				lineWidth: 0,
				lineColor: "#ffffff",
				enabledThreshold: 2,
				radius: 4,
				states: {
					normal: {
						animation: !0
					},
					hover: {
						animation: {
							duration: 50
						},
						enabled: !0,
						radiusPlus: 2,
						lineWidthPlus: 1
					},
					select: {
						fillColor: "#cccccc",
						lineColor: "#000000",
						lineWidth: 2
					}
				}
			},
			point: {
				events: {}
			},
			dataLabels: {
				align: "center",
				formatter: function() {
					return null === this.y ? "": a.numberFormat(this.y, -1)
				},
				style: {
					fontSize: "11px",
					fontWeight: "bold",
					color: "contrast",
					textOutline: "1px contrast"
				},
				verticalAlign: "bottom",
				x: 0,
				y: 0,
				padding: 5
			},
			cropThreshold: 300,
			pointRange: 0,
			softThreshold: !0,
			states: {
				normal: {
					animation: !0
				},
				hover: {
					animation: {
						duration: 50
					},
					lineWidthPlus: 1,
					marker: {},
					halo: {
						size: 10,
						opacity: .25
					}
				},
				select: {
					marker: {}
				}
			},
			stickyTracking: !0,
			turboThreshold: 1E3,
			findNearestPointBy: "x"
		},
		{
			isCartesian: !0,
			pointClass: a.Point,
			sorted: !0,
			requireSorting: !0,
			directTouch: !1,
			axisTypes: ["xAxis", "yAxis"],
			colorCounter: 0,
			parallelArrays: ["x", "y"],
			coll: "series",
			init: function(a, b) {
				var c = this,
				d, e = a.series,
				h;
				c.chart = a;
				c.options = b = c.setOptions(b);
				c.linkedSeries = [];
				c.bindAxes();
				f(c, {
					name: b.name,
					state: "",
					visible: !1 !== b.visible,
					selected: !0 === b.selected
				});
				d = b.events;
				l(d,
				function(a, b) {
					z(c, b, a)
				});
				if (d && d.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
				c.getColor();
				c.getSymbol();
				r(c.parallelArrays,
				function(a) {
					c[a + "Data"] = []
				});
				c.setData(b.data, !1);
				c.isCartesian && (a.hasCartesianSeries = !0);
				e.length && (h = e[e.length - 1]);
				c._i = C(h && h._i, -1) + 1;
				a.orderSeries(this.insert(e))
			},
			insert: function(a) {
				var b = this.options.index,
				c;
				if (d(b)) {
					for (c = a.length; c--;) if (b >= C(a[c].options.index, a[c]._i)) {
						a.splice(c + 1, 0, this);
						break
					} - 1 === c && a.unshift(this);
					c += 1
				} else a.push(this);
				return C(c, a.length - 1)
			},
			bindAxes: function() {
				var b = this,
				c = b.options,
				d = b.chart,
				f;
				r(b.axisTypes || [],
				function(e) {
					r(d[e],
					function(a) {
						f = a.options;
						if (c[e] === f.index || void 0 !== c[e] && c[e] === f.id || void 0 === c[e] && 0 === f.index) b.insert(a.series),
						b[e] = a,
						a.isDirty = !0
					});
					b[e] || b.optionalAxis === e || a.error(18, !0)
				})
			},
			updateParallelArrays: function(a, b) {
				var c = a.series,
				f = arguments,
				e = d(b) ?
				function(d) {
					var f = "y" === d && c.toYData ? c.toYData(a) : a[d];
					c[d + "Data"][b] = f
				}: function(a) {
					Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(f, 2))
				};
				r(c.parallelArrays, e)
			},
			autoIncrement: function() {
				var a = this.options,
				b = this.xIncrement,
				c, d = a.pointIntervalUnit,
				f = this.chart.time,
				b = C(b, a.pointStart, 0);
				this.pointInterval = c = C(this.pointInterval, a.pointInterval, 1);
				d && (a = new f.Date(b), "day" === d ? f.set("Date", a, f.get("Date", a) + c) : "month" === d ? f.set("Month", a, f.get("Month", a) + c) : "year" === d && f.set("FullYear", a, f.get("FullYear", a) + c), c = a.getTime() - b);
				this.xIncrement = b + c;
				return b
			},
			setOptions: function(a) {
				var b = this.chart,
				d = b.options,
				f = d.plotOptions,
				e = (b.userOptions || {}).plotOptions || {},
				h = f[this.type];
				this.userOptions = a;
				b = c(h, f.series, a);
				this.tooltipOptions = c(t.tooltip, t.plotOptions.series && t.plotOptions.series.tooltip, t.plotOptions[this.type].tooltip, d.tooltip.userOptions, f.series && f.series.tooltip, f[this.type].tooltip, a.tooltip);
				this.stickyTracking = C(a.stickyTracking, e[this.type] && e[this.type].stickyTracking, e.series && e.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
				null === h.marker && delete b.marker;
				this.zoneAxis = b.zoneAxis;
				a = this.zones = (b.zones || []).slice(); ! b.negativeColor && !b.negativeFillColor || b.zones || a.push({
					value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
					className: "highcharts-negative",
					color: b.negativeColor,
					fillColor: b.negativeFillColor
				});
				a.length && q(a[a.length - 1].value) && a.push({
					color: this.color,
					fillColor: this.fillColor
				});
				return b
			},
			getName: function() {
				return this.name || "Series " + (this.index + 1)
			},
			getCyclic: function(a, b, c) {
				var d, f = this.chart,
				e = this.userOptions,
				h = a + "Index",
				k = a + "Counter",
				g = c ? c.length: C(f.options.chart[a + "Count"], f[a + "Count"]);
				b || (d = C(e[h], e["_" + h]), q(d) || (f.series.length || (f[k] = 0), e["_" + h] = d = f[k] % g, f[k] += 1), c && (b = c[d]));
				void 0 !== d && (this[h] = d);
				this[a] = b
			},
			getColor: function() {
				this.options.colorByPoint ? this.options.color = null: this.getCyclic("color", this.options.color || u[this.type].color, this.chart.options.colors)
			},
			getSymbol: function() {
				this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
			},
			drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
			setData: function(c, f, e, h) {
				var g = this,
				l = g.points,
				m = l && l.length || 0,
				w, n = g.options,
				G = g.chart,
				x = null,
				v = g.xAxis,
				H = n.turboThreshold,
				D = this.xData,
				q = this.yData,
				I = (w = g.pointArrayMap) && w.length;
				c = c || [];
				w = c.length;
				f = C(f, !0);
				if (!1 !== h && w && m === w && !g.cropped && !g.hasGroupedData && g.visible) r(c,
				function(a, b) {
					l[b].update && a !== n.data[b] && l[b].update(a, !1, null, !1)
				});
				else {
					g.xIncrement = null;
					g.colorCounter = 0;
					r(this.parallelArrays,
					function(a) {
						g[a + "Data"].length = 0
					});
					if (H && w > H) {
						for (e = 0; null === x && e < w;) x = c[e],
						e++;
						if (d(x)) for (e = 0; e < w; e++) D[e] = this.autoIncrement(),
						q[e] = c[e];
						else if (k(x)) if (I) for (e = 0; e < w; e++) x = c[e],
						D[e] = x[0],
						q[e] = x.slice(1, I + 1);
						else for (e = 0; e < w; e++) x = c[e],
						D[e] = x[0],
						q[e] = x[1];
						else a.error(12)
					} else for (e = 0; e < w; e++) void 0 !== c[e] && (x = {
						series: g
					},
					g.pointClass.prototype.applyOptions.apply(x, [c[e]]), g.updateParallelArrays(x, e));
					q && b(q[0]) && a.error(14, !0);
					g.data = [];
					g.options.data = g.userOptions.data = c;
					for (e = m; e--;) l[e] && l[e].destroy && l[e].destroy();
					v && (v.minRange = v.userMinRange);
					g.isDirty = G.isDirtyBox = !0;
					g.isDirtyData = !!l;
					e = !1
				}
				"point" === n.legendType && (this.processData(), this.generatePoints());
				f && G.redraw(e)
			},
			processData: function(b) {
				var c = this.xData,
				d = this.yData,
				f = c.length,
				e;
				e = 0;
				var h, k, g = this.xAxis,
				l, m = this.options;
				l = m.cropThreshold;
				var w = this.getExtremesFromAll || m.getExtremesFromAll,
				n = this.isCartesian,
				m = g && g.val2lin,
				x = g && g.isLog,
				r = this.requireSorting,
				v, D;
				if (n && !this.isDirty && !g.isDirty && !this.yAxis.isDirty && !b) return ! 1;
				g && (b = g.getExtremes(), v = b.min, D = b.max);
				if (n && this.sorted && !w && (!l || f > l || this.forceCrop)) if (c[f - 1] < v || c[0] > D) c = [],
				d = [];
				else if (c[0] < v || c[f - 1] > D) e = this.cropData(this.xData, this.yData, v, D),
				c = e.xData,
				d = e.yData,
				e = e.start,
				h = !0;
				for (l = c.length || 1; --l;) f = x ? m(c[l]) - m(c[l - 1]) : c[l] - c[l - 1],
				0 < f && (void 0 === k || f < k) ? k = f: 0 > f && r && (a.error(15), r = !1);
				this.cropped = h;
				this.cropStart = e;
				this.processedXData = c;
				this.processedYData = d;
				this.closestPointRange = k
			},
			cropData: function(a, b, c, d) {
				var f = a.length,
				e = 0,
				h = f,
				k = C(this.cropShoulder, 1),
				g;
				for (g = 0; g < f; g++) if (a[g] >= c) {
					e = Math.max(0, g - k);
					break
				}
				for (c = g; c < f; c++) if (a[c] > d) {
					h = c + k;
					break
				}
				return {
					xData: a.slice(e, h),
					yData: b.slice(e, h),
					start: e,
					end: h
				}
			},
			generatePoints: function() {
				var a = this.options,
				b = a.data,
				c = this.data,
				d, f = this.processedXData,
				e = this.processedYData,
				h = this.pointClass,
				k = f.length,
				g = this.cropStart || 0,
				l, m = this.hasGroupedData,
				a = a.keys,
				n, r = [],
				v;
				c || m || (c = [], c.length = b.length, c = this.data = c);
				a && m && (this.options.keys = !1);
				for (v = 0; v < k; v++) l = g + v,
				m ? (n = (new h).init(this, [f[v]].concat(x(e[v]))), n.dataGroup = this.groupMap[v]) : (n = c[l]) || void 0 === b[l] || (c[l] = n = (new h).init(this, b[l], f[v])),
				n && (n.index = l, r[v] = n);
				this.options.keys = a;
				if (c && (k !== (d = c.length) || m)) for (v = 0; v < d; v++) v !== g || m || (v += k),
				c[v] && (c[v].destroyElements(), c[v].plotX = void 0);
				this.data = c;
				this.points = r
			},
			getExtremes: function(a) {
				var b = this.yAxis,
				c = this.processedXData,
				f, h = [],
				g = 0;
				f = this.xAxis.getExtremes();
				var l = f.min,
				m = f.max,
				w, n, v, x;
				a = a || this.stackedYData || this.processedYData || [];
				f = a.length;
				for (x = 0; x < f; x++) if (n = c[x], v = a[x], w = (d(v, !0) || k(v)) && (!b.positiveValuesOnly || v.length || 0 < v), n = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[x + 1] || n) >= l && (c[x - 1] || n) <= m, w && n) if (w = v.length) for (; w--;)"number" === typeof v[w] && (h[g++] = v[w]);
				else h[g++] = v;
				this.dataMin = e(h);
				this.dataMax = y(h)
			},
			translate: function() {
				this.processedXData || this.processData();
				this.generatePoints();
				var a = this.options,
				b = a.stacking,
				c = this.xAxis,
				f = c.categories,
				e = this.yAxis,
				k = this.points,
				l = k.length,
				m = !!this.modifyValue,
				n = a.pointPlacement,
				v = "between" === n || d(n),
				x = a.threshold,
				r = a.startFromThreshold ? x: 0,
				D,
				t,
				u,
				L,
				K = Number.MAX_VALUE;
				"between" === n && (n = .5);
				d(n) && (n *= C(a.pointRange || c.pointRange));
				for (a = 0; a < l; a++) {
					var y = k[a],
					z = y.x,
					B = y.y;
					t = y.low;
					var J = b && e.stacks[(this.negStacks && B < (r ? 0 : x) ? "-": "") + this.stackKey],
					U;
					e.positiveValuesOnly && null !== B && 0 >= B && (y.isNull = !0);
					y.plotX = D = g(Math.min(Math.max( - 1E5, c.translate(z, 0, 0, 0, 1, n, "flags" === this.type)), 1E5));
					b && this.visible && !y.isNull && J && J[z] && (L = this.getStackIndicator(L, z, this.index), U = J[z], B = U.points[L.key], t = B[0], B = B[1], t === r && L.key === J[z].base && (t = C(x, e.min)), e.positiveValuesOnly && 0 >= t && (t = null), y.total = y.stackTotal = U.total, y.percentage = U.total && y.y / U.total * 100, y.stackY = B, U.setOffset(this.pointXOffset || 0, this.barW || 0));
					y.yBottom = q(t) ? Math.min(Math.max( - 1E5, e.translate(t, 0, 1, 0, 1)), 1E5) : null;
					m && (B = this.modifyValue(B, y));
					y.plotY = t = "number" === typeof B && Infinity !== B ? Math.min(Math.max( - 1E5, e.translate(B, 0, 1, 0, 1)), 1E5) : void 0;
					y.isInside = void 0 !== t && 0 <= t && t <= e.len && 0 <= D && D <= c.len;
					y.clientX = v ? g(c.translate(z, 0, 0, 0, 1, n)) : D;
					y.negative = y.y < (x || 0);
					y.category = f && void 0 !== f[y.x] ? f[y.x] : y.x;
					y.isNull || (void 0 !== u && (K = Math.min(K, Math.abs(D - u))), u = D);
					y.zone = this.zones.length && y.getZone()
				}
				this.closestPointRangePx = K;
				h(this, "afterTranslate")
			},
			getValidPoints: function(a, b) {
				var c = this.chart;
				return n(a || this.points || [],
				function(a) {
					return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
				})
			},
			setClip: function(a) {
				var b = this.chart,
				c = this.options,
				d = b.renderer,
				f = b.inverted,
				e = this.clipBox,
				h = e || b.clipBox,
				k = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, h.height, c.xAxis, c.yAxis].join(),
				g = b[k],
				l = b[k + "m"];
				g || (a && (h.width = 0, f && (h.x = b.plotSizeX), b[k + "m"] = l = d.clipRect(f ? b.plotSizeX + 99 : -99, f ? -b.plotLeft: -b.plotTop, 99, f ? b.chartWidth: b.chartHeight)), b[k] = g = d.clipRect(h), g.count = {
					length: 0
				});
				a && !g.count[this.index] && (g.count[this.index] = !0, g.count.length += 1); ! 1 !== c.clip && (this.group.clip(a || e ? g: b.clipRect), this.markerGroup.clip(l), this.sharedClipKey = k);
				a || (g.count[this.index] && (delete g.count[this.index], --g.count.length), 0 === g.count.length && k && b[k] && (e || (b[k] = b[k].destroy()), b[k + "m"] && (b[k + "m"] = b[k + "m"].destroy())))
			},
			animate: function(a) {
				var b = this.chart,
				c = B(this.options.animation),
				d;
				a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
					width: b.plotSizeX,
					x: 0
				},
				c), b[d + "m"] && b[d + "m"].animate({
					width: b.plotSizeX + 99,
					x: 0
				},
				c), this.animate = null)
			},
			afterAnimate: function() {
				this.setClip();
				h(this, "afterAnimate");
				this.finishedAnimating = !0
			},
			drawPoints: function() {
				var a = this.points,
				b = this.chart,
				c, d, f, e, h = this.options.marker,
				k, g, l, m = this[this.specialGroup] || this.markerGroup,
				n,
				v = C(h.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= h.enabledThreshold * h.radius);
				if (!1 !== h.enabled || this._hasPointMarkers) for (c = 0; c < a.length; c++) d = a[c],
				e = d.graphic,
				k = d.marker || {},
				g = !!d.marker,
				f = v && void 0 === k.enabled || k.enabled,
				l = d.isInside,
				f && !d.isNull ? (f = C(k.symbol, this.symbol), n = this.markerAttribs(d, d.selected && "select"), e ? e[l ? "show": "hide"](!0).animate(n) : l && (0 < n.width || d.hasImage) && (d.graphic = e = b.renderer.symbol(f, n.x, n.y, n.width, n.height, g ? k: h).add(m)), e && e.attr(this.pointAttribs(d, d.selected && "select")), e && e.addClass(d.getClassName(), !0)) : e && (d.graphic = e.destroy())
			},
			markerAttribs: function(a, b) {
				var c = this.options.marker,
				d = a.marker || {},
				f = d.symbol || c.symbol,
				e = C(d.radius, c.radius);
				b && (c = c.states[b], b = d.states && d.states[b], e = C(b && b.radius, c && c.radius, e + (c && c.radiusPlus || 0)));
				a.hasImage = f && 0 === f.indexOf("url");
				a.hasImage && (e = 0);
				a = {
					x: Math.floor(a.plotX) - e,
					y: a.plotY - e
				};
				e && (a.width = a.height = 2 * e);
				return a
			},
			pointAttribs: function(a, b) {
				var c = this.options.marker,
				d = a && a.options,
				f = d && d.marker || {},
				e = this.color,
				h = d && d.color,
				k = a && a.color,
				d = C(f.lineWidth, c.lineWidth);
				a = a && a.zone && a.zone.color;
				e = h || a || k || e;
				a = f.fillColor || c.fillColor || e;
				e = f.lineColor || c.lineColor || e;
				b && (c = c.states[b], b = f.states && f.states[b] || {},
				d = C(b.lineWidth, c.lineWidth, d + C(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, e = b.lineColor || c.lineColor || e);
				return {
					stroke: e,
					"stroke-width": d,
					fill: a
				}
			},
			destroy: function() {
				var a = this,
				b = a.chart,
				c = /AppleWebKit\/533/.test(v.navigator.userAgent),
				d,
				f,
				e = a.data || [],
				k,
				g;
				h(a, "destroy");
				K(a);
				r(a.axisTypes || [],
				function(b) { (g = a[b]) && g.series && (m(g.series, a), g.isDirty = g.forceRedraw = !0)
				});
				a.legendItem && a.chart.legend.destroyItem(a);
				for (f = e.length; f--;)(k = e[f]) && k.destroy && k.destroy();
				a.points = null;
				clearTimeout(a.animationTimeout);
				l(a,
				function(a, b) {
					a instanceof L && !a.survive && (d = c && "group" === b ? "hide": "destroy", a[d]())
				});
				b.hoverSeries === a && (b.hoverSeries = null);
				m(b.series, a);
				b.orderSeries();
				l(a,
				function(b, c) {
					delete a[c]
				})
			},
			getGraphPath: function(a, b, c) {
				var d = this,
				f = d.options,
				e = f.step,
				h, k = [],
				g = [],
				l;
				a = a || d.points; (h = a.reversed) && a.reverse(); (e = {
					right: 1,
					center: 2
				} [e] || e && 3) && h && (e = 4 - e); ! f.connectNulls || b || c || (a = this.getValidPoints(a));
				r(a,
				function(h, p) {
					var m = h.plotX,
					n = h.plotY,
					w = a[p - 1]; (h.leftCliff || w && w.rightCliff) && !c && (l = !0);
					h.isNull && !q(b) && 0 < p ? l = !f.connectNulls: h.isNull && !b ? l = !0 : (0 === p || l ? p = ["M", h.plotX, h.plotY] : d.getPointSpline ? p = d.getPointSpline(a, h, p) : e ? (p = 1 === e ? ["L", w.plotX, n] : 2 === e ? ["L", (w.plotX + m) / 2, w.plotY, "L", (w.plotX + m) / 2, n] : ["L", m, w.plotY], p.push("L", m, n)) : p = ["L", m, n], g.push(h.x), e && g.push(h.x), k.push.apply(k, p), l = !1)
				});
				k.xMap = g;
				return d.graphPath = k
			},
			drawGraph: function() {
				var a = this,
				b = this.options,
				c = (this.gappedPath || this.getGraphPath).call(this),
				d = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]];
				r(this.zones,
				function(c, f) {
					d.push(["zone-graph-" + f, "highcharts-graph highcharts-zone-graph-" + f + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle])
				});
				r(d,
				function(d, f) {
					var e = d[0],
					h = a[e];
					h ? (h.endX = a.preventGraphAnimation ? null: c.xMap, h.animate({
						d: c
					})) : c.length && (a[e] = a.chart.renderer.path(c).addClass(d[1]).attr({
						zIndex: 1
					}).add(a.group), h = {
						stroke: d[2],
						"stroke-width": b.lineWidth,
						fill: a.fillGraph && a.color || "none"
					},
					d[3] ? h.dashstyle = d[3] : "square" !== b.linecap && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), h = a[e].attr(h).shadow(2 > f && b.shadow));
					h && (h.startX = c.xMap, h.isArea = c.isArea)
				})
			},
			applyZones: function() {
				var a = this,
				b = this.chart,
				c = b.renderer,
				d = this.zones,
				f, e, h = this.clips || [],
				k,
				g = this.graph,
				l = this.area,
				m = Math.max(b.chartWidth, b.chartHeight),
				n = this[(this.zoneAxis || "y") + "Axis"],
				v,
				x,
				D = b.inverted,
				q,
				t,
				u,
				L,
				K = !1;
				d.length && (g || l) && n && void 0 !== n.min && (x = n.reversed, q = n.horiz, g && g.hide(), l && l.hide(), v = n.getExtremes(), r(d,
				function(d, p) {
					f = x ? q ? b.plotWidth: 0 : q ? 0 : n.toPixels(v.min);
					f = Math.min(Math.max(C(e, f), 0), m);
					e = Math.min(Math.max(Math.round(n.toPixels(C(d.value, v.max), !0)), 0), m);
					K && (f = e = n.toPixels(v.max));
					t = Math.abs(f - e);
					u = Math.min(f, e);
					L = Math.max(f, e);
					n.isXAxis ? (k = {
						x: D ? L: u,
						y: 0,
						width: t,
						height: m
					},
					q || (k.x = b.plotHeight - k.x)) : (k = {
						x: 0,
						y: D ? L: u,
						width: m,
						height: t
					},
					q && (k.y = b.plotWidth - k.y));
					D && c.isVML && (k = n.isXAxis ? {
						x: 0,
						y: x ? u: L,
						height: k.width,
						width: b.chartWidth
					}: {
						x: k.y - b.plotLeft - b.spacingBox.x,
						y: 0,
						width: k.height,
						height: b.chartHeight
					});
					h[p] ? h[p].animate(k) : (h[p] = c.clipRect(k), g && a["zone-graph-" + p].clip(h[p]), l && a["zone-area-" + p].clip(h[p]));
					K = d.value > v.max
				}), this.clips = h)
			},
			invertGroups: function(a) {
				function b() {
					r(["group", "markerGroup"],
					function(b) {
						c[b] && (d.renderer.isVML && c[b].attr({
							width: c.yAxis.len,
							height: c.xAxis.len
						}), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
					})
				}
				var c = this,
				d = c.chart,
				f;
				c.xAxis && (f = z(d, "resize", b), z(c, "destroy", f), b(a), c.invertGroups = b)
			},
			plotGroup: function(a, b, c, d, f) {
				var e = this[a],
				h = !e;
				h && (this[a] = e = this.chart.renderer.g().attr({
					zIndex: d || .1
				}).add(f));
				e.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (q(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " ": "") + (this.options.className || "") + (e.hasClass("highcharts-tracker") ? " highcharts-tracker": ""), !0);
				e.attr({
					visibility: c
				})[h ? "attr": "animate"](this.getPlotBox());
				return e
			},
			getPlotBox: function() {
				var a = this.chart,
				b = this.xAxis,
				c = this.yAxis;
				a.inverted && (b = c, c = this.xAxis);
				return {
					translateX: b ? b.left: a.plotLeft,
					translateY: c ? c.top: a.plotTop,
					scaleX: 1,
					scaleY: 1
				}
			},
			render: function() {
				var a = this,
				b = a.chart,
				c, d = a.options,
				f = !!a.animate && b.renderer.isSVG && B(d.animation).duration,
				e = a.visible ? "inherit": "hidden",
				k = d.zIndex,
				g = a.hasRendered,
				l = b.seriesGroup,
				m = b.inverted;
				c = a.plotGroup("group", "series", e, k, l);
				a.markerGroup = a.plotGroup("markerGroup", "markers", e, k, l);
				f && a.animate(!0);
				c.inverted = a.isCartesian ? m: !1;
				a.drawGraph && (a.drawGraph(), a.applyZones());
				a.drawDataLabels && a.drawDataLabels();
				a.visible && a.drawPoints();
				a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
				a.invertGroups(m); ! 1 === d.clip || a.sharedClipKey || g || c.clip(b.clipRect);
				f && a.animate();
				g || (a.animationTimeout = D(function() {
					a.afterAnimate()
				},
				f));
				a.isDirty = !1;
				a.hasRendered = !0;
				h(a, "afterRender")
			},
			redraw: function() {
				var a = this.chart,
				b = this.isDirty || this.isDirtyData,
				c = this.group,
				d = this.xAxis,
				f = this.yAxis;
				c && (a.inverted && c.attr({
					width: a.plotWidth,
					height: a.plotHeight
				}), c.animate({
					translateX: C(d && d.left, a.plotLeft),
					translateY: C(f && f.top, a.plotTop)
				}));
				this.translate();
				this.render();
				b && delete this.kdTree
			},
			kdAxisArray: ["clientX", "plotY"],
			searchPoint: function(a, b) {
				var c = this.xAxis,
				d = this.yAxis,
				f = this.chart.inverted;
				return this.searchKDTree({
					clientX: f ? c.len - a.chartY + c.pos: a.chartX - c.pos,
					plotY: f ? d.len - a.chartX + d.pos: a.chartY - d.pos
				},
				b)
			},
			buildKDTree: function() {
				function a(c, d, f) {
					var e, h;
					if (h = c && c.length) return e = b.kdAxisArray[d % f],
					c.sort(function(a, b) {
						return a[e] - b[e]
					}),
					h = Math.floor(h / 2),
					{
						point: c[h],
						left: a(c.slice(0, h), d + 1, f),
						right: a(c.slice(h + 1), d + 1, f)
					}
				}
				this.buildingKdTree = !0;
				var b = this,
				c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
				delete b.kdTree;
				D(function() {
					b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
					b.buildingKdTree = !1
				},
				b.options.kdNow ? 0 : 1)
			},
			searchKDTree: function(a, b) {
				function c(a, b, k, g) {
					var l = b.point,
					m = d.kdAxisArray[k % g],
					p,
					n,
					v = l;
					n = q(a[f]) && q(l[f]) ? Math.pow(a[f] - l[f], 2) : null;
					p = q(a[e]) && q(l[e]) ? Math.pow(a[e] - l[e], 2) : null;
					p = (n || 0) + (p || 0);
					l.dist = q(p) ? Math.sqrt(p) : Number.MAX_VALUE;
					l.distX = q(n) ? Math.sqrt(n) : Number.MAX_VALUE;
					m = a[m] - l[m];
					p = 0 > m ? "left": "right";
					n = 0 > m ? "right": "left";
					b[p] && (p = c(a, b[p], k + 1, g), v = p[h] < v[h] ? p: l);
					b[n] && Math.sqrt(m * m) < v[h] && (a = c(a, b[n], k + 1, g), v = a[h] < v[h] ? a: v);
					return v
				}
				var d = this,
				f = this.kdAxisArray[0],
				e = this.kdAxisArray[1],
				h = b ? "distX": "dist";
				b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
				this.kdTree || this.buildingKdTree || this.buildKDTree();
				if (this.kdTree) return c(a, this.kdTree, b, b)
			}
		})
	})(J); (function(a) {
		var z = a.addEvent,
		B = a.animate,
		y = a.Axis,
		e = a.createElement,
		g = a.css,
		t = a.defined,
		u = a.each,
		q = a.erase,
		r = a.extend,
		m = a.fireEvent,
		f = a.inArray,
		h = a.isNumber,
		n = a.isObject,
		k = a.isArray,
		d = a.merge,
		b = a.objectEach,
		c = a.pick,
		l = a.Point,
		C = a.Series,
		K = a.seriesTypes,
		x = a.setAnimation,
		L = a.splat;
		r(a.Chart.prototype, {
			addSeries: function(a, b, d) {
				var f, e = this;
				a && (b = c(b, !0), m(e, "addSeries", {
					options: a
				},
				function() {
					f = e.initSeries(a);
					e.isDirtyLegend = !0;
					e.linkSeries();
					b && e.redraw(d)
				}));
				return f
			},
			addAxis: function(a, b, f, e) {
				var h = b ? "xAxis": "yAxis",
				k = this.options;
				a = d(a, {
					index: this[h].length,
					isX: b
				});
				b = new y(this, a);
				k[h] = L(k[h] || {});
				k[h].push(a);
				c(f, !0) && this.redraw(e);
				return b
			},
			showLoading: function(a) {
				var b = this,
				c = b.options,
				d = b.loadingDiv,
				f = c.loading,
				h = function() {
					d && g(d, {
						left: b.plotLeft + "px",
						top: b.plotTop + "px",
						width: b.plotWidth + "px",
						height: b.plotHeight + "px"
					})
				};
				d || (b.loadingDiv = d = e("div", {
					className: "highcharts-loading highcharts-loading-hidden"
				},
				null, b.container), b.loadingSpan = e("span", {
					className: "highcharts-loading-inner"
				},
				null, d), z(b, "redraw", h));
				d.className = "highcharts-loading";
				b.loadingSpan.innerHTML = a || c.lang.loading;
				g(d, r(f.style, {
					zIndex: 10
				}));
				g(b.loadingSpan, f.labelStyle);
				b.loadingShown || (g(d, {
					opacity: 0,
					display: ""
				}), B(d, {
					opacity: f.style.opacity || .5
				},
				{
					duration: f.showDuration || 0
				}));
				b.loadingShown = !0;
				h()
			},
			hideLoading: function() {
				var a = this.options,
				b = this.loadingDiv;
				b && (b.className = "highcharts-loading highcharts-loading-hidden", B(b, {
					opacity: 0
				},
				{
					duration: a.loading.hideDuration || 100,
					complete: function() {
						g(b, {
							display: "none"
						})
					}
				}));
				this.loadingShown = !1
			},
			propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
			propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
			update: function(a, e, k) {
				var g = this,
				l = {
					credits: "addCredits",
					title: "setTitle",
					subtitle: "setSubtitle"
				},
				m = a.chart,
				n,
				p,
				x = [];
				if (m) {
					d(!0, g.options.chart, m);
					"className" in m && g.setClassName(m.className);
					if ("inverted" in m || "polar" in m) g.propFromSeries(),
					n = !0;
					"alignTicks" in m && (n = !0);
					b(m,
					function(a, b) { - 1 !== f("chart." + b, g.propsRequireUpdateSeries) && (p = !0); - 1 !== f(b, g.propsRequireDirtyBox) && (g.isDirtyBox = !0)
					});
					"style" in m && g.renderer.setStyle(m.style)
				}
				a.colors && (this.options.colors = a.colors);
				a.plotOptions && d(!0, this.options.plotOptions, a.plotOptions);
				b(a,
				function(a, b) {
					if (g[b] && "function" === typeof g[b].update) g[b].update(a, !1);
					else if ("function" === typeof g[l[b]]) g[l[b]](a);
					"chart" !== b && -1 !== f(b, g.propsRequireUpdateSeries) && (p = !0)
				});
				u("xAxis yAxis zAxis series colorAxis pane".split(" "),
				function(b) {
					a[b] && (u(L(a[b]),
					function(a, c) { (c = t(a.id) && g.get(a.id) || g[b][c]) && c.coll === b && (c.update(a, !1), k && (c.touched = !0));
						if (!c && k) if ("series" === b) g.addSeries(a, !1).touched = !0;
						else if ("xAxis" === b || "yAxis" === b) g.addAxis(a, "xAxis" === b, !1).touched = !0
					}), k && u(g[b],
					function(a) {
						a.touched ? delete a.touched: x.push(a)
					}))
				});
				u(x,
				function(a) {
					a.remove(!1)
				});
				n && u(g.axes,
				function(a) {
					a.update({},
					!1)
				});
				p && u(g.series,
				function(a) {
					a.update({},
					!1)
				});
				a.loading && d(!0, g.options.loading, a.loading);
				n = m && m.width;
				m = m && m.height;
				h(n) && n !== g.chartWidth || h(m) && m !== g.chartHeight ? g.setSize(n, m) : c(e, !0) && g.redraw()
			},
			setSubtitle: function(a) {
				this.setTitle(void 0, a)
			}
		});
		r(l.prototype, {
			update: function(a, b, d, f) {
				function e() {
					h.applyOptions(a);
					null === h.y && g && (h.graphic = g.destroy());
					n(a, !0) && (g && g.element && a && a.marker && void 0 !== a.marker.symbol && (h.graphic = g.destroy()), a && a.dataLabels && h.dataLabel && (h.dataLabel = h.dataLabel.destroy()), h.connector && (h.connector = h.connector.destroy()));
					l = h.index;
					k.updateParallelArrays(h, l);
					x.data[l] = n(x.data[l], !0) || n(a, !0) ? h.options: a;
					k.isDirty = k.isDirtyData = !0; ! k.fixedBox && k.hasCartesianSeries && (m.isDirtyBox = !0);
					"point" === x.legendType && (m.isDirtyLegend = !0);
					b && m.redraw(d)
				}
				var h = this,
				k = h.series,
				g = h.graphic,
				l, m = k.chart,
				x = k.options;
				b = c(b, !0); ! 1 === f ? e() : h.firePointEvent("update", {
					options: a
				},
				e)
			},
			remove: function(a, b) {
				this.series.removePoint(f(this, this.series.data), a, b)
			}
		});
		r(C.prototype, {
			addPoint: function(a, b, d, f) {
				var e = this.options,
				h = this.data,
				k = this.chart,
				g = this.xAxis,
				g = g && g.hasNames && g.names,
				l = e.data,
				m, n, x = this.xData,
				r, v;
				b = c(b, !0);
				m = {
					series: this
				};
				this.pointClass.prototype.applyOptions.apply(m, [a]);
				v = m.x;
				r = x.length;
				if (this.requireSorting && v < x[r - 1]) for (n = !0; r && x[r - 1] > v;) r--;
				this.updateParallelArrays(m, "splice", r, 0, 0);
				this.updateParallelArrays(m, r);
				g && m.name && (g[v] = m.name);
				l.splice(r, 0, a);
				n && (this.data.splice(r, 0, null), this.processData());
				"point" === e.legendType && this.generatePoints();
				d && (h[0] && h[0].remove ? h[0].remove(!1) : (h.shift(), this.updateParallelArrays(m, "shift"), l.shift()));
				this.isDirtyData = this.isDirty = !0;
				b && k.redraw(f)
			},
			removePoint: function(a, b, d) {
				var f = this,
				e = f.data,
				h = e[a],
				k = f.points,
				g = f.chart,
				l = function() {
					k && k.length === e.length && k.splice(a, 1);
					e.splice(a, 1);
					f.options.data.splice(a, 1);
					f.updateParallelArrays(h || {
						series: f
					},
					"splice", a, 1);
					h && h.destroy();
					f.isDirty = !0;
					f.isDirtyData = !0;
					b && g.redraw()
				};
				x(d, g);
				b = c(b, !0);
				h ? h.firePointEvent("remove", null, l) : l()
			},
			remove: function(a, b, d) {
				function f() {
					e.destroy();
					h.isDirtyLegend = h.isDirtyBox = !0;
					h.linkSeries();
					c(a, !0) && h.redraw(b)
				}
				var e = this,
				h = e.chart; ! 1 !== d ? m(e, "remove", null, f) : f()
			},
			update: function(a, b) {
				var f = this,
				e = f.chart,
				h = f.userOptions,
				k = f.oldType || f.type,
				g = a.type || h.type || e.options.chart.type,
				l = K[k].prototype,
				m,
				n = ["group", "markerGroup", "dataLabelsGroup"],
				x = ["navigatorSeries", "baseSeries"],
				v = f.finishedAnimating && {
					animation: !1
				};
				if (Object.keys && "data" === Object.keys(a).toString()) return this.setData(a.data, b);
				x = n.concat(x);
				u(x,
				function(a) {
					x[a] = f[a];
					delete f[a]
				});
				a = d(h, v, {
					index: f.index,
					pointStart: f.xData[0]
				},
				{
					data: f.options.data
				},
				a);
				f.remove(!1, null, !1);
				for (m in l) f[m] = void 0;
				r(f, K[g || k].prototype);
				u(x,
				function(a) {
					f[a] = x[a]
				});
				f.init(e, a);
				a.zIndex !== h.zIndex && u(n,
				function(b) {
					f[b] && f[b].attr({
						zIndex: a.zIndex
					})
				});
				f.oldType = k;
				e.linkSeries();
				c(b, !0) && e.redraw(!1)
			}
		});
		r(y.prototype, {
			update: function(a, b) {
				var f = this.chart;
				a = f.options[this.coll][this.options.index] = d(this.userOptions, a);
				this.destroy(!0);
				this.init(f, r(a, {
					events: void 0
				}));
				f.isDirtyBox = !0;
				c(b, !0) && f.redraw()
			},
			remove: function(a) {
				for (var b = this.chart,
				d = this.coll,
				f = this.series,
				e = f.length; e--;) f[e] && f[e].remove(!1);
				q(b.axes, this);
				q(b[d], this);
				k(b.options[d]) ? b.options[d].splice(this.options.index, 1) : delete b.options[d];
				u(b[d],
				function(a, b) {
					a.options.index = b
				});
				this.destroy();
				b.isDirtyBox = !0;
				c(a, !0) && b.redraw()
			},
			setTitle: function(a, b) {
				this.update({
					title: a
				},
				b)
			},
			setCategories: function(a, b) {
				this.update({
					categories: a
				},
				b)
			}
		})
	})(J); (function(a) {
		var z = a.animObject,
		B = a.color,
		y = a.each,
		e = a.extend,
		g = a.isNumber,
		t = a.merge,
		u = a.pick,
		q = a.Series,
		r = a.seriesType,
		m = a.svg;
		r("column", "line", {
			borderRadius: 0,
			crisp: !0,
			groupPadding: .2,
			marker: null,
			pointPadding: .1,
			minPointLength: 0,
			cropThreshold: 50,
			pointRange: null,
			states: {
				hover: {
					halo: !1,
					brightness: .1
				},
				select: {
					color: "#cccccc",
					borderColor: "#000000"
				}
			},
			dataLabels: {
				align: null,
				verticalAlign: null,
				y: null
			},
			softThreshold: !1,
			startFromThreshold: !0,
			stickyTracking: !1,
			tooltip: {
				distance: 6
			},
			threshold: 0,
			borderColor: "#ffffff"
		},
		{
			cropShoulder: 0,
			directTouch: !0,
			trackerGroups: ["group", "dataLabelsGroup"],
			negStacks: !0,
			init: function() {
				q.prototype.init.apply(this, arguments);
				var a = this,
				e = a.chart;
				e.hasRendered && y(e.series,
				function(f) {
					f.type === a.type && (f.isDirty = !0)
				})
			},
			getColumnMetrics: function() {
				var a = this,
				e = a.options,
				g = a.xAxis,
				k = a.yAxis,
				d = g.reversed,
				b, c = {},
				l = 0; ! 1 === e.grouping ? l = 1 : y(a.chart.series,
				function(d) {
					var f = d.options,
					e = d.yAxis,
					h;
					d.type !== a.type || !d.visible && a.chart.options.chart.ignoreHiddenSeries || k.len !== e.len || k.pos !== e.pos || (f.stacking ? (b = d.stackKey, void 0 === c[b] && (c[b] = l++), h = c[b]) : !1 !== f.grouping && (h = l++), d.columnIndex = h)
				});
				var m = Math.min(Math.abs(g.transA) * (g.ordinalSlope || e.pointRange || g.closestPointRange || g.tickInterval || 1), g.len),
				r = m * e.groupPadding,
				x = (m - 2 * r) / (l || 1),
				e = Math.min(e.maxPointWidth || g.len, u(e.pointWidth, x * (1 - 2 * e.pointPadding)));
				a.columnMetrics = {
					width: e,
					offset: (x - e) / 2 + (r + ((a.columnIndex || 0) + (d ? 1 : 0)) * x - m / 2) * (d ? -1 : 1)
				};
				return a.columnMetrics
			},
			crispCol: function(a, e, g, k) {
				var d = this.chart,
				b = this.borderWidth,
				c = -(b % 2 ? .5 : 0),
				b = b % 2 ? .5 : 1;
				d.inverted && d.renderer.isVML && (b += 1);
				this.options.crisp && (g = Math.round(a + g) + c, a = Math.round(a) + c, g -= a);
				k = Math.round(e + k) + b;
				c = .5 >= Math.abs(e) && .5 < k;
				e = Math.round(e) + b;
				k -= e;
				c && k && (--e, k += 1);
				return {
					x: a,
					y: e,
					width: g,
					height: k
				}
			},
			translate: function() {
				var a = this,
				e = a.chart,
				g = a.options,
				k = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
				k = a.borderWidth = u(g.borderWidth, k ? 0 : 1),
				d = a.yAxis,
				b = g.threshold,
				c = a.translatedThreshold = d.getThreshold(b),
				l = u(g.minPointLength, 5),
				m = a.getColumnMetrics(),
				r = m.width,
				x = a.barW = Math.max(r, 1 + 2 * k),
				t = a.pointXOffset = m.offset;
				e.inverted && (c -= .5);
				g.pointPadding && (x = Math.ceil(x));
				q.prototype.translate.apply(a);
				y(a.points,
				function(f) {
					var h = u(f.yBottom, c),
					g = 999 + Math.abs(h),
					g = Math.min(Math.max( - g, f.plotY), d.len + g),
					k = f.plotX + t,
					m = x,
					n = Math.min(g, h),
					q,
					p = Math.max(g, h) - n;
					l && Math.abs(p) < l && (p = l, q = !d.reversed && !f.negative || d.reversed && f.negative, f.y === b && a.dataMax <= b && d.min < b && (q = !q), n = Math.abs(n - c) > l ? h - l: c - (q ? l: 0));
					f.barX = k;
					f.pointWidth = r;
					f.tooltipPos = e.inverted ? [d.len + d.pos - e.plotLeft - g, a.xAxis.len - k - m / 2, p] : [k + m / 2, g + d.pos - e.plotTop, p];
					f.shapeType = "rect";
					f.shapeArgs = a.crispCol.apply(a, f.isNull ? [k, c, m, 0] : [k, n, m, p])
				})
			},
			getSymbol: a.noop,
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
			drawGraph: function() {
				this.group[this.dense ? "addClass": "removeClass"]("highcharts-dense-data")
			},
			pointAttribs: function(a, e) {
				var f = this.options,
				h, d = this.pointAttrToOptions || {};
				h = d.stroke || "borderColor";
				var b = d["stroke-width"] || "borderWidth",
				c = a && a.color || this.color,
				g = a && a[h] || f[h] || this.color || c,
				m = a && a[b] || f[b] || this[b] || 0,
				d = f.dashStyle;
				a && this.zones.length && (c = a.getZone(), c = a.options.color || c && c.color || this.color);
				e && (a = t(f.states[e], a.options.states && a.options.states[e] || {}), e = a.brightness, c = a.color || void 0 !== e && B(c).brighten(a.brightness).get() || c, g = a[h] || g, m = a[b] || m, d = a.dashStyle || d);
				h = {
					fill: c,
					stroke: g,
					"stroke-width": m
				};
				d && (h.dashstyle = d);
				return h
			},
			drawPoints: function() {
				var a = this,
				e = this.chart,
				m = a.options,
				k = e.renderer,
				d = m.animationLimit || 250,
				b;
				y(a.points,
				function(c) {
					var f = c.graphic;
					if (g(c.plotY) && null !== c.y) {
						b = c.shapeArgs;
						if (f) f[e.pointCount < d ? "animate": "attr"](t(b));
						else c.graphic = f = k[c.shapeType](b).add(c.group || a.group);
						m.borderRadius && f.attr({
							r: m.borderRadius
						});
						f.attr(a.pointAttribs(c, c.selected && "select")).shadow(m.shadow, null, m.stacking && !m.borderRadius);
						f.addClass(c.getClassName(), !0)
					} else f && (c.graphic = f.destroy())
				})
			},
			animate: function(a) {
				var f = this,
				g = this.yAxis,
				k = f.options,
				d = this.chart.inverted,
				b = {},
				c = d ? "translateX": "translateY",
				l;
				m && (a ? (b.scaleY = .001, a = Math.min(g.pos + g.len, Math.max(g.pos, g.toPixels(k.threshold))), d ? b.translateX = a - g.len: b.translateY = a, f.group.attr(b)) : (l = f.group.attr(c), f.group.animate({
					scaleY: 1
				},
				e(z(f.options.animation), {
					step: function(a, d) {
						b[c] = l + d.pos * (g.pos - l);
						f.group.attr(b)
					}
				})), f.animate = null))
			},
			remove: function() {
				var a = this,
				e = a.chart;
				e.hasRendered && y(e.series,
				function(f) {
					f.type === a.type && (f.isDirty = !0)
				});
				q.prototype.remove.apply(a, arguments)
			}
		})
	})(J); (function(a) {
		var z = a.Series;
		a = a.seriesType;
		a("scatter", "line", {
			lineWidth: 0,
			findNearestPointBy: "xy",
			marker: {
				enabled: !0
			},
			tooltip: {
				headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
				pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
			}
		},
		{
			sorted: !1,
			requireSorting: !1,
			noSharedTooltip: !0,
			trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
			takeOrdinalPosition: !1,
			drawGraph: function() {
				this.options.lineWidth && z.prototype.drawGraph.call(this)
			}
		})
	})(J); (function(a) {
		var z = a.addEvent,
		B = a.arrayMax,
		y = a.defined,
		e = a.each,
		g = a.extend,
		t = a.format,
		u = a.map,
		q = a.merge,
		r = a.noop,
		m = a.pick,
		f = a.relativeLength,
		h = a.Series,
		n = a.seriesTypes,
		k = a.stableSort;
		a.distribute = function(a, b) {
			function c(a, b) {
				return a.target - b.target
			}
			var d, f = !0,
			h = a,
			g = [],
			n;
			n = 0;
			for (d = a.length; d--;) n += a[d].size;
			if (n > b) {
				k(a,
				function(a, b) {
					return (b.rank || 0) - (a.rank || 0)
				});
				for (n = d = 0; n <= b;) n += a[d].size,
				d++;
				g = a.splice(d - 1, a.length)
			}
			k(a, c);
			for (a = u(a,
			function(a) {
				return {
					size: a.size,
					targets: [a.target],
					align: m(a.align, .5)
				}
			}); f;) {
				for (d = a.length; d--;) f = a[d],
				n = (Math.min.apply(0, f.targets) + Math.max.apply(0, f.targets)) / 2,
				f.pos = Math.min(Math.max(0, n - f.size * f.align), b - f.size);
				d = a.length;
				for (f = !1; d--;) 0 < d && a[d - 1].pos + a[d - 1].size > a[d].pos && (a[d - 1].size += a[d].size, a[d - 1].targets = a[d - 1].targets.concat(a[d].targets), a[d - 1].align = .5, a[d - 1].pos + a[d - 1].size > b && (a[d - 1].pos = b - a[d - 1].size), a.splice(d, 1), f = !0)
			}
			d = 0;
			e(a,
			function(a) {
				var b = 0;
				e(a.targets,
				function() {
					h[d].pos = a.pos + b;
					b += h[d].size;
					d++
				})
			});
			h.push.apply(h, g);
			k(h, c)
		};
		h.prototype.drawDataLabels = function() {
			function d(a, b) {
				var c = b.filter;
				return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0
			}
			var b = this,
			c = b.chart,
			f = b.options,
			h = f.dataLabels,
			g = b.points,
			k, n, r = b.hasRendered || 0,
			v, w, u = m(h.defer, !!f.animation),
			H = c.renderer;
			if (h.enabled || b._hasPointLabels) b.dlProcessOptions && b.dlProcessOptions(h),
			w = b.plotGroup("dataLabelsGroup", "data-labels", u && !r ? "hidden": "visible", h.zIndex || 6),
			u && (w.attr({
				opacity: +r
			}), r || z(b, "afterAnimate",
			function() {
				b.visible && w.show(!0);
				w[f.animation ? "animate": "attr"]({
					opacity: 1
				},
				{
					duration: 200
				})
			})),
			n = h,
			e(g,
			function(e) {
				var g, l = e.dataLabel,
				x, r, u = e.connector,
				D = !l,
				G;
				k = e.dlOptions || e.options && e.options.dataLabels; (g = m(k && k.enabled, n.enabled) && !e.isNull) && (g = !0 === d(e, k || h));
				g && (h = q(n, k), x = e.getLabelConfig(), G = h[e.formatPrefix + "Format"] || h.format, v = y(G) ? t(G, x, c.time) : (h[e.formatPrefix + "Formatter"] || h.formatter).call(x, h), G = h.style, x = h.rotation, G.color = m(h.color, G.color, b.color, "#000000"), "contrast" === G.color && (e.contrastColor = H.getContrast(e.color || b.color), G.color = h.inside || 0 > m(e.labelDistance, h.distance) || f.stacking ? e.contrastColor: "#000000"), f.cursor && (G.cursor = f.cursor), r = {
					fill: h.backgroundColor,
					stroke: h.borderColor,
					"stroke-width": h.borderWidth,
					r: h.borderRadius || 0,
					rotation: x,
					padding: h.padding,
					zIndex: 1
				},
				a.objectEach(r,
				function(a, b) {
					void 0 === a && delete r[b]
				})); ! l || g && y(v) ? g && y(v) && (l ? r.text = v: (l = e.dataLabel = x ? H.text(v, 0, -9999).addClass("highcharts-data-label") : H.label(v, 0, -9999, h.shape, null, null, h.useHTML, null, "data-label"), l.addClass(" highcharts-data-label-color-" + e.colorIndex + " " + (h.className || "") + (h.useHTML ? "highcharts-tracker": ""))), l.attr(r), l.css(G).shadow(h.shadow), l.added || l.add(w), b.alignDataLabel(e, l, h, null, D)) : (e.dataLabel = l = l.destroy(), u && (e.connector = u.destroy()))
			});
			a.fireEvent(this, "afterDrawDataLabels")
		};
		h.prototype.alignDataLabel = function(a, b, c, f, e) {
			var d = this.chart,
			h = d.inverted,
			k = m(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
			l = m(a.plotY, -9999),
			n = b.getBBox(),
			r,
			q = c.rotation,
			t = c.align,
			u = this.visible && (a.series.forceDL || d.isInsidePlot(k, Math.round(l), h) || f && d.isInsidePlot(k, h ? f.x + 1 : f.y + f.height - 1, h)),
			C = "justify" === m(c.overflow, "justify");
			if (u && (r = c.style.fontSize, r = d.renderer.fontMetrics(r, b).b, f = g({
				x: h ? this.yAxis.len - l: k,
				y: Math.round(h ? this.xAxis.len - k: l),
				width: 0,
				height: 0
			},
			f), g(c, {
				width: n.width,
				height: n.height
			}), q ? (C = !1, k = d.renderer.rotCorr(r, q), k = {
				x: f.x + c.x + f.width / 2 + k.x,
				y: f.y + c.y + {
					top: 0,
					middle: .5,
					bottom: 1
				} [c.verticalAlign] * f.height
			},
			b[e ? "attr": "animate"](k).attr({
				align: t
			}), l = (q + 720) % 360, l = 180 < l && 360 > l, "left" === t ? k.y -= l ? n.height: 0 : "center" === t ? (k.x -= n.width / 2, k.y -= n.height / 2) : "right" === t && (k.x -= n.width, k.y -= l ? 0 : n.height)) : (b.align(c, null, f), k = b.alignAttr), C ? a.isLabelJustified = this.justifyDataLabel(b, c, k, n, f, e) : m(c.crop, !0) && (u = d.isInsidePlot(k.x, k.y) && d.isInsidePlot(k.x + n.width, k.y + n.height)), c.shape && !q)) b[e ? "attr": "animate"]({
				anchorX: h ? d.plotWidth - a.plotY: a.plotX,
				anchorY: h ? d.plotHeight - a.plotX: a.plotY
			});
			u || (b.attr({
				y: -9999
			}), b.placed = !1)
		};
		h.prototype.justifyDataLabel = function(a, b, c, f, e, h) {
			var d = this.chart,
			g = b.align,
			k = b.verticalAlign,
			l, m, n = a.box ? 0 : a.padding || 0;
			l = c.x + n;
			0 > l && ("right" === g ? b.align = "left": b.x = -l, m = !0);
			l = c.x + f.width - n;
			l > d.plotWidth && ("left" === g ? b.align = "right": b.x = d.plotWidth - l, m = !0);
			l = c.y + n;
			0 > l && ("bottom" === k ? b.verticalAlign = "top": b.y = -l, m = !0);
			l = c.y + f.height - n;
			l > d.plotHeight && ("top" === k ? b.verticalAlign = "bottom": b.y = d.plotHeight - l, m = !0);
			m && (a.placed = !h, a.align(b, null, e));
			return m
		};
		n.pie && (n.pie.prototype.drawDataLabels = function() {
			var d = this,
			b = d.data,
			c, f = d.chart,
			g = d.options.dataLabels,
			k = m(g.connectorPadding, 10),
			n = m(g.connectorWidth, 1),
			r = f.plotWidth,
			q = f.plotHeight,
			t,
			u = d.center,
			G = u[2] / 2,
			H = u[1],
			z,
			E,
			p,
			F,
			O = [[], []],
			M,
			N,
			J,
			Q,
			A = [0, 0, 0, 0];
			d.visible && (g.enabled || d._hasPointLabels) && (e(b,
			function(a) {
				a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
					width: "auto"
				}).css({
					width: "auto",
					textOverflow: "clip"
				}), a.dataLabel.shortened = !1)
			}), h.prototype.drawDataLabels.apply(d), e(b,
			function(a) {
				a.dataLabel && a.visible && (O[a.half].push(a), a.dataLabel._pos = null)
			}), e(O,
			function(b, h) {
				var l, n, x = b.length,
				t = [],
				v;
				if (x) for (d.sortByAngle(b, h - .5), 0 < d.maxLabelDistance && (l = Math.max(0, H - G - d.maxLabelDistance), n = Math.min(H + G + d.maxLabelDistance, f.plotHeight), e(b,
				function(a) {
					0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, H - G - a.labelDistance), a.bottom = Math.min(H + G + a.labelDistance, f.plotHeight), v = a.dataLabel.getBBox().height || 21, a.positionsIndex = t.push({
						target: a.labelPos[1] - a.top + v / 2,
						size: v,
						rank: a.y
					}) - 1)
				}), a.distribute(t, n + v - l)), Q = 0; Q < x; Q++) c = b[Q],
				n = c.positionsIndex,
				p = c.labelPos,
				z = c.dataLabel,
				J = !1 === c.visible ? "hidden": "inherit",
				N = l = p[1],
				t && y(t[n]) && (void 0 === t[n].pos ? J = "hidden": (F = t[n].size, N = c.top + t[n].pos)),
				delete c.positionIndex,
				M = g.justify ? u[0] + (h ? -1 : 1) * (G + c.labelDistance) : d.getX(N < c.top + 2 || N > c.bottom - 2 ? l: N, h, c),
				z._attr = {
					visibility: J,
					align: p[6]
				},
				z._pos = {
					x: M + g.x + ({
						left: k,
						right: -k
					} [p[6]] || 0),
					y: N + g.y - 10
				},
				p.x = M,
				p.y = N,
				m(g.crop, !0) && (E = z.getBBox().width, l = null, M - E < k ? (l = Math.round(E - M + k), A[3] = Math.max(l, A[3])) : M + E > r - k && (l = Math.round(M + E - r + k), A[1] = Math.max(l, A[1])), 0 > N - F / 2 ? A[0] = Math.max(Math.round( - N + F / 2), A[0]) : N + F / 2 > q && (A[2] = Math.max(Math.round(N + F / 2 - q), A[2])), z.sideOverflow = l)
			}), 0 === B(A) || this.verifyDataLabelOverflow(A)) && (this.placeDataLabels(), n && e(this.points,
			function(a) {
				var b;
				t = a.connector;
				if ((z = a.dataLabel) && z._pos && a.visible && 0 < a.labelDistance) {
					J = z._attr.visibility;
					if (b = !t) a.connector = t = f.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex).add(d.dataLabelsGroup),
					t.attr({
						"stroke-width": n,
						stroke: g.connectorColor || a.color || "#666666"
					});
					t[b ? "attr": "animate"]({
						d: d.connectorPath(a.labelPos)
					});
					t.attr("visibility", J)
				} else t && (a.connector = t.destroy())
			}))
		},
		n.pie.prototype.connectorPath = function(a) {
			var b = a.x,
			c = a.y;
			return m(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
		},
		n.pie.prototype.placeDataLabels = function() {
			e(this.points,
			function(a) {
				var b = a.dataLabel;
				b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
					width: b._attr.width + "px",
					textOverflow: "ellipsis"
				}), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate": "attr"](a), b.moved = !0) : b && b.attr({
					y: -9999
				}))
			},
			this)
		},
		n.pie.prototype.alignDataLabel = r, n.pie.prototype.verifyDataLabelOverflow = function(a) {
			var b = this.center,
			c = this.options,
			d = c.center,
			e = c.minSize || 80,
			h, g = null !== c.size;
			g || (null !== d[0] ? h = Math.max(b[2] - Math.max(a[1], a[3]), e) : (h = Math.max(b[2] - a[1] - a[3], e), b[0] += (a[3] - a[1]) / 2), null !== d[1] ? h = Math.max(Math.min(h, b[2] - Math.max(a[0], a[2])), e) : (h = Math.max(Math.min(h, b[2] - a[0] - a[2]), e), b[1] += (a[0] - a[2]) / 2), h < b[2] ? (b[2] = h, b[3] = Math.min(f(c.innerSize || 0, h), h), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : g = !0);
			return g
		});
		n.column && (n.column.prototype.alignDataLabel = function(a, b, c, f, e) {
			var d = this.chart.inverted,
			g = a.series,
			k = a.dlBox || a.shapeArgs,
			l = m(a.below, a.plotY > m(this.translatedThreshold, g.yAxis.len)),
			n = m(c.inside, !!this.options.stacking);
			k && (f = q(k), 0 > f.y && (f.height += f.y, f.y = 0), k = f.y + f.height - g.yAxis.len, 0 < k && (f.height -= k), d && (f = {
				x: g.yAxis.len - f.y - f.height,
				y: g.xAxis.len - f.x - f.width,
				width: f.height,
				height: f.width
			}), n || (d ? (f.x += l ? 0 : f.width, f.width = 0) : (f.y += l ? f.height: 0, f.height = 0)));
			c.align = m(c.align, !d || n ? "center": l ? "right": "left");
			c.verticalAlign = m(c.verticalAlign, d || n ? "middle": l ? "top": "bottom");
			h.prototype.alignDataLabel.call(this, a, b, c, f, e);
			a.isLabelJustified && a.contrastColor && a.dataLabel.css({
				color: a.contrastColor
			})
		})
	})(J); (function(a) {
		var z = a.Chart,
		B = a.each,
		y = a.objectEach,
		e = a.pick;
		a = a.addEvent;
		a(z.prototype, "render",
		function() {
			var a = [];
			B(this.labelCollectors || [],
			function(e) {
				a = a.concat(e())
			});
			B(this.yAxis || [],
			function(e) {
				e.options.stackLabels && !e.options.stackLabels.allowOverlap && y(e.stacks,
				function(e) {
					y(e,
					function(e) {
						a.push(e.label)
					})
				})
			});
			B(this.series || [],
			function(g) {
				var t = g.options.dataLabels,
				q = g.dataLabelCollections || ["dataLabel"]; (t.enabled || g._hasPointLabels) && !t.allowOverlap && g.visible && B(q,
				function(r) {
					B(g.points,
					function(g) {
						g[r] && (g[r].labelrank = e(g.labelrank, g.shapeArgs && g.shapeArgs.height), a.push(g[r]))
					})
				})
			});
			this.hideOverlappingLabels(a)
		});
		z.prototype.hideOverlappingLabels = function(a) {
			var e = a.length,
			g, q, r, m, f, h, n, k, d, b = function(a, b, d, f, e, h, g, k) {
				return ! (e > a + d || e + g < a || h > b + f || h + k < b)
			};
			for (q = 0; q < e; q++) if (g = a[q]) g.oldOpacity = g.opacity,
			g.newOpacity = 1,
			g.width || (r = g.getBBox(), g.width = r.width, g.height = r.height);
			a.sort(function(a, b) {
				return (b.labelrank || 0) - (a.labelrank || 0)
			});
			for (q = 0; q < e; q++) for (r = a[q], g = q + 1; g < e; ++g) if (m = a[g], r && m && r !== m && r.placed && m.placed && 0 !== r.newOpacity && 0 !== m.newOpacity && (f = r.alignAttr, h = m.alignAttr, n = r.parentGroup, k = m.parentGroup, d = 2 * (r.box ? 0 : r.padding || 0), f = b(f.x + n.translateX, f.y + n.translateY, r.width - d, r.height - d, h.x + k.translateX, h.y + k.translateY, m.width - d, m.height - d)))(r.labelrank < m.labelrank ? r: m).newOpacity = 0;
			B(a,
			function(a) {
				var b, c;
				a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function() {
					a.hide()
				},
				a.alignAttr.opacity = c, a[a.isOld ? "animate": "attr"](a.alignAttr, null, b)), a.isOld = !0)
			})
		}
	})(J); (function(a) {
		var z = a.addEvent,
		B = a.Chart,
		y = a.createElement,
		e = a.css,
		g = a.defaultOptions,
		t = a.defaultPlotOptions,
		u = a.each,
		q = a.extend,
		r = a.fireEvent,
		m = a.hasTouch,
		f = a.inArray,
		h = a.isObject,
		n = a.Legend,
		k = a.merge,
		d = a.pick,
		b = a.Point,
		c = a.Series,
		l = a.seriesTypes,
		C = a.svg,
		K;
		K = a.TrackerMixin = {
			drawTrackerPoint: function() {
				var a = this,
				b = a.chart.pointer,
				c = function(a) {
					var c = b.getPointFromEvent(a);
					void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
				};
				u(a.points,
				function(a) {
					a.graphic && (a.graphic.element.point = a);
					a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a: a.dataLabel.element.point = a)
				});
				a._hasTracking || (u(a.trackerGroups,
				function(d) {
					if (a[d]) {
						a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout",
						function(a) {
							b.onTrackerMouseOut(a)
						});
						if (m) a[d].on("touchstart", c);
						a.options.cursor && a[d].css(e).css({
							cursor: a.options.cursor
						})
					}
				}), a._hasTracking = !0);
				r(this, "afterDrawTracker")
			},
			drawTrackerGraph: function() {
				var a = this,
				b = a.options,
				c = b.trackByArea,
				d = [].concat(c ? a.areaPath: a.graphPath),
				f = d.length,
				e = a.chart,
				h = e.pointer,
				g = e.renderer,
				k = e.options.tooltip.snap,
				l = a.tracker,
				n,
				q = function() {
					if (e.hoverSeries !== a) a.onMouseOver()
				},
				t = "rgba(192,192,192," + (C ? .0001 : .002) + ")";
				if (f && !c) for (n = f + 1; n--;)"M" === d[n] && d.splice(n + 1, 0, d[n + 1] - k, d[n + 2], "L"),
				(n && "M" === d[n] || n === f) && d.splice(n, 0, "L", d[n - 2] + k, d[n - 1]);
				l ? l.attr({
					d: d
				}) : a.graph && (a.tracker = g.path(d).attr({
					"stroke-linejoin": "round",
					visibility: a.visible ? "visible": "hidden",
					stroke: t,
					fill: c ? t: "none",
					"stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * k),
					zIndex: 2
				}).add(a.group), u([a.tracker, a.markerGroup],
				function(a) {
					a.addClass("highcharts-tracker").on("mouseover", q).on("mouseout",
					function(a) {
						h.onTrackerMouseOut(a)
					});
					b.cursor && a.css({
						cursor: b.cursor
					});
					if (m) a.on("touchstart", q)
				}));
				r(this, "afterDrawTracker")
			}
		};
		l.column && (l.column.prototype.drawTracker = K.drawTrackerPoint);
		l.pie && (l.pie.prototype.drawTracker = K.drawTrackerPoint);
		l.scatter && (l.scatter.prototype.drawTracker = K.drawTrackerPoint);
		q(n.prototype, {
			setItemEvents: function(a, c, d) {
				var f = this,
				e = f.chart.renderer.boxWrapper,
				h = "highcharts-legend-" + (a instanceof b ? "point": "series") + "-active"; (d ? c: a.legendGroup).on("mouseover",
				function() {
					a.setState("hover");
					e.addClass(h);
					c.css(f.options.itemHoverStyle)
				}).on("mouseout",
				function() {
					c.css(k(a.visible ? f.itemStyle: f.itemHiddenStyle));
					e.removeClass(h);
					a.setState()
				}).on("click",
				function(b) {
					var c = function() {
						a.setVisible && a.setVisible()
					};
					e.removeClass(h);
					b = {
						browserEvent: b
					};
					a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : r(a, "legendItemClick", b, c)
				})
			},
			createCheckboxForItem: function(a) {
				a.checkbox = y("input", {
					type: "checkbox",
					checked: a.selected,
					defaultChecked: a.selected
				},
				this.options.itemCheckboxStyle, this.chart.container);
				z(a.checkbox, "click",
				function(b) {
					r(a.series || a, "checkboxClick", {
						checked: b.target.checked,
						item: a
					},
					function() {
						a.select()
					})
				})
			}
		});
		g.legend.itemStyle.cursor = "pointer";
		q(B.prototype, {
			showResetZoom: function() {
				function a() {
					b.zoomOut()
				}
				var b = this,
				c = g.lang,
				d = b.options.chart.resetZoomButton,
				f = d.theme,
				e = f.states,
				h = "chart" === d.relativeTo ? null: "plotBox";
				r(this, "beforeShowResetZoom", null,
				function() {
					b.resetZoomButton = b.renderer.button(c.resetZoom, null, null, a, f, e && e.hover).attr({
						align: d.position.align,
						title: c.resetZoomTitle
					}).addClass("highcharts-reset-zoom").add().align(d.position, !1, h)
				})
			},
			zoomOut: function() {
				var a = this;
				r(a, "selection", {
					resetSelection: !0
				},
				function() {
					a.zoom()
				})
			},
			zoom: function(a) {
				var b, c = this.pointer,
				f = !1,
				e; ! a || a.resetSelection ? (u(this.axes,
				function(a) {
					b = a.zoom()
				}), c.initiated = !1) : u(a.xAxis.concat(a.yAxis),
				function(a) {
					var d = a.axis;
					c[d.isXAxis ? "zoomX": "zoomY"] && (b = d.zoom(a.min, a.max), d.displayBtn && (f = !0))
				});
				e = this.resetZoomButton;
				f && !e ? this.showResetZoom() : !f && h(e) && (this.resetZoomButton = e.destroy());
				b && this.redraw(d(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
			},
			pan: function(a, b) {
				var c = this,
				d = c.hoverPoints,
				f;
				d && u(d,
				function(a) {
					a.setState()
				});
				u("xy" === b ? [1, 0] : [1],
				function(b) {
					b = c[b ? "xAxis": "yAxis"][0];
					var d = b.horiz,
					e = a[d ? "chartX": "chartY"],
					d = d ? "mouseDownX": "mouseDownY",
					h = c[d],
					g = (b.pointRange || 0) / 2,
					k = b.getExtremes(),
					l = b.toValue(h - e, !0) + g,
					m = b.toValue(h + b.len - e, !0) - g,
					n = m < l,
					h = n ? m: l,
					l = n ? l: m,
					m = Math.min(k.dataMin, g ? k.min: b.toValue(b.toPixels(k.min) - b.minPixelPadding)),
					g = Math.max(k.dataMax, g ? k.max: b.toValue(b.toPixels(k.max) + b.minPixelPadding)),
					n = m - h;
					0 < n && (l += n, h = m);
					n = l - g;
					0 < n && (l = g, h -= n);
					b.series.length && h !== k.min && l !== k.max && (b.setExtremes(h, l, !1, !1, {
						trigger: "pan"
					}), f = !0);
					c[d] = e
				});
				f && c.redraw(!1);
				e(c.container, {
					cursor: "move"
				})
			}
		});
		q(b.prototype, {
			select: function(a, b) {
				var c = this,
				e = c.series,
				h = e.chart;
				a = d(a, !c.selected);
				c.firePointEvent(a ? "select": "unselect", {
					accumulate: b
				},
				function() {
					c.selected = c.options.selected = a;
					e.options.data[f(c, e.data)] = c.options;
					c.setState(a && "select");
					b || u(h.getSelectedPoints(),
					function(a) {
						a.selected && a !== c && (a.selected = a.options.selected = !1, e.options.data[f(a, e.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
					})
				})
			},
			onMouseOver: function(a) {
				var b = this.series.chart,
				c = b.pointer;
				a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
				c.runPointActions(a, this)
			},
			onMouseOut: function() {
				var a = this.series.chart;
				this.firePointEvent("mouseOut");
				u(a.hoverPoints || [],
				function(a) {
					a.setState()
				});
				a.hoverPoints = a.hoverPoint = null
			},
			importEvents: function() {
				if (!this.hasImportedEvents) {
					var b = this,
					c = k(b.series.options.point, b.options).events;
					b.events = c;
					a.objectEach(c,
					function(a, c) {
						z(b, c, a)
					});
					this.hasImportedEvents = !0
				}
			},
			setState: function(a, b) {
				var c = Math.floor(this.plotX),
				f = this.plotY,
				e = this.series,
				h = e.options.states[a || "normal"] || {},
				g = t[e.type].marker && e.options.marker,
				k = g && !1 === g.enabled,
				l = g && g.states && g.states[a || "normal"] || {},
				m = !1 === l.enabled,
				n = e.stateMarkerGraphic,
				x = this.marker || {},
				u = e.chart,
				y = e.halo,
				C,
				z = g && e.markerAttribs;
				a = a || "";
				if (! (a === this.state && !b || this.selected && "select" !== a || !1 === h.enabled || a && (m || k && !1 === l.enabled) || a && x.states && x.states[a] && !1 === x.states[a].enabled)) {
					z && (C = e.markerAttribs(this, a));
					if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state),
					a && this.graphic.addClass("highcharts-point-" + a),
					this.graphic.animate(e.pointAttribs(this, a), d(u.options.chart.animation, h.animation)),
					C && this.graphic.animate(C, d(u.options.chart.animation, l.animation, g.animation)),
					n && n.hide();
					else {
						if (a && l) {
							g = x.symbol || e.symbol;
							n && n.currentSymbol !== g && (n = n.destroy());
							if (n) n[b ? "animate": "attr"]({
								x: C.x,
								y: C.y
							});
							else g && (e.stateMarkerGraphic = n = u.renderer.symbol(g, C.x, C.y, C.width, C.height).add(e.markerGroup), n.currentSymbol = g);
							n && n.attr(e.pointAttribs(this, a))
						}
						n && (n[a && u.isInsidePlot(c, f, u.inverted) ? "show": "hide"](), n.element.point = this)
					} (c = h.halo) && c.size ? (y || (e.halo = y = u.renderer.path().add((this.graphic || n).parentGroup)), y.show()[b ? "animate": "attr"]({
						d: this.haloPath(c.size)
					}), y.attr({
						"class": "highcharts-halo highcharts-color-" + d(this.colorIndex, e.colorIndex)
					}), y.point = this, y.attr(q({
						fill: this.color || e.color,
						"fill-opacity": c.opacity,
						zIndex: -1
					},
					c.attributes))) : y && y.point && y.point.haloPath && y.animate({
						d: y.point.haloPath(0)
					},
					null, y.hide);
					this.state = a;
					r(this, "afterSetState")
				}
			},
			haloPath: function(a) {
				return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
			}
		});
		q(c.prototype, {
			onMouseOver: function() {
				var a = this.chart,
				b = a.hoverSeries;
				if (b && b !== this) b.onMouseOut();
				this.options.events.mouseOver && r(this, "mouseOver");
				this.setState("hover");
				a.hoverSeries = this
			},
			onMouseOut: function() {
				var a = this.options,
				b = this.chart,
				c = b.tooltip,
				d = b.hoverPoint;
				b.hoverSeries = null;
				if (d) d.onMouseOut();
				this && a.events.mouseOut && r(this, "mouseOut"); ! c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
				this.setState()
			},
			setState: function(a) {
				var b = this,
				c = b.options,
				f = b.graph,
				e = c.states,
				h = c.lineWidth,
				c = 0;
				a = a || "";
				if (b.state !== a && (u([b.group, b.markerGroup, b.dataLabelsGroup],
				function(c) {
					c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
				}), b.state = a, !e[a] || !1 !== e[a].enabled) && (a && (h = e[a].lineWidth || h + (e[a].lineWidthPlus || 0)), f && !f.dashstyle)) for (h = {
					"stroke-width": h
				},
				f.animate(h, d(e[a || "normal"] && e[a || "normal"].animation, b.chart.options.chart.animation)); b["zone-graph-" + c];) b["zone-graph-" + c].attr(h),
				c += 1
			},
			setVisible: function(a, b) {
				var c = this,
				d = c.chart,
				f = c.legendItem,
				e, h = d.options.chart.ignoreHiddenSeries,
				g = c.visible;
				e = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !g: a) ? "show": "hide";
				u(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"],
				function(a) {
					if (c[a]) c[a][e]()
				});
				if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
				f && d.legend.colorizeItem(c, a);
				c.isDirty = !0;
				c.options.stacking && u(d.series,
				function(a) {
					a.options.stacking && a.visible && (a.isDirty = !0)
				});
				u(c.linkedSeries,
				function(b) {
					b.setVisible(a, !1)
				});
				h && (d.isDirtyBox = !0); ! 1 !== b && d.redraw();
				r(c, e)
			},
			show: function() {
				this.setVisible(!0)
			},
			hide: function() {
				this.setVisible(!1)
			},
			select: function(a) {
				this.selected = a = void 0 === a ? !this.selected: a;
				this.checkbox && (this.checkbox.checked = a);
				r(this, a ? "select": "unselect")
			},
			drawTracker: K.drawTrackerGraph
		})
	})(J); (function(a) {
		var z = a.Chart,
		B = a.each,
		y = a.inArray,
		e = a.isArray,
		g = a.isObject,
		t = a.pick,
		u = a.splat;
		z.prototype.setResponsive = function(e) {
			var g = this.options.responsive,
			m = [],
			f = this.currentResponsive;
			g && g.rules && B(g.rules,
			function(f) {
				void 0 === f._id && (f._id = a.uniqueKey());
				this.matchResponsiveRule(f, m, e)
			},
			this);
			var h = a.merge.apply(0, a.map(m,
			function(f) {
				return a.find(g.rules,
				function(a) {
					return a._id === f
				}).chartOptions
			})),
			m = m.toString() || void 0;
			m !== (f && f.ruleIds) && (f && this.update(f.undoOptions, e), m ? (this.currentResponsive = {
				ruleIds: m,
				mergedOptions: h,
				undoOptions: this.currentOptions(h)
			},
			this.update(h, e)) : this.currentResponsive = void 0)
		};
		z.prototype.matchResponsiveRule = function(a, e) {
			var g = a.condition; (g.callback ||
			function() {
				return this.chartWidth <= t(g.maxWidth, Number.MAX_VALUE) && this.chartHeight <= t(g.maxHeight, Number.MAX_VALUE) && this.chartWidth >= t(g.minWidth, 0) && this.chartHeight >= t(g.minHeight, 0)
			}).call(this) && e.push(a._id)
		};
		z.prototype.currentOptions = function(q) {
			function r(f, h, m, k) {
				var d;
				a.objectEach(f,
				function(a, c) {
					if (!k && -1 < y(c, ["series", "xAxis", "yAxis"])) for (a = u(a), m[c] = [], d = 0; d < a.length; d++) h[c][d] && (m[c][d] = {},
					r(a[d], h[c][d], m[c][d], k + 1));
					else g(a) ? (m[c] = e(a) ? [] : {},
					r(a, h[c] || {},
					m[c], k + 1)) : m[c] = h[c] || null
				})
			}
			var m = {};
			r(q, this.options, m, 0);
			return m
		}
	})(J); (function(a) {
		var z = a.Axis,
		B = a.each,
		y = a.pick;
		a = a.wrap;
		a(z.prototype, "getSeriesExtremes",
		function(a) {
			var e = this.isXAxis,
			t, u, q = [],
			r;
			e && B(this.series,
			function(a, f) {
				a.useMapGeometry && (q[f] = a.xData, a.xData = [])
			});
			a.call(this);
			e && (t = y(this.dataMin, Number.MAX_VALUE), u = y(this.dataMax, -Number.MAX_VALUE), B(this.series,
			function(a, f) {
				a.useMapGeometry && (t = Math.min(t, y(a.minX, t)), u = Math.max(u, y(a.maxX, u)), a.xData = q[f], r = !0)
			}), r && (this.dataMin = t, this.dataMax = u))
		});
		a(z.prototype, "setAxisTranslation",
		function(a) {
			var e = this.chart,
			t = e.plotWidth / e.plotHeight,
			e = e.xAxis[0],
			u;
			a.call(this);
			"yAxis" === this.coll && void 0 !== e.transA && B(this.series,
			function(a) {
				a.preserveAspectRatio && (u = !0)
			});
			if (u && (this.transA = e.transA = Math.min(this.transA, e.transA), a = t / ((e.max - e.min) / (this.max - this.min)), a = 1 > a ? this: e, t = (a.max - a.min) * a.transA, a.pixelPadding = a.len - t, a.minPixelPadding = a.pixelPadding / 2, t = a.fixTo)) {
				t = t[1] - a.toValue(t[0], !0);
				t *= a.transA;
				if (Math.abs(t) > a.minPixelPadding || a.min === a.dataMin && a.max === a.dataMax) t = 0;
				a.minPixelPadding -= t
			}
		});
		a(z.prototype, "render",
		function(a) {
			a.call(this);
			this.fixTo = null
		})
	})(J); (function(a) {
		var z = a.Axis,
		B = a.Chart,
		y = a.color,
		e, g = a.each,
		t = a.extend,
		u = a.isNumber,
		q = a.Legend,
		r = a.LegendSymbolMixin,
		m = a.noop,
		f = a.merge,
		h = a.pick,
		n = a.wrap;
		a.ColorAxis || (e = a.ColorAxis = function() {
			this.init.apply(this, arguments)
		},
		t(e.prototype, z.prototype), t(e.prototype, {
			defaultColorAxisOptions: {
				lineWidth: 0,
				minPadding: 0,
				maxPadding: 0,
				gridLineWidth: 1,
				tickPixelInterval: 72,
				startOnTick: !0,
				endOnTick: !0,
				offset: 0,
				marker: {
					animation: {
						duration: 50
					},
					width: .01,
					color: "#999999"
				},
				labels: {
					overflow: "justify",
					rotation: 0
				},
				minColor: "#e6ebf5",
				maxColor: "#003399",
				tickLength: 5,
				showInLegend: !0
			},
			keepProps: ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"].concat(z.prototype.keepProps),
			init: function(a, d) {
				var b = "vertical" !== a.options.legend.layout,
				c;
				this.coll = "colorAxis";
				c = f(this.defaultColorAxisOptions, {
					side: b ? 2 : 1,
					reversed: !b
				},
				d, {
					opposite: !b,
					showEmpty: !1,
					title: null,
					visible: a.options.legend.enabled
				});
				z.prototype.init.call(this, a, c);
				d.dataClasses && this.initDataClasses(d);
				this.initStops();
				this.horiz = b;
				this.zoomEnabled = !1;
				this.defaultLegendLength = 200
			},
			initDataClasses: function(a) {
				var d = this.chart,
				b, c = 0,
				e = d.options.chart.colorCount,
				h = this.options,
				k = a.dataClasses.length;
				this.dataClasses = b = [];
				this.legendItems = [];
				g(a.dataClasses,
				function(a, g) {
					a = f(a);
					b.push(a);
					a.color || ("category" === h.dataClassColor ? (g = d.options.colors, e = g.length, a.color = g[c], a.colorIndex = c, c++, c === e && (c = 0)) : a.color = y(h.minColor).tweenTo(y(h.maxColor), 2 > k ? .5 : g / (k - 1)))
				})
			},
			setTickPositions: function() {
				if (!this.dataClasses) return z.prototype.setTickPositions.call(this)
			},
			initStops: function() {
				this.stops = this.options.stops || [[0, this.options.minColor], [1, this.options.maxColor]];
				g(this.stops,
				function(a) {
					a.color = y(a[1])
				})
			},
			setOptions: function(a) {
				z.prototype.setOptions.call(this, a);
				this.options.crosshair = this.options.marker
			},
			setAxisSize: function() {
				var a = this.legendSymbol,
				d = this.chart,
				b = d.options.legend || {},
				c, f;
				a ? (this.left = b = a.attr("x"), this.top = c = a.attr("y"), this.width = f = a.attr("width"), this.height = a = a.attr("height"), this.right = d.chartWidth - b - f, this.bottom = d.chartHeight - c - a, this.len = this.horiz ? f: a, this.pos = this.horiz ? b: c) : this.len = (this.horiz ? b.symbolWidth: b.symbolHeight) || this.defaultLegendLength
			},
			normalizedValue: function(a) {
				this.isLog && (a = this.val2lin(a));
				return 1 - (this.max - a) / (this.max - this.min || 1)
			},
			toColor: function(a, d) {
				var b = this.stops,
				c, f, e = this.dataClasses,
				h, g;
				if (e) for (g = e.length; g--;) {
					if (h = e[g], c = h.from, b = h.to, (void 0 === c || a >= c) && (void 0 === b || a <= b)) {
						f = h.color;
						d && (d.dataClass = g, d.colorIndex = h.colorIndex);
						break
					}
				} else {
					a = this.normalizedValue(a);
					for (g = b.length; g--&&!(a > b[g][0]););
					c = b[g] || b[g + 1];
					b = b[g + 1] || c;
					a = 1 - (b[0] - a) / (b[0] - c[0] || 1);
					f = c.color.tweenTo(b.color, a)
				}
				return f
			},
			getOffset: function() {
				var a = this.legendGroup,
				d = this.chart.axisOffset[this.side];
				a && (this.axisParent = a, z.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = d)
			},
			setLegendColor: function() {
				var a, d = this.reversed;
				a = d ? 1 : 0;
				d = d ? 0 : 1;
				a = this.horiz ? [a, 0, d, 0] : [0, d, 0, a];
				this.legendColor = {
					linearGradient: {
						x1: a[0],
						y1: a[1],
						x2: a[2],
						y2: a[3]
					},
					stops: this.stops
				}
			},
			drawLegendSymbol: function(a, d) {
				var b = a.padding,
				c = a.options,
				f = this.horiz,
				e = h(c.symbolWidth, f ? this.defaultLegendLength: 12),
				g = h(c.symbolHeight, f ? 12 : this.defaultLegendLength),
				k = h(c.labelPadding, f ? 16 : 30),
				c = h(c.itemDistance, 10);
				this.setLegendColor();
				d.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, e, g).attr({
					zIndex: 1
				}).add(d.legendGroup);
				this.legendItemWidth = e + b + (f ? c: k);
				this.legendItemHeight = g + b + (f ? k: 0)
			},
			setState: function(a) {
				g(this.series,
				function(d) {
					d.setState(a)
				})
			},
			visible: !0,
			setVisible: m,
			getSeriesExtremes: function() {
				var a = this.series,
				d = a.length;
				this.dataMin = Infinity;
				for (this.dataMax = -Infinity; d--;) void 0 !== a[d].valueMin && (this.dataMin = Math.min(this.dataMin, a[d].valueMin), this.dataMax = Math.max(this.dataMax, a[d].valueMax))
			},
			drawCrosshair: function(a, d) {
				var b = d && d.plotX,
				c = d && d.plotY,
				f, e = this.pos,
				h = this.len;
				d && (f = this.toPixels(d[d.series.colorKey]), f < e ? f = e - 2 : f > e + h && (f = e + h + 2), d.plotX = f, d.plotY = this.len - f, z.prototype.drawCrosshair.call(this, a, d), d.plotX = b, d.plotY = c, this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, this.cross.attr({
					fill: this.crosshair.color
				})))
			},
			getPlotLinePath: function(a, d, b, c, f) {
				return u(f) ? this.horiz ? ["M", f - 4, this.top - 6, "L", f + 4, this.top - 6, f, this.top, "Z"] : ["M", this.left, f, "L", this.left - 6, f + 6, this.left - 6, f - 6, "Z"] : z.prototype.getPlotLinePath.call(this, a, d, b, c)
			},
			update: function(a, d) {
				var b = this.chart,
				c = b.legend;
				g(this.series,
				function(a) {
					a.isDirtyData = !0
				});
				a.dataClasses && c.allItems && (g(c.allItems,
				function(a) {
					a.isDataClass && a.legendGroup && a.legendGroup.destroy()
				}), b.isDirtyLegend = !0);
				b.options[this.coll] = f(this.userOptions, a);
				z.prototype.update.call(this, a, d);
				this.legendItem && (this.setLegendColor(), c.colorizeItem(this, !0))
			},
			remove: function() {
				this.legendItem && this.chart.legend.destroyItem(this);
				z.prototype.remove.call(this)
			},
			getDataClassLegendSymbols: function() {
				var f = this,
				d = this.chart,
				b = this.legendItems,
				c = d.options.legend,
				e = c.valueDecimals,
				h = c.valueSuffix || "",
				n;
				b.length || g(this.dataClasses,
				function(c, k) {
					var l = !0,
					q = c.from,
					u = c.to;
					n = "";
					void 0 === q ? n = "\x3c ": void 0 === u && (n = "\x3e ");
					void 0 !== q && (n += a.numberFormat(q, e) + h);
					void 0 !== q && void 0 !== u && (n += " - ");
					void 0 !== u && (n += a.numberFormat(u, e) + h);
					b.push(t({
						chart: d,
						name: n,
						options: {},
						drawLegendSymbol: r.drawRectangle,
						visible: !0,
						setState: m,
						isDataClass: !0,
						setVisible: function() {
							l = this.visible = !l;
							g(f.series,
							function(a) {
								g(a.points,
								function(a) {
									a.dataClass === k && a.setVisible(l)
								})
							});
							d.legend.colorizeItem(this, l)
						}
					},
					c))
				});
				return b
			},
			name: ""
		}), g(["fill", "stroke"],
		function(f) {
			a.Fx.prototype[f + "Setter"] = function() {
				this.elem.attr(f, y(this.start).tweenTo(y(this.end), this.pos), null, !0)
			}
		}), n(B.prototype, "getAxes",
		function(a) {
			var d = this.options.colorAxis;
			a.call(this);
			this.colorAxis = [];
			d && new e(this, d)
		}), n(q.prototype, "getAllItems",
		function(a) {
			var d = [],
			b = this.chart.colorAxis[0];
			b && b.options && (b.options.showInLegend && (b.options.dataClasses ? d = d.concat(b.getDataClassLegendSymbols()) : d.push(b)), g(b.series,
			function(a) {
				a.options.showInLegend = !1
			}));
			return d.concat(a.call(this))
		}), n(q.prototype, "colorizeItem",
		function(a, d, b) {
			a.call(this, d, b);
			b && d.legendColor && d.legendSymbol.attr({
				fill: d.legendColor
			})
		}), n(q.prototype, "update",
		function(a) {
			a.apply(this, [].slice.call(arguments, 1));
			this.chart.colorAxis[0] && this.chart.colorAxis[0].update({},
			arguments[2])
		}))
	})(J); (function(a) {
		var z = a.defined,
		B = a.each,
		y = a.noop,
		e = a.seriesTypes;
		a.colorPointMixin = {
			isValid: function() {
				return null !== this.value && Infinity !== this.value && -Infinity !== this.value
			},
			setVisible: function(a) {
				var e = this,
				g = a ? "show": "hide";
				B(["graphic", "dataLabel"],
				function(a) {
					if (e[a]) e[a][g]()
				})
			},
			setState: function(e) {
				a.Point.prototype.setState.call(this, e);
				this.graphic && this.graphic.attr({
					zIndex: "hover" === e ? 1 : 0
				})
			}
		};
		a.colorSeriesMixin = {
			pointArrayMap: ["value"],
			axisTypes: ["xAxis", "yAxis", "colorAxis"],
			optionalAxis: "colorAxis",
			trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
			getSymbol: y,
			parallelArrays: ["x", "y", "value"],
			colorKey: "value",
			pointAttribs: e.column.prototype.pointAttribs,
			translateColors: function() {
				var a = this,
				e = this.options.nullColor,
				u = this.colorAxis,
				q = this.colorKey;
				B(this.data,
				function(g) {
					var m = g[q];
					if (m = g.options.color || (g.isNull ? e: u && void 0 !== m ? u.toColor(m, g) : g.color || a.color)) g.color = m
				})
			},
			colorAttribs: function(a) {
				var e = {};
				z(a.color) && (e[this.colorProp || "fill"] = a.color);
				return e
			}
		}
	})(J); (function(a) {
		function z(a) {
			a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
		}
		function B(a) {
			this.init(a)
		}
		var y = a.addEvent,
		e = a.Chart,
		g = a.doc,
		t = a.each,
		u = a.extend,
		q = a.merge,
		r = a.pick,
		m = a.wrap;
		B.prototype.init = function(a) {
			this.chart = a;
			a.mapNavButtons = []
		};
		B.prototype.update = function(f) {
			var e = this.chart,
			g = e.options.mapNavigation,
			k, d, b, c, l, m = function(a) {
				this.handler.call(e, a);
				z(a)
			},
			t = e.mapNavButtons;
			f && (g = e.options.mapNavigation = q(e.options.mapNavigation, f));
			for (; t.length;) t.pop().destroy();
			r(g.enableButtons, g.enabled) && !e.renderer.forExport && a.objectEach(g.buttons,
			function(a, f) {
				k = q(g.buttonOptions, a);
				d = k.theme;
				d.style = q(k.theme.style, k.style);
				c = (b = d.states) && b.hover;
				l = b && b.select;
				a = e.renderer.button(k.text, 0, 0, m, d, c, l, 0, "zoomIn" === f ? "topbutton": "bottombutton").addClass("highcharts-map-navigation").attr({
					width: k.width,
					height: k.height,
					title: e.options.lang[f],
					padding: k.padding,
					zIndex: 5
				}).add();
				a.handler = k.onclick;
				a.align(u(k, {
					width: a.width,
					height: 2 * a.height
				}), null, k.alignTo);
				y(a.element, "dblclick", z);
				t.push(a)
			});
			this.updateEvents(g)
		};
		B.prototype.updateEvents = function(a) {
			var f = this.chart;
			r(a.enableDoubleClickZoom, a.enabled) || a.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || y(f.container, "dblclick",
			function(a) {
				f.pointer.onContainerDblClick(a)
			}) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick());
			r(a.enableMouseWheelZoom, a.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || y(f.container, void 0 === g.onmousewheel ? "DOMMouseScroll": "mousewheel",
			function(a) {
				f.pointer.onContainerMouseWheel(a);
				z(a);
				return ! 1
			}) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
		};
		u(e.prototype, {
			fitToBox: function(a, e) {
				t([["x", "width"], ["y", "height"]],
				function(f) {
					var h = f[0];
					f = f[1];
					a[h] + a[f] > e[h] + e[f] && (a[f] > e[f] ? (a[f] = e[f], a[h] = e[h]) : a[h] = e[h] + e[f] - a[f]);
					a[f] > e[f] && (a[f] = e[f]);
					a[h] < e[h] && (a[h] = e[h])
				});
				return a
			},
			mapZoom: function(a, e, g, k, d) {
				var b = this.xAxis[0],
				c = b.max - b.min,
				f = r(e, b.min + c / 2),
				h = c * a,
				c = this.yAxis[0],
				m = c.max - c.min,
				n = r(g, c.min + m / 2),
				m = m * a,
				f = this.fitToBox({
					x: f - h * (k ? (k - b.pos) / b.len: .5),
					y: n - m * (d ? (d - c.pos) / c.len: .5),
					width: h,
					height: m
				},
				{
					x: b.dataMin,
					y: c.dataMin,
					width: b.dataMax - b.dataMin,
					height: c.dataMax - c.dataMin
				}),
				h = f.x <= b.dataMin && f.width >= b.dataMax - b.dataMin && f.y <= c.dataMin && f.height >= c.dataMax - c.dataMin;
				k && (b.fixTo = [k - b.pos, e]);
				d && (c.fixTo = [d - c.pos, g]);
				void 0 === a || h ? (b.setExtremes(void 0, void 0, !1), c.setExtremes(void 0, void 0, !1)) : (b.setExtremes(f.x, f.x + f.width, !1), c.setExtremes(f.y, f.y + f.height, !1));
				this.redraw()
			}
		});
		m(e.prototype, "render",
		function(a) {
			this.mapNavigation = new B(this);
			this.mapNavigation.update();
			a.call(this)
		})
	})(J); (function(a) {
		var z = a.extend,
		B = a.pick,
		y = a.Pointer;
		a = a.wrap;
		z(y.prototype, {
			onContainerDblClick: function(a) {
				var e = this.chart;
				a = this.normalize(a);
				e.options.mapNavigation.enableDoubleClickZoomTo ? e.pointer.inClass(a.target, "highcharts-tracker") && e.hoverPoint && e.hoverPoint.zoomTo() : e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop) && e.mapZoom(.5, e.xAxis[0].toValue(a.chartX), e.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
			},
			onContainerMouseWheel: function(a) {
				var e = this.chart,
				t;
				a = this.normalize(a);
				t = a.detail || -(a.wheelDelta / 120);
				e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop) && e.mapZoom(Math.pow(e.options.mapNavigation.mouseWheelSensitivity, t), e.xAxis[0].toValue(a.chartX), e.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
			}
		});
		a(y.prototype, "zoomOption",
		function(a) {
			var e = this.chart.options.mapNavigation;
			B(e.enableTouchZoom, e.enabled) && (this.chart.options.chart.pinchType = "xy");
			a.apply(this, [].slice.call(arguments, 1))
		});
		a(y.prototype, "pinchTranslate",
		function(a, g, t, u, q, r, m) {
			a.call(this, g, t, u, q, r, m);
			"map" === this.chart.options.chart.type && this.hasZoom && (a = u.scaleX > u.scaleY, this.pinchTranslateDirection(!a, g, t, u, q, r, m, a ? u.scaleX: u.scaleY))
		})
	})(J); (function(a) {
		var z = a.colorPointMixin,
		B = a.each,
		y = a.extend,
		e = a.isNumber,
		g = a.map,
		t = a.merge,
		u = a.noop,
		q = a.pick,
		r = a.isArray,
		m = a.Point,
		f = a.Series,
		h = a.seriesType,
		n = a.seriesTypes,
		k = a.splat,
		d = void 0 !== a.doc.documentElement.style.vectorEffect;
		h("map", "scatter", {
			allAreas: !0,
			animation: !1,
			nullColor: "#f7f7f7",
			borderColor: "#cccccc",
			borderWidth: 1,
			marker: null,
			stickyTracking: !1,
			joinBy: "hc-key",
			dataLabels: {
				formatter: function() {
					return this.point.value
				},
				inside: !0,
				verticalAlign: "middle",
				crop: !1,
				overflow: !1,
				padding: 0
			},
			turboThreshold: 0,
			tooltip: {
				followPointer: !0,
				pointFormat: "{point.name}: {point.value}\x3cbr/\x3e"
			},
			states: {
				normal: {
					animation: !0
				},
				hover: {
					halo: null,
					brightness: .2
				},
				select: {
					color: "#cccccc"
				}
			}
		},
		t(a.colorSeriesMixin, {
			type: "map",
			getExtremesFromAll: !0,
			useMapGeometry: !0,
			forceDL: !0,
			searchPoint: u,
			directTouch: !0,
			preserveAspectRatio: !0,
			pointArrayMap: ["value"],
			getBox: function(b) {
				var c = Number.MAX_VALUE,
				d = -c,
				f = c,
				h = -c,
				g = c,
				k = c,
				m = this.xAxis,
				n = this.yAxis,
				r;
				B(b || [],
				function(b) {
					if (b.path) {
						"string" === typeof b.path && (b.path = a.splitPath(b.path));
						var l = b.path || [],
						m = l.length,
						n = !1,
						p = -c,
						t = c,
						u = -c,
						v = c,
						x = b.properties;
						if (!b._foundBox) {
							for (; m--;) e(l[m]) && (n ? (p = Math.max(p, l[m]), t = Math.min(t, l[m])) : (u = Math.max(u, l[m]), v = Math.min(v, l[m])), n = !n);
							b._midX = t + (p - t) * q(b.middleX, x && x["hc-middle-x"], .5);
							b._midY = v + (u - v) * q(b.middleY, x && x["hc-middle-y"], .5);
							b._maxX = p;
							b._minX = t;
							b._maxY = u;
							b._minY = v;
							b.labelrank = q(b.labelrank, (p - t) * (u - v));
							b._foundBox = !0
						}
						d = Math.max(d, b._maxX);
						f = Math.min(f, b._minX);
						h = Math.max(h, b._maxY);
						g = Math.min(g, b._minY);
						k = Math.min(b._maxX - b._minX, b._maxY - b._minY, k);
						r = !0
					}
				});
				r && (this.minY = Math.min(g, q(this.minY, c)), this.maxY = Math.max(h, q(this.maxY, -c)), this.minX = Math.min(f, q(this.minX, c)), this.maxX = Math.max(d, q(this.maxX, -c)), m && void 0 === m.options.minRange && (m.minRange = Math.min(5 * k, (this.maxX - this.minX) / 5, m.minRange || c)), n && void 0 === n.options.minRange && (n.minRange = Math.min(5 * k, (this.maxY - this.minY) / 5, n.minRange || c)))
			},
			getExtremes: function() {
				f.prototype.getExtremes.call(this, this.valueData);
				this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
				this.valueMin = this.dataMin;
				this.valueMax = this.dataMax;
				this.dataMin = this.minY;
				this.dataMax = this.maxY
			},
			translatePath: function(a) {
				var b = !1,
				d = this.xAxis,
				f = this.yAxis,
				h = d.min,
				g = d.transA,
				d = d.minPixelPadding,
				k = f.min,
				m = f.transA,
				f = f.minPixelPadding,
				n, r = [];
				if (a) for (n = a.length; n--;) e(a[n]) ? (r[n] = b ? (a[n] - h) * g + d: (a[n] - k) * m + f, b = !b) : r[n] = a[n];
				return r
			},
			setData: function(b, c, d, h) {
				var m = this.options,
				l = this.chart.options.chart,
				n = l && l.map,
				q = m.mapData,
				u = m.joinBy,
				w = null === u,
				y = m.keys || this.pointArrayMap,
				z = [],
				C = {},
				E = this.chart.mapTransforms; ! q && n && (q = "string" === typeof n ? a.maps[n] : n);
				w && (u = "_i");
				u = this.joinBy = k(u);
				u[1] || (u[1] = u[0]);
				b && B(b,
				function(a, c) {
					var d = 0;
					if (e(a)) b[c] = {
						value: a
					};
					else if (r(a)) {
						b[c] = {}; ! m.keys && a.length > y.length && "string" === typeof a[0] && (b[c]["hc-key"] = a[0], ++d);
						for (var f = 0; f < y.length; ++f, ++d) y[f] && (b[c][y[f]] = a[d])
					}
					w && (b[c]._i = c)
				});
				this.getBox(b); (this.chart.mapTransforms = E = l && l.mapTransforms || q && q["hc-transform"] || E) && a.objectEach(E,
				function(a) {
					a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation))
				});
				if (q) {
					"FeatureCollection" === q.type && (this.mapTitle = q.title, q = a.geojson(q, this.type, this));
					this.mapData = q;
					this.mapMap = {};
					for (E = 0; E < q.length; E++) l = q[E],
					n = l.properties,
					l._i = E,
					u[0] && n && n[u[0]] && (l[u[0]] = n[u[0]]),
					C[l[u[0]]] = l;
					this.mapMap = C;
					b && u[1] && B(b,
					function(a) {
						C[a[u[1]]] && z.push(C[a[u[1]]])
					});
					m.allAreas ? (this.getBox(q), b = b || [], u[1] && B(b,
					function(a) {
						z.push(a[u[1]])
					}), z = "|" + g(z,
					function(a) {
						return a && a[u[0]]
					}).join("|") + "|", B(q,
					function(a) {
						u[0] && -1 !== z.indexOf("|" + a[u[0]] + "|") || (b.push(t(a, {
							value: null
						})), h = !1)
					})) : this.getBox(z)
				}
				f.prototype.setData.call(this, b, c, d, h)
			},
			drawGraph: u,
			drawDataLabels: u,
			doFullTranslate: function() {
				return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans
			},
			translate: function() {
				var a = this,
				c = a.xAxis,
				d = a.yAxis,
				f = a.doFullTranslate();
				a.generatePoints();
				B(a.data,
				function(b) {
					b.plotX = c.toPixels(b._midX, !0);
					b.plotY = d.toPixels(b._midY, !0);
					f && (b.shapeType = "path", b.shapeArgs = {
						d: a.translatePath(b.path)
					})
				});
				a.translateColors()
			},
			pointAttribs: function(a, c) {
				a = n.column.prototype.pointAttribs.call(this, a, c);
				d ? a["vector-effect"] = "non-scaling-stroke": a["stroke-width"] = "inherit";
				return a
			},
			drawPoints: function() {
				var a = this,
				c = a.xAxis,
				f = a.yAxis,
				e = a.group,
				h = a.chart,
				g = h.renderer,
				k, m, r, q, t = this.baseTrans,
				u, y, z, p, F;
				a.transformGroup || (a.transformGroup = g.g().attr({
					scaleX: 1,
					scaleY: 1
				}).add(e), a.transformGroup.survive = !0);
				a.doFullTranslate() ? (h.hasRendered && B(a.points,
				function(b) {
					b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill)
				}), a.group = a.transformGroup, n.column.prototype.drawPoints.apply(a), a.group = e, B(a.points,
				function(a) {
					a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(/ /g, "-").toLowerCase()), a.properties && a.properties["hc-key"] && a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase()))
				}), this.baseTrans = {
					originX: c.min - c.minPixelPadding / c.transA,
					originY: f.min - f.minPixelPadding / f.transA + (f.reversed ? 0 : f.len / f.transA),
					transAX: c.transA,
					transAY: f.transA
				},
				this.transformGroup.animate({
					translateX: 0,
					translateY: 0,
					scaleX: 1,
					scaleY: 1
				})) : (k = c.transA / t.transAX, m = f.transA / t.transAY, r = c.toPixels(t.originX, !0), q = f.toPixels(t.originY, !0), .99 < k && 1.01 > k && .99 < m && 1.01 > m && (m = k = 1, r = Math.round(r), q = Math.round(q)), u = this.transformGroup, h.renderer.globalAnimation ? (y = u.attr("translateX"), z = u.attr("translateY"), p = u.attr("scaleX"), F = u.attr("scaleY"), u.attr({
					animator: 0
				}).animate({
					animator: 1
				},
				{
					step: function(a, b) {
						u.attr({
							translateX: y + (r - y) * b.pos,
							translateY: z + (q - z) * b.pos,
							scaleX: p + (k - p) * b.pos,
							scaleY: F + (m - F) * b.pos
						})
					}
				})) : u.attr({
					translateX: r,
					translateY: q,
					scaleX: k,
					scaleY: m
				}));
				d || a.group.element.setAttribute("stroke-width", a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"] / (k || 1));
				this.drawMapDataLabels()
			},
			drawMapDataLabels: function() {
				f.prototype.drawDataLabels.call(this);
				this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
			},
			render: function() {
				var a = this,
				c = f.prototype.render;
				a.chart.renderer.isVML && 3E3 < a.data.length ? setTimeout(function() {
					c.call(a)
				}) : c.call(a)
			},
			animate: function(a) {
				var b = this.options.animation,
				d = this.group,
				f = this.xAxis,
				e = this.yAxis,
				h = f.pos,
				g = e.pos;
				this.chart.renderer.isSVG && (!0 === b && (b = {
					duration: 1E3
				}), a ? d.attr({
					translateX: h + f.len / 2,
					translateY: g + e.len / 2,
					scaleX: .001,
					scaleY: .001
				}) : (d.animate({
					translateX: h,
					translateY: g,
					scaleX: 1,
					scaleY: 1
				},
				b), this.animate = null))
			},
			animateDrilldown: function(a) {
				var b = this.chart.plotBox,
				d = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
				f = d.bBox,
				e = this.chart.options.drilldown.animation;
				a || (a = Math.min(f.width / b.width, f.height / b.height), d.shapeArgs = {
					scaleX: a,
					scaleY: a,
					translateX: f.x,
					translateY: f.y
				},
				B(this.points,
				function(a) {
					a.graphic && a.graphic.attr(d.shapeArgs).animate({
						scaleX: 1,
						scaleY: 1,
						translateX: 0,
						translateY: 0
					},
					e)
				}), this.animate = null)
			},
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
			animateDrillupFrom: function(a) {
				n.column.prototype.animateDrillupFrom.call(this, a)
			},
			animateDrillupTo: function(a) {
				n.column.prototype.animateDrillupTo.call(this, a)
			}
		}), y({
			applyOptions: function(a, c) {
				a = m.prototype.applyOptions.call(this, a, c);
				c = this.series;
				var b = c.joinBy;
				c.mapData && ((b = void 0 !== a[b[1]] && c.mapMap[a[b[1]]]) ? (c.xyFromShape && (a.x = b._midX, a.y = b._midY), y(a, b)) : a.value = a.value || null);
				return a
			},
			onMouseOver: function(a) {
				clearTimeout(this.colorInterval);
				if (null !== this.value || this.series.options.nullInteraction) m.prototype.onMouseOver.call(this, a);
				else this.series.onMouseOut(a)
			},
			zoomTo: function() {
				var a = this.series;
				a.xAxis.setExtremes(this._minX, this._maxX, !1);
				a.yAxis.setExtremes(this._minY, this._maxY, !1);
				a.chart.redraw()
			}
		},
		z))
	})(J); (function(a) {
		var z = a.seriesType,
		B = a.seriesTypes;
		z("mapline", "map", {
			lineWidth: 1,
			fillColor: "none"
		},
		{
			type: "mapline",
			colorProp: "stroke",
			pointAttrToOptions: {
				stroke: "color",
				"stroke-width": "lineWidth"
			},
			pointAttribs: function(a, e) {
				a = B.map.prototype.pointAttribs.call(this, a, e);
				a.fill = this.options.fillColor;
				return a
			},
			drawLegendSymbol: B.line.prototype.drawLegendSymbol
		})
	})(J); (function(a) {
		var z = a.merge,
		B = a.Point;
		a = a.seriesType;
		a("mappoint", "scatter", {
			dataLabels: {
				enabled: !0,
				formatter: function() {
					return this.point.name
				},
				crop: !1,
				defer: !1,
				overflow: !1,
				style: {
					color: "#000000"
				}
			}
		},
		{
			type: "mappoint",
			forceDL: !0
		},
		{
			applyOptions: function(a, e) {
				a = void 0 !== a.lat && void 0 !== a.lon ? z(a, this.series.chart.fromLatLonToPoint(a)) : a;
				return B.prototype.applyOptions.call(this, a, e)
			}
		})
	})(J); (function(a) {
		var z = a.arrayMax,
		B = a.arrayMin,
		y = a.Axis,
		e = a.color,
		g = a.each,
		t = a.isNumber,
		u = a.noop,
		q = a.pick,
		r = a.pInt,
		m = a.Point,
		f = a.Series,
		h = a.seriesType,
		n = a.seriesTypes;
		h("bubble", "scatter", {
			dataLabels: {
				formatter: function() {
					return this.point.z
				},
				inside: !0,
				verticalAlign: "middle"
			},
			marker: {
				lineColor: null,
				lineWidth: 1,
				fillOpacity: .5,
				radius: null,
				states: {
					hover: {
						radiusPlus: 0
					}
				},
				symbol: "circle"
			},
			minSize: 8,
			maxSize: "20%",
			softThreshold: !1,
			states: {
				hover: {
					halo: {
						size: 5
					}
				}
			},
			tooltip: {
				pointFormat: "({point.x}, {point.y}), Size: {point.z}"
			},
			turboThreshold: 0,
			zThreshold: 0,
			zoneAxis: "z"
		},
		{
			pointArrayMap: ["y", "z"],
			parallelArrays: ["x", "y", "z"],
			trackerGroups: ["group", "dataLabelsGroup"],
			specialGroup: "group",
			bubblePadding: !0,
			zoneAxis: "z",
			directTouch: !0,
			pointAttribs: function(a, d) {
				var b = this.options.marker.fillOpacity;
				a = f.prototype.pointAttribs.call(this, a, d);
				1 !== b && (a.fill = e(a.fill).setOpacity(b).get("rgba"));
				return a
			},
			getRadii: function(a, d, b, c) {
				var f, e, h, g = this.zData,
				k = [],
				m = this.options,
				n = "width" !== m.sizeBy,
				r = m.zThreshold,
				q = d - a;
				e = 0;
				for (f = g.length; e < f; e++) h = g[e],
				m.sizeByAbsoluteValue && null !== h && (h = Math.abs(h - r), d = Math.max(d - r, Math.abs(a - r)), a = 0),
				null === h ? h = null: h < a ? h = b / 2 - 1 : (h = 0 < q ? (h - a) / q: .5, n && 0 <= h && (h = Math.sqrt(h)), h = Math.ceil(b + h * (c - b)) / 2),
				k.push(h);
				this.radii = k
			},
			animate: function(a) {
				var d = this.options.animation;
				a || (g(this.points,
				function(a) {
					var b = a.graphic,
					f;
					b && b.width && (f = {
						x: b.x,
						y: b.y,
						width: b.width,
						height: b.height
					},
					b.attr({
						x: a.plotX,
						y: a.plotY,
						width: 1,
						height: 1
					}), b.animate(f, d))
				}), this.animate = null)
			},
			translate: function() {
				var f, d = this.data,
				b, c, e = this.radii;
				n.scatter.prototype.translate.call(this);
				for (f = d.length; f--;) b = d[f],
				c = e ? e[f] : 0,
				t(c) && c >= this.minPxSize / 2 ? (b.marker = a.extend(b.marker, {
					radius: c,
					width: 2 * c,
					height: 2 * c
				}), b.dlBox = {
					x: b.plotX - c,
					y: b.plotY - c,
					width: 2 * c,
					height: 2 * c
				}) : b.shapeArgs = b.plotY = b.dlBox = void 0
			},
			alignDataLabel: n.column.prototype.alignDataLabel,
			buildKDTree: u,
			applyZones: u
		},
		{
			haloPath: function(a) {
				return m.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a)
			},
			ttBelow: !1
		});
		y.prototype.beforePadding = function() {
			var a = this,
			d = this.len,
			b = this.chart,
			c = 0,
			f = d,
			e = this.isXAxis,
			h = e ? "xData": "yData",
			m = this.min,
			n = {},
			u = Math.min(b.plotWidth, b.plotHeight),
			v = Number.MAX_VALUE,
			w = -Number.MAX_VALUE,
			y = this.max - m,
			H = d / y,
			I = [];
			g(this.series,
			function(c) {
				var d = c.options; ! c.bubblePadding || !c.visible && b.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, I.push(c), e && (g(["minSize", "maxSize"],
				function(a) {
					var b = d[a],
					c = /%$/.test(b),
					b = r(b);
					n[a] = c ? u * b / 100 : b
				}), c.minPxSize = n.minSize, c.maxPxSize = Math.max(n.maxSize, n.minSize), c = c.zData, c.length && (v = q(d.zMin, Math.min(v, Math.max(B(c), !1 === d.displayNegative ? d.zThreshold: -Number.MAX_VALUE))), w = q(d.zMax, Math.max(w, z(c))))))
			});
			g(I,
			function(b) {
				var d = b[h],
				g = d.length,
				k;
				e && b.getRadii(v, w, b.minPxSize, b.maxPxSize);
				if (0 < y) for (; g--;) t(d[g]) && a.dataMin <= d[g] && d[g] <= a.dataMax && (k = b.radii[g], c = Math.min((d[g] - m) * H - k, c), f = Math.max((d[g] - m) * H + k, f))
			});
			I.length && 0 < y && !this.isLog && (f -= d, H *= (d + c - f) / d, g([["min", "userMin", c], ["max", "userMax", f]],
			function(b) {
				void 0 === q(a.options[b[0]], a[b[1]]) && (a[b[0]] += b[2] / H)
			}))
		}
	})(J); (function(a) {
		var z = a.merge,
		B = a.Point,
		y = a.seriesType,
		e = a.seriesTypes;
		e.bubble && y("mapbubble", "bubble", {
			animationLimit: 500,
			tooltip: {
				pointFormat: "{point.name}: {point.z}"
			}
		},
		{
			xyFromShape: !0,
			type: "mapbubble",
			pointArrayMap: ["z"],
			getMapData: e.map.prototype.getMapData,
			getBox: e.map.prototype.getBox,
			setData: e.map.prototype.setData
		},
		{
			applyOptions: function(a, t) {
				return a && void 0 !== a.lat && void 0 !== a.lon ? B.prototype.applyOptions.call(this, z(a, this.series.chart.fromLatLonToPoint(a)), t) : e.map.prototype.pointClass.prototype.applyOptions.call(this, a, t)
			},
			isValid: function() {
				return "number" === typeof this.z
			},
			ttBelow: !1
		})
	})(J); (function(a) {
		var z = a.colorPointMixin,
		B = a.each,
		y = a.merge,
		e = a.noop,
		g = a.pick,
		t = a.Series,
		u = a.seriesType,
		q = a.seriesTypes;
		u("heatmap", "scatter", {
			animation: !1,
			borderWidth: 0,
			nullColor: "#f7f7f7",
			dataLabels: {
				formatter: function() {
					return this.point.value
				},
				inside: !0,
				verticalAlign: "middle",
				crop: !1,
				overflow: !1,
				padding: 0
			},
			marker: null,
			pointRange: null,
			tooltip: {
				pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e"
			},
			states: {
				hover: {
					halo: !1,
					brightness: .2
				}
			}
		},
		y(a.colorSeriesMixin, {
			pointArrayMap: ["y", "value"],
			hasPointSpecificOptions: !0,
			getExtremesFromAll: !0,
			directTouch: !0,
			init: function() {
				var a;
				q.scatter.prototype.init.apply(this, arguments);
				a = this.options;
				a.pointRange = g(a.pointRange, a.colsize || 1);
				this.yAxis.axisPointRange = a.rowsize || 1
			},
			translate: function() {
				var a = this.options,
				e = this.xAxis,
				f = this.yAxis,
				h = a.pointPadding || 0,
				n = function(a, d, b) {
					return Math.min(Math.max(d, a), b)
				};
				this.generatePoints();
				B(this.points,
				function(k) {
					var d = (a.colsize || 1) / 2,
					b = (a.rowsize || 1) / 2,
					c = n(Math.round(e.len - e.translate(k.x - d, 0, 1, 0, 1)), -e.len, 2 * e.len),
					d = n(Math.round(e.len - e.translate(k.x + d, 0, 1, 0, 1)), -e.len, 2 * e.len),
					m = n(Math.round(f.translate(k.y - b, 0, 1, 0, 1)), -f.len, 2 * f.len),
					b = n(Math.round(f.translate(k.y + b, 0, 1, 0, 1)), -f.len, 2 * f.len),
					r = g(k.pointPadding, h);
					k.plotX = k.clientX = (c + d) / 2;
					k.plotY = (m + b) / 2;
					k.shapeType = "rect";
					k.shapeArgs = {
						x: Math.min(c, d) + r,
						y: Math.min(m, b) + r,
						width: Math.abs(d - c) - 2 * r,
						height: Math.abs(b - m) - 2 * r
					}
				});
				this.translateColors()
			},
			drawPoints: function() {
				q.column.prototype.drawPoints.call(this);
				B(this.points,
				function(a) {
					a.graphic.attr(this.colorAttribs(a))
				},
				this)
			},
			animate: e,
			getBox: e,
			drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
			alignDataLabel: q.column.prototype.alignDataLabel,
			getExtremes: function() {
				t.prototype.getExtremes.call(this, this.valueData);
				this.valueMin = this.dataMin;
				this.valueMax = this.dataMax;
				t.prototype.getExtremes.call(this)
			}
		}), a.extend({
			haloPath: function(a) {
				if (!a) return [];
				var e = this.shapeArgs;
				return ["M", e.x - a, e.y - a, "L", e.x - a, e.y + e.height + a, e.x + e.width + a, e.y + e.height + a, e.x + e.width + a, e.y - a, "Z"]
			}
		},
		z))
	})(J); (function(a) {
		function z(a, e) {
			var f, h, g, k = !1,
			d = a.x,
			b = a.y;
			a = 0;
			for (f = e.length - 1; a < e.length; f = a++) h = e[a][1] > b,
			g = e[f][1] > b,
			h !== g && d < (e[f][0] - e[a][0]) * (b - e[a][1]) / (e[f][1] - e[a][1]) + e[a][0] && (k = !k);
			return k
		}
		var B = a.Chart,
		y = a.each,
		e = a.extend,
		g = a.format,
		t = a.merge,
		u = a.win,
		q = a.wrap;
		B.prototype.transformFromLatLon = function(e, g) {
			if (void 0 === u.proj4) return a.error(21),
			{
				x: 0,
				y: null
			};
			e = u.proj4(g.crs, [e.lon, e.lat]);
			var f = g.cosAngle || g.rotation && Math.cos(g.rotation),
			h = g.sinAngle || g.rotation && Math.sin(g.rotation);
			e = g.rotation ? [e[0] * f + e[1] * h, -e[0] * h + e[1] * f] : e;
			return {
				x: ((e[0] - (g.xoffset || 0)) * (g.scale || 1) + (g.xpan || 0)) * (g.jsonres || 1) + (g.jsonmarginX || 0),
				y: (((g.yoffset || 0) - e[1]) * (g.scale || 1) + (g.ypan || 0)) * (g.jsonres || 1) - (g.jsonmarginY || 0)
			}
		};
		B.prototype.transformToLatLon = function(e, g) {
			if (void 0 === u.proj4) a.error(21);
			else {
				e = {
					x: ((e.x - (g.jsonmarginX || 0)) / (g.jsonres || 1) - (g.xpan || 0)) / (g.scale || 1) + (g.xoffset || 0),
					y: (( - e.y - (g.jsonmarginY || 0)) / (g.jsonres || 1) + (g.ypan || 0)) / (g.scale || 1) + (g.yoffset || 0)
				};
				var f = g.cosAngle || g.rotation && Math.cos(g.rotation),
				h = g.sinAngle || g.rotation && Math.sin(g.rotation);
				g = u.proj4(g.crs, "WGS84", g.rotation ? {
					x: e.x * f + e.y * -h,
					y: e.x * h + e.y * f
				}: e);
				return {
					lat: g.y,
					lon: g.x
				}
			}
		};
		B.prototype.fromPointToLatLon = function(e) {
			var g = this.mapTransforms,
			f;
			if (g) {
				for (f in g) if (g.hasOwnProperty(f) && g[f].hitZone && z({
					x: e.x,
					y: -e.y
				},
				g[f].hitZone.coordinates[0])) return this.transformToLatLon(e, g[f]);
				return this.transformToLatLon(e, g["default"])
			}
			a.error(22)
		};
		B.prototype.fromLatLonToPoint = function(e) {
			var g = this.mapTransforms,
			f, h;
			if (!g) return a.error(22),
			{
				x: 0,
				y: null
			};
			for (f in g) if (g.hasOwnProperty(f) && g[f].hitZone && (h = this.transformFromLatLon(e, g[f]), z({
				x: h.x,
				y: -h.y
			},
			g[f].hitZone.coordinates[0]))) return h;
			return this.transformFromLatLon(e, g["default"])
		};
		a.geojson = function(a, m, f) {
			var h = [],
			n = [],
			k = function(a) {
				var b, c = a.length;
				n.push("M");
				for (b = 0; b < c; b++) 1 === b && n.push("L"),
				n.push(a[b][0], -a[b][1])
			};
			m = m || "map";
			y(a.features,
			function(a) {
				var b = a.geometry,
				c = b.type,
				b = b.coordinates;
				a = a.properties;
				var d;
				n = [];
				"map" === m || "mapbubble" === m ? ("Polygon" === c ? (y(b, k), n.push("Z")) : "MultiPolygon" === c && (y(b,
				function(a) {
					y(a, k)
				}), n.push("Z")), n.length && (d = {
					path: n
				})) : "mapline" === m ? ("LineString" === c ? k(b) : "MultiLineString" === c && y(b, k), n.length && (d = {
					path: n
				})) : "mappoint" === m && "Point" === c && (d = {
					x: b[0],
					y: -b[1]
				});
				d && h.push(e(d, {
					name: a.name || a.NAME,
					properties: a
				}))
			});
			f && a.copyrightShort && (f.chart.mapCredits = g(f.chart.options.credits.mapText, {
				geojson: a
			}), f.chart.mapCreditsFull = g(f.chart.options.credits.mapTextFull, {
				geojson: a
			}));
			return h
		};
		q(B.prototype, "addCredits",
		function(a, e) {
			e = t(!0, this.options.credits, e);
			this.mapCredits && (e.href = null);
			a.call(this, e);
			this.credits && this.mapCreditsFull && this.credits.attr({
				title: this.mapCreditsFull
			})
		})
	})(J); (function(a) {
		function z(a, e, g, k, d, b, c, l) {
			return ["M", a + d, e, "L", a + g - b, e, "C", a + g - b / 2, e, a + g, e + b / 2, a + g, e + b, "L", a + g, e + k - c, "C", a + g, e + k - c / 2, a + g - c / 2, e + k, a + g - c, e + k, "L", a + l, e + k, "C", a + l / 2, e + k, a, e + k - l / 2, a, e + k - l, "L", a, e + d, "C", a, e + d / 2, a + d / 2, e, a + d, e, "Z"]
		}
		var B = a.Chart,
		y = a.defaultOptions,
		e = a.each,
		g = a.extend,
		t = a.merge,
		u = a.pick,
		q = a.Renderer,
		r = a.SVGRenderer,
		m = a.VMLRenderer;
		g(y.lang, {
			zoomIn: "Zoom in",
			zoomOut: "Zoom out"
		});
		y.mapNavigation = {
			buttonOptions: {
				alignTo: "plotBox",
				align: "left",
				verticalAlign: "top",
				x: 0,
				width: 18,
				height: 18,
				padding: 5,
				style: {
					fontSize: "15px",
					fontWeight: "bold"
				},
				theme: {
					"stroke-width": 1,
					"text-align": "center"
				}
			},
			buttons: {
				zoomIn: {
					onclick: function() {
						this.mapZoom(.5)
					},
					text: "+",
					y: 0
				},
				zoomOut: {
					onclick: function() {
						this.mapZoom(2)
					},
					text: "-",
					y: 28
				}
			},
			mouseWheelSensitivity: 1.1
		};
		a.splitPath = function(a) {
			var e;
			a = a.replace(/([A-Za-z])/g, " $1 ");
			a = a.replace(/^\s*/, "").replace(/\s*$/, "");
			a = a.split(/[ ,]+/);
			for (e = 0; e < a.length; e++) / [a - zA - Z] / .test(a[e]) || (a[e] = parseFloat(a[e]));
			return a
		};
		a.maps = {};
		r.prototype.symbols.topbutton = function(a, e, g, k, d) {
			return z(a - 1, e - 1, g, k, d.r, d.r, 0, 0)
		};
		r.prototype.symbols.bottombutton = function(a, e, g, k, d) {
			return z(a - 1, e - 1, g, k, 0, 0, d.r, d.r)
		};
		q === m && e(["topbutton", "bottombutton"],
		function(a) {
			m.prototype.symbols[a] = r.prototype.symbols[a]
		});
		a.Map = a.mapChart = function(e, g, m) {
			var f = "string" === typeof e || e.nodeName,
			d = arguments[f ? 1 : 0],
			b = {
				endOnTick: !1,
				visible: !1,
				minPadding: 0,
				maxPadding: 0,
				startOnTick: !1
			},
			c,
			h = a.getOptions().credits;
			c = d.series;
			d.series = null;
			d = t({
				chart: {
					panning: "xy",
					type: "map"
				},
				credits: {
					mapText: u(h.mapText, ' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'),
					mapTextFull: u(h.mapTextFull, "{geojson.copyright}")
				},
				tooltip: {
					followTouchMove: !1
				},
				xAxis: b,
				yAxis: t(b, {
					reversed: !0
				})
			},
			d, {
				chart: {
					inverted: !1,
					alignTicks: !1
				}
			});
			d.series = c;
			return f ? new B(e, d, m) : new B(d, g)
		}
	})(J);
	return J
});