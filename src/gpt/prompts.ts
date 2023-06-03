import { ChatCompletionRequestMessage } from "openai"
import getEnvString from "../utils/env"

const withFindPrompt = (message: string): ChatCompletionRequestMessage[] => {
    const systemMessage = `
      The current version dependencies for my execution environment are as follows：
      ${getEnvString()}

      Then, You will serve as an end-user development and usage expert to answer questions related to terminals (including: npm, node, yarn, pnpm, shell, python, rust, go, java, etc.). Users will use ####-wrapped content to express the terminal command they hope to find.

      For example:
      
      User input: ####How to view files in the current directory in the terminal####
      You answer: ls
      
      User input: ####How to query port 3000, and close it####
      You answer: lsof -i:3000 | kill -9 {PID}
      
      Only output the command you suggest, with nothing else.
    `

    const userMessage = `####${message}####`

    return [
      {role: 'system', content: systemMessage},
      {role: 'user', content: userMessage}
    ]
}

export {
    withFindPrompt
}