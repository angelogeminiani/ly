/**
 * auth.js
 * ---------------
 * Authentication controller
 *
 */

module.exports = (function () {

    // ------------------------------------------------------------------------
    //              i m p o r t s
    // ------------------------------------------------------------------------

    var _CRUD_ACCOUNT = require("/endpoints/crud_account");

    // ------------------------------------------------------------------------
    //              c o n s t
    // ------------------------------------------------------------------------

    var FILE = "endpoints/account.js"; // used only for logs

    // ------------------------------------------------------------------------
    //              f i e l d s
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //              i n s t a n c e
    // ------------------------------------------------------------------------

    var instance = {};

    /**
     *
     */
    instance.login = function (username, password) {
        if (!!username && !!password) {
            // check if user exists
            if (!_CRUD_ACCOUNT.getByUsername(username)) {
                throw new Error(_CONST.ERR_USER_NOT_FOUND);
            }

            var account = _CRUD_ACCOUNT.getByUsernameAndPassword(username, password);
            if (!account) {
                throw new Error(_CONST.ERR_USER_PASSWORD_NOT_CORRECT);
            }

            return account;
        } else {
            throw new Error(_CONST.ERR_MISSING_PARAMS);
        }
    };

    /**
     *
     *
     */
    instance.register = function (username, password, company_name, company_vat, company_address, lang) {
        if (!!username && !!password && !!company_name && !!company_vat && !!company_address && !!lang) {
            // check if user already register
            if (!!_CRUD_ACCOUNT.getByUsername(username)) {
                throw new Error(_CONST.ERR_USER_ALREADY_REGISTERED);
            }

            var account = doRegister(username, password, company_name, company_vat, company_address, lang);
            if (!!account) {
                // sendRegistrationEmails(username, lang, company_name, username, password);
            }
            return account;
        } else {
            throw new Error(_CONST.ERR_MISSING_PARAMS);
        }
    };

    /**
     *
     */
    instance.resetPassword = function (username) {
        if (!!username) {
            var account = _CRUD_ACCOUNT.getByUsername(username);
            if (!account) {
                throw new Error(_CONST.ERR_USER_NOT_FOUND);
            }
            // reset password and save account
            var new_password = doResetPassword(account);
            var account_name = account.company.name || account.person.name || "";

            return _CRUD_ACCOUNT.getAccount(account._key);
        } else {
            throw new Error(_CONST.ERR_MISSING_PARAMS);
        }
    };

    /**
     *
     */
    instance.changePassword = function (account_id, password) {
        if (!!account_id && !!password) {
            var account = _CRUD_ACCOUNT.getAccount(account_id);
            if (!account) {
                throw new Error(_CONST.ERR_USER_NOT_FOUND);
            }
            // change password and save account
            return doChangePassword(account, password);
        } else {
            throw new Error(_CONST.ERR_MISSING_PARAMS);
        }
    };

    /**
     *
     */
    instance.changeUsername = function (username, new_username) {
        if (!!username && !!new_username) {
            var account = _CRUD_ACCOUNT.getByUsername(username);
            if (!account) {
                throw new Error(_CONST.ERR_USER_NOT_FOUND);
            }

            if (!!_CRUD_ACCOUNT.getByUsername(new_username)) {
                throw new Error(_CONST.ERR_USERNAME_ALREADY_USED);
            }
            doChangeUsername(account, new_username);
            return new_username;
        } else {
            throw new Error(_CONST.ERR_MISSING_PARAMS);
        }
    };


    // ------------------------------------------------------------------------
    //              p r i v a t e
    // ------------------------------------------------------------------------

    function doRegister(username, password, company_name, company_vat, company_address, lang) {
        var md5_password = $string.md5(password);
        var key = $rnd.uuid();
        var account = {
            _key: key,
            auth: {
                username: username,
                password: md5_password
            },
            person: {
                name: company_name,
                surname: "",
                email: username,
                address: company_address,
                phone: "",
                mobile: ""
            },
            company: {
                name: company_name,
                vat: company_vat,
                email: username,
                address: company_address,
                phone: ""
            },
            lang: lang,
            roles: [
                {
                    company_id: key,
                    role_id: "",
                    role_name: "",
                    include_apps: [],
                    impersonate: "",
                    parents: ["admin"]
                }
            ],
            stats: {
                last_login_timestamp: "0",
                login_count: 0
            }
        };

        return _CRUD_ACCOUNT.upsert(account);
    }

    function doResetPassword(account) {
        var new_password = $rnd.digits(6);
        doChangePassword(account, new_password);
        return new_password;
    }

    function doChangePassword(account, password) {
        account.auth.password = $string.md5(password);
        return _CRUD_ACCOUNT.upsert(account);
    }

    function doChangeUsername(account, new_username) {
        account.auth.username = new_username;
        return _CRUD_ACCOUNT.upsert(account);
    }

    // ------------------------------------------------------------------------
    //              e x p o r t s
    // ------------------------------------------------------------------------

    return instance;


})();