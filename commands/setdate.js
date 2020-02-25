module.exports = {
	name: 'setdate',
	description: 'sets the countdown date',
	execute(message, args) {
    countDownDate = message.content.slice(9);
    message.channel.send(`Date set to: ${countDownDate}`);
	},
};