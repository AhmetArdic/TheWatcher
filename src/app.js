import { Client } from "discord.js";
import "dotenv/config";

const enayiInVoice = [];
var enayi = [];

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
  }, 5800);
});

var voiceChannels = client.channels.cache.clone();
voiceChannels.sweep((value) => !(value.type == "GUILD_VOICE"));

//! messageCreate
client.on("messageCreate", (message) => {
  if (!message.guild) return;

  if (message.content === "!logkanalı") {
    var logChannel = message.channelId;
  }

  if (message.content.startsWith("!enayi")) {
    const name = message.content.split("!enayi")[1].trim();
    if (!enayi.includes(name)) {
      enayi.push(name);
    }
  }
});

//!voiceStateUpdate
client.on("voiceStateUpdate", (oldState, newState) => {
  const newMembersCollection = newState.channel?.members;

  if (newMembersCollection) {
    const voiceChannelMembersArray = [...newMembersCollection.values()];
    voiceChannelMembersArray.forEach((value) => {
      if (
        enayi.includes(
          `<@${value.user.id}>`
        ) /* //TODO aynı şey tekrar eklenmeyecek */
      ) {
        enayiInVoice.push({
          channelId: newState.channelId,
          tag: `<@${value.user.id}>`,
        });
      }
    });
  }

  console.log(enayiInVoice);

  /*
  enayi.forEach((value) => {
    if (voiceMembers.includes(value)) {
      console.log("enayi giriş yaptı");
    } else {
      console.log("enayi çıkış yaptı");
    }
  });
  */
});
