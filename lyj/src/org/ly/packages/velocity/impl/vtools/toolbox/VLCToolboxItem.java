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
package org.ly.packages.velocity.impl.vtools.toolbox;

import org.ly.commons.util.ClassLoaderUtils;
import org.ly.commons.util.CollectionUtils;

import java.util.LinkedList;
import java.util.List;

/**
 * @author angelo.geminiani
 */
public final class VLCToolboxItem {

    // ------------------------------------------------------------------------
    //                      fields
    // ------------------------------------------------------------------------
    private final String _id;
    private final Class _toolClass;
    private final List<Object> _args;
    private Object _toolInstance;
    private boolean _singleton;

    // ------------------------------------------------------------------------
    //                      Constructor
    // ------------------------------------------------------------------------
    public VLCToolboxItem(final String id, final Class toolClass,
                          final Object[] args, final boolean isSingleton) {
        _id = id;
        _toolClass = toolClass;
        _args = new LinkedList<Object>();
        _singleton = isSingleton;
        if (!CollectionUtils.isEmpty(args)) {
            for (final Object arg : args) {
                _args.add(arg);
            }
        }
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 73 * hash + (this._id != null ? this._id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final VLCToolboxItem other = (VLCToolboxItem) obj;
        if ((this._id == null) ? (other._id != null) : !this._id.equals(other._id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        final StringBuilder result = new StringBuilder();
        result.append(_id);
        result.append("{ ");
        result.append(_toolClass.getName());
        result.append("}");
        return result.toString();
    }

    // ------------------------------------------------------------------------
    //                      properties
    // ------------------------------------------------------------------------
    public String getId() {
        return _id;
    }

    public Class getToolClass() {
        return _toolClass;
    }

    public List<Object> getArgs() {
        return _args;
    }

    public boolean isSingleton() {
        return _singleton;
    }

    public void setSingleton(boolean singleton) {
        this._singleton = singleton;
    }

    // ------------------------------------------------------------------------
    //                      p u b l i c
    // ------------------------------------------------------------------------

    public Object getInstance() throws Exception {
        if (null != _toolClass) {
            if (_singleton) {
                if (null == _toolInstance) {
                    _toolInstance = this.createInstance();
                }
            } else {
                _toolInstance = this.createInstance();
            }
        }
        return _toolInstance;
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    private Object createInstance() throws Exception {
        if (CollectionUtils.isEmpty(_args)) {
            return _toolClass.newInstance();
        } else {
            return ClassLoaderUtils.newInstance(_toolClass, _args.toArray(new Object[_args.size()]));
        }
    }
}
