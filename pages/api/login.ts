import { NextApiRequest, NextApiResponse } from 'next';
import { parseStringPromise } from 'xml2js';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

const CAS_VALIDATE_URL_2_0 = 'https://login.gatech.edu/cas/serviceValidate';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const client = new MongoClient(process.env.MONGODB_URI || "");
  await client.connect();
  const db = client.db('prod');

  const ticket = req.body.ticket;
  const validationResponse = await fetch(`${CAS_VALIDATE_URL_2_0}?ticket=${ticket}&service=http://localhost:3000/login`);
  const validationData = await validationResponse.text();
  const jsonResult = await parseStringPromise(validationData);

  let username;
  try {
    username = jsonResult['cas:serviceResponse']['cas:authenticationSuccess'][0]['cas:user'][0];
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }

  if (!username) {
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }

  let documentID;
  let result: any;
  try {
    const users = db.collection('users');

    result = await users.findOneAndUpdate(
      { 
        username: username
      },
      { 
        $setOnInsert: { 
          name: '',
          role: '',
          email: username + "@gatech.edu"
        }
      },
      { upsert: true, returnDocument: 'after' }
    );

    if (!result.username) {
      console.log('failed to create user')
      res.status(500).send('failed to create user')
      return;
    }

    documentID = result._id.toString()
  } catch (err) {
    console.log(err)
    res.status(500).send('failed to create user')
    return;
  } finally {
    await client.close();
  }

  const token = jwt.sign(
    { 
      documentID
    }, 
    process.env.JWT_SECRET || "",
    { 
      algorithm: 'HS256', 
      expiresIn: '30d' 
    }
  );

  if (!token) {
    res.status(500).send('failed to create token')
    return;
  }

  res.status(200).json({ token, username });
  return;
};
