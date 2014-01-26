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

/*
 * 
 */
package org.ly.packages.velocity.impl.engine.loggers;

import org.apache.velocity.runtime.RuntimeServices;
import org.apache.velocity.runtime.log.LogChute;
import org.ly.commons.logging.Level;
import org.ly.commons.logging.Logger;
import org.ly.commons.logging.util.LoggingUtils;

/**
 * @author angelo.geminiani
 */
public class VLCLogger implements LogChute {

    private Logger _logger;

    //    public static final int TRACE_ID = -1;
    //    public static final int DEBUG_ID = 0;
    //    public static final int INFO_ID = 1;
    //    public static final int WARN_ID = 2;
    //    public static final int ERROR_ID = 3;
    @Override
    public void init(RuntimeServices rs) throws Exception {
        _logger = LoggingUtils.getLogger(rs);
    }

    @Override
    public void log(int i, String message) {
        if (null != _logger) {
            final Level level = this.getLevel(i);
            _logger.log(level, message);
        }
    }

    @Override
    public void log(int i, String message, Throwable thrwbl) {
        if (null != _logger) {
            final Level level = this.getLevel(i);
            _logger.log(level, message, thrwbl);
        }
    }

    @Override
    public boolean isLevelEnabled(int i) {
        if (null != _logger) {
            final Level level = this.getLevel(i);
            return _logger.isLoggable(level);
        }
        return true;
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    private Level getLevel(final int i) {
        if (i == TRACE_ID) {
            return Level.FINER;
        } else if (i == DEBUG_ID) {
            return Level.FINE;
        } else if (i == INFO_ID) {
            return Level.INFO;
        } else if (i == WARN_ID) {
            return Level.WARNING;
        } else if (i == ERROR_ID) {
            return Level.SEVERE;
        }
        return Level.CONFIG;
    }
}
