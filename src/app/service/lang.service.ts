import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Lang } from '../models/lang';
import { Tip } from '../models/tip';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor(private httpClient: HttpClient) { }

  public getLangs() {
    return this.httpClient.get<Lang[]>(environment.apiUrl + '/langs');
  }

  public getTips(lang: Lang, translateLang) {
    return this.httpClient.get<Tip[]>(environment.apiUrl + '/tips/findByLang/' + lang.id + '/' + translateLang);
  }
}
