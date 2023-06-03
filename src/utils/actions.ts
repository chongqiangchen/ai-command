import { readFile } from "./file";

type TAction = {
    type: string;
    path: string;
}

const runActions = async (actions: TAction[]) => {
    return Promise.allSettled(actions.map(async (action) => {
        const fileContent = await readFile(action.path);
        return {
            ...action,
            content: JSON.stringify(fileContent)
        }
    }));
}

export default runActions;