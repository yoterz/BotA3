const botconfig = require('./botconfig.json');
const pic = require('./pic.json');

const Discord = require('discord.js')
const bot = new Discord.Client()
bot.login(process.env.BOT_TOKEN)
bot.on("ready",() => {
    console.log('Ready...')

})



bot.on("message", (msg) => {
    if (msg.content === "ทำเบียร์"){
       titel = "เบียร์"
       picz = pic.beerz
        sendembed()
     }
    
    if (msg.content === "เบีย"){
       titel = "Fujosy"
       picz = pic.beer
        sendembed()
     }
    if (msg.content === "เบียร์"){
       titel = "Fujosy"
       picz = pic.beer
        sendembed()
     }
      if (msg.content === "พี่โย"){
       titel = "Yoyo"
       picz = pic.yo
        sendembed()
     }
      if (msg.content === "เนส"){
       titel = "Nestty"
       picz = pic.nest
        sendembed()
     }
      if (msg.content === "nest"){
       titel = "Nestty"
       picz = pic.nest
        sendembed()
     }
    
        
    
      if (msg.content === "setname"){
       bot.user.setUsername('น้ำมัน')
     }   
        
      if (msg.content === "info"){
       msg.channel.send('```'+'[info]  [ทำเบียร์]  [เบีย]  [เบียร์]  [เนส]  [nest]  [พี่โย]'+'```')
     }  
    
function sendembed(){
     const embed = new Discord.RichEmbed()
    .setTitle(titel)
    .setColor(0x030663)   //ใส่สี
    .setFooter("พิม info  ดูคำสั่ง ", "https://cdn.pixabay.com/photo/2017/08/27/22/02/pig-2687704_960_720.png") //รูป ข้อความล่างสุด
    .setImage(picz)     //รูปใหญ่
    .setTimestamp()  //เวลาด้านล่างสุด
     msg.channel.send({embed});
    }
})

