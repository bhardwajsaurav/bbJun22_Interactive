(function () {
   "use strict";
   var m;
   function aa(a) {
      var b = 0;
      return function () {
         return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
      };
   }
   var ba =
      "function" == typeof Object.defineProperties
         ? Object.defineProperty
         : function (a, b, c) {
              if (a == Array.prototype || a == Object.prototype) return a;
              a[b] = c.value;
              return a;
           };
   function ca(a) {
      a = [
         "object" == typeof globalThis && globalThis,
         a,
         "object" == typeof window && window,
         "object" == typeof self && self,
         "object" == typeof global && global,
      ];
      for (var b = 0; b < a.length; ++b) {
         var c = a[b];
         if (c && c.Math == Math) return c;
      }
      throw Error("Cannot find global object");
   }
   var t = ca(this);
   function u(a, b) {
      if (b)
         a: {
            var c = t;
            a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
               var e = a[d];
               if (!(e in c)) break a;
               c = c[e];
            }
            a = a[a.length - 1];
            d = c[a];
            b = b(d);
            b != d &&
               null != b &&
               ba(c, a, { configurable: !0, writable: !0, value: b });
         }
   }
   u("Symbol", function (a) {
      function b(f) {
         if (this instanceof b)
            throw new TypeError("Symbol is not a constructor");
         return new c(d + (f || "") + "_" + e++, f);
      }
      function c(f, g) {
         this.g = f;
         ba(this, "description", { configurable: !0, writable: !0, value: g });
      }
      if (a) return a;
      c.prototype.toString = function () {
         return this.g;
      };
      var d = "jscomp_symbol_" + ((1e9 * Math.random()) >>> 0) + "_",
         e = 0;
      return b;
   });
   u("Symbol.iterator", function (a) {
      if (a) return a;
      a = Symbol("Symbol.iterator");
      for (
         var b =
               "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(
                  " "
               ),
            c = 0;
         c < b.length;
         c++
      ) {
         var d = t[b[c]];
         "function" === typeof d &&
            "function" != typeof d.prototype[a] &&
            ba(d.prototype, a, {
               configurable: !0,
               writable: !0,
               value: function () {
                  return da(aa(this));
               },
            });
      }
      return a;
   });
   function da(a) {
      a = { next: a };
      a[Symbol.iterator] = function () {
         return this;
      };
      return a;
   }
   function x(a) {
      return (a.raw = a);
   }
   function ea(a, b) {
      a.raw = b;
      return a;
   }
   function y(a) {
      var b =
         "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
      return b ? b.call(a) : { next: aa(a) };
   }
   function ha(a) {
      if (!(a instanceof Array)) {
         a = y(a);
         for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
         a = c;
      }
      return a;
   }
   var ia =
         "function" == typeof Object.create
            ? Object.create
            : function (a) {
                 function b() {}
                 b.prototype = a;
                 return new b();
              },
      ja = (function () {
         function a() {
            function c() {}
            new c();
            Reflect.construct(c, [], function () {});
            return new c() instanceof c;
         }
         if ("undefined" != typeof Reflect && Reflect.construct) {
            if (a()) return Reflect.construct;
            var b = Reflect.construct;
            return function (c, d, e) {
               c = b(c, d);
               e && Reflect.setPrototypeOf(c, e.prototype);
               return c;
            };
         }
         return function (c, d, e) {
            void 0 === e && (e = c);
            e = ia(e.prototype || Object.prototype);
            return Function.prototype.apply.call(c, e, d) || e;
         };
      })(),
      ka;
   if ("function" == typeof Object.setPrototypeOf) ka = Object.setPrototypeOf;
   else {
      var la;
      a: {
         var ma = { a: !0 },
            na = {};
         try {
            na.__proto__ = ma;
            la = na.a;
            break a;
         } catch (a) {}
         la = !1;
      }
      ka = la
         ? function (a, b) {
              a.__proto__ = b;
              if (a.__proto__ !== b)
                 throw new TypeError(a + " is not extensible");
              return a;
           }
         : null;
   }
   var oa = ka;
   function A(a, b) {
      a.prototype = ia(b.prototype);
      a.prototype.constructor = a;
      if (oa) oa(a, b);
      else
         for (var c in b)
            if ("prototype" != c)
               if (Object.defineProperties) {
                  var d = Object.getOwnPropertyDescriptor(b, c);
                  d && Object.defineProperty(a, c, d);
               } else a[c] = b[c];
      a.mk = b.prototype;
   }
   u("Reflect", function (a) {
      return a ? a : {};
   });
   u("Reflect.construct", function () {
      return ja;
   });
   u("Reflect.setPrototypeOf", function (a) {
      return a
         ? a
         : oa
         ? function (b, c) {
              try {
                 return oa(b, c), !0;
              } catch (d) {
                 return !1;
              }
           }
         : null;
   });
   u("Object.setPrototypeOf", function (a) {
      return a || oa;
   });
   function pa(a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
   }
   var qa =
      "function" == typeof Object.assign
         ? Object.assign
         : function (a, b) {
              for (var c = 1; c < arguments.length; c++) {
                 var d = arguments[c];
                 if (d) for (var e in d) pa(d, e) && (a[e] = d[e]);
              }
              return a;
           };
   u("Object.assign", function (a) {
      return a || qa;
   });
   u("Promise", function (a) {
      function b(g) {
         this.h = 0;
         this.j = void 0;
         this.g = [];
         this.da = !1;
         var h = this.m();
         try {
            g(h.resolve, h.reject);
         } catch (k) {
            h.reject(k);
         }
      }
      function c() {
         this.g = null;
      }
      function d(g) {
         return g instanceof b
            ? g
            : new b(function (h) {
                 h(g);
              });
      }
      if (a) return a;
      c.prototype.h = function (g) {
         if (null == this.g) {
            this.g = [];
            var h = this;
            this.j(function () {
               h.o();
            });
         }
         this.g.push(g);
      };
      var e = t.setTimeout;
      c.prototype.j = function (g) {
         e(g, 0);
      };
      c.prototype.o = function () {
         for (; this.g && this.g.length; ) {
            var g = this.g;
            this.g = [];
            for (var h = 0; h < g.length; ++h) {
               var k = g[h];
               g[h] = null;
               try {
                  k();
               } catch (l) {
                  this.m(l);
               }
            }
         }
         this.g = null;
      };
      c.prototype.m = function (g) {
         this.j(function () {
            throw g;
         });
      };
      b.prototype.m = function () {
         function g(l) {
            return function (n) {
               k || ((k = !0), l.call(h, n));
            };
         }
         var h = this,
            k = !1;
         return { resolve: g(this.wa), reject: g(this.o) };
      };
      b.prototype.wa = function (g) {
         if (g === this)
            this.o(new TypeError("A Promise cannot resolve to itself"));
         else if (g instanceof b) this.eb(g);
         else {
            a: switch (typeof g) {
               case "object":
                  var h = null != g;
                  break a;
               case "function":
                  h = !0;
                  break a;
               default:
                  h = !1;
            }
            h ? this.pa(g) : this.ba(g);
         }
      };
      b.prototype.pa = function (g) {
         var h = void 0;
         try {
            h = g.then;
         } catch (k) {
            this.o(k);
            return;
         }
         "function" == typeof h ? this.kc(h, g) : this.ba(g);
      };
      b.prototype.o = function (g) {
         this.ea(2, g);
      };
      b.prototype.ba = function (g) {
         this.ea(1, g);
      };
      b.prototype.ea = function (g, h) {
         if (0 != this.h)
            throw Error(
               "Cannot settle(" +
                  g +
                  ", " +
                  h +
                  "): Promise already settled in state" +
                  this.h
            );
         this.h = g;
         this.j = h;
         2 === this.h && this.cb();
         this.na();
      };
      b.prototype.cb = function () {
         var g = this;
         e(function () {
            if (g.oa()) {
               var h = t.console;
               "undefined" !== typeof h && h.error(g.j);
            }
         }, 1);
      };
      b.prototype.oa = function () {
         if (this.da) return !1;
         var g = t.CustomEvent,
            h = t.Event,
            k = t.dispatchEvent;
         if ("undefined" === typeof k) return !0;
         "function" === typeof g
            ? (g = new g("unhandledrejection", { cancelable: !0 }))
            : "function" === typeof h
            ? (g = new h("unhandledrejection", { cancelable: !0 }))
            : ((g = t.document.createEvent("CustomEvent")),
              g.initCustomEvent("unhandledrejection", !1, !0, g));
         g.promise = this;
         g.reason = this.j;
         return k(g);
      };
      b.prototype.na = function () {
         if (null != this.g) {
            for (var g = 0; g < this.g.length; ++g) f.h(this.g[g]);
            this.g = null;
         }
      };
      var f = new c();
      b.prototype.eb = function (g) {
         var h = this.m();
         g.rd(h.resolve, h.reject);
      };
      b.prototype.kc = function (g, h) {
         var k = this.m();
         try {
            g.call(h, k.resolve, k.reject);
         } catch (l) {
            k.reject(l);
         }
      };
      b.prototype.then = function (g, h) {
         function k(q, r) {
            return "function" == typeof q
               ? function (w) {
                    try {
                       l(q(w));
                    } catch (v) {
                       n(v);
                    }
                 }
               : r;
         }
         var l,
            n,
            p = new b(function (q, r) {
               l = q;
               n = r;
            });
         this.rd(k(g, l), k(h, n));
         return p;
      };
      b.prototype.catch = function (g) {
         return this.then(void 0, g);
      };
      b.prototype.rd = function (g, h) {
         function k() {
            switch (l.h) {
               case 1:
                  g(l.j);
                  break;
               case 2:
                  h(l.j);
                  break;
               default:
                  throw Error("Unexpected state: " + l.h);
            }
         }
         var l = this;
         null == this.g ? f.h(k) : this.g.push(k);
         this.da = !0;
      };
      b.resolve = d;
      b.reject = function (g) {
         return new b(function (h, k) {
            k(g);
         });
      };
      b.race = function (g) {
         return new b(function (h, k) {
            for (var l = y(g), n = l.next(); !n.done; n = l.next())
               d(n.value).rd(h, k);
         });
      };
      b.all = function (g) {
         var h = y(g),
            k = h.next();
         return k.done
            ? d([])
            : new b(function (l, n) {
                 function p(w) {
                    return function (v) {
                       q[w] = v;
                       r--;
                       0 == r && l(q);
                    };
                 }
                 var q = [],
                    r = 0;
                 do
                    q.push(void 0),
                       r++,
                       d(k.value).rd(p(q.length - 1), n),
                       (k = h.next());
                 while (!k.done);
              });
      };
      return b;
   });
   function ra(a, b) {
      a instanceof String && (a += "");
      var c = 0,
         d = !1,
         e = {
            next: function () {
               if (!d && c < a.length) {
                  var f = c++;
                  return { value: b(f, a[f]), done: !1 };
               }
               d = !0;
               return { done: !0, value: void 0 };
            },
         };
      e[Symbol.iterator] = function () {
         return e;
      };
      return e;
   }
   u("Array.prototype.keys", function (a) {
      return a
         ? a
         : function () {
              return ra(this, function (b) {
                 return b;
              });
           };
   });
   u("WeakMap", function (a) {
      function b(k) {
         this.g = (h += Math.random() + 1).toString();
         if (k) {
            k = y(k);
            for (var l; !(l = k.next()).done; )
               (l = l.value), this.set(l[0], l[1]);
         }
      }
      function c() {}
      function d(k) {
         var l = typeof k;
         return ("object" === l && null !== k) || "function" === l;
      }
      function e(k) {
         if (!pa(k, g)) {
            var l = new c();
            ba(k, g, { value: l });
         }
      }
      function f(k) {
         var l = Object[k];
         l &&
            (Object[k] = function (n) {
               if (n instanceof c) return n;
               Object.isExtensible(n) && e(n);
               return l(n);
            });
      }
      if (
         (function () {
            if (!a || !Object.seal) return !1;
            try {
               var k = Object.seal({}),
                  l = Object.seal({}),
                  n = new a([
                     [k, 2],
                     [l, 3],
                  ]);
               if (2 != n.get(k) || 3 != n.get(l)) return !1;
               n.delete(k);
               n.set(l, 4);
               return !n.has(k) && 4 == n.get(l);
            } catch (p) {
               return !1;
            }
         })()
      )
         return a;
      var g = "$jscomp_hidden_" + Math.random();
      f("freeze");
      f("preventExtensions");
      f("seal");
      var h = 0;
      b.prototype.set = function (k, l) {
         if (!d(k)) throw Error("Invalid WeakMap key");
         e(k);
         if (!pa(k, g)) throw Error("WeakMap key fail: " + k);
         k[g][this.g] = l;
         return this;
      };
      b.prototype.get = function (k) {
         return d(k) && pa(k, g) ? k[g][this.g] : void 0;
      };
      b.prototype.has = function (k) {
         return d(k) && pa(k, g) && pa(k[g], this.g);
      };
      b.prototype.delete = function (k) {
         return d(k) && pa(k, g) && pa(k[g], this.g) ? delete k[g][this.g] : !1;
      };
      return b;
   });
   u("Array.from", function (a) {
      return a
         ? a
         : function (b, c, d) {
              c =
                 null != c
                    ? c
                    : function (h) {
                         return h;
                      };
              var e = [],
                 f =
                    "undefined" != typeof Symbol &&
                    Symbol.iterator &&
                    b[Symbol.iterator];
              if ("function" == typeof f) {
                 b = f.call(b);
                 for (var g = 0; !(f = b.next()).done; )
                    e.push(c.call(d, f.value, g++));
              } else
                 for (f = b.length, g = 0; g < f; g++)
                    e.push(c.call(d, b[g], g));
              return e;
           };
   });
   u("Map", function (a) {
      function b() {
         var h = {};
         return (h.gb = h.next = h.head = h);
      }
      function c(h, k) {
         var l = h.g;
         return da(function () {
            if (l) {
               for (; l.head != h.g; ) l = l.gb;
               for (; l.next != l.head; )
                  return (l = l.next), { done: !1, value: k(l) };
               l = null;
            }
            return { done: !0, value: void 0 };
         });
      }
      function d(h, k) {
         var l = k && typeof k;
         "object" == l || "function" == l
            ? f.has(k)
               ? (l = f.get(k))
               : ((l = "" + ++g), f.set(k, l))
            : (l = "p_" + k);
         var n = h.h[l];
         if (n && pa(h.h, l))
            for (h = 0; h < n.length; h++) {
               var p = n[h];
               if ((k !== k && p.key !== p.key) || k === p.key)
                  return { id: l, list: n, index: h, ja: p };
            }
         return { id: l, list: n, index: -1, ja: void 0 };
      }
      function e(h) {
         this.h = {};
         this.g = b();
         this.size = 0;
         if (h) {
            h = y(h);
            for (var k; !(k = h.next()).done; )
               (k = k.value), this.set(k[0], k[1]);
         }
      }
      if (
         (function () {
            if (
               !a ||
               "function" != typeof a ||
               !a.prototype.entries ||
               "function" != typeof Object.seal
            )
               return !1;
            try {
               var h = Object.seal({ x: 4 }),
                  k = new a(y([[h, "s"]]));
               if (
                  "s" != k.get(h) ||
                  1 != k.size ||
                  k.get({ x: 4 }) ||
                  k.set({ x: 4 }, "t") != k ||
                  2 != k.size
               )
                  return !1;
               var l = k.entries(),
                  n = l.next();
               if (n.done || n.value[0] != h || "s" != n.value[1]) return !1;
               n = l.next();
               return n.done ||
                  4 != n.value[0].x ||
                  "t" != n.value[1] ||
                  !l.next().done
                  ? !1
                  : !0;
            } catch (p) {
               return !1;
            }
         })()
      )
         return a;
      var f = new WeakMap();
      e.prototype.set = function (h, k) {
         h = 0 === h ? 0 : h;
         var l = d(this, h);
         l.list || (l.list = this.h[l.id] = []);
         l.ja
            ? (l.ja.value = k)
            : ((l.ja = {
                 next: this.g,
                 gb: this.g.gb,
                 head: this.g,
                 key: h,
                 value: k,
              }),
              l.list.push(l.ja),
              (this.g.gb.next = l.ja),
              (this.g.gb = l.ja),
              this.size++);
         return this;
      };
      e.prototype.delete = function (h) {
         h = d(this, h);
         return h.ja && h.list
            ? (h.list.splice(h.index, 1),
              h.list.length || delete this.h[h.id],
              (h.ja.gb.next = h.ja.next),
              (h.ja.next.gb = h.ja.gb),
              (h.ja.head = null),
              this.size--,
              !0)
            : !1;
      };
      e.prototype.clear = function () {
         this.h = {};
         this.g = this.g.gb = b();
         this.size = 0;
      };
      e.prototype.has = function (h) {
         return !!d(this, h).ja;
      };
      e.prototype.get = function (h) {
         return (h = d(this, h).ja) && h.value;
      };
      e.prototype.entries = function () {
         return c(this, function (h) {
            return [h.key, h.value];
         });
      };
      e.prototype.keys = function () {
         return c(this, function (h) {
            return h.key;
         });
      };
      e.prototype.values = function () {
         return c(this, function (h) {
            return h.value;
         });
      };
      e.prototype.forEach = function (h, k) {
         for (var l = this.entries(), n; !(n = l.next()).done; )
            (n = n.value), h.call(k, n[1], n[0], this);
      };
      e.prototype[Symbol.iterator] = e.prototype.entries;
      var g = 0;
      return e;
   });
   u("Set", function (a) {
      function b(c) {
         this.g = new Map();
         if (c) {
            c = y(c);
            for (var d; !(d = c.next()).done; ) this.add(d.value);
         }
         this.size = this.g.size;
      }
      if (
         (function () {
            if (
               !a ||
               "function" != typeof a ||
               !a.prototype.entries ||
               "function" != typeof Object.seal
            )
               return !1;
            try {
               var c = Object.seal({ x: 4 }),
                  d = new a(y([c]));
               if (
                  !d.has(c) ||
                  1 != d.size ||
                  d.add(c) != d ||
                  1 != d.size ||
                  d.add({ x: 4 }) != d ||
                  2 != d.size
               )
                  return !1;
               var e = d.entries(),
                  f = e.next();
               if (f.done || f.value[0] != c || f.value[1] != c) return !1;
               f = e.next();
               return f.done ||
                  f.value[0] == c ||
                  4 != f.value[0].x ||
                  f.value[1] != f.value[0]
                  ? !1
                  : e.next().done;
            } catch (g) {
               return !1;
            }
         })()
      )
         return a;
      b.prototype.add = function (c) {
         c = 0 === c ? 0 : c;
         this.g.set(c, c);
         this.size = this.g.size;
         return this;
      };
      b.prototype.delete = function (c) {
         c = this.g.delete(c);
         this.size = this.g.size;
         return c;
      };
      b.prototype.clear = function () {
         this.g.clear();
         this.size = 0;
      };
      b.prototype.has = function (c) {
         return this.g.has(c);
      };
      b.prototype.entries = function () {
         return this.g.entries();
      };
      b.prototype.values = function () {
         return this.g.values();
      };
      b.prototype.keys = b.prototype.values;
      b.prototype[Symbol.iterator] = b.prototype.values;
      b.prototype.forEach = function (c, d) {
         var e = this;
         this.g.forEach(function (f) {
            return c.call(d, f, f, e);
         });
      };
      return b;
   });
   u("Array.prototype.find", function (a) {
      return a
         ? a
         : function (b, c) {
              a: {
                 var d = this;
                 d instanceof String && (d = String(d));
                 for (var e = d.length, f = 0; f < e; f++) {
                    var g = d[f];
                    if (b.call(c, g, f, d)) {
                       b = g;
                       break a;
                    }
                 }
                 b = void 0;
              }
              return b;
           };
   });
   u("Array.prototype.values", function (a) {
      return a
         ? a
         : function () {
              return ra(this, function (b, c) {
                 return c;
              });
           };
   });
   u("Object.is", function (a) {
      return a
         ? a
         : function (b, c) {
              return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
           };
   });
   u("Array.prototype.includes", function (a) {
      return a
         ? a
         : function (b, c) {
              var d = this;
              d instanceof String && (d = String(d));
              var e = d.length;
              c = c || 0;
              for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                 var f = d[c];
                 if (f === b || Object.is(f, b)) return !0;
              }
              return !1;
           };
   });
   u("String.prototype.includes", function (a) {
      return a
         ? a
         : function (b, c) {
              if (null == this)
                 throw new TypeError(
                    "The 'this' value for String.prototype.includes must not be null or undefined"
                 );
              if (b instanceof RegExp)
                 throw new TypeError(
                    "First argument to String.prototype.includes must not be a regular expression"
                 );
              return -1 !== this.indexOf(b, c || 0);
           };
   });
   var sa = this || self;
   function ta(a, b, c) {
      return a.call.apply(a.bind, arguments);
   }
   function ua(a, b, c) {
      if (!a) throw Error();
      if (2 < arguments.length) {
         var d = Array.prototype.slice.call(arguments, 2);
         return function () {
            var e = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(e, d);
            return a.apply(b, e);
         };
      }
      return function () {
         return a.apply(b, arguments);
      };
   }
   function va(a, b, c) {
      Function.prototype.bind &&
      -1 != Function.prototype.bind.toString().indexOf("native code")
         ? (va = ta)
         : (va = ua);
      return va.apply(null, arguments);
   }
   function wa(a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.mk = b.prototype;
      a.prototype = new c();
      a.prototype.constructor = a;
      a.base = function (d, e, f) {
         for (
            var g = Array(arguments.length - 2), h = 2;
            h < arguments.length;
            h++
         )
            g[h - 2] = arguments[h];
         return b.prototype[e].apply(d, g);
      };
   }
   function xa(a) {
      return a;
   }
   var ya = {};
   function za() {}
   function Aa(a) {
      this.g = a;
   }
   A(Aa, za);
   Aa.prototype.toString = function () {
      return this.g;
   };
   var Ba, Ca;
   if (void 0 === Ba) {
      var Da = document.createElement("template");
      Da.innerHTML =
         '<style>\n  /* To hide the spinner in Webkit styles must be set in the component which creates the element\n   * which is being slotted. */\n\n  /* Hide spinner in Firefox. */\n  ::slotted(input[type="number"]) {\n    -moz-appearance: textfield;\n  }\n</style>\n<slot name="sliderinput"></slot>\n';
      Ba = Da;
   }
   Ca = Ba; /*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
   window.JSCompiler_renameProperty = function (a) {
      return a;
   }; /*

Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
   var Ea = {
         "U+0008": "backspace",
         "U+0009": "tab",
         "U+001B": "esc",
         "U+0020": "space",
         "U+007F": "del",
      },
      Fa = {
         8: "backspace",
         9: "tab",
         13: "enter",
         27: "esc",
         33: "pageup",
         34: "pagedown",
         35: "end",
         36: "home",
         32: "space",
         37: "left",
         38: "up",
         39: "right",
         40: "down",
         46: "del",
         106: "*",
      },
      Ga = {
         shift: "shiftKey",
         ctrl: "ctrlKey",
         alt: "altKey",
         meta: "metaKey",
      },
      Ha = /[a-z0-9*]/,
      Ia = /U\+/,
      Ja = /^arrow/,
      La = /^space(bar)?/,
      Ma = /^escape$/;
   function Na(a, b) {
      var c = "";
      if (a)
         if (((a = a.toLowerCase()), " " === a || La.test(a))) c = "space";
         else if (Ma.test(a)) c = "esc";
         else if (1 == a.length) {
            if (!b || Ha.test(a)) c = a;
         } else
            c = Ja.test(a) ? a.replace("arrow", "") : "multiply" == a ? "*" : a;
      return c;
   }
   function Oa(a, b) {
      var c = a.lb;
      if (b.key) c = Na(b.key, c);
      else if (b.detail && b.detail.key) c = Na(b.detail.key, c);
      else {
         c = b.keyIdentifier;
         var d = "";
         c &&
            (c in Ea
               ? (d = Ea[c])
               : Ia.test(c)
               ? ((c = parseInt(c.replace("U+", "0x"), 16)),
                 (d = String.fromCharCode(c).toLowerCase()))
               : (d = c.toLowerCase()));
         (c = d) ||
            ((c = b.keyCode),
            (d = ""),
            Number(c) &&
               (65 <= c && 90 >= c
                  ? (d = String.fromCharCode(32 + c))
                  : 112 <= c && 123 >= c
                  ? (d = "f" + (c - 112 + 1))
                  : 48 <= c && 57 >= c
                  ? (d = String(c - 48))
                  : 96 <= c && 105 >= c
                  ? (d = String(c - 96))
                  : (d = Fa[c])),
            (c = d));
         c = c || "";
      }
      return (
         c === a.key &&
         (!a.lb ||
            (!!b.shiftKey === !!a.shiftKey &&
               !!b.ctrlKey === !!a.ctrlKey &&
               !!b.altKey === !!a.altKey &&
               !!b.metaKey === !!a.metaKey))
      );
   }
   function Pa(a) {
      return 1 === a.length
         ? { nj: a, key: a, event: "keydown" }
         : a.split("+").reduce(
              function (b, c) {
                 var d = c.split(":");
                 c = d[0];
                 d = d[1];
                 c in Ga
                    ? ((b[Ga[c]] = !0), (b.lb = !0))
                    : ((b.key = c), (b.event = d || "keydown"));
                 return b;
              },
              { nj: a.split(":").shift() }
           );
   }
   function Qa(a) {
      return a
         .trim()
         .split(" ")
         .map(function (b) {
            return Pa(b);
         });
   }
   var Ra = {
      properties: {
         keyEventTarget: {
            type: Object,
            value: function () {
               return this;
            },
         },
         stopKeyboardEventPropagation: { type: Boolean, value: !1 },
         _boundKeyHandlers: {
            type: Array,
            value: function () {
               return [];
            },
         },
         _imperativeKeyBindings: {
            type: Object,
            value: function () {
               return {};
            },
         },
      },
      observers: ["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],
      ka: {},
      registered: function () {
         this._prepKeyBindings();
      },
      attached: function () {
         this._listenKeyEventListeners();
      },
      detached: function () {
         this._unlistenKeyEventListeners();
      },
      addOwnKeyBinding: function (a, b) {
         this._imperativeKeyBindings[a] = b;
         this._prepKeyBindings();
         this._resetKeyEventListeners();
      },
      removeOwnKeyBindings: function () {
         this._imperativeKeyBindings = {};
         this._prepKeyBindings();
         this._resetKeyEventListeners();
      },
      keyboardEventMatchesKeys: function (a, b) {
         b = Qa(b);
         for (var c = 0; c < b.length; ++c) if (Oa(b[c], a)) return !0;
         return !1;
      },
      _collectKeyBindings: function () {
         var a = this.behaviors.map(function (b) {
            return b.ka;
         });
         -1 === a.indexOf(this.ka) && a.push(this.ka);
         return a;
      },
      _prepKeyBindings: function () {
         this.ca = {};
         this._collectKeyBindings().forEach(function (c) {
            for (var d in c) this._addKeyBinding(d, c[d]);
         }, this);
         for (var a in this._imperativeKeyBindings)
            this._addKeyBinding(a, this._imperativeKeyBindings[a]);
         for (var b in this.ca)
            this.ca[b].sort(function (c, d) {
               c = c[0].lb;
               return c === d[0].lb ? 0 : c ? -1 : 1;
            });
      },
      _addKeyBinding: function (a, b) {
         Qa(a).forEach(function (c) {
            this.ca[c.event] = this.ca[c.event] || [];
            this.ca[c.event].push([c, b]);
         }, this);
      },
      _resetKeyEventListeners: function () {
         this._unlistenKeyEventListeners();
         this.isAttached && this._listenKeyEventListeners();
      },
      _listenKeyEventListeners: function () {
         this.keyEventTarget &&
            Object.keys(this.ca).forEach(function (a) {
               var b = this._onKeyBindingEvent.bind(this, this.ca[a]);
               this._boundKeyHandlers.push([this.keyEventTarget, a, b]);
               this.keyEventTarget.addEventListener(a, b);
            }, this);
      },
      _unlistenKeyEventListeners: function () {
         for (var a, b, c; this._boundKeyHandlers.length; )
            (a = this._boundKeyHandlers.pop()),
               (b = a[0]),
               (c = a[1]),
               (a = a[2]),
               b.removeEventListener(c, a);
      },
      _onKeyBindingEvent: function (a, b) {
         this.stopKeyboardEventPropagation && b.stopPropagation();
         if (!b.defaultPrevented)
            for (var c = 0; c < a.length; c++) {
               var d = a[c][0],
                  e = a[c][1];
               if (
                  Oa(d, b) &&
                  (this._triggerKeyHandler(d, e, b), b.defaultPrevented)
               )
                  break;
            }
      },
      _triggerKeyHandler: function (a, b, c) {
         var d = Object.create(a);
         d.ub = c;
         a = new CustomEvent(a.event, { detail: d, cancelable: !0 });
         this[b].call(this, a);
         a.defaultPrevented && c.preventDefault();
      },
   };
   var Sa = !/^\s*class\s*\{\s*\}\s*$/.test(function () {}.toString()); /*

 Copyright 2016 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
   (function () {
      if (
         Sa &&
         !HTMLElement.es5Shimmed &&
         void 0 !== window.Reflect &&
         void 0 !== window.customElements &&
         !window.customElements.polyfillWrapFlushCallback
      ) {
         var a = HTMLElement;
         window.HTMLElement = function () {
            return Reflect.construct(a, [], this.constructor);
         };
         HTMLElement.prototype = a.prototype;
         HTMLElement.prototype.constructor = HTMLElement;
         HTMLElement.es5Shimmed = !0;
         Object.setPrototypeOf(HTMLElement, a);
      }
   })(); /*

Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
   window.COMPILED = window.COMPILED || !1;
   var Ta = /(url\()([^)]*)(\))/g,
      Ua = /(^\/[^\/])|(^#)|(^[\w-\d]*:)/,
      Va,
      B;
   function Wa(a, b) {
      if ((a && Ua.test(a)) || "//" === a) return a;
      if (void 0 === Va) {
         Va = !1;
         try {
            var c = new URL("b", "http://a");
            c.pathname = "c%20d";
            Va = "http://a/c%20d" === c.href;
         } catch (d) {}
      }
      b || (b = document.baseURI || window.location.href);
      if (Va)
         try {
            return new URL(a, b).href;
         } catch (d) {
            return a;
         }
      B ||
         ((B = document.implementation.createHTMLDocument("temp")),
         (B.base = B.createElement("base")),
         B.head.appendChild(B.base),
         (B.anchor = B.createElement("a")),
         B.body.appendChild(B.anchor));
      B.base.href = b;
      B.anchor.href = a;
      return B.anchor.href || a;
   }
   function Xa(a, b) {
      return a.replace(Ta, function (c, d, e, f) {
         return d + "'" + Wa(e.replace(/["']/g, ""), b) + "'" + f;
      });
   }
   function Ya(a) {
      return a.substring(0, a.lastIndexOf("/") + 1);
   }
   var Za = !window.ShadyDOM || !window.ShadyDOM.inUse,
      $a;
   if (
      ($a =
         Za &&
         "adoptedStyleSheets" in Document.prototype &&
         "replaceSync" in CSSStyleSheet.prototype)
   )
      try {
         var ab = new CSSStyleSheet();
         ab.replaceSync("");
         var bb = document.createElement("div");
         bb.attachShadow({ mode: "open" });
         bb.shadowRoot.vg = [ab];
         $a = bb.shadowRoot.vg[0] === ab;
      } catch (a) {
         $a = !1;
      }
   var cb = $a,
      db =
         (window.Polymer && window.Polymer.rootPath) ||
         Ya(document.baseURI || window.location.href),
      eb = (window.Polymer && window.Polymer.sanitizeDOMValue) || void 0,
      fb = (window.Polymer && window.Polymer.setPassiveTouchGestures) || !1,
      gb = (window.Polymer && window.Polymer.strictTemplatePolicy) || !1,
      hb = (window.Polymer && window.Polymer.allowTemplateFromDomModule) || !1,
      ib = (window.Polymer && window.Polymer.legacyOptimizations) || !1,
      jb = (window.Polymer && window.Polymer.legacyWarnings) || !1,
      kb = (window.Polymer && window.Polymer.syncInitialRender) || !1,
      lb = (window.Polymer && window.Polymer.legacyUndefined) || !1,
      mb = (window.Polymer && window.Polymer.orderedComputed) || !1,
      nb = (window.Polymer && window.Polymer.removeNestedTemplates) || !1,
      ob = (window.Polymer && window.Polymer.fastDomIf) || !1,
      pb =
         (window.Polymer && window.Polymer.suppressTemplateNotifications) || !1,
      qb = (window.Polymer && window.Polymer.nl) || !1,
      rb = (window.Polymer && window.Polymer.rl) || !1;
   var sb = {},
      tb = {};
   function C() {
      return HTMLElement.apply(this, arguments) || this;
   }
   A(C, HTMLElement);
   C.import = function (a, b) {
      return a
         ? (a = sb[a] || tb[a.toLowerCase()]) && b
            ? a.querySelector(b)
            : a
         : null;
   };
   C.prototype.attributeChangedCallback = function (a, b, c) {
      b !== c && this.register();
   };
   C.prototype.register = function (a) {
      if ((a = a || this.id)) {
         if (gb && void 0 !== (sb[a] || tb[a.toLowerCase()]))
            throw (
               ((sb[a] = tb[a.toLowerCase()] = null),
               Error(
                  "strictTemplatePolicy: dom-module " + a + " re-registered"
               ))
            );
         this.id = a;
         sb[a] = tb[a.toLowerCase()] = this;
         this.querySelector("style") &&
            console.warn("dom-module %s has style outside template", this.id);
      }
   };
   t.Object.defineProperties(C.prototype, {
      o: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            if (!this.h) {
               var a =
                  window.HTMLImports && HTMLImports.importForElement
                     ? HTMLImports.importForElement(this) || document
                     : this.ownerDocument;
               a = Wa(this.getAttribute("assetpath") || "", a.baseURI);
               this.h = Ya(a);
            }
            return this.h;
         },
      },
   });
   t.Object.defineProperties(C, {
      observedAttributes: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return ["id"];
         },
      },
   });
   C["import"] = C.import;
   C.prototype.modules = sb;
   customElements.define("dom-module", C);
   var ub = 0,
      vb = 0,
      wb = [],
      xb = 0,
      yb = !1,
      zb = document.createTextNode("");
   new window.MutationObserver(Ab).observe(zb, { characterData: !0 });
   function Ab() {
      yb = !1;
      for (var a = wb.length, b = 0; b < a; b++) {
         var c = wb[b];
         if (c)
            try {
               c();
            } catch (d) {
               setTimeout(function () {
                  throw d;
               });
            }
      }
      wb.splice(0, a);
      vb += a;
   }
   function Bb(a) {
      return {
         run: function (b) {
            return window.setTimeout(b, a);
         },
         cancel: function (b) {
            window.clearTimeout(b);
         },
      };
   }
   var Cb = {
         run: function (a) {
            return window.requestAnimationFrame(a);
         },
         cancel: function (a) {
            window.cancelAnimationFrame(a);
         },
      },
      Db = {
         run: function (a) {
            yb || ((yb = !0), (zb.textContent = xb++));
            wb.push(a);
            return ub++;
         },
         cancel: function (a) {
            var b = a - vb;
            if (0 <= b) {
               if (!wb[b]) throw Error("invalid async handle: " + a);
               wb[b] = null;
            }
         },
      };
   var Eb = 0;
   function D(a) {
      var b = a.h;
      b || ((b = new WeakMap()), (a.h = b));
      var c = Eb++;
      return function (d) {
         var e = d.g;
         if (e && e[c]) return d;
         var f = b,
            g = f.get(d);
         g ||
            ((g = a(d)),
            f.set(d, g),
            (d = Object.create(g.g || e || null)),
            (d[c] = !0),
            (g.g = d));
         return g;
      };
   }
   var E =
      window.ShadyDOM && window.ShadyDOM.noPatch && window.ShadyDOM.wrap
         ? window.ShadyDOM.wrap
         : window.ShadyDOM
         ? function (a) {
              return ShadyDOM.patch(a);
           }
         : function (a) {
              return a;
           };
   var Fb = D(function (a) {
      function b() {
         var c = a.call(this) || this;
         c.__dataEnabled = !1;
         c.ed = !1;
         c.cd = !1;
         c.__data = {};
         c.__dataPending = null;
         c.__dataOld = null;
         c.yb = null;
         c.he = 0;
         c.ne = !1;
         c._initializeProperties();
         return c;
      }
      A(b, a);
      b.createProperties = function (c) {
         var d = this.prototype,
            e;
         for (e in c) e in d || d._createPropertyAccessor(e);
      };
      b.attributeNameForProperty = function (c) {
         return c.toLowerCase();
      };
      b.typeForProperty = function () {};
      b.prototype._createPropertyAccessor = function (c, d) {
         this._addPropertyToAttributeMap(c);
         this.hasOwnProperty("ha") || (this.ha = Object.assign({}, this.ha));
         this.ha[c] || ((this.ha[c] = !0), this._definePropertyAccessor(c, d));
      };
      b.prototype._addPropertyToAttributeMap = function (c) {
         this.hasOwnProperty("pb") || (this.pb = Object.assign({}, this.pb));
         var d = this.pb[c];
         d ||
            ((d = this.constructor.attributeNameForProperty(c)),
            (this.pb[d] = c));
         return d;
      };
      b.prototype._definePropertyAccessor = function (c, d) {
         Object.defineProperty(this, c, {
            get: function () {
               return this.__data[c];
            },
            set: d
               ? function () {}
               : function (e) {
                    this._setPendingProperty(c, e, !0) &&
                       this._invalidateProperties();
                 },
         });
      };
      b.prototype.ready = function () {
         this.ed = !0;
         this._flushProperties();
      };
      b.prototype._initializeProperties = function () {
         for (var c in this.ha)
            this.hasOwnProperty(c) &&
               ((this.yb = this.yb || {}),
               (this.yb[c] = this[c]),
               delete this[c]);
      };
      b.prototype._initializeInstanceProperties = function (c) {
         Object.assign(this, c);
      };
      b.prototype._setProperty = function (c, d) {
         this._setPendingProperty(c, d) && this._invalidateProperties();
      };
      b.prototype._getProperty = function (c) {
         return this.__data[c];
      };
      b.prototype._setPendingProperty = function (c, d) {
         var e = this.__data[c],
            f = this._shouldPropertyChange(c, d, e);
         f &&
            (this.__dataPending ||
               ((this.__dataPending = {}), (this.__dataOld = {})),
            !this.__dataOld || c in this.__dataOld || (this.__dataOld[c] = e),
            (this.__data[c] = d),
            (this.__dataPending[c] = d));
         return f;
      };
      b.prototype._isPropertyPending = function (c) {
         return !(!this.__dataPending || !this.__dataPending.hasOwnProperty(c));
      };
      b.prototype._invalidateProperties = function () {
         var c = this;
         !this.cd &&
            this.ed &&
            ((this.cd = !0),
            Db.run(function () {
               c.cd && ((c.cd = !1), c._flushProperties());
            }));
      };
      b.prototype._enableProperties = function () {
         this.__dataEnabled ||
            ((this.__dataEnabled = !0),
            this.yb &&
               (this._initializeInstanceProperties(this.yb), (this.yb = null)),
            this.ready());
      };
      b.prototype._flushProperties = function () {
         this.he++;
         var c = this.__data,
            d = this.__dataPending,
            e = this.__dataOld;
         this._shouldPropertiesChange(c, d, e) &&
            ((this.__dataOld = this.__dataPending = null),
            this._propertiesChanged(c, d, e));
         this.he--;
      };
      b.prototype._shouldPropertiesChange = function (c, d) {
         return !!d;
      };
      b.prototype._propertiesChanged = function () {};
      b.prototype._shouldPropertyChange = function (c, d, e) {
         return e !== d && (e === e || d === d);
      };
      b.prototype.attributeChangedCallback = function (c, d, e, f) {
         d !== e && this._attributeToProperty(c, e);
         a.prototype.attributeChangedCallback &&
            a.prototype.attributeChangedCallback.call(this, c, d, e, f);
      };
      b.prototype._attributeToProperty = function (c, d, e) {
         if (!this.ne) {
            var f = this.pb;
            c = (f && f[c]) || c;
            this[c] = this._deserializeValue(
               d,
               e || this.constructor.typeForProperty(c)
            );
         }
      };
      b.prototype._propertyToAttribute = function (c, d, e) {
         this.ne = !0;
         e = 3 > arguments.length ? this[c] : e;
         this._valueToNodeAttribute(
            this,
            e,
            d || this.constructor.attributeNameForProperty(c)
         );
         this.ne = !1;
      };
      b.prototype._valueToNodeAttribute = function (c, d, e) {
         d = this._serializeValue(d);
         if ("class" === e || "name" === e || "slot" === e) c = E(c);
         void 0 === d ? c.removeAttribute(e) : c.setAttribute(e, d);
      };
      b.prototype._serializeValue = function (c) {
         switch (typeof c) {
            case "boolean":
               return c ? "" : void 0;
            default:
               return null != c ? c.toString() : void 0;
         }
      };
      b.prototype._deserializeValue = function (c, d) {
         switch (d) {
            case Boolean:
               return null !== c;
            case Number:
               return Number(c);
            default:
               return c;
         }
      };
      return b;
   });
   var Gb = 0,
      Hb = [];
   function _regLog$$module$third_party$javascript$polymer$v2$polymer$lib$utils$telemetry(
      a
   ) {
      console.log("[" + a.is + "]: registered");
   }
   var Ib = D(function (a) {
      function b() {
         return e.apply(this, arguments) || this;
      }
      function c(f) {
         f = Object.getPrototypeOf(f);
         return f.prototype instanceof b ? f : null;
      }
      function d(f) {
         if (!f.hasOwnProperty("bg")) {
            var g = null;
            if (f.hasOwnProperty("properties")) {
               var h = f.properties;
               if (h) {
                  g = {};
                  for (var k in h) {
                     var l = h[k];
                     g[k] = "function" === typeof l ? { type: l } : l;
                  }
               }
            }
            f.bg = g;
         }
         return f.bg;
      }
      var e = Fb(a);
      A(b, e);
      b.finalize = function () {
         if (!this.hasOwnProperty("ei")) {
            var f = c(this);
            f && f.finalize();
            this.ei = !0;
            this._finalizeClass();
         }
      };
      b._finalizeClass = function () {
         var f = d(this);
         f && this.createProperties(f);
      };
      b.typeForProperty = function (f) {
         return (f = this.jb[f]) && f.type;
      };
      b.prototype._initializeProperties = function () {
         Gb++;
         this.constructor.finalize();
         e.prototype._initializeProperties.call(this);
      };
      b.prototype.connectedCallback = function () {
         e.prototype.connectedCallback &&
            e.prototype.connectedCallback.call(this);
         this._enableProperties();
      };
      b.prototype.disconnectedCallback = function () {
         e.prototype.disconnectedCallback &&
            e.prototype.disconnectedCallback.call(this);
      };
      t.Object.defineProperties(b, {
         observedAttributes: {
            configurable: !0,
            enumerable: !0,
            get: function () {
               var f = this;
               if (!this.hasOwnProperty("oc")) {
                  Hb.push(this.prototype);
                  var g = this.jb;
                  this.oc = g
                     ? Object.keys(g).map(function (h) {
                          return f.prototype._addPropertyToAttributeMap(h);
                       })
                     : [];
               }
               return this.oc;
            },
         },
         jb: {
            configurable: !0,
            enumerable: !0,
            get: function () {
               if (!this.hasOwnProperty("eg")) {
                  var f = c(this);
                  this.eg = Object.assign({}, f && f.jb, d(this));
               }
               return this.eg;
            },
         },
      });
      return b;
   });
   var Jb = {},
      Kb = /-[a-z]/g,
      Lb = /([A-Z])/g;
   function Mb(a) {
      return (
         Jb[a] ||
         (Jb[a] =
            0 > a.indexOf("-")
               ? a
               : a.replace(Kb, function (b) {
                    return b[1].toUpperCase();
                 }))
      );
   }
   function Nb(a) {
      return Jb[a] || (Jb[a] = a.replace(Lb, "-$1").toLowerCase());
   }
   for (var Ob = {}, Pb = HTMLElement.prototype; Pb; ) {
      for (
         var Qb = Object.getOwnPropertyNames(Pb), Rb = 0;
         Rb < Qb.length;
         Rb++
      )
         Ob[Qb[Rb]] = !0;
      Pb = Object.getPrototypeOf(Pb);
   }
   var Sb;
   Sb = window.trustedTypes
      ? function (a) {
           return (
              trustedTypes.isHTML(a) ||
              trustedTypes.isScript(a) ||
              trustedTypes.isScriptURL(a)
           );
        }
      : function () {
           return !1;
        };
   var Tb = D(function (a) {
      function b() {
         return c.apply(this, arguments) || this;
      }
      var c = Fb(a);
      A(b, c);
      b.createPropertiesForAttributes = function () {
         for (var d = this.observedAttributes, e = 0; e < d.length; e++)
            this.prototype._createPropertyAccessor(Mb(d[e]));
      };
      b.attributeNameForProperty = function (d) {
         return Nb(d);
      };
      b.prototype._initializeProperties = function () {
         this.ta &&
            (this._initializeProtoProperties(this.ta), (this.ta = null));
         c.prototype._initializeProperties.call(this);
      };
      b.prototype._initializeProtoProperties = function (d) {
         for (var e in d) this._setProperty(e, d[e]);
      };
      b.prototype._ensureAttribute = function (d, e) {
         this.hasAttribute(d) || this._valueToNodeAttribute(this, e, d);
      };
      b.prototype._serializeValue = function (d) {
         switch (typeof d) {
            case "object":
               if (d instanceof Date) return d.toString();
               if (d) {
                  if (Sb(d)) return d;
                  try {
                     return JSON.stringify(d);
                  } catch (e) {
                     return "";
                  }
               }
            default:
               return c.prototype._serializeValue.call(this, d);
         }
      };
      b.prototype._deserializeValue = function (d, e) {
         switch (e) {
            case Object:
               try {
                  var f = JSON.parse(d);
               } catch (g) {
                  f = d;
               }
               break;
            case Array:
               try {
                  f = JSON.parse(d);
               } catch (g) {
                  (f = null),
                     console.warn(
                        "Polymer::Attributes: couldn't decode Array as JSON: " +
                           d
                     );
               }
               break;
            case Date:
               f = isNaN(d) ? String(d) : Number(d);
               f = new Date(f);
               break;
            default:
               f = c.prototype._deserializeValue.call(this, d, e);
         }
         return f;
      };
      b.prototype._definePropertyAccessor = function (d, e) {
         if (!Ob[d]) {
            var f = this[d];
            void 0 !== f &&
               (this.__data
                  ? this._setPendingProperty(d, f)
                  : (this.ta
                       ? this.hasOwnProperty("ta") ||
                         (this.ta = Object.create(this.ta))
                       : (this.ta = {}),
                    (this.ta[d] = f)));
         }
         c.prototype._definePropertyAccessor.call(this, d, e);
      };
      b.prototype._hasAccessor = function (d) {
         return this.ha && this.ha[d];
      };
      b.prototype._isPropertyPending = function (d) {
         return !!(this.__dataPending && d in this.__dataPending);
      };
      return b;
   });
   var Ub = { "dom-if": !0, "dom-repeat": !0 },
      Vb = !1,
      Wb = !1;
   function Xb(a, b) {
      var c = b.parentInfo && Xb(a, b.parentInfo);
      if (c)
         for (a = c.firstChild, c = 0; a; a = a.nextSibling) {
            if (b.parentIndex === c++) return a;
         }
      else return a;
   }
   function Yb(a, b) {
      a = a.ic || a;
      return function (c) {
         if (a[b]) a[b](c, c.detail);
         else console.warn("listener method `" + b + "` not defined");
      };
   }
   var Zb = D(function (a) {
      function b() {
         return a.apply(this, arguments) || this;
      }
      A(b, a);
      b._parseTemplate = function (c, d) {
         if (!c._templateInfo) {
            var e = (c._templateInfo = {});
            e.nodeInfoList = [];
            e.hk = !!d;
            e.oh =
               (d && d.oh) ||
               (c.hasAttribute && c.hasAttribute("strip-whitespace"));
            this._parseTemplateContent(c, e, { parent: null });
         }
         return c._templateInfo;
      };
      b._parseTemplateContent = function (c, d, e) {
         return this._parseTemplateNode(c.content, d, e);
      };
      b._parseTemplateNode = function (c, d, e) {
         var f = !1;
         "template" != c.localName || c.hasAttribute("preserve-content")
            ? "slot" === c.localName && (d.hasInsertionPoint = !0)
            : (f = this._parseTemplateNestedTemplate(c, d, e) || f);
         if (!Vb) {
            Vb = !0;
            var g = document.createElement("textarea");
            g.placeholder = "a";
            Wb = g.placeholder === g.textContent;
         }
         Wb &&
            "textarea" === c.localName &&
            c.placeholder &&
            c.placeholder === c.textContent &&
            (c.textContent = null);
         c.firstChild && this._parseTemplateChildNodes(c, d, e);
         c.hasAttributes &&
            c.hasAttributes() &&
            (f = this._parseTemplateNodeAttributes(c, d, e) || f);
         return f || e.g;
      };
      b._parseTemplateChildNodes = function (c, d, e) {
         if ("script" !== c.localName && "style" !== c.localName)
            for (var f = c.firstChild, g = 0, h; f; f = h) {
               if (
                  "template" == f.localName &&
                  (h = f.getAttribute("is")) &&
                  Ub[h]
               ) {
                  var k = f;
                  k.removeAttribute("is");
                  f = k.ownerDocument.createElement(h);
                  k.parentNode.replaceChild(f, k);
                  for (f.appendChild(k); k.attributes.length; )
                     f.setAttribute(
                        k.attributes[0].name,
                        k.attributes[0].value
                     ),
                        k.removeAttribute(k.attributes[0].name);
               }
               h = f.nextSibling;
               if (f.nodeType === Node.TEXT_NODE) {
                  for (k = h; k && k.nodeType === Node.TEXT_NODE; )
                     (f.textContent += k.textContent),
                        (h = k.nextSibling),
                        c.removeChild(k),
                        (k = h);
                  if (d.oh && !f.textContent.trim()) {
                     c.removeChild(f);
                     continue;
                  }
               }
               k = { parentIndex: g, parentInfo: e };
               this._parseTemplateNode(f, d, k) &&
                  (k.infoIndex = d.nodeInfoList.push(k) - 1);
               f.parentNode && g++;
            }
      };
      b._parseTemplateNestedTemplate = function (c, d, e) {
         d = this._parseTemplate(c, d);
         (d.content =
            c.content.ownerDocument.createDocumentFragment()).appendChild(
            c.content
         );
         e.templateInfo = d;
         return !0;
      };
      b._parseTemplateNodeAttributes = function (c, d, e) {
         for (
            var f = !1, g = Array.from(c.attributes), h = g.length - 1, k;
            (k = g[h]);
            h--
         )
            f = this._parseTemplateNodeAttribute(c, d, e, k.name, k.value) || f;
         return f;
      };
      b._parseTemplateNodeAttribute = function (c, d, e, f, g) {
         return "on-" === f.slice(0, 3)
            ? (c.removeAttribute(f),
              (e.events = e.events || []),
              e.events.push({ name: f.slice(3), value: g }),
              !0)
            : "id" === f
            ? ((e.id = g), !0)
            : !1;
      };
      b._contentForTemplate = function (c) {
         var d = c._templateInfo;
         return (d && d.content) || c.content;
      };
      b.prototype._stampTemplate = function (c, d) {
         c &&
            !c.content &&
            window.HTMLTemplateElement &&
            HTMLTemplateElement.decorate &&
            HTMLTemplateElement.decorate(c);
         d = d || this.constructor._parseTemplate(c);
         var e = d.nodeInfoList;
         c = document.importNode(d.content || c.content, !0);
         c.__noInsertionPoint = !d.hasInsertionPoint;
         var f = (c.nodeList = Array(e.length));
         c.$ = {};
         for (var g = 0, h = e.length, k = void 0; g < h && (k = e[g]); g++) {
            var l = (f[g] = Xb(c, k));
            k.id && (c.$[k.id] = l);
            var n = l,
               p = d;
            k.templateInfo && ((n._templateInfo = k.templateInfo), (n.gj = p));
            if (k.events && k.events.length) {
               n = 0;
               p = k.events;
               for (var q = void 0; n < p.length && (q = p[n]); n++)
                  this._addMethodEventListenerToNode(l, q.name, q.value, this);
            }
         }
         return c;
      };
      b.prototype._addMethodEventListenerToNode = function (c, d, e, f) {
         e = Yb(f || c, e);
         this._addEventListenerToNode(c, d, e);
         return e;
      };
      b.prototype._addEventListenerToNode = function (c, d, e) {
         c.addEventListener(d, e);
      };
      b.prototype._removeEventListenerFromNode = function (c, d, e) {
         c.removeEventListener(d, e);
      };
      return b;
   });
   function $b(a) {
      var b = a.indexOf(".");
      return -1 === b ? a : a.slice(0, b);
   }
   function ac(a) {
      if (Array.isArray(a)) {
         for (var b = [], c = 0; c < a.length; c++)
            for (var d = a[c].toString().split("."), e = 0; e < d.length; e++)
               b.push(d[e]);
         return b.join(".");
      }
      return a;
   }
   function bc(a) {
      return Array.isArray(a) ? ac(a).split(".") : a.toString().split(".");
   }
   function F(a, b, c) {
      b = bc(b);
      for (var d = 0; d < b.length; d++) {
         if (!a) return;
         a = a[b[d]];
      }
      c && (c.path = b.join("."));
      return a;
   }
   function cc(a, b, c) {
      var d = bc(b),
         e = d[d.length - 1];
      if (1 < d.length) {
         for (b = 0; b < d.length - 1; b++) if (((a = a[d[b]]), !a)) return;
         a[e] = c;
      } else a[b] = c;
      return d.join(".");
   } /*
 Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 Google as part of the polymer project is also subject to an additional IP
 rights grant found at http://polymer.github.io/PATENTS.txt
*/
   var dc = 0,
      ec = [],
      fc = {
         rk: "__computeEffects",
         zk: "__reflectEffects",
         sf: "__notifyEffects",
         ai: "__propagateEffects",
         uk: "__observeEffects",
         READ_ONLY: "__readOnly",
      },
      gc = /[A-Z]/;
   function hc(a, b, c) {
      var d = a[b];
      if (!d) d = a[b] = {};
      else if (!a.hasOwnProperty(b) && ((d = a[b] = Object.create(a[b])), c))
         for (var e in d)
            for (a = d[e], b = d[e] = Array(a.length), c = 0; c < a.length; c++)
               b[c] = a[c];
      return d;
   }
   function ic(a, b, c, d, e, f) {
      if (b) {
         var g = !1,
            h = dc++,
            k;
         for (k in c) {
            var l = e ? $b(k) : k;
            if ((l = b[l]))
               for (
                  var n = 0, p = l.length, q = void 0;
                  n < p && (q = l[n]);
                  n++
               )
                  (q.info && q.info.uc === h) ||
                     (e && !jc(k, q.mc)) ||
                     (q.info && (q.info.uc = h),
                     q.sa(a, k, c, d, q.info, e, f),
                     (g = !0));
         }
         return g;
      }
      return !1;
   }
   function jc(a, b) {
      if (b) {
         var c = b.name;
         return (
            c == a ||
            !(!b.structured || 0 !== c.indexOf(a + ".")) ||
            !(!b.wildcard || 0 !== a.indexOf(c + "."))
         );
      }
      return !0;
   }
   function kc(a, b, c, d, e) {
      b = "string" === typeof e.method ? a[e.method] : e.method;
      c = e.mh;
      b
         ? b.call(a, a.__data[c], d[c])
         : e.dynamicFn ||
           console.warn("observer method `" + e.method + "` not defined");
   }
   function lc(a, b, c, d) {
      c = { value: c, jk: !0 };
      d && (c.path = d);
      E(a).dispatchEvent(new CustomEvent(b, { detail: c }));
   }
   function mc(a, b, c, d, e, f) {
      f = (d = (f ? $b(b) : b) != b ? b : null) ? F(a, d) : a.__data[b];
      d && void 0 === f && (f = c[b]);
      lc(a, e.uj, f, d);
   }
   function nc(a, b, c, d, e) {
      c = a.__data[b];
      eb && (c = eb(c, e.attrName, "attribute", a));
      a._propertyToAttribute(b, e.attrName, c);
   }
   function oc(a, b, c, d, e) {
      var f = e ? $b(a) : a;
      if ((b = b[f]))
         for (f = 0; f < b.length; f++) {
            var g = b[f];
            if (g.info.uc !== dc && (!e || jc(a, g.mc))) {
               g.info.uc = dc;
               g = g.info;
               for (
                  var h = c, k = d, l = 0, n = h.length - 1, p = -1;
                  l <= n;

               ) {
                  var q = (l + n) >> 1,
                     r = k.get(h[q].vc) - k.get(g.vc);
                  if (0 > r) l = q + 1;
                  else if (0 < r) n = q - 1;
                  else {
                     p = q;
                     break;
                  }
               }
               0 > p && (p = n + 1);
               h.splice(p, 0, g);
            }
         }
   }
   function pc(a) {
      var b = a.constructor.gi;
      if (!b) {
         b = new Map();
         for (
            var c = a.__computeEffects,
               d = qc(a),
               e = d.oj,
               f = d.ready,
               g = d.total;
            (d = f.shift());

         )
            b.set(d, b.size),
               (d = c[d]) &&
                  d.forEach(function (h) {
                     h = h.info.vc;
                     --g;
                     0 === --e[h] && f.push(h);
                  });
         0 !== g &&
            console.warn(
               "Computed graph for " + a.localName + " incomplete; circular?"
            );
         a.constructor.gi = b;
      }
      return b;
   }
   function qc(a) {
      var b = a.__computeInfo,
         c = {};
      a = a.__computeEffects;
      var d = [],
         e = 0,
         f;
      for (f in b) {
         var g = b[f];
         e += c[f] =
            g.args.filter(function (k) {
               return !k.literal;
            }).length + (g.dynamicFn ? 1 : 0);
      }
      for (var h in a) b[h] || d.push(h);
      return { oj: c, ready: d, total: e };
   }
   function rc(a, b, c, d, e) {
      b = sc(a, b, c, d, e);
      if (b === ec) return !1;
      e = e.vc;
      if (a.ha && a.ha[e]) return a._setPendingProperty(e, b, !0);
      a[e] = b;
      return !1;
   }
   function tc(a, b, c, d, e, f, g) {
      c.bindings = c.bindings || [];
      d = {
         kind: d,
         target: e,
         parts: f,
         literal: g,
         isCompound: 1 !== f.length,
      };
      c.bindings.push(d);
      d.target &&
         "attribute" != d.kind &&
         "text" != d.kind &&
         !d.isCompound &&
         "{" === d.parts[0].mode &&
         ((c = d.parts[0]),
         (f = c.negate),
         (d.listenerEvent = c.event || Nb(e) + "-changed"),
         (d.listenerNegate = f));
      e = b.nodeInfoList.length;
      for (c = 0; c < d.parts.length; c++) {
         var h = d.parts[c];
         h.compoundIndex = c;
         f = a;
         g = b;
         var k = d,
            l = h,
            n = e;
         if (!l.literal)
            if ("attribute" === k.kind && "-" === k.target[0])
               console.warn(
                  "Cannot set attribute " +
                     k.target +
                     ' because "-" is not a valid attribute starting character'
               );
            else
               for (
                  h = l.dependencies,
                     k = { index: n, mj: k, wc: l, tj: f },
                     l = 0;
                  l < h.length;
                  l++
               )
                  (n = h[l]),
                     "string" == typeof n && ((n = uc(n)), (n.wildcard = !0)),
                     f._addTemplatePropertyEffect(g, n.rootProperty, {
                        sa: vc,
                        info: k,
                        mc: n,
                     });
      }
   }
   function vc(a, b, c, d, e, f, g) {
      g = g[e.index];
      var h = e.mj,
         k = e.wc;
      f &&
      k.source &&
      b.length > k.source.length &&
      "property" == h.kind &&
      !h.isCompound &&
      g.wf &&
      g.ha &&
      g.ha[h.target]
         ? ((c = c[b]),
           (b = h.target + b.slice(k.source.length)),
           g._setPendingPropertyOrPath(b, c, !1, !0) && a._enqueueClient(g))
         : ((b = e.tj._evaluateBinding(a, k, b, c, d, f)),
           b !== ec &&
              (h.isCompound &&
                 ((c = g.__dataCompoundStorage[h.target]),
                 (c[k.compoundIndex] = b),
                 (b = c.join(""))),
              "attribute" === h.kind ||
                 ("textContent" !== h.target &&
                    ("value" !== h.target ||
                       ("input" !== g.localName &&
                          "textarea" !== g.localName))) ||
                 (b = void 0 == b ? "" : b),
              (k = b),
              eb && (k = eb(k, h.target, h.kind, g)),
              "attribute" == h.kind
                 ? a._valueToNodeAttribute(g, k, h.target)
                 : ((h = h.target),
                   g.wf && g.ha && g.ha[h]
                      ? (g.__readOnly && g.__readOnly[h]) ||
                        (g._setPendingProperty(h, k) && a._enqueueClient(g))
                      : a._setUnmanagedPropertyToNode(g, h, k))));
   }
   function wc(a, b, c) {
      if (c.listenerEvent) {
         var d = c.parts[0];
         a.addEventListener(c.listenerEvent, function (e) {
            var f = c.target,
               g = d.source,
               h = e.detail,
               k = h && h.path;
            k
               ? ((g += k.slice(f.length)), (e = h && h.value))
               : (e = e.currentTarget[f]);
            (b.__readOnly && b.__readOnly[g]) ||
               !b._setPendingPropertyOrPath(g, d.negate ? !e : e, !0, !!k) ||
               (h && h.jk) ||
               b._invalidateProperties();
         });
      }
   }
   function xc(a, b, c, d, e, f) {
      f = b.static || (f && ("object" !== typeof f || f[b.methodName]));
      e = { methodName: b.methodName, args: b.args, vc: e, dynamicFn: f };
      for (var g = 0, h = void 0; g < b.args.length && (h = b.args[g]); g++)
         h.literal ||
            a._addPropertyEffect(h.rootProperty, c, { sa: d, info: e, mc: h });
      f && a._addPropertyEffect(b.methodName, c, { sa: d, info: e });
      return e;
   }
   function sc(a, b, c, d, e) {
      d = a.ic || a;
      var f = d[e.methodName];
      if (f)
         return (
            (a = a._marshalArgs(e.args, b, c)), a === ec ? ec : f.apply(d, a)
         );
      e.dynamicFn || console.warn("method `" + e.methodName + "` not defined");
   }
   var yc = [],
      zc = RegExp(
         "(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})",
         "g"
      );
   function Ac(a) {
      for (var b = "", c = 0; c < a.length; c++) b += a[c].literal || "";
      return b;
   }
   function Bc(a) {
      if ((a = a.match(/([^\s]+?)\(([\s\S]*)\)/))) {
         var b = { methodName: a[1], static: !0, args: yc };
         return a[2].trim()
            ? Cc(a[2].replace(/\\,/g, "&comma;").split(","), b)
            : b;
      }
      return null;
   }
   function Cc(a, b) {
      b.args = a.map(function (c) {
         c = uc(c);
         c.literal || (b.static = !1);
         return c;
      }, this);
      return b;
   }
   function uc(a) {
      a = a
         .trim()
         .replace(/&comma;/g, ",")
         .replace(/\\(.)/g, "$1");
      var b = { name: a, value: "", literal: !1 },
         c = a[0];
      "-" === c && (c = a[1]);
      "0" <= c && "9" >= c && (c = "#");
      switch (c) {
         case "'":
         case '"':
            b.value = a.slice(1, -1);
            b.literal = !0;
            break;
         case "#":
            (b.value = Number(a)), (b.literal = !0);
      }
      b.literal ||
         ((b.rootProperty = $b(a)),
         (b.structured = 0 <= a.indexOf(".")),
         b.structured &&
            ((b.wildcard = ".*" == a.slice(-2)),
            b.wildcard && (b.name = a.slice(0, -2))));
      return b;
   }
   function Dc(a, b, c) {
      a = F(a, c);
      void 0 === a && (a = b[c]);
      return a;
   }
   function Ec(a, b, c, d) {
      d = { indexSplices: d };
      lb && !a.lg && (b.ql = d);
      a.notifyPath(c + ".splices", d);
      a.notifyPath(c + ".length", b.length);
      lb && !a.lg && (d.indexSplices = []);
   }
   function Fc(a, b, c, d, e, f) {
      Ec(a, b, c, [
         { index: d, addedCount: e, removed: f, object: b, type: "splice" },
      ]);
   }
   var Hc = D(function (a) {
         function b() {
            var d = c.call(this) || this;
            d.wf = !0;
            return d;
         }
         var c = Zb(Tb(a));
         A(b, c);
         b.prototype._initializeProperties = function () {
            c.prototype._initializeProperties.call(this);
            this._registerHost();
            this.__dataClientsReady = !1;
            this.__dataLinkedPaths =
               this.__dataToNotify =
               this.__dataPendingClients =
                  null;
            this.__dataHasPaths = !1;
            this.__dataCompoundStorage = this.__dataCompoundStorage || null;
            this.__dataHost = this.__dataHost || null;
            this.__dataTemp = {};
            this.__dataClientsInitialized = !1;
         };
         b.prototype._registerHost = function () {
            if (Gc.length) {
               var d = Gc[Gc.length - 1];
               d._enqueueClient(this);
               this.__dataHost = d;
            }
         };
         b.prototype._initializeProtoProperties = function (d) {
            this.__data = Object.create(d);
            this.__dataPending = Object.create(d);
            this.__dataOld = {};
         };
         b.prototype._initializeInstanceProperties = function (d) {
            var e = this.__readOnly,
               f;
            for (f in d)
               (e && e[f]) ||
                  ((this.__dataPending = this.__dataPending || {}),
                  (this.__dataOld = this.__dataOld || {}),
                  (this.__data[f] = this.__dataPending[f] = d[f]));
         };
         b.prototype._addPropertyEffect = function (d, e, f) {
            this._createPropertyAccessor(d, "__readOnly" == e);
            var g = hc(this, e, !0)[d];
            g || (g = this[e][d] = []);
            g.push(f);
         };
         b.prototype._removePropertyEffect = function (d, e, f) {
            d = hc(this, e, !0)[d];
            f = d.indexOf(f);
            0 <= f && d.splice(f, 1);
         };
         b.prototype._hasPropertyEffect = function (d, e) {
            e = this[e];
            return !(!e || !e[d]);
         };
         b.prototype._hasReadOnlyEffect = function (d) {
            return this._hasPropertyEffect(d, "__readOnly");
         };
         b.prototype._hasNotifyEffect = function (d) {
            return this._hasPropertyEffect(d, "__notifyEffects");
         };
         b.prototype._hasReflectEffect = function (d) {
            return this._hasPropertyEffect(d, "__reflectEffects");
         };
         b.prototype._hasComputedEffect = function (d) {
            return this._hasPropertyEffect(d, "__computeEffects");
         };
         b.prototype._setPendingPropertyOrPath = function (d, e, f, g) {
            if (g || $b(Array.isArray(d) ? d[0] : d) !== d) {
               if (
                  !g &&
                  ((g = F(this, d)),
                  (d = cc(this, d, e)),
                  !d || !c.prototype._shouldPropertyChange.call(this, d, e, g))
               )
                  return !1;
               this.__dataHasPaths = !0;
               if (this._setPendingProperty(d, e, f)) {
                  if ((f = this.__dataLinkedPaths))
                     for (var h in f)
                        (g = f[h]),
                           0 === d.indexOf(h + ".")
                              ? ((g += d.slice(h.length)),
                                this._setPendingPropertyOrPath(g, e, !0, !0))
                              : 0 === d.indexOf(g + ".") &&
                                ((g = h + d.slice(g.length)),
                                this._setPendingPropertyOrPath(g, e, !0, !0));
                  return !0;
               }
            } else {
               if (this.ha && this.ha[d])
                  return this._setPendingProperty(d, e, f);
               this[d] = e;
            }
            return !1;
         };
         b.prototype._setUnmanagedPropertyToNode = function (d, e, f) {
            if (f !== d[e] || "object" == typeof f)
               "className" === e && (d = E(d)), (d[e] = f);
         };
         b.prototype._setPendingProperty = function (d, e, f) {
            var g = this.__dataHasPaths && 0 <= d.indexOf(".");
            if (
               this._shouldPropertyChange(
                  d,
                  e,
                  (g ? this.__dataTemp : this.__data)[d]
               )
            ) {
               this.__dataPending ||
                  ((this.__dataPending = {}), (this.__dataOld = {}));
               d in this.__dataOld || (this.__dataOld[d] = this.__data[d]);
               g ? (this.__dataTemp[d] = e) : (this.__data[d] = e);
               this.__dataPending[d] = e;
               if (g || (this.__notifyEffects && this.__notifyEffects[d]))
                  (this.__dataToNotify = this.__dataToNotify || {}),
                     (this.__dataToNotify[d] = f);
               return !0;
            }
            return !1;
         };
         b.prototype._setProperty = function (d, e) {
            this._setPendingProperty(d, e, !0) && this._invalidateProperties();
         };
         b.prototype._invalidateProperties = function () {
            this.ed && this._flushProperties();
         };
         b.prototype._enqueueClient = function (d) {
            this.__dataPendingClients = this.__dataPendingClients || [];
            d !== this && this.__dataPendingClients.push(d);
         };
         b.prototype._flushClients = function () {
            this.__dataClientsReady
               ? this.__enableOrFlushClients()
               : ((this.__dataClientsReady = !0),
                 this._readyClients(),
                 (this.ed = !0));
         };
         b.prototype.__enableOrFlushClients = function () {
            var d = this.__dataPendingClients;
            if (d) {
               this.__dataPendingClients = null;
               for (var e = 0; e < d.length; e++) {
                  var f = d[e];
                  f.__dataEnabled
                     ? f.__dataPending && f._flushProperties()
                     : f._enableProperties();
               }
            }
         };
         b.prototype._readyClients = function () {
            this.__enableOrFlushClients();
         };
         b.prototype.setProperties = function (d, e) {
            for (var f in d)
               (!e && this.__readOnly && this.__readOnly[f]) ||
                  this._setPendingPropertyOrPath(f, d[f], !0);
            this._invalidateProperties();
         };
         b.prototype.ready = function () {
            this._flushProperties();
            this.__dataClientsReady || this._flushClients();
            this.__dataPending && this._flushProperties();
         };
         b.prototype._propertiesChanged = function (d, e, f) {
            d = this.__dataHasPaths;
            this.__dataHasPaths = !1;
            var g;
            if ((g = this.__computeEffects))
               if (mb) {
                  dc++;
                  var h = pc(this),
                     k = [],
                     l;
                  for (l in e) oc(l, g, k, h, d);
                  for (; (l = k.shift()); )
                     rc(this, "", e, f, l) && oc(l.vc, g, k, h, d);
                  Object.assign(f, this.__dataOld);
                  Object.assign(e, this.__dataPending);
                  this.__dataPending = null;
               } else
                  for (h = e; ic(this, g, h, f, d); )
                     Object.assign(f, this.__dataOld),
                        Object.assign(e, this.__dataPending),
                        (h = this.__dataPending),
                        (this.__dataPending = null);
            g = this.__dataToNotify;
            this.__dataToNotify = null;
            this._propagatePropertyChanges(e, f, d);
            this._flushClients();
            ic(this, this.__reflectEffects, e, f, d);
            ic(this, this.__observeEffects, e, f, d);
            if (g) {
               h = this.__notifyEffects;
               k = dc++;
               for (var n in g)
                  if (g[n]) {
                     if ((l = h)) {
                        var p = h;
                        l = k;
                        var q = n,
                           r = e,
                           w = f,
                           v = d,
                           I = !1,
                           z = v ? $b(q) : q;
                        if ((p = p[z])) {
                           z = 0;
                           for (
                              var K = p.length, R = void 0;
                              z < K && (R = p[z]);
                              z++
                           )
                              (R.info && R.info.uc === l) ||
                                 (v && !jc(q, R.mc)) ||
                                 (R.info && (R.info.uc = l),
                                 R.sa(this, q, r, w, R.info, v, void 0),
                                 (I = !0));
                        }
                        l = I;
                     }
                     if (l) var fa = !0;
                     else {
                        if ((l = d))
                           (l = n),
                              (q = e),
                              (r = $b(l)),
                              r !== l
                                 ? ((r = Nb(r) + "-changed"),
                                   lc(this, r, q[l], l),
                                   (l = !0))
                                 : (l = !1);
                        l && (fa = !0);
                     }
                  }
               var Ka;
               fa &&
                  (Ka = this.__dataHost) &&
                  Ka._invalidateProperties &&
                  Ka._invalidateProperties();
            }
            1 == this.he && (this.__dataTemp = {});
         };
         b.prototype._propagatePropertyChanges = function (d, e, f) {
            this.__propagateEffects &&
               ic(this, this.__propagateEffects, d, e, f);
            this.__templateInfo &&
               this._runEffectsForTemplate(this.__templateInfo, d, e, f);
         };
         b.prototype._runEffectsForTemplate = function (d, e, f, g) {
            function h(l, n) {
               ic(k, d.propertyEffects, l, f, n, d.nodeList);
               for (var p = d.firstChild; p; p = p.nextSibling)
                  k._runEffectsForTemplate(p, l, f, n);
            }
            var k = this;
            d.xd ? d.xd(h, e, g) : h(e, g);
         };
         b.prototype.linkPaths = function (d, e) {
            d = ac(d);
            e = ac(e);
            this.__dataLinkedPaths = this.__dataLinkedPaths || {};
            this.__dataLinkedPaths[d] = e;
         };
         b.prototype.unlinkPaths = function (d) {
            d = ac(d);
            this.__dataLinkedPaths && delete this.__dataLinkedPaths[d];
         };
         b.prototype.notifySplices = function (d, e) {
            var f = { path: "" };
            d = F(this, d, f);
            Ec(this, d, f.path, e);
         };
         b.prototype.get = function (d, e) {
            return F(e || this, d);
         };
         b.prototype.set = function (d, e, f) {
            f
               ? cc(f, d, e)
               : (this.__readOnly && this.__readOnly[d]) ||
                 (this._setPendingPropertyOrPath(d, e, !0) &&
                    this._invalidateProperties());
         };
         b.prototype.push = function (d, e) {
            for (var f = [], g = 1; g < arguments.length; ++g)
               f[g - 1] = arguments[g];
            g = { path: "" };
            var h = F(this, d, g),
               k = h.length,
               l = h.push.apply(h, ha(f));
            f.length && Fc(this, h, g.path, k, f.length, []);
            return l;
         };
         b.prototype.pop = function (d) {
            var e = { path: "" };
            d = F(this, d, e);
            var f = !!d.length,
               g = d.pop();
            f && Fc(this, d, e.path, d.length, 0, [g]);
            return g;
         };
         b.prototype.splice = function (d, e, f, g) {
            for (var h = [], k = 3; k < arguments.length; ++k)
               h[k - 3] = arguments[k];
            k = { path: "" };
            var l = F(this, d, k);
            0 > e ? (e = l.length - Math.floor(-e)) : e && (e = Math.floor(e));
            var n =
               2 === arguments.length
                  ? l.splice(e)
                  : l.splice.apply(l, [e, f].concat(ha(h)));
            (h.length || n.length) && Fc(this, l, k.path, e, h.length, n);
            return n;
         };
         b.prototype.shift = function (d) {
            var e = { path: "" };
            d = F(this, d, e);
            var f = !!d.length,
               g = d.shift();
            f && Fc(this, d, e.path, 0, 0, [g]);
            return g;
         };
         b.prototype.unshift = function (d, e) {
            for (var f = [], g = 1; g < arguments.length; ++g)
               f[g - 1] = arguments[g];
            g = { path: "" };
            var h = F(this, d, g),
               k = h.unshift.apply(h, ha(f));
            f.length && Fc(this, h, g.path, 0, f.length, []);
            return k;
         };
         b.prototype.notifyPath = function (d, e) {
            if (1 == arguments.length) {
               var f = { path: "" };
               e = F(this, d, f);
               f = f.path;
            } else f = Array.isArray(d) ? ac(d) : d;
            this._setPendingPropertyOrPath(f, e, !0, !0) &&
               this._invalidateProperties();
         };
         b.prototype._createReadOnlyProperty = function (d, e) {
            this._addPropertyEffect(d, "__readOnly");
            e &&
               (this["_set" + (d[0].toUpperCase() + d.substring(1))] =
                  function (f) {
                     this._setProperty(d, f);
                  });
         };
         b.prototype._createPropertyObserver = function (d, e, f) {
            var g = { mh: d, method: e, dynamicFn: !!f };
            this._addPropertyEffect(d, "__observeEffects", {
               sa: kc,
               info: g,
               mc: { name: d },
            });
            f &&
               this._addPropertyEffect(e, "__observeEffects", {
                  sa: kc,
                  info: g,
                  mc: { name: e },
               });
         };
         b.prototype._createMethodObserver = function (d, e) {
            var f = Bc(d);
            if (!f) throw Error("Malformed observer expression '" + d + "'");
            xc(this, f, "__observeEffects", sc, null, e);
         };
         b.prototype._createNotifyingProperty = function (d) {
            this._addPropertyEffect(d, "__notifyEffects", {
               sa: mc,
               info: { uj: Nb(d) + "-changed", mh: d },
            });
         };
         b.prototype._createReflectedProperty = function (d) {
            var e = this.constructor.attributeNameForProperty(d);
            "-" === e[0]
               ? console.warn(
                    "Property " +
                       d +
                       " cannot be reflected to attribute " +
                       e +
                       ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'
                 )
               : this._addPropertyEffect(d, "__reflectEffects", {
                    sa: nc,
                    info: { attrName: e },
                 });
         };
         b.prototype._createComputedProperty = function (d, e, f) {
            var g = Bc(e);
            if (!g) throw Error("Malformed computed expression '" + e + "'");
            e = xc(this, g, "__computeEffects", rc, d, f);
            hc(this, "__computeInfo")[d] = e;
         };
         b.prototype._marshalArgs = function (d, e, f) {
            for (var g = this.__data, h = [], k = 0, l = d.length; k < l; k++) {
               var n = d[k],
                  p = n.name,
                  q = n.structured,
                  r = n.wildcard,
                  w = n.value;
               n.literal ||
                  (r
                     ? ((n = 0 === e.indexOf(p + ".")),
                       (q = Dc(g, f, n ? e : p)),
                       (w = {
                          path: n ? e : p,
                          value: q,
                          base: n ? F(g, p) : q,
                       }))
                     : (w = q ? Dc(g, f, p) : g[p]));
               if (lb && !this.lg && void 0 === w && 1 < d.length) return ec;
               h[k] = w;
            }
            return h;
         };
         b.addPropertyEffect = function (d, e, f) {
            this.prototype._addPropertyEffect(d, e, f);
         };
         b.createPropertyObserver = function (d, e, f) {
            this.prototype._createPropertyObserver(d, e, f);
         };
         b.createMethodObserver = function (d, e) {
            this.prototype._createMethodObserver(d, e);
         };
         b.createNotifyingProperty = function (d) {
            this.prototype._createNotifyingProperty(d);
         };
         b.createReadOnlyProperty = function (d, e) {
            this.prototype._createReadOnlyProperty(d, e);
         };
         b.createReflectedProperty = function (d) {
            this.prototype._createReflectedProperty(d);
         };
         b.createComputedProperty = function (d, e, f) {
            this.prototype._createComputedProperty(d, e, f);
         };
         b.bindTemplate = function (d) {
            return this.prototype._bindTemplate(d);
         };
         b.prototype._bindTemplate = function (d, e) {
            var f = this.constructor._parseTemplate(d),
               g = this.ji == f;
            if (!g)
               for (var h in f.propertyEffects) this._createPropertyAccessor(h);
            e
               ? ((f = Object.create(f)),
                 (f.wasPreBound = g),
                 this.__templateInfo
                    ? ((d = d.gj || this.__templateInfo),
                      (e = d.lastChild),
                      (f.parent = d),
                      (d.lastChild = f),
                      (f.previousSibling = e)
                         ? (e.nextSibling = f)
                         : (d.firstChild = f))
                    : (this.__templateInfo = f))
               : (this.ji = f);
            return f;
         };
         b._addTemplatePropertyEffect = function (d, e, f) {
            (d.hostProps = d.hostProps || {})[e] = !0;
            d = d.propertyEffects = d.propertyEffects || {};
            (d[e] = d[e] || []).push(f);
         };
         b.prototype._stampTemplate = function (d, e) {
            e = e || this._bindTemplate(d, !0);
            Gc.push(this);
            d = c.prototype._stampTemplate.call(this, d, e);
            Gc.pop();
            e.nodeList = d.nodeList;
            if (!e.wasPreBound)
               for (
                  var f = (e.childNodes = []), g = d.firstChild;
                  g;
                  g = g.nextSibling
               )
                  f.push(g);
            d.templateInfo = e;
            f = e.nodeList;
            g = e.nodeInfoList;
            if (g.length)
               for (var h = 0; h < g.length; h++) {
                  var k = f[h],
                     l = g[h].bindings;
                  if (l)
                     for (var n = 0; n < l.length; n++) {
                        var p = l[n],
                           q = k,
                           r = p;
                        if (r.isCompound) {
                           for (
                              var w =
                                    q.__dataCompoundStorage ||
                                    (q.__dataCompoundStorage = {}),
                                 v = r.parts,
                                 I = Array(v.length),
                                 z = 0;
                              z < v.length;
                              z++
                           )
                              I[z] = v[z].literal;
                           v = r.target;
                           w[v] = I;
                           r.literal &&
                              "property" == r.kind &&
                              ("className" === v && (q = E(q)),
                              (q[v] = r.literal));
                        }
                        wc(k, this, p);
                     }
                  k.__dataHost = this;
               }
            this.__dataClientsReady &&
               (this._runEffectsForTemplate(e, this.__data, null, !1),
               this._flushClients());
            return d;
         };
         b.prototype._removeBoundDom = function (d) {
            d = d.templateInfo;
            var e = d.previousSibling,
               f = d.nextSibling,
               g = d.parent;
            e ? (e.nextSibling = f) : g && (g.firstChild = f);
            f ? (f.previousSibling = e) : g && (g.lastChild = e);
            d.nextSibling = d.previousSibling = null;
            d = d.childNodes;
            for (e = 0; e < d.length; e++)
               (f = d[e]), E(E(f).parentNode).removeChild(f);
         };
         b._parseTemplateNode = function (d, e, f) {
            var g = c._parseTemplateNode.call(this, d, e, f);
            if (d.nodeType === Node.TEXT_NODE) {
               var h = this._parseBindings(d.textContent, e);
               h &&
                  ((d.textContent = Ac(h) || " "),
                  tc(this, e, f, "text", "textContent", h),
                  (g = !0));
            }
            return g;
         };
         b._parseTemplateNodeAttribute = function (d, e, f, g, h) {
            var k = this._parseBindings(h, e);
            if (k) {
               h = g;
               var l = "property";
               gc.test(g)
                  ? (l = "attribute")
                  : "$" == g[g.length - 1] &&
                    ((g = g.slice(0, -1)), (l = "attribute"));
               var n = Ac(k);
               n &&
                  "attribute" == l &&
                  ("class" == g &&
                     d.hasAttribute("class") &&
                     (n += " " + d.getAttribute(g)),
                  d.setAttribute(g, n));
               "attribute" == l &&
                  "disable-upgrade$" == h &&
                  d.setAttribute(g, "");
               "input" === d.localName &&
                  "value" === h &&
                  d.setAttribute(h, "");
               d.removeAttribute(h);
               "property" === l && (g = Mb(g));
               tc(this, e, f, l, g, k, n);
               return !0;
            }
            return c._parseTemplateNodeAttribute.call(this, d, e, f, g, h);
         };
         b._parseTemplateNestedTemplate = function (d, e, f) {
            var g = c._parseTemplateNestedTemplate.call(this, d, e, f),
               h = d.parentNode,
               k = f.templateInfo,
               l = "dom-if" === h.localName,
               n = "dom-repeat" === h.localName;
            nb &&
               (l || n) &&
               (h.removeChild(d),
               (f = f.parentInfo),
               (f.templateInfo = k),
               (f.g = !0),
               (g = !1));
            d = k.hostProps;
            if (ob && l)
               d &&
                  ((e.hostProps = Object.assign(e.hostProps || {}, d)),
                  nb || (f.parentInfo.g = !0));
            else
               for (var p in d)
                  tc(this, e, f, "property", "_host_" + p, [
                     { mode: "{", source: p, dependencies: [p], wj: !0 },
                  ]);
            return g;
         };
         b._parseBindings = function (d, e) {
            for (var f = [], g = 0, h; null !== (h = zc.exec(d)); ) {
               h.index > g && f.push({ literal: d.slice(g, h.index) });
               g = h[1][0];
               var k = !!h[2];
               h = h[3].trim();
               var l = !1,
                  n = "",
                  p = -1;
               "{" == g &&
                  0 < (p = h.indexOf("::")) &&
                  ((n = h.substring(p + 2)), (h = h.substring(0, p)), (l = !0));
               p = Bc(h);
               var q = [];
               if (p) {
                  var r = p,
                     w = r.args;
                  r = r.methodName;
                  for (var v = 0; v < w.length; v++) {
                     var I = w[v];
                     I.literal || q.push(I);
                  }
                  if (((w = e.ah) && w[r]) || p.static)
                     q.push(r), (p.dynamicFn = !0);
               } else q.push(h);
               f.push({
                  source: h,
                  mode: g,
                  negate: k,
                  customEvent: l,
                  signature: p,
                  dependencies: q,
                  event: n,
               });
               g = zc.lastIndex;
            }
            g && g < d.length && (d = d.substring(g)) && f.push({ literal: d });
            return f.length ? f : null;
         };
         b._evaluateBinding = function (d, e, f, g, h, k) {
            d = e.signature
               ? sc(d, f, g, h, e.signature)
               : f != e.source
               ? F(d, e.source)
               : k && 0 <= f.indexOf(".")
               ? F(d, f)
               : d.__data[f];
            e.negate && (d = !d);
            return d;
         };
         t.Object.defineProperties(b.prototype, {
            ee: {
               configurable: !0,
               enumerable: !0,
               get: function () {
                  return fc;
               },
            },
         });
         return b;
      }),
      Gc = [];
   function Ic(a) {
      a = Xa((a.body ? a.body : a).textContent, a.baseURI);
      var b = document.createElement("style");
      b.textContent = a;
      return b;
   }
   function Jc(a) {
      a = a.trim().split(/\s+/);
      for (var b = [], c = 0; c < a.length; c++) {
         var d = b.push,
            e = d.apply,
            f;
         var g = a[c];
         if ((f = C.import(g))) {
            if (void 0 === f.g) {
               g = [];
               g.push.apply(
                  g,
                  ha(
                     _stylesFromModuleImports$$module$third_party$javascript$polymer$v2$polymer$lib$utils$style_gather(
                        f
                     )
                  )
               );
               var h = f.querySelector("template");
               h && g.push.apply(g, ha(Kc(h, f.o)));
               f.g = g;
            }
            f = f.g;
         } else
            console.warn("Could not find style data in module named", g),
               (f = []);
         e.call(d, b, ha(f));
      }
      return b;
   }
   function Kc(a, b) {
      if (!a.g) {
         for (
            var c = [], d = a.content.querySelectorAll("style"), e = 0;
            e < d.length;
            e++
         ) {
            var f = d[e],
               g = f.getAttribute("include");
            g &&
               c.push.apply(
                  c,
                  ha(
                     Jc(g).filter(function (h, k, l) {
                        return l.indexOf(h) === k;
                     })
                  )
               );
            b && (f.textContent = Xa(f.textContent, b));
            c.push(f);
         }
         a.g = c;
      }
      return a.g;
   }
   function Lc(a) {
      return (a = C.import(a))
         ? _stylesFromModuleImports$$module$third_party$javascript$polymer$v2$polymer$lib$utils$style_gather(
              a
           )
         : [];
   }
   function _stylesFromModuleImports$$module$third_party$javascript$polymer$v2$polymer$lib$utils$style_gather(
      a
   ) {
      var b = [];
      a = a.querySelectorAll("link[rel=import][type~=css]");
      for (var c = 0; c < a.length; c++) {
         var d = a[c];
         if (d.import) {
            var e = d.import;
            if ((d = d.hasAttribute("shady-unscoped")) && !e.sg) {
               var f = Ic(e);
               f.setAttribute("shady-unscoped", "");
               e.sg = f;
            } else e._style || (e._style = Ic(e));
            b.push(d ? e.sg : e._style);
         }
      }
      return b;
   }
   function _cssFromModuleImports$$module$third_party$javascript$polymer$v2$polymer$lib$utils$style_gather(
      a
   ) {
      var b = "";
      a =
         _stylesFromModuleImports$$module$third_party$javascript$polymer$v2$polymer$lib$utils$style_gather(
            a
         );
      for (var c = 0; c < a.length; c++) b += a[c].textContent;
      return b;
   }
   var Mc = window.ShadyCSS && window.ShadyCSS.cssBuild,
      Nc = D(function (a) {
         function b() {
            return d.call(this) || this;
         }
         function c(e, f, g, h) {
            if (!Mc) {
               for (
                  var k = f.content.querySelectorAll("style"),
                     l = Kc(f),
                     n = Lc(g),
                     p = f.content.firstElementChild,
                     q = 0;
                  q < n.length;
                  q++
               ) {
                  var r = n[q];
                  r.textContent = e._processStyleText(r.textContent, h);
                  f.content.insertBefore(r, p);
               }
               for (p = n = 0; p < l.length; p++)
                  (q = l[p]),
                     (r = k[n]),
                     r !== q
                        ? ((q = q.cloneNode(!0)),
                          r.parentNode.insertBefore(q, r))
                        : n++,
                     (q.textContent = e._processStyleText(q.textContent, h));
            }
            window.ShadyCSS && window.ShadyCSS.prepareTemplate(f, g);
            if (rb && Mc && cb && (f = f.content.querySelectorAll("style"))) {
               var w = "";
               Array.from(f).forEach(function (v) {
                  w += v.textContent;
                  v.parentNode.removeChild(v);
               });
               e.af = new CSSStyleSheet();
               e.af.replaceSync(w);
            }
         }
         var d = Ib(Hc(a));
         A(b, d);
         b._finalizeClass = function () {
            d._finalizeClass.call(this);
            var e;
            this.hasOwnProperty("ag") ||
               (this.ag = this.hasOwnProperty("observers")
                  ? this.observers
                  : null);
            (e = this.ag) && this.createObservers(e, this.jb);
            this._prepareTemplate();
         };
         b._prepareTemplate = function () {
            var e = this.template;
            e &&
               ("string" === typeof e
                  ? (console.error(
                       "template getter must return HTMLTemplateElement"
                    ),
                    (e = null))
                  : ib || (e = e.cloneNode(!0)));
            this.prototype._template = e;
         };
         b.createProperties = function (e) {
            for (var f in e) {
               var g = this.prototype,
                  h = f,
                  k = e[f],
                  l = e;
               k.computed && (k.readOnly = !0);
               k.computed &&
                  (g._hasReadOnlyEffect(h)
                     ? console.warn(
                          "Cannot redefine computed property '" + h + "'."
                       )
                     : g._createComputedProperty(h, k.computed, l));
               k.readOnly && !g._hasReadOnlyEffect(h)
                  ? g._createReadOnlyProperty(h, !k.computed)
                  : !1 === k.readOnly &&
                    g._hasReadOnlyEffect(h) &&
                    console.warn(
                       "Cannot make readOnly property '" + h + "' non-readOnly."
                    );
               k.reflectToAttribute && !g._hasReflectEffect(h)
                  ? g._createReflectedProperty(h)
                  : !1 === k.reflectToAttribute &&
                    g._hasReflectEffect(h) &&
                    console.warn(
                       "Cannot make reflected property '" +
                          h +
                          "' non-reflected."
                    );
               k.notify && !g._hasNotifyEffect(h)
                  ? g._createNotifyingProperty(h)
                  : !1 === k.notify &&
                    g._hasNotifyEffect(h) &&
                    console.warn(
                       "Cannot make notify property '" + h + "' non-notify."
                    );
               k.observer &&
                  g._createPropertyObserver(h, k.observer, l[k.observer]);
               g._addPropertyToAttributeMap(h);
            }
         };
         b.createObservers = function (e, f) {
            for (var g = this.prototype, h = 0; h < e.length; h++)
               g._createMethodObserver(e[h], f);
         };
         b.prototype._initializeProperties = function () {
            this.constructor.finalize();
            this.constructor._finalizeTemplate(this.localName);
            d.prototype._initializeProperties.call(this);
            this.rootPath = db;
            this.importPath = this.constructor.importPath;
            var e = this.constructor;
            if (!e.hasOwnProperty("pc")) {
               e.pc = null;
               var f = e.jb,
                  g;
               for (g in f) {
                  var h = f[g];
                  "value" in h && ((e.pc = e.pc || {}), (e.pc[g] = h));
               }
            }
            if ((e = e.pc))
               for (var k in e)
                  (f = e[k]),
                     this._canApplyPropertyDefault(k) &&
                        ((f =
                           "function" == typeof f.value
                              ? f.value.call(this)
                              : f.value),
                        this._hasAccessor(k)
                           ? this._setPendingProperty(k, f, !0)
                           : (this[k] = f));
         };
         b.prototype._canApplyPropertyDefault = function (e) {
            return !this.hasOwnProperty(e);
         };
         b._processStyleText = function (e, f) {
            return Xa(e, f);
         };
         b._finalizeTemplate = function (e) {
            var f = this.prototype._template;
            if (f && !f.h) {
               f.h = !0;
               var g = this.importPath;
               g = g ? Wa(g) : "";
               c(this, f, e, g);
               this.prototype._bindTemplate(f);
            }
         };
         b.prototype.connectedCallback = function () {
            window.ShadyCSS &&
               this._template &&
               window.ShadyCSS.styleElement(this);
            d.prototype.connectedCallback.call(this);
         };
         b.prototype.ready = function () {
            this._template &&
               ((this.root = this._stampTemplate(this._template)),
               (this.$ = this.root.$));
            d.prototype.ready.call(this);
         };
         b.prototype._readyClients = function () {
            this._template && (this.root = this._attachDom(this.root));
            d.prototype._readyClients.call(this);
         };
         b.prototype._attachDom = function (e) {
            var f = E(this);
            if (f.attachShadow)
               return e
                  ? (f.shadowRoot ||
                       (f.attachShadow({ mode: "open", kk: e }),
                       f.shadowRoot.appendChild(e),
                       this.constructor.af &&
                          (f.shadowRoot.vg = [this.constructor.af])),
                    kb &&
                       window.ShadyDOM &&
                       window.ShadyDOM.flushInitial(f.shadowRoot),
                    f.shadowRoot)
                  : null;
            throw Error(
               "ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`."
            );
         };
         b.prototype.updateStyles = function (e) {
            window.ShadyCSS && window.ShadyCSS.styleSubtree(this, e);
         };
         b.prototype.resolveUrl = function (e, f) {
            !f && this.importPath && (f = Wa(this.importPath));
            return Wa(e, f);
         };
         b._parseTemplateContent = function (e, f, g) {
            f.ah = f.ah || this.jb;
            return d._parseTemplateContent.call(this, e, f, g);
         };
         b._addTemplatePropertyEffect = function (e, f, g) {
            !jb ||
               f in this.jb ||
               (g.info.wc.signature && g.info.wc.signature.static) ||
               g.info.wc.wj ||
               e.hk ||
               console.warn(
                  "Property '" +
                     f +
                     "' used in template but not declared in 'properties'; attribute will not be observed."
               );
            return d._addTemplatePropertyEffect.call(this, e, f, g);
         };
         t.Object.defineProperties(b, {
            template: {
               configurable: !0,
               enumerable: !0,
               get: function () {
                  if (!this.hasOwnProperty("_template")) {
                     var e = this.prototype.hasOwnProperty("_template")
                        ? this.prototype._template
                        : void 0;
                     "function" === typeof e && (e = e());
                     if (void 0 === e) {
                        if ((e = this.hasOwnProperty("is"))) {
                           e = this.is;
                           var f = null;
                           if (
                              e &&
                              (!gb || hb) &&
                              ((f = C.import(e, "template")), gb && !f)
                           )
                              throw Error(
                                 "strictTemplatePolicy: expecting dom-module or null template for " +
                                    e
                              );
                           e = f;
                        }
                        e =
                           e ||
                           Object.getPrototypeOf(this.prototype).constructor
                              .template;
                     }
                     this._template = e;
                  }
                  return this._template;
               },
               set: function (e) {
                  this._template = e;
               },
            },
            importPath: {
               configurable: !0,
               enumerable: !0,
               get: function () {
                  if (!this.hasOwnProperty("_importPath")) {
                     var e = this.dh;
                     e
                        ? (this._importPath = Ya(e.url))
                        : (this._importPath =
                             ((e = C.import(this.is)) && e.o) ||
                             Object.getPrototypeOf(this.prototype).constructor
                                .importPath);
                  }
                  return this._importPath;
               },
            },
         });
         return b;
      });
   function Oc(a, b) {
      return { index: a, removed: [], addedCount: b };
   }
   function Pc(a, b, c, d) {
      var e = 0,
         f = 0,
         g = 0,
         h = 0,
         k = Math.min(b - e, d - f);
      if (0 == e && 0 == f)
         a: {
            for (g = 0; g < k; g++) if (a[g] !== c[g]) break a;
            g = k;
         }
      if (b == a.length && d == c.length) {
         h = a.length;
         for (var l = c.length, n = 0; n < k - g && Qc(a[--h], c[--l]); ) n++;
         h = n;
      }
      e += g;
      f += g;
      b -= h;
      d -= h;
      if (0 == b - e && 0 == d - f) return [];
      if (e == b) {
         for (b = Oc(e, 0); f < d; ) b.removed.push(c[f++]);
         return [b];
      }
      if (f == d) return [Oc(e, b - e)];
      k = e;
      g = f;
      d = d - g + 1;
      h = b - k + 1;
      b = Array(d);
      for (l = 0; l < d; l++) (b[l] = Array(h)), (b[l][0] = l);
      for (l = 0; l < h; l++) b[0][l] = l;
      for (l = 1; l < d; l++)
         for (n = 1; n < h; n++)
            if (a[k + n - 1] === c[g + l - 1]) b[l][n] = b[l - 1][n - 1];
            else {
               var p = b[l - 1][n] + 1,
                  q = b[l][n - 1] + 1;
               b[l][n] = p < q ? p : q;
            }
      k = b.length - 1;
      g = b[0].length - 1;
      d = b[k][g];
      for (a = []; 0 < k || 0 < g; )
         0 == k
            ? (a.push(2), g--)
            : 0 == g
            ? (a.push(3), k--)
            : ((h = b[k - 1][g - 1]),
              (l = b[k - 1][g]),
              (n = b[k][g - 1]),
              (p = l < n ? (l < h ? l : h) : n < h ? n : h),
              p == h
                 ? (h == d ? a.push(0) : (a.push(1), (d = h)), k--, g--)
                 : p == l
                 ? (a.push(3), k--, (d = l))
                 : (a.push(2), g--, (d = n)));
      a.reverse();
      b = void 0;
      k = [];
      for (g = 0; g < a.length; g++)
         switch (a[g]) {
            case 0:
               b && (k.push(b), (b = void 0));
               e++;
               f++;
               break;
            case 1:
               b || (b = Oc(e, 0));
               b.addedCount++;
               e++;
               b.removed.push(c[f]);
               f++;
               break;
            case 2:
               b || (b = Oc(e, 0));
               b.addedCount++;
               e++;
               break;
            case 3:
               b || (b = Oc(e, 0)), b.removed.push(c[f]), f++;
         }
      b && k.push(b);
      return k;
   }
   function Qc(a, b) {
      return a === b;
   } /*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
   var Rc =
      window.trustedTypes &&
      trustedTypes.createPolicy("polymer-html-literal", {
         createHTML: function (a) {
            return a;
         },
      });
   function G(a, b) {
      for (var c = [], d = 1; d < arguments.length; ++d)
         c[d - 1] = arguments[d];
      if (
         !Array.isArray(a) ||
         !Array.isArray(a.raw) ||
         c.length !== a.length - 1
      )
         throw new TypeError("Invalid call to the html template tag");
      d = document.createElement("template");
      c = c.reduce(function (e, f, g) {
         if (f instanceof HTMLTemplateElement)
            (f = new XMLSerializer().serializeToString(f)),
               (f = f.slice(f.indexOf(">") + 1, f.lastIndexOf("</")));
         else
            throw Error(
               "non-template value passed to Polymer's html function: " + f
            );
         return e + f + a[g + 1];
      }, a[0]);
      Rc && (c = Rc.createHTML(c));
      d.innerHTML = c;
      return d;
   }
   var H = Nc(HTMLElement);
   var Sc = D(function (a) {
      function b() {
         var d = c.call(this) || this;
         d.yf = null;
         d.zf = null;
         d.ua = null;
         return d;
      }
      var c = Nc(a);
      A(b, c);
      b.prototype.__updateSelection = function (d, e) {
         var f = e.path;
         "items" == f
            ? ((e = e.base || []),
              (f = this.yf),
              d !== this.zf && this.clearSelection(),
              f && ((f = Pc(e, e.length, f, f.length)), this.__applySplices(f)),
              (this.yf = e),
              (this.zf = d))
            : "items.splices" == e.path
            ? this.__applySplices(e.value.indexSplices)
            : ((d = f.slice(6)),
              (e = parseInt(d, 10)),
              0 > d.indexOf(".") && d == e && this.__deselectChangedIdx(e));
      };
      b.prototype.__applySplices = function (d) {
         for (
            var e = this, f = this.ua, g = {}, h = 0;
            h < d.length;
            g = { za: g.za }, h++
         ) {
            g.za = d[h];
            f.forEach(
               (function (p) {
                  return function (q, r) {
                     q < p.za.index ||
                        (q >= p.za.index + p.za.removed.length
                           ? f.set(r, q + p.za.addedCount - p.za.removed.length)
                           : f.set(r, -1));
                  };
               })(g)
            );
            for (var k = 0; k < g.za.addedCount; k++) {
               var l = g.za.index + k;
               f.has(this.items[l]) && f.set(this.items[l], l);
            }
         }
         this.__updateLinks();
         var n = 0;
         f.forEach(function (p, q) {
            0 > p
               ? (e.multi
                    ? e.splice("selected", n, 1)
                    : (e.selected = e.selectedItem = null),
                 f.delete(q))
               : n++;
         });
      };
      b.prototype.__updateLinks = function () {
         var d = this;
         this.__dataLinkedPaths = {};
         if (this.multi) {
            var e = 0;
            this.ua.forEach(function (f) {
               0 <= f && d.linkPaths("items." + f, "selected." + e++);
            });
         } else
            this.ua.forEach(function (f) {
               d.linkPaths("selected", "items." + f);
               d.linkPaths("selectedItem", "items." + f);
            });
      };
      b.prototype.clearSelection = function () {
         this.__dataLinkedPaths = {};
         this.ua = new Map();
         this.selected = this.multi ? [] : null;
         this.selectedItem = null;
      };
      b.prototype.isSelected = function (d) {
         return this.ua.has(d);
      };
      b.prototype.isIndexSelected = function (d) {
         return this.isSelected(this.items[d]);
      };
      b.prototype.__deselectChangedIdx = function (d) {
         var e = this,
            f = this.__selectedIndexForItemIndex(d);
         if (0 <= f) {
            var g = 0;
            this.ua.forEach(function (h, k) {
               f == g++ && e.deselect(k);
            });
         }
      };
      b.prototype.__selectedIndexForItemIndex = function (d) {
         if ((d = this.__dataLinkedPaths["items." + d]))
            return parseInt(d.slice(9), 10);
      };
      b.prototype.deselect = function (d) {
         var e = this.ua.get(d);
         if (0 <= e) {
            this.ua.delete(d);
            var f;
            this.multi && (f = this.__selectedIndexForItemIndex(e));
            this.__updateLinks();
            this.multi
               ? this.splice("selected", f, 1)
               : (this.selected = this.selectedItem = null);
         }
      };
      b.prototype.deselectIndex = function (d) {
         this.deselect(this.items[d]);
      };
      b.prototype.select = function (d) {
         this.selectIndex(this.items.indexOf(d));
      };
      b.prototype.selectIndex = function (d) {
         var e = this.items[d];
         this.isSelected(e)
            ? this.toggle && this.deselectIndex(d)
            : (this.multi || this.ua.clear(),
              this.ua.set(e, d),
              this.__updateLinks(),
              this.multi
                 ? this.push("selected", e)
                 : (this.selected = this.selectedItem = e));
      };
      t.Object.defineProperties(b, {
         properties: {
            configurable: !0,
            enumerable: !0,
            get: function () {
               return {
                  items: { type: Array },
                  multi: { type: Boolean, value: !1 },
                  selected: { type: Object, notify: !0 },
                  selectedItem: { type: Object, notify: !0 },
                  toggle: { type: Boolean, value: !1 },
               };
            },
         },
         observers: {
            configurable: !0,
            enumerable: !0,
            get: function () {
               return ["__updateSelection(multi, items.*)"];
            },
         },
      });
      return b;
   })(H);
   function Tc() {
      return Sc.apply(this, arguments) || this;
   }
   A(Tc, Sc);
   t.Object.defineProperties(Tc, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "array-selector";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return null;
         },
      },
   });
   customElements.define(Tc.is, Tc);
   var Uc =
         /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
      Vc = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
      Wc = /@media\s(.*)/;
   function Xc(a, b) {
      for (var c in b)
         null === c ? a.style.removeProperty(c) : a.style.setProperty(c, b[c]);
   }
   function Yc(a, b) {
      return (a = window.getComputedStyle(a).getPropertyValue(b))
         ? a.trim()
         : "";
   }
   var Zc = null,
      $c = (window.HTMLImports && window.HTMLImports.whenReady) || null,
      ad;
   function bd(a) {
      requestAnimationFrame(function () {
         $c
            ? $c(a)
            : (Zc ||
                 ((Zc = new Promise(function (b) {
                    ad = b;
                 })),
                 "complete" === document.readyState
                    ? ad()
                    : document.addEventListener(
                         "readystatechange",
                         function () {
                            "complete" === document.readyState && ad();
                         }
                      )),
              Zc.then(function () {
                 a && a();
              }));
      });
   }
   var cd = null,
      dd = null;
   function J() {
      this.customStyles = [];
      this.enqueued = !1;
      bd(function () {
         window.ShadyCSS.flushCustomStyles &&
            window.ShadyCSS.flushCustomStyles();
      });
   }
   function ed(a) {
      !a.enqueued && dd && ((a.enqueued = !0), bd(dd));
   }
   J.prototype.ug = function (a) {
      a.__seenByShadyCSS ||
         ((a.__seenByShadyCSS = !0), this.customStyles.push(a), ed(this));
   };
   J.prototype.h = function (a) {
      if (a.__shadyCSSCachedStyle) return a.__shadyCSSCachedStyle;
      var b;
      a.getStyle ? (b = a.getStyle()) : (b = a);
      return b;
   };
   J.prototype.g = function () {
      for (var a = this.customStyles, b = 0; b < a.length; b++) {
         var c = a[b];
         if (!c.__shadyCSSCachedStyle) {
            var d = this.h(c);
            d &&
               ((d = d.__appliedElement || d),
               cd && cd(d),
               (c.__shadyCSSCachedStyle = d));
         }
      }
      return a;
   };
   J.prototype.addCustomStyle = J.prototype.ug;
   J.prototype.getStyleForCustomStyle = J.prototype.h;
   J.prototype.processStyles = J.prototype.g;
   Object.defineProperties(J.prototype, {
      transformCallback: {
         get: function () {
            return cd;
         },
         set: function (a) {
            cd = a;
         },
      },
      validateCallback: {
         get: function () {
            return dd;
         },
         set: function (a) {
            var b = !1;
            dd || (b = !0);
            dd = a;
            b && ed(this);
         },
      },
   });
   var fd = !(window.ShadyDOM && window.ShadyDOM.inUse),
      gd;
   function hd(a) {
      gd =
         a && a.shimcssproperties
            ? !1
            : fd ||
              !(
                 navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) ||
                 !window.CSS ||
                 !CSS.supports ||
                 !CSS.supports("box-shadow", "0 0 0 var(--foo)")
              );
   }
   var id;
   window.ShadyCSS &&
      void 0 !== window.ShadyCSS.cssBuild &&
      (id = window.ShadyCSS.cssBuild);
   var jd = !(!window.ShadyCSS || !window.ShadyCSS.disableRuntime);
   window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss
      ? (gd = window.ShadyCSS.nativeCss)
      : window.ShadyCSS
      ? (hd(window.ShadyCSS), (window.ShadyCSS = void 0))
      : hd(window.WebComponents && window.WebComponents.flags);
   var kd = gd;
   var ld = new J();
   window.ShadyCSS ||
      (window.ShadyCSS = {
         prepareTemplate: function () {},
         prepareTemplateDom: function () {},
         prepareTemplateStyles: function () {},
         styleSubtree: function (a, b) {
            ld.g();
            Xc(a, b);
         },
         styleElement: function () {
            ld.g();
         },
         styleDocument: function (a) {
            ld.g();
            Xc(document.body, a);
         },
         getComputedStyleValue: function (a, b) {
            return Yc(a, b);
         },
         flushCustomStyles: function () {},
         nativeCss: kd,
         nativeShadow: fd,
         cssBuild: id,
         disableRuntime: jd,
      });
   window.ShadyCSS.CustomStyleInterface = ld;
   var md = window.ShadyCSS.CustomStyleInterface;
   function nd() {
      var a = HTMLElement.call(this) || this;
      a._style = null;
      md.ug(a);
      return a;
   }
   A(nd, HTMLElement);
   nd.prototype.vj = function () {
      if (this._style) return this._style;
      var a = this.querySelector("style");
      if (!a) return null;
      this._style = a;
      var b = a.getAttribute("include");
      if (b) {
         a.removeAttribute("include");
         b = b.trim().split(/\s+/);
         for (var c = "", d = 0; d < b.length; d++) {
            var e = b[d],
               f = C.import(e);
            if (f && void 0 === f.j) {
               var g =
                     _cssFromModuleImports$$module$third_party$javascript$polymer$v2$polymer$lib$utils$style_gather(
                        f
                     ),
                  h = f.querySelector("template");
               if (h) {
                  var k = "";
                  h = Kc(h, f.o);
                  for (var l = 0; l < h.length; l++) {
                     var n = h[l];
                     n.parentNode && n.parentNode.removeChild(n);
                     k += n.textContent;
                  }
                  g += k;
               }
               f.j = g || null;
            }
            f || console.warn("Could not find style data in module named", e);
            c += (f && f.j) || "";
         }
         a.textContent = c + a.textContent;
      }
      this.ownerDocument !== window.document &&
         window.document.head.appendChild(this);
      return this._style;
   };
   nd.prototype.getStyle = nd.prototype.vj;
   window.customElements.define("custom-style", nd);
   function od() {
      this.kb = this.h = this.g = null;
   }
   function pd(a, b, c) {
      a.g = b;
      a.h = c;
      a.kb = a.g.run(function () {
         a.kb = null;
         qd.delete(a);
         a.h();
      });
   }
   od.prototype.cancel = function () {
      null != this.kb && (this.j(), qd.delete(this));
   };
   od.prototype.j = function () {
      null != this.kb && (this.g.cancel(this.kb), (this.kb = null));
   };
   od.prototype.flush = function () {
      null != this.kb && (this.cancel(), this.h());
   };
   function rd(a, b, c) {
      a instanceof od ? a.j() : (a = new od());
      pd(a, b, c);
      return a;
   }
   var qd = new Set();
   function sd() {
      var a = !!qd.size;
      qd.forEach(function (b) {
         try {
            b.flush();
         } catch (c) {
            setTimeout(function () {
               throw c;
            });
         }
      });
      return a;
   }
   var td = "string" === typeof document.head.style.touchAction,
      ud = ["mousedown", "mousemove", "mouseup", "click"],
      vd = [0, 1, 4, 2],
      wd;
   try {
      wd = 1 === new MouseEvent("test", { buttons: 1 }).buttons;
   } catch (a) {
      wd = !1;
   }
   var xd = !1;
   (function () {
      try {
         var a = Object.defineProperty({}, "passive", {
            get: function () {
               xd = !0;
            },
         });
         window.addEventListener("test", null, a);
         window.removeEventListener("test", null, a);
      } catch (b) {}
   })();
   function yd(a) {
      if (!(-1 < ud.indexOf(a)) && "touchend" !== a && td && xd && fb)
         return { passive: !0 };
   }
   var zd = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/),
      Ad = [],
      Bd = {
         button: !0,
         input: !0,
         keygen: !0,
         meter: !0,
         output: !0,
         textarea: !0,
         progress: !0,
         select: !0,
      },
      Cd = {
         button: !0,
         command: !0,
         fieldset: !0,
         input: !0,
         keygen: !0,
         optgroup: !0,
         option: !0,
         select: !0,
         textarea: !0,
      };
   function Dd(a) {
      var b = a.sourceCapabilities;
      if (!b || b.firesTouchEvents)
         if (((a.__polymerGesturesHandled = { lk: !0 }), "click" === a.type)) {
            b = !1;
            for (var c = Ed(a), d = 0; d < c.length; d++) {
               if (c[d].nodeType === Node.ELEMENT_NODE)
                  if ("label" === c[d].localName) Ad.push(c[d]);
                  else if (Bd[c[d].localName]) {
                     var e = c[d];
                     var f = Array.prototype.slice.call(e.labels || []);
                     if (!f.length) {
                        f = [];
                        try {
                           var g = e.getRootNode();
                           if (e.id) {
                              var h = g.querySelectorAll(
                                 "label[for = " + e.id + "]"
                              );
                              for (e = 0; e < h.length; e++) f.push(h[e]);
                           }
                        } catch (k) {}
                     }
                     for (e = 0; e < f.length; e++)
                        b = b || -1 < Ad.indexOf(f[e]);
                  }
               if (c[d] === Fd) return;
            }
            b || (a.preventDefault(), a.stopPropagation());
         }
   }
   function Gd(a) {
      for (var b = zd ? ["click"] : ud, c = 0, d; c < b.length; c++)
         (d = b[c]),
            a
               ? ((Ad.length = 0), document.addEventListener(d, Dd, !0))
               : document.removeEventListener(d, Dd, !0);
   }
   function Hd(a) {
      var b = a.type;
      return -1 < ud.indexOf(b)
         ? "mousemove" === b
            ? ((b = void 0 === a.buttons ? 1 : a.buttons),
              a instanceof window.MouseEvent && !wd && (b = vd[a.which] || 0),
              !!(b & 1))
            : 0 === (void 0 === a.button ? 0 : a.button)
         : !1;
   }
   function Id(a) {
      if ("click" === a.type) {
         if (0 === a.detail) return !0;
         var b =
            _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
               a
            );
         if (!b.nodeType || b.nodeType !== Node.ELEMENT_NODE) return !0;
         b = b.getBoundingClientRect();
         var c = a.pageX;
         a = a.pageY;
         return !(c >= b.left && c <= b.right && a >= b.top && a <= b.bottom);
      }
      return !1;
   }
   var Fd = null,
      Jd = null,
      Kd = 0,
      Ld = 0,
      Md = -1,
      Nd = !1;
   function Od(a, b, c) {
      a.movefn = b;
      a.zd = c;
      document.addEventListener("mousemove", b);
      document.addEventListener("mouseup", c);
   }
   function Pd(a) {
      document.removeEventListener("mousemove", a.movefn);
      document.removeEventListener("mouseup", a.zd);
      a.movefn = null;
      a.zd = null;
   }
   document.addEventListener(
      "touchend",
      function (a) {
         Jd || Gd(!0);
         Fd = Ed(a)[0];
         Jd = rd(Jd, Bb(2500), function () {
            Gd();
            Jd = Fd = null;
         });
      },
      xd ? { passive: !0 } : !1
   );
   var Ed =
         window.ShadyDOM && window.ShadyDOM.pl
            ? window.ShadyDOM.composedPath
            : function (a) {
                 return (a.composedPath && a.composedPath()) || [];
              },
      Qd = {},
      Rd = [];
   function _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
      a
   ) {
      var b = Ed(a);
      return 0 < b.length ? b[0] : a.target;
   }
   function _handleNative$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
      a
   ) {
      var b = a.type,
         c = a.currentTarget.__polymerGestures;
      if (c && (c = c[b])) {
         if (
            !a.__polymerGesturesHandled &&
            ((a.__polymerGesturesHandled = {}), "touch" === b.slice(0, 5))
         ) {
            var d = a.changedTouches[0];
            "touchstart" === b && 1 === a.touches.length && (Md = d.identifier);
            if (Md !== d.identifier) return;
            td ||
               (("touchstart" === b || "touchmove" === b) &&
                  _handleTouchAction$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
                     a
                  ));
         }
         d = a.__polymerGesturesHandled;
         if (!d.lk) {
            for (var e = 0, f; e < Rd.length; e++)
               (f = Rd[e]),
                  c[f.name] &&
                     !d[f.name] &&
                     f.ud &&
                     -1 < f.ud.start.indexOf(a.type) &&
                     f.reset &&
                     f.reset();
            for (e = 0; e < Rd.length; e++)
               (f = Rd[e]),
                  c[f.name] && !d[f.name] && ((d[f.name] = !0), f[b](a));
         }
      }
   }
   function _handleTouchAction$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
      a
   ) {
      var b = a.changedTouches[0],
         c = a.type;
      if ("touchstart" === c) (Kd = b.clientX), (Ld = b.clientY), (Nd = !1);
      else if ("touchmove" === c && !Nd) {
         Nd = !0;
         c = "auto";
         for (var d = Ed(a), e = 0, f; e < d.length; e++)
            if (((f = d[e]), f.__polymerGesturesTouchAction)) {
               c = f.__polymerGesturesTouchAction;
               break;
            }
         d = !1;
         e = Math.abs(Kd - b.clientX);
         b = Math.abs(Ld - b.clientY);
         a.cancelable &&
            ("none" === c
               ? (d = !0)
               : "pan-x" === c
               ? (d = b > e)
               : "pan-y" === c && (d = e > b));
         d ? a.preventDefault() : Sd("track");
      }
   }
   function Td(a, b, c) {
      return Qd[b]
         ? (_add$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
              a,
              b,
              c
           ),
           !0)
         : !1;
   }
   function _add$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
      a,
      b,
      c
   ) {
      var d = Qd[b],
         e = d.deps,
         f = d.name,
         g = a.__polymerGestures;
      g || (a.__polymerGestures = g = {});
      for (var h = 0, k, l; h < e.length; h++)
         (k = e[h]),
            (zd && -1 < ud.indexOf(k) && "click" !== k) ||
               ((l = g[k]) || (g[k] = l = { dc: 0 }),
               0 === l.dc &&
                  a.addEventListener(
                     k,
                     _handleNative$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures,
                     yd(k)
                  ),
               (l[f] = (l[f] || 0) + 1),
               (l.dc = (l.dc || 0) + 1));
      a.addEventListener(b, c);
      d.touchAction && Ud(a, d.touchAction);
   }
   function _remove$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
      a,
      b,
      c
   ) {
      var d = Qd[b],
         e = d.deps;
      d = d.name;
      var f = a.__polymerGestures;
      if (f)
         for (var g = 0, h, k; g < e.length; g++)
            (h = e[g]),
               (k = f[h]) &&
                  k[d] &&
                  ((k[d] = (k[d] || 1) - 1),
                  (k.dc = (k.dc || 1) - 1),
                  0 === k.dc &&
                     a.removeEventListener(
                        h,
                        _handleNative$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures,
                        yd(h)
                     ));
      a.removeEventListener(b, c);
   }
   function Vd(a) {
      Rd.push(a);
      for (var b = 0; b < a.emits.length; b++) Qd[a.emits[b]] = a;
   }
   function _findRecognizerByEvent$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
      a
   ) {
      for (var b = 0, c; b < Rd.length; b++) {
         c = Rd[b];
         for (var d = 0, e; d < c.emits.length; d++)
            if (((e = c.emits[d]), e === a)) return c;
      }
      return null;
   }
   function Ud(a, b) {
      td &&
         a instanceof HTMLElement &&
         Db.run(function () {
            a.style.touchAction = b;
         });
      a.__polymerGesturesTouchAction = b;
   }
   function _fire$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
      a,
      b,
      c
   ) {
      b = new Event(b, { bubbles: !0, cancelable: !0, composed: !0 });
      b.detail = c;
      E(a).dispatchEvent(b);
      b.defaultPrevented &&
         (a = c.kh || c.yd) &&
         a.preventDefault &&
         a.preventDefault();
   }
   function Sd(a) {
      a =
         _findRecognizerByEvent$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
            a
         );
      a.info && (a.info.prevent = !0);
   }
   Vd({
      name: "downup",
      deps: ["mousedown", "touchstart", "touchend"],
      ud: { start: ["mousedown", "touchstart"], end: ["mouseup", "touchend"] },
      emits: ["down", "up"],
      info: { movefn: null, zd: null },
      reset: function () {
         Pd(this.info);
      },
      mousedown: function (a) {
         if (Hd(a)) {
            var b =
                  _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
                     a
                  ),
               c = this;
            Od(
               this.info,
               function (d) {
                  Hd(d) || (Wd("up", b, d), Pd(c.info));
               },
               function (d) {
                  Hd(d) && Wd("up", b, d);
                  Pd(c.info);
               }
            );
            Wd("down", b, a);
         }
      },
      touchstart: function (a) {
         Wd(
            "down",
            _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
               a
            ),
            a.changedTouches[0],
            a
         );
      },
      touchend: function (a) {
         Wd(
            "up",
            _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
               a
            ),
            a.changedTouches[0],
            a
         );
      },
   });
   function Wd(a, b, c, d) {
      b &&
         _fire$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
            b,
            a,
            {
               x: c.clientX,
               y: c.clientY,
               yd: c,
               kh: d,
               prevent: function (e) {
                  return Sd(e);
               },
            }
         );
   }
   Vd({
      name: "track",
      touchAction: "none",
      deps: ["mousedown", "touchstart", "touchmove", "touchend"],
      ud: { start: ["mousedown", "touchstart"], end: ["mouseup", "touchend"] },
      emits: ["track"],
      info: {
         x: 0,
         y: 0,
         state: "start",
         started: !1,
         moves: [],
         addMove: function (a) {
            2 < this.moves.length && this.moves.shift();
            this.moves.push(a);
         },
         movefn: null,
         zd: null,
         prevent: !1,
      },
      reset: function () {
         this.info.state = "start";
         this.info.started = !1;
         this.info.moves = [];
         this.info.x = 0;
         this.info.y = 0;
         this.info.prevent = !1;
         Pd(this.info);
      },
      mousedown: function (a) {
         if (Hd(a)) {
            var b =
                  _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
                     a
                  ),
               c = this,
               d = function (e) {
                  var f = e.clientX,
                     g = e.clientY;
                  Xd(c.info, f, g) &&
                     ((c.info.state = c.info.started
                        ? "mouseup" === e.type
                           ? "end"
                           : "track"
                        : "start"),
                     "start" === c.info.state && Sd("tap"),
                     c.info.addMove({ x: f, y: g }),
                     Hd(e) || ((c.info.state = "end"), Pd(c.info)),
                     b && Yd(c.info, b, e),
                     (c.info.started = !0));
               };
            Od(this.info, d, function (e) {
               c.info.started && d(e);
               Pd(c.info);
            });
            this.info.x = a.clientX;
            this.info.y = a.clientY;
         }
      },
      touchstart: function (a) {
         a = a.changedTouches[0];
         this.info.x = a.clientX;
         this.info.y = a.clientY;
      },
      touchmove: function (a) {
         var b =
            _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
               a
            );
         a = a.changedTouches[0];
         var c = a.clientX,
            d = a.clientY;
         Xd(this.info, c, d) &&
            ("start" === this.info.state && Sd("tap"),
            this.info.addMove({ x: c, y: d }),
            Yd(this.info, b, a),
            (this.info.state = "track"),
            (this.info.started = !0));
      },
      touchend: function (a) {
         var b =
            _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
               a
            );
         a = a.changedTouches[0];
         this.info.started &&
            ((this.info.state = "end"),
            this.info.addMove({ x: a.clientX, y: a.clientY }),
            Yd(this.info, b, a));
      },
   });
   function Xd(a, b, c) {
      if (a.prevent) return !1;
      if (a.started) return !0;
      c = Math.abs(a.y - c);
      return 5 <= Math.abs(a.x - b) || 5 <= c;
   }
   function Yd(a, b, c) {
      if (b) {
         var d = a.moves[a.moves.length - 2],
            e = a.moves[a.moves.length - 1],
            f = e.x - a.x,
            g = e.y - a.y,
            h = 0;
         if (d) {
            var k = e.x - d.x;
            h = e.y - d.y;
         }
         _fire$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
            b,
            "track",
            {
               state: a.state,
               x: c.clientX,
               y: c.clientY,
               dx: f,
               dy: g,
               pj: k,
               qj: h,
               yd: c,
               ml: function () {
                  for (
                     var l = c.clientX,
                        n = c.clientY,
                        p = document.elementFromPoint(l, n),
                        q = p;
                     q && q.shadowRoot && !window.ShadyDOM;

                  ) {
                     var r = q;
                     q = q.shadowRoot.elementFromPoint(l, n);
                     if (r === q) break;
                     q && (p = q);
                  }
                  return p;
               },
            }
         );
      }
   }
   Vd({
      name: "tap",
      deps: ["mousedown", "click", "touchstart", "touchend"],
      ud: { start: ["mousedown", "touchstart"], end: ["click", "touchend"] },
      emits: ["tap"],
      info: { x: NaN, y: NaN, prevent: !1 },
      reset: function () {
         this.info.x = NaN;
         this.info.y = NaN;
         this.info.prevent = !1;
      },
      mousedown: function (a) {
         Hd(a) && ((this.info.x = a.clientX), (this.info.y = a.clientY));
      },
      click: function (a) {
         Hd(a) && Zd(this.info, a);
      },
      touchstart: function (a) {
         a = a.changedTouches[0];
         this.info.x = a.clientX;
         this.info.y = a.clientY;
      },
      touchend: function (a) {
         Zd(this.info, a.changedTouches[0], a);
      },
   });
   function Zd(a, b, c) {
      var d = Math.abs(b.clientX - a.x),
         e = Math.abs(b.clientY - a.y),
         f =
            _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
               c || b
            );
      !f ||
         (Cd[f.localName] && f.hasAttribute("disabled")) ||
         !(isNaN(d) || isNaN(e) || (25 >= d && 25 >= e) || Id(b)) ||
         a.prevent ||
         _fire$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
            f,
            "tap",
            { x: b.clientX, y: b.clientY, yd: b, kh: c }
         );
   }
   var $d = D(function (a) {
      function b() {
         return a.apply(this, arguments) || this;
      }
      A(b, a);
      b.prototype._addEventListenerToNode = function (c, d, e) {
         Td(c, d, e) || a.prototype._addEventListenerToNode.call(this, c, d, e);
      };
      b.prototype._removeEventListenerFromNode = function (c, d, e) {
         if (Qd[d]) {
            _remove$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
               c,
               d,
               e
            );
            var f = !0;
         } else f = !1;
         f || a.prototype._removeEventListenerFromNode.call(this, c, d, e);
      };
      return b;
   });
   function ae(a, b, c, d, e) {
      var f;
      e && (f = "object" === typeof c && null !== c) && (d = a.__dataTemp[b]);
      d = d !== c && (d === d || c === c);
      f && d && (a.__dataTemp[b] = c);
      return d;
   }
   var be = D(function (a) {
         function b() {
            return a.apply(this, arguments) || this;
         }
         A(b, a);
         b.prototype._shouldPropertyChange = function (c, d, e) {
            return ae(this, c, d, e, !0);
         };
         return b;
      }),
      ce = D(function (a) {
         function b() {
            return a.apply(this, arguments) || this;
         }
         A(b, a);
         b.prototype._shouldPropertyChange = function (c, d, e) {
            return ae(this, c, d, e, this.mutableData);
         };
         t.Object.defineProperties(b, {
            properties: {
               configurable: !0,
               enumerable: !0,
               get: function () {
                  return { mutableData: Boolean };
               },
            },
         });
         return b;
      });
   be.kl = ae;
   var de = !1;
   function ee() {
      if (ib && !Za) {
         if (!de) {
            de = !0;
            var a = document.createElement("style");
            a.textContent = "dom-bind,dom-if,dom-repeat{display:none;}";
            document.head.appendChild(a);
         }
         return !0;
      }
      return !1;
   }
   var fe = $d(ce(Hc(HTMLElement)));
   function ge() {
      var a = fe.call(this) || this;
      if (gb) throw Error("strictTemplatePolicy: dom-bind not allowed");
      a.root = null;
      a.$ = null;
      a.nb = null;
      return a;
   }
   A(ge, fe);
   m = ge.prototype;
   m.attributeChangedCallback = function () {
      this.mutableData = !0;
   };
   m.connectedCallback = function () {
      ee() || (this.style.display = "none");
      this.render();
   };
   m.disconnectedCallback = function () {
      this.__removeChildren();
   };
   m.__insertChildren = function () {
      E(E(this).parentNode).insertBefore(this.root, this);
   };
   m.__removeChildren = function () {
      if (this.nb)
         for (var a = 0; a < this.nb.length; a++)
            this.root.appendChild(this.nb[a]);
   };
   m.render = function () {
      var a = this;
      if (!this.nb) {
         var b = b || this.querySelector("template");
         if (!b) {
            var c = new MutationObserver(function () {
               if ((b = a.querySelector("template")))
                  c.disconnect(), a.render();
               else throw Error("dom-bind requires a <template> child");
            });
            c.observe(this, { childList: !0 });
            return;
         }
         this.root = this._stampTemplate(b);
         this.$ = this.root.$;
         this.nb = [];
         for (var d = this.root.firstChild; d; d = d.nextSibling)
            this.nb[this.nb.length] = d;
         this._enableProperties();
      }
      this.__insertChildren();
      this.dispatchEvent(
         new CustomEvent("dom-change", { bubbles: !0, composed: !0 })
      );
   };
   t.Object.defineProperties(ge, {
      observedAttributes: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return ["mutable-data"];
         },
      },
   });
   customElements.define("dom-bind", ge);
   function he() {
      do {
         var a = window.ShadyDOM && ShadyDOM.flush();
         window.ShadyCSS &&
            window.ShadyCSS.ScopingShim &&
            window.ShadyCSS.ScopingShim.flush();
         var b = sd();
      } while (a || b);
   }
   var ie = null;
   function je() {
      return ie;
   }
   je.prototype = Object.create(HTMLTemplateElement.prototype, {
      constructor: { value: je, writable: !0 },
   });
   var ke = Hc(je),
      le = be(ke);
   function me(a, b) {
      ie = a;
      Object.setPrototypeOf(a, b.prototype);
      new b();
      ie = null;
   }
   var ne = Hc(function () {});
   function oe(a, b) {
      for (var c = 0; c < b.length; c++) {
         var d = b[c];
         if (!!a != !!d.zb)
            if (d.nodeType === Node.TEXT_NODE)
               a
                  ? ((d.dg = d.textContent), (d.textContent = ""))
                  : (d.textContent = d.dg);
            else if ("slot" === d.localName)
               if (a)
                  (d.cg = document.createComment("hidden-slot")),
                     E(E(d).parentNode).replaceChild(d.cg, d);
               else {
                  var e = d.cg;
                  e && E(E(e).parentNode).replaceChild(d, e);
               }
            else
               d.style &&
                  (a
                     ? ((d.ii = d.style.display), (d.style.display = "none"))
                     : (d.style.display = d.ii));
         d.zb = a;
         d._showHideChildren && d._showHideChildren(a);
      }
   }
   function pe(a) {
      var b = ne.call(this) || this;
      b._configureProperties(a);
      b.root = b._stampTemplate(b.__dataHost);
      var c = [];
      b.children = c;
      for (var d = b.root.firstChild; d; d = d.nextSibling)
         c.push(d), (d.ki = b);
      b.cc && b.cc.zb && b._showHideChildren(!0);
      c = b.nd;
      ((a && c.instanceProps) || !c.instanceProps) && b._enableProperties();
      return b;
   }
   A(pe, ne);
   m = pe.prototype;
   m._configureProperties = function (a) {
      if (this.nd.forwardHostProp)
         for (var b in this.fi)
            this._setPendingProperty(b, this.__dataHost["_host_" + b]);
      for (var c in a) this._setPendingProperty(c, a[c]);
   };
   m.forwardHostProp = function (a, b) {
      this._setPendingPropertyOrPath(a, b, !1, !0) &&
         this.__dataHost._enqueueClient(this);
   };
   m._addEventListenerToNode = function (a, b, c) {
      var d = this;
      if (this.ic && this.nd.parentModel)
         this.ic._addEventListenerToNode(a, b, function (f) {
            f.model = d;
            c(f);
         });
      else {
         var e = this.__dataHost.__dataHost;
         e && e._addEventListenerToNode(a, b, c);
      }
   };
   m._showHideChildren = function (a) {
      oe(a, this.children);
   };
   m._setUnmanagedPropertyToNode = function (a, b, c) {
      a.zb && a.nodeType == Node.TEXT_NODE && "textContent" == b
         ? (a.dg = c)
         : ne.prototype._setUnmanagedPropertyToNode.call(this, a, b, c);
   };
   m.dispatchEvent = function () {
      return !0;
   };
   t.Object.defineProperties(pe.prototype, {
      parentModel: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            var a = this.hi;
            if (!a) {
               var b;
               a = this;
               do a = a.__dataHost.__dataHost;
               while ((b = a.nd) && !b.parentModel);
               this.hi = a;
            }
            return a;
         },
      },
   });
   var qe = be(pe);
   function re(a) {
      return ((a = a.__dataHost) && a.ic) || a;
   }
   function se(a, b, c) {
      function d() {
         return e.apply(this, arguments) || this;
      }
      var e = c.mutableData ? qe : pe;
      te.mixin && (e = te.mixin(e));
      A(d, e);
      d.prototype.nd = c;
      d.prototype._bindTemplate(a);
      ue(d, a, b, c);
      return d;
   }
   function ve(a, b, c, d) {
      var e = c.forwardHostProp;
      if (e && b.bh) {
         var f = "template" == a.localName,
            g = b.qh;
         if (!g) {
            if (f) {
               var h = c.mutableData ? le : ke;
               g = function () {
                  return h.apply(this, arguments) || this;
               };
               A(g, h);
               g = b.qh = g;
            } else {
               var k = a.constructor;
               g = function () {
                  return k.apply(this, arguments) || this;
               };
               A(g, k);
               g = b.qh = g;
            }
            var l = b.hostProps,
               n;
            for (n in l)
               g.prototype._addPropertyEffect("_host_" + n, g.prototype.ee.ai, {
                  sa: we(e),
               }),
                  g.prototype._createNotifyingProperty("_host_" + n);
            jb && d && xe(b, c, d);
         }
         a.ta && Object.assign(a.__data, a.ta);
         if (f)
            me(a, g),
               (a.__dataTemp = {}),
               (a.__dataPending = null),
               (a.__dataOld = null),
               a._enableProperties();
         else {
            Object.setPrototypeOf(a, g.prototype);
            b = b.hostProps;
            for (var p in b)
               (p = "_host_" + p),
                  p in a && ((b = a[p]), delete a[p], (a.__data[p] = b));
         }
      }
   }
   function we(a) {
      return function (b, c, d) {
         a.call(b.cc, c.substring(6), d[c]);
      };
   }
   function ue(a, b, c, d) {
      var e = c.hostProps || {},
         f;
      for (f in d.instanceProps) {
         delete e[f];
         var g = d.notifyInstanceProp;
         g &&
            a.prototype._addPropertyEffect(f, a.prototype.ee.sf, { sa: ye(g) });
      }
      if (d.forwardHostProp && b.__dataHost)
         for (var h in e)
            c.bh || (c.bh = !0),
               a.prototype._addPropertyEffect(h, a.prototype.ee.sf, {
                  sa: ze(),
               });
   }
   function ye(a) {
      return function (b, c, d) {
         a.call(b.cc, b, c, d[c]);
      };
   }
   function ze() {
      return function (a, b, c) {
         a.__dataHost._setPendingPropertyOrPath("_host_" + b, c[b], !0, !0);
      };
   }
   function te(a, b, c) {
      function d() {
         return f.apply(this, arguments) || this;
      }
      if (gb && !re(a))
         throw Error("strictTemplatePolicy: template owner not trusted");
      c = c || {};
      if (a.cc) throw Error("A <template> can only be templatized once");
      a.cc = b;
      var e = (b ? b.constructor : pe)._parseTemplate(a),
         f = e.nk;
      f || ((f = se(a, e, c)), (e.nk = f));
      var g = re(a);
      ve(a, e, c, g);
      A(d, f);
      d.prototype.ic = g;
      d.prototype.__dataHost = a;
      d.prototype.cc = b;
      d.prototype.fi = e.hostProps;
      return d;
   }
   function xe(a, b, c) {
      c = c.constructor.jb;
      a = a.propertyEffects;
      b = b.instanceProps;
      for (var d in a)
         if (!(c[d] || (b && b[d])))
            for (var e = a[d], f = 0; f < e.length; f++) {
               var g = e[f].info.wc;
               if (!g.signature || !g.signature.static) {
                  console.warn(
                     "Property '" +
                        d +
                        "' used in template but not declared in 'properties'; attribute will not be observed."
                  );
                  break;
               }
            }
   }
   function Ae() {
      var a = H.call(this) || this;
      a.sb = null;
      a.jg = !1;
      a.zb = !1;
      return a;
   }
   A(Ae, H);
   m = Ae.prototype;
   m.__debounceRender = function () {
      var a = this;
      this.sb = rd(this.sb, Db, function () {
         return a.__render();
      });
      qd.add(this.sb);
   };
   m.disconnectedCallback = function () {
      H.prototype.disconnectedCallback.call(this);
      var a = E(this).parentNode;
      (a && (a.nodeType != Node.DOCUMENT_FRAGMENT_NODE || E(a).host)) ||
         this.__teardownInstance();
   };
   m.connectedCallback = function () {
      H.prototype.connectedCallback.call(this);
      ee() || (this.style.display = "none");
      this.if && this.__debounceRender();
   };
   m.__ensureTemplate = function () {
      var a = this;
      if (!this.md) {
         var b = this._templateInfo ? this : E(this).querySelector("template");
         if (!b) {
            var c = new MutationObserver(function () {
               if (E(a).querySelector("template")) c.disconnect(), a.__render();
               else throw Error("dom-if requires a <template> child");
            });
            c.observe(this, { childList: !0 });
            return !1;
         }
         this.md = b;
      }
      return !0;
   };
   m.__ensureInstance = function () {
      var a = E(this).parentNode;
      if (this.__hasInstance()) {
         var b = this.__getInstanceNodes();
         if (b && b.length && E(this).previousSibling !== b[b.length - 1])
            for (var c = 0, d = void 0; c < b.length && (d = b[c]); c++)
               E(a).insertBefore(d, this);
      } else {
         if (!a || !this.__ensureTemplate()) return !1;
         this.__createAndInsertInstance(a);
      }
      return !0;
   };
   m.render = function () {
      he();
   };
   m.__render = function () {
      if (this.if) {
         if (!this.__ensureInstance()) return;
      } else this.restamp && this.__teardownInstance();
      this._showHideChildren();
      (pb && !this.notifyDomChange) ||
         this.if == this.jg ||
         (this.dispatchEvent(
            new CustomEvent("dom-change", { bubbles: !0, composed: !0 })
         ),
         (this.jg = this.if));
   };
   m.__hasInstance = function () {};
   m.__getInstanceNodes = function () {};
   m.__createAndInsertInstance = function () {};
   m.__teardownInstance = function () {};
   m._showHideChildren = function () {};
   t.Object.defineProperties(Ae, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "dom-if";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return null;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               if: { type: Boolean, observer: Ae.prototype.__debounceRender },
               restamp: {
                  type: Boolean,
                  observer: Ae.prototype.__debounceRender,
               },
               notifyDomChange: { type: Boolean },
            };
         },
      },
   });
   function Be() {
      var a = Ae.call(this) || this;
      a.v = null;
      a.bc = null;
      return a;
   }
   A(Be, Ae);
   m = Be.prototype;
   m.__hasInstance = function () {
      return !!this.v;
   };
   m.__getInstanceNodes = function () {
      return this.v.templateInfo.childNodes;
   };
   m.__createAndInsertInstance = function (a) {
      var b = this,
         c = this.__dataHost || this;
      if (gb && !this.__dataHost)
         throw Error("strictTemplatePolicy: template owner not trusted");
      var d = c._bindTemplate(this.md, !0);
      d.xd = function (e, f, g) {
         var h = b.bc;
         if (b.if)
            h &&
               ((b.bc = null),
               b._showHideChildren(),
               (f = Object.assign(h.sd, f))),
               e(f, g);
         else if (b.v)
            if ((h || (h = b.bc = { xd: e, sd: {} }), g))
               for (var k in f) (e = $b(k)), (h.sd[e] = b.__dataHost[e]);
            else Object.assign(h.sd, f);
      };
      this.v = c._stampTemplate(this.md, d);
      E(a).insertBefore(this.v, this);
   };
   m.se = function () {
      var a = this.bc;
      a && ((this.bc = null), a.xd(a.sd, !1));
   };
   m.__teardownInstance = function () {
      var a = this.__dataHost || this;
      this.v && (a._removeBoundDom(this.v), (this.bc = this.v = null));
   };
   m._showHideChildren = function () {
      var a = this.zb || !this.if;
      this.v &&
         !!this.v.je !== a &&
         ((this.v.je = a), oe(a, this.v.templateInfo.childNodes));
      a || this.se();
   };
   function Ce() {
      var a = Ae.call(this) || this;
      a.ob = null;
      a.v = null;
      a.ac = null;
      return a;
   }
   A(Ce, Ae);
   m = Ce.prototype;
   m.__hasInstance = function () {
      return !!this.v;
   };
   m.__getInstanceNodes = function () {
      return this.v.children;
   };
   m.__createAndInsertInstance = function (a) {
      this.ob ||
         (this.ob = te(this.md, this, {
            mutableData: !0,
            forwardHostProp: function (b, c) {
               this.v &&
                  (this.if
                     ? this.v.forwardHostProp(b, c)
                     : ((this.ac = this.ac || Object.create(null)),
                       (this.ac[$b(b)] = !0)));
            },
         }));
      this.v = new this.ob();
      E(a).insertBefore(this.v.root, this);
   };
   m.__teardownInstance = function () {
      if (this.v) {
         var a = this.v.children;
         if (a && a.length) {
            var b = E(a[0]).parentNode;
            if (b) {
               b = E(b);
               for (var c = 0, d = void 0; c < a.length && (d = a[c]); c++)
                  b.removeChild(d);
            }
         }
         this.v = this.ac = null;
      }
   };
   m.se = function () {
      var a = this.ac;
      if (a) {
         this.ac = null;
         for (var b in a) this.v._setPendingProperty(b, this.__dataHost[b]);
         this.v._flushProperties();
      }
   };
   m._showHideChildren = function () {
      var a = this.zb || !this.if;
      this.v &&
         !!this.v.je !== a &&
         ((this.v.je = a), this.v._showHideChildren(a));
      a || this.se();
   };
   var De = ob ? Be : Ce;
   customElements.define(De.is, De);
   var Ee = ce(H);
   function Fe() {
      var a = Ee.call(this) || this;
      a.ia = [];
      a.sb = null;
      a.xf = {};
      a.wb = null;
      a.fg = null;
      a.le = !1;
      a.pe = !1;
      a.oe = !1;
      a.xb = 0;
      a.ld = null;
      a.fd = null;
      a.me = null;
      a.ob = null;
      a.ke = !0;
      a.template = null;
      return a;
   }
   A(Fe, Ee);
   m = Fe.prototype;
   m.disconnectedCallback = function () {
      Ee.prototype.disconnectedCallback.call(this);
      this.ke = !0;
      for (var a = 0; a < this.ia.length; a++) this.__detachInstance(a);
      this.xb && cancelAnimationFrame(this.xb);
   };
   m.connectedCallback = function () {
      Ee.prototype.connectedCallback.call(this);
      ee() || (this.style.display = "none");
      if (this.ke) {
         this.ke = !1;
         for (var a = E(E(this).parentNode), b = 0; b < this.ia.length; b++)
            this.__attachInstance(b, a);
         this.xb && this.__render();
      }
   };
   m.__ensureTemplatized = function () {
      var a = this;
      if (!this.ob) {
         var b = (this.template = this._templateInfo
            ? this
            : this.querySelector("template"));
         if (!b) {
            var c = new MutationObserver(function () {
               if (a.querySelector("template")) c.disconnect(), a.__render();
               else throw Error("dom-repeat requires a <template> child");
            });
            c.observe(this, { childList: !0 });
            return !1;
         }
         var d = {};
         d[this.as] = !0;
         d[this.indexAs] = !0;
         d[this.itemsIndexAs] = !0;
         this.ob = te(b, this, {
            mutableData: this.mutableData,
            parentModel: !0,
            instanceProps: d,
            forwardHostProp: function (e, f) {
               for (
                  var g = this.ia, h = 0, k = void 0;
                  h < g.length && (k = g[h]);
                  h++
               )
                  k.forwardHostProp(e, f);
            },
            notifyInstanceProp: function (e, f, g) {
               var h = this.as;
               if (
                  h === f ||
                  0 === h.indexOf(f + ".") ||
                  0 === f.indexOf(h + ".")
               )
                  (e = e[this.itemsIndexAs]),
                     f == this.as && (this.items[e] = g),
                     (f = "items." + e + f.slice(this.as.length)),
                     this.notifyPath(f, g);
            },
         });
      }
      return !0;
   };
   m.__getMethodHost = function () {
      return this.__dataHost.ic || this.__dataHost;
   };
   m.__functionFromPropertyValue = function (a) {
      if ("string" === typeof a) {
         var b = this.__getMethodHost();
         return function () {
            return b[a].apply(b, arguments);
         };
      }
      return a;
   };
   m.__sortChanged = function (a) {
      this.ld = this.__functionFromPropertyValue(a);
      this.items && this.__debounceRender(this.__render);
   };
   m.__filterChanged = function (a) {
      this.fd = this.__functionFromPropertyValue(a);
      this.items && this.__debounceRender(this.__render);
   };
   m.__computeFrameTime = function (a) {
      return Math.ceil(1e3 / a);
   };
   m.__observeChanged = function () {
      this.me = this.observe && this.observe.replace(".*", ".").split(" ");
   };
   m.__handleObservedPaths = function (a) {
      if (this.ld || this.fd)
         if (!a) this.__debounceRender(this.__render, this.delay);
         else if (this.me)
            for (var b = this.me, c = 0; c < b.length; c++)
               0 === a.indexOf(b[c]) &&
                  this.__debounceRender(this.__render, this.delay);
   };
   m.__itemsChanged = function (a) {
      this.items &&
         !Array.isArray(this.items) &&
         console.warn(
            "dom-repeat expected array for `items`, found",
            this.items
         );
      this.__handleItemPath(a.path, a.value) ||
         ("items" === a.path && (this.le = !0),
         this.__debounceRender(this.__render));
   };
   m.__debounceRender = function (a, b) {
      b = void 0 === b ? 0 : b;
      this.sb = rd(this.sb, 0 < b ? Bb(b) : Db, a.bind(this));
      qd.add(this.sb);
   };
   m.render = function () {
      this.__debounceRender(this.__render);
      he();
   };
   m.__render = function () {
      var a = this;
      if (this.__ensureTemplatized()) {
         var b = this.items || [],
            c = this.__sortAndFilterItems(b),
            d = this.__calculateLimit(c.length);
         this.__updateInstances(b, d, c);
         this.initialCount &&
            (this.pe || this.oe) &&
            (cancelAnimationFrame(this.xb),
            (this.xb = requestAnimationFrame(function () {
               a.xb = null;
               a.__continueChunking();
            })));
         this._setRenderedItemCount(this.ia.length);
         (pb && !this.notifyDomChange) ||
            this.dispatchEvent(
               new CustomEvent("dom-change", { bubbles: !0, composed: !0 })
            );
      }
   };
   m.__sortAndFilterItems = function (a) {
      for (var b = this, c = Array(a.length), d = 0; d < a.length; d++)
         c[d] = d;
      this.fd &&
         (c = c.filter(function (e, f, g) {
            return b.fd(a[e], f, g);
         }));
      this.ld &&
         c.sort(function (e, f) {
            return b.ld(a[e], a[f]);
         });
      return c;
   };
   m.__calculateLimit = function (a) {
      var b = a,
         c = this.ia.length;
      if (this.initialCount) {
         var d;
         !this.wb || (this.le && !this.reuseChunkedInstances)
            ? ((b = Math.min(a, this.initialCount)),
              (this.wb = (d = Math.max(b - c, 0)) || 1))
            : ((d = Math.min(Math.max(a - c, 0), this.wb)),
              (b = Math.min(c + d, a)));
         this.pe = d === this.wb;
         this.oe = b < a;
         this.fg = performance.now();
      }
      this.le = !1;
      return b;
   };
   m.__continueChunking = function () {
      this.pe &&
         (this.wb =
            Math.round(
               (this._targetFrameTime / (performance.now() - this.fg)) * this.wb
            ) || 1);
      this.oe && this.__debounceRender(this.__render);
   };
   m.__updateInstances = function (a, b, c) {
      var d = (this.xf = {}),
         e;
      for (e = 0; e < b; e++) {
         var f = this.ia[e],
            g = c[e],
            h = a[g];
         d[g] = e;
         f
            ? (f._setPendingProperty(this.as, h),
              f._setPendingProperty(this.indexAs, e),
              f._setPendingProperty(this.itemsIndexAs, g),
              f._flushProperties())
            : this.__insertInstance(h, e, g);
      }
      for (a = this.ia.length - 1; a >= e; a--)
         this.__detachAndRemoveInstance(a);
   };
   m.__detachInstance = function (a) {
      a = this.ia[a];
      for (var b = E(a.root), c = 0; c < a.children.length; c++)
         b.appendChild(a.children[c]);
      return a;
   };
   m.__attachInstance = function (a, b) {
      b.insertBefore(this.ia[a].root, this);
   };
   m.__detachAndRemoveInstance = function (a) {
      this.__detachInstance(a);
      this.ia.splice(a, 1);
   };
   m.__stampInstance = function (a, b, c) {
      var d = {};
      d[this.as] = a;
      d[this.indexAs] = b;
      d[this.itemsIndexAs] = c;
      return new this.ob(d);
   };
   m.__insertInstance = function (a, b, c) {
      a = this.__stampInstance(a, b, c);
      c = (c = this.ia[b + 1]) ? c.children[0] : this;
      E(E(this).parentNode).insertBefore(a.root, c);
      return (this.ia[b] = a);
   };
   m._showHideChildren = function (a) {
      for (var b = 0; b < this.ia.length; b++) this.ia[b]._showHideChildren(a);
   };
   m.__handleItemPath = function (a, b) {
      var c = a.slice(6),
         d = c.indexOf(".");
      a = 0 > d ? c : c.substring(0, d);
      if (a == parseInt(a, 10)) {
         c = 0 > d ? "" : c.substring(d + 1);
         this.__handleObservedPaths(c);
         if ((a = this.ia[this.xf[a]]))
            a._setPendingPropertyOrPath(
               this.as + (c ? "." + c : ""),
               b,
               !1,
               !0
            ),
               a._flushProperties();
         return !0;
      }
   };
   m.itemForElement = function (a) {
      return (a = this.modelForElement(a)) && a[this.as];
   };
   m.indexForElement = function (a) {
      return (a = this.modelForElement(a)) && a[this.indexAs];
   };
   m.modelForElement = function (a) {
      a: {
         var b = this.template;
         for (var c; a; )
            if ((c = a.__dataHost ? a : a.ki))
               if (c.__dataHost != b) a = c.__dataHost;
               else {
                  b = c;
                  break a;
               }
            else a = E(a).parentNode;
         b = null;
      }
      return b;
   };
   t.Object.defineProperties(Fe, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "dom-repeat";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return null;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               items: { type: Array },
               as: { type: String, value: "item" },
               indexAs: { type: String, value: "index" },
               itemsIndexAs: { type: String, value: "itemsIndex" },
               sort: { type: Function, observer: Fe.prototype.__sortChanged },
               filter: {
                  type: Function,
                  observer: Fe.prototype.__filterChanged,
               },
               observe: {
                  type: String,
                  observer: Fe.prototype.__observeChanged,
               },
               delay: Number,
               renderedItemCount: { type: Number, notify: !pb, readOnly: !0 },
               initialCount: { type: Number },
               targetFramerate: { type: Number, value: 20 },
               _targetFrameTime: {
                  type: Number,
                  computed: "__computeFrameTime(targetFramerate)",
               },
               notifyDomChange: { type: Boolean },
               reuseChunkedInstances: { type: Boolean },
            };
         },
      },
      observers: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return ["__itemsChanged(items.*)"];
         },
      },
   });
   Fe.prototype._setRenderedItemCount = function () {};
   customElements.define(Fe.is, Fe);
   function Ge(a) {
      return "slot" === a.localName;
   }
   function He(a, b) {
      var c = this;
      this.h = this.j = null;
      this.m = !1;
      this.g = a;
      this.ea = b;
      this.da = [];
      this.la = null;
      this.o = !1;
      this.ba = function () {
         c.og();
      };
      this.connect();
      this.og();
   }
   function Ie(a) {
      var b = E(a);
      return Ge(a)
         ? b.assignedNodes({ flatten: !0 })
         : Array.from(b.childNodes)
              .map(function (c) {
                 return Ge(c) ? E(c).assignedNodes({ flatten: !0 }) : [c];
              })
              .reduce(function (c, d) {
                 return c.concat(d);
              }, []);
   }
   m = He.prototype;
   m.connect = function () {
      var a = this;
      Ge(this.g)
         ? this.xe([this.g])
         : E(this.g).children &&
           (this.xe(E(this.g).children),
           window.ShadyDOM
              ? (this.j = window.ShadyDOM.observeChildren(this.g, function (b) {
                   a.ng(b);
                }))
              : ((this.h = new MutationObserver(function (b) {
                   a.ng(b);
                })),
                this.h.observe(this.g, { childList: !0 })));
      this.m = !0;
   };
   m.disconnect = function () {
      Ge(this.g)
         ? this.bf([this.g])
         : E(this.g).children &&
           (this.bf(E(this.g).children),
           window.ShadyDOM && this.j
              ? (window.ShadyDOM.unobserveChildren(this.j), (this.j = null))
              : this.h && (this.h.disconnect(), (this.h = null)));
      this.m = !1;
   };
   m.og = function () {
      var a = this;
      this.o ||
         ((this.o = !0),
         Db.run(function () {
            return a.flush();
         }));
   };
   m.ng = function (a) {
      this.ye(a);
      this.flush();
   };
   m.ye = function (a) {
      if (a)
         for (var b = 0; b < a.length; b++) {
            var c = a[b];
            c.addedNodes && this.xe(c.addedNodes);
            c.removedNodes && this.bf(c.removedNodes);
         }
   };
   m.flush = function () {
      if (!this.m) return !1;
      window.ShadyDOM && ShadyDOM.flush();
      this.h
         ? this.ye(this.h.takeRecords())
         : this.j && this.ye(this.j.takeRecords());
      this.o = !1;
      var a = { target: this.g, addedNodes: [], removedNodes: [] },
         b = Ie(this.g);
      var c = this.da;
      c = Pc(b, b.length, c, c.length);
      for (var d = 0, e = void 0; d < c.length && (e = c[d]); d++)
         for (
            var f = 0, g = void 0;
            f < e.removed.length && (g = e.removed[f]);
            f++
         )
            a.removedNodes.push(g);
      d = 0;
      for (e = void 0; d < c.length && (e = c[d]); d++)
         for (f = e.index; f < e.index + e.addedCount; f++)
            a.addedNodes.push(b[f]);
      this.da = b;
      b = !1;
      if (a.addedNodes.length || a.removedNodes.length)
         (b = !0), this.ea.call(this.g, a);
      return b;
   };
   m.xe = function (a) {
      for (var b = 0; b < a.length; b++) {
         var c = a[b];
         Ge(c) && c.addEventListener("slotchange", this.ba);
      }
   };
   m.bf = function (a) {
      for (var b = 0; b < a.length; b++) {
         var c = a[b];
         Ge(c) && c.removeEventListener("slotchange", this.ba);
      }
   };
   var Je = Element.prototype,
      Ke =
         Je.matches ||
         Je.matchesSelector ||
         Je.mozMatchesSelector ||
         Je.msMatchesSelector ||
         Je.oMatchesSelector ||
         Je.webkitMatchesSelector;
   function Le(a) {
      window.ShadyDOM && window.ShadyDOM.inUse && window.ShadyDOM.patch(a);
      this.node = a;
   }
   m = Le.prototype;
   m.observeNodes = function (a) {
      return new He(this.node, a);
   };
   m.unobserveNodes = function (a) {
      a.disconnect();
   };
   m.deepContains = function (a) {
      if (E(this.node).contains(a)) return !0;
      var b = a;
      for (a = a.ownerDocument; b && b !== a && b !== this.node; )
         b = E(b).parentNode || E(b).host;
      return b === this.node;
   };
   m.getOwnerRoot = function () {
      return E(this.node).getRootNode();
   };
   m.getDistributedNodes = function () {
      return "slot" === this.node.localName
         ? E(this.node).assignedNodes({ flatten: !0 })
         : [];
   };
   m.getDestinationInsertionPoints = function () {
      for (var a = [], b = E(this.node).assignedSlot; b; )
         a.push(b), (b = E(b).assignedSlot);
      return a;
   };
   m.importNode = function (a, b) {
      return E(
         this.node instanceof Document ? this.node : this.node.ownerDocument
      ).importNode(a, b);
   };
   m.getEffectiveChildNodes = function () {
      return Ie(this.node);
   };
   m.queryDistributedElements = function (a) {
      for (
         var b = this.getEffectiveChildNodes(),
            c = [],
            d = 0,
            e = b.length,
            f = void 0;
         d < e && (f = b[d]);
         d++
      )
         f.nodeType === Node.ELEMENT_NODE && Ke.call(f, a) && c.push(f);
      return c;
   };
   t.Object.defineProperties(Le.prototype, {
      activeElement: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            var a = this.node;
            return void 0 !== a._activeElement
               ? a._activeElement
               : a.activeElement;
         },
      },
   });
   function Me() {
      for (
         var a = Le.prototype,
            b =
               "cloneNode appendChild insertBefore removeChild replaceChild setAttribute removeAttribute querySelector querySelectorAll attachShadow".split(
                  " "
               ),
            c = {},
            d = 0;
         d < b.length;
         c = { ad: c.ad }, d++
      )
         (c.ad = b[d]),
            (a[c.ad] = (function (e) {
               return function () {
                  return this.node[e.ad].apply(this.node, arguments);
               };
            })(c));
   }
   function Ne(a, b) {
      for (var c = {}, d = 0; d < b.length; c = { bd: c.bd }, d++)
         (c.bd = b[d]),
            Object.defineProperty(a, c.bd, {
               get: (function (e) {
                  return function () {
                     return this.node[e.bd];
                  };
               })(c),
               configurable: !0,
            });
   }
   function Oe() {
      for (
         var a = Le.prototype,
            b = ["textContent", "innerHTML", "className"],
            c = {},
            d = 0;
         d < b.length;
         c = { nc: c.nc }, d++
      )
         (c.nc = b[d]),
            Object.defineProperty(a, c.nc, {
               get: (function (e) {
                  return function () {
                     return this.node[e.nc];
                  };
               })(c),
               set: (function (e) {
                  return function (f) {
                     this.node[e.nc] = f;
                  };
               })(c),
               configurable: !0,
            });
   }
   function Pe(a) {
      this.event = a;
   }
   t.Object.defineProperties(Pe.prototype, {
      yc: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return this.path[0];
         },
      },
      gf: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return this.event.target;
         },
      },
      path: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return this.event.composedPath();
         },
      },
   });
   var Qe = Le;
   if (
      window.ShadyDOM &&
      window.ShadyDOM.inUse &&
      window.ShadyDOM.noPatch &&
      window.ShadyDOM.Wrapper
   ) {
      var Re = window.ShadyDOM.Wrapper,
         Se = function () {
            return Re.apply(this, arguments) || this;
         };
      A(Se, Re);
      Object.getOwnPropertyNames(Le.prototype).forEach(function (a) {
         "activeElement" != a && (Se.prototype[a] = Le.prototype[a]);
      });
      Ne(Se.prototype, ["classList"]);
      Qe = Se;
      Object.defineProperties(Pe.prototype, {
         gf: {
            get: function () {
               var a = this.event.currentTarget;
               a = a && L(a).getOwnerRoot();
               for (var b = this.path, c = 0; c < b.length; c++) {
                  var d = b[c];
                  if (L(d).getOwnerRoot() === a) return d;
               }
            },
            configurable: !0,
         },
         path: {
            get: function () {
               return window.ShadyDOM.composedPath(this.event);
            },
            configurable: !0,
         },
      });
   } else
      Me(),
         Ne(
            Le.prototype,
            "parentNode firstChild lastChild nextSibling previousSibling firstElementChild lastElementChild nextElementSibling previousElementSibling childNodes children classList shadowRoot".split(
               " "
            )
         ),
         Oe();
   function L(a) {
      a = a || document;
      if (a instanceof Qe) return a;
      if (a instanceof Pe) return a;
      var b = a.__domApi;
      b ||
         (a instanceof Event ? (b = new Pe(a)) : (b = new Qe(a)),
         (a.__domApi = b));
      return b;
   }
   var Te = /:host\(:dir\((ltr|rtl)\)\)/g,
      Ue = /([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,
      Ve = /:dir\((?:ltr|rtl)\)/,
      We = !(!window.ShadyDOM || !window.ShadyDOM.inUse),
      Xe = [],
      Ye = null,
      Ze = "";
   function $e() {
      Ze = document.documentElement.getAttribute("dir");
      Ze = document.documentElement.getAttribute("dir");
      for (var a = 0; a < Xe.length; a++) {
         var b = Xe[a];
         b.__autoDirOptOut || b.setAttribute("dir", Ze);
      }
   }
   var af = D(function (a) {
      function b() {
         var d = c.call(this) || this;
         d.__autoDirOptOut = !1;
         return d;
      }
      We ||
         Ye ||
         ((Ze = document.documentElement.getAttribute("dir")),
         (Ye = new MutationObserver($e)),
         Ye.observe(document.documentElement, {
            attributes: !0,
            attributeFilter: ["dir"],
         }));
      var c = Tb(a);
      A(b, c);
      b._processStyleText = function (d, e) {
         d = c._processStyleText.call(this, d, e);
         !We &&
            Ve.test(d) &&
            ((d = this._replaceDirInCssText(d)), (this.ge = !0));
         return d;
      };
      b._replaceDirInCssText = function (d) {
         d = d.replace(Te, ':host([dir="$1"])');
         return (d = d.replace(Ue, ':host([dir="$2"]) $1'));
      };
      b.prototype.ready = function () {
         c.prototype.ready.call(this);
         this.__autoDirOptOut = this.hasAttribute("dir");
      };
      b.prototype.connectedCallback = function () {
         c.prototype.connectedCallback &&
            c.prototype.connectedCallback.call(this);
         this.constructor.ge &&
            (Ye && Ye.takeRecords().length && $e(),
            Xe.push(this),
            this.__autoDirOptOut || this.setAttribute("dir", Ze));
      };
      b.prototype.disconnectedCallback = function () {
         c.prototype.disconnectedCallback &&
            c.prototype.disconnectedCallback.call(this);
         if (this.constructor.ge) {
            var d = Xe.indexOf(this);
            -1 < d && Xe.splice(d, 1);
         }
      };
      b.ge = !1;
      return b;
   });
   function bf(a) {
      for (; a; ) {
         var b = Object.getOwnPropertyDescriptor(a, "observedAttributes");
         if (b) return b.get;
         a = Object.getPrototypeOf(a.prototype).constructor;
      }
      return function () {
         return [];
      };
   }
   D(function (a) {
      function b() {
         return c.call(this) || this;
      }
      var c = Nc(a),
         d = bf(c);
      A(b, c);
      b.prototype._initializeProperties = function () {
         this.hasAttribute("disable-upgrade")
            ? (this.__isUpgradeDisabled = !0)
            : c.prototype._initializeProperties.call(this);
      };
      b.prototype._enableProperties = function () {
         this.__isUpgradeDisabled || c.prototype._enableProperties.call(this);
      };
      b.prototype._canApplyPropertyDefault = function (e) {
         return (
            c.prototype._canApplyPropertyDefault.call(this, e) &&
            !(this.__isUpgradeDisabled && this._isPropertyPending(e))
         );
      };
      b.prototype.attributeChangedCallback = function (e, f, g, h) {
         "disable-upgrade" == e
            ? this.__isUpgradeDisabled &&
              null == g &&
              (c.prototype._initializeProperties.call(this),
              (this.__isUpgradeDisabled = !1),
              E(this).isConnected && c.prototype.connectedCallback.call(this))
            : c.prototype.attributeChangedCallback.call(this, e, f, g, h);
      };
      b.prototype.connectedCallback = function () {
         this.__isUpgradeDisabled || c.prototype.connectedCallback.call(this);
      };
      b.prototype.disconnectedCallback = function () {
         this.__isUpgradeDisabled ||
            c.prototype.disconnectedCallback.call(this);
      };
      t.Object.defineProperties(b, {
         observedAttributes: {
            configurable: !0,
            enumerable: !0,
            get: function () {
               return d.call(this).concat("disable-upgrade");
            },
         },
      });
      return b;
   });
   var cf = !1,
      df = [],
      ef = [];
   function ff() {
      cf = !0;
      requestAnimationFrame(function () {
         for (cf = !1; df.length; ) gf(df.shift());
         setTimeout(function () {
            for (var a = 0, b = ef.length; a < b; a++) gf(ef.shift());
         });
      });
   }
   function gf(a) {
      var b = a[0],
         c = a[1];
      a = a[2];
      try {
         c.apply(b, a);
      } catch (d) {
         setTimeout(function () {
            throw d;
         });
      }
   }
   function hf(a, b) {
      cf || ff();
      ef.push([a, b, void 0]);
   } /*

Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
   var jf = window.ShadyDOM,
      kf = window.ShadyCSS;
   function lf(a, b) {
      function c(g) {
         if (E(g).getRootNode() === f) {
            var h = Array.from(jf.nativeMethods.querySelectorAll.call(g, "*"));
            h.push(g);
            for (g = 0; g < h.length; g++) {
               var k = h[g];
               if (E(k).getRootNode() === f) {
                  var l = d.currentScopeForNode(k);
                  l !== e &&
                     ("" !== l && d.unscopeNode(k, l), d.scopeNode(k, e));
               }
            }
         }
      }
      b = void 0 === b ? !1 : b;
      if (!jf || !kf || !jf.handlesDynamicScoping) return null;
      var d = kf.ScopingShim;
      if (!d) return null;
      var e = d.scopeForNode(a),
         f = E(a).getRootNode();
      c(a);
      return b
         ? ((b = new MutationObserver(function (g) {
              for (var h = 0; h < g.length; h++)
                 for (var k = g[h], l = 0; l < k.addedNodes.length; l++) {
                    var n = k.addedNodes[l];
                    n.nodeType === Node.ELEMENT_NODE && c(n);
                 }
           })),
           b.observe(a, { childList: !0, subtree: !0 }),
           b)
         : null;
   }
   function mf() {
      document.body.removeAttribute("unresolved");
   }
   window.WebComponents
      ? window.addEventListener("WebComponentsReady", mf)
      : "interactive" === document.readyState ||
        "complete" === document.readyState
      ? mf()
      : window.addEventListener("DOMContentLoaded", mf);
   function nf() {
      this.end = this.start = 0;
      this.rules = this.parent = this.previous = null;
      this.cssText = this.parsedCssText = "";
      this.atRule = !1;
      this.type = 0;
      this.parsedSelector = this.selector = this.keyframesName = "";
   }
   function of(a) {
      var b = (a = a.replace(pf, "").replace(qf, "")),
         c = new nf();
      c.start = 0;
      c.end = b.length;
      for (var d = c, e = 0, f = b.length; e < f; e++)
         if ("{" === b[e]) {
            d.rules || (d.rules = []);
            var g = d,
               h = g.rules[g.rules.length - 1] || null;
            d = new nf();
            d.start = e + 1;
            d.parent = g;
            d.previous = h;
            g.rules.push(d);
         } else "}" === b[e] && ((d.end = e + 1), (d = d.parent || c));
      return rf(c, a);
   }
   function rf(a, b) {
      var c = b.substring(a.start, a.end - 1);
      a.parsedCssText = a.cssText = c.trim();
      a.parent &&
         ((c = b.substring(
            a.previous ? a.previous.end : a.parent.start,
            a.start - 1
         )),
         (c =
            _expandUnicodeEscapes$$module$third_party$javascript$polymer$v2$shadycss$src$css_parse(
               c
            )),
         (c = c.replace(sf, " ")),
         (c = c.substring(c.lastIndexOf(";") + 1)),
         (c = a.parsedSelector = a.selector = c.trim()),
         (a.atRule = 0 === c.indexOf("@")),
         a.atRule
            ? 0 === c.indexOf("@media")
               ? (a.type = 4)
               : c.match(tf) &&
                 ((a.type = 7), (a.keyframesName = a.selector.split(sf).pop()))
            : 0 === c.indexOf("--")
            ? (a.type = 1e3)
            : (a.type = 1));
      if ((c = a.rules))
         for (var d = 0, e = c.length, f = void 0; d < e && (f = c[d]); d++)
            rf(f, b);
      return a;
   }
   function _expandUnicodeEscapes$$module$third_party$javascript$polymer$v2$shadycss$src$css_parse(
      a
   ) {
      return a.replace(/\\([0-9a-f]{1,6})\s/gi, function (b, c) {
         b = c;
         for (c = 6 - b.length; c--; ) b = "0" + b;
         return "\\" + b;
      });
   }
   function uf(a, b, c) {
      c = void 0 === c ? "" : c;
      var d = "";
      if (a.cssText || a.rules) {
         var e = a.rules;
         if (
            e &&
            !_hasMixinRules$$module$third_party$javascript$polymer$v2$shadycss$src$css_parse(
               e
            )
         )
            for (var f = 0, g = e.length, h = void 0; f < g && (h = e[f]); f++)
               d = uf(h, b, d);
         else
            b
               ? (b = a.cssText)
               : ((b = a.cssText),
                 (b = b.replace(vf, "").replace(wf, "")),
                 (b = b.replace(xf, "").replace(yf, ""))),
               (d = b.trim()) && (d = "  " + d + "\n");
      }
      d &&
         (a.selector && (c += a.selector + " {\n"),
         (c += d),
         a.selector && (c += "}\n\n"));
      return c;
   }
   function _hasMixinRules$$module$third_party$javascript$polymer$v2$shadycss$src$css_parse(
      a
   ) {
      a = a[0];
      return !!a && !!a.selector && 0 === a.selector.indexOf("--");
   }
   var pf = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
      qf = /@import[^;]*;/gim,
      vf = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
      wf = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
      xf = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
      yf = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
      tf = /^@[^\s]*keyframes/,
      sf = /\s+/g;
   var zf = {};
   var Af = Promise.resolve();
   function Bf(a) {
      if ((a = zf[a]))
         (a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0),
            (a._applyShimValidatingVersion =
               a._applyShimValidatingVersion || 0),
            (a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1);
   }
   function Cf(a) {
      return a._applyShimCurrentVersion === a._applyShimNextVersion;
   }
   function Df(a) {
      a._applyShimValidatingVersion = a._applyShimNextVersion;
      a._validating ||
         ((a._validating = !0),
         Af.then(function () {
            a._applyShimCurrentVersion = a._applyShimNextVersion;
            a._validating = !1;
         }));
   }
   var Ef = new Set();
   function Ff(a) {
      if (!a) return "";
      "string" === typeof a && (a = of(a));
      return uf(a, kd);
   }
   function Gf(a) {
      !a.__cssRules && a.textContent && (a.__cssRules = of(a.textContent));
      return a.__cssRules || null;
   }
   function Hf(a, b, c, d) {
      if (a) {
         var e = !1,
            f = a.type;
         if (d && 4 === f) {
            var g = a.selector.match(Wc);
            g && (window.matchMedia(g[1]).matches || (e = !0));
         }
         1 === f ? b(a) : c && 7 === f ? c(a) : 1e3 === f && (e = !0);
         if ((a = a.rules) && !e)
            for (e = 0, f = a.length, g = void 0; e < f && (g = a[e]); e++)
               Hf(g, b, c, d);
      }
   }
   function If(a, b) {
      var c = a.indexOf("var(");
      if (-1 === c) return b(a, "", "", "");
      a: {
         var d = 0;
         var e = c + 3;
         for (var f = a.length; e < f; e++)
            if ("(" === a[e]) d++;
            else if (")" === a[e] && 0 === --d) break a;
         e = -1;
      }
      d = a.substring(c + 4, e);
      c = a.substring(0, c);
      a = If(a.substring(e + 1), b);
      e = d.indexOf(",");
      return -1 === e
         ? b(c, d.trim(), "", a)
         : b(c, d.substring(0, e).trim(), d.substring(e + 1).trim(), a);
   }
   function Jf(a) {
      if (void 0 !== id) return id;
      if (void 0 === a.__cssBuild) {
         var b = a.getAttribute("css-build");
         if (b) a.__cssBuild = b;
         else {
            a: {
               b =
                  "template" === a.localName
                     ? a.content.firstChild
                     : a.firstChild;
               if (
                  b instanceof Comment &&
                  ((b = b.textContent.trim().split(":")), "css-build" === b[0])
               ) {
                  b = b[1];
                  break a;
               }
               b = "";
            }
            if ("" !== b) {
               var c =
                  "template" === a.localName
                     ? a.content.firstChild
                     : a.firstChild;
               c.parentNode.removeChild(c);
            }
            a.__cssBuild = b;
         }
      }
      return a.__cssBuild || "";
   }
   var Kf = /;\s*/m,
      Lf = /^\s*(initial)|(inherit)\s*$/,
      Mf = /\s*!important/;
   function Nf() {
      this.g = {};
   }
   Nf.prototype.set = function (a, b) {
      a = a.trim();
      this.g[a] = { properties: b, zg: {} };
   };
   Nf.prototype.get = function (a) {
      a = a.trim();
      return this.g[a] || null;
   };
   var Of = null;
   function M() {
      this.h = this.j = null;
      this.g = new Nf();
   }
   m = M.prototype;
   m.rj = function (a) {
      a = Vc.test(a) || Uc.test(a);
      Vc.lastIndex = 0;
      Uc.lastIndex = 0;
      return a;
   };
   m.sh = function (a, b) {
      if (void 0 === a._gatheredStyle) {
         var c = [];
         for (
            var d = a.content.querySelectorAll("style"), e = 0;
            e < d.length;
            e++
         ) {
            var f = d[e];
            if (f.hasAttribute("shady-unscoped")) {
               if (!fd) {
                  var g = f.textContent;
                  if (!Ef.has(g)) {
                     Ef.add(g);
                     var h = document.createElement("style");
                     h.setAttribute("shady-unscoped", "");
                     h.textContent = g;
                     document.head.appendChild(h);
                  }
                  f.parentNode.removeChild(f);
               }
            } else c.push(f.textContent), f.parentNode.removeChild(f);
         }
         (c = c.join("").trim())
            ? ((d = document.createElement("style")),
              (d.textContent = c),
              a.content.insertBefore(d, a.content.firstChild),
              (c = d))
            : (c = null);
         a._gatheredStyle = c;
      }
      return (a = a._gatheredStyle) ? this.transformStyle(a, b) : null;
   };
   m.transformStyle = function (a, b) {
      b = void 0 === b ? "" : b;
      var c = Gf(a);
      this.rh(c, b);
      a.textContent = Ff(c);
      return c;
   };
   m.lf = function (a) {
      var b = this,
         c = Gf(a);
      Hf(c, function (d) {
         ":root" === d.selector && (d.selector = "html");
         b.mf(d);
      });
      a.textContent = Ff(c);
      return c;
   };
   m.rh = function (a, b) {
      var c = this;
      this.j = b;
      Hf(a, function (d) {
         c.mf(d);
      });
      this.j = null;
   };
   m.mf = function (a) {
      a.cssText = Pf(this, a.parsedCssText, a);
      ":root" === a.selector && (a.selector = ":host > *");
   };
   function Pf(a, b, c) {
      b = b.replace(Uc, function (d, e, f, g) {
         return a.hj(d, e, f, g, c);
      });
      return a.ig(b, c);
   }
   m.ti = function (a) {
      this.h ||
         ((this.h = document.createElement("meta")),
         this.h.setAttribute("apply-shim-measure", ""),
         (this.h.style.all = "initial"),
         document.head.appendChild(this.h));
      return window.getComputedStyle(this.h).getPropertyValue(a);
   };
   m.ri = function (a) {
      for (var b = this, c = a; c.parent; ) c = c.parent;
      var d = {},
         e = !1;
      Hf(c, function (f) {
         (e = e || f === a) ||
            (f.selector === a.selector &&
               Object.assign(d, b.ve(f.parsedCssText)));
      });
      return d;
   };
   m.ig = function (a, b) {
      for (var c; (c = Vc.exec(a)); ) {
         var d = c[0],
            e = c[1];
         c = c.index;
         var f = c + d.indexOf("@apply");
         f = a.slice(0, f);
         a = a.slice(c + d.length);
         d = b ? this.ri(b) : {};
         Object.assign(d, this.ve(f));
         e = this.mi(e, d);
         a = f + e + a;
         Vc.lastIndex = c + e.length;
      }
      return a;
   };
   m.mi = function (a, b) {
      a = a.replace(Kf, "");
      var c = [],
         d = this.g.get(a);
      d || (this.g.set(a, {}), (d = this.g.get(a)));
      if (d) {
         this.j && (d.zg[this.j] = !0);
         var e,
            f = d.properties;
         for (e in f) {
            var g = b && b[e];
            d = [e, ": var(", a, "_-_", e];
            g && d.push(",", g.replace(Mf, ""));
            d.push(")");
            Mf.test(f[e]) && d.push(" !important");
            c.push(d.join(""));
         }
      }
      return c.join("; ");
   };
   m.ij = function (a, b) {
      var c = Lf.exec(b);
      c && (b = c[1] ? this.ti(a) : "apply-shim-inherit");
      return b;
   };
   m.ve = function (a, b) {
      b = void 0 === b ? !1 : b;
      a = a.split(";");
      for (var c, d, e = {}, f = 0; f < a.length; f++)
         if ((c = a[f]))
            (d = c.split(":")),
               1 < d.length &&
                  ((c = d[0].trim()),
                  (d = d.slice(1).join(":")),
                  b && (d = this.ij(c, d)),
                  (e[c] = d));
      return e;
   };
   m.vi = function (a) {
      if (Of) for (var b in a.zg) b !== this.j && Of(b);
   };
   m.hj = function (a, b, c, d, e) {
      var f = this;
      c &&
         If(c, function (w, v) {
            v && f.g.get(v) && (d = "@apply " + v + ";");
         });
      if (!d) return a;
      var g = this.ig("" + d, e);
      e = a.slice(0, a.indexOf("--"));
      var h = (g = this.ve(g, !0)),
         k = this.g.get(b),
         l = k && k.properties;
      l ? (h = Object.assign(Object.create(l), g)) : this.g.set(b, h);
      var n = [],
         p,
         q = !1;
      for (p in h) {
         var r = g[p];
         void 0 === r && (r = "initial");
         !l || p in l || (q = !0);
         n.push(b + "_-_" + p + ": " + r);
      }
      q && this.vi(k);
      k && (k.properties = h);
      c && (e = a + ";" + e);
      return e + n.join("; ") + ";";
   };
   M.prototype.detectMixin = M.prototype.rj;
   M.prototype.transformStyle = M.prototype.transformStyle;
   M.prototype.transformCustomStyle = M.prototype.lf;
   M.prototype.transformRules = M.prototype.rh;
   M.prototype.transformRule = M.prototype.mf;
   M.prototype.transformTemplate = M.prototype.sh;
   M.prototype._separator = "_-_";
   Object.defineProperty(M.prototype, "invalidCallback", {
      get: function () {
         return Of;
      },
      set: function (a) {
         Of = a;
      },
   });
   var Qf = new M();
   function Rf() {
      this.g = null;
      Qf.invalidCallback = Bf;
   }
   function Sf(a) {
      !a.g &&
         window.ShadyCSS.CustomStyleInterface &&
         ((a.g = window.ShadyCSS.CustomStyleInterface),
         (a.g.transformCallback = function (b) {
            Qf.lf(b);
         }),
         (a.g.validateCallback = function () {
            requestAnimationFrame(function () {
               a.g.enqueued && a.flushCustomStyles();
            });
         }));
   }
   m = Rf.prototype;
   m.prepareTemplate = function (a, b) {
      Sf(this);
      "" === Jf(a) && ((zf[b] = a), (b = Qf.sh(a, b)), (a._styleAst = b));
   };
   m.flushCustomStyles = function () {
      Sf(this);
      if (this.g) {
         var a = this.g.processStyles();
         if (this.g.enqueued) {
            for (var b = 0; b < a.length; b++) {
               var c = this.g.getStyleForCustomStyle(a[b]);
               c && Qf.lf(c);
            }
            this.g.enqueued = !1;
         }
      }
   };
   m.styleSubtree = function (a, b) {
      Sf(this);
      b && Xc(a, b);
      if (a.shadowRoot)
         for (
            this.styleElement(a),
               a = a.shadowRoot.children || a.shadowRoot.childNodes,
               b = 0;
            b < a.length;
            b++
         )
            this.styleSubtree(a[b]);
      else
         for (a = a.children || a.childNodes, b = 0; b < a.length; b++)
            this.styleSubtree(a[b]);
   };
   m.styleElement = function (a) {
      Sf(this);
      var b = a.localName,
         c;
      b
         ? -1 < b.indexOf("-")
            ? (c = b)
            : (c = (a.getAttribute && a.getAttribute("is")) || "")
         : (c = a.is);
      b = zf[c];
      if (!((b && "" !== Jf(b)) || !b || Cf(b))) {
         if (Cf(b) || b._applyShimValidatingVersion !== b._applyShimNextVersion)
            this.prepareTemplate(b, c), Df(b);
         if ((a = a.shadowRoot))
            if ((a = a.querySelector("style")))
               (a.__cssRules = b._styleAst), (a.textContent = Ff(b._styleAst));
      }
   };
   m.styleDocument = function (a) {
      Sf(this);
      this.styleSubtree(document.body, a);
   };
   if (!window.ShadyCSS || !window.ShadyCSS.ScopingShim) {
      var Tf = new Rf(),
         Uf = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
      window.ShadyCSS = {
         prepareTemplate: function (a, b) {
            Tf.flushCustomStyles();
            Tf.prepareTemplate(a, b);
         },
         prepareTemplateStyles: function (a, b, c) {
            window.ShadyCSS.prepareTemplate(a, b, c);
         },
         prepareTemplateDom: function () {},
         styleSubtree: function (a, b) {
            Tf.flushCustomStyles();
            Tf.styleSubtree(a, b);
         },
         styleElement: function (a) {
            Tf.flushCustomStyles();
            Tf.styleElement(a);
         },
         styleDocument: function (a) {
            Tf.flushCustomStyles();
            Tf.styleDocument(a);
         },
         getComputedStyleValue: function (a, b) {
            return Yc(a, b);
         },
         flushCustomStyles: function () {
            Tf.flushCustomStyles();
         },
         nativeCss: kd,
         nativeShadow: fd,
         cssBuild: id,
         disableRuntime: jd,
      };
      Uf && (window.ShadyCSS.CustomStyleInterface = Uf);
   }
   window.ShadyCSS.ApplyShim = Qf;
   var Vf = window.ShadyCSS,
      Wf = D(function (a) {
         function b() {
            return c.call(this) || this;
         }
         a = $d(Nc(a));
         var c = Mc ? a : af(a),
            d = bf(c),
            e = { x: "pan-x", y: "pan-y", none: "none", all: "auto" };
         A(b, c);
         b.prototype.created = function () {};
         b.prototype.__attributeReaction = function (f, g, h) {
            ((this.pb && this.pb[f]) || "disable-upgrade" === f) &&
               this.attributeChangedCallback(f, g, h, null);
         };
         b.prototype.setAttribute = function (f, g) {
            if (qb && !this._legacyForceObservedAttributes) {
               var h = this.getAttribute(f);
               c.prototype.setAttribute.call(this, f, g);
               this.__attributeReaction(f, h, String(g));
            } else c.prototype.setAttribute.call(this, f, g);
         };
         b.prototype.removeAttribute = function (f) {
            if (qb && !this._legacyForceObservedAttributes) {
               var g = this.getAttribute(f);
               c.prototype.removeAttribute.call(this, f);
               this.__attributeReaction(f, g, null);
            } else c.prototype.removeAttribute.call(this, f);
         };
         b.prototype._enableProperties = function () {
            this.__isUpgradeDisabled ||
               c.prototype._enableProperties.call(this);
         };
         b.prototype._canApplyPropertyDefault = function (f) {
            return (
               c.prototype._canApplyPropertyDefault.call(this, f) &&
               !(this.__isUpgradeDisabled && this._isPropertyPending(f))
            );
         };
         b.prototype.connectedCallback = function () {
            this.__needsAttributesAtConnected && this._takeAttributes();
            this.__isUpgradeDisabled ||
               (c.prototype.connectedCallback.call(this),
               (this.isAttached = !0),
               this.attached());
         };
         b.prototype.attached = function () {};
         b.prototype.disconnectedCallback = function () {
            this.__isUpgradeDisabled ||
               (c.prototype.disconnectedCallback.call(this),
               (this.isAttached = !1),
               this.detached());
         };
         b.prototype.detached = function () {};
         b.prototype.attributeChangedCallback = function (f, g, h, k) {
            g !== h &&
               ("disable-upgrade" == f
                  ? this.__isUpgradeDisabled &&
                    null == h &&
                    (this._initializeProperties(),
                    (this.__isUpgradeDisabled = !1),
                    E(this).isConnected && this.connectedCallback())
                  : (c.prototype.attributeChangedCallback.call(
                       this,
                       f,
                       g,
                       h,
                       k
                    ),
                    this.attributeChanged(f, g, h)));
         };
         b.prototype.attributeChanged = function () {};
         b.prototype._initializeProperties = function () {
            if (ib && this.hasAttribute("disable-upgrade"))
               this.__isUpgradeDisabled = !0;
            else {
               var f = Object.getPrototypeOf(this);
               f.hasOwnProperty("ie") || (this._registered(), (f.ie = !0));
               c.prototype._initializeProperties.call(this);
               this.root = this;
               this.created();
               qb &&
                  !this._legacyForceObservedAttributes &&
                  (this.hasAttributes()
                     ? this._takeAttributes()
                     : this.parentNode ||
                       (this.__needsAttributesAtConnected = !0));
               this._applyListeners();
            }
         };
         b.prototype._takeAttributes = function () {
            for (var f = this.attributes, g = 0, h = f.length; g < h; g++) {
               var k = f[g];
               this.__attributeReaction(k.name, null, k.value);
            }
         };
         b.prototype._registered = function () {};
         b.prototype.ready = function () {
            this._ensureAttributes();
            c.prototype.ready.call(this);
         };
         b.prototype._ensureAttributes = function () {};
         b.prototype._applyListeners = function () {};
         b.prototype.serialize = function (f) {
            return this._serializeValue(f);
         };
         b.prototype.deserialize = function (f, g) {
            return this._deserializeValue(f, g);
         };
         b.prototype.reflectPropertyToAttribute = function (f, g, h) {
            this._propertyToAttribute(f, g, h);
         };
         b.prototype.serializeValueToAttribute = function (f, g, h) {
            this._valueToNodeAttribute(h || this, f, g);
         };
         b.prototype.extend = function (f, g) {
            if (!f || !g) return f || g;
            for (
               var h = Object.getOwnPropertyNames(g), k = 0, l = void 0;
               k < h.length && (l = h[k]);
               k++
            ) {
               var n = Object.getOwnPropertyDescriptor(g, l);
               n && Object.defineProperty(f, l, n);
            }
            return f;
         };
         b.prototype.mixin = function (f, g) {
            for (var h in g) f[h] = g[h];
            return f;
         };
         b.prototype.chainObject = function (f, g) {
            f && g && f !== g && (f.__proto__ = g);
            return f;
         };
         b.prototype.instanceTemplate = function (f) {
            f = this.constructor._contentForTemplate(f);
            return document.importNode(f, !0);
         };
         b.prototype.fire = function (f, g, h) {
            h = h || {};
            g = null === g || void 0 === g ? {} : g;
            f = new Event(f, {
               bubbles: void 0 === h.bubbles ? !0 : h.bubbles,
               cancelable: !!h.cancelable,
               composed: void 0 === h.composed ? !0 : h.composed,
            });
            f.detail = g;
            E(h.node || this).dispatchEvent(f);
            return f;
         };
         b.prototype.listen = function (f, g, h) {
            f = f || this;
            var k =
                  this.__boundListeners ||
                  (this.__boundListeners = new WeakMap()),
               l = k.get(f);
            l || ((l = {}), k.set(f, l));
            k = g + h;
            l[k] || (l[k] = this._addMethodEventListenerToNode(f, g, h, this));
         };
         b.prototype.unlisten = function (f, g, h) {
            f = f || this;
            var k = this.__boundListeners && this.__boundListeners.get(f);
            h = g + h;
            var l = k && k[h];
            l && (this._removeEventListenerFromNode(f, g, l), (k[h] = null));
         };
         b.prototype.setScrollDirection = function (f, g) {
            Ud(g || this, e[f] || "auto");
         };
         b.prototype.$$ = function (f) {
            return this.root.querySelector(f);
         };
         b.prototype.distributeContent = function () {
            var f = L(this);
            window.ShadyDOM && f.shadowRoot && ShadyDOM.flush();
         };
         b.prototype.getEffectiveChildNodes = function () {
            return L(this).getEffectiveChildNodes();
         };
         b.prototype.queryDistributedElements = function (f) {
            return L(this).queryDistributedElements(f);
         };
         b.prototype.getEffectiveChildren = function () {
            return this.getEffectiveChildNodes().filter(function (f) {
               return f.nodeType === Node.ELEMENT_NODE;
            });
         };
         b.prototype.getEffectiveTextContent = function () {
            for (
               var f = this.getEffectiveChildNodes(), g = [], h = 0, k;
               (k = f[h]);
               h++
            )
               k.nodeType !== Node.COMMENT_NODE && g.push(k.textContent);
            return g.join("");
         };
         b.prototype.queryEffectiveChildren = function (f) {
            return (f = this.queryDistributedElements(f)) && f[0];
         };
         b.prototype.queryAllEffectiveChildren = function (f) {
            return this.queryDistributedElements(f);
         };
         b.prototype.getContentChildNodes = function (f) {
            return (f = this.root.querySelector(f || "slot"))
               ? L(f).getDistributedNodes()
               : [];
         };
         b.prototype.getContentChildren = function (f) {
            return this.getContentChildNodes(f).filter(function (g) {
               return g.nodeType === Node.ELEMENT_NODE;
            });
         };
         b.prototype.isLightDescendant = function (f) {
            return (
               this !== f &&
               E(this).contains(f) &&
               E(this).getRootNode() === E(f).getRootNode()
            );
         };
         b.prototype.isLocalDescendant = function (f) {
            return this.root === E(f).getRootNode();
         };
         b.prototype.scopeSubtree = function (f, g) {
            return lf(f, void 0 === g ? !1 : g);
         };
         b.prototype.getComputedStyleValue = function (f) {
            return Vf.getComputedStyleValue(this, f);
         };
         b.prototype.debounce = function (f, g, h) {
            this._debouncers = this._debouncers || {};
            return (this._debouncers[f] = rd(
               this._debouncers[f],
               0 < h ? Bb(h) : Db,
               g.bind(this)
            ));
         };
         b.prototype.isDebouncerActive = function (f) {
            this._debouncers = this._debouncers || {};
            f = this._debouncers[f];
            return !(!f || null == f.kb);
         };
         b.prototype.flushDebouncer = function (f) {
            this._debouncers = this._debouncers || {};
            (f = this._debouncers[f]) && f.flush();
         };
         b.prototype.cancelDebouncer = function (f) {
            this._debouncers = this._debouncers || {};
            (f = this._debouncers[f]) && f.cancel();
         };
         b.prototype.async = function (f, g) {
            return 0 < g
               ? window.setTimeout(f.bind(this), g)
               : ~Db.run(f.bind(this));
         };
         b.prototype.cancelAsync = function (f) {
            0 > f ? Db.cancel(~f) : window.clearTimeout(f);
         };
         b.prototype.create = function (f, g) {
            f = document.createElement(f);
            if (g)
               if (f.setProperties) f.setProperties(g);
               else for (var h in g) f[h] = g[h];
            return f;
         };
         b.prototype.elementMatches = function (f, g) {
            return Ke.call(g || this, f);
         };
         b.prototype.toggleAttribute = function (f, g) {
            var h = this;
            3 === arguments.length && (h = arguments[2]);
            1 == arguments.length && (g = !h.hasAttribute(f));
            if (g) return E(h).setAttribute(f, ""), !0;
            E(h).removeAttribute(f);
            return !1;
         };
         b.prototype.toggleClass = function (f, g, h) {
            h = h || this;
            1 == arguments.length && (g = !h.classList.contains(f));
            g ? h.classList.add(f) : h.classList.remove(f);
         };
         b.prototype.transform = function (f, g) {
            g = g || this;
            g.style.webkitTransform = f;
            g.style.transform = f;
         };
         b.prototype.translate3d = function (f, g, h, k) {
            this.transform(
               "translate3d(" + f + "," + g + "," + h + ")",
               k || this
            );
         };
         b.prototype.arrayDelete = function (f, g) {
            if (Array.isArray(f)) {
               if (((g = f.indexOf(g)), 0 <= g)) return f.splice(g, 1);
            } else if (((g = F(this, f).indexOf(g)), 0 <= g))
               return this.splice(f, g, 1);
            return null;
         };
         b.prototype._logger = function (f, g) {
            Array.isArray(g) &&
               1 === g.length &&
               Array.isArray(g[0]) &&
               (g = g[0]);
            switch (f) {
               case "log":
               case "warn":
               case "error":
                  console[f].apply(console, ha(g));
            }
         };
         b.prototype._log = function (f) {
            for (var g = [], h = 0; h < arguments.length; ++h)
               g[h] = arguments[h];
            this._logger("log", g);
         };
         b.prototype._warn = function (f) {
            for (var g = [], h = 0; h < arguments.length; ++h)
               g[h] = arguments[h];
            this._logger("warn", g);
         };
         b.prototype._error = function (f) {
            for (var g = [], h = 0; h < arguments.length; ++h)
               g[h] = arguments[h];
            this._logger("error", g);
         };
         b.prototype._logf = function (f, g) {
            for (var h = [], k = 1; k < arguments.length; ++k)
               h[k - 1] = arguments[k];
            return ["[%s::%s]", this.is, f].concat(ha(h));
         };
         t.Object.defineProperties(b.prototype, {
            domHost: {
               configurable: !0,
               enumerable: !0,
               get: function () {
                  var f = E(this).getRootNode();
                  return f instanceof DocumentFragment ? f.host : f;
               },
            },
         });
         t.Object.defineProperties(b, {
            dh: {
               configurable: !0,
               enumerable: !0,
               get: function () {
                  return this.prototype.dh;
               },
            },
            observedAttributes: {
               configurable: !0,
               enumerable: !0,
               get: function () {
                  return qb && !this.prototype._legacyForceObservedAttributes
                     ? (this.hasOwnProperty("oc") ||
                          ((this.oc = []), Hb.push(this.prototype)),
                       this.oc)
                     : d.call(this).concat("disable-upgrade");
               },
            },
         });
         b.prototype.is = "";
         return b;
      });
   var Xf = {
         attached: !0,
         detached: !0,
         ready: !0,
         created: !0,
         beforeRegister: !0,
         registered: !0,
         attributeChanged: !0,
         listeners: !0,
         hostAttributes: !0,
      },
      Yf = {
         attached: !0,
         detached: !0,
         ready: !0,
         created: !0,
         beforeRegister: !0,
         registered: !0,
         attributeChanged: !0,
         behaviors: !0,
         aj: !0,
      },
      Zf = Object.assign(
         { listeners: !0, hostAttributes: !0, properties: !0, observers: !0 },
         Yf
      );
   function $f(a, b, c, d) {
      for (
         var e = b.aj, f = Object.getOwnPropertyNames(b), g = 0;
         g < f.length;
         g++
      ) {
         var h = f[g];
         if (!(h in d))
            if (e) a[h] = b[h];
            else {
               var k = Object.getOwnPropertyDescriptor(b, h);
               k && ((k.configurable = !0), Object.defineProperty(a, h, k));
            }
      }
      for (var l in Xf) b[l] && ((c[l] = c[l] || []), c[l].push(b[l]));
   }
   function ag(a, b, c) {
      b = b || [];
      for (var d = a.length - 1; 0 <= d; d--) {
         var e = a[d];
         e
            ? Array.isArray(e)
               ? ag(e, b)
               : 0 > b.indexOf(e) && (!c || 0 > c.indexOf(e)) && b.unshift(e)
            : console.warn("behavior is null, check for missing or 404 import");
      }
      return b;
   }
   function bg(a, b) {
      for (var c in b) {
         var d = a[c],
            e = b[c];
         a[c] =
            !("value" in e) && d && "value" in d
               ? Object.assign({ value: d.value }, e)
               : e;
      }
   }
   var cg = Wf(HTMLElement);
   function dg(a, b, c) {
      function d(k) {
         if (h) for (var l = h, n = 0; n < l.length; n++) $f(k, l[n], f, Zf);
         $f(k, a, f, Yf);
      }
      function e() {
         return b.apply(this, arguments) || this;
      }
      var f = {};
      A(e, b);
      e._finalizeClass = function () {
         if (this.hasOwnProperty("generatedFrom")) {
            if (h)
               for (var k = 0, l; k < h.length; k++)
                  (l = h[k]),
                     l.properties && this.createProperties(l.properties),
                     l.observers &&
                        this.createObservers(l.observers, l.properties);
            a.properties && this.createProperties(a.properties);
            a.observers && this.createObservers(a.observers, a.properties);
            this._prepareTemplate();
         } else b._finalizeClass.call(this);
      };
      e.prototype.created = function () {
         b.prototype.created.call(this);
         var k = f.created;
         if (k) for (var l = 0; l < k.length; l++) k[l].call(this);
      };
      e.prototype._registered = function () {
         var k = e.prototype;
         if (!k.hasOwnProperty("ie")) {
            k.ie = !0;
            b.prototype._registered.call(this);
            ib && d(k);
            k = Object.getPrototypeOf(this);
            var l = f.beforeRegister;
            if (l) for (var n = 0; n < l.length; n++) l[n].call(k);
            if ((l = f.registered)) for (n = 0; n < l.length; n++) l[n].call(k);
         }
      };
      e.prototype._applyListeners = function () {
         b.prototype._applyListeners.call(this);
         var k = f.listeners;
         if (k)
            for (var l = 0; l < k.length; l++) {
               var n = k[l];
               if (n)
                  for (var p in n)
                     this._addMethodEventListenerToNode(this, p, n[p]);
            }
      };
      e.prototype._ensureAttributes = function () {
         var k = f.hostAttributes;
         if (k)
            for (var l = k.length - 1; 0 <= l; l--) {
               var n = k[l],
                  p;
               for (p in n) this._ensureAttribute(p, n[p]);
            }
         b.prototype._ensureAttributes.call(this);
      };
      e.prototype.ready = function () {
         b.prototype.ready.call(this);
         var k = f.ready;
         if (k) for (var l = 0; l < k.length; l++) k[l].call(this);
      };
      e.prototype.attached = function () {
         b.prototype.attached.call(this);
         var k = f.attached;
         if (k) for (var l = 0; l < k.length; l++) k[l].call(this);
      };
      e.prototype.detached = function () {
         b.prototype.detached.call(this);
         var k = f.detached;
         if (k) for (var l = 0; l < k.length; l++) k[l].call(this);
      };
      e.prototype.attributeChanged = function (k, l, n) {
         b.prototype.attributeChanged.call(this);
         var p = f.attributeChanged;
         if (p) for (var q = 0; q < p.length; q++) p[q].call(this, k, l, n);
      };
      t.Object.defineProperties(e, {
         properties: {
            configurable: !0,
            enumerable: !0,
            get: function () {
               var k = {};
               if (h) for (var l = 0; l < h.length; l++) bg(k, h[l].properties);
               bg(k, a.properties);
               return k;
            },
         },
         observers: {
            configurable: !0,
            enumerable: !0,
            get: function () {
               var k = [];
               if (h)
                  for (var l = 0, n; l < h.length; l++)
                     (n = h[l]), n.observers && (k = k.concat(n.observers));
               a.observers && (k = k.concat(a.observers));
               return k;
            },
         },
      });
      if (c) {
         Array.isArray(c) || (c = [c]);
         var g = b.prototype.behaviors;
         var h = ag(c, null, g);
         e.prototype.behaviors = g ? g.concat(c) : h;
      }
      ib || d(e.prototype);
      e.generatedFrom = a;
      return e;
   }
   function N(a) {
      if ("function" === typeof a) var b = a;
      else
         a || console.warn("Polymer.Class requires `info` argument"),
            (b = cg),
            (b = dg(a, b, a.behaviors)),
            (b.is = b.prototype.is = a.is);
      a._legacyForceObservedAttributes &&
         (b.prototype._legacyForceObservedAttributes =
            a._legacyForceObservedAttributes);
      customElements.define(b.is, b);
      return b;
   }
   Wf(HTMLElement);
   function eg() {}
   m = eg.prototype;
   m.registered = function () {
      this._prepKeyBindings();
   };
   m.addOwnKeyBinding = function (a, b) {
      this._imperativeKeyBindings[a] = b;
      this._prepKeyBindings();
      this._resetKeyEventListeners();
   };
   m.removeOwnKeyBindings = function () {
      this._imperativeKeyBindings = {};
      this._prepKeyBindings();
      this._resetKeyEventListeners();
   };
   m.keyboardEventMatchesKeys = function (a, b) {
      b = Qa(b);
      for (var c = 0; c < b.length; ++c) if (Oa(b[c], a)) return !0;
      return !1;
   };
   m._collectKeyBindings = function () {
      var a = this.behaviors.map(function (b) {
         return b.ka;
      });
      -1 === a.indexOf(this.ka) && a.push(this.ka);
      return a;
   };
   m._prepKeyBindings = function () {
      this.ca = {};
      this._collectKeyBindings().forEach(function (c) {
         for (var d in c) this._addKeyBinding(d, c[d]);
      }, this);
      for (var a in this._imperativeKeyBindings)
         this._addKeyBinding(a, this._imperativeKeyBindings[a]);
      for (var b in this.ca)
         this.ca[b].sort(function (c, d) {
            c = c[0].lb;
            return c === d[0].lb ? 0 : c ? -1 : 1;
         });
   };
   m._addKeyBinding = function (a, b) {
      Qa(a).forEach(function (c) {
         this.ca[c.event] = this.ca[c.event] || [];
         this.ca[c.event].push([c, b]);
      }, this);
   };
   m._resetKeyEventListeners = function () {
      this._unlistenKeyEventListeners();
      this.isAttached && this._listenKeyEventListeners();
   };
   m._listenKeyEventListeners = function () {
      this.keyEventTarget &&
         Object.keys(this.ca).forEach(function (a) {
            var b = this._onKeyBindingEvent.bind(this, this.ca[a]);
            this._boundKeyHandlers.push([this.keyEventTarget, a, b]);
            this.keyEventTarget.addEventListener(a, b);
         }, this);
   };
   m._unlistenKeyEventListeners = function () {
      for (var a, b, c; this._boundKeyHandlers.length; )
         (a = this._boundKeyHandlers.pop()),
            (b = a[0]),
            (c = a[1]),
            (a = a[2]),
            b.removeEventListener(c, a);
   };
   m._onKeyBindingEvent = function (a, b) {
      this.stopKeyboardEventPropagation && b.stopPropagation();
      if (!b.defaultPrevented)
         for (var c = 0; c < a.length; c++) {
            var d = a[c][0],
               e = a[c][1];
            if (
               Oa(d, b) &&
               (this._triggerKeyHandler(d, e, b), b.defaultPrevented)
            )
               break;
         }
   };
   m._triggerKeyHandler = function (a, b, c) {
      var d = Object.create(a);
      d.ub = c;
      a = new CustomEvent(a.event, { detail: d, cancelable: !0 });
      this[b].call(this, a);
      a.defaultPrevented && c.preventDefault();
   };
   eg = N({
      is: "tf-text-slider",
      _template: Ca,
      behaviors: [Ra],
      listeners: { track: "handleTrack" },
      properties: {
         _inputSelector: { type: String, value: "input" },
         decimalDigits: { type: Number, value: 2 },
         shiftStepFactor: { type: Number, value: 10 },
         hasMouseupAfterFocus: Boolean,
         resetValue: Number,
      },
      ka: {
         enter: "_blurInput",
         up: "_increase",
         down: "_decrease",
         "shift+up": "_increase",
         "shift+down": "_decrease",
      },
      get _inputElement() {
         return this.querySelector(this._inputSelector);
      },
      get g() {
         var a = 1;
         this._inputElement &&
            (a = parseFloat(this._inputElement.getAttribute("step")) || a);
         return a;
      },
      created: function () {
         this.j = function (a) {
            return parseFloat(a);
         };
         this.h = function (a) {
            return a.toString();
         };
      },
      ready: function () {
         this.keyEventTarget = this._inputElement;
         this._inputElement.allowedPattern = "[.0-9]";
      },
      attached: function () {
         this._inputElement &&
            this.listen(
               this._inputElement,
               "dragstart",
               "handleInputDragStart"
            );
      },
      detached: function () {
         this._inputElement &&
            this.unlisten(
               this._inputElement,
               "dragstart",
               "handleInputDragStart"
            );
      },
      handleInputDragStart: function (a) {
         a.preventDefault();
         a.stopPropagation();
      },
      handleTrack: function (a) {
         var b = a.detail;
         (this.hasMouseupAfterFocus && "track" == b.state) ||
            ("track" === b.state
               ? ((a = parseFloat(b.pj)),
                 (b = -1 * parseFloat(b.qj)),
                 (a = Math.abs(a) > Math.abs(b) ? a : b),
                 (b = this._sanitizeNumericValue()),
                 this._maybeChangeValue(b + this.g * a),
                 b != this._inputElement.value &&
                    this._inputElement.dispatchEvent(
                       new Event("changing", { bubbles: !0, composed: !0 })
                    ))
               : "end" === b.state &&
                 (this._inputElement.dispatchEvent(new Event("change")),
                 document.activeElement.blur()));
      },
      _maybeChangeValue: function (a) {
         if (!this._inputElement.disabled) {
            var b = this._inputElement.value;
            a = parseFloat(a);
            var c = parseFloat(this._inputElement.getAttribute("max")),
               d = parseFloat(this._inputElement.getAttribute("min"));
            a < d ? (a = d) : a > c && (a = c);
            c = parseFloat(a.toFixed(this.decimalDigits)).toString();
            this._inputElement.value == c ||
               isNaN(c) ||
               ((this._inputElement.value = this.h(a)),
               this._inputElement.checkValidity()
                  ? this._inputElement.dispatchEvent(new Event("input"))
                  : (this._inputElement.value = b));
         }
      },
      _sanitizeNumericValue: function () {
         var a = this.j(this._inputElement.value);
         isNaN(a) &&
            ("undefined" != typeof this.resetValue
               ? (a = this.resetValue)
               : ((a = parseFloat(this._inputElement.getAttribute("min"))),
                 isNaN(a) && (a = 0)),
            (this._inputElement.value = this.h(a)));
         return a;
      },
      _increase: function (a) {
         this.handleStep(a, this.g);
      },
      _decrease: function (a) {
         this.handleStep(a, -this.g);
      },
      handleStep: function (a, b) {
         b = a.detail.shiftKey ? b * this.shiftStepFactor : b;
         b = this._sanitizeNumericValue() + b;
         var c = this._sanitizeNumericValue();
         this._maybeChangeValue(b);
         c != this._inputElement.value &&
            this._inputElement.dispatchEvent(new Event("change"));
         a.detail.ub.preventDefault();
      },
      _blurInput: function () {
         this._inputElement.blur();
      },
      setNumericValueParser: function (a) {
         this.j = a;
      },
      setDisplayedTextFormatter: function (a) {
         this.h = a;
      },
   });
   var O = {},
      fg = new Map([
         ["pixel2xl", { name: "Pixel 1/1XL/2/2XL", width: 412, height: 732 }],
         ["pixel3", { name: "Pixel 3", width: 412, height: 824 }],
         ["pixel3xl", { name: "Pixel 3 XL", width: 412, height: 847 }],
         ["nexus5", { name: "Nexus 5", width: 360, height: 640 }],
         ["nexus6p", { name: "Nexus 5x/6/6P", width: 412, height: 732 }],
         ["iphone5", { name: "iPhone 5", width: 320, height: 568 }],
         ["iphone8", { name: "iPhone 6/6S/7/8", width: 375, height: 667 }],
         [
            "iphone8plus",
            { name: "iPhone 6/6S/7/8 Plus", width: 414, height: 736 },
         ],
         ["iphonexs", { name: "iPhone X/XS", width: 375, height: 812 }],
         ["iphonexr", { name: "iPhone XS Max/XR", width: 414, height: 896 }],
         ["nexus7", { name: "Nexus 7 ('13)", width: 960, height: 600 }],
         ["nexus10", { name: "Nexus 10", width: 1280, height: 800 }],
         ["ipad", { name: "iPad", width: 1024, height: 768 }],
      ]);
   O.wk = new Map([
      ["allfeeds", ["size", "feeds"]],
      ["allsizes", ["sizes", "feed"]],
      ["desktop", ["feed"]],
      ["mobile", ["device", "feed"]],
      ["parallax", ["size", "device", "feed"]],
      ["single", ["size", "feed"]],
   ]);
   O.be = fg;
   O.xk = function () {};
   O.hb = {
      ALL_FEEDS: "allfeeds",
      ALL_SIZES: "allsizes",
      DESKTOP: "desktop",
      MOBILE: "mobile",
      PARALLAX: "parallax",
      SINGLE: "single",
   };
   O.yk = function () {};
   O.bl = function () {};
   O.cl = void 0;
   O.bi = {
      DEVICE: "device",
      DEVICE_SIZE: "deviceSize",
      FEED: "feed",
      FEEDS: "feeds",
      SIZE: "size",
      SIZES: "sizes",
   };
   var gg = ["ninja", "preview", "publicConstants"],
      P = sa;
   gg[0] in P ||
      "undefined" == typeof P.execScript ||
      P.execScript("var " + gg[0]);
   for (var hg; gg.length && (hg = gg.shift()); )
      gg.length || void 0 === O
         ? P[hg] && P[hg] !== Object.prototype[hg]
            ? (P = P[hg])
            : (P = P[hg] = {})
         : (P[hg] = O);
   function ig(a) {
      if (Error.captureStackTrace) Error.captureStackTrace(this, ig);
      else {
         var b = Error().stack;
         b && (this.stack = b);
      }
      a && (this.message = String(a));
   }
   wa(ig, Error);
   ig.prototype.name = "CustomError";
   function jg(a, b) {
      a = a.split("%s");
      for (var c = "", d = a.length - 1, e = 0; e < d; e++)
         c += a[e] + (e < b.length ? b[e] : "%s");
      ig.call(this, c + a[d]);
   }
   wa(jg, ig);
   jg.prototype.name = "AssertionError";
   var kg;
   function lg() {
      if (void 0 === kg) {
         var a = null,
            b = sa.trustedTypes;
         if (b && b.createPolicy) {
            try {
               a = b.createPolicy("goog#html", {
                  createHTML: xa,
                  createScript: xa,
                  createScriptURL: xa,
               });
            } catch (c) {
               sa.console && sa.console.error(c.message);
            }
            kg = a;
         } else kg = a;
      }
      return kg;
   }
   function mg(a, b) {
      this.g = (a === ng && b) || "";
      this.h = og;
   }
   mg.prototype.mb = !0;
   mg.prototype.ma = function () {
      return this.g;
   };
   function pg(a) {
      return a instanceof mg && a.constructor === mg && a.h === og
         ? a.g
         : "type_error:Const";
   }
   var og = {},
      ng = {};
   var qg = {};
   function rg(a, b) {
      this.g = b === qg ? a : "";
      this.mb = !0;
   }
   rg.prototype.ma = function () {
      return this.g.toString();
   };
   rg.prototype.toString = function () {
      return this.g.toString();
   };
   function sg(a, b) {
      this.g = b === tg ? a : "";
   }
   m = sg.prototype;
   m.mb = !0;
   m.ma = function () {
      return this.g.toString();
   };
   m.ff = !0;
   m.df = function () {
      return 1;
   };
   m.toString = function () {
      return this.g + "";
   };
   function ug(a) {
      return a instanceof sg && a.constructor === sg
         ? a.g
         : "type_error:TrustedResourceUrl";
   }
   function vg(a) {
      var b = pg(new mg(ng, "./%{previewPath}"));
      if (!wg.test(b)) throw Error("Invalid TrustedResourceUrl format: " + b);
      var c = b.replace(xg, function (d, e) {
         if (!Object.prototype.hasOwnProperty.call(a, e))
            throw Error(
               'Found marker, "' +
                  e +
                  '", in format string, "' +
                  b +
                  '", but no valid label mapping found in args: ' +
                  JSON.stringify(a)
            );
         d = a[e];
         return d instanceof mg ? pg(d) : encodeURIComponent(String(d));
      });
      return yg(c);
   }
   var xg = /%{(\w+)}/g,
      wg = RegExp(
         "^((https:)?//[0-9a-z.:[\\]-]+/|/[^/\\\\]|[^:/\\\\%]+/|[^:/\\\\%]*[?#]|about:blank#)",
         "i"
      ),
      zg = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/,
      tg = {};
   function yg(a) {
      var b = lg();
      a = b ? b.createScriptURL(a) : a;
      return new sg(a, tg);
   }
   function Ag(a, b, c) {
      if (null == c) return b;
      if ("string" === typeof c) return c ? a + encodeURIComponent(c) : "";
      for (var d in c)
         if (Object.prototype.hasOwnProperty.call(c, d)) {
            var e = c[d];
            e = Array.isArray(e) ? e : [e];
            for (var f = 0; f < e.length; f++) {
               var g = e[f];
               null != g &&
                  (b || (b = a),
                  (b +=
                     (b.length > a.length ? "&" : "") +
                     encodeURIComponent(d) +
                     "=" +
                     encodeURIComponent(String(g))));
            }
         }
      return b;
   }
   var Bg = {
         qk: {
            1e3: { other: "0K" },
            1e4: { other: "00K" },
            1e5: { other: "000K" },
            1e6: { other: "0M" },
            1e7: { other: "00M" },
            1e8: { other: "000M" },
            1e9: { other: "0B" },
            1e10: { other: "00B" },
            1e11: { other: "000B" },
            1e12: { other: "0T" },
            1e13: { other: "00T" },
            1e14: { other: "000T" },
         },
         pk: {
            1e3: { other: "0 thousand" },
            1e4: { other: "00 thousand" },
            1e5: { other: "000 thousand" },
            1e6: { other: "0 million" },
            1e7: { other: "00 million" },
            1e8: { other: "000 million" },
            1e9: { other: "0 billion" },
            1e10: { other: "00 billion" },
            1e11: { other: "000 billion" },
            1e12: { other: "0 trillion" },
            1e13: { other: "00 trillion" },
            1e14: { other: "000 trillion" },
         },
      },
      Cg = Bg;
   Cg = Bg;
   var Dg = {
      AED: [2, "dh", "\u062f.\u0625."],
      ALL: [0, "Lek", "Lek"],
      AUD: [2, "$", "AU$"],
      BDT: [2, "\u09f3", "Tk"],
      BGN: [2, "lev", "lev"],
      BRL: [2, "R$", "R$"],
      CAD: [2, "$", "C$"],
      CDF: [2, "FrCD", "CDF"],
      CHF: [2, "CHF", "CHF"],
      CLP: [0, "$", "CL$"],
      CNY: [2, "\u00a5", "RMB\u00a5"],
      COP: [32, "$", "COL$"],
      CRC: [0, "\u20a1", "CR\u20a1"],
      CZK: [50, "K\u010d", "K\u010d"],
      DKK: [50, "kr.", "kr."],
      DOP: [2, "RD$", "RD$"],
      EGP: [2, "\u00a3", "LE"],
      ETB: [2, "Birr", "Birr"],
      EUR: [2, "\u20ac", "\u20ac"],
      GBP: [2, "\u00a3", "GB\u00a3"],
      HKD: [2, "$", "HK$"],
      HRK: [2, "kn", "kn"],
      HUF: [34, "Ft", "Ft"],
      IDR: [0, "Rp", "Rp"],
      ILS: [34, "\u20aa", "IL\u20aa"],
      INR: [2, "\u20b9", "Rs"],
      IRR: [0, "Rial", "IRR"],
      ISK: [0, "kr", "kr"],
      JMD: [2, "$", "JA$"],
      JPY: [0, "\u00a5", "JP\u00a5"],
      KRW: [0, "\u20a9", "KR\u20a9"],
      LKR: [2, "Rs", "SLRs"],
      LTL: [2, "Lt", "Lt"],
      MNT: [0, "\u20ae", "MN\u20ae"],
      MVR: [2, "Rf", "MVR"],
      MXN: [2, "$", "Mex$"],
      MYR: [2, "RM", "RM"],
      NOK: [50, "kr", "NOkr"],
      PAB: [2, "B/.", "B/."],
      PEN: [2, "S/.", "S/."],
      PHP: [2, "\u20b1", "PHP"],
      PKR: [0, "Rs", "PKRs."],
      PLN: [50, "z\u0142", "z\u0142"],
      RON: [2, "RON", "RON"],
      RSD: [0, "din", "RSD"],
      RUB: [50, "\u20bd", "RUB"],
      SAR: [2, "Rial", "Rial"],
      SEK: [50, "kr", "kr"],
      SGD: [2, "$", "S$"],
      THB: [2, "\u0e3f", "THB"],
      TRY: [2, "\u20ba", "TRY"],
      TWD: [2, "$", "NT$"],
      TZS: [0, "TSh", "TSh"],
      UAH: [2, "\u0433\u0440\u043d.", "UAH"],
      USD: [2, "$", "US$"],
      UYU: [2, "$", "$U"],
      VND: [48, "\u20ab", "VN\u20ab"],
      YER: [0, "Rial", "Rial"],
      ZAR: [2, "R", "ZAR"],
   };
   var Eg = {
         nf: ".",
         ce: ",",
         tf: "%",
         fe: "0",
         zh: "+",
         rf: "-",
         qf: "E",
         uf: "\u2030",
         de: "\u221e",
         yh: "NaN",
         uh: "#,##0.###",
         al: "#E0",
         vk: "#,##0%",
         sk: "\u00a4#,##0.00",
         pf: "USD",
      },
      Q = Eg;
   Q = Eg;
   var Fg = /&/g,
      Gg = /</g,
      Hg = />/g,
      Ig = /"/g,
      Jg = /'/g,
      Kg = /\x00/g,
      Lg = /[\x00&<>"']/;
   function Mg(a, b) {
      this.g = b === Ng ? a : "";
   }
   m = Mg.prototype;
   m.mb = !0;
   m.ma = function () {
      return this.g.toString();
   };
   m.ff = !0;
   m.df = function () {
      return 1;
   };
   m.toString = function () {
      return this.g.toString();
   };
   function Og(a) {
      return a instanceof Mg && a.constructor === Mg
         ? a.g
         : "type_error:SafeUrl";
   }
   var Pg = RegExp(
         '^(?:audio/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|font/\\w+|image/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|video/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\\w+=(?:\\w+|"[\\w;,= ]+"))*$',
         "i"
      ),
      Qg = /^data:(.*);base64,[a-z0-9+\/]+=*$/i,
      Rg = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
   function Sg(a) {
      if (a instanceof Mg) return a;
      a = "object" == typeof a && a.mb ? a.ma() : String(a);
      if (Rg.test(a)) a = new Mg(a, Ng);
      else {
         a = String(a);
         a = a.replace(/(%0A|%0D)/g, "");
         var b = a.match(Qg);
         a = b && Pg.test(b[1]) ? new Mg(a, Ng) : null;
      }
      return a;
   }
   var Ng = {},
      Tg = new Mg("about:invalid#zClosurez", Ng);
   var Ug = {};
   function Vg(a, b) {
      this.g = b === Ug ? a : "";
      this.mb = !0;
   }
   Vg.prototype.ma = function () {
      return this.g;
   };
   Vg.prototype.toString = function () {
      return this.g.toString();
   };
   function Wg(a) {
      var b = "",
         c;
      for (c in a)
         if (Object.prototype.hasOwnProperty.call(a, c)) {
            if (!/^[-_a-zA-Z0-9]+$/.test(c))
               throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
            var d = a[c];
            null != d &&
               ((d = Array.isArray(d) ? d.map(Xg).join(" ") : Xg(d)),
               (b += c + ":" + d + ";"));
         }
      return b ? new Vg(b, Ug) : Yg;
   }
   var Yg = new Vg("", Ug);
   function Xg(a) {
      if (a instanceof Mg)
         return (
            'url("' +
            Og(a).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") +
            '")'
         );
      a = a instanceof mg ? pg(a) : Zg(String(a));
      if (/[{;}]/.test(a))
         throw new jg("Value does not allow [{;}], got: %s.", [a]);
      return a;
   }
   function Zg(a) {
      var b = a.replace($g, "$1").replace($g, "$1").replace(ah, "url");
      if (bh.test(b)) {
         if (ch.test(a)) return "zClosurez";
         for (var c = (b = !0), d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            "'" == e && c ? (b = !b) : '"' == e && b && (c = !c);
         }
         if (!b || !c || !dh(a)) return "zClosurez";
      } else return "zClosurez";
      return eh(a);
   }
   function dh(a) {
      for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
         var e = a.charAt(d);
         if ("]" == e) {
            if (b) return !1;
            b = !0;
         } else if ("[" == e) {
            if (!b) return !1;
            b = !1;
         } else if (!b && !c.test(e)) return !1;
      }
      return b;
   }
   var bh = RegExp("^[-,.\"'%_!# a-zA-Z0-9\\[\\]]+$"),
      ah = RegExp(
         "\\b(url\\([ \t\n]*)('[ -&(-\\[\\]-~]*'|\"[ !#-\\[\\]-~]*\"|[!#-&*-\\[\\]-~]*)([ \t\n]*\\))",
         "g"
      ),
      $g = RegExp(
         "\\b(calc|cubic-bezier|fit-content|hsl|hsla|linear-gradient|matrix|minmax|repeat|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?|var)\\([-+*/0-9a-z.%\\[\\], ]+\\)",
         "g"
      ),
      ch = /\/\*/;
   function eh(a) {
      return a.replace(ah, function (b, c, d, e) {
         var f = "";
         d = d.replace(/^(['"])(.*)\1$/, function (g, h, k) {
            f = h;
            return k;
         });
         b = (Sg(d) || Tg).ma();
         return c + f + b + f + e;
      });
   }
   var fh = {};
   function gh(a, b, c) {
      this.g = c === fh ? a : "";
      this.h = b;
      this.mb = this.ff = !0;
   }
   gh.prototype.df = function () {
      return this.h;
   };
   gh.prototype.ma = function () {
      return this.g.toString();
   };
   gh.prototype.toString = function () {
      return this.g.toString();
   };
   function hh(a) {
      return a instanceof gh && a.constructor === gh
         ? a.g
         : "type_error:SafeHtml";
   }
   var ih = String.prototype.repeat
      ? function (a, b) {
           return a.repeat(b);
        }
      : function (a, b) {
           return Array(b + 1).join(a);
        };
   function jh(a) {
      return String(a).replace(/\-([a-z])/g, function (b, c) {
         return c.toUpperCase();
      });
   }
   function kh() {
      this.oa = 40;
      this.h = 1;
      this.j = 3;
      this.wa = this.ba = 0;
      this.vd = !1;
      this.pa = this.ea = "";
      this.m = Q.rf;
      this.na = "";
      this.g = 1;
      this.da = !1;
      this.o = [];
      this.eb = this.kc = !1;
      var a = Q.uh;
      this.cb = a.replace(/ /g, "\u00a0");
      var b = [0];
      this.ea = lh(this, a, b);
      for (
         var c = b[0],
            d = -1,
            e = 0,
            f = 0,
            g = 0,
            h = -1,
            k = a.length,
            l = !0;
         b[0] < k && l;
         b[0]++
      )
         switch (a.charAt(b[0])) {
            case "#":
               0 < f ? g++ : e++;
               0 <= h && 0 > d && h++;
               break;
            case "0":
               if (0 < g) throw Error('Unexpected "0" in pattern "' + a + '"');
               f++;
               0 <= h && 0 > d && h++;
               break;
            case ",":
               0 < h && this.o.push(h);
               h = 0;
               break;
            case ".":
               if (0 <= d)
                  throw Error(
                     'Multiple decimal separators in pattern "' + a + '"'
                  );
               d = e + f + g;
               break;
            case "E":
               if (this.eb)
                  throw Error(
                     'Multiple exponential symbols in pattern "' + a + '"'
                  );
               this.eb = !0;
               this.wa = 0;
               b[0] + 1 < k &&
                  "+" == a.charAt(b[0] + 1) &&
                  (b[0]++, (this.vd = !0));
               for (; b[0] + 1 < k && "0" == a.charAt(b[0] + 1); )
                  b[0]++, this.wa++;
               if (1 > e + f || 1 > this.wa)
                  throw Error('Malformed exponential pattern "' + a + '"');
               l = !1;
               break;
            default:
               b[0]--, (l = !1);
         }
      0 == f &&
         0 < e &&
         0 <= d &&
         ((f = d), 0 == f && f++, (g = e - f), (e = f - 1), (f = 1));
      if ((0 > d && 0 < g) || (0 <= d && (d < e || d > e + f)) || 0 == h)
         throw Error('Malformed pattern "' + a + '"');
      g = e + f + g;
      this.j = 0 <= d ? g - d : 0;
      0 <= d && ((this.ba = e + f - d), 0 > this.ba && (this.ba = 0));
      this.h = (0 <= d ? d : g) - e;
      this.eb &&
         ((this.oa = e + this.h), 0 == this.j && 0 == this.h && (this.h = 1));
      this.o.push(Math.max(0, h));
      this.kc = 0 == d || d == g;
      c = b[0] - c;
      this.pa = lh(this, a, b);
      b[0] < a.length && ";" == a.charAt(b[0])
         ? (b[0]++,
           1 != this.g && (this.da = !0),
           (this.m = lh(this, a, b)),
           (b[0] += c),
           (this.na = lh(this, a, b)))
         : ((this.m += this.ea), (this.na += this.pa));
   }
   kh.prototype.parse = function (a, b) {
      b = b || [0];
      a = a.replace(/ |\u202f/g, "\u00a0");
      var c = a.indexOf(this.ea, b[0]) == b[0],
         d = a.indexOf(this.m, b[0]) == b[0];
      c &&
         d &&
         (this.ea.length > this.m.length
            ? (d = !1)
            : this.ea.length < this.m.length && (c = !1));
      c ? (b[0] += this.ea.length) : d && (b[0] += this.m.length);
      if (a.indexOf(Q.de, b[0]) == b[0]) {
         b[0] += Q.de.length;
         var e = Infinity;
      } else {
         e = a;
         var f = !1,
            g = !1,
            h = !1,
            k = -1,
            l = 1,
            n = Q.nf,
            p = Q.ce,
            q = Q.qf;
         p = p.replace(/\u202f/g, "\u00a0");
         for (var r = ""; b[0] < e.length; b[0]++) {
            var w = e.charAt(b[0]),
               v = mh(w);
            if (0 <= v && 9 >= v) (r += v), (h = !0);
            else if (w == n.charAt(0)) {
               if (f || g) break;
               r += ".";
               f = !0;
            } else if (
               w == p.charAt(0) &&
               ("\u00a0" != p.charAt(0) ||
                  (b[0] + 1 < e.length && 0 <= mh(e.charAt(b[0] + 1))))
            ) {
               if (f || g) break;
            } else if (w == q.charAt(0)) {
               if (g) break;
               r += "E";
               g = !0;
               k = b[0];
            } else if ("+" == w || "-" == w) {
               if (h && k != b[0] - 1) break;
               r += w;
            } else if (1 == this.g && w == Q.tf.charAt(0)) {
               if (1 != l) break;
               l = 100;
               if (h) {
                  b[0]++;
                  break;
               }
            } else if (1 == this.g && w == Q.uf.charAt(0)) {
               if (1 != l) break;
               l = 1e3;
               if (h) {
                  b[0]++;
                  break;
               }
            } else break;
         }
         1 != this.g && (l = this.g);
         e = parseFloat(r) / l;
      }
      if (c) {
         if (a.indexOf(this.pa, b[0]) != b[0]) return NaN;
         b[0] += this.pa.length;
      } else if (d) {
         if (a.indexOf(this.na, b[0]) != b[0]) return NaN;
         b[0] += this.na.length;
      }
      return d ? -e : e;
   };
   kh.prototype.format = function (a) {
      if (isNaN(a)) return Q.yh;
      var b = [];
      var c = nh;
      a = S(a, -c.sj);
      var d = 0 > a || (0 == a && 0 > 1 / a);
      d
         ? c.ih
            ? b.push(c.ih)
            : (b.push(c.prefix), b.push(this.m))
         : (b.push(c.prefix), b.push(this.ea));
      if (isFinite(a))
         if (((a = a * (d ? -1 : 1) * this.g), this.eb)) {
            var e = a;
            if (0 == e) oh(this, e, this.h, b), ph(this, 0, b);
            else {
               var f = Math.floor(Math.log(e) / Math.log(10) + 2e-15);
               e = S(e, -f);
               var g = this.h;
               1 < this.oa && this.oa > this.h
                  ? ((g = f % this.oa),
                    0 > g && (g = this.oa + g),
                    (e = S(e, g)),
                    (f -= g),
                    (g = 1))
                  : 1 > this.h
                  ? (f++, (e = S(e, -1)))
                  : ((f -= this.h - 1), (e = S(e, this.h - 1)));
               oh(this, e, g, b);
               ph(this, f, b);
            }
         } else oh(this, a, this.h, b);
      else b.push(Q.de);
      d
         ? c.jh
            ? b.push(c.jh)
            : (isFinite(a) && b.push(c.ph), b.push(this.na))
         : (isFinite(a) && b.push(c.ph), b.push(this.pa));
      return b.join("");
   };
   function oh(a, b, c, d) {
      if (a.ba > a.j) throw Error("Min value must be less than max value");
      d || (d = []);
      var e = S(b, a.j);
      e = Math.round(e);
      if (isFinite(e)) {
         var f = Math.floor(S(e, -a.j));
         b = Math.floor(e - S(f, a.j));
      } else (f = b), (b = 0);
      e = b;
      var g = f;
      f = e;
      var h = 0 < a.ba || 0 < f || !1;
      e = a.ba;
      h && (e = a.ba);
      var k = "";
      for (b = g; 1e20 < b; ) (k = "0" + k), (b = Math.round(S(b, -1)));
      k = b + k;
      var l = Q.nf;
      b = Q.fe.charCodeAt(0);
      var n = k.length,
         p = 0;
      if (0 < g || 0 < c) {
         for (g = n; g < c; g++) d.push(String.fromCharCode(b));
         if (2 <= a.o.length) for (c = 1; c < a.o.length; c++) p += a.o[c];
         c = n - p;
         if (0 < c) {
            g = a.o;
            p = n = 0;
            for (var q, r = Q.ce, w = k.length, v = 0; v < w; v++)
               if (
                  (d.push(String.fromCharCode(b + Number(k.charAt(v)))),
                  1 < w - v)
               )
                  if (((q = g[p]), v < c)) {
                     var I = c - v;
                     (1 === q || (0 < q && 1 === I % q)) && d.push(r);
                  } else
                     p < g.length &&
                        (v === c
                           ? (p += 1)
                           : q === v - c - n + 1 &&
                             (d.push(r), (n += q), (p += 1)));
         } else {
            c = k;
            k = a.o;
            g = Q.ce;
            q = c.length;
            r = [];
            for (n = k.length - 1; 0 <= n && 0 < q; n--) {
               p = k[n];
               for (w = 0; w < p && 0 <= q - w - 1; w++)
                  r.push(String.fromCharCode(b + Number(c.charAt(q - w - 1))));
               q -= p;
               0 < q && r.push(g);
            }
            d.push.apply(d, r.reverse());
         }
      } else h || d.push(String.fromCharCode(b));
      (a.kc || h) && d.push(l);
      h = String(f);
      f = h.split("e+");
      if (2 == f.length) {
         if ((h = parseFloat(f[0]))) {
            l = h;
            if (isFinite(l)) {
               for (c = 0; 1 <= (l /= 10); ) c++;
               l = c;
            } else l = 0 < l ? l : 0;
            l = -l - 1;
            h =
               -1 > l
                  ? h && isFinite(h)
                     ? S(Math.round(S(h, -1)), 1)
                     : h
                  : h && isFinite(h)
                  ? S(Math.round(S(h, l)), -l)
                  : h;
         }
         h = String(h);
         h = h.replace(".", "");
         h += ih("0", parseInt(f[1], 10) - h.length + 1);
      }
      a.j + 1 > h.length && (h = "1" + ih("0", a.j - h.length) + h);
      for (a = h.length; "0" == h.charAt(a - 1) && a > e + 1; ) a--;
      for (g = 1; g < a; g++)
         d.push(String.fromCharCode(b + Number(h.charAt(g))));
   }
   function ph(a, b, c) {
      c.push(Q.qf);
      0 > b ? ((b = -b), c.push(Q.rf)) : a.vd && c.push(Q.zh);
      b = "" + b;
      for (var d = Q.fe, e = b.length; e < a.wa; e++) c.push(d);
      c.push(b);
   }
   function mh(a) {
      a = a.charCodeAt(0);
      if (48 <= a && 58 > a) return a - 48;
      var b = Q.fe.charCodeAt(0);
      return b <= a && a < b + 10 ? a - b : -1;
   }
   function lh(a, b, c) {
      for (var d = "", e = !1, f = b.length; c[0] < f; c[0]++) {
         var g = b.charAt(c[0]);
         if ("'" == g)
            c[0] + 1 < f && "'" == b.charAt(c[0] + 1)
               ? (c[0]++, (d += "'"))
               : (e = !e);
         else if (e) d += g;
         else
            switch (g) {
               case "#":
               case "0":
               case ",":
               case ".":
               case ";":
                  return d;
               case "\u00a4":
                  c[0] + 1 < f && "\u00a4" == b.charAt(c[0] + 1)
                     ? (c[0]++, (d += Q.pf))
                     : ((g = Q.pf), (d += g in Dg ? Dg[g][1] : g));
                  break;
               case "%":
                  if (!a.da && 1 != a.g)
                     throw Error("Too many percent/permill");
                  if (a.da && 100 != a.g)
                     throw Error(
                        "Inconsistent use of percent/permill characters"
                     );
                  a.g = 100;
                  a.da = !1;
                  d += Q.tf;
                  break;
               case "\u2030":
                  if (!a.da && 1 != a.g)
                     throw Error("Too many percent/permill");
                  if (a.da && 1e3 != a.g)
                     throw Error(
                        "Inconsistent use of percent/permill characters"
                     );
                  a.g = 1e3;
                  a.da = !1;
                  d += Q.uf;
                  break;
               default:
                  d += g;
            }
      }
      return d;
   }
   var nh = { sj: 0, ih: "", jh: "", prefix: "", ph: "" };
   function S(a, b) {
      if (!a || !isFinite(a) || 0 == b) return a;
      a = String(a).split("e");
      return parseFloat(a[0] + "e" + (parseInt(a[1] || 0, 10) + b));
   }
   function qh(a) {
      return 1 == a % 10 && 11 != a % 100
         ? "one"
         : 2 == a % 10 && 12 != a % 100
         ? "two"
         : 3 == a % 10 && 13 != a % 100
         ? "few"
         : "other";
   }
   var rh = qh;
   rh = qh;
   function sh(a, b) {
      var c = a | 0;
      if (void 0 === b) {
         b = Math;
         var d = b.min;
         a += "";
         var e = a.indexOf(".");
         b = d.call(b, -1 == e ? 0 : a.length - e - 1, 3);
      }
      return 1 == c && 0 == b ? "one" : "other";
   }
   var th = sh;
   th = sh;
   function uh(a) {
      this.cb = a;
      this.h = this.g = this.m = null;
      a = Q;
      var b = Cg;
      if (vh !== a || wh !== b) (vh = a), (wh = b), (xh = new kh());
      this.o = xh;
   }
   var vh = null,
      wh = null,
      xh = null,
      yh = RegExp("'([{}#].*?)'", "g"),
      zh = RegExp("''", "g");
   uh.prototype.format = function (a) {
      if (this.cb) {
         this.m = [];
         var b = Ah(this, this.cb);
         this.h = Bh(this, b);
         this.cb = null;
      }
      if (this.h && 0 != this.h.length) {
         b = this.m;
         var c = b.length;
         if (0 < c) {
            for (var d = Array(c), e = 0; e < c; e++) d[e] = b[e];
            b = d;
         } else b = [];
         this.g = b;
         b = [];
         Ch(this, this.h, a, !1, b);
         for (a = b.join(""); 0 < this.g.length; )
            a = a.replace(this.j(this.g), this.g.pop());
      } else a = "";
      return a;
   };
   function Ch(a, b, c, d, e) {
      for (var f = 0; f < b.length; f++)
         switch (b[f].type) {
            case 4:
               e.push(b[f].value);
               break;
            case 3:
               var g = b[f].value,
                  h = a,
                  k = e,
                  l = c[g];
               void 0 === l
                  ? k.push("Undefined parameter - " + g)
                  : (h.g.push(l), k.push(h.j(h.g)));
               break;
            case 2:
               g = b[f].value;
               h = a;
               k = c;
               l = d;
               var n = e,
                  p = g.pd;
               void 0 === k[p]
                  ? n.push("Undefined parameter - " + p)
                  : ((p = g[k[p]]),
                    void 0 === p && (p = g.other),
                    Ch(h, p, k, l, n));
               break;
            case 0:
               g = b[f].value;
               Dh(a, g, c, th, d, e);
               break;
            case 1:
               (g = b[f].value), Dh(a, g, c, rh, d, e);
         }
   }
   function Dh(a, b, c, d, e, f) {
      var g = b.pd,
         h = b.wg,
         k = +c[g];
      isNaN(k)
         ? f.push("Undefined or invalid parameter - " + g)
         : ((h = k - h),
           (g = b[c[g]]),
           void 0 === g &&
              ((d = d(Math.abs(h))), (g = b[d]), void 0 === g && (g = b.other)),
           (b = []),
           Ch(a, g, c, e, b),
           (c = b.join("")),
           e ? f.push(c) : ((a = a.o.format(h)), f.push(c.replace(/#/g, a))));
   }
   function Ah(a, b) {
      var c = a.m,
         d = va(a.j, a);
      b = b.replace(zh, function () {
         c.push("'");
         return d(c);
      });
      return (b = b.replace(yh, function (e, f) {
         c.push(f);
         return d(c);
      }));
   }
   function Eh(a) {
      var b = 0,
         c = [],
         d = [],
         e = /[{}]/g;
      e.lastIndex = 0;
      for (var f; (f = e.exec(a)); ) {
         var g = f.index;
         "}" == f[0]
            ? (c.pop(),
              0 == c.length &&
                 ((f = { type: 1 }),
                 (f.value = a.substring(b, g)),
                 d.push(f),
                 (b = g + 1)))
            : (0 == c.length &&
                 ((b = a.substring(b, g)),
                 "" != b && d.push({ type: 0, value: b }),
                 (b = g + 1)),
              c.push("{"));
      }
      b = a.substring(b);
      "" != b && d.push({ type: 0, value: b });
      return d;
   }
   var Fh = /^\s*(\w+)\s*,\s*plural\s*,(?:\s*offset:(\d+))?/,
      Gh = /^\s*(\w+)\s*,\s*selectordinal\s*,/,
      Hh = /^\s*(\w+)\s*,\s*select\s*,/;
   function Bh(a, b) {
      var c = [];
      b = Eh(b);
      for (var d = 0; d < b.length; d++) {
         var e = {};
         if (0 == b[d].type) (e.type = 4), (e.value = b[d].value);
         else if (1 == b[d].type) {
            var f = b[d].value;
            switch (
               Fh.test(f)
                  ? 0
                  : Gh.test(f)
                  ? 1
                  : Hh.test(f)
                  ? 2
                  : /^\s*\w+\s*/.test(f)
                  ? 3
                  : 5
            ) {
               case 2:
                  e.type = 2;
                  e.value = Ih(a, b[d].value);
                  break;
               case 0:
                  e.type = 0;
                  e.value = Jh(a, b[d].value);
                  break;
               case 1:
                  e.type = 1;
                  e.value = Kh(a, b[d].value);
                  break;
               case 3:
                  (e.type = 3), (e.value = b[d].value);
            }
         }
         c.push(e);
      }
      return c;
   }
   function Ih(a, b) {
      var c = "";
      b = b.replace(Hh, function (h, k) {
         c = k;
         return "";
      });
      var d = {};
      d.pd = c;
      b = Eh(b);
      for (var e = 0; e < b.length; ) {
         var f = b[e].value;
         e++;
         var g;
         1 == b[e].type && (g = Bh(a, b[e].value));
         d[f.replace(/\s/g, "")] = g;
         e++;
      }
      return d;
   }
   function Jh(a, b) {
      var c = "",
         d = 0;
      b = b.replace(Fh, function (k, l, n) {
         c = l;
         n && (d = parseInt(n, 10));
         return "";
      });
      var e = {};
      e.pd = c;
      e.wg = d;
      b = Eh(b);
      for (var f = 0; f < b.length; ) {
         var g = b[f].value;
         f++;
         var h;
         1 == b[f].type && (h = Bh(a, b[f].value));
         e[g.replace(/\s*(?:=)?(\w+)\s*/, "$1")] = h;
         f++;
      }
      return e;
   }
   function Kh(a, b) {
      var c = "";
      b = b.replace(Gh, function (h, k) {
         c = k;
         return "";
      });
      var d = {};
      d.pd = c;
      d.wg = 0;
      b = Eh(b);
      for (var e = 0; e < b.length; ) {
         var f = b[e].value;
         e++;
         if (1 == b[e].type) var g = Bh(a, b[e].value);
         d[f.replace(/\s*(?:=)?(\w+)\s*/, "$1")] = g;
         e++;
      }
      return d;
   }
   uh.prototype.j = function (a) {
      return "\ufddf_" + (a.length - 1).toString(10) + "_";
   };
   function T(a) {
      var b = a.split("x");
      a = { width: 0, height: 0 };
      if (2 == b.length) {
         var c = parseInt(b[0], 10);
         isNaN(c) || (a.width = c);
         b = parseInt(b[1], 10);
         isNaN(b) || (a.height = b);
      }
      return a;
   }
   function U(a) {
      return a.width + "x" + a.height;
   }
   function V(a, b) {
      return (a = (window.gwdPreview || {}).strings["MSG_" + a] || "") && b
         ? new uh(a).format(b)
         : a;
   }
   function Lh(a) {
      (a = a.contentWindow) && a.location.reload();
   }
   var Mh = O.be,
      Nh = O.bi;
   function Oh(a) {
      this.g = a;
      var b = (window.gwdPreview && window.gwdPreview.config) || null;
      if (b) {
         a = b.previewPath;
         var c = b.modes,
            d = b.sizes,
            e = b.feedNames,
            f = b.defaults;
         b = "number" === typeof b.uuid ? b.uuid : null;
         if (null !== b)
            a: {
               var g = window.sessionStorage.getItem("gwdPreviewSettings");
               if (g) {
                  try {
                     var h = JSON.parse(g);
                  } catch (l) {}
                  if (h && h.uuid === b && "object" === typeof h.settings) {
                     h = h.settings;
                     break a;
                  }
               }
               h = null;
            }
         else h = null;
         if (h) f = h;
         else {
            window.sessionStorage.removeItem("gwdPreviewSettings");
            f = f || {};
            f.modeSettings = f.modeSettings || {};
            for (var k in f.modeSettings)
               (h = f.modeSettings[k]),
                  h[Nh.DEVICE] &&
                     (g = Mh.get(h[Nh.DEVICE])) &&
                     (h[Nh.DEVICE_SIZE] = U({
                        width: g.width,
                        height: g.height,
                     }));
         }
         this.g.previewPath = a || "";
         this.g.modes = c || [];
         this.g.sizes = d || [];
         this.g.feeds = e || [];
         this.g.mode = f.mode || "";
         this.g.modeSettings = f.modeSettings || {};
         null !== b &&
            this.g.addEventListener("setting-change", this.h.bind(this, b));
      } else
         window.console &&
            console.error(
               "Cannot initialize preview because no configuration was found."
            );
   }
   Oh.prototype.h = function (a) {
      a = JSON.stringify({
         uuid: a,
         settings: { mode: this.g.mode, modeSettings: this.g.modeSettings },
      });
      window.sessionStorage.setItem("gwdPreviewSettings", a);
   };
   var Ph = x([
      '\n      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1387.01 180.33">\n        <defs>\n          <style>.cls-1{fill:#ccc;}.cls-2{fill:#4480f6;}.cls-3{fill:#f3b500;}.cls-4{fill:#db4534;}.cls-5{fill:#fff;}.cls-6{fill:#3569be;}.cls-7{fill:#b0362f;}.cls-8,.cls-9{fill:#b7b7b7;}.cls-9{opacity:0.5;isolation:isolate;}.cls-10{fill:#5f6368;}</style>\n        </defs>\n        <path class="cls-1" d="M221.43,340.21V340h0a24.28,24.28,0,0,1-17,22.86,21.71,21.71,0,0,1-6.91,1.11h0v21.35c23.81-.16,43.18-20.8,43.58-45.08Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-2" d="M156.82,344.26a36.7,36.7,0,0,1,.4-5.16A34.31,34.31,0,0,1,191,310.21h.56V263.61a81.37,81.37,0,0,0-81.12,81.12h46.43Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-3" d="M156.82,344.73H96.9c0,54.77,45.32,99.22,100.72,99.22V385.37C175.48,385.37,157.14,366.8,156.82,344.73Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-4" d="M191.59,277.5v32.78a34.75,34.75,0,0,1,4,.32A29.64,29.64,0,0,1,221.43,340v.4h31.75C253.18,305.84,225.88,277.82,191.59,277.5Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-5" d="M197.54,364h0a22.46,22.46,0,0,0,6.91-1.11,24.19,24.19,0,0,1-6.91,1.11Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-6" d="M110.39,344.73h46.43l-46-8.65A79,79,0,0,0,110.39,344.73Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-7" d="M200.32,278.22a63.84,63.84,0,0,0-8.81-.71v32.7Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-8" d="M197.54,363.94v0Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-9" d="M197.54,363.94v21.35l10.4-23.81a18.68,18.68,0,0,1-3.49,1.35A19.7,19.7,0,0,1,197.54,363.94Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-8" d="M241.2,340.29H221.51l18.81,8.25A57.07,57.07,0,0,0,241.2,340.29Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M838.36,395.52H826.77L807.8,337h-.4l-19,58.52H776.84l-24.57-88.68h12L783,376.55h.4l19.17-57.72h10.59l19.17,57.72h.4l17.78-69.71h12Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M859.93,365.16c0-17.18,12-32.36,29.76-32.36,18.18,0,29.76,12.78,29.76,32.36a20.8,20.8,0,0,1-.2,2.2H871.31c.6,12.78,10,19.77,19.37,19.77,6.59,0,13.38-2.8,16.58-10.39l10.19,4.19c-3.6,8.59-12.58,16.58-26.57,16.58C872.31,397.52,859.93,383.54,859.93,365.16Zm29.56-22c-8.39,0-15.18,5.79-17.38,14.58h35.15C906.87,352.58,902.47,343.19,889.49,343.19Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M940,387.13h-.4v8.39h-11V306.84H940v28l-.4,8.39h.4c3.4-5.59,11-10.39,20.77-10.39,15.38,0,28.76,13.78,28.76,32.36S976,397.52,960.8,397.52C951,397.52,943.42,392.73,940,387.13Zm38-22c0-13.58-9.19-22-19.37-22s-19.37,8-19.37,22c0,13.78,9.19,22,19.37,22C969,387.13,978,378.75,978,365.16Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M1019.12,306.84h27.16c27.56,0,44.94,18.38,44.94,44.34s-17.38,44.34-44.94,44.34h-27.16Zm27.16,77.7c20.37,0,33.36-12.18,33.36-33.36s-13-33.36-33.36-33.36H1030.5v66.91h15.78Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M1097.42,365.16c0-17.18,12-32.36,29.76-32.36,18.18,0,29.76,12.78,29.76,32.36a20.8,20.8,0,0,1-.2,2.2H1108.8c.6,12.78,10,19.77,19.37,19.77,6.59,0,13.38-2.8,16.58-10.39l10.19,4.19c-3.6,8.59-12.58,16.58-26.57,16.58C1109.8,397.52,1097.42,383.54,1097.42,365.16Zm29.36-22c-8.39,0-15.18,5.79-17.38,14.58h35.15C1144.35,352.58,1140,343.19,1126.78,343.19Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M1162.13,380.14l10.19-4.19c3.2,7.59,9.19,11.39,16.38,11.39,7,0,12.18-3.4,12.18-8.59,0-3-1.8-6.39-8.39-8l-12.18-3c-5.59-1.4-16.18-6.19-16.18-16.78,0-11,11.39-18.18,24-18.18,10.59,0,19.77,4.79,23.37,14.18l-10,4c-2.4-5.79-8-8-13.78-8-6.39,0-12,2.8-12,7.79,0,3.8,3.2,6,8,7l12,2.8c12,2.8,16.78,10.19,16.78,17.78,0,10.79-9.59,19-24,19C1173.92,397.52,1165.53,388.93,1162.13,380.14Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M1219.06,314a8,8,0,1,1,8,8A8,8,0,0,1,1219.06,314Zm2.4,81.49V334.8h11.39v60.72Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M1244.82,406.51l10.39-4.39a17.86,17.86,0,0,0,17,11.58c12.58,0,20.17-8.19,20.17-21v-5.79h-.4c-3.8,5.59-11,10.39-20.77,10.39-15.38,0-28.76-13.78-28.76-32.36s13.38-32.36,28.76-32.36A25,25,0,0,1,1292,343h.4V334.6h11v57.52c0,22-15.18,31.76-31.16,31.76S1248,413.9,1244.82,406.51Zm47.54-41.35c0-13.78-9.19-22-19.37-22s-19.37,8.39-19.37,22,9.19,22,19.37,22S1292.36,379.15,1292.36,365.16Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M1326.12,343.19h.4c3.2-5.59,11-10.39,19.17-10.39,15.38,0,23.17,10.59,23.17,25.57v37.15h-11.39V360.17c0-12.58-6.39-16.78-15-16.78-10,0-16,9.39-16,18.78v33.56h-11.39V335h11v8.19Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M1377.65,365.16c0-17.18,12-32.36,29.76-32.36,18.18,0,29.76,12.78,29.76,32.36a20.81,20.81,0,0,1-.2,2.2H1389c.6,12.78,10,19.77,19.37,19.77,6.59,0,13.38-2.8,16.58-10.39l10.19,4.19c-3.6,8.59-12.58,16.58-26.57,16.58C1390,397.52,1377.65,383.54,1377.65,365.16Zm29.56-22c-8.39,0-15.18,5.79-17.38,14.58H1425C1424.59,352.58,1420.19,343.19,1407.21,343.19Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M1446.36,395.52V334.8h11v10h.4c2.4-7,11.19-11.39,17.58-11.39a20.85,20.85,0,0,1,8.59,1.4l-4.39,10.59a17.41,17.41,0,0,0-6-.8c-7.79,0-15.78,6.59-15.78,17.78v33.16Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M311.37,346.79c0-28,23.57-50.73,51.53-50.73a48,48,0,0,1,34.75,14l-9.79,9.79a35.36,35.36,0,0,0-25-10c-20.37,0-36.35,16.38-36.35,37,0,20.37,16,37,36.35,37,13.18,0,20.77-5.39,25.57-10.19,4-4,6.59-9.59,7.59-17.38H362.9V342.39h46.74a52.43,52.43,0,0,1,.8,8.59c0,10.39-2.8,23.37-12,32.36-9,9.19-20.37,14.18-35.35,14.18C334.94,397.52,311.37,374.75,311.37,346.79Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M448,332.21c-18.18,0-32.76,13.78-32.76,32.76A32.4,32.4,0,0,0,448,397.72c18,0,32.76-13.78,32.76-32.76C480.94,345.79,466.16,332.21,448,332.21Zm0,52.33c-10,0-18.38-8.19-18.38-19.77C429.61,353,438.2,345,448,345c10,0,18.38,8,18.38,19.77C466.56,376.55,458,384.54,448,384.54Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M519.69,332.21c-18.18,0-32.76,13.78-32.76,32.76a32.4,32.4,0,0,0,32.76,32.76c18,0,32.76-13.78,32.76-32.76C552.45,345.79,537.67,332.21,519.69,332.21Zm0,52.33c-10,0-18.38-8.19-18.38-19.77,0-11.78,8.59-19.77,18.38-19.77,10,0,18.38,8,18.38,19.77S529.48,384.54,519.69,384.54Z" transform="translate(-96.9 -263.61)"/>\n        <path class="cls-10" d="M607.58,334.2v5.39h-.4c-3.2-3.8-9.39-7.39-17.18-7.39-16.38,0-31.36,14.38-31.36,32.76s15,32.56,31.36,32.56c7.79,0,14-3.4,17.18-7.39h.4v4.79c0,12.58-6.59,19.17-17.38,19.17-8.79,0-14.18-6.39-16.38-11.58l-12.58,5.19c3.6,8.59,13.18,19.37,29,19.37,16.78,0,31.16-10,31.16-34V334.4H607.58ZM591,384.54c-10,0-18.18-8.39-18.18-19.77,0-11.58,8.39-20,18.18-20s17.38,8.39,17.38,20C608.58,376.35,600.79,384.54,591,384.54Z" transform="translate(-96.9 -263.61)"/>\n        <rect class="cls-10" x="534.05" y="35.84" width="14.38" height="96.07"/>\n        <path class="cls-10" d="M684.68,384.54c-7.39,0-12.58-3.4-15.78-10l43.74-18.18-1.4-3.8c-2.8-7.39-11-20.77-28-20.77-16.78,0-30.76,13.18-30.76,32.76,0,18.38,13.78,32.76,32.36,32.76A32.25,32.25,0,0,0,712,382.74l-11.19-7.39C697.06,381.14,692.07,384.54,684.68,384.54Zm-1-39.75c5.79,0,10.59,2.8,12.18,7L666.7,364C666.1,351.18,676.29,344.79,683.68,344.79Z" transform="translate(-96.9 -263.61)"/>\n      </svg>',
   ]);
   function Qh() {
      return H.apply(this, arguments) || this;
   }
   A(Qh, H);
   t.Object.defineProperties(Qh, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview-gwd-logo";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return G(Ph);
         },
      },
   });
   customElements.define(Qh.is, Qh);
   var Rh, Sh;
   if (void 0 === Rh) {
      var Th = document.createElement("template");
      Th.innerHTML =
         '<style>\n  :host {\n    --tf-creative-preview-accent-color: var(--google-blue-500);\n    --tf-creative-preview-border-color: var(--light-theme-divider-color);\n    --tf-creative-preview-icon-color: var(--paper-grey-600);\n    --tf-creative-preview-item-highlight-color: #f0f0f0;\n\n    /* Accommodates the longest possible dropdown value in any language to avoid line-wrapping\n     * (b/120451459). */\n    --tf-creative-preview-control-width: 225px;\n    --tf-creative-preview-item-height: 32px;\n    --tf-creative-preview-padding: 8px;\n\n    /* Common padding used in the mode views to align the view\'s iframe(s) with the control bar\n     * contents and logo in the header. */\n    --tf-creative-preview-stage-padding: 24px;\n\n    font-family: Roboto, Helvetica, sans-serif;\n    font-size: 13px;\n    overflow-y: auto;\n    overflow-x: hidden;\n    @apply --layout-vertical;\n\n    /* Required for paper-dropdown-menus to correctly display on top of iframe contents in IE\n     * (b/115536159, b/115566574, b/113070296). The z-index can be any value >= 0. */\n    position: relative;\n    z-index: 0;\n  }\n\n  /* Container for the GWD logo and the control bar. */\n  #header {\n    z-index: 1;\n    /* The header has a soft shadow which is approximately --shadow-elevation-2dp at 75% opacity. */\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.105),\n        0 1px 5px 0 rgba(0, 0, 0, 0.09),\n        0 3px 1px -2px rgba(0, 0, 0, 0.15);\n  }\n\n  /* Container for the GWD logo. */\n  #masthead {\n    padding: 12px 24px;\n  }\n\n  /* The GWD logo element. */\n  #logo {\n    width: 270px;\n    /* Both a width and a height must be set for the SVG to scale correctly in IE. */\n    height: 35px;\n    display: block;\n  }\n\n  /* When there are no enabled controls, the control bar will be empty, indicated by the absence of\n   * the `has-controls` attribute. Only add the top border when the control bar is not empty. */\n  #controls[has-controls] {\n    border-top: 1px solid var(--tf-creative-preview-border-color);\n  }\n\n  /* Container for the preview views below the control bar. */\n  #stage {\n    background: var(--paper-grey-100);\n    position: relative;\n    overflow-y: auto;\n    z-index: 0;\n    @apply --layout-flex-auto;\n  }\n\n  /* Hide all mode views initially. */\n  .view {\n    display: none;\n  }\n\n  /* Show only the currently-active mode view. */\n  .view[active] {\n    display: flex;\n justify-content: center;\n  }\n\n  /* Because of its rulers, the single view must be forced to fill the full height and width of the\n   * stage area. */\n  tf-creative-preview-single {\n    position: absolute;\n    min-width: 100%;\n    min-height: 100%;\n  }\n\n  /* The Desktop mode view must fill the full height and width of the stage area so its iframe does\n   * the same (b/113590886). */\n  tf-creative-preview-desktop {\n    position: absolute;\n    height: 100%;\n    width: 100%;\n  }\n</style>\n\n<div id="header">\n \n    \n  </div>\n\n  \n</div>\n\n<div id="stage">\n  \n  <dom-if if="[[modeEnabled_(\'single\', modes)]]">\n    <template>\n      <tf-creative-preview-single id="single-view" class="view" active="[[modeIs_(\'single\', mode)]]" preview-path="[[previewPath]]" size="{{modeSettings.single.size}}" feed="[[modeSettings.single.feed]]" responsive="[[modeSettings.single.isCustomSize]]">\n      </tf-creative-preview-single>\n    </template>\n  </dom-if>\n\n  \n  <dom-if if="[[modeEnabled_(\'allsizes\', modes)]]">\n    <template>\n      <tf-creative-preview-multiple-sizes id="allsizes-view" class="view" active="[[modeIs_(\'allsizes\', mode)]]" preview-path="[[previewPath]]" sizes="[[modeSettings.allsizes.sizes]]" feed="[[modeSettings.allsizes.feed]]">\n      </tf-creative-preview-multiple-sizes>\n    </template>\n  </dom-if>\n\n  \n  <dom-if if="[[modeEnabled_(\'allfeeds\', modes)]]">\n    <template>\n      <tf-creative-preview-multiple-feeds id="allfeeds-view" class="view" active="[[modeIs_(\'allfeeds\', mode)]]" preview-path="[[previewPath]]" size="[[modeSettings.allfeeds.size]]" feeds="[[matchOrder_(\n          feeds, modeSettings.allfeeds.feeds, modeSettings.allfeeds.feeds.*)]]">\n      </tf-creative-preview-multiple-feeds>\n    </template>\n  </dom-if>\n\n  \n  <dom-if if="[[modeEnabled_(\'mobile\', modes)]]">\n    <template>\n      <tf-creative-preview-mobile id="mobile-view" class="view" active="[[modeIs_(\'mobile\', mode)]]" preview-path="[[previewPath]]" device-size="{{modeSettings.mobile.deviceSize}}" feed="[[modeSettings.mobile.feed]]" responsive="[[modeSettings.mobile.isCustomSize]]">\n      </tf-creative-preview-mobile>\n    </template>\n  </dom-if>\n\n  \n  <dom-if if="[[modeEnabled_(\'desktop\', modes)]]">\n    <template>\n      <tf-creative-preview-desktop id="desktop-view" class="view" active="[[modeIs_(\'desktop\', mode)]]" preview-path="[[previewPath]]" feed="[[modeSettings.desktop.feed]]">\n      </tf-creative-preview-desktop>\n    </template>\n  </dom-if>\n\n  \n  <dom-if if="[[modeEnabled_(\'parallax\', modes)]]">\n    <template>\n      <tf-creative-preview-parallax id="parallax-view" class="view" active="[[modeIs_(\'parallax\', mode)]]" preview-path="[[previewPath]]" device-size="{{modeSettings.parallax.deviceSize}}" size="[[modeSettings.parallax.size]]" feed="[[modeSettings.parallax.feed]]" responsive="[[modeSettings.parallax.isCustomSize]]">\n      </tf-creative-preview-parallax>\n    </template>\n  </dom-if>\n</div>\n';
      Rh = Th;
   }
   Sh = Rh;
   var Uh, Vh;
   if (void 0 === Uh) {
      var Wh = document.createElement("template");
      Wh.innerHTML =
         '<style>\n  :host {\n    /* Apply general customizations to paper-input-container, which is used internally in all\n     * input components. */\n\n    /* By default, the label changes color on focus. Turn off the color change. */\n    --paper-input-container-label-focus: {\n      color: var(--secondary-text-color);\n    };\n\n    /* By default, the label is shown at a smaller size than the base font. Turn off the\n     * shrinking effect so the label font size is the same as the rest of the text. */\n    --paper-input-container-label-floating: {\n      -webkit-transform: translateY(-90%);\n      transform: translateY(-90%);\n      width: inherit;\n    };\n\n    --paper-input-container-label: {\n      font-size: inherit;\n      max-width: 100%;\n    };\n\n    display: block;\n  }\n\n  .flex-container {\n    @apply --layout-horizontal;\n    @apply --layout-center;\n  }\n\n  /* Only add the outermost padding when there are controls to show, so that when the control\n   * bar is empty, it appears completely collapsed. */\n  :host([has-controls]) .flex-container {\n    padding: var(--tf-creative-preview-padding);\n  }\n\n  /* A container with a vertical divider for displaying a single control. */\n  .control {\n    padding: 0 var(--tf-creative-preview-padding);\n    border-right: 1px solid var(--tf-creative-preview-border-color);\n    box-sizing: content-box;\n  }\n\n  /* A wrapper for an input component which ensures a minimum width so the dropdown widths can\n   * be matched with widths of their flyouts. */\n  .input-container {\n    width: var(--tf-creative-preview-control-width);\n    flex-shrink: 0;\n  }\n\n  /* Remove the top and bottom padding from all internal paper-input-containers common to all\n   * input components. This padding can also be removed via a paper-input-container mixin, but\n   * when removed this way, the positioning of the flyout is also affected. */\n  tf-creative-preview-selector,\n  tf-creative-preview-multi-selector,\n  tf-creative-preview-size-input {\n    margin: calc(var(--tf-creative-preview-padding) * -1) 0;\n  }\n\n  tf-creative-preview-selector,\n  tf-creative-preview-multi-selector {\n    padding-left: var(--tf-creative-preview-padding);\n  }\n\n  tf-creative-preview-size-input {\n    padding: 0 var(--tf-creative-preview-padding);\n  }\n\n  /* Modifier class for .control containers which have an input and a suffix button. */\n  .has-suffix {\n    @apply --layout-horizontal;\n    /* Bottom-align the suffix and the input so the suffix appears in line with the dropdown\n     * and not the full height of the selector, which includes the label. */\n    @apply --layout-end;\n\n    /* Prevent the suffix button container from collapsing in IE (b/113591503). */\n    flex-shrink: 0;\n  }\n\n  /* Container for a suffix element which should appear inline with an input. */\n  .has-suffix .suffix-container {\n    border-left: 1px solid var(--tf-creative-preview-border-color);\n    height: 24px;\n    margin-left: var(--tf-creative-preview-padding);\n    padding-left: var(--tf-creative-preview-padding);\n    @apply --layout-horizontal;\n    @apply --layout-center;\n  }\n\n  .has-suffix .suffix-container paper-icon-button {\n    width: 36px;\n    height: 36px;\n    margin: -8px;  /* Cancel out the icon\'s padding. */\n  }\n\n  /* Device rotation buttons and the Reload button. */\n  paper-icon-button {\n    flex-shrink: 0;\n    --paper-icon-button: {\n      color: var(--tf-creative-preview-icon-color);\n    };\n  }\n\n  /* The Reload button. */\n  #reloadButton {\n    margin-left: auto;\n  }\n\n  /* Hide controls by default until they are enabled with the `control-enabled` class. A class\n   * is used instead of the native `hidden` attribute so that visibility can default to false\n   * before any properties which determine visibility are evaluated. Controls are hidden with\n   * :not() rather than the inverse because different controls have different display styles\n   * (block, flex). */\n  .control:not(.control-enabled),\n  #reloadButton:not(.control-enabled) {\n    display: none;\n  }\n</style>\n\n<div class="flex-container">\n  \n  <div class$="control input-container [[getControlEnabledClass_(enabledControls_.mode)]]">\n    <tf-creative-preview-selector id="mode-control" label="[[getMsg_(\'PREVIEW_MODE\')]]" value="{{mode}}" items="[[getModesItemsList_(modes)]]">\n    </tf-creative-preview-selector>\n  </div>\n\n  \n  <dom-if if="[[modeIs_(\'single\', mode)]]">\n    <template>\n      <div class$="control input-container [[getControlEnabledClass_(enabledControls_.size)]]">\n        <tf-creative-preview-selector id="single-size-control" show-custom-option="" label="[[getMsg_(\'SHOW_SIZE\')]]" items="[[getSizesItemsList_(sortedSizes_)]]" value="[[getSizeSelectorValue_(\n            modeSettings.single.size, modeSettings.single.isCustomSize)]]" on-value-changed="onSizeSelectorChange_">\n        </tf-creative-preview-selector>\n      </div>\n      <div class$="control input-container\n          [[getControlEnabledClass_(modeSettings.single.isCustomSize)]]">\n        <tf-creative-preview-size-input id="single-custom-size-control" label="[[getMsg_(\'CUSTOM_SIZE\')]]" value="{{modeSettings.single.size}}" min="[[minSize_]]" max="[[maxSize_]]">\n        </tf-creative-preview-size-input>\n      </div>\n      <div class$="control input-container [[getControlEnabledClass_(enabledControls_.feed)]]">\n        <tf-creative-preview-selector id="single-feed-control" label="[[getMsg_(\'SAMPLE_FEED\')]]" value="{{modeSettings.single.feed}}" items="[[getFeedsItemsList_(feeds)]]">\n        </tf-creative-preview-selector>\n      </div>\n    </template>\n  </dom-if>\n\n  \n  <dom-if if="[[modeIs_(\'allsizes\', mode)]]">\n    <template>\n      <div class="control input-container control-enabled">\n        <tf-creative-preview-multi-selector id="allsizes-sizes-control" label="[[getMsg_(\'SHOW_SIZES\')]]" values="{{modeSettings.allsizes.sizes}}" items="[[getSizesItemsList_(sortedSizes_)]]">\n        </tf-creative-preview-multi-selector>\n      </div>\n      <div class$="control input-container [[getControlEnabledClass_(enabledControls_.feed)]]">\n        <tf-creative-preview-selector id="allsizes-feed-control" label="[[getMsg_(\'SAMPLE_FEED\')]]" value="{{modeSettings.allsizes.feed}}" items="[[getFeedsItemsList_(feeds)]]">\n        </tf-creative-preview-selector>\n      </div>\n    </template>\n  </dom-if>\n\n  \n  <dom-if if="[[modeIs_(\'allfeeds\', mode)]]">\n    <template>\n      <div class$="control input-container [[getControlEnabledClass_(enabledControls_.size)]]">\n        <tf-creative-preview-selector id="allfeeds-size-control" label="[[getMsg_(\'SHOW_SIZE\')]]" value="{{modeSettings.allfeeds.size}}" items="[[getSizesItemsList_(sortedSizes_)]]">\n        </tf-creative-preview-selector>\n      </div>\n      <div class="control input-container control-enabled">\n        <tf-creative-preview-multi-selector id="allfeeds-feeds-control" label="[[getMsg_(\'SAMPLE_FEEDS\')]]" values="{{modeSettings.allfeeds.feeds}}" items="[[getFeedsItemsList_(feeds)]]">\n        </tf-creative-preview-multi-selector>\n      </div>\n    </template>\n  </dom-if>\n\n  \n  <dom-if if="[[modeIs_(\'mobile\', mode)]]">\n    <template>\n      <div class="control has-suffix control-enabled">\n        <div class="input-container">\n          <tf-creative-preview-selector id="mobile-device-control" show-custom-option="" label="[[getMsg_(\'DEVICE\')]]" items="[[getDevicesItemsList_()]]" value="[[getSizeSelectorValue_(\n              modeSettings.mobile.device, modeSettings.mobile.isCustomSize)]]" on-value-changed="onMobileDeviceSelectorChange_">\n          </tf-creative-preview-selector>\n        </div>\n        <div class="suffix-container">\n          <paper-icon-button id="mobile-rotate-device-control" icon="device:screen-rotation" title$="[[getMsg_(\'ROTATE_DEVICE\')]]" on-click="onMobileRotateButtonClick_">\n          </paper-icon-button>\n        </div>\n      </div>\n      <div class="control input-container control-enabled">\n        <tf-creative-preview-size-input id="mobile-custom-size-control" label="[[getMsg_(\'VIEWPORT_SIZE\')]]" value="{{modeSettings.mobile.deviceSize}}" min="[[minSize_]]" max="[[maxSize_]]" disabled="[[!modeSettings.mobile.isCustomSize]]">\n        </tf-creative-preview-size-input>\n      </div>\n      <div class$="control input-container [[getControlEnabledClass_(enabledControls_.feed)]]">\n        <tf-creative-preview-selector id="mobile-feed-control" label="[[getMsg_(\'SAMPLE_FEED\')]]" value="{{modeSettings.mobile.feed}}" items="[[getFeedsItemsList_(feeds)]]">\n        </tf-creative-preview-selector>\n      </div>\n    </template>\n  </dom-if>\n\n  \n  <dom-if if="[[modeIs_(\'desktop\', mode)]]">\n    <template>\n      <div class$="control input-container [[getControlEnabledClass_(enabledControls_.feed)]]">\n        <tf-creative-preview-selector id="desktop-feed-control" label="[[getMsg_(\'SAMPLE_FEED\')]]" value="{{modeSettings.desktop.feed}}" items="[[getFeedsItemsList_(feeds)]]">\n        </tf-creative-preview-selector>\n      </div>\n    </template>\n  </dom-if>\n\n  \n  <dom-if if="[[modeIs_(\'parallax\', mode)]]">\n    <template>\n      <div class="control has-suffix control-enabled">\n        <div class="input-container">\n          <tf-creative-preview-selector id="parallax-device-control" show-custom-option="" label="[[getMsg_(\'DEVICE\')]]" items="[[getDevicesItemsList_()]]" value="[[getSizeSelectorValue_(\n              modeSettings.parallax.device, modeSettings.parallax.isCustomSize)]]" on-value-changed="onParallaxDeviceSelectorChange_">\n          </tf-creative-preview-selector>\n        </div>\n        <div class="suffix-container">\n          <paper-icon-button id="parallax-rotate-device-control" icon="device:screen-rotation" on-click="onParallaxRotateButtonClick_">\n          </paper-icon-button>\n        </div>\n      </div>\n      <div class="control input-container control-enabled">\n        <tf-creative-preview-size-input id="parallax-custom-size-control" label="[[getMsg_(\'VIEWPORT_SIZE\')]]" value="{{modeSettings.parallax.deviceSize}}" min="[[minSize_]]" max="[[maxSize_]]" disabled="[[!modeSettings.parallax.isCustomSize]]">\n        </tf-creative-preview-size-input>\n      </div>\n      <div class$="control input-container [[getControlEnabledClass_(enabledControls_.feed)]]">\n        <tf-creative-preview-selector id="parallax-feed-control" label="[[getMsg_(\'SAMPLE_FEED\')]]" value="{{modeSettings.parallax.feed}}" items="[[getFeedsItemsList_(feeds)]]">\n        </tf-creative-preview-selector>\n      </div>\n    </template>\n  </dom-if>\n\n  <paper-icon-button id="reloadButton" class$="[[getControlEnabledClass_(hasControls)]]" icon="icons:refresh" title$="[[getMsg_(\'RELOAD_ALL\')]]" on-click="onReloadButtonClick_">\n  </paper-icon-button>\n</div>\n';
      Uh = Wh;
   }
   Vh = Uh;
   var Xh;
   function Yh() {
      if (void 0 !== Xh) return Xh;
      var a = document.createElement("template");
      a.innerHTML =
         "<style>:host {\n  display: block;\n}\n\npaper-dropdown-menu {\n  /* The font size is customized via a mixin targeting the internal\n   * paper-input-container. This mixin must be set at the paper-dropdown-menu\n   * level rather than cascade down to it because the initial base font subhead\n   * styles we'd like to override are included and redefined directly in\n   * paper-dropdown-menu's local styles. */\n  --paper-input-container-input: {\n    font-size: inherit;\n\n    /* Prevents the line-height of the internal input from being too large in\n     * IE. */\n    line-height: 1em;\n  };\n\n  /* Turn off the paper-input-container underline for dropdowns. */\n  --paper-input-container-underline: {\n    display: none;\n  };\n\n  --paper-input-container-underline-focus: {\n    display: none;\n  };\n\n  /* Don't show the ripple over the menu button. */\n  --paper-dropdown-menu-ripple: {\n    display: none;\n  };\n\n  /* width must be explicitly set 100% because paper-dropdown-menu does not\n   * automatically take its width from its selected value. */\n  width: 100%;\n\n  /* Although we hide the underline, its container will still take up 2px of\n   * height. There are no APIs to remove it, so cancel out its height with a\n   * negative margin. */\n  margin-bottom: -2px;\n}\n\n[slot=\"dropdown-content\"] {\n  display: block;\n  padding: var(--tf-creative-preview-padding) 0;\n  /* Ensure dropdowns are at least as wide as the .control containers' inner\n   * width. The iron-dropdown popup's width is calculated from the\n   * dropdown-content (e.g., this listbox) width at the time the dropdown is\n   * opened, and the width must be an absolute (not relative) value. */\n  min-width: var(--tf-creative-preview-control-width);\n}\n\npaper-item {\n  /* The background highlight for paper-items is implemented as a\n   * pseudo-element. Hide it; we implement our own hover effect that works for\n   * both focus and hover states (hover states are not handled by paper elements\n   * by default). See paper-item:hover below. */\n  --paper-item-focused-before: {\n    display: none;\n  };\n\n  /* By default, paper-items use the paper subhead font size. */\n  font-size: inherit;\n  min-height: var(--tf-creative-preview-item-height);\n  cursor: pointer;\n\n  /* A fix for min-height in IE.\n   * @see https://github.com/philipwalton/flexbugs/issues/231 */\n  height: 1px;\n}\n\n/* Highlight paper-items on focus (when navigating via keyboard) and on hover.*/\npaper-item:hover,\npaper-item:focus {\n  background: var(--tf-creative-preview-item-highlight-color);\n}\n\n/* A horizontal rule which separates groups of menu items. */\n.divider {\n  height: 1px;\n  background: var(--tf-creative-preview-border-color);\n  margin: var(--tf-creative-preview-padding) 0;\n}\n</style>";
      return (Xh = a);
   }
   Yh();
   var Zh, $h;
   if (void 0 === Zh) {
      var ai = document.createElement("template");
      ai.innerHTML =
         '<style>\n  paper-checkbox {\n    --paper-checkbox-size: 16px;\n    --paper-checkbox-unchecked-color: var(--tf-creative-preview-icon-color);\n    --paper-checkbox-checked-color: var(--tf-creative-preview-accent-color);\n    /* Don\'t show the ripple. Hide it by setting a zero size rather than a transparent color to\n     * prevent an artifact of the ripple from appearing on first render in Firefox. */\n    --paper-checkbox-ink-size: 0px;\n\n    /* Style paper-checkboxes to look like paper-items. It\'s not possible to use shared\n     * paper-item styles directly due to github.com/PolymerElements/paper-item/issues/85. */\n    display: block;\n    cursor: pointer;\n    padding: 0 calc(var(--tf-creative-preview-padding) * 2);\n    min-height: var(--tf-creative-preview-item-height);\n    @apply --layout-horizontal;\n    @apply --layout-center;\n\n    /* A fix for min-height in IE. @see https://github.com/philipwalton/flexbugs/issues/231 */\n    height: 1px;\n  }\n\n  /* Use the same focus/hover effect for checkboxes as for paper-items. */\n  paper-checkbox:hover,\n  paper-checkbox:focus {\n    background: var(--tf-creative-preview-item-highlight-color);\n  }\n</style>\n\n<paper-dropdown-menu id="dropdown" always-float-label="" label="[[label]]" value="[[displayedValue_]]" title$="[[label]]" on-opened-changed="onOpenedChanged_">\n  <paper-listbox id="menu" multi="" slot="dropdown-content" attr-for-selected="data-value" selected-attribute="checked" selectable="paper-checkbox" selected-values="{{values}}" on-iron-select="onIronEvent_" on-iron-deselect="onIronEvent_" on-iron-activate="onIronEvent_">\n    \n    <dom-repeat items="[[items]]" as="item">\n      <template>\n        <paper-checkbox noink="" data-value="[[item.value]]">[[item.label]]</paper-checkbox>\n      </template>\n    </dom-repeat>\n    <div class="divider"></div>\n    <paper-item on-click="onSelectAllClick_">[[getMsg_(\'SELECT_ALL\')]]</paper-item>\n    <paper-item on-click="onSelectNoneClick_">[[getMsg_(\'SELECT_NONE\')]]</paper-item>\n  </paper-listbox>\n</paper-dropdown-menu>\n';
      ai.content.insertBefore(
         Yh().content.cloneNode(!0),
         ai.content.firstChild
      );
      Zh = ai;
   }
   $h = Zh; /*

Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
   var bi = {
      properties: {
         name: { type: String },
         value: { notify: !0, type: String },
         required: { type: Boolean, value: !1 },
      },
      attached: function () {},
      detached: function () {},
   };
   function ci(a) {
      ci[" "](a);
      this.type = (a && a.type) || "default";
      this.key = a && a.key;
      a && "value" in a && (this.value = a.value);
   }
   ci.prototype.byKey = function (a) {
      this.key = a;
      return this.value;
   };
   t.Object.defineProperties(ci.prototype, {
      value: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            var a = this.type,
               b = this.key;
            if (a && b) return di[a] && di[a][b];
         },
         set: function (a) {
            var b = this.type,
               c = this.key;
            b &&
               c &&
               ((b = di[b] = di[b] || {}),
               null == a ? delete b[c] : (b[c] = a));
         },
      },
      list: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            if (!this.type) return [];
            var a = di[this.type];
            return a
               ? Object.keys(a).map(function (b) {
                    return di[this.type][b];
                 }, this)
               : [];
         },
      },
   });
   ci[" "] = function () {};
   var di = {};
   N({
      is: "iron-meta",
      _template: null,
      properties: {
         type: { type: String, value: "default" },
         key: { type: String },
         value: { type: String, notify: !0 },
         self: { type: Boolean, observer: "_selfChanged" },
         __meta: { type: Boolean, computed: "__computeMeta(type, key, value)" },
      },
      hostAttributes: { hidden: !0 },
      __computeMeta: function (a, b, c) {
         a = new ci({ type: a, key: b });
         void 0 !== c && c !== a.value
            ? (a.value = c)
            : this.value !== a.value && (this.value = a.value);
         return a;
      },
      get list() {
         return this.__meta && this.__meta.list;
      },
      _selfChanged: function (a) {
         a && (this.value = this);
      },
      byKey: function (a) {
         return new ci({ type: this.type, key: a }).value;
      },
   });
   var ei = null,
      fi = {
         properties: {
            validator: { type: String },
            invalid: {
               notify: !0,
               reflectToAttribute: !0,
               type: Boolean,
               value: !1,
               observer: "_invalidChanged",
            },
         },
         registered: function () {
            ei = new ci({ type: "validator" });
         },
         _invalidChanged: function () {
            this.invalid
               ? this.setAttribute("aria-invalid", "true")
               : this.removeAttribute("aria-invalid");
         },
         get tg() {
            return ei && ei.byKey(this.validator);
         },
         hasValidator: function () {
            return null != this.tg;
         },
         validate: function (a) {
            this.invalid =
               void 0 === a && void 0 !== this.value
                  ? !this._getValidity(this.value)
                  : !this._getValidity(a);
            return !this.invalid;
         },
         _getValidity: function (a) {
            return this.hasValidator() ? this.tg.validate(a) : !0;
         },
      };
   var gi = {
         properties: {
            checked: {
               type: Boolean,
               value: !1,
               reflectToAttribute: !0,
               notify: !0,
               observer: "_checkedChanged",
            },
            toggles: { type: Boolean, value: !0, reflectToAttribute: !0 },
            value: { type: String, value: "on", observer: "_valueChanged" },
         },
         observers: ["_requiredChanged(required)"],
         created: function () {
            this.il = !0;
         },
         _getValidity: function () {
            return this.disabled || !this.required || this.checked;
         },
         _requiredChanged: function () {
            this.required
               ? this.setAttribute("aria-required", "true")
               : this.removeAttribute("aria-required");
         },
         _checkedChanged: function () {
            this.active = this.checked;
            this.fire("iron-change");
         },
         _valueChanged: function () {
            if (void 0 === this.value || null === this.value) this.value = "on";
         },
      },
      hi = [bi, fi, gi];
   var ii = {
      properties: {
         focused: {
            type: Boolean,
            value: !1,
            notify: !0,
            readOnly: !0,
            reflectToAttribute: !0,
         },
         disabled: {
            type: Boolean,
            value: !1,
            notify: !0,
            observer: "_disabledChanged",
            reflectToAttribute: !0,
         },
         _oldTabIndex: { type: String },
         _boundFocusBlurHandler: {
            type: Function,
            value: function () {
               return this._focusBlurHandler.bind(this);
            },
         },
      },
      observers: ["_changedControlState(focused, disabled)"],
      ready: function () {
         this.addEventListener("focus", this._boundFocusBlurHandler, !0);
         this.addEventListener("blur", this._boundFocusBlurHandler, !0);
      },
      _focusBlurHandler: function (a) {
         this._setFocused("focus" === a.type);
      },
      _disabledChanged: function (a) {
         this.setAttribute("aria-disabled", a ? "true" : "false");
         this.style.pointerEvents = a ? "none" : "";
         a
            ? ((this._oldTabIndex = this.getAttribute("tabindex")),
              this._setFocused(!1),
              (this.tabIndex = -1),
              this.blur())
            : void 0 !== this._oldTabIndex &&
              (null === this._oldTabIndex
                 ? this.removeAttribute("tabindex")
                 : this.setAttribute("tabindex", this._oldTabIndex));
      },
      _changedControlState: function () {
         this._controlStateChanged && this._controlStateChanged();
      },
   };
   var ji = {
         properties: {
            pressed: {
               type: Boolean,
               readOnly: !0,
               value: !1,
               reflectToAttribute: !0,
               observer: "_pressedChanged",
            },
            toggles: { type: Boolean, value: !1, reflectToAttribute: !0 },
            active: {
               type: Boolean,
               value: !1,
               notify: !0,
               reflectToAttribute: !0,
            },
            pointerDown: { type: Boolean, readOnly: !0, value: !1 },
            receivedFocusFromKeyboard: { type: Boolean, readOnly: !0 },
            ariaActiveAttribute: {
               type: String,
               value: "aria-pressed",
               observer: "_ariaActiveAttributeChanged",
            },
         },
         listeners: {
            down: "_downHandler",
            mouseup: "_upHandler",
            tap: "_tapHandler",
         },
         observers: [
            "_focusChanged(focused)",
            "_activeChanged(active, ariaActiveAttribute)",
         ],
         ka: {
            "enter:keydown": "_asyncClick",
            "space:keydown": "_spaceKeyDownHandler",
            "space:keyup": "_spaceKeyUpHandler",
         },
         jl: /^mouse/,
         _tapHandler: function () {
            this.toggles
               ? this._userActivate(!this.active)
               : (this.active = !1);
         },
         _focusChanged: function (a) {
            this._detectKeyboardFocus(a);
            a || this._setPressed(!1);
         },
         _detectKeyboardFocus: function (a) {
            this._setReceivedFocusFromKeyboard(!this.pointerDown && a);
         },
         _userActivate: function (a) {
            this.active !== a && ((this.active = a), this.fire("change"));
         },
         _downHandler: function () {
            this._setPointerDown(!0);
            this._setPressed(!0);
            this._setReceivedFocusFromKeyboard(!1);
         },
         _upHandler: function () {
            this._setPointerDown(!1);
            this._setPressed(!1);
         },
         _spaceKeyDownHandler: function (a) {
            a = a.detail.ub;
            var b = L(a).gf;
            this.isLightDescendant(b) ||
               (a.preventDefault(),
               a.stopImmediatePropagation(),
               this._setPressed(!0));
         },
         _spaceKeyUpHandler: function (a) {
            a = L(a.detail.ub).gf;
            this.isLightDescendant(a) ||
               (this.pressed && this._asyncClick(), this._setPressed(!1));
         },
         _asyncClick: function () {
            this.async(function () {
               this.click();
            }, 1);
         },
         _pressedChanged: function () {
            this._changedButtonState();
         },
         _ariaActiveAttributeChanged: function (a, b) {
            b && b != a && this.hasAttribute(b) && this.removeAttribute(b);
         },
         _activeChanged: function (a) {
            this.toggles
               ? this.setAttribute(
                    this.ariaActiveAttribute,
                    a ? "true" : "false"
                 )
               : this.removeAttribute(this.ariaActiveAttribute);
            this._changedButtonState();
         },
         _controlStateChanged: function () {
            this.disabled ? this._setPressed(!1) : this._changedButtonState();
         },
         _changedButtonState: function () {
            this._buttonStateChanged && this._buttonStateChanged();
         },
      },
      ki = [Ra, ji]; /*

Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
   var li = x([
      '\n    <style>\n      :host {\n        display: block;\n        position: absolute;\n        border-radius: inherit;\n        overflow: hidden;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n\n        /* See PolymerElements/paper-behaviors/issues/34. On non-Chrome browsers,\n         * creating a node (with a position:absolute) in the middle of an event\n         * handler "interrupts" that event handler (which happens when the\n         * ripple is created on demand) */\n        pointer-events: none;\n      }\n\n      :host([animating]) {\n        /* This resolves a rendering issue in Chrome (as of 40) where the\n           ripple is not properly clipped by its parent (which may have\n           rounded corners). See: http://jsbin.com/temexa/4\n\n           Note: We only apply this style conditionally. Otherwise, the browser\n           will create a new compositing layer for every ripple element on the\n           page, and that would be bad. */\n        -webkit-transform: translate(0, 0);\n        transform: translate3d(0, 0, 0);\n      }\n\n      #background,\n      #waves,\n      .wave-container,\n      .wave {\n        pointer-events: none;\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n      }\n\n      #background,\n      .wave {\n        opacity: 0;\n      }\n\n      #waves,\n      .wave {\n        overflow: hidden;\n      }\n\n      .wave-container,\n      .wave {\n        border-radius: 50%;\n      }\n\n      :host(.circle) #background,\n      :host(.circle) #waves {\n        border-radius: 50%;\n      }\n\n      :host(.circle) .wave-container {\n        overflow: hidden;\n      }\n    </style>\n\n    <div id="background"></div>\n    <div id="waves"></div>\n',
   ]);
   function mi(a, b, c, d) {
      a -= c;
      b -= d;
      return Math.sqrt(a * a + b * b);
   }
   var ni =
      window.performance && window.performance.now
         ? window.performance.now.bind(window.performance)
         : Date.now;
   function oi(a) {
      this.element = a;
      this.width = this.qd.width;
      this.height = this.qd.height;
      this.size = Math.max(this.width, this.height);
   }
   oi.prototype = {
      get qd() {
         return this.element.getBoundingClientRect();
      },
   };
   function pi(a) {
      this.element = a;
      this.color = window.getComputedStyle(a).color;
      this.m = document.createElement("div");
      this.h = document.createElement("div");
      this.m.style.backgroundColor = this.color;
      this.m.classList.add("wave");
      this.h.classList.add("wave-container");
      L(this.h).appendChild(this.m);
      qi(this);
   }
   function qi(a) {
      a.na = 0;
      a.da = 0;
      a.j = 0;
      a.o = 0;
      a.ba = 0;
      a.pa = 0;
      a.wa = 0;
      a.g = new oi(a.element);
   }
   pi.prototype = {
      get recenters() {
         return this.element.recenters;
      },
      get center() {
         return this.element.center;
      },
      get vd() {
         if (!this.da) return 0;
         var a = ni() - this.da;
         this.j && (a -= this.cb);
         return a;
      },
      get cb() {
         return this.j ? ni() - this.j : 0;
      },
      get ck() {
         return this.vd / 1e3;
      },
      get oa() {
         return this.cb / 1e3;
      },
      get dk() {
         return this.ck + this.oa;
      },
      get initialOpacity() {
         return this.element.initialOpacity;
      },
      get opacityDecayVelocity() {
         return this.element.opacityDecayVelocity;
      },
      get ea() {
         var a =
            1.1 *
               Math.min(
                  Math.sqrt(
                     this.g.width * this.g.width + this.g.height * this.g.height
                  ),
                  300
               ) +
            5;
         return Math.abs(
            a * (1 - Math.pow(80, -(this.dk / (1.1 - (a / 300) * 0.2))))
         );
      },
      get opacity() {
         return this.j
            ? Math.max(
                 0,
                 this.initialOpacity - this.oa * this.opacityDecayVelocity
              )
            : this.initialOpacity;
      },
      get ik() {
         return Math.max(0, Math.min(0.3 * this.oa, this.opacity));
      },
      get fh() {
         return 0.01 > this.opacity && this.ea >= Math.min(this.na, 300);
      },
      get gh() {
         return (
            this.opacity >= this.initialOpacity &&
            this.ea >= Math.min(this.na, 300)
         );
      },
      get xj() {
         return this.j ? this.fh : this.gh;
      },
      get eb() {
         return Math.min(1, ((this.ea / this.g.size) * 2) / Math.sqrt(2));
      },
      get ek() {
         return this.pa ? this.o + this.eb * (this.pa - this.o) : this.o;
      },
      get fk() {
         return this.wa ? this.ba + this.eb * (this.wa - this.ba) : this.ba;
      },
      get kc() {
         return this.da && !this.j;
      },
      downAction: function (a) {
         var b = this.g.width / 2,
            c = this.g.height / 2;
         qi(this);
         this.da = ni();
         this.center
            ? ((this.o = b), (this.ba = c))
            : ((this.o = a ? a.detail.x - this.g.qd.left : this.g.width / 2),
              (this.ba = a ? a.detail.y - this.g.qd.top : this.g.height / 2));
         this.recenters && ((this.pa = b), (this.wa = c));
         a = this.g;
         b = this.o;
         c = this.ba;
         this.na = Math.max(
            mi(b, c, 0, 0),
            mi(b, c, a.width, 0),
            mi(b, c, 0, a.height),
            mi(b, c, a.width, a.height)
         );
         this.h.style.top = (this.g.height - this.g.size) / 2 + "px";
         this.h.style.left = (this.g.width - this.g.size) / 2 + "px";
         this.h.style.width = this.g.size + "px";
         this.h.style.height = this.g.size + "px";
      },
      upAction: function () {
         this.kc && (this.j = ni());
      },
      remove: function () {
         L(L(this.h).parentNode).removeChild(this.h);
      },
   };
   N({
      _template: G(li),
      is: "paper-ripple",
      behaviors: [Ra],
      properties: {
         initialOpacity: { type: Number, value: 0.25 },
         opacityDecayVelocity: { type: Number, value: 0.8 },
         recenters: { type: Boolean, value: !1 },
         center: { type: Boolean, value: !1 },
         ripples: {
            type: Array,
            value: function () {
               return [];
            },
         },
         animating: {
            type: Boolean,
            readOnly: !0,
            reflectToAttribute: !0,
            value: !1,
         },
         holdDown: { type: Boolean, value: !1, observer: "_holdDownChanged" },
         noink: { type: Boolean, value: !1 },
         _animating: { type: Boolean },
         _boundAnimate: {
            type: Function,
            value: function () {
               return this.animate.bind(this);
            },
         },
      },
      get target() {
         return this.keyEventTarget;
      },
      ka: {
         "enter:keydown": "_onEnterKeydown",
         "space:keydown": "_onSpaceKeydown",
         "space:keyup": "_onSpaceKeyup",
      },
      attached: function () {
         11 == L(this).parentNode.nodeType
            ? (this.keyEventTarget = L(this).getOwnerRoot().host)
            : (this.keyEventTarget = L(this).parentNode);
         var a = this.keyEventTarget;
         this.listen(a, "up", "uiUpAction");
         this.listen(a, "down", "uiDownAction");
      },
      detached: function () {
         this.unlisten(this.keyEventTarget, "up", "uiUpAction");
         this.unlisten(this.keyEventTarget, "down", "uiDownAction");
         this.keyEventTarget = null;
      },
      get g() {
         for (var a = 0; a < this.ripples.length; ++a)
            if (!this.ripples[a].xj) return !0;
         return !1;
      },
      simulatedRipple: function () {
         this.downAction(null);
         this.async(function () {
            this.upAction();
         }, 1);
      },
      uiDownAction: function (a) {
         this.noink || this.downAction(a);
      },
      downAction: function (a) {
         (this.holdDown && 0 < this.ripples.length) ||
            (this.addRipple().downAction(a),
            this._animating || ((this._animating = !0), this.animate()));
      },
      uiUpAction: function (a) {
         this.noink || this.upAction(a);
      },
      upAction: function (a) {
         this.holdDown ||
            (this.ripples.forEach(function (b) {
               b.upAction(a);
            }),
            (this._animating = !0),
            this.animate());
      },
      onAnimationComplete: function () {
         this._animating = !1;
         this.$.background.style.backgroundColor = "";
         this.fire("transitionend");
      },
      addRipple: function () {
         var a = new pi(this);
         L(this.$.waves).appendChild(a.h);
         this.$.background.style.backgroundColor = a.color;
         this.ripples.push(a);
         this._setAnimating(!0);
         return a;
      },
      removeRipple: function (a) {
         var b = this.ripples.indexOf(a);
         0 > b ||
            (this.ripples.splice(b, 1),
            a.remove(),
            this.ripples.length || this._setAnimating(!1));
      },
      animate: function () {
         if (this._animating) {
            var a;
            for (a = 0; a < this.ripples.length; ++a) {
               var b = this.ripples[a];
               var c = b;
               c.m.style.opacity = c.opacity;
               var d = c.ea / (c.g.size / 2);
               var e = c.ek - c.g.width / 2;
               var f = c.fk - c.g.height / 2;
               c.h.style.webkitTransform =
                  "translate(" + e + "px, " + f + "px)";
               c.h.style.transform = "translate3d(" + e + "px, " + f + "px, 0)";
               c.m.style.webkitTransform = "scale(" + d + "," + d + ")";
               c.m.style.transform = "scale3d(" + d + "," + d + ",1)";
               this.$.background.style.opacity = b.ik;
               b.fh && !b.gh && this.removeRipple(b);
            }
            if (this.g || 0 !== this.ripples.length)
               window.requestAnimationFrame(this._boundAnimate);
            else this.onAnimationComplete();
         }
      },
      animateRipple: function () {
         return this.animate();
      },
      _onEnterKeydown: function () {
         this.uiDownAction();
         this.async(this.uiUpAction, 1);
      },
      _onSpaceKeydown: function () {
         this.uiDownAction();
      },
      _onSpaceKeyup: function () {
         this.uiUpAction();
      },
      _holdDownChanged: function (a, b) {
         void 0 !== b && (a ? this.downAction() : this.upAction());
      },
   });
   var ri = {
      properties: {
         noink: { type: Boolean, observer: "_noinkChanged" },
         _rippleContainer: { type: Object },
      },
      _buttonStateChanged: function () {
         this.focused && this.ensureRipple();
      },
      _downHandler: function (a) {
         ji._downHandler.call(this, a);
         this.pressed && this.ensureRipple(a);
      },
      ensureRipple: function (a) {
         if (!this.hasRipple()) {
            this.bb = this._createRipple();
            this.bb.noink = this.noink;
            var b = this._rippleContainer || this.root;
            b && L(b).appendChild(this.bb);
            if (a) {
               b = L(this._rippleContainer || this);
               var c = L(a).yc;
               b.deepContains(c) && this.bb.uiDownAction(a);
            }
         }
      },
      getRipple: function () {
         this.ensureRipple();
         return this.bb;
      },
      hasRipple: function () {
         return !!this.bb;
      },
      _createRipple: function () {
         return document.createElement("paper-ripple");
      },
      _noinkChanged: function (a) {
         this.hasRipple() && (this.bb.noink = a);
      },
   };
   var si = {
         observers: ["_focusedChanged(receivedFocusFromKeyboard)"],
         _focusedChanged: function (a) {
            a && this.ensureRipple();
            this.hasRipple() && (this.bb.holdDown = a);
         },
         _createRipple: function () {
            var a = ri._createRipple();
            a.id = "ink";
            a.setAttribute("center", "");
            a.classList.add("circle");
            return a;
         },
      },
      ti = [ki, ii, ri, si];
   var ui = [
      ti,
      hi,
      {
         _checkedChanged: function () {
            gi._checkedChanged.call(this);
            this.hasRipple() &&
               (this.checked
                  ? this.bb.setAttribute("checked", "")
                  : this.bb.removeAttribute("checked"));
         },
         _buttonStateChanged: function () {
            ri._buttonStateChanged.call(this);
            !this.disabled && this.isAttached && (this.checked = this.active);
         },
      },
   ];
   var vi = x([
         '<custom-style>\n  <style is="custom-style">\n    html {\n\n      /* Material Design color palette for Google products */\n\n      --google-red-100: #f4c7c3;\n      --google-red-300: #e67c73;\n      --google-red-500: #db4437;\n      --google-red-700: #c53929;\n\n      --google-blue-100: #c6dafc;\n      --google-blue-300: #7baaf7;\n      --google-blue-500: #4285f4;\n      --google-blue-700: #3367d6;\n\n      --google-green-100: #b7e1cd;\n      --google-green-300: #57bb8a;\n      --google-green-500: #0f9d58;\n      --google-green-700: #0b8043;\n\n      --google-yellow-100: #fce8b2;\n      --google-yellow-300: #f7cb4d;\n      --google-yellow-500: #f4b400;\n      --google-yellow-700: #f09300;\n\n      --google-grey-100: #f5f5f5;\n      --google-grey-300: #e0e0e0;\n      --google-grey-500: #9e9e9e;\n      --google-grey-700: #616161;\n\n      /* Material Design color palette from online spec document */\n\n      --paper-red-50: #ffebee;\n      --paper-red-100: #ffcdd2;\n      --paper-red-200: #ef9a9a;\n      --paper-red-300: #e57373;\n      --paper-red-400: #ef5350;\n      --paper-red-500: #f44336;\n      --paper-red-600: #e53935;\n      --paper-red-700: #d32f2f;\n      --paper-red-800: #c62828;\n      --paper-red-900: #b71c1c;\n      --paper-red-a100: #ff8a80;\n      --paper-red-a200: #ff5252;\n      --paper-red-a400: #ff1744;\n      --paper-red-a700: #d50000;\n\n      --paper-pink-50: #fce4ec;\n      --paper-pink-100: #f8bbd0;\n      --paper-pink-200: #f48fb1;\n      --paper-pink-300: #f06292;\n      --paper-pink-400: #ec407a;\n      --paper-pink-500: #e91e63;\n      --paper-pink-600: #d81b60;\n      --paper-pink-700: #c2185b;\n      --paper-pink-800: #ad1457;\n      --paper-pink-900: #880e4f;\n      --paper-pink-a100: #ff80ab;\n      --paper-pink-a200: #ff4081;\n      --paper-pink-a400: #f50057;\n      --paper-pink-a700: #c51162;\n\n      --paper-purple-50: #f3e5f5;\n      --paper-purple-100: #e1bee7;\n      --paper-purple-200: #ce93d8;\n      --paper-purple-300: #ba68c8;\n      --paper-purple-400: #ab47bc;\n      --paper-purple-500: #9c27b0;\n      --paper-purple-600: #8e24aa;\n      --paper-purple-700: #7b1fa2;\n      --paper-purple-800: #6a1b9a;\n      --paper-purple-900: #4a148c;\n      --paper-purple-a100: #ea80fc;\n      --paper-purple-a200: #e040fb;\n      --paper-purple-a400: #d500f9;\n      --paper-purple-a700: #aa00ff;\n\n      --paper-deep-purple-50: #ede7f6;\n      --paper-deep-purple-100: #d1c4e9;\n      --paper-deep-purple-200: #b39ddb;\n      --paper-deep-purple-300: #9575cd;\n      --paper-deep-purple-400: #7e57c2;\n      --paper-deep-purple-500: #673ab7;\n      --paper-deep-purple-600: #5e35b1;\n      --paper-deep-purple-700: #512da8;\n      --paper-deep-purple-800: #4527a0;\n      --paper-deep-purple-900: #311b92;\n      --paper-deep-purple-a100: #b388ff;\n      --paper-deep-purple-a200: #7c4dff;\n      --paper-deep-purple-a400: #651fff;\n      --paper-deep-purple-a700: #6200ea;\n\n      --paper-indigo-50: #e8eaf6;\n      --paper-indigo-100: #c5cae9;\n      --paper-indigo-200: #9fa8da;\n      --paper-indigo-300: #7986cb;\n      --paper-indigo-400: #5c6bc0;\n      --paper-indigo-500: #3f51b5;\n      --paper-indigo-600: #3949ab;\n      --paper-indigo-700: #303f9f;\n      --paper-indigo-800: #283593;\n      --paper-indigo-900: #1a237e;\n      --paper-indigo-a100: #8c9eff;\n      --paper-indigo-a200: #536dfe;\n      --paper-indigo-a400: #3d5afe;\n      --paper-indigo-a700: #304ffe;\n\n      --paper-blue-50: #e3f2fd;\n      --paper-blue-100: #bbdefb;\n      --paper-blue-200: #90caf9;\n      --paper-blue-300: #64b5f6;\n      --paper-blue-400: #42a5f5;\n      --paper-blue-500: #2196f3;\n      --paper-blue-600: #1e88e5;\n      --paper-blue-700: #1976d2;\n      --paper-blue-800: #1565c0;\n      --paper-blue-900: #0d47a1;\n      --paper-blue-a100: #82b1ff;\n      --paper-blue-a200: #448aff;\n      --paper-blue-a400: #2979ff;\n      --paper-blue-a700: #2962ff;\n\n      --paper-light-blue-50: #e1f5fe;\n      --paper-light-blue-100: #b3e5fc;\n      --paper-light-blue-200: #81d4fa;\n      --paper-light-blue-300: #4fc3f7;\n      --paper-light-blue-400: #29b6f6;\n      --paper-light-blue-500: #03a9f4;\n      --paper-light-blue-600: #039be5;\n      --paper-light-blue-700: #0288d1;\n      --paper-light-blue-800: #0277bd;\n      --paper-light-blue-900: #01579b;\n      --paper-light-blue-a100: #80d8ff;\n      --paper-light-blue-a200: #40c4ff;\n      --paper-light-blue-a400: #00b0ff;\n      --paper-light-blue-a700: #0091ea;\n\n      --paper-cyan-50: #e0f7fa;\n      --paper-cyan-100: #b2ebf2;\n      --paper-cyan-200: #80deea;\n      --paper-cyan-300: #4dd0e1;\n      --paper-cyan-400: #26c6da;\n      --paper-cyan-500: #00bcd4;\n      --paper-cyan-600: #00acc1;\n      --paper-cyan-700: #0097a7;\n      --paper-cyan-800: #00838f;\n      --paper-cyan-900: #006064;\n      --paper-cyan-a100: #84ffff;\n      --paper-cyan-a200: #18ffff;\n      --paper-cyan-a400: #00e5ff;\n      --paper-cyan-a700: #00b8d4;\n\n      --paper-teal-50: #e0f2f1;\n      --paper-teal-100: #b2dfdb;\n      --paper-teal-200: #80cbc4;\n      --paper-teal-300: #4db6ac;\n      --paper-teal-400: #26a69a;\n      --paper-teal-500: #009688;\n      --paper-teal-600: #00897b;\n      --paper-teal-700: #00796b;\n      --paper-teal-800: #00695c;\n      --paper-teal-900: #004d40;\n      --paper-teal-a100: #a7ffeb;\n      --paper-teal-a200: #64ffda;\n      --paper-teal-a400: #1de9b6;\n      --paper-teal-a700: #00bfa5;\n\n      --paper-green-50: #e8f5e9;\n      --paper-green-100: #c8e6c9;\n      --paper-green-200: #a5d6a7;\n      --paper-green-300: #81c784;\n      --paper-green-400: #66bb6a;\n      --paper-green-500: #4caf50;\n      --paper-green-600: #43a047;\n      --paper-green-700: #388e3c;\n      --paper-green-800: #2e7d32;\n      --paper-green-900: #1b5e20;\n      --paper-green-a100: #b9f6ca;\n      --paper-green-a200: #69f0ae;\n      --paper-green-a400: #00e676;\n      --paper-green-a700: #00c853;\n\n      --paper-light-green-50: #f1f8e9;\n      --paper-light-green-100: #dcedc8;\n      --paper-light-green-200: #c5e1a5;\n      --paper-light-green-300: #aed581;\n      --paper-light-green-400: #9ccc65;\n      --paper-light-green-500: #8bc34a;\n      --paper-light-green-600: #7cb342;\n      --paper-light-green-700: #689f38;\n      --paper-light-green-800: #558b2f;\n      --paper-light-green-900: #33691e;\n      --paper-light-green-a100: #ccff90;\n      --paper-light-green-a200: #b2ff59;\n      --paper-light-green-a400: #76ff03;\n      --paper-light-green-a700: #64dd17;\n\n      --paper-lime-50: #f9fbe7;\n      --paper-lime-100: #f0f4c3;\n      --paper-lime-200: #e6ee9c;\n      --paper-lime-300: #dce775;\n      --paper-lime-400: #d4e157;\n      --paper-lime-500: #cddc39;\n      --paper-lime-600: #c0ca33;\n      --paper-lime-700: #afb42b;\n      --paper-lime-800: #9e9d24;\n      --paper-lime-900: #827717;\n      --paper-lime-a100: #f4ff81;\n      --paper-lime-a200: #eeff41;\n      --paper-lime-a400: #c6ff00;\n      --paper-lime-a700: #aeea00;\n\n      --paper-yellow-50: #fffde7;\n      --paper-yellow-100: #fff9c4;\n      --paper-yellow-200: #fff59d;\n      --paper-yellow-300: #fff176;\n      --paper-yellow-400: #ffee58;\n      --paper-yellow-500: #ffeb3b;\n      --paper-yellow-600: #fdd835;\n      --paper-yellow-700: #fbc02d;\n      --paper-yellow-800: #f9a825;\n      --paper-yellow-900: #f57f17;\n      --paper-yellow-a100: #ffff8d;\n      --paper-yellow-a200: #ffff00;\n      --paper-yellow-a400: #ffea00;\n      --paper-yellow-a700: #ffd600;\n\n      --paper-amber-50: #fff8e1;\n      --paper-amber-100: #ffecb3;\n      --paper-amber-200: #ffe082;\n      --paper-amber-300: #ffd54f;\n      --paper-amber-400: #ffca28;\n      --paper-amber-500: #ffc107;\n      --paper-amber-600: #ffb300;\n      --paper-amber-700: #ffa000;\n      --paper-amber-800: #ff8f00;\n      --paper-amber-900: #ff6f00;\n      --paper-amber-a100: #ffe57f;\n      --paper-amber-a200: #ffd740;\n      --paper-amber-a400: #ffc400;\n      --paper-amber-a700: #ffab00;\n\n      --paper-orange-50: #fff3e0;\n      --paper-orange-100: #ffe0b2;\n      --paper-orange-200: #ffcc80;\n      --paper-orange-300: #ffb74d;\n      --paper-orange-400: #ffa726;\n      --paper-orange-500: #ff9800;\n      --paper-orange-600: #fb8c00;\n      --paper-orange-700: #f57c00;\n      --paper-orange-800: #ef6c00;\n      --paper-orange-900: #e65100;\n      --paper-orange-a100: #ffd180;\n      --paper-orange-a200: #ffab40;\n      --paper-orange-a400: #ff9100;\n      --paper-orange-a700: #ff6500;\n\n      --paper-deep-orange-50: #fbe9e7;\n      --paper-deep-orange-100: #ffccbc;\n      --paper-deep-orange-200: #ffab91;\n      --paper-deep-orange-300: #ff8a65;\n      --paper-deep-orange-400: #ff7043;\n      --paper-deep-orange-500: #ff5722;\n      --paper-deep-orange-600: #f4511e;\n      --paper-deep-orange-700: #e64a19;\n      --paper-deep-orange-800: #d84315;\n      --paper-deep-orange-900: #bf360c;\n      --paper-deep-orange-a100: #ff9e80;\n      --paper-deep-orange-a200: #ff6e40;\n      --paper-deep-orange-a400: #ff3d00;\n      --paper-deep-orange-a700: #dd2c00;\n\n      --paper-brown-50: #efebe9;\n      --paper-brown-100: #d7ccc8;\n      --paper-brown-200: #bcaaa4;\n      --paper-brown-300: #a1887f;\n      --paper-brown-400: #8d6e63;\n      --paper-brown-500: #795548;\n      --paper-brown-600: #6d4c41;\n      --paper-brown-700: #5d4037;\n      --paper-brown-800: #4e342e;\n      --paper-brown-900: #3e2723;\n\n      --paper-grey-50: #fafafa;\n      --paper-grey-100: #f5f5f5;\n      --paper-grey-200: #eeeeee;\n      --paper-grey-300: #e0e0e0;\n      --paper-grey-400: #bdbdbd;\n      --paper-grey-500: #9e9e9e;\n      --paper-grey-600: #757575;\n      --paper-grey-700: #616161;\n      --paper-grey-800: #424242;\n      --paper-grey-900: #212121;\n\n      --paper-blue-grey-50: #eceff1;\n      --paper-blue-grey-100: #cfd8dc;\n      --paper-blue-grey-200: #b0bec5;\n      --paper-blue-grey-300: #90a4ae;\n      --paper-blue-grey-400: #78909c;\n      --paper-blue-grey-500: #607d8b;\n      --paper-blue-grey-600: #546e7a;\n      --paper-blue-grey-700: #455a64;\n      --paper-blue-grey-800: #37474f;\n      --paper-blue-grey-900: #263238;\n\n      /* opacity for dark text on a light background */\n      --dark-divider-opacity: 0.12;\n      --dark-disabled-opacity: 0.38; /* or hint text or icon */\n      --dark-secondary-opacity: 0.54;\n      --dark-primary-opacity: 0.87;\n\n      /* opacity for light text on a dark background */\n      --light-divider-opacity: 0.12;\n      --light-disabled-opacity: 0.3; /* or hint text or icon */\n      --light-secondary-opacity: 0.7;\n      --light-primary-opacity: 1.0;\n\n    }\n\n  </style>\n</custom-style>',
      ]),
      wi = G(vi);
   wi.setAttribute("style", "display: none;");
   document.head.appendChild(wi.content);
   var xi = ea(
         [
            '<custom-style>\n  <style is="custom-style">\n    html {\n      /*\n       * You can use these generic variables in your elements for easy theming.\n       * For example, if all your elements use `--primary-text-color` as its main\n       * color, then switching from a light to a dark theme is just a matter of\n       * changing the value of `--primary-text-color` in your application.\n       */\n      --primary-text-color: var(--light-theme-text-color);\n      --primary-background-color: var(--light-theme-background-color);\n      --secondary-text-color: var(--light-theme-secondary-color);\n      --disabled-text-color: var(--light-theme-disabled-color);\n      --divider-color: var(--light-theme-divider-color);\n      --error-color: var(--paper-deep-orange-a700);\n\n      /*\n       * Primary and accent colors. Also see color.html for more colors.\n       */\n      --primary-color: var(--paper-indigo-500);\n      --light-primary-color: var(--paper-indigo-100);\n      --dark-primary-color: var(--paper-indigo-700);\n\n      --accent-color: var(--paper-pink-a200);\n      --light-accent-color: var(--paper-pink-a100);\n      --dark-accent-color: var(--paper-pink-a400);\n\n\n      /*\n       * Material Design Light background theme\n       */\n      --light-theme-background-color: #ffffff;\n      --light-theme-base-color: #000000;\n      --light-theme-text-color: var(--paper-grey-900);\n      --light-theme-secondary-color: #737373;  /* for secondary text and icons */\n      --light-theme-disabled-color: #9b9b9b;  /* disabled/hint text */\n      --light-theme-divider-color: #dbdbdb;\n\n      /*\n       * Material Design Dark background theme\n       */\n      --dark-theme-background-color: var(--paper-grey-900);\n      --dark-theme-base-color: #ffffff;\n      --dark-theme-text-color: #ffffff;\n      --dark-theme-secondary-color: #bcbcbc;  /* for secondary text and icons */\n      --dark-theme-disabled-color: #646464;  /* disabled/hint text */\n      --dark-theme-divider-color: #3c3c3c;\n\n      /*\n       * Deprecated values because of their confusing names.\n       */\n      --text-primary-color: var(--dark-theme-text-color);\n      --default-primary-color: var(--primary-color);\n    }\n  </style>\n</custom-style>',
         ],
         [
            '<custom-style>\n  <style is="custom-style">\n    html {\n      /*\n       * You can use these generic variables in your elements for easy theming.\n       * For example, if all your elements use \\`--primary-text-color\\` as its main\n       * color, then switching from a light to a dark theme is just a matter of\n       * changing the value of \\`--primary-text-color\\` in your application.\n       */\n      --primary-text-color: var(--light-theme-text-color);\n      --primary-background-color: var(--light-theme-background-color);\n      --secondary-text-color: var(--light-theme-secondary-color);\n      --disabled-text-color: var(--light-theme-disabled-color);\n      --divider-color: var(--light-theme-divider-color);\n      --error-color: var(--paper-deep-orange-a700);\n\n      /*\n       * Primary and accent colors. Also see color.html for more colors.\n       */\n      --primary-color: var(--paper-indigo-500);\n      --light-primary-color: var(--paper-indigo-100);\n      --dark-primary-color: var(--paper-indigo-700);\n\n      --accent-color: var(--paper-pink-a200);\n      --light-accent-color: var(--paper-pink-a100);\n      --dark-accent-color: var(--paper-pink-a400);\n\n\n      /*\n       * Material Design Light background theme\n       */\n      --light-theme-background-color: #ffffff;\n      --light-theme-base-color: #000000;\n      --light-theme-text-color: var(--paper-grey-900);\n      --light-theme-secondary-color: #737373;  /* for secondary text and icons */\n      --light-theme-disabled-color: #9b9b9b;  /* disabled/hint text */\n      --light-theme-divider-color: #dbdbdb;\n\n      /*\n       * Material Design Dark background theme\n       */\n      --dark-theme-background-color: var(--paper-grey-900);\n      --dark-theme-base-color: #ffffff;\n      --dark-theme-text-color: #ffffff;\n      --dark-theme-secondary-color: #bcbcbc;  /* for secondary text and icons */\n      --dark-theme-disabled-color: #646464;  /* disabled/hint text */\n      --dark-theme-divider-color: #3c3c3c;\n\n      /*\n       * Deprecated values because of their confusing names.\n       */\n      --text-primary-color: var(--dark-theme-text-color);\n      --default-primary-color: var(--primary-color);\n    }\n  </style>\n</custom-style>',
         ]
      ),
      yi = G(xi);
   yi.setAttribute("style", "display: none;");
   document.head.appendChild(yi.content); /*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
   var zi = ea(
      [
         '<style>\n  :host {\n    display: inline-block;\n    white-space: nowrap;\n    cursor: pointer;\n    --calculated-paper-checkbox-size: var(--paper-checkbox-size, 18px);\n    /* -1px is a sentinel for the default and is replaced in `attached`. */\n    --calculated-paper-checkbox-ink-size: var(--paper-checkbox-ink-size, -1px);\n    @apply --paper-font-common-base;\n    line-height: 0;\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  :host([hidden]) {\n    display: none !important;\n  }\n\n  :host(:focus) {\n    outline: none;\n  }\n\n  .hidden {\n    display: none;\n  }\n\n  #checkboxContainer {\n    display: inline-block;\n    position: relative;\n    width: var(--calculated-paper-checkbox-size);\n    height: var(--calculated-paper-checkbox-size);\n    min-width: var(--calculated-paper-checkbox-size);\n    margin: var(--paper-checkbox-margin, initial);\n    vertical-align: var(--paper-checkbox-vertical-align, middle);\n    background-color: var(--paper-checkbox-unchecked-background-color, transparent);\n  }\n\n  #ink {\n    position: absolute;\n\n    /* Center the ripple in the checkbox by negative offsetting it by\n     * (inkWidth - rippleWidth) / 2 */\n    top: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);\n    left: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);\n    width: var(--calculated-paper-checkbox-ink-size);\n    height: var(--calculated-paper-checkbox-ink-size);\n    color: var(--paper-checkbox-unchecked-ink-color, var(--primary-text-color));\n    opacity: 0.6;\n    pointer-events: none;\n  }\n\n  #ink:dir(rtl) {\n    right: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);\n    left: auto;\n  }\n\n  #ink[checked] {\n    color: var(--paper-checkbox-checked-ink-color, var(--primary-color));\n  }\n\n  #checkbox {\n    position: relative;\n    box-sizing: border-box;\n    height: 100%;\n    border: solid 2px;\n    border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));\n    border-radius: 2px;\n    pointer-events: none;\n    -webkit-transition: background-color 140ms, border-color 140ms;\n    transition: background-color 140ms, border-color 140ms;\n\n    -webkit-transition-duration: var(--paper-checkbox-animation-duration, 140ms);\n    transition-duration: var(--paper-checkbox-animation-duration, 140ms);\n  }\n\n  /* checkbox checked animations */\n  #checkbox.checked #checkmark {\n    -webkit-animation: checkmark-expand 140ms ease-out forwards;\n    animation: checkmark-expand 140ms ease-out forwards;\n\n    -webkit-animation-duration: var(--paper-checkbox-animation-duration, 140ms);\n    animation-duration: var(--paper-checkbox-animation-duration, 140ms);\n  }\n\n  @-webkit-keyframes checkmark-expand {\n    0% {\n      -webkit-transform: scale(0, 0) rotate(45deg);\n    }\n    100% {\n      -webkit-transform: scale(1, 1) rotate(45deg);\n    }\n  }\n\n  @keyframes checkmark-expand {\n    0% {\n      transform: scale(0, 0) rotate(45deg);\n    }\n    100% {\n      transform: scale(1, 1) rotate(45deg);\n    }\n  }\n\n  #checkbox.checked {\n    background-color: var(--paper-checkbox-checked-color, var(--primary-color));\n    border-color: var(--paper-checkbox-checked-color, var(--primary-color));\n  }\n\n  #checkmark {\n    position: absolute;\n    width: 36%;\n    height: 70%;\n    border-style: solid;\n    border-top: none;\n    border-left: none;\n    border-right-width: calc(2/15 * var(--calculated-paper-checkbox-size));\n    border-bottom-width: calc(2/15 * var(--calculated-paper-checkbox-size));\n    border-color: var(--paper-checkbox-checkmark-color, white);\n    -webkit-transform-origin: 97% 86%;\n    transform-origin: 97% 86%;\n    box-sizing: content-box; /* protect against page-level box-sizing */\n  }\n\n  #checkmark:dir(rtl) {\n    -webkit-transform-origin: 50% 14%;\n    transform-origin: 50% 14%;\n  }\n\n  /* label */\n  #checkboxLabel {\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    padding-left: var(--paper-checkbox-label-spacing, 8px);\n    white-space: normal;\n    line-height: normal;\n    color: var(--paper-checkbox-label-color, var(--primary-text-color));\n    @apply --paper-checkbox-label;\n  }\n\n  :host([checked]) #checkboxLabel {\n    color: var(--paper-checkbox-label-checked-color, var(--paper-checkbox-label-color, var(--primary-text-color)));\n    @apply --paper-checkbox-label-checked;\n  }\n\n  #checkboxLabel:dir(rtl) {\n    padding-right: var(--paper-checkbox-label-spacing, 8px);\n    padding-left: 0;\n  }\n\n  #checkboxLabel[hidden] {\n    display: none;\n  }\n\n  /* disabled state */\n\n  :host([disabled]) #checkbox {\n    opacity: 0.5;\n    border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));\n  }\n\n  :host([disabled][checked]) #checkbox {\n    background-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));\n    opacity: 0.5;\n  }\n\n  :host([disabled]) #checkboxLabel  {\n    opacity: 0.65;\n  }\n\n  /* invalid state */\n  #checkbox.invalid:not(.checked) {\n    border-color: var(--paper-checkbox-error-color, var(--error-color));\n  }\n</style>\n\n<div id="checkboxContainer">\n  <div id="checkbox" class$="[[_computeCheckboxClass(checked, invalid)]]">\n    <div id="checkmark" class$="[[_computeCheckmarkClass(checked)]]"></div>\n  </div>\n</div>\n\n<div id="checkboxLabel"><slot></slot></div>',
      ],
      [
         '<style>\n  :host {\n    display: inline-block;\n    white-space: nowrap;\n    cursor: pointer;\n    --calculated-paper-checkbox-size: var(--paper-checkbox-size, 18px);\n    /* -1px is a sentinel for the default and is replaced in \\`attached\\`. */\n    --calculated-paper-checkbox-ink-size: var(--paper-checkbox-ink-size, -1px);\n    @apply --paper-font-common-base;\n    line-height: 0;\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  :host([hidden]) {\n    display: none !important;\n  }\n\n  :host(:focus) {\n    outline: none;\n  }\n\n  .hidden {\n    display: none;\n  }\n\n  #checkboxContainer {\n    display: inline-block;\n    position: relative;\n    width: var(--calculated-paper-checkbox-size);\n    height: var(--calculated-paper-checkbox-size);\n    min-width: var(--calculated-paper-checkbox-size);\n    margin: var(--paper-checkbox-margin, initial);\n    vertical-align: var(--paper-checkbox-vertical-align, middle);\n    background-color: var(--paper-checkbox-unchecked-background-color, transparent);\n  }\n\n  #ink {\n    position: absolute;\n\n    /* Center the ripple in the checkbox by negative offsetting it by\n     * (inkWidth - rippleWidth) / 2 */\n    top: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);\n    left: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);\n    width: var(--calculated-paper-checkbox-ink-size);\n    height: var(--calculated-paper-checkbox-ink-size);\n    color: var(--paper-checkbox-unchecked-ink-color, var(--primary-text-color));\n    opacity: 0.6;\n    pointer-events: none;\n  }\n\n  #ink:dir(rtl) {\n    right: calc(0px - (var(--calculated-paper-checkbox-ink-size) - var(--calculated-paper-checkbox-size)) / 2);\n    left: auto;\n  }\n\n  #ink[checked] {\n    color: var(--paper-checkbox-checked-ink-color, var(--primary-color));\n  }\n\n  #checkbox {\n    position: relative;\n    box-sizing: border-box;\n    height: 100%;\n    border: solid 2px;\n    border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));\n    border-radius: 2px;\n    pointer-events: none;\n    -webkit-transition: background-color 140ms, border-color 140ms;\n    transition: background-color 140ms, border-color 140ms;\n\n    -webkit-transition-duration: var(--paper-checkbox-animation-duration, 140ms);\n    transition-duration: var(--paper-checkbox-animation-duration, 140ms);\n  }\n\n  /* checkbox checked animations */\n  #checkbox.checked #checkmark {\n    -webkit-animation: checkmark-expand 140ms ease-out forwards;\n    animation: checkmark-expand 140ms ease-out forwards;\n\n    -webkit-animation-duration: var(--paper-checkbox-animation-duration, 140ms);\n    animation-duration: var(--paper-checkbox-animation-duration, 140ms);\n  }\n\n  @-webkit-keyframes checkmark-expand {\n    0% {\n      -webkit-transform: scale(0, 0) rotate(45deg);\n    }\n    100% {\n      -webkit-transform: scale(1, 1) rotate(45deg);\n    }\n  }\n\n  @keyframes checkmark-expand {\n    0% {\n      transform: scale(0, 0) rotate(45deg);\n    }\n    100% {\n      transform: scale(1, 1) rotate(45deg);\n    }\n  }\n\n  #checkbox.checked {\n    background-color: var(--paper-checkbox-checked-color, var(--primary-color));\n    border-color: var(--paper-checkbox-checked-color, var(--primary-color));\n  }\n\n  #checkmark {\n    position: absolute;\n    width: 36%;\n    height: 70%;\n    border-style: solid;\n    border-top: none;\n    border-left: none;\n    border-right-width: calc(2/15 * var(--calculated-paper-checkbox-size));\n    border-bottom-width: calc(2/15 * var(--calculated-paper-checkbox-size));\n    border-color: var(--paper-checkbox-checkmark-color, white);\n    -webkit-transform-origin: 97% 86%;\n    transform-origin: 97% 86%;\n    box-sizing: content-box; /* protect against page-level box-sizing */\n  }\n\n  #checkmark:dir(rtl) {\n    -webkit-transform-origin: 50% 14%;\n    transform-origin: 50% 14%;\n  }\n\n  /* label */\n  #checkboxLabel {\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    padding-left: var(--paper-checkbox-label-spacing, 8px);\n    white-space: normal;\n    line-height: normal;\n    color: var(--paper-checkbox-label-color, var(--primary-text-color));\n    @apply --paper-checkbox-label;\n  }\n\n  :host([checked]) #checkboxLabel {\n    color: var(--paper-checkbox-label-checked-color, var(--paper-checkbox-label-color, var(--primary-text-color)));\n    @apply --paper-checkbox-label-checked;\n  }\n\n  #checkboxLabel:dir(rtl) {\n    padding-right: var(--paper-checkbox-label-spacing, 8px);\n    padding-left: 0;\n  }\n\n  #checkboxLabel[hidden] {\n    display: none;\n  }\n\n  /* disabled state */\n\n  :host([disabled]) #checkbox {\n    opacity: 0.5;\n    border-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));\n  }\n\n  :host([disabled][checked]) #checkbox {\n    background-color: var(--paper-checkbox-unchecked-color, var(--primary-text-color));\n    opacity: 0.5;\n  }\n\n  :host([disabled]) #checkboxLabel  {\n    opacity: 0.65;\n  }\n\n  /* invalid state */\n  #checkbox.invalid:not(.checked) {\n    border-color: var(--paper-checkbox-error-color, var(--error-color));\n  }\n</style>\n\n<div id="checkboxContainer">\n  <div id="checkbox" class$="[[_computeCheckboxClass(checked, invalid)]]">\n    <div id="checkmark" class$="[[_computeCheckmarkClass(checked)]]"></div>\n  </div>\n</div>\n\n<div id="checkboxLabel"><slot></slot></div>',
      ]
   );
   N({
      _template: G(zi),
      is: "paper-checkbox",
      behaviors: [ui],
      hostAttributes: { role: "checkbox", "aria-checked": !1, tabindex: 0 },
      properties: {
         ariaActiveAttribute: { type: String, value: "aria-checked" },
      },
      attached: function () {
         hf(this, function () {
            if (
               "-1px" ===
               this.getComputedStyleValue(
                  "--calculated-paper-checkbox-ink-size"
               ).trim()
            ) {
               var a = this.getComputedStyleValue(
                     "--calculated-paper-checkbox-size"
                  ).trim(),
                  b = "px",
                  c = a.match(/[A-Za-z]+$/);
               null !== c && (b = c[0]);
               a = parseFloat(a);
               c = (8 / 3) * a;
               "px" === b && ((c = Math.floor(c)), c % 2 !== a % 2 && c++);
               this.updateStyles({ "--paper-checkbox-ink-size": c + b });
            }
         });
      },
      _computeCheckboxClass: function (a, b) {
         var c = "";
         a && (c += "checked ");
         b && (c += "invalid");
         return c;
      },
      _computeCheckmarkClass: function (a) {
         return a ? "" : "hidden";
      },
      _createRipple: function () {
         this._rippleContainer = this.$.checkboxContainer;
         return si._createRipple.call(this);
      },
      registered: function () {
         this._template.setAttribute("strip-whitespace", "");
      },
   });
   var Ai = x([
         '\n<custom-style>\n  <style is="custom-style">\n    [hidden] {\n      display: none !important;\n    }\n  </style>\n</custom-style>\n<custom-style>\n  <style is="custom-style">\n    html {\n\n      --layout: {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n      };\n\n      --layout-inline: {\n        display: -ms-inline-flexbox;\n        display: -webkit-inline-flex;\n        display: inline-flex;\n      };\n\n      --layout-horizontal: {\n        @apply --layout;\n\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n      };\n\n      --layout-horizontal-reverse: {\n        @apply --layout;\n\n        -ms-flex-direction: row-reverse;\n        -webkit-flex-direction: row-reverse;\n        flex-direction: row-reverse;\n      };\n\n      --layout-vertical: {\n        @apply --layout;\n\n        -ms-flex-direction: column;\n        -webkit-flex-direction: column;\n        flex-direction: column;\n      };\n\n      --layout-vertical-reverse: {\n        @apply --layout;\n\n        -ms-flex-direction: column-reverse;\n        -webkit-flex-direction: column-reverse;\n        flex-direction: column-reverse;\n      };\n\n      --layout-wrap: {\n        -ms-flex-wrap: wrap;\n        -webkit-flex-wrap: wrap;\n        flex-wrap: wrap;\n      };\n\n      --layout-wrap-reverse: {\n        -ms-flex-wrap: wrap-reverse;\n        -webkit-flex-wrap: wrap-reverse;\n        flex-wrap: wrap-reverse;\n      };\n\n      --layout-flex-auto: {\n        -ms-flex: 1 1 auto;\n        -webkit-flex: 1 1 auto;\n        flex: 1 1 auto;\n      };\n\n      --layout-flex-none: {\n        -ms-flex: none;\n        -webkit-flex: none;\n        flex: none;\n      };\n\n      --layout-flex: {\n        -ms-flex: 1 1 0.000000001px;\n        -webkit-flex: 1;\n        flex: 1;\n        -webkit-flex-basis: 0.000000001px;\n        flex-basis: 0.000000001px;\n      };\n\n      --layout-flex-2: {\n        -ms-flex: 2;\n        -webkit-flex: 2;\n        flex: 2;\n      };\n\n      --layout-flex-3: {\n        -ms-flex: 3;\n        -webkit-flex: 3;\n        flex: 3;\n      };\n\n      --layout-flex-4: {\n        -ms-flex: 4;\n        -webkit-flex: 4;\n        flex: 4;\n      };\n\n      --layout-flex-5: {\n        -ms-flex: 5;\n        -webkit-flex: 5;\n        flex: 5;\n      };\n\n      --layout-flex-6: {\n        -ms-flex: 6;\n        -webkit-flex: 6;\n        flex: 6;\n      };\n\n      --layout-flex-7: {\n        -ms-flex: 7;\n        -webkit-flex: 7;\n        flex: 7;\n      };\n\n      --layout-flex-8: {\n        -ms-flex: 8;\n        -webkit-flex: 8;\n        flex: 8;\n      };\n\n      --layout-flex-9: {\n        -ms-flex: 9;\n        -webkit-flex: 9;\n        flex: 9;\n      };\n\n      --layout-flex-10: {\n        -ms-flex: 10;\n        -webkit-flex: 10;\n        flex: 10;\n      };\n\n      --layout-flex-11: {\n        -ms-flex: 11;\n        -webkit-flex: 11;\n        flex: 11;\n      };\n\n      --layout-flex-12: {\n        -ms-flex: 12;\n        -webkit-flex: 12;\n        flex: 12;\n      };\n\n      /* alignment in cross axis */\n\n      --layout-start: {\n        -ms-flex-align: start;\n        -webkit-align-items: flex-start;\n        align-items: flex-start;\n      };\n\n      --layout-center: {\n        -ms-flex-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n      };\n\n      --layout-end: {\n        -ms-flex-align: end;\n        -webkit-align-items: flex-end;\n        align-items: flex-end;\n      };\n\n      --layout-baseline: {\n        -ms-flex-align: baseline;\n        -webkit-align-items: baseline;\n        align-items: baseline;\n      };\n\n      /* alignment in main axis */\n\n      --layout-start-justified: {\n        -ms-flex-pack: start;\n        -webkit-justify-content: flex-start;\n        justify-content: flex-start;\n      };\n\n      --layout-center-justified: {\n        -ms-flex-pack: center;\n        -webkit-justify-content: center;\n        justify-content: center;\n      };\n\n      --layout-end-justified: {\n        -ms-flex-pack: end;\n        -webkit-justify-content: flex-end;\n        justify-content: flex-end;\n      };\n\n      --layout-around-justified: {\n        -ms-flex-pack: distribute;\n        -webkit-justify-content: space-around;\n        justify-content: space-around;\n      };\n\n      --layout-justified: {\n        -ms-flex-pack: justify;\n        -webkit-justify-content: space-between;\n        justify-content: space-between;\n      };\n\n      --layout-center-center: {\n        @apply --layout-center;\n        @apply --layout-center-justified;\n      };\n\n      /* self alignment */\n\n      --layout-self-start: {\n        -ms-align-self: flex-start;\n        -webkit-align-self: flex-start;\n        align-self: flex-start;\n      };\n\n      --layout-self-center: {\n        -ms-align-self: center;\n        -webkit-align-self: center;\n        align-self: center;\n      };\n\n      --layout-self-end: {\n        -ms-align-self: flex-end;\n        -webkit-align-self: flex-end;\n        align-self: flex-end;\n      };\n\n      --layout-self-stretch: {\n        -ms-align-self: stretch;\n        -webkit-align-self: stretch;\n        align-self: stretch;\n      };\n\n      --layout-self-baseline: {\n        -ms-align-self: baseline;\n        -webkit-align-self: baseline;\n        align-self: baseline;\n      };\n\n      /* multi-line alignment in main axis */\n\n      --layout-start-aligned: {\n        -ms-flex-line-pack: start;  /* IE10 */\n        -ms-align-content: flex-start;\n        -webkit-align-content: flex-start;\n        align-content: flex-start;\n      };\n\n      --layout-end-aligned: {\n        -ms-flex-line-pack: end;  /* IE10 */\n        -ms-align-content: flex-end;\n        -webkit-align-content: flex-end;\n        align-content: flex-end;\n      };\n\n      --layout-center-aligned: {\n        -ms-flex-line-pack: center;  /* IE10 */\n        -ms-align-content: center;\n        -webkit-align-content: center;\n        align-content: center;\n      };\n\n      --layout-between-aligned: {\n        -ms-flex-line-pack: justify;  /* IE10 */\n        -ms-align-content: space-between;\n        -webkit-align-content: space-between;\n        align-content: space-between;\n      };\n\n      --layout-around-aligned: {\n        -ms-flex-line-pack: distribute;  /* IE10 */\n        -ms-align-content: space-around;\n        -webkit-align-content: space-around;\n        align-content: space-around;\n      };\n\n      /*******************************\n                Other Layout\n      *******************************/\n\n      --layout-block: {\n        display: block;\n      };\n\n      --layout-invisible: {\n        visibility: hidden !important;\n      };\n\n      --layout-relative: {\n        position: relative;\n      };\n\n      --layout-fit: {\n        position: absolute;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n      };\n\n      --layout-scroll: {\n        -webkit-overflow-scrolling: touch;\n        overflow: auto;\n      };\n\n      --layout-fullbleed: {\n        margin: 0;\n        height: 100vh;\n      };\n\n      /* fixed position */\n\n      --layout-fixed-top: {\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n      };\n\n      --layout-fixed-right: {\n        position: fixed;\n        top: 0;\n        right: 0;\n        bottom: 0;\n      };\n\n      --layout-fixed-bottom: {\n        position: fixed;\n        right: 0;\n        bottom: 0;\n        left: 0;\n      };\n\n      --layout-fixed-left: {\n        position: fixed;\n        top: 0;\n        bottom: 0;\n        left: 0;\n      };\n\n    }\n  </style>\n</custom-style>',
      ]),
      Bi = G(Ai);
   Bi.setAttribute("style", "display: none;");
   document.head.appendChild(Bi.content);
   var Ci = document.createElement("style");
   Ci.textContent = "[hidden] { display: none !important; }";
   document.head.appendChild(Ci);
   var Di = x([
         "\n    <style>\n      :host {\n        @apply --layout-inline;\n        @apply --layout-center-center;\n        position: relative;\n\n        vertical-align: middle;\n\n        fill: var(--iron-icon-fill-color, currentcolor);\n        stroke: var(--iron-icon-stroke-color, none);\n\n        width: var(--iron-icon-width, 24px);\n        height: var(--iron-icon-height, 24px);\n        @apply --iron-icon;\n      }\n\n      :host([hidden]) {\n        display: none;\n      }\n    </style>\n",
      ]),
      Ei = new ci({ type: "iconset" });
   N({
      _template: G(Di),
      is: "iron-icon",
      properties: {
         icon: { type: String },
         theme: { type: String },
         src: { type: String },
      },
      observers: [
         "_updateIcon(isAttached)",
         "_updateIcon(theme, isAttached)",
         "_srcChanged(src, isAttached)",
         "_iconChanged(icon, isAttached)",
      ],
      da: "icons",
      _iconChanged: function (a) {
         a = (a || "").split(":");
         this.j = a.pop();
         this.ba = a.pop() || this.da;
         this._updateIcon();
      },
      _srcChanged: function () {
         this._updateIcon();
      },
      _usesIconset: function () {
         return this.icon || !this.src;
      },
      _updateIcon: function () {
         this._usesIconset()
            ? (this.g && this.g.parentNode && L(this.root).removeChild(this.g),
              "" === this.j
                 ? this.h && this.h.removeIcon(this)
                 : this.ba &&
                   ((this.h = Ei.byKey(this.ba))
                      ? (this.h.applyIcon(this, this.j, this.theme),
                        this.unlisten(
                           window,
                           "iron-iconset-added",
                           "_updateIcon"
                        ))
                      : this.listen(
                           window,
                           "iron-iconset-added",
                           "_updateIcon"
                        )))
            : (this.h && this.h.removeIcon(this),
              this.g ||
                 ((this.g = document.createElement("img")),
                 (this.g.style.width = "100%"),
                 (this.g.style.height = "100%"),
                 (this.g.draggable = !1)),
              (this.g.src = this.src),
              L(this.root).appendChild(this.g));
      },
   });
   N({
      is: "iron-iconset-svg",
      _template: null,
      properties: {
         name: { type: String, observer: "_nameChanged" },
         size: { type: Number, value: 24 },
         rtlMirroring: { type: Boolean, value: !1 },
         useGlobalRtlAttribute: { type: Boolean, value: !1 },
      },
      created: function () {
         this.j = new ci({ type: "iconset", key: null, value: null });
      },
      attached: function () {
         this.style.display = "none";
      },
      getIconNames: function () {
         this.g = this._createIconMap();
         return Object.keys(this.g).map(function (a) {
            return this.name + ":" + a;
         }, this);
      },
      applyIcon: function (a, b) {
         this.removeIcon(a);
         if (
            (b = this._cloneIcon(b, this.rtlMirroring && this._targetIsRTL(a)))
         ) {
            var c = L(a.root || a);
            c.insertBefore(b, c.childNodes[0]);
            return (a.m = b);
         }
         return null;
      },
      removeIcon: function (a) {
         a.m && (L(a.root || a).removeChild(a.m), (a.m = null));
      },
      _targetIsRTL: function (a) {
         null == this.h &&
            (this.useGlobalRtlAttribute
               ? (this.h =
                    "rtl" ===
                    (document.body && document.body.hasAttribute("dir")
                       ? document.body
                       : document.documentElement
                    ).getAttribute("dir"))
               : (a && a.nodeType !== Node.ELEMENT_NODE && (a = a.host),
                 (this.h =
                    a && "rtl" === window.getComputedStyle(a).direction)));
         return this.h;
      },
      _nameChanged: function () {
         this.j.value = null;
         this.j.key = this.name;
         this.j.value = this;
         this.async(function () {
            this.fire("iron-iconset-added", this, { node: window });
         });
      },
      _createIconMap: function () {
         var a = Object.create(null);
         L(this)
            .querySelectorAll("[id]")
            .forEach(function (b) {
               a[b.id] = b;
            });
         return a;
      },
      _cloneIcon: function (a, b) {
         this.g = this.g || this._createIconMap();
         return this._prepareSvgClone(this.g[a], this.size, b);
      },
      _prepareSvgClone: function (a, b, c) {
         if (a) {
            a = a.cloneNode(!0);
            var d = document.createElementNS(
               "http://www.w3.org/2000/svg",
               "svg"
            );
            b = a.getAttribute("viewBox") || "0 0 " + b + " " + b;
            var e =
               "pointer-events: none; display: block; width: 100%; height: 100%;";
            c &&
               a.hasAttribute("mirror-in-rtl") &&
               (e +=
                  "-webkit-transform:scale(-1,1);transform:scale(-1,1);transform-origin:center;");
            d.setAttribute("viewBox", b);
            d.setAttribute("preserveAspectRatio", "xMidYMid meet");
            d.setAttribute("focusable", "false");
            d.style && (d.style.cssText = e);
            d.appendChild(a).removeAttribute("id");
            return d;
         }
         return null;
      },
   }); /*

Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
   var Fi = x([
         '<iron-iconset-svg name="paper-dropdown-menu" size="24">\n<svg><defs>\n<g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>\n</defs></svg>\n</iron-iconset-svg>',
      ]),
      Gi = G(Fi);
   Gi.setAttribute("style", "display: none;");
   document.head.appendChild(Gi.content);
   var Hi = ea(
         [
            '<dom-module id="paper-dropdown-menu-shared-styles">\n  <template>\n    <style>\n      :host {\n        display: inline-block;\n        position: relative;\n        text-align: left;\n\n        /* NOTE(cdata): Both values are needed, since some phones require the\n         * value to be `transparent`.\n         */\n        -webkit-tap-highlight-color: rgba(0,0,0,0);\n        -webkit-tap-highlight-color: transparent;\n\n        --paper-input-container-input: {\n          overflow: hidden;\n          white-space: nowrap;\n          text-overflow: ellipsis;\n          max-width: 100%;\n          box-sizing: border-box;\n          cursor: pointer;\n        };\n\n        @apply --paper-dropdown-menu;\n      }\n\n      /* paper-dropdown-menu and paper-dropdown-menu-light both delegate focus\n       * to other internal elements which manage focus styling. */\n      :host(:focus) {\n        outline: none;\n      }\n\n      :host(:dir(rtl)) {\n        text-align: right;\n\n        @apply(--paper-dropdown-menu);\n      }\n\n      :host([disabled]) {\n        @apply --paper-dropdown-menu-disabled;\n      }\n\n      :host([noink]) paper-ripple {\n        display: none;\n      }\n\n      :host([no-label-float]) paper-ripple {\n        top: 8px;\n      }\n\n      paper-ripple {\n        top: 12px;\n        left: 0px;\n        bottom: 8px;\n        right: 0px;\n\n        @apply --paper-dropdown-menu-ripple;\n      }\n\n      paper-menu-button {\n        display: block;\n        padding: 0;\n\n        @apply --paper-dropdown-menu-button;\n      }\n\n      paper-input {\n        @apply --paper-dropdown-menu-input;\n      }\n\n      iron-icon {\n        color: var(--disabled-text-color);\n\n        @apply --paper-dropdown-menu-icon;\n      }\n    </style>\n  </template>\n</dom-module>',
         ],
         [
            '<dom-module id="paper-dropdown-menu-shared-styles">\n  <template>\n    <style>\n      :host {\n        display: inline-block;\n        position: relative;\n        text-align: left;\n\n        /* NOTE(cdata): Both values are needed, since some phones require the\n         * value to be \\`transparent\\`.\n         */\n        -webkit-tap-highlight-color: rgba(0,0,0,0);\n        -webkit-tap-highlight-color: transparent;\n\n        --paper-input-container-input: {\n          overflow: hidden;\n          white-space: nowrap;\n          text-overflow: ellipsis;\n          max-width: 100%;\n          box-sizing: border-box;\n          cursor: pointer;\n        };\n\n        @apply --paper-dropdown-menu;\n      }\n\n      /* paper-dropdown-menu and paper-dropdown-menu-light both delegate focus\n       * to other internal elements which manage focus styling. */\n      :host(:focus) {\n        outline: none;\n      }\n\n      :host(:dir(rtl)) {\n        text-align: right;\n\n        @apply(--paper-dropdown-menu);\n      }\n\n      :host([disabled]) {\n        @apply --paper-dropdown-menu-disabled;\n      }\n\n      :host([noink]) paper-ripple {\n        display: none;\n      }\n\n      :host([no-label-float]) paper-ripple {\n        top: 8px;\n      }\n\n      paper-ripple {\n        top: 12px;\n        left: 0px;\n        bottom: 8px;\n        right: 0px;\n\n        @apply --paper-dropdown-menu-ripple;\n      }\n\n      paper-menu-button {\n        display: block;\n        padding: 0;\n\n        @apply --paper-dropdown-menu-button;\n      }\n\n      paper-input {\n        @apply --paper-dropdown-menu-input;\n      }\n\n      iron-icon {\n        color: var(--disabled-text-color);\n\n        @apply --paper-dropdown-menu-icon;\n      }\n    </style>\n  </template>\n</dom-module>',
         ]
      ),
      Ii = G(Hi);
   Ii.setAttribute("style", "display: none;");
   document.head.appendChild(Ii.content);
   var Ji = x([
      '\n    <style>\n      :host {\n        display: inline-block;\n        position: fixed;\n        clip: rect(0px,0px,0px,0px);\n      }\n    </style>\n    <div aria-live$="[[mode]]">[[_text]]</div>\n',
   ]);
   function Ki() {}
   Ki = N({
      _template: G(Ji),
      is: "iron-a11y-announcer",
      properties: {
         mode: { type: String, value: "polite" },
         timeout: { type: Number, value: 150 },
         _text: { type: String, value: "" },
      },
      created: function () {
         Ki.instance || (Ki.instance = this);
         document.addEventListener(
            "iron-announce",
            this._onIronAnnounce.bind(this)
         );
      },
      announce: function (a) {
         this._text = "";
         this.async(function () {
            this._text = a;
         }, this.timeout);
      },
      _onIronAnnounce: function (a) {
         a.detail && a.detail.text && this.announce(a.detail.text);
      },
   });
   Ki.instance = null;
   function Li() {
      Ki.instance ||
         (Ki.instance = document.createElement("iron-a11y-announcer"));
      document.body
         ? document.body.appendChild(Ki.instance)
         : document.addEventListener("load", function () {
              document.body.appendChild(Ki.instance);
           });
   }
   var Mi = x([
      '\n    <style>\n      :host {\n        display: inline-block;\n      }\n    </style>\n    <slot id="content"></slot>\n',
   ]);
   N({
      _template: G(Mi),
      is: "iron-input",
      behaviors: [fi],
      properties: {
         bindValue: { type: String, value: "" },
         value: { type: String, computed: "_computeValue(bindValue)" },
         allowedPattern: { type: String },
         autoValidate: { type: Boolean, value: !1 },
         _inputElement: Object,
      },
      observers: ["_bindValueChanged(bindValue, _inputElement)"],
      listeners: { input: "_onInput", keypress: "_onKeypress" },
      created: function () {
         Li();
         this.j = "";
         this.g = !1;
      },
      attached: function () {
         this.la = L(this).observeNodes(
            function () {
               this._initSlottedInput();
            }.bind(this)
         );
      },
      detached: function () {
         this.la && (L(this).unobserveNodes(this.la), (this.la = null));
      },
      get aa() {
         return this._inputElement;
      },
      _initSlottedInput: function () {
         this._inputElement = this.getEffectiveChildren()[0];
         this.aa && this.aa.value && (this.bindValue = this.aa.value);
         this.fire("iron-input-ready");
      },
      get h() {
         if (this.allowedPattern) var a = new RegExp(this.allowedPattern);
         else
            switch (this.aa.type) {
               case "number":
                  a = /[0-9.,e-]/;
            }
         return a;
      },
      _bindValueChanged: function (a, b) {
         b &&
            (void 0 === a
               ? (b.value = null)
               : a !== b.value && (this.aa.value = a),
            this.autoValidate && this.validate(),
            this.fire("bind-value-changed", { value: a }));
      },
      _onInput: function () {
         !this.allowedPattern ||
            this.g ||
            this._checkPatternValidity() ||
            (this._announceInvalidCharacter(
               "Invalid string of characters not entered."
            ),
            (this.aa.value = this.j));
         this.bindValue = this.j = this.aa.value;
         this.g = !1;
      },
      _isPrintable: function (a) {
         var b =
            19 == a.keyCode ||
            20 == a.keyCode ||
            45 == a.keyCode ||
            46 == a.keyCode ||
            144 == a.keyCode ||
            145 == a.keyCode ||
            (32 < a.keyCode && 41 > a.keyCode) ||
            (111 < a.keyCode && 124 > a.keyCode);
         return (
            !(
               8 == a.keyCode ||
               9 == a.keyCode ||
               13 == a.keyCode ||
               27 == a.keyCode
            ) && !(0 == a.charCode && b)
         );
      },
      _onKeypress: function (a) {
         if (this.allowedPattern || "number" === this.aa.type) {
            var b = this.h;
            if (b && !(a.metaKey || a.ctrlKey || a.altKey)) {
               this.g = !0;
               var c = String.fromCharCode(a.charCode);
               this._isPrintable(a) &&
                  !b.test(c) &&
                  (a.preventDefault(),
                  this._announceInvalidCharacter(
                     "Invalid character " + c + " not entered."
                  ));
            }
         }
      },
      _checkPatternValidity: function () {
         var a = this.h;
         if (!a) return !0;
         for (var b = 0; b < this.aa.value.length; b++)
            if (!a.test(this.aa.value[b])) return !1;
         return !0;
      },
      validate: function () {
         if (!this.aa) return (this.invalid = !1), !0;
         var a = this.aa.checkValidity();
         a &&
            (this.required && "" === this.bindValue
               ? (a = !1)
               : this.hasValidator() &&
                 (a = fi.validate.call(this, this.bindValue)));
         this.invalid = !a;
         this.fire("iron-input-validate");
         return a;
      },
      _announceInvalidCharacter: function (a) {
         this.fire("iron-announce", { text: a });
      },
      _computeValue: function (a) {
         return a;
      },
   });
   var Ni = 1,
      Oi = 1,
      Pi = 1,
      Qi = [
         ii,
         Ra,
         {
            properties: {
               label: { type: String },
               value: { notify: !0, type: String },
               disabled: { type: Boolean, value: !1 },
               invalid: { type: Boolean, value: !1, notify: !0 },
               allowedPattern: { type: String },
               type: { type: String },
               list: { type: String },
               pattern: { type: String },
               required: { type: Boolean, value: !1 },
               errorMessage: { type: String },
               charCounter: { type: Boolean, value: !1 },
               noLabelFloat: { type: Boolean, value: !1 },
               alwaysFloatLabel: { type: Boolean, value: !1 },
               autoValidate: { type: Boolean, value: !1 },
               validator: { type: String },
               autocomplete: { type: String, value: "off" },
               autofocus: { type: Boolean, observer: "_autofocusChanged" },
               inputmode: { type: String },
               minlength: { type: Number },
               maxlength: { type: Number },
               min: { type: String },
               max: { type: String },
               step: { type: String },
               name: { type: String },
               placeholder: { type: String, value: "" },
               readonly: { type: Boolean, value: !1 },
               size: { type: Number },
               autocapitalize: { type: String, value: "none" },
               autocorrect: { type: String, value: "off" },
               autosave: { type: String },
               results: { type: Number },
               accept: { type: String },
               multiple: { type: Boolean },
               _ariaDescribedBy: { type: String, value: "" },
               _ariaLabelledBy: { type: String, value: "" },
               _inputId: { type: String, value: "" },
            },
            listeners: { "addon-attached": "_onAddonAttached" },
            ka: { "shift+tab:keydown": "_onShiftTabDown" },
            hostAttributes: { tabindex: 0 },
            get aa() {
               this.$ || (this.$ = {});
               this.$.input ||
                  (this._generateInputId(),
                  (this.$.input = this.$$("#" + this._inputId)));
               return this.$.input;
            },
            get ec() {
               return this.aa;
            },
            created: function () {
               this.rg =
                  "date datetime datetime-local month time week file".split(
                     " "
                  );
            },
            attached: function () {
               this._updateAriaLabelledBy();
               !H &&
                  this.aa &&
                  -1 !== this.rg.indexOf(this.aa.type) &&
                  (this.alwaysFloatLabel = !0);
            },
            _appendStringWithSpace: function (a, b) {
               a ? (a = a + " " + b) : (a = b);
               return a;
            },
            _onAddonAttached: function (a) {
               a = L(a).yc;
               if (a.id)
                  this._ariaDescribedBy = this._appendStringWithSpace(
                     this._ariaDescribedBy,
                     a.id
                  );
               else {
                  var b = "paper-input-add-on-" + Oi++;
                  a.id = b;
                  this._ariaDescribedBy = this._appendStringWithSpace(
                     this._ariaDescribedBy,
                     b
                  );
               }
            },
            validate: function () {
               return this.aa.validate();
            },
            _focusBlurHandler: function (a) {
               ii._focusBlurHandler.call(this, a);
               this.focused && !this.jc && this.ec && this.ec.focus();
            },
            _onShiftTabDown: function () {
               var a = this.getAttribute("tabindex");
               this.jc = !0;
               this.setAttribute("tabindex", "-1");
               this.async(function () {
                  this.setAttribute("tabindex", a);
                  this.jc = !1;
               }, 1);
            },
            _handleAutoValidate: function () {
               this.autoValidate && this.validate();
            },
            updateValueAndPreserveCaret: function (a) {
               try {
                  var b = this.aa.selectionStart;
                  this.value = a;
                  this.aa.selectionStart = b;
                  this.aa.selectionEnd = b;
               } catch (c) {
                  this.value = a;
               }
            },
            _computeAlwaysFloatLabel: function (a, b) {
               return b || a;
            },
            _updateAriaLabelledBy: function () {
               var a = L(this.root).querySelector("label");
               if (a) {
                  if (a.id) var b = a.id;
                  else (b = "paper-input-label-" + Ni++), (a.id = b);
                  this._ariaLabelledBy = b;
               } else this._ariaLabelledBy = "";
            },
            _generateInputId: function () {
               (this._inputId && "" !== this._inputId) ||
                  (this._inputId = "input-" + Pi++);
            },
            _onChange: function (a) {
               this.shadowRoot &&
                  this.fire(
                     a.type,
                     { yd: a },
                     {
                        node: this,
                        bubbles: a.bubbles,
                        cancelable: a.cancelable,
                     }
                  );
            },
            _autofocusChanged: function () {
               if (this.autofocus && this.ec) {
                  var a = document.activeElement;
                  (a instanceof HTMLElement &&
                     a !== document.body &&
                     a !== document.documentElement) ||
                     this.ec.focus();
               }
            },
         },
      ];
   var Ri = {
      attached: function () {
         this.fire("addon-attached");
      },
      update: function () {},
   };
   if (!window.polymerSkipLoadingFontRoboto)
      for (
         var Si = y([
               "https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,500,500italic,700,700italic",
               "https://fonts.googleapis.com/css?family=Roboto+Mono:400,700",
            ]),
            Ti = Si.next();
         !Ti.done;
         Ti = Si.next()
      ) {
         var Ui = Ti.value,
            Vi = document.createElement("link");
         Vi.rel = "stylesheet";
         Vi.href = Ui;
         document.head.appendChild(Vi);
      }
   var Wi = x([
         "<custom-style>\n  <style is=\"custom-style\">\n    html {\n\n      /* Shared Styles */\n      --paper-font-common-base: {\n        font-family: 'Roboto', 'Noto', sans-serif;\n        -webkit-font-smoothing: antialiased;\n      };\n\n      --paper-font-common-code: {\n        font-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;\n        -webkit-font-smoothing: antialiased;\n      };\n\n      --paper-font-common-expensive-kerning: {\n        text-rendering: optimizeLegibility;\n      };\n\n      --paper-font-common-nowrap: {\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      };\n\n      /* Material Font Styles */\n\n      --paper-font-display4: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 112px;\n        font-weight: 300;\n        letter-spacing: -.044em;\n        line-height: 120px;\n      };\n\n      --paper-font-display3: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 56px;\n        font-weight: 400;\n        letter-spacing: -.026em;\n        line-height: 60px;\n      };\n\n      --paper-font-display2: {\n        @apply --paper-font-common-base;\n\n        font-size: 45px;\n        font-weight: 400;\n        letter-spacing: -.018em;\n        line-height: 48px;\n      };\n\n      --paper-font-display1: {\n        @apply --paper-font-common-base;\n\n        font-size: 34px;\n        font-weight: 400;\n        letter-spacing: -.01em;\n        line-height: 40px;\n      };\n\n      --paper-font-headline: {\n        @apply --paper-font-common-base;\n\n        font-size: 24px;\n        font-weight: 400;\n        letter-spacing: -.012em;\n        line-height: 32px;\n      };\n\n      --paper-font-title: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 20px;\n        font-weight: 500;\n        line-height: 28px;\n      };\n\n      --paper-font-subhead: {\n        @apply --paper-font-common-base;\n\n        font-size: 16px;\n        font-weight: 400;\n        line-height: 24px;\n      };\n\n      --paper-font-body2: {\n        @apply --paper-font-common-base;\n\n        font-size: 14px;\n        font-weight: 500;\n        line-height: 24px;\n      };\n\n      --paper-font-body1: {\n        @apply --paper-font-common-base;\n\n        font-size: 14px;\n        font-weight: 400;\n        line-height: 20px;\n      };\n\n      --paper-font-caption: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 12px;\n        font-weight: 400;\n        letter-spacing: 0.011em;\n        line-height: 20px;\n      };\n\n      --paper-font-menu: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 13px;\n        font-weight: 500;\n        line-height: 24px;\n      };\n\n      --paper-font-button: {\n        @apply --paper-font-common-base;\n        @apply --paper-font-common-nowrap;\n\n        font-size: 14px;\n        font-weight: 500;\n        letter-spacing: 0.018em;\n        line-height: 24px;\n        text-transform: uppercase;\n      };\n\n      --paper-font-code2: {\n        @apply --paper-font-common-code;\n\n        font-size: 14px;\n        font-weight: 700;\n        line-height: 20px;\n      };\n\n      --paper-font-code1: {\n        @apply --paper-font-common-code;\n\n        font-size: 14px;\n        font-weight: 500;\n        line-height: 20px;\n      };\n\n    }\n\n  </style>\n</custom-style>",
      ]),
      Xi = G(Wi);
   Xi.setAttribute("style", "display: none;");
   document.head.appendChild(Xi.content);
   var Yi = x([
      "\n    <style>\n      :host {\n        display: inline-block;\n        float: right;\n\n        @apply --paper-font-caption;\n        @apply --paper-input-char-counter;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      :host(:dir(rtl)) {\n        float: left;\n      }\n    </style>\n\n    <span>[[_charCounterStr]]</span>\n",
   ]);
   N({
      _template: G(Yi),
      is: "paper-input-char-counter",
      behaviors: [Ri],
      properties: { _charCounterStr: { type: String, value: "0" } },
      update: function (a) {
         if (a.aa) {
            a.value = a.value || "";
            var b = a.value.toString().length.toString();
            a.aa.hasAttribute("maxlength") &&
               (b += "/" + a.aa.getAttribute("maxlength"));
            this._charCounterStr = b;
         }
      },
   });
   var Zi = x([
         '\n<custom-style>\n  <style is="custom-style">\n    html {\n      --paper-input-container-shared-input-style: {\n        position: relative; /* to make a stacking context */\n        outline: none;\n        box-shadow: none;\n        padding: 0;\n        margin: 0;\n        width: 100%;\n        max-width: 100%;\n        background: transparent;\n        border: none;\n        color: var(--paper-input-container-input-color, var(--primary-text-color));\n        -webkit-appearance: none;\n        text-align: inherit;\n        vertical-align: var(--paper-input-container-input-align, bottom);\n\n        @apply --paper-font-subhead;\n      };\n    }\n  </style>\n</custom-style>\n',
      ]),
      $i = x([
         '\n    <style>\n      :host {\n        display: block;\n        padding: 8px 0;\n        @apply --paper-input-container;\n      }\n\n      :host([inline]) {\n        display: inline-block;\n      }\n\n      :host([disabled]) {\n        pointer-events: none;\n        opacity: 0.33;\n\n        @apply --paper-input-container-disabled;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n\n      .floated-label-placeholder {\n        display: var(--paper-input-container-floated-label-placeholder-display, block);\n        @apply --paper-font-caption;\n      }\n\n      .underline {\n        height: var(--paper-input-container-underline-wrapper-height, 2px);\n        position: relative;\n      }\n\n      .focused-line {\n        @apply --layout-fit;\n        border-bottom:\n            var(--paper-input-container-underline-focus-height, 2px)\n            solid\n            var(--paper-input-container-underline-focus-color,\n                var(--paper-input-container-focus-color,\n                var(--primary-color)));\n\n        -webkit-transform-origin: center center;\n        transform-origin: center center;\n        -webkit-transform: scale3d(0,1,1);\n        transform: scale3d(0,1,1);\n        display: var(--paper-input-container-underline-focus-display, block);\n\n        @apply --paper-input-container-underline-focus;\n      }\n\n      .underline.is-highlighted .focused-line {\n        -webkit-transform: none;\n        transform: none;\n        -webkit-transition: -webkit-transform 0.25s;\n        transition: transform 0.25s;\n\n        @apply --paper-transition-easing;\n      }\n\n      .underline.is-invalid .focused-line {\n        border-bottom:\n            var(--paper-input-container-underline-focus-height, 2px)\n            solid\n            var(--paper-input-container-underline-invalid-focus-color,\n                var(--paper-input-container-invalid-color,\n                var(--error-color)));\n        -webkit-transform: none;\n        transform: none;\n        -webkit-transition: -webkit-transform 0.25s;\n        transition: transform 0.25s;\n        display: var(--paper-input-container-underline-focus-display, block);\n\n        @apply --paper-transition-easing;\n      }\n\n      .unfocused-line {\n        @apply --layout-fit;\n        border-bottom:\n            var(--paper-input-container-underline-height, 1px)\n            solid\n            var(--paper-input-container-underline-color,\n                var(--paper-input-container-color,\n                var(--secondary-text-color)));\n        height: var(--paper-input-container-underline-legacy-height);\n        display: var(--paper-input-container-underline-display, block);\n\n        @apply --paper-input-container-underline;\n      }\n\n      :host([disabled]) .unfocused-line {\n        border-bottom:\n            var(--paper-input-container-underline-height, 1px)\n            dashed\n            var(--paper-input-container-underline-color,\n                var(--paper-input-container-color,\n                var(--secondary-text-color)));\n        display: var(--paper-input-container-underline-disabled-display, block);\n\n        @apply --paper-input-container-underline-disabled;\n      }\n\n      .input-wrapper {\n        @apply --layout-horizontal;\n        @apply --layout-center;\n        position: relative;\n      }\n\n      .input-content {\n        @apply --layout-flex-auto;\n        @apply --layout-relative;\n        max-width: 100%;\n      }\n\n      .input-content ::slotted(label),\n      .input-content ::slotted(.paper-input-label) {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        font: inherit;\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n        -webkit-transition: -webkit-transform 0.25s, width 0.25s;\n        transition: transform 0.25s, width 0.25s;\n        -webkit-transform-origin: left top;\n        transform-origin: left top;\n        /* Fix for safari not focusing 0-height date/time inputs with -webkit-apperance: none; */\n        min-height: 1px;\n\n        @apply --paper-font-common-nowrap;\n        @apply --paper-font-subhead;\n        @apply --paper-input-container-label;\n        @apply --paper-transition-easing;\n      }\n\n\n      .input-content ::slotted(label):before,\n      .input-content ::slotted(.paper-input-label):before {\n        @apply --paper-input-container-label-before;\n      }\n\n      .input-content ::slotted(label):after,\n      .input-content ::slotted(.paper-input-label):after {\n        @apply --paper-input-container-label-after;\n      }\n\n      .input-content.label-is-floating ::slotted(label),\n      .input-content.label-is-floating ::slotted(.paper-input-label) {\n        -webkit-transform: translateY(-75%) scale(0.75);\n        transform: translateY(-75%) scale(0.75);\n\n        /* Since we scale to 75/100 of the size, we actually have 100/75 of the\n        original space now available */\n        width: 133%;\n\n        @apply --paper-input-container-label-floating;\n      }\n\n      :host(:dir(rtl)) .input-content.label-is-floating ::slotted(label),\n      :host(:dir(rtl)) .input-content.label-is-floating ::slotted(.paper-input-label) {\n        right: 0;\n        left: auto;\n        -webkit-transform-origin: right top;\n        transform-origin: right top;\n      }\n\n      .input-content.label-is-highlighted ::slotted(label),\n      .input-content.label-is-highlighted ::slotted(.paper-input-label) {\n        color: var(--paper-input-container-focus-color, var(--primary-color));\n\n        @apply --paper-input-container-label-focus;\n      }\n\n      .input-content.is-invalid ::slotted(label),\n      .input-content.is-invalid ::slotted(.paper-input-label) {\n        color: var(--paper-input-container-invalid-color, var(--error-color));\n      }\n\n      .input-content.label-is-hidden ::slotted(label),\n      .input-content.label-is-hidden ::slotted(.paper-input-label) {\n        visibility: hidden;\n      }\n\n      .input-content ::slotted(input),\n      .input-content ::slotted(iron-input),\n      .input-content ::slotted(textarea),\n      .input-content ::slotted(iron-autogrow-textarea),\n      .input-content ::slotted(.paper-input-input) {\n        @apply --paper-input-container-shared-input-style;\n        /* The apply shim doesn\'t apply the nested color custom property,\n          so we have to re-apply it here. */\n        color: var(--paper-input-container-input-color, var(--primary-text-color));\n        @apply --paper-input-container-input;\n      }\n\n      .input-content ::slotted(input)::-webkit-outer-spin-button,\n      .input-content ::slotted(input)::-webkit-inner-spin-button {\n        @apply --paper-input-container-input-webkit-spinner;\n      }\n\n      .input-content.focused ::slotted(input),\n      .input-content.focused ::slotted(iron-input),\n      .input-content.focused ::slotted(textarea),\n      .input-content.focused ::slotted(iron-autogrow-textarea),\n      .input-content.focused ::slotted(.paper-input-input) {\n        @apply --paper-input-container-input-focus;\n      }\n\n      .input-content.is-invalid ::slotted(input),\n      .input-content.is-invalid ::slotted(iron-input),\n      .input-content.is-invalid ::slotted(textarea),\n      .input-content.is-invalid ::slotted(iron-autogrow-textarea),\n      .input-content.is-invalid ::slotted(.paper-input-input) {\n        @apply --paper-input-container-input-invalid;\n      }\n\n      .prefix ::slotted(*) {\n        display: inline-block;\n        @apply --paper-font-subhead;\n        @apply --layout-flex-none;\n        @apply --paper-input-prefix;\n      }\n\n      .suffix ::slotted(*) {\n        display: inline-block;\n        @apply --paper-font-subhead;\n        @apply --layout-flex-none;\n\n        @apply --paper-input-suffix;\n      }\n\n      /* Firefox sets a min-width on the input, which can cause layout issues */\n      .input-content ::slotted(input) {\n        min-width: 0;\n      }\n\n      .input-content ::slotted(textarea) {\n        resize: none;\n      }\n\n      .add-on-content {\n        position: relative;\n      }\n\n      .add-on-content.is-invalid ::slotted(*) {\n        color: var(--paper-input-container-invalid-color, var(--error-color));\n      }\n\n      .add-on-content.is-highlighted ::slotted(*) {\n        color: var(--paper-input-container-focus-color, var(--primary-color));\n      }\n    </style>\n\n    <div class="floated-label-placeholder" aria-hidden="true" hidden="[[noLabelFloat]]">&nbsp;</div>\n\n    <div class="input-wrapper">\n      <span class="prefix"><slot name="prefix"></slot></span>\n\n      <div class$="[[_computeInputContentClass(noLabelFloat,alwaysFloatLabel,focused,invalid,_inputHasContent)]]" id="labelAndInputContainer">\n        <slot name="label"></slot>\n        <slot name="input"></slot><slot name="after-input"></slot>\n      </div>\n\n      <span class="suffix"><slot name="suffix"></slot></span>\n    </div>\n\n    <div class$="[[_computeUnderlineClass(focused,invalid)]]">\n      <div class="unfocused-line"></div>\n      <div class="focused-line"></div>\n    </div>\n\n    <div class$="[[_computeAddOnContentClass(focused,invalid)]]">\n      <slot name="add-on"></slot>\n    </div>\n',
      ]),
      aj = G(Zi);
   aj.setAttribute("style", "display: none;");
   document.head.appendChild(aj.content);
   N({
      _template: G($i),
      is: "paper-input-container",
      properties: {
         noLabelFloat: { type: Boolean, value: !1 },
         alwaysFloatLabel: { type: Boolean, value: !1 },
         attrForValue: { type: String, value: "bind-value" },
         autoValidate: { type: Boolean, value: !1 },
         invalid: { observer: "_invalidChanged", type: Boolean, value: !1 },
         focused: { readOnly: !0, type: Boolean, value: !1, notify: !0 },
         noUnfloatedLabelError: { type: Boolean, value: !1 },
         _addons: { type: Array },
         _inputHasContent: { type: Boolean, value: !1 },
         _inputSelector: {
            type: String,
            value: "input,iron-input,textarea,.paper-input-input",
         },
         _boundOnFocus: {
            type: Function,
            value: function () {
               return this._onFocus.bind(this);
            },
         },
         _boundOnBlur: {
            type: Function,
            value: function () {
               return this._onBlur.bind(this);
            },
         },
         _boundOnInput: {
            type: Function,
            value: function () {
               return this._onInput.bind(this);
            },
         },
         _boundValueChanged: {
            type: Function,
            value: function () {
               return this._onValueChanged.bind(this);
            },
         },
      },
      listeners: {
         "addon-attached": "_onAddonAttached",
         "iron-input-validate": "_onIronInputValidate",
      },
      get ba() {
         return this.attrForValue + "-changed";
      },
      get j() {
         return Mb(this.attrForValue);
      },
      get _inputElement() {
         return L(this).querySelector(this._inputSelector);
      },
      get g() {
         return this._inputElement[this.j] || this._inputElement.value;
      },
      ready: function () {
         this.h = !0;
         this._addons || (this._addons = []);
         this.addEventListener("focus", this._boundOnFocus, !0);
         this.addEventListener("blur", this._boundOnBlur, !0);
      },
      attached: function () {
         this.attrForValue
            ? this._inputElement.addEventListener(
                 this.ba,
                 this._boundValueChanged
              )
            : this.addEventListener("input", this._onInput);
         this.g && "" != this.g
            ? this._handleValueAndAutoValidate(this._inputElement)
            : this._handleValue(this._inputElement);
      },
      _onAddonAttached: function (a) {
         this._addons || (this._addons = []);
         a = a.target;
         -1 === this._addons.indexOf(a) &&
            (this._addons.push(a),
            this.isAttached && this._handleValue(this._inputElement));
      },
      _onFocus: function () {
         this._setFocused(!0);
      },
      _onBlur: function () {
         this._setFocused(!1);
         this._handleValueAndAutoValidate(this._inputElement);
      },
      _onInput: function (a) {
         this._handleValueAndAutoValidate(a.target);
      },
      _onValueChanged: function (a) {
         var b = a.target;
         if (this.h && ((this.h = !1), void 0 === b.value || "" === b.value))
            return;
         this._handleValueAndAutoValidate(a.target);
      },
      _handleValue: function (a) {
         var b = this.g;
         b || 0 === b || ("number" === a.type && !a.checkValidity())
            ? (this._inputHasContent = !0)
            : (this._inputHasContent = !1);
         this.updateAddons({ aa: a, value: b, invalid: this.invalid });
      },
      _handleValueAndAutoValidate: function (a) {
         this.autoValidate &&
            a &&
            (this.invalid = !(a.validate
               ? a.validate(this.g)
               : a.checkValidity()));
         this._handleValue(a);
      },
      _onIronInputValidate: function () {
         this.invalid = this._inputElement.invalid;
      },
      _invalidChanged: function () {
         this._addons && this.updateAddons({ invalid: this.invalid });
      },
      updateAddons: function (a) {
         for (var b, c = 0; (b = this._addons[c]); c++) b.update(a);
      },
      _computeInputContentClass: function (a, b, c, d, e) {
         var f = "input-content";
         a
            ? (e && (f += " label-is-hidden"),
              d && !this.noUnfloatedLabelError && (f += " is-invalid"))
            : ((a = this.querySelector("label")),
              b || e
                 ? ((f += " label-is-floating"),
                   (this.$.labelAndInputContainer.style.position = "static"),
                   d
                      ? (f += " is-invalid")
                      : c && (f += " label-is-highlighted"))
                 : (a &&
                      (this.$.labelAndInputContainer.style.position =
                         "relative"),
                   d && !this.noUnfloatedLabelError && (f += " is-invalid")));
         c && (f += " focused");
         return f;
      },
      _computeUnderlineClass: function (a, b) {
         var c = "underline";
         b ? (c += " is-invalid") : a && (c += " is-highlighted");
         return c;
      },
      _computeAddOnContentClass: function (a, b) {
         var c = "add-on-content";
         b ? (c += " is-invalid") : a && (c += " is-highlighted");
         return c;
      },
   });
   var bj = ea(
      [
         '\n    <style>\n      :host {\n        display: inline-block;\n        visibility: hidden;\n\n        color: var(--paper-input-container-invalid-color, var(--error-color));\n\n        @apply --paper-font-caption;\n        @apply --paper-input-error;\n        position: absolute;\n        left:0;\n        right:0;\n      }\n\n      :host([invalid]) {\n        visibility: visible;\n      }\n\n      #a11yWrapper {\n        visibility: hidden;\n      }\n\n      :host([invalid]) #a11yWrapper {\n        visibility: visible;\n      }\n    </style>\n\n    \x3c!--\n    If the paper-input-error element is directly referenced by an\n    `aria-describedby` attribute, such as when used as a paper-input add-on,\n    then applying `visibility: hidden;` to the paper-input-error element itself\n    does not hide the error.\n\n    For more information, see:\n    https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_description\n    --\x3e\n    <div id="a11yWrapper">\n      <slot></slot>\n    </div>\n',
      ],
      [
         '\n    <style>\n      :host {\n        display: inline-block;\n        visibility: hidden;\n\n        color: var(--paper-input-container-invalid-color, var(--error-color));\n\n        @apply --paper-font-caption;\n        @apply --paper-input-error;\n        position: absolute;\n        left:0;\n        right:0;\n      }\n\n      :host([invalid]) {\n        visibility: visible;\n      }\n\n      #a11yWrapper {\n        visibility: hidden;\n      }\n\n      :host([invalid]) #a11yWrapper {\n        visibility: visible;\n      }\n    </style>\n\n    \x3c!--\n    If the paper-input-error element is directly referenced by an\n    \\`aria-describedby\\` attribute, such as when used as a paper-input add-on,\n    then applying \\`visibility: hidden;\\` to the paper-input-error element itself\n    does not hide the error.\n\n    For more information, see:\n    https://www.w3.org/TR/accname-1.1/#mapping_additional_nd_description\n    --\x3e\n    <div id="a11yWrapper">\n      <slot></slot>\n    </div>\n',
      ]
   );
   N({
      _template: G(bj),
      is: "paper-input-error",
      behaviors: [Ri],
      properties: {
         invalid: { readOnly: !0, reflectToAttribute: !0, type: Boolean },
      },
      update: function (a) {
         this._setInvalid(a.invalid);
      },
   });
   var cj = x([
      '\n    <style>\n      :host {\n        display: block;\n      }\n\n      :host([focused]) {\n        outline: none;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      input {\n        /* Firefox sets a min-width on the input, which can cause layout issues */\n        min-width: 0;\n        @apply --paper-input-input;\n      }\n\n      /* In 1.x, the <input> is distributed to paper-input-container, which styles it.\n      In 2.x the <iron-input> is distributed to paper-input-container, which styles\n      it, but in order for this to work correctly, we need to reset some\n      of the native input\'s properties to inherit (from the iron-input) */\n      iron-input > input {\n        @apply --paper-input-container-shared-input-style;\n        font-family: inherit;\n        font-weight: inherit;\n        font-size: inherit;\n        letter-spacing: inherit;\n        word-spacing: inherit;\n        line-height: inherit;\n        text-shadow: inherit;\n        color: inherit;\n        cursor: inherit;\n      }\n\n      input:disabled {\n        @apply --paper-input-container-input-disabled;\n      }\n\n      input::-webkit-outer-spin-button,\n      input::-webkit-inner-spin-button {\n        @apply --paper-input-container-input-webkit-spinner;\n      }\n\n      input::-webkit-clear-button {\n        @apply --paper-input-container-input-webkit-clear;\n      }\n\n      input::-webkit-calendar-picker-indicator {\n        @apply --paper-input-container-input-webkit-calendar-picker-indicator;\n      }\n\n      input::-webkit-input-placeholder {\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n      }\n\n      input:-moz-placeholder {\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n      }\n\n      input::-moz-placeholder {\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n      }\n\n      input::-ms-clear {\n        @apply --paper-input-container-ms-clear;\n      }\n\n      input::-ms-reveal {\n        @apply --paper-input-container-ms-reveal;\n      }\n\n      input:-ms-input-placeholder {\n        color: var(--paper-input-container-color, var(--secondary-text-color));\n      }\n\n      label {\n        pointer-events: none;\n      }\n    </style>\n\n    <paper-input-container id="container" no-label-float="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" auto-validate$="[[autoValidate]]" disabled$="[[disabled]]" invalid="[[invalid]]" no-unfloated-label-error="[[noUnfloatedLabelError]]">\n\n      <slot name="prefix" slot="prefix"></slot>\n\n      <label hidden$="[[!label]]" aria-hidden="true" for$="[[_inputId]]" slot="label">[[label]]</label>\n\n      \x3c!-- Need to bind maxlength so that the paper-input-char-counter works correctly --\x3e\n      <iron-input bind-value="{{value}}" slot="input" class="input-element" id$="[[_inputId]]" maxlength$="[[maxlength]]" allowed-pattern="[[allowedPattern]]" invalid="{{invalid}}" validator="[[validator]]">\n        <input aria-labelledby$="[[_ariaLabelledBy]]" aria-describedby$="[[_ariaDescribedBy]]" disabled$="[[disabled]]" title$="[[title]]" type$="[[type]]" pattern$="[[pattern]]" required$="[[required]]" autocomplete$="[[autocomplete]]" autofocus$="[[autofocus]]" inputmode$="[[inputmode]]" minlength$="[[minlength]]" maxlength$="[[maxlength]]" min$="[[min]]" max$="[[max]]" step$="[[step]]" name$="[[name]]" placeholder$="[[placeholder]]" readonly$="[[readonly]]" list$="[[list]]" size$="[[size]]" autocapitalize$="[[autocapitalize]]" autocorrect$="[[autocorrect]]" on-change="_onChange" tabindex$="[[tabIndex]]" autosave$="[[autosave]]" results$="[[results]]" accept$="[[accept]]" multiple$="[[multiple]]" role$="[[inputRole]]" aria-haspopup$="[[inputAriaHaspopup]]">\n      </iron-input>\n\n      <slot name="suffix" slot="suffix"></slot>\n\n      <template is="dom-if" if="[[errorMessage]]">\n        <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>\n      </template>\n\n      <template is="dom-if" if="[[charCounter]]">\n        <paper-input-char-counter slot="add-on"></paper-input-char-counter>\n      </template>\n\n    </paper-input-container>\n  ',
   ]);
   N({
      is: "paper-input",
      _template: G(cj),
      behaviors: [Qi, bi],
      properties: {
         value: { type: String },
         noUnfloatedLabelError: { type: Boolean, value: !1 },
         inputRole: { type: String, value: void 0 },
         inputAriaHaspopup: { type: String, value: void 0 },
      },
      get ec() {
         return this.aa._inputElement;
      },
      listeners: { "iron-input-ready": "_onIronInputReady" },
      _onIronInputReady: function () {
         this.$.nativeInput || (this.$.nativeInput = this.$$("input"));
         this.aa &&
            -1 !== this.rg.indexOf(this.$.nativeInput.type) &&
            (this.alwaysFloatLabel = !0);
         this.aa.bindValue &&
            this.$.container._handleValueAndAutoValidate(this.aa);
      },
   });
   var dj = void 0,
      ej = {
         properties: {
            sizingTarget: {
               type: Object,
               value: function () {
                  return this;
               },
            },
            fitInto: { type: Object, value: window },
            noOverlap: { type: Boolean },
            positionTarget: { type: Element },
            horizontalAlign: { type: String },
            verticalAlign: { type: String },
            dynamicAlign: { type: Boolean },
            horizontalOffset: { type: Number, value: 0, notify: !0 },
            verticalOffset: { type: Number, value: 0, notify: !0 },
            autoFitOnAttach: { type: Boolean, value: !1 },
            expandSizingTargetForScrollbars: { type: Boolean, value: !1 },
            _fitInfo: { type: Object },
         },
         get hl() {
            var a;
            this.fitInto === window
               ? (a = this.fitInto.innerWidth)
               : (a = this.fitInto.getBoundingClientRect().width);
            return a;
         },
         get el() {
            var a;
            this.fitInto === window
               ? (a = this.fitInto.innerHeight)
               : (a = this.fitInto.getBoundingClientRect().height);
            return a;
         },
         get fl() {
            var a;
            this.fitInto === window
               ? (a = 0)
               : (a = this.fitInto.getBoundingClientRect().left);
            return a;
         },
         get gl() {
            var a;
            this.fitInto === window
               ? (a = 0)
               : (a = this.fitInto.getBoundingClientRect().top);
            return a;
         },
         get pi() {
            var a = L(this).parentNode;
            a && a.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (a = a.host);
            return a;
         },
         get yi() {
            if (this.wi) {
               if ("right" === this.horizontalAlign) return "left";
               if ("left" === this.horizontalAlign) return "right";
            }
            return this.horizontalAlign;
         },
         get qe() {
            return (
               (this.horizontalAlign || this.verticalAlign) &&
               this.positionTarget
            );
         },
         get wi() {
            "undefined" === typeof this.kg &&
               (this.kg = "rtl" == window.getComputedStyle(this).direction);
            return this.kg;
         },
         attached: function () {
            this.positionTarget = this.positionTarget || this.pi;
            this.autoFitOnAttach &&
               ("none" === window.getComputedStyle(this).display
                  ? setTimeout(
                       function () {
                          this.fit();
                       }.bind(this)
                    )
                  : (window.ShadyDOM && ShadyDOM.flush(), this.fit()));
         },
         detached: function () {
            this.vf && (clearTimeout(this.vf), (this.vf = null));
         },
         fit: function () {
            this.position();
            this.constrain();
            this.center();
         },
         _discoverInfo: function () {
            if (!this._fitInfo) {
               var a = window.getComputedStyle(this),
                  b = window.getComputedStyle(this.sizingTarget);
               this._fitInfo = {
                  eh: {
                     top: this.style.top || "",
                     left: this.style.left || "",
                     position: this.style.position || "",
                  },
                  nh: {
                     maxWidth: this.sizingTarget.style.maxWidth || "",
                     maxHeight: this.sizingTarget.style.maxHeight || "",
                     boxSizing: this.sizingTarget.style.boxSizing || "",
                  },
                  xc: {
                     zc:
                        "auto" !== a.top
                           ? "top"
                           : "auto" !== a.bottom
                           ? "bottom"
                           : null,
                     tc:
                        "auto" !== a.left
                           ? "left"
                           : "auto" !== a.right
                           ? "right"
                           : null,
                  },
                  lc: {
                     height: "none" !== b.maxHeight,
                     width: "none" !== b.maxWidth,
                     minWidth: parseInt(b.minWidth, 10) || 0,
                     minHeight: parseInt(b.minHeight, 10) || 0,
                  },
                  margin: {
                     top: parseInt(a.marginTop, 10) || 0,
                     right: parseInt(a.marginRight, 10) || 0,
                     bottom: parseInt(a.marginBottom, 10) || 0,
                     left: parseInt(a.marginLeft, 10) || 0,
                  },
               };
            }
         },
         resetFit: function () {
            var a = this._fitInfo || {},
               b;
            for (b in a.nh) this.sizingTarget.style[b] = a.nh[b];
            for (b in a.eh) this.style[b] = a.eh[b];
            this._fitInfo = null;
         },
         refit: function () {
            var a = this.sizingTarget.scrollLeft,
               b = this.sizingTarget.scrollTop;
            this.resetFit();
            this.fit();
            this.sizingTarget.scrollLeft = a;
            this.sizingTarget.scrollTop = b;
         },
         position: function () {
            if (this.qe) {
               this._discoverInfo();
               window.ShadyDOM && window.ShadyDOM.flush();
               this.style.position = "fixed";
               this.sizingTarget.style.boxSizing = "border-box";
               this.style.left = "0px";
               this.style.top = "0px";
               var a = this.getBoundingClientRect(),
                  b = this.__getNormalizedRect(this.positionTarget),
                  c = this.__getNormalizedRect(this.fitInto);
               if (this.expandSizingTargetForScrollbars) {
                  var d = this.sizingTarget.offsetWidth;
                  var e = this.sizingTarget.offsetHeight;
                  var f = this.sizingTarget.clientWidth;
                  var g = this.sizingTarget.clientHeight;
               }
               var h = this._fitInfo.margin;
               b = this.__getPosition(
                  this.yi,
                  this.verticalAlign,
                  {
                     width: a.width + h.left + h.right,
                     height: a.height + h.top + h.bottom,
                  },
                  a,
                  b,
                  c
               );
               var k = b.left + h.left,
                  l = b.top + h.top,
                  n = Math.min(c.right - h.right, k + a.width),
                  p = Math.min(c.bottom - h.bottom, l + a.height);
               k = Math.max(
                  c.left + h.left,
                  Math.min(k, n - this._fitInfo.lc.minWidth)
               );
               l = Math.max(
                  c.top + h.top,
                  Math.min(l, p - this._fitInfo.lc.minHeight)
               );
               n = Math.max(n - k, this._fitInfo.lc.minWidth);
               p = Math.max(p - l, this._fitInfo.lc.minHeight);
               this.sizingTarget.style.maxWidth = n + "px";
               this.sizingTarget.style.maxHeight = p + "px";
               k -= a.left;
               a = l - a.top;
               this.style.left = k + "px";
               this.style.top = a + "px";
               if (this.expandSizingTargetForScrollbars) {
                  l = this.sizingTarget.offsetHeight;
                  e = l - this.sizingTarget.clientHeight - (e - g);
                  if (0 < e) {
                     this.sizingTarget.style.maxHeight =
                        Math.min(c.height - h.top - h.bottom, p + e) + "px";
                     e = this.sizingTarget.offsetHeight;
                     g = e - l;
                     var q;
                     "top" === b.verticalAlign
                        ? (q = a)
                        : "middle" === b.verticalAlign
                        ? (q = a - g / 2)
                        : "bottom" === b.verticalAlign && (q = a - g);
                     q = Math.max(
                        c.top + h.top,
                        Math.min(q, c.bottom - h.bottom - e)
                     );
                     this.style.top = q + "px";
                  }
                  q = this.sizingTarget.offsetWidth;
                  d = q - this.sizingTarget.clientWidth - (d - f);
                  if (0 < d) {
                     void 0 !== dj
                        ? (f = dj)
                        : ((f = document.createElement("div")),
                          Object.assign(f.style, {
                             overflow: "auto",
                             position: "fixed",
                             left: "0px",
                             top: "0px",
                             maxWidth: "100px",
                             maxHeight: "100px",
                          }),
                          (e = document.createElement("div")),
                          (e.style.width = "200px"),
                          (e.style.height = "200px"),
                          f.appendChild(e),
                          document.body.appendChild(f),
                          (dj =
                             1 < Math.abs(f.offsetWidth - 100)
                                ? f.offsetWidth - f.clientWidth
                                : 0),
                          document.body.removeChild(f),
                          (f = dj));
                     this.sizingTarget.style.maxWidth =
                        Math.min(c.width - h.left - h.right, n + d - f) + "px";
                     n = this.sizingTarget.offsetWidth + f;
                     d = n - q;
                     var r;
                     "left" === b.horizontalAlign
                        ? (r = k)
                        : "center" === b.horizontalAlign
                        ? (r = k - d / 2)
                        : "right" === b.horizontalAlign && (r = k - d);
                     r = Math.max(
                        c.left + h.left,
                        Math.min(r, c.right - h.right - n)
                     );
                     this.style.left = r + "px";
                  }
               }
            }
         },
         constrain: function () {
            if (!this.qe) {
               this._discoverInfo();
               var a = this._fitInfo;
               a.xc.zc ||
                  ((this.style.position = "fixed"), (this.style.top = "0px"));
               a.xc.tc ||
                  ((this.style.position = "fixed"), (this.style.left = "0px"));
               this.sizingTarget.style.boxSizing = "border-box";
               var b = this.getBoundingClientRect();
               a.lc.height ||
                  this.__sizeDimension(b, a.xc.zc, "top", "bottom", "Height");
               a.lc.width ||
                  this.__sizeDimension(b, a.xc.tc, "left", "right", "Width");
            }
         },
         _sizeDimension: function (a, b, c, d, e) {
            this.__sizeDimension(a, b, c, d, e);
         },
         __sizeDimension: function (a, b, c, d, e) {
            var f = this._fitInfo,
               g = this.__getNormalizedRect(this.fitInto);
            g = "Width" === e ? g.width : g.height;
            b = b === d;
            var h = "offset" + e;
            this.sizingTarget.style["max" + e] =
               g -
               f.margin[b ? c : d] -
               (b ? g - a[d] : a[c]) -
               (this[h] - this.sizingTarget[h]) +
               "px";
         },
         center: function () {
            if (!this.qe) {
               this._discoverInfo();
               var a = this._fitInfo.xc;
               if (!a.zc || !a.tc) {
                  this.style.position = "fixed";
                  a.zc || (this.style.top = "0px");
                  a.tc || (this.style.left = "0px");
                  var b = this.getBoundingClientRect(),
                     c = this.__getNormalizedRect(this.fitInto);
                  a.zc ||
                     (this.style.top =
                        c.top - b.top + (c.height - b.height) / 2 + "px");
                  a.tc ||
                     (this.style.left =
                        c.left - b.left + (c.width - b.width) / 2 + "px");
               }
            }
         },
         __getNormalizedRect: function (a) {
            return a === document.documentElement || a === window
               ? {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    right: window.innerWidth,
                    bottom: window.innerHeight,
                 }
               : a.getBoundingClientRect();
         },
         __getOffscreenArea: function (a, b, c) {
            return (
               Math.abs(
                  Math.min(0, a.top) +
                     Math.min(0, c.bottom - (a.top + b.height))
               ) *
                  b.width +
               Math.abs(
                  Math.min(0, a.left) +
                     Math.min(0, c.right - (a.left + b.width))
               ) *
                  b.height
            );
         },
         __getPosition: function (a, b, c, d, e, f) {
            var g = [
               {
                  verticalAlign: "top",
                  horizontalAlign: "left",
                  top: e.top + this.verticalOffset,
                  left: e.left + this.horizontalOffset,
               },
               {
                  verticalAlign: "top",
                  horizontalAlign: "right",
                  top: e.top + this.verticalOffset,
                  left: e.right - c.width - this.horizontalOffset,
               },
               {
                  verticalAlign: "bottom",
                  horizontalAlign: "left",
                  top: e.bottom - c.height - this.verticalOffset,
                  left: e.left + this.horizontalOffset,
               },
               {
                  verticalAlign: "bottom",
                  horizontalAlign: "right",
                  top: e.bottom - c.height - this.verticalOffset,
                  left: e.right - c.width - this.horizontalOffset,
               },
            ];
            if (this.noOverlap) {
               for (var h = 0, k = g.length; h < k; h++) {
                  var l = {},
                     n;
                  for (n in g[h]) l[n] = g[h][n];
                  g.push(l);
               }
               g[0].top = g[1].top += e.height;
               g[2].top = g[3].top -= e.height;
               g[4].left = g[6].left += e.width;
               g[5].left = g[7].left -= e.width;
            }
            b = "auto" === b ? null : b;
            a = "auto" === a ? null : a;
            (a && "center" !== a) ||
               (g.push({
                  verticalAlign: "top",
                  horizontalAlign: "center",
                  top:
                     e.top +
                     this.verticalOffset +
                     (this.noOverlap ? e.height : 0),
                  left:
                     e.left - d.width / 2 + e.width / 2 + this.horizontalOffset,
               }),
               g.push({
                  verticalAlign: "bottom",
                  horizontalAlign: "center",
                  top:
                     e.bottom -
                     c.height -
                     this.verticalOffset -
                     (this.noOverlap ? e.height : 0),
                  left:
                     e.left - d.width / 2 + e.width / 2 + this.horizontalOffset,
               }));
            (b && "middle" !== b) ||
               (g.push({
                  verticalAlign: "middle",
                  horizontalAlign: "left",
                  top:
                     e.top - d.height / 2 + e.height / 2 + this.verticalOffset,
                  left:
                     e.left +
                     this.horizontalOffset +
                     (this.noOverlap ? e.width : 0),
               }),
               g.push({
                  verticalAlign: "middle",
                  horizontalAlign: "right",
                  top:
                     e.top - d.height / 2 + e.height / 2 + this.verticalOffset,
                  left:
                     e.right -
                     c.width -
                     this.horizontalOffset -
                     (this.noOverlap ? e.width : 0),
               }));
            "middle" === b &&
               "center" === a &&
               g.push({
                  verticalAlign: "middle",
                  horizontalAlign: "center",
                  top:
                     e.top - d.height / 2 + e.height / 2 + this.verticalOffset,
                  left:
                     e.left - d.width / 2 + e.width / 2 + this.horizontalOffset,
               });
            for (h = 0; h < g.length; h++) {
               d = g[h];
               e = d.verticalAlign === b;
               k = d.horizontalAlign === a;
               if (!this.dynamicAlign && !this.noOverlap && e && k) {
                  var p = d;
                  break;
               }
               l = (!b || e) && (!a || k);
               if (this.dynamicAlign || l) {
                  d.hf = this.__getOffscreenArea(d, c, f);
                  if (0 === d.hf && l) {
                     p = d;
                     break;
                  }
                  p = p || d;
                  l = d.hf - p.hf;
                  if (0 > l || (0 === l && (e || k))) p = d;
               }
            }
            return p;
         },
      };
   var fj = Element.prototype,
      gj =
         fj.matches ||
         fj.matchesSelector ||
         fj.mozMatchesSelector ||
         fj.msMatchesSelector ||
         fj.oMatchesSelector ||
         fj.webkitMatchesSelector;
   function hj() {}
   m = hj.prototype;
   m.bj = function (a) {
      return (
         gj.call(a, "input, select, textarea, button, object")
            ? gj.call(a, ":not([disabled])")
            : gj.call(
                 a,
                 "a[href], area[href], iframe, [tabindex], [contentEditable], [iron-focusable]"
              )
      )
         ? ((a = a.getAttribute("tabindex") || 0), Number(a))
         : -1;
   };
   m.hg = function (a, b) {
      if (a.nodeType !== Node.ELEMENT_NODE || !this.xi(a)) return !1;
      var c = this.bj(a),
         d = 0 < c;
      0 <= c && b.push(a);
      a =
         "content" === a.localName || "slot" === a.localName
            ? L(a).getDistributedNodes()
            : L(a.root || a).children;
      for (c = 0; c < a.length; c++) d = this.hg(a[c], b) || d;
      return d;
   };
   m.xi = function (a) {
      var b = a.style;
      return "hidden" !== b.visibility && "none" !== b.display
         ? ((b = window.getComputedStyle(a)),
           "hidden" !== b.visibility && "none" !== b.display)
         : !1;
   };
   m.ze = function (a) {
      var b = a.length;
      if (2 > b) return a;
      var c = Math.ceil(b / 2);
      b = this.ze(a.slice(0, c));
      a = this.ze(a.slice(c));
      return this.zi(b, a);
   };
   m.zi = function (a, b) {
      for (var c = []; 0 < a.length && 0 < b.length; )
         this.ui(a[0], b[0]) ? c.push(b.shift()) : c.push(a.shift());
      return c.concat(a, b);
   };
   m.ui = function (a, b) {
      a = Math.max(a.tabIndex, 0);
      b = Math.max(b.tabIndex, 0);
      return 0 === a || 0 === b ? b > a : a > b;
   };
   var ij = new hj();
   var jj = x([
      "\n    <style>\n      :host {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background-color: var(--iron-overlay-backdrop-background-color, #000);\n        opacity: 0;\n        transition: opacity 0.2s;\n        pointer-events: none;\n        @apply --iron-overlay-backdrop;\n      }\n\n      :host(.opened) {\n        opacity: var(--iron-overlay-backdrop-opacity, 0.6);\n        pointer-events: auto;\n        @apply --iron-overlay-backdrop-opened;\n      }\n    </style>\n\n    <slot></slot>\n",
   ]);
   N({
      _template: G(jj),
      is: "iron-overlay-backdrop",
      properties: {
         opened: {
            reflectToAttribute: !0,
            type: Boolean,
            value: !1,
            observer: "_openedChanged",
         },
      },
      listeners: { transitionend: "_onTransitionend" },
      created: function () {
         this.g = null;
      },
      attached: function () {
         this.opened && this._openedChanged(this.opened);
      },
      prepare: function () {
         this.opened && !this.parentNode && L(document.body).appendChild(this);
      },
      open: function () {
         this.opened = !0;
      },
      close: function () {
         this.opened = !1;
      },
      complete: function () {
         this.opened ||
            this.parentNode !== document.body ||
            L(this.parentNode).removeChild(this);
      },
      _onTransitionend: function (a) {
         a && a.target === this && this.complete();
      },
      _openedChanged: function (a) {
         a
            ? this.prepare()
            : ((a = window.getComputedStyle(this)),
              ("0s" !== a.transitionDuration && 0 != a.opacity) ||
                 this.complete());
         this.isAttached &&
            (this.g && (window.cancelAnimationFrame(this.g), (this.g = null)),
            (this.scrollTop = this.scrollTop),
            (this.g = window.requestAnimationFrame(
               function () {
                  this.g = null;
                  this.toggleClass("opened", this.opened);
               }.bind(this)
            )));
      },
   });
   function kj() {
      this.g = [];
      this.j = 101;
      this.h = null;
      Td(document.documentElement, "tap", function () {});
      document.addEventListener("tap", this._onCaptureClick.bind(this), !0);
      document.addEventListener("focus", this._onCaptureFocus.bind(this), !0);
      document.addEventListener("keydown", this.cj.bind(this), !0);
   }
   m = kj.prototype;
   m.oi = function (a) {
      var b = this.g[a];
      if (b) {
         var c = this.g.length - 1,
            d = this.g[c];
         d && this.qg(b, d) && c--;
         if (!(a >= c)) {
            d = Math.max(this.fc(this.g[this.g.length - 1]), 101);
            for (this.fc(b) <= d && this.te(b, d); a < c; )
               (this.g[a] = this.g[a + 1]), a++;
            this.g[c] = b;
         }
      }
   };
   function lj(a, b) {
      b = a.g.indexOf(b);
      -1 !== b && (a.g.splice(b, 1), mj(a));
   }
   function mj(a) {
      var b = a.fj();
      if (b || a.h)
         (a.sc.style.zIndex = a.fc(b) - 1), (a.sc.opened = !!b), a.sc.prepare();
   }
   m.fj = function () {
      for (var a = this.g.length - 1; 0 <= a; a--)
         if (this.g[a].withBackdrop) return this.g[a];
   };
   m.fc = function (a) {
      var b = 101;
      a &&
         ((a = Number(a.style.zIndex || window.getComputedStyle(a).zIndex)),
         a === a && (b = a));
      return b;
   };
   m.jj = function (a, b) {
      a.style.zIndex = b;
   };
   m.te = function (a, b) {
      this.jj(a, b + 2);
   };
   m.dj = function (a) {
      a = a || [];
      for (var b = 0; b < a.length; b++)
         if (a[b]._manager === this) return a[b];
   };
   m._onCaptureClick = function (a) {
      var b = this.g.length - 1;
      if (-1 !== b)
         for (var c = L(a).path, d; (d = this.g[b]) && this.dj(c) !== d; )
            if ((d._onCaptureClick(a), d.allowClickThrough)) b--;
            else break;
   };
   m._onCaptureFocus = function (a) {
      var b = this.g[this.g.length - 1];
      b && b._onCaptureFocus(a);
   };
   m.cj = function (a) {
      var b = this.g[this.g.length - 1];
      b &&
         (Ra.keyboardEventMatchesKeys(a, "esc")
            ? b._onCaptureEsc(a)
            : Ra.keyboardEventMatchesKeys(a, "tab") && b._onCaptureTab(a));
   };
   m.qg = function (a, b) {
      return !a.alwaysOnTop && b.alwaysOnTop;
   };
   t.Object.defineProperties(kj.prototype, {
      sc: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            this.h ||
               (this.h = document.createElement("iron-overlay-backdrop"));
            return this.h;
         },
      },
      cf: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            var a = document.activeElement;
            (a && !1 !== a instanceof Element) || (a = document.body);
            for (; a.root && L(a.root).activeElement; )
               a = L(a.root).activeElement;
            return a;
         },
      },
   });
   var nj = new kj();
   var oj = 0,
      pj = 0,
      qj = null,
      rj = [],
      sj = ["wheel", "mousewheel", "DOMMouseScroll", "touchstart", "touchmove"],
      _boundScrollHandler$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager,
      tj,
      _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager =
         [],
      _lockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager =
         null,
      _unlockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager =
         null;
   function _hasCachedLockedElement$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(
      a
   ) {
      return (
         -1 <
         _lockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.indexOf(
            a
         )
      );
   }
   function _hasCachedUnlockedElement$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(
      a
   ) {
      return (
         -1 <
         _unlockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.indexOf(
            a
         )
      );
   }
   function _composedTreeContains$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(
      a,
      b
   ) {
      var c, d;
      if (a.contains(b)) return !0;
      a = L(a).querySelectorAll("content,slot");
      for (c = 0; c < a.length; ++c) {
         var e = L(a[c]).getDistributedNodes();
         for (d = 0; d < e.length; ++d)
            if (
               e[d].nodeType === Node.ELEMENT_NODE &&
               _composedTreeContains$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(
                  e[d],
                  b
               )
            )
               return !0;
      }
      return !1;
   }
   function _scrollInteractionHandler$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(
      a
   ) {
      a.cancelable &&
         _shouldPreventScrolling$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(
            a
         ) &&
         a.preventDefault();
      a.targetTouches &&
         ((a = a.targetTouches[0]), (oj = a.pageX), (pj = a.pageY));
   }
   function _lockScrollInteractions$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager() {
      _boundScrollHandler$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager =
         _boundScrollHandler$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager ||
         _scrollInteractionHandler$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.bind(
            void 0
         );
      for (var a = 0, b = sj.length; a < b; a++)
         document.addEventListener(
            sj[a],
            _boundScrollHandler$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager,
            { capture: !0, passive: !1 }
         );
   }
   function _unlockScrollInteractions$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager() {
      for (var a = 0, b = sj.length; a < b; a++)
         document.removeEventListener(
            sj[a],
            _boundScrollHandler$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager,
            { capture: !0, passive: !1 }
         );
   }
   function _shouldPreventScrolling$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(
      a
   ) {
      var b = L(a).yc;
      "touchmove" !== a.type &&
         qj !== b &&
         ((qj = b),
         (rj =
            _getScrollableNodes$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(
               L(a).path
            )));
      if ("touchstart" === a.type) return !1;
      if (!rj.length) return !0;
      a =
         _getScrollInfo$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(
            a
         );
      return !_getScrollingNode$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(
         rj,
         a.deltaX,
         a.deltaY
      );
   }
   function _getScrollableNodes$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(
      a
   ) {
      for (var b = [], c = a.indexOf(tj), d = 0; d <= c; d++)
         if (a[d].nodeType === Node.ELEMENT_NODE) {
            var e = a[d],
               f = e.style;
            "scroll" !== f.overflow &&
               "auto" !== f.overflow &&
               (f = window.getComputedStyle(e));
            ("scroll" !== f.overflow && "auto" !== f.overflow) || b.push(e);
         }
      return b;
   }
   function _getScrollingNode$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(
      a,
      b,
      c
   ) {
      if (b || c)
         for (var d = Math.abs(c) >= Math.abs(b), e = 0; e < a.length; e++) {
            var f = a[e];
            if (
               d
                  ? 0 > c
                     ? 0 < f.scrollTop
                     : f.scrollTop < f.scrollHeight - f.clientHeight
                  : 0 > b
                  ? 0 < f.scrollLeft
                  : f.scrollLeft < f.scrollWidth - f.clientWidth
            )
               return f;
         }
   }
   function _getScrollInfo$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(
      a
   ) {
      var b = { deltaX: a.deltaX, deltaY: a.deltaY };
      "deltaX" in a ||
         ("wheelDeltaX" in a && "wheelDeltaY" in a
            ? ((b.deltaX = -a.wheelDeltaX), (b.deltaY = -a.wheelDeltaY))
            : "wheelDelta" in a
            ? ((b.deltaX = 0), (b.deltaY = -a.wheelDelta))
            : "axis" in a
            ? ((b.deltaX = 1 === a.axis ? a.detail : 0),
              (b.deltaY = 2 === a.axis ? a.detail : 0))
            : a.targetTouches &&
              ((a = a.targetTouches[0]),
              (b.deltaX = oj - a.pageX),
              (b.deltaY = pj - a.pageY)));
      return b;
   }
   var uj = new Set();
   var vj = {
         properties: {
            opened: {
               observer: "_openedChanged",
               type: Boolean,
               value: !1,
               notify: !0,
            },
            canceled: {
               observer: "_canceledChanged",
               readOnly: !0,
               type: Boolean,
               value: !1,
            },
            withBackdrop: { observer: "_withBackdropChanged", type: Boolean },
            noAutoFocus: { type: Boolean, value: !1 },
            noCancelOnEscKey: { type: Boolean, value: !1 },
            noCancelOnOutsideClick: { type: Boolean, value: !1 },
            closingReason: { type: Object },
            restoreFocusOnClose: { type: Boolean, value: !1 },
            allowClickThrough: { type: Boolean },
            alwaysOnTop: { type: Boolean },
            scrollAction: { type: String },
            _manager: { type: Object, value: nj },
            _focusedChild: { type: Object },
         },
         listeners: { "iron-resize": "_onIronResize" },
         observers: [
            "__updateScrollObservers(isAttached, opened, scrollAction)",
         ],
         get sc() {
            return this._manager.sc;
         },
         get od() {
            return (
               this._focusedChild ||
               L(this).querySelector("[autofocus]") ||
               this
            );
         },
         get si() {
            var a = [];
            return ij.hg(this, a) ? ij.ze(a) : a;
         },
         ready: function () {
            this.re = this.qb = !1;
            this.gd = this.hd = null;
            this.qc = {};
            this.kd = this.jd = this.rc = null;
            this.__onCaptureScroll = this.__onCaptureScroll.bind(this);
            this.ib = null;
            this._ensureSetup();
         },
         attached: function () {
            this.opened && this._openedChanged(this.opened);
            this.la = L(this).observeNodes(this._onNodesChange);
         },
         detached: function () {
            this.la && L(this).unobserveNodes(this.la);
            this.la = null;
            for (var a in this.qc)
               null !== this.qc[a] && cancelAnimationFrame(this.qc[a]);
            this.qc = {};
            lj(this._manager, this);
            this.qb &&
               (this.opened
                  ? this._finishRenderOpened()
                  : (this._applyFocus(), this._finishRenderClosed()));
         },
         toggle: function () {
            this._setCanceled(!1);
            this.opened = !this.opened;
         },
         open: function () {
            this._setCanceled(!1);
            this.opened = !0;
         },
         close: function () {
            this._setCanceled(!1);
            this.opened = !1;
         },
         cancel: function (a) {
            this.fire("iron-overlay-canceled", a, { cancelable: !0 })
               .defaultPrevented || (this._setCanceled(!0), (this.opened = !1));
         },
         invalidateTabbables: function () {
            this.gd = this.hd = null;
         },
         _ensureSetup: function () {
            this.ej ||
               ((this.ej = !0),
               (this.style.outline = "none"),
               (this.style.display = "none"));
         },
         _openedChanged: function (a) {
            a
               ? this.removeAttribute("aria-hidden")
               : this.setAttribute("aria-hidden", "true");
            this.isAttached &&
               ((this.qb = !0),
               this.__deraf("__openedChanged", this.__openedChanged));
         },
         _canceledChanged: function () {
            this.closingReason = this.closingReason || {};
            this.closingReason.canceled = this.canceled;
         },
         _withBackdropChanged: function () {
            this.withBackdrop && !this.hasAttribute("tabindex")
               ? (this.setAttribute("tabindex", "-1"), (this.re = !0))
               : this.re && (this.removeAttribute("tabindex"), (this.re = !1));
            this.opened && this.isAttached && mj(this._manager);
         },
         _prepareRenderOpened: function () {
            this.rc = this._manager.cf;
            this._preparePositioning();
            this.refit();
            this._finishPositioning();
            this.noAutoFocus &&
               document.activeElement === this.od &&
               (this.od.blur(), this.rc.focus());
         },
         _renderOpened: function () {
            this._finishRenderOpened();
         },
         _renderClosed: function () {
            this._finishRenderClosed();
         },
         _finishRenderOpened: function () {
            this.notifyResize();
            this.qb = !1;
            this.fire("iron-overlay-opened");
         },
         _finishRenderClosed: function () {
            this.style.display = "none";
            this.style.zIndex = "";
            this.notifyResize();
            this.qb = !1;
            this.fire("iron-overlay-closed", this.closingReason);
         },
         _preparePositioning: function () {
            this.style.transition = this.style.webkitTransition = "none";
            this.style.transform = this.style.webkitTransform = "none";
            this.style.display = "";
         },
         _finishPositioning: function () {
            this.style.display = "none";
            this.scrollTop = this.scrollTop;
            this.style.transition = this.style.webkitTransition = "";
            this.style.transform = this.style.webkitTransform = "";
            this.style.display = "";
            this.scrollTop = this.scrollTop;
         },
         _applyFocus: function () {
            if (this.opened) this.noAutoFocus || this.od.focus();
            else {
               if (this.restoreFocusOnClose && this.rc) {
                  var a = this._manager.cf,
                     b;
                  if (!(b = a === document.body))
                     a: {
                        for (; a; a = a.assignedSlot || a.parentNode || a.host)
                           if (a === this) {
                              b = !0;
                              break a;
                           }
                        b = !1;
                     }
                  b && this.rc.focus();
               }
               this.rc = null;
               this.od.blur();
               this._focusedChild = null;
            }
         },
         _onCaptureClick: function (a) {
            this.noCancelOnOutsideClick || this.cancel(a);
         },
         _onCaptureFocus: function (a) {
            if (this.withBackdrop) {
               var b = L(a).path;
               -1 === b.indexOf(this)
                  ? (a.stopPropagation(), this._applyFocus())
                  : (this._focusedChild = b[0]);
            }
         },
         _onCaptureEsc: function (a) {
            this.noCancelOnEscKey || this.cancel(a);
         },
         _onCaptureTab: function (a) {
            if (this.withBackdrop) {
               this.__ensureFirstLastFocusables();
               var b = a.shiftKey,
                  c = b ? this.gd : this.hd;
               b = b ? this.hd : this.gd;
               if (c === b) c = !0;
               else {
                  var d = this._manager.cf;
                  c = d === c || d === this;
               }
               c &&
                  (a.preventDefault(),
                  (this._focusedChild = b),
                  this._applyFocus());
            }
         },
         _onIronResize: function () {
            this.opened && !this.qb && this.__deraf("refit", this.refit);
         },
         _onNodesChange: function () {
            this.opened &&
               !this.qb &&
               (this.invalidateTabbables(), this.notifyResize());
         },
         __ensureFirstLastFocusables: function () {
            var a = this.si;
            this.gd = a[0];
            this.hd = a[a.length - 1];
         },
         __openedChanged: function () {
            if (this.opened) {
               this._prepareRenderOpened();
               var a = this._manager,
                  b = a.g.indexOf(this);
               if (0 <= b) a.oi(b);
               else {
                  b = a.g.length;
                  var c = a.g[b - 1],
                     d = Math.max(a.fc(c), 101),
                     e = a.fc(this);
                  c &&
                     a.qg(this, c) &&
                     (a.te(c, d), b--, (d = Math.max(a.fc(a.g[b - 1]), 101)));
                  e <= d && a.te(this, d);
                  a.g.splice(b, 0, this);
               }
               mj(a);
               this._applyFocus();
               this._renderOpened();
            } else
               lj(this._manager, this),
                  this._applyFocus(),
                  this._renderClosed();
         },
         __deraf: function (a, b) {
            var c = this.qc;
            null !== c[a] && cancelAnimationFrame(c[a]);
            c[a] = requestAnimationFrame(
               function () {
                  c[a] = null;
                  b.call(this);
               }.bind(this)
            );
         },
         __updateScrollObservers: function (a, b, c) {
            a && b && this.__isValidScrollAction(c)
               ? ("lock" === c &&
                    (this.__saveScrollPosition(),
                    0 <=
                       _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.indexOf(
                          this
                       ) ||
                       (0 ===
                          _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.length &&
                          _lockScrollInteractions$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager(),
                       _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.push(
                          this
                       ),
                       (tj =
                          _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager[
                             _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.length -
                                1
                          ]),
                       (_lockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager =
                          []),
                       (_unlockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager =
                          []))),
                 this.__addScrollListeners())
               : ((a =
                    _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.indexOf(
                       this
                    )),
                 -1 !== a &&
                    (_lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.splice(
                       a,
                       1
                    ),
                    (tj =
                       _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager[
                          _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.length -
                             1
                       ]),
                    (_lockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager =
                       []),
                    (_unlockedElementCache$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager =
                       []),
                    0 ===
                       _lockingElements$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager.length &&
                       _unlockScrollInteractions$$module$third_party$javascript$polymer$v2$iron_overlay_behavior$iron_scroll_manager()),
                 this.__removeScrollListeners());
         },
         __addScrollListeners: function () {
            if (!this.ib) {
               this.ib = [];
               if (Za)
                  for (var a = this; a; )
                     a.nodeType === Node.DOCUMENT_FRAGMENT_NODE &&
                        a.host &&
                        this.ib.push(a),
                        (a = a.host || a.assignedSlot || a.parentNode);
               this.ib.push(document);
            }
            this.ib.forEach(function (b) {
               b.addEventListener("scroll", this.__onCaptureScroll, {
                  capture: !0,
                  passive: !0,
               });
            }, this);
         },
         __removeScrollListeners: function () {
            this.ib &&
               this.ib.forEach(function (a) {
                  a.removeEventListener("scroll", this.__onCaptureScroll, {
                     capture: !0,
                     passive: !0,
                  });
               }, this);
            this.isAttached || (this.ib = null);
         },
         __isValidScrollAction: function (a) {
            return "lock" === a || "refit" === a || "cancel" === a;
         },
         __onCaptureScroll: function (a) {
            if (!(this.qb || 0 <= L(a).path.indexOf(this)))
               switch (this.scrollAction) {
                  case "lock":
                     this.__restoreScrollPosition();
                     break;
                  case "refit":
                     this.__deraf("refit", this.refit);
                     break;
                  case "cancel":
                     this.cancel(a);
               }
         },
         __saveScrollPosition: function () {
            document.scrollingElement
               ? ((this.kd = document.scrollingElement.scrollTop),
                 (this.jd = document.scrollingElement.scrollLeft))
               : ((this.kd = Math.max(
                    document.documentElement.scrollTop,
                    document.body.scrollTop
                 )),
                 (this.jd = Math.max(
                    document.documentElement.scrollLeft,
                    document.body.scrollLeft
                 )));
         },
         __restoreScrollPosition: function () {
            document.scrollingElement
               ? ((document.scrollingElement.scrollTop = this.kd),
                 (document.scrollingElement.scrollLeft = this.jd))
               : ((document.documentElement.scrollTop =
                    document.body.scrollTop =
                       this.kd),
                 (document.documentElement.scrollLeft =
                    document.body.scrollLeft =
                       this.jd));
         },
      },
      wj = [
         ej,
         {
            properties: {
               _parentResizable: {
                  type: Object,
                  observer: "_parentResizableChanged",
               },
               _notifyingDescendant: { type: Boolean, value: !1 },
            },
            listeners: {
               "iron-request-resize-notifications":
                  "_onIronRequestResizeNotifications",
            },
            created: function () {
               this.hc = [];
               this.ue = this.notifyResize.bind(this);
               this.gg = this._onDescendantIronResize.bind(this);
            },
            attached: function () {
               this._requestResizeNotifications();
            },
            detached: function () {
               this._parentResizable
                  ? this._parentResizable.stopResizeNotificationsFor(this)
                  : (uj.delete(this),
                    window.removeEventListener("resize", this.ue));
               this._parentResizable = null;
            },
            notifyResize: function () {
               this.isAttached &&
                  (this.hc.forEach(function (a) {
                     this.resizerShouldNotify(a) && this._notifyDescendant(a);
                  }, this),
                  this._fireResize());
            },
            assignParentResizable: function (a) {
               this._parentResizable &&
                  this._parentResizable.stopResizeNotificationsFor(this);
               (this._parentResizable = a) &&
                  -1 === a.hc.indexOf(this) &&
                  (a.hc.push(this), a._subscribeIronResize(this));
            },
            stopResizeNotificationsFor: function (a) {
               var b = this.hc.indexOf(a);
               -1 < b && (this.hc.splice(b, 1), this._unsubscribeIronResize(a));
            },
            _subscribeIronResize: function (a) {
               a.addEventListener("iron-resize", this.gg);
            },
            _unsubscribeIronResize: function (a) {
               a.removeEventListener("iron-resize", this.gg);
            },
            resizerShouldNotify: function () {
               return !0;
            },
            _onDescendantIronResize: function (a) {
               this._notifyingDescendant
                  ? a.stopPropagation()
                  : Za || this._fireResize();
            },
            _fireResize: function () {
               this.fire("iron-resize", null, { node: this, bubbles: !1 });
            },
            _onIronRequestResizeNotifications: function (a) {
               var b = L(a).yc;
               b !== this &&
                  (b.assignParentResizable(this),
                  this._notifyDescendant(b),
                  a.stopPropagation());
            },
            _parentResizableChanged: function (a) {
               a && window.removeEventListener("resize", this.ue);
            },
            _notifyDescendant: function (a) {
               this.isAttached &&
                  ((this._notifyingDescendant = !0),
                  a.notifyResize(),
                  (this._notifyingDescendant = !1));
            },
            _requestResizeNotifications: function () {
               if (this.isAttached)
                  if ("loading" === document.readyState) {
                     var a = this._requestResizeNotifications.bind(this);
                     document.addEventListener(
                        "readystatechange",
                        function c() {
                           document.removeEventListener("readystatechange", c);
                           a();
                        }
                     );
                  } else
                     this._findParent(),
                        this._parentResizable
                           ? this._parentResizable.hc.forEach(function (b) {
                                b !== this && b._findParent();
                             }, this)
                           : (uj.forEach(function (b) {
                                b !== this && b._findParent();
                             }, this),
                             window.addEventListener("resize", this.ue),
                             this.notifyResize());
            },
            _findParent: function () {
               this.assignParentResizable(null);
               this.fire("iron-request-resize-notifications", null, {
                  node: this,
                  bubbles: !0,
                  cancelable: !0,
               });
               this._parentResizable ? uj.delete(this) : uj.add(this);
            },
         },
         vj,
      ];
   var xj = [
      {
         properties: {
            animationConfig: { type: Object },
            entryAnimation: {
               observer: "_entryAnimationChanged",
               type: String,
            },
            exitAnimation: { observer: "_exitAnimationChanged", type: String },
         },
         _entryAnimationChanged: function () {
            this.animationConfig = this.animationConfig || {};
            this.animationConfig.entry = [
               { name: this.entryAnimation, node: this },
            ];
         },
         _exitAnimationChanged: function () {
            this.animationConfig = this.animationConfig || {};
            this.animationConfig.exit = [
               { name: this.exitAnimation, node: this },
            ];
         },
         _copyProperties: function (a, b) {
            for (var c in b) a[c] = b[c];
         },
         _cloneConfig: function (a) {
            var b = { yj: !0 };
            this._copyProperties(b, a);
            return b;
         },
         _getAnimationConfigRecursive: function (a, b, c) {
            if (this.animationConfig)
               if (
                  this.animationConfig.value &&
                  "function" === typeof this.animationConfig.value
               )
                  this._warn(
                     this._logf(
                        "playAnimation",
                        "Please put 'animationConfig' inside of your components 'properties' object instead of outside of it."
                     )
                  );
               else {
                  var d = a ? this.animationConfig[a] : this.animationConfig;
                  Array.isArray(d) || (d = [d]);
                  if (d)
                     for (var e, f = 0; (e = d[f]); f++)
                        if (e.lj)
                           e.lj._getAnimationConfigRecursive(e.type || a, b, c);
                        else if (e.id) {
                           var g = b[e.id];
                           g
                              ? (g.yj ||
                                   ((b[e.id] = this._cloneConfig(g)),
                                   (g = b[e.id])),
                                this._copyProperties(g, e))
                              : (b[e.id] = e);
                        } else c.push(e);
               }
         },
         getAnimationConfig: function (a) {
            var b = {},
               c = [];
            this._getAnimationConfigRecursive(a, b, c);
            for (var d in b) c.push(b[d]);
            return c;
         },
      },
      {
         _configureAnimations: function (a) {
            var b = [],
               c = [];
            if (0 < a.length)
               for (var d, e = 0; (d = a[e]); e++) {
                  var f = document.createElement(d.name);
                  if (f.zj) {
                     var g = null;
                     f.configure ||
                        (f.configure = function () {
                           return null;
                        });
                     g = f.configure(d);
                     c.push({ result: g, config: d });
                  } else console.warn(this.is + ":", d.name, "not found!");
               }
            for (a = 0; a < c.length; a++) {
               g = c[a].result;
               d = c[a].config;
               try {
                  "function" != typeof g.cancel &&
                     (g = document.timeline.play(g));
               } catch (h) {
                  (g = null),
                     console.warn("Couldnt play", "(", d.name, ").", h);
               }
               g && b.push({ gk: f, config: d, animation: g });
            }
            return b;
         },
         _shouldComplete: function (a) {
            for (var b = !0, c = 0; c < a.length; c++)
               if ("finished" != a[c].animation.playState) {
                  b = !1;
                  break;
               }
            return b;
         },
         _complete: function (a) {
            for (var b = 0; b < a.length; b++) a[b].gk.complete(a[b].config);
            for (b = 0; b < a.length; b++) a[b].animation.cancel();
         },
         playAnimation: function (a, b) {
            var c = this.getAnimationConfig(a);
            if (c) {
               this.ab = this.ab || {};
               this.ab[a] && (this._complete(this.ab[a]), delete this.ab[a]);
               var d = this._configureAnimations(c);
               if (0 == d.length)
                  this.fire("neon-animation-finish", b, { bubbles: !1 });
               else
                  for (this.ab[a] = d, c = 0; c < d.length; c++)
                     d[c].animation.onfinish = function () {
                        this._shouldComplete(d) &&
                           (this._complete(d),
                           delete this.ab[a],
                           this.fire("neon-animation-finish", b, {
                              bubbles: !1,
                           }));
                     }.bind(this);
            }
         },
         cancelAnimation: function () {
            for (var a in this.ab) {
               var b = this.ab[a],
                  c;
               for (c in b)
                  b[c].animation &&
                     b[c].animation.cancel &&
                     b[c].animation.cancel();
            }
            this.ab = {};
         },
      },
   ];
   var yj = x([
      '\n    <style>\n      :host {\n        position: fixed;\n      }\n\n      #contentWrapper ::slotted(*) {\n        overflow: auto;\n      }\n\n      #contentWrapper.animating ::slotted(*) {\n        overflow: hidden;\n        pointer-events: none;\n      }\n    </style>\n\n    <div id="contentWrapper">\n      <slot id="content" name="dropdown-content"></slot>\n    </div>\n',
   ]);
   N({
      _template: G(yj),
      is: "iron-dropdown",
      behaviors: [ii, Ra, wj, xj],
      properties: {
         horizontalAlign: {
            type: String,
            value: "left",
            reflectToAttribute: !0,
         },
         verticalAlign: { type: String, value: "top", reflectToAttribute: !0 },
         openAnimationConfig: { type: Object },
         closeAnimationConfig: { type: Object },
         focusTarget: { type: Object },
         noAnimations: { type: Boolean, value: !1 },
         allowOutsideScroll: {
            type: Boolean,
            value: !1,
            observer: "_allowOutsideScrollChanged",
         },
      },
      listeners: { "neon-animation-finish": "_onNeonAnimationFinish" },
      observers: [
         "_updateOverlayPosition(positionTarget, verticalAlign, horizontalAlign, verticalOffset, horizontalOffset)",
      ],
      get g() {
         for (
            var a = L(this.$.content).getDistributedNodes(),
               b = 0,
               c = a.length;
            b < c;
            b++
         )
            if (a[b].nodeType === Node.ELEMENT_NODE) return a[b];
      },
      ready: function () {
         this.scrollAction ||
            (this.scrollAction = this.allowOutsideScroll ? "refit" : "lock");
         this.h = !0;
      },
      attached: function () {
         (this.sizingTarget && this.sizingTarget !== this) ||
            (this.sizingTarget = this.g || this);
      },
      detached: function () {
         this.cancelAnimation();
      },
      _openedChanged: function () {
         this.opened && this.disabled
            ? this.cancel()
            : (this.cancelAnimation(),
              this._updateAnimationConfig(),
              vj._openedChanged.apply(this, arguments));
      },
      _renderOpened: function () {
         !this.noAnimations && this.animationConfig.open
            ? (this.$.contentWrapper.classList.add("animating"),
              this.playAnimation("open"))
            : vj._renderOpened.apply(this, arguments);
      },
      _renderClosed: function () {
         !this.noAnimations && this.animationConfig.close
            ? (this.$.contentWrapper.classList.add("animating"),
              this.playAnimation("close"))
            : vj._renderClosed.apply(this, arguments);
      },
      _onNeonAnimationFinish: function () {
         this.$.contentWrapper.classList.remove("animating");
         this.opened ? this._finishRenderOpened() : this._finishRenderClosed();
      },
      _updateAnimationConfig: function () {
         for (
            var a = this.g,
               b = [].concat(
                  this.openAnimationConfig || [],
                  this.closeAnimationConfig || []
               ),
               c = 0;
            c < b.length;
            c++
         )
            b[c].node = a;
         this.animationConfig = {
            open: this.openAnimationConfig,
            close: this.closeAnimationConfig,
         };
      },
      _updateOverlayPosition: function () {
         this.isAttached && this.notifyResize();
      },
      _allowOutsideScrollChanged: function (a) {
         this.h &&
            (a
               ? (this.scrollAction && "lock" !== this.scrollAction) ||
                 (this.scrollAction = "refit")
               : (this.scrollAction = "lock"));
      },
      _applyFocus: function () {
         var a = this.focusTarget || this.g;
         a && this.opened && !this.noAutoFocus
            ? a.focus()
            : vj._applyFocus.apply(this, arguments);
      },
   });
   var zj = {
      properties: {
         animationTiming: {
            type: Object,
            value: function () {
               return {
                  duration: 500,
                  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                  fill: "both",
               };
            },
         },
      },
      zj: !0,
      created: function () {
         document.body.animate ||
            console.warn(
               "No web animations detected. This element will not function without a web animations polyfill."
            );
      },
      timingFromConfig: function (a) {
         if (a.timing)
            for (var b in a.timing) this.animationTiming[b] = a.timing[b];
         return this.animationTiming;
      },
      setPrefixedProperty: function (a, b, c) {
         for (
            var d = {
                  transform: ["webkitTransform"],
                  transformOrigin: [
                     "mozTransformOrigin",
                     "webkitTransformOrigin",
                  ],
               }[b],
               e,
               f = 0;
            (e = d[f]);
            f++
         )
            a.style[e] = c;
         a.style[b] = c;
      },
      complete: function () {},
   };
   N({
      is: "fade-in-animation",
      _template: null,
      behaviors: [zj],
      configure: function (a) {
         return (this.g = new KeyframeEffect(
            a.node,
            [{ opacity: "0" }, { opacity: "1" }],
            this.timingFromConfig(a)
         ));
      },
   });
   N({
      is: "fade-out-animation",
      _template: null,
      behaviors: [zj],
      configure: function (a) {
         return (this.g = new KeyframeEffect(
            a.node,
            [{ opacity: "1" }, { opacity: "0" }],
            this.timingFromConfig(a)
         ));
      },
   });
   N({
      is: "paper-menu-grow-height-animation",
      _template: null,
      behaviors: [zj],
      configure: function (a) {
         var b = a.node,
            c = b.getBoundingClientRect().height;
         return (this.g = new KeyframeEffect(
            b,
            [{ height: c / 2 + "px" }, { height: c + "px" }],
            this.timingFromConfig(a)
         ));
      },
   });
   N({
      is: "paper-menu-grow-width-animation",
      _template: null,
      behaviors: [zj],
      configure: function (a) {
         var b = a.node,
            c = b.getBoundingClientRect().width;
         return (this.g = new KeyframeEffect(
            b,
            [{ width: c / 2 + "px" }, { width: c + "px" }],
            this.timingFromConfig(a)
         ));
      },
   });
   N({
      is: "paper-menu-shrink-width-animation",
      _template: null,
      behaviors: [zj],
      configure: function (a) {
         var b = a.node,
            c = b.getBoundingClientRect().width;
         return (this.g = new KeyframeEffect(
            b,
            [{ width: c + "px" }, { width: c - c / 20 + "px" }],
            this.timingFromConfig(a)
         ));
      },
   });
   N({
      is: "paper-menu-shrink-height-animation",
      _template: null,
      behaviors: [zj],
      configure: function (a) {
         var b = a.node,
            c = b.getBoundingClientRect().height;
         this.setPrefixedProperty(b, "transformOrigin", "0 0");
         return (this.g = new KeyframeEffect(
            b,
            [
               { height: c + "px", transform: "translateY(0)" },
               { height: c / 2 + "px", transform: "translateY(-20px)" },
            ],
            this.timingFromConfig(a)
         ));
      },
   });
   var Aj = x([
         '<custom-style>\n  <style is="custom-style">\n    html {\n\n      --shadow-transition: {\n        transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);\n      };\n\n      --shadow-none: {\n        box-shadow: none;\n      };\n\n      /* from http://codepen.io/shyndman/pen/c5394ddf2e8b2a5c9185904b57421cdb */\n\n      --shadow-elevation-2dp: {\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n                    0 1px 5px 0 rgba(0, 0, 0, 0.12),\n                    0 3px 1px -2px rgba(0, 0, 0, 0.2);\n      };\n\n      --shadow-elevation-3dp: {\n        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),\n                    0 1px 8px 0 rgba(0, 0, 0, 0.12),\n                    0 3px 3px -2px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-4dp: {\n        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),\n                    0 1px 10px 0 rgba(0, 0, 0, 0.12),\n                    0 2px 4px -1px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-6dp: {\n        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),\n                    0 1px 18px 0 rgba(0, 0, 0, 0.12),\n                    0 3px 5px -1px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-8dp: {\n        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),\n                    0 3px 14px 2px rgba(0, 0, 0, 0.12),\n                    0 5px 5px -3px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-12dp: {\n        box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),\n                    0 4px 22px 3px rgba(0, 0, 0, 0.12),\n                    0 6px 7px -4px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-16dp: {\n        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),\n                    0  6px 30px 5px rgba(0, 0, 0, 0.12),\n                    0  8px 10px -5px rgba(0, 0, 0, 0.4);\n      };\n\n      --shadow-elevation-24dp: {\n        box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),\n                    0 9px 46px 8px rgba(0, 0, 0, 0.12),\n                    0 11px 15px -7px rgba(0, 0, 0, 0.4);\n      };\n    }\n  </style>\n</custom-style>',
      ]),
      Bj = G(Aj);
   Bj.setAttribute("style", "display: none;");
   document.head.appendChild(Bj.content);
   var Cj = x([
         '\n    <style>\n      :host {\n        display: inline-block;\n        position: relative;\n        padding: 8px;\n        outline: none;\n\n        @apply --paper-menu-button;\n      }\n\n      :host([disabled]) {\n        cursor: auto;\n        color: var(--disabled-text-color);\n\n        @apply --paper-menu-button-disabled;\n      }\n\n      iron-dropdown {\n        @apply --paper-menu-button-dropdown;\n      }\n\n      .dropdown-content {\n        @apply --shadow-elevation-2dp;\n\n        position: relative;\n        border-radius: 2px;\n        background-color: var(--paper-menu-button-dropdown-background, var(--primary-background-color));\n\n        @apply --paper-menu-button-content;\n      }\n\n      :host([vertical-align="top"]) .dropdown-content {\n        margin-bottom: 20px;\n        margin-top: -10px;\n        top: 10px;\n      }\n\n      :host([vertical-align="bottom"]) .dropdown-content {\n        bottom: 10px;\n        margin-bottom: -10px;\n        margin-top: 20px;\n      }\n\n      #trigger {\n        cursor: pointer;\n      }\n    </style>\n\n    <div id="trigger" on-tap="toggle">\n      <slot name="dropdown-trigger"></slot>\n    </div>\n\n    <iron-dropdown id="dropdown" opened="{{opened}}" horizontal-align="[[horizontalAlign]]" vertical-align="[[verticalAlign]]" dynamic-align="[[dynamicAlign]]" horizontal-offset="[[horizontalOffset]]" vertical-offset="[[verticalOffset]]" no-overlap="[[noOverlap]]" open-animation-config="[[openAnimationConfig]]" close-animation-config="[[closeAnimationConfig]]" no-animations="[[noAnimations]]" focus-target="[[_dropdownContent]]" allow-outside-scroll="[[allowOutsideScroll]]" restore-focus-on-close="[[restoreFocusOnClose]]" on-iron-overlay-canceled="__onIronOverlayCanceled" expand-sizing-target-for-scrollbars="[[expandSizingTargetForScrollbars]]">\n      <div slot="dropdown-content" class="dropdown-content">\n        <slot id="content" name="dropdown-content"></slot>\n      </div>\n    </iron-dropdown>\n',
      ]),
      Dj = { ae: "cubic-bezier(.3,.95,.5,1)", tk: 400 };
   function Ej() {}
   m = Ej.prototype;
   m.registered = function () {
      this._prepKeyBindings();
   };
   m.addOwnKeyBinding = function (a, b) {
      this._imperativeKeyBindings[a] = b;
      this._prepKeyBindings();
      this._resetKeyEventListeners();
   };
   m.removeOwnKeyBindings = function () {
      this._imperativeKeyBindings = {};
      this._prepKeyBindings();
      this._resetKeyEventListeners();
   };
   m.keyboardEventMatchesKeys = function (a, b) {
      b = Qa(b);
      for (var c = 0; c < b.length; ++c) if (Oa(b[c], a)) return !0;
      return !1;
   };
   m._collectKeyBindings = function () {
      var a = this.behaviors.map(function (b) {
         return b.ka;
      });
      -1 === a.indexOf(this.ka) && a.push(this.ka);
      return a;
   };
   m._prepKeyBindings = function () {
      this.ca = {};
      this._collectKeyBindings().forEach(function (c) {
         for (var d in c) this._addKeyBinding(d, c[d]);
      }, this);
      for (var a in this._imperativeKeyBindings)
         this._addKeyBinding(a, this._imperativeKeyBindings[a]);
      for (var b in this.ca)
         this.ca[b].sort(function (c, d) {
            c = c[0].lb;
            return c === d[0].lb ? 0 : c ? -1 : 1;
         });
   };
   m._addKeyBinding = function (a, b) {
      Qa(a).forEach(function (c) {
         this.ca[c.event] = this.ca[c.event] || [];
         this.ca[c.event].push([c, b]);
      }, this);
   };
   m._resetKeyEventListeners = function () {
      this._unlistenKeyEventListeners();
      this.isAttached && this._listenKeyEventListeners();
   };
   m._listenKeyEventListeners = function () {
      this.keyEventTarget &&
         Object.keys(this.ca).forEach(function (a) {
            var b = this._onKeyBindingEvent.bind(this, this.ca[a]);
            this._boundKeyHandlers.push([this.keyEventTarget, a, b]);
            this.keyEventTarget.addEventListener(a, b);
         }, this);
   };
   m._unlistenKeyEventListeners = function () {
      for (var a, b, c; this._boundKeyHandlers.length; )
         (a = this._boundKeyHandlers.pop()),
            (b = a[0]),
            (c = a[1]),
            (a = a[2]),
            b.removeEventListener(c, a);
   };
   m._onKeyBindingEvent = function (a, b) {
      this.stopKeyboardEventPropagation && b.stopPropagation();
      if (!b.defaultPrevented)
         for (var c = 0; c < a.length; c++) {
            var d = a[c][0],
               e = a[c][1];
            if (
               Oa(d, b) &&
               (this._triggerKeyHandler(d, e, b), b.defaultPrevented)
            )
               break;
         }
   };
   m._triggerKeyHandler = function (a, b, c) {
      var d = Object.create(a);
      d.ub = c;
      a = new CustomEvent(a.event, { detail: d, cancelable: !0 });
      this[b].call(this, a);
      a.defaultPrevented && c.preventDefault();
   };
   m._focusBlurHandler = function (a) {
      this._setFocused("focus" === a.type);
   };
   m._changedControlState = function () {
      this._controlStateChanged && this._controlStateChanged();
   };
   m._setFocused = function () {};
   Ej = N({
      _template: G(Cj),
      is: "paper-menu-button",
      behaviors: [Ra, ii],
      properties: {
         opened: {
            type: Boolean,
            value: !1,
            notify: !0,
            observer: "_openedChanged",
         },
         horizontalAlign: {
            type: String,
            value: "left",
            reflectToAttribute: !0,
         },
         verticalAlign: { type: String, value: "top", reflectToAttribute: !0 },
         dynamicAlign: { type: Boolean },
         horizontalOffset: { type: Number, value: 0, notify: !0 },
         verticalOffset: { type: Number, value: 0, notify: !0 },
         noOverlap: { type: Boolean },
         noAnimations: { type: Boolean, value: !1 },
         ignoreSelect: { type: Boolean, value: !1 },
         closeOnActivate: { type: Boolean, value: !1 },
         openAnimationConfig: {
            type: Object,
            value: function () {
               return [
                  {
                     name: "fade-in-animation",
                     timing: { delay: 100, duration: 200 },
                  },
                  {
                     name: "paper-menu-grow-width-animation",
                     timing: { delay: 100, duration: 150, easing: Dj.ae },
                  },
                  {
                     name: "paper-menu-grow-height-animation",
                     timing: { delay: 100, duration: 275, easing: Dj.ae },
                  },
               ];
            },
         },
         closeAnimationConfig: {
            type: Object,
            value: function () {
               return [
                  { name: "fade-out-animation", timing: { duration: 150 } },
                  {
                     name: "paper-menu-shrink-width-animation",
                     timing: { delay: 100, duration: 50, easing: Dj.ae },
                  },
                  {
                     name: "paper-menu-shrink-height-animation",
                     timing: { duration: 200, easing: "ease-in" },
                  },
               ];
            },
         },
         allowOutsideScroll: { type: Boolean, value: !1 },
         restoreFocusOnClose: { type: Boolean, value: !0 },
         expandSizingTargetForScrollbars: { type: Boolean, value: !1 },
         _dropdownContent: { type: Object },
      },
      hostAttributes: { role: "group", "aria-haspopup": "true" },
      listeners: {
         "iron-activate": "_onIronActivate",
         "iron-select": "_onIronSelect",
      },
      get g() {
         for (
            var a = L(this.$.content).getDistributedNodes(),
               b = 0,
               c = a.length;
            b < c;
            b++
         )
            if (a[b].nodeType === Node.ELEMENT_NODE) return a[b];
      },
      toggle: function () {
         this.opened ? this.close() : this.open();
      },
      open: function () {
         this.disabled || this.$.dropdown.open();
      },
      close: function () {
         this.$.dropdown.close();
      },
      _onIronSelect: function () {
         this.ignoreSelect || this.close();
      },
      _onIronActivate: function () {
         this.closeOnActivate && this.close();
      },
      _openedChanged: function (a, b) {
         a
            ? ((this._dropdownContent = this.g),
              this.fire("paper-dropdown-open"))
            : null != b && this.fire("paper-dropdown-close");
      },
      _disabledChanged: function (a) {
         ii._disabledChanged.apply(this, arguments);
         a && this.opened && this.close();
      },
      __onIronOverlayCanceled: function (a) {
         var b = this.$.trigger;
         -1 < L(a.detail).path.indexOf(b) && a.preventDefault();
      },
   });
   Object.keys(Dj).forEach(function (a) {
      Ej[a] = Dj[a];
   });
   var Fj = x([
         '\n    <style include="paper-dropdown-menu-shared-styles"></style>\n\n    <paper-menu-button id="menuButton" vertical-align="[[verticalAlign]]" horizontal-align="[[horizontalAlign]]" dynamic-align="[[dynamicAlign]]" vertical-offset="[[_computeMenuVerticalOffset(noLabelFloat, verticalOffset)]]" disabled="[[disabled]]" no-animations="[[noAnimations]]" on-iron-select="_onIronSelect" on-iron-deselect="_onIronDeselect" opened="{{opened}}" close-on-activate allow-outside-scroll="[[allowOutsideScroll]]" restore-focus-on-close="[[restoreFocusOnClose]]" expand-sizing-target-for-scrollbars="[[expandSizingTargetForScrollbars]]">\n      \x3c!-- support hybrid mode: user might be using paper-menu-button 1.x which distributes via <content> --\x3e\n      <div class="dropdown-trigger" slot="dropdown-trigger">\n        <paper-ripple></paper-ripple>\n        \x3c!-- paper-input has type="text" for a11y, do not remove --\x3e\n        <paper-input id="input" type="text" invalid="[[invalid]]" readonly disabled="[[disabled]]" value="[[value]]" placeholder="[[placeholder]]" error-message="[[errorMessage]]" always-float-label="[[alwaysFloatLabel]]" no-label-float="[[noLabelFloat]]" label="[[label]]" input-role="button" input-aria-haspopup="listbox" autocomplete="off">\n          \x3c!-- support hybrid mode: user might be using paper-input 1.x which distributes via <content> --\x3e\n          <iron-icon icon="paper-dropdown-menu:arrow-drop-down" suffix slot="suffix"></iron-icon>\n        </paper-input>\n      </div>\n      <slot id="content" name="dropdown-content" slot="dropdown-content"></slot>\n    </paper-menu-button>\n',
      ]),
      Gj = Wf(HTMLElement);
   N({
      _template: G(Fj),
      is: "paper-dropdown-menu",
      behaviors: [ki, ii, bi, fi],
      properties: {
         selectedItemLabel: { type: String, notify: !0, readOnly: !0 },
         selectedItem: { type: Object, notify: !0, readOnly: !0 },
         value: { type: String, notify: !0 },
         label: { type: String },
         placeholder: { type: String },
         errorMessage: { type: String },
         opened: {
            type: Boolean,
            notify: !0,
            value: !1,
            observer: "_openedChanged",
         },
         allowOutsideScroll: { type: Boolean, value: !1 },
         noLabelFloat: { type: Boolean, value: !1, reflectToAttribute: !0 },
         alwaysFloatLabel: { type: Boolean, value: !1 },
         noAnimations: { type: Boolean, value: !1 },
         horizontalAlign: { type: String, value: "right" },
         verticalAlign: { type: String, value: "top" },
         verticalOffset: Number,
         dynamicAlign: { type: Boolean },
         restoreFocusOnClose: { type: Boolean, value: !0 },
         expandSizingTargetForScrollbars: { type: Boolean, value: !1 },
      },
      listeners: { tap: "_onTap" },
      ka: { "up down": "open", esc: "close" },
      observers: ["_selectedItemChanged(selectedItem)"],
      _attachDom: function (a) {
         var b = E(this);
         b.attachShadow({ mode: "open", ll: !0, kk: a });
         b.shadowRoot.appendChild(a);
         return Gj.prototype._attachDom.call(this, a);
      },
      focus: function () {
         this.$.input.ec.focus();
      },
      attached: function () {
         var a = this.g;
         a && a.selectedItem && this._setSelectedItem(a.selectedItem);
      },
      get g() {
         for (
            var a = L(this.$.content).getDistributedNodes(),
               b = 0,
               c = a.length;
            b < c;
            b++
         )
            if (a[b].nodeType === Node.ELEMENT_NODE) return a[b];
      },
      open: function () {
         this.$.menuButton.open();
      },
      close: function () {
         this.$.menuButton.close();
      },
      _onIronSelect: function (a) {
         this._setSelectedItem(a.detail.item);
      },
      _onIronDeselect: function () {
         this._setSelectedItem(null);
      },
      _onTap: function (a) {
         _findOriginalTarget$$module$third_party$javascript$polymer$v2$polymer$lib$utils$gestures(
            a
         ) === this && this.open();
      },
      _selectedItemChanged: function (a) {
         var b = "";
         a
            ? (b = a.label || a.getAttribute("label") || a.textContent.trim())
            : (b = "");
         this.value = b;
         this._setSelectedItemLabel(b);
      },
      _computeMenuVerticalOffset: function (a, b) {
         return b ? b : a ? -4 : 8;
      },
      _getValidity: function () {
         return (
            this.disabled || !this.required || (this.required && !!this.value)
         );
      },
      _openedChanged: function () {
         var a = this.opened ? "true" : "false",
            b = this.g;
         b && b.setAttribute("aria-expanded", a);
      },
   });
   var Hj = [ki, ii, { hostAttributes: { role: "option", tabindex: "0" } }];
   var Ij = x([
         "<dom-module id=\"paper-item-shared-styles\">\n  <template>\n    <style>\n      :host, .paper-item {\n        display: block;\n        position: relative;\n        min-height: var(--paper-item-min-height, 48px);\n        padding: 0px 16px;\n      }\n\n      .paper-item {\n        @apply --paper-font-subhead;\n        border:none;\n        outline: none;\n        background: white;\n        width: 100%;\n        text-align: left;\n      }\n\n      :host([hidden]), .paper-item[hidden] {\n        display: none !important;\n      }\n\n      :host(.iron-selected), .paper-item.iron-selected {\n        font-weight: var(--paper-item-selected-weight, bold);\n\n        @apply --paper-item-selected;\n      }\n\n      :host([disabled]), .paper-item[disabled] {\n        color: var(--paper-item-disabled-color, var(--disabled-text-color));\n\n        @apply --paper-item-disabled;\n      }\n\n      :host(:focus), .paper-item:focus {\n        position: relative;\n        outline: 0;\n\n        @apply --paper-item-focused;\n      }\n\n      :host(:focus):before, .paper-item:focus:before {\n        @apply --layout-fit;\n\n        background: currentColor;\n        content: '';\n        opacity: var(--dark-divider-opacity);\n        pointer-events: none;\n\n        @apply --paper-item-focused-before;\n      }\n    </style>\n  </template>\n</dom-module>",
      ]),
      Jj = G(Ij);
   Jj.setAttribute("style", "display: none;");
   document.head.appendChild(Jj.content);
   var Kj = x([
      '\n    <style include="paper-item-shared-styles">\n      :host {\n        @apply --layout-horizontal;\n        @apply --layout-center;\n        @apply --paper-font-subhead;\n\n        @apply --paper-item;\n\n        min-height: var(--paper-item-min-height, 48px);\n      }\n    </style>\n    <slot></slot>\n',
   ]);
   N({ _template: G(Kj), is: "paper-item", behaviors: [Hj] });
   function Lj(a) {
      this.multi = !1;
      this.selection = [];
      this.g = a;
   }
   m = Lj.prototype;
   m.get = function () {
      return this.multi ? this.selection.slice() : this.selection[0];
   };
   m.clear = function (a) {
      this.selection.slice().forEach(function (b) {
         (!a || 0 > a.indexOf(b)) && Mj(this, b, !1);
      }, this);
   };
   m.isSelected = function (a) {
      return 0 <= this.selection.indexOf(a);
   };
   function Mj(a, b, c) {
      if (null != b && c !== a.isSelected(b)) {
         if (c) a.selection.push(b);
         else {
            var d = a.selection.indexOf(b);
            0 <= d && a.selection.splice(d, 1);
         }
         a.g && a.g(b, c);
      }
   }
   m.select = function (a) {
      this.multi
         ? this.toggle(a)
         : this.get() !== a && (Mj(this, this.get(), !1), Mj(this, a, !0));
   };
   m.toggle = function (a) {
      Mj(this, a, !this.isSelected(a));
   };
   var Nj = {
      properties: {
         attrForSelected: { type: String, value: null },
         selected: { type: String, notify: !0 },
         selectedItem: { type: Object, readOnly: !0, notify: !0 },
         activateEvent: {
            type: String,
            value: "tap",
            observer: "_activateEventChanged",
         },
         selectable: String,
         selectedClass: { type: String, value: "iron-selected" },
         selectedAttribute: { type: String, value: null },
         fallbackSelection: { type: String, value: null },
         items: {
            type: Array,
            readOnly: !0,
            notify: !0,
            value: function () {
               return [];
            },
         },
         _excludedLocalNames: {
            type: Object,
            value: function () {
               return {
                  template: 1,
                  "dom-bind": 1,
                  "dom-if": 1,
                  "dom-repeat": 1,
               };
            },
         },
      },
      observers: [
         "_updateAttrForSelected(attrForSelected)",
         "_updateSelected(selected)",
         "_checkFallback(fallbackSelection)",
      ],
      created: function () {
         this.ni = this._filterItem.bind(this);
         this.va = new Lj(this._applySelection.bind(this));
      },
      attached: function () {
         this.la = this._observeItems(this);
         this._addListener(this.activateEvent);
      },
      detached: function () {
         this.la && L(this).unobserveNodes(this.la);
         this._removeListener(this.activateEvent);
      },
      indexOf: function (a) {
         return this.items ? this.items.indexOf(a) : -1;
      },
      select: function (a) {
         this.selected = a;
      },
      selectPrevious: function () {
         var a = this.items.length,
            b = a - 1;
         void 0 !== this.selected &&
            (b = (Number(this._valueToIndex(this.selected)) - 1 + a) % a);
         this.selected = this._indexToValue(b);
      },
      selectNext: function () {
         var a = 0;
         void 0 !== this.selected &&
            (a =
               (Number(this._valueToIndex(this.selected)) + 1) %
               this.items.length);
         this.selected = this._indexToValue(a);
      },
      selectIndex: function (a) {
         this.select(this._indexToValue(a));
      },
      forceSynchronousItemUpdate: function () {
         this.la && "function" === typeof this.la.flush
            ? this.la.flush()
            : this._updateItems();
      },
      get kj() {
         return null != this.selected;
      },
      _checkFallback: function () {
         this._updateSelected();
      },
      _addListener: function (a) {
         this.listen(this, a, "_activateHandler");
      },
      _removeListener: function (a) {
         this.unlisten(this, a, "_activateHandler");
      },
      _activateEventChanged: function (a, b) {
         this._removeListener(b);
         this._addListener(a);
      },
      _updateItems: function () {
         var a = L(this).queryDistributedElements(this.selectable || "*");
         a = Array.prototype.filter.call(a, this.ni);
         this._setItems(a);
      },
      _updateAttrForSelected: function () {
         this.selectedItem &&
            (this.selected = this._valueForItem(this.selectedItem));
      },
      _updateSelected: function () {
         this._selectSelected(this.selected);
      },
      _selectSelected: function () {
         if (this.items) {
            var a = this._valueToItem(this.selected);
            a ? this.va.select(a) : this.va.clear();
            this.fallbackSelection &&
               this.items.length &&
               void 0 === this.va.get() &&
               (this.selected = this.fallbackSelection);
         }
      },
      _filterItem: function (a) {
         return !this._excludedLocalNames[a.localName];
      },
      _valueToItem: function (a) {
         return null == a ? null : this.items[this._valueToIndex(a)];
      },
      _valueToIndex: function (a) {
         if (this.attrForSelected)
            for (var b = 0, c; (c = this.items[b]); b++) {
               if (this._valueForItem(c) == a) return b;
            }
         else return Number(a);
      },
      _indexToValue: function (a) {
         if (this.attrForSelected) {
            if ((a = this.items[a])) return this._valueForItem(a);
         } else return a;
      },
      _valueForItem: function (a) {
         if (!a) return null;
         if (!this.attrForSelected)
            return (a = this.indexOf(a)), -1 === a ? null : a;
         var b = a[Mb(this.attrForSelected)];
         return void 0 != b ? b : a.getAttribute(this.attrForSelected);
      },
      _applySelection: function (a, b) {
         this.selectedClass && this.toggleClass(this.selectedClass, b, a);
         this.selectedAttribute &&
            this.toggleAttribute.call(a, this.selectedAttribute, b);
         this._selectionChange();
         this.fire("iron-" + (b ? "select" : "deselect"), { item: a });
      },
      _selectionChange: function () {
         this._setSelectedItem(this.va.get());
      },
      _observeItems: function (a) {
         return L(a).observeNodes(function (b) {
            this._updateItems();
            this._updateSelected();
            this.fire("iron-items-changed", b, { bubbles: !1, cancelable: !1 });
         });
      },
      _activateHandler: function (a) {
         a = a.target;
         for (var b = this.items; a && a != this; ) {
            var c = b.indexOf(a);
            if (0 <= c) {
               b = this._indexToValue(c);
               this._itemActivate(b, a);
               break;
            }
            a = a.parentNode;
         }
      },
      _itemActivate: function (a, b) {
         this.fire(
            "iron-activate",
            { selected: a, item: b },
            { cancelable: !0 }
         ).defaultPrevented || this.select(a);
      },
   };
   var Oj = {
      properties: {
         multi: { type: Boolean, value: !1, observer: "multiChanged" },
         selectedValues: {
            type: Array,
            notify: !0,
            value: function () {
               return [];
            },
         },
         selectedItems: {
            type: Array,
            readOnly: !0,
            notify: !0,
            value: function () {
               return [];
            },
         },
      },
      observers: ["_updateSelected(selectedValues.splices)"],
      select: function (a) {
         this.multi ? this._toggleSelected(a) : (this.selected = a);
      },
      multiChanged: function (a) {
         this.va.multi = a;
         this._updateSelected();
      },
      get kj() {
         return (
            null != this.selected ||
            (null != this.selectedValues && this.selectedValues.length)
         );
      },
      _updateAttrForSelected: function () {
         this.multi
            ? this.selectedItems &&
              0 < this.selectedItems.length &&
              (this.selectedValues = this.selectedItems
                 .map(function (a) {
                    return this._indexToValue(this.indexOf(a));
                 }, this)
                 .filter(function (a) {
                    return null != a;
                 }, this))
            : Nj._updateAttrForSelected.apply(this);
      },
      _updateSelected: function () {
         this.multi
            ? this._selectMulti(this.selectedValues)
            : this._selectSelected(this.selected);
      },
      _selectMulti: function (a) {
         a = a || [];
         a = (this._valuesToItems(a) || []).filter(function (c) {
            return null !== c && void 0 !== c;
         });
         this.va.clear(a);
         for (var b = 0; b < a.length; b++) Mj(this.va, a[b], !0);
         this.fallbackSelection &&
            !this.va.get().length &&
            this._valueToItem(this.fallbackSelection) &&
            this.select(this.fallbackSelection);
      },
      _selectionChange: function () {
         var a = this.va.get();
         this.multi
            ? (this._setSelectedItems(a),
              this._setSelectedItem(a.length ? a[0] : null))
            : null !== a && void 0 !== a
            ? (this._setSelectedItems([a]), this._setSelectedItem(a))
            : (this._setSelectedItems([]), this._setSelectedItem(null));
      },
      _toggleSelected: function (a) {
         var b = this.selectedValues.indexOf(a);
         0 > b
            ? this.push("selectedValues", a)
            : this.splice("selectedValues", b, 1);
      },
      _valuesToItems: function (a) {
         return null == a
            ? null
            : a.map(function (b) {
                 return this._valueToItem(b);
              }, this);
      },
   };
   var Pj = {
         properties: {
            focusedItem: {
               observer: "_focusedItemChanged",
               readOnly: !0,
               type: Object,
            },
            attrForItemTitle: { type: String },
            disabled: {
               type: Boolean,
               value: !1,
               observer: "_disabledChanged",
            },
         },
         ci: "Alt AltGraph CapsLock Control Fn FnLock Hyper Meta NumLock OS ScrollLock Shift Super Symbol SymbolLock".split(
            " "
         ),
         di: 1e3,
         mg: 0,
         hostAttributes: { role: "menu" },
         observers: ["_updateMultiselectable(multi)"],
         listeners: {
            focus: "_onFocus",
            keydown: "_onKeydown",
            "iron-items-changed": "_onIronItemsChanged",
         },
         ka: {
            up: "_onUpKey",
            down: "_onDownKey",
            esc: "_onEscKey",
            "shift+tab:keydown": "_onShiftTabDown",
         },
         attached: function () {
            this._resetTabindices();
         },
         select: function (a) {
            this.we && (this.cancelAsync(this.we), (this.we = null));
            var b = this._valueToItem(a);
            (b && b.hasAttribute("disabled")) ||
               (this._setFocusedItem(b), Oj.select.apply(this, arguments));
         },
         _resetTabindices: function () {
            var a = this.multi
               ? this.selectedItems && this.selectedItems[0]
               : this.selectedItem;
            this.items.forEach(function (b) {
               b.setAttribute("tabindex", b === a ? "0" : "-1");
               b.setAttribute("aria-selected", this.va.isSelected(b));
            }, this);
         },
         _updateMultiselectable: function (a) {
            a
               ? this.setAttribute("aria-multiselectable", "true")
               : this.removeAttribute("aria-multiselectable");
         },
         _focusWithKeyboardEvent: function (a) {
            if (-1 === this.ci.indexOf(a.key)) {
               this.cancelDebouncer("_clearSearchText");
               var b = this.pg || "";
               b += (
                  a.key && 1 == a.key.length
                     ? a.key
                     : String.fromCharCode(a.keyCode)
               ).toLocaleLowerCase();
               a = b.length;
               for (var c = 0, d; (d = this.items[c]); c++)
                  if (!d.hasAttribute("disabled")) {
                     var e = this.attrForItemTitle || "textContent";
                     e = (d[e] || d.getAttribute(e) || "").trim();
                     if (
                        !(e.length < a) &&
                        e.slice(0, a).toLocaleLowerCase() == b
                     ) {
                        this._setFocusedItem(d);
                        break;
                     }
                  }
               this.pg = b;
               this.debounce(
                  "_clearSearchText",
                  this._clearSearchText,
                  this.di
               );
            }
         },
         _clearSearchText: function () {
            this.pg = "";
         },
         _focusPrevious: function () {
            for (
               var a = this.items.length,
                  b = Number(this.indexOf(this.focusedItem)),
                  c = 1;
               c < a + 1;
               c++
            ) {
               var d = this.items[(b - c + a) % a];
               if (!d.hasAttribute("disabled")) {
                  var e = L(d).getOwnerRoot() || document;
                  this._setFocusedItem(d);
                  if (L(e).activeElement == d) break;
               }
            }
         },
         _focusNext: function () {
            for (
               var a = this.items.length,
                  b = Number(this.indexOf(this.focusedItem)),
                  c = 1;
               c < a + 1;
               c++
            ) {
               var d = this.items[(b + c) % a];
               if (!d.hasAttribute("disabled")) {
                  var e = L(d).getOwnerRoot() || document;
                  this._setFocusedItem(d);
                  if (L(e).activeElement == d) break;
               }
            }
         },
         _applySelection: function (a, b) {
            b
               ? a.setAttribute("aria-selected", "true")
               : a.setAttribute("aria-selected", "false");
            Nj._applySelection.apply(this, arguments);
         },
         _focusedItemChanged: function (a, b) {
            b && b.setAttribute("tabindex", "-1");
            !a ||
               a.hasAttribute("disabled") ||
               this.disabled ||
               (a.setAttribute("tabindex", "0"), a.focus());
         },
         _onIronItemsChanged: function (a) {
            a.detail.addedNodes.length && this._resetTabindices();
         },
         _onShiftTabDown: function () {
            var a = this.getAttribute("tabindex");
            Pj.jc = !0;
            this._setFocusedItem(null);
            this.setAttribute("tabindex", "-1");
            this.async(function () {
               this.setAttribute("tabindex", a);
               Pj.jc = !1;
            }, 1);
         },
         _onFocus: function (a) {
            !Pj.jc &&
               ((a = L(a).yc),
               a === this ||
                  "undefined" === typeof a.tabIndex ||
                  this.isLightDescendant(a)) &&
               (this.we = this.async(function () {
                  var b = this.multi
                     ? this.selectedItems && this.selectedItems[0]
                     : this.selectedItem;
                  this._setFocusedItem(null);
                  b
                     ? this._setFocusedItem(b)
                     : this.items[0] && this._focusNext();
               }));
         },
         _onUpKey: function (a) {
            this._focusPrevious();
            a.detail.ub.preventDefault();
         },
         _onDownKey: function (a) {
            this._focusNext();
            a.detail.ub.preventDefault();
         },
         _onEscKey: function () {
            var a = this.focusedItem;
            a && a.blur();
         },
         _onKeydown: function (a) {
            this.keyboardEventMatchesKeys(a, "up down esc") ||
               this._focusWithKeyboardEvent(a);
            a.stopPropagation();
         },
         _activateHandler: function (a) {
            Nj._activateHandler.call(this, a);
            a.stopPropagation();
         },
         _disabledChanged: function (a) {
            a
               ? ((this.mg = this.hasAttribute("tabindex") ? this.tabIndex : 0),
                 this.removeAttribute("tabindex"))
               : this.hasAttribute("tabindex") ||
                 this.setAttribute("tabindex", this.mg);
         },
         jc: !1,
      },
      Qj = [[Nj, Oj], Ra, Pj];
   var Rj = x([
      "\n    <style>\n      :host {\n        display: block;\n        padding: 8px 0;\n\n        background: var(--paper-listbox-background-color, var(--primary-background-color));\n        color: var(--paper-listbox-color, var(--primary-text-color));\n\n        @apply --paper-listbox;\n      }\n    </style>\n\n    <slot></slot>\n",
   ]);
   N({
      _template: G(Rj),
      is: "paper-listbox",
      behaviors: [Qj],
      hostAttributes: { role: "listbox" },
   });
   function Sj() {
      return H.apply(this, arguments) || this;
   }
   A(Sj, H);
   m = Sj.prototype;
   m.getMsg_ = function (a) {
      return V(a);
   };
   m.computeDisplayedValue_ = function () {
      var a = this.values.length;
      return 0 == a ? V("NONE_SELECTED") : V("SELECTED", { num: a });
   };
   m.onSelectAllClick_ = function (a) {
      this.values = this.items.map(function (b) {
         return b.value;
      });
      a.target.blur();
   };
   m.onSelectNoneClick_ = function (a) {
      this.values = [];
      a.target.blur();
   };
   m.onIronEvent_ = function (a) {
      a.stopPropagation();
   };
   m.onOpenedChanged_ = function (a) {
      a.detail.value &&
         ((a = new CustomEvent("overlay-will-open", {
            bubbles: !0,
            composed: !0,
         })),
         this.dispatchEvent(a));
   };
   t.Object.defineProperties(Sj, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview-multi-selector";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return $h;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               label: String,
               items: Array,
               values: { type: Array, notify: !0 },
               displayedValue_: {
                  type: String,
                  computed: "computeDisplayedValue_(values, values.*)",
                  readOnly: !0,
               },
            };
         },
      },
   });
   Sj.prototype._setDisplayedValue_ = function () {};
   customElements.define(Sj.is, Sj);
   var Tj, Uj;
   if (void 0 === Tj) {
      var Vj = document.createElement("template");
      Vj.innerHTML =
         '<paper-dropdown-menu id="dropdown" always-float-label="" label="[[label]]" title$="[[label]]" on-opened-changed="onOpenedChanged_">\n  <paper-listbox id="menu" slot="dropdown-content" attr-for-selected="data-value" selected="{{value}}" selectable="paper-item">\n    \n    <dom-if restamp="" if="[[showCustomOption]]">\n      <template>\n        <paper-item data-value="custom">[[getCustomLabel_()]]</paper-item>\n        <div class="divider"></div>\n      </template>\n    </dom-if>\n\n    <dom-repeat items="[[items]]" as="item">\n      <template>\n        <paper-item data-value="[[item.value]]">[[item.label]]</paper-item>\n      </template>\n    </dom-repeat>\n  </paper-listbox>\n</paper-dropdown-menu>\n';
      Vj.content.insertBefore(
         Yh().content.cloneNode(!0),
         Vj.content.firstChild
      );
      Tj = Vj;
   }
   Uj = Tj;
   function Wj() {
      return H.apply(this, arguments) || this;
   }
   A(Wj, H);
   Wj.prototype.getCustomLabel_ = function () {
      return V("CUSTOM");
   };
   Wj.prototype.onOpenedChanged_ = function (a) {
      a.detail.value &&
         ((a = new CustomEvent("overlay-will-open", {
            bubbles: !0,
            composed: !0,
         })),
         this.dispatchEvent(a));
   };
   t.Object.defineProperties(Wj, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview-selector";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return Uj;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               label: String,
               items: Array,
               showCustomOption: Boolean,
               value: { type: String, notify: !0 },
            };
         },
      },
   });
   customElements.define(Wj.is, Wj);
   var Xj, Yj;
   if (void 0 === Xj) {
      var Zj = document.createElement("template");
      Zj.innerHTML =
         '<style>\n  :host {\n    /* Opacity for disabled labels and inputs. The default paper-input opacity is too faint. */\n    --tf-creative-preview-disabled-opacity: 0.5;\n\n    display: block;\n  }\n\n  paper-input-container {\n    --paper-input-container-focus-color: var(--tf-creative-preview-accent-color);\n\n    --paper-input-container-underline: {\n      border-color: var(--tf-creative-preview-border-color);\n    };\n\n    --paper-input-container-input: {\n      font-size: inherit;\n    };\n\n    --paper-input-container-disabled: {\n      opacity: var(--tf-creative-preview-disabled-opacity);\n    };\n\n    display: inline-block;\n    /* Reduce bottom padding by 2px because the underline container contributes 2px of height.\n     * This bottom-aligns the input with the selectors, which don\'t show an underline. */\n    padding-bottom: 6px;\n    /* Crop the whitespace reserved for the floating label. We won\'t use the\n     * paper-input-container\'s label. */\n    margin-top: -28px;\n  }\n\n  #label {\n    height: 20px;\n    line-height: 20px;\n    color: var(--secondary-text-color);\n    padding-top: 8px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    cursor: default;\n  }\n\n  :host([disabled]) {\n    /* Although there are no mouse handlers on the host element itself, turning off pointer\n     * events is necessary to prevent the tooltip from appearing when the input is disabled.\n     * This is for consistency with other paper-input-containers. */\n    pointer-events: none;\n  }\n\n  :host([disabled]) #label {\n    opacity: var(--tf-creative-preview-disabled-opacity);\n  }\n\n  #inputs {\n    @apply --layout-horizontal;\n  }\n\n  input {\n    @apply --paper-input-container-shared-input-style;\n    font-size: inherit;\n\n    width: 40px;\n    text-align: center;\n\n    /* Additionally set the line-height value using height, required for IE. */\n    height: 24px;\n  }\n\n  input::-webkit-outer-spin-button,\n  input::-webkit-inner-spin-button {\n    /* Hide spinner in Webkit. This CSS must be defined here due to an issue with ::slotted()\n     * that does not permit styling this pseudo-element in TfTextSlider\'s template. See\n     * comment in tf-text-slider-v2.html. */\n    -webkit-appearance: none;\n    margin: 0;\n  }\n</style>\n\n<div id="label">[[label]]</div>\n\n<paper-input-container id="container" always-float-label="" disabled$="[[disabled]]">\n  \n  <div id="inputs" class="paper-input-input" slot="input">\n    <tf-text-slider>\n      <input id="width" type="number" slot="sliderinput" min$="[[min]]" max$="[[max]]" disabled$="[[disabled]]" on-changing="commitChange_" on-change="commitChange_" on-keypress="onKeypress_" on-blur="commitChange_">\n    </tf-text-slider>\n    x\n    <tf-text-slider>\n      <input id="height" type="number" slot="sliderinput" min$="[[min]]" max$="[[max]]" disabled$="[[disabled]]" on-changing="commitChange_" on-change="commitChange_" on-keypress="onKeypress_" on-blur="commitChange_">\n    </tf-text-slider>\n  </div>\n</paper-input-container>\n';
      Xj = Zj;
   }
   Yj = Xj;
   function ak() {
      return H.apply(this, arguments) || this;
   }
   A(ak, H);
   m = ak.prototype;
   m.labelChanged_ = function (a) {
      this.setAttribute("title", a);
   };
   m.valueChanged_ = function () {
      var a = T(this.value);
      a.width = this.validateValue_(a.width);
      a.height = this.validateValue_(a.height);
      U(a) == this.value
         ? ((this.$.width.value = a.width), (this.$.height.value = a.height))
         : (this.value = U(a));
   };
   m.commitChange_ = function () {
      this.value = U({
         width: this.$.width.value,
         height: this.$.height.value,
      });
   };
   m.onKeypress_ = function (a) {
      "Enter" == a.key && (this.commitChange_(), a.target.blur());
   };
   m.validateValue_ = function (a) {
      a = Number(a);
      isNaN(a) && (a = 0);
      return Math.min(Math.max(a, this.min), this.max);
   };
   t.Object.defineProperties(ak, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview-size-input";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return Yj;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               label: { type: String, observer: ak.prototype.labelChanged_ },
               value: {
                  type: String,
                  observer: ak.prototype.valueChanged_,
                  notify: !0,
               },
               min: { type: Number, value: 0 },
               max: { type: Number, value: Number.POSITIVE_INFINITY },
               disabled: { type: Boolean, reflectToAttribute: !0 },
            };
         },
      },
   });
   customElements.define(ak.is, ak); /*

Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
   var bk = x([
         '<iron-iconset-svg name="device" size="24">\n<svg><defs>\n<g id="access-alarm"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>\n<g id="access-alarms"><path d="M22 5.7l-4.6-3.9-1.3 1.5 4.6 3.9L22 5.7zM7.9 3.4L6.6 1.9 2 5.7l1.3 1.5 4.6-3.8zM12.5 8H11v6l4.7 2.9.8-1.2-4-2.4V8zM12 4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"></path></g>\n<g id="access-time"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>\n<g id="add-alarm"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"></path></g>\n<g id="airplanemode-active"><path d="M10.18 9"></path><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"></path></g>\n<g id="airplanemode-inactive"><path d="M13 9V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5v3.68l7.83 7.83L21 16v-2l-8-5zM3 5.27l4.99 4.99L2 14v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-3.73L18.73 21 20 19.73 4.27 4 3 5.27z"></path></g>\n<g id="battery-20"><path d="M7 17v3.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V17H7z"></path><path fill-opacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V17h10V5.33z"></path></g>\n<g id="battery-30"><path fill-opacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V15h10V5.33z"></path><path d="M7 15v5.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V15H7z"></path></g>\n<g id="battery-50"><path fill-opacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V13h10V5.33z"></path><path d="M7 13v7.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V13H7z"></path></g>\n<g id="battery-60"><path fill-opacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V11h10V5.33z"></path><path d="M7 11v9.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V11H7z"></path></g>\n<g id="battery-80"><path fill-opacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V9h10V5.33z"></path><path d="M7 9v11.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V9H7z"></path></g>\n<g id="battery-90"><path fill-opacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V8h10V5.33z"></path><path d="M7 8v12.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V8H7z"></path></g>\n<g id="battery-alert"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z"></path></g>\n<g id="battery-charging-20"><path d="M11 20v-3H7v3.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V17h-4.4L11 20z"></path><path fill-opacity=".3" d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V17h4v-2.5H9L13 7v5.5h2L12.6 17H17V5.33C17 4.6 16.4 4 15.67 4z"></path></g>\n<g id="battery-charging-30"><path fill-opacity=".3" d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v9.17h2L13 7v5.5h2l-1.07 2H17V5.33C17 4.6 16.4 4 15.67 4z"></path><path d="M11 20v-5.5H7v6.17C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V14.5h-3.07L11 20z"></path></g>\n<g id="battery-charging-50"><path d="M14.47 13.5L11 20v-5.5H9l.53-1H7v7.17C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V13.5h-2.53z"></path><path fill-opacity=".3" d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v8.17h2.53L13 7v5.5h2l-.53 1H17V5.33C17 4.6 16.4 4 15.67 4z"></path></g>\n<g id="battery-charging-60"><path fill-opacity=".3" d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V11h3.87L13 7v4h4V5.33C17 4.6 16.4 4 15.67 4z"></path><path d="M13 12.5h2L11 20v-5.5H9l1.87-3.5H7v9.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V11h-4v1.5z"></path></g>\n<g id="battery-charging-80"><path fill-opacity=".3" d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V9h4.93L13 7v2h4V5.33C17 4.6 16.4 4 15.67 4z"></path><path d="M13 12.5h2L11 20v-5.5H9L11.93 9H7v11.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V9h-4v3.5z"></path></g>\n<g id="battery-charging-90"><path fill-opacity=".3" d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V8h5.47L13 7v1h4V5.33C17 4.6 16.4 4 15.67 4z"></path><path d="M13 12.5h2L11 20v-5.5H9L12.47 8H7v12.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V8h-4v4.5z"></path></g>\n<g id="battery-charging-full"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM11 20v-5.5H9L13 7v5.5h2L11 20z"></path></g>\n<g id="battery-full"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"></path></g>\n<g id="battery-std"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"></path></g>\n<g id="battery-unknown"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zm-2.72 13.95h-1.9v-1.9h1.9v1.9zm1.35-5.26s-.38.42-.67.71c-.48.48-.83 1.15-.83 1.6h-1.6c0-.83.46-1.52.93-2l.93-.94c.27-.27.44-.65.44-1.06 0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5H9c0-1.66 1.34-3 3-3s3 1.34 3 3c0 .66-.27 1.26-.7 1.69z"></path></g>\n<g id="bluetooth"><path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"></path></g>\n<g id="bluetooth-connected"><path d="M7 12l-2-2-2 2 2 2 2-2zm10.71-4.29L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88zM19 10l-2 2 2 2 2-2-2-2z"></path></g>\n<g id="bluetooth-disabled"><path d="M13 5.83l1.88 1.88-1.6 1.6 1.41 1.41 3.02-3.02L12 2h-1v5.03l2 2v-3.2zM5.41 4L4 5.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l4.29-4.29 2.3 2.29L20 18.59 5.41 4zM13 18.17v-3.76l1.88 1.88L13 18.17z"></path></g>\n<g id="bluetooth-searching"><path d="M14.24 12.01l2.32 2.32c.28-.72.44-1.51.44-2.33 0-.82-.16-1.59-.43-2.31l-2.33 2.32zm5.29-5.3l-1.26 1.26c.63 1.21.98 2.57.98 4.02s-.36 2.82-.98 4.02l1.2 1.2c.97-1.54 1.54-3.36 1.54-5.31-.01-1.89-.55-3.67-1.48-5.19zm-3.82 1L10 2H9v7.59L4.41 5 3 6.41 8.59 12 3 17.59 4.41 19 9 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM11 5.83l1.88 1.88L11 9.59V5.83zm1.88 10.46L11 18.17v-3.76l1.88 1.88z"></path></g>\n<g id="brightness-auto"><path d="M10.85 12.65h2.3L12 9l-1.15 3.65zM20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM14.3 16l-.7-2h-3.2l-.7 2H7.8L11 7h2l3.2 9h-1.9z"></path></g>\n<g id="brightness-high"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path></g>\n<g id="brightness-low"><path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path></g>\n<g id="brightness-medium"><path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18V6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path></g>\n<g id="data-usage"><path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"></path></g>\n<g id="developer-mode"><path d="M7 5h10v2h2V3c0-1.1-.9-1.99-2-1.99L7 1c-1.1 0-2 .9-2 2v4h2V5zm8.41 11.59L20 12l-4.59-4.59L14 8.83 17.17 12 14 15.17l1.41 1.42zM10 15.17L6.83 12 10 8.83 8.59 7.41 4 12l4.59 4.59L10 15.17zM17 19H7v-2H5v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4h-2v2z"></path></g>\n<g id="devices"><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"></path></g>\n<g id="dvr"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zm-2-9H8v2h11V8zm0 4H8v2h11v-2zM7 8H5v2h2V8zm0 4H5v2h2v-2z"></path></g>\n<g id="gps-fixed"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>\n<g id="gps-not-fixed"><path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>\n<g id="gps-off"><path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06c-1.13.12-2.19.46-3.16.97l1.5 1.5C10.16 5.19 11.06 5 12 5c3.87 0 7 3.13 7 7 0 .94-.19 1.84-.52 2.65l1.5 1.5c.5-.96.84-2.02.97-3.15H23v-2h-2.06zM3 4.27l2.04 2.04C3.97 7.62 3.25 9.23 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c1.77-.2 3.38-.91 4.69-1.98L19.73 21 21 19.73 4.27 3 3 4.27zm13.27 13.27C15.09 18.45 13.61 19 12 19c-3.87 0-7-3.13-7-7 0-1.61.55-3.09 1.46-4.27l9.81 9.81z"></path></g>\n<g id="graphic-eq"><path d="M7 18h2V6H7v12zm4 4h2V2h-2v20zm-8-8h2v-4H3v4zm12 4h2V6h-2v12zm4-8v4h2v-4h-2z"></path></g>\n<g id="location-disabled"><path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06c-1.13.12-2.19.46-3.16.97l1.5 1.5C10.16 5.19 11.06 5 12 5c3.87 0 7 3.13 7 7 0 .94-.19 1.84-.52 2.65l1.5 1.5c.5-.96.84-2.02.97-3.15H23v-2h-2.06zM3 4.27l2.04 2.04C3.97 7.62 3.25 9.23 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c1.77-.2 3.38-.91 4.69-1.98L19.73 21 21 19.73 4.27 3 3 4.27zm13.27 13.27C15.09 18.45 13.61 19 12 19c-3.87 0-7-3.13-7-7 0-1.61.55-3.09 1.46-4.27l9.81 9.81z"></path></g>\n<g id="location-searching"><path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>\n<g id="network-cell"><path fill-opacity=".3" d="M2 22h20V2z"></path><path d="M17 7L2 22h15z"></path></g>\n<g id="network-wifi"><path fill-opacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"></path><path d="M3.53 10.95l8.46 10.54.01.01.01-.01 8.46-10.54C20.04 10.62 16.81 8 12 8c-4.81 0-8.04 2.62-8.47 2.95z"></path></g>\n<g id="nfc"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16zM18 6h-5c-1.1 0-2 .9-2 2v2.28c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V8h3v8H8V8h2V6H6v12h12V6z"></path></g>\n<g id="screen-lock-landscape"><path d="M21 5H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-2 12H5V7h14v10zm-9-1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1v-1c0-1.11-.9-2-2-2-1.11 0-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm.8-6c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2v1h-2.4v-1z"></path></g>\n<g id="screen-lock-portrait"><path d="M10 16h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1v-1c0-1.11-.9-2-2-2-1.11 0-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm.8-6c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2v1h-2.4v-1zM17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z"></path></g>\n<g id="screen-lock-rotation"><path d="M23.25 12.77l-2.57-2.57-1.41 1.41 2.22 2.22-5.66 5.66L4.51 8.17l5.66-5.66 2.1 2.1 1.41-1.41L11.23.75c-.59-.59-1.54-.59-2.12 0L2.75 7.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12zM8.47 20.48C5.2 18.94 2.86 15.76 2.5 12H1c.51 6.16 5.66 11 11.95 11l.66-.03-3.81-3.82-1.33 1.33zM16 9h5c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1v-.5C21 1.12 19.88 0 18.5 0S16 1.12 16 2.5V3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm.8-6.5c0-.94.76-1.7 1.7-1.7s1.7.76 1.7 1.7V3h-3.4v-.5z"></path></g>\n<g id="screen-rotation"><path d="M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5C23.44 4.84 18.29 0 12 0l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77c-.59-.59-1.54-.59-2.12 0L1.75 8.11c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12L10.23 1.75zm4.6 19.44L2.81 9.17l6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32z"></path></g>\n<g id="sd-storage"><path d="M18 2h-8L4.02 8 4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 6h-2V4h2v4zm3 0h-2V4h2v4zm3 0h-2V4h2v4z"></path></g>\n<g id="settings-system-daydream"><path d="M9 16h6.5c1.38 0 2.5-1.12 2.5-2.5S16.88 11 15.5 11h-.05c-.24-1.69-1.69-3-3.45-3-1.4 0-2.6.83-3.16 2.02h-.16C7.17 10.18 6 11.45 6 13c0 1.66 1.34 3 3 3zM21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>\n<g id="signal-cellular-0-bar"><path fill-opacity=".3" d="M2 22h20V2z"></path></g>\n<g id="signal-cellular-1-bar"><path fill-opacity=".3" d="M2 22h20V2z"></path><path d="M12 12L2 22h10z"></path></g>\n<g id="signal-cellular-2-bar"><path fill-opacity=".3" d="M2 22h20V2z"></path><path d="M14 10L2 22h12z"></path></g>\n<g id="signal-cellular-3-bar"><path fill-opacity=".3" d="M2 22h20V2z"></path><path d="M17 7L2 22h15z"></path></g>\n<g id="signal-cellular-4-bar"><path d="M2 22h20V2z"></path></g>\n<g id="signal-cellular-connected-no-internet-0-bar"><path fill-opacity=".3" d="M22 8V2L2 22h16V8z"></path><path d="M20 22h2v-2h-2v2zm0-12v8h2v-8h-2z"></path></g>\n<g id="signal-cellular-connected-no-internet-1-bar"><path fill-opacity=".3" d="M22 8V2L2 22h16V8z"></path><path d="M20 10v8h2v-8h-2zm-8 12V12L2 22h10zm8 0h2v-2h-2v2z"></path></g>\n<g id="signal-cellular-connected-no-internet-2-bar"><path fill-opacity=".3" d="M22 8V2L2 22h16V8z"></path><path d="M14 22V10L2 22h12zm6-12v8h2v-8h-2zm0 12h2v-2h-2v2z"></path></g>\n<g id="signal-cellular-connected-no-internet-3-bar"><path fill-opacity=".3" d="M22 8V2L2 22h16V8z"></path><path d="M17 22V7L2 22h15zm3-12v8h2v-8h-2zm0 12h2v-2h-2v2z"></path></g>\n<g id="signal-cellular-connected-no-internet-4-bar"><path d="M20 18h2v-8h-2v8zm0 4h2v-2h-2v2zM2 22h16V8h4V2L2 22z"></path></g>\n<g id="signal-cellular-no-sim"><path d="M18.99 5c0-1.1-.89-2-1.99-2h-7L7.66 5.34 19 16.68 18.99 5zM3.65 3.88L2.38 5.15 5 7.77V19c0 1.1.9 2 2 2h10.01c.35 0 .67-.1.96-.26l1.88 1.88 1.27-1.27L3.65 3.88z"></path></g>\n<g id="signal-cellular-null"><path d="M20 6.83V20H6.83L20 6.83M22 2L2 22h20V2z"></path></g>\n<g id="signal-cellular-off"><path d="M21 1l-8.59 8.59L21 18.18V1zM4.77 4.5L3.5 5.77l6.36 6.36L1 21h17.73l2 2L22 21.73 4.77 4.5z"></path></g>\n<g id="signal-wifi-0-bar"><path fill-opacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"></path></g>\n<g id="signal-wifi-1-bar"><path fill-opacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"></path><path d="M6.67 14.86L12 21.49v.01l.01-.01 5.33-6.63C17.06 14.65 15.03 13 12 13s-5.06 1.65-5.33 1.86z"></path></g>\n<g id="signal-wifi-1-bar-lock"><path d="M23 16v-1.5c0-1.4-1.1-2.5-2.5-2.5S18 13.1 18 14.5V16c-.5 0-1 .5-1 1v4c0 .5.5 1 1 1h5c.5 0 1-.5 1-1v-4c0-.5-.5-1-1-1zm-1 0h-3v-1.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V16z"></path><path d="M15.5 14.5c0-2.8 2.2-5 5-5 .4 0 .7 0 1 .1L23.6 7c-.4-.3-4.9-4-11.6-4C5.3 3 .8 6.7.4 7L12 21.5l3.5-4.3v-2.7z" opacity=".3"></path><path d="M6.7 14.9l5.3 6.6 3.5-4.3v-2.6c0-.2 0-.5.1-.7-.9-.5-2.2-.9-3.6-.9-3 0-5.1 1.7-5.3 1.9z"></path></g>\n<g id="signal-wifi-2-bar"><path fill-opacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"></path><path d="M4.79 12.52l7.2 8.98H12l.01-.01 7.2-8.98C18.85 12.24 16.1 10 12 10s-6.85 2.24-7.21 2.52z"></path></g>\n<g id="signal-wifi-2-bar-lock"><path d="M23 16v-1.5c0-1.4-1.1-2.5-2.5-2.5S18 13.1 18 14.5V16c-.5 0-1 .5-1 1v4c0 .5.5 1 1 1h5c.5 0 1-.5 1-1v-4c0-.5-.5-1-1-1zm-1 0h-3v-1.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V16z"></path><path d="M15.5 14.5c0-2.8 2.2-5 5-5 .4 0 .7 0 1 .1L23.6 7c-.4-.3-4.9-4-11.6-4C5.3 3 .8 6.7.4 7L12 21.5l3.5-4.3v-2.7z" opacity=".3"></path><path d="M4.8 12.5l7.2 9 3.5-4.4v-2.6c0-1.3.5-2.5 1.4-3.4C15.6 10.5 14 10 12 10c-4.1 0-6.8 2.2-7.2 2.5z"></path></g>\n<g id="signal-wifi-3-bar"><path fill-opacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"></path><path d="M3.53 10.95l8.46 10.54.01.01.01-.01 8.46-10.54C20.04 10.62 16.81 8 12 8c-4.81 0-8.04 2.62-8.47 2.95z"></path></g>\n<g id="signal-wifi-3-bar-lock"><path opacity=".3" d="M12 3C5.3 3 .8 6.7.4 7l3.2 3.9L12 21.5l3.5-4.3v-2.6c0-2.2 1.4-4 3.3-4.7.3-.1.5-.2.8-.2.3-.1.6-.1.9-.1.4 0 .7 0 1 .1L23.6 7c-.4-.3-4.9-4-11.6-4z"></path><path d="M23 16v-1.5c0-1.4-1.1-2.5-2.5-2.5S18 13.1 18 14.5V16c-.5 0-1 .5-1 1v4c0 .5.5 1 1 1h5c.5 0 1-.5 1-1v-4c0-.5-.5-1-1-1zm-1 0h-3v-1.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V16zm-10 5.5l3.5-4.3v-2.6c0-2.2 1.4-4 3.3-4.7C17.3 9 14.9 8 12 8c-4.8 0-8 2.6-8.5 2.9"></path></g>\n<g id="signal-wifi-4-bar"><path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"></path></g>\n<g id="signal-wifi-4-bar-lock"><path d="M23 16v-1.5c0-1.4-1.1-2.5-2.5-2.5S18 13.1 18 14.5V16c-.5 0-1 .5-1 1v4c0 .5.5 1 1 1h5c.5 0 1-.5 1-1v-4c0-.5-.5-1-1-1zm-1 0h-3v-1.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V16zm-6.5-1.5c0-2.8 2.2-5 5-5 .4 0 .7 0 1 .1L23.6 7c-.4-.3-4.9-4-11.6-4C5.3 3 .8 6.7.4 7L12 21.5l3.5-4.4v-2.6z"></path></g>\n<g id="signal-wifi-off"><path d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.48L18.18 13.8 23.64 7zm-6.6 8.22L3.27 1.44 2 2.72l2.05 2.06C1.91 5.76.59 6.82.36 7l11.63 14.49.01.01.01-.01 3.9-4.86 3.32 3.32 1.27-1.27-3.46-3.46z"></path></g>\n<g id="storage"><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"></path></g>\n<g id="usb"><path d="M15 7v4h1v2h-3V5h2l-3-4-3 4h2v8H8v-2.07c.7-.37 1.2-1.08 1.2-1.93 0-1.21-.99-2.2-2.2-2.2-1.21 0-2.2.99-2.2 2.2 0 .85.5 1.56 1.2 1.93V13c0 1.11.89 2 2 2h3v3.05c-.71.37-1.2 1.1-1.2 1.95 0 1.22.99 2.2 2.2 2.2 1.21 0 2.2-.98 2.2-2.2 0-.85-.49-1.58-1.2-1.95V15h3c1.11 0 2-.89 2-2v-2h1V7h-4z"></path></g>\n<g id="wallpaper"><path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z"></path></g>\n<g id="widgets"><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z"></path></g>\n<g id="wifi-lock"><path d="M20.5 9.5c.28 0 .55.04.81.08L24 6c-3.34-2.51-7.5-4-12-4S3.34 3.49 0 6l12 16 3.5-4.67V14.5c0-2.76 2.24-5 5-5zM23 16v-1.5c0-1.38-1.12-2.5-2.5-2.5S18 13.12 18 14.5V16c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1zm-1 0h-3v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V16z"></path></g>\n<g id="wifi-tethering"><path d="M12 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 2c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 2.22 1.21 4.15 3 5.19l1-1.74c-1.19-.7-2-1.97-2-3.45 0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.48-.81 2.75-2 3.45l1 1.74c1.79-1.04 3-2.97 3-5.19zM12 3C6.48 3 2 7.48 2 13c0 3.7 2.01 6.92 4.99 8.65l1-1.73C5.61 18.53 4 15.96 4 13c0-4.42 3.58-8 8-8s8 3.58 8 8c0 2.96-1.61 5.53-4 6.92l1 1.73c2.99-1.73 5-4.95 5-8.65 0-5.52-4.48-10-10-10z"></path></g>\n</defs></svg>\n</iron-iconset-svg>',
      ]),
      ck = G(bk);
   ck.setAttribute("style", "display: none;");
   document.head.appendChild(ck.content);
   var dk = x([
         '<iron-iconset-svg name="icons" size="24">\n<svg><defs>\n<g id="3d-rotation"><path d="M7.52 21.48C4.25 19.94 1.91 16.76 1.55 13H.05C.56 19.16 5.71 24 12 24l.66-.03-3.81-3.81-1.33 1.32zm.89-6.52c-.19 0-.37-.03-.52-.08-.16-.06-.29-.13-.4-.24-.11-.1-.2-.22-.26-.37-.06-.14-.09-.3-.09-.47h-1.3c0 .36.07.68.21.95.14.27.33.5.56.69.24.18.51.32.82.41.3.1.62.15.96.15.37 0 .72-.05 1.03-.15.32-.1.6-.25.83-.44s.42-.43.55-.72c.13-.29.2-.61.2-.97 0-.19-.02-.38-.07-.56-.05-.18-.12-.35-.23-.51-.1-.16-.24-.3-.4-.43-.17-.13-.37-.23-.61-.31.2-.09.37-.2.52-.33.15-.13.27-.27.37-.42.1-.15.17-.3.22-.46.05-.16.07-.32.07-.48 0-.36-.06-.68-.18-.96-.12-.28-.29-.51-.51-.69-.2-.19-.47-.33-.77-.43C9.1 8.05 8.76 8 8.39 8c-.36 0-.69.05-1 .16-.3.11-.57.26-.79.45-.21.19-.38.41-.51.67-.12.26-.18.54-.18.85h1.3c0-.17.03-.32.09-.45s.14-.25.25-.34c.11-.09.23-.17.38-.22.15-.05.3-.08.48-.08.4 0 .7.1.89.31.19.2.29.49.29.86 0 .18-.03.34-.08.49-.05.15-.14.27-.25.37-.11.1-.25.18-.41.24-.16.06-.36.09-.58.09H7.5v1.03h.77c.22 0 .42.02.6.07s.33.13.45.23c.12.11.22.24.29.4.07.16.1.35.1.57 0 .41-.12.72-.35.93-.23.23-.55.33-.95.33zm8.55-5.92c-.32-.33-.7-.59-1.14-.77-.43-.18-.92-.27-1.46-.27H12v8h2.3c.55 0 1.06-.09 1.51-.27.45-.18.84-.43 1.16-.76.32-.33.57-.73.74-1.19.17-.47.26-.99.26-1.57v-.4c0-.58-.09-1.1-.26-1.57-.18-.47-.43-.87-.75-1.2zm-.39 3.16c0 .42-.05.79-.14 1.13-.1.33-.24.62-.43.85-.19.23-.43.41-.71.53-.29.12-.62.18-.99.18h-.91V9.12h.97c.72 0 1.27.23 1.64.69.38.46.57 1.12.57 1.99v.4zM12 0l-.66.03 3.81 3.81 1.33-1.33c3.27 1.55 5.61 4.72 5.96 8.48h1.5C23.44 4.84 18.29 0 12 0z"></path></g>\n<g id="accessibility"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"></path></g>\n<g id="accessible"><circle cx="12" cy="4" r="2"></circle><path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"></path></g>\n<g id="account-balance"><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"></path></g>\n<g id="account-balance-wallet"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>\n<g id="account-box"><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"></path></g>\n<g id="account-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></g>\n<g id="add"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g>\n<g id="add-alert"><path d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72C7.37 5.03 5.12 7.75 5.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z"></path></g>\n<g id="add-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>\n<g id="add-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g>\n<g id="add-circle-outline"><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>\n<g id="add-shopping-cart"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"></path></g>\n<g id="alarm"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g>\n<g id="alarm-add"><path d="M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z"></path></g>\n<g id="alarm-off"><path d="M12 6c3.87 0 7 3.13 7 7 0 .84-.16 1.65-.43 2.4l1.52 1.52c.58-1.19.91-2.51.91-3.92 0-4.97-4.03-9-9-9-1.41 0-2.73.33-3.92.91L9.6 6.43C10.35 6.16 11.16 6 12 6zm10-.28l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM2.92 2.29L1.65 3.57 2.98 4.9l-1.11.93 1.42 1.42 1.11-.94.8.8C3.83 8.69 3 10.75 3 13c0 4.97 4.02 9 9 9 2.25 0 4.31-.83 5.89-2.2l2.2 2.2 1.27-1.27L3.89 3.27l-.97-.98zm13.55 16.1C15.26 19.39 13.7 20 12 20c-3.87 0-7-3.13-7-7 0-1.7.61-3.26 1.61-4.47l9.86 9.86zM8.02 3.28L6.6 1.86l-.86.71 1.42 1.42.86-.71z"></path></g>\n<g id="alarm-on"><path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1.46-5.47L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06-4.93 4.95z"></path></g>\n<g id="all-out"><path d="M16.21 4.16l4 4v-4zm4 12l-4 4h4zm-12 4l-4-4v4zm-4-12l4-4h-4zm12.95-.95c-2.73-2.73-7.17-2.73-9.9 0s-2.73 7.17 0 9.9 7.17 2.73 9.9 0 2.73-7.16 0-9.9zm-1.1 8.8c-2.13 2.13-5.57 2.13-7.7 0s-2.13-5.57 0-7.7 5.57-2.13 7.7 0 2.13 5.57 0 7.7z"></path></g>\n<g id="android"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"></path></g>\n<g id="announcement"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"></path></g>\n<g id="apps"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></g>\n<g id="archive"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></g>\n<g id="arrow-back"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g>\n<g id="arrow-downward"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></g>\n<g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>\n<g id="arrow-drop-down-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 12l-4-4h8l-4 4z"></path></g>\n<g id="arrow-drop-up"><path d="M7 14l5-5 5 5z"></path></g>\n<g id="arrow-forward"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g>\n<g id="arrow-upward"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></g>\n<g id="aspect-ratio"><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>\n<g id="assessment"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>\n<g id="assignment"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></g>\n<g id="assignment-ind"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"></path></g>\n<g id="assignment-late"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-6 15h-2v-2h2v2zm0-4h-2V8h2v6zm-1-9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></g>\n<g id="assignment-return"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v3l-5-5 5-5v3h4v4z"></path></g>\n<g id="assignment-returned"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5h3V9h4v4h3l-5 5z"></path></g>\n<g id="assignment-turned-in"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>\n<g id="attachment"><path d="M2 12.5C2 9.46 4.46 7 7.5 7H18c2.21 0 4 1.79 4 4s-1.79 4-4 4H9.5C8.12 15 7 13.88 7 12.5S8.12 10 9.5 10H17v2H9.41c-.55 0-.55 1 0 1H18c1.1 0 2-.9 2-2s-.9-2-2-2H7.5C5.57 9 4 10.57 4 12.5S5.57 16 7.5 16H17v2H7.5C4.46 18 2 15.54 2 12.5z"></path></g>\n<g id="autorenew"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"></path></g>\n<g id="backspace"><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"></path></g>\n<g id="backup"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>\n<g id="block"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></g>\n<g id="book"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>\n<g id="bookmark"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>\n<g id="bookmark-border"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>\n<g id="bug-report"><path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"></path></g>\n<g id="build"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"></path></g>\n<g id="cached"><path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"></path></g>\n<g id="camera-enhance"><path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-1l1.25-2.75L16 13l-2.75-1.25L12 9l-1.25 2.75L8 13l2.75 1.25z"></path></g>\n<g id="cancel"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g>\n<g id="card-giftcard"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>\n<g id="card-membership"><path d="M20 2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h4v5l4-2 4 2v-5h4c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zm0 13H4v-2h16v2zm0-5H4V4h16v6z"></path></g>\n<g id="card-travel"><path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z"></path></g>\n<g id="change-history"><path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"></path></g>\n<g id="check"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g>\n<g id="check-box"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>\n<g id="check-box-outline-blank"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>\n<g id="check-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>\n<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>\n<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>\n<g id="chrome-reader-mode"><path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"></path></g>\n<g id="class"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></g>\n<g id="clear"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>\n<g id="close"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>\n<g id="cloud"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"></path></g>\n<g id="cloud-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14H8c-1.66 0-3-1.34-3-3s1.34-3 3-3l.14.01C8.58 8.28 10.13 7 12 7c2.21 0 4 1.79 4 4h.5c1.38 0 2.5 1.12 2.5 2.5S17.88 16 16.5 16z"></path></g>\n<g id="cloud-done"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z"></path></g>\n<g id="cloud-download"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"></path></g>\n<g id="cloud-off"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"></path></g>\n<g id="cloud-queue"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"></path></g>\n<g id="cloud-upload"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></g>\n<g id="code"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g>\n<g id="compare-arrows"><path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"></path></g>\n<g id="content-copy"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></g>\n<g id="content-cut"><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"></path></g>\n<g id="content-paste"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"></path></g>\n<g id="copyright"><path d="M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91 1.05.34 1.7.34c.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>\n<g id="create"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>\n<g id="create-new-folder"><path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"></path></g>\n<g id="credit-card"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>\n<g id="dashboard"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></g>\n<g id="date-range"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path></g>\n<g id="delete"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g>\n<g id="delete-forever"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></g>\n<g id="delete-sweep"><path d="M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zM14 5h-3l-1-1H6L5 5H2v2h12z"></path></g>\n<g id="description"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path></g>\n<g id="dns"><path d="M20 13H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM20 3H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>\n<g id="done"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></g>\n<g id="done-all"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path></g>\n<g id="donut-large"><path d="M11 5.08V2c-5 .5-9 4.81-9 10s4 9.5 9 10v-3.08c-3-.48-6-3.4-6-6.92s3-6.44 6-6.92zM18.97 11H22c-.47-5-4-8.53-9-9v3.08C16 5.51 18.54 8 18.97 11zM13 18.92V22c5-.47 8.53-4 9-9h-3.03c-.43 3-2.97 5.49-5.97 5.92z"></path></g>\n<g id="donut-small"><path d="M11 9.16V2c-5 .5-9 4.79-9 10s4 9.5 9 10v-7.16c-1-.41-2-1.52-2-2.84s1-2.43 2-2.84zM14.86 11H22c-.48-4.75-4-8.53-9-9v7.16c1 .3 1.52.98 1.86 1.84zM13 14.84V22c5-.47 8.52-4.25 9-9h-7.14c-.34.86-.86 1.54-1.86 1.84z"></path></g>\n<g id="drafts"><path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"></path></g>\n<g id="eject"><path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"></path></g>\n<g id="error"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g>\n<g id="error-outline"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>\n<g id="euro-symbol"><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1 0 .34.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"></path></g>\n<g id="event"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>\n<g id="event-seat"><path d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z"></path></g>\n<g id="exit-to-app"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>\n<g id="expand-less"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g>\n<g id="expand-more"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g>\n<g id="explore"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"></path></g>\n<g id="extension"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"></path></g>\n<g id="face"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"></path></g>\n<g id="favorite"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></g>\n<g id="favorite-border"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></g>\n<g id="feedback"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"></path></g>\n<g id="file-download"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>\n<g id="file-upload"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></g>\n<g id="filter-list"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></g>\n<g id="find-in-page"><path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"></path></g>\n<g id="find-replace"><path d="M11 6c1.38 0 2.63.56 3.54 1.46L12 10h6V4l-2.05 2.05C14.68 4.78 12.93 4 11 4c-3.53 0-6.43 2.61-6.92 6H6.1c.46-2.28 2.48-4 4.9-4zm5.64 9.14c.66-.9 1.12-1.97 1.28-3.14H15.9c-.46 2.28-2.48 4-4.9 4-1.38 0-2.63-.56-3.54-1.46L10 12H4v6l2.05-2.05C7.32 17.22 9.07 18 11 18c1.55 0 2.98-.51 4.14-1.36L20 21.49 21.49 20l-4.85-4.86z"></path></g>\n<g id="fingerprint"><path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"></path></g>\n<g id="first-page"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path></g>\n<g id="flag"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g>\n<g id="flight-land"><path d="M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z"></path></g>\n<g id="flight-takeoff"><path d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 5.31-1.42 4.35-1.16L21 11.49c.81-.23 1.28-1.05 1.07-1.85z"></path></g>\n<g id="flip-to-back"><path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.11 0-2 .9-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2c0-1.1-.9-2-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.89 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zM5 7H3v12c0 1.1.89 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z"></path></g>\n<g id="flip-to-front"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z"></path></g>\n<g id="folder"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></g>\n<g id="folder-open"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path></g>\n<g id="folder-shared"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"></path></g>\n<g id="font-download"><path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"></path></g>\n<g id="forward"><path d="M12 8V4l8 8-8 8v-4H4V8z"></path></g>\n<g id="fullscreen"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></g>\n<g id="fullscreen-exit"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></g>\n<g id="g-translate"><path d="M20 5h-9.12L10 2H4c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h7l1 3h8c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM7.17 14.59c-2.25 0-4.09-1.83-4.09-4.09s1.83-4.09 4.09-4.09c1.04 0 1.99.37 2.74 1.07l.07.06-1.23 1.18-.06-.05c-.29-.27-.78-.59-1.52-.59-1.31 0-2.38 1.09-2.38 2.42s1.07 2.42 2.38 2.42c1.37 0 1.96-.87 2.12-1.46H7.08V9.91h3.95l.01.07c.04.21.05.4.05.61 0 2.35-1.61 4-3.92 4zm6.03-1.71c.33.6.74 1.18 1.19 1.7l-.54.53-.65-2.23zm.77-.76h-.99l-.31-1.04h3.99s-.34 1.31-1.56 2.74c-.52-.62-.89-1.23-1.13-1.7zM21 20c0 .55-.45 1-1 1h-7l2-2-.81-2.77.92-.92L17.79 18l.73-.73-2.71-2.68c.9-1.03 1.6-2.25 1.92-3.51H19v-1.04h-3.64V9h-1.04v1.04h-1.96L11.18 6H20c.55 0 1 .45 1 1v13z"></path></g>\n<g id="gavel"><path d="M1 21h12v2H1zM5.245 8.07l2.83-2.827 14.14 14.142-2.828 2.828zM12.317 1l5.657 5.656-2.83 2.83-5.654-5.66zM3.825 9.485l5.657 5.657-2.828 2.828-5.657-5.657z"></path></g>\n<g id="gesture"><path d="M4.59 6.89c.7-.71 1.4-1.35 1.71-1.22.5.2 0 1.03-.3 1.52-.25.42-2.86 3.89-2.86 6.31 0 1.28.48 2.34 1.34 2.98.75.56 1.74.73 2.64.46 1.07-.31 1.95-1.4 3.06-2.77 1.21-1.49 2.83-3.44 4.08-3.44 1.63 0 1.65 1.01 1.76 1.79-3.78.64-5.38 3.67-5.38 5.37 0 1.7 1.44 3.09 3.21 3.09 1.63 0 4.29-1.33 4.69-6.1H21v-2.5h-2.47c-.15-1.65-1.09-4.2-4.03-4.2-2.25 0-4.18 1.91-4.94 2.84-.58.73-2.06 2.48-2.29 2.72-.25.3-.68.84-1.11.84-.45 0-.72-.83-.36-1.92.35-1.09 1.4-2.86 1.85-3.52.78-1.14 1.3-1.92 1.3-3.28C8.95 3.69 7.31 3 6.44 3 5.12 3 3.97 4 3.72 4.25c-.36.36-.66.66-.88.93l1.75 1.71zm9.29 11.66c-.31 0-.74-.26-.74-.72 0-.6.73-2.2 2.87-2.76-.3 2.69-1.43 3.48-2.13 3.48z"></path></g>\n<g id="get-app"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g>\n<g id="gif"><path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path></g>\n<g id="grade"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>\n<g id="group-work"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>\n<g id="help"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path></g>\n<g id="help-outline"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></g>\n<g id="highlight-off"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>\n<g id="history"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>\n<g id="home"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></g>\n<g id="hourglass-empty"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"></path></g>\n<g id="hourglass-full"><path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z"></path></g>\n<g id="http"><path d="M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z"></path></g>\n<g id="https"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>\n<g id="important-devices"><path d="M23 11.01L18 11c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-9c0-.55-.45-.99-1-.99zM23 20h-5v-7h5v7zM20 2H2C.89 2 0 2.89 0 4v12c0 1.1.89 2 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4c0-1.11-.9-2-2-2zm-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9h-3.03z"></path></g>\n<g id="inbox"><path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.11-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"></path></g>\n<g id="indeterminate-check-box"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path></g>\n<g id="info"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></g>\n<g id="info-outline"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></g>\n<g id="input"><path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"></path></g>\n<g id="invert-colors"><path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"></path></g>\n<g id="label"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></path></g>\n<g id="label-outline"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></g>\n<g id="language"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path></g>\n<g id="last-page"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path></g>\n<g id="launch"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>\n<g id="lightbulb-outline"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></g>\n<g id="line-style"><path d="M3 16h5v-2H3v2zm6.5 0h5v-2h-5v2zm6.5 0h5v-2h-5v2zM3 20h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 12h8v-2H3v2zm10 0h8v-2h-8v2zM3 4v4h18V4H3z"></path></g>\n<g id="line-weight"><path d="M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z"></path></g>\n<g id="link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>\n<g id="list"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></g>\n<g id="lock"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path></g>\n<g id="lock-open"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"></path></g>\n<g id="lock-outline"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path></g>\n<g id="low-priority"><path d="M14 5h8v2h-8zm0 5.5h8v2h-8zm0 5.5h8v2h-8zM2 11.5C2 15.08 4.92 18 8.5 18H9v2l3-3-3-3v2h-.5C6.02 16 4 13.98 4 11.5S6.02 7 8.5 7H12V5H8.5C4.92 5 2 7.92 2 11.5z"></path></g>\n<g id="loyalty"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7zm11.77 8.27L13 19.54l-4.27-4.27C8.28 14.81 8 14.19 8 13.5c0-1.38 1.12-2.5 2.5-2.5.69 0 1.32.28 1.77.74l.73.72.73-.73c.45-.45 1.08-.73 1.77-.73 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.77z"></path></g>\n<g id="mail"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>\n<g id="markunread"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></g>\n<g id="markunread-mailbox"><path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path></g>\n<g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>\n<g id="more-horiz"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>\n<g id="more-vert"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g>\n<g id="motorcycle"><path d="M19.44 9.03L15.41 5H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h1.65l2.77-2.77c-.21.54-.32 1.14-.32 1.77 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.65-1.97-4.77-4.56-4.97zM7.82 15C7.4 16.15 6.28 17 5 17c-1.63 0-3-1.37-3-3s1.37-3 3-3c1.28 0 2.4.85 2.82 2H5v2h2.82zM19 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></g>\n<g id="move-to-inbox"><path d="M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z"></path></g>\n<g id="next-week"><path d="M20 7h-4V5c0-.55-.22-1.05-.59-1.41C15.05 3.22 14.55 3 14 3h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm1 13.5l-1-1 3-3-3-3 1-1 4 4-4 4z"></path></g>\n<g id="note-add"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"></path></g>\n<g id="offline-pin"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z"></path></g>\n<g id="opacity"><path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z"></path></g>\n<g id="open-in-browser"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"></path></g>\n<g id="open-in-new"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g>\n<g id="open-with"><path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path></g>\n<g id="pageview"><path d="M11.5 9C10.12 9 9 10.12 9 11.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S12.88 9 11.5 9zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-3.21 14.21l-2.91-2.91c-.69.44-1.51.7-2.39.7C9.01 16 7 13.99 7 11.5S9.01 7 11.5 7 16 9.01 16 11.5c0 .88-.26 1.69-.7 2.39l2.91 2.9-1.42 1.42z"></path></g>\n<g id="pan-tool"><path d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"></path></g>\n<g id="payment"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g>\n<g id="perm-camera-mic"><path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v-2.09c-2.83-.48-5-2.94-5-5.91h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 2.97-2.17 5.43-5 5.91V21h7c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-6 8c0 1.1-.9 2-2 2s-2-.9-2-2V9c0-1.1.9-2 2-2s2 .9 2 2v4z"></path></g>\n<g id="perm-contact-calendar"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"></path></g>\n<g id="perm-data-setting"><path d="M18.99 11.5c.34 0 .67.03 1 .07L20 0 0 20h11.56c-.04-.33-.07-.66-.07-1 0-4.14 3.36-7.5 7.5-7.5zm3.71 7.99c.02-.16.04-.32.04-.49 0-.17-.01-.33-.04-.49l1.06-.83c.09-.08.12-.21.06-.32l-1-1.73c-.06-.11-.19-.15-.31-.11l-1.24.5c-.26-.2-.54-.37-.85-.49l-.19-1.32c-.01-.12-.12-.21-.24-.21h-2c-.12 0-.23.09-.25.21l-.19 1.32c-.3.13-.59.29-.85.49l-1.24-.5c-.11-.04-.24 0-.31.11l-1 1.73c-.06.11-.04.24.06.32l1.06.83c-.02.16-.03.32-.03.49 0 .17.01.33.03.49l-1.06.83c-.09.08-.12.21-.06.32l1 1.73c.06.11.19.15.31.11l1.24-.5c.26.2.54.37.85.49l.19 1.32c.02.12.12.21.25.21h2c.12 0 .23-.09.25-.21l.19-1.32c.3-.13.59-.29.84-.49l1.25.5c.11.04.24 0 .31-.11l1-1.73c.06-.11.03-.24-.06-.32l-1.07-.83zm-3.71 1.01c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path></g>\n<g id="perm-device-information"><path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path></g>\n<g id="perm-identity"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path></g>\n<g id="perm-media"><path d="M2 6H0v5h.01L0 20c0 1.1.9 2 2 2h18v-2H2V6zm20-2h-8l-2-2H6c-1.1 0-1.99.9-1.99 2L4 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 15l4.5-6 3.5 4.51 2.5-3.01L21 15H7z"></path></g>\n<g id="perm-phone-msg"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"></path></g>\n<g id="perm-scan-wifi"><path d="M12 3C6.95 3 3.15 4.85 0 7.23L12 22 24 7.25C20.85 4.87 17.05 3 12 3zm1 13h-2v-6h2v6zm-2-8V6h2v2h-2z"></path></g>\n<g id="pets"><circle cx="4.5" cy="9.5" r="2.5"></circle><circle cx="9" cy="5.5" r="2.5"></circle><circle cx="15" cy="5.5" r="2.5"></circle><circle cx="19.5" cy="9.5" r="2.5"></circle><path d="M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z"></path></g>\n<g id="picture-in-picture"><path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"></path></g>\n<g id="picture-in-picture-alt"><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"></path></g>\n<g id="play-for-work"><path d="M11 5v5.59H7.5l4.5 4.5 4.5-4.5H13V5h-2zm-5 9c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6z"></path></g>\n<g id="polymer"><path d="M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z"></path></g>\n<g id="power-settings-new"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path></g>\n<g id="pregnant-woman"><path d="M9 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm7 9c-.01-1.34-.83-2.51-2-3 0-1.66-1.34-3-3-3s-3 1.34-3 3v7h2v5h3v-5h3v-4z"></path></g>\n<g id="print"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path></g>\n<g id="query-builder"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>\n<g id="question-answer"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path></g>\n<g id="radio-button-checked"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>\n<g id="radio-button-unchecked"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></g>\n<g id="receipt"><path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"></path></g>\n<g id="record-voice-over"><circle cx="9" cy="9" r="4"></circle><path d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z"></path></g>\n<g id="redeem"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></g>\n<g id="redo"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"></path></g>\n<g id="refresh"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></g>\n<g id="remove"><path d="M19 13H5v-2h14v2z"></path></g>\n<g id="remove-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></g>\n<g id="remove-circle-outline"><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>\n<g id="remove-shopping-cart"><path d="M22.73 22.73L2.77 2.77 2 2l-.73-.73L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.27-1.27zM7.42 15c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h2.36l2 2H7.42zm8.13-2c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H6.54l9.01 9zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"></path></g>\n<g id="reorder"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"></path></g>\n<g id="reply"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>\n<g id="reply-all"><path d="M7 8V5l-7 7 7 7v-3l-4-4 4-4zm6 1V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g>\n<g id="report"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path></g>\n<g id="report-problem"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>\n<g id="restore"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></g>\n<g id="restore-page"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16c-2.05 0-3.81-1.24-4.58-3h1.71c.63.9 1.68 1.5 2.87 1.5 1.93 0 3.5-1.57 3.5-3.5S13.93 9.5 12 9.5c-1.35 0-2.52.78-3.1 1.9l1.6 1.6h-4V9l1.3 1.3C8.69 8.92 10.23 8 12 8c2.76 0 5 2.24 5 5s-2.24 5-5 5z"></path></g>\n<g id="room"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g>\n<g id="rounded-corner"><path d="M19 19h2v2h-2v-2zm0-2h2v-2h-2v2zM3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm0-4h2V3H3v2zm4 0h2V3H7v2zm8 16h2v-2h-2v2zm-4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-8 0h2v-2H7v2zm-4 0h2v-2H3v2zM21 8c0-2.76-2.24-5-5-5h-5v2h5c1.65 0 3 1.35 3 3v5h2V8z"></path></g>\n<g id="rowing"><path d="M8.5 14.5L4 19l1.5 1.5L9 17h2l-2.5-2.5zM15 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 20.01L18 24l-2.99-3.01V19.5l-7.1-7.09c-.31.05-.61.07-.91.07v-2.16c1.66.03 3.61-.87 4.67-2.04l1.4-1.55c.19-.21.43-.38.69-.5.29-.14.62-.23.96-.23h.03C15.99 6.01 17 7.02 17 8.26v5.75c0 .84-.35 1.61-.92 2.16l-3.58-3.58v-2.27c-.63.52-1.43 1.02-2.29 1.39L16.5 18H18l3 3.01z"></path></g>\n<g id="save"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></g>\n<g id="schedule"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></g>\n<g id="search"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g>\n<g id="select-all"><path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z"></path></g>\n<g id="send"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></g>\n<g id="settings"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g>\n<g id="settings-applications"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z"></path></g>\n<g id="settings-backup-restore"><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"></path></g>\n<g id="settings-bluetooth"><path d="M11 24h2v-2h-2v2zm-4 0h2v-2H7v2zm8 0h2v-2h-2v2zm2.71-18.29L12 0h-1v7.59L6.41 3 5 4.41 10.59 10 5 15.59 6.41 17 11 12.41V20h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 3.83l1.88 1.88L13 7.59V3.83zm1.88 10.46L13 16.17v-3.76l1.88 1.88z"></path></g>\n<g id="settings-brightness"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02zM8 16h2.5l1.5 1.5 1.5-1.5H16v-2.5l1.5-1.5-1.5-1.5V8h-2.5L12 6.5 10.5 8H8v2.5L6.5 12 8 13.5V16zm4-7c1.66 0 3 1.34 3 3s-1.34 3-3 3V9z"></path></g>\n<g id="settings-cell"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM16 .01L8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99zM16 16H8V4h8v12z"></path></g>\n<g id="settings-ethernet"><path d="M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z"></path></g>\n<g id="settings-input-antenna"><path d="M12 5c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7zm1 9.29c.88-.39 1.5-1.26 1.5-2.29 0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12c0 1.02.62 1.9 1.5 2.29v3.3L7.59 21 9 22.41l3-3 3 3L16.41 21 13 17.59v-3.3zM12 1C5.93 1 1 5.93 1 12h2c0-4.97 4.03-9 9-9s9 4.03 9 9h2c0-6.07-4.93-11-11-11z"></path></g>\n<g id="settings-input-component"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>\n<g id="settings-input-composite"><path d="M5 2c0-.55-.45-1-1-1s-1 .45-1 1v4H1v6h6V6H5V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2H9v2zm-8 0c0 1.3.84 2.4 2 2.82V23h2v-4.18C6.16 18.4 7 17.3 7 16v-2H1v2zM21 6V2c0-.55-.45-1-1-1s-1 .45-1 1v4h-2v6h6V6h-2zm-8-4c0-.55-.45-1-1-1s-1 .45-1 1v4H9v6h6V6h-2V2zm4 14c0 1.3.84 2.4 2 2.82V23h2v-4.18c1.16-.41 2-1.51 2-2.82v-2h-6v2z"></path></g>\n<g id="settings-input-hdmi"><path d="M18 7V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3H5v6l3 6v3h8v-3l3-6V7h-1zM8 4h8v3h-2V5h-1v2h-2V5h-1v2H8V4z"></path></g>\n<g id="settings-input-svideo"><path d="M8 11.5c0-.83-.67-1.5-1.5-1.5S5 10.67 5 11.5 5.67 13 6.5 13 8 12.33 8 11.5zm7-5c0-.83-.67-1.5-1.5-1.5h-3C9.67 5 9 5.67 9 6.5S9.67 8 10.5 8h3c.83 0 1.5-.67 1.5-1.5zM8.5 15c-.83 0-1.5.67-1.5 1.5S7.67 18 8.5 18s1.5-.67 1.5-1.5S9.33 15 8.5 15zM12 1C5.93 1 1 5.93 1 12s4.93 11 11 11 11-4.93 11-11S18.07 1 12 1zm0 20c-4.96 0-9-4.04-9-9s4.04-9 9-9 9 4.04 9 9-4.04 9-9 9zm5.5-11c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-2 5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path></g>\n<g id="settings-overscan"><path d="M12.01 5.5L10 8h4l-1.99-2.5zM18 10v4l2.5-1.99L18 10zM6 10l-2.5 2.01L6 14v-4zm8 6h-4l2.01 2.5L14 16zm7-13H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"></path></g>\n<g id="settings-phone"><path d="M13 9h-2v2h2V9zm4 0h-2v2h2V9zm3 6.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 9v2h2V9h-2z"></path></g>\n<g id="settings-power"><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm2-22h-2v10h2V2zm3.56 2.44l-1.45 1.45C16.84 6.94 18 8.83 18 11c0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 4.44C5.36 5.88 4 8.28 4 11c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.72-1.36-5.12-3.44-6.56zM15 24h2v-2h-2v2z"></path></g>\n<g id="settings-remote"><path d="M15 9H9c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1zm-3 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.05 6.05l1.41 1.41C9.37 6.56 10.62 6 12 6s2.63.56 3.54 1.46l1.41-1.41C15.68 4.78 13.93 4 12 4s-3.68.78-4.95 2.05zM12 0C8.96 0 6.21 1.23 4.22 3.22l1.41 1.41C7.26 3.01 9.51 2 12 2s4.74 1.01 6.36 2.64l1.41-1.41C17.79 1.23 15.04 0 12 0z"></path></g>\n<g id="settings-voice"><path d="M7 24h2v-2H7v2zm5-11c1.66 0 2.99-1.34 2.99-3L15 4c0-1.66-1.34-3-3-3S9 2.34 9 4v6c0 1.66 1.34 3 3 3zm-1 11h2v-2h-2v2zm4 0h2v-2h-2v2zm4-14h-1.7c0 3-2.54 5.1-5.3 5.1S6.7 13 6.7 10H5c0 3.41 2.72 6.23 6 6.72V20h2v-3.28c3.28-.49 6-3.31 6-6.72z"></path></g>\n<g id="shop"><path d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z"></path></g>\n<g id="shop-two"><path d="M3 9H1v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2H3V9zm15-4V3c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5h-5zm-6-2h4v2h-4V3zm0 12V8l5.5 3-5.5 4z"></path></g>\n<g id="shopping-basket"><path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g>\n<g id="shopping-cart"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></g>\n<g id="sort"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></g>\n<g id="speaker-notes"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm0-3H6V9h2v2zm0-3H6V6h2v2zm7 6h-5v-2h5v2zm3-3h-8V9h8v2zm0-3h-8V6h8v2z"></path></g>\n<g id="speaker-notes-off"><path d="M10.54 11l-.54-.54L7.54 8 6 6.46 2.38 2.84 1.27 1.73 0 3l2.01 2.01L2 22l4-4h9l5.73 5.73L22 22.46 17.54 18l-7-7zM8 14H6v-2h2v2zm-2-3V9l2 2H6zm14-9H4.08L10 7.92V6h8v2h-7.92l1 1H18v2h-4.92l6.99 6.99C21.14 17.95 22 17.08 22 16V4c0-1.1-.9-2-2-2z"></path></g>\n<g id="spellcheck"><path d="M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3zm-6.02-5L8.5 5.48 10.57 11H6.43zm15.16.59l-8.09 8.09L9.83 16l-1.41 1.41 5.09 5.09L23 13l-1.41-1.41z"></path></g>\n<g id="star"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>\n<g id="star-border"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>\n<g id="star-half"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g>\n<g id="stars"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"></path></g>\n<g id="store"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"></path></g>\n<g id="subdirectory-arrow-left"><path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z"></path></g>\n<g id="subdirectory-arrow-right"><path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path></g>\n<g id="subject"><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"></path></g>\n<g id="supervisor-account"><path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"></path></g>\n<g id="swap-horiz"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></g>\n<g id="swap-vert"><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"></path></g>\n<g id="swap-vertical-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z"></path></g>\n<g id="system-update-alt"><path d="M12 16.5l4-4h-3v-9h-2v9H8l4 4zm9-13h-6v1.99h6v14.03H3V5.49h6V3.5H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2z"></path></g>\n<g id="tab"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z"></path></g>\n<g id="tab-unselected"><path d="M1 9h2V7H1v2zm0 4h2v-2H1v2zm0-8h2V3c-1.1 0-2 .9-2 2zm8 16h2v-2H9v2zm-8-4h2v-2H1v2zm2 4v-2H1c0 1.1.9 2 2 2zM21 3h-8v6h10V5c0-1.1-.9-2-2-2zm0 14h2v-2h-2v2zM9 5h2V3H9v2zM5 21h2v-2H5v2zM5 5h2V3H5v2zm16 16c1.1 0 2-.9 2-2h-2v2zm0-8h2v-2h-2v2zm-8 8h2v-2h-2v2zm4 0h2v-2h-2v2z"></path></g>\n<g id="text-format"><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></path></g>\n<g id="theaters"><path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path></g>\n<g id="thumb-down"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path></g>\n<g id="thumb-up"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path></g>\n<g id="thumbs-up-down"><path d="M12 6c0-.55-.45-1-1-1H5.82l.66-3.18.02-.23c0-.31-.13-.59-.33-.8L5.38 0 .44 4.94C.17 5.21 0 5.59 0 6v6.5c0 .83.67 1.5 1.5 1.5h6.75c.62 0 1.15-.38 1.38-.91l2.26-5.29c.07-.17.11-.36.11-.55V6zm10.5 4h-6.75c-.62 0-1.15.38-1.38.91l-2.26 5.29c-.07.17-.11.36-.11.55V18c0 .55.45 1 1 1h5.18l-.66 3.18-.02.24c0 .31.13.59.33.8l.79.78 4.94-4.94c.27-.27.44-.65.44-1.06v-6.5c0-.83-.67-1.5-1.5-1.5z"></path></g>\n<g id="timeline"><path d="M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2z"></path></g>\n<g id="toc"><path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path></g>\n<g id="today"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path></g>\n<g id="toll"><path d="M15 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM3 12c0-2.61 1.67-4.83 4-5.65V4.26C3.55 5.15 1 8.27 1 12s2.55 6.85 6 7.74v-2.09c-2.33-.82-4-3.04-4-5.65z"></path></g>\n<g id="touch-app"><path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"></path></g>\n<g id="track-changes"><path d="M19.07 4.93l-1.41 1.41C19.1 7.79 20 9.79 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.08 3.05-7.44 7-7.93v2.02C8.16 6.57 6 9.03 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.66-.67-3.16-1.76-4.24l-1.41 1.41C15.55 9.9 16 10.9 16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.86 1.28-3.41 3-3.86v2.14c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V2h-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07z"></path></g>\n<g id="translate"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path></g>\n<g id="trending-down"><path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z"></path></g>\n<g id="trending-flat"><path d="M22 12l-4-4v3H3v2h15v3z"></path></g>\n<g id="trending-up"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></g>\n<g id="turned-in"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g>\n<g id="turned-in-not"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path></g>\n<g id="unarchive"><path d="M20.55 5.22l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zM12 9.5l5.5 5.5H14v2h-4v-2H6.5L12 9.5zM5.12 5l.82-1h12l.93 1H5.12z"></path></g>\n<g id="undo"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path></g>\n<g id="unfold-less"><path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z"></path></g>\n<g id="unfold-more"><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path></g>\n<g id="update"><path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"></path></g>\n<g id="verified-user"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path></g>\n<g id="view-agenda"><path d="M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"></path></g>\n<g id="view-array"><path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z"></path></g>\n<g id="view-carousel"><path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"></path></g>\n<g id="view-column"><path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path></g>\n<g id="view-day"><path d="M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z"></path></g>\n<g id="view-headline"><path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"></path></g>\n<g id="view-list"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></g>\n<g id="view-module"><path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"></path></g>\n<g id="view-quilt"><path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"></path></g>\n<g id="view-stream"><path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"></path></g>\n<g id="view-week"><path d="M6 5H3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm14 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-7 0h-3c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z"></path></g>\n<g id="visibility"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></g>\n<g id="visibility-off"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></g>\n<g id="warning"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g>\n<g id="watch-later"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"></path></g>\n<g id="weekend"><path d="M21 10c-1.1 0-2 .9-2 2v3H5v-3c0-1.1-.9-2-2-2s-2 .9-2 2v5c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2zm-3-5H6c-1.1 0-2 .9-2 2v2.15c1.16.41 2 1.51 2 2.82V14h12v-2.03c0-1.3.84-2.4 2-2.82V7c0-1.1-.9-2-2-2z"></path></g>\n<g id="work"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path></g>\n<g id="youtube-searched-for"><path d="M17.01 14h-.8l-.27-.27c.98-1.14 1.57-2.61 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 3-6.5 6.5H2l3.84 4 4.16-4H6.51C6.51 7 8.53 5 11.01 5s4.5 2.01 4.5 4.5c0 2.48-2.02 4.5-4.5 4.5-.65 0-1.26-.14-1.82-.38L7.71 15.1c.97.57 2.09.9 3.3.9 1.61 0 3.08-.59 4.22-1.57l.27.27v.79l5.01 4.99L22 19l-4.99-5z"></path></g>\n<g id="zoom-in"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm2.5-4h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path></g>\n<g id="zoom-out"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"></path></g>\n</defs></svg>\n</iron-iconset-svg>',
      ]),
      ek = G(dk);
   ek.setAttribute("style", "display: none;");
   document.head.appendChild(ek.content);
   var fk = ea(
      [
         '\n    <style>\n      :host {\n        display: inline-block;\n        position: relative;\n        padding: 8px;\n        outline: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        cursor: pointer;\n        z-index: 0;\n        line-height: 1;\n\n        width: 40px;\n        height: 40px;\n\n        /* NOTE: Both values are needed, since some phones require the value to be `transparent`. */\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n        -webkit-tap-highlight-color: transparent;\n\n        /* Because of polymer/2558, this style has lower specificity than * */\n        box-sizing: border-box !important;\n\n        @apply --paper-icon-button;\n      }\n\n      :host #ink {\n        color: var(--paper-icon-button-ink-color, var(--primary-text-color));\n        opacity: 0.6;\n      }\n\n      :host([disabled]) {\n        color: var(--paper-icon-button-disabled-text, var(--disabled-text-color));\n        pointer-events: none;\n        cursor: auto;\n\n        @apply --paper-icon-button-disabled;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      :host(:hover) {\n        @apply --paper-icon-button-hover;\n      }\n\n      iron-icon {\n        --iron-icon-width: 100%;\n        --iron-icon-height: 100%;\n      }\n    </style>\n\n    <iron-icon id="icon" src="[[src]]" icon="[[icon]]" alt$="[[alt]]"></iron-icon>\n  ',
      ],
      [
         '\n    <style>\n      :host {\n        display: inline-block;\n        position: relative;\n        padding: 8px;\n        outline: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        cursor: pointer;\n        z-index: 0;\n        line-height: 1;\n\n        width: 40px;\n        height: 40px;\n\n        /* NOTE: Both values are needed, since some phones require the value to be \\`transparent\\`. */\n        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n        -webkit-tap-highlight-color: transparent;\n\n        /* Because of polymer/2558, this style has lower specificity than * */\n        box-sizing: border-box !important;\n\n        @apply --paper-icon-button;\n      }\n\n      :host #ink {\n        color: var(--paper-icon-button-ink-color, var(--primary-text-color));\n        opacity: 0.6;\n      }\n\n      :host([disabled]) {\n        color: var(--paper-icon-button-disabled-text, var(--disabled-text-color));\n        pointer-events: none;\n        cursor: auto;\n\n        @apply --paper-icon-button-disabled;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      :host(:hover) {\n        @apply --paper-icon-button-hover;\n      }\n\n      iron-icon {\n        --iron-icon-width: 100%;\n        --iron-icon-height: 100%;\n      }\n    </style>\n\n    <iron-icon id="icon" src="[[src]]" icon="[[icon]]" alt$="[[alt]]"></iron-icon>\n  ',
      ]
   );
   N({
      is: "paper-icon-button",
      _template: G(fk),
      hostAttributes: { role: "button", tabindex: "0" },
      behaviors: [ti],
      properties: {
         src: { type: String },
         icon: { type: String },
         alt: { type: String, observer: "_altChanged" },
      },
      _altChanged: function (a, b) {
         var c = this.getAttribute("aria-label");
         (c && b != c) || this.setAttribute("aria-label", a);
      },
      registered: function () {
         this._template.setAttribute("strip-whitespace", "");
      },
   });
   function gk(a) {
      a = T(a);
      return U({ width: a.height, height: a.width });
   }
   function hk() {
      return H.apply(this, arguments) || this;
   }
   A(hk, H);
   m = hk.prototype;
   m.ready = function () {
      this.hh = {};
      for (var a in O.hb) this.hh[O.hb[a]] = this.getMsg_(a + "_MODE");
      H.prototype.ready.call(this);
   };
   m.computeSortedSizes_ = function (a) {
      a = a.map(function (b) {
         return T(b);
      });
      a.sort(function (b, c) {
         return b.width == c.width ? b.height - c.height : b.width - c.width;
      });
      return a.map(function (b) {
         return U(b);
      });
   };
   m.computeEnabledControls_ = function (a, b, c) {
      var d = {};
      d = ((d.mode = !1), (d.size = !1), (d.feed = !1), d);
      0 < a.length &&
         ((d.size = 1 < b.length),
         (d.feed = 0 < c.length),
         1 < a.length
            ? (d.mode = !0)
            : ((a = a[0] == O.hb.PARALLAX || a[0] == O.hb.MOBILE),
              (d.mode = d.size || d.feed || a)));
      return d;
   };
   m.computeHasControls_ = function (a) {
      for (var b in a) if (a[b]) return !0;
      return !1;
   };
   m.getMsg_ = function (a) {
      return V(a);
   };
   m.modeIs_ = function (a, b) {
      return a == b;
   };
   m.getModesItemsList_ = function (a) {
      var b = this;
      return a.map(function (c) {
         return { value: c, label: b.hh[c] };
      });
   };
   m.getSizesItemsList_ = function (a) {
      return a.map(function (b) {
         var c = T(b);
         return { value: b, label: c.width + " x " + c.height };
      });
   };
   m.getFeedsItemsList_ = function (a) {
      return a.map(function (b) {
         var c = b || V("NO_SAMPLE_DATA");
         return { value: b, label: c };
      });
   };
   m.getDevicesItemsList_ = function () {
      var a = [];
      O.be.forEach(function (b, c) {
         a.push({ value: c, label: b.name });
      });
      return a;
   };
   m.getSizeSelectorValue_ = function (a, b) {
      return b ? "custom" : a;
   };
   m.getControlEnabledClass_ = function (a) {
      return a ? "control-enabled" : "";
   };
   m.onSizeSelectorChange_ = function (a) {
      a = a.target.value;
      this.set("modeSettings.single.isCustomSize", "custom" == a);
      "custom" != a && this.set("modeSettings.single.size", a);
   };
   m.onMobileDeviceSelectorChange_ = function (a) {
      this.handleDeviceSelectorChange_(O.hb.MOBILE, a.target.value);
   };
   m.onParallaxDeviceSelectorChange_ = function (a) {
      this.handleDeviceSelectorChange_(O.hb.PARALLAX, a.target.value);
   };
   m.handleDeviceSelectorChange_ = function (a, b) {
      this.set("modeSettings." + a + ".isCustomSize", "custom" == b);
      "custom" != b &&
         (this.set("modeSettings." + a + ".device", b),
         (b = U(O.be.get(b))),
         this.modeSettings[a].ak && (b = gk(b)),
         this.set("modeSettings." + a + ".deviceSize", b));
   };
   m.onMobileRotateButtonClick_ = function () {
      this.handleRotateButtonClick_(O.hb.MOBILE);
   };
   m.onParallaxRotateButtonClick_ = function () {
      this.handleRotateButtonClick_(O.hb.PARALLAX);
   };
   m.handleRotateButtonClick_ = function (a) {
      var b = this.modeSettings[a];
      this.set("modeSettings." + a + ".isRotated", !b.ak);
      this.set("modeSettings." + a + ".deviceSize", gk(b.deviceSize));
   };
   m.onReloadButtonClick_ = function () {
      this.dispatchEvent(new CustomEvent("reload-view"));
   };
   t.Object.defineProperties(hk, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview-controls";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return Vh;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               modes: {
                  type: Array,
                  value: function () {
                     return [];
                  },
               },
               sizes: {
                  type: Array,
                  value: function () {
                     return [];
                  },
               },
               sortedSizes_: {
                  type: Array,
                  value: function () {
                     return [];
                  },
                  computed: "computeSortedSizes_(sizes)",
                  readOnly: !0,
               },
               feeds: {
                  type: Array,
                  value: function () {
                     return [];
                  },
               },
               mode: { type: String, notify: !0 },
               modeSettings: { type: Object, notify: !0 },
               hasControls: {
                  type: Boolean,
                  reflectToAttribute: !0,
                  computed: "computeHasControls_(enabledControls_)",
                  readOnly: !0,
               },
               enabledControls_: {
                  type: Object,
                  computed: "computeEnabledControls_(modes, sizes, feeds)",
                  readOnly: !0,
               },
            };
         },
      },
   });
   hk.prototype._setSortedSizes_ = function () {};
   hk.prototype._setHasControls = function () {};
   hk.prototype._setEnabledControls_ = function () {};
   customElements.define(hk.is, hk);
   var ik, jk;
   if (void 0 === ik) {
      var kk = document.createElement("template");
      kk.innerHTML =
         '<style>\n  :host {\n    display: block;\n    padding: var(--tf-creative-preview-stage-padding);\n    box-sizing: border-box;\n  }\n\n  iframe {\n    border: none;\n    background: #fff;\n    width: 100%;\n    height: 100%;\n    @apply --shadow-elevation-2dp;\n  }\n</style>\n\n<iframe id="iframe" allowfullscreen="" src="[[getIframeSrc(previewPath, feed, active)]]"></iframe>\n';
      ik = kk;
   }
   jk = ik;
   var lk = yg(pg(new mg(ng, "about:blank")));
   function W() {
      return H.apply(this, arguments) || this;
   }
   A(W, H);
   W.prototype.getIframeSrc = function (a, b, c) {
      c
         ? ((b = { feed: b || void 0 }),
           (a = vg({ previewPath: a })),
           (a = ug(a).toString()),
           (a = zg.exec(a)),
           (c = a[3] || ""),
           (b = yg(a[1] + Ag("?", a[2] || "", b) + Ag("#", c, void 0))))
         : (b = lk);
      return b;
   };
   W.prototype.reload = function () {};
   t.Object.defineProperties(W, {
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               previewPath: String,
               active: { type: Boolean, reflectToAttribute: !0 },
            };
         },
      },
   });
   function mk() {
      return W.apply(this, arguments) || this;
   }
   A(mk, W);
   mk.prototype.reload = function () {
      Lh(this.$.iframe);
   };
   t.Object.defineProperties(mk, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview-desktop";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return jk;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return { feed: String };
         },
      },
   });
   customElements.define(mk.is, mk);
   var nk, ok;
   if (void 0 === nk) {
      var pk = document.createElement("template");
      pk.innerHTML =
         '<style>\n  :host {\n    display: block;\n    padding: var(--tf-creative-preview-stage-padding);\n  }\n\n  :host([responsive]) {\n    /* For consistency with the Single size view, don\'t add padding on the sides with the\n     * resize handles. */\n    padding-right: 0;\n    padding-bottom: 0;\n  }\n\n  iframe {\n    border: none;\n    background: #fff;\n  }\n</style>\n\n<tf-creative-preview-resizable-container id="deviceFrame" size="{{parsedDeviceSize_}}" resizable="[[responsive]]" min="[[minSize_]]" max="[[maxSize_]]">\n  <iframe id="iframe" allowfullscreen="" src$="[[getIframeSrc(previewPath, feed, active)]]" slot="content" width$="[[parsedDeviceSize_.width]]" height$="[[parsedDeviceSize_.height]]">\n  </iframe>\n</tf-creative-preview-resizable-container>\n';
      nk = pk;
   }
   ok = nk;
   var qk, rk;
   if (void 0 === qk) {
      var sk = document.createElement("template");
      sk.innerHTML =
         '<style>\n  :host {\n    --tf-creative-preview-handle-size: 16px;\n    --tf-creative-preview-handle-color: var(--paper-grey-500);\n    --tf-creative-preview-handle-bg-color: var(--tf-creative-preview-bg-color);\n    --tf-creative-preview-handle-active-bg-color: #d8d8d8;\n    --tf-creative-preview-drag-handle-scale: 1.25;\n\n    display: inline-block;\n    position: relative;\n    @apply --shadow-elevation-2dp;\n  }\n\n  :host([resizable]) {\n    padding: 0 var(--tf-creative-preview-handle-size) var(--tf-creative-preview-handle-size) 0;\n  }\n\n  /* Using ::slotted(*) (with the wildcard) does not work correctly with the polyfill. */\n  :host([resizable]) ::slotted([slot="content"]) {\n    position: relative;\n    /* Shadow cast by the resizable content on the handles. */\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.075);\n    z-index: 2;\n  }\n\n  .handle {\n    display: none;\n    position: absolute;\n    justify-content: center;\n    align-items: center;\n    box-sizing: border-box;\n    background: var(--tf-creative-preview-handle-bg-color);\n    color: var(--tf-creative-preview-handle-color);\n    transition: background 200ms;\n    -webkit-transition: background 200ms;\n    -moz-transition: background 200ms;\n    cursor: pointer;\n    -webkit-user-select: none;\n  }\n\n  :host([resizable]) .handle {\n    display: flex;\n  }\n\n  /* On handle mouseover or while a handle is being dragged, highlight the handle\'s background.\n   * The southeast handle is special -- interacting with it activates all three handles. */\n  .handle:hover,\n  .handle:active,\n  .handle[data-direction="se"]:hover ~ .handle,\n  .handle[data-direction="se"]:active ~ .handle {\n    background: var(--tf-creative-preview-handle-active-bg-color);\n  }\n\n  .handle[data-direction="e"] {\n    right: 0;\n    top: 0;\n    width: var(--tf-creative-preview-handle-size);\n    height: 100%;\n    padding-bottom: var(--tf-creative-preview-handle-size);\n    cursor: e-resize;\n\n    /* For IE. The contents are not centered correctly if using flex-direction: row. */\n    flex-direction: column;\n  }\n\n  .handle[data-direction="s"] {\n    bottom: 0;\n    width: 100%;\n    height: var(--tf-creative-preview-handle-size);\n    padding-right: var(--tf-creative-preview-handle-size);\n    cursor: s-resize;\n  }\n\n  .handle[data-direction="se"] {\n    right: 0;\n    bottom: 0;\n    width: var(--tf-creative-preview-handle-size);\n    height: var(--tf-creative-preview-handle-size);\n    z-index: 1;\n    cursor: se-resize;\n  }\n\n  .handle iron-icon {\n    flex-shrink: 0;\n  }\n\n  .handle[data-direction="e"] iron-icon {\n    /* The drag handle icons in Polymer\'s icon set are shorter than we need. Lengthen them. */\n    transform: scaleY(var(--tf-creative-preview-drag-handle-scale)) rotateZ(90deg);\n  }\n\n  .handle[data-direction="s"] iron-icon {\n    transform: scaleX(var(--tf-creative-preview-drag-handle-scale));\n  }\n\n  /* No diagonal drag handle icon is available in the icon set. Create one from the orthogonal\n   * drag icon by rotating and cropping it (see next rule). */\n  iron-icon.diagonal-icon {\n    transform: rotateZ(-45deg) translate(0px, -4px);\n    transform-origin: 50% 50%;\n  }\n\n  .diagonal-icon-crop-container {\n    overflow: hidden;\n    margin: 0px 3px 3px 0;\n    height: calc(var(--tf-creative-preview-handle-size) - 3px);\n  }\n</style>\n\n<slot name="content"></slot>\n\n<div class="handle" data-direction="se" on-track="onTrack_">\n  <div class="diagonal-icon-crop-container">\n    <iron-icon class="diagonal-icon" icon="editor:drag-handle"></iron-icon>\n  </div>\n</div>\n\n<div class="handle" data-direction="e" on-track="onTrack_">\n  <iron-icon icon="editor:drag-handle"></iron-icon>\n</div>\n\n<div class="handle" data-direction="s" on-track="onTrack_">\n  <iron-icon icon="editor:drag-handle"></iron-icon>\n</div>\n';
      qk = sk;
   }
   rk = qk;
   var tk = x([
         '<iron-iconset-svg name="editor" size="24">\n<svg><defs>\n<g id="attach-file"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path></g>\n<g id="attach-money"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path></g>\n<g id="border-all"><path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"></path></g>\n<g id="border-bottom"><path d="M9 11H7v2h2v-2zm4 4h-2v2h2v-2zM9 3H7v2h2V3zm4 8h-2v2h2v-2zM5 3H3v2h2V3zm8 4h-2v2h2V7zm4 4h-2v2h2v-2zm-4-8h-2v2h2V3zm4 0h-2v2h2V3zm2 10h2v-2h-2v2zm0 4h2v-2h-2v2zM5 7H3v2h2V7zm14-4v2h2V3h-2zm0 6h2V7h-2v2zM5 11H3v2h2v-2zM3 21h18v-2H3v2zm2-6H3v2h2v-2z"></path></g>\n<g id="border-clear"><path d="M7 5h2V3H7v2zm0 8h2v-2H7v2zm0 8h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm-8 0h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2V7H3v2zm0-4h2V3H3v2zm8 8h2v-2h-2v2zm8 4h2v-2h-2v2zm0-4h2v-2h-2v2zm0 8h2v-2h-2v2zm0-12h2V7h-2v2zm-8 0h2V7h-2v2zm8-6v2h2V3h-2zm-8 2h2V3h-2v2zm4 16h2v-2h-2v2zm0-8h2v-2h-2v2zm0-8h2V3h-2v2z"></path></g>\n<g id="border-color"><path d="M17.75 7L14 3.25l-10 10V17h3.75l10-10zm2.96-2.96c.39-.39.39-1.02 0-1.41L18.37.29c-.39-.39-1.02-.39-1.41 0L15 2.25 18.75 6l1.96-1.96z"></path><path fill-opacity=".36" d="M0 20h24v4H0z"></path></g>\n<g id="border-horizontal"><path d="M3 21h2v-2H3v2zM5 7H3v2h2V7zM3 17h2v-2H3v2zm4 4h2v-2H7v2zM5 3H3v2h2V3zm4 0H7v2h2V3zm8 0h-2v2h2V3zm-4 4h-2v2h2V7zm0-4h-2v2h2V3zm6 14h2v-2h-2v2zm-8 4h2v-2h-2v2zm-8-8h18v-2H3v2zM19 3v2h2V3h-2zm0 6h2V7h-2v2zm-8 8h2v-2h-2v2zm4 4h2v-2h-2v2zm4 0h2v-2h-2v2z"></path></g>\n<g id="border-inner"><path d="M3 21h2v-2H3v2zm4 0h2v-2H7v2zM5 7H3v2h2V7zM3 17h2v-2H3v2zM9 3H7v2h2V3zM5 3H3v2h2V3zm12 0h-2v2h2V3zm2 6h2V7h-2v2zm0-6v2h2V3h-2zm-4 18h2v-2h-2v2zM13 3h-2v8H3v2h8v8h2v-8h8v-2h-8V3zm6 18h2v-2h-2v2zm0-4h2v-2h-2v2z"></path></g>\n<g id="border-left"><path d="M11 21h2v-2h-2v2zm0-4h2v-2h-2v2zm0-12h2V3h-2v2zm0 4h2V7h-2v2zm0 4h2v-2h-2v2zm-4 8h2v-2H7v2zM7 5h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2V3H3v18zM19 9h2V7h-2v2zm-4 12h2v-2h-2v2zm4-4h2v-2h-2v2zm0-14v2h2V3h-2zm0 10h2v-2h-2v2zm0 8h2v-2h-2v2zm-4-8h2v-2h-2v2zm0-8h2V3h-2v2z"></path></g>\n<g id="border-outer"><path d="M13 7h-2v2h2V7zm0 4h-2v2h2v-2zm4 0h-2v2h2v-2zM3 3v18h18V3H3zm16 16H5V5h14v14zm-6-4h-2v2h2v-2zm-4-4H7v2h2v-2z"></path></g>\n<g id="border-right"><path d="M7 21h2v-2H7v2zM3 5h2V3H3v2zm4 0h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2v-2H3v2zm8 0h2v-2h-2v2zm-8-8h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm8 8h2v-2h-2v2zm4-4h2v-2h-2v2zm4-10v18h2V3h-2zm-4 18h2v-2h-2v2zm0-16h2V3h-2v2zm-4 8h2v-2h-2v2zm0-8h2V3h-2v2zm0 4h2V7h-2v2z"></path></g>\n<g id="border-style"><path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"></path></g>\n<g id="border-top"><path d="M7 21h2v-2H7v2zm0-8h2v-2H7v2zm4 0h2v-2h-2v2zm0 8h2v-2h-2v2zm-8-4h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2v-2H3v2zm0-4h2V7H3v2zm8 8h2v-2h-2v2zm8-8h2V7h-2v2zm0 4h2v-2h-2v2zM3 3v2h18V3H3zm16 14h2v-2h-2v2zm-4 4h2v-2h-2v2zM11 9h2V7h-2v2zm8 12h2v-2h-2v2zm-4-8h2v-2h-2v2z"></path></g>\n<g id="border-vertical"><path d="M3 9h2V7H3v2zm0-4h2V3H3v2zm4 16h2v-2H7v2zm0-8h2v-2H7v2zm-4 0h2v-2H3v2zm0 8h2v-2H3v2zm0-4h2v-2H3v2zM7 5h2V3H7v2zm12 12h2v-2h-2v2zm-8 4h2V3h-2v18zm8 0h2v-2h-2v2zm0-8h2v-2h-2v2zm0-10v2h2V3h-2zm0 6h2V7h-2v2zm-4-4h2V3h-2v2zm0 16h2v-2h-2v2zm0-8h2v-2h-2v2z"></path></g>\n<g id="bubble-chart"><circle cx="7.2" cy="14.4" r="3.2"></circle><circle cx="14.8" cy="18" r="2"></circle><circle cx="15.2" cy="8.8" r="4.8"></circle></g>\n<g id="drag-handle"><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path></g>\n<g id="format-align-center"><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"></path></g>\n<g id="format-align-justify"><path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"></path></g>\n<g id="format-align-left"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"></path></g>\n<g id="format-align-right"><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"></path></g>\n<g id="format-bold"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path></g>\n<g id="format-clear"><path d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.55 5.27 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z"></path></g>\n<g id="format-color-fill"><path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"></path><path fill-opacity=".36" d="M0 20h24v4H0z"></path></g>\n<g id="format-color-reset"><path d="M18 14c0-4-6-10.8-6-10.8s-1.33 1.51-2.73 3.52l8.59 8.59c.09-.42.14-.86.14-1.31zm-.88 3.12L12.5 12.5 5.27 5.27 4 6.55l3.32 3.32C6.55 11.32 6 12.79 6 14c0 3.31 2.69 6 6 6 1.52 0 2.9-.57 3.96-1.5l2.63 2.63 1.27-1.27-2.74-2.74z"></path></g>\n<g id="format-color-text"><path fill-opacity=".36" d="M0 20h24v4H0z"></path><path d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"></path></g>\n<g id="format-indent-decrease"><path d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"></path></g>\n<g id="format-indent-increase"><path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"></path></g>\n<g id="format-italic"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path></g>\n<g id="format-line-spacing"><path d="M6 7h2.5L5 3.5 1.5 7H4v10H1.5L5 20.5 8.5 17H6V7zm4-2v2h12V5H10zm0 14h12v-2H10v2zm0-6h12v-2H10v2z"></path></g>\n<g id="format-list-bulleted"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"></path></g>\n<g id="format-list-numbered"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"></path></g>\n<g id="format-paint"><path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3z"></path></g>\n<g id="format-quote"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></g>\n<g id="format-shapes"><path d="M23 7V1h-6v2H7V1H1v6h2v10H1v6h6v-2h10v2h6v-6h-2V7h2zM3 3h2v2H3V3zm2 18H3v-2h2v2zm12-2H7v-2H5V7h2V5h10v2h2v10h-2v2zm4 2h-2v-2h2v2zM19 5V3h2v2h-2zm-5.27 9h-3.49l-.73 2H7.89l3.4-9h1.4l3.41 9h-1.63l-.74-2zm-3.04-1.26h2.61L12 8.91l-1.31 3.83z"></path></g>\n<g id="format-size"><path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"></path></g>\n<g id="format-strikethrough"><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"></path></g>\n<g id="format-textdirection-l-to-r"><path d="M9 10v5h2V4h2v11h2V4h2V2H9C6.79 2 5 3.79 5 6s1.79 4 4 4zm12 8l-4-4v3H5v2h12v3l4-4z"></path></g>\n<g id="format-textdirection-r-to-l"><path d="M10 10v5h2V4h2v11h2V4h2V2h-8C7.79 2 6 3.79 6 6s1.79 4 4 4zm-2 7v-3l-4 4 4 4v-3h12v-2H8z"></path></g>\n<g id="format-underlined"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"></path></g>\n<g id="functions"><path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z"></path></g>\n<g id="highlight"><path d="M6 14l3 3v5h6v-5l3-3V9H6zm5-12h2v3h-2zM3.5 5.875L4.914 4.46l2.12 2.122L5.62 7.997zm13.46.71l2.123-2.12 1.414 1.414L18.375 8z"></path></g>\n<g id="insert-chart"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g>\n<g id="insert-comment"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path></g>\n<g id="insert-drive-file"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"></path></g>\n<g id="insert-emoticon"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path></g>\n<g id="insert-invitation"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"></path></g>\n<g id="insert-link"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>\n<g id="insert-photo"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></g>\n<g id="linear-scale"><path d="M19.5 9.5c-1.03 0-1.9.62-2.29 1.5h-2.92c-.39-.88-1.26-1.5-2.29-1.5s-1.9.62-2.29 1.5H6.79c-.39-.88-1.26-1.5-2.29-1.5C3.12 9.5 2 10.62 2 12s1.12 2.5 2.5 2.5c1.03 0 1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5s1.9-.62 2.29-1.5h2.92c.39.88 1.26 1.5 2.29 1.5 1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5z"></path></g>\n<g id="merge-type"><path d="M17 20.41L18.41 19 15 15.59 13.59 17 17 20.41zM7.5 8H11v5.59L5.59 19 7 20.41l6-6V8h3.5L12 3.5 7.5 8z"></path></g>\n<g id="mode-comment"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"></path></g>\n<g id="mode-edit"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>\n<g id="monetization-on"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"></path></g>\n<g id="money-off"><path d="M12.5 6.9c1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-.53.12-1.03.3-1.48.54l1.47 1.47c.41-.17.91-.27 1.51-.27zM5.33 4.06L4.06 5.33 7.5 8.77c0 2.08 1.56 3.21 3.91 3.91l3.51 3.51c-.34.48-1.05.91-2.42.91-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c.96-.18 1.82-.55 2.45-1.12l2.22 2.22 1.27-1.27L5.33 4.06z"></path></g>\n<g id="multiline-chart"><path d="M22 6.92l-1.41-1.41-2.85 3.21C15.68 6.4 12.83 5 9.61 5 6.72 5 4.07 6.16 2 8l1.42 1.42C5.12 7.93 7.27 7 9.61 7c2.74 0 5.09 1.26 6.77 3.24l-2.88 3.24-4-4L2 16.99l1.5 1.5 6-6.01 4 4 4.05-4.55c.75 1.35 1.25 2.9 1.44 4.55H21c-.22-2.3-.95-4.39-2.04-6.14L22 6.92z"></path></g>\n<g id="pie-chart"><path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"></path></g>\n<g id="pie-chart-outlined"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 2.07c3.61.45 6.48 3.33 6.93 6.93H13V4.07zM4 12c0-4.06 3.07-7.44 7-7.93v15.87c-3.93-.5-7-3.88-7-7.94zm9 7.93V13h6.93c-.45 3.61-3.32 6.48-6.93 6.93z"></path></g>\n<g id="publish"><path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"></path></g>\n<g id="short-text"><path d="M4 9h16v2H4zm0 4h10v2H4z"></path></g>\n<g id="show-chart"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"></path></g>\n<g id="space-bar"><path d="M18 9v4H6V9H4v6h16V9z"></path></g>\n<g id="strikethrough-s"><path d="M7.24 8.75c-.26-.48-.39-1.03-.39-1.67 0-.61.13-1.16.4-1.67.26-.5.63-.93 1.11-1.29.48-.35 1.05-.63 1.7-.83.66-.19 1.39-.29 2.18-.29.81 0 1.54.11 2.21.34.66.22 1.23.54 1.69.94.47.4.83.88 1.08 1.43.25.55.38 1.15.38 1.81h-3.01c0-.31-.05-.59-.15-.85-.09-.27-.24-.49-.44-.68-.2-.19-.45-.33-.75-.44-.3-.1-.66-.16-1.06-.16-.39 0-.74.04-1.03.13-.29.09-.53.21-.72.36-.19.16-.34.34-.44.55-.1.21-.15.43-.15.66 0 .48.25.88.74 1.21.38.25.77.48 1.41.7H7.39c-.05-.08-.11-.17-.15-.25zM21 12v-2H3v2h9.62c.18.07.4.14.55.2.37.17.66.34.87.51.21.17.35.36.43.57.07.2.11.43.11.69 0 .23-.05.45-.14.66-.09.2-.23.38-.42.53-.19.15-.42.26-.71.35-.29.08-.63.13-1.01.13-.43 0-.83-.04-1.18-.13s-.66-.23-.91-.42c-.25-.19-.45-.44-.59-.75-.14-.31-.25-.76-.25-1.21H6.4c0 .55.08 1.13.24 1.58.16.45.37.85.65 1.21.28.35.6.66.98.92.37.26.78.48 1.22.65.44.17.9.3 1.38.39.48.08.96.13 1.44.13.8 0 1.53-.09 2.18-.28s1.21-.45 1.67-.79c.46-.34.82-.77 1.07-1.27s.38-1.07.38-1.71c0-.6-.1-1.14-.31-1.61-.05-.11-.11-.23-.17-.33H21z"></path></g>\n<g id="text-fields"><path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"></path></g>\n<g id="title"><path d="M5 4v3h5.5v12h3V7H19V4z"></path></g>\n<g id="vertical-align-bottom"><path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"></path></g>\n<g id="vertical-align-center"><path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"></path></g>\n<g id="vertical-align-top"><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"></path></g>\n<g id="wrap-text"><path d="M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3 3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"></path></g>\n</defs></svg>\n</iron-iconset-svg>',
      ]),
      uk = G(tk);
   uk.setAttribute("style", "display: none;");
   document.head.appendChild(uk.content);
   var vk = $d(H);
   function wk() {
      return vk.apply(this, arguments) || this;
   }
   A(wk, vk);
   wk.prototype.ready = function () {
      this.wd = null;
      this.addEventListener("mousedown", this.onMousedown_);
      this.addEventListener("mouseup", this.onMouseup_);
      vk.prototype.ready.call(this);
   };
   wk.prototype.onMousedown_ = function () {
      this.resizable &&
         this.querySelector("iframe").style.setProperty(
            "pointer-events",
            "none"
         );
   };
   wk.prototype.onMouseup_ = function () {
      this.resizable &&
         this.querySelector("iframe").style.removeProperty("pointer-events");
   };
   wk.prototype.onTrack_ = function (a) {
      var b = a
            .composedPath()
            .find(function (f) {
               return f.classList && f.classList.contains("handle");
            })
            .getAttribute("data-direction"),
         c = a.detail,
         d = c.dx;
      a = c.dy;
      c = c.state;
      "start" == c &&
         ((this.wd = { width: this.size.width, height: this.size.height }),
         document.body.style.setProperty("cursor", b + "-resize"));
      var e = this.size.width;
      if ("e" == b || "se" == b)
         e = Math.min(Math.max(this.wd.width + d, this.min), this.max);
      d = this.size.height;
      if ("s" == b || "se" == b)
         d = Math.min(Math.max(this.wd.height + a, this.min), this.max);
      this.size = { width: e, height: d };
      "end" == c &&
         ((this.wd = null), document.body.style.removeProperty("cursor"));
   };
   t.Object.defineProperties(wk, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview-resizable-container";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return rk;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               size: { type: Object, notify: !0 },
               resizable: { type: Boolean, reflectToAttribute: !0 },
               min: { type: Number, value: 0 },
               max: { type: Number, value: Number.POSITIVE_INFINITY },
            };
         },
      },
   });
   customElements.define(wk.is, wk);
   function X() {
      return W.apply(this, arguments) || this;
   }
   A(X, W);
   X.prototype.ready = function () {
      W.prototype.ready.call(this);
   };
   X.prototype.deviceSizeChanged_ = function (a) {
      this.parsedDeviceSize_ = T(a);
   };
   X.prototype.parsedDeviceSizeChanged_ = function (a) {
      this.deviceSize = U(a);
   };
   X.prototype.reload = function () {
      Lh(this.$.iframe);
   };
   t.Object.defineProperties(X, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview-mobile";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return ok;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               deviceSize: {
                  type: String,
                  notify: !0,
                  observer: X.prototype.deviceSizeChanged_,
               },
               parsedDeviceSize_: {
                  type: Object,
                  observer: X.prototype.parsedDeviceSizeChanged_,
               },
               feed: String,
               responsive: { type: Boolean, reflectToAttribute: !0 },
            };
         },
      },
   });
   customElements.define(X.is, X);
   var xk, yk;
   if (void 0 === xk) {
      var zk = document.createElement("template");
      zk.innerHTML =
         '\n<style>\n  /* The card details container. */\n  .card-actions {\n    /* Use content-box so the container\'s width can be matched to the iframe\'s. */\n    box-sizing: content-box;\n\n    @apply --layout-horizontal;\n    @apply --layout-center;\n  }\n\n  .card-content {\n    /* Center the iframe in the card if the card is wider than the iframe. */\n    text-align: center;\n  }\n\n  /* The Reload button. */\n  paper-icon-button {\n    --paper-icon-button: {\n      color: var(--tf-creative-preview-icon-color, inherit);\n    };\n\n    flex-shrink: 0;\n    margin-left: auto;\n    /* Counteract the button\'s 8px padding so icon graphic is visually right-aligned. */\n    margin-right: -8px;\n  }\n\n  iframe {\n    border: none;\n  }\n</style>\n\n<paper-card>\n  \n  <div class="card-content">\n    <iframe id="iframe" allowfullscreen="" src$="[[iframeSrc]]" scrolling="no" width$="[[size.width]]" height$="[[size.height]]">\n    </iframe>\n  </div>\n  \n  <div id="details" class="card-actions">\n    <div id="label">[[label]]</div>\n    <paper-icon-button id="reloadButton" icon="icons:refresh" title$="[[getMsg_(\'RELOAD\')]]" on-click="onReloadButtonClick_">\n    </paper-icon-button>\n  </div>\n</paper-card>\n';
      xk = zk;
   }
   yk = xk;
   var Ak = ea(
      [
         '\n    <style>\n      :host {\n        display: inline-block;\n        overflow: hidden;\n        position: relative;\n      }\n\n      #baseURIAnchor {\n        display: none;\n      }\n\n      #sizedImgDiv {\n        position: absolute;\n        top: 0px;\n        right: 0px;\n        bottom: 0px;\n        left: 0px;\n\n        display: none;\n      }\n\n      #img {\n        display: block;\n        width: var(--iron-image-width, auto);\n        height: var(--iron-image-height, auto);\n      }\n\n      :host([sizing]) #sizedImgDiv {\n        display: block;\n      }\n\n      :host([sizing]) #img {\n        display: none;\n      }\n\n      #placeholder {\n        position: absolute;\n        top: 0px;\n        right: 0px;\n        bottom: 0px;\n        left: 0px;\n\n        background-color: inherit;\n        opacity: 1;\n\n        @apply --iron-image-placeholder;\n      }\n\n      #placeholder.faded-out {\n        transition: opacity 0.5s linear;\n        opacity: 0;\n      }\n    </style>\n\n    <a id="baseURIAnchor" href="#"></a>\n    <div id="sizedImgDiv" role="img" hidden$="[[_computeImgDivHidden(sizing)]]" aria-hidden$="[[_computeImgDivARIAHidden(alt)]]" aria-label$="[[_computeImgDivARIALabel(alt, src)]]"></div>\n    <img id="img" alt$="[[alt]]" hidden$="[[_computeImgHidden(sizing)]]" crossorigin$="[[crossorigin]]" on-load="_imgOnLoad" on-error="_imgOnError">\n    <div id="placeholder" hidden$="[[_computePlaceholderHidden(preload, fade, loading, loaded)]]" class$="[[_computePlaceholderClassName(preload, fade, loading, loaded)]]"></div>\n',
      ],
      [
         '\n    <style>\n      :host {\n        display: inline-block;\n        overflow: hidden;\n        position: relative;\n      }\n\n      #baseURIAnchor {\n        display: none;\n      }\n\n      #sizedImgDiv {\n        position: absolute;\n        top: 0px;\n        right: 0px;\n        bottom: 0px;\n        left: 0px;\n\n        display: none;\n      }\n\n      #img {\n        display: block;\n        width: var(--iron-image-width, auto);\n        height: var(--iron-image-height, auto);\n      }\n\n      :host([sizing]) #sizedImgDiv {\n        display: block;\n      }\n\n      :host([sizing]) #img {\n        display: none;\n      }\n\n      #placeholder {\n        position: absolute;\n        top: 0px;\n        right: 0px;\n        bottom: 0px;\n        left: 0px;\n\n        background-color: inherit;\n        opacity: 1;\n\n        @apply --iron-image-placeholder;\n      }\n\n      #placeholder.faded-out {\n        transition: opacity 0.5s linear;\n        opacity: 0;\n      }\n    </style>\n\n    <a id="baseURIAnchor" href="#"></a>\n    <div id="sizedImgDiv" role="img" hidden\\$="[[_computeImgDivHidden(sizing)]]" aria-hidden\\$="[[_computeImgDivARIAHidden(alt)]]" aria-label\\$="[[_computeImgDivARIALabel(alt, src)]]"></div>\n    <img id="img" alt\\$="[[alt]]" hidden\\$="[[_computeImgHidden(sizing)]]" crossorigin\\$="[[crossorigin]]" on-load="_imgOnLoad" on-error="_imgOnError">\n    <div id="placeholder" hidden\\$="[[_computePlaceholderHidden(preload, fade, loading, loaded)]]" class\\$="[[_computePlaceholderClassName(preload, fade, loading, loaded)]]"></div>\n',
      ]
   );
   N({
      _template: G(Ak),
      is: "iron-image",
      properties: {
         src: { type: String, value: "" },
         alt: { type: String, value: null },
         crossorigin: { type: String, value: null },
         preventLoad: { type: Boolean, value: !1 },
         sizing: { type: String, value: null, reflectToAttribute: !0 },
         position: { type: String, value: "center" },
         preload: { type: Boolean, value: !1 },
         placeholder: {
            type: String,
            value: null,
            observer: "_placeholderChanged",
         },
         fade: { type: Boolean, value: !1 },
         loaded: { notify: !0, readOnly: !0, type: Boolean, value: !1 },
         loading: { notify: !0, readOnly: !0, type: Boolean, value: !1 },
         error: { notify: !0, readOnly: !0, type: Boolean, value: !1 },
         width: { observer: "_widthChanged", type: Number, value: null },
         height: { observer: "_heightChanged", type: Number, value: null },
      },
      observers: [
         "_transformChanged(sizing, position)",
         "_loadStateObserver(src, preventLoad)",
      ],
      created: function () {
         this.g = "";
      },
      _imgOnLoad: function () {
         this.$.img.src === this._resolveSrc(this.src) &&
            (this._setLoading(!1), this._setLoaded(!0), this._setError(!1));
      },
      _imgOnError: function () {
         this.$.img.src === this._resolveSrc(this.src) &&
            (this.$.img.removeAttribute("src"),
            (this.$.sizedImgDiv.style.backgroundImage = ""),
            this._setLoading(!1),
            this._setLoaded(!1),
            this._setError(!0));
      },
      _computePlaceholderHidden: function () {
         return !this.preload || (!this.fade && !this.loading && this.loaded);
      },
      _computePlaceholderClassName: function () {
         return this.preload && this.fade && !this.loading && this.loaded
            ? "faded-out"
            : "";
      },
      _computeImgDivHidden: function () {
         return !this.sizing;
      },
      _computeImgDivARIAHidden: function () {
         return "" === this.alt ? "true" : void 0;
      },
      _computeImgDivARIALabel: function () {
         return null !== this.alt
            ? this.alt
            : "" === this.src
            ? ""
            : this._resolveSrc(this.src)
                 .replace(/[?|#].*/g, "")
                 .split("/")
                 .pop();
      },
      _computeImgHidden: function () {
         return !!this.sizing;
      },
      _widthChanged: function () {
         this.style.width = isNaN(this.width) ? this.width : this.width + "px";
      },
      _heightChanged: function () {
         this.style.height = isNaN(this.height)
            ? this.height
            : this.height + "px";
      },
      _loadStateObserver: function (a, b) {
         var c = this._resolveSrc(a);
         c !== this.g &&
            ((this.g = ""),
            this.$.img.removeAttribute("src"),
            (this.$.sizedImgDiv.style.backgroundImage = ""),
            "" === a || b
               ? this._setLoading(!1)
               : ((this.g = c),
                 (this.$.img.src = this.g),
                 (this.$.sizedImgDiv.style.backgroundImage =
                    'url("' + this.g + '")'),
                 this._setLoading(!0)),
            this._setLoaded(!1),
            this._setError(!1));
      },
      _placeholderChanged: function () {
         this.$.placeholder.style.backgroundImage = this.placeholder
            ? 'url("' + this.placeholder + '")'
            : "";
      },
      _transformChanged: function () {
         var a = this.$.sizedImgDiv.style,
            b = this.$.placeholder.style;
         a.backgroundSize = b.backgroundSize = this.sizing;
         a.backgroundPosition = b.backgroundPosition = this.sizing
            ? this.position
            : "";
         a.backgroundRepeat = b.backgroundRepeat = this.sizing
            ? "no-repeat"
            : "";
      },
      _resolveSrc: function (a) {
         a = Wa(a, this.$.baseURIAnchor.href);
         2 <= a.length &&
            "/" === a[0] &&
            "/" !== a[1] &&
            (a =
               (location.origin || location.protocol + "//" + location.host) +
               a);
         return a;
      },
   });
   var Bk = x([
         '<dom-module id="paper-material-styles">\n  <template>\n    <style>\n      :host, html {\n        --paper-material: {\n          display: block;\n          position: relative;\n        };\n        --paper-material-elevation-1: {\n          @apply --shadow-elevation-2dp;\n        };\n        --paper-material-elevation-2: {\n          @apply --shadow-elevation-4dp;\n        };\n        --paper-material-elevation-3: {\n          @apply --shadow-elevation-6dp;\n        };\n        --paper-material-elevation-4: {\n          @apply --shadow-elevation-8dp;\n        };\n        --paper-material-elevation-5: {\n          @apply --shadow-elevation-16dp;\n        };\n      }\n      :host(.paper-material), .paper-material {\n        @apply --paper-material;\n      }\n      :host(.paper-material[elevation="1"]), .paper-material[elevation="1"] {\n        @apply --paper-material-elevation-1;\n      }\n      :host(.paper-material[elevation="2"]), .paper-material[elevation="2"] {\n        @apply --paper-material-elevation-2;\n      }\n      :host(.paper-material[elevation="3"]), .paper-material[elevation="3"] {\n        @apply --paper-material-elevation-3;\n      }\n      :host(.paper-material[elevation="4"]), .paper-material[elevation="4"] {\n        @apply --paper-material-elevation-4;\n      }\n      :host(.paper-material[elevation="5"]), .paper-material[elevation="5"] {\n        @apply --paper-material-elevation-5;\n      }\n    </style>\n  </template>\n</dom-module>',
      ]),
      Ck = G(Bk);
   Ck.setAttribute("style", "display: none;");
   document.head.appendChild(Ck.content);
   var Dk = x([
      '\n    <style include="paper-material-styles">\n      :host {\n        display: inline-block;\n        position: relative;\n        box-sizing: border-box;\n        background-color: var(--paper-card-background-color, var(--primary-background-color));\n        border-radius: 2px;\n\n        @apply --paper-font-common-base;\n        @apply --paper-card;\n      }\n\n      /* IE 10 support for HTML5 hidden attr */\n      :host([hidden]), [hidden] {\n        display: none !important;\n      }\n\n      .header {\n        position: relative;\n        border-top-left-radius: inherit;\n        border-top-right-radius: inherit;\n        overflow: hidden;\n\n        @apply --paper-card-header;\n      }\n\n      .header iron-image {\n        display: block;\n        width: 100%;\n        --iron-image-width: 100%;\n        pointer-events: none;\n\n        @apply --paper-card-header-image;\n      }\n\n      .header .title-text {\n        padding: 16px;\n        font-size: 24px;\n        font-weight: 400;\n        color: var(--paper-card-header-color, #000);\n\n        @apply --paper-card-header-text;\n      }\n\n      .header .title-text.over-image {\n        position: absolute;\n        bottom: 0px;\n\n        @apply --paper-card-header-image-text;\n      }\n\n      :host ::slotted(.card-content) {\n        padding: 16px;\n        position:relative;\n\n        @apply --paper-card-content;\n      }\n\n      :host ::slotted(.card-actions) {\n        border-top: 1px solid #e8e8e8;\n        padding: 5px 16px;\n        position:relative;\n\n        @apply --paper-card-actions;\n      }\n\n      :host([elevation="1"]) {\n        @apply --paper-material-elevation-1;\n      }\n\n      :host([elevation="2"]) {\n        @apply --paper-material-elevation-2;\n      }\n\n      :host([elevation="3"]) {\n        @apply --paper-material-elevation-3;\n      }\n\n      :host([elevation="4"]) {\n        @apply --paper-material-elevation-4;\n      }\n\n      :host([elevation="5"]) {\n        @apply --paper-material-elevation-5;\n      }\n    </style>\n\n    <div class="header">\n      <iron-image hidden$="[[!image]]" aria-hidden$="[[_isHidden(image)]]" src="[[image]]" alt="[[alt]]" placeholder="[[placeholderImage]]" preload="[[preloadImage]]" fade="[[fadeImage]]"></iron-image>\n      <div hidden$="[[!heading]]" class$="title-text [[_computeHeadingClass(image)]]">[[heading]]</div>\n    </div>\n\n    <slot></slot>\n',
   ]);
   N({
      _template: G(Dk),
      is: "paper-card",
      properties: {
         heading: { type: String, value: "", observer: "_headingChanged" },
         image: { type: String, value: "" },
         alt: { type: String },
         preloadImage: { type: Boolean, value: !1 },
         fadeImage: { type: Boolean, value: !1 },
         placeholderImage: { type: String, value: null },
         elevation: { type: Number, value: 1, reflectToAttribute: !0 },
         animatedShadow: { type: Boolean, value: !1 },
         animated: {
            type: Boolean,
            reflectToAttribute: !0,
            readOnly: !0,
            computed: "_computeAnimated(animatedShadow)",
         },
      },
      _isHidden: function (a) {
         return a ? "false" : "true";
      },
      _headingChanged: function (a) {
         var b = this.getAttribute("heading"),
            c = this.getAttribute("aria-label");
         ("string" === typeof c && c !== b) ||
            this.setAttribute("aria-label", a);
      },
      _computeHeadingClass: function (a) {
         return a ? " over-image" : "";
      },
      _computeAnimated: function (a) {
         return a;
      },
   });
   function Y() {
      return H.apply(this, arguments) || this;
   }
   A(Y, H);
   Y.prototype.srcChanged_ = function (a, b) {
      (b && a.ma() == b.ma()) || this._setIframeSrc(a);
   };
   Y.prototype.onReloadButtonClick_ = function () {
      this.reload();
   };
   Y.prototype.getMsg_ = function (a) {
      return V(a);
   };
   Y.prototype.reload = function () {
      Lh(this.$.iframe);
   };
   t.Object.defineProperties(Y, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview-iframe-card";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return yk;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               src: { type: Object, observer: Y.prototype.srcChanged_ },
               iframeSrc: { type: Object, readOnly: !0 },
               size: Object,
               label: String,
            };
         },
      },
   });
   Y.prototype._setIframeSrc = function () {};
   customElements.define(Y.is, Y);
   var Ek, Fk;
   if (void 0 === Ek) {
      var Gk = document.createElement("template");
      Gk.innerHTML =
         '<style>\n  /* TODO(sklobovskaya): The multi feeds and sizes views\' CSS is identical (as is most of the\n   * logic). Consider introducing some code sharing, e.g., shared CSS or base class. */\n  .iframe-cards-container {\n    padding: 12px;\n    @apply --layout-horizontal;\n    flex-wrap: wrap;\n  }\n\n  tf-creative-preview-iframe-card {\n    display: inline-block;\n    margin: 12px;\n  }\n\n  .no-previews-message {\n    /* The message will be an additional 24px from the top because of the padding of the\n     * .iframe-cards-container, which will be empty but not hidden. */\n    margin-top: 64px;\n    padding: var(--tf-creative-preview-padding);\n    width: 100%;\n    box-sizing: border-box;\n    text-align: center;\n    color: var(--paper-grey-500);\n    @apply --layout-vertical;\n    @apply --layout-center;\n  }\n\n  .no-previews-message iron-icon {\n    --iron-icon-width: 48px;\n    --iron-icon-height: 48px;\n  }\n</style>\n\n<div class="iframe-cards-container">\n  \n  <tf-creative-preview-repeat items="[[cardItems_]]" observe="feed,size">\n    <template>\n      <tf-creative-preview-iframe-card src="[[getIframeSrc(previewPath, item.feed, active)]]" label="[[getLabel_(item.feed)]]" size="[[parseSize_(item.size)]]">\n      </tf-creative-preview-iframe-card>\n    </template>\n  </tf-creative-preview-repeat>\n</div>\n\n<dom-if if="[[!cardItems_.length]]">\n  <template>\n    <div class="no-previews-message">\n      <iron-icon icon="icons:view-quilt"></iron-icon>\n      [[getMsg_(\'NO_SAMPLE_DATA_TO_PREVIEW\')]]\n    </div>\n  </template>\n</dom-if>\n';
      Ek = Gk;
   }
   Fk = Ek;
   function Hk(a, b) {
      for (var c = y(this.fb), d = c.next(); !d.done; d = c.next())
         d.value.forwardHostProp(a, b);
   }
   function Ik() {
      var a = H.call(this) || this;
      a.fb = [];
      a.kf = null;
      a.jf = null;
      return a;
   }
   A(Ik, H);
   m = Ik.prototype;
   m.connectedCallback = function () {
      H.prototype.connectedCallback.call(this);
      this.style.display = "none";
   };
   m.itemsChanged_ = function () {
      this.renderWhenReady_();
   };
   m.renderWhenReady_ = function () {
      var a = this;
      if (0 == this.children.length) {
         var b = new MutationObserver(function () {
            if (a.querySelector("template"))
               b.disconnect(), a.debounceRender_();
            else
               throw Error("tf-creative-preview-repeat requires a <template>.");
         });
         b.observe(this, { childList: !0 });
      } else this.debounceRender_();
   };
   m.debounceRender_ = function () {
      this.jf = rd(this.jf, Db, this.render_.bind(this));
      qd.add(this.jf);
   };
   m.render_ = function () {
      var a = this;
      this.ensureTemplateCtor_();
      for (var b = 0; b < this.items.length || b < this.fb.length; ) {
         var c = this.items[b],
            d = this.fb[b],
            e = void 0;
         if (b < this.items.length && b < this.fb.length) {
            var f = this.getItemHash_(c),
               g = d.get(this.as);
            g = this.getItemHash_(g);
            g == f
               ? (this.updateInstance_(d, c), b++)
               : ((e =
                    e ||
                    new Set(
                       this.items.map(function (h) {
                          return a.getItemHash_(h);
                       })
                    )),
                 e.has(g)
                    ? (this.insertInstance_(c, b), b++)
                    : this.removeInstance_(b));
         } else
            b >= this.fb.length
               ? (this.insertInstance_(c, b), b++)
               : this.removeInstance_(b);
      }
   };
   m.ensureTemplateCtor_ = function () {
      if (!this.kf) {
         var a = this.querySelector("template");
         this.kf = te(a, this, { parentModel: !0, forwardHostProp: Hk });
      }
   };
   m.updateInstance_ = function (a, b) {
      a._setPendingProperty(this.as, b);
      a._flushProperties();
   };
   m.insertInstance_ = function (a, b) {
      var c = new this.kf();
      this.updateInstance_(c, a);
      a = this.fb[b];
      this.parentElement.insertBefore(c.root, a ? a.children[0] : this);
      this.fb.splice(b, 0, c);
   };
   m.removeInstance_ = function (a) {
      for (var b = y(this.fb[a].children), c = b.next(); !c.done; c = b.next())
         this.parentElement.removeChild(c.value);
      this.fb.splice(a, 1);
   };
   m.getItemHash_ = function (a) {
      if (!this.observe) return "";
      for (
         var b = {}, c = y(this.observe.split(",")), d = c.next();
         !d.done;
         d = c.next()
      )
         (d = d.value) && (b[d] = a[d]);
      return JSON.stringify(b);
   };
   t.Object.defineProperties(Ik, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview-repeat";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return null;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               items: Array,
               as: { type: String, value: "item" },
               observe: { type: String, value: "" },
            };
         },
      },
      observers: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return ["itemsChanged_(items.*)"];
         },
      },
   });
   customElements.define(Ik.is, Ik);
   function Jk() {
      return W.apply(this, arguments) || this;
   }
   A(Jk, W);
   m = Jk.prototype;
   m.computeCardItems_ = function (a, b) {
      a = void 0 === a ? "" : a;
      b = void 0 === b ? [] : b;
      return b.map(function (c) {
         return { feed: c, size: a };
      });
   };
   m.getMsg_ = function (a) {
      return V(a);
   };
   m.getLabel_ = function (a) {
      return a || V("NO_SAMPLE_DATA");
   };
   m.parseSize_ = function (a) {
      return T(a);
   };
   m.getCards = function () {
      return this.root.querySelectorAll("tf-creative-preview-iframe-card");
   };
   m.reload = function () {
      for (var a = y(this.getCards()), b = a.next(); !b.done; b = a.next())
         b.value.reload();
   };
   t.Object.defineProperties(Jk, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview-multiple-feeds";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return Fk;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               feeds: Array,
               cardItems_: {
                  type: Array,
                  value: function () {
                     return [];
                  },
                  computed: "computeCardItems_(size, feeds, feeds.*)",
                  readOnly: !0,
               },
               size: String,
            };
         },
      },
   });
   Jk.prototype._setCardItems_ = function () {};
   customElements.define(Jk.is, Jk);
   var Kk, Lk;
   if (void 0 === Kk) {
      var Mk = document.createElement("template");
      Mk.innerHTML =
         '<style>\n  .iframe-cards-container {\n    padding: 12px;\n    @apply --layout-horizontal;\n    flex-wrap: wrap;\n  }\n\n  tf-creative-preview-iframe-card {\n    display: inline-block;\n    margin: 12px;\n  }\n\n  .no-previews-message {\n    /* The message will be an additional 24px from the top because of the padding of the\n     * .iframe-cards-container, which will be empty but not hidden. */\n    margin-top: 64px;\n    padding: var(--tf-creative-preview-padding);\n    width: 100%;\n    box-sizing: border-box;\n    text-align: center;\n    color: var(--paper-grey-500);\n    @apply --layout-vertical;\n    @apply --layout-center;\n  }\n\n  .no-previews-message iron-icon {\n    --iron-icon-width: 48px;\n    --iron-icon-height: 48px;\n  }\n</style>\n\n<div class="iframe-cards-container">\n  \n  <tf-creative-preview-repeat items="[[parsedSizes_]]" as="size" observe="width,height">\n    <template>\n      <tf-creative-preview-iframe-card src="[[getIframeSrc(previewPath, feed, active)]]" label="[[getLabel_(size)]]" size="[[size]]">\n      </tf-creative-preview-iframe-card>\n    </template>\n  </tf-creative-preview-repeat>\n</div>\n\n<dom-if if="[[!parsedSizes_.length]]">\n  <template>\n    <div class="no-previews-message">\n      <iron-icon icon="icons:view-quilt"></iron-icon>\n      [[getMsg_(\'NO_SIZES_TO_PREVIEW\')]]\n    </div>\n  </template>\n</dom-if>\n';
      Kk = Mk;
   }
   Lk = Kk;
   function Nk() {
      return W.apply(this, arguments) || this;
   }
   A(Nk, W);
   m = Nk.prototype;
   m.computeParsedSizes_ = function () {
      var a = this.sizes.map(T);
      a.sort(function (b, c) {
         return b.height == c.height ? b.width - c.width : b.height - c.height;
      });
      return a;
   };
   m.getMsg_ = function (a) {
      return V(a);
   };
   m.getLabel_ = function (a) {
      return a.width + " x " + a.height;
   };
   m.getCards = function () {
      return this.root.querySelectorAll("tf-creative-preview-iframe-card");
   };
   m.reload = function () {
      for (var a = y(this.getCards()), b = a.next(); !b.done; b = a.next())
         b.value.reload();
   };
   t.Object.defineProperties(Nk, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview-multiple-sizes";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return Lk;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               sizes: Array,
               parsedSizes_: {
                  type: Array,
                  value: function () {
                     return [];
                  },
                  computed: "computeParsedSizes_(sizes, sizes.*)",
                  readOnly: !0,
               },
               feed: String,
            };
         },
      },
   });
   Nk.prototype._setParsedSizes_ = function () {};
   customElements.define(Nk.is, Nk);
   var Ok, Pk;
   if (void 0 === Ok) {
      var Qk = document.createElement("template");
      Qk.innerHTML =
         '<style>\n  :host {\n    display: block;\n    padding: var(--tf-creative-preview-stage-padding);\n\n    /* These values must be kept in sync with the corresponding constants in\n     * tf-creative-preview-parallax.js. */\n    --tf-creative-preview-dummy-text-size: 8px;\n    --tf-creative-preview-dummy-text-line-height: 20px;\n    --tf-creative-preview-dummy-body-padding: 32px;\n  }\n\n  :host([responsive]) {\n    /* For consistency with the Single size view, don\'t add padding on the sides with the resize\n     * handles. */\n    padding-right: 0;\n    padding-bottom: 0;\n  }\n\n  .dummy-window {\n    overflow: auto;\n    background: #fff;\n  }\n\n  .dummy-window::-webkit-scrollbar {\n    width: 16px;\n    height: 16px;\n  }\n\n  .dummy-window::-webkit-scrollbar-track {\n    background-color: transparent;\n  }\n\n  .dummy-window::-webkit-scrollbar-thumb {\n    background-clip: content-box;\n    background-color: var(--paper-grey-300);\n    border: 4px solid transparent;\n    border-radius: 8px;\n  }\n\n  .dummy-body {\n    width: 100%;\n    padding: var(--tf-creative-preview-dummy-body-padding);\n    background: #fff;\n    box-sizing: border-box;\n    @apply --layout-vertical;\n  }\n\n  .dummy-text {\n    background-image: linear-gradient(\n        to bottom,\n        var(--paper-grey-100) var(--tf-creative-preview-dummy-text-size),\n        transparent var(--tf-creative-preview-dummy-text-size));\n    background-repeat: repeat-y;\n    background-size: 100% var(--tf-creative-preview-dummy-text-line-height);\n  }\n\n  iframe {\n    border: none;\n    background: #fff;\n    margin: 24px auto;\n  }\n\n  .fullscreen iframe {\n    margin: calc(-1 * var(--tf-creative-preview-dummy-body-padding));\n  }\n\n  .fullscreen .dummy-text {\n    display: none;\n  }\n</style>\n\n<tf-creative-preview-resizable-container id="deviceFrame" size="{{parsedDeviceSize_}}" resizable="[[responsive]]" min="[[minSize_]]" max="[[maxSize_]]">\n  <div id="dummyWindow" class="dummy-window" style$="[[computeDeviceViewportStyle_(parsedDeviceSize_)]]" slot="content" on-scroll="onScroll_">\n    <div class="dummy-body">\n      <div class="dummy-text" style$="[[computePlaceholderTextStyle_(parsedDeviceSize_.height)]]">\n      </div>\n      <iframe id="iframe" allowfullscreen="" src$="[[getIframeSrc(previewPath, feed, active)]]" scrolling="no" width$="[[parsedSize_.width]]" height$="[[parsedSize_.height]]" on-load="onIframeLoad_">\n      </iframe>\n      <div class="dummy-text" style$="[[computePlaceholderTextStyle_(parsedDeviceSize_.height)]]">\n      </div>\n    </div>\n  </div>\n</tf-creative-preview-resizable-container>\n';
      Ok = Qk;
   }
   Pk = Ok;
   function Rk() {
      return W.apply(this, arguments) || this;
   }
   A(Rk, W);
   m = Rk.prototype;
   m.ready = function () {
      this.ef = !1;
      this.xg = null;
      W.prototype.ready.call(this);
   };
   m.computeParsedSize_ = function (a) {
      return T(a);
   };
   m.computeDeviceViewportStyle_ = function (a) {
      return Wg({ width: a.width + "px", height: a.height + "px" });
   };
   m.computePlaceholderTextStyle_ = function (a) {
      a -= 32;
      return Wg({
         height: (0 >= a ? 0 : 20 * Math.ceil((a - 8) / 20) + 8) + "px",
      });
   };
   m.deviceSizeChanged_ = function (a) {
      this.parsedDeviceSize_ = T(a);
   };
   m.parsedDeviceSizeChanged_ = function (a) {
      this.deviceSize = U(a);
   };
   m.deviceHeightChanged_ = function () {
      this.$.dummyWindow.classList.contains("fullscreen")
         ? ((this.$.iframe.width = this.parsedDeviceSize_.width),
           (this.$.iframe.height = this.parsedDeviceSize_.height))
         : this.scheduleForwardScroll_();
   };
   m.onIframeLoad_ = function () {
      var a = this;
      this.ef = !1;
      var b = this.$.iframe.contentDocument;
      if (b) {
         var c = this.$.dummyWindow,
            d = b.querySelector("GWD-PARALLAX, GWD-SWIRL");
         d && d.gwdIsLoaded && d.gwdIsLoaded()
            ? this.centerAdSlotAndListenForFullscreenEvents_(b, c)
            : b.body.addEventListener(
                 "ready",
                 function (e) {
                    ("GWD-PARALLAX" != e.target.nodeName &&
                       "GWD-SWIRL" != e.target.nodeName) ||
                       a.centerAdSlotAndListenForFullscreenEvents_(b, c);
                 },
                 !1
              );
      }
   };
   m.centerAdSlotAndListenForFullscreenEvents_ = function (a, b) {
      b.scrollTop = (b.scrollHeight - b.clientHeight) / 2;
      this.scheduleForwardScroll_();
      this.initializeFullscreenListeners_(a, b);
   };
   m.onScroll_ = function () {
      this.scheduleForwardScroll_();
   };
   m.scheduleForwardScroll_ = function () {
      this.xg = rd(this.xg, Cb, this.forwardScroll_.bind(this));
   };
   m.forwardScroll_ = function () {
      var a = this.getIframeWindow();
      if (a) {
         var b = this.$.dummyWindow.scrollTop,
            c = this.$.iframe.getBoundingClientRect(),
            d = this.$.dummyWindow.getBoundingClientRect();
         b = JSON.stringify({
            eventType: "hostpageScroll",
            creativeFrameTop: c.top - d.top,
            creativeFrameLeft: c.left - d.left,
            hostpageScrollY: b,
            hostpageScrollX: 0,
            windowHeight: d.height,
            windowWidth: d.width,
            creativeFramePercentY:
               1 - (c.bottom - d.top) / (d.height + c.height),
            creativeFramePercentX: 0,
         });
         a.postMessage(b, "*");
      }
   };
   m.getIframeWindow = function () {
      return this.$.iframe.contentWindow || null;
   };
   m.reload = function () {
      Lh(this.$.iframe);
   };
   m.initializeFullscreenListeners_ = function (a, b) {
      var c = this;
      if (!this.ef && (a = a.getElementById("gwd-ad"))) {
         var d = 0;
         a.addEventListener(
            "expandfinish",
            function () {
               d = b.scrollTop;
               c.$.iframe.style.display = "none";
               c.$.iframe.width = c.parsedDeviceSize_.width;
               c.$.iframe.height = c.parsedDeviceSize_.height;
               b.classList.add("fullscreen");
               setTimeout(function () {
                  c.$.iframe.style.removeProperty("display");
               });
            },
            !1
         );
         a.addEventListener(
            "collapsefinish",
            function () {
               b.classList.remove("fullscreen");
               c.$.iframe.width = c.parsedSize_.width;
               c.$.iframe.height = c.parsedSize_.height;
               b.scrollTop = d;
            },
            !1
         );
         this.ef = !0;
      }
   };
   t.Object.defineProperties(Rk, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview-parallax";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return Pk;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               size: String,
               parsedSize_: {
                  type: Object,
                  computed: "computeParsedSize_(size)",
                  readOnly: !0,
               },
               deviceSize: {
                  type: String,
                  notify: !0,
                  observer: Rk.prototype.deviceSizeChanged_,
               },
               parsedDeviceSize_: {
                  type: Object,
                  observer: Rk.prototype.parsedDeviceSizeChanged_,
               },
               feed: String,
               responsive: { type: Boolean, reflectToAttribute: !0 },
            };
         },
      },
      observers: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return ["deviceHeightChanged_(parsedDeviceSize_.height)"];
         },
      },
   });
   Rk.prototype._setParsedSize_ = function () {};
   customElements.define(Rk.is, Rk);
   var Sk, Tk;
   if (void 0 === Sk) {
      var Uk = document.createElement("template");
      Uk.innerHTML =
         '<style>\n  :host {\n    display: block;\n    position: relative;\n\n    /* Margin around the viewport to offset the stage when the preview is resizable. This is 2px\n     * less than padding applied in tf-creative-preview because the additional 2px are added on the\n     * stage to avoid cropping the viewport shadow. */\n    --tf-creative-preview-viewport-responsive-padding: 22px;\n  }\n\n  /* A container used to allow or hide scroll overflow in stage. */\n  :host([responsive]) .scroll-overflow {\n    width: 100%;\n    height: 100%;\n  }\n\n  #stage {\n    padding: var(--tf-creative-preview-stage-padding);\n    z-index: 0;\n    overflow: auto;\n    @apply --layout;\n  }\n\n  :host([responsive]) #stage {\n    padding: var(--tf-creative-preview-viewport-responsive-padding) 0\n        0 var(--tf-creative-preview-viewport-responsive-padding);\n    height: 100%;\n    width: 100%;\n    display: block;\n    position: absolute;\n    box-sizing: border-box;\n  }\n\n  :host([responsive]) #stage .scroll-overflow {\n    overflow: auto;\n    /* Add a small padding so the scrollable container boundaries do not crop the viewport\n     * shadow entirely when scroll is at (0,0). */\n    padding: 2px 0 0 2px;\n    box-sizing: border-box;\n  }\n\n  iframe {\n    border: none;\n    background: #fff;\n  }\n</style>\n\n<div id="stage">\n  <div class="scroll-overflow">\n    <div id="stage-scroll-content">\n      <tf-creative-preview-resizable-container id="resizable-container" size="{{parsedSize_}}" resizable="[[responsive]]" min="[[minSize_]]" max="[[maxSize_]]">\n        <iframe id="iframe" allowfullscreen="" src$="[[getIframeSrc(previewPath, feed, active)]]" slot="content" scrolling="no" width$="[[parsedSize_.width]]" height$="[[parsedSize_.height]]">\n        </iframe>\n      </tf-creative-preview-resizable-container>\n    </div>\n  </div>\n</div>\n';
      Sk = Uk;
   }
   Tk = Sk;
   function Z() {
      return W.apply(this, arguments) || this;
   }
   A(Z, W);
   Z.prototype.ready = function () {
      W.prototype.ready.call(this);
   };
   Z.prototype.parsedSizeChanged_ = function (a) {
      this.size = U(a);
   };
   Z.prototype.sizeChanged_ = function (a) {
      this.parsedSize_ = T(a);
   };
   Z.prototype.reload = function () {
      Lh(this.$.iframe);
   };
   t.Object.defineProperties(Z, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview-single";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return Tk;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               size: {
                  type: String,
                  notify: !0,
                  observer: Z.prototype.sizeChanged_,
               },
               parsedSize_: {
                  type: Object,
                  observer: Z.prototype.parsedSizeChanged_,
               },
               feed: String,
               responsive: { type: Boolean, reflectToAttribute: !0 },
            };
         },
      },
   });
   customElements.define(Z.is, Z);
   function Vk() {
      return H.apply(this, arguments) || this;
   }
   A(Vk, H);
   m = Vk.prototype;
   m.ready = function () {
      this.yg = null;
      H.prototype.ready.call(this);
   };
   m.modeEnabled_ = function (a) {
      return this.modes.includes(a);
   };
   m.modeIs_ = function (a, b) {
      return a == b;
   };
   m.matchOrder_ = function (a, b) {
      b = void 0 === b ? [] : b;
      if (0 == b.length) return [];
      var c = new Set(b);
      return a.filter(function (d) {
         return c.has(d);
      });
   };
   m.onSettingChange_ = function () {
      var a = this;
      this.yg = rd(this.yg, Bb(10), function () {
         var b = new CustomEvent("setting-change", {
            bubbles: !0,
            composed: !0,
         });
         a.dispatchEvent(b);
      });
   };
   m.onReloadView_ = function () {
      var a = this.getCurrentView_();
      a && a.reload();
   };
   m.onControlsTrack_ = function (a) {
      a = a.detail.state;
      var b = this.$.stage;
      "start" == a
         ? b.style.setProperty("pointer-events", "none")
         : "end" == a && b.style.removeProperty("pointer-events");
   };
   m.onDropdownWillOpen_ = function () {
      this.$.stage.style.setProperty("pointer-events", "none");
   };
   m.onDropdownClosed_ = function () {
      this.$.stage.style.removeProperty("pointer-events");
   };
   m.getCurrentView_ = function () {
      return this.root.getElementById(this.mode + "-view") || null;
   };
   t.Object.defineProperties(Vk, {
      is: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return "tf-creative-preview";
         },
      },
      template: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return Sh;
         },
      },
      properties: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return {
               previewPath: String,
               modes: {
                  type: Array,
                  value: function () {
                     return [];
                  },
               },
               sizes: {
                  type: Array,
                  value: function () {
                     return [];
                  },
               },
               feeds: {
                  type: Array,
                  value: function () {
                     return [];
                  },
               },
               mode: String,
               modeSettings: Object,
            };
         },
      },
      observers: {
         configurable: !0,
         enumerable: !0,
         get: function () {
            return ["onSettingChange_(mode, modeSettings.*)"];
         },
      },
   });
   customElements.define(Vk.is, Vk);
   function Wk(a) {
      if (a instanceof za)
         if (a instanceof Aa) a = a.g;
         else throw Error("");
      else a = Og(a);
      return a;
   }
   function Xk(a) {
      this.bk = a;
   }
   function Yk(a) {
      return new Xk(function (b) {
         return b.substr(0, a.length + 1).toLowerCase() === a + ":";
      });
   }
   var Zk = [
      Yk("data"),
      Yk("http"),
      Yk("https"),
      Yk("mailto"),
      Yk("ftp"),
      new Xk(function (a) {
         return /^[^:]*([/?#]|$)/.test(a);
      }),
   ]; /*

 Copyright 2018 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
   function $k(a) {
      return a && a.mb ? a.ma() : a;
   }
   var al = {
      CONSTANT: {
         tb: function (a) {
            return a instanceof mg;
         },
         vb: pg,
      },
      JAVASCRIPT: {
         tb: function (a) {
            return a instanceof rg || !1;
         },
         vb: function (a) {
            a =
               a instanceof rg && a.constructor === rg
                  ? a.g
                  : "type_error:SafeScript";
            return a;
         },
      },
      HTML: {
         tb: function (a) {
            return a instanceof gh || !1;
         },
         vb: function (a) {
            return hh(a);
         },
      },
      RESOURCE_URL: {
         tb: function (a) {
            return a instanceof sg || !1;
         },
         vb: function (a) {
            return ug(a);
         },
      },
      STRING: {
         tb: function (a) {
            return a instanceof Object;
         },
         vb: $k,
      },
      STYLE: {
         tb: function (a) {
            return a instanceof Vg || !1;
         },
         vb: function (a) {
            a =
               a instanceof Vg && a.constructor === Vg
                  ? a.g
                  : "type_error:SafeStyle";
            return a;
         },
      },
      URL: {
         tb: function (a) {
            return a instanceof Mg || a instanceof za;
         },
         vb: Wk,
      },
   };
   function bl(a, b) {
      return b;
   }
   var cl = {
      CONSTANT: bl,
      JAVASCRIPT: bl,
      HTML: function (a) {
         if (a instanceof gh) var b = a;
         else {
            var c = "object" == typeof a;
            b = null;
            c && a.ff && (b = a.df());
            a = c && a.mb ? a.ma() : String(a);
            Lg.test(a) &&
               (-1 != a.indexOf("&") && (a = a.replace(Fg, "&amp;")),
               -1 != a.indexOf("<") && (a = a.replace(Gg, "&lt;")),
               -1 != a.indexOf(">") && (a = a.replace(Hg, "&gt;")),
               -1 != a.indexOf('"') && (a = a.replace(Ig, "&quot;")),
               -1 != a.indexOf("'") && (a = a.replace(Jg, "&#39;")),
               -1 != a.indexOf("\x00") && (a = a.replace(Kg, "&#0;")));
            a = (c = lg()) ? c.createHTML(a) : a;
            b = new gh(a, b, fh);
         }
         return hh(b);
      },
      RESOURCE_URL: bl,
      STRING: String,
      STYLE: bl,
      URL: function (a, b) {
         a: {
            var c = void 0 === c ? Zk : c;
            for (var d = 0; d < c.length; ++d) {
               var e = c[d];
               if (e instanceof Xk && e.bk(a)) {
                  a = new Aa(a, ya);
                  break a;
               }
            }
            a = void 0;
         }
         return void 0 === a ? b : a.toString();
      },
   };
   function dl(a, b) {
      throw Error(void 0 === b ? "unexpected value " + a + "!" : b);
   } /*

 Copyright 2017 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
   function el(a, b, c) {
      if (
         Object.hasOwnProperty.call(fl, a) &&
         ((a = fl[a]),
         Object.hasOwnProperty.call(a, b) && ((a = a[b]), a instanceof Array))
      ) {
         for (var d = null, e = !1, f = 0, g = a.length; f < g; ++f) {
            var h = a[f],
               k = h.fa;
            if (!k) return h.l;
            null === d && (d = {});
            k = Object.hasOwnProperty.call(d, k) ? d[k] : (d[k] = c(k));
            if (k === h.ga) return h.l;
            null == k && (e = !0);
         }
         if (e) return null;
      }
      b = gl[b];
      return "number" === typeof b ? b : null;
   }
   var gl = {
         align: 1,
         alt: 1,
         "aria-activedescendant": 10,
         "aria-atomic": 1,
         "aria-autocomplete": 1,
         "aria-busy": 1,
         "aria-checked": 1,
         "aria-controls": 10,
         "aria-disabled": 1,
         "aria-dropeffect": 1,
         "aria-expanded": 1,
         "aria-haspopup": 1,
         "aria-hidden": 1,
         "aria-invalid": 1,
         "aria-label": 1,
         "aria-labelledby": 10,
         "aria-level": 1,
         "aria-live": 1,
         "aria-multiline": 1,
         "aria-multiselectable": 1,
         "aria-orientation": 1,
         "aria-owns": 10,
         "aria-posinset": 1,
         "aria-pressed": 1,
         "aria-readonly": 1,
         "aria-relevant": 1,
         "aria-required": 1,
         "aria-selected": 1,
         "aria-setsize": 1,
         "aria-sort": 1,
         "aria-valuemax": 1,
         "aria-valuemin": 1,
         "aria-valuenow": 1,
         "aria-valuetext": 1,
         async: 8,
         autocapitalize: 1,
         autocomplete: 1,
         autocorrect: 1,
         autofocus: 1,
         autoplay: 1,
         bgcolor: 1,
         border: 1,
         cellpadding: 1,
         cellspacing: 1,
         checked: 1,
         cite: 3,
         class: 1,
         color: 1,
         cols: 1,
         colspan: 1,
         contenteditable: 1,
         controls: 1,
         datetime: 1,
         dir: 8,
         disabled: 1,
         download: 1,
         draggable: 1,
         enctype: 1,
         face: 1,
         for: 10,
         formenctype: 1,
         frameborder: 1,
         height: 1,
         hidden: 1,
         href: 4,
         hreflang: 1,
         id: 10,
         ismap: 1,
         itemid: 1,
         itemprop: 1,
         itemref: 1,
         itemscope: 1,
         itemtype: 1,
         label: 1,
         lang: 1,
         list: 10,
         loading: 8,
         loop: 1,
         max: 1,
         maxlength: 1,
         media: 1,
         min: 1,
         minlength: 1,
         multiple: 1,
         muted: 1,
         name: 10,
         nonce: 1,
         open: 1,
         placeholder: 1,
         poster: 3,
         preload: 1,
         rel: 1,
         required: 1,
         reversed: 1,
         role: 1,
         rows: 1,
         rowspan: 1,
         selected: 1,
         shape: 1,
         size: 1,
         sizes: 1,
         slot: 1,
         span: 1,
         spellcheck: 1,
         src: 4,
         srcset: 11,
         start: 1,
         step: 1,
         style: 5,
         summary: 1,
         tabindex: 1,
         target: 8,
         title: 1,
         translate: 1,
         type: 1,
         valign: 1,
         value: 1,
         width: 1,
         wrap: 1,
      },
      fl = {
         a: { href: [{ l: 3 }] },
         area: { href: [{ l: 3 }] },
         audio: { src: [{ l: 3 }] },
         button: { formaction: [{ l: 3 }], formmethod: [{ l: 1 }] },
         form: { action: [{ l: 3 }], method: [{ l: 1 }] },
         iframe: { srcdoc: [{ l: 2 }] },
         img: { src: [{ l: 3 }] },
         input: {
            accept: [{ l: 1 }],
            formaction: [{ l: 3 }],
            formmethod: [{ l: 1 }],
            pattern: [{ l: 1 }],
            readonly: [{ l: 1 }],
            src: [{ l: 3 }],
         },
         link: {
            href: [
               { l: 3, fa: "rel", ga: "alternate" },
               { l: 3, fa: "rel", ga: "author" },
               { l: 3, fa: "rel", ga: "bookmark" },
               { l: 3, fa: "rel", ga: "canonical" },
               { l: 3, fa: "rel", ga: "cite" },
               { l: 3, fa: "rel", ga: "help" },
               { l: 3, fa: "rel", ga: "icon" },
               { l: 3, fa: "rel", ga: "license" },
               { l: 3, fa: "rel", ga: "next" },
               { l: 3, fa: "rel", ga: "prefetch" },
               { l: 3, fa: "rel", ga: "dns-prefetch" },
               { l: 3, fa: "rel", ga: "prerender" },
               { l: 3, fa: "rel", ga: "preconnect" },
               { l: 3, fa: "rel", ga: "preload" },
               { l: 3, fa: "rel", ga: "prev" },
               { l: 3, fa: "rel", ga: "search" },
               { l: 3, fa: "rel", ga: "subresource" },
            ],
         },
         script: { defer: [{ l: 1 }] },
         source: { src: [{ l: 3 }] },
         textarea: { readonly: [{ l: 1 }] },
         video: { src: [{ l: 3 }] },
      },
      hl = {
         a: 1,
         abbr: 1,
         address: 1,
         applet: 4,
         area: 5,
         article: 1,
         aside: 1,
         audio: 1,
         b: 1,
         base: 4,
         bdi: 1,
         bdo: 1,
         blockquote: 1,
         body: 1,
         br: 5,
         button: 1,
         canvas: 1,
         caption: 1,
         center: 1,
         cite: 1,
         code: 1,
         col: 5,
         colgroup: 1,
         command: 1,
         data: 1,
         datalist: 1,
         dd: 1,
         del: 1,
         details: 1,
         dfn: 1,
         dialog: 1,
         div: 1,
         dl: 1,
         dt: 1,
         em: 1,
         embed: 4,
         fieldset: 1,
         figcaption: 1,
         figure: 1,
         font: 1,
         footer: 1,
         form: 1,
         frame: 1,
         frameset: 1,
         h1: 1,
         h2: 1,
         h3: 1,
         h4: 1,
         h5: 1,
         h6: 1,
         head: 1,
         header: 1,
         hr: 5,
         html: 1,
         i: 1,
         iframe: 1,
         img: 5,
         input: 5,
         ins: 1,
         kbd: 1,
         label: 1,
         legend: 1,
         lh: 1,
         li: 1,
         link: 5,
         main: 1,
         map: 1,
         mark: 1,
         math: 4,
         menu: 1,
         meta: 4,
         meter: 1,
         nav: 1,
         noscript: 1,
         object: 4,
         ol: 1,
         optgroup: 1,
         option: 1,
         output: 1,
         p: 1,
         param: 5,
         picture: 1,
         pre: 1,
         progress: 1,
         q: 1,
         rb: 1,
         rp: 1,
         rt: 1,
         rtc: 1,
         ruby: 1,
         s: 1,
         samp: 1,
         script: 3,
         section: 1,
         select: 1,
         slot: 1,
         small: 1,
         source: 5,
         span: 1,
         strong: 1,
         style: 2,
         sub: 1,
         summary: 1,
         sup: 1,
         svg: 4,
         table: 1,
         tbody: 1,
         td: 1,
         template: 4,
         textarea: 6,
         tfoot: 1,
         th: 1,
         thead: 1,
         time: 1,
         title: 6,
         tr: 1,
         track: 5,
         u: 1,
         ul: 1,
         var: 1,
         video: 1,
         wbr: 5,
      },
      il = [
         { auto: !0, ltr: !0, rtl: !0 },
         { async: !0 },
         { eager: !0, lazy: !0 },
         { _self: !0, _blank: !0 },
      ],
      jl = { "*": { async: 1, dir: 0, loading: 2, target: 3 } };
   function kl(a) {
      var b = ll;
      if (!b) {
         b = ml();
         var c = {};
         for (d in b) c[b[d]] = d;
         b = ll = c;
      }
      var d = b[a];
      return "string" === typeof d
         ? d
         : String(a)
              .replace(/([A-Z])/g, "-$1")
              .toLowerCase();
   }
   function nl(a) {
      a = String(a).toLowerCase();
      var b = ml()[a];
      return "string" === typeof b ? b : jh(a);
   }
   function ol(a) {
      a = a.toLowerCase();
      a = ml()[a];
      return "string" === typeof a ? a : null;
   }
   function ml() {
      if (!pl) {
         for (
            var a = Object.assign({}, ql), b = y(rl), c = b.next();
            !c.done;
            c = b.next()
         )
            (c = c.value), (a[c.toLowerCase()] = c);
         pl = a;
      }
      return pl;
   }
   var rl =
         "aLink accessKey allowFullscreen bgColor cellPadding cellSpacing codeBase codeType contentEditable crossOrigin dateTime dirName formAction formEnctype formMethod formNoValidate formTarget frameBorder innerHTML innerText inputMode isMap longDesc marginHeight marginWidth maxLength mediaGroup minLength noHref noResize noShade noValidate noWrap nodeValue outerHTML outerText readOnly tabIndex textContent trueSpeed useMap vAlign vLink valueAsDate valueAsNumber valueType".split(
            " "
         ),
      ql = {
         accept_charset: "acceptCharset",
         char: "ch",
         charoff: "chOff",
         checked: "defaultChecked",
         class: "className",
         for: "htmlFor",
         http_equiv: "httpEquiv",
         muted: "defaultMuted",
         selected: "defaultSelected",
         value: "defaultValue",
      },
      pl = null,
      ll = null; /*

 Copyright 2017 Google LLC
 SPDX-License-Identifier: BSD-3-Clause

*/
   var sl = {},
      tl = RegExp(
         "^(?!(?:annotation-xml|color-profile|font-face|font-face(?:-(?:src|uri|format|name))?|missing-glyph)$)[a-z][a-z.0-9_\u00b7\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u037d\u200c\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\udfff\uf900-\ufdcf\ufdf0-\ufffd]*-[\\-a-z.0-9_\u00b7\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u037d\u200c\u200d\u203f-\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\udfff\uf900-\ufdcf\ufdf0-\ufffd]*$"
      );
   function ul(a, b) {
      var c = window.customElements;
      return (c && c.get(a)) || !0 === sl[a]
         ? 2
         : "HTMLUnknownElement" === b.name
         ? 1
         : "HTMLElement" === b.name && tl.test(a)
         ? 3
         : 0;
   } /*

 Copyright 2020 Google LLC
 SPDX-License-Identifier: BSD-3-Clause
*/
   function vl(a, b) {
      var c, d;
      switch (b) {
         case "innerHTML":
            return 1 === wl(a) ? 2 : null;
         case "textContent":
            return (a = wl(a)), 1 === a || 6 === a ? 1 : null;
         default:
            return null !==
               (d =
                  null === (c = xl[a.localName]) || void 0 === c
                     ? void 0
                     : c[b]) && void 0 !== d
               ? d
               : null;
      }
   }
   function wl(a) {
      var b = a.localName,
         c = ul(b, a.constructor);
      switch (c) {
         case 0:
         case 1:
            return yl(b, a);
         case 3:
         case 2:
            return 1;
         default:
            dl(c, "got an unknown element classification");
      }
   }
   function yl(a, b) {
      var c = Object.hasOwnProperty.call(hl, a) ? hl[a] : null;
      return null !== c
         ? c
         : Object.hasOwnProperty.call(zl, a) && b instanceof SVGElement
         ? zl[a]
         : null;
   }
   var zl = { text: 1 },
      xl = {
         audio: { currentTime: 1, srcObject: 1 },
         video: { currentTime: 1, srcObject: 1 },
      };
   var Al = /(?!,)([^\t\n\f\r ]+)(?:[\t\n\f\r ]+([.0-9+\-]+[a-z]?))?/gi,
      Bl = /[\t\n\f\r ]+/,
      Cl = /[\t\n\f\r ,]+/g;
   function Dl(a) {
      return (a = a.split(Bl, 2)) ? { url: a[0], metadata: a[1] } : null;
   }
   function El(a) {
      var b = String(a.url).replace(Cl, encodeURIComponent);
      if ((a = a.metadata)) {
         Cl.lastIndex = 0;
         if (Cl.test(a)) return null;
         b += " " + a;
      }
      return b;
   }
   function Fl(a, b, c) {
      return c;
   }
   var Gl = {};
   function Hl(a) {
      function b(l) {
         var n = l.localName;
         if (!l.getAttribute("is") && 2 === ul(n, l.constructor)) return k;
         (l = h[n]) || (l = h[n] = document.createElement(n));
         return l;
      }
      var c = a.reportHandler || void 0,
         d = a.safeTypesBridge || Fl,
         e = /^$/;
      if ((a = a.allowedIdentifierPrefixes)) {
         a = y(a);
         for (var f = a.next(); !f.done; f = a.next())
            e = new RegExp(
               e.source +
                  "|^" +
                  String(f.value)
                     .replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")
                     .replace(/\x08/g, "\\x08")
            );
      }
      c && c(!1, "initResin", null);
      var g = Il(e, d, c),
         h = {},
         k = document.createElement("polyresinuncustomized");
      return function (l, n, p) {
         var q = l.nodeType;
         if (q !== Node.ELEMENT_NODE) {
            if (q === Node.TEXT_NODE) {
               n = l.parentElement;
               p = !n;
               if (n && n.nodeType === Node.ELEMENT_NODE) {
                  q = n.localName;
                  var r = ul(q, n.constructor);
                  switch (r) {
                     case 0:
                     case 1:
                        n = yl(q, n);
                        p = 1 === n || 6 === n;
                        break;
                     case 3:
                     case 2:
                        p = !0;
                        break;
                     default:
                        dl(r, "got an unknown element classification");
                  }
               }
               if (p)
                  return function (z) {
                     return "" + d(z, "STRING", z);
                  };
            }
            return function (z) {
               if (!z && z !== document.all) return z;
               c &&
                  c(
                     !0,
                     "Failed to sanitize " +
                        (l.parentElement && l.parentElement.nodeName) +
                        " #text node to value " +
                        z,
                     l.parentElement
                  );
               return Jl;
            };
         }
         var w = l.localName;
         q = b(l);
         var v = null;
         switch (p) {
            case "attribute":
               if (nl(n) in q) break;
               return function (z) {
                  return z;
               };
            case "property":
               if (n in q) {
                  v = vl(q, n);
                  break;
               }
               if ((r = ol(n)) && r in q) break;
               return function (z) {
                  return z;
               };
            default:
               dl(
                  p,
                  "got an unknown resin type, expected either 'property' or 'attribute'"
               );
         }
         var I = "attribute" === p ? n.toLowerCase() : kl(n);
         v ||
            (v = el(w, I, function (z) {
               var K = l.getAttribute(z);
               return !K || /[\[\{]/.test(z) ? null : K;
            }));
         return function (z) {
            var K = Gl,
               R = null;
            if (!z && z !== document.all) return z;
            if (null != v) {
               var fa = g[v],
                  Ka = fa.ya;
               R = fa.xa;
               Ka && (K = d(z, Ka, Gl));
               K === Gl &&
                  (fa.ra
                     ? ((K = String(d(z, "STRING", z))), (K = fa.ra(w, I, K)))
                     : fa.qa && (K = fa.qa(w, I, z, l)),
                  K === R && (K = Gl));
            }
            K === Gl &&
               ((K = R || Jl),
               c &&
                  ((z = void 0 !== z.ma ? z.ma() : z),
                  c(
                     !0,
                     "Failed to sanitize attribute of <" +
                        w +
                        ">: <" +
                        w +
                        " " +
                        I +
                        '="' +
                        z +
                        '">',
                     l
                  )));
            return K;
         };
      };
   }
   function Il(a, b, c) {
      return [
         ,
         {
            qa: function (d, e, f) {
               return f;
            },
            ra: void 0,
            xa: void 0,
            ya: void 0,
         },
         { qa: void 0, ra: void 0, xa: void 0, ya: "HTML" },
         { qa: void 0, ra: void 0, xa: Kl, ya: "URL" },
         { qa: void 0, ra: void 0, xa: Kl, ya: "RESOURCE_URL" },
         { qa: void 0, ra: void 0, xa: Jl, ya: "STYLE" },
         ,
         { qa: void 0, ra: void 0, xa: Ll, ya: "JAVASCRIPT" },
         {
            qa: void 0,
            ra: function (d, e, f) {
               f = String(f).toLowerCase();
               a: {
                  var g = null;
                  (d = jl[d]) && (g = d[e]);
                  if (
                     "number" !== typeof g &&
                     ((d = jl["*"]) && (g = d[e]), "number" !== typeof g)
                  ) {
                     e = !1;
                     break a;
                  }
                  e = !0 === il[g][String(f).toLowerCase()];
               }
               return e ? f : Jl;
            },
            xa: Jl,
            ya: void 0,
         },
         { qa: void 0, ra: void 0, xa: Jl, ya: "CONSTANT" },
         {
            qa: void 0,
            ra: function (d, e, f) {
               return a.test(f) ? f : Jl;
            },
            xa: Jl,
            ya: "CONSTANT",
         },
         {
            qa: function (d, e, f, g) {
               if ("string" === typeof f)
                  var h = (h = f.match(Al)) ? h.map(Dl).filter(Boolean) : [];
               else if (Array.isArray(f)) h = f;
               else return Kl;
               var k = h;
               h = [];
               var l = [],
                  n = {};
               if (Array.isArray(k))
                  for (var p = 0, q = k.length; p < q; ++p) {
                     var r = k[p],
                        w = r && r.url;
                     if (w) {
                        var v = b(w, "URL", n);
                        if (v) {
                           var I = v !== n;
                           (I ? h : l).push({
                              url: I ? v : w,
                              metadata: r.metadata,
                           });
                        }
                     }
                  }
               else l.push(k);
               k = l.length ? JSON.stringify(l) : null;
               l = Gl;
               if (h.length) {
                  if (!Array.isArray(h)) throw Error();
                  l = h.map(El).filter(Boolean).join(" , ") || Gl;
               }
               k &&
                  c &&
                  c(
                     !0,
                     "Failed to sanitize attribute value of <" +
                        d +
                        ">: <" +
                        d +
                        " " +
                        e +
                        '="' +
                        f +
                        '">: ' +
                        k,
                     g
                  );
               return l === Gl ? Kl : l;
            },
            ra: void 0,
            xa: void 0,
            ya: void 0,
         },
      ];
   }
   var Ml = (function () {
         var a = (function () {
               var d = {
                  createHTML: function () {
                     return "zClosurez";
                  },
                  createScript: function () {
                     return " /*zClosurez*/ ";
                  },
                  createScriptURL: function () {
                     return "about:invalid#zClosurez";
                  },
               };
               return "undefined" !== typeof trustedTypes
                  ? trustedTypes.createPolicy("polymer_resin", d)
                  : d;
            })(),
            b = a.createHTML(""),
            c = a.createScript("");
         a = a.createScriptURL("");
         return { wh: b, vh: c, xh: a };
      })(),
      Jl = Ml.wh,
      Ll = Ml.vh,
      Kl = Ml.xh;
   function Nl(a) {
      var b = Hl(a);
      return function (c, d, e, f) {
         return f || f === document.all ? b(c, d, e)(f) : f;
      };
   }
   var Ol = (function (a) {
      var b = Nl(a);
      return function (c, d, e, f) {
         return f ? b(f, d, e, c) : Jl;
      };
   })({
      allowedIdentifierPrefixes: [""],
      reportHandler: function (a, b, c) {
         a ? console.warn(b, c) : console.log(b);
      },
      safeTypesBridge: function (a, b, c) {
         var d = al[b];
         return d.tb(a) && ((d = d.vb(a, c)), d !== c)
            ? d
            : (0, cl[b])(String($k(a)), c);
      },
   });
   if (void 0 !== eb)
      throw Error(
         "Attempted to install Polymer Resin on top of an existing policy."
      );
   eb = Ol;
   if (eb !== Ol)
      throw Error("Cannot install sanitizeDOMValue.  Is Polymer frozen?");
   window.addEventListener("WebComponentsReady", function Pl() {
      var b = document.getElementById("preview-app");
      new Oh(b);
      window.removeEventListener("WebComponentsReady", Pl);
   });
}.call(this));
