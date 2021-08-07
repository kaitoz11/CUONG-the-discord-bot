const fs = require('fs');
const ytdl = require('ytdl-core');
const Discord = require('discord.js');
const client = new Discord.Client();
// Create a Json file which would contain ur discord bot Token and it's prefix

const Prefix = "$";       // Default prefix
let prefix = Prefix;      // Set prefix

require('dotenv').config();// .env file which contain Token


client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
    client.channels.cache.get("817064482714419230").send("Cường đang Online trong này!");
})

//----------------Listening------------------
client.on('message', msg => {
    // logging everything from server
    console.log(msg.member.displayName+ ': "'+msg.content+'" in '+msg.channel.name);
    // Prefix checking
    if(msg.content == '<@!'+client.user.id+'>' || msg.content == '<@'+client.user.id+'>'){
        msg.channel.send("Prefix: "+prefix);
        msg.channel.send("Created by Hi There with LOVE <3");
    }
    // Start with the right prefix
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;
    let str = msg.content.substring(prefix.length);
    console.log(str)    // Log everything
    let arr = str.toLowerCase().trim().split(/ +/);
    switch(arr[0]){
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
                msg.channel.send("You must be the server's admin to change the Prefix");
            }else{
                msg.channel.send("Prefix: "+prefix);
                msg.channel.send("Created by Hi There with LOVE <3");
            }
            break;
        case "admin":
            if(msg.author == msg.guild.ownerID && msg.channel.id == "819213272741314582" && arr.length>1){
                if(str.substring(arr[0].length+arr[1].length+2).length != 0)
                {
                    client.channels.cache.get(arr[1]).send(str.substring(arr[0].length+arr[1].length+2)) 
                }else if(arr[1]=="h" || "help"){
                    // msg.channel.send()

                }
            }
            break;
        // case "join":
            
    }
})

//----------------Initialize-------------------
client.login(process.env.BOT_TOKEN);