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

client.on("message", message => {
  if (message.author.bot || !message.guild) return;

  const args = message.content.toLowerCase().split(" ");
  for (var i in phrases) {
    if (args.includes(phrases[i].toLowerCase())) return message.reply("haha sus xD");
  }
});