const botconfig = require('./botconfig.json');

const Discord = require('discord.js')
const bot = new Discord.Client()
bot.login(process.env.BOT_TOKEN)
bot.on("ready",() => {
    console.log('Ready...')

})


bot.on("message", (msg) => {
    if (msg.content === "เบีย"){
       titel = "Fujosy"
       picz = "pic.beer"
       sendembed(titel,picz)         
  
    }

})

function sendembed(titel,picz){
     const embed = new Discord.RichEmbed()
    .setTitle(titel)  //หัวข้อ
    .setColor(0x030663)   //ใส่สี
    .setImage(picz)     //รูปใหญ่
    .setTimestamp()  //เวลาด้านล่างสุด
     msg.channel.send({embed});
    
}
