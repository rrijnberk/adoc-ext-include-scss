const fs = require('fs-extra');
const path = require('path');

const Scss = require('./models/Scss.ts');
const commentsConverter = require('./converters/comments.ts');
const styleApiConverter = require('./converters/style.api.ts');


function isScssHandler(target) {
    return target.endsWith('.scss');
}

function scssCommentProcessor(doc, reader, target, attrs) {
    const scss = new Scss(fs.readFileSync(path.resolve(reader.dir, target)).toString());

    scss.applyConverter(commentsConverter);
    scss.applyConverter(styleApiConverter);

    reader.pushInclude(scss.toString(), target, target, 1, attrs);
    return reader;
}

/**
 * Extension for the handling of markdown files. Converts markdown to AsciiDoc.
 */
function scssInclusionExtension() {
    this.handles(isScssHandler);
    this.process(scssCommentProcessor);
}

module.exports = scssInclusionExtension;