import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header";
import { useAppSelector } from "./hooks";
import { selectAuth } from "./features/authSlice";
import { useEffect } from "react";

function App() {
	const { id: authUserId } = useAppSelector(selectAuth);
	const navigate = useNavigate();
	useEffect(() => {
		if (!authUserId) {
			navigate("/landing");
		} else {
			navigate("/my-todo");
		}
	}, [authUserId, navigate]);
	return (
		<div className="App">
			<Header isAuthorized={!!authUserId} />
			<Outlet />
		</div>
	);
}

export default App;
