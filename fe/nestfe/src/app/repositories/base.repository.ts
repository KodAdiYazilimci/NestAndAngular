import { HttpHeaders } from "@angular/common/http";

export class BaseRepository {
    constructor() {
    }

    public baseUrl: string = "http://localhost:3000";

    public getDefaultHeaders(): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append("Content-Type", "application/json");
        return headers;
    }
}