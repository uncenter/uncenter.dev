module.exports = (attributeMap) => {
    return Object.entries(attributeMap)
        .map(([attribute, value]) => {
            if (typeof value === undefined || value === "") return '';
            return `${attribute}="${value}"`;
        })
        .join(' ');
};