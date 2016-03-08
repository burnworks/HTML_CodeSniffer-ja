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

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_3 = {
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
        return ['form'];

    },

    /**
     * Process the registered element.
     *
     * @param {DOMNode} element The element registered.
     * @param {DOMNode} top     The top element of the tested code.
     */
    process: function(element, top)
    {
        // Only G177 (about providing suggestions) is flagged as a technique.
        // The techniques in 3.3.1 are also listed in this Success Criterion.
        HTMLCS.addMessage(HTMLCS.NOTICE, element, '入力エラーが自動的に検出され、修正方法を提案できる場合、その提案がユーザーに提示されているか確認してください。ただし、セキュリティ、あるいはコンテンツの目的を損なう場合は除きます。 Check that this form provides suggested corrections to errors in user input, unless it would jeopardize the security or purpose of the content.', 'G177');
    }
};
