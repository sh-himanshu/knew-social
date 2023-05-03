import { saveUserResponse } from "@/lib/google-sheets";
import { parseError } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;
    try {
      await saveUserResponse(data);
      res.status(201).json({ ok: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: parseError(error) });
    }
  }
}
