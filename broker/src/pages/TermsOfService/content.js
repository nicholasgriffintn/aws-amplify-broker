/*
 * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 *
 * Licensed under the MIT License. See the LICENSE accompanying this file
 * for the specific language governing permissions and limitations under
 * the License.
 */

import React from "react";
import { I18n } from "@aws-amplify/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { Branding } from "../../branding";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		paddingBottom: theme.spacing(6),
		boxShadow: "0 0 black",
		textAlign: "center",
		fontSize: "xxx-large",
		fontWeight: "bold",
	},
	contentHead: {
		paddingBottom: theme.spacing(3),
		boxShadow: "0 0 black",
		textAlign: "center",
		fontSize: "large",
		fontWeight: "bold",
	},
	contentText: {
		paddingBottom: theme.spacing(6),
		boxShadow: "0 0 black",
	},
	contentFooter: {
		boxShadow: "0 0 black",
	},
	gridRowActions: {
		paddingBottom: theme.spacing(1),
		textAlign: "center",
		boxShadow: "0 0 black",
	},
	btnYes: {
		margin: theme.spacing(1),
		color: Branding.positive,
		"&:hover": {
			color: Branding.positive,
			opacity: Branding.opacityHover,
		},
	},
	btnNo: {
		margin: theme.spacing(1),
		color: Branding.negative,
		"&:hover": {
			color: Branding.negative,
			opacity: Branding.opacityHover,
		},
	},
}));

export default function TosContent(props) {
	const classes = useStyles();

	const showActions = props.reSign || false;

	const acceptToS = () => {
		props.tosAccept();
	};

	const declineToS = () => {
		props.tosDecline();
	};

	return (
		<div className={classes.root}>
			<Grid container justify="center" spacing={2}>
				<Grid item xs={1} />
				<Grid item xs={10}>
					<Paper className={classes.title}>
						{I18n.get("TERMS_OF_SERVICE_CONTENT_TITLE")}
					</Paper>
					<Paper className={classes.contentHead}>
						{I18n.get("TERMS_OF_SERVICE_CONTENT_P1")}
					</Paper>
					{showActions && (
						<Paper className={classes.gridRowActions}>
							<Button
								variant="outlined"
								onClick={acceptToS}
								className={classes.btnYes}
							>
								{I18n.get(
									"TERMS_OF_SERVICE_CONTENT_BUTTON_ACCEPT_LABEL"
								)}
							</Button>
							<Button
								variant="outlined"
								onClick={declineToS}
								className={classes.btnNo}
							>
								{I18n.get(
									"TERMS_OF_SERVICE_CONTENT_BUTTON_DECLINE_LABEL"
								)}
							</Button>
						</Paper>
					)}
				</Grid>
				<Grid item xs={1} />
			</Grid>
		</div>
	);
}
