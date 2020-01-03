import {Exception} from "ts-httpexceptions";

export class HttpException extends Exception {
  constructor(status, name, message) {
    super(status, message, origin);
    this.name = name;
  }
}
