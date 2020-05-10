const express = require("express");
const router = express.Router();
const db = require("../config/db");
const queries = require("../config/queries");
const sendopt = require("./sendotp");
//const config = require("../config/awsConfig");
router.post("/", (req, res, next) => {
  try {
    db.query(queries.createBookings, [req.body], (error, result) => {
      console.log(error);
      if (error)
        return res.json({ status: 500, Message: "Unable to Connect Server" });
          Messages.send({text: 'test message', phones:req.body.user_mobile_number, dummy: 0}, function(err, res){
              console.log('******************************************');
              console.log('Messages.send()', err, res);
              if (err) { return; }
              var sid = res.id;
      
              Messages.Sessions.messages(sid, function(err, res){
                  console.log('******************************************');
                  console.log('Messages.Sessions.messages()', err, res);
      
                  var mid = res.resources[0].id;
      
                  Messages.get(mid, function(err, res){
                      console.log('******************************************');
                      console.log('Messages.get()', err, res);
      
                      c.Messages.delete(mid, function(err, res){
                          console.log('******************************************');
                          console.log('Messages.delete()', err, res);
                      });
      
                  });
              });
          });
      // sendopt.sms(
      //   "Your booking has been confirmed.\nDate:" +
      //     req.body.day_slot +
      //     "\nTime:" +
      //     req.body.time_slot +
      //     "\n- SCOPE Team.",
      //   req.body.user_mobile_number
      // );
      return res.json({
        status: 201,
        Message: "Address Added Successfully"
      });
    });
  } catch (error) {
    return res.json({ status: 500, Message: "Unable to Connect Server" });
  }
});

router.get("/sms", (req, res) => {
  const AWS = require("aws-sdk");
  console.log(config.awsConfig);
  AWS.config.update(config.awsConfig);
  const sns = new AWS.SNS();
  let params = {
    Message: req.query.message,
    MessageAttributes: {
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: "Transactional" //type || "Transactional"
      },
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "NITESH"
      }
    },
    MessageStructure: "string",
    PhoneNumber: req.query.number
  };
  sns.publish(params, (err, data) => {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({ Error: err }));
    } else {
      console.log(data);
      res.send(JSON.stringify({ MessageID: data.MessageId }));
    }
  });
});

router.get("/:userId", (req, res, next) => {
  try {
    console.log("orderuser", req.params.userId);
    db.query(queries.getAllBookings, [req.params.userId], (error, result) => {
      if (error)
        return res.json({ status: 500, Message: "Unable to Connect Server" });

      return res.json({
        status: 200,
        result: result
      });
    });
  } catch (error) {
    return res.json({ status: 500, Message: "Unable to Connect Server" });
  }
});

router.get("/details/:userId/:bookId", (req, res, next) => {
  try {
    db.query(
      queries.getSelectedBookingDetails,
      [req.params.bookId, req.params.userId],
      (error, result) => {
        if (error)
          return res.json({ status: 500, Message: "Unable to Connect Server" });

        return res.json({
          status: 200,
          result: result[0]
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, Message: "Unable to Connect Server" });
  }
});
router.get("/history/:userId", (req, res, next) => {
  try {
    db.query(
      queries.getAllHistoryBookings,
      [req.params.userId],
      (error, result) => {
        if (error)
          return res.json({ status: 500, Message: "Unable to Connect Server" });

        return res.json({
          status: 200,
          result: result
        });
      }
    );
  } catch (error) {
    return res.json({ status: 500, Message: "Unable to Connect Server" });
  }
});

router.patch("/cancel/:userdId/:bookId", (req, res, next) => {
  try {
    db.query(
      queries.cancelBookings,
      [req.params.bookId, req.params.userdId],
      (error, result) => {
        console.log(error);
        if (error)
          return res.json({ status: 500, Message: "Unable to Connect Server" });

        return res.json({
          status: 200,
          Message: "Booking Service Canceled Successfully"
        });
      }
    );
  } catch (error) {
    return res.json({ status: 500, Message: "Unable to Connect Server" });
  }
});

module.exports = router;
