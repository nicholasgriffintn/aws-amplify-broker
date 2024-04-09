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
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Branding } from "../../branding";
import AppSnackbar from "../../components/Snackbar/Snackbar";

const useStyles = makeStyles(() => ({
	dialogTitle: {
		minWidth: 400,
	},
	dialogActions: {
		paddingRight: 22,
	},
	buttonVerify: {
		color: Branding.positive,
		"&:hover": {
			color: Branding.positive,
			opacity: Branding.opacityHover,
		},
	},
	buttonClose: {
		color: Branding.negative,
		"&:hover": {
			color: Branding.negative,
			opacity: Branding.opacityHover,
		},
	},
}));

const VerifyAttributeDialog = (props) => {
	const classes = useStyles();
	const [code, setCode] = React.useState("");
	const [snackBarOps, setSnackBarOps] = React.useState({
		type: "info",
		open: false,
		vertical: "top",
		horizontal: "center",
		autoHide: 0,
		message: "",
	});

	const verifyCurrentUserAttributeSubmit = (attr, code) => {
		if (!attr || !code) {
			setSnackBarOps({
				type: "error",
				open: true,
				vertical: "top",
				horizontal: "center",
				autoHide: 3000,
				message: I18n.get("VERIFY_DIALOG_MESSAGE_EROR"),
			});
			return;
		}

		// To verify attribute with the code
		Auth.verifyCurrentUserAttributeSubmit(attr, code)
			.then((data) => {
				handleClose(data === "SUCCESS");
			})
			.catch((err) => {
				console.error(err);

				setSnackBarOps({
					type: "error",
					open: true,
					vertical: "top",
					horizontal: "center",
					autoHide: 3000,
					message: I18n.get("VERIFY_DIALOG_MESSAGE_EROR"),
				});
			});
	};

	const handleClickVerify = () => {
		verifyCurrentUserAttributeSubmit(props.attrType, code);
	};

	const handleClose = (successful = false) => {
		setCode("");
		props.reloadUserData();
		props.close(successful);
	};

	const handleChange = (value) => {
		setCode(value || "");
	};

	return (
		<div>
			{snackBarOps.open && <AppSnackbar ops={snackBarOps} />}

			<Dialog
				open={props.open}
				onClose={handleClose}
				disableBackdropClick
				aria-labelledby="verify-dialog"
			>
				<DialogTitle
					id="verify-dialog-title"
					className={classes.dialogTitle}
				>
					{I18n.get("VERIFY_DIALOG_TITLE")}
				</DialogTitle>
				<DialogContent className={classes.dialogContent}>
					<DialogContentText>
						{I18n.get("VERIFY_DIALOG_DESCRIPTION")}
					</DialogContentText>
					<TextField
						value={code}
						onChange={(event) => handleChange(event.target.value)}
						margin="dense"
						id="code"
						label={I18n.get("VERIFY_DIALOG_INPUT_LABEL")}
						fullWidth
						className={classes.TextField}
						inputProps={{ style: { left: 0 } }}
						autoFocus
					/>
				</DialogContent>
				<DialogActions className={classes.dialogActions}>
					<Button
						variant="outlined"
						onClick={handleClickVerify}
						className={classes.buttonVerify}
					>
						{I18n.get("VERIFY_DIALOG_VERIFY_BUTTON_LABEL")}
					</Button>
					<Button
						variant="outlined"
						onClick={handleClose}
						className={classes.buttonClose}
					>
						{I18n.get("VERIFY_DIALOG_CLOSE_BUTTON_LABEL")}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default VerifyAttributeDialog;
