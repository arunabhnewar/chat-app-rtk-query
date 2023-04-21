import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

    const authChecked = useAuthCheck();

    return !authChecked ? (<div>Authentication Checking....</div>) : (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/inbox" element={<Conversation />} />
                <Route path="/inbox/:id" element={<Inbox />} />
            </Routes>
        </Router>
    );
}

export default App;
