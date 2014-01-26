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

package org.ly.packages.http.impl.util.client;

import org.eclipse.jetty.client.HttpClient;
import org.eclipse.jetty.client.api.ContentResponse;

/**
 * Simple Jetty client
 * <p/>
 * http://wiki.eclipse.org/Jetty/Tutorial/HttpClient
 */
public class Client {

    public Client() {
        HttpClient client = new HttpClient();
    }

    public String doGET(final String url) throws Exception {
        final HttpClient client = this.createClient();
        client.start();

        final ContentResponse response = client.GET(url);
        return response.getContentAsString();
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private HttpClient createClient() {
        HttpClient client = new HttpClient();
        //client.setConnectorType(HttpClient.CONNECTOR_SELECT_CHANNEL);
        client.setMaxConnectionsPerDestination(200); // max 200 concurrent connections to every address
        //client.setThreadPool(new QueuedThreadPool(250)); // max 250 threads
        client.setConnectTimeout(30000); // 30 seconds timeout; if no server reply, the request expires
        return client;
    }

}
