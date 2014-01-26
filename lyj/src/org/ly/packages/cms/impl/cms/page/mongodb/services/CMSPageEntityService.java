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
package org.ly.packages.cms.impl.cms.page.mongodb.services;

import com.mongodb.DBObject;
import org.ly.Smartly;
import org.ly.packages.cms.impl.cms.page.mongodb.CMSDBFactory;
import org.ly.packages.cms.impl.cms.page.mongodb.entities.CMSPageEntity;
import org.ly.packages.mongo.impl.AbstractMongoService;
import org.ly.packages.mongo.impl.StandardCodedException;

/**
 * @author angelo.geminiani
 */
public class CMSPageEntityService extends AbstractMongoService {

    // ------------------------------------------------------------------------
    //                      Constants
    // ------------------------------------------------------------------------
    private static String[] LOCALFIELDS = new String[]{};

    // ------------------------------------------------------------------------
    //                      Constructor
    // ------------------------------------------------------------------------
    public CMSPageEntityService() throws StandardCodedException {
        super(CMSDBFactory.getInstance().getDBMain(),
                CMSPageEntity.COLLECTION,
                Smartly.getLanguages());
    }

    // ------------------------------------------------------------------------
    //                      public
    // ------------------------------------------------------------------------

    public DBObject getById(final String id) {
        final DBObject object = super.findById(id);
        return object;
    }

    @Override
    public int upsert(final DBObject object) throws StandardCodedException {
        return super.upsert(object);
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------


    // --------------------------------------------------------------------
    //               S T A T I C
    // --------------------------------------------------------------------

    public static DBObject getPage(final String url) {
        try {
            final String id = url.replaceAll("/", "");
            final CMSPageEntityService srvc = new CMSPageEntityService();
            return srvc.getById(id);
        } catch (Throwable ignored) {
        }
        return null;
    }
}
