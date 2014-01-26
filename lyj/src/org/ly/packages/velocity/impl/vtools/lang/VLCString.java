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

package org.ly.packages.velocity.impl.vtools.lang;

import org.ly.commons.util.StringUtils;

/**
 *
 */
public class VLCString {

    private StringBuilder _buffer;

    public VLCString() {
        _buffer = new StringBuilder();
    }

    @Override
    public String toString() {
        return _buffer.toString();
    }

    public String trim() {
        return this.toString().trim();
    }

    public String toUpperCase() {
        return this.toString().toUpperCase();
    }

    public String toLowerCase() {
        return this.toString().toLowerCase();
    }

    public String[] split(final String sep){
        return StringUtils.split(this.toString(), sep);
    }

    public void concat(final Object... args) {
        _buffer.append(StringUtils.concatArgs(args));
    }

    public void concatEx(final String sep, final Object... args) {
        if (_buffer.length() > 0) {
            _buffer.append(sep);
        }
        _buffer.append(StringUtils.concatArgsEx(sep, args));
    }

    public void concatDot(final Object... args) {
        if (_buffer.length() > 0) {
            _buffer.append(".");
        }
        _buffer.append(StringUtils.concatDot(args));
    }

    public void concatComma(final Object... args) {
        if (_buffer.length() > 0) {
            _buffer.append(",");
        }
        _buffer.append(StringUtils.concatArgsEx(",", args));
    }

    public void replaceCR(final Object with) {
        this.replace("\n", with);
    }

    public void replace(final Object what, final Object with) {
        if (null != what) {
            _buffer = new StringBuilder(StringUtils.replace(_buffer.toString(),
                    what.toString(),
                    null != with ? with.toString() : ""));
        }
    }


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

}
