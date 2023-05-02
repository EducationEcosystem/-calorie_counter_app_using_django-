import { redirect } from "react-router-dom";

export const isLoggedIn = () => {
    const value = localStorage.getItem('isLoggedIn');
    if (!value) {
        return redirect('/login');
    }
    return null;
}

export const isLoggedOut = () => {
    const value = localStorage.getItem('isLoggedIn');
    if (value) {
        return redirect('/');
    }
    return null;
}