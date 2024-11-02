import { FC } from "react";
import { Button } from "react-bootstrap";

type AuthButtonProps = {
	isAuthorized?: boolean;
	handleLogin: () => void;
	handleLogout: () => void;
};

const AuthButton: FC<AuthButtonProps> = ({
	isAuthorized = false,
	handleLogin,
	handleLogout,
}) => {
	if (!isAuthorized)
		return (
			<Button
				variant="primary"
				data-testid="login-button"
				onClick={handleLogin}
			>
				Login
			</Button>
		);
	return (
		<Button
			variant="primary"
			data-testid="logout-button"
			onClick={handleLogout}
		>
			Logout
		</Button>
	);
};

export default AuthButton;
