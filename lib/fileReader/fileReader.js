import esprima from 'esprima';
import fs from 'fs';
export default {
    tokenize: file => esprima.tokenize(fs.readFileSync(file))
}
