package org.ly.packages.http.impl.util.vtool;


import org.ly.Smartly;
import org.ly.commons.util.JsonWrapper;
import org.ly.commons.util.PathUtils;
import org.ly.packages.http.SmartlyHttp;

/**
 * Module: SmartlyHttp
 *
 */
public class AppTool extends org.ly.packages.velocity.impl.vtools.AppTool {

    public final String getAppToken() {
        try {
            return getSmartlyAppToken();
        } catch (Throwable ignored) {
        }
        return "";
    }

    public String getHttpRoot() {
        try {
            return getSmartlyAppUrl();
        } catch (Throwable ignored) {
        }
        return "";
    }

    public String[] getLangArray() {
        return Smartly.getLanguages();
    }

    public JsonWrapper getLangMap() {
        return Smartly.getLanguagesHelper();
    }

    public String getHttpPath(final String path) {
        try {
            final String root = getHttpRoot();
            return PathUtils.join(root, path);
        } catch (Throwable ignored) {
        }
        return "";
    }

    // --------------------------------------------------------------------
    //               S T A T I C
    // --------------------------------------------------------------------

    private static String __APP_TOKEN = null;
    private static String __APP_URL = null;

    private static String getSmartlyAppToken() {
        if (null == __APP_TOKEN) {
            __APP_TOKEN = Smartly.getConfiguration().getString("remoting.app_securetoken");
        }
        return __APP_TOKEN;
    }

    private static String getSmartlyAppUrl() {
        if (null == __APP_URL) {
            __APP_URL = SmartlyHttp.getHTTPUrl("");
        }
        return __APP_URL;
    }

}
