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
package org.ly.packages.mongo.impl.schema;

import com.mongodb.DB;
import org.ly.commons.logging.Level;
import org.ly.commons.logging.Logger;
import org.ly.commons.logging.util.LoggingUtils;
import org.ly.commons.util.FormatUtils;
import org.ly.packages.mongo.impl.db.entity.MongoUser;
import org.ly.packages.mongo.impl.db.service.MongoUserService;

/**
 * Sample Mongo Collections initializer.
 * Ensure Indexes for collections.
 *
 * @author angelo.geminiani
 */
public class MongoSchema {

    private final DB _mongoDb;

    public MongoSchema(final DB mongoDb) {
        _mongoDb = mongoDb;
    }

    public DB getDB() {
        return _mongoDb;
    }

    public void initialize() {
        try {

            // users
            this.initUsersSchema();

        } catch (Throwable t) {
            LoggingUtils.getLogger(MongoSchema.class).log(Level.SEVERE,
                    FormatUtils.format("Error initilizing Schema: {0}", t), t);
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private Logger getLogger() {
        return LoggingUtils.getLogger(this);
    }

    private void checkCollectionExists(final String collName) {
        if (null == _mongoDb.getCollection(collName)) {
            _mongoDb.createCollection(collName, null);
        }
    }

    // Users
    private void initUsersSchema() throws Exception {
        try {
            final MongoUserService srvc = new MongoUserService(_mongoDb,
                    new String[0]);

            this.checkCollectionExists(srvc.getCollectionName());

            // email
            srvc.ensureIndex(MongoUser.EMAIL, true);
            // username
            srvc.ensureIndex(MongoUser.USERNAME, true);

            // password + email
            srvc.ensureIndex(new String[]{MongoUser.PASSWORD, MongoUser.EMAIL}, true, false);
            // password + username
            srvc.ensureIndex(new String[]{MongoUser.PASSWORD, MongoUser.USERNAME}, true, false);


        } catch (Throwable t) {
            this.getLogger().log(Level.SEVERE,
                    FormatUtils.format("Schema error on '{0}': {1}",
                            MongoUser.COLLECTION, t), t);
        }
    }


}
