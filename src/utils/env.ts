import childProcess from "child_process";
import os from "os";

function getCommandOutput(command: string) {
    try {
        const output = childProcess.execSync(command, { stdio: 'pipe' });
        return output.toString().trim();
    } catch (e) {
        return `${command.split(' ')[0]} is not installed globally or not found in path.`;
    }
}

function getEnvironmentContext() {
    const nodeVersion = process.version;
    const npmVersion = getCommandOutput('npm --version');
    const pythonVersion = getCommandOutput('python --version');
    const pipVersion = getCommandOutput('pip --version');
    const javaVersion = getCommandOutput('java -version');
    const rustVersion = getCommandOutput('rustc --version');
    const goVersion = getCommandOutput('go version');
    const shellVersion = getCommandOutput(`${process.env.SHELL} --version`);
    const osType = os.type();
    const osVersion = os.release();
    const cwd = process.cwd();
    const env = process.env;
    const argv = process.argv;
    const pid = process.pid;
    const uid = process.getuid ? process.getuid() : null;
    const gid = process.getgid ? process.getgid() : null;

    return {
        nodeVersion,
        npmVersion,
        pythonVersion,
        pipVersion,
        javaVersion,
        rustVersion,
        goVersion,
        shellVersion,
        osType,
        osVersion,
        cwd,
        env,
        argv,
        pid,
        uid,
        gid
    };
}

function getEnvString() {
    const context = getEnvironmentContext();


    return `
Environment:
- Node.js: ${context.nodeVersion}
- npm: ${context.npmVersion}
- Python: ${context.pythonVersion}
- pip: ${context.pipVersion}
- Java: ${context.javaVersion}
- Rust: ${context.rustVersion}
- Go: ${context.goVersion}
- Shell: ${context.shellVersion}
- OS: ${context.osType} ${context.osVersion}
- CWD: ${context.cwd}
- PID: ${context.pid}
- UID: ${context.uid}
- GID: ${context.gid}
- argv: ${context.argv}
- env: ${context.env}
`;
}

export default getEnvString;
