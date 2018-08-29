/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'environments/environment';
import { saveAs } from 'file-saver';

@Injectable()
export class DataService<Type> {
    private resolveSuffix = '?resolve=true';
    private actionUrl: string;
    private requestOptions: RequestOptions;
    private isNamespaceRequired: boolean;

    constructor(private http: Http) {
        this.actionUrl = environment.apiUrl + "/api/";
        this.isNamespaceRequired = environment.isNamespaceRequired;
        this.requestOptions = new RequestOptions({
            headers: new Headers({
                'Access-Control-Allow-Origin': '*',
                'X-Content-Type-Options': 'nosniff',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
            })
        });
    }

    public getAll(ns: string): Observable<Type[]> {
        console.log('GetAll ' + ns + ' to ' + this.actionUrl + ns);
        return this.http.get(this.getUrl(ns), this.requestOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getSingle(ns: string, id: string): Observable<Type> {
        console.log('GetSingle ' + ns);

        return this.http.get(this.getUrl(ns) + '/' + id + this.resolveSuffix, this.requestOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public add(ns: string, asset: Type): Observable<Type> {
        console.log('Entered DataService add');
        console.log('Add ' + ns);
        console.log('asset', asset);

        return this.http.post(this.getUrl(ns), asset, this.requestOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public assign(ns: string, asset: Type): Observable<string | boolean> {
        console.log('Show loader');
        let options = new RequestOptions({ responseType: ResponseContentType.Blob });
        return this.http.post(this.getUrl(ns), asset, options)
            .map(function (res: Response) {
                var blob = new Blob([res.blob()], { type: 'application/octet-stream' });
                saveAs(blob, asset["userID"] + "@" + environment.cardDomain + ".card");
                return true;
            })
            .catch(this.handleError)
            .finally(function () {
                console.log('Hide loader');
            });
    }

    public update(ns: string, id: string, itemToUpdate: Type): Observable<Type> {
        console.log('Update ' + ns);
        console.log('what is the id?', id);
        console.log('what is the updated item?', itemToUpdate);
        console.log('what is the updated item?', JSON.stringify(itemToUpdate));
        return this.http.put(`${this.getUrl(ns)}/${id}`, itemToUpdate, this.requestOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public delete(ns: string, id: string): Observable<Type> {
        console.log('Delete ' + ns);
        return this.http.delete(this.getUrl(ns) + '/' + id, this.requestOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private handleError(error: any): Observable<string> {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private extractData(res: Response): any {
        return res.json();
    }

    private getUrl(urlInput) {
        var url: string;
        if (this.isNamespaceRequired) {
            url = `${this.actionUrl}${urlInput}`;
        }
        else {
            var actionName = urlInput.split(".").slice(-1).pop();
            url = `${this.actionUrl}${actionName}`;
        }
        return url;
    }

}
