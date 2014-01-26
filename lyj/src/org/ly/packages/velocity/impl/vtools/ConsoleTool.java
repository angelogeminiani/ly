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

package org.ly.packages.velocity.impl.vtools;

import org.ly.commons.logging.Level;
import org.ly.commons.logging.LoggingRepository;
import org.ly.commons.logging.util.LoggingUtils;
import org.ly.commons.util.FormatUtils;
import org.ly.commons.util.StringUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * console logger helper for VTL expressions.
 *
 * usage:
 *  $console.log("hello")
 *
 *  $console.log("custom_file", "hello")
 */
public class ConsoleTool {

    // ------------------------------------------------------------------------
    //                      Constants
    // ------------------------------------------------------------------------
    public static final String NAME = "console";

    private final static String PREFIX = "VTL_console_";
    private final static String DEFAULT_NAME = "default";

    private final String _id;


    public ConsoleTool() {
        this(DEFAULT_NAME);
    }

    public ConsoleTool(final String id) {
        _id = id;
    }

    public ConsoleTool create(final String name){
       return new ConsoleTool(name);
    }

    public void log(final Object item) {
        static_log(_id, item);
    }

    public void info(final Object item) {
        static_info(_id, item);
    }

    public void warn(final Object item) {
        static_warn(_id, item);
    }

    public void error(final Object item) {
        static_error(_id, item);
    }

    public void debug(final Object item) {
        static_debug(_id, item);
    }

    //-- CUSTOM LOGGER --//

    public void log(final String logger, final Object item) {
        static_log(logger, item);
    }

    public void info(final String logger, final Object item) {
        static_info(logger, item);
    }

    public void warn(final String logger, final Object item) {
        static_warn(logger, item);
    }

    public void error(final String logger, final Object item) {
        static_error(logger, item);
    }

    public void debug(final String logger, final Object item) {
        static_debug(logger, item);
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


    // --------------------------------------------------------------------
    //               S T A T I C
    // --------------------------------------------------------------------

    private static final Map<String, ConsoleTool> _loggers;

    static {
        _loggers = new HashMap<String, ConsoleTool>();
    }

    private static String getKey(final String id) {
        final String key = StringUtils.hasText(id) ? PREFIX.concat(id) : PREFIX.concat(DEFAULT_NAME);
        if (!_loggers.containsKey(key)) {
            _loggers.put(id, new ConsoleTool(id));
            LoggingRepository.getInstance().setLogFileName(key, "./smartly_".concat(key).concat(".log"));
        }
        return key;
    }

    private static void static_log(final String id, final Object item) {
        final String key = getKey(id);
        final String msg = FormatUtils.format("{0}", item);
        LoggingUtils.getLogger(key).log(Level.INFO, msg);
    }

    private static void static_info(final String id, final Object item) {
        final String key = getKey(id);
        final String msg = FormatUtils.format("{0}", item);
        LoggingUtils.getLogger(key).log(Level.INFO, msg);
    }

    private static void static_warn(final String id, final Object item) {
        final String key = getKey(id);
        final String msg = FormatUtils.format("{0}", item);
        LoggingUtils.getLogger(key).log(Level.WARNING, msg);
    }

    private static void static_error(final String id, final Object item) {
        final String key = getKey(id);
        final String msg = FormatUtils.format("{0}", item);
        LoggingUtils.getLogger(key).log(Level.SEVERE, msg);
    }

    private static void static_debug(final String id, final Object item) {
        final String key = getKey(id);
        final String msg = FormatUtils.format("{0}", item);
        LoggingUtils.getLogger(key).log(Level.FINE, msg);
    }

}
