/**
 * Program launcher
 */
ly.new(function () {

    // ------------------------------------------------------------------------
    //              i m p o r t s
    // ------------------------------------------------------------------------

    var _ACCOUNT = require("/endpoints/account");
    var _CRUD_ACCOUNT = require("/endpoints/crud_account");

    // ------------------------------------------------------------------------
    //              c o n s t
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //              f i e l d s
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //                      onInit (run once when program is initialized)
    // ------------------------------------------------------------------------

    this._init = function (info) {
        try {
            // console.log("_init: ", info.name + " (" + info.guid + "): " + info.url);

            initDatabase();

            // no return expected
            return {
                'version': $info.version
            };
        } catch (err) {
            return {
                error: err
            };
        }
    };

    this._loop = function (info) {
        // console.log("_expire: ", "PROGRAM: " + info);
    };

    this._expire = function (info) {
        // console.log("_expire: ", "PROGRAM: " + info);
    };

    // ------------------------------------------------------------------------
    //                 exposed functions
    // ------------------------------------------------------------------------

    this.version = function () {
        return $info.version;
    };

    this.name = function () {
        return $info.name;
    };

    this.versions = function () {
        var response = {};
        response[$info.name] = $info.version;
        return response;
    };

    //-- endpoints --//

    this.account = function () {
        return {
            // authentication
            login: _ACCOUNT.login,
            register: _ACCOUNT.register,
            reset_password: _ACCOUNT.resetPassword,
            change_password: _ACCOUNT.changePassword,
            // crud_account account
            get_account: _CRUD_ACCOUNT.getEntity,
            upsert_account: _CRUD_ACCOUNT.upsert,
            get_accounts_by_id: _CRUD_ACCOUNT.getAccountsById,
            get_account_by_email: _CRUD_ACCOUNT.getAccountByEmail,
            get_accounts_by_company_id: _CRUD_ACCOUNT.getAccountsByCompanyId,
            find_accounts: _CRUD_ACCOUNT.find,
            import_account: _CRUD_ACCOUNT.import_account

        }
    };


    // ------------------------------------------------------------------------
    //                 private
    // ------------------------------------------------------------------------

    function initDatabase() {
        $db.name("lyts_app");
    }


});