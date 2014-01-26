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
 * Address Entity.
 * <p/>
 * FIELDS:<br/>
 * - STREET {street}:
 * - PLACE {place}:
 * - ZIP {zip}:
 * - CITY {city}:
 * - STATE {state}:
 * - COUNTRY {country}:
 *
 * @author angelo.geminiani
 */
public class MongoAddress extends MongoObject {

    // ------------------------------------------------------------------------
    //                      Constants
    // ------------------------------------------------------------------------
    public static final String STREET = IMongoEntityConstants.STREET; // Madison Avn., 7
    public static final String PLACE = IMongoEntityConstants.PLACE; // Palace B
    public static final String ZIP = IMongoEntityConstants.ZIP; // 47858
    public static final String CITY = IMongoEntityConstants.CITY; // Rochester
    public static final String STATE = IMongoEntityConstants.STATE; // NY
    public static final String COUNTRY = IMongoEntityConstants.COUNTRY; // USA

    // ------------------------------------------------------------------------
    //                      Constructor
    // ------------------------------------------------------------------------
    public MongoAddress() {
        this.append(STREET, "");
        this.append(PLACE, "");
        this.append(ZIP, "");
        this.append(CITY, "");
        this.append(STATE, "");
        this.append(COUNTRY, "");
    }

    public MongoAddress(final DBObject item) {
        super(item);
    }

    // ------------------------------------------------------------------------
    //                      STATIC
    // ------------------------------------------------------------------------
    public static String getStreet(final DBObject item) {
        return MongoUtils.getString(item, STREET);
    }

    public static void setStreet(final DBObject item, final String value) {
        MongoUtils.put(item, STREET, value);
    }

    public static String getPlace(final DBObject item) {
        return MongoUtils.getString(item, PLACE);
    }

    public static void setPlace(final DBObject item, final String value) {
        MongoUtils.put(item, PLACE, value);
    }

    public static String getZip(final DBObject item) {
        return MongoUtils.getString(item, ZIP);
    }

    public static void setZip(final DBObject item, final String value) {
        MongoUtils.put(item, ZIP, value);
    }

    public static String getCity(final DBObject item) {
        return MongoUtils.getString(item, CITY);
    }

    public static void setCity(final DBObject item, final String value) {
        MongoUtils.put(item, CITY, value);
    }

    public static String getState(final DBObject item) {
        return MongoUtils.getString(item, STATE);
    }

    public static void setState(final DBObject item, final String value) {
        MongoUtils.put(item, STATE, value);
    }

    public static String getCountry(final DBObject item) {
        return MongoUtils.getString(item, COUNTRY);
    }

    public static void setCountry(final DBObject item, final String value) {
        MongoUtils.put(item, COUNTRY, value);
    }
}
