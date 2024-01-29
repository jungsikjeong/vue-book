import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '@/firebaseApp';
import { Post } from '../types/post.d.ts';

// 팔로잉한 유저의 게시물 불러오기
export const fetchFollowingPostList = async (page: number, user: any) => {
  if (user?.following?.length !== 0) {
    const dataArr = [] as any;

    for (const followingUserId of user.following) {
      const postRef = collection(db, 'posts');

      const postQuery = query(
        postRef,
        orderBy('createdAt'),
        where('uid', '==', followingUserId),
        limit(1)
      );

      const documentSnapshots = await getDocs(postQuery);

      if (page === 1) {
        documentSnapshots.forEach((doc) => {
          const dataObj = { ...(doc.data() as Post), id: doc.id };
          dataArr.push(dataObj);
        });

        // 해당 게시글 작성자 정보 추가
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '==', followingUserId));
        const userDataQuerySnapshot = await getDocs(q);

        userDataQuerySnapshot.forEach((doc) => {
          const userDataObj: any = { ...doc.data(), id: doc.id };
          // 해당 게시글 작성자 정보를 추가할 때, 각 게시글마다 새로운 user 객체를 만들어서 추가
          dataArr.forEach((data: any) => {
            if (data.uid === userDataObj.uid) {
              data.user = userDataObj;
            }
          });
        });
      } else {
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];

        // 마지막 시점의 데이터 가져오기
        const next = query(
          collection(db, 'posts'),
          orderBy('createdAt'),
          where('uid', '==', followingUserId),
          startAfter(lastVisible),
          limit(page)
        );

        const querySnapshot = await getDocs(next);

        querySnapshot.forEach((doc) => {
          const dataObj = { ...(doc.data() as Post), id: doc.id };

          dataArr.push(dataObj);
        });

        // 해당 게시글 작성자 정보 추가
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '==', followingUserId));
        const userDataQuerySnapshot = await getDocs(q);

        userDataQuerySnapshot.forEach((doc) => {
          const userDataObj: any = { ...doc.data(), id: doc.id };
          // 해당 게시글 작성자 정보를 추가할 때, 각 게시글마다 새로운 user 객체를 만들어서 추가
          dataArr.forEach((data: any) => {
            if (data.uid === userDataObj.uid) {
              data.user = userDataObj;
            }
          });
        });
      }
    }

    // 내가 팔로우한 유저들이 작성한 게시글 갯수 구하기
    let limitCount = 0;
    const uniqueUserMap: any = {};

    dataArr?.forEach((data: any) => {
      const userUid = data?.user?.uid;

      // 만약 userUid가 uniqueUserMap에 없다면
      if (!uniqueUserMap[userUid]) {
        // 첫 번째 발생에 대해 postCount를 업데이트
        limitCount += data?.user?.postCount;

        // uniqueUserMap에서 userUid를 방문한 것으로 표시
        uniqueUserMap[userUid] = true;
      }
    });

    return { dataArr, limitCount };
  }
};
