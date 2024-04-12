import mongoose, { Document, Types } from 'mongoose';

const Schema = mongoose.Schema;

export type UserRanking = {
    userId: Types.ObjectId;
    discordId: string;
    name: string;
    point: string;
};

export type GameType = 'MATH_QUIZ';

export type LeaderboardDocument = Document & {
    ranking: UserRanking[];
    gameType: GameType;
    createdAt: number;
};

const leaderboardSchema = new Schema<LeaderboardDocument>({
    createdAt: Number,
    gameType: String,
    ranking: [
        {
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
            discordId: String,
            name: String,
            point: String,
        },
    ],
});

const Leaderboard = mongoose.model<LeaderboardDocument>(
    'Leaderboard',
    leaderboardSchema,
);

export default Leaderboard;
