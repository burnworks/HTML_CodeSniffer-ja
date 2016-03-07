/**
 * +--------------------------------------------------------------------+
 * | This HTML_CodeSniffer file is Copyright (c)                        |
 * | Squiz Australia Pty Ltd ABN 53 131 581 247                         |
 * +--------------------------------------------------------------------+
 * | IMPORTANT: Your use of this Software is subject to the terms of    |
 * | the Licence provided in the file licence.txt. If you cannot find   |
 * | this file please contact Squiz (www.squiz.com.au) so we may        |
 * | provide you a copy.                                                |
 * +--------------------------------------------------------------------+
 *
 */

/* Japanese translation by Yoshiki Kato @burnworks - v1.0.0 - 2016-03-01 */

var HTMLCS_Section508_Sniffs_L = {
    /**
     * Determines the elements to register for processing.
     *
     * Each element of the returned array can either be an element name, or "_top"
     * which is the top element of the tested code.
     *
     * @returns {Array} The list of elements.
     */
    register: function()
    {
        return ['_top'];

    },

    /**
     * Process the registered element.
     *
     * @param {DOMNode} element The element registered.
     * @param {DOMNode} top     The top element of the tested code.
     */
    process: function(element, top)
    {
        if (element === top) {
            this.addProcessLinksMessages(top);
            this.testKeyboard(top);
        }
    },

    addProcessLinksMessages: function(top)
    {
        var errors = this.processLinks(top);
        for (var i = 0; i < errors.emptyNoId.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.emptyNoId[i], 'リンクテキストを持たず、name 属性、または id 属性のいずれか、あるいはその両方を持たない a 要素が見つかりました。 Anchor element found with no link content and no name and/or ID attribute.', 'EmptyAnchorNoId');
        }

        for (var i = 0; i < errors.placeholder.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, errors.placeholder[i], 'リンクテキストを含む a 要素が見つかりましたが、href 属性を持たず、name 属性、id 属性のいずれかも指定されていません。 Anchor element found with link content, but no href, ID, or name attribute has been supplied.', 'PlaceholderAnchor');
        }

        for (var i = 0; i < errors.noContent.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.noContent[i], 'href 属性を持つ a 要素が見つかりましたが、リンクテキストが空です。 Anchor element found with a valid href attribute, but no link content has been supplied.', 'NoContentAnchor');
        }
    },

    processLinks: function(top)
    {
        var errors   = {
            empty: [],
            emptyWithName: [],
            emptyNoId: [],
            noHref: [],
            placeholder: [],
            noContent: []
        };

        var elements = top.querySelectorAll('a');

        for (var el = 0; el < elements.length; el++) {
            var element = elements[el];

            var nameFound = false;
            var hrefFound = false;
            var content   = HTMLCS.util.getElementTextContent(element);

            if ((element.hasAttribute('title') === true) && (/^\s*$/.test(element.getAttribute('title')) === false)) {
                nameFound = true;
            } else if (/^\s*$/.test(content) === false) {
                nameFound = true;
            }

            if ((element.hasAttribute('href') === true) && (/^\s*$/.test(element.getAttribute('href')) === false)) {
                hrefFound = true;
            }

            if (hrefFound === false) {
                // No href. We don't want these because, although they are commonly used
                // to create targets, they can be picked up by screen readers and
                // displayed to the user as empty links. A elements are defined by H91 as
                // having an (ARIA) role of "link", and using them as targets are
                // essentially misusing them. Place an ID on a parent element instead.
                if (/^\s*$/.test(content) === true) {
                    // Also no content. (eg. <a id=""></a> or <a name=""></a>)
                    if (element.hasAttribute('id') === true) {
                        errors.empty.push(element);
                    } else if (element.hasAttribute('name') === true) {
                        errors.emptyWithName.push(element);
                    } else {
                        errors.emptyNoId.push(element);
                    }
                } else {
                    // Giving a benefit of the doubt here - if a link has text and also
                    // an ID, but no href, it might be because it is being manipulated by
                    // a script.
                    if ((element.hasAttribute('id') === true) || (element.hasAttribute('name') === true)) {
                        errors.noHref.push(element);
                    } else {
                        // HTML5 allows A elements with text but no href, "for where a
                        // link might otherwise have been placed, if it had been relevant".
                        // Hence, thrown as a warning, not an error.
                        errors.placeholder.push(element);
                    }
                }//end if
            } else {
                if (/^\s*$/.test(content) === true) {
                    // Href provided, but no content.
                    // We only fire this message when there are no images in the content.
                    // A link around an image with no alt text is already covered in SC
                    // 1.1.1 (test H30).
                    if (element.querySelectorAll('img').length === 0) {
                        errors.noContent.push(element);
                    }
                }//end if
            }//end if
        }//end for

        return errors;
    },

    /**
     * Process mouse-specific functions.
     *
     * @param {DOMNode} top The top element of the tested code.
     */
    testKeyboard: function(top)
    {
        // Testing for elements that have explicit attributes for mouse-specific
        // events. Note: onclick is considered keyboard accessible, as it is actually
        // tied to the default action of a link or button - not merely a click.
        var dblClickEls = top.querySelectorAll('*[ondblclick]');
        for (var i = 0; i < dblClickEls.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, dblClickEls[i], 'その要素をダブルクリックした際に提供される機能が、キーボード操作でも利用可能なことを確認してください。 Ensure the functionality provided by double-clicking on this element is available through the keyboard.', 'DblClick');
        }

        var mouseOverEls = top.querySelectorAll('*[onmouseover]');
        for (var i = 0; i < mouseOverEls.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, mouseOverEls[i], 'その要素にマウスカーソルを重ねた際に提供される機能が、キーボード操作でも利用可能なことを確認してください（例えば focus イベントを使用して）。 Ensure the functionality provided by mousing over this element is available through the keyboard; for instance, using the focus event.', 'MouseOver');
        }

        var mouseOutEls = top.querySelectorAll('*[onmouseout]');
        for (var i = 0; i < mouseOutEls.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, mouseOutEls[i], 'その要素の外にマウスカーソルを移動した際に提供される機能が、キーボード操作でも利用可能なことを確認してください（例えば blur イベントを使用して）。 Ensure the functionality provided by mousing out of this element is available through the keyboard; for instance, using the blur event.', 'MouseOut');
        }

        var mouseMoveEls = top.querySelectorAll('*[onmousemove]');
        for (var i = 0; i < mouseMoveEls.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, mouseMoveEls[i], 'その要素の上でマウスカーソルを動かした際に提供される機能が、キーボード操作でも利用可能なことを確認してください。 Ensure the functionality provided by moving the mouse on this element is available through the keyboard.', 'MouseMove');
        }

        var mouseDownEls = top.querySelectorAll('*[onmousedown]');
        for (var i = 0; i < mouseDownEls.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, mouseDownEls[i], 'その要素の上でマウスボタンを押下した際に提供される機能が、キーボード操作でも利用可能なことを確認してください（例えば KeyDown イベントを使用して）。 Ensure the functionality provided by mousing down on this element is available through the keyboard; for instance, using the keydown event.', 'MouseDown');
        }

        var mouseUpEls = top.querySelectorAll('*[onmouseup]');
        for (var i = 0; i < mouseUpEls.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, mouseUpEls[i], 'その要素の上でマウスボタンを放した際に提供される機能が、キーボード操作でも利用可能なことを確認してください（例えば KeyUp イベントを使用して）。 Ensure the functionality provided by mousing up on this element is available through the keyboard; for instance, using the keyup event.', 'MouseUp');
        }
    }

};
