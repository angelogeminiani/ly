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

package org.ly.packages.mongo.impl;

import com.mongodb.DB;
import org.json.JSONObject;
import org.ly.Smartly;
import org.ly.SmartlyPathManager;
import org.ly.commons.util.FormatUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * User: angelo.geminiani
 */
public class MongoDBConnectionFactory {

    private MongoDBConnectionFactory() {
    }

    // ------------------------------------------------------------------------
    //                      S T A T I C
    // ------------------------------------------------------------------------

    private static Map<String, MongoDBConnection> _connections = new HashMap<String, MongoDBConnection>();

    private static MongoDBConnection getConn(final String dbName) {
        if (!_connections.containsKey(dbName)) {
            final JSONObject config = SmartlyPathManager.getConfiguration(MongoDBConnectionFactory.class).getJSONObject("databases." + dbName);
            if (null != config) {
                _connections.put(dbName, new MongoDBConnection(config));
            }
        }
        return _connections.get(dbName);
    }

    public static boolean hasDBConnection(final String name) {
        try {
            return null != getDB(name);
        } catch (Throwable ignored) {
        }
        return false;
    }

    public static MongoDBConnection getConnection(final String dbName) throws StandardCodedException {
        final MongoDBConnection conn = getConn(dbName);
        if (null != conn) {
            return conn;
        } else {
            throw new StandardCodedException(
                    FormatUtils.format(
                            "DATABASE NOT FOUND IN CONFIGURATION FOLDER: '{0}'",
                            dbName));
        }
    }

    public static DB getDB(final String dbName) throws StandardCodedException {
        final MongoDBConnection connection = getConnection(dbName);
        return null != connection ? connection.getDB() : null;
    }


    public static String[] getLanguages() {
        return Smartly.getLanguages();
    }
}
