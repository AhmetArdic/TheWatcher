export default {
  name: "enayi",
  komutExecute(client, message, args) {
    if (args[0] !== "ekle" && args[0] !== "sil") return;

    if (args[0] === "ekle") {
      if (!client.enayi.some((name) => name.tag === args[1])) {
        client.enayi.push({
          tag: args[1],
        });

        message.reply(`${args[1]} isimli enayi takip ediliyor!!!`);
      } else {
        message.reply(`${args[1]} isimli enayi zaten takip ediliyor!!!`);
      }
    } else if (args[0] === "sil") {
      let index = client.enayi.findIndex((v) => v.tag === args[1]);
      if (index !== -1) {
        client.enayi.splice(index, 1);

        message.reply(`${args[1]} isimli enayi artık serbest bırakıldı!!!`);
      }
    }
  },
};
