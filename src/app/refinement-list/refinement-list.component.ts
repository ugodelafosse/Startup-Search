import { Component, OnInit } from '@angular/core';
import { connectRefinementList } from 'instantsearch.js/es/connectors';

import { InstantSearchService } from '../services/instantsearch.service';



@Component({
    selector: 'app-refinement-list',
    templateUrl: `./refinement-list.component.html`,
    styleUrls: ['./refinement-list.component.css']
})

export class RefinementListComponent implements OnInit {

    // Define SearchBox initial state
    state: { query: string; refine: Function } = {
        query: '',
        refine() {}
    };

    constructor(private instantSearchService: InstantSearchService) {}

    ngOnInit() {
        // Create a widget which will call `this.updateState` whenever
        // something changes on the search state itself.
        const widget = connectRefinementList(this.updateState);

        // Register the Hits widget into the instantSearchService search instance.
        this.instantSearchService.search.addWidget(widget({
            attributeName: 'category'
        }));
    }

    updateState = (state, isFirstRendering) => {
        // asynchronous update of the state
        // avoid `ExpressionChangedAfterItHasBeenCheckedError`
        if (isFirstRendering) {
            return Promise.resolve().then(() => {

                this.state = state;
            });
        }

        this.state = state;
    }

    handleChange(query) {
        this.state.refine(query);
    }


}

