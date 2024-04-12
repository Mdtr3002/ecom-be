let str =
    'M64.8468 34.432V29.056H28.7508V34.432H64.8468ZM64.8468 51.712V46.336H28.7508V51.712H64.8468Z';
let cmpStr =
    'M40.5343 34.432V29.056H4.43825V34.432H40.5343ZM40.5343 51.712V46.336H4.43825V51.712H40.5343Z';

let arr = [];

let min = 100000,
    max = 0;

const addSpace = (str) => {
    let newStr = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i].match(/[A-Z]/i)) {
            newStr += ' ';
            newStr += str[i];
            newStr += ' ';
        } else {
            newStr += str[i];
        }
    }
    return newStr;
};

const process = (s, cmp) => {
    let newStr = '';
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (s[i] !== cmp[i]) {
            newStr += ` {} `;
            count++;
            arr.push(Number(cmp[i]));
            if (arr[arr.length - 1] < min) min = arr[arr.length - 1];
            if (arr[arr.length - 1] > max) max = arr[arr.length - 1];
        } else {
            newStr += ` ${s[i]} `;
        }
    }
    return newStr;
};

str = addSpace(str)
    .split(' ')
    .filter((elem) => elem !== '');
cmpStr = addSpace(cmpStr)
    .split(' ')
    .filter((elem) => elem !== '');
