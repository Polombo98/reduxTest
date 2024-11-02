import { FC } from "react";

import styles from "./index.module.css";

const WelcomeText: FC = () => {
	return (
		<div data-testid="welcome-text" className={styles.wrapper}>
			<p>
				Stay organized, boost your productivity, and accomplish more
				with TaskTrack, the intuitive todo app designed to help you
				manage your daily tasks effortlessly.
			</p>
			<h2>Get Started Instantly</h2>
			<ul>
				<li>
					Select Your User: Choose your username from our list of
					users to log in immediately—no lengthy sign-up process
					required.
				</li>
				<li>
					Personalized Experience: Access your own task list and start
					organizing right away.
				</li>
			</ul>

			<h3>How It Works</h3>
			<ol>
				<li>
					Pick Your User: <b />
					Press login button on header and on the login modal, select
					your user from the list of available items fetched from our
					backend.
				</li>
				<li>
					Explore the Dashboard: <b />
					Access your personalized dashboard featuring your current
					tasks.
				</li>
				<li>
					Manage Your Tasks: <b />
					Add new tasks, edit existing ones, or mark them as completed
					to stay organized.
				</li>
				<li>
					Need Guidance?: <b />
					Check out our short user guide below to make the most out of
					TaskTrack.
				</li>
			</ol>
			<h3>Short User Guide</h3>
			<ul>
				<li>
					Adding a Task: <b />
					Click the “Add Task” button.
					<b />
					Enter the task details and, optionally, set a due date.
				</li>
				<li>
					Editing a Task: <b />
					Click on the icon near the task you wish to edit.
					<b />
					Modify the details as needed and save your changes.
				</li>
				<li>
					Completing a Task: <b />
					Click the checkbox next to the task to mark it as completed.
				</li>
				<li>
					Deleting a Task: <b />
					Select the task and click the button to remove it from your
					list.
				</li>
				<li>
					Switching Users: <b />
					Log out from the menu and select a different username to
					switch accounts.
				</li>
			</ul>
		</div>
	);
};

export default WelcomeText;
