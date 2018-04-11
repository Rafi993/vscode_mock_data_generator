// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const generateMockData = require('./generateMockData').generateMockData

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "mock-data-generator" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.generateMock', function () {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    let editor = vscode.window.activeTextEditor;
    if (editor === undefined) {
      vscode.window.showInformationMessage('Please open a Json file with schema to generate mock data')
    } else {

      // getting number of mock data records to be generated
      vscode.window.showInputBox({
          placeHolder: ' Enter the number of mock records to be generated'
        })
        .then(mockCount => {
          if (mockCount !== undefined && parseInt(mockCount) > 0) {
            let document = editor.document;
            //   vscode.window.showInformationMessage(document.getText());

            try {
              const schema = JSON.parse(document.getText())

              // Getting the first line, last line to replace text
              const lastLine = document.lineAt(document.lineCount - 2);
              const start = new vscode.Position(0, 0);
              const end = new vscode.Position(document.lineCount - 1, lastLine.text.length);

              editor.edit(builder => {

                const mockData = JSON.stringify(generateMockData(schema, parseInt(mockCount)), null, 2)

                // Replacing text of the current document with new mock data
                builder.replace(new vscode.Range(start, end), mockData);
              })

            } catch (e) {
              vscode.window.showInformationMessage(' Please make sure it is a Json to generate mock data')
            }

          } else {
            vscode.window.showInformationMessage('Please enter valid count greater than 0')
          }
        })

    }

  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;