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
package org.ly.packages.velocity.impl.templates.impl;

import org.ly.commons.util.LocaleUtils;
import org.ly.packages.velocity.impl.templates.VLCTemplateManager;

import java.util.Locale;

/**
 * @author angelo.geminiani
 */
public class SampleTemplateManager extends VLCTemplateManager {

    public SampleTemplateManager(final String[] languages) {
        super(languages);
        //super(super(ConfigurationUtils.getInstance().getLanguageCodes()););
    }

    public String getName(){
        return "sample";
    }

    // ------------------------------------------------------------------------
    //                      S I N G L E T O N
    // ------------------------------------------------------------------------
    private static SampleTemplateManager __instance;

    public static SampleTemplateManager getInstance() {
        if (null == __instance) {
            __instance = new SampleTemplateManager(new String[]{"it", "en"});
        }
        return __instance;
    }

    public static String getContent(final String langCode) {
        final Locale locale = LocaleUtils.getLocaleFromString(langCode);
        return getInstance().getContent(locale);
    }

    public static String getTitle(final String langCode) {
        final Locale locale = LocaleUtils.getLocaleFromString(langCode);
        return getInstance().getTitle(locale);
    }

    public static String getDescription(final String langCode) {
        final Locale locale = LocaleUtils.getLocaleFromString(langCode);
        return getInstance().getDescription(locale);
    }
}
