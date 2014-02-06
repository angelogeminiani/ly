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

import org.json.JSONObject;
import org.ly.Smartly;
import org.ly.commons.util.LocaleUtils;
import org.ly.commons.util.StringUtils;

import java.util.HashMap;
import java.util.Map;

/**
 *
 */
public final class VLCI18n {

    // ------------------------------------------------------------------------
    //                      f i e l d s
    // ------------------------------------------------------------------------

    private final Map<String, VLCObject> _i18n;

    private String _lang;       // current language
    private String _def_lang;   // default language

    // ------------------------------------------------------------------------
    //                      c o n s t r u c t o r
    // ------------------------------------------------------------------------

    public VLCI18n() {
        this("", "");
    }

    public VLCI18n(final String lang) {
        this(lang, "");
    }

    public VLCI18n(final String lang, final String def_lang) {
        _i18n = new HashMap<>();
        _def_lang = StringUtils.hasText(def_lang) ? getLang(def_lang) : Smartly.getLang();
        _lang = StringUtils.hasText(lang) ? getLang(lang) : _def_lang;
    }

    public void setDefaultLang(final String value) {
        _def_lang = getLang(value);
    }

    public void use(final String value) {
        _lang = getLang(value);
    }

    public String toString() {
        final VLCObject dictionary = StringUtils.hasText(_lang) ? getDictionary(_lang) : getDictionary(_def_lang);
        return toJsonString(dictionary);
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public Object get(final String key) {
        if (this.getDictionary(_lang).containsKey(key)) {
            return this.getDictionary(_lang).get(key);
        }
        return this.getDictionary(_def_lang).get(key);
    }

    public String getString(final String key) {
        if (this.getDictionary(_lang).containsKey(key)) {
            return this.getDictionary(_lang).getString(key);
        }
        return this.getDictionary(_def_lang).getString(key);
    }

    public double getDouble(final String key) {
        if (this.getDictionary(_lang).containsKey(key)) {
            return this.getDictionary(_lang).getDouble(key);
        }
        return this.getDictionary(_def_lang).getDouble(key);
    }

    public int getInt(final String key) {
        if (this.getDictionary(_lang).containsKey(key)) {
            return this.getDictionary(_lang).getInt(key);
        }
        return this.getDictionary(_def_lang).getInt(key);
    }

    public boolean getBoolean(final String key) {
        if (this.getDictionary(_lang).containsKey(key)) {
            return this.getDictionary(_lang).getBoolean(key);
        }
        return this.getDictionary(_def_lang).getBoolean(key);
    }

    public void put(final String key, final Object value) {
        this.getDictionary(_lang).put(key, value);
    }

    // ------------------------------------------------------------------------
    //                      u t i l i t y
    // ------------------------------------------------------------------------

    public boolean equals(final String lang1, final String lang2) {
        return LocaleUtils.like(lang1, lang2);
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private VLCObject getDictionary(final String lang) {
        if (!_i18n.containsKey(lang)) {
            _i18n.put(lang, new VLCObject());
        }
        return _i18n.get(lang);
    }

    private String getLang(final String raw) {
        return LocaleUtils.getLocaleFromString(raw).getLanguage();
    }

    private String toJsonString(final VLCObject dictionary) {
        try {
            if (null != dictionary) {
                return new JSONObject(dictionary).toString();
            }
        } catch (Throwable ignored) {
        }
        return new JSONObject().toString();
    }
}
