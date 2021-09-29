require('dotenv').config();
const {
  Client,
  Collection
} = require('discord.js');
const fs = require('fs');

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
  allowedMentions: {
    parse: ['users', 'roles'],
    repliedUser: false
  }
});
client.commands = new Collection();

const token = process.env.TOKEN;
const prefix = "-";

// list of phrases the bot will respond too
const phrases = [
  "sus",
  "sussy",
  "amongus",
  "amugus",
  "amoungus",
  "amoung",
  "amog",
  "among",
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
  "suwus",
  "suspicious",
  "amogusuwu",
  "soos"
];

// list of possible replies
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

// list of guilds with random replies hard enabled.
const guild_ids = [
  "399442822480003083", // Gamers(TM) Inc.
  "792693684453769237" // dev server
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

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

client.on("guildCreate", guild => {
  console.log(`${client.user.username} | Added to guild ${guild.name}`);
});

client.on("guildDelete", guild => {
  console.log(`${client.user.username} | Removed from guild ${guild.name}`);
});

client.on("messageCreate", async message => {
  // checks
  if (message.author.bot || !message.guild) return;
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
    // * L - need to decide what to do with these. May just delete them
    if (message.guild.me.permissions.has("SEND_MESSAGES") && guild_ids.includes(message.guild.id)) {
      let num = getRandomInt(1, 501); // returns any integer between 1 and 100.
      switch (num) {
        case 20:
          message.reply({
            content: `<@${message.author.id}> is a bit of a sussy baka >_<`
          }).catch(err => console.error(err));
          return;
        case 10:
          message.reply({
            content: `<@${message.author.id}> is looking kinda sussy 😳`
          }).catch(err => console.error(err));
          return;
      }
    }
  }
});