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

var HTMLCS_Section508_Sniffs_B = {
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
            'embed',
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
        HTMLCS.addMessage(HTMLCS.NOTICE, element, '映像を含むコンテンツに対して、テキストベースの代替コンテンツ、または映像と同期した音声解説が提供され、ユーザーが利用可能か確認してください。 For multimedia containing video, ensure a synchronised audio description or text alternative for the video portion is provided.', 'Video');
        HTMLCS.addMessage(HTMLCS.NOTICE, element, '映像、または音声を含むコンテンツに対して、テキストベースの代替コンテンツ、または映像と同期した音声解説が提供され、ユーザーが利用可能か確認してください。 For multimedia containing synchronised audio and video, ensure synchronised captions are provided for the audio portion.', 'Captions');

    }
};
