const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const prefix = config.prefix;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

global.countDownDate = "2020-02-26 00:00";
var moment = require('moment');
var countdown = require('countdown');
require('moment-countdown');

client.login(config.token);

client.on('ready', () => {
    let timeChannel = client.channels.get(config.channelId);

    console.info(`Logged in as ${client.user.tag}!`);
    console.info(`Time channel: ${timeChannel.name}`);
    /* timeChannel.setName("🕜-time-channel asdasdasd") */

    var x = setInterval(function() {
        var raidTime = moment(countDownDate);
        let clockEmoji, distanceString;
        var distance = moment().countdown(raidTime);

        console.info(distance)
        console.info(countDownDate)
        if (distance.days > 0) {  //formatting clusterfuck
          if (distance.minutes < 10) {
           distanceString = (`${distance.days*24+distance.hours}:0${distance.minutes}`)
          }
          else {
            distanceString = (`${distance.days*24+distance.hours}:${distance.minutes}`)
          }
        }
        else if (distance.minutes < 10) {
          distanceString = `${distance.hours}:0${distance.minutes}`
        }
        else {
          distanceString = `${distance.hours}:${distance.minutes}`;
        }
        clockEmoji = '⏰';

        timeChannel.setName(`${clockEmoji} Raid in ${distanceString}`)
        
      }, 5000);

});

client.on('message', message => {
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('something went horribly wrong');
  }
});