import fs from "fs-extra";
import path from "path";
import { logJson } from "./utils/log";

const ConfigPath = path.resolve(__dirname, './config.json');

async function set(params: any) {
    const configJson = fs.readFileSync(ConfigPath, 'utf-8');
    const config = JSON.parse(configJson);
    const [key, value] = params;
    config[key] = value;
    fs.writeFileSync(ConfigPath, JSON.stringify(config, null, 2));
}

async function ls() {
    const configJson = fs.readFileSync(ConfigPath, 'utf-8');

    logJson(configJson);
    // console.log(JSON.stringify(JSON.parse(configJson), null, 2));
}

export {
    set,
    ls
}