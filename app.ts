import * as Express from "express";
import {ServerLoader} from "ts-express-decorators/server-loader";
import Path = require("path");

export class Server extends ServerLoader {
    constructor() {
        super();

        let appPath: string = Path.resolve(__dirname);

        this.setEndpoint("/v1")
            .scan(appPath + "/controllers/**/**.js")
            .createHttpServer(3000)
            .createHttpsServer({
                port: 3030
            });

    }

    public importMiddlewares(): Server {
        let morgan = require("morgan"),
            cookieParser = require("cookie-parser"),
            bodyParser = require("body-parser"),
            compress = require("compression"),
            methodOverride = require("method-override"),
            session = require("express-session");

        this
            .use(morgan("dev"))
            .use(ServerLoader.AcceptMime("application/json"))
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }))
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride());

        return this;
    }

    static Initialize(): Promise<any> {

        console.log("Initialize server");

        return new Server()
            .start()
            .then(() => {
                console.log("Server started...");
            });
    }

}
