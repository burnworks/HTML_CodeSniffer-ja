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

var HTMLCS_Section508_Sniffs_N = {
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
        var nodeName = element.nodeName.toLowerCase();
        if (nodeName === 'form') {
            HTMLCS.addMessage(HTMLCS.NOTICE, element, 'もし入力エラーが自動的に検出された場合は、エラーとなっている箇所が特定され、そのエラーがユーザーにテキストで説明されているか確認してください。 If an input error is automatically detected in this form, check that the item(s) in error are identified and the error(s) are described to the user in text.', 'Errors');
            HTMLCS.addMessage(HTMLCS.NOTICE, element, '入力コントロールの目的や内容がわかるラベルや説明（必須入力の項目であることがわかるようにするなど）が提供されているか確認してください。 Check that descriptive labels or instructions (including for required fields) are provided for user input in this form.', 'Labels');
            HTMLCS.addMessage(HTMLCS.NOTICE, element, 'このフォームがキーボード、及び他のアクセシビリティツールを使用して操作できることを確認してください。 Ensure that this form can be navigated using the keyboard and other accessibility tools.', 'KeyboardNav');
        }
    }

};
