import axios from 'axios';
import { fetchUserCheck, fetchUserLogin, fetchUserRegister } from './user';

export const fetchKakaoAuth = async () => {
  const CODE = new URL(window.location.href).searchParams.get('code');

  const GRANT_TYPE = 'authorization_code';
  const CLIENT_ID = `${process.env.VUE_APP_KAKAO_REST_API}`;
  let REDIRECT_URI;

  if (process.env.VERCEL_ENV === 'production') {
    REDIRECT_URI = 'https://vue-book.vercel.app/callback/kakaotalk';
  } else {
    REDIRECT_URI = 'http://localhost:8080/callback/kakaotalk';
  }

  try {
    // 카카오 토큰 요청
    const res = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${CODE}`,
      {},
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    );

    // 카카오 토큰 요청 성공
    if (res.status === 200) {
      const header = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: `Bearer ${res.data.access_token}`,
      };

      // 카카오 유저 정보
      const kakaoAuth = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: header,
      });

      if (kakaoAuth.status === 200) {
        const userExists = await fetchUserCheck(
          kakaoAuth.data.kakao_account.email
        );

        // 유저정보가 있으면, 로그인
        userExists && fetchUserLogin(kakaoAuth);

        // 유저정보가 없으면, 회원가입후 로그인
        !userExists && fetchUserRegister(kakaoAuth);

        localStorage.setItem(
          'kakaoToken',
          JSON.stringify(res.data.access_token)
        );
      }
    }
  } catch (error: any) {
    throw new Error(`토큰 에러: ${error}`);
  }
};

// 카카오 로그아웃
export const KakaoLogout = async (id: string) => {
  try {
    const token = JSON.parse(localStorage.getItem('kakaoToken') || '');

    if (!token) {
      console.error('Kakao Token not found in localStorage.');
      return;
    }

    const commonHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${token}`,
    };

    const unlinkResponse = await axios.post(
      'https://kapi.kakao.com/v1/user/unlink',
      {},
      { headers: commonHeaders }
    );

    const logoutData = new URLSearchParams({ target_id: id });
    await axios.post('https://kapi.kakao.com/v1/user/logout', logoutData, {
      headers: commonHeaders,
    });

    console.log('Successfully logged out:', unlinkResponse.data);
  } catch (error) {
    console.error('Kakao Logout error:', error);
  }
};
