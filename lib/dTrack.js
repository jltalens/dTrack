import trackDependencies from './trackDependencies';


export default {
    init: args => {
        if (args.length !== 4) {
            throw new Error('InvalidArguments');
        }
        return trackDependencies(args.pop());
    }
}
