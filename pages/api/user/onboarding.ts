import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const client = new MongoClient(process.env.MONGODB_URI || "");
  await client.connect();
  const db = client.db('prod');

  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send('no token provided')
    return;
  }

  let user: any;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET || "");
  } catch (err) {
    console.log(err)
    res.status(401).send('invalid token')
    return;
  }

  const name = req.body.name;
  const role = req.body.role;

  if (!name || !role) {
    res.status(400).send('name and role required')
    return;
  }

  try {
    const users = db.collection('users');
    const query = { _id: new ObjectId(user.documentID) };

    const update = {
      $set: {
        name: name,
        role: role
      }
    };

    const options: any = { returnDocument: 'after' };
    await users.findOneAndUpdate(query, update, options);
    res.send('success')
  } catch (err) {
    console.log(err)
    res.status(500).send('failed to update user')
    return;
  } finally {
    await client.close();
  }
};
