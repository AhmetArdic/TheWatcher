import { MessageEmbed } from "discord.js";

export default {
  name: "logkanalı",
  komutExecute(client, message, args) {
    if (args[0] !== "ekle" && args[0] !== "sil" && args[0] !== "liste") {
      //TODO: daha otomatik kontrol
      message.reply("Komuta verilen argumanlar hatalı!!");
      return;
    }
    const logChannel = client.logChannel;

    if (args[0] === "ekle") {
      const g = logChannel.findKey((v, key) => key === message.guildId);
      if (!g) {
        //mesajin gonderildigi sunucu collectionda yok ise
        logChannel.set(message.guildId, { arr: [message.channelId] });
        message.reply(
          `<#${message.channelId}> kanalı log alınmak üzere ayarlandı!!`
        );
      } else {
        //var ise
        if (!logChannel.get(g).arr.includes(message.channelId)) {
          logChannel.get(g).arr.push(message.channelId);
          message.reply(
            `<#${message.channelId}> kanalı log alınmak üzere ayarlandı!!`
          );
        } else {
          message.reply(
            `<#${message.channelId}> kanalı zaten log alınmak üzere ayarlandı!!`
          );
        }
      }
    } else if (args[0] === "sil") {
      let index = logChannel
        .get(message.guildId)
        .arr.indexOf(message.channelId);
      if (index !== -1) {
        logChannel.get(message.guildId).arr.splice(index, 1);
        message.reply(
          `<#${message.channelId}> kanalında artık log alınmayacak!!`
        );
      }

      if (!logChannel.get(message.guildId).arr.length) {
        logChannel.delete(message.guildId);
      }
    } else if (args[0] === "liste") {
      const logChannelList = new MessageEmbed();
      let logChannelName = "";
      logChannel.forEach((value, key) => {
        if (key !== message.guildId) return;

        value.arr.forEach((l) => (logChannelName += `<#${l}>\n`));
      });
      if (logChannelName === "") {
        logChannelName = "Log listesi boş!!!";
      }
      logChannelList
        .setTitle("Log alınan kanallar")
        .setDescription(logChannelName)
        .setColor("#329dc7");
      message.reply({ embeds: [logChannelList] });
    }
  },
};
