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

package org.ly.packages.mongo.impl.db.service.tasks.analytics;

import org.ly.commons.logging.Level;
import org.ly.commons.logging.Logger;
import org.ly.commons.logging.util.LoggingUtils;
import org.ly.packages.mongo.impl.db.service.MongoAnalyticsService;

/**
 * User: angelo.geminiani
 */
public class AnalyticsTask implements Runnable {

    private final AnalyticsData _data;

    public AnalyticsTask(final AnalyticsData data) {
        _data = data;
    }

    @Override
    public void run() {
        try {
            MongoAnalyticsService.insertNew(_data);
        } catch (Throwable t) {
            this.getLogger().log(Level.SEVERE, null, t);
        }
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private Logger getLogger() {
        return LoggingUtils.getLogger(this);
    }


    // ------------------------------------------------------------------------
    //                      S T A T I C
    // ------------------------------------------------------------------------

    public static void insertNew(final String jsondata) {
        final AnalyticsData data = new AnalyticsData(jsondata);
        AnalyticsTask.insertNew(data);
    }

    public static void insertNew(final AnalyticsData data) {
        final Runnable runnable = new AnalyticsTask(data);
        final Thread thread = new Thread(runnable);
        thread.start();
    }
}
