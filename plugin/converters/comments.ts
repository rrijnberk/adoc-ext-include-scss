const commentsRegex = /\/\/@H([0-7]) (.*)\n\/\/@description (.*)\n/g;

function getComments(content) {
    let m, matches = [];
    do {
        m = commentsRegex.exec(content);
        if (m) {
            const [full, level, header, description] = m;
            matches.push({ full, level, header, description });
        }
    } while (m);
    return matches;
}

function generateHeader(level, title) {
    return (new Array(parseInt(level) + 1)).join('=').concat(' ', title);
}

function commentsConverter(content) {
    getComments(content).map(comment => {
        content = content.replace(comment.full, [
            generateHeader(comment.level, comment.header),
            comment.description
        ].join('\n').concat('\n'));
    });

    return content;
}

module.exports = commentsConverter;