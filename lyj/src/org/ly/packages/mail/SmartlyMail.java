/*
 * LY (ly framework)
 * This program is a generic framework.
 * Support: Please, contact the Author on http://www.smartfeeling.org.
 * Copyright (C) 2014  Gian Angelo Geminiani
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package org.ly.packages.mail;


import org.ly.Smartly;
import org.ly.commons.io.jsonrepository.JsonRepository;
import org.ly.packages.AbstractPackage;
import org.ly.packages.ISmartlySystemPackage;
//import org.smartly.packages.mail.config.Deployer;

/**
 * Simple Mail util module.
 * Use MailUtils class to send email messages using smtp.
 */
public class SmartlyMail extends AbstractPackage
        implements ISmartlySystemPackage {

    public static final String NAME = "smartly_mail";

    public SmartlyMail() {
        super(NAME, 1);
        super.setVersion("0.0.1");
        super.setDescription("Java Mail Module");
        super.setMaintainerName("Gian Angelo Geminiani");
        super.setMaintainerMail("angelo.geminiani@gmail.com");
        super.setMaintainerUrl("http://www.smartfeeling.org");

        //-- lib dependencies --//
        super.addDependency("com.sun.mail:javax.mail:1.4.5", "");
    }

    @Override
    public void load() throws Exception {
        this.init();
    }

    @Override
    public void ready() {

    }
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private void init() {
        //Smartly.register(new Deployer(Smartly.getConfigurationPath()));
    }

    // --------------------------------------------------------------------
    //               S T A T I C
    // --------------------------------------------------------------------

    private static JsonRepository __config;

    private static JsonRepository getConfiguration() throws Exception {
        if (null == __config) {
            __config = Smartly.getConfiguration(true);
        }
        return __config;
    }

    public static String getFrom() throws Exception {
        return (String) getConfiguration().get("mail.smtp.reply_to");
    }

    public static String getHost() throws Exception {
        return (String) getConfiguration().get("mail.smtp.host");
    }

    public static int getPort() throws Exception {
        return (Integer) getConfiguration().get("mail.smtp.port");
    }

    public static String getUsername() throws Exception {
        return (String) getConfiguration().get("mail.smtp.username");
    }

    public static String getPassword() throws Exception {
        return (String) getConfiguration().get("mail.smtp.password");
    }

    public static boolean getTLS() throws Exception {
        return (Boolean) getConfiguration().get("mail.smtp.TLS");
    }

    public static boolean isDebug() throws Exception {
        return (Boolean) getConfiguration().get("mail.smtp.debug");
    }


}
