export default (client) => {
  const prefix = process.env.PREFIX;
  const commandRoleIds = JSON.parse(process.env.COMMANDROLEID).roleid;

  client.on("messageCreate", (message) => {
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    //command role control
    const authorRoles = [...message.member.roles.cache.keys()];
    const filteredArray = authorRoles.filter((value) =>
      commandRoleIds.includes(value)
    );

    if (!filteredArray.length) {
      message.reply("Bu botu kullanmanız için gerekli yetkiniz yok!!!");
      return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/); //argumanların arasındaki birden fazla boslugu dikkate almıyor
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    //permission control
    if(command.permission && !message.member.permissions.has(command.permission)) {
      return message.reply("Bu komut için gerekli yetkiye sahip degilsiniz!!!")
    }

    if (!command) {
      message.reply("Böyle bir komut bulunmuyor!!!");
      return;
    }

    try {
      command.komutExecute(client, message, args);
    } catch (error) {
      console.error(error);
      message.reply("Bu komutta hata meydana geldi!!");
    }
  });
};
