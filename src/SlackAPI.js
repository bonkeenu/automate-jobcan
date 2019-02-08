const webclient = require("request");

class SlackAPI {
    callSlashCommandAPI(params) {
        webclient.post({
            url: "https://slack.com/api/chat.command?",
            headers: {
                "content-type": "application/json",
            },
            qs: {
                token: params.token,
                channel: params.channel,
                command: params.command,
            },
        },
        function (error, response, body) {
            if(JSON.parse(body).ok === false){
                console.log(JSON.parse(body).error)
                webclient.post({
                    url: "https://slack.com/api/chat.postMessage?",
                    headers: {
                        "content-type": "application/json",
                    },
                    qs: {
                        token: params.token,
                        channel: params.channel,
                        text: JSON.parse(body).error,
                    },
                })
            }
        })
    }
}
module.exports = SlackAPI