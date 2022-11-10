import axios from 'axios'
import JSONbig from 'json-bigint'

export async function leaderboarSvc(modo = '1vs1', searchValue = '') {
    try {
        const url = `https://decks.aoe3explorer.com/rest/v1/${modo}`
        const config = {
            headers: {
                'apikey': process.env.REACT_APP_LEADER_API_KEY,
            },
            params: {},
            transformResponse: [data => data]
        }
        config.params['select'] = `*`
        config.params['order'] = `rank`

        if (searchValue) {
            config.params[`name`] = `ilike.%${searchValue}%`
        }

        const resp = await axios.get(url, config);

        if (!resp.data) return []

        const players = JSONbig.parse(resp.data);

        return players;
    } catch (error) {
        console.log(error);
        return [];
    }
}