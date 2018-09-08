module.exports = function() {
    var env = "devEnv";
    var devEnv = {
        PORT: 8091,
        DB_URL: 'mongodb://localhost/preFix',
        secretKey: '<@preFix@>'

    }
    var prodEnv = {
        PORT: 8091,
        DB_URL: 'mongodb://localhost/preFix',
        secretKey: '<@preFix@>'

    }
    var localEnv = {
        PORT: 8091,
        DB_URL: 'mongodb://localhost/preFix',
        secretKey: '<@preFix@>'

    }
    return env == "devEnv" ? devEnv : env == "prodEnv" ? prodEnv : localEnv;
}