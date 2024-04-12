export interface UploadValidatorStrategy {
    validate(files: Express.Multer.File[]): void;
}

export class NoUploadValidation implements UploadValidatorStrategy {
    validate(files: Express.Multer.File[]): void {
        console.log("empty validation");
    }
}

export class UploadIdeaDescriptionValidation implements UploadValidatorStrategy {
    validate(files: Express.Multer.File[]): void {
        if (!files || files.length != 1) {
            throw new Error(
                `You must upload exactly one file for this operation`
            );
        }
        if (files[0].mimetype != "application/pdf") {
            throw new Error(`The specified file must be of type 'pdf'`)
        }
    }
}