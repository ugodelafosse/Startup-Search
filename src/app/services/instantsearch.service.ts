import { Injectable } from '@angular/core';
import instantsearch from 'instantsearch.js/es';

// Ressource utile :
// https://community.algolia.com/instantsearch.js/v2/guides/angular-integration.html

// Le nombre de Hits par Page sera toujours égal à cette valeur même si l'on tente de changer la valeur dans les paramètres de l'URL
let hitsPerPage = 10;

@Injectable()
export class InstantSearchService {

    // Credentials de l'index Algolia de test
    // A changer ! + Utiliser variables d'environnement.
    // Utiliser plusieurs indexes
    search = instantsearch({
        appId: 'latency',
        apiKey: '3d9875e51fbd20c7754e65422f7ce5e1',
        indexName: 'bestbuy',
        urlSync: {mapping: {q: 'q'},
                  threshold: 100,
                  trackedParameters: [
                            "query"
                  ]},
        searchParameters: {
            hitsPerPage: hitsPerPage,
            typoTolerance: false, //ou min, strict
            removeWordsIfNoResults: "none"
        },
        searchFunction(helper) {
            if (helper.state.query === '') {
              // helper.state.add({isEmptyQuery: true});
              helper.state.hitsPerPage = hitsPerPage;
              helper.search();
            }

            // helper.state.add({isEmptyQuery: false});
            helper.state.hitsPerPage = hitsPerPage;
            console.log("Requête JSON envoyée à Algolia :")
            console.log(helper.state);
            helper.search();
        },

    });

    constructor() {}
}
