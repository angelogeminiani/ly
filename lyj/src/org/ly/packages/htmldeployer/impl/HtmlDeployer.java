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

package org.ly.packages.htmldeployer.impl;


import org.ly.Smartly;
import org.ly.commons.io.jsonrepository.JsonRepository;
import org.ly.commons.io.repository.deploy.FileDeployer;
import org.ly.commons.lang.compilers.CompilerRegistry;
import org.ly.commons.lang.compilers.ICompiler;
import org.ly.commons.logging.Level;
import org.ly.commons.util.*;

public class HtmlDeployer extends FileDeployer {


    public HtmlDeployer(final String startFolder,
                        final String targetFolder,
                        final boolean verbose,
                        final boolean debugApp,
                        final boolean debugJs) {
        super(startFolder, targetFolder, verbose, debugApp, debugJs);
        this.init();
    }

    public HtmlDeployer(final String targetFolder) {
        super("", targetFolder,
                verbose(), debugApp(), debugJs());
        this.init();
    }

    public HtmlDeployer() {
        super("", docRoot(),
                verbose(), debugApp(), debugJs());
        this.init();
    }

    @Override
    public byte[] compile(byte[] data, final String filename) {
        try {
            final String ext = PathUtils.getFilenameExtension(filename, true);
            final ICompiler compiler = CompilerRegistry.get(ext);
            if (null != compiler) {
                return compiler.compile(data);
            } else {
                super.getLogger().log(Level.WARNING,
                        FormatUtils.format("COMPILER NOT FOUND FOR '{0}'", filename));
            }
        } catch (Throwable t) {
            super.getLogger().log(Level.SEVERE,
                    FormatUtils.format("ERROR COMPILING '{0}': {1}", filename, t), t);
        }
        return null;
    }

    @Override
    public final byte[] compress(byte[] data, final String filename) {
        try {
            //final Compressor compressor = new Compressor();
            //return compressor.compressBytes(data, filename);
            return data;
        } catch (Throwable t) {
            super.getLogger().log(Level.SEVERE,
                    FormatUtils.format("ERROR COMPRESSING '{0}': {1}", filename, t), t);
        }
        return null;
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private void init() {
        // set further overwrite options
        super.setAlwaysOverwriteItems(alwaysOverwrite());
        super.setNeverOverwriteItems(neverOverwrite());

        // pre-process
        this.getSettings().getPreProcessorFiles().add(".less");
        this.getSettings().getPreProcessorFiles().add(".js");
        this.getSettings().getPreProcessorFiles().add(".css");
        this.getSettings().getPreProcessorFiles().add(".vm");
        // compile
        this.getSettings().getCompileFiles().put(".less", ".css");
        // compress
        this.getSettings().getCompressFiles().add(".js");
        this.getSettings().getCompressFiles().add(".css");

        //-- add compilers --//
        // CompilerRegistry.register(".less", CompilerLess.class);
    }

    // ------------------------------------------------------------------------
    //                      S T A T I C
    // ------------------------------------------------------------------------

    private static JsonRepository getConfiguration() {
        try {
            return Smartly.getConfiguration(true);
        } catch (Throwable ignored) {
        }
        return null;
    }

    private static boolean verbose() {
        final JsonRepository config = getConfiguration();
        if (null != config) {
            return ConversionUtils.toBoolean(config.get("htmldeployer.verbose"));
        }
        return false;
    }

    private static boolean debugApp() {
        final JsonRepository config = getConfiguration();
        if (null != config) {
            return ConversionUtils.toBoolean(config.get("htmldeployer.debugApp"));
        }
        return false;
    }

    private static boolean debugJs() {
        final JsonRepository config = getConfiguration();
        if (null != config) {
            return ConversionUtils.toBoolean(config.get("htmldeployer.debugJs"));
        }
        return false;
    }

    private static String[] neverOverwrite() {
        try {
            final JsonRepository config = getConfiguration();
            if (null != config) {
                return JsonWrapper.toArrayOfString(config.getJSONArray("htmldeployer.never_overwrite"));
            }
        } catch (Throwable ignored) {

        }
        return new String[0];
    }

    private static String[] alwaysOverwrite() {
        try {
            final JsonRepository config = getConfiguration();
            if (null != config) {
                return JsonWrapper.toArrayOfString(config.getJSONArray("htmldeployer.always_overwrite"));
            }
        } catch (Throwable ignored) {

        }
        return new String[0];
    }

    public static String docRoot() {
        final JsonRepository config = getConfiguration();
        if (null != config) {
            final String path = config.getString("http.webserver.root");
            if (!StringUtils.hasText(path)) {
                return null;
            }
            return Smartly.getAbsolutePath(path);
        }
        return "";
    }

    public static String docRoot(final String subFolder) {
        return PathUtils.merge(docRoot(), subFolder);
    }

}
