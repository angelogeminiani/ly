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

package org.ly.packages.http.impl.handlers.websocket;


import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;

/**
 */
@org.eclipse.jetty.websocket.api.annotations.WebSocket
public class ChatWebSocket {

    @OnWebSocketConnect
    public void onOpen(final Session connection) {
        //To change body of implemented methods use File | Settings | File Templates.
        System.out.println("OPEN: " + connection.toString());
    }


    @OnWebSocketClose
    public void onClose(Session connection,
                        int statusCode, String reason) {
        // WebSocket is now disconnected
        System.out.println("CLOSE: " + reason);
    }

    @OnWebSocketMessage
    public void onTextMethod(Session connection,
                             String message) {
        // simple TEXT message received, with Connection
        // that it occurred on.
        System.out.println("MESSAGE: " + message);
        System.out.println(connection.toString());
    }

    @OnWebSocketMessage
    public void onBinaryMethod(Session connection,
                               byte data[], int offset,
                               int length) {
        // simple BINARY message received, with Connection
        // that it occurred on.
        System.out.println("BINARY");
    }
}
