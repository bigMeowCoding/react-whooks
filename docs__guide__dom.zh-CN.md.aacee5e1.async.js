(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[18],{pbvI:function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),l=n.n(a),o=n("dEAq"),r=n("H1Ra"),c=l.a.memo((e=>{e.demos;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"markdown"},l.a.createElement("h2",{id:"dom-\u7c7b-hooks-\u4f7f\u7528\u89c4\u8303"},l.a.createElement(o["AnchorLink"],{to:"#dom-\u7c7b-hooks-\u4f7f\u7528\u89c4\u8303","aria-hidden":"true",tabIndex:-1},l.a.createElement("span",{className:"icon icon-link"})),"DOM \u7c7b Hooks \u4f7f\u7528\u89c4\u8303"),l.a.createElement("p",null,"react-whooks \u5927\u90e8\u5206 DOM \u7c7b Hooks \u90fd\u4f1a\u63a5\u6536 ",l.a.createElement("code",null,"target")," \u53c2\u6570\uff0c\u8868\u793a\u8981\u5904\u7406\u7684\u5143\u7d20\u3002"),l.a.createElement("p",null,l.a.createElement("code",null,"target")," \u652f\u6301\u4e09\u79cd\u7c7b\u578b ",l.a.createElement("code",null,"React.MutableRefObject"),"\u3001",l.a.createElement("code",null,"HTMLElement"),"\u3001",l.a.createElement("code",null,"() => HTMLElement"),"\u3002"),l.a.createElement("ol",null,l.a.createElement("li",null,"\u652f\u6301 ",l.a.createElement("code",null,"React.MutableRefObject"))),l.a.createElement(r["a"],{code:"export default () => {\n  const ref = useRef();\n  const isHovering = useHover(ref);\n  return <div ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>;\n};",lang:"ts"}),l.a.createElement("ol",{start:2},l.a.createElement("li",null,"\u652f\u6301 ",l.a.createElement("code",null,"HTMLElement"))),l.a.createElement(r["a"],{code:"export default () => {\n  const isHovering = useHover(document.getElementById('test'));\n  return <div id=\"test\">{isHovering ? 'hover' : 'leaveHover'}</div>;\n};",lang:"ts"}),l.a.createElement("ol",{start:3},l.a.createElement("li",null,"\u652f\u6301 ",l.a.createElement("code",null,"() => HTMLElement"),"\uff0c\u4e00\u822c\u9002\u7528\u5728 SSR \u573a\u666f")),l.a.createElement(r["a"],{code:"export default () => {\n  const isHovering = useHover(() => document.getElementById('test'));\n  return <div id=\"test\">{isHovering ? 'hover' : 'leaveHover'}</div>;\n};",lang:"ts"}),l.a.createElement("p",null,"\u53e6\u5916\uff0c",l.a.createElement("strong",null,"DOM \u7c7b Hooks \u7684 ",l.a.createElement("code",null,"target")," \u662f\u652f\u6301\u52a8\u6001\u53d8\u5316\u7684"),"\u3002\u6bd4\u5982\uff1a"),l.a.createElement(r["a"],{code:"export default () => {\n  const [boolean, { toggle }] = useBoolean();\n\n  const ref = useRef();\n  const ref2 = useRef();\n\n  const isHovering = useHover(boolean ? ref : ref2);\n  return (\n    <>\n      <div ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>\n      <div ref={ref2}>{isHovering ? 'hover' : 'leaveHover'}</div>\n    </>\n  );\n};",lang:"ts"})))}));t["default"]=e=>{var t=l.a.useContext(o["context"]),n=t.demos;return l.a.useEffect((()=>{var t;null!==e&&void 0!==e&&null!==(t=e.location)&&void 0!==t&&t.hash&&o["AnchorLink"].scrollToAnchor(decodeURIComponent(e.location.hash.slice(1)))}),[]),l.a.createElement(c,{demos:n})}}}]);