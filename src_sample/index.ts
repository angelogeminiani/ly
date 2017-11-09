import ly from "../src/ly";
import dom, {SelectorParser} from "../src/view/dom";
import lang from "../src/commons/lang";
import PageLogin from "./view/pages/login/PageLogin";
import it from "./i18n/it";
import en from "./i18n/en";


const emitter = new ly.Events();

emitter.on("test", (arg1: any, arg2: any) => {
    console.log("event test", arg1, arg2);
});

console.log("COUNT", emitter.listenerCount("test"));

emitter.emit("test", "HELLO", "HOLA");

emitter.removeAllListeners(["test"]);

emitter.emit("test", "SECOND", "UNHANDLED");

console.log("COUNT", emitter.listenerCount("test"));

console.log("isFunction", ly.lang.isFunction(() => {
}));
console.log("isObject", ly.lang.isObject(123));
console.log("isObject", ly.lang.isObject({}));
console.log("isArray", ly.lang.isArray({}));
console.log("isArray", ly.lang.isArray([]));
console.log("isBoolean", ly.lang.isBoolean({}));
console.log("isBoolean", ly.lang.isBoolean([]));

// cookies
console.log("test-cookie", ly.cookies.read("test-cookie"));
ly.cookies.create("test-cookie", "test " + new Date(), 0);
console.log("test-cookie", ly.cookies.read("test-cookie"));

// browser
ly.browser.onResize((width:any, height:any) => {
    console.log(width, height);
});

// http client
let client = new ly.HttpClient();
// simple get
client.send("get", "http://httpbin.org/ip", {}, null)
    .then((response) => {
        let json: { origin: string } = response.json();
        console.log("RESPONSE", json['origin']);
    })
    .catch((error) => {
        console.log("ERROR", error);
    });

client.send("post", "https://httpbin.org/post", {"param1": 1, "param2": "Hello"}, {"param3": 3, "param4": "World"})
    .then((response) => {
        let json = response.json();
        console.log("RESPONSE", json);
    })
    .catch((error) => {
        console.log("ERROR", error);
    });

// random
console.log("random 1-2", ly.random.rnd(1, 2));
console.log("uniqueId", ly.random.uniqueId("id"));
console.log("uniqueId", ly.random.uniqueId("id"));
console.log("uniqueId", ly.random.uniqueId("id"));
console.log("uniqueId", ly.random.uniqueId("id-"));

// to
console.log("toInt", ly.lang.toInt("wee"));
console.log("toInt", ly.lang.toInt("1"));
console.log("toInt", ly.lang.toInt("1.2"));
console.log("toInt", ly.lang.toInt("6", -1, 3, 7));
console.log("toInt", ly.lang.toInt("10", -1, 3, 7));
console.log("toInt", ly.lang.toInt("1", -1, 3, 7));
console.log("toFloat", ly.lang.toFloat("wee"));
console.log("toFloat", ly.lang.toFloat("1"));
console.log("toFloat", ly.lang.toFloat("1.2"));
console.log("toFloat", ly.lang.toFloat("6,9", -1, 3, 7));
console.log("toFloat", ly.lang.toFloat("10", -1, 3, 7));
console.log("toFloat", ly.lang.toFloat("1,0", -1, 3, 7));

// objects
console.log("name.value", ly.objects.get({"name": {"value": 1}}, "name.value"));
console.log("[name,value]", ly.objects.get({"name": {"value": 1}}, ["name", "value"]));
console.log("length", ly.objects.get([1, 2], ["length"]));


// format
console.log("template", ly.format.template("CIAO \n{{name}} {{surname}}", {"name": "Mario", "surname": "Rossi"}));
console.log("date", ly.format.date(new Date(ly.random.now())));
console.log("date", ly.format.date(new Date(ly.random.now()), "yyyymmdd"));
console.log("date", ly.format.date(new Date(ly.random.now()), "dd MM yyyy"));

// dom
let elem: any = ly.dom.get("#app_content");
console.log(typeof elem, elem[0]);
console.log(elem[0].innerHTML);

let elems: any = ly.dom.get(".app");
console.log(typeof elems, elems);


function Start() {
    const html: string = '<div id="test_comp" data-langs="en it" data-lang="english">' +
        '<span>' +
        'Hello from HTML template' +
        '</span>' +
        '<br>' +
        '<div>' +
        '<span>' +
        'span 1' +
        '</span>' +
        '<span>' +
        'span 2' +
        '</span>' +
        '</div>' +
        '</div>';

    const html2: string =
        `<div>
            <span></span> 
        <div>`;

    let elem = dom.newElement(html, "#app_content");
    let handler_click = (e: any) => {
        e.preventDefault();

        // evaluate script
        ly.lang.evalScript("alert('THIS IS A MESSAGE FROM SCRIPT: ' +  this )");

        elem.removeEventListener("click", handler_click);
    };
    elem.addEventListener("click", handler_click);

    console.log("START dom.forEachChild");
    dom.forEachChild(elem, (child) => {
        console.log("elem child", child);
    }, true);
    console.log("END dom.forEachChild");

    const span = dom.map(elem, (child) => {
        // console.log("tagName", child.tagName);
        return child.tagName.toLowerCase() === 'span';
    }, true);
    console.log("map 'span'", span);

    const selected_span = dom.get("span", elem);
    console.log("selected 'span'", selected_span);

    // func invoke
    const inv_res: any = lang.funcInvoke((...args: any[]) => {
        console.log("=>INSIDE invoke", this, args);
        return "INVOKED!";
    }, "arg1", "arg2");
    console.log("funcInvoke", inv_res);

    // func once
    const func_once = lang.funcOnce((now: number) => {
        console.log("ONCE", now);
        return now;
    }, ly.random.now());
    console.log("invoking func_one", func_once());
    console.log("invoking func_one", func_once());

    // func delay
    const func_delay_id: any = ly.lang.funcDelay((arg1: string) => {
        console.log("DELAYED", arg1);

        ly.i18n.registerDefault(it);
        ly.i18n.register("it", it);
        ly.i18n.register("en", en);

        // test the component
        const page: PageLogin = new PageLogin();
        //console.log("page.outerHTML", dom.newElement(page.outerHTML));
        //const parent:HTMLElement[] = dom.get("#app_content");
        //console.log("parent[]", parent);
        page.appendTo("#app_content");

        let input1 = dom.getFirst("[data-id=username]");
        console.log("\"[data-id=\\\"username\\\"]\" is INPUT-TEXT", input1, dom.isInputText(input1));

        return arg1;
    }, 2000, "arg1");
    console.log("clearTimeout: ", func_delay_id);
    // clearTimeout(func_delay_id);

    // func debounce
    const func_debounced = ly.lang.funcDebounce(this, (arg1: string) => {
        console.log("DEBOUNCED with args", arg1);
        return arg1;
    }, 200, false, "this is arg_1");
    console.log("DEBOUNCE RESPONSE", func_debounced());
    console.log("DEBOUNCE RESPONSE", func_debounced());
    console.log("DEBOUNCE RESPONSE", func_debounced());
    console.log("DEBOUNCE RESPONSE", func_debounced());
    console.log("DEBOUNCE RESPONSE", func_debounced());
    console.log("DEBOUNCE RESPONSE", func_debounced());

    // Selector parser
    const selector_parser = new SelectorParser("[data-langs~='en']");
    console.log("selector_parser", selector_parser.type, selector_parser.name, selector_parser.operator, selector_parser.value);
    console.log("selector_parser match", selector_parser.match(elem));
    const selector_parser2 = new SelectorParser("[data-langs='en']");
    console.log("selector_parser2", selector_parser2.type, selector_parser2.name, selector_parser2.operator, selector_parser2.value);
    console.log("selector_parser2 match", selector_parser2.match(elem));
    const selector_parser3 = new SelectorParser("[data-langs|='en']");
    console.log("selector_parser3", selector_parser3.type, selector_parser3.name, selector_parser3.operator, selector_parser3.value);
    console.log("selector_parser3 match", selector_parser3.match(elem));
    const selector_parser4 = new SelectorParser("[data-lang|='en']");
    console.log("selector_parser4", selector_parser4.type, selector_parser4.name, selector_parser4.operator, selector_parser4.value);
    console.log("selector_parser4 match", selector_parser4.match(elem));
    const selector_parser5 = new SelectorParser("[data-lang='en']");
    console.log("selector_parser5", selector_parser5.type, selector_parser5.name, selector_parser5.operator, selector_parser5.value);
    console.log("selector_parser5 match", selector_parser5.match(elem));
}

let s = Start();