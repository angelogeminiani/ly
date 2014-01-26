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

import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.ly.commons.util.StringUtils;
import org.ly.packages.velocity.impl.VLCManager;

/**
 * Template engine exposed
 */
public class EngineTool {

    // ------------------------------------------------------------------------
    //                      Constants
    // ------------------------------------------------------------------------

    public static final String NAME = "engine";

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private final VelocityEngine _engine;
    private final VelocityContext _context;
    private final String _name;

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    public EngineTool(final String templateName,
                      final VelocityEngine engine,
                      final VelocityContext context) {
        _engine = engine;
        _context = context;
        _name = templateName;
    }


    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public String eval(final Object text) {
        try {
            String original = null != text ? text.toString() : "";
            if (StringUtils.hasText(original)) {
                final String parsed;
                if (null != _engine) {
                    parsed = VLCManager.getInstance().evaluateText(_engine, _name, original, _context);
                } else {
                    parsed = VLCManager.getInstance().evaluateText(_name, original, _context);
                }
                if(!StringUtils.equalsTrim(original, parsed)){
                    // need another evaluation
                    return eval(parsed);
                } else {
                    return parsed;
                }
            }
            return original;
        } catch (Throwable t) {
            return t.toString();
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


}
