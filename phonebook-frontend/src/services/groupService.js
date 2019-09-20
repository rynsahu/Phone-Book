import http from "./httpService";

const apiUrl = "http://localhost:8080/groups";

export function getGroups() {
  return http.get(apiUrl);
}
