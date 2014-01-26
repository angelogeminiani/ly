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

package org.ly.packages.mongo.impl;

import org.ly.IConstants;

/**
 *
 * @author angelo.geminiani
 */
public interface IMongoConstants {

    //-- --//
    public static final String DB_ADMIN = "admin";
    public static final String COLL_SYSTEMUSERS = "system.users";
    //-- fields --//
    public static final String ID = "_id";
    public static final String CREATIONDATE = "creationDate";
    public static final String VALUE = "value";
    public static final String VALUES = "values";
    public static final String KEYWORDS = "keywords";

    public static final String WILDCHAR = IConstants.PATH_WHILDCHAR;

    public static final String LANG_BASE = "base";
    public static final String FIELD_LOCALIZATIONS = "localizations"; //
    public static final String FIELD_LANG = "lang";

    //-- OPERATORS --//
    public static final String OP_GT = "$gt";
    public static final String OP_GTE = "$gte";
    public static final String OP_LT = "$lt";
    public static final String OP_LTE = "$lte";
    public static final String OP_IN = "$in";
    public static final String OP_NIN = "$nin";
    public static final String OP_NE = "$ne";
    public static final String OP_EXISTS = "$exists";
    public static final String OP_SIZE = "$size";
    public static final String OP_OR = "$or";
    public static final String OP_AND = "$and";
    public static final String OP_ELEMMATCH = "$elemMatch"; // lookup value in array of objects

    //-- MODIFIERS --//
    //-- http://www.mongodb.org/display/DOCS/Updating --//
    /**
     * { $set : { x : 1 , y : 2 } } <br/>
     * sets field to value.<br/>
     * All datatypes are supported with $set.
     **/
    public static final String MO_SET = "$set"; // { $set : { x : 1 , y : 2 } }
    /** 
     * Deletes a given field. v1.3+
     **/
    public static final String MO_UNSET = "$unset"; // { $unset : { field : 1} }
    /**
     * { $inc : { field : value } }<br/>
     * increments field by the number value if field is present in the object,
     * otherwise sets field to the number value
     **/
    public static final String MO_INC = "$inc"; // { $inc : { field : value } }
    /** 
     * appends value to field, if field is an existing array,
     * otherwise sets field to the array [value] if field is not present.
     * If field is present but is not an array, an error condition is raised.
     **/
    public static final String MO_PUSH = "$push"; // { $push : { field : value } }
    /**
     * appends each value in value_array to field, if field is an existing
     * array, otherwise sets field to the array value_array if field is not
     * present. If field is present but is not an array, an error
     * condition is raised.
     **/
    public static final String MO_PUSHALL = "$pushAll"; // { $pushAll : { field : value_array } }
    /**
     * { $addToSet : { field : value } }
     * Adds value to the array only if its not in the array already, if field
     * is an existing array, otherwise sets field to the array value if field is not present.
     * If field is present but is not an array, an error condition is raised.
     * { $addToSet : { a : { $each : [ 3 , 5 , 6 ] } } }
     **/
    public static final String MO_ADDTOSET = "$addToSet"; // { $addToSet : { field : value } }
    /** 
     * removes the last element in an array: { $pop : { field : 1  } } <br/>
     * removes the first element in an array: { $pop : { field : -1  } }
     **/
    public static final String MO_POP = "$pop"; // { $pop : { field : 1  } }
    /**
     * { $pull : { field : _value } } <br/>
     * removes all occurrences of value from field, if field is an array. 
     * If field is present but is not an array, an error condition is raised.
     * In addition to matching an exact value you can also use expressions 
     * ($pull is special in this way):
     * { $pull : { field : {field2: value} } } 
     * removes array elements with field2 matching value
     * { $pull : { field : {$gt: 3} } } 
     * removes array elements greater than 3
     * { $pull : { field : {<match-criteria>} } } 
     * removes array elements meeting match criteria
     **/
    public static final String MO_PULL = "$pull"; // { $pull : { field : _value } }
    /**
     * { $pullAll : { field : value_array } }<br/>
     * removes all occurrences of each value in value_array from field, 
     * if field is an array. If field is present but is not an array, 
     * an error condition is raised.
     */
    public static final String MO_PULLALL = "$pullAll";
    /**
     * { $rename : { old_field_name : new_field_name } }<br/>
     * Renames the field with name 'old_field_name' to 'new_field_name'.
     * Does not expand arrays to find a match for 'old_field_name'.
     */
    public static final String MO_RENAME = "$rename";
    /**
     * {$bit : { field : {and : 5}}}<br/>
     * {$bit : {field : {or : 43}}}<br/>
     * {$bit : {field : {and : 5, or : 2}}}<br/>
     * Does a bitwise update of field. Can only be used with integers.
     */
    public static final String MO_BIT = "$bit";
}
