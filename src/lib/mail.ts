import { MailtrapClient, Address } from 'mailtrap';

const TOKEN = '66de6d7835aeaeda74cb9d38d39b53d3';
const ENDPOINT = 'https://send.api.mailtrap.io/';

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
    name: 'GIC Admin',
    email: 'admin@gdsc.app',
};

const getDate = () =>
    new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

// const sendMailtrap = (html?: string) => {
//     client
//         .send({
//             from: sender,
//             to: DUC_EMAILS,
//             subject: `Test sending email for GIC web at ${getDate()}`,
//             text: 'Test email',
//             html: html,
//             category: 'Integration Test',
//         })
//         .then(console.log, console.error);
// };

const sendToOne = (address: Address, html?: string) => {
    client
        .send({
            from: sender,
            to: [address],
            subject: `Test sending email for GIC web at ${getDate()}`,
            text: 'Test email',
            html: html,
            category: 'Send to one',
        })
        .then(console.log, console.error);
};

const sendToMany = (addresses: Address[], html?: string) => {
    client
        .send({
            from: sender,
            to: addresses,
            subject: `Test sending email for GIC web at ${getDate()}`,
            text: 'Test email',
            html: html,
            category: 'Send to many',
        })
        .then(console.log, console.error);
};

const sendToUserAndCc = (
    address: Address,
    ccList: Address[],
    html?: string,
) => {
    client
        .send({
            from: sender,
            to: [address],
            cc: ccList,
            subject: `Test sending email for GIC web at ${getDate()}`,
            text: 'Test email',
            html: html,
            category: 'Send to many',
        })
        .then(console.log, console.error);
};

export { sendToOne, sendToMany, sendToUserAndCc };

// Usage:
// sendMailtrap(HTML_TEMPLATE('test'));
