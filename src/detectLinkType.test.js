import { detectLinkType } from './detectLinkType';

describe(detectLinkType.name, () => {
    it('handles null input', () => {
        const result = detectLinkType(null);
        expect(result).toBe(null);
    });

    it('handles undefined input', () => {
        const result = detectLinkType(undefined);
        expect(result).toBe(null);
    });

    it('handles non-string input', () => {
        const result = detectLinkType(123);
        expect(result).toBe(null);
    });

    it('handles empty input', () => {
        const result = detectLinkType('');
        expect(result).toBe(null);
    });

    it('handles empty whitespace input', () => {
        const result = detectLinkType('  ');
        expect(result).toBe(null);
    });
});
