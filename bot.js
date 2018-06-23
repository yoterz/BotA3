const botconfig = require('./botconfig.json');

const Discord = require('discord.js')
const bot = new Discord.Client()
bot.login(process.env.BOT_TOKEN)
bot.on("ready",() => {
    console.log('Ready...')

})


bot.on("message", (msg) => {
    if (msg.content === "aa"){

      const embed = new Discord.RichEmbed()
    .setTitle("Test github")  //หัวข้อ
    .setAuthor("Boss Timer BDO", "https://www.picz.in.th/images/2018/06/22/48XhJt.png")  //icon หัวขอ

    .setTimestamp()  //เวลาด้านล่างสุด
     msg.channel.send({embed});
    
    }

})
