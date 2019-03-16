/**
 * Program launcher
 */
ly.new(function () {

    // ------------------------------------------------------------------------
    //              i m p o r t s
    // ------------------------------------------------------------------------

    var _ACCOUNT = require("/endpoints/account");

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

    this.account = function(){
        return _ACCOUNT.account();
    };


    // ------------------------------------------------------------------------
    //                 private
    // ------------------------------------------------------------------------


});