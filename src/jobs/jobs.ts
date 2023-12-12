import Endpoint from "../Endpoint.js"
import Match from "../models/Match.js"
import { UpcomingMatchParams } from "../types.js"

const matchEndpoint = new Endpoint("match")

export const getUpcomingMatches = async () => {
    const params: UpcomingMatchParams = {
        conditions: [getEarliestDate(), getLastDate()],
        query: ["bestof", "date", "match2opponents", "stream", "tournament"],
        limit: 2,
        wiki: ["dota2", "counterstrike"],
        rawstreams: true,
        streamurls: true,
    }

    const liquipediaData = await matchEndpoint.sendRequest(params)

    const matches = liquipediaData.map(
        (data) =>
            new Match({
                date: data.date,
                game: data.wiki,
                liquipediaUrl: getLiquipediaUrl(data.pagename, data.wiki),
                tournament: data.tournament,
            })
    )

    return matches
}

const getLiquipediaUrl = (pagename: string, wiki: string) =>
    `https://liquipedia.com/${wiki}/${pagename}`

const getEarliestDate = () => {
    const earliestTimestamp = Date.now() + 172800000 // 48 hours

    return `[[date::>${getDateYYMMDD(new Date(earliestTimestamp))}]]`
}

const getLastDate = () => {
    const lastTimestamp = Date.now() + 266400000 // 72 hours

    return `[[date::<${getDateYYMMDD(new Date(lastTimestamp))}]]`
}

const getDateYYMMDD = (date: Date) =>
    `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`
