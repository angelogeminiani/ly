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
package org.ly.packages.mongo.impl.db.service;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBObject;
import org.ly.packages.mongo.impl.AbstractMongoService;
import org.ly.packages.mongo.impl.db.entity.MongoCountry;

import java.util.List;

/**
 * @author angelo.geminiani
 */
public class MongoCountryService extends AbstractMongoService {

    // ------------------------------------------------------------------------
    //                      Constants
    // ------------------------------------------------------------------------
    private static String[] LOCALFIELDS = new String[]{
            MongoCountry.NAME, MongoCountry.CURRENCY_NAME};

    // ------------------------------------------------------------------------
    //                      Constructor
    // ------------------------------------------------------------------------
    public MongoCountryService(final DB db, final String[] langCodes) {
        super(db, MongoCountry.COLLECTION, langCodes);
    }

    // ------------------------------------------------------------------------
    //                      public
    // ------------------------------------------------------------------------
    public void localize(final List<DBObject> list, final String lang) {
        super.localize(list, lang, LOCALFIELDS);
    }

    public void localize(final DBObject item, final String lang) {
        super.localize(item, lang, LOCALFIELDS);
    }

    public List<DBObject> getEnabled() {
        final DBObject filter = new BasicDBObject();
        filter.put(MongoCountry.ENABLED, true);
        return super.find(filter, null, new String[]{MongoCountry.ID}, null);
    }

    public List<DBObject> getEnabled(final String lang) {
        final DBObject filter = new BasicDBObject();
        filter.put(MongoCountry.ENABLED, true);
        final List<DBObject> result = super.find(filter, null, new String[]{MongoCountry.ID}, null);
        localize(result, lang);
        return result;
    }
    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
}
