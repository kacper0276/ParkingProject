const app = require("./app");
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`Serwer słucha na porcie: ${process.env.PORT}`);
});
