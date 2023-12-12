import { Schema, model } from "mongoose"

interface Tournament {
    endDate: Date
    game: string
    liquipediaUrl: string
    name: string
    startDate: Date
}

const schema = new Schema<Tournament>({
    endDate: { type: Date, required: true },
    game: { type: String, required: true },
    liquipediaUrl: { type: String, required: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
})

const TournamentModel = model<Tournament>("Tournament", schema)

export default TournamentModel
