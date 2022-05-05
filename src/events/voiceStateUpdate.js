import { MessageEmbed } from "discord.js";

export default (client) => {
  const enayi = client.enayi;
  const logChannel = client.logChannel;
  client.on("voiceStateUpdate", (oldState, newState) => {
    if (newState.channelId == oldState.channelId) return;

    enayi.forEach((enayiObj, gId) => {
      if (gId !== newState.guild.id) return;
      const enayiArr = enayiObj.arr;

      let index = enayiArr.findIndex((v) => v.tag === `<@${newState.id}>`);
      if (index == -1) return; //bu kisi takip edilmiyor

      enayiArr[index] = {
        ...enayiArr[index],
        joinnedChannelId: newState.channelId,
        disconnectedChannledId: oldState.channelId,
      };

      const enayiName = client.users.cache.find(
        (e) => e.id === newState.id
      ).username;

      logChannel.get(gId)?.arr.forEach((value) => {
        const channel = client.channels.cache.get(value);
        const bilgi = new MessageEmbed();

        if (enayiArr[index].joinnedChannelId == null) {
          //çikis yapilan kisim
          bilgi
            .setTitle(enayiName)
            .setDescription(
              `${enayiArr[index].tag} isimli kullanıcı <#${enayiArr[index].disconnectedChannledId}> isimli kanaldan çıkış yaptı.`
            )
            .setTimestamp()
            .setColor("#d43535");
          channel.send({ embeds: [bilgi] });
        } else if (enayiArr[index].disconnectedChannledId == null) {
          // giris yapilan kisim
          bilgi
            .setTitle(enayiName)
            .setDescription(
              `${enayiArr[index].tag} isimli kullanıcı <#${enayiArr[index].joinnedChannelId}> isimli kanala giriş yaptı.`
            )
            .setTimestamp()
            .setColor("#37de48");
          channel.send({ embeds: [bilgi] });
        } else {
          //yer degisilen kisim
          bilgi
            .setTitle(enayiName)
            .setDescription(
              `${enayiArr[index].tag} isimli kullanıcı <#${enayiArr[index].disconnectedChannledId}> isimli kanaldan çıkış yaptı.`
            )
            .setTimestamp()
            .setColor("#d43535");
          channel.send({ embeds: [bilgi] });
          bilgi
            .setTitle(enayiName)
            .setDescription(
              `${enayiArr[index].tag} isimli kullanıcı <#${enayiArr[index].joinnedChannelId}> isimli kanala giriş yaptı.`
            )
            .setTimestamp()
            .setColor("#37de48");
          channel.send({ embeds: [bilgi] });
        }
      });
    });
  });
};
