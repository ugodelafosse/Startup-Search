import { Component, OnInit, AfterViewInit } from '@angular/core';
import { connectHits } from 'instantsearch.js/es/connectors';

import instantsearch from 'instantsearch.js';

import { InstantSearchService } from '../services/instantsearch.service';

@Component({
    selector: 'app-hits',
    templateUrl: './hits.component.html',
    styleUrls: ['./hits.component.css']
})

export class HitsComponent implements OnInit {
    // Define how your component state will look like,
    // and intialize it with an empty hits array
    state: {hits: {}[], results: {query: string} } = { hits: [], results: {query: ''} };
    firstrendered: boolean;


    constructor(private instantSearchService: InstantSearchService) {}

    ngOnInit() {
        // Create a widget which will call `this.updateState` whenever
        // something changes on the search state itself
        const widget = connectHits(this.updateState);

        // Register the Hits widget into the instantSearchService search instance.
        this.instantSearchService.search.addWidget(widget(
            {container: '#hits',
             templates:
                 {empty: 'No results'}
             }
        ));
    }



    updateState = (state, isFirstRendering) => {
        // asynchronous update of the state
        // avoid `ExpressionChangedAfterItHasBeenCheckedError`
        if (isFirstRendering) {
            return Promise.resolve().then(() => {
                this.state = state;
                this.firstrendered = true;
            });
        }

        this.state = state;
        this.firstrendered = false;

        console.log('Query entrée : ');
        console.log(this.state.results.query);
        console.log('Réponse JSON d\'Algolia : ');
        console.log(this.state);
        console.log('Liste des résultats JSON : ');
        console.log(this.state.hits);
    }

    ngAfterViewInit() {
        // this.instantSearchService.search.start();
    }
}
