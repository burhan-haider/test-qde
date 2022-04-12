import axios from "axios";

let url = "";

if (process.env.NODE_ENV === "development") {
  url = "http://localhost:6001";
}
export default axios.create({
  baseURL: url
});
