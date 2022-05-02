export default (client) => {
  client.addListener("messageCreate", (message) => {
    console.log(message.author.username + ": " + message.content);
    if (message.content == "ahmet") message.reply("selam");
  });
};
