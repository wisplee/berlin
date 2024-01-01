const { PermissionsBitField, ChannelType } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"özel-odanı-sil",
    description: 'Özel odan varsa silersin!',
    type:1,
    options: [
     
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
  
    let odasi = db.fetch(`oda_${interaction.user.id}`)
    if (!odasi) return interaction.reply("Sana ait bir oda bulamadım!")
   interaction.reply("Başarıyla odanı sildim")
    interaction.guild.channels.delete(odasi)
}

};