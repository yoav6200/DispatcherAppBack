import * as admin from 'firebase-admin';
import { Collection, Db } from 'mongodb';
import { CustomizedUser } from './CustomizedUser';

const serviceAccount = require('../../../firebase-service-file/FireBaseserviceAcoountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export async function fetchUsersFromFireBase(
  db: Db,
  usersCollection: Collection
) {
  try {
    // Retrieve list of users from Firebase Authentication
    const users = await admin.auth().listUsers();
    const customizedUsers = [];
    for (const user of users.users) {
      const userRecord = await admin.auth().getUser(user.uid);
      const customizedUser: CustomizedUser = {
        uid: userRecord.uid,
        email: userRecord.email,
        name: '',
        favoriteItems: [],
      };

      customizedUsers.push(customizedUser);
    }
    await usersCollection.insertMany(customizedUsers);
    console.log('Customized users inserted into MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
