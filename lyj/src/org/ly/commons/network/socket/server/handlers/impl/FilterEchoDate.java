package org.ly.commons.network.socket.server.handlers.impl;

import org.ly.commons.network.socket.server.handlers.ISocketFilter;
import org.ly.commons.network.socket.server.handlers.SocketRequest;
import org.ly.commons.network.socket.server.handlers.SocketResponse;

import java.util.Date;

public class FilterEchoDate implements ISocketFilter {

    public boolean handle(final SocketRequest request, final SocketResponse response) {
        response.write(new Date());
        return true;
    }
}
