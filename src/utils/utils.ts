export const objFilter = (obj: object, predicate: any) => 
    Object.fromEntries(Object.entries(obj).filter(predicate))