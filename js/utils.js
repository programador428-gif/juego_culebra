const $ = (selector) => document.querySelector(selector);
const showText = (selector, text) => {
    const element = $(selector);
    if (element) {
        element.textContent = text;
    }
};