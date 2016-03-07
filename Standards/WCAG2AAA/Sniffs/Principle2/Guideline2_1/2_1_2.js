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

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_1_2_1_2 = {
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
        return [
            'object',
            'applet',
            'embed'
        ];

    },

    /**
     * Process the registered element.
     *
     * @param {DOMNode} element The element registered.
     * @param {DOMNode} top     The top element of the tested code.
     */
    process: function(element, top)
    {
        HTMLCS.addMessage(HTMLCS.WARNING, element, '�L�[�{�[�h����ɂ���ăv���O�C���A�܂��͖��ߍ��݃A�v���P�[�V�����ɂ���ĕ`�ʂ����R���|�[�l���g�Ƀt�H�[�J�X���ړ��ł���ꍇ�A�L�[�{�[�h���삾����p���Ă��̃R���|�[�l���g����t�H�[�J�X���O�����Ƃ��\�ł��邱�Ƃ��m�F���Ă��������B Check that this applet or plugin provides the ability to move the focus away from itself when using the keyboard.', 'F10');

    }
};
