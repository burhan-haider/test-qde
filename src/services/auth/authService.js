import httpService from "../httpservice/httpService";

class AuthService {
  init() {
    return this.handleAuthentication();
  }
  signIn = async (userName, userPassword) => {
    return await new Promise((resolve, reject) => {
      httpService
        .post("/auth/login", null, {
          params: {
            userName,
            userPassword,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.setSession(response.data.token);
            // console.log("response :"+response.data.token);
            resolve(response.data.token);
          } else {
            reject(response.data.message);
          }
        })
        .catch((error) => {
          console.log("http Service Error:-",error);
          // if (error.response.status === 500) {
          //   // resolve(error.response);
          //   reject(error.response);
          // } else {
          reject(error.response);
          // }
        });
    });
  };

  signInWithToken = async () => {
    return await new Promise((resolve, reject) => {
      httpService
        .get("/user/userData")
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.message);
          }
        })
        .catch((err) => reject(err));
    });
  };
  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("cognifi_token", access_token);
      httpService.defaults.headers.common["Authorization"] =
        "Bearer " + access_token;
    } else {
      localStorage.removeItem("cognifi_token");
      delete httpService.defaults.headers.common["Authorization"];
    }
  };

  getAccessToken = () => {
    return window.localStorage.getItem("cognifi_token");
  };
  logout = () => {
    return new Promise((resolve, reject) => {
      httpService.post("user/logout").then((response) => {
        this.setSession(null);
      });
    });
  };

  fetchAllLabels = async (lang, direction) => {
    return await new Promise((resolve, reject) => {
      if (!lang || !direction) {
        reject("Language and direction not defined.");
        return;
      }
      httpService
        .get(`/labels/${lang}/${direction}`)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
    });
  };
}
const instance = new AuthService();

export default instance;
