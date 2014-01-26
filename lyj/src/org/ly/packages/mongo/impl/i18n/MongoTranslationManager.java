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
package org.ly.packages.mongo.impl.i18n;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBObject;
import org.ly.commons.logging.Level;
import org.ly.commons.logging.Logger;
import org.ly.commons.logging.util.LoggingUtils;
import org.ly.commons.util.CollectionUtils;
import org.ly.commons.util.LocaleUtils;
import org.ly.commons.util.StringUtils;
import org.ly.packages.mongo.impl.AbstractMongoService;
import org.ly.packages.mongo.impl.IMongoConstants;
import org.ly.packages.mongo.impl.StandardCodedException;
import org.ly.packages.mongo.impl.db.GenericMongoService;
import org.ly.packages.mongo.impl.util.MongoUtils;

import java.util.*;
import java.util.regex.Pattern;

/**
 * @author angelo.geminiani
 */
public class MongoTranslationManager {

    private final DB _db;
    private final String _collName;
    private final String[] _langCodes;
    private final Map<String, AbstractMongoService> _services;

    // ------------------------------------------------------------------------
    //                      Constructor
    // ------------------------------------------------------------------------
    public MongoTranslationManager(final DB db,
                                   final String collection, final String[] langCodes) {
        _db = db;
        _collName = collection;
        _langCodes = langCodes;
        _services = Collections.synchronizedMap(new HashMap<String, AbstractMongoService>());
    }
    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public final Object get(final Object entityid,
                            final String fieldName,
                            final String lang) {
        Object result = null;
        try {
            final String id = MongoTranslation.getCompoundId(entityid, fieldName);
            result = this.get(lang, id);
        } catch (Throwable t) {
        }
        return result;
    }

    public final List<String> getTranslatedFieldIds(final String lang,
                                                    final String filterText) {
        try {
            final AbstractMongoService srvc = this.getService(lang);
            final DBObject fTranslations = new BasicDBObject();
            final Pattern pattern = Pattern.compile("^.*".concat(filterText).concat(".*$"), Pattern.CASE_INSENSITIVE);
            fTranslations.put(MongoTranslation.KEYWORDS, pattern);
            return srvc.distinct(MongoTranslation.FIELD_ID, fTranslations);
        } catch (Exception ex) {
            this.getLogger().log(Level.SEVERE, ex.getMessage());
        }
        return new ArrayList<String>();
    }

    public final boolean add(final Object entityid,
                             final String fieldName, final String lang, final Object value) {
        if (null != entityid && StringUtils.hasText(lang)
                && StringUtils.hasText(fieldName)
                && null != value) {
            try {
                final MongoTranslation item = new MongoTranslation(entityid,
                        fieldName);
                item.setValue(value);
                //-- add keywords --//
                if (value instanceof String && value.toString().length() < 255) {
                    final String[] keywords = StringUtils.split((String) value,
                            new String[]{" ", "&nbsp;", "&#32;"},
                            true, true, 3);
                    item.setKeywords(StringUtils.toString(keywords, " ", "", 100));
                }

                this.upsert(lang, item);
                return true;
            } catch (Throwable t) {
            }
        }
        return false;
    }

    public final boolean remove(final Object entityid,
                                final String fieldName, final String lang) {
        try {
            final String id = MongoTranslation.getCompoundId(entityid, fieldName);
            this.removeOne(lang, id);
            return true;
        } catch (Exception ex) {
        }
        return false;
    }

    public final int removeAll() {
        int counter = 0;
        try {
            for (final String lang : _langCodes) {
                counter += this.remove(lang);
            }
        } catch (Exception ex) {
            this.getLogger().log(Level.SEVERE, "Error removing translations: "
                    + ex, ex);
        }
        return counter;
    }

    public final int removeAll(final Object entityid) {
        int counter = 0;
        try {
            for (final String lang : _langCodes) {
                final DBObject filter = new BasicDBObject();
                filter.put(MongoTranslation.FIELD_ID, entityid);
                counter += this.remove(lang, filter);
            }
        } catch (Exception ex) {
            this.getLogger().log(Level.SEVERE, "Error removing translations: "
                    + ex, ex);
        }
        return counter;
    }

    public Map<String, List<DBObject>> find(final DBObject filter) throws StandardCodedException {
        final Map<String, List<DBObject>> result = new HashMap<String, List<DBObject>>();
        for (final String lang : _langCodes) {
            final List<DBObject> values = this.find(lang, filter);
            if (!CollectionUtils.isEmpty(values)) {
                result.put(lang, values);
            }
        }
        return result;
    }

    public List<DBObject> find(final String lang, final DBObject filter) throws StandardCodedException {
        final AbstractMongoService srvc = this.getService(lang);
        if (null != srvc) {
            return srvc.find(filter);
        }
        return null;
    }

    public int remove(final String lang) throws StandardCodedException {
        final AbstractMongoService srvc = this.getService(lang);
        if (null != srvc) {
            return srvc.removeAll();
        }
        return 0;
    }

    public int remove(final String lang, final DBObject filter) throws StandardCodedException {
        final AbstractMongoService srvc = this.getService(lang);
        if (null != srvc) {
            return srvc.remove(filter);
        }
        return 0;
    }

    public DBObject findOne(final String lang, final DBObject query) throws StandardCodedException {
        final AbstractMongoService srvc = this.getService(lang);
        if (null != srvc) {
            return srvc.findOne(query);
        }
        return null;
    }

    public void removeOne(final String lang, final String id) throws StandardCodedException {
        final AbstractMongoService srvc = this.getService(lang);
        if (null != srvc) {
            srvc.removeOne(id);
        }
    }

    public int upsert(final String lang, final DBObject item) throws StandardCodedException {
        final AbstractMongoService srvc = this.getService(lang);
        if (null != srvc) {
            return srvc.upsert(item);
        }
        return 0;
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    private Logger getLogger() {
        return LoggingUtils.getLogger();
    }

    private String getCollectionName(final String lang) {
        final String language = this.getLanguage(lang);
        return _collName.concat("_").concat(language);
    }

    private String getLanguage(final String langCode) {
        return LocaleUtils.getLanguage(langCode);
    }

    private Object get(final String lang, final String id) throws StandardCodedException {
        final DBObject query = MongoUtils.queryEquals("_id", id);
        return this.get(lang, query);
    }

    private Object get(final String lang, final DBObject query) throws StandardCodedException {
        final DBObject item = this.findOne(lang, query);
        if (null != item) {
            return MongoUtils.get(item, IMongoConstants.VALUE);
        }
        return null;
    }

    private AbstractMongoService getService(final String lang) throws StandardCodedException {
        synchronized (_services) {
            if (_services.containsKey(lang)) {
                return _services.get(lang);
            } else {
                final String collName = this.getCollectionName(lang);
                final GenericMongoService srvc = new GenericMongoService(_db, collName, new String[0]);
                _services.put(lang, srvc);
                return srvc;
            }
        }
    }
}
