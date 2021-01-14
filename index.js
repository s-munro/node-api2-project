require("dotenv").config();
rver = require("./api/server");

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Magic happening on server ${PORT}...`);
});
