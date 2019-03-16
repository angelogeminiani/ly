/**
 * crud_account.js
 * ---------------
 * Crud controller
 *
 */
module.exports = (function () {

    // ------------------------------------------------------------------------
    //              i m p o r t s
    // ------------------------------------------------------------------------

    var _CONST = require("/constants");

    // ------------------------------------------------------------------------
    //              c o n s t
    // ------------------------------------------------------------------------

    var FILE = 'endpoints/crud_account.js'; // used only for logs

    var COLLECTION = _CONST.COLL_ACCOUNT;


    // ------------------------------------------------------------------------
    //              f i e l d s
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //              i n s t a n c e
    // ------------------------------------------------------------------------

    var instance = {};


    instance.getEntity = function (key) {
        return $db.collection(COLLECTION).get(key);
    };

    instance.upsert = function (entity) {
        return $db.collection(COLLECTION).upsert(entity);
    };

    instance.remove = function (key) {
        return $db.collection(COLLECTION).remove(key);
    };

    instance.query = function (query, filter_params) {
        return $db.collection(COLLECTION).find(query, filter_params);
    };

    /**
     * Execute custom filter with parameters
     * @param filter String: "FILTER t1.company_id==@company_id"
     * @param filter_params Object: {"compnay_id":"admin"}
     * @param sort String: "SORT t1.company_id asc"
     * @param skip  0
     * @param limit 5
     */
    instance.find = function (filter, filter_params, sort, skip, limit) {
        skip = skip || 0;
        limit = limit || 0;
        filter_params = filter_params || {};
        sort = sort || "";
        var query;
        if (filter.startsWith("FOR")) {
            query = filter;
        } else {
            query = "FOR t1 IN " + COLLECTION + "\n";
            if (!!filter) {
                // FILTER t1.company_id==@company_id
                if (!filter.startsWith("FILTER")) {
                    filter = "FILTER " + filter;
                }
                query += filter + "\n";
            }
            if (!!limit) {
                query += "LIMIT " + skip + ", " + limit + "\n";
            }
            if (!!sort) {
                // SORT t1.company_id asc
                if (!sort.startsWith("SORT")) {
                    sort = "SORT " + sort;
                }
                query += sort + "\n";
            }
            query += "RETURN t1";
        }
        return $db.collection(COLLECTION).find(query, filter_params);
    };

    instance.execute = function (query, query_params) {
        query_params = query_params || {};
        var array_data = $db.collection(COLLECTION).execute(query, query_params);
        return !!array_data && array_data.length > 0 ? array_data : [];
    };

    instance.getAccountsById = function (account_ids) {
        if (!!account_ids) {
            // query args
            var query_args = {
                keys: account_ids
            };

            // query
            var query = 'FOR t1 IN ' + COLLECTION + '\n' +
                'FILTER t1._key IN @keys' + '\n' +
                'SORT t1.company.name ASC' + '\n' +
                'RETURN t1';

            return $db.collection(COLLECTION).find(query, query_args);
        }
        return [];
    };

    instance.getAccountByEmail = function (email) {
        if (!!email) {
            // query args
            var query_args = {
                email: email
            };

            // query
            var query = 'FOR t1 IN ' + COLLECTION + '\n' +
                'FILTER t1.auth.username == @email' + '\n' +
                'RETURN t1';

            return $db.collection(COLLECTION).find(query, query_args);
        }
        return [];
    };

    instance.getByUsername = function (username) {
        var args = {
            "auth.username": username
        };
        return $db.collection(COLLECTION).findOneEqual(args);
    };

    instance.getByUsernameAndPassword = function (username, password) {
        var md5_psw = $string.md5(password).toLowerCase();
        var args = {
            "auth.username": username,
            "auth.password": md5_psw
        };
        return $db.collection(COLLECTION).findOneEqual(args);
    };


    // ------------------------------------------------------------------------
    //              p r i v a t e
    // ------------------------------------------------------------------------


    // ------------------------------------------------------------------------
    //              e x p o r t s
    // ------------------------------------------------------------------------

    return instance;


})();