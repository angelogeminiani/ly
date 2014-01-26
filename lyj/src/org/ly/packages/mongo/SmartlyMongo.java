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

package org.ly.packages.mongo;


import org.ly.SmartlyPathManager;
import org.ly.packages.AbstractPackage;
import org.ly.packages.ISmartlySystemPackage;

public class SmartlyMongo extends AbstractPackage
        implements ISmartlySystemPackage {

    public static final String NAME = "smartly_mongo";

    public SmartlyMongo() {
        super(NAME, 1);
        super.setDescription("MongoDB Module");
        super.setMaintainerName("Gian Angelo Geminiani");
        super.setMaintainerMail("angelo.geminiani@gmail.com");
        super.setMaintainerUrl("http://www.smartfeeling.org");

        //-- lib dependencies --//
        super.addDependency("org.mongodb:mongo-java-driver:2.7.3", "");
    }

    @Override
    public void load() throws Exception {
        this.init();
    }

    @Override
    public void ready() {

    }

    // ------------------------------------------------------------------------
    //                      p r i v a t e
    // ------------------------------------------------------------------------

    private void init() {
        final String configurationPath = SmartlyPathManager.getConfigurationPath(SmartlyMongo.class);
        //Smartly.register(new Deployer(configurationPath));
    }

}
