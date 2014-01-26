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

package org.ly.packages.pdf.impl;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.util.ImageIOUtil;
import org.ly.commons.Delegates;
import org.ly.commons.async.Async;
import org.ly.commons.logging.Level;
import org.ly.commons.logging.Logger;
import org.ly.commons.logging.util.LoggingUtils;
import org.ly.commons.util.PathUtils;
import org.ly.commons.util.StringUtils;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.*;

/**
 * utility to PDF conversion
 */
public final class PDFUtils {

    private static final String SUFFIX_PAGE = "_pg_";
    private static final String EXT_IMAGE = "jpg";

    public static void forEachPage(final File pdfFile,
                                   final boolean nonSequential,
                                   Delegates.Function<Boolean> callback) throws IOException {
        final PDDocument doc = nonSequential ? PDDocument.loadNonSeq(pdfFile, null) : PDDocument.load(pdfFile);
        try {
            final List<PDPage> pages = doc.getDocumentCatalog().getAllPages();
            final int len = pages.size();
            int count = 1;
            for (final PDPage page : pages) {
                if (null != callback) {
                    if (callback.handle(page, count, len)) {
                        count++;
                    } else {
                        break;
                    }
                }
            }
        } finally {
            doc.close();
        }
    }

    public static int countPages(final File pdfFile) {
        try {
            final PDDocument doc = PDDocument.load(pdfFile);
            try {
                return doc.getDocumentCatalog().getAllPages().size();
            } finally {
                doc.close();
            }
        } catch (Throwable ignored) {
        }
        return 0;
    }

    public static List<String> toImage(final File pdfFile,
                                       final String outputRoot,
                                       final boolean nonSequential) throws IOException {
        final int imageType = BufferedImage.TYPE_INT_RGB;
        final int resolution = 96;
        return toImage(pdfFile, outputRoot, nonSequential, imageType, resolution, 0, 0);
    }

    public static List<String> toImage(final File pdfFile,
                                       final String outputRoot,
                                       final boolean nonSequential,
                                       final int imageType,
                                       final int resolution,
                                       final int fromPage,
                                       final int toPage) throws IOException {
        final List<String> pages = new LinkedList<String>();
        final String name = PathUtils.getFilename(pdfFile.getName(), false);
        forEachPage(pdfFile, nonSequential, new Delegates.Function<Boolean>() {
            @Override
            public Boolean handle(Object... args) {
                try {
                    final PDPage page = (PDPage) args[0];
                    final int index = (Integer) args[1]; // base 1
                    final int count = (Integer) args[2]; // total pages
                    if (isInRange(index, fromPage, toPage)) {
                        final String image_name = PathUtils.concat(outputRoot,
                                name.concat(SUFFIX_PAGE).concat(index + ""));// .concat(".").concat(EXT_IMAGE));
                        final String image_path = image_name.concat(".").concat(EXT_IMAGE);

                        final BufferedImage image = page.convertToImage(imageType, resolution);
                        ImageIOUtil.writeImage(image, EXT_IMAGE, image_name, imageType, resolution); // save image and add extension

                        pages.add(image_path);

                    }
                    return true;
                } catch (Throwable t) {
                    getLogger().log(Level.SEVERE, null, t);
                }
                return false;
            }
        });
        return pages;
    }

    public static Set<String> toImageAsync(final File pdfFile,
                                           final String outputRoot,
                                           final boolean nonSequential,
                                           final int imageType,
                                           final int resolution,
                                           final int fromPage,
                                           final int toPage) throws IOException {
        final Map<String, PDPage> pages = new LinkedHashMap<String, PDPage>();
        final String name = PathUtils.getFilename(pdfFile.getName(), false);
        // fill lists with pages and image names
        forEachPage(pdfFile, nonSequential, new Delegates.Function<Boolean>() {
            @Override
            public Boolean handle(Object... args) {
                try {
                    final PDPage page = (PDPage) args[0];
                    final int index = (Integer) args[1]; // base 1
                    final int count = (Integer) args[2]; // total pages

                    if (isInRange(index, fromPage, toPage)) {
                        final String image_name = PathUtils.concat(outputRoot,
                                name.concat(SUFFIX_PAGE).concat(index + ".").concat(EXT_IMAGE));
                        pages.put(image_name, page);

                    }
                    return true;
                } catch (Throwable t) {
                    getLogger().log(Level.SEVERE, null, t);
                }
                return false;
            }
        });

        // start rendering async all images but return names of pages that will be generated
        Async.Action(new Delegates.Action() {
            @Override
            public void handle(Object... args) {
                final Set<String> page_names = pages.keySet();
                for (final String page_name : page_names) {
                    try {
                        final PDPage page = pages.get(page_name);
                        final String image_name = StringUtils.replace(page_name, "." + EXT_IMAGE, "");
                        final BufferedImage image = page.convertToImage(imageType, resolution);
                        ImageIOUtil.writeImage(image, EXT_IMAGE, image_name, imageType, resolution); // save image and add extension
                    } catch (Throwable ignored) {
                    }
                }
            }
        });

        return pages.keySet();
    }

    public static List<BufferedImage> toImage(final File pdfFile,
                                              final boolean nonSequential) throws IOException {
        final int imageType = BufferedImage.TYPE_INT_RGB;
        final int resolution = 96;
        return toImage(pdfFile, nonSequential, imageType, resolution, 0, 0);
    }

    public static List<BufferedImage> toImage(final File pdfFile,
                                              final boolean nonSequential,
                                              final int imageType,
                                              final int resolution,
                                              final int fromPage,
                                              final int toPage) throws IOException {
        final List<BufferedImage> pages = new LinkedList<BufferedImage>();
        forEachPage(pdfFile, nonSequential, new Delegates.Function<Boolean>() {
            @Override
            public Boolean handle(Object... args) {
                try {
                    final PDPage page = (PDPage) args[0];
                    final int index = (Integer) args[1]; // base 1
                    final int count = (Integer) args[2]; // total pages
                    if (isInRange(index, fromPage, toPage)) {
                        final BufferedImage image = page.convertToImage(imageType, resolution);
                        pages.add(image);

                    }
                    return true;
                } catch (Throwable t) {
                    getLogger().log(Level.SEVERE, null, t);
                }
                return false;
            }
        });
        return pages;
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private static Logger getLogger() {
        return LoggingUtils.getLogger(PDFUtils.class);
    }

    private static boolean isInRange(final int index, final int from, final int to) {
        if (from > 0 && to > 0) {
            return index >= from && index <= to;
        }
        return true;
    }

}
