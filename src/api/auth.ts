import axios from 'axios';
import { featUserCheck, featUserLogin, featUserRegister } from './user';

export const fetchKakaoAuth = async () => {
  const CODE = new URL(window.location.href).searchParams.get('code');

  const GRANT_TYPE = 'authorization_code';
  const CLIENT_ID = `${process.env.VUE_APP_KAKAO_REST_API}`;
  const REDIRECT_URI = 'http://localhost:8080/callback/kakaotalk';

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
        const userExists = await featUserCheck(
          kakaoAuth.data.kakao_account.email
        );

        // 유저정보가 있으면, 로그인
        userExists && featUserLogin(kakaoAuth);

        // 유저정보가 없으면, 회원가입후 로그인
        !userExists && featUserRegister(kakaoAuth);
      }
    }
  } catch (error: any) {
    throw new Error(`토큰 에러: ${error}`);
  }
};
