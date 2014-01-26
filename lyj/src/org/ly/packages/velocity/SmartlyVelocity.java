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

package org.ly.packages.velocity;


import org.ly.Smartly;
import org.ly.packages.AbstractPackage;
import org.ly.packages.ISmartlySystemPackage;
//import org.smartly.packages.velocity.config.Deployer;
import org.ly.packages.velocity.impl.VLCManager;

public class SmartlyVelocity extends AbstractPackage
        implements ISmartlySystemPackage {

    public static final String NAME = "smartly_velocity";

    public SmartlyVelocity() {
        super(NAME, 1);
        super.setDescription("Velocity Module");
        super.setMaintainerName("Gian Angelo Geminiani");
        super.setMaintainerMail("angelo.geminiani@gmail.com");
        super.setMaintainerUrl("http://www.smartfeeling.org");

        //-- lib dependencies --//


    }

    @Override
    public void load() {
        //Smartly.register(new Deployer(Smartly.getConfigurationPath()));
    }

    @Override
    public void ready() {
        final String docRoot = (String) Smartly.getConfiguration().get("velocity.doc_root");
        final String absolute = Smartly.getAbsolutePath(docRoot);
        // init velocity engine
        VLCManager.getInstance().getEngine().setFileResourceLoaderPath(absolute);
    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

}
