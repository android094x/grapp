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
      `https://api.rawg.io/api/games?page_size=12&key=${process.env.RAWG_API_KEY}`
    );

    res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}
