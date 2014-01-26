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
package org.ly.packages.velocity.impl.engine.eventhandlers;

import org.apache.velocity.app.event.MethodExceptionEventHandler;
import org.ly.commons.logging.Level;
import org.ly.commons.logging.Logger;
import org.ly.commons.logging.util.LoggingUtils;
import org.ly.commons.util.FormatUtils;


/**
 * @author angelo.geminiani
 */
public class VLCEventHandlerMethodException implements MethodExceptionEventHandler {

    private final Level _level;

    public VLCEventHandlerMethodException() {
        _level = Level.WARNING;
    }

    public VLCEventHandlerMethodException(final Level level) {
        _level = level;
    }

    @Override
    public Object methodException(final Class type, final String string,
                                  final Exception excptn) throws Exception {
        this.log(type, string, excptn);
        return "";
    }

    // ------------------------------------------------------------------------
    //                      p r o t e c t e d
    // ------------------------------------------------------------------------
    protected Logger getLogger() {
        return LoggingUtils.getLogger(this);
    }

    protected void log(final Class type, final String string,
                       final Exception excptn) {
        final String message = FormatUtils.format("Method Exception calling "
                + "'{0}' of class '{1}': {2}", string, type,
                excptn.toString());
        this.getLogger().log(_level, message);
    }
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
}
