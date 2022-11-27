const { google } = require('googleapis');
const makeBody = require('../utils/makeBody');
const subject = require('../utils/subject');
const message = require('../utils/message');
const wait = require('../utils/wait');
const config = require('../config');

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.labels.list({
        userId: 'me',
    });
    const labels = res.data.labels;
    if (!labels || labels.length === 0) {
        console.log('No labels found.');
        return;
    }
    console.log('Labels:');
    labels.forEach((label) => {
        console.log(`- ${label.id}`);
    });
    labels.forEach((label) => {
        console.log(`- ${label.name}`);
    });
}

/**
 * Send email to user.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function sendMail(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.send({
        'userId': 'me',
        'requestBody': {
            'raw': makeBody(subject(), message(), config.sendTo)
        }
    });
}

/**
 * Create draft.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function createDraft(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.drafts.create({
        'userId': 'me',
        'resource': {
            'message': {
                'raw': makeBody(subject(), message(), config.sendTo)
            }
        }
    });
}

/**
 * Send email to trash folder.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param id message id
 */
async function sendToTrash(auth, id) {
    const gmail = google.gmail({ version: 'v1', auth });
    await gmail.users.messages.trash({
        'userId': 'me',
        'id': id
    });
}

/**
 * Send email to spam folder.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param id message id
 */
async function sendToSpam(auth, id) {
    const gmail = google.gmail({ version: 'v1', auth });
    await gmail.users.messages.modify({
        'userId': 'me',
        'id': id,
        'addLabelIds': [
            'SPAM'
        ]

    })
}

/**
 * Lists the emails in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param maxResult size of returned array (default value is 100, max value is 500)
 * @param includeSpam flag to include/exclude spam messages in result list
 */
async function getListOfEmails(auth, maxResult = 10, includeSpam = false) {
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.list({
        "userId": "me",
        "includeSpamTrash": includeSpam,
        "maxResults": maxResult
    })
    return res;
}

/**
 * Create messages.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param count count of messages to create
 */
async function createMessages(auth, count) {
    for (let i = 0; i < count; i++) {
        await wait();
        await sendMail(auth);
        console.info(`${i+1} email created`)
    }
}

/**
 * Create drafts.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param count count of drafts to create
 */
async function createDrafts(auth, count) {
    for (let i = 0; i < count; i++) {
        await wait();
        await createDraft(auth);
        console.info(`${i+1} draft created`)
    }
}

/**
 * Move messages to spam.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param count count of messages to be move to spam folder
 */
async function moveMesagesToSpam(auth, count) {
    for (let i = 0; i < count; i++) {
        await wait();
        await sendMail(auth);
        console.info(`${i+1} email created`)
    }
    const listOfMessages = await (await getListOfEmails(auth, count)).data.messages.map(i => i.id)
    for (let i = 0; i < listOfMessages.length; i++) {
        await wait();
        await sendToSpam(auth, listOfMessages[i]);
        console.info(`${i+1} message sent to spam`);
    }
}

/**
 * Move messages to trash.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param count count of messages to be move to trash folder
 */
async function moveMesagesToTrash(auth, count) {
    for (let i = 0; i < count; i++) {
        await wait();
        await sendMail(auth);
        console.info(`${i+1} email created`)
    }
    const listOfMessages = await (await getListOfEmails(auth, count)).data.messages.map(i => i.id)
    for (let i = 0; i < listOfMessages.length; i++) {
        await wait();
        await sendToTrash(auth, listOfMessages[i]);
        console.info(`${i+1} message sent to trash`);
    }
}

module.exports = {
    listLabels,
    sendMail,
    createDraft,
    sendToTrash,
    sendToSpam,
    getListOfEmails,
    createMessages,
    moveMesagesToSpam,
    moveMesagesToTrash,
    createDrafts
};