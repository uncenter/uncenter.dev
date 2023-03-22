// from blakeembrey/change-case
// https://github.com/blakeembrey/change-case/blob/master/packages/title-case/src/index.ts
// license: MIT

const SMALL_WORDS =
    /\b(?:an?d?|a[st]|because|but|by|en|for|i[fn]|neither|nor|o[fnr]|only|over|per|so|some|tha[tn]|the|to|up|upon|vs?\.?|versus|via|when|with|without|yet)\b/i;
const TOKENS = /[^\s:–—-]+|./g;
const WHITESPACE = /\s/;
const IS_MANUAL_CASE = /.(?=[A-Z]|\..)/;
const ALPHANUMERIC_PATTERN = /[A-Za-z0-9\u00C0-\u00FF]/;

function titleCase(input) {
    var result = "";
    var m;
    while ((m = TOKENS.exec(input)) !== null) {
        var token = m[0], index = m.index;
        if (!IS_MANUAL_CASE.test(token) &&
            (!SMALL_WORDS.test(token) ||
                index === 0 ||
                index + token.length === input.length) &&
            (input.charAt(index + token.length) !== ":" ||
                WHITESPACE.test(input.charAt(index + token.length + 1)))) {
            result += token.replace(ALPHANUMERIC_PATTERN, function (m) {
                return m.toUpperCase();
            });
            continue;
        }
        result += token;
    }
    return result;
}

module.exports = {
    titleCase,
};