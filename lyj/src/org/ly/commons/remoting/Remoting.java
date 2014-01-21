package org.ly.commons.remoting;

import org.ly.Smartly;

/**
 *
 */
public class Remoting {


    public static String getAppToken() {
        return Smartly.getConfiguration().getString("remoting.app_securetoken");
    }

}
