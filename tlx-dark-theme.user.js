// ==UserScript==
// @name         tlx dark theme
// @version      2.5.6
// @description  dark theme for tlx
// @author       Juan Carlo Vieri
// @match        *://tlx.toki.id/*
// @match        *://cpc.compfest.id/*
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.addStyle
// @grant        GM.getResourceText
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// ==/UserScript==

(function() {
  'use strict';

  async function init(){
    if(await GM.getValue("color") == null)await GM.setValue("color", "#e3e3e3");
    if(await GM.getValue("dark") == null)await GM.setValue("dark", "10");
      console.log(await GM.getValue("color"));
    if(await GM.getValue("beta") == null)await GM.setValue("beta", "-10");
  }

  init();

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
    await rmLight();
    var style = `body{background:#252525 !important;color:#FFFFFF !important;}.bp3-card{background:#202020 !important;color:#FFFFFF !important;}.bp3-running-text table th, table.bp3-html-table th{border-color:#606060 !important;color:#e3e3e3 !important;}.single-problemset-problem-routes__title{color:#FFFFFF !important}td{border: 1px solid !important;border-color:#606060 !important;color:#e3e3e3 !important;}.programming-problem-statement__name{color:#FFFFFF !important;}.html-text pre{background-color:#151515 !important;}code{background-color:transparent !important;color:#e3e3e3 !important}pre code{background-color:transparent !important;}.content-card h3{color:#e3e3e3 !important;}.card-sidebar .bp3-tab[aria-selected=true]{background-color:#303030 !important;color:#3b73b9 !important}h1, h2, h3, h4, h5{color:#e3e3e3 !important}.rating-purple{color:#ce8aff!important; background-color:transparent !important}.rating-red{color:#ff4747 !important; background-color:transparent !important}.rating-unrated{color:#e3e3e3 !important; background-color:transparent !important}.rating-gray{color:#8c8c8c !important; background-color:transparent !important}.rating-blue{color:#757dff !important; background-color:transparent !important}.rating-green{color:#00c700 !important; background-color:transparent !important}a{background-color:transparent !important;color:#1E90FF}.content-card-link{border: 1px solid !important; border-color: #404040 !important}.content-card-link:hover{background-color:#151515 !important}.archive-filter__category{color:#FFFFFF !important}.archive-filter__option--inactive{color:#C0C0C0 !important}table.bp3-html-table.bp3-html-table-striped tbody tr:nth-child(odd) td{background:#272727}.card-sidebar .bp3-tab a{color:#1E90FF}.menubar{background-color:#353535 !important;overflow-y:hidden; border-bottom: 1px solid !important; border-color:#b3b3b3 !important;}.menubar__content .bp3-tab[aria-selected=true]{background-color:#303030 !important;color:#1E90FF}.menubar__content .bp3-tab{color:#1E90FF}.form-table-input__label{color:#FFFFFF}small{color:#e3e3e3}.card__title{border-bottom:1px solid;border-color:#404040}hr{border-color:#404040 !important}.bp3-breadcrumb, .bp3-breadcrumbs-collapsed{color:#909090 !important}.bp3-breadcrumb-current{color:#C0C0C0 !important}.bp3-button-group .bp3-button.bp3-active, .bp3-button-group .bp3-button:active{background:#505050 !important}.bp3-button-group .bp3-button{background:#404040 !important}.bp3-input{background:#303030;color:#C0C0C0}.bp3-button-group .bp3-button.bp3-fill, .bp3-button-group.bp3-fill .bp3-button:not(.bp3-fixed){color:#FFFFFF}.bp3-menu-item>.bp3-fill{color:#000000}.rating-red{color:#ff4747 !important; background-color:transparent !important}.bp3-file-upload-input{background-color:#303030 !important;color:#A0A0A0 !important}.header{background-color:#232323!important}.programming-submission-details pre{background-color:#202020 !important}span.token{background-color:transparent !important}.secondary-info{color:#e3e3e3 !important}.widget-user__profile, .widget-user__profile svg{background-color:#404040;fill:#C0C0C0 !important}.form-table-input td{border:none !important}.html-text th{color:#e3e3e3 !important;background-color:#181818 !important}.menubar{overflow-x:hidden !important; box-shadow:none}table.gcj-scoreboard__content td strong.total-points-cell{color:#e3e3e3 !important}table.gcj-scoreboard__content td strong{color:black}table.gcj-scoreboard__content td strong{color:white}table.bp3-html-table.bp3-html-table-striped tbody tr:nth-child(odd) td.accepted, table.bp3-html-table.bp3-html-table-striped tbody tr:nth-child(even) td.accepted{background-color:#339933 !important;}td.accepted strong{color:black !important}table.gcj-scoreboard__content td.not-accepted small, table.gcj-scoreboard__content td.not-accepted strong{color:#e3e3e3 !important}table.gcj-scoreboard__content td.accepted small{color:#353535 !important}.gcj-scoreboard__content td small{color:#b0b0b0 !important}.bp3-button.bp3-small, .bp3-small .bp3-button{background:transparent;border:none;color:#e3e3e3}.bp3-file-upload-input:after{background:#696969;color:#b5b5b5}.bp3-file-upload-input:hover{background:#505050 !important}.bp3-file-upload-input:hover:after{background:#696969 !important}.bp3-button.bp3-small:hover{background:#404040 !important}img:not([class]){background:white}.bp3-tabs.bp3-vertical>.bp3-tab-list .bp3-tab-indicator-wrapper .bp3-tab-indicator{background-color:#303030 !important}.html-text .spoiler{background-color:#151515 !important}.contest-registrants-dialog__body{background-color:#303030}.bp3-dialog{background-color:#202020}.bp3-dialog-header{background:#202020}.bp3-tabs.bp3-vertical{background-color:#202020 !important}.bp3-navbar-divider{background-color:#e3e3e3}table.scoreboard__content .my-rank, table.scoreboard__content .my-rank td{background-color:#404040 !important}.bp3-callout.bp3-intent-warning{background-color:#B36822 !important}p{color:` + await GM.getValue('color') + `!important}ol li, ul li{color:` + await GM.getValue('color') + `}span:not([class]){color: ` + await GM.getValue('color') + `!important}`;
    var elem = document.createElement('style');
    elem.id = 'tlx-dark-theme';
    elem.type = 'text/css';
    elem.innerText = style;
    var style2 = `button#btPref{background:transparent;boc-shadow:none;border:none;color:#e3e3e3;cursor:pointer}button#btPref:focus{outline:0}#btPrefContainer{margin-top:12.5px;margin-bottom:12.5px;margin-right:15px;float:right;width:auto;height:auto;}#btCopyContainer{margin-top:-9px;margin-right:-9px;float:right;background-color:#282828;border-radius:2.5px}button#btDark:focus, button#btBeta:focus{outline:0}button#btDark, button#btBeta{cursor:pointer;color:#e3e3e3;float:right;margin-top:10px;height:20px;margin-right:10px;margin-left:10px;background:transparent !important;border:none}div#btDarkContainer, div#btBetaContainer{height:auto;width:auto;margin:auto;float:right;margin-right:10px;margin-left:10px;margin-top:5px}button.btCopy{cursor:pointer;background-color:transparent !important;color:#707070 !important;border:none;text-align:left !important;font-size:8pt;padding:4px}button.btCopy:focus{outline:0}#darkThemeCredit{text-align:center;color:#808080;height:0px}.diff{background-color:#303030 !important}`;
    var elem2 = document.createElement('style');
    elem2.id = 'tlx-dark-theme-additional';
    elem2.type = 'text/css';
    elem2.innerText = style2;
    apply(elem);
    apply(elem2);
  }

  async function rmDark(){
    var cur = await document.getElementById('tlx-dark-theme');
    if(cur != null)await document.head.removeChild(cur);
    cur = await document.getElementById("tlx-dark-theme-additional");
    if(cur != null)await document.head.removeChild(cur);
  }

  async function applyLight(){
    if(await GM.getValue("dark") == 10)return;
    await rmDark();
    var style2 = `button#btPref{background:transparent;boc-shadow:none;border:none;color:#404040;cursor:pointer}button#btPref:focus{outline:0}#btPrefContainer{margin-top:12.5px;margin-bottom:12.5px;margin-right:15px;float:right;width:auto;height:auto;}#btCopyContainer{margin-top:-9px;margin-right:-9px;float:right;background-color:#303030;border-radius:2.5px}button#btDark:focus, button#btBeta:focus{outline:0}button#btDark, button#btBeta{cursor:pointer;color:#e3e3e3;float:right;margin-top:10px;height:20px;margin-right:10px;margin-left:10px;background:transparent !important;border:none}div#btDarkContainer, div#btBetaContainer{height:auto;width:auto;margin:auto;float:right;margin-right:10px;margin-left:10px;margin-top:5px}button.btCopy{cursor:pointer;background-color:#e0e0e0 !important;color:#858585 !important;border:none;text-align:left !important;font-size:8pt;padding:4px}button.btCopy:focus{outline:0}#darkThemeCredit{text-align:center;height:0px}`;
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
    zNode.innerHTML = 'Dark Theme by Vieri Corp.™️ All Rights Reserved.'
    zNode.style.position = 'relative';
    zNode.style.height = '0';
    zNode.style.width = '100%';
    zNode.style.textAlign = 'center';
    var arr = document.getElementsByClassName('footer__text');
    if(arr.length != 1)return;
    var cur = arr[0];
    cur.prepend(zNode);
  }

  applyLight();
  applyDark();

  function cek(s){
    var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
    for(var i = 0; i < 6; i++){
      if(s == arr[i])return true;
    }
    return false;
  }

  async function askColor(){
    var prevColor = await GM.getValue('color');
    if(prevColor == null)prevColor = "#e3e3e3";
    var res = prompt('what color do you prefer for the problem statements?\nCopy the Hex Color Code of the color you choose\ninclude the "#" symbol\nDefault is #E3E3E3\nTo reset to default, enter "default"\nThis will only apply on dark mode and not light mode\nThe value in the textbox is your previous choice', prevColor);
    res = res.toLowerCase();
    if(res == "default"){
      await GM.setValue('color', '#E3E3E3');
      await applyDark();
      await applyLight();
      alert('success!');
      return;
    }
    if(res.length != 7){
      alert('invalid! (Code:2)');
      return;
    }
    if(res[0] != '#'){
      alert('invalid! (Code:1)');
      return;
    }
    for(var i = 1; i < 7; ++i){
      if(parseInt(res[i]) >= 0 && parseInt(res[i]) < 10)continue;
      var temp = cek(res[i]);
      if(temp)continue;
      alert('invalid! (Code:3)');
      return;
    }
    await GM.setValue('color', res);
    await applyDark();
    await applyLight();
    alert('success!');
  }

  function pref(){
    var zNode = document.createElement ('div');
    zNode.innerHTML = '<button id="btPref" type="button" class="btPref">'
                    + 'Preferences</button>'
                    ;
    zNode.setAttribute ('id', 'btPrefContainer');
    document.getElementsByClassName('menubar')[0].prepend (zNode);
    function ask(){
      askColor();
    }
    document.getElementById("btPref").addEventListener (
        "click", ask, false
    );
  }
  async function beta(){
    var zNode = document.createElement ('div');
    zNode.innerHTML = '<button id="btBeta" type="button" class="btBeta> <img src="https"//foo.com alt="dark"/>'
                    + 'switch</button>'
                    ;
    zNode.setAttribute ('id', 'btBetaContainer');
    var arr = document.getElementsByClassName("bp3-navbar header");
    if(arr.length != 1){
      return;
    }
    var head = arr[0];
    head.prepend(zNode);
    async function toggleBeta(zEvent){
      if(await GM.getValue("beta") == 10){
        await GM.setValue("beta", -10);
        location.reload();
      } else {
        await GM.setValue("beta", 10);
        location.reload();
      }
    }
    document.getElementById("btBeta").addEventListener (
        "click", toggleBeta, false
    );

    if(await GM.getValue("beta") == 10){
      document.getElementById("btBeta").innerHTML = "Disable Beta";
    } else document.getElementById("btBeta").innerHTML = "Enable Beta";
  }

  window.addEventListener ("load", async function() {
    await beta();

    credit();

    pref();

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

  function sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t));
  }

  function getRating(usr, uti){
    var def = {
      hiddenRating: 1800,
      publicRating: 1800
    };
    // console.log(uti);
    if(uti.get(usr).rating == null)return def;
    return uti.get(usr).rating;
  }

  function score(a, b, n){
    // console.log(Math.max(10, (sigmoid(Math.sqrt(b / a)) - 0.7) * Math.log2(n) * 1800));
    return Math.max(10, (sigmoid(Math.sqrt(b / a)) - 0.7) * Math.log2(n) * 1800);
  }

  function calc(usr, id, response, element, flag, overrideRating, overrideHidRating, overrideRank){
    // console.log(JSON.parse(response.body).data.scoreboard.content.entries);
    // console.log(JSON.parse(response.body).profilesMap);
    var uti = new Map(Object.entries(JSON.parse(response.responseText).profilesMap));
    var uid = -1;
    uti.forEach(function lol(value, key){
      if(value.username == usr){
        uid = key;
      }
    });
    if(uid == -1){
      return;
    }
    var sc = JSON.parse(response.responseText).data.scoreboard.content.entries;
    if(flag){
      var newConf = uti.get(uid);
      newConf.rating = {
        publicRating: parseInt(overrideRating),
        hiddenRating: parseInt(overrideHidRating),
      }
      uti.set(uid, newConf);
    }
    if(flag){
      for(var i = 0; i < sc.length; ++i){
        if(sc[i].contestantJid != uid)continue;
        sc[i].rank = parseInt(overrideRank);
      }
    }
    // console.log(sc[i]);
    // console.log(sc);
    var ustats = -1;
    var n = 0;
    for(var i = 0; i < sc.length; i++){
      if(sc[i].contestantJid == uid){
        ustats = sc[i];
      }
      var counter = 0;
      for(var j = 0; j < sc[i].attemptsList.length; j++){
        counter += sc[i].attemptsList[j];
      }
      if(counter == 0){
        continue;
      }
      ++n;
    }
    if(ustats == -1){
      return;
    }
    // console.log(n);
    var delta = 0;
    var myHid = getRating(uid, uti).hiddenRating;
    for(var i = 0; i < sc.length; i++){
      var counter = 0;
      for(var j = 0; j < sc[i].attemptsList.length; j++){
        counter += sc[i].attemptsList[j];
      }
      if(counter == 0){
        continue;
      }
      if(sc[i].contestantJid == uid)continue;
      if(sc[i].rank > ustats.rank){
        var oppHid = getRating(sc[i].contestantJid, uti).hiddenRating;
        delta += score(myHid, oppHid, n);
      }
      if(sc[i].rank < ustats.rank){
        var oppHid = getRating(sc[i].contestantJid, uti).hiddenRating;
        delta -= score(oppHid, myHid, n);
      }
    }
    delta /= n;
    var debt = getRating(uid, uti).hiddenRating - getRating(uid, uti).publicRating;
    // var newRating = 1800;
    // if(uti.get(uid).rating != null)newRating = uti.get(uid).rating.publicRating;
    var newRating = getRating(uid, uti).publicRating;
    // console.log(delta);
    if(delta >= 0){
      newRating += 0.2 * delta;
      debt += 0.8 * delta;
      if(debt > 0){
        newRating += debt;
        debt = 0;
      }
    }
    if(delta < 0){
      debt += delta;
      newRating += 0.5 * debt;
      debt = 0.5 * debt;
    }
    // console.log(newRating);
    newRating = Math.floor(newRating);
    if(flag)return newRating;
    if(element.getElementsByClassName("diff").length != 0)return;
    var zNode = document.createElement ('td');
    var col = 'white';
    if(newRating > getRating(uid, uti).publicRating){
      col = 'green';
    } else if(newRating < getRating(uid, uti).publicRating){
      col = 'red';
    }
    zNode.innerHTML = newRating - getRating(uid, uti).publicRating;
    if(zNode.innerHTML > 0)zNode.innerHTML = '+' + zNode.innerHTML;
    zNode.innerHTML = '<strong style="color:' + col + '">' + zNode.innerHTML + '</strong>';
    zNode.className = "diff";
    element.append(zNode);
  }

  function sc(){
    var arr = document.getElementsByTagName("BODY");
    if(arr.length == 0)return;
    arr = arr[0];
    arr = arr.getElementsByClassName("bp3-html-table bp3-html-table-striped scoreboard__content gcj-scoreboard__content");
    if(arr.length == 0)return;
    var sc = arr[0];
    sc = sc.getElementsByTagName("TBODY");
    if(sc.length == 0)return;
    sc = sc[0];
    sc = sc.getElementsByTagName("TR");
    sc2();
    var contest = document.URL.toString();
    contest = contest.split("/");
    contest = contest[contest.length - 2];
    GM_xmlhttpRequest ( {
      method:     "GET",
      url:        "https://uriel.tlx.toki.id/api/v2/contest-web/slug/" + contest + "/with-config",
      onload:     function (response) {
        if(response.status >= 300)return;
        var id = JSON.parse(response.responseText).contest.jid;
        // console.log(id);
        GM_xmlhttpRequest ( {
          method:     "GET",
          url:        'https://uriel.tlx.toki.id/api/v2/contests/' + id + '/scoreboard',
          onload:     function (response) {
            if(response.status >= 300)return;
            // console.log(id);
            for(var i = 0; i < sc.length; i++){
              // console.log(sc[i]);
              var usr = sc[i].getElementsByClassName("contestant-cell")[0].getElementsByTagName("A")[0].innerHTML;
              // console.log(usr);
              calc(usr, id, response, sc[i], false);
            }
          }
        });
      }
    });
  }

  function present(usr, contest, toggle){
    GM_xmlhttpRequest ( {
      method:     "GET",
      url:        "https://uriel.tlx.toki.id/api/v2/contest-web/slug/" + contest + "/with-config",
      onload:     function (response) {
        if(response.status >= 300)return;
        var id = JSON.parse(response.responseText).contest.jid;
        // console.log(id);
        GM_xmlhttpRequest ( {
          method:     "GET",
          url:        'https://uriel.tlx.toki.id/api/v2/contests/' + id + '/scoreboard',
          onload:     function (response) {
            if(response.status >= 300)return;
            var uti = new Map(Object.entries(JSON.parse(response.responseText).profilesMap));
            var uid = -1;
            uti.forEach(function lol(value, key){
              if(value.username == usr){
                uid = key;
              }
            });
            if(uid == -1){
              toggle.setAttribute('onclick', "return false;");
              toggle.setAttribute('disabled', "disabled");
            }
          }
        });
      }
    });
    // console.log(usr);
  }

  function sc2(){
    if(document.getElementsByClassName("predictbyrank").length != 0)return;
    var askRating = document.createElement("div");
    var asktxt = document.createElement("p");
    asktxt.innerHTML = 'Use my rating before the contest begins';
    asktxt.style.float = 'left';
    asktxt.style.marginTop = '7px';
    asktxt.style.display = 'inline-block';
    askRating.setAttribute('class', 'askrating');
    askRating.append(asktxt);
    var toggle = document.createElement("input");
    toggle.style.width = 'auto';
    toggle.style.marginLeft = '10px';
    toggle.style.display = 'inline-block';
    toggle.setAttribute('type', 'checkbox');
    toggle.setAttribute('class', 'toggleaskrating');
    var usr = document.querySelectorAll("[data-key]");
    // console.log(usr);
    for(var i = 0; i < usr.length; i++){
      if(usr[i].getAttribute('data-key') == 'username'){
        usr = usr[i].innerHTML;
        break;
      }
    }
    var contest = document.URL.toString();
    contest = contest.split("/");
    contest = contest[contest.length - 2];
    present(usr, contest, toggle);
    askRating.append(toggle);
    var customRating = document.createElement("div");
    customRating.setAttribute("class", "customrating");
    var custMsg = document.createElement("p");
    custMsg.innerHTML = 'or use custom rating ';
    custMsg.style.display = 'inline-block';
    customRating.setAttribute('class', 'predictbyrank');
    customRating.append(custMsg);
    var custVal = document.createElement("input");
    custVal.style.width = 'auto';
    custVal.style.marginLeft = '10px';
    custVal.style.display = 'inline-block';
    custVal.setAttribute('type', 'number');
    customRating.append(custVal);
    toggle.addEventListener("click", function(){
      if(toggle.checked){
        custVal.value = "";
        custVal.setAttribute('disabled', "disabled");
      } else {
        custVal.removeAttribute('disabled');
      }
    });
    var zNode = document.createElement("div");
    var txt = document.createElement("p");
    txt.innerHTML = 'If my rank was ';
    txt.style.display = 'inline-block';
    zNode.setAttribute('class', 'predictbyrank');
    zNode.append(txt);
    var input = document.createElement("input");
    input.style.width = 'auto';
    input.style.marginLeft = '10px';
    input.style.display = 'inline-block';
// <button type="submit" class="bp3-button bp3-intent-primary"></button>
    var resDelta = document.createElement("p");
    resDelta.innerHTML = "My delta would be: <strong>-</strong>";
    var btCalc = document.createElement("button");
    btCalc.setAttribute("class", "bp3-button bp3-intent-primary");
    btCalc.innerHTML = '<span class="bp3-button-text">calculate</span>';
    btCalc.addEventListener("click", function(){
      var usr = document.querySelectorAll("[data-key]");
      // console.log(usr);
      for(var i = 0; i < usr.length; i++){
        if(usr[i].getAttribute('data-key') == 'username'){
          usr = usr[i].innerHTML;
          break;
        }
      }
      // console.log(usr);
      var contest = document.URL.toString();
      contest = contest.split("/");
      contest = contest[contest.length - 2];
      GM_xmlhttpRequest ( {
        method:     "GET",
        url:        "https://uriel.tlx.toki.id/api/v2/contest-web/slug/" + contest + "/with-config",
        onload:     function (response) {
          if(response.status >= 300)return;
          var id = JSON.parse(response.responseText).contest.jid;
          // console.log(id);
          GM_xmlhttpRequest ( {
            method:     "GET",
            url:        'https://uriel.tlx.toki.id/api/v2/contests/' + id + '/scoreboard',
            onload:     function (response) {
              if(response.status >= 300)return;
              var newRating = custVal.value;
              var newHidRating = custVal.value;
              if(toggle.checked){
                var uti = new Map(Object.entries(JSON.parse(response.responseText).profilesMap));
                var uid = -1;
                uti.forEach(function lol(value, key){
                  if(value.username == usr){
                    uid = key;
                  }
                });
                if(uid == -1){
                  return;
                }
                newRating = getRating(uid, uti).publicRating;
                newHidRating = getRating(uid, uti).hiddenRating;
              }
              if(newRating == "")return;
              var delta = calc(usr, id, response, 0, true, newRating, newHidRating, input.value) - newRating;
              var col = 'red';
              if(delta > 0){
                delta = '+' + delta.toString();
                col = 'green';
              }
              resDelta.innerHTML = 'My delta would be: <strong style="color:' + col + '">' + delta + '</strong>';
            }
          });
        }
      });
    });
    input.setAttribute('type', 'number');
    zNode.append(input);
    var el = document.getElementsByClassName("bp3-card bp3-elevation-0 content-card")[0];
    el.append(zNode);
    el.append(askRating);
    el.append(customRating);
    el.append(resDelta);
    el.append(btCalc);
  }

  var problemCount, loadedCount = 0, resPage =  document.createElement("div"), arr = [], allLinks = [];

  function cmp(a, b){
    var idx1 = -1, idx2 = -1;
    for(var i = 0; i < allLinks.length; ++i){
      if(allLinks[i] == a[1])idx1 = i;
      if(allLinks[i] == b[1])idx2 = i;
    }
    if(idx1 < idx2)return -1;
    if(idx1 > idx2)return 1;
    return 0;
  }

  function loadedProblem(page, url){
    loadedCount++;
    arr[arr.length] = [page, url];
    if(loadedCount < problemCount)return;
    if(loadedCount > problemCount){
      console.log("ERROR");
    }
    arr.sort(cmp);
    for(var i = 0; i < arr.length; ++i){
      resPage.appendChild(arr[i][0]);
    }
    loadedCount = 0;
    problemCount = 0;
    arr = [], allLinks = [];
    var doc = document.implementation.createHTMLDocument("doc");
    doc.body.appendChild(resPage);
    var allStyle = document.head.getElementsByTagName("*");
    for(var i = 0; i < allStyle.length; ++i){
      if(allStyle[i].tagName == "TITLE")continue;
      doc.head.appendChild((allStyle[i].cloneNode()));
    }
    var newWindow = window.open();
    allStyle = document.head.getElementsByTagName("STYLE");
    for(var i = 0; i < allStyle.length; ++i){
      doc.head.appendChild(allStyle[i].cloneNode(true));
    }
    newWindow.document.open();
    newWindow.document.write(doc.documentElement.innerHTML);
    newWindow.document.close();
    resPage =  document.createElement("div");
  }

  function iframeLoaded(node) {
    node = node.target
    setTimeout(function(){ loadedProblem(node.getElementsByClassName("programming-problem-worksheet")[0], node.URL);}, 5000);
  }

  function viewAllProblem(){
    var problems = [];
    var allDivs = document.getElementsByTagName("DIV");
    for(var i = 0; i < allDivs.length; ++i){
      if(allDivs[i].className.indexOf("problem-card") != -1 && allDivs[i].className.indexOf("problem-card") == allDivs[i].className.length - 12)problems[problems.length] = allDivs[i];
    }
    console.log(problems);
    if(problems.length == 0)return;
    problemCount = problems.length;
    for(var i = 0; i < problems.length; ++i){
      var link = problems[i].getElementsByTagName("DIV")[0];
      link = link.getElementsByClassName("content-card-link")[0];
      allLinks[i] = link.href;
    }
    for(var i = 0; i < problems.length; ++i){
      var link = problems[i].getElementsByTagName("DIV")[0];
      link = link.getElementsByClassName("content-card-link")[0];
      var zNode = document.createElement ('iframe');
      zNode.setAttribute('class', 'loadProblemPage');
      zNode.setAttribute('height', '0');
      zNode.setAttribute('width', '0');
      zNode.src = link.href;
      document.body.appendChild(zNode);
      zNode.onreadystatechange = function(e){
        if(zNode.readyState == 'complete'){
          iframeLoaded(e);
        }
      }
      zNode.contentWindow.addEventListener("load", iframeLoaded, false);
    }
  }

  async function problemPage(){
    if(await GM.getValue("beta") == -10)return;
    var problems = [];
    var allDivs = document.getElementsByTagName("DIV");
    for(var i = 0; i < allDivs.length; ++i){
      if(allDivs[i].className.indexOf("problem-card") != -1 && allDivs[i].className.indexOf("problem-card") == allDivs[i].className.length - 12)problems[problems.length] = allDivs[i];
    }
    if(problems.length == 0)return;
    var check = document.getElementById('viewAllProblem');
    if(check != null)return;
    var btView = document.createElement('button');
    btView.setAttribute('class', 'bp3-button bp3-intent-primary');
    btView.setAttribute('id', 'viewAllProblem');
    btView.innerHTML = "View All Problems";
    problems[0].parentNode.appendChild(btView);
    btView.addEventListener("click", viewAllProblem, false);
  }

  function gmMain () {
    console.log('new page');
    window.setTimeout(() => {
      problemPage();
      sc();
      var arr = document.getElementsByTagName("PRE");
      for(var i = 0; i < arr.length; i++){
        if(arr[i].getElementsByTagName("DIV").length != 0)continue;
        var zNode = document.createElement ('div');
        zNode.innerHTML = '<button id="btCopy' + i + '" type="button" class="btCopy">'
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
    if (event.altKey && (event.keyCode === 38 || event.keyCode === 40)) {
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
      if(event.keyCode === 38){
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

  async function init2(){
    if(await GM.getValue("init") != 1){
      alert('After pressing ok, a pop-up asking "A userscript wants to access a cross-origin resource." will appear (if you have never got one before).\nPlease press "Always allow".\nThis is to ensure that you will not receive these pop-ups on Contest.\nPS: this is used to access TLX\'s API for the delta predictor.');
      GM_xmlhttpRequest ( {
        method:     "GET",
        url:        'https://uriel.tlx.toki.id/api/v2/',
        onload:     function (response){

        }
      });
      GM.setValue("init", 1);
    }
  }

  init2();

})();
