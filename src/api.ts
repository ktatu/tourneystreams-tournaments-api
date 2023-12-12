import { apiBuilder, makeParameters } from "@zodios/core"
import z from "zod"

const defaultQueryParameters = makeParameters([
    {
        name: "conditions",
        description: "Filters",
        type: "Query",
        schema: z.array(z.string()),
    },
    {
        name: "wiki",
        description: "Which wikis to query",
        type: "Query",
        schema: z.array(z.string()),
    },
    {
        name: "query",
        description: "The datapoints being queried",
        type: "Query",
        schema: z.array(z.string()),
    },
    {
        name: "limit",
        description: "Number of results",
        type: "Query",
        schema: z.number().max(1000),
    },
])

const tournamentResponseSchema = z.object({
    warning: z.array(z.string()).optional(),
    error: z.array(z.string()).optional(),
    result: z.array(
        z.object({
            enddate: z.string(),
            wiki: z.string(),
            name: z.string(),
            startdate: z.string(),
            pagename: z.string(),
        })
    ),
})

export const tournamentApi = apiBuilder({
    method: "get",
    path: "/tournament",
    alias: "getTournaments",
    description: "Get all upcoming tournaments",
    parameters: defaultQueryParameters,
    response: tournamentResponseSchema,
}).build()

const upcomingMatchResponseSchema = z.object({
    warning: z.array(z.string()).optional(),
    error: z.array(z.string()).optional(),
    result: z.array(
        z.object({
            date: z.string(),
            pagename: z.string(),
            tournament: z.string(),
            wiki: z.string(),
        })
    ),
})

export const matchApi = apiBuilder({
    method: "get",
    path: "/match",
    alias: "getUpcomingMatches",
    parameters: defaultQueryParameters,
    response: upcomingMatchResponseSchema,
}).build()
