
// clone function for deep copy of nested objects; don't use with Date objects
export const clone=(o)=>JSON.parse(JSON.stringify(o));