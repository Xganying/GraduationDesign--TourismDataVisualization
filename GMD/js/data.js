/*
 Highcharts JS v6.0.7 (2018-02-16)
 Data module

 (c) 2012-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(y) {
	"object" === typeof module && module.exports ? module.exports = y: y(Highcharts)
})(function(y) { (function(m) {
		var y = m.win.document,
		w = m.each,
		E = m.objectEach,
		F = m.pick,
		B = m.inArray,
		C = m.isNumber,
		G = m.splat,
		H = m.fireEvent,
		D, r;
		D = Array.prototype.some ?
		function(a, b, c) {
			Array.prototype.some.call(a, b, c)
		}: function(a, b, c) {
			for (var f = 0,
			e = a.length; f < e && !0 !== b.call(c, a[f], f, a); f++);
		};
		m.ajax = function(a) {
			var b = m.merge(!0, {
				url: !1,
				type: "GET",
				dataType: "json",
				success: !1,
				error: !1,
				data: !1,
				headers: {}
			},
			a);
			a = {
				json: "application/json",
				xml: "application/xml",
				text: "text/plain",
				octet: "application/octet-stream"
			};
			var c = new XMLHttpRequest;
			if (!b.url) return ! 1;
			c.open(b.type.toUpperCase(), b.url, !0);
			c.setRequestHeader("Content-Type", a[b.dataType] || a.text);
			m.objectEach(b.headers,
			function(a, b) {
				c.setRequestHeader(b, a)
			});
			c.onreadystatechange = function() {
				var a;
				if (4 === c.readyState) {
					if (200 === c.status) {
						a = c.responseText;
						if ("json" === b.dataType) try {
							a = JSON.parse(a)
						} catch(e) {
							b.error && b.error(c, e);
							return
						}
						return b.success && b.success(a)
					}
					b.error && b.error(c, c.responseText)
				}
			};
			try {
				b.data = JSON.stringify(b.data)
			} catch(f) {}
			c.send(b.data || !0)
		};
		var A = function(a, b) {
			this.init(a, b)
		};
		m.extend(A.prototype, {
			init: function(a, b) {
				var c = a.decimalPoint;
				"." !== c && "," !== c && (c = void 0);
				this.options = a;
				this.chartOptions = b;
				this.columns = a.columns || this.rowsToColumns(a.rows) || [];
				this.firstRowAsNames = F(a.firstRowAsNames, !0);
				this.decimalRegex = c && new RegExp("^(-?[0-9]+)" + c + "([0-9]+)$");
				this.rawColumns = [];
				this.columns.length ? this.dataFound() : (this.parseCSV(), this.parseTable(), this.parseGoogleSpreadsheet())
			},
			getColumnDistribution: function() {
				var a = this.chartOptions,
				b = this.options,
				c = [],
				f = function(a) {
					return (m.seriesTypes[a || "line"].prototype.pointArrayMap || [0]).length
				},
				e = a && a.chart && a.chart.type,
				d = [],
				k = [],
				l = 0,
				g;
				w(a && a.series || [],
				function(a) {
					d.push(f(a.type || e))
				});
				w(b && b.seriesMapping || [],
				function(a) {
					c.push(a.x || 0)
				});
				0 === c.length && c.push(0);
				w(b && b.seriesMapping || [],
				function(b) {
					var c = new r,
					t = d[l] || f(e),
					q = m.seriesTypes[((a && a.series || [])[l] || {}).type || e || "line"].prototype.pointArrayMap || ["y"];
					c.addColumnReader(b.x, "x");
					E(b,
					function(a, b) {
						"x" !== b && c.addColumnReader(a, b)
					});
					for (g = 0; g < t; g++) c.hasReader(q[g]) || c.addColumnReader(void 0, q[g]);
					k.push(c);
					l++
				});
				b = m.seriesTypes[e || "line"].prototype.pointArrayMap;
				void 0 === b && (b = ["y"]);
				this.valueCount = {
					global: f(e),
					xColumns: c,
					individual: d,
					seriesBuilders: k,
					globalPointArrayMap: b
				}
			},
			dataFound: function() {
				this.options.switchRowsAndColumns && (this.columns = this.rowsToColumns(this.columns));
				this.getColumnDistribution();
				this.parseTypes(); ! 1 !== this.parsed() && this.complete()
			},
			parseCSV: function(a) {
				function b(a, b, d, c) {
					function e(b) {
						h = a[b];
						p = a[b - 1];
						m = a[b + 1]
					}
					function f(a) {
						u.length < x + 1 && u.push([a]);
						u[x][u[x].length - 1] !== a && u[x].push(a)
					}
					function g() {
						I > q || q > z ? (++q, n = "") : (!isNaN(parseFloat(n)) && isFinite(n) ? (n = parseFloat(n), f("number")) : isNaN(Date.parse(n)) ? f("string") : (n = n.replace(/\//g, "-"), f("date")), l.length < x + 1 && l.push([]), d || (l[x][b] = n), n = "", ++x, ++q)
					}
					var k = 0,
					h = "",
					p = "",
					m = "",
					n = "",
					q = 0,
					x = 0;
					if (a.trim().length && "#" !== a.trim()[0]) {
						for (; k < a.length; k++) {
							e(k);
							if ("#" === h) {
								g();
								return
							}
							if ('"' === h) for (e(++k); k < a.length && ('"' !== h || '"' === p || '"' === m);) {
								if ('"' !== h || '"' === h && '"' !== p) n += h;
								e(++k)
							} else c && c[h] ? c[h](h, n) && g() : h === t ? g() : n += h
						}
						g()
					}
				}
				function c(a) {
					var b = 0,
					c = 0,
					f = !1;
					D(a,
					function(a, d) {
						var e = !1,
						f, h, g = "";
						if (13 < d) return ! 0;
						for (var k = 0; k < a.length; k++) {
							d = a[k];
							f = a[k + 1];
							h = a[k - 1];
							if ("#" === d) break;
							else if ('"' === d) if (e) {
								if ('"' !== h && '"' !== f) {
									for (;
									" " === f && k < a.length;) f = a[++k];
									"undefined" !== typeof v[f] && v[f]++;
									e = !1
								}
							} else e = !0;
							else "undefined" !== typeof v[d] ? (g = g.trim(), isNaN(Date.parse(g)) ? !isNaN(g) && isFinite(g) || v[d]++:v[d]++, g = "") : g += d;
							"," === d && c++;
							"." === d && b++
						}
					});
					f = v[";"] > v[","] ? ";": ",";
					d.decimalPoint || (d.decimalPoint = b > c ? ".": ",", e.decimalRegex = new RegExp("^(-?[0-9]+)" + d.decimalPoint + "([0-9]+)$"));
					return f
				}
				function f(a, b) {
					var c, f, g = 0,
					k = !1,
					n = [],
					l = [],
					h;
					if (!b || b > a.length) b = a.length;
					for (; g < b; g++) if ("undefined" !== typeof a[g] && a[g] && a[g].length) for (c = a[g].trim().replace(/\//g, " ").replace(/\-/g, " ").split(" "), f = ["", "", ""], h = 0; h < c.length; h++) h < f.length && (c[h] = parseInt(c[h], 10), c[h] && (l[h] = !l[h] || l[h] < c[h] ? c[h] : l[h], "undefined" !== typeof n[h] ? n[h] !== c[h] && (n[h] = !1) : n[h] = c[h], 31 < c[h] ? f[h] = 100 > c[h] ? "YY": "YYYY": 12 < c[h] && 31 >= c[h] ? (f[h] = "dd", k = !0) : f[h].length || (f[h] = "mm")));
					if (k) {
						for (h = 0; h < n.length; h++) ! 1 !== n[h] ? 12 < l[h] && "YY" !== f[h] && "YYYY" !== f[h] && (f[h] = "YY") : 12 < l[h] && "mm" === f[h] && (f[h] = "dd");
						3 === f.length && "dd" === f[1] && "dd" === f[2] && (f[2] = "YY");
						a = f.join("/");
						return (d.dateFormats || e.dateFormats)[a] ? a: (H("invalidDateFormat"), m.error("Could not deduce date format"), "YYYY/mm/dd")
					}
					return "YYYY/mm/dd"
				}
				var e = this,
				d = a || this.options,
				k = d.csv,
				l;
				a = "undefined" !== typeof d.startRow && d.startRow ? d.startRow: 0;
				var g = d.endRow || Number.MAX_VALUE,
				I = "undefined" !== typeof d.startColumn && d.startColumn ? d.startColumn: 0,
				z = d.endColumn || Number.MAX_VALUE,
				t,
				q = 0,
				u = [],
				v = {
					",": 0,
					";": 0,
					"\t": 0
				};
				l = this.columns = [];
				if (k) {
					k = k.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split(d.lineDelimiter || "\n");
					if (!a || 0 > a) a = 0;
					if (!g || g >= k.length) g = k.length - 1;
					d.itemDelimiter ? t = d.itemDelimiter: (t = null, t = c(k));
					for (var n = 0,
					q = a; q <= g; q++)"#" === k[q][0] ? n++:b(k[q], q - a - n);
					d.columnTypes && 0 !== d.columnTypes.length || !u.length || !u[0].length || "date" !== u[0][1] || d.dateFormat || (d.dateFormat = f(l[0]));
					this.dataFound()
				}
				return l
			},
			parseTable: function() {
				var a = this.options,
				b = a.table,
				c = this.columns,
				f = a.startRow || 0,
				e = a.endRow || Number.MAX_VALUE,
				d = a.startColumn || 0,
				k = a.endColumn || Number.MAX_VALUE;
				b && ("string" === typeof b && (b = y.getElementById(b)), w(b.getElementsByTagName("tr"),
				function(a, b) {
					b >= f && b <= e && w(a.children,
					function(a, e) { ("TD" === a.tagName || "TH" === a.tagName) && e >= d && e <= k && (c[e - d] || (c[e - d] = []), c[e - d][b - f] = a.innerHTML)
					})
				}), this.dataFound())
			},
			parseGoogleSpreadsheet: function() {
				function a(a) {
					var b = ["https://spreadsheets.google.com/feeds/cells", f, e, "public/values?alt\x3djson"].join("/");
					m.ajax({
						url: b,
						dataType: "json",
						success: a,
						error: function(a, b) {
							return c.error && c.error(b, a)
						}
					})
				}
				var b = this,
				c = this.options,
				f = c.googleSpreadsheetKey,
				e = c.googleSpreadsheetWorksheet || 1,
				d = this.columns,
				k = c.startRow || 0,
				l = c.endRow || Number.MAX_VALUE,
				g = c.startColumn || 0,
				r = c.endColumn || Number.MAX_VALUE,
				z, t;
				f && a(function(a) {
					a = a.feed.entry;
					var c, f = a.length,
					e = 0,
					m = 0,
					p;
					for (p = 0; p < f; p++) c = a[p],
					e = Math.max(e, c.gs$cell.col),
					m = Math.max(m, c.gs$cell.row);
					for (p = 0; p < e; p++) p >= g && p <= r && (d[p - g] = [], d[p - g].length = Math.min(m, l - k));
					for (p = 0; p < f; p++) c = a[p],
					z = c.gs$cell.row - 1,
					t = c.gs$cell.col - 1,
					t >= g && t <= r && z >= k && z <= l && (e = c.gs$cell || c.content, c = null, e.numericValue ? c = 0 <= e.$t.indexOf("/") || 0 <= e.$t.indexOf("-") ? e.$t: 0 < e.$t.indexOf("%") ? 100 * parseFloat(e.numericValue) : parseFloat(e.numericValue) : e.$t && e.$t.length && (c = e.$t), d[t - g][z - k] = c);
					w(d,
					function(a) {
						for (p = 0; p < a.length; p++) void 0 === a[p] && (a[p] = null)
					});
					b.dataFound()
				})
			},
			trim: function(a, b) {
				"string" === typeof a && (a = a.replace(/^\s+|\s+$/g, ""), b && /^[0-9\s]+$/.test(a) && (a = a.replace(/\s/g, "")), this.decimalRegex && (a = a.replace(this.decimalRegex, "$1.$2")));
				return a
			},
			parseTypes: function() {
				for (var a = this.columns,
				b = a.length; b--;) this.parseColumn(a[b], b)
			},
			parseColumn: function(a, b) {
				var c = this.rawColumns,
				f = this.columns,
				e = a.length,
				d, k, l, g, m = this.firstRowAsNames,
				r = -1 !== B(b, this.valueCount.xColumns),
				t,
				q = [],
				u = this.chartOptions,
				v,
				n = (this.options.columnTypes || [])[b],
				u = r && (u && u.xAxis && "category" === G(u.xAxis)[0].type || "string" === n);
				for (c[b] || (c[b] = []); e--;) d = q[e] || a[e],
				l = this.trim(d),
				g = this.trim(d, !0),
				k = parseFloat(g),
				void 0 === c[b][e] && (c[b][e] = l),
				u || 0 === e && m ? a[e] = "" + l: +g === k ? (a[e] = k, 31536E6 < k && "float" !== n ? a.isDatetime = !0 : a.isNumeric = !0, void 0 !== a[e + 1] && (v = k > a[e + 1])) : (l && l.length && (t = this.parseDate(d)), r && C(t) && "float" !== n ? (q[e] = d, a[e] = t, a.isDatetime = !0, void 0 !== a[e + 1] && (d = t > a[e + 1], d !== v && void 0 !== v && (this.alternativeFormat ? (this.dateFormat = this.alternativeFormat, e = a.length, this.alternativeFormat = this.dateFormats[this.dateFormat].alternative) : a.unsorted = !0), v = d)) : (a[e] = "" === l ? null: l, 0 !== e && (a.isDatetime || a.isNumeric) && (a.mixed = !0)));
				r && a.mixed && (f[b] = c[b]);
				if (r && v && this.options.sort) for (b = 0; b < f.length; b++) f[b].reverse(),
				m && f[b].unshift(f[b].pop())
			},
			dateFormats: {
				"YYYY/mm/dd": {
					regex: /^([0-9]{4})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{1,2})$/,
					parser: function(a) {
						return Date.UTC( + a[1], a[2] - 1, +a[3])
					}
				},
				"dd/mm/YYYY": {
					regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,
					parser: function(a) {
						return Date.UTC( + a[3], a[2] - 1, +a[1])
					},
					alternative: "mm/dd/YYYY"
				},
				"mm/dd/YYYY": {
					regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/,
					parser: function(a) {
						return Date.UTC( + a[3], a[1] - 1, +a[2])
					}
				},
				"dd/mm/YY": {
					regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,
					parser: function(a) {
						var b = +a[3],
						b = b > (new Date).getFullYear() - 2E3 ? b + 1900 : b + 2E3;
						return Date.UTC(b, a[2] - 1, +a[1])
					},
					alternative: "mm/dd/YY"
				},
				"mm/dd/YY": {
					regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/,
					parser: function(a) {
						return Date.UTC( + a[3] + 2E3, a[1] - 1, +a[2])
					}
				}
			},
			parseDate: function(a) {
				var b = this.options.parseDate,
				c, f, e = this.options.dateFormat || this.dateFormat,
				d;
				if (b) c = b(a);
				else if ("string" === typeof a) {
					if (e)(b = this.dateFormats[e]) || (b = this.dateFormats["YYYY/mm/dd"]),
					(d = a.match(b.regex)) && (c = b.parser(d));
					else for (f in this.dateFormats) if (b = this.dateFormats[f], d = a.match(b.regex)) {
						this.dateFormat = f;
						this.alternativeFormat = b.alternative;
						c = b.parser(d);
						break
					}
					d || (d = Date.parse(a), "object" === typeof d && null !== d && d.getTime ? c = d.getTime() - 6E4 * d.getTimezoneOffset() : C(d) && (c = d - 6E4 * (new Date(d)).getTimezoneOffset()))
				}
				return c
			},
			rowsToColumns: function(a) {
				var b, c, f, e, d;
				if (a) for (d = [], c = a.length, b = 0; b < c; b++) for (e = a[b].length, f = 0; f < e; f++) d[f] || (d[f] = []),
				d[f][b] = a[b][f];
				return d
			},
			parsed: function() {
				if (this.options.parsed) return this.options.parsed.call(this, this.columns)
			},
			getFreeIndexes: function(a, b) {
				var c, f = [],
				e = [],
				d;
				for (c = 0; c < a; c += 1) f.push(!0);
				for (a = 0; a < b.length; a += 1) for (d = b[a].getReferencedColumnIndexes(), c = 0; c < d.length; c += 1) f[d[c]] = !1;
				for (c = 0; c < f.length; c += 1) f[c] && e.push(c);
				return e
			},
			complete: function() {
				var a = this.columns,
				b, c = this.options,
				f, e, d, k, l = [],
				g;
				if (c.complete || c.afterComplete) {
					for (d = 0; d < a.length; d++) this.firstRowAsNames && (a[d].name = a[d].shift());
					f = [];
					e = this.getFreeIndexes(a.length, this.valueCount.seriesBuilders);
					for (d = 0; d < this.valueCount.seriesBuilders.length; d++) g = this.valueCount.seriesBuilders[d],
					g.populateColumns(e) && l.push(g);
					for (; 0 < e.length;) {
						g = new r;
						g.addColumnReader(0, "x");
						d = B(0, e); - 1 !== d && e.splice(d, 1);
						for (d = 0; d < this.valueCount.global; d++) g.addColumnReader(void 0, this.valueCount.globalPointArrayMap[d]);
						g.populateColumns(e) && l.push(g)
					}
					0 < l.length && 0 < l[0].readers.length && (g = a[l[0].readers[0].columnIndex], void 0 !== g && (g.isDatetime ? b = "datetime": g.isNumeric || (b = "category")));
					if ("category" === b) for (d = 0; d < l.length; d++) for (g = l[d], e = 0; e < g.readers.length; e++)"x" === g.readers[e].configName && (g.readers[e].configName = "name");
					for (d = 0; d < l.length; d++) {
						g = l[d];
						e = [];
						for (k = 0; k < a[0].length; k++) e[k] = g.read(a, k);
						f[d] = {
							data: e
						};
						g.name && (f[d].name = g.name);
						"category" === b && (f[d].turboThreshold = 0)
					}
					a = {
						series: f
					};
					b && (a.xAxis = {
						type: b
					},
					"category" === b && (a.xAxis.uniqueNames = !1));
					c.complete && c.complete(a);
					c.afterComplete && c.afterComplete(a)
				}
			},
			update: function(a, b) {
				var c = this.chart;
				a && (a.afterComplete = function(a) {
					c.update(a, b)
				},
				m.data(a))
			}
		});
		m.Data = A;
		m.data = function(a, b) {
			return new A(a, b)
		};
		m.wrap(m.Chart.prototype, "init",
		function(a, b, c) {
			var f = this;
			b && b.data ? (f.data = new A(m.extend(b.data, {
				afterComplete: function(e) {
					var d, k;
					if (b.hasOwnProperty("series")) if ("object" === typeof b.series) for (d = Math.max(b.series.length, e.series.length); d--;) k = b.series[d] || {},
					b.series[d] = m.merge(k, e.series[d]);
					else delete b.series;
					b = m.merge(e, b);
					a.call(f, b, c)
				}
			}), b), f.data.chart = f) : a.call(f, b, c)
		});
		r = function() {
			this.readers = [];
			this.pointIsArray = !0
		};
		r.prototype.populateColumns = function(a) {
			var b = !0;
			w(this.readers,
			function(b) {
				void 0 === b.columnIndex && (b.columnIndex = a.shift())
			});
			w(this.readers,
			function(a) {
				void 0 === a.columnIndex && (b = !1)
			});
			return b
		};
		r.prototype.read = function(a, b) {
			var c = this.pointIsArray,
			f = c ? [] : {},
			e;
			w(this.readers,
			function(d) {
				var e = a[d.columnIndex][b];
				c ? f.push(e) : f[d.configName] = e
			});
			void 0 === this.name && 2 <= this.readers.length && (e = this.getReferencedColumnIndexes(), 2 <= e.length && (e.shift(), e.sort(), this.name = a[e.shift()].name));
			return f
		};
		r.prototype.addColumnReader = function(a, b) {
			this.readers.push({
				columnIndex: a,
				configName: b
			});
			"x" !== b && "y" !== b && void 0 !== b && (this.pointIsArray = !1)
		};
		r.prototype.getReferencedColumnIndexes = function() {
			var a, b = [],
			c;
			for (a = 0; a < this.readers.length; a += 1) c = this.readers[a],
			void 0 !== c.columnIndex && b.push(c.columnIndex);
			return b
		};
		r.prototype.hasReader = function(a) {
			var b, c;
			for (b = 0; b < this.readers.length; b += 1) if (c = this.readers[b], c.configName === a) return ! 0
		}
	})(y)
});