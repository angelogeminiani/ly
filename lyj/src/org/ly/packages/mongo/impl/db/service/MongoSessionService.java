/*
 * 
 */
package org.ly.packages.mongo.impl.db.service;

import com.mongodb.DB;
import com.mongodb.DBObject;
import org.ly.packages.mongo.impl.AbstractMongoService;
import org.ly.packages.mongo.impl.StandardCodedException;
import org.ly.packages.mongo.impl.db.entity.MongoSession;

/**
 * @author angelo.geminiani
 */
public class MongoSessionService
        extends AbstractMongoService {

    // ------------------------------------------------------------------------
    //                      Constants
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    //                      Constructor
    // ------------------------------------------------------------------------
    public MongoSessionService(final DB db, final String[] langCodes) {
        super(db, MongoSession.COLLECTION, langCodes);
    }
    // ------------------------------------------------------------------------
    //                      public
    // ------------------------------------------------------------------------

    public DBObject getOrCreate(final String userid) throws StandardCodedException {
        DBObject result = super.findById(userid);
        if (null == result) {
            result = new MongoSession();
            MongoSession.setId(result, userid);
            super.upsert(result);
        }
        return result;
    }
}
