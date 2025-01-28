import morgan from "morgan";
import Logger from "../logger/index.js";

class Morgan {
  // Override the stream method by telling
  // Morgan to use our custom Logger.getInstance() instead of console.log.
  static _stream = {
    write: (message) => Logger.getInstance().http(message.trim()),
  };

  static _format =
    ":remote-addr :method :url :status :res[content-length] - :response-time ms";

  static mount(_express) {
    Logger.getInstance().info("App :: Registering Morgan middleware...");

    _express.use(morgan(this._format, { stream: this._stream }));

    return _express;
  }
}

export default Morgan;
