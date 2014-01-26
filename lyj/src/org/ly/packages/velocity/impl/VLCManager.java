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
 * 
 */
package org.ly.packages.velocity.impl;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.ly.commons.lang.CharEncoding;
import org.ly.commons.util.RegExUtils;
import org.ly.packages.velocity.impl.engine.VLCEngine;
import org.ly.packages.velocity.impl.vtools.toolbox.VLCToolbox;

import java.io.StringWriter;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Singleton helper for velocity engine.
 *
 * @author Gian Angelo Geminiani
 */
public class VLCManager implements IVLCCostants {

    private VLCEngine _engine;

    private VLCManager() {
    }

    public String evaluateText(final String templateName,
                               final String vlcText,
                               final Map<String, Object> contextData) throws Exception {
        final VelocityContext context = getContext(contextData);
        return this.evaluate(null, templateName, vlcText, context);
    }

    public String evaluateText(final VelocityEngine engine,
                               final String templateName,
                               final String vlcText,
                               final Map<String, Object> contextData) throws Exception {
        final VelocityContext context = getContext(contextData);
        return this.evaluate(engine, templateName, vlcText, context);
    }

    public String evaluateText(final String templateName,
                               final String vlcText,
                               final VelocityContext context) throws Exception {
        return this.evaluate(null, templateName, vlcText, context);
    }

    public String evaluateText(final VelocityEngine engine,
                               final String templateName,
                               final String vlcText,
                               final VelocityContext context) throws Exception {
        return this.evaluate(engine, templateName, vlcText, context);
    }

    public String mergeTemplate(final String templateName,
                                final Map<String, Object> contextData) throws Exception {
        final VelocityContext context = getContext(contextData);
        return this.merge(null, templateName, context);
    }

    public VLCEngine getEngine() {
        if (null == _engine) {
            _engine = new VLCEngine();
        }
        return _engine;
    }

    public VLCToolbox getToolbox() {
        return VLCToolbox.getInstance();
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------
    private VelocityEngine getNativeEngine() throws Exception {
        if (null == _engine) {
            _engine = new VLCEngine();
        }
        return _engine.getNativeEngine();
    }

    private String replaceUnsolvedVariables(final String text) {
        if(!replaceUnsolved){
           return text;
        }
        final StringBuffer sb = new StringBuffer();
        final Pattern p = Pattern.compile(RegExUtils.VELOCITY_VARIABLES);
        final Matcher m = p.matcher(text);
        boolean result = m.find();
        // Loop through and add mathes
        while (result) {
            final String key = m.group();
            m.appendReplacement(sb, key.replaceAll("\\$", "#").
                    replaceAll("\\{", "").
                    replaceAll("\\}", ""));
            result = m.find();
        }
        // Add the last segment of input to 
        // the new String
        m.appendTail(sb);
        return sb.toString();
    }

    private String evaluate(final VelocityEngine engine,
                            final String templateName,
                            final String vlcText,
                            final VelocityContext context) throws Exception {
        //-- evaluate template --//
        final VelocityEngine velocity = null!=engine?engine:this.getNativeEngine();
        final StringWriter writer = new StringWriter();
        velocity.evaluate(context, writer, templateName, vlcText);

        return this.replaceUnsolvedVariables(writer.toString());
    }

    private String merge(final VelocityEngine engine,
                         final String templateName,
                         final VelocityContext context) throws Exception {
        //-- evaluate template --//
        final VelocityEngine velocity = null!=engine?engine:this.getNativeEngine();
        final StringWriter writer = new StringWriter();

        final Template template = velocity.getTemplate(templateName, CharEncoding.getDefault());
        template.merge(context, writer);

        return this.replaceUnsolvedVariables(writer.toString());
    }

    // ------------------------------------------------------------------------
    //                      S T A T I C
    // ------------------------------------------------------------------------
    public static boolean replaceUnsolved = false;
    private static VLCManager _instance;

    public static VLCManager getInstance() {
        if (null == _instance) {
            _instance = new VLCManager();
        }
        return _instance;
    }


    private static VelocityContext getContext(final Map<String, Object> contextData) {
        return null != contextData && !contextData.isEmpty()
                ? new VelocityContext(contextData, VLCToolbox.getInstance().getToolsContext())
                : new VelocityContext(VLCToolbox.getInstance().getToolsContext());
    }
}
