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

package org.ly.packages.cms;


import org.ly.Smartly;
import org.ly.commons.io.jsonrepository.JsonRepository;
import org.ly.commons.logging.Logger;
import org.ly.commons.logging.LoggingRepository;
import org.ly.commons.logging.util.LoggingUtils;
import org.ly.packages.AbstractPackage;
import org.ly.packages.ISmartlySystemPackage;
//import org.smartly.packages.cms.config.Deployer;
import org.ly.packages.cms.impl.cms.endpoint.CMSRouter;
import org.ly.packages.http.SmartlyHttp;
import org.ly.packages.mongo.SmartlyMongo;
import org.ly.packages.velocity.SmartlyVelocity;

/**
 *
 */
public class SmartlyHttpCms extends AbstractPackage
        implements ISmartlySystemPackage {

    public static final String NAME = "smartly_cms";

    public SmartlyHttpCms() {
        super(NAME, 1);
        super.setVersion("0.0.1");
        super.setDescription("Http CMS Module");
        super.setMaintainerName("Gian Angelo Geminiani");
        super.setMaintainerMail("angelo.geminiani@gmail.com");
        super.setMaintainerUrl("http://www.smartfeeling.org");

        //-- module dependencies --//
        super.addDependency(SmartlyVelocity.NAME, ""); // all versions
        super.addDependency(SmartlyMongo.NAME, ""); // all versions
        super.addDependency(SmartlyHttp.NAME, ""); // all versions

        //-- lib dependencies --//

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

    private static CMSRouter __cms;

    static {
        LoggingRepository.getInstance().setLogFileName(SmartlyHttpCms.class, "./smartly_cms.log");
    }

    public static Logger getCMSLogger() {
        return LoggingUtils.getLogger(CMSRouter.class);
    }

    public static void registerCMSEndPoint(final CMSRouter cms) {
        __cms = cms;
    }

    public static CMSRouter getCMS() {
        if (null == __cms) {
            __cms = new CMSRouter();
        }
        return __cms;
    }

    private static JsonRepository getConfiguration() throws Exception {
        if (null == __config) {
            __config = Smartly.getConfiguration(true);
        }
        return __config;
    }

}
