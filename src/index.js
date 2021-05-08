require("dotenv").config();
const {
  Client
} = require("discord.js");
const client = new Client();
const token = process.env.TOKEN;

client.login(token);

client.on("ready", () => {
  console.log(`${client.user.username} | now online!`);

  client.user.setActivity("the hit game Among Us", {
    type: "PLAYING"
  });
});

client.on("message", message => {
  if (message.author.bot || !message.guild) return;

  if (
    message.content.toLowerCase().includes("sus") || 
    message.content.toLowerCase().includes("sussy") || 
    message.content.toLowerCase().includes("amongus") || 
    message.content.toLowerCase().includes("amugus") || 
    message.content.toLowerCase().includes("amongus") || 
    message.content.toLowerCase().includes("among us")
  ) {
    message.reply("HAHAH sus xD");
  }
});