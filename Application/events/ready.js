export default (client) => {
  /* default sekilde fonksiyon dondurduk, bunuda app.js altindan
  default ile yakalayacagiz */

  client.addListener("ready", () => {
    //* ready, yani botun sunucuya baglanmasi bir kez oldugundan
    //* 1 kez yani once calismasi yeterlide olur, fakat benim
    //* yapacagim islem surekli calisiyor
    // veya client.on() şeklinde de kullanılabilir
    /* bazi islemler client hazir olunca yapilabilir
    örnegin presence degistirme */

    console.log("bot hazır!!");

    const presenceList = [
      { name: "müconun deliğiyle", type: "PLAYING" },
      { name: "müconun deliğini", type: "WATCHING" },
    ];

    setInterval(() => {
      const randomPresence = Math.floor(Math.random() * presenceList.length);
      client.user.setPresence({ activities: [presenceList[randomPresence]] });
    }, 5800);
  });
};
