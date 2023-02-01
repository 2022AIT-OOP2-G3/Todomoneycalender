import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useSignOutUser = () => {
    const navigate = useNavigate();

    const logOut = useCallback(() => {
        const result = window.confirm("サインアウトしますか？");
        if (!result) {
            console.log("signOut cancel");
            sessionStorage.removeItem('token');
            return;
        }
        signOut(auth)
            .then(() => {
                console.log("User SignOut");
                navigate("/");
            })
            .catch((error) => {
                alert("ログアウトできませんでした。時間をおいてもう一度試してください");
                console.error(error);
            });
    }, [navigate]);
    return { logOut };
};
