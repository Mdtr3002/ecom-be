import mongoose, { Document, Schema, Types } from "mongoose";

export enum GICVoteStatus {
    CANCELLED = "CANCELLED",
    ACTIVE = "ACTIVE",
}

export type GICVoteDocument = Document & {
    userId: Types.ObjectId
    ideaId: Types.ObjectId
    votedAt: number
    status: GICVoteStatus
}

const gicVoteSchema = new Schema<GICVoteDocument>({
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    ideaId: { type: Schema.Types.ObjectId, ref: "gic_contest_regs" },
    votedAt: Number,
    status: { type: String, enum: GICVoteStatus }
})

const GICVoteModel = mongoose.model<GICVoteDocument>("gic_votes", gicVoteSchema)
export default GICVoteModel
