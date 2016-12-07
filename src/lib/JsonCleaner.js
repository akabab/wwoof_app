var fs = require('fs')
var wwoof_list = require('../doc/wwoof_list.json')

var wwoof_list_cleaned = wwoof_list.map(function(elem) {
  return {
    title: elem.title || "",
    region: elem.region || "",
    address: elem.address || "",
    quick_reply: elem.quick_reply || "",
    wwoof_since: elem.wwoof_since || "",
    organic: elem.organic || "",
    size: elem.size || "",
    activity: elem.activity || "",
    tags: elem.tags || [],
    when: elem.when || "",
    kids: elem.kids || "",
    mails: elem.mails || [],
    phones: elem.phones || [],
    mobiles: elem.mobiles || [],
    websites: elem.websites || [],
    facebook: elem.facebook || [],
    skype: elem.skype || "",
    description: elem.description || ""
  }
});

fs.writeFile("./wwoof_list-cleaned.json", JSON.stringify(wwoof_list_cleaned, 4), function (err) {
  if (err) { return console.log(err) }

  console.log("The file was saved!");
})
