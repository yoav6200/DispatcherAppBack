import * as admin from 'firebase-admin';
import { User } from '../../models/users.models'; // Mongoose User model

const serviceAccount = require('../../../firebase-service-file/FireBaseserviceAcoountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export async function fetchUsersFromFireBase() {
  try {
    const users = await admin.auth().listUsers();
    const customizedUsers = [];

    for (const user of users.users) {
      const userRecord = await admin.auth().getUser(user.uid);

      const customizedUser: any = {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName || '',
        favoriteItems: [],
      };

      const newUser = new User(customizedUser);

      await newUser.save();

      customizedUsers.push(newUser);
    }

    console.log('Customized users inserted into MongoDB');
  } catch (error) {
    console.error('Error connecting to Firebase or MongoDB:', error);
  }
}
