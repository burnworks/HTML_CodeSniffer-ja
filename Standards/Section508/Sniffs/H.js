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

var HTMLCS_Section508_Sniffs_H = {
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
        return ['table'];

    },

    /**
     * Process the registered element.
     *
     * @param {DOMNode} element The element registered.
     * @param {DOMNode} top     The top element of the tested code.
     */
    process: function(table, top)
    {
        var headersAttr = HTMLCS.util.testTableHeaders(table);

        // Incorrect usage of headers - error; emit always.
        for (var i = 0; i < headersAttr.wrongHeaders.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, headersAttr.wrongHeaders[i].element, '�Ԉ���� headers �����l������ td �v�f�ɕt�^����Ă��܂��B���炭�������̂� "' + headersAttr.wrongHeaders[i].expected + '" �ł����A���ۂɌ��������̂� "' + headersAttr.wrongHeaders[i].actual + '" �ł��B Incorrect headers attribute on this td element. Expected "' + headersAttr.wrongHeaders[i].expected + '" but found "' + headersAttr.wrongHeaders[i].actual + '"', 'IncorrectHeadersAttr');
        }

        // Errors where headers are compulsory.
        if ((headersAttr.required === true) && (headersAttr.allowScope === false)) {
            if (headersAttr.used === false) {
                // Headers not used at all, and they are mandatory.
                HTMLCS.addMessage(HTMLCS.ERROR, table, '���o���Z���ith �v�f�j�ƃf�[�^�Z���itd �v�f�j�̊֌W������`����Ă��܂���B���̃e�[�u���ɂ͍s���o�����������邽�߁Atd �v�f�� headers �������g�p����K�v������܂��B The relationship between td elements and their associated th elements is not defined. As this table has multiple levels of th elements, you must use the headers attribute on td elements.', 'MissingHeadersAttrs');
            } else {
                // Missing TH IDs - error; emit at this stage only if headers are compulsory.
                if (headersAttr.missingThId.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, '���̃e�[�u�����̂��ׂĂ� th �v�f�ɂ� id �������t�^����Ă��܂���Btd �v�f�� headers ������p���ĎQ�Ƃ��邽�߂ɂ́Aid �����������Ă���K�v������܂��B Not all th elements in this table contain an id attribute. These cells should contain ids so that they may be referenced by td elements\' headers attributes.', 'MissingHeaderIds');
                }

                // Missing TD headers attributes - error; emit at this stage only if headers are compulsory.
                if (headersAttr.missingTd.length > 0) {
                    HTMLCS.addMessage(HTMLCS.ERROR, table, '���̃e�[�u�����̂��ׂĂ� td �v�f�ɂ� headers �������t�^����Ă��܂���Bheaders �����ɂ͊֘A�t���� th �v�f������ id �����l�����ׂĎw�肷��K�v������܂��B Not all td elements in this table contain a headers attribute. Each headers attribute should list the ids of all th elements associated with that cell.', 'IncompleteHeadersAttrs');
                }
            }//end if
        }//end if
    }

};
