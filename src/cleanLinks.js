import { detectLinkType, linkTypes } from './detectLinkType';
import {
    invalidLinkMessage,
    linkAlreadyCleanMessage,
    linkCleanedMessage,
    linkTypeMessage,
} from './constants/messages';

const http = 'http://';
const https = 'https://';
const www = 'www';

export const cleanLinks = link => {
    if (!link || typeof link !== 'string')
        return createResult('', false, invalidLinkMessage);

    const spacesRemovedLink = link.replace(/ /g, '');
    if (spacesRemovedLink === '')
        return createResult(link, false, invalidLinkMessage);

    // keep track of our position in the link
    let cursor = 0;

    // move past http:// or https://
    if (link.substring(0, https.length) === https) cursor = https.length;
    else if (link.substring(0, http.length) === http) cursor = http.length;

    // move past sub-domain
    if (link.substring(cursor, cursor + www.length) === www) {
        cursor += www.length;
        if (link[cursor] !== '.')
            return createResult(link, false, invalidLinkMessage);
    }

    // link is probably valid, now we check what kind of link it is
    const linkType = detectLinkType(link);
    if (linkType === null) return createResult(link, false, linkTypeMessage);

    // mobile tik tok links are actually already cleaned, nothing to do
    if (linkType === linkTypes.tiktokMobile.name)
        return createResult(link, true, linkAlreadyCleanMessage);

    // the stuff we want to remove is after the '?'. check that it exists first
    if (link.includes('?')) {
        cursor = link.indexOf('?');
        const partRemoved = link.substring(cursor);
        return createResult(
            link.substring(0, cursor),
            true,
            linkCleanedMessage,
            partRemoved.length,
        );
    } else {
        // if it doesn't exist, link is considered clean
        return createResult(link, true, linkAlreadyCleanMessage);
    }
};

const createResult = (result, cleaned, message, count = 0) => ({
    result,
    cleaned,
    message,
    count,
});
