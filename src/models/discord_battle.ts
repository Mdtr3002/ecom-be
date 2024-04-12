import mongoose, { Document, Types } from 'mongoose';

const Schema = mongoose.Schema;

export type DiscordBattleDocument = Document & {
    player1DiscordId: string;
    player2DiscordId: string;
    point: number;
    winner: string;
    detailData: string;
    createdAt: number;
};

const discordBattleSchema = new Schema<DiscordBattleDocument>({
    player1DiscordId: String,
    player2DiscordId: String,
    point: Number,
    winner: String,
    detailData: String,
    createdAt: String,
});

const DiscordBattle = mongoose.model<DiscordBattleDocument>(
    'DiscordBattle',
    discordBattleSchema,
);

export default DiscordBattle;
