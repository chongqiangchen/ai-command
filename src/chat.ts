import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { withCommonPrompt } from './gpt/prompts';
import { loadMd } from './utils/log';

const chat = async (flags: { model: string }) => {
    const MODELS = {
        'gpt3.5': 'gpt-3.5-turbo',
        'gpt4.0': 'gpt-4'
    }
    const model = MODELS[flags.model as keyof typeof MODELS] || flags.model;

    const ChatGPT = (await import('./gpt')).default
    const chatGPT = new ChatGPT();

    const getAIResponse = async (input: string) => {
        const loader = ora(chalk.gray('AI thinking...')).start();
        const reply = await chatGPT.sendMessage(withCommonPrompt(input), model);

        loader.stop();
        return reply;
    }

    // get chat input
    console.log(chalk.yellow('欢迎来到AI聊天室！'));
    console.log(chalk.yellow('输入 "exit" 以退出当前聊天环境。'));

    let isChatting = true;

    while (isChatting) {
        const answers = await inquirer.prompt({
            type: 'input',
            name: 'userInput',
            message: chalk.blue('输入:'),
            prefix: "💡"
        });

        const userInput = answers.userInput.trim();

        if (userInput === 'exit') {
            console.log(chalk.yellow('你退出了当前聊天环境。'));
            break;
        }

        const aiResponse = await getAIResponse(userInput);
        console.log(chalk.yellow('🤖 AI:'), loadMd(aiResponse));
    }

    console.log(chalk.yellow('再见！'));
}

export default chat;