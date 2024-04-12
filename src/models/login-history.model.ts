import mongoose, { Document, Schema, Types } from "mongoose"
import { WhitelistDomain } from "../config"

export type LoginHistoryDocument = Document & {
    userId: Types.ObjectId
    email: string
    loginAt: number
    domain: WhitelistDomain
}

const loginHistorySchema = new Schema<LoginHistoryDocument>({
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    email: String,
    loginAt: Number,
    domain: { type: String, enum: WhitelistDomain }
})

const LoginHistoryModel = mongoose.model<LoginHistoryDocument>("logins", loginHistorySchema)
export default LoginHistoryModel
