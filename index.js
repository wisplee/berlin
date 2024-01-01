const { Client, EmbedBuilder, GatewayIntentBits, Partials, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const ravendb = require("raven.database");
const db = require("croxydb")
const Discord = require("discord.js")
const ms = require("ms")
const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs")
const { TOKEN } = require("./config.json");

/* Slash Komutları Yüklüyoruz */

readdirSync('./commands').forEach(f => {
  if(!f.endsWith(".js")) return;

 const props = require(`./commands/${f}`);

 client.commands.push({
       name: props.name.toLowerCase(),
       description: props.description,
       options: props.options,
       dm_permission: props.dm_permission,
       type: 1
 });

console.log(`[COMMAND] ${props.name} komutu yüklendi.`)

});


/* Slash Komutları Yüklüyoruz */

/* Eventleri Yüklüyoruz */

readdirSync('./events').forEach(e => {

  const eve = require(`./events/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
            eve(client, ...args)
        });

console.log(`[EVENT] ${name} eventi yüklendi.`)

});


/* Eventleri Yüklüyoruz */

client.login(TOKEN).then(app => {
  console.log(`[BOT] Token girişi başarılı.`)
}).catch(app => {
  console.log(`[BOT] Token girşi başarısız.`)
})


const modal = new ModalBuilder()
.setCustomId('form')
.setTitle('Checkers - Giveaway!')
  const a1 = new TextInputBuilder()
  .setCustomId('prize')
  .setLabel('Ödül')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Çekiliş Ödülü Ne Olacak?')
  .setRequired(true)
	const a2 = new TextInputBuilder() 
	.setCustomId('key')
	.setLabel('Key')
  .setStyle(TextInputStyle.Paragraph)  
	.setMinLength(1)
	.setPlaceholder('Çekilişin Anahtarı Ne Olacak? (Reroll, End)')
	.setRequired(true)
	const a3 = new TextInputBuilder() 
	.setCustomId('zaman')
	.setLabel('Süre')
  .setStyle(TextInputStyle.Paragraph)  
	.setMinLength(1)
	.setPlaceholder('1s/1m/1h/1d')
	.setRequired(true)
	
    const row = new ActionRowBuilder().addComponents(a1);
    const row3 = new ActionRowBuilder().addComponents(a3);
    modal.addComponents(row, row3);
  
   
client.on('interactionCreate', async (interaction) => {

	if (interaction.commandName ==="çekiliş-başlat") {
    const Discord = require("discord.js")
    if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return interaction.reply({content: "Üyeleri Yasakla Yetkin Yok!", ephemeral: true})    
    await interaction.showModal(modal);
	}
})
client.on('interactionCreate', async interaction => {
  if (interaction.type !== InteractionType.ModalSubmit) return;
  if (interaction.customId === 'form') {


const prize = interaction.fields.getTextInputValue("prize")
const time = interaction.fields.getTextInputValue('zaman')
let var1 = ms(time)
  
  let zaman = Date.now();

  let sure;
  let data
  try {
 data = ms(var1)
  } catch(err){
   interaction.reply("Girdiğin süre geçerli bir süre değil!")
  }
  if(data){
  let s = data.seconds;
  let m = data.minutes;
  let h = data.hours;
  let d = data.days;
  if (s) {
    sure = `${s} Seconds`;
  }
  if (m) {
    sure = `${m} Minutes`;
  }
  if (h) {
    sure = `${h} Hours`;
  }
  if (d) {
    sure = `${d} Days`;
  }
  let vars = await db.get(`cekilis.${interaction.guild.id}_${interaction.channel.id}`);
  if (!vars) {
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setEmoji("🎉")
      .setCustomId("giveaway")
      .setStyle(ButtonStyle.Primary)
    )
    let embed = new EmbedBuilder()
      .setColor("#5865f2")
      .setTitle(prize)
      .setTimestamp()
.setDescription(`
Süre: <t:${Math.floor(Date.now()/1000) + Math.floor(var1/1000)}:R> (<t:${Math.floor(Date.now() /1000) + Math.floor(var1/1000)}:f>)
Düzenleyen: <@${interaction.user.id}>
Kazanan: 1
Katılımcı: **0**`);
interaction.reply({content: "Çekiliş Başarıyla Oluşturuldu.", ephemeral: true})
    interaction.channel.send({embeds: [embed], components: [row]}).then(mesaj => {
      db.set(`cekilis_${mesaj.id}`, interaction.user.id)
      db.push(`user_${mesaj.id}`, interaction.user.id)
       db.set(`reroll_${interaction.guild.id}`, { channelID: interaction.channel.id, messageID: mesaj.id })
      db.set(`cekilis_${interaction.channel.id}`, {
        kanalid: interaction.channel.id,
        mesajid: mesaj.id,
        hosted: interaction.user.id,
        sure: var1,
        zaman: zaman,
        toplam: 1,
        odul: prize,
        ex: Math.floor(Date.now()/1000) + Math.floor(var1/1000)
      });
      db.set(`cekilis_${mesaj.id}`, {
        kanalid: interaction.channel.id,
        mesajid: mesaj.id,
        hosted: interaction.user.id,
        sure: var1,
        zaman: zaman,
        toplam: 1,
        odul: prize,
        ex: Math.floor(Date.now()/1000) + Math.floor(var1/1000)
      });
    
    });
   

  }

  }
}

})
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  let message = await interaction.channel.messages.fetch(interaction.message.id)
  if (interaction.customId === 'mod') {
const embed = new EmbedBuilder()
.setTitle("Checkers - Yardım!")
.setDescription("/ban - **Kullanıcıyı yasaklarsın!**\n/buton-rol - **Butonla rol verirsin.**\n/forceban - **Kullanıcıyı ID ile yasaklarsın.**\n/giriş-çıkış - **Giriş çıkış kanalını ayarlarsın.**\n/kick - **Bir kullanıcıyı sunucudan atarsın.**\n/nuke - **Kanalı silip tekrar açarsın.**\n/oto-rol - **Bot yeni girenlere otomatik rol verir.**\n/oylama - **Oylama açarsın.**\n/rol-al - **Bir kullanıcının rolünü alırsın.**\n/rol-oluştur - **Rol oluşturursun.**\n/rol-ver - **Rol verirsin.**\n/sa-as - **Selam sistemini açarsın.**\n/temizle - **Mesaj silersin.**\n/unban - **Yasak kaldırırsın.**")
.setColor("Green")
.setImage("https://cdn.discordapp.com/attachments/1020041291037417543/1020378625113079950/Checkers2.png")
message.edit({embeds: [embed], components: []})
  }
  if (interaction.customId === 'çekiliş') {
  const embed = new EmbedBuilder()
  .setTitle("Checkers - Yardım!")
  .setDescription("/çekiliş-başlat - **Çekiliş başlatırsın.**\n/çekiliş-bitir - **Çekiliş bitirirsin.**\n/çekiliş-yenile - **Çekilişi rerollersin.**")
  .setColor("Green")
.setImage("https://cdn.discordapp.com/attachments/1020041291037417543/1020378625113079950/Checkers2.png")
message.edit({embeds: [embed], components: []})
  }
  if (interaction.customId === 'özeloda') {
const embed = new EmbedBuilder()
.setTitle("Checkers - Yardım!")
.setDescription("/özel-oda-sistemi - **Özel oda sistemini kurarsın.**\n/özel-odanı-sil - **Özel odanı silersin.**\n/kullanıcı-ekle - **Özel odana kullanıcı eklersin.**\n/kullanıcı-at - **Odadan Kullanıcı Atarsın.**")
.setColor("Green")
.setImage("https://cdn.discordapp.com/attachments/1020041291037417543/1020378625113079950/Checkers2.png")
message.edit({embeds: [embed], components: []})
  }
  if (interaction.customId === 'destek') {
    const embed = new EmbedBuilder()
.setTitle("Checkers - Yardım!")
.setDescription("/destek-oluştur - **Destek sistemini kurarsın.**\n/destek-yetkilisi - **Destek yetkilisini ayarlarsın.**")
.setColor("Green")
.setImage("https://cdn.discordapp.com/attachments/1020041291037417543/1020378625113079950/Checkers2.png")
message.edit({embeds: [embed], components: []})
  }
  if (interaction.customId === 'log') {
    const embed = new EmbedBuilder()
.setTitle("Checkers - Yardım!")
.setDescription("/ses-log - **Ses logunu ayarlarsın.**\n/mesaj-log - **Mesaj logu ayarlarsın.**\n/küfür-log - **Küfür logunu ayarlarsın.**\n/reklam-log - **Reklam logunu ayarlarsın.**\n/etiket-log - **Etiket logunu ayarlarsın.**")
.setColor("Green")
.setImage("https://cdn.discordapp.com/attachments/1020041291037417543/1020378625113079950/Checkers2.png")
message.edit({embeds: [embed], components: []})
  }
  if (interaction.customId === 'ekonomi') {
    const embed = new EmbedBuilder()
.setTitle("Checkers - Yardım!")
.setDescription("/açlık - **Açlığına bakarsın.**\n/banka - **Bankana bakarsın.**\n/çalış - **Çalışırsın köle gibi hemde.**\n/cf - **Kumar oynarsın.**\n/envanter - **Envanterine bakarsın.**\n/günlük - **Babandan günlük harçlık dilenirsin.**\n/market - **Yemek alırsın.**\n/para-çal - **Para çalarsın.**\n/para-çek - **Bankadan para çekersin.**\n/para-gönder - **Birine para yollarsın.**\n/para-yatır - **Bankaya para yatırırsın.**\n/param - **Parana Bakarsın.**\n/yemek-ye - **Zıkkımlanırsın.**")
.setColor("Green")
.setImage("https://cdn.discordapp.com/attachments/1020041291037417543/1020378625113079950/Checkers2.png")
message.edit({embeds: [embed], components: []})
  }
  if (interaction.customId === 'cguard') {
    const embed = new EmbedBuilder()
.setTitle("Checkers - Yardım!")
.setDescription("/küfür-engel - **Küfür engel sistemini ayarlarsın.**\n/reklam-engel - **Reklam engel sistemini ayarlarsın.**")
.setColor("Green")
.setImage("https://cdn.discordapp.com/attachments/1020041291037417543/1020378625113079950/Checkers2.png")
message.edit({embeds: [embed], components: []})
  }
  if (interaction.customId === 'eğlence') {
    const embed = new EmbedBuilder()
.setTitle("Checkers - Yardım!")
.setDescription("/afk - **Afk Olursun.**\n/atatürk - **Rastgele atatürk fotoğrafına bakarsın.**\n/avatar - **Birinin avatarına bakarsın.**\n/emoji-yazı - **Bot emoji ile yazı yazar.**\n/etiket-bilgi - **Etiket bilgi sistemini açarsın**\n/istatistik - **Botun istatistiğine bakarsın.**\n/kaç-cm - **Emaneti ölçersin.**\n/kullanıcı - **Kullanıcı hakkında bilgi edinirsin.**\n/ping - **Botun pingine bakarsın.**\n/sunucu - **Sunucu hakkında bilgi edinirsin.**\n/yardım - **Yardım menüsüne bakarsın.**")
.setColor("Green")
.setImage("https://cdn.discordapp.com/attachments/1020041291037417543/1020378625113079950/Checkers2.png")
message.edit({embeds: [embed], components: []})
  }
})
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  let message = await interaction.channel.messages.fetch(interaction.message.id)
  if (interaction.customId === 'giveaway') {
    const varmi = db.get(`user_${interaction.message.id}`)
    let data = db.get(`cekilis_${interaction.channel.id}`)
    if(!varmi) {
      let odul = data.odul
      let sure = data.ex
      let hosted = data.hosted
 
      db.push(`user_${interaction.message.id}`, interaction.user.id)
      interaction.reply({content: "Başarıyla çekilişe katıldın!", ephemeral: true})
      let katılımcı = db.get(`user_${interaction.message.id}`).length;

      const embed = new EmbedBuilder()
      .setTitle(odul)
      .setDescription(`
      Süre: <t:${sure}:R> (<t:${sure}:f>)
      Düzenleyen: <@${hosted}>
      Kazanan: 1
      Katılımcı: **${katılımcı}**`)
      .setColor("Blurple")
      message.edit({embeds: [embed]})
    } else if(varmi.includes(interaction.user.id)) {
         
      db.unpush(`user_${interaction.message.id}`, interaction.user.id)
      interaction.reply({ content: `Başarıyla çekilişten ayrıldın!` , ephemeral: true })
      let katılımcı = db.get(`user_${interaction.message.id}`).length;
      let odul = data.odul
      let sure = data.ex
      let hosted = data.hosted
      const embed = new EmbedBuilder()
      .setTitle(odul)
      .setDescription(`
      Süre: <t:${sure}:R> (<t:${sure}:f>)
      Düzenleyen: <@${hosted}>
      Kazanan: 1
      Katılımcı: **${katılımcı}**`)
      .setColor("Blurple")
      message.edit({embeds: [embed]})
    } else {
      let odul = data.odul
      let sure = data.ex
      let hosted = data.hosted
      db.push(`user_${interaction.message.id}`, interaction.user.id)
      interaction.reply({content: "Başarıyla çekilişe katıldın!", ephemeral: true})
      let katılımcı = db.get(`user_${interaction.message.id}`).length;
      const embed = new EmbedBuilder()
      .setTitle(odul)
      .setDescription(`
      Süre: <t:${sure}:R> (<t:${sure}:f>)
      Düzenleyen: <@${hosted}>
      Kazanan: 1
      Katılımcı: **${katılımcı}**`)
      .setColor("Blurple")
      message.edit({embeds: [embed]})
    }
}
})
client.on("ready", async () => {
  const moment = require("moment") 
  require("moment-duration-format")
  moment.locale("tr")
 setInterval(async () => {
   client.guilds.cache.map(async guild => {
     guild.channels.cache.map(async channel => {
       let datax = db.fetch(`cekilis_${channel.id}`);
      if (!datax) return;
        let mesaj = datax.mesajid
      
      let data = db.get(`cekilis_${mesaj}`)
       if (data) {
         let time = Date.now() - data.zaman;
         let sure = data.sure;

let kanal = guild.channels.cache.get(data.kanalid);
kanal.messages.fetch(data.mesajid).then(async mesaj => {
           })

        if (time >= sure) {
          let winner = [];
          let kazanan = db.get(`user_${mesaj}`)[
            Math.floor(Math.random() * db.get(`user_${mesaj}`).length)];
            if (!winner.map((winir) => winir).includes(kazanan)) winner.push(kazanan);
         
             
          
           
     
           kanal.messages.fetch(data.mesajid).then(async mesaj => {   
            let katılımcı = db.get(`user_${mesaj.id}`).length;       
             const embed = new EmbedBuilder()
               .setTitle(data.odul)
              .setColor("#5865f2")
               .setTimestamp()
             .setDescription(`
Sona Erdi: <t:${Math.floor(Date.now() /1000)}:R> (<t:${Math.floor(Date.now() /1000)}:f>)
Düzenleyen: <@${data.hosted}>
Kazanan: <@${winner}> 
Katılımcı: **${katılımcı}**`)
           mesaj.edit({embeds: [embed], components: []})  
    
            if(winner){
             db.set(`cekilis_${mesaj.id}`, data.odul);  
             db.delete(`cekilis_${channel.id}`);
            
             kanal.send(`Tebrikler <@${winner}> **${data.odul}** Kazandın!`)
           db.set(`son_${mesaj.id}`, true)
       
            } else {
              db.delete(`cekilis_${mesaj.id}`);  
              db.delete(`cekilis_${channel.id}`);                
               const embed = new EmbedBuilder()
               .setTitle(data.odul)
              .setColor("#5865f2")
             .setDescription(`
Sona Erdi: <t:${Math.floor(Date.now() /1000)}:R> (<t:${Math.floor(Date.now() /1000)}:f>)
Düzenleyen: <@${data.hosted}>
Kazanan: Bilinmiyor.
Katılımcı: **0**`) 
mesaj.edit({embeds: [embed], components: []})

         
            }
                   })                                           
                  }
         }
       })
       }
     );
   });
 }, 5000);
 
client.on("messageCreate", (message) => {
  const db = require("croxydb")
  if (!message.guild) return;
  let kufur = db.fetch(`kufurengel_${message.guild.id}`)
  if(!kufur) return;
  const Discord = require("discord.js")
  if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)){
  if(kufur) {
  const kufurler = [
    
    "amk",
    "piç",
    "yarrak",
    "oç",
    "göt",
    "amq",
    "yavşak",
    "amcık",
    "amcı",
    "orospu",
    "sikim",
    "sikeyim",
    "aq",
    "mk"
       
  ]
  
if(kufurler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
const embed = new EmbedBuilder()
.setDescription("<@"+message.author.id+"> Bu Sunucuda Küfürler **Checkers** Tarafından Engellenmektedir.")
.setColor("Red")
message.channel.send({embeds: [embed]})
let log = db.fetch(`kfrlog_${message.guild.id}`)
if (!log) return;
const embed2 = new EmbedBuilder()
.setDescription("<@"+message.author.id+"> Adlı Kullanıcı Küfür Etti.")
.setColor("Red")
client.channels.cache.get(log).send({embeds: [embed2]})
}
}
  }
})
client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let reklamlar = db.fetch(`reklamengel_${message.guild.id}`)
  if(!reklamlar) return;
  if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)){

  if(reklamlar) {

  const linkler = [
    
    ".com.tr",
    ".net",
    ".org",
    ".tk",
    ".cf",
    ".gf",
    "https://",
    ".gq",
    "http://",
    ".com",
    ".gg",
    ".porn",
    ".edu"
       
  ]
  
if(linkler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
const embed = new EmbedBuilder()
.setDescription("<@"+message.author.id+"> Bu Sunucuda Reklamlar **Checkers** Tarafından Engellenmektedir.")
.setColor("Red")
let log = db.fetch(`rklmlog_${message.guild.id}`)
if (!log) return;
const embed2 = new EmbedBuilder()
.setDescription("<@"+message.author.id+"> Adlı Kullanıcı Reklam yaptı.")
.setColor("Red")
client.channels.cache.get(log).send({embeds: [embed2]})
message.channel.send({embeds: [embed]})
}
}
  }
})
 client.on("voiceStateUpdate", (oldState, newState) => {
  let oldChannel = oldState.channel;
  let newChannel = newState.channel;
  let kisi = newState.member;
  let kanal = db.fetch(`ses_${newState.guild.id}`)
if (!kanal) return;
  if (oldChannel === null) {
    const embed = new EmbedBuilder()
    .setDescription("<@"+kisi.id+"> Adlı Kullanıcı Bir Ses Kanalına Giriş Yaptı.")
    .setColor("Red")
  return client.channels.cache.get(kanal).send({embeds: [embed]})
  }
    if (newChannel === null) {
      const embed = new EmbedBuilder()
      .setDescription("<@"+kisi.id+"> Adlı Kullanıcı Bir Ses Kanalından Çıkış Yaptı.")
      .setColor("Red")
      return client.channels.cache.get(kanal).send({embeds: [embed]})
    }
  if (oldChannel !== newChannel) {
    const embed = new EmbedBuilder()
    .setDescription("<@"+kisi.id+"> Adlı Kullanıcı Bir Ses Kanalına Giriş Yaptı.")
    .setColor("Red")
  return client.channels.cache.get(kanal).send({embeds: [embed]})
    }});
 client.on("messageDelete", async message => {
  if (!message.guild) return;
  if(message.author?.bot) return;
  let log = db.fetch(`mesaj_${message.guild.id}`)
if (!log) return;
const embed = new EmbedBuilder()
.setAuthor({name: ""+message.author.username+" Adlı Kişinin Mesajı Silindi."})
.setDescription("Silinen Mesaj:\n```"+message.content+"```")
.setColor("Green")
client.channels.cache.get(log).send({embeds: [embed]})
 })
 client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (!oldMessage.guild) return;
if (newMessage.author?.bot) return;
let log = db.fetch(`mesaj_${newMessage.guild.id}`)
if (!log) return;

const embed = new EmbedBuilder()
.setAuthor({name: ""+newMessage.author.username+" Adlı Kişi Mesajını Düzenledi."})
.setDescription("Düzenlenen mesaj:\n```"+oldMessage.content+"```\nYeni Mesaj: ```"+newMessage.content+"```")
.setColor("Green")
client.channels.cache.get(log).send({embeds: [embed]})
 })
 client.on("messageDelete", async message => {
  const db = require("croxydb");

 
  const kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  let sistem = await db.get(`etiketbilgi_${kullanıcı.id}`);
                     
  if (sistem) {
      const kullanıcı = message.mentions.users.first();
    const Discord = require("discord.js")
    const row = new Discord.ActionRowBuilder()
    .addComponents(
    new Discord.ButtonBuilder()
    .setLabel("Destek Sunucusu")
    .setStyle(Discord.ButtonStyle.Link)
    .setURL("https://discord.gg/altyapilar")
    )
    const embed = new EmbedBuilder()
    .setColor("Gold")
    .setDescription(`<@${message.author.id}> [${message.author.tag}](https://discord.com/users/${message.author.id}) tarafından etiketlendin ama mesaj silindi.\n\nMesaj İçeriği: ${message.content}\n\nMesajı Silen: <@${message.author.id}> [${message.author.tag}](https://discord.com/users/${message.author.id}) \nSilinen Kanal: <#${message.channel.id}>\n\nMesaj Yazılış Tarihi: <t:${Math.floor(Date.now() /1000)}:R>`)
	.setAuthor({ name: `Checkers`, iconURL: `https://cdn.discordapp.com/avatars/1019567212484378644/defbc39017a659a3804598ab2cba1d9c.webp?size=1024`})
             
  kullanıcı.send({embeds: [embed], components: [row]}).catch(err => message.channel.send(`${kullanıcı} Dm Kutun Kapalı Olduğu İçin Etiket Bilgi Sistemi Otomatik Olarak Kapatıldı.`) ? db.delete(`etiketbilgi_${kullanıcı.id}`) :  null)

   }
});
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  if(interaction.customId === "ticket") {
    const Discord = require("discord.js")
    let mod = db.fetch(`destekmod_${interaction.guild.id}`)
    db.add(`sayi_${interaction.guild.id}`, 1)
    let sayi = db.fetch(`sayi_${interaction.guild.id}`) || "1"
    const row = new Discord.ActionRowBuilder()
    .addComponents(
    new Discord.ButtonBuilder()
    .setEmoji("🔒")
    .setStyle(Discord.ButtonStyle.Success)
    .setCustomId("kapat")
    )
     interaction.guild.channels.create({
      name: `ticket-${sayi}`,
        type: Discord.ChannelType.GuildText,

        permissionOverwrites: [
          {   
              id: interaction.guild.id,
              deny: [Discord.PermissionsBitField.Flags.ViewChannel]
          },
          {
              id: interaction.user.id,
              allow: [Discord.PermissionsBitField.Flags.ViewChannel]
          },
          {
              id: mod,
              allow: [Discord.PermissionsBitField.Flags.ViewChannel]
          }
      ]
    })
    
          
          .then((c)=>{
         
              const i1 = new Discord.EmbedBuilder()
              .setTitle(client.user.username + " - Destek Sistemi!")
              .setDescription(`${interaction.user} Destek talebi başarıyla oluşturuldu.`)
              .setColor("Green")
              c.send({embeds: [i1], components: [row]})
              interaction.reply({content: `Biletiniz başarıyla açıldı. <#${c.id}>`, ephemeral: true})
          })
  
  
    
  }
})
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  if(interaction.customId === "kapat") {
    let channel = interaction.channel
    channel.delete()
    
  }
})
client.on("guildMemberAdd", member => {
  const kanal = db.get(`kayıtsız_${member.guild.id}`)
  if(!kanal) return;
  member.guild.members.cache.get(member.id).roles.add(kanal)

})
client.on('voiceStateUpdate', (newMember) => {
  const { ChannelType } = require("discord.js")
  const db = require("croxydb")
  let kanal = db.fetch(`özeloda_${newMember.guild.id}`)
  if (newMember.member.voice.channel != null && newMember.member.voice.channel.name.startsWith(kanal)) {
  newMember.guild.channels.create({name: `║👤 ${newMember.member.displayName}`, type: ChannelType.GuildVoice}).then((sesli) => {
    newMember.member.voice.setChannel(sesli.id)
db.set(`oda_${newMember.id}`, sesli.id)
db.set(`oda2_${newMember.id}`, sesli)
sesli.permissionOverwrites.create(
  newMember.guild.roles.everyone, {ViewChannel: false}
  
  )
  })
}
      }   
)

const mod = new ModalBuilder()
.setCustomId('eklemenu')
.setTitle('Godzilla - Kullanıcı Ekleme!')
  const e = new TextInputBuilder()
  .setCustomId('uyeid')
  .setLabel('Kullanıcı ID')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(10)
  .setPlaceholder('Eklemek istediğiniz kullanıcı ID girin.')
  .setRequired(true)
  const row2 = new ActionRowBuilder().addComponents(e);
  
  mod.addComponents(row2);
client.on('interactionCreate', async (interaction) => {

	if (interaction.commandName ==="kullanıcı-ekle") {

  let odasiz = db.fetch(`oda_${interaction.user.id}`)
    if (!odasiz) return interaction.reply({content: "Sana Ait Bir Oda Bulamadım!", ephemeral: true})
    await interaction.showModal(mod);
	}
})  

const mod2 = new ModalBuilder()
.setCustomId('eklemenu2')
.setTitle('Godzilla - Kullanıcı Çıkarma!')
  const a = new TextInputBuilder()
  .setCustomId('cikarid')
  .setLabel('Kullanıcı ID')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(10)
  .setPlaceholder('Çıkarmak istediğiniz kullanıcı ID girin.')
  .setRequired(true)
  const row34 = new ActionRowBuilder().addComponents(a);
  
  mod2.addComponents(row34);
client.on('interactionCreate', async (interaction) => {

	if (interaction.commandName ==="kullanıcı-at") {
    let odasiz = db.fetch(`oda_${interaction.user.id}`)
    if (!odasiz) return interaction.reply({content: "Sana Ait Bir Oda Bulamadım!", ephemeral: true})
    await interaction.showModal(mod2);
	}
})  

client.on('interactionCreate', async interaction => {
  if (interaction.type !== InteractionType.ModalSubmit) return;
  if (interaction.customId === 'eklemenu2') {
      const id = interaction.fields.getTextInputValue('cikarid')
    let oda = interaction.member.voice.channel
    console.log(oda)
    oda.permissionOverwrites.create(
      id, {ViewChannel: false}      
      )
      interaction.reply("<@"+id+"> Adlı Kullanıcı Odadan Başarıyla Atıldı")
    } else {
  }
})
client.on('interactionCreate', async interaction => {
  if (interaction.type !== InteractionType.ModalSubmit) return;
  if (interaction.customId === 'eklemenu') {
      const id = interaction.fields.getTextInputValue('uyeid')
    let oda = interaction.member.voice.channel
    console.log(oda)
    oda.permissionOverwrites.create(
      id, {ViewChannel: true}      
      )
      interaction.reply("<@"+id+"> Adlı Kullanıcı Odaya Eklendi")
    } else {
  }
})
  client.on('interactionCreate', async interaction => {
          if (!interaction.isButton()) return;
          if (!interaction.customId.startsWith("butonrol")) return;
          let butonrol = db.fetch(`butonrol_${interaction.message.id}`) || db.fetch(`butonrols_${interaction.message.id}`)
          let butons = butonrol.butonid
          let rol = butonrol.rol 
          db.set(`butonrol_${butons}`, rol)
         db.delete(`butonrol_${interaction.message.id}`)
         let butonrols = db.fetch(`butonrol_${butons}`)
          if(!interaction.member.roles.cache.has(butonrols)) { 
              interaction.member.roles.add(butonrols)
            interaction.reply({content: "Rol Başarıyla Verildi!", ephemeral: true})
             } else {
               
              interaction.member.roles.remove(butonrols)
            interaction.reply({content: "Rol Başarıyla Alındı!", ephemeral: true})
             
          }
            }
          )
          client.on("messageCreate", (message) => {
  
            let saas = db.fetch(`saas_${message.guild.id}`)
            if(!saas) return;
            
            if(saas) {
            
            let selaamlar = message.content.toLowerCase()  
          if(selaamlar === 'sa' || selaamlar === 'slm' || selaamlar === 'sea' || selaamlar === ' selamünaleyküm' || selaamlar === 'Selamün Aleyküm' || selaamlar === 'selam'){
          
          message.channel.send(`<@${message.author.id}> Aleykümselam, Hoşgeldin ☺️`)
          }
          }
          })


          client.on("messageCreate", async message => {
            const db = require("croxydb");
          
            if (await db.get(`afk_${message.author.id}`)) {
             
              db.delete(`afk_${message.author.id}`);
          
              message.reply("Afk Modundan Başarıyla Çıkış Yaptın!");
            }
          
            var kullanıcı = message.mentions.users.first();
            if (!kullanıcı) return;
            var sebep = await db.get(`afk_${kullanıcı.id}`);
          
            if (sebep) {
              message.reply("Etiketlediğin Kullanıcı **"+sebep+"** Sebebiyle Afk Modunda!");
            }
          });











/*
const {  AuditLogEvent, PermissionsBitField } = require('discord.js');

client.on("guildMemberAdd", member => {
    if(!db.fetch(`korumaLog.channel_${member.guild.id}`)) return;

    const botKoruması = db.fetch(`botkoruma_${member.guild.id}`)
    const adminKoruması = db.fetch(`korumaLog.guardAdmin_${member.guild.id}`)
    const hesapKoruması = db.fetch(`korumaLog.guardAccountUser_${member.guild.id}`)

    if(botKoruması) {

        if(member.user?.bot) {
          console.log("31")

            if(!db.fetch(`botizin_${member.user.id}${member.guild.id}`)) {

                const fetchedLogs = member.guild.fetchAuditLogs({
                    limit: 1,
                    type: AuditLogEvent.BotAdd,
                });

            const deletionLog = fetchedLogs.entries.first();

            const { executor, target } = deletionLog;

            if(executor) {

            const embed = new EmbedBuilder()
            .setColor("#FEE75C")
            .setThumbnail(target.displayAvatarURL({ dynamic: true }))
            .setDescription("⚠️ | **"+member.user.tag+"** kara listede bulunduğu için sunucdan atıldı.\n```/bot-koruması izni "+member.user.id+"```")
            .setFooter({ text: `${executor.tag} tarafından eklendi.`, iconURL: executor.displayAvatarURL({ dynamic: true }) })


                member.kick();
}
            }

        }

    }

    if(adminKoruması) {

      if(member.permissions.has(PermissionsBitField.Flags.Administrator)) {

        member.kick();
        const embed = new EmbedBuilder()
        .setColor("#FEE75C")
        .setDescription("⚠️ | **"+member.user.tag+"** yönetici izinli giriş yaptığı için sunucudan atıldı.")


      }

    }

    if(hesapKoruması) {

        const now = new Date().getTime() - client.users.cache.get(member.id).createdAt.getTime() < 1296000000

        if(now) {


			member.kick();
			
				 


		}

    }
  


})*/
