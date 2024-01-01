const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    name:"nuke",
    description: 'Kanalı silip tekrar açarsın!',
    type:1,
    options: [
       
    ],
  run: async(client, message) => {

    if(!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.reply({content: "Üyeleri Yasakla Yetkin Yok!", ephemeral: true})
    message.channel.clone({position: message.channel.position});
    message.channel.delete();
}

};