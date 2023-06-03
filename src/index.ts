import { withFindPrompt } from './gpt/prompts';
import { logMd } from './utils/log';

async function find(inputs: string, flags: { model: string }) {
    const MODELS = {
        'gpt3.5': 'gpt-3.5-turbo',
        'gpt4.0': 'gpt-4'
    }
    const model = MODELS[flags.model as keyof typeof MODELS];

    const ChatGPT = (await import('./gpt')).default
    const chatGPT = new ChatGPT();

    console.log(withFindPrompt(inputs));

    const reply = await chatGPT.sendOnceMessage(withFindPrompt(inputs), model);
    logMd(reply);
}

export {
    find
}