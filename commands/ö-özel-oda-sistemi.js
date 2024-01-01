const { PermissionsBitField, ChannelType } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"özel-oda-sistemi",
    description: 'Özel oda sistemini kurarsın!',
    type:1,
    options: [
     
        {
            name:"isim",
            description:"Sesli kanalın ismi ne olsun?",
            type:3,
            required:true
        },
      
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const isim = interaction.options.getString('isim')
    interaction.guild.channels.create({name: isim, type: ChannelType.GuildVoice})
    db.set(`özeloda_${interaction.guild.id}`, isim)
    interaction.reply("Özel Oda Başarıyla Açıldı.")
}

};