package org.ly.commons.network.socket.server;

import org.ly.commons.network.socket.messages.multipart.MultipartMessagePart;

/**
 * Server Wrapper to expose only some properties and methods to request handlers
 */
public class SocketRequestServer {

    private final Server _server;

    public SocketRequestServer(Server server) {
        _server = server;
    }

    public void addMultipartMessagePart(final MultipartMessagePart part) {
        _server.addMultipartMessagePart(part);
    }
}
