export default (client) => {
  const prefix = process.env.PREFIX;
  const commandRole = process.env.COMMANDROLE;

  client.on("messageCreate", (message) => {
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    //command role control
    if (
      !(
        message.member.roles.cache.find((value) => value.name === commandRole)
          ?.name === commandRole
      )
    ) {
      message.reply("Bu komutu kullanmanız için gerekli yetkiniz yok!!!");
      return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/); //argumanların arasındaki birden fazla boslugu dikkate almıyor
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (!command) return;

    try {
      command.komutExecute(client, message, args);
    } catch (error) {
      console.error(error);
      message.reply("Bu komutta hata meydana geldi!!");
    }
  });
};
