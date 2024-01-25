import { db } from '@/firebaseApp';
import { Post } from '@/types/post.d.ts';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

// HotTopic 얻어오기
export const fetchHotTopic = async () => {
  try {
    const hotTopicRef = collection(db, 'hotTopic');
    const dataArr = [] as any;

    const documentSnapshots = await getDocs(hotTopicRef);

    documentSnapshots.forEach((doc) => {
      const dataObj = { ...(doc.data() as Post) };

      dataArr.push(dataObj);
    });

    // 유저데이터 넣기
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

    return dataArr;
  } catch (error) {
    console.error(error);
  }
};

// admin인 유저가 게시글의 핫토픽설정
export const postHotTopic = async ({ data }: any) => {
  try {
    // admin 유저인지 체크
    const userRef = doc(db, 'users', data?.userId);

    const userSnap = await getDoc(userRef);
    const user = { ...userSnap?.data() };
    if (!user?.admin) {
      return alert('어드민 계정만 할 수있습니다.');
    }

    if (user.admin) {
      const postRef = doc(db, 'posts', data?.postId);
      const postSnap = await getDoc(postRef);
      const post = { ...postSnap?.data(), id: postSnap.id };

      // 핫토픽에 해당 게시글이있는지 확인
      const hotTopicRef = collection(db, 'hotTopic');
      const dataArr = [] as any;

      const q = query(hotTopicRef, where('id', '==', data?.postId));
      const documentSnapshots = await getDocs(q);

      documentSnapshots.forEach((doc) => {
        const dataObj = { ...(doc.data() as Post), id: doc.id };

        dataArr.push(dataObj);
      });

      if (dataArr.length !== 0) {
        return alert('이미 핫토픽에 있는 게시글입니다.');
      } else {
        // 핫토픽에 게시글이 없다면 핫토픽에 게시글 추가
        await addDoc(hotTopicRef, post);
        return alert('핫토픽에 추가 완료했습니다.');
      }
    }
  } catch (error) {
    console.error(error);
  }
};
