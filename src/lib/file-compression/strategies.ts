import sharp from "sharp";

export interface FileCompressionStrategy {
    compress(file: Express.Multer.File): Promise<Buffer>;
}

export class NoFileCompression implements FileCompressionStrategy {
    config: {
        // no config
    };

    async compress(file: Express.Multer.File): Promise<Buffer> {
        return file.buffer;
    }
}

export class LowFileCompression implements FileCompressionStrategy {
    config = {
        webp: { quality: 75 },
        jpeg: { quality: 75 },
        png: { quality: 75, compressionLevel: 3 },
    };

    async compress(file: Express.Multer.File): Promise<Buffer> {
        switch (file.mimetype) {
            case "image/webp":
                return await sharp(file.buffer)
                    .webp(this.config.webp)
                    .toBuffer();
            case "image/jpeg":
                return await sharp(file.buffer)
                    .jpeg(this.config.jpeg)
                    .toBuffer();
            case "image/png":
                return await sharp(file.buffer).png(this.config.png).toBuffer();
            default:
                return file.buffer;
        }
    }
}

export class MediumFileCompression implements FileCompressionStrategy {
    config = {
        webp: { quality: 50 },
        jpeg: { quality: 50 },
        png: { quality: 50, compressionLevel: 6 },
    };

    async compress(file: Express.Multer.File): Promise<Buffer> {
        switch (file.mimetype) {
            case "image/webp":
                return await sharp(file.buffer)
                    .webp(this.config.webp)
                    .toBuffer();
            case "image/jpeg":
                return await sharp(file.buffer)
                    .jpeg(this.config.jpeg)
                    .toBuffer();
            case "image/png":
                return await sharp(file.buffer).png(this.config.png).toBuffer();
            default:
                return file.buffer;
        }
    }
}

export class AgressiveFileCompression implements FileCompressionStrategy {
    config = {
        webp: { quality: 25 },
        jpeg: { quality: 25 },
        png: { quality: 25, compressionLevel: 9 },
    };

    async compress(file: Express.Multer.File): Promise<Buffer> {
        switch (file.mimetype) {
            case "image/webp":
                return await sharp(file.buffer)
                    .webp(this.config.webp)
                    .toBuffer();
            case "image/jpeg":
                return await sharp(file.buffer)
                    .jpeg(this.config.jpeg)
                    .toBuffer();
            case "image/png":
                return await sharp(file.buffer).png(this.config.png).toBuffer();
            default:
                return file.buffer;
        }
    }
}