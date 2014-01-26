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
 * User Role.
 * <p/>
 * FIELDS:
 * - ID {_id}: numeric
 * - NAME {name}: role name
 * - DESCRIPTION {description}: optional role description
 * - DATA {data}: Custom role attributes
 *
 * @author angelo.geminiani
 */
public class MongoRole extends MongoObject {

    // ------------------------------------------------------------------------
    //                      Constants
    // ------------------------------------------------------------------------
    public static String COLLECTION = "roles";
    //
    public static final String NAME = IMongoEntityConstants.NAME;
    public static final String DESCRIPTION = IMongoEntityConstants.DESCRIPTION;
    //-- objects --//
    public static final String DATA = IMongoEntityConstants.DATA;

    // ------------------------------------------------------------------------
    //                      Constructor
    // ------------------------------------------------------------------------
    public MongoRole() {
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

    public static String getName(final DBObject item) {
        return MongoUtils.getString(item, NAME);
    }

    public static void setName(final DBObject item, final String value) {
        MongoUtils.put(item, NAME, value);
    }

    public static String getDescription(final DBObject item) {
        return MongoUtils.getString(item, DESCRIPTION);
    }

    public static void setDescription(final DBObject item, final String value) {
        MongoUtils.put(item, DESCRIPTION, value);
    }

    public static DBObject getData(final DBObject item) {
        return MongoUtils.getDBObject(item, DATA);
    }

    public static void setData(final DBObject item, final DBObject value) {
        MongoUtils.put(item, DATA, value);
    }
}
