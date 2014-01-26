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
package org.ly.packages.mongo.impl.db.entity;

import com.mongodb.DBObject;
import org.ly.packages.mongo.impl.MongoObject;
import org.ly.packages.mongo.impl.util.MongoUtils;

/**
 * Session
 * <p/>
 * FIELDS:
 * - ID {_id}: string
 * - DATA {data}: Custom data
 *
 * @author angelo.geminiani
 */
public class MongoSession extends MongoObject {

    // ------------------------------------------------------------------------
    //                      Constants
    // ------------------------------------------------------------------------
    public static String COLLECTION = "sessions";
    //
    //-- objects --//
    public static final String DATA = IMongoEntityConstants.DATA;

    // ------------------------------------------------------------------------
    //                      Constructor
    // ------------------------------------------------------------------------
    public MongoSession() {
        this.init();
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    private void init() {
        final String id = MongoUtils.createUUID();
        this.append(ID, id);
    }

    // ------------------------------------------------------------------------
    //                      STATIC
    // ------------------------------------------------------------------------
    public static String getId(final DBObject item) {
        return MongoUtils.getString(item, ID);
    }

    public static void setId(final DBObject item, final String value) {
        MongoUtils.put(item, ID, value);
    }

    public static DBObject getData(final DBObject item) {
        return MongoUtils.getDBObject(item, DATA);
    }

    public static void setData(final DBObject item, final DBObject value) {
        MongoUtils.put(item, DATA, value);
    }
}
