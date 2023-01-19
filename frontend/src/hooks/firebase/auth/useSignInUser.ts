import { useCallback, } from "react";
import { signInWithEmailAndPassword, } from "firebase/auth"
import { auth, } from "../firebase"
import { useNavigate, } from "react-router-dom";

interface Props {
  email: string;
  password: string;
}

export const useSignInUser = () => {
  const navigate = useNavigate()
  const signIn = useCallback((props: Props) => {
    const { email, password } = props;

    // ログイン処理
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log('ログイン成功=', user.user.uid)
        navigate('/' + user.user.uid + '/calender/')
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/network-request-failed":
            alert("通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。");
            console.error(error)
            break;
          case "auth/invalid-email":  //バリデーションでいかないようにするので、基本的にはこのコードはこない
            alert("ユーザ名またはパスワードが間違っています");
            console.error(error)
            break;
          case "auth/user-not-found":
            alert("ユーザ名またはパスワードが間違っています");
            console.error(error)
            break;
          case "auth/wrong-password":
            alert("ユーザ名またはパスワードが間違っています")
            break;
          default:  //想定外
            alert("ログインに失敗しました。通信環境がいい所で再度やり直してください。");
            console.error(error)
        }
      })

  }, [navigate]);

  return { signIn };
};
