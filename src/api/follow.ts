import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { fetchUserInfo } from './user';
import { db } from '@/firebaseApp';

// 유저 팔로우 클릭
export const addFollow = async (othersUserId: string, myUser: any) => {
  try {
    if (othersUserId) {
      // 해당 유저 조회
      const user = await fetchUserInfo(othersUserId);

      // 해당 유저의 팔로워에 사용자가 없다면
      if (!user[0].followers.includes(myUser?.uid)) {
        // 해당 유저의 팔로워에 사용자 추가
        const userRef = doc(db, 'posts', othersUserId);

        await updateDoc(userRef, {
          followers: arrayUnion(othersUserId),
        });

        return;
      }
    }
  } catch (error) {
    console.error(error);
  }
};
