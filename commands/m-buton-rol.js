const { PermissionsBitField, messageLink, EmbedBuilder } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"buton-rol",
    description: 'Buton rol sistemini çalıştırırsın!',
    type:1,
    options: [
        {
            name:"rol",
            description:"Ne rolü verilecek?",
            type:8,
            required:true
        },
           {
            name:"description",
            description:"Mesajda ne yazacak?",
            type:3,
            required:true
        },
        {
            name:"buton",
            description:"Butonda ne yazacak?",
            type:3,
            required:true
        },
       
    ],
  run: async(client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const buton = interaction.options.getString('buton')
    const description = interaction.options.getString('description')
    const rol = interaction.options.getRole('rol')
    const embed = new EmbedBuilder()
    .setTitle("Checkers - Buton Rol Sistemi!")
    .setDescription(description)
    .setColor("Red")
    const Discord = require("discord.js")
    let butonid = Date.now().toString(36);
    const row = new Discord.ActionRowBuilder()
    .addComponents(
new Discord.ButtonBuilder()
.setLabel(buton)
.setStyle(Discord.ButtonStyle.Danger)
.setCustomId("butonrol" + butonid))
interaction.channel.send({embeds: [embed], components: [row]}).then(mesaj => {
interaction.reply({content: "Sistem Başarıyla Kuruldu.", ephemeral: true})
db.set(`butonrols_${mesaj.id}`, {buton: butonid, rol: rol.id})
db.set(`butonrol_${butonid}`, rol.id)
db.set(`butonmesaj_${mesaj.id}`, mesaj.id)
})
}

};