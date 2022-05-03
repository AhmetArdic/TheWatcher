import { Client, MessageEmbed, Collection } from "discord.js";
import { readdirSync } from "fs";
import "dotenv/config";

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"], //* istedigimiz instentsler icin array kullanabiliriz
  presence: {
    status: "dnd", //do not disturb
    //activities: [{ name: "müconun deliğiyle", type: "PLAYING" }],
  },
});

client.login(process.env.token);

client.enayi = new Array();
client.logChannel = new Array();

//! Command Loader
client.commands = new Collection();
readdirSync("./Commands").forEach(async (file) => {
  const command = await import(`./Commands/${file}`).then((c) => c.default);
  client.commands.set(command.name, command);
});

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
const prefix = process.env.prefix;
client.on("messageCreate", (message) => {
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(" ");
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    command.komutExecute(client, message, args);
  } catch (error) {
    console.error(error);
    message.reply("Bu komutta hata meydana geldi!!");
  }
});

//!voiceStateUpdate
client.on("voiceStateUpdate", (oldState, newState) => {
  if (newState.channelId != oldState.channelId) {
    let index = client.enayi.findIndex((v) => v.tag === `<@${newState.id}>`);
    if (!(index == -1)) {
      client.enayi[index] = {
        ...client.enayi[index],
        joinnedChannelId: newState.channelId,
        disconnectedChannledId: oldState.channelId,
      };

      client.logChannel.forEach((value) => {
        const channel = client.channels.cache.get(value);
        const bilgi = new MessageEmbed();

        if (client.enayi[index].joinnedChannelId == null) {
          //çikis yapilan kisim
          bilgi
            .setDescription(
              `${client.enayi[index].tag} isimli kullanıcı <#${client.enayi[index].disconnectedChannledId}> isimli kanaldan çıkış yaptı.`
            )
            .setTimestamp()
            .setColor("#d43535");
          channel.send({ embeds: [bilgi] });
        } else if (client.enayi[index].disconnectedChannledId == null) {
          // giris yapilan kisim
          bilgi
            .setDescription(
              `${client.enayi[index].tag} isimli kullanıcı <#${client.enayi[index].joinnedChannelId}> isimli kanala giriş yaptı.`
            )
            .setTimestamp()
            .setColor("#37de48");
          channel.send({ embeds: [bilgi] });
        } else {
          //yer degisilen kisim
          bilgi
            .setDescription(
              `${client.enayi[index].tag} isimli kullanıcı <#${client.enayi[index].disconnectedChannledId}> isimli kanaldan çıkış yaptı.`
            )
            .setTimestamp()
            .setColor("#d43535");
          channel.send({ embeds: [bilgi] });
          bilgi
            .setDescription(
              `${client.enayi[index].tag} isimli kullanıcı <#${client.enayi[index].joinnedChannelId}> isimli kanala giriş yaptı.`
            )
            .setTimestamp()
            .setColor("#37de48");
          channel.send({ embeds: [bilgi] });
        }
      });
    }
  }
});
