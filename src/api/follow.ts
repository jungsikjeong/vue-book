import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { fetchUserInfo } from './user';
import { db } from '@/firebaseApp';

// 유저 팔로우 클릭
export const addFollow = async (othersUserId: string, myUser: any) => {
  try {
    if (othersUserId) {
      // 해당 유저 조회
      const user = await fetchUserInfo(othersUserId);

      const isFollow = user[0].followers.includes(myUser?.uid);
      // 해당 유저의 팔로워에 사용자가 없다면
      if (!isFollow) {
        const userRef = doc(db, 'users', othersUserId);
        const userRef2 = doc(db, 'users', myUser?.uid);

        // 해당 유저의 팔로워에 사용자 추가
        await updateDoc(userRef, {
          followers: arrayUnion(myUser?.uid),
        });

        // + 내 팔로잉에 해당 유저id추가
        await updateDoc(userRef2, {
          following: arrayUnion(othersUserId),
        });

        return;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

// 유저 언팔로우
export const unFollow = async (othersUserId: string, myUser: any) => {
  try {
    if (othersUserId) {
      // 해당 유저 조회
      const user = await fetchUserInfo(othersUserId);

      const isFollow = user[0].followers.includes(myUser?.uid);
      // 해당 유저의 팔로워에 사용자가 있으면
      if (isFollow) {
        const userRef = doc(db, 'users', othersUserId);
        const userRef2 = doc(db, 'users', myUser?.uid);

        // 해당 유저의 팔로워에 사용자 제거
        await updateDoc(userRef, {
          followers: arrayRemove(myUser?.uid),
        });

        // + 내 팔로잉에 해당 유저id 제거
        await updateDoc(userRef2, {
          following: arrayRemove(othersUserId),
        });

        return;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

// 팔로우한 유저 목록들
export const fetchFollowerList = async (userId: string) => {
  try {
    let data: any[] = [];

    const user = await fetchUserInfo(userId);

    if (user.length !== 0) {
      for (const item of user[0].followers) {
        const followerUser = await fetchUserInfo(item);

        data = [...data, ...followerUser];
      }
      return { status: 200, data };
    }
  } catch (error) {
    console.error(error);
  }
};
