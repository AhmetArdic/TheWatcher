export default (client) => {
  const msg1 = process.env.MSG1;
  const msg2 = process.env.MSG2;
  client.on("ready", () => {
    console.log("bot hazır!!");

    var voiceChannels = client.channels.cache.clone();
    voiceChannels.sweep((value) => !(value.type == "GUILD_VOICE"));
  });
};
