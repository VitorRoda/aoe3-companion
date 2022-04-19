export const replace_n = (str, ...ns) => String(str)
    .replace(/%(\d+|\w)[a-z]?(!.+?!)?/g, (_, n) => ns[n - 1])
    .replace('%%', '%')