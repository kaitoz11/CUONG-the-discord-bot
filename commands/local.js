const ytdl = require("ytdl-core");
const fs = require("fs")

module.exports = {
    Download_audio: (Url, File_name)=>{
        ytdl(Url, {filter:"audioonly"}).pipe(fs.createWriteStream(`./audio/${File_name}.mp3`))
        let ts = Date.now()
        let date_ob = new Date(ts)
        let date = ("0" + date_ob.getDate()).slice(-2)
        let month = ("0" + date_ob.getMonth()).slice(-2)
        let year = date_ob.getFullYear()
        let hours = date_ob.getHours()
        let minutes = date_ob.getMinutes()
        let seconds = date_ob.getSeconds()
        let logging = `${date}/${month}/${year}-${hours}:${minutes}:${seconds}  #  ${Url} as ${File_name}`
        fs.appendFile('./logs/Download_logs.txt', logging+'\n', err => console.log(err))
        fs.appendFile('./logs/audio.txt', File_name+".mp3"+'\n', err => console.log(err))
    },
    audio_files: ()=>{
        let files=fs.readdirSync("./audio/")
        return files
    },
    playYT: (msg, url)=>{
        msg.member.voice.channel.join().then(con => {
            con.play(ytdl(url, { filter: 'audioonly' }),{volume: 0.5})
        })
    }
}