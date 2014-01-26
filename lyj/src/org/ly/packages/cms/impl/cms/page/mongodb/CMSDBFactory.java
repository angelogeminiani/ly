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
package org.ly.packages.cms.impl.cms.page.mongodb;

import com.mongodb.DB;
import org.ly.commons.util.StringUtils;
import org.ly.packages.mongo.impl.MongoDBConnectionFactory;
import org.ly.packages.mongo.impl.StandardCodedException;

/**
 * @author angelo.geminiani
 */
public class CMSDBFactory {

    public static String DB_MAIN = "MONGO_cms";       // main db

    public final DB getDBMongo(final String dbname)
            throws StandardCodedException {
        if (StringUtils.hasText(dbname)) {
            return MongoDBConnectionFactory.getDB(dbname);
        } else {
            return this.getDBMain();
        }
    }

    public final DB getDBMain()
            throws StandardCodedException {
        return MongoDBConnectionFactory.getDB(DB_MAIN);
    }


    // ------------------------------------------------------------------------
    //                      S T A T I C
    // ------------------------------------------------------------------------
    private static CMSDBFactory __instance;

    public static CMSDBFactory getInstance() {
        if (null == __instance) {
            __instance = new CMSDBFactory();
        }
        return __instance;
    }


}
