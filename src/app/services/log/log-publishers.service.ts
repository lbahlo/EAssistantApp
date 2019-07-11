import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { LogPublisher, LogConsole, LogLocalStorage } from "./log-publisher";
import { Observable } from "rxjs/Observable";
import { LogEntry } from "./log.service";

const PUBLISHERS_FILE = "assets/log-publishers.json";

class LogPublisherConfig {
  loggerName: string;
  loggerLocation: string;
  isActive: boolean;
}

@Injectable()
export class LogPublishersService {
  constructor(private http: Http) {
    // Build publishers arrays
    this.buildPublishers();
  }

  // Public properties
  publishers: LogPublisher[] = [];

  // Build publishers array
  buildPublishersOrig(): void {
    // Create instance of LogConsole Class
    this.publishers.push(new LogConsole());
    // Create instance of LogLocalStorage Class
    this.publishers.push(new LogLocalStorage());
    // Create instance of LogWebApi Class
    // wait   this.publishers.push(new LogWebApi(this.http));
  }

  getLoggers(): Observable<LogPublisherConfig[]> {
    return this.http
      .get(PUBLISHERS_FILE)
      .map(response => response.json())
      .catch(this.handleErrors);
  }

  buildPublishers(): void {
    let logPub: LogPublisher;

    this.getLoggers().subscribe(response => {
      for (const pub of response.filter(p => p.isActive)) {
        switch (pub.loggerName.toLowerCase()) {
          case "console":
            logPub = new LogConsole();
            break;
          case "localstorage":
            logPub = new LogLocalStorage();
            break;
          case "webapi":
            // wait   logPub = new LogWebApi(this.http);
            break;
        }
        // Set location of logging
        logPub.location = pub.loggerLocation;
        // Add publisher to array
        this.publishers.push(logPub);
      }
    });
  }

  private handleErrors(error: any): Observable<any> {
    const errors: string[] = [];
    let msg = "";

    msg = "Status: " + error.status;
    msg += " - Status Text: " + error.statusText;
    if (error.json()) {
      msg += " - Exception Message: " + error.json().exceptionMessage;
    }
    errors.push(msg);

    console.error("An error occurred", errors);

    return Observable.throw(errors);
  }
}

export class LogWebApi extends LogPublisher {
  constructor(private http: Http) {
    // Must call super() from derived classes
    super();
    // Set location
    this.location = "/api/log";
  }

  // Add log entry to back end data store
  log(entry: LogEntry): Observable<boolean> {
    const headers = new Headers({ "Content-Type": "application/json" });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.location, entry, options)
      .map(response => response.json())
      .catch(this.handleErrors);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all values
    return Observable.of(true);
  }

  private handleErrors(error: any): Observable<any> {
    const errors: string[] = [];
    let msg = "";

    msg = "Status: " + error.status;
    msg += " - Status Text: " + error.statusText;
    if (error.json()) {
      msg += " - Exception Message: " + error.json().exceptionMessage;
    }
    errors.push(msg);

    console.error("An error occurred", errors);

    return Observable.throw(errors);
  }
}
