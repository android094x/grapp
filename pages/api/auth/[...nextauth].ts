import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import type { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET_ID}`,
    }),
    GitHubProvider({
      clientId: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET_ID}`,
    }),
  ],

  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
};

// export default authHandler;
