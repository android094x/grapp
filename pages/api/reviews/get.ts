import { PrismaClient } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { rawgId } = req.query;
    const data = await prisma.review.findMany({
      where: {
        game: {
          rawgId: `${req.query.rawgId}`,
        },
      },
      include: {
        user: true,
      },
    });

    return res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err });
  }
};

export default handler;
