export const formatCurrency = (value: number, locale: string = 'es-CO'): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const parseCurrency = (value: string): number => {
    const cleaned = value.replace(/[^\d]/g, '');
    return parseInt(cleaned, 10) || 0;
};

export const formatCompactCurrency = (value: number, locale: string = 'es-CO'): string => {
    if (value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
        return `$${(value / 1_000).toFixed(0)}K`;
    }
    return formatCurrency(value, locale);
};