import config from "../config";

const serverURL = () => {
  let url;
  if (config.APP_MODE === "development") {
    url = `http://${config.REACT_HOST_LOCAL}:${config.LOCAL_PORT}`;
    return url;
  } else {
    url = `http://${config.PRODUCTION_HOST}:${config.PRODUCTION_PORT}`;

    return url;
  }
};
export default serverURL;
