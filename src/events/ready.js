export default (client) => {
  client.on("ready", () => {
    console.log("bot hazır!!");

    const presenceList = [
      { name: "müconun deliğiyle", type: "PLAYING" },
      { name: "müconun deliğini", type: "WATCHING" },
    ];

    setInterval(() => {
      const randomPresence = Math.floor(Math.random() * presenceList.length);
      client.user.setPresence({ activities: [presenceList[randomPresence]] });
    }, 5000);

    var voiceChannels = client.channels.cache.clone();
    voiceChannels.sweep((value) => !(value.type == "GUILD_VOICE"));
  });
};
