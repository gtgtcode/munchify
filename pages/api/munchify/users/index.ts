// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from '../../../../mongodb';
import UserModel from '../../../../schema/User';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase('munchify-api');

  const hashedPassword = await bcrypt.hash('test', 10);

  db.collection('users').insertOne(
    new UserModel({
      username: 'test',
      password: hashedPassword,
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
    })
  );

  res.status(200).json({ status: 'User created.' });
}
