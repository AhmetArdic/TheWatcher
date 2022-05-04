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
        if (!enayi.some((name) => name.tag === e)) {
          enayi.push({
            tag: e,
          });
          replyMessage += `${e} isimli enayi takip ediliyor!!!\n`;
        } else {
          replyMessage += `${e} isimli enayi ZATEN takip ediliyor!!!\n`;
        }
      });
      message.reply(replyMessage);
    } else if (args[0] === "sil") {
      args.shift();
      let replyMessage = "";

      args.forEach((s) => {
        let index = enayi.findIndex((v) => v.tag === s);
        if (index !== -1) {
          enayi.splice(index, 1);
          replyMessage += `${s} isimli enayi artık serbest bırakıldı!!!\n`;
        }
      });
      message.reply(replyMessage);
    } else if (args[0] === "liste") {
      const enayiList = new MessageEmbed();
      let enayiName = "";
      enayi.forEach((e) => (enayiName += e.tag + "\n"));
      enayiList
        .setTitle("Takip edilenler")
        .setDescription(enayiName)
        .setColor("#329dc7");
      message.reply({ embeds: [enayiList] });
    }
  },
};
