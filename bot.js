'use strict'
const Discord = require('discord.js');
// Create a Json file which contain ur discord bot Token and it's prefix
const { Prefix, Token } = require('./config.json');
const client = new Discord.Client()


client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
    client.channels.cache.get("817064482714419230").send("Cường đang Online trong này!")
})

client.on('message', msg => {
    console.log(msg.member.displayName+ ': "'+msg.content+'" in '+msg.channel.name);
    if(!msg.content.startsWith(Prefix) || msg.author.bot) return;
    let str = msg.content.substring(1);
    console.log(str)
    let arr = str.toLowerCase().trim().split(/ +/);
    switch(arr[0]){
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
    }
})

client.login(Token)