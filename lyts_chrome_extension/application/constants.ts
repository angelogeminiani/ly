import {LogLevel} from "../../lyts/lyts_core/commons/console";

const IS_LOCALE: boolean = true;
// locale endpoint
const HOST_LOCALE: string = "http://localhost:4199";
// production endpoint
const HOST: string = "https://your.domain.com:4199";

const constants = {

    app_name: "sample_app",
    uid: "my-sample-app",
    version: "1.0.2",

    LOG_LEVEL: LogLevel.debug, // set to LogLevel.error to avoid verbose logging

    // -- host -- //
    host: IS_LOCALE ? HOST_LOCALE : HOST,
    server_namespace: "org_lyts", // AUTOMATO app server (see: /lyts_server/...)

    // APP IDENTIFIER
    APP_TOKEN: "iuhdiu87w23ruh897dfyc2w3r",

    // BUS EVENTS
    ONBUS_USER_ON: "onbus_user_on",
    ONBUS_USER_OFF: "onbus_user_off",
    ONBUS_USER_IMAGE: "onbus_user_image",
    ONBUS_NETWORK_ON: "onbus_network_on",
    ONBUS_NETWORK_OFF: "onbus_network_off",

    // IMG
    IMAGE_USER: "build/assets/images/user.png",

    // STYLE CLASSES
    CLASS_HIDDEN: "hidden",

};

export default constants;
