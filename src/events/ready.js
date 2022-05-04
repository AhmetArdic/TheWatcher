export default (client) => {
  const msg1 = process.env.MSG1;
  const msg2 = process.env.MSG2;
  client.on("ready", () => {
    console.log("bot hazır!!");

    const presenceList = [
      { name: msg1, type: "PLAYING" },
      { name: msg2, type: "WATCHING" },
    ];

    setInterval(() => {
      const randomPresence = Math.floor(Math.random() * presenceList.length);
      client.user.setPresence({ activities: [presenceList[randomPresence]] });
    }, 10000);

    var voiceChannels = client.channels.cache.clone();
    voiceChannels.sweep((value) => !(value.type == "GUILD_VOICE"));
  });
};
