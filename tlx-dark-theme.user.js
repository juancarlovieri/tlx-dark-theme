// ==UserScript==
// @name         tlx dark theme
// @version      2.3.8
// @description  dark theme for tlx
// @author       Juan Carlo Vieri
// @match        *://tlx.toki.id/*
// @match        *://cpc.compfest.id/*
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.addStyle
// @grant        GM.getResourceText
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';
  var fireOnHashChangesToo = true;
  var pageURLCheckTimer = setInterval (
    function () {
        if (this.lastPathStr !== location.pathname
            || this.lastQueryStr !== location.search
            || (fireOnHashChangesToo && this.lastHashStr !== location.hash)
        ) {
            this.lastPathStr = location.pathname;
            this.lastQueryStr = location.search;
            this.lastHashStr = location.hash;
            gmMain ();
        }
    }
    , 1000
  );

  async function apply(elem){
    document.head.appendChild(elem);
  }

  function rmLight(){
    var cur = document.getElementById('tlx-dark-theme');
    if(cur != null)document.head.removeChild(cur);
    cur = document.getElementById("tlx-dark-theme-additional");
    if(cur != null)document.head.removeChild(cur);
  }

  async function applyDark(){
    if(await GM.getValue("dark") == -10)return;
    rmLight();
    var style = `body{background:#252525 !important;color:#FFFFFF !important;}.bp3-card{background:#202020 !important;color:#FFFFFF !important;}.bp3-running-text table th, table.bp3-html-table th{border-color:#606060 !important;color:#e3e3e3 !important;}.single-problemset-problem-routes__title{color:#FFFFFF !important}td{border: 1px solid !important;border-color:#606060 !important;color:#e3e3e3 !important;}.programming-problem-statement__name{color:#FFFFFF !important;}.html-text pre{background-color:#151515 !important;}code{background-color:transparent !important;color:#e3e3e3 !important}pre code{background-color:transparent !important;}.content-card h3{color:#e3e3e3 !important;}.card-sidebar .bp3-tab[aria-selected=true]{background-color:#303030 !important;color:#3b73b9 !important}h1, h2, h3, h4, h5{color:#e3e3e3 !important}.rating-purple{color:#ce8aff!important; background-color:transparent !important}.rating-red{color:#ff4747 !important; background-color:transparent !important}.rating-unrated{color:#e3e3e3 !important; background-color:transparent !important}.rating-gray{color:#8c8c8c !important; background-color:transparent !important}.rating-blue{color:#757dff !important; background-color:transparent !important}.rating-green{color:#00c700 !important; background-color:transparent !important}a{background-color:transparent !important;color:#1E90FF}.content-card-link{border: 1px solid !important; border-color: #404040 !important}.content-card-link:hover{background-color:#151515 !important}p{color:#e3e3e3!important}.archive-filter__category{color:#FFFFFF !important}.archive-filter__option--inactive{color:#C0C0C0 !important}table.bp3-html-table.bp3-html-table-striped tbody tr:nth-child(odd) td{background:#272727 !important}.card-sidebar .bp3-tab a{color:#1E90FF}.menubar{background-color:#353535 !important;overflow-y:hidden; border-bottom: 1px solid !important; border-color:#b3b3b3 !important;}.menubar__content .bp3-tab[aria-selected=true]{background-color:#303030 !important;color:#1E90FF}.menubar__content .bp3-tab{color:#1E90FF}.form-table-input__label{color:#FFFFFF}small{color:#e3e3e3}ol li, ul li{color:#e3e3e3}.card__title{border-bottom:1px solid;border-color:#404040}hr{border-color:#404040 !important}.bp3-breadcrumb, .bp3-breadcrumbs-collapsed{color:#909090 !important}.bp3-breadcrumb-current{color:#C0C0C0 !important}.bp3-button-group .bp3-button.bp3-active, .bp3-button-group .bp3-button:active{background:#505050 !important}.bp3-button-group .bp3-button{background:#404040 !important}.bp3-input{background:#303030;color:#C0C0C0}.bp3-button-group .bp3-button.bp3-fill, .bp3-button-group.bp3-fill .bp3-button:not(.bp3-fixed){color:#FFFFFF}.bp3-menu-item>.bp3-fill{color:#000000}.rating-red{color:#ff4747 !important; background-color:transparent !important}.bp3-file-upload-input{background-color:#303030 !important;color:#A0A0A0 !important}.header{background-color:#232323!important}.programming-submission-details pre{background-color:#202020 !important}span.token{background-color:transparent !important}.secondary-info{color:#e3e3e3 !important}.widget-user__profile, .widget-user__profile svg{background-color:#404040;fill:#C0C0C0 !important}.form-table-input td{border:none !important}.html-text th{color:#e3e3e3 !important;background-color:#181818 !important}.menubar{overflow-x:hidden !important; box-shadow:none}table.gcj-scoreboard__content td strong.total-points-cell{color:#e3e3e3 !important}table.gcj-scoreboard__content td strong{color:black}table.gcj-scoreboard__content td strong{color:white}table.bp3-html-table.bp3-html-table-striped tbody tr:nth-child(odd) td.accepted, table.bp3-html-table.bp3-html-table-striped tbody tr:nth-child(even) td.accepted{background-color:#50c878 !important;}td.accepted strong{color:black !important}table.gcj-scoreboard__content td.not-accepted small, table.gcj-scoreboard__content td.not-accepted strong{color:#e3e3e3 !important}table.gcj-scoreboard__content td.accepted small{color:#353535 !important}.gcj-scoreboard__content td small{color:#b0b0b0 !important}.bp3-button.bp3-small, .bp3-small .bp3-button{background:transparent;border:none;color:#e3e3e3}.bp3-file-upload-input:after{background:#696969;color:#b5b5b5}.bp3-file-upload-input:hover{background:#505050 !important}.bp3-file-upload-input:hover:after{background:#696969 !important}.bp3-button.bp3-small:hover{background:#404040 !important}img:not([class]){background:white}.bp3-tabs.bp3-vertical>.bp3-tab-list .bp3-tab-indicator-wrapper .bp3-tab-indicator{background-color:#303030 !important}.html-text .spoiler{background-color:#151515 !important}.contest-registrants-dialog__body{background-color:#303030}.bp3-dialog{background-color:#202020}.bp3-dialog-header{background:#202020}.bp3-tabs.bp3-vertical{background-color:#202020 !important}.bp3-navbar-divider{background-color:#e3e3e3}table.scoreboard__content .my-rank, table.scoreboard__content .my-rank td{background-color:#404040 !important}.bp3-callout.bp3-intent-warning{background-color:#B36822 !important}`;
    var elem = document.createElement('style');
    elem.id = 'tlx-dark-theme';
    elem.type = 'text/css';
    elem.innerText = style;
    var style2 = `#btCopyContainer{margin-top:-9px;margin-right:-9px;float:right;background-color:#303030;border-radius:2.5px}button#btDark:focus{outline:0}button#btDark{color:#e3e3e3;float:right;margin-top:10px;height:20px;margin-right:10px;margin-left:10px;background:transparent !important;border:none}div#btDarkContainer{height:auto;width:0px;margin:auto;float:right;margin-right:10px;margin-left:10px;margin-top:5px}button.btSubmit{cursor:pointer;background-color:transparent !important;color:#858585 !important;border:none;text-align:left !important;font-size:8pt;padding:4px}button.btSubmit:focus{outline:0}#darkThemeCredit{text-align:center;color:#808080;height:0px}`;
    var elem2 = document.createElement('style');
    elem2.id = 'tlx-dark-theme-additional';
    elem2.type = 'text/css';
    elem2.innerText = style2;
    apply(elem);
    apply(elem2);
  }

  async function rmDark(){
    var cur = document.getElementById('tlx-dark-theme');
    if(cur != null)await document.head.removeChild(cur);
    cur = document.getElementById("tlx-dark-theme-additional");
    if(cur != null)await document.head.removeChild(cur);
  }

  async function applyLight(){
    if(await GM.getValue("dark") == 10)return;
    await rmDark();
    var style2 = `#btCopyContainer{margin-top:-9px;margin-right:-9px;float:right;background-color:#303030;border-radius:2.5px}button#btDark:focus{outline:0}button#btDark{color:#e3e3e3;float:right;margin-top:10px;height:20px;margin-right:10px;margin-left:10px;background:transparent !important;border:none}div#btDarkContainer{height:auto;width:0px;margin:auto;float:right;margin-right:10px;margin-left:10px;margin-top:5px}button.btSubmit{cursor:pointer;background-color:#e0e0e0 !important;color:#858585 !important;border:none;text-align:left !important;font-size:8pt;padding:4px}button.btSubmit:focus{outline:0}#darkThemeCredit{text-align:center;height:0px}`;
    var elem2 = document.createElement('style');
    elem2.id = 'tlx-dark-theme-additional';
    elem2.type = 'text/css';
    elem2.innerText = style2;
    apply(elem2);
  }

  async function btLight(){
    if(await GM.getValue("dark") == 10)return;
    var btDark = document.getElementById("btDark");
    btDark.innerHTML = "Light";
  }

  async function btDark(){
    if(await GM.getValue("dark") == -10)return;
    var btDark = document.getElementById("btDark");
    btDark.innerHTML = "Dark";
  }

  function credit(){
    var zNode = document.createElement('div');
    zNode.innerHTML = 'Dark Theme powered by Vieri Corp.™️ All Rights Reserved.'
    zNode.setAttribute('id', 'darkThemeCredit');
    var arr = document.getElementsByClassName('footer__text');
    if(arr.length != 1)return;
    var cur = arr[0];
    cur.prepend(zNode);
  }

  applyLight();
  applyDark();

  window.addEventListener ("load", function() {

    credit();

    var zNode = document.createElement ('div');
    zNode.innerHTML = '<button id="btDark" type="button" class="btDark> <img src="https"//foo.com alt="dark"/>'
                    + 'switch</button>'
                    ;
    zNode.setAttribute ('id', 'btDarkContainer');
    var arr = document.getElementsByClassName("bp3-navbar header");
    if(arr.length != 1){
      return;
    }
    var head = arr[0];
    head.prepend(zNode);
    async function toggle(zEvent){
      if(await GM.getValue("dark") == 10){
        await GM.setValue("dark", -10);
        applyLight();
        btLight();
      } else {
        await GM.setValue("dark", 10);
        applyDark();
        btDark();
      }
    }
    document.getElementById("btDark").addEventListener (
        "click", toggle, false
    );
    btDark();
    btLight();
  }, false);

  function gmMain () {
    console.log('new page');
    window.setTimeout(() => {
      var arr = document.getElementsByTagName("PRE");
      for(var i = 0; i < arr.length; i++){
        if(arr[i].getElementsByTagName("DIV").length != 0)continue;
        var zNode = document.createElement ('div');
        zNode.innerHTML = '<button id="btCopy' + i + '" type="button" class="btSubmit">'
                        + 'Copy</button>'
                        ;
        zNode.setAttribute ('id', 'btCopyContainer');
        arr[i].prepend (zNode);
        function copy(zEvent){
          var res = zEvent.path[2].innerText;
          res = res.substr(5);
          navigator.clipboard.writeText(res);
        }
        document.getElementById("btCopy" + i).addEventListener (
            "click", copy, false
        );
      }
    }, 3000);
  };

  document.addEventListener('keydown', function(event) {
    if (event.altKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
      var tab = document.getElementsByClassName("bp3-tabs bp3-vertical");
      if(tab.length != 1)return;
      tab = tab[0];
      tab = tab.getElementsByClassName('bp3-tab-list');
      if(tab.length != 1)return;
      tab = tab[0];
      var arr = tab.querySelectorAll(".bp3-tab");
      var indx = -1;
      for(var i = 0; i < arr.length; i++){
        if(arr[i].ariaExpanded == "true"){
          indx = i;
          break;
        }
      }
      if(indx == -1)return;
      if(event.key === 'ArrowUp'){
        indx--;
        if(indx < 0){
          indx = arr.length - 1;
        }
      } else{
        indx++;
        if(indx >= arr.length){
          indx = 0;
        }
      }
      var press = arr[indx].getElementsByTagName("A");
      if(press.length != 1)return;
      press = press[0];
      press.click();
    }
  });
})();
