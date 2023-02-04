import {auth, } from "../firebase"

export const getToken = () =>{
auth.currentUser?.getIdToken()
.then(token => {
    console.log("Successfully obtained token")
    sessionStorage.setItem('token', token)
})
};