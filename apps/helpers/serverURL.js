import config from "../config";

const serverURL = () => {
  let url;
  if (config.APP_MODE === "development") {
    url = `http://${config.REACT_HOST_LOCAL}:${config.LOCAL_PORT}/tag`;
    return url;
  } else {
    url = `http://${config.PRODUCTION_HOST}:${config.PRODUCTION_PORT}/tag`;

    return url;
  }
};
export default serverURL;
