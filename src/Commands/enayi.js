import { MessageEmbed } from "discord.js";

export default {
  name: "enayi",
  komutExecute(client, message, args) {
    if (args[0] !== "ekle" && args[0] !== "sil" && args[0] !== "liste") {
      //TODO: daha otomatik kontrol
      message.reply("Komuta verilen argumanlar hatalı!!");
      return;
    }
    const enayi = client.enayi;

    if (args[0] === "ekle") {
      args.shift();
      let replyMessage = "";

      args.forEach((e) => {
        if (!(e.startsWith("<@") && e.endsWith(">")))
          return message.reply(
            "Hatalı kullanıcı ismi girildi, hatalı kullanıcı ID " + e
          );

        const g = enayi.findKey((v, key) => key === message.guildId);
        if (!g) {
          //mesajin gonderildigi sunucu collectionda yok ise
          enayi.set(message.guildId, { arr: [{ tag: e }] });
          replyMessage += `${e} isimli enayi takip ediliyor!!!\n`;
        } else {
          //var ise
          if (!enayi.get(g).arr.some((name) => name.tag === e)) {
            enayi.get(g).arr.push({ tag: e });
            replyMessage += `${e} isimli enayi takip ediliyor!!!\n`;
          } else {
            replyMessage += `${e} isimli enayi ZATEN takip ediliyor!!!\n`;
          }
        }
      });
      message.reply(replyMessage);
    } else if (args[0] === "sil") {
      args.shift();
      let replyMessage = "";

      args.forEach((s) => {
        let index = enayi
          .get(message.guildId)
          .arr.findIndex((v) => v.tag === s);
        if (index !== -1) {
          enayi.get(message.guildId).arr.splice(index, 1);
          replyMessage += `${s} isimli enayi artık serbest bırakıldı!!!\n`;
        }
      });
      message.reply(replyMessage);

      if (!enayi.get(message.guildId).arr.length) {
        enayi.delete(message.guildId);
      }
    } else if (args[0] === "liste") {
      const enayiList = new MessageEmbed();
      let enayiName = "";
      enayi.forEach((value, key) => {
        if (key !== message.guildId) return;

        value.arr.forEach((t) => (enayiName += t.tag + "\n"));
      });
      if (enayiName === "") {
        enayiName = "Kimse takip edilmiyor!!!";
      }
      enayiList
        .setTitle("Takip edilenler")
        .setDescription(enayiName)
        .setColor("#329dc7");
      message.reply({ embeds: [enayiList] });
    }
  },
};
