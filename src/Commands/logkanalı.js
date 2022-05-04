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
      if (!logChannel.includes(message.channelId)) {
        logChannel.push(message.channelId);
        message.reply(
          `<#${message.channelId}> kanalı log alınmak üzere ayarlandı!!`
        );
      } else {
        message.reply(
          `<#${message.channelId}> kanalı zaten log alınmak üzere ayarlandı!!`
        );
      }
    } else if (args[0] === "sil") {
      let index = logChannel.indexOf(message.channelId);
      if (index !== -1) {
        logChannel.splice(index, 1);
        message.reply(
          `<#${message.channelId}> kanalında artık log alınmayacak!!`
        );
      }
    }
    else if(args[0] === "liste"){
      const logChannelList = new MessageEmbed();
      let logChannelName = "";
      logChannel.forEach((l) => (logChannelName += `<#${l}>\n`));
      logChannelList
        .setTitle("Log alınan kanallar")
        .setDescription(logChannelName)
        .setColor("#329dc7");
      message.reply({embeds: [logChannelList]});
    }
  },
};
