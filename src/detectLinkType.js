export const linkTypes = {
    tiktokMobile: {
        url: 'vm.tiktok.com',
        name: 'TikTok Mobile',
    },
    tiktokWeb: {
        url: 'tiktok.com',
        name: 'Tik Tok Web',
    },
    instagram: {
        url: 'instagram.com',
        name: 'Instagram',
    },
};

export const detectLinkType = link => {
    if (!link || typeof link !== 'string' || link.replace(/ /g, '') === '')
        return null;

    const { tiktokMobile, tiktokWeb, instagram } = linkTypes;

    if (link.includes(tiktokMobile.url)) return tiktokMobile.name;
    else if (link.includes(tiktokWeb.url)) return tiktokWeb.name;
    else if (link.includes(instagram.url)) return instagram.name;
    else return null;
};
