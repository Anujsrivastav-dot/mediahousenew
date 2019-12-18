module.exports = function() {
    var env = "localEnv";
    var devEnv = {
        PORT: 8091,
        DB_URL: 'mongodb://localhost/mediaBazar',
        secretKey: '<@mediaBazar@>',
        

    }
    var prodEnv = {
        PORT: 8091,
        DB_URL: 'mongodb://localhost/mediaBazar',
        secretKey: '<@mediaBazar@>',
        

    }
    var localEnv = {
        PORT: 8091,
        DB_URL: 'mongodb://localhost/mediaBazar',
        secretKey: '<@mediaBazar@>',
        

    }
    return env == "devEnv" ? devEnv : env == "prodEnv" ? prodEnv : localEnv;
}