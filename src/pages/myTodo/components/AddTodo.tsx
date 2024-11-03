import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAddTodoMutation } from "../../../features/apiSlice";

type Inputs = {
	todo: string;
};

type AddTodoProps = {
	userId: number;
};

const AddTodo: FC<AddTodoProps> = ({ userId }) => {
	const [addTodo] = useAddTodoMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		await addTodo({ completed: false, title: data.todo, userId });
		reset();
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} data-testid="add-todo-form">
			<Row className="d-flex justify-content-between my-4">
				<Col xs={10}>
					<Form.Control
						type="text"
						placeholder="Enter your task"
						{...register("todo", { required: true })}
						isInvalid={!!errors.todo}
						data-testid="todo-input"
					/>
					<Form.Control.Feedback
						type="invalid"
						data-testid="error-message"
					>
						{errors.todo && "This field is required"}
					</Form.Control.Feedback>
				</Col>
				<Col xs="auto">
					<Button
						variant="primary"
						type="submit"
						data-testid="submit-button"
					>
						Add Todo
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default AddTodo;
