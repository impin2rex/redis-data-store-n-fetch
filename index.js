const express = require("express");
const redis = require("redis");
const async = require("async");

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();
app.use(express.json());

//Set Response
function setResponse(id, data) {
  return data;
}

app.post("/postdata", async (req, res) => {
  try {
    const { id = new Date().valueOf(), name, age } = req.body;
    console.log(id);
    const data = { id, name, age };
    client.setex(id, 3600, JSON.stringify(data));
    res.status(200).json({
      success: true,
      message: "Data Saved",
      id: id,
      data: req.body,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Couldn't process your request",
    });
  }
});

app.get("/getdata", async (req, res) => {
  try {
    var allData = {};

    client.keys("*", function (err, keys) {
      async.each(
        keys,
        function (key, callback) {
          client.get(key, function (err, value) {
            allData[key] = JSON.parse(value);
            callback(err);
          });
        },
        function () {
          // when callback is finished
          console.log(JSON.stringify(allData));
            res.status(200).json({
                success: true,
                message: "Data fetched successfully",
                data: JSON.parse(JSON.stringify(allData))
            });
        }
      );
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Couldn't process your request!",
    });
  }
});

app.get("/getdata/:id", (req, res) => {
  const { id } = req.params;
  client.get(id, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.status(200).json({
          success: true,
          message: "Data fetched",
          data: JSON.parse(data)
      })
    } else {
      res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }
  });
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
