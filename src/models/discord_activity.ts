import mongoose, { Document, Types } from 'mongoose';

const Schema = mongoose.Schema;

export type DiscordActivityDocument = Document & {
    userId: Types.ObjectId;
    discordId: string;
    isDaily: boolean;
    streak: number;
    lastWorkAt: number;
};

const discordActivitySchema = new Schema<DiscordActivityDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    discordId: String,
    isDaily: { type: Boolean, default: false },
    streak: { type: Number, default: 0 },
    lastWorkAt: { type: Number, default: 0 },
});

const DiscordActivity = mongoose.model<DiscordActivityDocument>(
    'DiscordActivity',
    discordActivitySchema,
);

export default DiscordActivity;
