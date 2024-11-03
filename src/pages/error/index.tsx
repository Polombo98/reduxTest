import { FC } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Header from "../../components/header";
import { useAppSelector } from "../../hooks";
import { selectAuth } from "../../features/authSlice";

const Error: FC = () => {
	const error = useRouteError();
	const { id: authUserId } = useAppSelector(selectAuth);

	if (isRouteErrorResponse(error)) {
		return (
			<div data-testid="error-page">
				<Header isAuthorized={!!authUserId} />
				<h1>Oops!</h1>
				<h2>{error.status}</h2>
				<p>{error.statusText}</p>
				{error.data?.message && <p>{error.data.message}</p>}
			</div>
		);
	} else {
		return <div>Oops</div>;
	}
};

export default Error;
