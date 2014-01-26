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

package org.ly.packages.velocity.impl.compilers;

import org.ly.Smartly;
import org.ly.commons.lang.compilers.ICompiler;
import org.ly.commons.util.BeanUtils;
import org.ly.packages.velocity.impl.VLCManager;

import java.util.Map;

/**
 * Velocity compiler implementing standard Smarty ICompiler interface
 */
public class CompilerVelocity implements ICompiler {

    public static final String ARG_FILE = "file";

    public CompilerVelocity() {

    }

    @Override
    public byte[] compile(byte[] data) throws Exception {
        return compile(data, null);
    }

    @Override
    public byte[] compile(byte[] data, final Map<String, Object> args) throws Exception {
        final String input = new String(data, Smartly.getCharset());
        final String filename = (String) BeanUtils.getValueIfAny(args, ARG_FILE, "UNDEFINED");
        final String output = VLCManager.getInstance().evaluateText(filename, input, args);
        return output.getBytes();
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


}
