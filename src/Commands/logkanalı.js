export default {
  name: "logkanalı",
  komutExecute(client, message, args) {
    if (args[0] !== "ekle" && args[0] !== "sil") return;

    if (args[0] === "ekle") {
      if (!client.logChannel.includes(message.channelId)) {
        client.logChannel.push(message.channelId);
        message.reply(
          `<#${message.channelId}> kanalı log alınmak üzere ayarlandı!!`
        );
      } else {
        message.reply(
          `<#${message.channelId}> kanalı zaten log alınmak üzere ayarlandı!!`
        );
      }
    } else if (args[0] === "sil") {
      let index = client.logChannel.indexOf(message.channelId);
      if (index !== -1) {
        client.logChannel.splice(index, 1);
        message.reply(
          `<#${message.channelId}> kanalında artık log alınmayacak!!`
        );
      }
    }
  },
};
