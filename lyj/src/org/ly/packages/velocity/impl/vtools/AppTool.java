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


import org.ly.Smartly;
import org.ly.commons.io.jsonrepository.JsonRepository;
import org.ly.commons.util.JsonWrapper;

public class AppTool implements IVLCTool {

    public static final String NAME = "app";

    @Override
    public String getName() {
        return NAME;
    }

    public JsonRepository getConfiguration() {
        return Smartly.getConfiguration();
    }

    public String[] getLangArray() {
        return Smartly.getLanguages();
    }

    public JsonWrapper getLangMap() {
        return Smartly.getLanguagesHelper();
    }

    public boolean isDebug() {
        return Smartly.isDebugMode();
    }

    public String getLang() {
        return Smartly.getLang();
    }

}
