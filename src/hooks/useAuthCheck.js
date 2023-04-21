import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {

    // dispatch
    const dispatch = useDispatch();

    // Use state
    const [authChecked, setAuthChecked] = useState(false);


    // UseEffect
    useEffect(() => {
        // get localstorage
        const localAuth = localStorage?.getItem("auth");

        if (localAuth) {
            const auth = JSON.parse(localAuth);
            if (auth?.accessToken && auth?.user) {
                dispatch(
                    userLoggedIn({
                        accessToken: auth.accessToken,
                        user: auth.user,
                    })
                );
            }
        }
        setAuthChecked(true);
    }, [dispatch, setAuthChecked]);

    return authChecked;
}