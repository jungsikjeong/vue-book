import { app, db } from '@/firebaseApp';
import router from '@/router';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

const auth = getAuth(app);

export const fetchUserCheck = async (email: string) => {
  const usersRef = collection(db, 'users');
  const userQuery = query(usersRef, where('email', '==', email));

  const userSnapshot = await getDocs(userQuery);

  if (!userSnapshot.empty) {
    // 사용자가 존재하는 경우
    return true;
  } else {
    // 사용자가 존재하지 않는 경우
    return false;
  }
};

// 로그인
export const fetchUserLogin = async (kakaoAuth: any) => {
  try {
    await signInWithEmailAndPassword(
      auth,
      kakaoAuth.data.kakao_account.email,
      kakaoAuth.data.id
    );
  } catch (error: any) {
    throw new Error(`로그인중 에러가 발생했습니다. 다시 시도해주세요 ${error}`);
  }
};

// 회원가입
export const fetchUserRegister = async (kakaoAuth: any) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      kakaoAuth.data.kakao_account.email,
      kakaoAuth.data.id
    );

    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: kakaoAuth.data.kakao_account.email,
      displayName: kakaoAuth.data.kakao_account.profile.nickname,
      photoURL: kakaoAuth.data.kakao_account.profile.profile_image_url,
      snsId: kakaoAuth.data.id,
      likePost: [],
      followers: [],
      following: [],
      postCount: 0,
      uid: userCredential.user.uid,
    });

    await updateProfile(userCredential.user, {
      displayName: kakaoAuth.data.kakao_account.profile.nickname,
      photoURL: kakaoAuth.data.kakao_account.profile.profile_image_url,
    });
  } catch (error: any) {
    throw new Error(
      `회원가입중 에러가 발생했습니다. 다시 시도해주세요 ${error}`
    );
  }
};

// 유저 정보 조회
export const fetchUserInfo = async (userId: string) => {
  try {
    const dataArr = [] as any;

    const usersRef = collection(db, 'users');

    const q = query(usersRef, where('uid', '==', userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      dataArr.push(dataObj);
    });

    return dataArr;
  } catch (error) {
    console.log(error);
  }
};
// 유저가 작성한 postCount 갯수 증가
export const addUserPostCount = async (userId: string) => {
  try {
    if (userId) {
      const usersDoc = doc(db, 'users', userId);

      await updateDoc(usersDoc, {
        postCount: increment(1),
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// 유저가 작성한 postCount 갯수 감소
export const downUserPostCount = async (userId: string) => {
  try {
    if (userId) {
      const usersDoc = doc(db, 'users', userId);

      await updateDoc(usersDoc, {
        postCount: increment(-1),
      });
    }
  } catch (error) {
    console.log(error);
  }
};
