import type { VercelRequest, VercelResponse } from "@vercel/node";
import { appendSheetData, getSheetData } from "../src/lib/google-sheets.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === "GET") {
    try {
      const { sheetName } = req.query;

      if (!sheetName || typeof sheetName !== "string") {
        return res
          .status(400)
          .json({ success: false, error: "Sheet name is required" });
      }

      const data = await getSheetData(sheetName);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching sheet data:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error fetching sheet data";
      res.status(500).json({ success: false, error: errorMessage });
    }
  } else if (req.method === "POST") {
    try {
      const { sheetName, ...data } = req.body;

      if (!sheetName || typeof sheetName !== "string") {
        return res
          .status(400)
          .json({ success: false, error: "Sheet name is required" });
      }

      const timestamp = new Date().toISOString();
      const newRow = ["", data.eventId, data.email, data.name, timestamp];

      await appendSheetData(sheetName, newRow);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error appending sheet data:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error appending sheet data";
      res.status(500).json({ success: false, error: errorMessage });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
