export default {
  name: "moveto",
  permission: "MOVE_MEMBERS",
  komutExecute(client, message, args) {
    let memberVoiceState;
    if (!args.length) {
      return message.reply("Geçersiz arguman, !moveto [channel-tag] [user-tag(optional)]");
    } else if (args.length < 2) {
      memberVoiceState = client.guilds.cache
        .find((g) => g.id === message.guildId)
        .members.cache.find(
          (m) => `<@${m.user.id}>` === `<@${message.author.id}>`
        ).voice;
    }
    else{
      memberVoiceState = client.guilds.cache
        .find((g) => g.id === message.guildId)
        .members.cache.find(
          (m) => `<@${m.user.id}>` === args[1]
        ).voice;
    }

    var voiceChannel = client.guilds.cache.find(g => g.id === message.guildId).channels.cache.find(c => `<#${c.id}>` === args[0]);

    memberVoiceState.setChannel(voiceChannel);

  },
};
