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
package org.ly.packages.mongo.impl.i18n;

import org.ly.packages.mongo.impl.MongoObject;
import org.ly.packages.mongo.impl.util.MongoUtils;

import java.util.List;

/**
 * Translations have a compount key:
 * collection + entityid + field + lang, i.e. "users-12234-name-it_IT"
 *
 * @author angelo.geminiani
 */
public class MongoTranslation extends MongoObject {

    // ------------------------------------------------------------------------
    //                      Constants
    // ------------------------------------------------------------------------
    public static final String FIELD_NAME = "fieldname";
    public static final String FIELD_ID = "entityid";
    // VALUE
    // public static final String KEYWORDS = "keywords";

    // ------------------------------------------------------------------------
    //                      Constructor
    // ------------------------------------------------------------------------

    public MongoTranslation(final Object entityId, final String field) {
        super.setId(getCompoundId(entityId, field));
        this.setEntityId(entityId.toString());
        this.setFieldName(field);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final MongoTranslation other = (MongoTranslation) obj;
        if ((this.getId() == null) ? (other.getId() != null) : !this.getId().equals(other.getId())) {
            return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 89 * hash + (this.getId() != null ? this.getId().hashCode() : 0);
        return hash;
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public final Object getValue() {
        return MongoUtils.get(this, VALUE);
    }

    public final String getValueAsString() {
        return MongoUtils.getString(this, VALUE);
    }

    public final List getValueAsList() {
        return MongoUtils.getList(this, VALUE);
    }

    public final void setValue(final Object value) {
        if (null != value) {
            super.put(VALUE, value);
        }
    }

    public final String getKeywords() {
        return MongoUtils.getString(this, KEYWORDS);
    }

    public final void setKeywords(final String value) {
        if (null != value) {
            super.put(KEYWORDS, value);
        }
    }

    public final String getEntityId() {
        return MongoUtils.getString(this, FIELD_ID);
    }

    public final void setEntityId(final String value) {
        if (null != value) {
            super.put(FIELD_ID, value);
        }
    }

    public final String getFieldName() {
        return MongoUtils.getString(this, FIELD_NAME);
    }

    public final void setFieldName(final String value) {
        if (null != value) {
            super.put(FIELD_NAME, value);
        }
    }


    // ------------------------------------------------------------------------
    //                      S T A T I C
    // ------------------------------------------------------------------------
    public static String getCompoundId(final Object entityId,
                                       final String field) {
        return MongoUtils.concatId(entityId, field);
    }


}
