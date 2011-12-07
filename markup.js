// Copyright 2011 Sleepless Software Inc.  All Rights Reserved 

(function markup(id) {
	e = document.getElementById("markup");
	t = e.innerHTML;
	t = t.replace(/\n\s+\n/g, "\n\n");
	t = t.replace(/\n\n+/g, "<p>\n");
	t = t.replace(/\+([1-9])([^1-9][^\n]+)\n/g, "<h$1>$2</h$1><p>\n");
	t = t.replace(/\^\^([^\^,]+)(|\,([^\^]+))\^\^/g, "<a href=\"$1\">$3</a>\n");
	t = t.replace(/__(([^_]|_[^_])*)__/g, "<u>$1</u>");		// underline
	t = t.replace(/\(\((([^)]|\)[^)])*)\)\)/g, "<span class=note>$1</span>");		// note
	t = t.replace(/\*\*(([^\*]|\*[^\*])*)\*\*/g, "<b>$1</b>");
	t = t.replace(/([^:])\/\/([^\/]*)\/\//g, "$1<i>$2</i>");
	t = t.replace(/{{/g, "<div class=code>");
	t = t.replace(/}}/g, "</div>");
	t = t.replace(/\(tm\)/g, "&trade;");
	t = t.replace(/\(r\)/g, "&reg;");
	t = t.replace(/\(c\)/g, "&copy;");
	t = t.replace(/\n((\s+\d+\.\s+[^\n]+\n)+)/g, "\n<ol>\n$1\n</ol>");
	t = t.replace(/\n\s+\d+\.\s+/g, "\n<li>");
	t = t.replace(/\n((\s+-\s+[^\n]+\n)+)/g, "\n<ul>\n$1\n</ul>");
	t = t.replace(/\n\s+-\s+/g, "\n<li>");
	t = t.replace(/-{4,}/g, "<hr>");
	t = t.replace(/-{3}/g, "&mdash;");
	t = t.replace(/-{2}/g, "&ndash;");
	e.innerHTML = t;
})()

