import * as fs from "fs-extra";
import * as glob from "glob";


const readFile = (path: string) => {
    return new Promise((resolve, reject) => {
        try {
            const files = glob.sync(path, {});

            const fileContent = files.filter(file => {
                // Filter out directories
                return !fs.statSync(file).isDirectory();
            }).map((file) => {
                // Read file content
                return fs.readFileSync(file, 'utf-8');
            });

            const truncatedFileContent = fileContent.map(content => {
                const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
                let charCount = 0;
                let truncatedContent = '';

                for (let sentence of sentences) {
                    if (charCount + sentence.length <= 3000) {
                        truncatedContent += sentence;
                        charCount += sentence.length;
                    } else {
                        break;
                    }
                }

                return truncatedContent;
            });

            resolve(truncatedFileContent);
        } catch (err) {
            reject(err);
        }
    });
};

export {
    readFile
}