const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'YOUR_BOT_TOKEN';
const prefix = 'emoji.';

//var bumpupChannelID = '737878710803234916';
var bumpupChannelID = '576614248457961482';
var countData = {}


/* エラーハンドリング */


process.on('uncaughtException', function(error) {
    console.log(error);
});


/* メッセージ受信 */


client.on('message', message => {
    if(message.author.id == client.user.id)
        return;

    if(message.content.match('^!(d|disboard) bump')) {
        proceedBumpupCommand(message);
    }

    if(!message.author.bot && message.content.startsWith(prefix)) {
        command(message);
        return;
    }
});


function command(message) {
    try {
        let cmd = message.content;
        let cmdName = cmd.substring(prefix.length).split(' ')[0].toLowerCase();

        switch(cmdName) {
            case 'help': {
                message.channel.send({
                    embed: {
                        title: 'コマンドヘルプ - 絵文字BOT',
                        fields: [
                            {
                                name: prefix + 'help',
                                value: 'ヘルプメッセージを表示します。'
                            },
                            {
                                name: prefix + 'rank',
                                value: 'ランキングを表示します。'
                            }
                        ],
                        footer: {
                            icon_url: client.user.avatarURL(),
                            text: 'Developed by @Garnet3106'
                        }
                    }
                });
            } break;

            case 'show': {
                message.channel.send({
                    embed: {
                        title: 'Bumpup ランキング',
                        description: ''
                    }
                });
            }
        }
    } catch(e) {
        console.log(e);
    }
}


function proceedBumpupCommand(message) {
    console.log('a');
}


client.on('ready', () => {
    let targetChannel = client.channels.resolve(bumpupChannelID);

    targetChannel.send({
        embed: {
            description: '`!d bump` でカウントを開始します。'
        }
    });
});


client.login(token)
    .then(() => {
        console.log('ログインが完了しました。');
    })
    .catch((e) => {
        console.log('ログインに失敗しました。');
    });
