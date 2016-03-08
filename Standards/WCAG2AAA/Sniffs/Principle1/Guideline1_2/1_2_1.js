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

var HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_2_1_2_1 = {
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
            'bgsound',
            'audio',
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
        var nodeName = element.nodeName.toLowerCase();

        if (nodeName !== 'video') {
            HTMLCS.addMessage(HTMLCS.NOTICE, element, 'もしこの埋め込みオブジェクトが収録済の音声しか含まず、かつそれがテキストの代替メディアでない場合、代替コンテンツが提供され、ユーザーが利用可能か確認してください。 If this embedded object contains pre-recorded audio only, and is not provided as an alternative for text content, check that an alternative text version is available.', 'G158');
        }

        if ((nodeName !== 'bgsound') && (nodeName !== 'audio')) {
            HTMLCS.addMessage(HTMLCS.NOTICE, element, 'もしこの埋め込みオブジェクトが収録済の映像しか含まず、かつそれがテキストの代替メディアでない場合、代替コンテンツ、または映像と同期した音声解説が提供され、ユーザーが利用可能か確認してください。 If this embedded object contains pre-recorded video only, and is not provided as an alternative for text content, check that an alternative text version is available, or an audio track is provided that presents equivalent information.', 'G159,G166');
        }

    }
};
