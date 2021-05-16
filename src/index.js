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


client.login(token);

client.on("ready", () => {
  console.log(`${client.user.username} | now online!`);

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

  let num = Math.random(1, 100);
  if (num == 50) {
    return message.channel.send(`${message.author} is the sussy imposter`);
  }
});