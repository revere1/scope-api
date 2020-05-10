const AWS = require("aws-sdk");
//const config = require("../config/awsConfig");

module.exports = {
  sms: function(message, mobileNumber) {
    console.log("sms-", mobileNumber, message);
    //AWS.config.update(config.awsConfig);
    const sns = new AWS.SNS();
    let params = {
      Message: message,
      MessageAttributes: {
        "AWS.SNS.SMS.SMSType": {
          DataType: "String",
          StringValue: "Transactional" //type || "Transactional"
        },
        "AWS.SNS.SMS.SenderID": {
          DataType: "String",
          StringValue: "BIKE"
        }
      },
      MessageStructure: "string",
      PhoneNumber: "91-" + mobileNumber
    };
    sns.publish(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  }
};
