import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1`,
    {
      method: "GET",
      headers: {
        "X-Auth-Key": `${process.env.CLOUDFLARE_TOKEN}`,
        "X-Auth-Email": `${process.env.CLOUDFLARE_EMAIL}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  res.status(200).json(data);
};
