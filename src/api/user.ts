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
  query,
  setDoc,
  where,
} from 'firebase/firestore';

const auth = getAuth(app);

export const featUserCheck = async (email: string) => {
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
export const featUserLogin = async (kakaoAuth: any) => {
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
export const featUserRegister = async (kakaoAuth: any) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      kakaoAuth.data.kakao_account.email,
      kakaoAuth.data.id
    );

    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: kakaoAuth.data.kakao_account.email,
      nickname: kakaoAuth.data.kakao_account.profile.nickname,
      profile_image_url: kakaoAuth.data.kakao_account.profile.profile_image_url,
      likeCount: 0,
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
