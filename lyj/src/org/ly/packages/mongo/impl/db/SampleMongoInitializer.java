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
package org.ly.packages.mongo.impl.db;

import com.mongodb.DB;
import org.ly.packages.mongo.impl.MongoDB;
import org.ly.packages.mongo.impl.StandardCodedException;

/**
 * @author angelo.geminiani
 */
public class SampleMongoInitializer {

    private final MongoDB _mongo;
    private String _dbname;
    private String _username;
    private String _password;

    private SampleMongoInitializer() {
        _mongo = new MongoDB();
        _dbname = "test";
        _username = null;
        _password = null;
    }

    public void initialize(final String host,
                           final int port,
                           final String dbname,
                           final String username,
                           final String password) {
        _dbname = dbname;
        _username = username;
        _password = password;
        _mongo.setHost(host);
        _mongo.setPort(port);
    }

    public final DB getDB()
            throws StandardCodedException {
        return _mongo.getDB(_dbname, _username, _password);
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    private static SampleMongoInitializer __instance;

    public static SampleMongoInitializer getInstance() {
        if (null == __instance) {
            __instance = new SampleMongoInitializer();
        }
        return __instance;
    }


}
