module.exports = function() {
    var env = "localEnv";
    var devEnv = {
        PORT: 8091,
        DB_URL: 'mongodb://localhost/pricefix',
        secretKey: '<@pricefix@>',
        SENDGRID_API_KEY :'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'

    }
    var prodEnv = {
        PORT: 8091,
        DB_URL: 'mongodb://localhost/pricefix',
        secretKey: '<@pricefix@>',
        SENDGRID_API_KEY :'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'

    }
    var localEnv = {
        PORT: 8091,
        DB_URL: 'mongodb://localhost/pricefix',
        secretKey: '<@pricefix@>',
        SENDGRID_API_KEY :'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'

    }
    return env == "devEnv" ? devEnv : env == "prodEnv" ? prodEnv : localEnv;
}