import { detectLinkType, linkTypes } from './detectLinkType';

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

    it('handles valid but unsupported link types', () => {
        const result = detectLinkType('facebook.com');
        expect(result).toBe(null);
    });

    it('detects mobile tiktok links', () => {
        const result = detectLinkType('https://vm.tiktok.com/randomstuff');
        expect(result).toBe(linkTypes.tiktokMobile.name);
    });

    it('detects web tiktok links', () => {
        const result = detectLinkType('https://tiktok.com/randomstuff');
        expect(result).toBe(linkTypes.tiktokWeb.name);
    });

    it('detects instagram links', () => {
        const result = detectLinkType('https://instagram.com/randomstuff');
        expect(result).toBe(linkTypes.instagram.name);
    });
});
