const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"kayıtsız-rol",
    description: 'Kayıtsız rolünü ayarlarsın!',
    type:1,
    options: [
        {
            name:"rol",
            description:"Lütfen bir rol etiketle!",
            type:8,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const rol = interaction.options.getRole('rol')
    db.set(`kayıtsız_${interaction.guild.id}`, rol.id)
    interaction.reply({content: "Kayıtsız rolü başarıyla <@&"+rol+"> Olarak Ayarlandı."})
}

};