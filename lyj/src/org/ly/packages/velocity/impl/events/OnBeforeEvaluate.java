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

package org.ly.packages.velocity.impl.events;

import org.apache.velocity.VelocityContext;
import org.ly.commons.event.Event;

/**
 *
 * @author angelo.geminiani
 */
public class OnBeforeEvaluate extends Event {

    public static final String NAME = "onBeforeEvaluate";

    public OnBeforeEvaluate(final Object sender) {
        super(sender, NAME);
    }

    public OnBeforeEvaluate(final Object sender, final VelocityContext context) {
        super(sender, NAME, context);
    }

    public void setContext(final VelocityContext context){
        super.setData(context);
    }

    public VelocityContext getContext(){
        return (VelocityContext) super.getData();
    }
}
