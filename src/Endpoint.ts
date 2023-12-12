import { requestUpcomingMatches } from "./liquipediaClient.js"
import { BaseQueryParams } from "./types.js"

export type EndpointName = "tournament" | "match"

class Endpoint {
    // Liquipedia rate limit (per endpoint) is 1 request per minute
    // Removing rate limitation requires manual action, need to avoid hitting it
    private cooldown: number = 60000
    /*
    Date.now() as initial value to prevent the following scenario:
    1. sendRequest()
    2. App crashes
    3. Restarts
    4. sendRequest()
    Less than 60 seconds between steps 1 and 4 => rate limit will be hit
    */
    private timeOfLastRequest: number = Date.now()
    private name: EndpointName

    constructor(name: EndpointName) {
        this.name = name
    }

    async sendRequest(queryParams: BaseQueryParams) {
        await this.handleTimeout()
        let data

        //const data = await getData(this.name, queryParams)
        if (this.name === "match") {
            data = await requestUpcomingMatches(queryParams)
        }

        this.timeOfLastRequest = Date.now()

        //return data
        return data || []
    }

    private async handleTimeout() {
        const timeoutDuration = Math.max(0, this.timeSinceLastRequest())

        await new Promise((resolve) => setTimeout(resolve, timeoutDuration))
    }

    private timeSinceLastRequest = () =>
        this.timeOfLastRequest + this.cooldown - new Date().getTime()
}

export default Endpoint
