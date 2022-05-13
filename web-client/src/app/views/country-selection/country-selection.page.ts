import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-country-selection',
  templateUrl: './country-selection.page.html',
  styleUrls: ['./country-selection.page.scss'],
})
export class CountrySelectionPage implements OnInit {
  countries: Array<any> = [];
  filteredCountries: Array<any> = [];
  isBusy = false;

  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  ngOnInit() {
    this.getCountries();
  }

  async getCountries() {
    this.isBusy = true;
    await this.http
      .get('https://restcountries.com/v2/all?fields=name,flags,callingCodes')
      .toPromise()
      .then(
        (data: any) => {
          this.countries = data.sort(
            (a: { name: string }, b: { name: string }) =>
              a.name.localeCompare(b.name)
          );
          this.filteredCountries = this.countries;
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        this.isBusy = false;
      });
  }

  dismiss(country: any) {
    this.modalCtrl.dismiss({
      prefix: country ? '+' + country?.callingCodes[0] : undefined,
    });
  }

  selectCountry(country: any) {
    this.dismiss(country);
  }

  onSearchChange(event: any) {
    const filtered = this.countries.filter((country) =>
      country?.name?.toLowerCase().includes(event.target.value.toLowerCase())
    );

    this.filteredCountries = filtered.length > 0 ? filtered : this.countries;
  }
}
