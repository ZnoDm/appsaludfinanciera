import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces/news';
import { NewsService } from 'src/app/services/news/news.service';
import { StorageService } from 'src/app/services/news/storage.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  @ViewChild( IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  public articles: Article[] = [];

  selectedTab:string = 'tendecias';

  constructor(
    private router: Router,
    private chgRef: ChangeDetectorRef,
    private newsService: NewsService,
    private storageService: StorageService
  ) {}


  ngOnInit(){
    this.selectedTab = 'tendecias';

    this.newsService.getTopHeadlinesByCategory( 'business', true )
    .subscribe( articles => this.articles.push( ...articles ) );
  }

  get articlesFavoritos(): Article[] {
    return this.storageService.getLocalArticles;
  }

  loadData() {
    this.newsService.getTopHeadlinesByCategory( 'business', true )
      .subscribe( articles => {
          if ( articles.length === this.articles.length ) {
            this.infiniteScroll.disabled = true;
            // event.target.disabled = true;
            return;
          }

          this.articles = articles;
          this.infiniteScroll.complete();
          // event.target.complete();

        })

  }
}
