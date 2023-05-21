import {Timestamp, doc, setDoc} from 'firebase/firestore';
import {db} from '../../../firebase-config';
import {IdGenerator} from '../../constants/IdGenerator';
export const SendNotification = async (
  post_id,
  sender_id,
  receiver_id,
  content,
) => {
  try {
    if (sender_id !== receiver_id) {
      const notification_id = IdGenerator();
      const notificationRef = doc(
        db,
        'users',
        receiver_id,
        'notifications',
        notification_id,
      );
      const notificationData = {
        notification_id: notification_id,
        post_target: post_id,
        sender: sender_id,
        content: content,
        create_at: Timestamp.now(),
      };
      await setDoc(notificationRef, notificationData);
    }
    return;
  } catch (error) {
    console.log(`Send like post notification failed : ${error}`);
  }
};
