const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

function updateClock(){
  const now = new Date();
  $('#clock').textContent = new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Jakarta',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(now)+' WIB';
  const h = Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Jakarta',hour:'2-digit',hour12:false}).format(now));
  $('#sessionText').textContent = h>=7&&h<15?'ASIA / PACIFIC':h>=15&&h<20?'LONDON / EUROPE':'NEW YORK / OVERLAP';
}
updateClock(); setInterval(updateClock,1000);

function tvWidget(target, type, config){
  const el = document.getElementById(target); if(!el) return;
  el.innerHTML='';
  const wrap=document.createElement('div'); wrap.className='tradingview-widget-container'; wrap.style.height='100%'; wrap.style.width='100%';
  const widget=document.createElement('div'); widget.className='tradingview-widget-container__widget'; widget.style.height='100%'; widget.style.width='100%';
  const script=document.createElement('script'); script.type='text/javascript'; script.src='https://s3.tradingview.com/external-embedding/embed-widget-'+type+'.js'; script.async=true;
  script.text=JSON.stringify(config);
  wrap.append(widget,script); el.append(wrap);
}
const dark='dark';
function advanced(symbol='OANDA:XAUUSD', interval='60'){
  return {autosize:true,symbol,interval,timezone:'Asia/Jakarta',theme:dark,style:'1',locale:'en',allow_symbol_change:true,calendar:false,support_host:'https://www.tradingview.com',studies:['STD;RSI'],withdateranges:true,hide_side_toolbar:false,details:true,hotlist:true,save_image:false,show_popup_button:true};
}
function loadAll(){
  tvWidget('overviewChart','advanced-chart',advanced('OANDA:XAUUSD','60'));
  tvWidget('fullChart','advanced-chart',advanced('OANDA:XAUUSD','15'));
  tvWidget('compareChart','advanced-chart',advanced('TVC:GOLD','D'));
  tvWidget('heatmap','stock-heatmap',{exchanges:[],dataSource:'SPX500',grouping:'sector',blockSize:'market_cap_basic',blockColor:'change',locale:'en',symbolUrl:'',colorTheme:dark});
  tvWidget('overviewNews','timeline',{feedMode:'market',market:'stock',colorTheme:dark,isTransparent:false,displayMode:'regular',width:'100%',height:'100%',locale:'en'});
  tvWidget('newsTimeline','timeline',{feedMode:'market',market:'stock',colorTheme:dark,isTransparent:false,displayMode:'regular',width:'100%',height:'100%',locale:'en'});
  tvWidget('economicCalendar','economic-calendar',{colorTheme:dark,isTransparent:false, width:'100%',height:'100%',locale:'en',importanceFilter:'-1,0,1',currencyFilter:'USD,EUR,GBP,JPY,CNY,CAD,AUD,CHF,NZD'});
  tvWidget('forex','forex-cross-rates',{width:'100%',height:420, currencies:['EUR','USD','JPY','GBP','CHF','AUD','CAD','NZD'],isTransparent:false,colorTheme:dark,locale:'en'});
  tvWidget('crypto','crypto-mkt-screener',{width:'100%',height:420,defaultColumn:'overview',screener_type:'crypto_mkt',displayCurrency:'USD',colorTheme:dark,locale:'en'});
  tvWidget('intermarketTable','market-overview',{colorTheme:dark,dateRange:'1D',showChart:true,locale:'en',width:'100%',height:420, tabs:[{title:'Rates & FX',symbols:[{s:'TVC:DXY',d:'US Dollar Index'},{s:'TVC:US10Y',d:'US 10Y Yield'},{s:'FX:EURUSD',d:'EUR/USD'},{s:'OANDA:USDJPY',d:'USD/JPY'}]},{title:'Commodities',symbols:[{s:'OANDA:XAUUSD',d:'Gold'},{s:'TVC:USOIL',d:'WTI Crude'},{s:'OANDA:XAGUSD',d:'Silver'}]},{title:'Risk',symbols:[{s:'CBOE:VIX',d:'VIX'},{s:'SP:SPX',d:'S&P 500'},{s:'NASDAQ:NDX',d:'Nasdaq 100'}]}]});
}
loadAll();

const names={overview:'MARKET OVERVIEW',charts:'LIVE CHARTS',intermarket:'INTERMARKET MONITOR',economics:'ECONOMIC CALENDAR',news:'NEWS TERMINAL'};
function go(id){const el=document.getElementById(id);if(!el)return;el.scrollIntoView({behavior:'smooth'});$$('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.target===id));$('#sectionName').textContent=names[id]||'MARKET OVERVIEW';$('#sidebar').classList.remove('open');}
$$('.nav-link').forEach(b=>b.addEventListener('click',()=>go(b.dataset.target)));
$$('[data-jump]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.jump)));
$('#openNav').addEventListener('click',()=>$('#sidebar').classList.add('open'));
$('#closeNav').addEventListener('click',()=>$('#sidebar').classList.remove('open'));
const sections=$$('.page-section');
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const id=e.target.id;$$('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.target===id));$('#sectionName').textContent=names[id]||'MARKET OVERVIEW';}})},{rootMargin:'-25% 0px -65% 0px'});
sections.forEach(s=>observer.observe(s));
$$('.news-tab').forEach(b=>b.addEventListener('click',()=>{$$('.news-tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');const market={general:'stock',forex:'forex',stock:'stock',crypto:'crypto'}[b.dataset.news];tvWidget('newsTimeline','timeline',{feedMode:'market',market,colorTheme:dark,isTransparent:false,displayMode:'regular',width:'100%',height:'100%',locale:'en'});}));
