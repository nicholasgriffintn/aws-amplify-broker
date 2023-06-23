/*
 * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 *
 * Licensed under the MIT License. See the LICENSE accompanying this file
 * for the specific language governing permissions and limitations under
 * the License.
 */

import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Branding } from "../../branding";

import TabSignInData from "./tabSignInData";
import TabMfaData from "./tabMfaData";
import TabUserData from "./tabUserData";
/*
 * Device Management not supported from AWS Amplify SDK for JS - see './tabDeviceData.js'
 */
//import TabDeviceData from './tabDeviceData';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`usedata-tabpanel-${index}`}
			aria-labelledby={`userdata-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography component={"div"}>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	grid: {
		justifyContent: "center",
	},
	box: {
		width: "90%",
		maxWidth: 650,
	},
	appBar: {
		backgroundColor: "transparent",
		boxShadow: "none",
	},
	tabs: {
		color: Branding.primary,
		indicator: Branding.accent,
	},
	tabsIndicator: {
		background: Branding.accent,
	},
	tabPanelBox: {
		display: "flex",
		justifyContent: "center",
		minWidth: "420px",
		maxWidth: "420px",
		margin: "0 auto",
	},
}));

export default function Content(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className="user_settings_page">
				<h1 className="user_settings_page_title">Your Profile</h1>
				<CssBaseline />
				<TabUserData reloadUserData={props.reloadUserData} />
				<TabSignInData reloadUserData={props.reloadUserData} />
				<TabMfaData />
				{/* <TabDeviceData /> */}
			</div>
		</div>
	);
}
