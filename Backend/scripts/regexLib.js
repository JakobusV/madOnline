// const re = require('');
const gather = /%(.+?)%/g
const check = /%([a-zA-Z]*)(?:%|:(.+?)%)/g

exports.passOffLib = async (content) => {
    let result = 0;
    let entryCount = content.match(gather);
    entryCount.forEach(entry => {
        console.log(entry);
        let finalGroup = entry.match(check);
        if(finalGroup) {
            console.log(`type: ${finalGroup[1]}`);
            result++;
        }
    });
    return result;
}