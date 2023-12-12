import Endpoint from "./Endpoint.js"
import Tournament from "./models/Tournament.js"
import { BaseQueryParams } from "./types.js"

const endpoint = new Endpoint("tournament")

const tournamentParams: BaseQueryParams = {
    conditions: ["[[startdate::>2023-09-27]]", "[[enddate::<2024-01-01]]"],
    query: ["startdate", "name", "enddate", "pagename"],
    limit: 2,
    wiki: ["dota2"],
}

const getLiquipediaUrl = (pagename: string, wiki: string) =>
    `https://liquipedia.com/${wiki}/${pagename}`

export const getTournaments = async () => {
    const liquipediaData = await endpoint.sendRequest(tournamentParams)

    const tournaments = liquipediaData.map(
        (data) =>
            new Tournament({
                endDate: data.enddate,
                game: data.wiki,
                liquipediaUrl: getLiquipediaUrl(data.pagename, data.wiki),
                name: data.name,
                startDate: data.startdate,
            })
    )

    return tournaments
}
