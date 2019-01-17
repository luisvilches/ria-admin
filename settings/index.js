
module.exports = {
    SERVER:{
        port: process.env.PORT || 5000,
        static_url: "static",
        media_url: "media",
        cors:{
            allowed_host:['*']
        },
        security:{
            jwt_secret_key:"ufvghf_crexythj__bhgctwazes_xdcfvb8-65632a6t6_6hg438:76897098y_87g76f9"
        }
    },
    DATABASE:{
        development:{
            name:"currency",
            user:"currency",
            password:"currency2018",
            port:"53814",
            host:"ds153814.mlab.com",
            provider:"mlab"
        },
        producction:{
            name:"currency",
            user:"currency",
            password:"currency2018",
            port:"53814",
            host:"ds153814.mlab.com",
            provider:"mlab"
        }
    }
};