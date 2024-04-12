import mongoose, { Types, Schema } from "mongoose";

export enum ContestRegStatus {
    REGISTERED = "REGISTERED",
    CANCELLED = "CANCELLED"
}

export type GICContestRegDocument = Document & {
    registeredBy: Types.ObjectId
    registeredAt: number
    status: ContestRegStatus
    ideaDescription: Types.ObjectId
    ideaName: string
    members: { // first person is leader
        name: string
        email: string
        school: string
        major: string
        confirmed: boolean
    }[]
}

const GICContestRegSchema = new Schema<GICContestRegDocument>({
    registeredBy: { type: Schema.Types.ObjectId, ref: "User" },
    registeredAt: Number,
    status: { type: String, enum: ContestRegStatus },
    ideaDescription: { type: Schema.Types.ObjectId, ref: "attachments" },
    ideaName: String,
    members: [{
        name: String,
        email: String,
        school: String,
        major: String,
        confirmed: Boolean
    }]
})

const GICContestRegModel = mongoose.model<GICContestRegDocument>("gic_contest_regs", GICContestRegSchema)
export default GICContestRegModel
