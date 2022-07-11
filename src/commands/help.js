const {
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "help",
  description: "help command",
  run: async (message, client, args) => {
    let helpEmbed = new MessageEmbed()
      .setColor("RED")
      .setTitle(`Help for ${client.user.username}`)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription("To use to bot simply type 'sus'! There is even a rare chance for a special message when you type :3")
      .addField("Commands", "\`-about\` - gives info about the bot")
      .setFooter(`Created by Lunaaa#8447`)
      .setTimestamp();
    return message.channel.send({ embeds: [helpEmbed] })
      .catch(err => console.log(`There was an error running the help command. ${err}`));
  }
};