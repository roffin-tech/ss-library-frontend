import http from "../http-common";

class BookDataService {
  getAll() {
    return http.get("/books");
  }

  get(id: string) {
    return http.get(`/books/${id}`);
  }

  create(data: any) {
    return http.post("/books", data);
  }

  update(id: string, data: any) {
    return http.put(`/books/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/books/${id}`);
  }

  deleteAll() {
    return http.delete(`/books`);
  }

  findByTitle(title: string) {
    return http.get(`/books?title=${title}`);
  }
}

export default new BookDataService();