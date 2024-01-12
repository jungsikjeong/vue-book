import { initializeApp, FirebaseApp, getApp } from 'firebase/app';
import 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export let app: FirebaseApp;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
};

try {
  // 앱 이름이 제공되면 해당 이름에 해당하는 앱이 반환됩니다
  // 검색 중인 앱이 아직 초기화되지 않은 경우 '예외'가 발생합니다. (공홈 getApp설명)
  app = getApp('app');
} catch (e) {
  // 예외가 발생하면 이리로옴, 그러면 초기화가 진행됨
  app = initializeApp(firebaseConfig);
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default firebase;
