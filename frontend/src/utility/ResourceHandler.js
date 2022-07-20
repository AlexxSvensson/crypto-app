import btc from "../resources/1.png"
import eth from "../resources/2.png"
import tether from "../resources/3.png"
import usdCoin from "../resources/4.png"
import bnb from "../resources/5.png"
import xrp from "../resources/6.png"
import cardano from "../resources/7.png"
import solana from "../resources/8.png"
import doge from "../resources/9.png"
import dai from "../resources/10.png"
import polkadot from "../resources/11.png"
import tron from "../resources/12.png"

export class ResourceHandler {
  constructor() {
    this.images = [];
    this.loaded = false;
    this.loadSprites();
  }
  
  loadImage(url) {
    return new Promise(r => { 
      let i = new Image();
      i.onload = (() => r(i)); 
      i.src = url; 
      i.onerror = () => { alert("failed to load") }
    });
  }
  async loadSprites() {
    const BTC = await this.loadImage(btc);
    const ETH = await this.loadImage(eth);
    const TETHER = await this.loadImage(tether);
    const USDCOIN = await this.loadImage(usdCoin);
    const BNB = await this.loadImage(bnb);
    const XRP = await this.loadImage(xrp);
    const CARDANO = await this.loadImage(cardano);
    const SOLANA = await this.loadImage(solana);
    const DOGE = await this.loadImage(doge);
    const DAI = await this.loadImage(dai);
    const POLKADOT = await this.loadImage(polkadot);
    const TRON = await this.loadImage(tron);
    
    this.images.push(BTC);
    this.images.push(ETH);
    this.images.push(TETHER);
    this.images.push(USDCOIN);
    this.images.push(BNB);
    this.images.push(XRP);
    this.images.push(CARDANO);
    this.images.push(SOLANA);
    this.images.push(DOGE);
    this.images.push(DAI);
    this.images.push(POLKADOT);
    this.images.push(TRON);

    this.loaded = true;
  }
}