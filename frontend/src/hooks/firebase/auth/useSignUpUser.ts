import { useCallback, } from "react";
import { createUserWithEmailAndPassword, } from "firebase/auth"
import { auth, } from "../firebase"
import { useNavigate, } from "react-router-dom";

interface Props {
  email: string;
  password: string;
  confirmationPassword: string;
}

export const useSignUpUser = () => {
  const navigate = useNavigate()
  const signUp = useCallback((props: Props) => {
    const { email, password, confirmationPassword } = props;

    // パスワードと再入力されたパスワードが違う場合
    if (password !== confirmationPassword) alert("パスワードが一致しません");
    // 登録
    createUserWithEmailAndPassword(auth, email, password )
      .then(( userCredential ) => {
        console.log('user created');
        const uid = auth.currentUser?.uid
        navigate('/'+ uid +'/calender/')
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/network-request-failed":
            alert("通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。");
            console.error(error)
            break;
          case "auth/weak-password":  //バリデーションでいかないようにするので、基本的にはこのコードはこない
            alert("パスワードが短すぎます。6文字以上を入力してください。");
            console.error(error)
            break;
          case "auth/invalid-email":  //バリデーションでいかないようにするので、基本的にはこのコードはこない
            alert("メールアドレスが正しくありません");
            console.error(error)
            break;
          case "auth/email-already-in-use":
            alert("メールアドレスがすでに使用されています。ログインするか別のメールアドレスで作成してください");
            console.error(error)
            break;
          default:  //想定外
            alert("アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。");
            console.error(error)
          }
      }); 
  }, [navigate]);

  return { signUp };
};
