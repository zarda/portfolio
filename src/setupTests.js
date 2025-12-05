import '@testing-library/jest-dom/vitest'

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
