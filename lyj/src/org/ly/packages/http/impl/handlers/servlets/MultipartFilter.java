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

package org.ly.packages.http.impl.handlers.servlets;

import org.eclipse.jetty.servlets.MultiPartFilter;
import org.ly.commons.util.StringUtils;
import org.ly.packages.http.impl.WebServer;

import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import java.io.File;

/* ------------------------------------------------------------ */
/**
 * Multipart Form Data Filter.
 * <p>
 * This class decodes the multipart/form-data stream sent by a HTML form that uses a file input
 * item.  Any files sent are stored to a temporary file and a File object added to the request
 * as an attribute.  All other values are made available via the normal getParameter API and
 * the setCharacterEncoding mechanism is respected when converting bytes to Strings.
 * <p>
 * If the init parameter "delete" is set to "true", any files created will be deleted when the
 * current request returns.
 * <p>
 * The init parameter maxFormKeys sets the maximum number of keys that may be present in a
 * form (default set by system property org.eclipse.jetty.server.Request.maxFormKeys or 1000) to protect
 * against DOS attacks by bad hash keys.
 * <p>
 * The init parameter deleteFiles controls if uploaded files are automatically deleted after the request
 * completes.
 *
 * Use init parameter "maxFileSize" to set the max size file that can be uploaded.
 *
 * Use init parameter "maxRequestSize" to limit the size of the multipart request.
 *
 */
public class MultipartFilter
        extends MultiPartFilter {

    @Override
    public void init(final FilterConfig filterConfig) throws ServletException {
        final String location = filterConfig.getInitParameter(WebServer.PARAM_MULTIPART_LOCATION);
        if (StringUtils.hasText(location)) {
            filterConfig.getServletContext().setAttribute("javax.servlet.context.tempdir", new File(location));
        }
        super.init(filterConfig);
    }
}
