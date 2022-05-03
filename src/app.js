import { Client, TextChannel } from "discord.js";
import "dotenv/config";

const enayi = [];
const logChannel = [];

function getDate() {
  const d = new Date();

  return `${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")} -- ${(
    d.getDay() + 1
  )
    .toString()
    .padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d
    .getFullYear()
    .toString()
    .padStart(4, "0")}`;
}

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"], //* istedigimiz instentsler icin array kullanabiliriz
  presence: {
    status: "dnd", //do not disturb
    //activities: [{ name: "müconun deliğiyle", type: "PLAYING" }],
  },
});

client.login(process.env.token);

//! ready
client.on("ready", () => {
  console.log("bot hazır!!");

  const presenceList = [
    { name: "müconun deliğiyle", type: "PLAYING" },
    { name: "müconun deliğini", type: "WATCHING" },
  ];

  setInterval(() => {
    const randomPresence = Math.floor(Math.random() * presenceList.length);
    client.user.setPresence({ activities: [presenceList[randomPresence]] });
  }, 5000);

  var voiceChannels = client.channels.cache.clone();
  voiceChannels.sweep((value) => !(value.type == "GUILD_VOICE"));
});

//! messageCreate
client.on("messageCreate", (message) => {
  if (!message.guild) return;

  if (message.content.startsWith("!logkanalı")) {
    const msg = message.content.split("!logkanalı")[1].trim();
    if (msg === "ekle") {
      logChannel.push(message.channelId);
      message.reply(
        `<#${message.channelId}> text kanalı log alınmak üzere ayarlandı!!`
      );
    } else if (msg === "sil") {
      let index = logChannel.indexOf(message.channelId);
      if (index !== -1) {
        logChannel.splice(index, 1);
        message.reply(
          `<#${message.channelId}> text kanalında artık log alınmayacak!!`
        );
      }
    }
  }

  if (message.content.startsWith("!enayi")) {
    const msg = message.content.split("!enayi")[1].trim();
    if (msg.startsWith("ekle")) {
      const tag = msg.split("ekle")[1].trim();

      if (!enayi.some((name) => name.tag === tag)) {
        enayi.push({
          tag: tag,
        });

        message.reply(`${tag} isimli kullanıcı izleme listesine eklendi!!!`);
      }
    } else if (msg.startsWith("sil")) {
      const tag = msg.split("sil")[1].trim();

      let index = enayi.findIndex((v) => v.tag === tag);
      if (index !== -1) {
        enayi.splice(index, 1);

        message.reply(`${tag} isimli kullanıcı artık izlenmiyor!!!`);
      }
    }
  }
});

//!voiceStateUpdate
client.on("voiceStateUpdate", (oldState, newState) => {
  if (newState.channelId != oldState.channelId) {
    let index = enayi.findIndex((v) => v.tag === `<@${newState.id}>`);
    if (!(index == -1)) {
      enayi[index] = {
        ...enayi[index],
        joinnedChannelId: newState.channelId,
        disconnectedChannledId: oldState.channelId,
      };

      logChannel.forEach((value) => {
        const channel = client.channels.cache.get(value);

        if (enayi[index].joinnedChannelId == null) {
          //çikis yapilan kisim
          channel.send(
            `${enayi[index].tag} isimli kullanıcı <#${
              enayi[index].disconnectedChannledId
            }> isimli kanaldan ${getDate()} tarihinde çıkış yaptı`
          );
        } else if (enayi[index].disconnectedChannledId == null) {
          // giris yapilan kisim
          channel.send(
            `${enayi[index].tag} isimli kullanıcı <#${
              enayi[index].joinnedChannelId
            }> isimli kanala ${getDate()} tarihinde giriş yaptı`
          );
        } else {
          //yer degisilen kisim
          channel.send(
            `${enayi[index].tag} isimli kullanıcı <#${
              enayi[index].disconnectedChannledId
            }> isimli kanaldan ${getDate()} tarihinde çıkış yaptı`
          );
          channel.send(
            `${enayi[index].tag} isimli kullanıcı <#${
              enayi[index].joinnedChannelId
            }> isimli kanala ${getDate()} tarihinde giriş yaptı`
          );
        }
      });
    }
  }
});
