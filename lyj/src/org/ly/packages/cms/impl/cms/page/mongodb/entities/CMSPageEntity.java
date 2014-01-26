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

package org.ly.packages.cms.impl.cms.page.mongodb.entities;

import com.mongodb.DBObject;
import org.ly.commons.util.StringUtils;
import org.ly.packages.mongo.impl.MongoObject;
import org.ly.packages.mongo.impl.util.MongoUtils;

/**
 * Userpage.
 * Users can create pages and every page is positioned into this collection.
 */
public class CMSPageEntity extends MongoObject {

    // ------------------------------------------------------------------------
    //                      Constants
    // ------------------------------------------------------------------------
    public static final String COLLECTION = "cmspages";

    public static final String PARENT = "parent";
    public static final String TEMPLATE = "template";
    public static final String TITLE = "title";
    public static final String SUBTITLE = "subtitle";
    public static final String DESCRIPTION = "description";
    public static final String KEYWORDS = "keywords";
    public static final String LOGO = "logo";
    public static final String DATA = "data";
    public static final String EXCERPT = "excerpt";
    public static final String CONTENT = "content";

    // --------------------------------------------------------------------
    //               Constructor
    // --------------------------------------------------------------------

    public CMSPageEntity() {
        this.init();
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private void init() {
        CMSPageEntity.setId(this, MongoUtils.createUUID());
    }

    // --------------------------------------------------------------------
    //               S T A T I C
    // --------------------------------------------------------------------

    public static String getId(final DBObject item) {
        return MongoUtils.getString(item, ID);
    }

    public static void setId(final DBObject item, final String value) {
        MongoUtils.put(item, ID, value);
    }

    public static String getParent(final DBObject item) {
        return MongoUtils.getString(item, PARENT);
    }

    public static void setParent(final DBObject item, final String value) {
        MongoUtils.put(item, PARENT, value);
    }

    public static String getTemplate(final DBObject item, final String lang) {
        final String field = TEMPLATE;
        final String result = MongoUtils.getString(item, field.concat("_").concat(lang));
        return StringUtils.hasText(result) ? result : MongoUtils.getString(item, field);
    }

    public static void setTemplate(final DBObject item, final String lang, final String value) {
        final String field = TEMPLATE;
        final String key = StringUtils.hasText(lang) ? field.concat("_").concat(lang) : field;
        MongoUtils.put(item, key, value);
    }

    public static String getTitle(final DBObject item, final String lang) {
        final String field = TITLE;
        final String result = MongoUtils.getString(item, field.concat("_").concat(lang));
        return StringUtils.hasText(result) ? result : MongoUtils.getString(item, field);
    }

    public static void setTitle(final DBObject item, final String lang, final String value) {
        final String field = TITLE;
        final String key = StringUtils.hasText(lang) ? field.concat("_").concat(lang) : field;
        MongoUtils.put(item, key, value);
    }

    public static void setLogo(final DBObject item, final String lang, final String value) {
        final String field = SUBTITLE;
        final String key = StringUtils.hasText(lang) ? field.concat("_").concat(lang) : field;
        MongoUtils.put(item, key, value);
    }

    public static String getSubtitle(final DBObject item, final String lang) {
        final String field = SUBTITLE;
        final String result = MongoUtils.getString(item, field.concat("_").concat(lang));
        return StringUtils.hasText(result) ? result : MongoUtils.getString(item, field);
    }

    public static String getDescription(final DBObject item, final String lang) {
        final String field = DESCRIPTION;
        final String result = MongoUtils.getString(item, field.concat("_").concat(lang));
        return StringUtils.hasText(result) ? result : MongoUtils.getString(item, field);
    }

    public static void setDescription(final DBObject item, final String lang, final String value) {
        final String field = DESCRIPTION;
        final String key = StringUtils.hasText(lang) ? field.concat("_").concat(lang) : field;
        MongoUtils.put(item, key, value);
    }

    public static String getLogo(final DBObject item, final String lang) {
        final String field = LOGO;
        final String result = MongoUtils.getString(item, field.concat("_").concat(lang));
        return StringUtils.hasText(result) ? result : MongoUtils.getString(item, field);
    }


    public static void setSubtitle(final DBObject item, final String lang, final String value) {
        final String field = LOGO;
        final String key = StringUtils.hasText(lang) ? field.concat("_").concat(lang) : field;
        MongoUtils.put(item, key, value);
    }


}
