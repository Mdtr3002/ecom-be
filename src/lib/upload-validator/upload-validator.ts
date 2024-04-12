import { UploadValidatorStrategy } from "./upload-validator-strategies";

export class UploadValidator {
    strategy: UploadValidatorStrategy;

    constructor(s: UploadValidatorStrategy) {
        this.strategy = s;
    }

    setStrategy(s: UploadValidatorStrategy) {
        this.strategy = s;
    }

    /**
     * Validates the files given according to the strategies
     * Will throw an error if validation fails
     */
    validate(files: Express.Multer.File[]) {
        this.strategy.validate(files);
    }
}