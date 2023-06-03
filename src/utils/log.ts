import { default as chalk } from "chalk";
import {marked} from "marked";
import TerminalRenderer from "marked-terminal";

marked.setOptions({
    // Define custom renderer
    renderer: new TerminalRenderer()
});

function success(message: string) {
    console.log(chalk.green(message));
}

function error(message: string) {
    console.log(chalk.red(message));
}

function warn(message: string) {
    console.log(chalk.yellow(message));
}

function logJson(str: any) {
    function colorize(key: string, value: any) {
        let convertedValue: any = value;

        // Convert string values that are actually boolean or numbers
        if (value === 'true') {
            convertedValue = true;
        } else if (value === 'false') {
            convertedValue = false;
        } else if (!isNaN(value) && value !== "") {
            convertedValue = Number(value);
        }

        const type = typeof convertedValue;

        switch (type) {
            case 'number':
                return chalk.blue(convertedValue);
            case 'string':
                return chalk.green(convertedValue);
            case 'boolean':
                return chalk.red(convertedValue);
            default:
                return chalk.white(convertedValue);
        }
    }

    // Replace different types with colorized version
    str = str.replace(/"([^"]+)": ("([^"]*)"|\d+|true|false)/g, (match: string, key: string, value: any) => {
        return `"${chalk.yellow(key)}": ${colorize(key, value.replace(/"/g, ''))}`;
    });

    console.log(str);
}

function logMd(md: any) {
    console.log(marked(md));
}

export {
    success,
    error,
    warn,
    logJson,
    logMd
}