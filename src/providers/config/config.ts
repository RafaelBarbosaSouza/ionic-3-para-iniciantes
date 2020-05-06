import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let CONFIG_KEY_NAME = "config";

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    name: "",
    username: ""
  }
  constructor() {
    
  }

  getConfigData(): any {
      return localStorage.getItem(CONFIG_KEY_NAME);
  }

  setConfigData(showSlide?: boolean, name?: string, username?: string) {
      // let config = {
      //   showSlide: false,
      //   name: "",
      //   username: ""
      // }

      if(showSlide){
        this.config.showSlide = showSlide;
      }

      if(name){
        this.config.name = name;
      }

      if(username){
        this.config.username = username;
      }

      localStorage.setItem(CONFIG_KEY_NAME, JSON.stringify(this.config));
  }

}
