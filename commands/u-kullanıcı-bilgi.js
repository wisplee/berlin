const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const moment = require('moment')
moment.locale('TR')
module.exports = {
    name:"kullanıcı",
    description: 'Kullanıcı hakkında bilgi edinirsin.',
    type:1,
    options: [
        {
            name:"user",
            description:"Kim hakkında bilgi ediniceksin?",
            type:6,
            required:true
        },
      
    ],
  run: async(client, message) => {

    const member = message.options.getMember('user')
 
        const status = {
            online: 'Çevrimiçi',
            idle: ' Klavyeden Uzakta',
            dnd: ' Rahatsız Etmeyin',
            offline: ' Çevrimdışı'
        }
const embed = new EmbedBuilder()
.setTitle("Checkers - Kullanıcı Bilgi")
.setDescription(`Kullanıcı Adı: ${member.user.username}\nKullanıcı ID: ${member.id}\nStatus: ${status[member.presence.status]}\nHesap Oluşturulma Tarihi: ${moment.utc(member.user.createdAt).format('LLLL')}\nSunucuya Katılım Tarihi: ${moment.utc(member.joinedAt).format('LLLL')}\nRolleri: ${member.roles.cache.map(role => role.toString())}`)
.setColor("#ff0000")
message.reply({embeds: [embed]})
}

};