import { MessageEmbed } from "discord.js";

export default (client) => {
  const enayi = client.enayi;
  const logChannel = client.logChannel;
  client.on("voiceStateUpdate", (oldState, newState) => {
    if (newState.channelId != oldState.channelId) {
      let index = enayi.findIndex((v) => v.tag === `<@${newState.id}>`);
      if (!(index == -1)) {
        enayi[index] = {
          ...enayi[index],
          joinnedChannelId: newState.channelId,
          disconnectedChannledId: oldState.channelId,
        };

        const enayiName = client.users.cache.find(
          (e) => e.id === newState.id
        ).username;

        logChannel.forEach((value) => {
          const channel = client.channels.cache.get(value);
          const bilgi = new MessageEmbed();

          if (enayi[index].joinnedChannelId == null) {
            //çikis yapilan kisim
            bilgi
              .setTitle(enayiName)
              .setDescription(
                `${enayi[index].tag} isimli kullanıcı <#${enayi[index].disconnectedChannledId}> isimli kanaldan çıkış yaptı.`
              )
              .setTimestamp()
              .setColor("#d43535");
            channel.send({ embeds: [bilgi] });
          } else if (enayi[index].disconnectedChannledId == null) {
            // giris yapilan kisim
            bilgi
              .setTitle(enayiName)
              .setDescription(
                `${enayi[index].tag} isimli kullanıcı <#${enayi[index].joinnedChannelId}> isimli kanala giriş yaptı.`
              )
              .setTimestamp()
              .setColor("#37de48");
            channel.send({ embeds: [bilgi] });
          } else {
            //yer degisilen kisim
            bilgi
              .setTitle(enayiName)
              .setDescription(
                `${enayi[index].tag} isimli kullanıcı <#${enayi[index].disconnectedChannledId}> isimli kanaldan çıkış yaptı.`
              )
              .setTimestamp()
              .setColor("#d43535");
            channel.send({ embeds: [bilgi] });
            bilgi
              .setTitle(enayiName)
              .setDescription(
                `${enayi[index].tag} isimli kullanıcı <#${enayi[index].joinnedChannelId}> isimli kanala giriş yaptı.`
              )
              .setTimestamp()
              .setColor("#37de48");
            channel.send({ embeds: [bilgi] });
          }
        });
      }
    }
  });
};
