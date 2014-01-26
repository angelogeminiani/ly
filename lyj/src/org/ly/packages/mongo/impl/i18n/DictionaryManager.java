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

package org.ly.packages.mongo.impl.i18n;

import com.mongodb.DB;
import com.mongodb.DBObject;
import org.ly.Smartly;
import org.ly.commons.logging.util.LoggingUtils;
import org.ly.commons.util.ExceptionUtils;
import org.ly.commons.util.FormatUtils;
import org.ly.commons.util.StringUtils;
import org.ly.packages.mongo.impl.IMongoConstants;
import org.ly.packages.mongo.impl.db.GenericMongoService;
import org.ly.packages.mongo.impl.util.MongoUtils;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Quick access to locale dictionaries.
 * <p/>
 * Works with internal cache for values.
 */
public final class DictionaryManager {

    private DictionaryManager() {

    }

    private static final Map<String, String> _cache = Collections.synchronizedMap(new HashMap<String, String>());

    private static final String[] LOCALFIELDS = new String[]{
            IMongoConstants.VALUE
    };

    private static String getKey(final String lang, final String collection, final String id) {
        return StringUtils.concatDot(lang, collection, id);
    }

    private static void add(final String key, final String value) {
        synchronized (_cache) {
            _cache.put(key, value);
        }
    }

    private static String getFromDB(final String lang, final String collection, final String id) throws Exception {
        try {
            if (null != _DATABASE) {
                final GenericMongoService srvc = new GenericMongoService(
                        _DATABASE,
                        collection,
                        Smartly.getLanguages());
                final DBObject item = srvc.findById(id);
                if (null != item) {
                    srvc.localize(item, lang, LOCALFIELDS);
                    return MongoUtils.getString(item, IMongoConstants.VALUE);
                }
            } else {
                LoggingUtils.getLogger(DictionaryManager.class).warning("DictionaryManager not initialized!");
            }
            return null;
        } catch (Throwable t) {
            throw new Exception(FormatUtils.format("Error: '{0}'", ExceptionUtils.getRealMessage(t)));
        }
    }

    private static String getValue(final String lang,
                                   final String collection,
                                   final String id) {
        final String key = getKey(lang, collection, id);
        try {
            if (!_cache.containsKey(key)) {
                add(key, getFromDB(lang, collection, id));
            }
            return _cache.get(key);
        } catch (Throwable t) {
            return ExceptionUtils.getRealMessage(t);
        }
    }

    // --------------------------------------------------------------------
    //               S T A T I C
    // --------------------------------------------------------------------

    private static DB _DATABASE = null;

    public static void init(DB database){
        _DATABASE = database;
    }

    public static String get(final String lang, final String collection, final String id) {
        return get(lang, collection, id, "");
    }

    public static String get(final String lang, final String collection, final String id, final String defaultValue) {
        final String result = getValue(lang, collection, id);
        return null != result ? result : defaultValue;
    }

}
