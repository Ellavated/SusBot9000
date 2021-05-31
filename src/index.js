require("dotenv").config();
const {
  Client, MessageEmbed
} = require("discord.js");
const client = new Client();
const token = process.env.TOKEN;

const phrases = [
  "sus",
  "sussy",
  "amongus",
  "amugus",
  "amoungus",
  "amoung",
  "amog",
  "imposter",
  "impasta"
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

client.login(token);

client.on("ready", () => {
  console.log(`${client.user.username} | now online!`);
  console.log(`I am in ${client.guilds.cache.size} servers`);

  client.user.setActivity("the hit game Among Us", {
    type: "PLAYING"
  });
});

client.on("guildCreate", guild => {
  console.log(`${client.user.username} | Added to guild ${guild.name}`);
});

client.on("guildDelete", guild => {
  console.log(`${client.user.username} | Removed from guild ${guild.name}`);
});

client.on("message", message => {
  if (message.author.bot || !message.guild) return;
  if (message.channel.type != "text") return;

  const args = message.content.toLowerCase().split(" ");
  // help command
  if (args[0] == "-help") {
    let embed = new MessageEmbed()
      .setColor("RED")
      .setTitle(`Help for ${client.user.username}`)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription("To use to bot simply type 'sus'! There is even a rare chance for a special message when you type :3")
      .setFooter(`Created by LunaTheFloof#8447`)
      .setTimestamp();
    return message.channel.send(embed);
  } else if (args[0] == "-count") {
    if (message.author.id != "136631672425807872") return;
    let embed = new MessageEmbed()
      .setColor("RED")
      .setTitle("Server Count!")
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`Counts the number of servers the bot is in`)
      .addFields(
        {
          name: 'Total Servers',
          value: client.guilds.cache.size,
          inline: true
        },
        {
          name: 'Total Channels',
          value: client.channels.cache.size,
          inline: true,
        },
        {
          name: 'Total Users',
          value: client.users.cache.size,
          inline: true
        }
      )
      .setFooter(`Created by LunaTheFloof#8447`)
      .setTimestamp();
    return message.channel.send(embed);
  }


  for (var i in phrases) {
    if (args.includes(phrases[i].toLowerCase())) return message.reply("haha sus xD");
  }
  let num = getRandomInt(1, 51);
  if (num == 10) {
    message.channel.send(`${message.author} is lookin kinda sussy 😳`);
  }
});