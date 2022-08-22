export async function getCivTechtree(civName = '') {
    const { techtreedata } = await import(`../data/uitechtree/techtreedata_${civName.toLocaleLowerCase()}.xml.json`)
    
    return techtreedata.group.reduce((obj, g) => {
        g?.proto && (Array.isArray(g?.proto) ? g?.proto : [g?.proto]).forEach((proto) => {
            obj.items.push({ ...proto, type: 'proto' })
            if (+proto['@col'] > obj.maxCol) {
                obj.maxCol = +proto['@col']
            }
        })

        g?.tech && (Array.isArray(g?.tech) ? g?.tech : [g?.tech]).forEach((tech) => {
            obj.items.push({ ...tech, type: 'tech' })
            if (+tech['@col'] > obj.maxCol) {
                obj.maxCol = +tech['@col']
            }
        })

        g?.label && (Array.isArray(g?.label) ? g?.label : [g?.label]).forEach((label) => {
            obj.items.push({ ...label, type: 'label' })
            if (+label['@col'] > obj.maxCol) {
                obj.maxCol = +label['@col']
            }
        })

        return obj
    }, { maxCol: 0, items: [] })
}