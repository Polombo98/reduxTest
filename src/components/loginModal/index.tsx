import { FC } from "react";
import { Button, ListGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useGetUsersQuery, type UserData } from "../../features/apiSlice";
import { loggedIn } from "../../features/authSlice";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";

type LoginModalProps = {
	show: boolean;
	handleClose: () => void;
};

const LoginModal: FC<LoginModalProps> = ({ show, handleClose }) => {
	const { isLoading, data } = useGetUsersQuery();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const login = (user: UserData) => {
		handleClose();
		dispatch(loggedIn(user));
		navigate("/my-todo");
	};

	return (
		<Modal show={show} onHide={handleClose} data-testid="login-modal">
			<Modal.Header closeButton>
				<Modal.Title>Choose the user</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<ListGroup as="ul">
						{data?.map((user) => (
							<ListGroup.Item
								key={user.id}
								action
								onClick={() => login(user)}
							>
								{user.username}
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default LoginModal;
