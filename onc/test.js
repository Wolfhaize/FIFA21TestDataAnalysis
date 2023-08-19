const https = require("https");

// Enable SSL certificate verification debug mode
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

https.get("https://discord.com/api", (res) => {
  console.log("statusCode:", res.statusCode);
  console.log("headers:", res.headers);

  res.on("data", (d) => {
    process.stdout.write(d);
  });

}).on("error", (err) => {
  console.error(err);
});