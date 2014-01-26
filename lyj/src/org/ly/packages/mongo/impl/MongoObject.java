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
package org.ly.packages.mongo.impl;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import org.json.JSONObject;
import org.ly.commons.util.FormatUtils;
import org.ly.packages.mongo.impl.util.MongoUtils;

import java.util.Map;

/**
 * @author angelo.geminiani
 */
public class MongoObject extends BasicDBObject
        implements IMongoConstants {

    // ------------------------------------------------------------------------
    //                      Constructor
    // ------------------------------------------------------------------------

    public MongoObject(final Map m) {
        super(m);
        this.setCreationDate(FormatUtils.getNow());
    }

    public MongoObject(final String key, final Object value) {
        super(key, value);
        this.setCreationDate(FormatUtils.getNow());
    }

    public MongoObject(int size) {
        super(size);
        this.setCreationDate(FormatUtils.getNow());
    }

    public MongoObject(final DBObject object) {
        super();
        this.setCreationDate(FormatUtils.getNow());
        if (null != object) {
            super.putAll(object);
        }
    }

    public MongoObject() {
        super();
        this.setCreationDate(FormatUtils.getNow());
    }

    public MongoObject(final String jsontext) {
        super();
        this.setCreationDate(FormatUtils.getNow());
        final DBObject object = MongoUtils.parseObject(jsontext);
        if (null != object) {
            super.putAll(object);
        }
    }

    public MongoObject(final JSONObject json) {
        super();
        this.setCreationDate(FormatUtils.getNow());
        final DBObject object = (DBObject) json;
        if (null != object) {
            super.putAll(object);
        }
    }

    // ------------------------------------------------------------------------
    //                      Public
    // ------------------------------------------------------------------------

    public void setId(final Object id) {
        this.append(ID, id);
    }

    public Object getId() {
        return this.get(ID);
    }

    public final void setCreationDate(final String value) {
        this.append(CREATIONDATE, value);
    }

    public String getCreationDate() {
        return this.getString(CREATIONDATE);
    }

    @Override
    public Object get(final String key) {
        return super.get(key);
    }

    public Object get(final String key, final Object defValue) {
        final Object result = super.get(key);
        return null != result ? result : defValue;
    }

    @Override
    public String getString(final String key) {
        return this.getString(key, "");
    }

    public String getString(final String key, final String defValue) {
        return MongoUtils.getString(this, key, defValue);
    }

    @Override
    public Object put(final String key, final Object value) {
        if (null != value) {
            return super.put(key, value);
        }
        return null;
    }

    @Override
    public MongoObject append(final String key, final Object value) {
        if (null != value) {
            super.append(key, value);
        }
        return this;
    }


    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

}
