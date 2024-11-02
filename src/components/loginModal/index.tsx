import { FC } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

type LoginModalProps = {
	show: boolean;
	handleClose: () => void;
};

const LoginModal: FC<LoginModalProps> = ({ show, handleClose }) => {
	return (
		<Modal show={show} onHide={handleClose} data-testid="login-modal">
			<Modal.Header closeButton>
				<Modal.Title>Choose the user</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Woohoo, you are reading this text in a modal!
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
