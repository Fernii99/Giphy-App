import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.intefaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList: Gif[] = [];

  //Variable that is going to store all the Tags we are going to search on the Search Box
  private _tagsHistory: string[] = [];
  //API Key I'm going to use to search for the gifs
  private apiKey: string = 'ue2xi1piYJY6jS5SsqmFURXS0TKfdaUI';
  //API URL to get the gifs for, first half of the get method
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';

  //!INJECTION TO BE ABLE TO USE THE HTTP METHODS LIKE ( GET, PUT, POST, PATCH,)
  // The injections like this make you use them on the whole service
  constructor(private http: HttpClient) {
    this.loadLocalStorage();
   }

  get tagsHistory() {
    return [...this._tagsHistory];
  }
//METHOD that will arrange the tags we look for
  private organizeHistory( tag: string): void {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);

    this.saveLocalStorage()
  }

  //Method to store the tags searched on the local storage
  private saveLocalStorage():void {
    localStorage.setItem('tags', JSON.stringify(this._tagsHistory))
    localStorage.setItem('gifs', JSON.stringify(this.gifsList))
  }

  private loadLocalStorage():void {
    if( !localStorage.getItem('tags' ) )return
    if( !localStorage.getItem('gifs' ) )return

    this._tagsHistory = JSON.parse( localStorage.getItem('tags')! );
    this.gifsList = JSON.parse( localStorage.getItem('gifs')! );
  }




//When the enter button is pressed on the Search Box, this method is triggered,
  searchTag(tag: string): void {
    if(tag.length === 0) return;

    this.organizeHistory(tag);


  //Generation of the parameters using the HTTP injection of the line 17 to add the to the service petition
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)

  //HTTP petition to the GIPHY API with the URL generated before, what method of the API (/search)
  //and the parameters with the api key, the limit and what tag of gifs
  //! The subscribe method, keeps itself listening to different emisions of the object
    this.http.get<SearchResponse>(`${this.serviceURL}/search`, {params})
    .subscribe(resp => {
      this.gifsList = resp.data;
    })
  }
}
