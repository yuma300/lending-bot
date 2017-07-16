const SlackBot = require('slackbots')
const Poloniex = require('poloniex-api-node')
let poloniex = new Poloniex(process.env.POLO_API_KEY, process.env.POLO_SECRET_KEY);

// *****************
// 設定 / Settings
// *****************

const bot = new SlackBot({
  token: process.env.SLACK_TOKEN,
  name: 'My Bot'
});


bot.on('start', function() {
  bot.postMessageToChannel('general', 'Hello!!')
});

bot.on('message', async(data) => {
  // all ingoing events https://api.slack.com/rtm
  if (data.text && data.text.indexOf('lendcancel') != -1) {
    console.log("cancel active lend offers")
    const offers = await poloniex.returnOpenLoanOffers()
    console.log(offers)
    Object.keys(offers).map((key) => {
      console.log("key: " + key)
      offers[key].forEach(async(offer) => {
        await setInterval(() => {}, 2000)
        await poloniex.cancelLoanOffer(offer.id)
      })
    })
  } else if (data.text && data.text.indexOf('lendoffer') != -1) {
    console.log("show active lend offers")
    active_offers = await poloniex.returnOpenLoanOffers()

    let message = ""
    Object.keys(active_offers).map((key) => {
      let total_amount = 0
      message = key + "\n"
      console.log("key: " + key)
      active_offers[key].forEach(async(active_offer) => {
        message += "rate:" +  active_offer.rate + " amount:" + active_offer.amount + "\n"
        total_amount += parseFloat(active_offer.amount)
      })
      message += "total_amount:" + total_amount + "\n"
    })

    bot.postMessageToChannel('general', message)
    console.log(message)
  }
});

module.exports.lend = async() => {
  console.log("--- preparing to lend ---");

}
