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

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_4_2_4_5 = {
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
        HTMLCS.addMessage(HTMLCS.NOTICE, element, 'Web �y�[�W�ꎮ�̒��ŁA���� Web �y�[�W�������镡���̎�i�����p�ł��邱�Ƃ��m�F���Ă��������B�������A���� Web �y�[�W����A�̃v���Z�X�̒��� 1 �X�e�b�v�A���邢�͌��ʂł���ꍇ�͏����܂��B If this Web page is not part of a linear process, check that there is more than one way of locating this Web page within a set of Web pages.', 'G125,G64,G63,G161,G126,G185');

    }
};
