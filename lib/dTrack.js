import trackDependencies from './trackDependencies';

export default {
    init: args => {
        const optionForIniFile = '-i';
        if (args.length !== 4) {
            throw new Error('InvalidArguments');
        }
        let iniFile = args.pop();
        let option = args.pop();
        if (option !== optionForIniFile) {
            throw new Error ('InvalidArguments');
        }
        return trackDependencies.from(iniFile);
    }
}
