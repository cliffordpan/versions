const core = require("@actions/core");
const github = require("@actions/github");

const VERSION_REGEX = /(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?<snapshot>-snapshot)?/i;
try {
    const current = core.getInput("current");
    const increment = core.getInput("increment");
    const snapshot = core.getInput("snapshot");
    let result;
    if (!!current) {
        console.log("Current Version: " + current);
    }
    if (current.match(VERSION_REGEX)) {
        result = current;
    } else {
        result = "0.0.0";
    }

    switch (increment) {
        case "major":
            result = result.replace(VERSION_REGEX, (match, major, minor, patch, _) => {
                return `${parseInt(major) + 1}.0.0${snapshot ? "-snapshot" : ""}`;
            });
            break;
        case "minor":
            result = result.replace(VERSION_REGEX, (match, major, minor, patch, _) => {
                return `${major}.${parseInt(minor) + 1}.0${snapshot ? "-snapshot" : ""}`;
            });
            break;
        case "patch":
            result = result.replace(VERSION_REGEX, (match, major, minor, patch, _) => {
                return `${major}.${minor}.${parseInt(patch) + 1}${snapshot ? "-snapshot" : ""}`;
            });
            break;
        default:
            throw new Error("Invalid increment type");
    }
    core.setOutput("version", result);
} catch (error) {
    core.setFailed(error.message);
    return;
}