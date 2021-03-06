/*
Copyright 2015 Sleepless Software Inc. All rights reserved.

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


Markup = {};

Markup.convert = function( t ) {

	// nuke CRs
	t = t.replace(/\r/gi, "\n")

	// remove leading trailing whitespace on all lines
	t = t.split( /\n/ ).map( l => l.trim() ).join( "\n" );

	// prepend a couple newlines so that regexps below will match at the beginning.
	t = "\n\n" + t;		// note: will cause a <p> to always appear at start of output

	// one or more blank lines mark a paragraph
	t = t.replace(/\n\n+/gi, "\n\n<p>\n");
	
	// headings h1 and h2
	t = t.replace(/\n([^\s\n][^\n]+)\n={5,}\s*\n/gi, "\n<h1>$1</h1>\n" );
	t = t.replace(/\n([^\s\n][^\n]+)\n-{5,}\s*\n/gi, "\n<h2>$1</h2>\n" );

	// hyper link/anchor
	t = t.replace(/\(\s*link\s+([^\s\)]+)\s*\)/gi, "(link $1 $1)");
	t = t.replace(/\(\s*link\s+([^\s\)]+)\s*([^\)]+)\)/gi, "<a href=\"$1\">$2</a>");

	// hyper link/anchor that opens in new window/tab
	t = t.replace(/\(\s*xlink\s+([^\s\)]+)\s*\)/gi, "(xlink $1 $1)");
	t = t.replace(/\(\s*xlink\s+([^\s\)]+)\s*([^\)]+)\)/gi, "<a target=_blank href=\"$1\">$2</a>");

	// image
	t = t.replace(/\(\s*image\s+([^\s\)]+)\s*\)/gi, "(image $1 $1)");
	t = t.replace(/\(\s*image\s+([^\s\)]+)\s*([^\)]+)\)/gi, "<img src=\"$1\" title=\"$2\">");

	// figure
	t = t.replace(/\(\s*figure\s+([^\s\)]+)\s*\)/gi, "(figure $1 $1)");
	t = t.replace(/\(\s*figure\s+([^\s\)]+)\s*([^\)]+)\)/gi, "<figure><img src=\"$1\" title=\"$2\"><figcaption>$2</figcaption></figure>");

	t = t.replace(/__(([^_]|_[^_])*)__/gi, "<u>$1</u>");		// underline
	t = t.replace(/\*\*(([^\*]|\*[^\*])*)\*\*/gi, "<em>$1</em>");	// emphasis
	t = t.replace(/\n\s*"\s*\n([^"]+)"\s*\n/gi, "\n<blockquote>$1</blockquote>\n");	// blockquote
	t = t.replace(/\n\s*{\s*\n([^"]+)}\s*\n/gi, "\n<blockquote><code>$1</code></blockquote>\n");
	t = t.replace(/{([^}]+)}/gi, "<code>$1</code>");	// code

	// special
	t = t.replace(/\(tm\)/gi, "&trade;");	
	t = t.replace(/\(r\)/gi, "&reg;");	
	t = t.replace(/\(c\)/gi, "&copy;");
	t = t.replace(/\(cy\)/gi, "&copy;&nbsp;"+(new Date().getFullYear()));
	t = t.replace(/\(cm\s([^)]+)\)/gi, "&copy;&nbsp;"+(new Date().getFullYear())+"&nbsp;$1&nbsp;&ndash;&nbsp;All&nbsp;Rights&nbsp;Reserved" )

	// unordered list
	t = t.replace(/\n((\s*-\s+[^\n]+\n)+)/gi, "\n<ul>\n$1\n</ul>");
	t = t.replace(/\n\s*-\s+/gi, "\n<li>");

	// ordered list 
	t = t.replace(/\n((\s*(\d+\.|#)\s+[^\n]+\n)+)/gi, "\n<ol>\n$1\n</ol>");
	t = t.replace(/\n\s*(\d+\.|#)\s+/gi, "\n<li>");

	// dashes
	t = t.replace(/\n\s*-{4,}\s*\n/gi, "\n<hr>\n");		// horizontal rule
	t = t.replace(/-{3}/gi, "&mdash;");		// mdash
	t = t.replace(/-{2}/gi, "&ndash;");		// ndash

	if( navigator !== "undefined" ) {
		// only supported if running in browser
		t = t.replace(/\(\s*lastModified\s*\)/gi, document.lastModified);
	}

	return t;
};


