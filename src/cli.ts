#!/usr/bin/env node

import { cac } from 'cac'
import { version } from '../package.json'

export async function main() {
  const cli = cac('ais')

  cli
    .command('ask <message>', 'Ask ai about command question')
    .option('--model <model_type>', 'Model: gpt3.5 or gpt4.0')
    .action(async (inputs: string, flags) => {
      const { find } = await import('.')
      find(inputs, flags);
    })

  cli
    .command("set <key> <value>", "Set config")
    .action(async (key: string, value: string) => {
      const { set } = await import('./config')
      set([key, value])
    })

  cli
    .command("ls", "List config")
    .action(async () => {
      const { ls } = await import('./config')
      ls();
    })

  cli.help()

  cli.version(version)

  cli.parse(process.argv, { run: false })
  await cli.runMatchedCommand()
}

main();