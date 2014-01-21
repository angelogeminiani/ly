package org.ly.commons.network.socket.server.handlers.impl;

import org.ly.commons.network.socket.server.handlers.ISocketFilter;
import org.ly.commons.network.socket.server.handlers.SocketRequest;
import org.ly.commons.network.socket.server.handlers.SocketResponse;

public class FilterEchoNull implements ISocketFilter {

    public boolean handle(final SocketRequest request, final SocketResponse response) {
        return true;
    }
}
