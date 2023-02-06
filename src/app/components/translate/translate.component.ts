import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GoogleTranslationService } from 'src/app/services/google.translation.service';
import { FrontendService } from 'src/app/services/frontend.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit{
  public to_do_list_Form !: FormGroup;
  Title: string = 'Google Cloud Translation API'
  targetLanguage: string = '';
  inputText: string = this.translateData.description;
  transalatedText = '';
  title = 'ng-google-translate';
  constructor(private googleTranslationService: GoogleTranslationService, @Inject(MAT_DIALOG_DATA) public translateData: any
  , private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private frontendservice: FrontendService,
  private dialogRef: MatDialogRef<TranslateComponent>
  ) {

  }
  ngOnInit(): void {
    this.to_do_list_Form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
    
  }
  translate() {
    let model = {
      "q": [this.inputText],
      "target": this.targetLanguage
    };
    this.googleTranslationService.translate(model).subscribe((response: any) => {
    this.transalatedText = response.data.translations[0].translatedText
    this.to_do_list_Form.controls['title'].setValue(this.translateData.title)
    this.to_do_list_Form.controls['description'].setValue(this.transalatedText)
    })
  }
  translateSave(){
    this.frontendservice.putList(this.to_do_list_Form.value, this.translateData.id)
    .subscribe({
      next:(res) => {
        alert("List Updated Successfully!");
        this.to_do_list_Form.reset();
        this.dialogRef.close('translate');
      },
      error:() => {
        alert("Something went wrong. Try Again Later!")
      }
    })
  }
}
