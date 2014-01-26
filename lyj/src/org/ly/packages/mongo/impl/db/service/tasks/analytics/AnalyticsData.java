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

import org.json.JSONObject;
import org.ly.commons.util.JsonWrapper;

/**
 * User: angelo.geminiani
 */
public class AnalyticsData {

    private final JSONObject _data;
    private static final String TARGETID = "targetid";
    private static final String USERID = "userid";
    private static final String USERLANG = "userlang";
    private static final String USERIP = "userip";
    private static final String USERAGENT = "useragent";
    private static final String SCREEN = "screen";
    private static final String LOCATION = "location";
    private static final String LATITUDE = "latitude";
    private static final String LONGITUDE = "longitude";
    private static final String ACCURACY = "accuracy";
    private static final String ALTITUDE = "altitude";
    private static final String SPEED = "speed";
    private static final String HEADING = "heading";

    public AnalyticsData() {
        _data = new JSONObject();
    }

    public AnalyticsData(final String jsondata) {
        _data = JsonWrapper.wrap(jsondata).getJSONObject();
    }

    @Override
    public String toString() {
        return _data.toString();
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public String getTargetId() {
        final String targetid = _data.optString(TARGETID);
        return targetid;
    }

    public void setTargetId(final String value) {
        JsonWrapper.put(_data, TARGETID, value);
    }

    public String getUserId() {
        return _data.optString(USERID);
    }

    public void setUserId(final String value) {
        JsonWrapper.put(_data, USERID, value);
    }

    public String getUserLang() {
        return JsonWrapper.getString(_data, USERLANG);
    }

    public void setUserLang(final String value) {
        JsonWrapper.put(_data, USERLANG, value);
    }

    public String getUserIp() {
        return JsonWrapper.getString(_data, USERIP);
    }

    public void setUserIp(final String value) {
        JsonWrapper.put(_data, USERIP, value);
    }

    public String getUserAgent() {
        return JsonWrapper.getString(_data, USERAGENT);
    }

    public void setUserAgent(final String value) {
        JsonWrapper.put(_data, USERAGENT, value);
    }

    public String getScreen() {
        return JsonWrapper.getString(_data, SCREEN);
    }

    public void setScreen(final String value) {
        JsonWrapper.put(_data, SCREEN, value);
    }

    public int getAccuracy() {
        return JsonWrapper.getInt(this.getLocation(), ACCURACY);
    }

    public void setAccuracy(final int value) {
        JsonWrapper.put(this.getLocation(), ACCURACY, value);
    }

    public double getLatitude() {
        return JsonWrapper.getDouble(this.getLocation(), LATITUDE);
    }

    public void setLatitude(final double value) {
        JsonWrapper.put(this.getLocation(), LATITUDE, value);
    }

    public double getLongitude() {
        return JsonWrapper.getDouble(this.getLocation(), LONGITUDE);
    }

    public void setLongitude(final double value) {
        JsonWrapper.put(this.getLocation(), LONGITUDE, value);
    }

    public double getAltitude() {
        return JsonWrapper.getDouble(this.getLocation(), ALTITUDE);
    }

    public void setAltitude(final double value) {
        JsonWrapper.put(this.getLocation(), ALTITUDE, value);
    }

    public double getSpeed() {
        return JsonWrapper.getDouble(this.getLocation(), SPEED);
    }

    public void setSpeed(final double value) {
        JsonWrapper.put(this.getLocation(), SPEED, value);
    }

    public double getHeading() {
        return JsonWrapper.getDouble(this.getLocation(), HEADING);
    }

    public void setHeading(final double value) {
        JsonWrapper.put(this.getLocation(), HEADING, value);
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private JSONObject getLocation() {
        return JsonWrapper.getJSON(_data, LOCATION);
    }

}
