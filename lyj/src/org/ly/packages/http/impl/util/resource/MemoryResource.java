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

package org.ly.packages.http.impl.util.resource;


import org.eclipse.jetty.util.resource.Resource;
import org.ly.commons.util.DateUtils;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.channels.ReadableByteChannel;

public class MemoryResource
        extends Resource {

    private final String _name;
    private final byte[] _content;

    public MemoryResource(final String name, final byte[] content) {
        _name = name;
        _content = content;
    }

    @Override
    public boolean isContainedIn(Resource r) throws MalformedURLException {
        return false;
    }

    @Override
    public void close() {

    }

    @Override
    public boolean exists() {
        return true;
    }

    @Override
    public boolean isDirectory() {
        return false;
    }

    @Override
    public long lastModified() {
        return DateUtils.now().getTime();
    }

    @Override
    public long length() {
        return _content.length;
    }

    @Override
    public URL getURL() {
        return null;
    }

    @Override
    public File getFile() throws IOException {
        return null;
    }

    @Override
    public String getName() {
        return null;
    }

    @Override
    public InputStream getInputStream() throws IOException {
        return new ByteArrayInputStream(_content);
    }

    @Override
    public ReadableByteChannel getReadableByteChannel() throws IOException {
        return null;
    }

    @Override
    public boolean delete() throws SecurityException {
        return false;
    }

    @Override
    public boolean renameTo(Resource dest) throws SecurityException {
        return false;
    }

    @Override
    public String[] list() {
        return new String[0];
    }

    @Override
    public Resource addPath(String path) throws IOException, MalformedURLException {
        return null;
    }

}
