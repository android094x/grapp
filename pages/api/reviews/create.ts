import { PrismaClient } from '@prisma/client';

import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await prisma.review.create({
      data: {
        review: req.body.review,
        score: req.body.score,
        user: {
          connect: {
            email: req.body.userEmail,
          },
        },
        game: {
          connectOrCreate: {
            where: {
              rawgId: `${req.body.gameId}`,
            },
            create: {
              name: req.body.gameName,
              rawgId: `${req.body.gameId}`,
            },
          },
        },
      },
    });

    return res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err });
  }
};

export default handler;
