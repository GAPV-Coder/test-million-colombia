import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
    })),
    useSearchParams: jest.fn(() => ({
        get: jest.fn(),
    })),
    usePathname: jest.fn(() => ''),
}));

// Mock next/link
jest.mock('next/link', () => {
    return {
        __esModule: true,
        default: ({ children, href }) => <a href={href}>{children}</a>,
    };
});

// Mock next/image
jest.mock('next/image', () => {
    return {
        __esModule: true,
        default: ({ src, alt, ...props }) => <img src={src} alt={alt} {...props} />,
    };
});

// Mock localStorage
global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};

global.console = {
    ...console,
    log: jest.fn(),
    error: jest.fn(),
};

// Mock matchMedia
window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
}));