import { Component, OnInit, AfterViewInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { FeedService } from './services/feed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public pieChartType:string = 'pie';

  onSelect(event) {
    console.log(event);
  }
  title: string;
  feeds: Array<any> = [];
  feedLocation = "";
   freq = {};
   keys:string[];
   values:number[];
  listFeeds = [
   {name: "Capital",
      link:"https://www.capital.ua/rss/rss_public_news_ru.xml"},
    {
      name: "Rbc",
      link: "https://www.rbc.ua/static/rss/newsline.img.rus.rss.xml"
    },  {
      name: "Lb",
      link: "https://lb.ua/rss/rus/news.xml"
    }, {
      name: "tsn",
      link: "https://ru.tsn.ua/rss/full.rss"
    }
  ]
  constructor(
    private feedService: FeedService,
    private elementRef: ElementRef
  ) { }
// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}
  ngOnInit() {
    // this.refreshFeed();
  }

  ngAfterViewInit() {

  }

  refreshFeed() {
    // this.feeds.length = 0;
    this.feedService.getFeedContent(encodeURIComponent(this.feedLocation))
      .subscribe(
        feed => this.feeds = feed.items,
        error => console.log(error));
  }
  onSubmit(link) {

    this.feedService.getFeedContent(encodeURIComponent(link))
      .subscribe(
        feed => this.feeds = feed.items,
        error => console.log(error));
  }

  openLinkInBrowser(feed) {
    window.open(feed.link);
  }
  showDiagram(feed) {
    let  string = feed.description ;
    string.replace(/^[ "?!,.а-яА-ЯёЁ0-9\s]+$/g, "");
    // if (/^[A-Za-z]+$/.test(string))
    // this.tgtrimm(string.toLocaleLowerCase());
    this.getFrequency(string.toLocaleLowerCase());
    this.keys = Object.keys(this.freq);
    this.values = Object.values(this.freq);

  }

   getFrequency(string) {

    for (var i=0; i<string.length;i++) {
        var character = string.charAt(i);
        if (this.freq[character]) {
           this.freq[character]++;
        } else {
           this.freq[character] = 1;
        }
    }
    return this.freq;
};

 tgtrimm(str){var ars = str.replace(/[^a-zA-ZА-Яа-яЁё]/gi,'').replace(/\s+/gi,', '); return ars;}
}
