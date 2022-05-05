export default {
  name: "mute",
  permission: "MUTE_MEMBERS",
  komutExecute(client, message, args) {
    if (!args.length) {
      return message.reply("Geçersiz arguman!!");
    }

    client.guilds.cache
      .find((g) => g.id === message.guildId)
      .members.cache.find((m) => `<@${m.user.id}>` === args[0])
      .voice.setMute(1).catch(e => {console.log("!mute HATA"); console.log(e)});
  },
};
