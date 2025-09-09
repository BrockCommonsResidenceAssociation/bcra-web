import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sheets } from "../lib/google-sheets";

const SPREADSHEET_ID = process.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;

      if (!email) {
        return res
          .status(400)
          .json({ success: false, error: "Email is required" });
      }

      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "subscribers",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[email, new Date()]],
        },
      });

      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      console.error("Error appending data to sheet:", error);
      res
        .status(500)
        .json({ success: false, error: "Error appending data to sheet" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
