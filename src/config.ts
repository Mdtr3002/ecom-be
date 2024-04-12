import path from 'path';
import { Device } from './models/device.model';

import dotenv from 'dotenv';
import fs from 'fs';
import mongoose from 'mongoose';

// checking if .env file is available
if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
} else {
    console.error('.env file not found.');
}

export const COOKIE_KEY = process.env.COOKIE_KEY as string;

export const IS_PRODUCTION = process.env.NODE_ENV == 'production';

export const SERVICE_PORT = +process.env.PORT || 1201;
export const SERVICE_NAME = 'GAME-BE';

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const ROOT_DOMAIN = 'fessior.com';

export const FE_ADDRESS = IS_PRODUCTION
    ? 'https://bugs.vn/'
    : 'http://localhost:5000/';

const DB_HOST = IS_PRODUCTION ? 'srv-captain--mongodb' : '112.213.91.209';
const DB_PORT = IS_PRODUCTION ? 27017 : 27071;
const DB_USERNAME = 'dbBugs';
const DB_PASSWORD = '2W8F5Ewr';

export type Domain = 'gic' | 'game' | 'gic_admin' | 'fessior_dev';

export enum WhitelistDomain {
    'gic' = 'gdsc.app',
    'game' = 'game.gdsc.app',
    'gic_admin' = 'admin.gic.gdsc.app',
    'fessior_dev' = 'fessior.dev',
}

export const USER_WHITE_LIST: Array<{ email: string }> = [
    { email: 'lygioian@gmail.com' },
    { email: 'phuc.daoanh@hcmut.edu.vn' },
    { email: 'bao.le108101@hcmut.edu.vn' },
    { email: 'truongquochung312@gmail.com' },
    { email: 'minhduytranct2017@gmail.com' },
    { email: 'tndangkhoa218@gmail.com' },
    { email: 'jamesklein218@gmail.com' },
    { email: 'duc.nv291@gmail.com' },
    { email: 'nguyenthithanhbinh1012004@gmail.com' },
    { email: 'khoi.nguyentran2701@hcmut.edu.vn' },
    { email: 'khoi27012003@gmail.com' },
    { email: 'tonynghi81@gmail.com' },
    { email: 'tiendat0417@gmail.com' },
    { email: 'minhduytranct2017@mail.com' },
    { email: 'minh.tranduy2209@hcmut.edu.vn' },
    { email: 'gdscchatapp@gmail.com' },
    { email: 'duc.nv291@gmail.com' },
    { email: 'ngoquochieu1211@gmail.com' },
    { email: 'qtrung.tran2004@gmail.com' },
    { email: 'khanhtrnguyen863@gmail.com' },
    { email: 'hieu.tranzzz2004@hcmut.edu.vn' },
    { email: 'trung.tranquoc2004@hcmut.edu.vn' },
    { email: 'trungtrungtrung2252859@gmail.com' },
    { email: 'fugaatklol@gmail.com' },
    { email: '147258369hotboy@gmail.com' },
    { email: 'khoa.tranngocdang03@hcmut.edu.vn' },
];

export const DB_NAME = 'bugs';
export const DB_CONN_STRING = process.env.DB_URI;
// export const DB_CONN_STRING = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_NAME}`;

export const HASH_ROUNDS = 10;
export const PASSWORD_SCERET_KEY = 'AQ!@(!NFAJF*((!@#*(R)!U__*#';
export const JWT_SECRET =
    '4A7F95E8D85601B138CDE8172C64A0AB5E6BBDECD9897E0BBB344143AD0CD2D1B8286939BA2FA9AB2299DF70A847B443B8DDB3C25FB7184B17A98D27D4FD420D1631A9';

export const WORKING_DIR = path.resolve(process.env.WORKING_DIR);
export const STATIC_DIR = path.join(WORKING_DIR, 'static');
export const UPLOAD_DIR = path.join(WORKING_DIR, 'uploads');

console.log('WORKING_DIR', WORKING_DIR);
console.log('STATIC_DIR', STATIC_DIR);
console.log('UPLOAD_DIR', UPLOAD_DIR);

export const TOKEN_TTL = 365 * 24 * 60 * 60;
export const VERIFY_CODE_LENGTH = 32;
export const VERIRY_CODE_TTL = 365 * 24 * 60 * 60;

// Email config
export const EMAIL_API_KEY =
    '42edf1e5de12e1d77333e5e846350d04-9c988ee3-6b8668fd';
export const EMAIL_API_URL = 'https://api.mailgun.net/v3/bugs.vn';
export const EMAIL_SENDER = 'Bugs <register@bugs.vn>';

export enum SortType {
    ASC = 'asc',
    DESC = 'desc',
}

export enum SocialAccountType {
    Zalo = 'zalo',
    Facebook = 'facebook',
}

export const DATE_FORMAT = 'DD/MM/YYYY';

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export enum Language {
    VIETNAMESE = 'vi',
    ENGLISH = 'en',
}

export enum Theme {
    DARK = 'dark',
    LIGHT = 'light',
}

// Device topic to subscribe Adafruit
export enum DeviceTopic {
    LED = 'bk-iot-led',
    SPEAKER = 'bk-iot-speaker',
    LCD = 'bk-iot-lcd',
    BUTTON = 'bk-iot-button',
    TOUCH = 'bk-iot-touch',
    TRAFFIC = 'bk-iot-traffic',
    TEMP_HUMID = 'bk-iot-temp-humid',
    MAGNETIC = 'bk-iot-magnetic',
    SOIL = 'bk-iot-soil',
    DRV = 'bk-iot-drv',
    RELAY = 'bk-iot-relay',
    SOUND = 'bk-iot-sound',
    LIGHT = 'bk-iot-light',
    INFRARED = 'bk-iot-infrared',
    SERVO = 'bk-iot-servo',
    TIME = 'bk-iot-time',
    GAS = 'bk-iot-gas',
}
export function getDeviceName(topic: DeviceTopic): string {
    switch (topic) {
        case DeviceTopic.LED:
            return 'LED';
        case DeviceTopic.SPEAKER:
            return 'SPEAKER';
        case DeviceTopic.LCD:
            return 'LCD';
        case DeviceTopic.BUTTON:
            return 'BUTTON';
        case DeviceTopic.TOUCH:
            return 'TOUCH';
        case DeviceTopic.TRAFFIC:
            return 'TRAFFIC';
        case DeviceTopic.TEMP_HUMID:
            return 'TEMP-HUMID';
        case DeviceTopic.MAGNETIC:
            return 'MAGNETIC';
        case DeviceTopic.SOIL:
            return 'SOIL';
        case DeviceTopic.DRV:
            return 'DRV_PWM';
        case DeviceTopic.RELAY:
            return 'RELAY';
        case DeviceTopic.SOUND:
            return 'SOUND';
        case DeviceTopic.LIGHT:
            return 'LIGHT';
        case DeviceTopic.INFRARED:
            return 'INFRARED';
        case DeviceTopic.SERVO:
            return 'SERVO';
        case DeviceTopic.TIME:
            return 'TIME';
        case DeviceTopic.GAS:
            return 'GAS';
        default:
            return null;
    }
}

// List of all supported devices
export const SupportedDevices = [
    DeviceTopic.LED,
    DeviceTopic.SPEAKER,
    DeviceTopic.TEMP_HUMID,
    DeviceTopic.MAGNETIC,
    DeviceTopic.SOIL,
    DeviceTopic.SOUND,
    DeviceTopic.LIGHT,
    DeviceTopic.INFRARED,
    DeviceTopic.TIME,
    DeviceTopic.GAS,
    DeviceTopic.RELAY,
];

export const LIMIT_PAGING = 24;

export const BOX_PRICE = 10000;

export const SYSTEM_ACCOUNT_ID = new mongoose.Types.ObjectId(
    process.env.ENV == 'dev'
        ? '63f32487419633ae2a19cd4b'
        : '63ee1f5514690baf606a88d4',
);

export const GIFT_THRESHOLD = 20;
