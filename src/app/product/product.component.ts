import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit, OnDestroy {

    // https://angular-2-training-book.rangle.io/handout/routing/routeparams.html

    product_slug: number;
    private sub: any;
    apiurl: string;
    product_json: any;
    selectedImage: string;

    constructor(private route: ActivatedRoute, public http: Http) {
        this.apiurl = 'http://startup-search-dev.cloudapp.net:8080/product-static';
    };

    public changePicture(index) {
      this.selectedImage = this.product_json.product.images[index];
      this.product_json.product.images[index] = this.product_json.product.images[0];
      this.product_json.product.images[0] = this.selectedImage;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.product_slug = params['product_slug'];
            const idToken = localStorage.getItem('id_token');
            if (!idToken) {
                throw new Error('ID token must exist to fetch profile');
            }
            this.http.get(this.apiurl, {
                method: 'GET',
                params : {
                    'id_token': idToken
                }
            }).subscribe(data => {
                if (data) {
                    this.product_json = data.json();
                }
            });

            // In a real app: dispatch action to load the details here.
        });

      (<any>window).Intercom('boot', {
        app_id: 'ykg2zzkd',
        // Logged out user so may not have any user related info
      });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
