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
      .get('https://restcountries.com/v3.1/all?fields=name,flags,idd')
      .toPromise()
      .then(
        (data: any) => {
          this.countries = data.sort(
            (a: { name: { common: string } }, b: { name: { common: any } }) =>
              a.name.common.localeCompare(b.name.common)
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
    console.log(country);
    const suffix =
      country?.idd?.root === '+1' ? '' : country?.idd?.suffixes[0]?.slice(0, 2);
    const prefix = country ? country?.idd?.root + suffix : undefined;

    this.modalCtrl.dismiss({
      prefix,
    });
  }

  selectCountry(country: any) {
    this.dismiss(country);
  }

  onSearchChange(event: any) {
    const filtered = this.countries.filter((country) =>
      country?.name?.common
        ?.toLowerCase()
        .includes(event.target.value.toLowerCase())
    );

    this.filteredCountries = filtered.length > 0 ? filtered : this.countries;
  }
}
