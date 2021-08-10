const {
  version,
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "about",
  description: "provides info about the bot",
  run: async (message, client, args) => {
    let aboutEmbed = new MessageEmbed()
      .setColor("PURPLE")
      .setTitle("SusBot9000")
      .setThumbnail(client.user.displayAvatarURL())
      .addFields({
        name: "🛠 Developer",
        value: "```LunaTheFloof#8447 (136631672425807872)```"
      }, {
        name: "DiscordJS Version",
        value: `\`\`\`${version}\`\`\``
      }, {
        name: "Ping",
        value: `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``
      }, {
        name: "Join Date",
        value: `\`\`\`${client.user.createdAt}\`\`\``
      }, {
        name: "Guild Count",
        value: `\`\`\`${client.guilds.cache.size} Guilds\`\`\``,
        inline: true
      }, {
        name: "User Count",
        value: `\`\`\`${client.users.cache.size} Users\`\`\``,
        inline: true
      }, {
        name: "Invite Link",
        value: "[Link](https://discord.com/api/oauth2/authorize?client_id=837901615612559401&permissions=330816&scope=bot)",
      }, {
        name: "GitHub Repository",
        value: "[Link](https://github.com/LunasAWolf/SusBot9000)",
        inline: true
      })
      .setFooter("Created by LunaTheFloof#8447")
      .setTimestamp();
    return message.channel.send({ embeds: [aboutEmbed] })
      .catch(err => console.log(`There was an error running the about command ${err}`));
  }
};