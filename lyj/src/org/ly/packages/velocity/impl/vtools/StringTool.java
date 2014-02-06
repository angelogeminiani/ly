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

import org.ly.commons.util.StringUtils;
import org.ly.packages.velocity.impl.vtools.lang.VLCString;

/**
 * String utilities
 */
public class StringTool {

    // ------------------------------------------------------------------------
    //                      Constants
    // ------------------------------------------------------------------------
    public static final String NAME = "string";


    public StringTool() {
    }

    public VLCString newString(){
        return new VLCString();
    }

    public String concat(final Object...args){
        return StringUtils.concatArgs(args);
    }

    public String concatEx(final String sep, final Object...args){
        return StringUtils.concatArgsEx(sep, args);
    }

    public String concatDot(final Object...args){
        return StringUtils.concatDot(args);
    }

    public String concatComma(final Object...args){
        return StringUtils.concatArgsEx(",", args);
    }

    public String toUpperCase(final Object arg){
        if(null!=arg){
           return arg.toString().toUpperCase();
        }
        return "";
    }

    public String toLowerCase(final Object arg){
        if(null!=arg){
            return arg.toString().toLowerCase();
        }
        return "";
    }

    public String replaceCR(final Object text, final Object with){
        return this.replace(text, "\n", with);
    }

    public String replace(final Object text, final Object what, final Object with){
        if(text instanceof String){
            if(null!=what){
               return StringUtils.replace(text.toString(),
                       what.toString(),
                       null != with ? with.toString() : "");
            }
            return text.toString();
        }
        return "";
    }



    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


}
