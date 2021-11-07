export const detectLinkType = link => {
    if (!link || typeof link !== 'string' || link.replace(/ /g, '') === '')
        return null;
};
