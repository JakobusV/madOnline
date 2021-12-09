// const re = require('');
const gather = /%(.+?)%/g
const check = /%([a-zA-Z]*)(?:%|:(.+?)%)/g

exports.passOffLib = async (content) => {
    let allBlanks = {};
    let blankCount = 0;
    let entryCount = content.match(gather);
    entryCount.forEach(entry => {
        blankCount++;
        let blank = {};
        let myRegexp = new RegExp("%([a-zA-Z]*)(?:%|:(.+?)%)", "g");
        let match = myRegexp.exec(entry);
        blank["type"] = match[1];
        if(match[2]) {
            blank["hint"] = match[2];
        }
        allBlanks[blankCount] = blank;
    });
    console.log(allBlanks);
    return allBlanks;
}

exports.fillOutLib = async (content, reqBody) => {
    let finalText = content;
    let blankCount = 0;
    let entryCount = content.match(gather);
    entryCount.forEach(entry => {
        blankCount++;
        finalText = finalText.replace(entry, reqBody["i"+blankCount]);
    });
    let allBlanks = {
        madlib: finalText,
        replaceCount: blankCount,
    };
    console.log(allBlanks);
    return allBlanks;
}