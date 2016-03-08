/**
 * +--------------------------------------------------------------------+
 * | This HTML_CodeSniffer file is Copyright (c)                        |
 * | Squiz Pty Ltd (ABN 77 084 670 600)                                 |
 * +--------------------------------------------------------------------+
 * | IMPORTANT: Your use of this Software is subject to the terms of    |
 * | the Licence provided in the file licence.txt. If you cannot find   |
 * | this file please contact Squiz (www.squiz.com.au) so we may        |
 * | provide you a copy.                                                |
 * +--------------------------------------------------------------------+
 *
 */

/* Japanese translation by Yoshiki Kato @burnworks - v1.0.0 - 2016-03-01 */

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_2 = {
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
        return ['html'];

    },

    /**
     * Process the registered element.
     *
     * @param {DOMNode} element The element registered.
     * @param {DOMNode} top     The top element of the tested code.
     */
    process: function(element, top)
    {
        // Find a head first.
        var children = element.childNodes;
        var head     = null;

        for (var i = 0; i < children.length; i++) {
            if (children[i].nodeName.toLowerCase() === 'head') {
                head = children[i];
                break;
            }
        }

        if (head === null) {
            HTMLCS.addMessage(HTMLCS.ERROR, element, 'title 要素を配置する head 要素が見つかりません。Webページには適切なタイトルを付ける必要があります。 There is no head section in which to place a descriptive title element.', 'H25.1.NoHeadEl');
        } else {
            var children = head.childNodes;
            var title    = null;

            for (var i = 0; i < children.length; i++) {
                if (children[i].nodeName.toLowerCase() === 'title') {
                    title = children[i];
                    break;
                }
            }

            if (title === null) {
                HTMLCS.addMessage(HTMLCS.ERROR, head, 'Web ページには適切なタイトルを付ける必要があります。 A title should be provided for the document, using a non-empty title element in the head section.', 'H25.1.NoTitleEl');
            } else {
                if (/^\s*$/.test(title.innerHTML) === true) {
                    HTMLCS.addMessage(HTMLCS.ERROR, title, 'title 要素が空です。 The title element in the head section should be non-empty.', 'H25.1.EmptyTitle');
                } else {
                    HTMLCS.addMessage(HTMLCS.NOTICE, title, 'title 要素が文書の内容を適切に示しているか確認してください。 Check that the title element describes the document.', 'H25.2');
                }
            }//end if
        }//end if

    }
};
