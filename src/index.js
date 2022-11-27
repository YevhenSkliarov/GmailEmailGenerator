const authorize = require('./utils/auth')
const config = require('./config');
const { 
  createMessages,
  moveMesagesToSpam,
  moveMesagesToTrash,
  createDrafts } = require('./utils/actions');

async function runScript() {
  const auth = await authorize();
  await moveMesagesToSpam(auth, config.spamEmails);
  await moveMesagesToTrash(auth, config.trashEmails);
  await createMessages(auth, config.inboxEmails);
  await createDrafts(auth, config.draftEmails);
}

(async() => {
  await runScript();
})();

