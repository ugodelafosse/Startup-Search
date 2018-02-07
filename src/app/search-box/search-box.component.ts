import { Component, OnInit, AfterViewInit } from '@angular/core';
import { connectSearchBox } from 'instantsearch.js/es/connectors';
import { Router } from '@angular/router';

import { InstantSearchService } from '../services/instantsearch.service';
import instantsearch from 'instantsearch.js/es';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})

export class SearchBoxComponent implements OnInit, AfterViewInit {

    // Define SearchBox initial state
    state: { query: string; refine: Function } = {
        query: '',
        refine() {}
    };


    constructor(public router: Router, private instantSearchService: InstantSearchService) {}

    // https://community.algolia.com/instantsearch.js/v2/connectors/connectSearchBox.html

    ngOnInit() {
        const makeSearchBox = connectSearchBox(this.renderFn);
        const customSearchBox = makeSearchBox();
        this.instantSearchService.search.addWidget(customSearchBox);

    }




    renderFn = (state, isFirstRendering) => {
        // asynchronous update of the state
        // avoid `ExpressionChangedAfterItHasBeenCheckedError`
        if (isFirstRendering) {
            return Promise.resolve(null).then(() => {
                this.state = state;
            });
        }

        this.state = state;
    }

    handleChange(query) {
        this.state.refine(query);
        this.router.navigate(['/search'], {queryParams: {q: query}});
    }

    ngAfterViewInit() {
        // this.instantSearchService.search.start();
    }

}
