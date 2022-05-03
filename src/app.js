import { Client, TextChannel } from "discord.js";
import "dotenv/config";

const enayi = [];
var logChannel;

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

  if (message.content === "!logkanalı") {
    logChannel = client.channels.cache.get(message.channelId);
  }

  if (message.content.startsWith("!enayi")) {
    const tag = message.content.split("!enayi")[1].trim();
    if (!enayi.some((name) => name.tag === tag)) {
      enayi.push({
        tag: tag,
      });
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

      if (enayi[index].joinnedChannelId == null) {
        //çikis yapilan kisim
        logChannel.send(
          `${enayi[index].tag} isimli kullanıcı <#${enayi[index].disconnectedChannledId}> isimli kanaldan çıkış yaptı`
        );
      } else if (enayi[index].disconnectedChannledId == null) {
        // giris yapilan kisim
        logChannel.send(
          `${enayi[index].tag} isimli kullanıcı <#${enayi[index].joinnedChannelId}> isimli kanala giriş yaptı`
        );
      } else {
        //yer degisilen kisim
        logChannel.send(
          `${enayi[index].tag} isimli kullanıcı <#${enayi[index].joinnedChannelId}> isimli kanala giriş yaptı`
        );
        logChannel.send(
          `${enayi[index].tag} isimli kullanıcı <#${enayi[index].disconnectedChannledId}> isimli kanaldan çıkış yaptı`
        );
      }
    }
  }
});
