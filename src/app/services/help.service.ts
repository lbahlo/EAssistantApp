import { Injectable } from "@angular/core";

@Injectable()
export class HelpService {
  constructor() {}

  // Static service to provide help text
  public getHelpText() {
    const data = {
      helpText: "XXXXXthis is help text..."
    };
    return data;
  }
}
