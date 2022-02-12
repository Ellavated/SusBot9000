require('dotenv').config();
const {
  Client,
  Collection
} = require('discord.js');
const fs = require('fs');

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  allowedMentions: {
    parse: ['users', 'roles'],
    repliedUser: false
  }
});
client.commands = new Collection();

const token = process.env.TOKEN;
const prefix = "-";

// Gets the lists of replies and phrases.
const phrases = require("./json/phrases.json");
const replies = require("./json/replies.json");

// checks for and enables the commands
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith(".js"));
for (let file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// log in the client
client.login(token);

// vvv client events vvv
client.on("ready", () => {
  console.log(`${client.user.username} | now online!`);
  client.user.setActivity("the hit game Among Us", {
    type: "PLAYING"
  });
});

client.on("messageCreate", async message => {
  // checks
  if (message.author.bot || !message.guild) return;
  if (message.channel.type == "GUILD_PUBLIC_THREAD" || message.channel.type == "GUILD_PRIVATE_THREAD") return;
  if (!message.guild.me.permissions.has("SEND_MESSAGES") || !message.guild.me.permissions.has("VIEW_CHANNEL") || !message.guild.me.permissions.has("READ_MESSAGE_HISTORY")) return;
  if (!message.guild.me.permissionsIn(message.channel.id).has("READ_MESSAGE_HISTORY") || !message.guild.me.permissionsIn(message.channel.id).has("SEND_MESSAGES") || !message.guild.me.permissionsIn(message.channel.id).has("VIEW_CHANNEL")) return;

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ + /g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd);
    if (command) {
      try {
        command.run(message, client, args);
      } catch (err) {
        console.error(err);
        message.reply({
          content: `There was an error trying to execute that command.\n\`\`\`${err}\`\`\``
        });
        return;
      }
    }
  } else {
    const words = message.content.toLowerCase().split(" ");
    for (let i in phrases) {
      if (words.includes(phrases[i].toLowerCase())) return message.reply({
        content: `${replies[Math.floor(Math.random() * replies.length)]}`,
        repliedUser: true
      }).catch(err => {
        console.log(err);
        return;
      });
    }
  }
});