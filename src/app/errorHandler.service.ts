import { ErrorHandler } from "@angular/core";

export class GlobalErrorhandler implements ErrorHandler{
    handleError(error: any): void {
        console.log(error);
    }
    
}