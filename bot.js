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
    if(!msg.content.startsWith(Prefix)){
        return
    }

    switch(msg.content.substring(1).toLowerCase()){
        case "ping":
            msg.channel.send("What's up mah fellow?");
            msg.channel.send("*Eat my pp!!!*");
            break;
        case "zzz":
            msg.channel.send('@everyone Ngủ đê!!!!');
            break;
    }
})

client.login(Token)