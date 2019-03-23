module.exports = (function () {

    // ------------------------------------------------------------------------
    //              i m p o r t s
    // ------------------------------------------------------------------------

    // ------------------------------------------------------------------------
    //              c o n s t
    // ------------------------------------------------------------------------

    var FILE = "endpoints/index.js"; // used only for logs

    var _ACCOUNT = require("/endpoints/account");
    var _CRUD_ACCOUNT = require("/endpoints/crud_account");

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
    instance.account = function () {

        return {
            // authentication
            login: _ACCOUNT.login,
            register: _ACCOUNT.register,
            reset_password: _ACCOUNT.resetPassword,
            change_password: _ACCOUNT.changePassword,
            // crud_account account
            get_account: _CRUD_ACCOUNT.getEntity,
            upsert_account: _CRUD_ACCOUNT.upsert,
            get_accounts_by_id: _CRUD_ACCOUNTt.getAccountsById,
            get_account_by_email: _CRUD_ACCOUNT.getAccountByEmail,
            get_accounts_by_company_id: _CRUD_ACCOUNT.getAccountsByCompanyId,
            find_accounts: _CRUD_ACCOUNT.find,
            import_account: _CRUD_ACCOUNT.import_account

        }
    };


    // ------------------------------------------------------------------------
    //              p r i v a t e
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //              e x p o r t s
    // ------------------------------------------------------------------------

    return instance;


})();