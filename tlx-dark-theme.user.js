// ==UserScript==
// @name         tlx dark theme
// @namespace    http://tampermonkey.net/
// @version      1.8
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
    var style = `body{background:#252525 !important;color:#FFFFFF !important;}.bp3-card{background:#202020 !important;color:#FFFFFF !important;}.bp3-running-text table th, table.bp3-html-table th{border-color:#808080 !important;color:#e3e3e3 !important;}.single-problemset-problem-routes__title{color:#FFFFFF !important}td{border: 1px solid !important;border-color:#808080 !important;color:#e3e3e3 !important;}.programming-problem-statement__name{color:#FFFFFF !important;}.html-text pre{background-color:#151515 !important;}code{background-color:#202020 !important;color:#e3e3e3 !important}pre code{background-color:#202020 !important;}.content-card h3{color:#e3e3e3 !important;}.card-sidebar .bp3-tab[aria-selected=true]{background-color:#303030 !important;color:#3b73b9 !important}h1, h2, h3, h4, h5{color:#e3e3e3 !important}.rating-purple{color:#ce8aff!important; background-color:transparent !important}.rating-red{color:#ff4747 !important; background-color:transparent !important}.rating-unrated{color:#FFFFFF !important; background-color:transparent !important}.rating-gray{color:#8c8c8c !important; background-color:transparent !important}.rating-blue{color:#757dff !important; background-color:transparent !important}.rating-green{color:#00c700 !important; background-color:transparent !important}a{background-color:transparent !important;color:#1E90FF}.content-card-link{border: 1px solid !important; border-color: #404040 !important}.content-card-link:hover{background-color:#151515 !important}p{color:#e3e3e3!important}.archive-filter__category{color:#FFFFFF !important}.archive-filter__option--inactive{color:#C0C0C0 !important}table.bp3-html-table.bp3-html-table-striped tbody tr:nth-child(odd) td{background:#303030}.card-sidebar .bp3-tab a{color:#1E90FF}.menubar{background-color:#353535 !important}.menubar__content .bp3-tab[aria-selected=true]{background-color:#303030 !important;color:#1E90FF}.menubar__content .bp3-tab{color:#1E90FF}.form-table-input__label{color:#FFFFFF}small{color:#e3e3e3}ol li, ul li{color:#e3e3e3}.card__title{border-bottom:1px solid;border-color:#404040}hr{border-color:#404040 !important}.bp3-breadcrumb, .bp3-breadcrumbs-collapsed{color:#909090 !important}.bp3-breadcrumb-current{color:#C0C0C0 !important}.bp3-button-group .bp3-button.bp3-active, .bp3-button-group .bp3-button:active{background:#505050 !important}.bp3-button-group .bp3-button{background:#404040 !important}.bp3-input{background:#303030;color:#C0C0C0}.bp3-button-group .bp3-button.bp3-fill, .bp3-button-group.bp3-fill .bp3-button:not(.bp3-fixed){color:#FFFFFF}.bp3-menu-item>.bp3-fill{color:#000000}.rating-red{color:#ff4747 !important; background-color:transparent !important}.bp3-file-upload-input{background-color:#303030 !important;color:#A0A0A0 !important}.header{background-color:#232323!important}.programming-submission-details pre{background-color:#202020 !important}span.token{background-color:transparent !important}.widget-user__profile, .widget-user__profile svg{background-color:#404040;fill:#C0C0C0 !important}.form-table-input td{border:none !important}.html-text th{color:#e3e3e3 !important;background-color:#181818 !important}`;
    var elem = document.createElement('style');
    elem.id = 'classroom-dark-theme';
    elem.type = 'text/css';
    elem.innerText = style;
    document.head.appendChild(elem);
})();
