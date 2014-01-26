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

package org.ly.packages.http.impl.handlers.rest;


import org.eclipse.jetty.http.HttpStatus;
import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.json.JSONObject;
import org.ly.commons.logging.Logger;
import org.ly.commons.logging.util.LoggingUtils;
import org.ly.commons.util.DateUtils;
import org.ly.commons.util.StringUtils;
import org.ly.commons.remoting.rest.RESTRegistry;
import org.ly.commons.remoting.rest.wrapper.MethodWrapper;
import org.ly.packages.http.impl.util.ServletUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


/**
 * Standard REST handler.
 */
public class SmartlyRESTHandler extends ContextHandler {

    private static final String DEFAULT_ENDPOINT = "/rest";



    public SmartlyRESTHandler() {
        super.setContextPath(DEFAULT_ENDPOINT);
    }

    @Override
    public void setContextPath(final String contextPath) {
        super.setContextPath(contextPath);
    }

    @Override
    public void doHandle(final String target,
                         final Request baseRequest,
                         final HttpServletRequest request,
                         final HttpServletResponse response) throws IOException, ServletException {
        baseRequest.setHandled(true);
        this.handleInternal(target, baseRequest, request, response);
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private Logger getSmartlyLogger() {
        return LoggingUtils.getLogger(this);
    }

    private void handleInternal(final String target,
                                final Request baseRequest,
                                final HttpServletRequest request,
                                final HttpServletResponse response) throws IOException, ServletException {
        final String method = request.getMethod();
        final String s1 = request.getRequestURI();
        final String path = request.getPathInfo();
        final String endPoint = request.getContextPath();


        if (StringUtils.hasText(path)) {
            final JSONObject formParams = ServletUtils.getParameters(request);
            final MethodWrapper mw = RESTRegistry.getMethod(method, path);
            if (null != mw) {
                final byte[] bytes = mw.execute(path, formParams);
                ServletUtils.writeResponse(response, DateUtils.now().getTime(), mw.getTypeOutput(), bytes);
            } else {
                response.sendError(HttpStatus.FORBIDDEN_403);
            }
        }
    }


}
