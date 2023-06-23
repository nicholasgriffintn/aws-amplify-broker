/*
 * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 *
 * Licensed under the MIT License. See the LICENSE accompanying this file
 * for the specific language governing permissions and limitations under
 * the License.
 */

import React from "react";
import { connect } from "react-redux";
import { setLang, setAuth } from "../../redux/actions";

import { I18n } from "@aws-amplify/core";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";

import LanguageSelect from "../LanguageSelect/LanguageSelect";

import md5 from "md5";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: theme.spacing(6),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	userButton: {
		marginLeft: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	logo: {
		width: 178,
		marginRight: theme.spacing(2),
	},
	offset: theme.mixins.toolbar,
}));

const mapStateToProps = (state) => {
	return {
		lang: state.app.lang,
		auth: state.app.auth,
		attributes: state.user.attributes,
	};
};

const Header = (props) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleLangChange = (lang) => {
		I18n.setLanguage(lang);
		setLang(lang);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleRouteTo = (routeTo) => {
		setAnchorEl(null);
		if (routeTo) props.routeTo(routeTo);
	};

	return (
		<div className={classes.root}>
			<AppBar position="fixed" color="transparent">
				<Toolbar>
					<svg
						id="app-content-logo"
						className={classes.logo}
						enable-background="new 0 0 558.16 112.88"
						version="1.1"
						viewBox="0 0 558.16 112.88"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							class="st1"
							d="M247.2,70.32c-12.02-3.86-12.28-26.76,0-30.81V27.84c-31.35,3.78-30.81,51,0,54.2V70.32z"
						></path>
						<path
							class="st0"
							d="m48.94 58.72c0.31 6.06-0.84 9.46-4.7 11.84-11.3 6.92-19.56-7.28-9.02-11.04 2.69-0.96 10.53-2.92 13.36-3.32 0.3-0.04 0.33 0.04 0.33 0.16l0.03 2.36zm-30.87-16.36 12.48 2.39c2.18-4.95 3.52-6.54 9.62-6.54 6.62 0 8.81 1.86 8.83 8.42-2.64 4.44-32.42 0.84-32.42 19.48v1.42c0 13.24 16.28 17.81 26.78 12.53 2.59-1.29 5.8-4.23 6.77-4.66l1.76 5.7c0.81-0.27 11.33-0.01 13.6-0.12-1.68-5.6-2.76-6.28-3.02-13.45-0.78-22.55 5.93-39.93-20.67-39.93-6.03 0-11.8 0.47-16.46 3.58-2.59 1.73-6.72 6.71-7.27 11.18"
						></path>
						<path
							class="st0"
							d="m129.06 53.52v2.84c0 14.76 9.64 25.82 24.35 25.82h1.61c13.09 0 21.06-7.56 23.31-18.88l-13.62-2.39c-0.8 5.89-3.77 9.96-10.08 9.96-8.23 0-11.37-7.15-11.37-15.32v-2.85c0-8.03 3.26-14.2 11.37-14.2 5.43 0 8.6 3.25 9.33 8.21l13.62-2.43c-0.89-5.02-4.88-10.18-7.58-12.24-4.26-3.26-9.57-4.45-15.99-4.45-15.16 0.01-24.95 10.62-24.95 25.93"
						></path>
						<path
							class="st0"
							d="m200.39 35.74-0.02-6.87-12.88-0.11v52.25h14.18c0-3.28-0.18-22.34 0.05-28.7 0.87-10.09 5.23-15.67 15.18-10.11l4.4-11.96c-3.16-1.98-8.16-3.51-12.57-2.15-5.61 1.76-7.45 6.16-8.34 7.65"
						></path>
						<path
							class="st0"
							d="m73.1 53.27v2.84c0 14.75 9.65 25.82 24.35 25.82h1.63c13.08 0 21.05-7.56 23.3-18.88l-13.62-2.39c-0.79 5.9-3.78 9.96-10.09 9.96-8.22 0-11.36-7.15-11.36-15.32v-2.84c0-8.03 3.26-14.21 11.36-14.21 5.44 0 8.61 3.26 9.34 8.22l13.62-2.43c-0.89-5.02-4.88-10.17-7.58-12.24-4.27-3.26-9.57-4.46-15.99-4.46-15.16 0-24.96 10.62-24.96 25.93"
						></path>
						<path
							class="st0"
							d="M254.93,39.5c11.66,3.99,11.86,26.68,0,30.73v11.71c30.78-3.81,30.26-50.76,0-54.16V39.5z"
						></path>
						<path
							class="st2"
							d="m285.74 27.74h12.86v7.65c1.67-2.62 3.93-4.74 6.77-6.38 2.85-1.64 6-2.45 9.47-2.45 6.05 0 11.19 2.37 15.41 7.11s6.33 11.35 6.33 19.82c0 8.7-2.13 15.46-6.38 20.29s-9.41 7.24-15.46 7.24c-2.88 0-5.49-0.57-7.83-1.72-2.34-1.14-4.8-3.11-7.38-5.89v26.25h-13.79v-71.92zm13.64 25.17c0 5.86 1.16 10.18 3.48 12.98s5.15 4.2 8.49 4.2c3.21 0 5.87-1.28 8-3.85s3.19-6.78 3.19-12.63c0-5.46-1.1-9.52-3.29-12.17s-4.91-3.97-8.15-3.97c-3.37 0-6.17 1.3-8.39 3.9-2.22 2.58-3.33 6.44-3.33 11.54z"
						></path>
						<path
							class="st2"
							d="m360.72 79.85h-13.79v-52.11h12.81v7.41c2.19-3.5 4.16-5.81 5.91-6.92s3.74-1.67 5.96-1.67c3.14 0 6.17 0.87 9.08 2.6l-4.27 12.02c-2.32-1.5-4.48-2.26-6.48-2.26-1.93 0-3.57 0.53-4.91 1.59s-2.4 2.99-3.16 5.77c-0.77 2.78-1.15 8.6-1.15 17.47v16.1z"
						></path>
						<path
							class="st2"
							d="m416.8 63.26 13.74 2.31c-1.77 5.04-4.56 8.87-8.37 11.51-3.81 2.63-8.58 3.95-14.3 3.95-9.06 0-15.77-2.96-20.12-8.88-3.43-4.74-5.15-10.73-5.15-17.96 0-8.64 2.26-15.4 6.77-20.29s10.22-7.34 17.12-7.34c7.75 0 13.87 2.56 18.35 7.68s6.62 12.96 6.43 23.53h-34.54c0.1 4.09 1.21 7.27 3.34 9.54s4.78 3.41 7.95 3.41c2.16 0 3.97-0.59 5.45-1.77 1.47-1.17 2.58-3.07 3.33-5.69zm0.79-13.93c-0.1-3.99-1.13-7.02-3.09-9.1s-4.35-3.12-7.16-3.12c-3.01 0-5.5 1.1-7.46 3.29s-2.93 5.17-2.9 8.93h20.61z"
						></path>
						<path
							class="st2"
							d="m437.66 64.98 13.84-2.11c0.59 2.68 1.78 4.72 3.58 6.11s4.32 2.09 7.56 2.09c3.56 0 6.25-0.65 8.05-1.96 1.21-0.92 1.82-2.14 1.82-3.68 0-1.05-0.33-1.91-0.98-2.6-0.69-0.65-2.23-1.26-4.61-1.82-11.12-2.45-18.17-4.69-21.15-6.72-4.12-2.81-6.18-6.72-6.18-11.73 0-4.51 1.78-8.31 5.35-11.38 3.56-3.07 9.09-4.61 16.59-4.61 7.13 0 12.43 1.16 15.9 3.48s5.86 5.76 7.16 10.3l-13 2.4c-0.56-2.03-1.61-3.58-3.17-4.66s-3.77-1.62-6.65-1.62c-3.63 0-6.23 0.51-7.8 1.52-1.05 0.72-1.57 1.65-1.57 2.8 0 0.98 0.46 1.82 1.37 2.5 1.24 0.92 5.54 2.21 12.88 3.88s12.47 3.71 15.38 6.13c2.88 2.45 4.32 5.87 4.32 10.26 0 4.78-2 8.88-5.99 12.32-3.99 3.43-9.9 5.15-17.71 5.15-7.1 0-12.72-1.44-16.85-4.32-4.16-2.88-6.87-6.79-8.14-11.73z"
						></path>
						<path
							class="st2"
							d="m493.55 64.98 13.84-2.11c0.59 2.68 1.78 4.72 3.58 6.11s4.32 2.09 7.56 2.09c3.56 0 6.25-0.65 8.05-1.96 1.21-0.92 1.82-2.14 1.82-3.68 0-1.05-0.33-1.91-0.98-2.6-0.69-0.65-2.23-1.26-4.61-1.82-11.12-2.45-18.17-4.69-21.15-6.72-4.12-2.81-6.18-6.72-6.18-11.73 0-4.51 1.78-8.31 5.35-11.38 3.56-3.07 9.09-4.61 16.59-4.61 7.13 0 12.43 1.16 15.9 3.48s5.86 5.76 7.16 10.3l-13 2.4c-0.56-2.03-1.61-3.58-3.17-4.66s-3.77-1.62-6.65-1.62c-3.63 0-6.23 0.51-7.8 1.52-1.05 0.72-1.57 1.65-1.57 2.8 0 0.98 0.46 1.82 1.37 2.5 1.24 0.92 5.54 2.21 12.88 3.88s12.47 3.71 15.38 6.13c2.88 2.45 4.32 5.87 4.32 10.26 0 4.78-2 8.88-5.99 12.32-3.99 3.43-9.9 5.15-17.71 5.15-7.1 0-12.72-1.44-16.86-4.32-4.15-2.88-6.86-6.79-8.13-11.73z"
						></path>
					</svg>

					<LanguageSelect
						lang={props.lang}
						changedLang={handleLangChange}
						themeShowLabel={false}
						themeColor="#333"
						themeBackgroundColor="transparent"
					/>

					{props.auth && (
						<div>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
								className={classes.userButton}
							>
								<Avatar
									alt="User"
									src={`https://secure.gravatar.com/avatar/${md5(
										props.attributes &&
											props.attributes.email
											? props.attributes.email
											: "null@example.com"
									)}&default=https://cdn1.example.com/Example/meta/apple-icon-144x144.png&rating=pg`}
								/>
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem
									onClick={() => handleRouteTo("/settings")}
								>
									{I18n.get("HEADER_MENU_ITEM_PROFILE")}
								</MenuItem>
								<MenuItem
									onClick={() => handleRouteTo("/dashboard")}
								>
									{I18n.get("HEADER_MENU_ITEM_DASHBOARD")}
								</MenuItem>
								<Divider />
								<MenuItem
									onClick={() => handleRouteTo("/logout")}
								>
									{I18n.get("HEADER_MENU_ITEM_LOGOUT")}
								</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>

			<div className={classes.offset} />
		</div>
	);
};

export default connect(mapStateToProps, { setLang, setAuth })(Header);
