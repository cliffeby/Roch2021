// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment as env } from '../../../environments/environment';

// interface Message {
//   message: string
// }

// @Component({
//   selector: 'app-external-api',
//   templateUrl: './external-api.component.html',
// })
// export class ExternalApiComponent implements OnInit {
//   message: string = null;

//   constructor( private http: HttpClient) {}

//   ngOnInit(): void {
//   }

//   callApi(){
//     this.http.get(env.dev.apiUrl + '/api/messages/public-message')
//     .subscribe((result: Message) =>
//     this.message = result.message)
//   }
//   callSecureApi(){
//     this.http.get(env.dev.apiUrl +'/api/messages/protected-message')
//     .subscribe((result: Message) =>
//     this.message = result.message)
//   }
// }
