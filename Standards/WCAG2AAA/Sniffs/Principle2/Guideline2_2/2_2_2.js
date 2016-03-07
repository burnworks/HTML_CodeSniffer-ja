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

var HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_2 = {
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
            '_top',
            'blink'
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
        if (element === top) {
            HTMLCS.addMessage(HTMLCS.NOTICE, element, '�����I�ɊJ�n���A���� 5 �b�ȏ�p�����ē����̂���A�_�ł��Ă���A�X�N���[��������A�܂��͎����X�V������ɂ��āA�������ꎞ��~�A��~�A�܂��͔�\���ɂ���d�g�݂����p�\�Ȃ��Ƃ��m�F���Ă��������B If any part of the content moves, scrolls or blinks for more than 5 seconds, or auto-updates, check that there is a mechanism available to pause, stop, or hide the content.', 'SCR33,SCR22,G187,G152,G186,G191');

            var elements = top.querySelectorAll('*');
            for (var i = 0; i < elements.length; i++) {
                var computedStyle = HTMLCS.util.style(elements[i]);

                if (computedStyle) {
                    if (/blink/.test(computedStyle['text-decoration']) === true) {
                        HTMLCS.addMessage(HTMLCS.WARNING, elements[i], '���[�U�[���_�ł���R���e���c�� 5 �b�����Œ�~�\�Ȏd�g�݂��񋟂���Ă��邩�m�F���Ă��������B Ensure there is a mechanism available to stop this blinking element in less than five seconds.', 'F4');
                    }
                }
            }//end for
        } else if (element.nodeName.toLowerCase() === 'blink') {
            HTMLCS.addMessage(HTMLCS.ERROR, element, '���[�U�[���_�ł���R���e���c�� 5 �b�����Œ�~�\�Ȏd�g�݂��񋟂���Ă��܂���B Blink elements cannot satisfy the requirement that blinking information can be stopped within five seconds.', 'F47');
        }//end if

    }
};
