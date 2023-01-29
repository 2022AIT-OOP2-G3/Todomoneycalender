import { signOut, } from "firebase/auth";
import { auth, } from "../firebase"
import { useNavigate, } from "react-router-dom";

export const LogOut = () => {
    const navigate = useNavigate()
    const result = window.confirm("サインアウトしますか？");
    if (!result) {
        console.log("signOut cancel")
        return;
    }
    signOut(auth)
        .then(() => {
            console.log("User SignOut")
            navigate("/");
        })
        .catch((error) => {
            alert("ログアウトできませんでした。時間をおいてもう一度試してください");
            console.error(error);
        })
}