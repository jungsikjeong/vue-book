import { db } from '@/firebaseApp';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  Query,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import { fetchUserInfo } from './user';
import { Post } from '@/types/post.d.ts';

interface fetchPostList {
  count?: number;
}

export const fetchPostList = async ({ count = 1 }: fetchPostList = {}) => {
  const postRef = collection(db, 'posts');
  const dataArr = [] as any;
  let postCount = null;

  const first = query(postRef, orderBy('createdAt'), limit(1));
  const documentSnapshots = await getDocs(first);

  if (count === 1) {
    documentSnapshots.forEach((doc) => {
      const dataObj = { ...(doc.data() as Post), id: doc.id };

      dataArr.push(dataObj);
    });

    const userData = [] as any;

    const usersRef = collection(db, 'users');

    const q = query(usersRef, where('uid', '==', dataArr[0].uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const userDataObj = { ...doc.data(), id: doc.id };
      userData.push(userDataObj);
    });
    dataArr[0].user = userData;
  } else {
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    // 마지막 시점의 데이터 가져오기
    const next = query(
      collection(db, 'posts'),
      orderBy('createdAt'),
      startAfter(lastVisible),
      limit(count)
    );

    const postCountRef = collection(db, 'postCount');

    // 데이터 확인
    const querySnapshotCount = await getDocs(postCountRef);

    querySnapshotCount.forEach((doc) => {
      const dataObj = { ...doc.data() };
      postCount = dataObj.count;
    });

    const querySnapshot = await getDocs(next);

    querySnapshot.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };

      dataArr.push(dataObj);
    });
    const userData = [] as any;

    const usersRef = collection(db, 'users');

    const q = query(usersRef, where('uid', '==', dataArr[0].uid));

    const userDataQuerySnapshot = await getDocs(q);
    userDataQuerySnapshot.forEach((doc) => {
      const userDataObj = { ...doc.data(), id: doc.id };
      userData.push(userDataObj);
    });
    for (const data of dataArr) {
      data.user = userData;
    }
  }

  console.log(dataArr);

  return { dataArr, postCount };
};

// 포스트 전체 갯수
export const incrementPostCount = async () => {
  try {
    const postCountRef = collection(db, 'postCount');

    // 데이터 확인
    const querySnapshot = await getDocs(postCountRef);

    if (querySnapshot.size > 0) {
      // 데이터가 이미 존재하면 업데이트
      const postCountDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, 'postCount', postCountDoc.id), {
        count: postCountDoc.data().count + 1,
      });
    } else {
      // 데이터가 없으면 새로 추가
      await addDoc(collection(db, 'postCount'), {
        count: 1,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
