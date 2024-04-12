import { ObjectId } from 'mongoose';
import User from './user.model';
import { PrivacyType } from '../types';
import mongoose from 'mongoose';

export enum FileType {
    NOTE = 'note',
    CODE = 'code',
}

export enum BundlePrivacy {
    PUBLIC = 'public',
    PROTECTED = 'protected',
    PRIVATE = 'private',
}

export interface File {
    readonly _id?: ObjectId;
    readonly slug?: string;
    type: FileType;
    language: string;
    name: string;
    content: string;
    description: string;
    createdAt: number;
    isDeleted: boolean;
    // isPublished: boolean;
    isLocked: boolean;
    bundle?: ObjectId;
}

export interface Bundle {
    readonly _id?: ObjectId;
    slug?: string;
    name: string;
    description: string;
    privacy: PrivacyType;
    user: typeof User | ObjectId;
    pin: string;
    files: File[] | ObjectId[];
    createdAt: number;
    isDeleted: boolean;
    likes: { user: ObjectId; createdAt: number; ip: string }[];
    views: { user: ObjectId; createdAt: number; ip: string }[];
}

export function fillDefaultFileValue(file: File): File {
    return {
        type: FileType.CODE,
        language: '',
        name: 'Untitled',
        content: '',
        description: '',
        createdAt: Math.floor(Date.now() / 1000),
        isDeleted: false,
        // isPublished: true,
        isLocked: false,
        ...file,
    };
}

export function fillDefaultBundleValue(bundle: Bundle): Bundle {
    return {
        name: '',
        description: '',
        privacy: BundlePrivacy.PUBLIC,
        pin: '',
        files: [],
        createdAt: Math.floor(Date.now() / 1000),
        isDeleted: false,
        likes: [],
        views: [],
        ...bundle,
    };
}

export const BUNDLE_KEYS = Object.keys(fillDefaultBundleValue(null));
export const FILE_KEYS = Object.keys(fillDefaultFileValue(null));
