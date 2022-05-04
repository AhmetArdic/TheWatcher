import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import "dotenv/config";

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"], //* istedigimiz instentsler icin array kullanabiliriz
  presence: {
    status: "dnd", //do not disturb
    //activities: [{ name: "müconun deliğiyle", type: "PLAYING" }],
  },
});
client.login(process.env.TOKEN);

//! definitions
client.enayi = new Array();
client.logChannel = new Array();
client.commands = new Collection();

//! Event Handler
readdirSync("./events").forEach(async (file) => {
  const eventHandler = await import(`./events/${file}`).then((m) => m.default);
  eventHandler(client);
});

//! Command Loader
readdirSync("./Commands").forEach(async (file) => {
  const command = await import(`./Commands/${file}`).then((c) => c.default);
  client.commands.set(command.name, command);
});
