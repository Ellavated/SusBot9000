require("dotenv").config();
const {
  Client, MessageEmbed
} = require("discord.js");
const client = new Client();
const token = process.env.TOKEN;
const owner_id = "136631672425807872";

// Array<String> here

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

const replies = [
  "haha sus xD", 
  "yoo thats kinda sus bro", 
  "is the sussy imposter lmao",
  "vented in electrical"
];

// functions here

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// BOT STARTS HERE

client.login(token);

client.on("ready", () => {
  console.log(`${client.user.username} | now online!`);
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
  if (!message.guild.me.hasPermission("SEND_MESSAGES") || !message.guild.me.hasPermission("VIEW_CHANNEL")) return; // this was an actual issue in servers for some reason

  const args = message.content.toLowerCase().split(" ");
  switch (args[0]) {
    case "-help": // help command
      let helpEmbed = new MessageEmbed()
        .setColor("RED")
        .setTitle(`Help for ${client.user.username}`)
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription("To use to bot simply type 'sus'! There is even a rare chance for a special message when you type :3")
        .addField("Commands", "\`-about\` - gives info about the bot")
        .setFooter(`Created by LunaTheFloof#8447`)
        .setTimestamp();
      return message.channel.send(helpEmbed);
    case "-about": // about command
      let aboutEmbed = new MessageEmbed()
          .setColor("PURPLE")
          .setTitle("About me")
          .setThumbnail(client.user.displayAvatarURL())
          .addFields(
            {
              name: "Servers",
              value: `Serving ${client.guilds.cache.size} servers.`,
              inline: true
            },
            {
              name: "Channels",
              value: `Observing ${client.channels.cache.size} channels`,
              inline: true
            },
            {
              name: "Users",
              value: `Watching ${client.users.cache.size} users`,
              inline: true
            },
            {
              name: "Ping",
              value: `${Math.round(client.ws.ping)}ms`,
              inline: true
            },
            {
              name: "Join Data",
              value: client.user.createdAt,
              inline: true
            },
            {
              name: "Creator's tag",
              value: "LunaTheFloof#8447",
              inline: true
            },
            {
              name: "Invite Link",
              value: "[Link](https://discord.com/api/oauth2/authorize?client_id=837901615612559401&permissions=330816&scope=bot)",
              inline: true
            },
            {
              name: "GitHub Repository",
              value: "[Link](https://github.com/LunasAWolf/SusBot9000)",
              inline: true
            }
          )
          .setFooter("Created by LunaTheFloof#8447")
          .setTimestamp();
      return message.channel.send(aboutEmbed);
  }

  for (let i in phrases) {
    if (args.includes(phrases[i].toLowerCase())) return message.reply(`${replies[Math.floor(Math.random() * replies.length)]}`);
  }
  let num = getRandomInt(1, 101); // returns any integer between 1 and 50.
  switch (num) {
    case 20:
      message.channel.send(`${message.author} is a bit of a sussy baka >_<`);
      return;
    case 10:
      message.channel.send(`${message.author} is looking kinda sussy 😳`);
      return;
  }
});