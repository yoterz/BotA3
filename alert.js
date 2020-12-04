const Discord = require("discord.js")
var alz = 0

var bot = new Discord.Client()

var channelName = "general"
var channelID = '574551663474507777' //storz



bot.on("ready",function(){
    console.log('List GUilds : '+bot.guilds.array())
    console.log('Name Channel : '+channelName)
    console.log("Ready.....................")
})

//setInterval(()=>status(), 30000);
setInterval(()=>alertz(), 30000);

bot.on("message", (msg) => {

  
     
  if (msg.content.startsWith("qqqq")){
    timestart()
    console.log(h+" : "+m)
    sendEmbed()
  }   

 

    
})



 function alertz(){

   timestart()
            
        if (h == 10  && m == 55){
          ++alz
                  
          if (alz === 1 ){
              console.log("Alert")
              sendEmbed()
            }
          
          if (alz === 2 ){
             alz = 0
          }
        }


        if (h == 15  && m == 25){
          ++alz
                  
          if (alz === 1 ){
              console.log("Alert")
              sendEmbed()
            }
          
          if (alz === 2 ){
             alz = 0
          }
        }


        if (h == 22  && m == 55){
          ++alz
                  
          if (alz === 1 ){
              console.log("Alert")
              sendEmbed()
            }
          
          if (alz === 2 ){
             alz = 0
          }
        }
         
  
 
 }


 function sendEmbed(){

    const embed = new Discord.RichEmbed()
    .setColor(0xff0000)   //ใส่สี
    //.setDescription("```css\n#"+alertz+"```")   //รายละเอียด
    .addField("```World boss #```","```yaml\n อีก 5 นาที : บอสโลกเกิด```")
    .setTimestamp()  //เวลาด้านล่างสุดผ
     bot.channels.get(channelID).send({embed})
     

 }

 function timestart(){
  currentUtcTime = new Date(); // This is in UTC
  thTimeZone = new Date(currentUtcTime.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }))
 
  countz = new Date(currentUtcTime.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).getTime()

  day= thTimeZone.getDay()   
  d = thTimeZone.getDate()
  month = thTimeZone.getMonth()
  year = thTimeZone.getFullYear()
  h = thTimeZone.getHours()
  m = thTimeZone.getMinutes()   
  s = thTimeZone.getSeconds()
 //days = new Array('Sun', 'Monร์', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat')
 //months = new Array('Jan', 'feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
}


function status(){     
  
    // ดึงเวลาปัจจุบัน
    var currentUtcTimez = new Date();
    var now = new Date(currentUtcTimez.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).getTime();
    // เวลาที่จะถึง-เวลาปัจจุบัน
    var distance = now ;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
   
       //**แต่งเวลาให้สวย
      if (hours < 10) {
        hours = "0" + hours;
       }
      if (minutes < 10) {
        minutes = "0" + minutes;
       }

     bot.user.setGame(hours + ":"+ minutes+ " น.")
    
        
}

bot.login(process.env.BOT_TOKEN)
