/*
Copyright 2011 Sleepless Software Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE. 
*/

(function markup(id, cb) {
	var e = document.getElementById("markup");
	var t = e.innerHTML;
	t = t.replace(/\n[\t\s]+\n/g, "\n\n");
	t = t.replace(/\n\n+/g, "\n\n<p>\n");
	t = t.replace(/\+([1-9])([^1-9][^\n]+)\n/g, "<h$1>$2</h$1><p>\n");
	t = t.replace(/\^\^([^\^,]+)(|\,([^\^]+))\^\^/g, "<a href=\"$1\">$3</a>\n");
	t = t.replace(/\[{2}([^\]]+)\]{2}/g, "<img src=\"$1\">");
	t = t.replace(/__(([^_]|_[^_])*)__/g, "<u>$1</u>");		// underline
	t = t.replace(/\(\((([^)]|\)[^)])*)\)\)/g, "<span class=note>$1</span>");		// note
	t = t.replace(/\*\*(([^\*]|\*[^\*])*)\*\*/g, "<b>$1</b>");
	t = t.replace(/([^:])\/\/([^\/]*)\/\//g, "$1<i>$2</i>");
	t = t.replace(/\n[\t\s]*\{{2}[\t\s]*[\n$]/g, "<div class=code>");
	t = t.replace(/\n[\t\s]*\}{2}[\t\s]*[\n$]/g, "</div><!-- end code block -->");
	t = t.replace(/\{{2}/g, "<span class=code>");
	t = t.replace(/\}{2}/g, "</span>");
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
	cb = cb || function() { e.innerHTML = t } 
	cb(t, e)
})()

