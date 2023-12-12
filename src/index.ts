import { getUpcomingMatches } from "./jobs/jobs.js"
/*
import Endpoint from "./Endpoint.js"

const zodiosTournaments = new Endpoint("tournament")

const test = await zodiosTournaments.sendRequest({
    conditions: ["[[startdate::>2023-09-27]]", "[[enddate::<2024-01-01]]"],
    query: ["startdate", "name", "enddate", "pagename"],
    limit: 2,
    wiki: ["dota2"],
})

console.log(test)
*/

const test = await getUpcomingMatches()

console.log(test)
