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

  const usernames = req.body.usernames;
  const name = req.body.name;
  const userObjects = usernames.map((username: string) => ({ username }));
  const docID = req.body.docID;

  console.log(usernames)
  console.log(name)

  try {
    const courses = db.collection('courses');

    await courses.updateOne(
      { 
        _id: new ObjectId(docID),
        'teams.name': name // Query part to match the correct team
      },
      { 
        $addToSet: { 
          'teams.$.members': { $each: userObjects } // Update part to push to the members of the matched team
        } 
      }
    );

    await courses.updateMany(
      { 
        _id: new ObjectId(docID)
      },
      { 
        $set: { 
          'students.$[elem].teamName': name
        }
      },
      {
        arrayFilters: [{ 'elem.username': { $in: usernames } }]
      }
    );

    res.send('success')
  } catch (err) {
    console.log(err);
    res.status(500).send('failed to update user');
    return;
  } finally {
    await client.close();
  }
};
