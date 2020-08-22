
function computeOptions(defaultOptions, userOptions = {}) {
  return Object.assign({}, defaultOptions, userOptions);
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}


export default function ({ types: t }) {
  return {
    visitor: {
      BlockStatement(path) {

        if (t.isFunctionDeclaration(path.parent) || t.isFunctionExpression(path.parent)) {

          let description = '';

          if (this.opts && !isObject(this.opts)) {
            const options = computeOptions(this.opts);

            const filename = this.filename || this.file.opts.filename || 'unknown';

            if (options.addFilename) {
              description = `${description}filename: ${filename}, `;
            }

            if (options.addCodeLine) {
              const line = path.node.loc.start.line;
              description = `${description}line: ${line}, `;
            }

            if (options.addCodeColumn) {
              const column = path.node.loc.start.column;
              description = `${description}column: ${column}, `;
            }
          } else {
            try {
              description = "line: " + path.parent.loc.start.line + " column: " + path.parent.loc.start.column + " name: " + path.parent.id.name;
            } catch (error) {
              description = "line: " + path.parent.loc.start.line + " column: " + path.parent.loc.start.column
            }
          }


          path.node.body.unshift(t.callExpression(
            t.memberExpression(t.identifier('console'), t.identifier('log')),
            [t.stringLiteral(`${description}`)]
          ))
        }
      }
    }
  };
}
