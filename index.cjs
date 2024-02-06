const express = require("express");

const { google } = require("googleapis");

const app = express();

app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  //
  const spreadsheetId = "1iDD35caRGiRh6WHyMn66XxC3_VFTvB9EMKUl-K-LMtE";
  // create clinet instance for auth
  const client = await auth.getClient();
  // create instance of Google Sheets API

  const googleSheets = google.sheets({ version: "v4", auth: client });

  //get rows data
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1",
  });
  //Write in google sheet API
  const writeRows = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        [
          "2002/02/45",
          "45145",
          "hamdaoui",
          "anes",
          "0540800930",
          "ain defla",
          "benhimona bourached",
          "planter pots",
          "this is good product",
        ],
      ],
    },
  });
  //Get metaData of spreadsheets

  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });
  res.send(getRows.data);
});

app.listen(1337, (req, res) => {
  console.log("running in 1337 port ");
});
