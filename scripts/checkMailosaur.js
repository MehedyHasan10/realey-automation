const MailosaurClient = require("mailosaur");

const { mailosaurSecrets } = require("../pages/mailosaurSecrets");

async function checkMailosaur() {
  const client = new MailosaurClient(mailosaurSecrets.apiKey);

  const result = await client.messages.list(mailosaurSecrets.serverId);

  const messages = result.items || [];

  console.log(`Total messages: ${messages.length}`);

  for (const message of messages) {
    console.log({
      id: message.id,
      subject: message.subject,
      received: message.received,
      to: message.to,
    });
  }
}

checkMailosaur().catch((error) => {
  console.error(error.message);

  process.exit(1);
});
