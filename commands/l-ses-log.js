const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"ses-log",
    description: 'Ses logu kurarsın!',
    type:1,
    options: [
        {
            name:"kanal",
            description:"Ses Logunu Ayarlar!",
            type:7,
            required:true,
            channel_types:[0]
        
        },
          
        
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "Kanalları Yönet Yetkin Yok!", ephemeral: true})
    const kanal2 = interaction.options.getChannel('kanal')
   db.set(`ses_${interaction.guild.id}`, kanal2.id)
   const embed = new EmbedBuilder()
   .setDescription("Ses Log Kanalı Başarıyla <#"+kanal2+"> Olarak Ayarlandı!")
   .setColor("Red")
   interaction.reply({embeds: [embed]})
}

};