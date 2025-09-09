import { google } from "googleapis";

const serviceAccountAuth = new google.auth.GoogleAuth({
  credentials: {
    project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export const sheets = google.sheets({
  version: "v4",
  auth: serviceAccountAuth,
});

const SPREADSHEET_ID = process.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID;

const convertToObjectArray = (data: string[][]) => {
  const headers = data[0];
  const rows = data.slice(1);
  return rows.map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
};

export const getSheetData = async (sheetName: string) => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: sheetName,
  });
  return convertToObjectArray(res.data.values || []);
};

export const appendSheetData = async (sheetName: string, data: string[]) => {
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: sheetName,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [data],
    },
  });
  return res.data;
};
