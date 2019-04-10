import globals from "../application/globals";
import Runtime from "../application/controller/chrome/Runtime";
import ModelMessage, {ActionType} from "../application/model/ModelMessage";

function getContent(): string {
    if (!!globals.$) {
        const html: string = globals.$("body")[0].innerHTML;
        return html;
    } else {
        return "get_content(): Missing jQuery";
    }
}

const html: string = getContent();
Runtime.sendMessage(ModelMessage.create({
    action: ActionType.response,
    parameters: {
        script: "getContent",
        response: html
    }
}));