# HTML_CodeSniffer-ja README

Squiz 社 （Squiz Pty Ltd） が開発している [HTML_CodeSniffer](https://github.com/squizlabs/HTML_CodeSniffer) のメッセージ部分を日本語化したものです。[pa11y](https://github.com/springernature/pa11y) を日本語で使いたくて翻訳しました。

## pa11y での使用方法

必要に応じて日本語版 HTMLCS.js をビルドしてください。ビルド済みの HTMLCS-ja.js は下記に置いてあります。

- https://burnworks.com/docs/HTML_CodeSniffer-ja/HTMLCS.js

以下のいずれかの方法で使用できます。

### 1. HTMLCS.js を置き換え

ビルドした日本語版 HTMLCS.js を pa11y に同梱されている HTMLCS.js と置き換えてください。

pa11y のインストールディレクトリ以下にある

- /lib/vendor/HTMLCS.js

を上書きすればよいでしょう。

### 2. オプション（--htmlcs）を使用

pa11y 実行時にオプションで HTMLCS.js の場所を指定します。

    pa11y --htmlcs https://burnworks.com/docs/HTML_CodeSniffer-ja/HTMLCS.js example.com

### 3. 設定ファイルを使用

    pa11y({
        htmlcs: 'https://burnworks.com/docs/HTML_CodeSniffer-ja/HTMLCS.js'
    });

pa11y の詳しい使用方法は [pa11y](https://github.com/springernature/pa11y) のページをご確認ください。

## ブックマークレットで使う場合

日本語版 HTMLCS.js を本家同様にブックマークレットから使用する場合は、下記のリンクをブックマークバーにドラッグ&ドロップするなどして使用できます。

- <a href="javascript:(function()%20{var%20_p='https://burnworks.com/docs/HTML_CodeSniffer-ja/';var%20_i=function(s,cb)%20{var%20sc=document.createElement('script');sc.onload%20=%20function()%20{sc.onload%20=%20null;sc.onreadystatechange%20=%20null;cb.call(this);};sc.onreadystatechange%20=%20function(){if(/^(complete|loaded)$/.test(this.readyState)%20===%20true){sc.onreadystatechange%20=%20null;sc.onload();}};sc.src=s;if%20(document.head)%20{document.head.appendChild(sc);}%20else%20{document.getElementsByTagName('head')[0].appendChild(sc);}};%20var%20options={path:_p};_i(_p+'HTMLCS.js',function(){HTMLCSAuditor.run('WCAG2AA',null,options);});})();)" class="btn">このリンクをブックマークバーにドラッグ&ドロップ</a>

## その他

HTML_CodeSniffer-ja は HTML_CodeSniffer のライセンスに基づいて公開しています。

HTML_CodeSniffer、及び pa11y の開発者の方々に対して HTML_CodeSniffer-ja に関する質問をしたりしないようにお願いします。

以下はオリジナルの README です。

## HTML_CodeSniffer README

HTML_CodeSniffer is a client-side JavaScript that checks a HTML document or source code, and detects violations of a defined coding standard.

It can be used in two ways. Called directly in JavaScript source, HTML_CodeSniffer will provide a list of known and potential violations to the calling script. It also comes with a pop-up auditor interface, accessible via a bookmarklet, letting you browse through messages emitted from one of the defined standards. Where possible, the auditor also points you to the HTML element causing the problem.

HTML_CodeSniffer is released under a BSD-style licence. For more information, please see the file "licence.txt".

### Which standards and sniffs does HTML_CodeSniffer include?

HTML_CodeSniffer comes with standards and sniffs that cover the three conformance levels of the W3C [Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG20), and the U.S. [Section 508](http://section508.gov/index.cfm?fuseAction=stdsdoc) legislation.

### Contributing and reporting issues

To report any issues with using HTML_CodeSniffer, please use the [HTML_CodeSniffer Issue Tracker](http://github.com/squizlabs/HTML_CodeSniffer/issues).

Contributions to the HTML_CodeSniffer code base are also welcome: please create a fork of the main repository, then submit your modified code through a [Pull Request](http://help.github.com/send-pull-requests/) for review. A Pull Request also automatically creates an issue in the Issue Tracker, so if you have code to contribute, you do not need to do both.

### More Information

More information on HTML_CodeSniffer can be found on its GitHub site, [http://squizlabs.github.io/HTML_CodeSniffer/](http://squizlabs.github.io/HTML_CodeSniffer/). This site provides:

- Information on the tests performed (and messages emitted) by HTML_CodeSniffer's standards, organised by conformance level and Success Criterion;
- A source test area that allows you to try out HTML_CodeSniffer with your own HTML source code; and
- A link to the HTML_CodeSniffer bookmarklet, letting you check other pages using the pop-up auditor interface.
