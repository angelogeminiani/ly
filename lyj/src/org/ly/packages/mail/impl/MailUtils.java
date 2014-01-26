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

/*
 * MailSender.java
 *
 *
 */
package org.ly.packages.mail.impl;

import org.ly.commons.util.CollectionUtils;
import org.ly.commons.util.MimeTypeUtils;
import org.ly.commons.util.StringUtils;
import org.ly.packages.mail.SmartlyMail;

import java.io.File;
import java.util.Collection;


public final class MailUtils {

    private MailUtils() {
    }

    public static Thread sendMailTo(final String[] to,
                                    final String subject,
                                    final String body) throws Exception {
        final String from = SmartlyMail.getFrom();
        return sendMailTo(from, to, subject, body);
    }

    public static Thread sendMailHTMLTo(final String[] to,
                                        final String subject,
                                        final String body) throws Exception {
        final String from = SmartlyMail.getFrom();
        return sendMailHTMLTo(from, to, subject, body);
    }

    public static Thread sendMailHTMLTo(final String from,
                                        final String[] to,
                                        final String subject,
                                        final String body) throws Exception {
        final String mimeType = MimeTypeUtils.MIME_HTML;
        return sendMailTo(from, to, subject, body, mimeType);
    }

    public static Thread sendMailTo(final String from,
                                    final String[] to,
                                    final String subject,
                                    final String body) throws Exception {
        final String mimeType = MimeTypeUtils.MIME_PLAINTEXT;
        return sendMailTo(from, to, subject, body, mimeType);
    }

    public static Thread sendMailTo(final String from,
                                    final String to,
                                    final String subject,
                                    final String body,
                                    final String mimeType) throws Exception {
        final String[] addresses = parseAddresses(to);
        return sendMailTo(from, addresses, subject, body, mimeType);
    }

    public static Thread sendMailTo(final String from,
                                    final String[] addresses,
                                    final String subject,
                                    final String body,
                                    final String mimeType) throws Exception {
        return sendMailTo(from, addresses, subject, body, mimeType, null);
    }

    public static Thread sendMailTo(final String from,
                                    final String[] addresses,
                                    final String subject,
                                    final String body,
                                    final String mimeType,
                                    final Collection<File> attachments) throws Exception {
        if (null != addresses && addresses.length > 0 && !StringUtils.isNULL(from)) {
            final String smtpHost = SmartlyMail.getHost();
            final int smtpPort = SmartlyMail.getPort();
            final String user = SmartlyMail.getUsername();
            final String password = SmartlyMail.getPassword();
            final boolean TLS = SmartlyMail.getTLS();
            return sendMail(smtpHost,
                    smtpPort,
                    user,
                    password,
                    TLS,
                    from,
                    addresses,
                    subject,
                    body,
                    mimeType,
                    attachments);
        }
        throw new Exception("WRONG PARAMETERS EXCEPTION: Address and Sender cannot be null or empty.");
    }

    // ------------------------------------------------------------------------
    //                  p r i v a t e
    // ------------------------------------------------------------------------

    private static String[] parseAddresses(final String addresses) {
        if (StringUtils.hasText(addresses)) {
            /*
            if (addresses.contains(";")) {
                return StringUtils.split(addresses, ";", true, true);
            } else if (addresses.contains(",")) {
                return StringUtils.split(addresses, ",", true, true);
            } else {
                return new String[]{addresses};
            }*/
            return StringUtils.split(addresses, ";,", true, true, true);
        }
        return null;
    }

    private static Thread sendMail(final String smtpHost,
                                   final int smtpPort,
                                   final String user,
                                   final String password, final boolean TLS,
                                   final String from,
                                   final String[] addresses,
                                   final String subject,
                                   final String content,
                                   final String mimeType,
                                   final Collection<File> attachments) throws Exception {
        if (!StringUtils.isNULL(addresses)) {
            //-- creates message --//
            final RunnablePostman sender = new RunnablePostman();
            //-- fill message --//
            sender.setDebug(SmartlyMail.isDebug());
            sender.setSmtpHost(smtpHost);
            sender.setSmtpPort(smtpPort);
            sender.setUser(user);
            sender.setPassword(password);
            sender.setTLS(TLS);
            sender.setFrom(from);
            sender.addAddresses(addresses);
            sender.setSubject(subject);
            sender.setMailFormat(mimeType);
            sender.setMessage(content);
            if (!CollectionUtils.isEmpty(attachments)) {
                for (final File file : attachments) {
                    sender.addFileAttachment(file);
                }
            }
            final Thread starter = new Thread(sender);
            starter.start();
            return starter;
        }
        throw new Exception("NULL ADDRESS EXCEPTION: Addresses cannot be null object.");
    }


}
