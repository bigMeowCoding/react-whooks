(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{dQXE:function(e,t,n){"use strict";n.r(t);var u=n("tJVT"),c=n("/7QA"),r=n("q1tI"),a=n.n(r);t["default"]=()=>{var e=Object(r["useState"])(0),t=Object(u["a"])(e,2),n=t[1],l=Object(r["useRef"])(0),o=Object(r["useRef"])(0);return Object(r["useLayoutEffect"])((()=>{l.current+=1}),[{}]),Object(c["useDeepCompareLayoutEffect"])((()=>(o.current+=1,()=>{})),[{}]),a.a.createElement("div",null,a.a.createElement("p",null,"effectCount: ",l.current),a.a.createElement("p",null,"deepCompareCount: ",o.current),a.a.createElement("p",null,a.a.createElement("button",{type:"button",onClick:()=>n((e=>e+1))},"reRender")))}}}]);