var file = function(fs) {

    this.content  ="test",

    this.read = function(path) {
        return fs.readFileSync(path, 'utf8');
    }

    this.write =  function(path, content) {
        fs.writeFileSync (path, content);
    }
}

module.exports = file;