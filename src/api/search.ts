import { db } from '@/firebaseApp';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

// 게시글 검색
export const fetchSearchPostData = async (keyword: string) => {
  const posts: any[] = [];

  try {
    const postRef = collection(db, 'posts');

    const postsQuery = query(
      postRef,
      where('tags', 'array-contains-any', [keyword]),
      orderBy('createdAt', 'desc')
    );

    const documentSnapshots = await getDocs(postsQuery);

    documentSnapshots.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };

      posts.push(dataObj);
    });

    // 해당 게시글 작성자 정보 추가
    const usersRef = collection(db, 'users');

    if (posts.length > 0) {
      for (const data of posts) {
        const q = query(usersRef, where('uid', '==', data.uid));

        const userDataQuerySnapshot = await getDocs(q);

        userDataQuerySnapshot.forEach((doc) => {
          const userDataObj: any = { ...doc.data(), id: doc.id };
          if (userDataObj?.uid === data.uid) {
            data.user = userDataObj;
          }
        });
      }
    }

    return { status: 200, posts: posts };
  } catch (error) {
    console.error(error);
  }
};

// 유저들 검색
export const fetchSearchUserData = async (keyword: string) => {
  let users: any[] = [];
  const displayName: any[] = [];
  const description: any[] = [];

  try {
    const usersRef = collection(db, 'users');

    const usersQuery = query(
      usersRef,
      where('displayName', '>=', keyword),
      where('displayName', '<=', keyword + '\uf8ff'),
      orderBy('displayName', 'desc')
    );
    const descriptionQuery = query(
      usersRef,
      where('description', '>=', keyword),
      where('description', '<=', keyword + '\uf8ff'),
      orderBy('description', 'desc')
    );

    const displayNameSnapshots = await getDocs(usersQuery);

    displayNameSnapshots.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };

      displayName.push(dataObj);
    });

    const DescriptionSnapshots = await getDocs(descriptionQuery);

    DescriptionSnapshots.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };

      description.push(dataObj);
    });

    // 배열이 비어있는지 확인 후 중복된 uid 찾기
    if (displayName.length !== 0 && description.length !== 0) {
      const duplicateUIDs = displayName
        .map((user) => user.uid)
        .filter((uid) => description.some((item) => item.uid === uid));

      // 중복된 uid를 기준으로 users 배열 업데이트
      users = displayName.filter((user) => duplicateUIDs.includes(user.uid));

      // 사용자 이름만 찾았을 경우,
    } else if (displayName.length !== 0 && description.length === 0) {
      users = displayName;

      // 사용자의 소갯글만 찾았을 경우,
    } else if (displayName.length === 0 && description.length !== 0) {
      users = description;
    }

    return { status: 200, users };
  } catch (error) {
    console.error(error);
  }
};
