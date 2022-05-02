import { Client } from "discord.js";
import "dotenv/config";

const client = new Client({
  intents: ["GUILDS"], //*istedigimiz instentsler icin array kullanabiliriz
  presence: {
    status: "dnd",
    //activities: [{ name: "müconun deliğiyle", type: "PLAYING" }],
  },
});

client.login(process.env.token);

client.addListener("ready", () => {
  // veya client.on() şeklinde de kullanılabilir
  /* bazi islemler client hazir olunca yapilabilir
  örnegin presence degistirme */

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
