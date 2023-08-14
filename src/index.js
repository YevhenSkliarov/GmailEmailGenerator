import authorize from './utils/auth.js';
import { config } from './config.js';
import { 
  createMessages,
  moveMesagesToSpam,
  moveMesagesToTrash,
  createDrafts } from'./utils/actions.js';

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

