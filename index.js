/**
 * Github Action for incrementing version numbers
 * 
 * @param {string} current - The current version
 * @param {string} increment - The type of increment (major, minor, patch)
 * @param {string} prefix - The prefix for the new version number
 * @param {string} suffix - The suffix for the new version number
 * @returns {string} The new version number
 * 
 */

const core = require("@actions/core");
const VERSION_REGEX = /(?<major>\d+)(\.(?<minor>\d+))?(\.(?<patch>\d+))?/i;

const getOldVersion = async () => {
    const fileName = core.getInput("file");
    if (fileName == null || fileName == "") {
        return "0.0.0";
    }
    const files = await io.findInPath(fileName);
    if (files == null && files.length == 0) {
        return "0.0.0";
    }
    try {
        const data = await fs.readFile(fileName, "utf-8");
        const version = data.split('\n')[0];
        return version;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const calcVersion = async (oldVersion) => {
    const match = oldVersion.match(VERSION_REGEX);
    const major = match.groups.major;
    const minor = match.groups.minor;
    const patch = match.groups.patch;
    const increment = core.getInput("increment");
    const prefix = core.getInput("prefix");
    const surfix = core.getInput("suffix");
    if (!!patch) {
        switch (increment) {
            case "major":
                return `${prefix || ""}${parseInt(major) + 1}.0.0${surfix || ""}`;
            case "minor":
                return `${prefix || ""}${major}.${parseInt(minor) + 1}.0${surfix || ""}`;
            case "patch":
                return `${prefix || ""}${major}.${minor}.${parseInt(patch) + 1}${surfix || ""}`;
            default:
                throw new Error("Invalid increment type");
        }
    } else if (!!minor) {
        switch (increment) {
            case "major":
                return `${prefix || ""}${parseInt(major) + 1}.0${surfix || ""}`;
            case "minor":
            case "patch":
                return `${prefix || ""}${major}.${parseInt(minor) + 1}${surfix || ""}`;
            default:
                throw new Error("Invalid increment type");
        }
    } else {
        switch (increment) {
            case "major":
            case "minor":
            case "patch":
                return `${prefix || ""}${parseInt(major) + 1}${surfix || ""}`;
            default:
                throw new Error("Invalid increment type");
        }
    }
};

const saveVersion = async (version) => {
    const fileName = core.getInput("file") || "./version.txt";
    try {
        await fs.writeFile(fileName, version);
        return version;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

getOldVersion()
    .then(calcVersion)
    .then(saveVersion)
    .then((result) => {
        console.log("New version: " + result);
        core.setOutput("version", result);
    }).catch((err) => {
        core.setFailed(err.message);
    });
