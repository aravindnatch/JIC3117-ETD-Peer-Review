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

  const { courseID, formData, username } = req.body;

  try {
    const courses = db.collection('courses');
    const course = await courses.findOne({ _id: new ObjectId(courseID) });

    if (!course) {
      throw new Error('Course not found');
    }

    for (const team of course.teams) {
      for (const member of team.members) {
        if (member.username === username) {
          member.evaluation = formData;
        }
      }
    }

    // Update the course document with the new evaluation data
    await courses.updateOne(
      { _id: new ObjectId(courseID) },
      { $set: { teams: course.teams } }
    );

    res.send('success');
  } catch (err) {
    console.log(err);
    res.status(500).send('failed to update user');
    return;
  } finally {
    await client.close();
  }
};