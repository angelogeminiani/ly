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

package org.ly.packages.http;


import org.ly.Smartly;
import org.ly.commons.io.jsonrepository.JsonRepository;
import org.ly.commons.lang.CharEncoding;
import org.ly.commons.logging.Level;
import org.ly.commons.util.FileUtils;
import org.ly.commons.util.PathUtils;
import org.ly.commons.util.StringUtils;
import org.ly.packages.AbstractPackage;
import org.ly.packages.ISmartlyModalPackage;
import org.ly.packages.ISmartlySystemPackage;
//import org.smartly.packages.http.config.Deployer;
import org.ly.packages.http.impl.AbstractHttpServer;
import org.ly.packages.http.impl.WebServer;
import org.ly.packages.velocity.SmartlyVelocity;

import java.io.File;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

/**
 * This package must be started ( load() method ) before application packages and must be ready ( method ready() )
 * after all other packages.
 */
public class SmartlyHttp
        extends AbstractPackage
        implements ISmartlySystemPackage, ISmartlyModalPackage {

    public static final String NAME = "smartly_http";

    private final boolean _join;

    public SmartlyHttp() {
        this(true); // start server and wait
    }

    public SmartlyHttp(final boolean join) {
        super(NAME, 2);
        super.setDescription("Http Module");
        super.setMaintainerName("Gian Angelo Geminiani");
        super.setMaintainerMail("angelo.geminiani@gmail.com");
        super.setMaintainerUrl("http://www.smartfeeling.org");

        //-- module dependencies --//
        super.addDependency(SmartlyVelocity.NAME, ""); // all versions

        //-- lib dependencies --//
        super.addDependency("org.mongodb:mongo-java-driver:2.7.3", "");

        _join = join;
    }

    @Override
    public void load() {
        //Smartly.register(new Deployer(Smartly.getConfigurationPath()));
    }

    @Override
    public void ready() {
        this.init();
    }

    @Override
    public void unload() {
        this.getLogger().info("EXITING " + this.getClass().getSimpleName());
    }

    // --------------------------------------------------------------------
    //               p r i v a t e
    // --------------------------------------------------------------------

    private void init() {
        try {
            final AbstractHttpServer server = WebServer.launch(false);
            if (null == server) {
                super.getLogger().warning("Web Server not enabled! Check configuration file.");
            }
            if(null!=server && _join){
               server.join();
            }
        } catch (Throwable t) {
            super.getLogger().log(Level.SEVERE, null, t);
        }
    }

    // --------------------------------------------------------------------
    //               S T A T I C
    // --------------------------------------------------------------------

    private static String __htdocs;
    private static Set<String> _cmsPaths = new HashSet<String>(); // connector for CMS module. (paths are required in SmartlyResourceHandler)

    public static void registerCMSPaths(final Set<String> paths) {
        _cmsPaths.addAll(paths);
    }

    public static Set<String> getCMSPaths() {
        return _cmsPaths;
    }

    public static String getHTTPUrl(final String path) {
        final StringBuilder result = new StringBuilder();
        final String protocol = "http://";
        final String domain = Smartly.getConfiguration().getString("http.webserver.domain"); //getDomain(item);
        final int port = Smartly.getConfiguration().getInt("http.webserver.connectors.http.port", 80); //getPort(item);

        result.append(protocol);
        result.append(domain);
        if (port != 80) {
            result.append(":").append(port);
        }

        final String url;
        if (StringUtils.hasText(path)) {
            url = PathUtils.join(result.toString(), path);
        } else {
            url = result.toString().concat("/");
        }

        return url;
    }

    /**
     * Returns file path of doc root.
     *
     * @return
     */
    public static String getDocRoot() {
        if (!StringUtils.hasText(__htdocs)) {
            JsonRepository config;
            try {
                config = Smartly.getConfiguration(true);
            } catch (Throwable ignored) {
                config = Smartly.getConfiguration();
            }
            if (null != config) {
                final String path = config.getString("http.webserver.root");
                if (StringUtils.hasText(path)) {
                    __htdocs = Smartly.getAbsolutePath(path);
                }
            }
        }
        return __htdocs;
    }

    public static String readFile(final String path) throws IOException {
        final String fullPath = PathUtils.concat(getDocRoot(), path);
        return new String(FileUtils.copyToByteArray(new File(fullPath)), CharEncoding.getDefault());
    }
}
