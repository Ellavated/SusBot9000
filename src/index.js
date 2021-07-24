require("dotenv").config();
const {
  Client,
  MessageEmbed
} = require("discord.js");
const client = new Client();
const token = process.env.TOKEN;

// string[] here

const phrases = [
  "sus",
  "sussy",
  "amongus",
  "amugus",
  "amoungus",
  "amoung",
  "amog",
  "imposter",
  "impostor",
  "impasta",
  "amogus",
  "vented",
  "vent",
  "electrical",
  "navigation",
  "nav",
  "polus",
  "mira",
  "mirahq",
  "airship",
  "skeld",
  "suwus"
];

const replies = [
  "haha sus xD",
  "yoo thats kinda sus bro",
  "is the sussy imposter lmao",
  "vented in electrical",
  "was caught faking a task",
  "is a sussy baka",
  "you've been acting kinda sus lately",
  "sustacular",
  "susamanjaro",
  "Sussimus prime",
  "fine... I guess you are my sussy baka v_v"
];

// FUNCTIONS HERE

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// BOT STARTS HERE

client.login(token);

client.on("ready", () => {
  console.log(`${client.user.username} | now online!`);
  client.user.setActivity("Alix be the sussy impostor amogus", {
    type: "WATCHING"
  });
});

client.on("guildCreate", guild => {
  console.log(`${client.user.username} | Added to guild ${guild.name}`);
});

client.on("guildDelete", guild => {
  console.log(`${client.user.username} | Removed from guild ${guild.name}`);
});

client.on("message", async message => {
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
      return message.channel.send(helpEmbed)
        .catch(err => console.log(`There was an error running the help command. ${err}`));
    case "-about": // about command
      let aboutEmbed = new MessageEmbed()
        .setColor("PURPLE")
        .setTitle("About me")
        .setThumbnail(client.user.displayAvatarURL())
        .addFields({
          name: "Servers",
          value: `\`\`\`Serving ${client.guilds.cache.size} servers.\`\`\``,
          inline: true
        }, {
          name: "Channels",
          value: `\`\`\`Observing ${client.channels.cache.size} channels\`\`\``,
          inline: true
        }, {
          name: "Users",
          value: `\`\`\`Watching ${client.users.cache.size} users\`\`\``,
          inline: true
        }, {
          name: "Ping",
          value: `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``,
          inline: true
        }, {
          name: "Join Data",
          value: `\`\`\`${client.user.createdAt}\`\`\``,
          inline: true
        }, {
          name: "Creator's tag",
          value: "\`\`\`LunaTheFloof#8447\`\`\`",
          inline: true
        }, {
          name: "Invite Link",
          value: "[Link](https://discord.com/api/oauth2/authorize?client_id=837901615612559401&permissions=330816&scope=bot)",
          inline: true
        }, {
          name: "GitHub Repository",
          value: "[Link](https://github.com/LunasAWolf/SusBot9000)",
          inline: true
        })
        .setFooter("Created by LunaTheFloof#8447")
        .setTimestamp();
      return message.channel.send(aboutEmbed)
        .catch(err => console.log(`There was an error running the about command ${err}`));
    case "-thanks": // thanks command
      return message.channel.send("Thanks for using SusBot9000 :)");
  }

  for (let i in phrases) {
    if (args.includes(phrases[i].toLowerCase())) return message.reply(`${replies[Math.floor(Math.random() * replies.length)]}`);
  }
  if (message.guild.me.hasPermission("SEND_MESSAGES")) {
    let num = getRandomInt(1, 101); // returns any integer between 1 and 100.
    switch (num) {
      case 20:
        message.channel.send(`<@${message.author.id}> is a bit of a sussy baka >_<`)
          .catch(err => console.log(`There was an error running the sussy baka. ${err}`));
        return;
      case 10:
        message.channel.send(`<@${message.author.id}> is looking kinda sussy 😳`)
          .catch(err => console.log(`There was an error running the sussy. ${err}`));
        return;
    }
  }
});