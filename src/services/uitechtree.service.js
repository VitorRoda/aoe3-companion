export async function getCivTechtree(civName = '') {
    const { techtreedata } = await import(`../data/uitechtree/techtreedata_${civName.toLocaleLowerCase()}.xml.json`)
    return techtreedata.group.map(g => ({
        ...g,
        ...(g?.proto && {
            proto: Object.values((Array.isArray(g?.proto) ? g?.proto : [g?.proto]).reduce((obj, item) => {
                const row = item['@row']

                if (!obj[row])
                    obj[row] = [item]
                else
                    obj[row].push(item)
                return obj
            }, {}))
        })
    }))
}