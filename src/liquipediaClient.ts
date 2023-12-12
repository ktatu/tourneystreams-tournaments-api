import { Zodios } from "@zodios/core"
import { EndpointName } from "./Endpoint.js"
import { matchApi, tournamentApi } from "./api.js"
import { buildQueryString } from "./buildQueryString.js"
import { LIQUIPEDIA_API_KEY } from "./config.js"
import { BaseQueryParams } from "./types.js"

const client = new Zodios("https://api.liquipedia.net/api/v3", [...matchApi, ...tournamentApi], {
    axiosConfig: {
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip",
            Authorization: LIQUIPEDIA_API_KEY,
        },
        timeout: 5000,
        paramsSerializer: {
            serialize: (params) => buildQueryString(params),
        },
    },
})

interface LiquipediaResponse {
    result: Array<unknown>
    error?: Array<string>
    warning?: Array<string>
}

const logResponse = (res: LiquipediaResponse) => {
    if (res?.error) {
        console.log("ERROR IN LIQUIPEDIA RESPONSE")
        console.log(res.error)
    }

    if (res?.warning) {
        console.log("WARNING IN LIQUIPEDIA RESPONSE")
        console.log(res.warning)
    }
}

export const getData = async (endpointName: EndpointName, queryParams: BaseQueryParams) => {
    if (endpointName === "tournament") {
        const res = await client.getTournaments({ queries: queryParams })

        logResponse(res)
        return res.result
    } else if (endpointName === "match") {
        const res = await client.getUpcomingMatches({ queries: queryParams })

        logResponse(res)
        return res.result
    }

    //return res.result
    return []
}

export const requestUpcomingMatches = async (queryParams: BaseQueryParams) => {
    const res = await client.getUpcomingMatches({ queries: queryParams })

    logResponse(res)
    return res.result
}

/*
export const getData = async (endpointName: EndpointName, queryParams: QueryParameters) => {
    let res: LiquipediaResponse = { result: [] }

    if (endpointName === "tournament") {
        res = await client.getTournaments({ queries: queryParams })

    }

    if (res.error) {
        console.log("ERROR IN LIQUIPEDIA RESPONSE")
        console.log(res.error)
    }

    if (res.warning) {
        console.log("WARNING IN LIQUIPEDIA RESPONSE")
        console.log(res.warning)
    }

    return res.result
}*/

export default client.getTournaments
