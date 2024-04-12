import { injectable } from 'inversify';
import { google, Auth, gmail_v1 } from 'googleapis';
import { randInt } from '../lib/random_integer';
import { threadSleep } from '../lib/sleep';

@injectable()
export class MailService {
    auth: Auth.JWT;
    gmail: gmail_v1.Gmail;
    MAXIMUM_BACKOFF_TIME: number = 32000;
    NUM_RETRY: number = 64;

    constructor() {
        console.log(`[MailService] Construct`);

        this.init();
    }

    convertToBase64(m: string) {
        return Buffer.from(m)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    async init() {
        let mountPath = '';
        if (process.env.ENV === 'dev' || process.env.ENV === 'prod') {
            mountPath = '/secrets/googleServiceAccountKey.json';
        } else {
            mountPath = './googleServiceAccountKey.json';
        }
        this.auth = new google.auth.JWT({
            scopes: [`https://www.googleapis.com/auth/gmail.send`],
            keyFile: mountPath,
            subject: 'admin@fessior.com',
        });
        await this.auth.authorize();
        this.gmail = google.gmail({
            version: 'v1',
            auth: this.auth,
        });
        console.log(`[MailService] Gmail service is ready`);
    }

    async sendToOne(
        email: string,
        subject: string,
        message: string,
        contentType: string = `text/html`,
    ) {
        const m =
            `Content-Type: ${contentType}; charset=utf-8\r\n` +
            `From: GDSC Idea Contest <admin@fessior.com>\r\n` +
            `To: ${email}\r\n` +
            `Subject: =?utf-8?B?${Buffer.from(subject).toString(
                'base64',
            )}?=\r\n` +
            `\r\n` +
            `${message}`;

        const encodedMessage = this.convertToBase64(m);

        let waitTime = 1000 + randInt(0, 1001);
        for (let i = 0; i < this.NUM_RETRY; i++) {
            console.log(
                `Attempt ${
                    i + 1
                } to send mail to ${email} (Subject: ${subject})`,
            );
            try {
                await this.gmail.users.messages.send({
                    userId: 'me',
                    requestBody: {
                        raw: encodedMessage,
                    },
                });
                break;
            } catch (error) {
                // wait and try again
                await threadSleep(waitTime);
                waitTime =
                    Math.min(2 * waitTime, this.MAXIMUM_BACKOFF_TIME) +
                    randInt(0, 1001);
            }
        }
        console.log(`Successfully sent mail to ${email} (Subject: ${subject})`);
    }

    async sendToMany(
        emails: string[],
        subject: string,
        message: string,
        contentType: string = 'text/html',
    ) {
        await Promise.all(
            emails.map((email) =>
                (async () => {
                    await this.sendToOne(email, subject, message, contentType);
                })(),
            ),
        );
    }

    async getAllMail() {
        return await this.gmail.users.messages.get({
            userId: 'me',
        });
    }
}
