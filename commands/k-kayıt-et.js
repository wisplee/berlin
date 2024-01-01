const { PermissionsBitField, messageLink } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"kayıt-et",
    description: 'Bir üyeyi kayıt edersin!',
    type:1,
    options: [
        {
            name:"user",
            description:"Kimi kayıt etmek istiyorsun?",
            type:6,
            required:true
        },
        
           {
            name:"cinsiyet",
            description:"Cinsiyeti nedir?",
            type:8,
            required:true
        },
        {
            name:"isim",
            description:"İsmi nedir?",
            type:3,
            required:true
        },
        {
            name:"yaş",
            description:"Yaşı Kaçtır?",
            type:3,
            required:true
        },
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const member = interaction.options.getMember('user')
    const isim = interaction.options.getString('isim')
    const yas = interaction.options.getString('yaş')
    const cinsiyet = interaction.options.getRole('cinsiyet')
let kayıtsız = db.fetch(`kayıtsız_${interaction.guild.id}`)
if (!kayıtsız) return interaction.reply("Kayıtsız rolü ayarlanmamış!")
member.setNickname(`${isim} | ${yas}`)
interaction.guild.members.cache.get(member.id).roles.add(cinsiyet)
interaction.guild.members.cache.get(member.id).roles.remove(kayıtsız)
interaction.reply("Başarıyla üye kayıt edildi!")


}

};