import { useSelector } from "react-redux";

export default function useAuth() {
    // Use Selector
    const auth = useSelector((state) => state.auth);

    if (auth?.accessToken && auth?.user) {
        return true;
    } else {
        return false;
    }
}