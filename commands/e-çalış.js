const { PermissionsBitField, messageLink, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"çalış",
    description: 'Köle gibi çalışırsın!',
    type:1,
    options: [
       
       
    ],
  run: async(client, message) => {
    let aclik = db.fetch(`bar_${message.user.id}`)
    const embed2 = new EmbedBuilder()
    .setDescription("Üzgünüm, açlık barın tamamen bitmiş.Bir şeyler yemelisin.")
    .setColor("Red")
    if(aclik < 0) return message.reply({embeds: [embed2]})

    let miktarsonuç = Math.floor(Math.random() * 99) + 1
    var sebep = ["tadilatçı olarak çalıştı","emlakçı olarak çalıştı","aşçı olarak çalıştı", "enginar satıcısı olarak çalıştı","dilenci olarak çalıştı","enginar olarak çalıştı","Enes batur olarak çalıştı","Pythonic olarak çalıştı","su satıcısı olarak çalıştı","boş boş durdu"]
    var sebepsonuç = sebep[Math.floor(Math.random() * sebep.length)];
    db.add(`para_${message.user.id}`, miktarsonuç)
    db.add(`bar_${message.user.id}`, -3)
    let miktar = 3
    let paran = db.fetch(`para_${message.user.id}`)
    const embed = new EmbedBuilder()
    .setDescription("Başarıyla köle gibi çalıştın.\nİş: **"+sebepsonuç+"**\nKazanılan Para: **"+miktarsonuç+"**\nToplam Paran: **"+paran+"**")
    .setColor("Red")
    return message.reply({embeds: [embed]})
}
}

