const Discord = require("discord.js")
const botconfig = require("./botconfig.json")
var fs = require('fs');
var bot = new Discord.Client()
var channelID = process.env.ch_ID
const JsonBinIoApi = require('jsonbin-io-api');
const api = new JsonBinIoApi(process.env.Secret_key);
var sleep = require('sleep');
var binID = process.env.bin_ID

//var add = api.readBin({id: botconfig.binID,version: 'latest'}).then(datajson =>{ });   




bot.on("ready",function(){
    //console.log('List GUilds : '+bot.guilds.array())
    console.log("Ready.....................")
})


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
      
      
      
    
})

function getDataz(){
    
    api.readBin({id: binID,version: 'latest'})
    .then(datajson =>{
        var newobj =""
        console.log(datajson.length)
        for(let i = 0; i < datajson.length ; ++i){
            if(datajson[i].deadtime > 0){
                //console.log(datajson[i])
               newobj = newobj+JSON.stringify(datajson[i])
            }
        }
        bot.channels.get(channelID).send(JSON.stringify(newobj))
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
        if(obj[i].name === nametime[0]){
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

               var bossDeadTimez = new Date(year , month ,d , hz , mz , s); // เวลาตายของบอส แต่ละตัว
               var countDownDatez = new Date(bossDeadTimez.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).getTime(); //แปลงเป็น วินานที่เพื่คำนวน
            // console.log(bossDeadTimez)
            //console.log(countDownDatez+"+"+obj[i].cooldown)
             var timespawn = countDownDatez+obj[i].cooldown+25200000  //เวลาบอสตาย + คูลดาว + 7hr
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
                   var bosstimespawn = hours+":"+minutes
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
      var newobj2 = newobj
      //console.log(newobj)
      timestart()
      for ( var j = 0 ; j < newobj2.length ; ++j){
        
  
            if( newobj2[j].deadtime  >  0 ){
                    // ดึงเวลาปัจจุบัน
                var currentUtcTimez = new Date();
                var now = new Date(currentUtcTimez.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).getTime();
  
                // เวลาบอสเกิด
                var tbozz = newobj2[j].bossspawn.split(':') //แยกกเวลา h m
                //console.log(tbozz[0]+" : "+tbozz[1])
                var hxx = tbozz[0]
                var mxx = tbozz[1]
                var Timebossszzx = new Date(year , month ,d , hxx , mxx , s); // เวลาตายของบอส แต่ละตัว
                var bossspawntimexx = new Date(Timebossszzx.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).getTime(); //แปลงเป็น วินานที่เพื่คำนวน
                var chktimenow = bossspawntimexx - now
                //console.log(chktimenow)
                if (chktimenow <= -1000 ){
                    newobj2[j].deadtime = newobj[j].bossspawn
                        var tdzz = newobj2[j].deadtime.split(':') //แยกเวลา h m
                        var hzz = tdzz[0]
                        var mzz = tdzz[1]

                        var bossDeadTimezz = new Date(year , month ,d , hzz , mzz , s); // เวลาตายของบอส แต่ละตัว
                        var countDownDatezz = new Date(bossDeadTimezz.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })).getTime(); //แปลงเป็น วินานที่เพื่คำนวน
                       
                        var timespawnz = countDownDatezz+newobj2[j].cooldown+25200000  //เวลาบอสตาย + คูลดาว + 7hr
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
                            var bosstimespawnz = hoursz+":"+minutesz
                            newobj2[j].bossspawn = bosstimespawnz   //แทนค่า .bossspawn  ใน obj 

                            alertz = alertz+newobj2[j].name+"    ["+newobj2[j].deadtime+"]   "+newobj2[j].cooldown /(1000 * 60 * 60) +" ชม.    ["+newobj2[j].bossspawn+"]*<คาดเดา>\n"
                }
                if ( chktimenow > -1000){
                  alertz = alertz+newobj2[j].name+"    ["+newobj2[j].deadtime+"]   "+newobj2[j].cooldown /(1000 * 60 * 60) +" ชม.    ["+newobj2[j].bossspawn+"]\n"
                }
            }
      }
  
  
      //console.log(JSON.stringify(newobj))
      bot.channels.get(channelID).send("```css\n#"+alertz+"```")
      //mintimeboss()
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

  
bot.login(process.env.BOT_TOKEN)
