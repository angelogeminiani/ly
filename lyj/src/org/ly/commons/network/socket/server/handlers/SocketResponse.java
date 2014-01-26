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

package org.ly.commons.network.socket.server.handlers;

/**
 * Response to write to socket
 */
public class SocketResponse {

    private Object _data;
    private boolean _canContinue;

    // --------------------------------------------------------------------
    //               c o n s t r u c t o r s
    // --------------------------------------------------------------------

    public SocketResponse() {
        _canContinue = true;
    }

    // --------------------------------------------------------------------
    //               p u b l i c
    // --------------------------------------------------------------------

    public boolean canHandle() {
        return _canContinue;
    }

    public void stopHandle() {
        _canContinue = false;
    }

    public void write(final Object data) {
        _data = data;
    }

    public Object read() {
        return _data;
    }

    // --------------------------------------------------------------------
    //               p r i v a t e
    // --------------------------------------------------------------------

}
