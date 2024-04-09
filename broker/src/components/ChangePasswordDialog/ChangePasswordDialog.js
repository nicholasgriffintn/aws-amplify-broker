/*
 * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 *
 * Licensed under the MIT License. See the LICENSE accompanying this file
 * for the specific language governing permissions and limitations under
 * the License.
 */

import React from "react";

import { Auth } from "aws-amplify";
import { I18n } from "@aws-amplify/core";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

import { VpnKey, Visibility, VisibilityOff } from "@material-ui/icons";

import { Branding } from "../../branding";
import AppSnackbar from "../../components/Snackbar/Snackbar";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	dialogActions: {
		paddingRight: 22,
	},
	box: {
		textAlign: "center",
		marginBottom: 20,
	},
	input: {
		minWidth: 300,
	},
	textFieldIcon: {
		color: Branding.secondary,
	},
	buttonSave: {
		color: Branding.positive,
	},
	buttonCancel: {
		color: Branding.negative,
	},
}));

const ChangePasswordDialog = (props) => {
	const classes = useStyles();
	const [oldPassword, setOldPassword] = React.useState({
		password: "",
		showPassword: false,
	});
	const [newPassword, setNewPassword] = React.useState({
		password: "",
		showPassword: false,
	});
	const [snackBarOps, setSnackBarOps] = React.useState({
		type: "info",
		open: false,
		vertical: "top",
		horizontal: "center",
		autoHide: 0,
		message: "",
	});

	const changePassword = (oldPassword, newPassword) => {
		if (!oldPassword || !newPassword) {
			setSnackBarOps({
				type: "error",
				open: true,
				vertical: "top",
				horizontal: "center",
				autoHide: 3000,
				message: I18n.get("CHANGE_PASSWORD_MESSAGE_EROR"),
			});
			return;
		}

		Auth.currentAuthenticatedUser()
			.then((CognitoUser) => {
				Auth.changePassword(CognitoUser, oldPassword, newPassword)
					.then((data) => {
						handleCancel(data === "SUCCESS");
					})
					.catch((err) => {
						console.error(err);

						setSnackBarOps({
							type: "error",
							open: true,
							vertical: "top",
							horizontal: "center",
							autoHide: 3000,
							message: I18n.get("CHANGE_PASSWORD_MESSAGE_EROR"),
						});
					});
			})
			.catch((err) => {
				console.error(err);

				setSnackBarOps({
					type: "error",
					open: true,
					vertical: "top",
					horizontal: "center",
					autoHide: 3000,
					message: I18n.get("CHANGE_PASSWORD_MESSAGE_EROR"),
				});
			});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleChangeOldPassword = (value) => {
		setOldPassword({ ...oldPassword, password: value });
	};

	const handleChangeNewPassword = (value) => {
		setNewPassword({ ...newPassword, password: value });
	};

	const handleClickSave = () => {
		changePassword(oldPassword.password, newPassword.password);
	};

	const handleCancel = (succesful = false) => {
		setOldPassword({ ...oldPassword, password: "" });
		setNewPassword({ ...newPassword, password: "" });
		props.close(succesful);
	};

	return (
		<div>
			{snackBarOps.open && <AppSnackbar ops={snackBarOps} />}

			<Dialog
				open={props.open}
				onClose={handleCancel}
				disableBackdropClick
				aria-labelledby="change-password-dialog"
			>
				<DialogTitle id="change-password-dialog-title">
					{I18n.get("CHANGE_PASSWORD_TITLE")}
				</DialogTitle>
				<DialogContent className={classes.dialogContent}>
					<DialogContentText>
						{I18n.get("CHANGE_PASSWORD_DESCRIPTION")}
					</DialogContentText>
					<Box className={classes.box}>
						<FormControl>
							<InputLabel htmlFor="inputOldPassword">
								{I18n.get(
									"CHANGE_PASSWORD_OLDPASSWORD_INPUT_LABEL"
								)}
							</InputLabel>
							<Input
								value={oldPassword.password}
								type={
									oldPassword.showPassword
										? "text"
										: "password"
								}
								onChange={(event) =>
									handleChangeOldPassword(event.target.value)
								}
								id="inputOldPassword"
								startAdornment={
									<InputAdornment position="start">
										<VpnKey
											className={classes.textFieldIcon}
										/>
									</InputAdornment>
								}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() =>
												setOldPassword({
													...oldPassword,
													showPassword:
														!oldPassword.showPassword,
												})
											}
											onMouseDown={
												handleMouseDownPassword
											}
											edge="end"
										>
											{oldPassword.showPassword ? (
												<Visibility />
											) : (
												<VisibilityOff />
											)}
										</IconButton>
									</InputAdornment>
								}
								className={classes.input}
								autoFocus
								inputProps={{ style: { left: 0 } }}
							/>
						</FormControl>
					</Box>
					<Box className={classes.box}>
						<FormControl>
							<InputLabel htmlFor="inputNewPassword">
								{I18n.get(
									"CHANGE_PASSWORD_NEWPASSWORD_INPUT_LABEL"
								)}
							</InputLabel>
							<Input
								value={newPassword.password}
								type={
									newPassword.showPassword
										? "text"
										: "password"
								}
								onChange={(event) =>
									handleChangeNewPassword(event.target.value)
								}
								id="inputNewPassword"
								startAdornment={
									<InputAdornment position="start">
										<VpnKey
											className={classes.textFieldIcon}
										/>
									</InputAdornment>
								}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() =>
												setNewPassword({
													...newPassword,
													showPassword:
														!newPassword.showPassword,
												})
											}
											onMouseDown={
												handleMouseDownPassword
											}
											edge="end"
										>
											{newPassword.showPassword ? (
												<Visibility />
											) : (
												<VisibilityOff />
											)}
										</IconButton>
									</InputAdornment>
								}
								className={classes.input}
								inputProps={{ style: { left: 0 } }}
							/>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions className={classes.dialogActions}>
					<Button
						variant="outlined"
						onClick={handleClickSave}
						className={classes.buttonSave}
					>
						{I18n.get("CHANGE_PASSWORD_SAVE_BUTTON_LABEL")}
					</Button>
					<Button
						variant="outlined"
						onClick={handleCancel}
						className={classes.buttonCancel}
					>
						{I18n.get("CHANGE_PASSWORD_CANCEL_BUTTON_LABEL")}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ChangePasswordDialog;
