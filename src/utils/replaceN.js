export const replace_n = (str, ...ns) => str
    .replace(/%(\d+|\w)[a-z]?(!.+?!)?/g, (_, n) => ns[n - 1])
    .replace('%%', '%')