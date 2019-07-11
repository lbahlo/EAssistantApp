import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import "rxjs/add/observable/of";
import { LogEntry } from "./log.service";



export abstract class LogPublisher {
  location: string;
  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}

export class LogLocalStorage extends LogPublisher {
  constructor() {
    // Must call super() from derived classes
    super();
    // Set location
    this.location = "logging";
  }

  // Append log entry to local storage
  log(entry: LogEntry): Observable<boolean> {
    let ret = false;
    let values: LogEntry[];

    try {
      // Get previous values from local storage
      values = JSON.parse(localStorage.getItem(this.location)) || [];
      // Add new log entry to array
      values.push(entry);
      // Store array into local storage
      localStorage.setItem(this.location, JSON.stringify(values));

      // Set return value
      ret = true;
    } catch (ex) {
      // Display error in console
      console.log(ex);
    }

    return Observable.of(ret);
  }

  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return Observable.of(true);
  }
}

export class LogConsole extends LogPublisher {
  log(entry: LogEntry): Observable<boolean> {
    // Log to console
    console.log(entry.buildLogString());
    return Observable.of(true);
  }
  clear(): Observable<boolean> {
    console.clear();
    return Observable.of(true);
  }
}
