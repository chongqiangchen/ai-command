import clipboardy from 'clipboardy';
import { success } from './log';

function copy(text: string) {
    clipboardy.writeSync(text);
    success("Copied to clipboard!");
}

function copyCommandToClipboard(text: string) {
    const regex = /```([\s\S]*?)```/g;
    const matches = text.match(regex);

    if (matches && matches.length > 0) {
        const command = matches.map(item => item.replace(/```/g, '').trim()).join("&&");
        clipboardy.writeSync(command);
        success(`Copied to clipboard: ${command}`);
    } else {
        clipboardy.writeSync(text);
        success("Copied to clipboard!");
    }
}


export {
    copy,
    copyCommandToClipboard
}