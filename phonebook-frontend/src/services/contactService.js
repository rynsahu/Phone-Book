import http from "./httpService";

const apiUrl = "http://localhost:8080/contacts";

export function getContacts() {
  return http.get(apiUrl);
}

export async function createContact(name, phone) {
  await http.post(apiUrl, { name, phone });
}
