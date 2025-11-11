import { formatCurrency, parseCurrency, formatCompactCurrency } from '@/utils/formatCurrency';

describe('formatCurrency', () => {
    it('formats currency correctly for Colombian pesos', () => {
        const result = formatCurrency(1000000);
        // Normaliza non-breaking space a regular para el match
        expect(result.replace(/\u00A0/g, ' ')).toBe('$ 1.000.000');
    });

    it('formats zero correctly', () => {
        const result = formatCurrency(0);
        expect(result.replace(/\u00A0/g, ' ')).toBe('$ 0');
    });
});

describe('parseCurrency', () => {
    it('parses currency string to number', () => {
        expect(parseCurrency('$ 1.000.000')).toBe(1000000);
    });
});

describe('formatCompactCurrency', () => {
    it('formats millions correctly', () => {
        expect(formatCompactCurrency(1000000)).toBe('$1.0M');
    });
});