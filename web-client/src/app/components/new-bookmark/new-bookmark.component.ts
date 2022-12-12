import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookmarkService } from 'src/app/state/bookmark';

@Component({
  selector: 'app-new-bookmark',
  templateUrl: './new-bookmark.component.html',
  styleUrls: ['./new-bookmark.component.scss'],
})
export class NewBookmarkComponent implements OnInit {
  bookmarkForm: FormGroup;

  constructor(
    private bookmarkService: BookmarkService,
    private formBuilder: FormBuilder
  ) {
    this.bookmarkForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([Validators.minLength(2), Validators.required]),
      ],
      address: [
        '',
        Validators.compose([Validators.minLength(10), Validators.required]),
      ],
    });
  }

  ngOnInit() {}

  async createBookmark(form: FormGroup) {
    form.markAllAsTouched();
    if (form.valid) {
      const { name, address } = form.value;
      await this.bookmarkService.createBookmark({ name, address });
    }
  }
}
