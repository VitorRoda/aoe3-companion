export async function getCivs() {
    const data = await import('../data/civs.json')
    return data.civ.filter((item, index) => +item?.visible !== 0)

}