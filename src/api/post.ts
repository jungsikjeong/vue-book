import { app, db } from '@/firebaseApp';
import {
  addDoc,
  collection,
  deleteDoc,
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
import { deleteObject, getStorage, ref } from 'firebase/storage';

interface fetchPostList {
  count?: number;
}

const storage = getStorage(app);

// 전체 게시물 확인
export const fetchPostList = async ({ count = 6 }: fetchPostList = {}) => {
  const postRef = collection(db, 'posts');
  const dataArr = [] as any;

  const first = query(postRef, orderBy('createdAt', 'desc'), limit(6));
  const documentSnapshots = await getDocs(first);

  if (count === 6) {
    documentSnapshots.forEach((doc) => {
      const dataObj = { ...(doc.data() as Post), id: doc.id };

      dataArr.push(dataObj);
    });

    // 해당 게시글 작성자 정보 추가
    const usersRef = collection(db, 'users');
    if (dataArr.length > 0) {
      for (const data of dataArr) {
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
  } else {
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    // 마지막 시점의 데이터 가져오기
    const next = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      startAfter(lastVisible),
      limit(count)
    );

    const querySnapshot = await getDocs(next);

    querySnapshot.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };

      dataArr.push(dataObj);
    });

    const usersRef = collection(db, 'users');
    if (dataArr.length > 0) {
      for (const data of dataArr) {
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
  }

  return dataArr;
};

// 내가 작성한 게시물 확인
export const fetchMyPostList = async (userId: string) => {
  const postRef = collection(db, 'posts');
  const dataArr = [] as any;

  const q = query(
    postRef,
    orderBy('createdAt', 'desc'),
    where('uid', '==', userId)
  );

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

// 게시글 좋아요 클릭 또는 취소
export const toggleLikePost = async (postId: string, user: any) => {
  try {
    const postRef = doc(db, 'posts', postId);
    const postDocSnap = await getDoc(postRef);

    if (postDocSnap.exists()) {
      const postData = postDocSnap.data();
      const currentLikes = postData.like || [];

      let updatedLikes;

      if (currentLikes.includes(user)) {
        // 이미 좋아요를 눌렀는데, 다시 클릭하면 좋아요 취소
        updatedLikes = currentLikes.filter((userId: any) => userId !== user);
      } else {
        // 좋아요를 누르지 않은 상태에서 클릭하면 좋아요 추가
        updatedLikes = [...currentLikes, user];
      }

      // 게시글 좋아요 업데이트
      await updateDoc(postRef, {
        like: updatedLikes,
      });

      // 유저의 게시글 좋아요 업데이트
      await toggleLikePostUser(postId, user);

      // 업데이트된 데이터 가져오기
      const updatedPostDocSnap = await getDoc(postRef);
      const updatedPostData: any = { ...updatedPostDocSnap.data(), id: postId };

      // 해당 게시글 작성자 정보 추가
      const usersRef = collection(db, 'users');
      if (updatedPostData) {
        const q = query(usersRef, where('uid', '==', updatedPostData.uid));

        const userDataQuerySnapshot = await getDocs(q);

        userDataQuerySnapshot.forEach((doc) => {
          const userDataObj: any = { ...doc.data(), id: doc.id };
          if (userDataObj?.uid === updatedPostData.uid) {
            updatedPostData.user = userDataObj;
          }
        });
      }

      return updatedPostData;
    }
  } catch (error) {
    console.error(error);
  }
};

// 사용자가 게시글 좋아요 누르면 사용자의 postLike에 저장
export const toggleLikePostUser = async (postId: string, userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const currentLikes = userData.likePost || [];

      let updatedLikes;

      if (currentLikes.includes(postId)) {
        // 이미 좋아요를 눌렀는데, 다시 클릭하면 좋아요 취소
        updatedLikes = currentLikes.filter((post: any) => post !== postId);
      } else {
        // 좋아요를 누르지 않은 상태에서 클릭하면 좋아요 추가
        updatedLikes = [...currentLikes, postId];
      }

      // 게시글 좋아요 업데이트
      await updateDoc(userRef, {
        likePost: updatedLikes,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
// 내가 좋아요누른 게시물 확인
export const fetchMyPostLikeList = async (likePost: string[]) => {
  try {
    const postData: any = [];
    if (likePost.length !== 0) {
      await Promise.all(
        likePost.map(async (post: any) => {
          const defRef = doc(db, 'posts', post);
          const docSnap = await getDoc(defRef);
          postData.push({ ...docSnap.data(), id: docSnap.id });
        })
      );

      return postData;
    }
  } catch (error) {
    console.error(error);
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

// 포스트 전체 갯수감소
export const decreasePostCount = async () => {
  try {
    const postCountRef = collection(db, 'postCount');

    // 데이터 확인
    const querySnapshot = await getDocs(postCountRef);
    const postCountDoc = querySnapshot?.docs[0];

    const postCount = postCountDoc.data().count;
    // postCount가 0아니면 -1감소
    if (postCount !== 0) {
      await updateDoc(doc(db, 'postCount', postCountDoc.id), {
        count: increment(-1),
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

// 이미지 삭제 함수
const deleteImages = async (images: any[]) => {
  try {
    const deleteImagePromises = images.map(async (image) => {
      const desertRef = ref(storage, image.src);
      await deleteObject(desertRef);
    });

    await Promise.all(deleteImagePromises);

    return { status: 200 };
  } catch (error) {
    console.error('Error deleting images:', error);

    return { status: 500 };
  }
};

// 게시글 삭제
export const deletePost = async (postId: string) => {
  try {
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const images = docSnap.data().imageUrl;

      // 이미지 삭제
      const result = await deleteImages(images);

      if (result?.status === 200) {
        // 게시글 삭제
        await deleteDoc(docRef);

        console.log(`게시글 (ID: ${postId})이(가) 성공적으로 삭제되었습니다.`);
        return { status: 200 };
      }
    }
  } catch (error) {
    console.error(`게시글 삭제 중 오류 발생: ${error}`);
  }
};
