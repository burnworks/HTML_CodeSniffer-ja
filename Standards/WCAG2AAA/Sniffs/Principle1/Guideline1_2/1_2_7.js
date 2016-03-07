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

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_7 = {
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
            'embed',
            'applet',
            'video'
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
        // Check for elements that could potentially contain video.
        HTMLCS.addMessage(HTMLCS.NOTICE, element, '�������̖��ߍ��݃I�u�W�F�N�g�����^�ς̓����������f�B�A�̏ꍇ�ŁA�O�i�����f���Ɠ����̈Ӗ���`�B���鉹���K�C�h��}�����邽�߂̏\���Ȓ����̍��Ԃ��܂܂Ȃ��ꍇ�A�����������f�B�A�Ɋ܂܂�Ă��邷�ׂĂ̎��^�ς̉f���R���e���c�ɑ΂��āA�g�����������K�C�h���񋟂���A���[�U�[�����p�\���m�F���Ă��������B If this embedded object contains synchronised media, and where pauses in foreground audio is not sufficient to allow audio descriptions to convey the sense of pre-recorded video, check that an extended audio description is provided, either through scripting or an alternate version.', 'G8');

    }
};
