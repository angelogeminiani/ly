const IS_LOCALE: boolean = true;
const HOST_LOCALE: string = 'https://localhost:4000';
const HOST: string = 'https://api.conversacon.com:4000';

const constants = {

    app_name: "sample_app",
    uid: "my-sample-app",
    version: "1.0.0",

    DEBUG_MODE: false,

    //-- host --//
    //-- host --//
    host: IS_LOCALE ? HOST_LOCALE : HOST,
    server_namespace: 'org_lyts', // AUTOMATO app server (see: /lyts_server/...)

    // APP IDENTIFIER
    APP_TOKEN: "botbuilder_dashboard_uyfgvdjqs6723",


    //-- STANDARD COMPONENTS EVENTS (do not use for native HTMLElement) --//
    EVENT_ON_CLICK: "on_click",

    // BUS EVENTS
    ONBUS_USER_ON: "onbus_user_on",
    ONBUS_USER_OFF: "onbus_user_off",

};

export default constants;