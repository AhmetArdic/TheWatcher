import { Client } from "discord.js";

const client = new Client({
  intents: ["GUILDS"], //istedigimiz instentsler icin array kullanabiliriz
});
client.login("OTcwNTcyNzM5MzM1MjkwODgw.Ym96TQ.ev7ZFVXYOn0weMXMMsvs_K5BTpE");

client.on("ready", () => {
  console.log("bot hazır!!");
});
