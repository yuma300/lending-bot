var logic = require("./lib/logic");

console.log("--- system start ---");

setInterval(function() {
  logic.lend();
}, 1000 * 2);
