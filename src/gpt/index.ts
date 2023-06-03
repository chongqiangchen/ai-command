import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from 'openai'
import path from 'path';
import fs from "fs";

const ConfigPath = path.resolve(__dirname, './config.json');

class ChatGPT {
    openai: OpenAIApi;
    config: any;
    messages: ChatCompletionRequestMessage[];

    constructor() {
        this.messages = [];
        
        const configJson = fs.readFileSync(ConfigPath, 'utf-8');
        this.config = JSON.parse(configJson);
        const configuration = new Configuration({
            apiKey: this.config.openai_key,
        });
        this.openai = new OpenAIApi(configuration);
    }

    async sendMessage(messages: ChatCompletionRequestMessage[], model?: string) {
        // 添加用户消息
        this.messages = this.messages.concat(messages);

        try {
            const response = await this.openai.createChatCompletion({
                model: model || this.config.openai_chat_options.model,
                messages: this.messages,
                stream: false,
                temperature: Number(this.config.openai_chat_options.temperature),
            });

            if (response.data && response.data.choices && response.data.choices.length > 0) {
                const reply = response.data.choices[0]?.message?.content || '';

                this.messages.push({ role: 'assistant', content: reply });
                return reply;
            } else {
                throw new Error('No response from ChatGPT API');
            }
            return ''
        } catch (error) {
            console.error('Error calling ChatGPT API:', error);
            throw error;
        }
    }

    async sendOnceMessage(messages: ChatCompletionRequestMessage[], model?: string) {
        try {
            const response = await this.openai.createChatCompletion({
                model: model || this.config.openai_chat_options.model,
                messages,
                stream: false,
                temperature: Number(this.config.openai_chat_options.temperature),
            });


            if (response.data && response.data.choices && response.data.choices.length > 0) {
                const reply = response.data.choices[0]?.message?.content || '';
                return reply;
            } else {
                throw new Error('No response from ChatGPT API');
            }
            return ''
        } catch (error) {
            console.error('Error calling ChatGPT API:', error);
            throw error;
        }
    }

    resetContext() {
        this.messages = [];
    }
}

export default ChatGPT;
