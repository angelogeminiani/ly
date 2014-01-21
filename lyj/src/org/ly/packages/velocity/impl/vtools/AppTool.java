package org.ly.packages.velocity.impl.vtools;


import org.ly.Smartly;
import org.ly.commons.io.jsonrepository.JsonRepository;
import org.ly.commons.util.JsonWrapper;

public class AppTool implements IVLCTool {

    public static final String NAME = "app";

    @Override
    public String getName() {
        return NAME;
    }

    public JsonRepository getConfiguration() {
        return Smartly.getConfiguration();
    }

    public String[] getLangArray() {
        return Smartly.getLanguages();
    }

    public JsonWrapper getLangMap() {
        return Smartly.getLanguagesHelper();
    }

    public boolean isDebug() {
        return Smartly.isDebugMode();
    }

    public String getLang() {
        return Smartly.getLang();
    }

}
