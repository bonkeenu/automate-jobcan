const koyomi = require('koyomi')
const SlackAPI = require('./src/SlackAPI')
require('dotenv').config()

/**
 * Slack情報を定義
 */
const slackParams = {
    token:   process.env.SLACK_TOKEN,
    channel: process.env.SLACK_CHANNEL,
    command: '/jobcan_worktime'
}

// TODO: オプションライクに使えるよう変更していく
const mode = 'business'

const today = new Date();
const isWorkingDay = koyomi.isOpen(today)

const App = () => {
    // 営業日モードの場合
    if (mode === 'business') {
        if (isWorkingDay) {
            const slackAPI = new SlackAPI()
            slackAPI.callSlashCommandAPI(slackParams);
        } else {
                console.log('休業日');
                return
        }
    } else {
        const slackAPI = new SlackAPI()
        slackAPI.callSlashCommandAPI(slackParams);
    }
}

App()
