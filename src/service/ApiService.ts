export class ApiService {
  async post<T>(path: string, request: {}): Promise<T> {
    const response = await fetch(path, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(request),
    });
    return response.json();
  }
  async put(path: string, request: {}) {
    const response = await fetch(path, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(request),
    });
    return response.json();
  }
  async get(path: string) {
    const response = await fetch(path, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });
    return response.json();
  }
}
