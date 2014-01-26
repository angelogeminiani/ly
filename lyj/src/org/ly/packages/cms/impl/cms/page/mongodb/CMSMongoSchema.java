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
import org.ly.commons.logging.Level;
import org.ly.commons.logging.util.LoggingUtils;
import org.ly.commons.util.FormatUtils;


/**
 * Ensure Indexes for collections
 *
 * @author angelo.geminiani
 */
public class CMSMongoSchema {

    public static void init() {
        try {
            final DB db = CMSDBFactory.getInstance().getDBMain();

            //initTargetSchema();

        } catch (Throwable t) {
            LoggingUtils.getLogger(CMSDBFactory.class).log(Level.SEVERE,
                    FormatUtils.format("Error initilizing Schema: {0}", t), t);
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    /*
    private static void initTargetSchema() {
        try {
            final QRTargetService srvc = new QRTargetService();

            // userid 
            srvc.ensureIndex(QRTarget.USER_ID, false);

            // keywords 
            srvc.ensureIndex(QRTarget.KEYWORDS, false);

            // userid + keywords
            srvc.ensureIndex(new String[]{
                    QRTarget.USER_ID,
                    QRTarget.KEYWORDS
            }, false, false);

        } catch (Throwable t) {
            LoggingUtils.getLogger(QRMongoSchema.class).log(Level.SEVERE,
                    FormatUtils.format("Schema error on '{0}': {1}",
                            QRTarget.COLLECTION, t), t);
        }
    } */


}
