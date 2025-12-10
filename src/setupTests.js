import '@testing-library/jest-dom/vitest'

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
    }),
});

// Mock IntersectionObserver
class IntersectionObserver {
    constructor(callback, options) {
        this.callback = callback;
        this.options = options;
    }
    observe(element) {
        // Simulate intersection immediately for testing purposes
        this.callback([{ isIntersecting: true, target: element }]);
    }
    unobserve() {
        return null;
    }
    disconnect() {
        return null;
    }
}

global.IntersectionObserver = IntersectionObserver;
