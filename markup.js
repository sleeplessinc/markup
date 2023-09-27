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

	// XXX Make this just pull in and user the one in sleepless.js

		// nuke CRs
		t = t.replace(/\r/gi, "\n")

		// remove leading/trailing whitespace on all lines
		// t = t.split( /\n/ ).map( l => l.trim() ).join( "\n" );

		// append/prepend a couple newlines so that regexps below will match at beginning and end
		t = "\n\n" + t + "\n\n";		// note: will cause a <p> to always appear at start of output
		// DEPRECATE - old style
		// hyper link/anchor
		// (link url)
		// (link url alt_display_text)
		t = t.replace(/\(\s*link\s+([^\s\)]+)\s*\)/gi, "<a href=\"$1\">$1</a>");
		t = t.replace(/\(\s*link\s+([^\s\)]+)\s*([^\)]+)\)/gi, "<a href=\"$1\">$2</a>");

		// DEPRECATE - old style
		// hyper link/anchor that opens in new window/tab
		// (xlink url)
		// (xlink url alt_display_text)
		t = t.replace(/\(\s*xlink\s+([^\s\)]+)\s*\)/gi, "<a target=_blank href=\"$1\">$1</a>");
		t = t.replace(/\(\s*xlink\s+([^\s\)]+)\s*([^\)]+)\)/gi, "<a target=_blank href=\"$1\">$2</a>");

		// DEPRECATE - old style
		// image
		// (image src title)
		t = t.replace(/\(\s*image\s+([^\s\)]+)\s*\)/gi, "<img src=\"$1\">");
		t = t.replace(/\(\s*image\s+([^\s\)]+)\s*([^\)]+)\)/gi, "<img src=\"$1\" title=\"$2\">");


		// hyper link/anchor
		t = t.replace( /\^\^\s*([^\s]*)\s*\^\^/gi, "^$1 $1^" );
		t = t.replace( /\^\^\s*([^\s]*)\s+([^\^]+)\^\^/gi, "<a target=_blank href=\"$1\">$2</a>" );
		t = t.replace( /\^\s*([^\s]*)\s*\^/gi, "^$1 $1^" );
		t = t.replace( /\^\s*([^\s]*)\s+([^\^]+)\^/gi, "<a href=\"$1\">$2</a>" );

		// image
		t = t.replace(/\|\s*([^\s\)]+)\s*\|/gi, "(image $1 $1)");
		t = t.replace(/\|\s*([^\s\)]+)\s*([^\)]+)\|/gi, "<img src=\"$1\" title=\"$2\">");

		// figure
		// (figure src caption)
		t = t.replace(/\(\s*figure\s+([^\s\)]+)\s*\)/gi, "(figure $1 $1)");
		t = t.replace(/\(\s*figure\s+([^\s\)]+)\s*([^\)]+)\)/gi, "<figure><img src=\"$1\" title=\"$2\"><figcaption>$2</figcaption></figure>");

		// symbols
		// (tm)	
		// (r)
		// (c)
		// (cy)				"(C) 2021"
		// (cm Foocorp)		"(C) 2021 Foocorp All Rights Reserved"
		t = t.replace(/\(tm\)/gi, "&trade;");	
		t = t.replace(/\(r\)/gi, "&reg;");	
		t = t.replace(/\(c\)/gi, "&copy;");
		//t = t.replace(/\(cy\)/gi, "&copy;&nbsp;"+(new Date().getFullYear()));
		//t = t.replace(/\(cm\s([^)]+)\)/gi, "&copy;&nbsp;"+(new Date().getFullYear())+"&nbsp;$1&nbsp;&ndash;&nbsp;All&nbsp;Rights&nbsp;Reserved" )

		// one or more blank lines mark a paragraph
		t = t.replace(/\n\n+/gi, "\n\n<p>\n");
		
		// headings h1 and h2
		// Heading 1
		// =========
		// Heading 2
		// ---------
		// Heading 3
		// - - - - -
		// Heading 4
		// -  -  -  -  -
		// Heading 5
		// -   -   -   -   -
		t = t.replace(/\n([^\s\n][^\n]+)\n(-\s\s\s){4,}-\n/gi, "\n<h5>$1</h5>\n" );
		t = t.replace(/\n([^\s\n][^\n]+)\n(-\s\s){4,}-\n/gi, "\n<h4>$1</h4>\n" );
		t = t.replace(/\n([^\s\n][^\n]+)\n(-\s){4,}-\n/gi, "\n<h3>$1</h3>\n" );
		t = t.replace(/\n([^\s\n][^\n]+)\n-{5,}\n/gi, "\n<h2>$1</h2>\n" );
		t = t.replace(/\n([^\s\n][^\n]+)\n={5,}\n/gi, "\n<h1>$1</h1>\n" );

		// styles
		// //italic//
		// **bold**
		// __underline__
		t = t.replace(/([^:])\/\/(.*)\/\//gi, "$1<i>$2</i>");
		t = t.replace(/\*\*(.*)\*\*/gi, "<b>$1</b>");
		t = t.replace(/__(.*)__/gi, "<u>$1</u>");

		// "
		// block quote text
		// "
		t = t.replace(/\n\s*"\s*\n([^"]+)"\s*\n/gi, "\n<blockquote>$1</blockquote>\n");	// blockquote

		// >
		// centered text
		// >
		t = t.replace(/\n\s*>\s*\n([^>]+)>\s*\n/gi, "\n<div style='text-align:center;'>$1</div>\n");

		// >>
		// right justified text
		// >>
		t = t.replace(/\n\s*>>\s*\n([^>]+)>>\s*\n/gi, "\n<div style='text-align:right'>$1</div>\n");

		// {{
		//     code block
		// }}
		// foo {inline code} bar
		t = t.split( "{{\n" ).join( "<pre><code>" );	// code block
		t = t.split( "}}\n" ).join( "</code></pre>" );
		t = t.replace(/{([^}]+)}/gi, "<code>$1</code>");	// inline code

		// Unordered list
		// - item 
		// - item
		t = t.replace(/\n((\s*-\s+[^\n]+\n)+)/gi, "\n<ul>\n$1\n</ul>");
		t = t.replace(/\n\s*-\s+/gi, "\n<li>");

		// Ordered list 
		// 1. item 1
		// # item 2
		// 1. item 3
		t = t.replace(/\n((\s*(\d+|#)\.?\s+[^\n]+\n)+)/gi, "\n<ol>\n$1\n</ol>");
		t = t.replace(/\n\s*(\d+|#)\.?\s+([^\n]+)/gi, "\n<li>$2</li>");

		// Horiz. rule
		// ---- (4 or more dashes)
		t = t.replace(/\n\s*-{4,}\s*\n/gi, "\n<hr>\n");		// horizontal rule

		// Dashes
		// --  (n-dash)
		// ---  (m-dash)
		t = t.replace(/-{3}/gi, "&mdash;");		// mdash
		t = t.replace(/-{2}/gi, "&ndash;");		// ndash

		if( typeof navigator !== "undefined" ) {
			// Only supported if running in browser

			// (lastModified)		// last modified data of document.
			t = t.replace(/\(\s*lastModified\s*\)/gi, document.lastModified);
		}

		return t;
};


