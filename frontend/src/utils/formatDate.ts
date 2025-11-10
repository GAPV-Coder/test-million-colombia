import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: Date | string, formatStr: string = 'dd/MM/yyyy'): string => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr, { locale: es });
};

export const formatDateTime = (date: Date | string): string => {
    return formatDate(date, 'dd/MM/yyyy HH:mm');
};

export const formatRelativeTime = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(dateObj, { addSuffix: true, locale: es });
};

export const formatYear = (year: number): string => {
    return year.toString();
};