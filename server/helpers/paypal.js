const paypal = require("paypal-server-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AUH-exlwK7sQgegz-udG2Q6Zf3IJG30WN_5e9d7ICQaEx3Aeeyq3oA6BruW6MGIsVWmfg7IsIIApzzNa",
  client_sec:
    "EBwEEyP6kuhgbi1R7aKHcHXvdVU_V5JAJZEbq5DJUH5fuywyw6404A__YP3gDnvJegFoUeLrRocaf6du",
});

module.exports = paypal;
