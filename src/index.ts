import { withFindPrompt } from './gpt/prompts';
import { logMd } from './utils/log';
import fs from "fs";
import path from 'path';

const ConfigPath = path.resolve(__dirname, './config.json');

async function find(inputs: string, flags: { model: string, copy: boolean }) {
    const MODELS = {
        'gpt3.5': 'gpt-3.5-turbo',
        'gpt4.0': 'gpt-4'
    }
    const model = MODELS[flags.model as keyof typeof MODELS] || flags.model;

    const ChatGPT = (await import('./gpt')).default
    const chatGPT = new ChatGPT();

    const reply = await chatGPT.sendOnceMessage(withFindPrompt(inputs), model);
    logMd(reply);

    const configJson = fs.readFileSync(ConfigPath, 'utf-8');
    const config = JSON.parse(configJson);

    if (flags.copy && config.auto_copy === "open") {
        const { copyCommandToClipboard } = await import('./utils/copy');
        copyCommandToClipboard(reply);
    }
}

export {
    find
}