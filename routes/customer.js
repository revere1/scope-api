const express = require("express");
const router = express.Router();
const db = require("../config/db");
const queries = require("../config/queries");
const sendotp = require("./sendotp");

const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'c981d884',
  apiSecret: 'OEDhrDAHcBly77Q5',
});


router.get("/", (req, res) => {
  res.send("Customer Dashboard");
});

router.get("/login/:mobileNo", async (req, res) => {
  console.log("This is params: " + req.params.mobileNo);
  if (req.params.mobileNo.length > 9) {
    var OTP = Math.floor(Math.random() * 9999 + 1111);

    try {
      db.query(queries.checkUser, [req.params.mobileNo], (error, result) => {
        console.log("error", error);
        console.log("result", result);
        const from = 'Vonage SMS API';
        const to = req.params.mobileNo;
        const text = `${OTP} is your Scope Bike login OTP. OTP is confidential.\n- SCOPE Team.`;
        console.log('fddf',to)
        nexmo.message.sendSms(from, to, text);
        nexmo.message.sendSms(from, to, text, (err, responseData) => {
          if (err) {
              console.log(err);
          } else {
              if(responseData.messages[0]['status'] === "0") {
                  console.log("Message sent successfully.");
              } else {
                  console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
              }
          }
      })
        if (error)
          return res.json({ status: 500, Message: "Unable to Connect Server" });
        // sendotp.sms(
        //   `${OTP} is your Scope Bike login OTP. OTP is confidential.\n- SCOPE Team.`,
        //   req.params.mobileNo
        // );

        if (result.length > 0) {
          db.query(
            queries.updateOtp,
            [OTP, req.params.mobileNo],
            (error, result) => {
              if (error)
                return res.json({
                  status: 500,
                  Message: "Unable to Connect Server"
                });
              console.log("status: 200, Messages: OTP---->>", 200, OTP);
              res.json({ status: 200, Messages: OTP });
            }
          );
        } else {
          console.log("else");
          db.query(
            queries.createUser,
            [req.params.mobileNo, OTP],
            (error, result) => {
              console.log(result);
              if (error)
                return res.json({
                  status: 500,
                  Message: "Unable to Connect Server"
                });

              res.json({ status: 200, Messages: OTP });
            }
          );
        }
      });
    } catch (error) {
      res.json({ status: 404, Message: "Internal Server Error" });
    }
  } else {
    res.json({
      status: 400,
      Message: "Mobile Number Should be 10 Digits!"
    });
  }

  // res.json(OTP)
});

router.get("/otp/:otp/:mobileNo", (req, res) => {
  try {
    db.query(
      queries.loginOtp,
      [req.params.otp, req.params.mobileNo],
      (error, result) => {
        console.log(result);
        if (error)
          return res.json({ status: 500, Message: "Unable to Connect Server" });

        if (result.length > 0) {
          res.json({
            status: 200,
            Message: "Login Success",
            payLoad: result[0]
          });
        } else {
          res.json({ status: 404, Message: "Please Send Valid OTP" });
          // throw error;
        }
      }
    );
  } catch (error) {
    res.json({
      status: 500,
      Message: "Unable to Connect Server"
    });
  }
});

router.get("/myProfile/:mobileNo", (req, res) => {
  try {
    db.query(queries.checkUser, [req.params.mobileNo], (error, result) => {
      console.log(error);
      if (error)
        return res.json({ status: 500, Message: "Unable to Connect Server" });
      res.json({
        status: 200,
        response: result[0]
      });
    });
  } catch (error) {
    res.json({
      status: 400,
      Message: "Mobile Number Should be 10 Digits!"
    });
  }
});
router.put("/updateProfile/:userId", (req, res) => {
  console.log("update body", req.body);
  try {
    db.query(
      queries.updateProfile,
      [req.body, req.params.userId],
      (error, result) => {
        console.log(error);
        if (error)
          return res.json({ status: 500, Message: "Unable to Connect Server" });

        return res.json({
          status: 200,
          Message: "Profile Updated Successfully!"
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.json({
      status: 400,
      Message: error
    });
  }
});
module.exports = router;
