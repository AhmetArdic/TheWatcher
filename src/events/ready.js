export default (client) => {
  client.on("ready", () => {
    console.log("bot hazır!!");

    var voiceChannels = client.channels.cache.clone();
    voiceChannels.sweep((value) => !(value.type == "GUILD_VOICE"));
  });
};
