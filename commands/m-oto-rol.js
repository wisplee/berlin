const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"oto-rol",
    description: 'Otomatik Rol Sistemini Ayarlarsın!',
    type:1,
    options: [
        {
            name:"rol",
            description:"Ne Rolü Verilecek?",
            type:8,
            required:true
        },
       
          
        
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "Kanalları Yönet Yetkin Yok!", ephemeral: true})
    const kanal2 = interaction.options.getRole('rol')
   db.set(`otorol_${interaction.guild.id}`, kanal2.id)
   const embed = new EmbedBuilder()
   .setDescription("Oto Rol Başarıyla <@&"+kanal2+"> Olarak Ayarlandı.")
   .setColor("Red")
   interaction.reply({embeds: [embed]})
}

};