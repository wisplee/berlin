const { PermissionsBitField, messageLink, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"para-ekle",
    description: 'Birinin hesabına para eklersin!',
    type:1,
    options: [
      {
        name:"user",
        description:"Kime para ekliceksin?",
        type:6,
        required:true
    },
    {
        name:"miktar",
        description:"Ne kadar ekleyeceksin?",
        type:3,
        required:true
    },
       
    ],
  run: async(client, message) => {
   
    if(message.user.id !== "1018213224262414337") return message.reply("Bu komutu sadece **Ly3ssia** kullanabilir.")
    let miktar = message.options.getString('miktar')
    let kullanıcı = message.options.getMember("user")
    const embed = new EmbedBuilder()
    .setDescription(`Para Ekleyen: ${message.user}\nMiktar: **${miktar}**\nPara Atılan: ${kullanıcı}`)
    .setColor("DarkRed")
    message.reply({embeds: [embed]})
    db.add(`para_${kullanıcı.id}`, miktar)
}
}
