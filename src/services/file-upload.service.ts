import { injectable, inject } from 'inversify';
import admin from 'firebase-admin';
import { DownloadFileInfo } from '../types';
import { Bucket } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { FileCompressionStrategy } from '../lib/file-compression/strategies';
import getRawBody from 'raw-body';
import AttachmentModel from '../models/attachment.model';
import { Types } from 'mongoose';
import { ServiceType } from '../types';
// import { CacheService } from "./cache.service";
import { Multer } from 'multer';
@injectable()
export class FileUploadService {
    /**
     * Handles uploading of files through Firebase Storage
     * All requests are independent of each other, so no lock is needed
     */
    bucket: Bucket;
    CACHE_EXPIRATION_TIME: number = 60 * 15; // 15 minutes

    // constructor(@inject(ServiceType.Cache) private cacheService: CacheService) {
    constructor() {
        console.log('[FileUploadService] Construct');

        this.setUpFileUpload();
    }

    async setUpFileUpload() {
        try {
            let mountPath = '';
            mountPath = '../../googleServiceAccountKey.json';
            const serviceAccount = await import(mountPath);
            admin.initializeApp({
                credential: admin.credential.cert(
                    serviceAccount as admin.ServiceAccount,
                ),
                storageBucket: process.env.STORAGE_BUCKET,
            });
            this.bucket = admin.storage().bucket();
            console.log('[FileUploadService] Ready');
        } catch (err) {
            console.log('err', err);
        }
    }

    async uploadFiles(
        files: Express.Multer.File[],
        compressionStrategy: FileCompressionStrategy,
    ) {
        const res = await Promise.all(
            files.map((file) =>
                (async () => {
                    const refName = `${file.originalname}_${uuidv4()}`;
                    const f = this.bucket.file(refName);
                    const compressedBuffer = await compressionStrategy.compress(
                        file,
                    );
                    await f.save(compressedBuffer, {
                        contentType: file.mimetype,
                    });

                    return await AttachmentModel.create({
                        originalName: file.originalname,
                        refName: refName,
                        mimetype: file.mimetype,
                    });
                })(),
            ),
        );

        return res;
    }

    // async downloadFile(id: Types.ObjectId): Promise<DownloadFileInfo> {
    //     const doc = await AttachmentModel.findById(id);
    //     if (!doc) {
    //         return null;
    //     }

    //     const { originalName, refName, mimetype } = doc;
    //     const buffer = Buffer.from(
    //         await this.cacheService.getWithPopulate(
    //             `attachments ${refName}`,
    //             async () => {
    //                 const file = this.bucket.file(refName);
    //                 return (await getRawBody(file.createReadStream())).toString(
    //                     'base64',
    //                 );
    //             },
    //             {
    //                 EX: this.CACHE_EXPIRATION_TIME,
    //             },
    //         ),
    //         'base64',
    //     );

    //     return {
    //         originalName: originalName,
    //         refName: refName,
    //         mimetype: mimetype,
    //         buffer: buffer,
    //     };
    // }

    /**
     * try to delete attachments and return whether they were deleted successfully or not
     */
    async deleteFiles(ids: Types.ObjectId[]): Promise<boolean[]> {
        const ans: boolean[] = await Promise.all(
            ids.map((id) =>
                (async () => {
                    const doc = await AttachmentModel.findOneAndDelete({
                        _id: id,
                    });
                    if (!doc) {
                        return false;
                    }
                    const { refName } = doc;
                    const file = this.bucket.file(refName);
                    await file.delete();
                    return true;
                })(),
            ),
        );

        return ans;
    }
}
