import { FC } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch } from "../../hooks";
import { loggedOut } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

type LogoutModalProps = {
	show: boolean;
	handleClose: () => void;
};

const LogoutModal: FC<LogoutModalProps> = ({ show, handleClose }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const logout = () => {
		handleClose();
		dispatch(loggedOut());
		navigate("/");
	};
	return (
		<Modal show={show} onHide={handleClose} data-testid="logout-modal">
			<Modal.Header closeButton>
				<Modal.Title>Logout</Modal.Title>
			</Modal.Header>
			<Modal.Body>Do you want to logout?</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={logout}>
					Logout
				</Button>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default LogoutModal;
