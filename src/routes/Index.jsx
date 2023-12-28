//import react router dom
import { Routes, Route } from "react-router-dom";

import Home from '../views/Home.jsx';
import Login from "../views/login.jsx";
import PostIndex from '../views/posts/Index.jsx';
import PostCreate from '../views/posts/Create.jsx';
import PostEdit from '../views/posts/Edit.jsx';
import Logout from "../views/Logout.jsx";

function RoutesIndex() {
    return (
        <Routes>

            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/login" */}
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            {/* route "/posts" */}
            <Route path="/posts" element={<PostIndex />} />

            {/* route "/posts/create" */}
            <Route path="/posts/create" element={<PostCreate />} />

            {/* route "/posts/edit/:id" */}
            <Route path="/posts/edit/:id" element={<PostEdit />} />

        </Routes>
    )
}

export default RoutesIndex