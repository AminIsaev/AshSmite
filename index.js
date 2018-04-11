const Discord = require("discord.js");
const config2 = require("./config.json");
var bot = new Discord.Client();
const Hirez = require('hirez.js')

bot.on("ready", async() => {
  console.log(`${bot.user.username} готов к работе`);
  console.log(bot.guilds.size);

});


var fs = require('fs');                        // Write to file.
const paladins = require('paladins-api');    // API wrapper.
var config = require('./config');            // Credentials.
const pal = new paladins(config.devId, config.authKey); // Give our credentials.

// Connect to Paladins API by creating a session.

bot.on("message", async message => {

  if(message.author.bot) return;

  msg = message.content.toLowerCase();

  const args = message.content.slice(config2.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === "god") {
    pal.connect('PC', (err, res) =>
        {
        // Connection worked.
        if(!err)
            {
            var sessionId = res;

            // Call /GetMatchHistory using the wrapper.
            pal.getGods(sessionId, 'PC', (err, res) =>
                {
                // It worked and we got a response, so...
                if(!err)
                    {
                    // Write the output to a file.
                    const content = JSON.parse(JSON.stringify(res));


       if(content.indexOf("Achilles")){message.channel.send("ok");} 


                    }

                });
            }
        });
}
});




bot.login(config2.token).catch(console.log);
