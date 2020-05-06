import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers: [
    MoovieProvider
  ]
})
export class FilmeDetalhesPage {
  public filme;
  public idFilme;
  public loader;
  public refresher;
  public isRefreshing: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController
    ) {
  }

  openLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }

  closeLoading(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarDetalheFilme();
  }

  ionViewDidEnter() {
    this.carregarDetalheFilme();
  }

  carregarDetalheFilme(){
    this.openLoading();
    this.idFilme = this.navParams.get("id");
    console.log("id do filme:", this.idFilme);
    this.movieProvider.getMovieDetails(this.idFilme).subscribe(data=>{
      let retorno = (data as any)._body;
      this.filme = JSON.parse(retorno);
      console.log(this.filme);
      this.closeLoading();
      this.closeRefresher();
    }, error=>{
      console.log(error);
      this.closeLoading();
      this.closeRefresher();
    })
  }

  closeRefresher(){
    if(this.isRefreshing){
      this.refresher.complete();
      this.isRefreshing = false;
    }
  }

}
