import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { NewsResponse, Article, ArticlesByCategoryAndPage } from '../../interfaces/news';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';



const apiKey = environment.apiNewsMediaKey;
const apiUrl = environment.apiNewsMediaUrl;

@Injectable({
  providedIn: 'root'
})
export class News2Service {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};


  constructor(
    private http: HttpClient
    ) { }

  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: {
        access_key: apiKey,
        sort: 'published_desc',
        limit: 10,
      }
    })
  }


  getArticlesByCategory( category: string ): Observable<Article[]> {



    if ( Object.keys( this.articlesByCategoryAndPage ).includes(category) ) {
      // Ya existe
      // this.articlesByCategoryAndPage[category].page += 0;
    } else {
      // No existe
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<any>(`?category=${ category }`)
    .pipe(
      map( ({ data }) => {
        console.log(data);



        if ( data.length === 0 ) return this.articlesByCategoryAndPage[category].articles;

        let array = [];
        for (let index = 0; index < data.length; index++) {
          const element :Article = {
            source:       data[index].source,
            author:      data[index].author,
            title:        data[index].title,
            description: data[index].description,
            url:          data[index].url,
            urlToImage:  data[index].image,
            publishedAt:  data[index].stringpublished_at.toString(),
            content:     data[index].description

          }
          array.push(element)
        }

        this.articlesByCategoryAndPage[category] = {
          page: page,
          articles: [ ...this.articlesByCategoryAndPage[category].articles, ...array ]
        }

        return this.articlesByCategoryAndPage[category].articles;
      })
    );


  }

}
