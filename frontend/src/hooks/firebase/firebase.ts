import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebaseプロジェクトを扱うための初期設定。
// このファイルは操作しなくていい

// process.env.XXXXXはenvファイルに記述された環境変数のこと
// ログイン機能を担当する人がfirebaseプロジェクトを作って環境変数に代入してください
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

initializeApp(firebaseConfig);

export const auth = getAuth();
