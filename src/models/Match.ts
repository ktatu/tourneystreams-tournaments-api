import { Schema, model } from "mongoose"

interface IMatch {
    date: Date
    game: string
    liquipediaTier: string
    liquipediaUrl: string
    tournament: string
}

const schema = new Schema<IMatch>({
    date: { type: Date, required: true },
    game: { type: String, required: true },
    liquipediaTier: { type: String, required: true },
    liquipediaUrl: { type: String, required: true },
    tournament: { type: String, required: true },
})

const Match = model<IMatch>("Match", schema)

export default Match
