require("dotenv").config();
const {
  Client
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
  "amog"
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
  console.log(`${client.user.username} | Added to guild ${guild.name} by ${guild.owner}`);
});

client.on("guildDelete", guild => {
  console.log(`${client.user.username} | Removed from guild ${guild.name}`);
});

client.on("message", message => {
  if (message.author.bot || !message.guild) return;

  const args = message.content.toLowerCase().split(" ");
  for (var i in phrases) {
    if (args.includes(phrases[i].toLowerCase())) return message.reply("haha sus xD");
  }

  let num = getRandomInt(1, 21);
  if (num == 5) {
    message.channel.send(`${message.author} is lookin kinda sussy 😳`);
  }
});