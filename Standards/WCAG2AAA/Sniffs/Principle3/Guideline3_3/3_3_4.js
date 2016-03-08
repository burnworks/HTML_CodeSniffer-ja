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

var HTMLCS_WCAG2AAA_Sniffs_Principle3_Guideline3_3_3_3_4 = {
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
        HTMLCS.addMessage(HTMLCS.NOTICE, element, 'このフォームからの送信がユーザーにとって法律行為、もしくは金融取引が生じる場合、またはユーザーが制御可能なデータを変更もしくは削除する、ユーザーが試験の解答を送信する場合は「送信の取消ができる」「ユーザーが入力したデータの入力エラーがチェックされ、ユーザーが修正する機会が提供される」「送信を完了する前にユーザーが情報の見直し、確認、及び修正をする機能が利用できる」の内、少なくとも 1 つを満たしているか確認してください。 If this form would bind a user to a financial or legal commitment, modify/delete user-controllable data, or submit test responses, ensure that submissions are either reversible, checked for input errors, and/or confirmed by the user.', 'G98,G99,G155,G164,G168.LegalForms');
    }
};
