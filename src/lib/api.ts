export const fetchSheetData = async (sheetName: string) => {
  const response = await fetch(`/api/sheets?sheetName=${sheetName}`);
  if (!response.ok) {
    throw new Error("Failed to fetch sheet data");
  }
  return response.json();
};

export const submitRSVP = async (data: {
  eventId: string;
  name: string;
  email: string;
}) => {
  const response = await fetch("/api/sheets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data, sheetName: "events_rsvp" }),
  });
  if (!response.ok) {
    throw new Error("Failed to submit RSVP");
  }
  return response.json();
};
