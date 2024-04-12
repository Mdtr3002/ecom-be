import mongoose, { Types, Schema } from "mongoose";

/**
 * Storing attachments
 */

export type AttachmentDocument = Document & {
    originalName: string;
    refName: string;
    mimetype: string;
};

const attachmentSchema = new Schema<AttachmentDocument>({
    originalName: String,
    refName: String,
    mimetype: String,
});

const AttachmentModel = mongoose.model<AttachmentDocument>(
    "attachments",
    attachmentSchema
);
export default AttachmentModel;