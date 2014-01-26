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

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import org.ly.packages.mongo.impl.util.MongoUtils;

import java.util.List;

/**
 * @author angelo.geminiani
 */
public class MongoPage
        extends BasicDBObject {

    private static final String ITEMS = "items";
    private static final String COUNT = "count";
    private static final String PAGE_COUNT = "page_count";
    private static final String PAGE_NR = "page_nr";

    public MongoPage() {
        this.setCount(0);
        this.setPageCount(0);
        this.setPageNr(0);
        this.setItems(new BasicDBList());
    }

    public void setItems(final List value) {
        super.put(ITEMS, value);
    }

    public List getItems() {
        return MongoUtils.getList(this, ITEMS);
    }

    public void setCount(final int value) {
        super.put(COUNT, value);
    }

    public int getCount() {
        return MongoUtils.getInt(this, COUNT);
    }

    public void setPageNr(final int value) {
        super.put(PAGE_NR, value);
    }

    public int getPageNr() {
        return MongoUtils.getInt(this, PAGE_NR);
    }


    public void setPageCount(final int value) {
        super.put(PAGE_COUNT, value);
    }

    public int getPageCount() {
        return MongoUtils.getInt(this, PAGE_COUNT);
    }
    // ------------------------------------------------------------------------
    //                      S T A T I C
    // ------------------------------------------------------------------------

    public static List<DBObject> getItems(final DBObject entity) {
        return MongoUtils.getList(entity, ITEMS);
    }

    public static long getCount(final DBObject entity) {
        return MongoUtils.getLong(entity, COUNT);
    }

    public static long getPageNr(final DBObject entity) {
        return MongoUtils.getLong(entity, PAGE_NR);
    }

    public static long getPageCount(final DBObject entity) {
        return MongoUtils.getLong(entity, PAGE_COUNT);
    }
}
