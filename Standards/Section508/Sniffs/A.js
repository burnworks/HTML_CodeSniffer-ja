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

var HTMLCS_Section508_Sniffs_A = {
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
            'img',
            'input',
            'area',
            'object',
            'applet',
            'bgsound',
            'audio'
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
            this.addNullAltTextResults(top);
            this.addMediaAlternativesResults(top);
        } else {
            var nodeName = element.nodeName.toLowerCase();
            if ((nodeName === 'object') || (nodeName === 'bgsound') || (nodeName === 'audio')) {
                // Audio transcript notice. Yes, this is in A rather than B, since
                // audio is not considered "multimedia" (roughly equivalent to a
                // "synchronised media" presentation in WCAG 2.0). It is non-text,
                // though, so a transcript is required.
                HTMLCS.addMessage(HTMLCS.NOTICE, element, '音声しか含まないコンテンツに対して、テキストベースの代替コンテンツが提供され、ユーザーが利用可能か確認してください。 For multimedia containing audio only, ensure an alternative is available, such as a full text transcript.', 'Audio');
            }
        }
    },

    /**
     * Test for missing or null alt text in certain elements.
     *
     * Tested elements are:
     * - IMG elements
     * - INPUT elements with type="image" (ie. image submit buttons).
     * - AREA elements (ie. in client-side image maps).
     *
     * @param {DOMNode} element The element to test.
     *
     * @returns {Object} A structured list of errors.
     */
    testNullAltText: function(top)
    {
        var errors = {
            img: {
                generalAlt: [],
                missingAlt: [],
                ignored: [],
                nullAltWithTitle: [],
                emptyAltInLink: []
            },
            inputImage: {
                generalAlt: [],
                missingAlt: []
            },
            area: {
                generalAlt: [],
                missingAlt: []
            }
        };

        elements = top.querySelectorAll('img, area, input[type="image"]');

        for (var el = 0; el < elements.length; el++) {
            var element = elements[el];

            var nodeName      = element.nodeName.toLowerCase();
            var linkOnlyChild = false;
            var missingAlt    = false;
            var nullAlt       = false;

            if (element.parentNode.nodeName.toLowerCase() === 'a') {
                var prevNode = this._getPreviousSiblingElement(element, null);
                var nextNode = this._getNextSiblingElement(element, null);

                if ((prevNode === null) && (nextNode === null)) {
                    var textContent = element.parentNode.textContent;

                    if (element.parentNode.textContent !== undefined) {
                        var textContent = element.parentNode.textContent;
                    } else {
                        // Keep IE8 happy.
                        var textContent = element.parentNode.innerText;
                    }

                    if (HTMLCS.util.isStringEmpty(textContent) === true) {
                        linkOnlyChild = true;
                    }
                }
            }//end if

            if (element.hasAttribute('alt') === false) {
                missingAlt = true;
            } else if (!element.getAttribute('alt') || HTMLCS.util.isStringEmpty(element.getAttribute('alt')) === true) {
                nullAlt = true;
            }

            // Now determine which test(s) should fire.
            switch (nodeName) {
                case 'img':
                    if ((linkOnlyChild === true) && ((missingAlt === true) || (nullAlt === true))) {
                        // Img tags cannot have an empty alt text if it is the
                        // only content in a link (as the link would not have a text
                        // alternative).
                        errors.img.emptyAltInLink.push(element.parentNode);
                    } else if (missingAlt === true) {
                        errors.img.missingAlt.push(element);
                    } else if (nullAlt === true) {
                        if ((element.hasAttribute('title') === true) && (HTMLCS.util.isStringEmpty(element.getAttribute('title')) === false)) {
                            // Title attribute present and not empty. This is wrong when
                            // an image is marked as ignored.
                            errors.img.nullAltWithTitle.push(element);
                        } else {
                            errors.img.ignored.push(element);
                        }
                    } else {
                        errors.img.generalAlt.push(element);
                    }
                break;

                case 'input':
                    // Image submit buttons.
                    if ((missingAlt === true) || (nullAlt === true)) {
                        errors.inputImage.missingAlt.push(element);
                    } else {
                        errors.inputImage.generalAlt.push(element);
                    }
                break;

                case 'area':
                    // Area tags in a client-side image map.
                    if ((missingAlt === true) || (nullAlt === true)) {
                        errors.area.missingAlt.push(element);
                    } else {
                        errors.inputImage.generalAlt.push(element);
                    }
                break;

                default:
                    // No other tags defined.
                break;
            }//end switch
        }//end for

        return errors;
    },

    /**
     * Driver function for the null alt text tests.
     *
     * This takes the generic result given by the alt text testing functions
     * (located in WCAG 2.0 SC 1.1.1), and converts them into Section 508-specific
     * messages.
     *
     * @param {DOMNode} element The element to test.
     */
    addNullAltTextResults: function(top)
    {
        var errors = this.testNullAltText(top);

        for (var i = 0; i < errors.img.emptyAltInLink.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.img.emptyAltInLink[i], 'リンクの内容が img 要素のみですが、alt 属性が見つかりません。alt 属性値に入れた代替テキストによってリンクの目的を適切に説明する必要があります。 Img element is the only content of the link, but is missing alt text. The alt text should describe the purpose of the link.', 'Img.EmptyAltInLink');
        }

        for (var i = 0; i < errors.img.nullAltWithTitle.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.img.nullAltWithTitle[i], 'alt 属性値が空の img 要素は title 属性を持たないか、title 属性値が空である必要があります。 Img element with empty alt text must have absent or empty title attribute.', 'Img.NullAltWithTitle');
        }

        for (var i = 0; i < errors.img.ignored.length; i++) {
            HTMLCS.addMessage(HTMLCS.WARNING, errors.img.ignored[i], 'この img 要素は支援技術から無視されるようにマークアップされています。装飾画像などで alt 属性が空の場合が考えられます。空の alt 属性が意図したものか確認してください。 Img element is marked so that it is ignored by Assistive Technology.', 'Img.Ignored');
        }

        for (var i = 0; i < errors.img.missingAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.img.missingAlt[i], 'img 要素に alt 属性がありません。alt 属性を使用して適切な代替テキストを提供しましょう。 Img element missing an alt attribute. Use the alt attribute to specify a short text alternative.', 'Img.MissingAlt');
        }

        for (var i = 0; i < errors.img.generalAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, errors.img.generalAlt[i], '画像の代替テキストが画像の内容を正しく示しているか確認してください Ensure that the img element\'s alt text serves the same purpose and presents the same information as the image.', 'Img.GeneralAlt');
        }

        for (var i = 0; i < errors.inputImage.missingAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.inputImage.missingAlt[i], '送信 / 実行ボタンとして使用されている画像に alt 属性が見当たりません。alt 属性によって代替テキストを提供し、ボタンの機能を適切に説明する必要があります。 Image submit button missing an alt attribute. Specify a text alternative that describes the button\'s function, using the alt attribute.', 'InputImage.MissingAlt');
        }

        for (var i = 0; i < errors.inputImage.generalAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, errors.inputImage.generalAlt[i], '画像による送信 / 実行ボタンに付与された alt 属性値によってボタンの目的が適切に説明されているか確認してください Ensure that the image submit button\'s alt text identifies the purpose of the button.', 'InputImage.GeneralAlt');
        }

        for (var i = 0; i < errors.area.missingAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.area.missingAlt[i], 'イメージマップ内の area 要素に alt 属性が見当たりません。各 area 要素には alt 属性によって代替テキストを提供し、その領域の機能や目的を適切に説明する必要があります。 Area element in an image map missing an alt attribute. Each area element must have a text alternative that describes the function of the image map area.', 'Area.MissingAlt');
        }

        for (var i = 0; i < errors.area.generalAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, errors.area.generalAlt[i], 'area 要素の代替テキストがイメージマップ内の該当する選択可能領域の内容を正しく示しているか確認してください。 Ensure that the area element\'s text alternative serves the same purpose as the part of image map image it references.', 'Area.GeneralAlt');
        }
    },

    testMediaTextAlternatives: function(top)
    {
        var errors = {
            object: {
                missingBody: [],
                generalAlt: []
            },
            applet: {
                missingBody: [],
                missingAlt: [],
                generalAlt: []
            }
        };

        var elements = top.querySelectorAll('object');

        for (var el = 0; el < elements.length; el++) {
            var element  = elements[el];
            var nodeName = element.nodeName.toLowerCase();

            var childObject = element.querySelector('object');

            // If we have an object as our alternative, skip it. Pass the blame onto
            // the child.
            if (childObject === null) {
                var textAlt = HTMLCS.util.getElementTextContent(element, true);
                if (textAlt === '') {
                    errors.object.missingBody.push(element);
                } else {
                    errors.object.generalAlt.push(element);
                }
            }//end if
        }//end if

        var elements = top.querySelectorAll('applet');

        for (var el = 0; el < elements.length; el++) {
            // Test firstly for whether we have an object alternative.
            var childObject = element.querySelector('object');
            var hasError    = false;

            // If we have an object as our alternative, skip it. Pass the blame onto
            // the child. (This is a special case: those that don't understand APPLET
            // may understand OBJECT, but APPLET shouldn't be nested.)
            if (childObject === null) {
                var textAlt = HTMLCS.util.getElementTextContent(element, true);
                if (HTMLCS.util.isStringEmpty(textAlt) === true) {
                    errors.applet.missingBody.push(element);
                    hasError = true;
                }
            }//end if

            var altAttr = element.getAttribute('alt') || '';
            if (HTMLCS.util.isStringEmpty(altAttr) === true) {
                errors.applet.missingAlt.push(element);
                hasError = true;
            }

            if (hasError === false) {
                // No error? Remind of obligations about equivalence of alternatives.
                errors.applet.generalAlt.push(element);
            }
        }//end if

        return errors;
    },

    /**
     * Driver function for the media alternative (object/applet) tests.
     *
     * This takes the generic result given by the media alternative testing function
     * (located in WCAG 2.0 SC 1.1.1), and converts them into Section
     * 508-specific messages.
     *
     * @param {DOMNode} element The element to test.
     */
    addMediaAlternativesResults: function(top)
    {
        var errors = HTMLCS_WCAG2AAA_Sniffs_Principle1_Guideline1_1_1_1_1.testMediaTextAlternatives(top);

        for (var i = 0; i < errors.object.missingBody.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.object.missingBody[i], 'object 要素の内容として、代替テキストを記述する必要があります。object 要素に未対応の環境で利用されます。 Object elements must contain a text alternative after all other alternatives are exhausted.', 'Object.MissingBody');
        }

        for (var i = 0; i < errors.object.generalAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, errors.object.generalAlt[i], '非テキストコンテンツに対してそれと同じ目的を果たし同じ情報を提供する簡潔な（または適切であれば長い）代替テキストが提供されていることを確認してください。 Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.', 'Object.GeneralAlt');
        }

        for (var i = 0; i < errors.applet.missingBody.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.applet.missingBody[i], 'applet 要素の内容として、代替テキストを記述する必要があります。applet 要素に未対応の環境で利用されます。 Applet elements must contain a text alternative in the element\'s body, for browsers without support for the applet element.', 'Applet.MissingBody');
        }

        for (var i = 0; i < errors.applet.missingAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.ERROR, errors.applet.missingAlt[i], 'applet 要素には alt 属性によって代替テキストを提供する必要があります。applet 要素に未対応の環境で利用されます。 Applet elements must contain an alt attribute, to provide a text alternative to browsers supporting the element but are unable to load the applet.', 'Applet.MissingAlt');
        }

        for (var i = 0; i < errors.applet.generalAlt.length; i++) {
            HTMLCS.addMessage(HTMLCS.NOTICE, errors.applet.generalAlt[i], '非テキストコンテンツに対してそれと同じ目的を果たし同じ情報を提供する簡潔な（または適切であれば長い）代替テキストが提供されていることを確認してください。 Check that short (and if appropriate, long) text alternatives are available for non-text content that serve the same purpose and present the same information.', 'Applet.GeneralAlt');
        }
    }
};
