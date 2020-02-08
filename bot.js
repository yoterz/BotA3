const Discord = require("discord.js")
const botconfig = require("./botconfig.json")
var fs = require('fs');
var bot = new Discord.Client()
var channelID = process.env.ch_ID
//var channelID = botconfig.channelID
const JsonBinIoApi = require('jsonbin-io-api');
const api = new JsonBinIoApi(process.env.Secret_key);
//const api = new JsonBinIoApi(botconfig.SecretKey);
var sleep = require('system-sleep');
var binID = process.env.bin_ID
//var binID = botconfig.binID

//var add = api.readBin({id: botconfig.binID,version: 'latest'}).then(datajson =>{ });   
var newobj2
var alz = 0



bot.on("ready",function(){
    //console.log('List GUilds : '+bot.guilds.array())
    console.log("Ready.....................")
})

setInterval(()=>status(), 25000);
setInterval(()=>alertz(), 30000);

bot.on("message", (msg) => {

  if (msg.content.startsWith("+")){ 
    if (msg.channel.id === channelID){  
      var namebozz = msg.content.split('+')
      var nametime = namebozz[1].split(' ')
           
      updateDataz(nametime)
    }
  }  
 
      if (msg.content.startsWith("list")){ 
        if (msg.channel.id === channelID){ 
              console.log(">list")
              min2max()
            //getDataz()
           
        }
      }   


    if (msg.content.startsWith("nameboss")){ 
        if (msg.channel.id === channelID){ 
                var data = fs.readFileSync('bosslist.txt', 'utf8');
                console.log(">Nameboss")
                //console.log(data.toString());   
                msg.channel.send("```"+data.toString()+"```")
        }
      }   

      if (msg.content.startsWith("save")){ 
        if (msg.channel.id === channelID){ 
               savedatas()
                
        }
      }   
      
      if (msg.content.startsWith("data")){ 
        if (msg.channel.id === channelID){ 
              console.log(">data")
             
            getDataz()
           
        }
      }   
      
    
})

function getDataz(){
    
    api.readBin({id: binID,version: 'latest'})
    .then(datajson =>{
        
        console.log(datajson)
        
     });   
 }


 function updateDataz(nametime){
    
    api.readBin({id: binID,version: 'latest'})
    .then(datajson =>{
        updateDataz2(datajson,nametime)
     });   
 }
function updateDataz2(obj,nametime){
   
    console.log(nametime[0]+" : "+nametime[1])
    for(let i = 0; i < obj.length ; ++i){
        if(obj[i].name === nametime[0]){  //ตรวจชื่อ
            obj[i].deadtime = nametime[1] //แทนค่า .deadtime  ใน obj 

            //obj[i].bossspwan
            if (nametime[1] == '0'){
                obj[i].bossspawn = 0
                obj[i].timems = 0

              }
              else {
         
              timestart()

               var tdz = obj[i].deadtime.split('.') //แยกเวลา h m
               //console.log(obj[i].deadtime)
               //console.log(obj[i].cooldown)
               var hz = tdz[0]
               var mz = tdz[1]

               var bossDeadTimez1 = new Date(year , month ,d , hz , mz , s); // เวลาตายของบอส แต่ละตัว
               var bossDeadTimez = bossDeadTimez1+25200000
               var countDownDatez = new Date(bossDeadTimez.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).getTime(); //แปลงเป็น วินานที่เพื่คำนวน
            // console.log(bossDeadTimez)
            //console.log(countDownDatez+"+"+obj[i].cooldown)
             var timespawn = countDownDatez+obj[i].cooldown//+25200000  //เวลาบอสตาย + คูลดาว + 7hr***
             obj[i].timems = timespawn   ////แทนค่า .timems  ใน obj 
             //console.log(timespawn)
                 var days = Math.floor(timespawn / (1000 * 60 * 60 * 24));
                 var hours = Math.floor((timespawn % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                 var minutes = Math.floor((timespawn % (1000 * 60 * 60)) / (1000 * 60));
                 var seconds = Math.floor((timespawn % (1000 * 60)) / 1000);
               
                   //**แต่งเวลาให้สวย
                   if (hours < 10) {
                     hours = "0" + hours;
                   }
                   if (minutes < 10) {
                     minutes = "0" + minutes;
                   }
                 
                   //console.log("spawn  =  "+hours+":"+minutes)
                   var bosstimespawn = hours+"."+minutes
                   obj[i].bossspawn = bosstimespawn   //แทนค่า .bossspawn  ใน obj 
            }
        }
    } 

   api.updateBin({id: binID,data: obj,versioning: true}).then(); //******update data json */
   bot.channels.get(channelID).send("`add  >> "+nametime[0]+" : "+nametime[1]+"`")

     
  
}



function min2max(){
    
    api.readBin({id: binID,version: 'latest'})
    .then(datajson =>{
        min2maxz(datajson)
     });   
 }
function min2maxz(obj){
    var alertz = "Name #Deadtime #respawnTime #spawnTime"+"\n"      
    var newobj = obj
    //เรียงน้อยไปมาก
      for ( var i = 0 ; i < newobj.length ; ++i){
           
            for (var m = 0 ; m < newobj.length ; ++m){
            //console.log("i="+i+"  m="+m)
                  if( newobj[i].timems < newobj[m].timems){
                    
                    var tmp = newobj[m]
                    newobj[m] = newobj[i]
                    newobj[i] = tmp
                    //console.log("i="+i+" m="+m+"  "+JSON.stringify(newobj[i]))
                  }
             }
      }
      newobj2 = newobj
      //console.log(newobj)
      timestart()
      for ( var j = 0 ; j < newobj2.length ; ++j){
        
  
            if( newobj2[j].deadtime  >  0 ){
                    // ดึงเวลาปัจจุบัน
                var currentUtcTimez = new Date();
                var now = new Date(currentUtcTimez.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).getTime();
  
                // เวลาบอสเกิด
                var tbozz = newobj2[j].bossspawn.split('.') //แยกกเวลา h m
                //console.log(tbozz[0]+" : "+tbozz[1])
                var hxx = tbozz[0]
                var mxx = tbozz[1]
                var Timebossszzx1 = new Date(year , month ,d , hxx , mxx , s); // เวลาตายของบอส แต่ละตัว
                var Timebossszzx = Timebossszzx1+25200000
                var bossspawntimexx = new Date(Timebossszzx.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).getTime(); //แปลงเป็น วินานที่เพื่คำนวน
                var chktimenow = bossspawntimexx - now
                //console.log(chktimenow)
                if (chktimenow <= -1000 ){
                    newobj2[j].deadtime = newobj[j].bossspawn
                        var tdzz = newobj2[j].deadtime.split('.') //แยกเวลา h m
                        var hzz = tdzz[0]
                        var mzz = tdzz[1]

                        var bossDeadTimezz2 = new Date(year , month ,d , hzz , mzz , s); // เวลาตายของบอส แต่ละตัว
                        var bossDeadTimezz = bossDeadTimezz2+25200000
                        var countDownDatezz = new Date(bossDeadTimezz.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).getTime(); //แปลงเป็น วินานที่เพื่คำนวน
                       
                        var timespawnz = countDownDatezz+newobj2[j].cooldown //+25200000 //เวลาบอสตาย + คูลดาว + 7hr****
                        newobj2[j].timems = timespawnz   ////แทนค่า .timems  ใน obj 
                       
                            var daysz = Math.floor(timespawnz / (1000 * 60 * 60 * 24));
                            var hoursz = Math.floor((timespawnz % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            var minutesz = Math.floor((timespawnz % (1000 * 60 * 60)) / (1000 * 60));
                            var secondsz = Math.floor((timespawnz % (1000 * 60)) / 1000);
                        
                            //**แต่งเวลาให้สวย
                            if (hoursz < 10) {
                                hoursz = "0" + hoursz;
                            }
                            if (minutesz < 10) {
                                minutesz = "0" + minutesz;
                            }
                            
                            //console.log("spawn  =  "+hours+":"+minutes)
                            var bosstimespawnz = hoursz+"."+minutesz
                            newobj2[j].bossspawn = bosstimespawnz   //แทนค่า .bossspawn  ใน obj 

                            alertz = alertz+newobj2[j].name+"    ["+newobj2[j].deadtime+"]   "+newobj2[j].cooldown /(1000 * 60 * 60) +" ชม.    ["+newobj2[j].bossspawn+"]*<คาดเดา>\n"
                }
                if ( chktimenow > -1000){
                  alertz = alertz+newobj2[j].name+"    ["+newobj2[j].deadtime+"]   "+newobj2[j].cooldown /(1000 * 60 * 60) +" ชม.    ["+newobj2[j].bossspawn+"]\n"
                }
            }
      }

      //หา min time ใน newobj2
        timestart()
        var testmin = 0
        var min = 0
        for ( i = 0; i < newobj2.length; ++i) {
      
          if( newobj2[i].bossspawn != "0") {
          
                var tboss = newobj2[i].bossspawn.split('.') //แยกกเวลา h m
                //console.log(tboss[0]+":"+tboss[1])
                
                var hzz = tboss[0]
                var mzz = tboss[1]
                //เวลาที่ อยู่ใน list 
                var Timebossszv = new Date(year , month ,d , hzz , mzz , s); // เวลาตายของบอส แต่ละตัว
                var Timebosssz = Timebossszv
                var mintimez = new Date(Timebosssz.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).getTime(); //แปลงเป็น วินานที่เพื่คำนวน
                var timespawnz = mintimez//+25200000  //เวลาบอสตาย + คูลดาว + 7hr
                //เวลาปัจุบัน
                var currentUtcTimezv = new Date(); // This is in UTC
                var currentUtcTimez = currentUtcTimezv
                var timenowz = new Date(currentUtcTimez.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).getTime();
                var timenow = timenowz//+25200000
              if( timespawnz > timenow ){
                if (testmin == 0){testmin = timespawnz}
                if (testmin >= timespawnz && newobj2[i].deadtime !== "0"){
                  testmin = timespawnz
                  min = newobj2[i]     //ชื่อ และ เวลา ตัวที่จะเกิดต่อไป
                }
              }  
          }
        }   
            //console.log(min)
            //bot.channels.get(channelID).send("```yaml\n NEXT Boss : "+min.name+"  เวลาเกิด :  "+min.bossspawn+" น.```")
     
      
      //console.log(JSON.stringify(newobj2))
      //bot.channels.get(channelID).send("```css\n#"+alertz+"```")
      //mintimeboss()

      const embed = new Discord.RichEmbed()
      // .setTitle(titel)  //หัวข้อ
       //.setAuthor("Boss Timer ThBDO", "https://www.picz.in.th/images/2018/06/22/48XhJt.png")  //icon หัวขอ
       .setColor(0x112263)   //ใส่สี
       .setDescription("```css\n#"+alertz+"```")   //รายละเอียด
       .addField("```บอสตัวต่อไป #```","```yaml\n NEXT Boss : "+min.name+"  เวลาเกิด :  "+min.bossspawn+" น.```")
       //.setFooter("Boss Timer ThBDO ") //รูป ข้อความล่างสุด
      //.setImage(PicRo)     //รูปใหญ่
      // .setThumbnail(chkboss().imgboss)   //รูปเล็กขวาบนผ
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


function alertz(){
     api.readBin({id: binID,version: 'latest'})
    .then(datajson =>{
        alertzz(datajson)
     });   
 }
  function alertzz(obj){
    // เอาเวลา ( bossspawn - เวลาปัจจุบัน ) = 5(300000ms) นาที     ให้แจ้งเตื่อน
    //console.log("Alertz")
    timestart()
      
    for ( i = 0; i < obj.length; ++i) {
  
      if( obj[i].bossspawn != "0") {
              // ดึงเวลาปัจจุบัน
              var currentUtcTimez = new Date();
              //var currentUtcTimez = currentUtcTimezz +25200000
              var now = new Date(currentUtcTimez.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).getTime();
  
              // เวลาบอสเกิด
              var tbozs = obj[i].bossspawn.split('.') //แยกกเวลา h m
              //console.log(tbozs[0]+":"+tbozs[1])
              var hxz = tbozs[0]
              var mxz = tbozs[1]
              var Timebossszzz = new Date(year , month ,d , hxz , mxz , s); // เวลาตายของบอส แต่ละตัว
              var Timebossszz = Timebossszzz +25200000
              var bossspawntimez = new Date(Timebossszz.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).getTime(); //แปลงเป็น วินานที่เพื่คำนวน
  
              var timeAlerz = bossspawntimez - now
  
                // Time calculations for days, hours, minutes and seconds
                  var days = Math.floor(timeAlerz / (1000 * 60 * 60 * 24));
                  var hours = Math.floor((timeAlerz % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                  var minutes = Math.floor((timeAlerz % (1000 * 60 * 60)) / (1000 * 60));
                  var seconds = Math.floor((timeAlerz % (1000 * 60)) / 1000);
                    //**แต่งเวลาให้สวย
                    if (hours < 10) {
                      hours = "0" + hours;
                    }
                    if (minutes < 10) {
                      minutes = "0" + minutes;
                    }
  
                //console.log("timeAlerz : "+timeAlerz+" >>"+obj[i].name+" >> "+hours+":"+minutes)
  
              if ( timeAlerz > 285000 && timeAlerz < 315000 ){
                ++alz
                console.log("Alertz")
                if (alz === 2 ){
                  
                const embed = new Discord.RichEmbed()
                 .setColor(0xff0000)   //ใส่สี
                 //.setDescription("```css\n#"+alertz+"```")   //รายละเอียด
                 .addField("```บอสตัวต่อไป #```","```yaml\n อีก 5 นาที : "+obj[i].name+"  เวลาเกิด :  "+obj[i].bossspawn+" น.```")
                 .setTimestamp()  //เวลาด้านล่างสุดผ
                  bot.channels.get(channelID).send({embed})
                alz = 0
                }
              }
          
          
              if ( timeAlerz > -75000 && timeAlerz < -45000 ){
                    ++alz
                  
                  if (alz === 1 ){
                      console.log("Alert")
                      min2max()
                    }
                  
                  if (alz === 2 ){
                      console.log("SaveData")
                      savedatas()
                        alz = 0
                  }
              }


          
          
       }
    }
  
  }


  function savedatas(){    
                          if(newobj2){
                          console.log("มี")
                          api.updateBin({id: binID,data: newobj2,versioning: true}).then(); //******update data json */
                          bot.channels.get(channelID).send("`> Save Data แล้ว //ถ้าไม่มีการแก้ไขเวลา จะเซทเวลารอบต่อไปที่บรรทัด*<คาดเดา>โดยอัตโนมัติ`")

                        }else {
                          console.log("ไม่มี")
                          bot.channels.get(channelID).send("`!!!! Save Data ไม่ได้ ไม่มีข้อมูล ให้พิมพ์ list เพื่อตรวจสอบก่อน`")
                        }
      
      setTimeout(min2max,3000)
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
    
    

    //bot.user.setGame("BotL2M")
}


bot.login(process.env.BOT_TOKEN)
//bot.login(botconfig.tokenbotdiscord)
