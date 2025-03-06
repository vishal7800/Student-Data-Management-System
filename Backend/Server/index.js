const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const useroutes = require('./routes/userroute');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/user',useroutes)

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
