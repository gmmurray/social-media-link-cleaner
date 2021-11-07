export const cleanLinks = link => {
    if (!link || typeof link !== 'string')
        return getResult('', false, invalidLinkMessage);

    const spacesRemovedLink = link.replace(/ /g, '');
    if (spacesRemovedLink === '')
        return getResult(link, false, invalidLinkMessage);

    return {
        result: '',
        cleaned: false,
    };
};

const getResult = (result, cleaned, message) => ({
    result,
    cleaned,
    message,
});
const invalidLinkMessage = 'invalid link provided';
