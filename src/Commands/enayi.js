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
      if (!enayi.some((name) => name.tag === args[1])) {
        enayi.push({
          tag: args[1],
        });

        message.reply(`${args[1]} isimli enayi takip ediliyor!!!`);
      } else {
        message.reply(`${args[1]} isimli enayi zaten takip ediliyor!!!`);
      }
    } else if (args[0] === "sil") {
      let index = enayi.findIndex((v) => v.tag === args[1]);
      if (index !== -1) {
        enayi.splice(index, 1);

        message.reply(`${args[1]} isimli enayi artık serbest bırakıldı!!!`);
      }
    } else if (args[0] === "liste") {
      let enayiName = "";
      enayi.forEach((e) => (enayiName += e.tag + "\n"));
      message.reply(enayiName + "isimli enayiler takip ediliyor!!");
    }
  },
};
