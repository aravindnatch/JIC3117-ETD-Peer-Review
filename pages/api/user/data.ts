import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
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

  const docID = user.documentID;

  let userData;
  try {
    const users = db.collection('users');
    const query = { _id: new ObjectId(docID) };
    userData = await users.findOne(query);
  } catch (err) {
    console.log(err)
    res.status(500).send('failed to get user data')
    return;
  }

  if (!userData) {
    res.status(403).send('no user found')
    return;
  }

  try {
    const coursesCollection = db.collection('courses');
    let courseDocuments: any = [];

    if (userData.role === 'instructor') {
      courseDocuments = await coursesCollection.find({ instructor: new ObjectId(userData._id) }).toArray();
    } else if (userData.role === 'student') {
      courseDocuments = await coursesCollection.find({ students: { $in: [ new ObjectId(userData._id)] } }).toArray();
    }

    userData.courses = courseDocuments;
  } catch (err) {
    console.log(err);
    res.status(500).send('failed to get user courses');
    return;
  }

  try {
    if (userData.role === 'instructor') {
      const questionsCollection = db.collection('questions');
      let questionDocuments: any = [];

      questionDocuments = await questionsCollection.find({ instructor: new ObjectId(userData._id) }).toArray();

      userData.questions = questionDocuments;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('failed to get user questions');
    return;
  } finally {
    await client.close();
  }

  res.status(200).json(userData);
};
