import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {
  public objeto_feed = {
    titulo: "Rafael Souza",
    data: "November 5, 1955",
    descricao: "Estou criando um app incrível...",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11h ago"
  }

  public lista_filmes = new Array<any>();
  public page = 1;

  public nomeUsuario: string = "Charles França do Código";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController) {
  }

  openLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }

  closeLoading() {
    this.loader.dismiss();
  }


  public somaDoisNumeros(num1:number, num2:number): void{
    alert(num1 + num2);
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  abrirDetalhes(filme){
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  carregarFilmes(newPage: boolean = false){
    this.openLoading();
    this.movieProvider.getMoviesPopular(this.page).subscribe(data => {
      const response = (data as any);
      const objeto_retorno = JSON.parse(response._body);
      if(newPage){
        this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
        this.infiniteScroll.complete();
        console.log(this.page);
        console.log(this.lista_filmes);
      }else{
        this.lista_filmes = objeto_retorno.results;
      }
      this.closeLoading();
      this.closeRefresher();
    }, error => {
      console.log(error);
      this.closeLoading();
      this.closeRefresher();
    })
  }

  private closeRefresher() {
    if (this.isRefreshing) {
      this.refresher.complete();
      this.isRefreshing = false;
    }
  }
}
