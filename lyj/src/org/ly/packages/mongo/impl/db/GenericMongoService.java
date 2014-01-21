/*
 * 
 */
package org.ly.packages.mongo.impl.db;

import com.mongodb.DB;
import org.ly.packages.mongo.impl.AbstractMongoService;
import org.ly.packages.mongo.impl.StandardCodedException;

/**
 * @author angelo.geminiani
 */
public class GenericMongoService extends AbstractMongoService {

    public GenericMongoService(
            final DB db,
            final String collName,
            final String[] langCodes) throws StandardCodedException {
        super(db, collName, langCodes);
    }
}
