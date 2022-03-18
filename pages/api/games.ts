// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { GamesType } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GamesType | { message: any }>
) {
  try {
    const { data }: GamesType = await axios.get(
      `${req.query.baseUrl}${
        Array.isArray(req.query['variables[]'])
          ? req.query['variables[]'].join('&')
          : ''
      }&key=${process.env.RAWG_API_KEY}`
    );

    const regex = /page=\d+/;

    if (data.next) {
      if (regex.test(data.next)) {
        const str = data.next.match(regex);
        if (str !== null) data.next = str[0];
      }
    }

    if (data.previous) {
      if (regex.test(data.previous)) {
        const str = data.previous.match(regex);
        if (str !== null) data.previous = str[0];
      } else {
        data.previous = `page=1`;
      }
    }

    res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}
