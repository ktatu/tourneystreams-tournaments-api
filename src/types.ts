export type Wiki = "dota2" | "apexlegends" | "counterstrike"

export interface BaseQueryParams {
    wiki: Array<Wiki>
    conditions: Array<string>
    query: Array<string>
    limit: number
}

export interface UpcomingMatchParams extends BaseQueryParams {
    rawstreams: boolean
    streamurls: boolean
}

// "Liquipedia" in interface name => shape matches liquipedia api

export interface LiquipediaTournament {
    enddate: string
    name: string
    pagename: string
    startdate: string
    wiki: Wiki
}
