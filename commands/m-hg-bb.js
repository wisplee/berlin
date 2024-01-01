const { PermissionsBitField, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"giriş-çıkış",
    description: 'Giriş Çıkış Sistemini Ayarlarsın!',
    type:1,
    options: [
        {
            name:"kanal",
            description:"Giriş Çıkış Kanalını Ayarlar!",
            type:7,
            required:true,
            channel_types:[0]
        
        },
          
        
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "Kanalları Yönet Yetkin Yok!", ephemeral: true})
    const kanal2 = interaction.options.getChannel('kanal')
   db.set(`hgbb_${interaction.guild.id}`, kanal2.id)
   const embed = new EmbedBuilder()
   .setDescription("Hoşgeldin Güle Güle Kanalı Başarıyla <#"+kanal2+"> Olarak Ayarlandı!")
   .setColor("Red")
   interaction.reply({embeds: [embed]})
}

};