// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getUser } from "@/lib/models";
import { parseError } from "@/lib/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const User = await getUser();
  if (req.method === "GET") {
    let found = false;
    const { email, username } = req.query;
    const query = [];
    if (email) query.push({ email });
    if (username) query.push({ username });

    if (query) {
      try {
        const data = await User.findOne({
          where: { [Op.or]: query },
        });
        if (data) found = true;
        res.status(200).json({ found });
      } catch (error) {
        res.status(400).json(parseError(error));
      }
    }
  }
  if (req.method === "POST") {
    const { name, email, username } = req.body;
    try {
      await User.create({ name, email, username });
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(400).json(parseError(error));
    }
  }
}
