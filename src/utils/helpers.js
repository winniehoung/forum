
// clone function for deep copy of nested objects; don't use with Date objects
export const clone = (o) => JSON.parse(JSON.stringify(o));

export const capitalize = (str) => {
    if (!str) return '';
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
};