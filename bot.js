const Local_server = require('./commands/local.js')
const Discord = require('discord.js');
const client = new Discord.Client();
// Create a Json file which would contain ur discord bot Token and it's prefix

const Prefix = "$";       // Default prefix
let prefix = Prefix;      // Set prefix

require('dotenv').config();// .env file which contain Token


client.once('ready', () => {
    console.log("Connected as " + client.user.tag);
    // client.channels.cache.get("817064482714419230").send("Cường đang Online trong này!");
})

//----------------Listening------------------
client.on('message', msg => {
    // logging everything from server
    console.log(msg.member.displayName+ ': "'+msg.content+'" in '+msg.channel.name);
    // Prefix checking
    if(msg.content == '<@!'+client.user.id+'>' || msg.content == '<@'+client.user.id+'>'){
        msg.channel.send("Prefix: "+prefix);
        msg.channel.send("Created by Hi There with LOVE!❤💕");
    }
    // Start with the right prefix
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;
    let str = msg.content.substring(prefix.length);
    console.log("Command regconized: "+str)    // Log everything
    let arr = str.trim().split(/ +/);
    
    switch(arr[0].toLowerCase()){
        case "h" || "help":
            // Text all commands

            break;
        case "ping":
            // Ping
            msg.channel.send("You expected me to reply 'Pong'?\nBut hell no mother fxcker!! F you!!");
            break;
        case "invite":
            // Invite code
            msg.channel.send('https://discord.com/oauth2/authorize?client_id='+client.user.id+'&scope=bot');
            break;
        case "say":
            // Repeat exactly what they say
            msg.channel.send(str.substring(arr[0].length))
            break;
        case "prefix":
            // Working with prefix
            if(msg.author == msg.guild.ownerID && arr.length == 2){
                // If author is admin
                console.log("Is Guild-master")
                if(arr[1] == "default"){
                    prefix = Prefix;
                    msg.channel.send("Prefix changed to: "+Prefix);
                }else{
                    prefix = arr[1];
                    msg.channel.send("Prefix changed to: "+arr[1]);
                }
            }else if(msg.author != msg.guild.ownerID && arr.length == 2){
                // If author is not admin
                msg.channel.send("You must be the server's admin to change the Prefix.😒");
            }else{
                // If no argument
                msg.channel.send("Prefix: "+prefix);
                msg.channel.send("Created by Hi There with LOVE!❤💕");
            }
            break;
        case "admin":
            if(msg.author == msg.guild.ownerID && msg.channel.id == "819213272741314582" && arr.length>1){
                if(str.substring(arr[0].length+arr[1].length+2).length != 0)
                {
                    client.channels.cache.get(arr[1]).send(str.substring(arr[0].length+arr[1].length+2)) 
                }else if(arr[1]=="h" || "help"){
                    msg.channel.send("help")

                }
            }else{
                msg.channel.send("You're not allow to use it here!!👀👀")
            }
            break;
        case "audio":
            if(arr.length==3&& arr[2].startsWith("https://www.youtube.com/watch?v=")){
                Local_server.Download_audio(arr[2], arr[1])
                msg.channel.send("Audio downloaded!")
            }else{
                msg.channel.send(`The sytax should be:\n${prefix}audio [file name] [youtube url]`)
            }
            break;
        case "ls":
            let files="";
            let count=0
            Local_server.audio_files().forEach(f => {
                count++;
                files+=count+". "+f+"\n";
            })
            msg.channel.send("`"+files+"`")
            break
        case "dl":
            if(arr.length==2){
                let choice = parseInt(arr[1])-1;
                const attachment = new Discord.MessageAttachment("./audio/"+Local_server.audio_files()[choice])
                msg.channel.send(`${msg.author} requested file:`, attachment);
            }else{
                msg.channel.send(`The sytax should be:\n${prefix}dl [file_id]`)
            }
            break
        case "avatar":
            if(msg.mentions.users.size){
                let member=msg.mentions.users.first()
            if(member){
                const emb=new Discord.MessageEmbed().setImage(member.displayAvatarURL()).setTitle(member.username)
                msg.channel.send(emb)
            }
            else{
                msg.channel.send("Sorry none found with that name")    
            }
            }else{
                const emb=new Discord.MessageEmbed().setImage(msg.author.displayAvatarURL()).setTitle(msg.author.username)
                msg.channel.send(emb)
            }
            break
        case "play":
            if (!msg.member.voice.channel) {
                msg.reply('You need to join a voice channel first!');
                return
            }
            if(arr[1] == 'local' && arr.length == 3){
                let choice = parseInt(arr[2])-1;
                let song = Local_server.audio_files()
                console.log(song[choice])
                msg.member.voice.channel.join().then(con => {
                    con.play(`./audio/${song[choice]}`,{volume: 0.5})
                })
            }
            if(arr[1].startsWith("https://www.youtube.com/watch?v=")){
                Local_server.playYT(msg, arr[1])
            }
            break
        case "leave":
            
            break
    }
})

//----------------Initialize-------------------
client.login(process.env.BOT_TOKEN);