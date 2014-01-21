/*
 * 
 */

package org.ly.commons.event.impl;

import org.ly.commons.event.Event;
import org.ly.commons.event.IEventListener;

/**
 * Sample IEventListener implementation.
 *
 * @author
 */
public class SampleEventListener
        implements IEventListener {

    public void on(Event event) {
        System.out.println(String.format("Fired event: %s", event));
    }

}
