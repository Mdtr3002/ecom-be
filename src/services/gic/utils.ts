import { Types } from 'mongoose';
import { ItemDocument } from '../../models/item.model';

export const GACHA_COST = 150;
export const GACHA_COST_PACK = 1350;

export const PREMIUM_GACHA_COST = 350;
export const PREMIUM_GACHA_COST_PACK = 3150;

export let itemsName: GicItemName[] = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'KEYCHAIN1',
    'KEYCHAIN2',
    'KEYCHAIN3',
    'KEYCHAIN4',
    'CUP1',
    'CUP2',
    'CUP3',
    'CUP4',
    'FIGURE1',
    'FIGURE2',
    'FIGURE3',
    'FIGURE4',
    'TOTE1',
    'TOTE2',
    'TOTE3',
    'TOTE4',
    'FLASK1',
    'FLASK2',
    'FLASK3',
    'FLASK4',
    'MIRROR R',
    'MIRROR SR',
];

export let gicItems: GicItem[] = [
    { name: '0', rare: 'R' },
    { name: '1', rare: 'UC' },
    { name: '2', rare: 'R' },
    { name: '3', rare: 'UC' },
    { name: '4', rare: 'UC' },
    { name: '5', rare: 'UC' },
    { name: '6', rare: 'UC' },
    { name: '7', rare: 'UC' },
    { name: '8', rare: 'UC' },
    { name: '9', rare: 'UC' },
    { name: 'A', rare: 'R' },
    { name: 'B', rare: 'C' },
    { name: 'C', rare: 'C' },
    { name: 'D', rare: 'C' },
    { name: 'E', rare: 'R' },
    { name: 'F', rare: 'C' },
    { name: 'G', rare: 'C' },
    { name: 'H', rare: 'C' },
    { name: 'I', rare: 'R' },
    { name: 'J', rare: 'C' },
    { name: 'K', rare: 'C' },
    { name: 'L', rare: 'C' },
    { name: 'M', rare: 'C' },
    { name: 'N', rare: 'C' },
    { name: 'O', rare: 'R' },
    { name: 'P', rare: 'C' },
    { name: 'Q', rare: 'C' },
    { name: 'R', rare: 'C' },
    { name: 'S', rare: 'C' },
    { name: 'T', rare: 'C' },
    { name: 'U', rare: 'R' },
    { name: 'V', rare: 'C' },
    { name: 'W', rare: 'C' },
    { name: 'X', rare: 'C' },
    { name: 'Y', rare: 'C' },
    { name: 'Z', rare: 'C' },
    { name: 'KEYCHAIN1', rare: 'SR' },
    { name: 'KEYCHAIN2', rare: 'SR' },
    { name: 'KEYCHAIN3', rare: 'SR' },
    { name: 'KEYCHAIN4', rare: 'SSR' },
    { name: 'CUP1', rare: 'SR' },
    { name: 'CUP2', rare: 'SR' },
    { name: 'CUP3', rare: 'SR' },
    { name: 'CUP4', rare: 'SSR' },
    { name: 'FIGURE1', rare: 'SR' },
    { name: 'FIGURE2', rare: 'SR' },
    { name: 'FIGURE3', rare: 'SR' },
    { name: 'FIGURE4', rare: 'SSR' },
    { name: 'TOTE1', rare: 'SR' },
    { name: 'TOTE2', rare: 'SR' },
    { name: 'TOTE3', rare: 'SR' },
    { name: 'TOTE4', rare: 'SSR' },
    { name: 'FLASK1', rare: 'SSR' },
    { name: 'FLASK2', rare: 'SSR' },
    { name: 'FLASK3', rare: 'SSR' },
    { name: 'FLASK4', rare: 'LIMITED' },
    { name: 'MIRROR R', rare: 'MSR' },
    { name: 'MIRROR SR', rare: 'MSSR' },
];

export function random(num: number) {
    return Math.floor(Math.random() * num);
}

export type GicRare =
    | 'C'
    | 'UC'
    | 'R'
    | 'SR'
    | 'SSR'
    | 'LIMITED'
    | 'MSR'
    | 'MSSR';

export type GicRarity = {
    C: number;
    UC: number;
    R: number;
    SR: number;
    SSR: number;
    LIMITED: number;
    MSR: number;
    MSSR: number;
};

export const mathQuizRarity: GicRarity = {
    // Math Quiz
    C: 50,
    UC: 40,
    R: 9,
    SR: 0.9,
    SSR: 0.1,
    LIMITED: 0,
    MSR: 0,
    MSSR: 0,
};

export const gachaRarity: GicRarity = {
    // Gacha
    C: 0,
    UC: 45,
    R: 30,
    SR: 24.8,
    SSR: 0.2,
    LIMITED: 0,
    MSR: 0,
    MSSR: 0,
};

export const premiumGachaRarity: GicRarity = {
    // Premium Gacha
    C: 0,
    UC: 45,
    R: 25,
    SR: 29,
    SSR: 1,
    LIMITED: 0,
    MSR: 0,
    MSSR: 0,
};

export type GicItem = {
    rare: GicRare;
    name: GicItemName;
    rate?: string;
};

export type GicItemName =
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
    | 'G'
    | 'H'
    | 'I'
    | 'J'
    | 'K'
    | 'L'
    | 'M'
    | 'N'
    | 'O'
    | 'P'
    | 'Q'
    | 'R'
    | 'S'
    | 'T'
    | 'U'
    | 'V'
    | 'W'
    | 'X'
    | 'Y'
    | 'Z'
    | 'KEYCHAIN1'
    | 'KEYCHAIN2'
    | 'KEYCHAIN3'
    | 'KEYCHAIN4'
    | 'CUP1'
    | 'CUP2'
    | 'CUP3'
    | 'CUP4'
    | 'FIGURE1'
    | 'FIGURE2'
    | 'FIGURE3'
    | 'FIGURE4'
    | 'TOTE1'
    | 'TOTE2'
    | 'TOTE3'
    | 'TOTE4'
    | 'FLASK1'
    | 'FLASK2'
    | 'FLASK3'
    | 'FLASK4'
    | 'MIRROR R'
    | 'MIRROR SR';

export type GicCombineName =
    | "GIC_KEYCHAIN"
    | "GIC_CUP"
    | "GIC_FIGURE"
    | "GIC_TOTE"
    | "GIC_FLASK"
