const express = require("express");
const app = express();
const router = require("./routes");
const dbConfig = require("./configs/dbConfig");
require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

app.use(express.json());
app.use(router);
dbConfig();

app.listen(8000, () => console.log("server is running"));
