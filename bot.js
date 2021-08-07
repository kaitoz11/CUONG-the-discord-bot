'use strict'
const Discord = require('discord.js');
// Create a Json file which contain ur discord bot Token and it's prefix
const Prefix = "$"
const client = new Discord.Client();
const fs = require('fs');
const ytdl = require('ytdl-core');
require('dotenv').config();
let prefix = Prefix;


client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
    client.channels.cache.get("817064482714419230").send("Cường đang Online trong này!")
})

client.on('message', msg => {
    // logging ev
    console.log(msg.member.displayName+ ': "'+msg.content+'" in '+msg.channel.name);

    if(msg.content == '<@!'+client.user.id+'>' || msg.content == '<@'+client.user.id+'>'){
        msg.channel.send("Prefix: "+prefix);
        msg.channel.send("Created by Hi There with LOVE <3");
    }

    if(!msg.content.startsWith(prefix) || msg.author.bot) return;
    let str = msg.content.substring(prefix.length);
    console.log(str)    // Log everything
    let arr = str.toLowerCase().trim().split(/ +/);
    switch(arr[0]){
        case "h" || "help":
            // Text all commands

            break;
        case "ping":
            msg.channel.send("What's up mah fellow?");
            msg.channel.send("*Eat my pp!!!*");
            break;
        case "zzz":
            msg.channel.send('@everyone Ngủ đê!!!!');
            break;
        case "invite":
            msg.channel.send('https://discord.com/oauth2/authorize?client_id='+client.user.id+'&scope=bot');
            break;
        case "say":
            msg.channel.send(str.substring(arr[0].length))
            break;
        case "prefix":
            if(msg.author == msg.guild.ownerID && arr.length == 2){
                console.log("Is Guild-master")
                if(arr[1] == "default"){
                    prefix = Prefix;
                }else{
                    msg.channel.send("Prefix changed to: "+arr[1]);
                    prefix = arr[1];
                }
            }else if(msg.author != msg.guild.ownerID && arr.length == 2){
                msg.channel.send("You must be the server's admin to change the Prefix");
            }else{
                msg.channel.send("Prefix: "+prefix);
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

client.login(process.env.BOT_TOKEN);