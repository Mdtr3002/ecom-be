import { FileCompressionStrategy } from "./strategies";
import { Multer } from "multer";

class FileCompressor {
    private strategy: FileCompressionStrategy;

    constructor(s: FileCompressionStrategy) {
        this.strategy = s;
    }

    public setStrategy(s: FileCompressionStrategy) {
        this.strategy = s;
    }

    async compress(file: Express.Multer.File): Promise<Buffer> {
        return await this.strategy.compress(file);
    }
}