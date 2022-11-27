const f = require('fs');

function makeBody(subject, message, receiverId) {
    const boundary = "__myapp__";
    const nl = "\n";
    const attachTXT = new Buffer(f.readFileSync(__dirname + "/files/" + '#$%TextFile.txt')).toString("base64");
    const attachCSV = new Buffer(f.readFileSync(__dirname + "/files/" + '1finding.csv')).toString("base64");
    const attachEmptyTxt = new Buffer(f.readFileSync(__dirname + "/files/" + 'EmptyTXT.txt')).toString("base64");
    const attachOnlyFindingsCsv = new Buffer(f.readFileSync(__dirname + "/files/" + 'onlyFindings.csv')).toString("base64");
    const attachCsv = new Buffer(f.readFileSync(__dirname + "/files/" + 'root-file.csv')).toString("base64");
    const attachSpecCharCsv = new Buffer(f.readFileSync(__dirname + "/files/" + 'specChar.csv')).toString("base64");
    const attachText = new Buffer(f.readFileSync(__dirname + "/files/" + 'TextFile.txt')).toString("base64");
    const attachPdf = new Buffer(f.readFileSync(__dirname + "/files/" + 'Title.pdf')).toString("base64");
    const attachPptx = new Buffer(f.readFileSync(__dirname + "/files/" + 'Title.pptx')).toString("base64");
    const attachPptxSpecChar = new Buffer(f.readFileSync(__dirname + "/files/" + 'Title@#$%^.pptx')).toString("base64");
    const str = [

        "MIME-Version: 1.0",
        "Content-Transfer-Encoding: 7bit",
        "to: " + receiverId,
        "subject: " + subject,
        "Content-Type: multipart/alternate; boundary=" + boundary + nl,
        "--" + boundary,
        "Content-Type: text/plain; charset=UTF-8",
        "Content-Transfer-Encoding: 7bit" + nl,
        message + nl,
        "--" + boundary,
        "--" + boundary,
        "Content-Type: Application/csv; name=#$%TextFile.txt",
        'Content-Disposition: attachment; filename=#$%TextFile.txt',
        "Content-Transfer-Encoding: base64" + nl,
        attachTXT,
        "--" + boundary,
        "--" + boundary,
        "Content-Type: Application/pdf; name=Title.pdf",
        'Content-Disposition: attachment; filename=Title.pdf',
        "Content-Transfer-Encoding: base64" + nl,
        attachPdf,
        "--" + boundary,
        "--" + boundary,
        "Content-Type: Application/pdf; name=1finding.csv",
        'Content-Disposition: attachment; filename=1finding.csv',
        "Content-Transfer-Encoding: base64" + nl,
        attachCSV,
        "--" + boundary,
        "--" + boundary,
        "Content-Type: Application/pdf; name=EmptyTXT.txt",
        'Content-Disposition: attachment; filename=EmptyTXT.txt',
        "Content-Transfer-Encoding: base64" + nl,
        attachEmptyTxt,
        "--" + boundary,
        "--" + boundary,
        "Content-Type: Application/pdf; name=onlyFindings.csv",
        'Content-Disposition: attachment; filename=onlyFindings.csv',
        "Content-Transfer-Encoding: base64" + nl,
        attachOnlyFindingsCsv,
        "--" + boundary,
        "--" + boundary,
        "Content-Type: Application/pdf; name=root-file.csv",
        'Content-Disposition: attachment; filename=root-file.csv',
        "Content-Transfer-Encoding: base64" + nl,
        attachCsv,
        "--" + boundary,
        "--" + boundary,
        "Content-Type: Application/pdf; name=specChar.csv",
        'Content-Disposition: attachment; filename=specChar.csv',
        "Content-Transfer-Encoding: base64" + nl,
        attachSpecCharCsv,
        "--" + boundary,
        "--" + boundary,
        "Content-Type: Application/pdf; name=TextFile.txt",
        'Content-Disposition: attachment; filename=TextFile.txt',
        "Content-Transfer-Encoding: base64" + nl,
        attachText,
        "--" + boundary,
        "--" + boundary,
        "Content-Type: Application/pdf; name=Title.pptx",
        'Content-Disposition: attachment; filename=Title.pptx',
        "Content-Transfer-Encoding: base64" + nl,
        attachPptx,
        "--" + boundary,
        "--" + boundary,
        "Content-Type: Application/pdf; name=Title@#$%^.pptx",
        'Content-Disposition: attachment; filename=Title@#$%^.pptx',
        "Content-Transfer-Encoding: base64" + nl,
        attachPptxSpecChar,
        "--" + boundary + "--"

    ].join("\n");

    const encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
    return encodedMail;
}

module.exports = makeBody;