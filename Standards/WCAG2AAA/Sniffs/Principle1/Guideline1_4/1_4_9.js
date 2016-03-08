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

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_4_1_4_9 = {
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
        var imgObj = top.querySelector('img');

        if (imgObj !== null) {
            HTMLCS.addMessage(HTMLCS.NOTICE, top, '純粋な装飾目的、もしくはその情報を伝える上でテキストを特定の形で表現することが必要不可欠である場合に限って、文字画像が使用されていることを確認してください。 Check that images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.', 'G140,C22,C30.NoException');
        }
    }
};
