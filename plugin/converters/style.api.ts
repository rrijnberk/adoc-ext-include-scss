const variableRegex = /\/\/@description (.*)\n\$(.*):(.*);/g,
    tableRegex = /((\|.*\n){1,})(\n|$)/g,
    tableConfig = '[options="header"]',
    tableMarker = '|==========================',
    tableHeaders = '| Name | Value | Description';

function getStyleComments(content) {
    let m, matches = [];
    do {
        m = variableRegex.exec(content);
        if (m) {
            const [full, description, variable, value] = m;
            matches.push({full, description, variable, value});
        }
    } while (m);
    return matches;
}

function renderTable(doc, match) {
    return [
        tableConfig,
        tableMarker,
        tableHeaders,
        match,
        tableMarker
    ].join('\n')
        .replace('\n\n\|', '\n\|')
        .concat('\n\n');
}

function styleApiConverter(content) {
    getStyleComments(content)
        .map(styleComment => {
            content = content.replace(
                styleComment.full,
                ['', styleComment.variable, styleComment.value, styleComment.description, '']
                    .join('|')
            )
        });
    content += '\n';
    content = content.replace(/(\|)\n/g, '');
    content += '\n';
    content = content.replace(tableRegex, renderTable);

    return content;
}

module.exports = styleApiConverter;