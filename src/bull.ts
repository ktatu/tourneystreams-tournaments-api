import { Job, Queue, Worker } from "bullmq"
import { getUpcomingMatches } from "./jobs/jobs.js"

const matchQueue = new Queue("match")

await matchQueue.add("upcoming_matches", {}, { repeat: { every: 86400000 } })

const matchWorker = new Worker(
    "match",
    async (job: Job) => {
        if (job.name === "upcoming_matches") {
            await getUpcomingMatches()
        }
    },
    {
        limiter: {
            duration: 60000,
            max: 1,
        },
    }
)

/*
getUpcomingMatches.on("completed", (job: Job, returnValue) => {

})

const updateMatchInformation = new Worker("match", async (job: Job) => {}, { limiter })



// checking whats the score of live match
// if 
const updateLiveMatch = new Worker("match", async (job: Job) => {


    await job.
}, { limiter })

// concluded match should be deleted from the match database
updateLiveMatch.on("completed", async (job: Job) => {

})
*/
