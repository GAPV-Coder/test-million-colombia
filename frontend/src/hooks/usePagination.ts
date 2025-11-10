import { useState, useCallback } from 'react';
import { DEFAULT_PAGE_SIZE } from '@/config/constants';

interface UsePaginationOptions {
    initialPage?: number;
    initialPageSize?: number;
    total?: number;
}

export const usePagination = (options: UsePaginationOptions = {}) => {
    const {
        initialPage = 1,
        initialPageSize = DEFAULT_PAGE_SIZE,
        total = 0,
    } = options;

    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const totalPages = Math.ceil(total / pageSize);

    const goToPage = useCallback((newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    }, [totalPages]);

    const nextPage = useCallback(() => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    }, [page, totalPages]);

    const previousPage = useCallback(() => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    }, [page]);

    const changePageSize = useCallback((newSize: number) => {
        setPageSize(newSize);
        setPage(1); // Restablecer a la primera página al cambiar el tamaño de página
    }, []);

    const reset = useCallback(() => {
        setPage(initialPage);
        setPageSize(initialPageSize);
    }, [initialPage, initialPageSize]);

    return {
        page,
        pageSize,
        totalPages,
        goToPage,
        nextPage,
        previousPage,
        changePageSize,
        reset,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
    };
};