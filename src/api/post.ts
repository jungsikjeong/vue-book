import { db } from '@/firebaseApp';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  Query,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Post } from '@/types/post.d.ts';

interface fetchPostList {
  count?: number;
}

// 전체 게시물 확인
export const fetchPostList = async ({ count = 6 }: fetchPostList = {}) => {
  const postRef = collection(db, 'posts');
  const dataArr = [] as any;

  const first = query(postRef, orderBy('createdAt'), limit(6));
  const documentSnapshots = await getDocs(first);

  if (count === 6) {
    documentSnapshots.forEach((doc) => {
      const dataObj = { ...(doc.data() as Post), id: doc.id };

      dataArr.push(dataObj);
    });

    const userData = [] as any;

    const usersRef = collection(db, 'users');
    if (dataArr.length > 0) {
      for (const data of dataArr) {
        const q = query(usersRef, where('uid', '==', data.uid));

        const userDataQuerySnapshot = await getDocs(q);

        userDataQuerySnapshot.forEach((doc) => {
          const userDataObj = { ...doc.data(), id: doc.id };
          userData.push(userDataObj);
        });

        for (const data of dataArr) {
          data.user = userData;
        }
      }
    }
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

    const querySnapshot = await getDocs(next);

    querySnapshot.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };

      dataArr.push(dataObj);
    });
    const userData = [] as any;

    const usersRef = collection(db, 'users');

    for (const data of dataArr) {
      const q = query(usersRef, where('uid', '==', data.uid));

      const userDataQuerySnapshot = await getDocs(q);

      userDataQuerySnapshot.forEach((doc) => {
        const userDataObj = { ...doc.data(), id: doc.id };
        userData.push(userDataObj);
      });

      for (const data of dataArr) {
        data.user = userData;
      }
    }
  }

  return dataArr;
};

// 내가 작성한 게시물 확인
export const fetchMyPostList = async (userId: string) => {
  const postRef = collection(db, 'posts');
  const dataArr = [] as any;

  const q = query(postRef, orderBy('createdAt'), where('uid', '==', userId));

  const documentSnapshots = await getDocs(q);

  documentSnapshots.forEach((doc) => {
    const dataObj = { ...(doc.data() as Post), id: doc.id };

    dataArr.push(dataObj);
  });

  return dataArr;
};

// 해당 게시물 확인
export const fetchDetailPost = async (postId: string) => {
  const dataArr = [] as any;

  const defRef = doc(db, 'posts', postId);
  const docSnap = await getDoc(defRef);
  dataArr.push({ ...(docSnap?.data() as Post), id: docSnap.id });

  return dataArr;
};

// 내가 좋아요누른 게시물 확인
export const fetchMyPostLikeList = async (userId: string) => {
  const usersRef = doc(db, 'users', userId);
  const userSnap = await getDoc(usersRef);

  const user = { ...userSnap?.data() };
  if (user.likePost.length !== 0) {
    for (const postId of user.likePost) {
      const postData = [];

      const postRef = collection(db, 'posts');
      const dataArr = [] as any;

      const q = query(postRef, orderBy('createdAt'), where('id', '==', postId));

      const documentSnapshots = await getDocs(q);

      documentSnapshots.forEach((doc) => {
        const dataObj = { ...(doc.data() as Post), id: doc.id };

        dataArr.push(dataObj);
      });
      console.log('dataArr:', dataArr);
      return dataArr;
    }
  } else {
    return '';
  }
};

// 포스트 전체 갯수증가
export const incrementPostCount = async () => {
  try {
    const postCountRef = collection(db, 'postCount');

    // 데이터 확인
    const querySnapshot = await getDocs(postCountRef);

    if (querySnapshot.size > 0) {
      // 데이터가 이미 존재하면 업데이트
      const postCountDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, 'postCount', postCountDoc.id), {
        count: increment(1),
      });
    } else {
      // 데이터가 없으면 새로 추가
      await addDoc(collection(db, 'postCount'), {
        count: increment(1),
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// 전체 게시물 갯수 확인
export const fetchPostCount = async () => {
  let postCount = null;

  const postCountRef = collection(db, 'postCount');

  const querySnapshotCount = await getDocs(postCountRef);

  querySnapshotCount.forEach((doc) => {
    const dataObj = { ...doc.data() };
    postCount = dataObj.count;
  });

  return postCount;
};
