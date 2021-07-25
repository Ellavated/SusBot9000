require("dotenv").config();
const {
  Client,
  Collection
} = require("discord.js");
const fs = require("fs");
const client = new Client();
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

client.on("message", async message => {
  // checks
  if (message.author.bot || !message.guild) return;
  if (!message.guild.me.hasPermission("SEND_MESSAGES") || !message.guild.me.hasPermission("VIEW_CHANNEL")) return;
  // L - this is still causing issues "There was an error running... DiscordAPIError: Missing Permissions". Might need to specify to move bot role to top or higher than user roles?

  const args = message.content.slice(prefix.length).trim().split(/ + /g);
  const cmd = args.shift().toLowerCase();
  const command = client.commands.get(cmd);
  if (command) {
    try {
      command.run(message, client, args);
    } catch (err) {
      console.error(err);
      message.reply(`There was an error trying to execute that command.\n\`\`\`${err}\`\`\``);
      return;
    }
  } else {
    const words = message.content.toLowerCase().split(" ");
    for (let i in phrases) {
      if (words.includes(phrases[i].toLowerCase())) return message.reply(`${replies[Math.floor(Math.random() * replies.length)]}`);
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
  }
});