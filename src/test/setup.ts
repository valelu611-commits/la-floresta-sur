import "@testing-library/jest-dom/vitest";

// jsdom no implementa scroll: el agente y el layout lo usan al montar.
Element.prototype.scrollIntoView = () => {};
window.scrollTo = () => {};
