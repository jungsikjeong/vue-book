import { db } from '@/firebaseApp';
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

// 댓글 작성하기
export const postComment = async (data: any, postId: string) => {
  try {
    // 게시글 찾기
    const postRef = doc(db, 'posts', postId);

    await updateDoc(postRef, {
      comments: arrayUnion(data),
    });
  } catch (error) {
    console.log(error);
  }
};

// 댓글 수정하기
export const editComment = async (
  commentIndex: number,
  postId: string,
  commentPost: any
) => {
  try {
    // 게시글 찾기
    const postRef = doc(db, 'posts', postId);

    const data = await getDoc(postRef);
    const comments = data.data()?.comments;
    comments[commentIndex] = commentPost;

    // 게시글의 댓글 업데이트
    await updateDoc(postRef, {
      comments: comments,
    });

    // 성공 상태 코드 반환
    return { state: '200' };
  } catch (error) {
    console.log(error);
  }
};

// 댓글 삭제하기
export const deleteComment = async (commentIndex: number, postId: string) => {
  try {
    // 게시글 찾기
    const postRef = doc(db, 'posts', postId);

    const data = await getDoc(postRef);
    const comments = data.data()?.comments;
    comments.splice(commentIndex, 1);

    await updateDoc(postRef, {
      comments: comments,
    });

    return { state: '200' };
  } catch (error) {
    console.error(error);
  }
};

// 댓글 불러오기
export const fetchComment = async (postId: any) => {
  try {
    // 게시글 찾기
    const postRef = doc(db, 'posts', postId);

    const data = await getDoc(postRef);
    const comments = data.data()?.comments;

    // 댓글 작성자 찾기
    const userInfo = await fetchUserinfo(comments);

    const updatedData = comments?.map((item: any, index: any) => ({
      comment: { ...item },
      user: userInfo[index],
    }));

    return updatedData;
  } catch (error) {
    console.log(error);
  }
};

// 댓글 작성자 정보
const fetchUserinfo = async (comments: any) => {
  try {
    // 댓글 작성자 찾기
    const usersRef = collection(db, 'users');

    const userDataArr = [] as any;

    if (comments) {
      for (let i = 0; i < comments?.length; i++) {
        const q = query(usersRef, where('uid', '==', comments[i]?.userId));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const dataObj = { ...doc.data() };
          userDataArr.push(dataObj);
        });
      }
    }
    return userDataArr;
  } catch (error) {
    console.error(error);
  }
};
