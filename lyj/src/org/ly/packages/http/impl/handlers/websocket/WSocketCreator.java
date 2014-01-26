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

import org.eclipse.jetty.websocket.api.UpgradeRequest;
import org.eclipse.jetty.websocket.api.UpgradeResponse;
import org.eclipse.jetty.websocket.servlet.WebSocketCreator;

import java.io.IOException;

/**
 */
public class WSocketCreator implements WebSocketCreator {


    @Override
    public Object createWebSocket(final UpgradeRequest req, final UpgradeResponse resp) {
        final String url = req.getRequestURI().toString();
        String query = req.getParameterMap().toString();

        for (String protocol : req.getSubProtocols()) {
            switch (protocol) {
                case "org.ietf.websocket.test-echo":
                case "echo":
                    resp.setAcceptedSubProtocol(protocol);
                    // TODO: how is this different than "echo-assemble"?
                    //return bigEchoSocket;
                case "org.ietf.websocket.test-echo-broadcast":
                case "echo-broadcast":
                    resp.setAcceptedSubProtocol(protocol);
                    //return new EchoBroadcastSocket();
                case "echo-broadcast-ping":
                    resp.setAcceptedSubProtocol(protocol);
                    //return new EchoBroadcastPingSocket();
                case "org.ietf.websocket.test-echo-assemble":
                case "echo-assemble":
                    resp.setAcceptedSubProtocol(protocol);
                    // TODO: how is this different than "test-echo"?
                    //return bigEchoSocket;
                case "org.ietf.websocket.test-echo-fragment":
                case "echo-fragment":
                    resp.setAcceptedSubProtocol(protocol);
                    //return echoFragmentSocket;
                default:
                    //return logSocket;
            }
        }

        // Start looking at the UpgradeRequest to determine what you want to do
        if ((query == null) || (query.length() <= 0)) {
            try {
                // Let UPGRADE request for websocket fail with
                // status code 403 (FORBIDDEN) [per RFC-6455]
                resp.sendForbidden("Unspecified query");
            } catch (IOException e) {
                // An input or output exception occurs
                e.printStackTrace();
            }

            // No UPGRADE
            return null;
        }

        // Create the websocket we want to
        if (query.contains("bigecho")) {
            return new ChatWebSocket();
        } else if (query.contains("echo")) {
            // return new MyEchoSocket();
        } else {
            return new ChatAdapter();
        }
        return null;
    }

}
