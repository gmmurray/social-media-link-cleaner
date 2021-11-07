const { cleanLinks } = require('./cleanLinks');

const invalidMessage = 'invalid link provided';

describe(cleanLinks.name, () => {
    it('handles null input', () => {
        const { result, cleaned, message } = cleanLinks(null);
        expect(result).toBe('');
        expect(cleaned).toBe(false);
        expect(message).toBe(invalidMessage);
    });

    it('handles undefined input', () => {
        const { result, cleaned, message } = cleanLinks(undefined);
        expect(result).toBe('');
        expect(cleaned).toBe(false);
        expect(message).toBe(invalidMessage);
    });

    it('handles non string input', () => {
        const input = 123;
        const { result, cleaned, message } = cleanLinks(input);
        expect(result).toBe('');
        expect(cleaned).toBe(false);
        expect(message).toBe(invalidMessage);
    });

    it('handles empty links', () => {
        const { result, cleaned, message } = cleanLinks('');
        expect(result).toBe('');
        expect(cleaned).toBe(false);
        expect(message).toBe(invalidMessage);
    });

    it('handles empty links with whitespace', () => {
        const input = '    ';
        const { result, cleaned, message } = cleanLinks(input);
        expect(result).toBe(input);
        expect(cleaned).toBe(false);
        expect(message).toBe(invalidMessage);
    });
});
