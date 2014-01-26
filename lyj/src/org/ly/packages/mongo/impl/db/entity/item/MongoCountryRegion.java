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
package org.ly.packages.mongo.impl.db.entity.item;

import com.mongodb.DBObject;
import org.ly.packages.mongo.impl.MongoObject;
import org.ly.packages.mongo.impl.db.entity.IMongoEntityConstants;
import org.ly.packages.mongo.impl.util.MongoUtils;

/**
 * Country data.
 * <p/>
 * FIELDS:
 * - UID {uid}: id of region or province. i.e. "RN"
 * - NAME {name}: name of region or province. i.e. "Rimini"
 *
 * @author angelo.geminiani
 */
public class MongoCountryRegion extends MongoObject {

    // ------------------------------------------------------------------------
    //                      Constants
    // ------------------------------------------------------------------------

    //-- fields --//
    public static final String UID = IMongoEntityConstants.UID;
    public static final String NAME = IMongoEntityConstants.NAME;


    // ------------------------------------------------------------------------
    //                      Constructor
    // ------------------------------------------------------------------------
    public MongoCountryRegion() {
        this.append(UID, "");
        this.append(NAME, "");
    }

    // ------------------------------------------------------------------------
    //                      STATIC
    // ------------------------------------------------------------------------
    public static String getUid(final DBObject item) {
        return MongoUtils.getString(item, UID);
    }

    public static void setUid(final DBObject item, final String value) {
        MongoUtils.put(item, UID, value);
    }

    public static String getName(final DBObject item) {
        return MongoUtils.getString(item, NAME);
    }

    public static void setName(final DBObject item, final String value) {
        MongoUtils.put(item, NAME, value);
    }
}
