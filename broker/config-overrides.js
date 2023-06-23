/*
 * Copyright Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT
 *
 * Licensed under the MIT License. See the LICENSE accompanying this file
 * for the specific language governing permissions and limitations under
 * the License.
 */

var amplifyMeta = {};
var amplifyTeams = {};
const fs = require("fs");
const path = require("path");
if (
	!fs.existsSync("./amplify/backend/amplify-meta.json") ||
	!fs.existsSync("./amplify/team-provider-info.json") ||
	!fs.existsSync("./src/aws-exports.js")
) {
	console.error("Amplify is not configured !!");
	console.log(" please run:");
	console.log(" > amplify init");
	console.log(" Select an existing environment (choose dev to start)");
	process.exit();
} else {
	amplifyMeta = require("./amplify/backend/amplify-meta.json");
	amplifyTeams = require("./amplify/team-provider-info.json");
}
const REGEX = /.*-(\w+)/;
const AMPLIFY_ENV =
	amplifyMeta.storage.amplifyIdentityBrokerCodesTable.output.Name.match(
		REGEX
	)[1];

console.log("Injecting config");
console.log("AMPLIFY_ENV is " + AMPLIFY_ENV);

var appHostingDomain = "https://idp-dev.example.com/";

if (appHostingDomain) {
	const redirectSignIn = appHostingDomain;
	const redirectSignOut = appHostingDomain + "/logout";

	var rawdata = fs.readFileSync("./src/aws-exports.js", "utf-8");

	// Inject broker domain in aws-exports.js
	var withLogout = rawdata.replace(
		/(redirectSignOut\"+\:[ \t]+\")(.*\")/,
		"$1" + redirectSignOut + '"'
	);
	var withBoth = withLogout.replace(
		/(redirectSignIn\"+\:[ \t]+\")(.*\")/,
		"$1" + redirectSignIn + '"'
	);

	fs.writeFileSync("./src/aws-exports.js", withBoth, "utf-8");
}

module.exports = function override(config, env) {
	console.log("Build env is " + env);
	let localConfig = {};
	switch (AMPLIFY_ENV) {
		case "dev":
			localConfig = {
				providers: ["Facebook", "Google", "Apple"],
				authenticationFlowType: "USER_PASSWORD_AUTH",
			};
			break;
		case "prod":
			localConfig = {
				providers: ["Facebook", "Google", "Apple"],
			};
			break;
		case "migration":
			localConfig = {
				providers: [],
				authenticationFlowType: "USER_PASSWORD_AUTH",
			};
			break;
		default:
			localConfig = {
				providers: [],
			};
	}

	if (!config.externals) {
		config.externals = {};
	}
	config.externals.Config = JSON.stringify(localConfig);

	return config;
};
