require("dotenv").config();
const {
  Client,
  Collection,
  Intents
} = require("discord.js");
const fs = require("fs");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  allowedMentions: {
    parse: ['users', 'roles'],
    repliedUser: false
  }
});
client.commands = new Collection();
const token = process.env.TOKEN;
const prefix = "-";

// * L - move this to a JSON file or something similar.

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

// initialize the commands
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith(".js"));
for (let file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

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

client.on("messageCreate", async message => {
  // checks
  if (message.author.bot || !message.guild) return;
  if (!message.guild.me.permissions.has("SEND_MESSAGES") || !message.guild.me.permissions.has("VIEW_CHANNEL")) return;
  // ! L - this is still causing issues "DiscordAPIError: Missing Permissions". Might need to specify to move bot role to top or higher than user roles?
  //? L - hopefully discord.js v13 has fixed this issue. requires further testing.

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
      });
    }
  }
});