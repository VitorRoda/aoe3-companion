export async function getCivTechtree(civName = '' ) {
    const { techtreedata } = await import(`../data/uitechtree/techtreedata_${civName.toLocaleLowerCase()}.xml.json`)
    return techtreedata
}