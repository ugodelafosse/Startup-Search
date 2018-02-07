import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SearchBoxComponent } from '../search-box/search-box.component';

import { analytics } from 'instantsearch.js/es/widgets';
import { InstantSearchService } from '../services/instantsearch.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

    constructor(private instantSearchService: InstantSearchService) {}

    ngOnInit() {



        // D'après https://community.algolia.com/instantsearch.js/v2/widgets/analytics.html

        const widget = analytics({
            pushFunction: (qs, state, results) => undefined,
            delay: 1,
            triggerOnUIInteraction: true,
            pushInitialSearch: true,
            pushPagination: true,
        });

        this.instantSearchService.search.addWidget(widget);

        this.instantSearchService.search.addWidget(
            analytics({
                pushFunction: function(formattedParameters, state, results) {
                    console.log('ANALYTICS BABY ! (penser à relier à segment.io)');
                    // Segment.io
                    // analytics.page( '[SEGMENT] instantsearch',
                    // { path: '/instantsearch/?query=' + state.query + '&' + formattedParameters });
                }
            })
        );


    }

    ngAfterViewInit() {
        this.instantSearchService.search.start();
    }

}
