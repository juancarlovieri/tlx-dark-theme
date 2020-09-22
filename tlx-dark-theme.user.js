// ==UserScript==
// @name         tlx dark theme
// @namespace    http://tampermonkey.net/
// @version      2.0.5
// @description  dark theme for tlx
// @author       Juan Carlo Vieri
// @match        *://tlx.toki.id/*
// @grant        none
// @grant        GM_addStyle
// @grant        GM_getResourceText
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
    function gmMain () {
      console.log('new page');
      window.setTimeout(() => {
        var arr = document.getElementsByTagName("PRE");
        console.log(arr);
        for(var i = 0; i < arr.length; i++){
          if(arr[i].getElementsByTagName("DIV").length != 0)continue;
          var zNode = document.createElement ('div');
          zNode.innerHTML = '<button id="btCopy' + i + '" type="button" class="btSubmit">'
                          + 'Copy</button>'
                          ;
          zNode.setAttribute ('id', 'btCopyContainer');
          arr[i].prepend (zNode);
          console.log(arr[i]);
          console.log(zNode);
          function copy(zEvent){
            var res = zEvent.path[2].innerText;
            res = res.substr(5);
            console.log(res);
            navigator.clipboard.writeText(res);
          }
          document.getElementById("btCopy" + i).addEventListener (
              "click", copy, false
          );
        }
      }, 3000);
    }
    var style = `body{background:#252525 !important;color:#FFFFFF !important;}.bp3-card{background:#202020 !important;color:#FFFFFF !important;}.bp3-running-text table th, table.bp3-html-table th{border-color:#808080 !important;color:#e3e3e3 !important;}.single-problemset-problem-routes__title{color:#FFFFFF !important}td{border: 1px solid !important;border-color:#808080 !important;color:#e3e3e3 !important;}.programming-problem-statement__name{color:#FFFFFF !important;}.html-text pre{background-color:#151515 !important;}code{background-color:transparent !important;color:#e3e3e3 !important}pre code{background-color:transparent !important;}.content-card h3{color:#e3e3e3 !important;}.card-sidebar .bp3-tab[aria-selected=true]{background-color:#303030 !important;color:#3b73b9 !important}h1, h2, h3, h4, h5{color:#e3e3e3 !important}.rating-purple{color:#ce8aff!important; background-color:transparent !important}.rating-red{color:#ff4747 !important; background-color:transparent !important}.rating-unrated{color:#FFFFFF !important; background-color:transparent !important}.rating-gray{color:#8c8c8c !important; background-color:transparent !important}.rating-blue{color:#757dff !important; background-color:transparent !important}.rating-green{color:#00c700 !important; background-color:transparent !important}a{background-color:transparent !important;color:#1E90FF}.content-card-link{border: 1px solid !important; border-color: #404040 !important}.content-card-link:hover{background-color:#151515 !important}p{color:#e3e3e3!important}.archive-filter__category{color:#FFFFFF !important}.archive-filter__option--inactive{color:#C0C0C0 !important}table.bp3-html-table.bp3-html-table-striped tbody tr:nth-child(odd) td{background:#303030}.card-sidebar .bp3-tab a{color:#1E90FF}.menubar{background-color:#353535 !important;overflow-y:hidden; border-bottom: 1px solid !important; border-color:#b3b3b3 !important;}.menubar__content .bp3-tab[aria-selected=true]{background-color:#303030 !important;color:#1E90FF}.menubar__content .bp3-tab{color:#1E90FF}.form-table-input__label{color:#FFFFFF}small{color:#e3e3e3}ol li, ul li{color:#e3e3e3}.card__title{border-bottom:1px solid;border-color:#404040}hr{border-color:#404040 !important}.bp3-breadcrumb, .bp3-breadcrumbs-collapsed{color:#909090 !important}.bp3-breadcrumb-current{color:#C0C0C0 !important}.bp3-button-group .bp3-button.bp3-active, .bp3-button-group .bp3-button:active{background:#505050 !important}.bp3-button-group .bp3-button{background:#404040 !important}.bp3-input{background:#303030;color:#C0C0C0}.bp3-button-group .bp3-button.bp3-fill, .bp3-button-group.bp3-fill .bp3-button:not(.bp3-fixed){color:#FFFFFF}.bp3-menu-item>.bp3-fill{color:#000000}.rating-red{color:#ff4747 !important; background-color:transparent !important}.bp3-file-upload-input{background-color:#303030 !important;color:#A0A0A0 !important}.header{background-color:#232323!important}.programming-submission-details pre{background-color:#202020 !important}span.token{background-color:transparent !important}.widget-user__profile, .widget-user__profile svg{background-color:#404040;fill:#C0C0C0 !important}.form-table-input td{border:none !important}.html-text th{color:#e3e3e3 !important;background-color:#181818 !important}.menubar{overflow-x:hidden !important; box-shadow:none}table.gcj-scoreboard__content td strong.total-points-cell{color:#e3e3e3 !important}table.gcj-scoreboard__content td strong{color:black}table.gcj-scoreboard__content td strong{color:white}table.bp3-html-table.bp3-html-table-striped tbody tr:nth-child(odd) td.accepted, table.bp3-html-table.bp3-html-table-striped tbody tr:nth-child(even) td.accepted{background-color:#50c878 !important;}td.accepted strong{color:black !important}table.gcj-scoreboard__content td.not-accepted small, table.gcj-scoreboard__content td.not-accepted strong{color:black !important}table.gcj-scoreboard__content td.accepted small{color:#353535 !important}.gcj-scoreboard__content td small{color:#b0b0b0 !important}button.btSubmit{cursor:pointer;background-color:transparent !important;color:#858585 !important;border:none;text-align:left !important;font-size:8pt;padding:4px}#btCopyContainer{margin-top:-9px;margin-right:-9px;float:right;background-color:#303030;border-radius:2.5px}button.btSubmit:focus{outline:0}`;
    var elem = document.createElement('style');
    elem.id = 'classroom-dark-theme';
    elem.type = 'text/css';
    elem.innerText = style;
    document.head.appendChild(elem);
})();
