import { Component, OnInit } from '@angular/core';
import { LangService } from '../../service/lang.service';
import { Lang } from 'src/app/models/lang';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tip } from 'src/app/models/tip';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss']
})
export class LangComponent implements OnInit {
  langs: Lang[] = [];
  tips: Tip[];
  langForm: FormGroup;
  selectedTip: Tip;
  private lang: string;
  private currentPosition = 0;

  constructor(private langService: LangService, public fb: FormBuilder, private translateService: TranslateService) {
    this.lang = this.translateService.getDefaultLang();
    this.translateService.onLangChange.subscribe((newLang: LangChangeEvent) => {
      this.lang = newLang.lang;
    });
  }

  ngOnInit() {
    this.langForm = this.fb.group({
      lang: ['', Validators.required]
    });
    this.langService.getLangs().subscribe(langs => {
      this.langs = this.langs.concat(langs);
    });
  }

  onChangeLanguage(lang) {
    this.langService.getTips(lang, this.lang).subscribe(tips => {
      if (tips && tips.length) {
        tips.map(item => item.name = item[this.lang]);
        this.tips = tips;
        this.selectedTip = this.tips[0];
      } else {
        this.tips = [];
        this.selectedTip = null;
      }
    });
  }

}
