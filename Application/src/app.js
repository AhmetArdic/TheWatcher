import { Client } from "discord.js";
import "dotenv/config";
import { readdirSync } from "fs";

const client = new Client({
  intents: ["GUILDS"], //* istedigimiz instentsler icin array kullanabiliriz
  presence: {
    status: "dnd", //do not disturb
    //activities: [{ name: "müconun deliğiyle", type: "PLAYING" }],
  },
});

client.login(process.env.token);

/* ready gibi tum eventler app.js altinda olsa cok karmasik
olurdu, bu sebeple burada bir event loader yapip events klasoru
icindeki dosyalar cagrilacak */
//* Event loader
readdirSync("../events").forEach(async (file) => {
  //! fonksiyon asenkron olmaliki await calisabilsin

  const event = await import(`../events/${file}`) //* asenkron bir islem oldugundan await
    .then((module) => module.default);
  event(client);
});
