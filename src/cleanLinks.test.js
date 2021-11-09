const { cleanLinks } = require('./cleanLinks');
const {
    invalidLinkMessage,
    linkTypeMessage,
    linkCleanedMessage,
    linkAlreadyCleanMessage,
} = require('./constants/messages');

describe(cleanLinks.name, () => {
    it('handles null input', () => {
        const { result, cleaned, message, count } = cleanLinks(null);
        expect(result).toBe('');
        expect(cleaned).toBe(false);
        expect(message).toBe(invalidLinkMessage);
        expect(count).toBe(0);
    });

    it('handles undefined input', () => {
        const { result, cleaned, message, count } = cleanLinks(undefined);
        expect(result).toBe('');
        expect(cleaned).toBe(false);
        expect(message).toBe(invalidLinkMessage);
        expect(count).toBe(0);
    });

    it('handles non string input', () => {
        const input = 123;
        const { result, cleaned, message, count } = cleanLinks(input);
        expect(result).toBe('');
        expect(cleaned).toBe(false);
        expect(message).toBe(invalidLinkMessage);
        expect(count).toBe(0);
    });

    it('handles empty links', () => {
        const { result, cleaned, message, count } = cleanLinks('');
        expect(result).toBe('');
        expect(cleaned).toBe(false);
        expect(message).toBe(invalidLinkMessage);
        expect(count).toBe(0);
    });

    it('handles empty links with whitespace', () => {
        const input = '    ';
        const { result, cleaned, message, count } = cleanLinks(input);
        expect(result).toBe(input);
        expect(cleaned).toBe(false);
        expect(message).toBe(invalidLinkMessage);
        expect(count).toBe(0);
    });

    it('handles invalid links beginning with www', () => {
        const input = 'wwwtiktok.com';
        const { result, cleaned, message, count } = cleanLinks(input);
        expect(result).toBe(input);
        expect(cleaned).toBe(false);
        expect(message).toBe(invalidLinkMessage);
        expect(count).toBe(0);
    });

    it('does not clean unsupported links', () => {
        const input = 'https://facebook.com';
        const { result, cleaned, message, count } = cleanLinks(input);
        expect(result).toBe(input);
        expect(cleaned).toBe(false);
        expect(message).toBe(linkTypeMessage);
        expect(count).toBe(0);
    });

    it('handles valid links beginning with www', () => {
        const input = 'www.tiktok.com';
        const { result, cleaned, message, count } = cleanLinks(input);
        expect(result).toBe(input);
        expect(cleaned).toBe(true);
        expect(message).toBe(linkAlreadyCleanMessage);
        expect(count).toBe(0);
    });

    it('handles links beginning with http', () => {
        const input = 'https://tiktok.com';
        const { result, cleaned, message, count } = cleanLinks(input);
        expect(result).toBe(input);
        expect(cleaned).toBe(true);
        expect(message).toBe(linkAlreadyCleanMessage);
        expect(count).toBe(0);
    });

    it('handles links beginning with https', () => {
        const input = 'https://tiktok.com';
        const { result, cleaned, message, count } = cleanLinks(input);
        expect(result).toBe(input);
        expect(cleaned).toBe(true);
        expect(message).toBe(linkAlreadyCleanMessage);
        expect(count).toBe(0);
    });

    it('cleans dirty tiktok links', () => {
        const clean = 'https://tiktok.com/video';
        const dirty = '?test=hello';
        const input = clean + dirty;
        const { result, cleaned, message, count } = cleanLinks(input);
        expect(result).toBe(clean);
        expect(cleaned).toBe(true);
        expect(message).toBe(linkCleanedMessage);
        expect(count).toBe(dirty.length);
    });

    it('cleans dirty instagram links', () => {
        const clean = 'https://instagram.com/video';
        const dirty = '?test=hello';
        const input = clean + dirty;
        const { result, cleaned, message, count } = cleanLinks(input);
        expect(result).toBe(clean);
        expect(cleaned).toBe(true);
        expect(message).toBe(linkCleanedMessage);
        expect(count).toBe(dirty.length);
    });

    it(`doesn't clean already clean tiktok links`, () => {
        const input = 'https://tiktok.com/video';
        const { result, cleaned, message, count } = cleanLinks(input);
        expect(result).toBe(input);
        expect(cleaned).toBe(true);
        expect(message).toBe(linkAlreadyCleanMessage);
        expect(count).toBe(0);
    });

    it(`doesn't clean already clean instagram links`, () => {
        const input = 'https://instagram.com/video';

        const { result, cleaned, message, count } = cleanLinks(input);

        expect(result).toBe(input);
        expect(cleaned).toBe(true);
        expect(message).toBe(linkAlreadyCleanMessage);
        expect(count).toBe(0);
    });
});
