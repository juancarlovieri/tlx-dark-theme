// ==UserScript==
// @name         tlx dark theme
// @version      3.0.4
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

    async function updates() {
        // if(GM.getValue("installed") == null){
        //   GM.setValue("installed", 10);
        //   return;
        // };
        if (await GM.getValue("2.9.6") == null) {
            await GM.setValue("2.9.6", 10);
            alert('Hey there!\n\nThere is a new feature called automatic dark mode switching.\nIt automatically turns on and off dark mode depending on the time you prefer.\nCheck it out on the settings tab!');
        }
    }

    async function init() {
        updates();
        if (await GM.getValue("auto") == null) await GM.setValue("auto", -10);
        if (await GM.getValue("on") == null) await GM.setValue("on", 64800);
        if (await GM.getValue("off") == null) await GM.setValue("off", 21600);
        if (await GM.getValue("color") == null) await GM.setValue("color", "#e3e3e3");
        if (await GM.getValue("dark") == null) await GM.setValue("dark", 10);
        if (await GM.getValue("user") == null) await GM.setValue("user", 10);
        if (await GM.getValue("beta") == null) await GM.setValue("beta", -10);
        if (await GM.getValue("copy") == null) await GM.setValue("copy", 10);
        if (await GM.getValue("viewProblems") == null) await GM.setValue("viewProblems", 10);
    }

    init();

    var fireOnHashChangesToo = true;
    var pageURLCheckTimer = setInterval(
        function() {
            if (this.lastPathStr !== location.pathname ||
                this.lastQueryStr !== location.search ||
                (fireOnHashChangesToo && this.lastHashStr !== location.hash)
            ) {
                this.lastPathStr = location.pathname;
                this.lastQueryStr = location.search;
                this.lastHashStr = location.hash;
                gmMain();
            }
        }, 1000
    );

    function fadeOutToast(toast) {
        var fadeTarget = toast;
        var fadeEffect = setInterval(function() {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.01;
            } else {
                clearInterval(fadeEffect);
                document.body.removeChild(toast);
            }
        }, 1);
    }

    async function toast(str) {
        // if(await GM.getValue("beta") != 10 && str == "Copied!"){
        //   return;
        // }
        // if(await GM.getValue("beta") != 10){
        //   alert(str);
        //   return;
        // }
        var toast = document.createElement("div");
        toast.className = "bp4-overlay bp4-overlay-open bp4-overlay-inline bp4-toast-container bp4-toast-container-top bp4-toast-container-inline toast";
        toast.tabIndex = "0";
        toast.style.position = "fixed";
        toast.innerHTML = '<div class="bp4-toast bp4-intent-success bp4-overlay-content bp4-toast-appear-done bp4-toast-enter-done" tabindex="0"><span class="undefined bp4-icon" title="tick"><svg data-icon="tick" width="16" height="16" viewBox="0 0 16 16"><desc>tick</desc><path d="M14 13C13.72 13 13.47 12.89 13.29 12.71L6 5.41L2.71 8.71C2.53 8.89 2.28 9 2 9C1.45 9 1 8.55 1 8C1 7.72 1.11 7.47 1.29 7.29L5.29 3.29C5.47 3.11 5.72 3 6 3S6.53 3.11 6.71 3.29L14.71 11.29C14.89 11.47 15 11.72 15 12C15 12.55 14.55 13 14 13z" fill-rule="evenodd"></path></svg></span><span class="bp4-toast-message">' + str + '</span><div class="bp4-button-group bp4-minimal"><button type="button" class="bp4-button"><span class="undefined bp4-icon" title="cross"><svg data-icon="cross" width="16" height="16" viewBox="0 0 16 16"><desc>cross</desc><path d="M9.41 8L12.7 11.29C12.89 11.47 13 11.72 13 12C13 12.55 12.55 13 12 13C11.72 13 11.47 12.89 11.29 12.71L8 9.41L4.71 12.71C4.53 12.89 4.28 13 4 13C3.45 13 3 12.55 3 12C3 11.72 3.11 11.47 3.29 11.29L6.59 8L3.3 4.71C3.11 4.53 3 4.28 3 4C3 3.45 3.45 3 4 3C4.28 3 4.53 3.11 4.71 3.29L8 6.59L11.29 3.3C11.47 3.11 11.72 3 12 3C12.55 3 13 3.45 13 4C13 4.28 12.89 4.53 12.71 4.71L9.41 8z" fill-rule="evenodd"></path></svg></span></button></div></div>';
        document.body.appendChild(toast);

        var btClose = toast.getElementsByClassName("bp4-button")[0];
        // console.log(btClose);
        btClose.addEventListener("click", function() {
            fadeOutToast(this.parentNode.parentNode);
            // document.body.removeChild(this.parentNode.parentNode.parentNode);
        });

        var minheight = 20;
        var maxheight = 100;
        var time = 100;
        var timer = null;
        var slider = document.getElementsByClassName("bp4-toast bp4-intent-success bp4-overlay-content bp4-toast-enter-done")[0];
        // clearInterval(timer);
        var instanceheight = -10;
        slider.style.marginTop = instanceheight + 'px';
        var init = (new Date()).getTime();
        var height = 12;

        var disp = height - instanceheight;
        timer = setInterval(function() {
            var instance = (new Date()).getTime() - init;
            if (instance <= time) {
                var pos = instanceheight + Math.floor(disp * instance / time);
                slider.style.marginTop = pos + 'px';
            } else {
                slider.style.marginTop = height + 'px';
                clearInterval(timer);
            }
        }, 1);

        setTimeout(function() {
            fadeOutToast(toast);
        }, 2000);
    }

    async function apply(elem) {
        document.head.appendChild(elem);
    }

    function rmLight() {
        var cur = document.getElementById('tlx-dark-theme');
        if (cur != null) document.head.removeChild(cur);
        cur = document.getElementById("tlx-dark-theme-additional");
        if (cur != null) document.head.removeChild(cur);
    }

    async function applyDark() {
        if (await GM.getValue("dark") == -10) return;
        await rmLight();
        var style = `body{background:#252525 !important;color:#FFFFFF !important;}.bp4-card{background:#202020 !important;color:#FFFFFF !important;}.bp4-running-text table th, table.bp4-html-table th{border-color:#606060 !important;color:#e3e3e3 !important;}.single-problemset-problem-routes__title{color:#FFFFFF !important}td{border: 1px solid !important;border-color:#606060 !important;color:#e3e3e3 !important;}.programming-problem-statement__name{color:#FFFFFF !important;}.html-text pre{background-color:#151515 !important;}code{background-color:transparent !important;color:#e3e3e3 !important}pre code{background-color:transparent !important;}.content-card h3{color:#e3e3e3 !important;}.card-sidebar .bp4-tab[aria-selected=true]{background-color:#303030 !important;color:#3b73b9 !important}h1, h2, h3, h4, h5{color:#e3e3e3 !important}.rating-purple{color:#ce8aff!important; background-color:transparent !important}.rating-red{color:#ff4747 !important; background-color:transparent !important}.rating-unrated{color:#e3e3e3 !important; background-color:transparent !important}.rating-gray{color:#8c8c8c !important; background-color:transparent !important}.rating-blue{color:#757dff !important; background-color:transparent !important}.rating-green{color:#00c700 !important; background-color:transparent !important}a{background-color:transparent !important;color:#1E90FF}.content-card-link{border: 1px solid !important; border-color: #404040 !important}.content-card-link:hover{background-color:#151515 !important}.archive-filter__category{color:#FFFFFF !important}.archive-filter__option--inactive{color:#C0C0C0 !important}table.bp4-html-table.bp4-html-table-striped tbody tr:nth-child(odd) td{background:#272727}.card-sidebar .bp4-tab a{color:#1E90FF}.menubar{background-color:#353535 !important;overflow-y:hidden;}.menubar__content .bp4-tab[aria-selected=true]{background-color:#303030 !important;color:#1E90FF}.menubar__content .bp4-tab{color:#1E90FF}.form-table-input__label{color:#FFFFFF}small{color:#e3e3e3 !important}.card__title{border-bottom:1px solid;border-color:#404040}hr{border-color:#404040 !important}.bp4-breadcrumb, .bp4-breadcrumbs-collapsed{color:#909090 !important}.bp4-breadcrumb-current{color:#C0C0C0 !important}.bp4-button-group .bp4-button.bp4-active, .bp4-button-group .bp4-button:active{background:#505050 !important}.bp4-button-group .bp4-button{background:#404040 !important}.bp4-input{background:#303030;color:#C0C0C0}.bp4-button-group .bp4-button.bp4-fill, .bp4-button-group.bp4-fill .bp4-button:not(.bp4-fixed){color:#FFFFFF}.bp4-menu-item>.bp4-fill{color:#000000}.rating-red{color:#ff4747 !important; background-color:transparent !important}.bp4-file-upload-input{background-color:#303030 !important;color:#A0A0A0 !important}.header{background-color:#232323 !important}.programming-submission-details pre{background-color:#202020 !important}span.token{background-color:transparent !important}.secondary-info{color:#e3e3e3 !important}.widget-user__profile, .widget-user__profile svg{background-color:#404040;fill:#C0C0C0 !important}.form-table-input td{border:none !important}.html-text th{color:#e3e3e3 !important;background-color:#181818 !important}.menubar{overflow-x:hidden !important; box-shadow:none}table.gcj-scoreboard__content td strong.total-points-cell{color:#e3e3e3 !important}table.gcj-scoreboard__content td strong{color:black}table.gcj-scoreboard__content td strong{color:white}table.bp4-html-table.bp4-html-table-striped tbody tr:nth-child(odd) td.accepted, table.bp4-html-table.bp4-html-table-striped tbody tr:nth-child(even) td.accepted{background-color:#339933 !important;}td.accepted strong{color:black !important}table.gcj-scoreboard__content td.not-accepted small, table.gcj-scoreboard__content td.not-accepted strong{color:#e3e3e3 !important}table.gcj-scoreboard__content td.accepted small{color:#353535 !important}.gcj-scoreboard__content td small{color:#b0b0b0 !important}.bp4-button.bp4-intent-warning{background-color: #d9822b !important}.bp4-button.bp4-small, .bp4-small .bp4-button{background:transparent;border:none;color:#e3e3e3}.bp4-file-upload-input:after{background:#696969;color:#b5b5b5}.bp4-file-upload-input:hover{background:#505050 !important}.bp4-file-upload-input:hover:after{background:#696969 !important}.bp4-button.bp4-small:hover{background:#404040 !important}img:not([class]){background:white}.bp4-tabs.bp4-vertical>.bp4-tab-list .bp4-tab-indicator-wrapper .bp4-tab-indicator{background-color:#303030 !important}.html-text .spoiler{background-color:#151515 !important}.contest-registrants-dialog__body{background-color:#303030}.bp4-dialog{background-color:#202020}.bp4-dialog-header{background:#202020}.bp4-tabs.bp4-vertical{background-color:#202020 !important}.bp4-navbar-divider{background-color:#e3e3e3}table.scoreboard__content .my-rank, table.scoreboard__content .my-rank td{background-color:#404040 !important}.bp4-callout.bp4-intent-warning{background-color:#B36822 !important}p{color:` + await GM.getValue('color') + `!important}ol li, ul li{color:` + await GM.getValue('color') + `}span:not([class]){color: ` + await GM.getValue('color') + `!important}font{color:` + await GM.getValue('color') + `!important}code, pre{background-color: #202020 !important; border: 1px solid #606060 !important}`;
        var elem = document.createElement('style');
        elem.id = 'tlx-dark-theme';
        elem.type = 'text/css';
        elem.innerText = style;
        var style2 = `button#btPref{background:transparent;boc-shadow:none;border:none;color:#e3e3e3;cursor:pointer}button#btPref:focus{outline:0}#btPrefContainer{margin-top:12.5px;margin-bottom:12.5px;margin-right:15px;float:right;width:auto;height:auto;}#btCopyContainer{margin-top:-9px;margin-right:-9px;float:right;background-color:#282828;border-radius:2.5px}button#btDark:focus, button#btBeta:focus{outline:0}button#btDark, button#btBeta{cursor:pointer;color:#e3e3e3;float:right;margin-top:10px;height:20px;margin-right:10px;margin-left:10px;background:transparent !important;border:none}div#btDarkContainer, div#btBetaContainer{height:auto;width:auto;margin:auto;float:right;margin-right:10px;margin-left:10px;margin-top:5px}button.btCopy{cursor:pointer;background-color:transparent !important;color:#909090 !important;border:none;text-align:left !important;font-size:8pt;padding:4px}button.btCopy:focus{outline:0}#darkThemeCredit{text-align:center;color:#808080;height:0px}.diff{background-color:#303030 !important}`;
        var elem2 = document.createElement('style');
        elem2.id = 'tlx-dark-theme-additional';
        elem2.type = 'text/css';
        elem2.innerText = style2;
        apply(elem);
        apply(elem2);
    }

    async function rmDark() {
        var cur = await document.getElementById('tlx-dark-theme');
        if (cur != null) await document.head.removeChild(cur);
        cur = await document.getElementById("tlx-dark-theme-additional");
        if (cur != null) await document.head.removeChild(cur);
    }

    var styleLight = `button#btPref{background:transparent;boc-shadow:none;border:none;color:#404040;cursor:pointer}button#btPref:focus{outline:0}#btPrefContainer{margin-top:12.5px;margin-bottom:12.5px;margin-right:15px;float:right;width:auto;height:auto;}#btCopyContainer{margin-top:-9px;margin-right:-9px;float:right;background-color:#303030;border-radius:2.5px}button#btDark:focus, button#btBeta:focus{outline:0}button#btDark, button#btBeta{cursor:pointer;color:#e3e3e3;float:right;margin-top:10px;height:20px;margin-right:10px;margin-left:10px;background:transparent !important;border:none}div#btDarkContainer, div#btBetaContainer{height:auto;width:auto;margin:auto;float:right;margin-right:10px;margin-left:10px;margin-top:5px}button.btCopy{cursor:pointer;background-color:#e0e0e0 !important;color:#606060 !important;border:none;text-align:left !important;font-size:8pt;padding:4px}button.btCopy:focus{outline:0}#darkThemeCredit{text-align:center;height:0px}`;

    async function applyLight() {
        if (await GM.getValue("dark") == 10) return;
        await rmDark();
        var elem2 = document.createElement('style');
        elem2.id = 'tlx-dark-theme-additional';
        elem2.type = 'text/css';
        elem2.innerText = styleLight;
        apply(elem2);
    }

    async function btLight() {
        if (await GM.getValue("dark") == 10) return;
        var btDark = document.getElementById("btDark");
        btDark.innerHTML = "Light";
    }

    async function btDark() {
        if (await GM.getValue("dark") == -10) return;
        var btDark = document.getElementById("btDark");
        btDark.innerHTML = "Dark";
    }

    function credit() {
        var zNode = document.createElement('div');
        zNode.innerHTML = 'Dark Theme by Vieri Corp.™️ All Rights Reserved.'
        zNode.style.position = 'relative';
        zNode.style.height = '0';
        zNode.style.width = '100%';
        zNode.style.textAlign = 'center';
        var arr = document.getElementsByClassName('footer__text');
        if (arr.length != 1) return;
        var cur = arr[0];
        cur.prepend(zNode);
    }

    applyLight();
    applyDark();

    function cek(s) {
        var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
        for (var i = 0; i < 6; i++) {
            if (s == arr[i]) return true;
        }
        return false;
    }

    async function askColor() {
        var prevColor = await GM.getValue('color');
        if (prevColor == null) prevColor = "#e3e3e3";
        var res = prompt('what color do you prefer for the problem statements?\nCopy the Hex Color Code of the color you choose\ninclude the "#" symbol\nDefault is #E3E3E3\nTo reset to default, enter "default"\nThis will only apply on dark mode and not light mode\nThe value in the textbox is your previous choice', prevColor);
        res = res.toLowerCase();
        if (res == "default") {
            await GM.setValue('color', '#E3E3E3');
            await applyDark();
            await applyLight();
            toast('Success!');
            return;
        }
        if (res.length != 7) {
            alert('invalid! (Code:2)');
            return;
        }
        if (res[0] != '#') {
            alert('invalid! (Code:1)');
            return;
        }
        for (var i = 1; i < 7; ++i) {
            if (parseInt(res[i]) >= 0 && parseInt(res[i]) < 10) continue;
            var temp = cek(res[i]);
            if (temp) continue;
            alert('invalid! (Code:3)');
            return;
        }
        await GM.setValue('color', res);
        await applyDark();
        await applyLight();
        toast('Success!');
    }

    function pref() {
        var zNode = document.createElement('div');
        zNode.innerHTML = '<button id="btPref" type="button" class="btPref">' +
            'Preferences</button>';
        zNode.setAttribute('id', 'btPrefContainer');
        document.getElementsByClassName('menubar')[0].prepend(zNode);

        function ask() {
            askColor();
        }
        document.getElementById("btPref").addEventListener(
            "click", ask, false
        );
    }
    async function beta() {
        var zNode = document.createElement('div');
        zNode.innerHTML = '<button id="btBeta" type="button" class="btBeta> <img src="https"//foo.com alt="dark"/>' +
            'switch</button>';
        zNode.setAttribute('id', 'btBetaContainer');
        var arr = document.getElementsByClassName("bp4-navbar header");
        if (arr.length != 1) {
            return;
        }
        var head = arr[0];
        head.prepend(zNode);
        async function toggleBeta(zEvent) {
            if (await GM.getValue("beta") == 10) {
                await GM.setValue("beta", -10);
                location.reload();
            } else {
                await GM.setValue("beta", 10);
                location.reload();
            }
        }
        document.getElementById("btBeta").addEventListener(
            "click", toggleBeta, false
        );

        if (await GM.getValue("beta") == 10) {
            document.getElementById("btBeta").innerHTML = "Disable Beta";
        } else document.getElementById("btBeta").innerHTML = "Enable Beta";
    }

    var userList, scoreList, sortBy;

    function userSearchCmp(a, b) {
        if (sortBy == 'rating') {
            if (a.rating == null) return 1;
            if (b.rating == null) return -1;
            return b.rating.publicRating - a.rating.publicRating;
        }
        if (sortBy == 'score') return scoreList[b.username] - scoreList[a.username];
        if (a.username.toLowerCase() < b.username.toLowerCase()) {
            return -1;
        } else if (a.username.toLowerCase() == b.username.toLowerCase()) return 0;
        return 1;
    }

    function searchUserPress(node) {
        node = node.target;
        var searchInput = document.getElementsByClassName("bp4-input")[0];
        var res = document.createElement("div");

        var divTable = document.createElement("div");
        divTable.className = "bp4-card bp4-elevation-0 card__content";
        var table = document.createElement("table");
        table.className = "bp4-html-table bp4-html-table-striped table-list ratings-page-table";
        var head = document.createElement("thead");
        var headtr = document.createElement("tr");
        headtr.innerHTML = '<th style="width:60%;">User</th><th style="width:20%;">Rating</th><th>Score</th>';
        head.appendChild(headtr);
        table.appendChild(head);

        var body = document.createElement("tbody");
        var filtered = [];

        for (var i in userList) {
            if (userList[i].username.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1) {
                userList[i].JID = i;
                filtered[filtered.length] = userList[i];
            }
        }

        if (document.getElementById('byRating').checked) sortBy = 'rating';
        if (document.getElementById('byScore').checked) sortBy = 'score';
        if (document.getElementById('byUsername').checked) sortBy = 'username';
        filtered.sort(userSearchCmp);

        for (var i in filtered) {
            var row = document.createElement("tr");
            var username = document.createElement("td");
            if (filtered[i].country != null && filtered[i].country != "") {
                var img = document.createElement("img");
                img.alt = filtered[i].country;
                img.src = "/flags/flags-iso/shiny/24/" + filtered[i].country + ".png";
                img.className = "user-ref__flag";
                username.appendChild(img);
            }
            var handle = document.createElement("a");
            handle.href = "/profiles/" + filtered[i].username;
            handle.innerHTML = filtered[i].username;
            var rating = document.createElement("td");
            rating.innerHTML = "0";
            if (filtered[i].rating != null) {
                rating.innerHTML = filtered[i].rating.publicRating;
                handle.className = "user-ref__username rating-gray";
                var pubR = filtered[i].rating.publicRating;
                if (pubR >= 1650) handle.className = "user-ref__username rating-green";
                if (pubR >= 1750) handle.className = "user-ref__username rating-blue";
                if (pubR >= 2000) handle.className = "user-ref__username rating-purple";
                if (pubR >= 2200) handle.className = "user-ref__username rating-orange";
                if (pubR >= 2500) handle.className = "user-ref__username rating-red";
                if (pubR >= 3000) handle.className = "user-ref__username rating-legend";
            } else {
                handle.className = "user-ref__username rating-unrated";
            }

            var score = document.createElement("td");
            score.innerHTML = scoreList[filtered[i].username];
            username.appendChild(handle);
            row.appendChild(username);
            row.appendChild(rating);
            row.appendChild(score);
            body.appendChild(row);
        }
        table.appendChild(body);
        divTable.appendChild(table);
        document.getElementById("userList").innerHTML = "";
        document.getElementById("userList").appendChild(divTable);
        node.innerHTML = "Search";
        return false;
    }

    function combineRankScore(response) {
        for (var i = 0; i < response.length; ++i) {
            if (scoreList[response[i].username] == null) {
                scoreList[response[i].username] = 0;
                userList[response[i].username] = response[i];
            }
        }
    }

    function rankDownload(response) {
        response = response.responseText;
        response = JSON.parse(response);
        response = response.page;
        combineRankScore(response);
        // console.log(scoreList);
        var searchBar = document.createElement("div");
        var searchInput = document.createElement("div");
        searchInput.setAttribute("class", "bp4-form-content");
        searchInput.style.display = "inline-block";
        searchInput.id = "searchInput";
        var input = document.createElement("input");
        input.type = "text";
        input.className = "bp4-input";
        input.style.margin = "10px";
        searchInput.appendChild(input);
        searchBar.appendChild(searchInput);
        var btSearch = document.createElement("button");
        btSearch.className = "bp4-button bp4-intent-primary search-box-button";
        btSearch.addEventListener("click", searchUserPress, false);
        btSearch.innerHTML = "Search";
        btSearch.style.margin = "20px";
        searchBar.appendChild(btSearch);
        var contents = document.getElementsByClassName("layout-full-page")[0];
        contents.innerHTML = "";
        var res = document.createElement("div");
        res.id = "userList";
        res.style.display = "inline-block";
        res.style.width = "80%";
        var sort = document.createElement("div");
        sort.className = "bp4-card bp4-elevation-0 content-card";
        sort.style.display = "inline-block";
        sort.style.verticalAlign = "top";
        sort.style.width = "15%";
        sort.style.marginRight = "20px";
        sort.style.marginLeft = "10px";
        sort.innerHTML = "<h4>Sort By</h4>";
        var byRating = document.createElement("label");
        byRating.className = 'bp4-control bp4-radio';
        byRating.innerHTML = '<input name="archiveSlug" type="radio" id="byRating"><span class="bp4-control-indicator"></span><span>Rating</span>';
        var byScore = document.createElement("label");
        byScore.className = 'bp4-control bp4-radio';
        byScore.innerHTML = '<input name="archiveSlug" type="radio" id="byScore"><span class="bp4-control-indicator"></span><span>Score</span>';
        var byUsername = document.createElement("label");
        byUsername.className = 'bp4-control bp4-radio';
        byUsername.innerHTML = '<input name="archiveSlug" type="radio" id="byUsername"><span class="bp4-control-indicator"></span><span>Username</span>';
        sort.appendChild(byRating);
        sort.appendChild(byScore);
        sort.appendChild(byUsername);
        contents.appendChild(searchBar);
        contents.appendChild(sort);
        contents.appendChild(res);
        document.getElementById("byRating").click();

        btSearch.click();
    }

    function convertScoreList() {
        var res = {};
        for (var i = 0; i < scoreList.length; ++i) {
            // console.log(userList[scoreList[i].userJid);
            if (userList[scoreList[i].userJid] == null) continue;
            res[userList[scoreList[i].userJid].username] = scoreList[i].totalScores;
        }
        scoreList = res;
    }

    function userListDownload(response) {
        response = response.responseText;
        response = JSON.parse(response);
        userList = response.profilesMap;
        scoreList = response.data.page;
        convertScoreList();
        GM_xmlhttpRequest({
            method: "GET",
            url: 'https://api.tlx.toki.id/v2/profiles/top/?page=1&pageSize=1000000000',
            onload: rankDownload
        });
    }

    function userTab() {
        document.getElementById("bp4-tab-title_menubar_user").setAttribute("aria-expanded", "true");
        document.getElementById("bp4-tab-title_menubar_user").setAttribute("aria-selected", "true");
        var tabs = document.getElementsByClassName("bp4-tab");
        for (var i = 0; i < tabs.length; ++i) {
            if (tabs[i].id == "bp4-tab-title_menubar_user") continue;
            tabs[i].setAttribute("aria-expanded", "false");
            tabs[i].setAttribute("aria-selected", "false");
        }

        var contents = document.getElementsByClassName("layout-full-page")[0];
        contents.innerHTML = '<div class="bp4-progress-bar loading-state"><div class="bp4-progress-meter"></div></div>';

        GM_xmlhttpRequest({
            method: "GET",
            url: 'https://api.tlx.toki.id/v2/stats/users/top?page=1&pageSize=1000000000',
            onload: userListDownload
        });
    }

    async function savePref() {
        var textColor = document.getElementById('textColor');
        var res = textColor.value.toLowerCase();
        if (res == "default") {
            await GM.setValue('color', '#e3e3e3');
            await applyDark();
            await applyLight();
            toast('success!');
            return;
        }
        if (res.length != 7) {
            alert('invalid! (Code:2)');
            return;
        }
        if (res[0] != '#') {
            alert('invalid! (Code:1)');
            return;
        }
        for (var i = 1; i < 7; ++i) {
            if (parseInt(res[i]) >= 0 && parseInt(res[i]) < 10) continue;
            var temp = cek(res[i]);
            if (temp) continue;
            alert('invalid! (Code:3)');
            return;
        }
        await GM.setValue('color', res);
        await applyDark();
        await applyLight();

        var toggleDark = document.getElementById("toggleDark");
        if (toggleDark.checked) await GM.setValue("dark", 10);
        else await GM.setValue("dark", -10);

        var toggleBeta = document.getElementById("toggleBeta");
        if (toggleBeta.checked) await GM.setValue("beta", 10);
        else await GM.setValue("beta", -10);

        var toggleUser = document.getElementById("toggleUser");
        if (toggleUser.checked) await GM.setValue("user", 10);
        else await GM.setValue("user", -10);

        var toggleCopy = document.getElementById("toggleCopy");
        if (toggleCopy.checked) await GM.setValue("copy", 10);
        else await GM.setValue("copy", -10);

        var toggleViewProblems = document.getElementById("toggleViewProblems");
        if (toggleViewProblems.checked) await GM.setValue("viewProblems", 10);
        else await GM.setValue("viewProblems", -10);

        var toggleAuto = document.getElementById("toggleAuto");
        if (toggleAuto.checked) await GM.setValue("auto", 10);
        else await GM.setValue("auto", -10);

        var onTime = document.getElementById("textOn").value;
        var time = 0;
        var hour = onTime.substr(0, 2);
        time += parseInt(hour) * 3600;
        var minute = onTime.substr(3, 2);
        time += parseInt(minute) * 60;
        await GM.setValue("on", time);

        var offTime = document.getElementById("textOff").value;
        var time = 0;
        var hour = offTime.substr(0, 2);
        time += parseInt(hour) * 3600;
        var minute = offTime.substr(3, 2);
        time += parseInt(minute) * 60;
        await GM.setValue("off", time);

        toast('success!');
        location.reload();
    }

    async function onPrefTab() {
        var indentWidth = "330px";

        document.getElementById("bp4-tab-title_menubar_preferences").setAttribute("aria-expanded", "true");
        document.getElementById("bp4-tab-title_menubar_preferences").setAttribute("aria-selected", "true");
        var tabs = document.getElementsByClassName("bp4-tab");
        for (var i = 0; i < tabs.length; ++i) {
            if (tabs[i].id == "bp4-tab-title_menubar_preferences") continue;
            tabs[i].setAttribute("aria-expanded", "false");
            tabs[i].setAttribute("aria-selected", "false");
        }
        var contents = document.getElementsByClassName("layout-full-page")[0];
        contents.innerHTML = "";
        var textColor = document.createElement("div");
        textColor.setAttribute("class", "bp4-form-content");
        textColor.style.display = "inline-block";
        textColor.innerHTML = '<p style="width:' + indentWidth + ';margin-right:20px;display:inline-block;">Text Color: </p>'
        var input = document.createElement("input");
        input.type = "text";
        input.className = "bp4-input";
        input.id = "textColor";
        input.style.width = "auto";
        input.style.marginRight = "10px";
        input.style.display = "inline-block";
        input.value = await GM.getValue("color");
        var btInfoColor = document.createElement("div");
        btInfoColor.style.verticalAlign = "middle";
        btInfoColor.style.display = "inline-block";
        btInfoColor.style.cursor = "pointer";
        btInfoColor.title = 'Font color for problem statement.\nCopy the Hex Color Code of the color you choose\ninclude the "#" symbol.\nTo reset, enter "default"\n\nThis will only apply on dark mode';
        btInfoColor.innerHTML = '<svg data-icon="info-sign" width="20" height="20" viewBox="0 0 20 20"><desc>info-sign</desc><path style="fill: #106ba3" d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM9 4h2v2H9V4zm4 12H7v-1h2V8H8V7h3v8h2v1z" fill-rule="evenodd"></path></svg>'
        btInfoColor.addEventListener("click", () => {
            alert('Font color for problem statement.\nCopy the Hex Color Code of the color you choose\ninclude the "#" symbol.\nTo reset, enter "default"\n\nThis will only apply on dark mode');
        }, true);

        var btSave = document.createElement("button");
        btSave.className = "bp4-button bp4-intent-primary search-box-button";
        btSave.innerHTML = "Save";
        btSave.style.display = "block";
        btSave.style.marginLeft = "0";
        btSave.addEventListener("click", savePref, false);


        var toggleDarkDiv = document.createElement("div");
        var toggleDarkTitle = document.createElement("p");
        toggleDarkTitle.innerHTML = "Enable Dark Mode: "
        toggleDarkTitle.style.display = "inline-block";
        toggleDarkTitle.style.marginRight = "20px";
        toggleDarkTitle.style.width = indentWidth;

        var toggleDark = document.createElement("input");
        toggleDark.id = "toggleDark";
        toggleDark.type = "checkbox";
        toggleDark.style.width = "20px";
        toggleDark.style.display = "inline-block";
        toggleDark.style.verticalAlign = "middle";
        if (await GM.getValue("dark") == 10) toggleDark.checked = true;
        if (await GM.getValue("auto") == 10) toggleDark.disabled = true;

        var toggleBetaDiv = document.createElement("div");

        var toggleBetaTitle = document.createElement("p");
        toggleBetaTitle.innerHTML = "Enable Beta Mode: "
        toggleBetaTitle.style.display = "inline-block";
        toggleBetaTitle.style.marginRight = "20px";
        toggleBetaTitle.style.width = indentWidth;

        var toggleBeta = document.createElement("input");
        toggleBeta.id = "toggleBeta";
        toggleBeta.type = "checkbox";
        toggleBeta.style.width = "20px";
        toggleBeta.style.display = "inline-block";
        toggleBeta.style.verticalAlign = "middle";
        if (await GM.getValue("beta") == 10) toggleBeta.checked = true;

        var toggleUserDiv = document.createElement("div");

        var toggleUserTitle = document.createElement("p");
        toggleUserTitle.innerHTML = "Enable User Search Tab: "
        toggleUserTitle.style.display = "inline-block";
        toggleUserTitle.style.marginRight = "20px";
        toggleUserTitle.style.width = indentWidth;

        var toggleUser = document.createElement("input");
        toggleUser.id = "toggleUser";
        toggleUser.type = "checkbox";
        toggleUser.style.width = "20px";
        toggleUser.style.display = "inline-block";
        toggleUser.style.verticalAlign = "middle";
        if (await GM.getValue("user") == 10) toggleUser.checked = true;

        var toggleCopyDiv = document.createElement("div");

        var toggleCopyTitle = document.createElement("p");
        toggleCopyTitle.innerHTML = "Enable Copy Buttons on sample: "
        toggleCopyTitle.style.display = "inline-block";
        toggleCopyTitle.style.marginRight = "20px";
        toggleCopyTitle.style.width = indentWidth;

        var toggleCopy = document.createElement("input");
        toggleCopy.id = "toggleCopy";
        toggleCopy.type = "checkbox";
        toggleCopy.style.width = "20px";
        toggleCopy.style.display = "inline-block";
        toggleCopy.style.verticalAlign = "middle";
        if (await GM.getValue("copy") == 10) toggleCopy.checked = true;

        var toggleViewProblemsDiv = document.createElement("div");

        var toggleViewProblemsTitle = document.createElement("p");
        toggleViewProblemsTitle.innerHTML = 'Enable "View All Problems" button: '
        toggleViewProblemsTitle.style.display = "inline-block";
        toggleViewProblemsTitle.style.marginRight = "20px";
        toggleViewProblemsTitle.style.width = indentWidth;

        var toggleViewProblems = document.createElement("input");
        toggleViewProblems.id = "toggleViewProblems";
        toggleViewProblems.type = "checkbox";
        toggleViewProblems.style.width = "20px";
        toggleViewProblems.style.display = "inline-block";
        toggleViewProblems.style.verticalAlign = "middle";
        if (await GM.getValue("viewProblems") == 10) toggleViewProblems.checked = true;

        var toggleAutoDiv = document.createElement("div");

        var toggleAutoTitle = document.createElement("p");
        toggleAutoTitle.innerHTML = 'Enable automatic dark/light mode switching: '
        toggleAutoTitle.style.display = "inline-block";
        toggleAutoTitle.style.marginRight = "20px";
        toggleAutoTitle.style.width = indentWidth;

        var toggleAuto = document.createElement("input");
        toggleAuto.id = "toggleAuto";
        toggleAuto.type = "checkbox";
        toggleAuto.style.width = "20px";
        toggleAuto.style.display = "inline-block";
        toggleAuto.style.verticalAlign = "middle";
        // if (await GM.getValue("beta") != 10)toggleAuto.disabled = true;
        if (await GM.getValue("auto") == 10) toggleAuto.checked = true;

        var textOn = document.createElement("div");
        textOn.setAttribute("class", "bp4-form-content");
        // textOn.style.display = "inline-block";
        textOn.innerHTML = '<p style="width:' + indentWidth + ';margin-right:20px;display:inline-block;">Automatic turn on time: </p>'
        var inputOn = document.createElement("input");
        inputOn.type = "time";
        inputOn.className = "bp4-input";
        inputOn.id = "textOn";
        inputOn.style.width = "auto";
        inputOn.style.marginRight = "10px";
        inputOn.style.display = "inline-block";
        // inputOn.value = "09:02";
        var hour = Math.floor(await GM.getValue("on") / 3600);
        // console.log(hour);
        var minute = Math.floor(await GM.getValue("on") / 60) - hour * 60;
        var humanReadable = "";
        if (hour < 10) humanReadable = "0" + hour.toString();
        else humanReadable = hour.toString();
        humanReadable += ":";
        if (minute < 10) humanReadable += "0" + minute.toString();
        else humanReadable += minute.toString();
        // console.log(minute);
        inputOn.value = humanReadable;
        var btInfoOn = document.createElement("div");
        btInfoOn.style.verticalAlign = "middle";
        btInfoOn.style.display = "inline-block";
        btInfoOn.style.cursor = "pointer";
        btInfoOn.title = 'when would you like the dari theme to turn on?';
        btInfoOn.innerHTML = '<svg data-icon="info-sign" width="20" height="20" viewBox="0 0 20 20"><desc>info-sign</desc><path style="fill: #106ba3" d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM9 4h2v2H9V4zm4 12H7v-1h2V8H8V7h3v8h2v1z" fill-rule="evenodd"></path></svg>'
        btInfoOn.addEventListener("click", () => {
            alert('when would you like the dari theme to turn on?');
        }, true);

        var textOff = document.createElement("div");
        textOff.setAttribute("class", "bp4-form-content");
        // textOff.style.display = "inline-block";
        textOff.innerHTML = '<p style="width:' + indentWidth + ';margin-right:20px;display:inline-block;">Automatic turn off time: </p>'
        var inputOff = document.createElement("input");
        inputOff.type = "time";
        inputOff.className = "bp4-input";
        inputOff.id = "textOff";
        inputOff.style.width = "auto";
        inputOff.style.marginRight = "10px";
        inputOff.style.display = "inline-block";
        // inputOff.value = "09:02";
        hour = Math.floor(await GM.getValue("off") / 3600);
        // console.log(hour);
        minute = Math.floor(await GM.getValue("off") / 60) - hour * 60;
        humanReadable = "";
        if (hour < 10) humanReadable = "0" + hour.toString();
        else humanReadable = hour.toString();
        humanReadable += ":";
        if (minute < 10) humanReadable += "0" + minute.toString();
        else humanReadable += minute.toString();
        // console.log(minute);
        inputOff.value = humanReadable;
        var btInfoOff = document.createElement("div");
        btInfoOff.style.verticalAlign = "middle";
        btInfoOff.style.display = "inline-block";
        btInfoOff.style.cursor = "pointer";
        btInfoOff.title = 'when would you like the dari theme to turn on?';
        btInfoOff.innerHTML = '<svg data-icon="info-sign" width="20" height="20" viewBox="0 0 20 20"><desc>info-sign</desc><path style="fill: #106ba3" d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zM9 4h2v2H9V4zm4 12H7v-1h2V8H8V7h3v8h2v1z" fill-rule="evenodd"></path></svg>'
        btInfoOff.addEventListener("click", () => {
            alert('when would you like the dari theme to turn on?');
        }, true);

        textOff.appendChild(inputOff);
        textOff.appendChild(btInfoOff);
        textOn.appendChild(inputOn);
        textOn.appendChild(btInfoOn);
        toggleAutoDiv.appendChild(toggleAutoTitle);
        toggleAutoDiv.appendChild(toggleAuto);
        toggleViewProblemsDiv.appendChild(toggleViewProblemsTitle);
        toggleViewProblemsDiv.appendChild(toggleViewProblems);
        toggleCopyDiv.appendChild(toggleCopyTitle);
        toggleCopyDiv.appendChild(toggleCopy);
        toggleUserDiv.appendChild(toggleUserTitle);
        toggleUserDiv.appendChild(toggleUser);
        toggleBetaDiv.appendChild(toggleBetaTitle);
        toggleBetaDiv.appendChild(toggleBeta);
        toggleDarkDiv.appendChild(toggleDarkTitle);
        toggleDarkDiv.appendChild(toggleDark);
        textColor.appendChild(input);
        textColor.appendChild(btInfoColor);
        contents.appendChild(textColor);
        contents.appendChild(toggleDarkDiv);
        contents.appendChild(toggleBetaDiv);
        contents.appendChild(toggleUserDiv);
        contents.appendChild(toggleCopyDiv);
        contents.appendChild(toggleViewProblemsDiv);
        contents.appendChild(toggleAutoDiv);
        contents.appendChild(textOn);
        contents.appendChild(textOff);
        contents.appendChild(btSave);
    }

    function retractUserTab(node) {
        node = node.target
        document.getElementById("bp4-tab-title_menubar_user").setAttribute("aria-expanded", "false");
        document.getElementById("bp4-tab-title_menubar_user").setAttribute("aria-selected", "false");
    }

    function retractPrefTab(node) {
        node = node.target
        document.getElementById("bp4-tab-title_menubar_preferences").setAttribute("aria-expanded", "false");
        document.getElementById("bp4-tab-title_menubar_preferences").setAttribute("aria-selected", "false");
        // console.log(node.href);
        if (node.href != "" && node.href != null && location.href.indexOf(node.href) != -1) {
            location.replace(node.href);
        }
    }

    async function searchUser() {
        // if(await GM.getValue("beta") == -10)return;
        if (await GM.getValue("user") == -10) return;
        if (document.getElementById("bp4-tab-title_menubar_user") != null) {
            return;
        }
        var tabs = document.getElementsByClassName("bp4-tab");
        for (var i = 0; i < tabs.length; ++i) {
            tabs[i].addEventListener("click", retractUserTab, false);
        }
        var tablist = document.getElementsByClassName("bp4-tab-list")[0];
        var newTab = document.createElement("div");
        newTab.ariaDisabled = "false";
        newTab.ariaExpanded = "false";
        newTab.id = "bp4-tab-title_menubar_user";
        newTab.className = "bp4-tab";
        newTab.setAttribute("role", "tab");
        newTab.setAttribute("tabindex", "0");
        newTab.setAttribute("aria-controls", "bp4-tab-panel_menubar_ranking");
        newTab.innerHTML = "<a> User Search </a>";
        newTab.addEventListener("click", userTab, false);
        tablist.appendChild(newTab);
    }

    async function prefTab() {
        // if(await GM.getValue("beta") == -10)return;
        if (document.getElementById("bp4-tab-title_menubar_preferences") != null) {
            return;
        }
        var tabs = document.getElementsByClassName("bp4-tab");
        for (var i = 0; i < tabs.length; ++i) {
            tabs[i].addEventListener("click", retractPrefTab, false);
        }
        var tablist = document.getElementsByClassName("bp4-tab-list")[0];
        var newTab = document.createElement("div");
        newTab.ariaDisabled = "false";
        newTab.ariaExpanded = "false";
        newTab.id = "bp4-tab-title_menubar_preferences";
        newTab.className = "bp4-tab";
        newTab.setAttribute("role", "tab");
        newTab.setAttribute("tabindex", "0");
        newTab.setAttribute("aria-controls", "bp4-tab-panel_menubar_ranking");
        newTab.innerHTML = "<a> Settings </a>";
        newTab.addEventListener("click", onPrefTab, false);
        tablist.appendChild(newTab);
    }

    window.addEventListener("load", async function() {
        // await beta();
        await searchUser();
        await prefTab();
        credit();
        // pref();

        // var zNode = document.createElement ('div');
        // zNode.innerHTML = '<button id="btDark" type="button" class="btDark> <img src="https"//foo.com alt="dark"/>'
        //                 + 'switch</button>'
        //                 ;
        // zNode.setAttribute ('id', 'btDarkContainer');
        // var arr = document.getElementsByClassName("bp4-navbar header");
        // if(arr.length != 1){
        //   return;
        // }
        // var head = arr[0];
        // head.prepend(zNode);
        // async function toggle(zEvent){
        //   if(await GM.getValue("dark") == 10){
        //     await GM.setValue("dark", -10);
        //     applyLight();
        //     btLight();
        //   } else {
        //     await GM.setValue("dark", 10);
        //     applyDark();
        //     btDark();
        //   }
        // }
        // document.getElementById("btDark").addEventListener (
        //     "click", toggle, false
        // );
        // btDark();
        // btLight();
    }, false);

    function sigmoid(t) {
        return 1 / (1 + Math.pow(Math.E, -t));
    }

    function getRating(usr, uti) {
        var def = {
            hiddenRating: 1800,
            publicRating: 1800
        };
        // console.log(uti);
        if (uti.get(usr).rating == null) return def;
        return uti.get(usr).rating;
    }

    function score(a, b, n) {
        // console.log(Math.max(10, (sigmoid(Math.sqrt(b / a)) - 0.7) * Math.log2(n) * 1800));
        return Math.max(10, (sigmoid(Math.sqrt(b / a)) - 0.7) * Math.log2(n) * 1800);
    }

    function calc(usr, id, response, element, flag, overrideRating, overrideHidRating, overrideRank) {
        // console.log(JSON.parse(response.body).data.scoreboard.content.entries);
        // console.log(JSON.parse(response.body).profilesMap);
        var uti = new Map(Object.entries(JSON.parse(response.responseText).profilesMap));
        var uid = -1;
        uti.forEach(function lol(value, key) {
            if (value.username == usr) {
                uid = key;
            }
        });
        if (uid == -1) {
            return;
        }
        var sc = JSON.parse(response.responseText).data.scoreboard.content.entries;
        if (flag) {
            var newConf = uti.get(uid);
            newConf.rating = {
                publicRating: parseInt(overrideRating),
                hiddenRating: parseInt(overrideHidRating),
            }
            uti.set(uid, newConf);
        }
        if (flag) {
            for (var i = 0; i < sc.length; ++i) {
                if (sc[i].contestantJid != uid) continue;
                sc[i].rank = parseInt(overrideRank);
            }
        }
        // console.log(sc[i]);
        // console.log(sc);
        var ustats = -1;
        var n = 0;
        for (var i = 0; i < sc.length; i++) {
            if (sc[i].contestantJid == uid) {
                ustats = sc[i];
            }
            var counter = 0;
            for (var j = 0; j < sc[i].attemptsList.length; j++) {
                counter += sc[i].attemptsList[j];
            }
            if (counter == 0) {
                continue;
            }
            ++n;
        }
        if (ustats == -1) {
            return;
        }
        // console.log(n);
        var delta = 0;
        var myHid = getRating(uid, uti).hiddenRating;
        for (var i = 0; i < sc.length; i++) {
            var counter = 0;
            for (var j = 0; j < sc[i].attemptsList.length; j++) {
                counter += sc[i].attemptsList[j];
            }
            if (counter == 0) {
                continue;
            }
            if (sc[i].contestantJid == uid) continue;
            if (sc[i].rank > ustats.rank) {
                var oppHid = getRating(sc[i].contestantJid, uti).hiddenRating;
                delta += score(myHid, oppHid, n);
            }
            if (sc[i].rank < ustats.rank) {
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
        if (delta >= 0) {
            newRating += 0.2 * delta;
            debt += 0.8 * delta;
            if (debt > 0) {
                newRating += debt;
                debt = 0;
            }
        }
        if (delta < 0) {
            debt += delta;
            newRating += 0.5 * debt;
            debt = 0.5 * debt;
        }
        // console.log(newRating);
        newRating = Math.floor(newRating);
        if (flag) return newRating;
        if (element.getElementsByClassName("diff").length != 0) return;
        var zNode = document.createElement('td');
        var col = 'white';
        if (newRating > getRating(uid, uti).publicRating) {
            col = 'green';
        } else if (newRating < getRating(uid, uti).publicRating) {
            col = 'red';
        }
        zNode.innerHTML = newRating - getRating(uid, uti).publicRating;
        if (zNode.innerHTML > 0) zNode.innerHTML = '+' + zNode.innerHTML;
        zNode.innerHTML = '<strong style="color:' + col + '">' + zNode.innerHTML + '</strong>';
        zNode.className = "diff";
        element.append(zNode);
    }

    function sc() {
        var arr = document.getElementsByTagName("BODY");
        if (arr.length == 0) return;
        arr = arr[0];
        var temp = arr.getElementsByClassName("contest-scoreboard-page__info");
        arr = arr.getElementsByClassName("bp4-html-table bp4-html-table-striped scoreboard__content gcj-scoreboard__content");
        if (temp.length == 0) return;
        applyLight();
        applyDark();
        if (arr.length == 0) return;
        var sc = arr[0];
        sc = sc.getElementsByTagName("TBODY");
        if (sc.length == 0) return;
        sc = sc[0];
        sc = sc.getElementsByTagName("TR");
        sc2();
        var contest = document.URL.toString();
        contest = contest.split("/");
        contest = contest[contest.length - 2];
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://api.tlx.toki.id/api/v2/contest-web/slug/" + contest + "/with-config",
            onload: function(response) {
                if (response.status >= 300) return;
                var id = JSON.parse(response.responseText).contest.jid;
                // console.log(id);
                GM_xmlhttpRequest({
                    method: "GET",
                    url: 'https://api.tlx.toki.id/api/v2/contests/' + id + '/scoreboard',
                    onload: function(response) {
                        if (response.status >= 300) return;
                        // console.log(id);
                        for (var i = 0; i < sc.length; i++) {
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

    function present(usr, contest, toggle) {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://api.tlx.toki.id/api/v2/contest-web/slug/" + contest + "/with-config",
            onload: function(response) {
                if (response.status >= 300) return;
                var id = JSON.parse(response.responseText).contest.jid;
                // console.log(id);
                GM_xmlhttpRequest({
                    method: "GET",
                    url: 'https://api.tlx.toki.id/api/v2/contests/' + id + '/scoreboard',
                    onload: function(response) {
                        if (response.status >= 300) return;
                        var uti = new Map(Object.entries(JSON.parse(response.responseText).profilesMap));
                        var uid = -1;
                        uti.forEach(function lol(value, key) {
                            if (value.username == usr) {
                                uid = key;
                            }
                        });
                        if (uid == -1) {
                            toggle.setAttribute('onclick', "return false;");
                            toggle.setAttribute('disabled', "disabled");
                        }
                    }
                });
            }
        });
        // console.log(usr);
    }

    function sc2() {
        if (document.getElementsByClassName("predictbyrank").length != 0) return;
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
        for (var i = 0; i < usr.length; i++) {
            if (usr[i].getAttribute('data-key') == 'username') {
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
        toggle.addEventListener("click", function() {
            if (toggle.checked) {
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
        // <button type="submit" class="bp4-button bp4-intent-primary"></button>
        var resDelta = document.createElement("p");
        resDelta.innerHTML = "My delta would be: <strong>-</strong>";
        var btCalc = document.createElement("button");
        btCalc.setAttribute("class", "bp4-button bp4-intent-primary");
        btCalc.innerHTML = '<span class="bp4-button-text">calculate</span>';
        btCalc.addEventListener("click", function() {
            var usr = document.querySelectorAll("[data-key]");
            // console.log(usr);
            for (var i = 0; i < usr.length; i++) {
                if (usr[i].getAttribute('data-key') == 'username') {
                    usr = usr[i].innerHTML;
                    break;
                }
            }
            // console.log(usr);
            var contest = document.URL.toString();
            contest = contest.split("/");
            contest = contest[contest.length - 2];
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://api.tlx.toki.id/api/v2/contest-web/slug/" + contest + "/with-config",
                onload: function(response) {
                    if (response.status >= 300) return;
                    var id = JSON.parse(response.responseText).contest.jid;
                    // console.log(id);
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: 'https://api.tlx.toki.id/api/v2/contests/' + id + '/scoreboard',
                        onload: function(response) {
                            if (response.status >= 300) return;
                            var newRating = custVal.value;
                            var newHidRating = custVal.value;
                            if (toggle.checked) {
                                var uti = new Map(Object.entries(JSON.parse(response.responseText).profilesMap));
                                var uid = -1;
                                uti.forEach(function lol(value, key) {
                                    if (value.username == usr) {
                                        uid = key;
                                    }
                                });
                                if (uid == -1) {
                                    return;
                                }
                                newRating = getRating(uid, uti).publicRating;
                                newHidRating = getRating(uid, uti).hiddenRating;
                            }
                            if (newRating == "") return;
                            var delta = calc(usr, id, response, 0, true, newRating, newHidRating, input.value) - newRating;
                            var col = 'red';
                            if (delta > 0) {
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
        var el = document.getElementsByClassName("bp4-card bp4-elevation-0 content-card")[0];
        el.append(zNode);
        el.append(askRating);
        el.append(customRating);
        el.append(resDelta);
        el.append(btCalc);
    }

    var problemCount, loadedCount = 0,
        resPage = document.createElement("div"),
        arr = [],
        allLinks = [];

    function cmp(a, b) {
        var idx1 = -1,
            idx2 = -1;
        for (var i = 0; i < allLinks.length; ++i) {
            if (allLinks[i] == a[1]) idx1 = i;
            if (allLinks[i] == b[1]) idx2 = i;
        }
        if (idx1 == -1 || idx2 == -1) {
            alert("an error occured, error code: 5");
        }
        if (idx1 < idx2) return -1;
        if (idx1 > idx2) return 1;
        return 0;
    }

    function loadedProblem(page, url) {
        loadedCount++;
        arr[arr.length] = [page, url];
        if (loadedCount < problemCount) return;
        if (loadedCount > problemCount) {
            console.log("ERROR");
            alert("an error occured, error code: 4");
        }
        arr.sort(cmp);
        for (var i = 0; i < arr.length; ++i) {
            resPage.appendChild(arr[i][0]);
        }
        loadedCount = 0;
        problemCount = 0;
        arr = [], allLinks = [];
        var doc = document.implementation.createHTMLDocument("View Problems");
        doc.body.appendChild(resPage);
        var allStyle = document.head.getElementsByTagName("*");
        for (var i = 0; i < allStyle.length; ++i) {
            if (allStyle[i].tagName == "TITLE") continue;
            doc.head.appendChild((allStyle[i].cloneNode()));
        }

        var elem2 = doc.createElement('style');
        elem2.id = 'tlx-dark-theme-additional';
        elem2.type = 'text/css';
        elem2.innerText = styleLight;
        doc.head.appendChild(elem2);

        var newWindow = window.open();
        newWindow.document.open();
        newWindow.document.write(doc.documentElement.innerHTML);
        newWindow.document.close();
        resPage = document.createElement("div");

    }

    function iframeLoaded(node) {
        node = node.target
        setTimeout(function() {
            loadedProblem(node.getElementsByClassName("programming-problem-worksheet")[0], node.URL);
        }, 5000);
    }

    function viewAllProblem() {
        var problems = [];
        var allDivs = document.getElementsByTagName("DIV");
        for (var i = 0; i < allDivs.length; ++i) {
            if (allDivs[i].className.indexOf("problem-card") != -1 && allDivs[i].className.indexOf("problem-card") == allDivs[i].className.length - 12) problems[problems.length] = allDivs[i];
        }
        // console.log(problems);
        if (problems.length == 0) return;
        problemCount = problems.length;
        for (var i = 0; i < problems.length; ++i) {
            var link = problems[i].getElementsByTagName("DIV")[0];
            link = link.getElementsByClassName("content-card-link")[0];
            allLinks[i] = link.href;
        }
        for (var i = 0; i < problems.length; ++i) {
            var link = problems[i].getElementsByTagName("DIV")[0];
            link = link.getElementsByClassName("content-card-link")[0];
            var zNode = document.createElement('iframe');
            zNode.setAttribute('class', 'loadProblemPage');
            zNode.setAttribute('height', '0');
            zNode.setAttribute('width', '0');
            zNode.src = link.href;
            document.body.appendChild(zNode);
            zNode.onreadystatechange = function(e) {
                if (zNode.readyState == 'complete') {
                    iframeLoaded(e);
                }
            }
            zNode.contentWindow.addEventListener("load", iframeLoaded, false);
        }
    }

    async function problemPage() {
        // if(await GM.getValue("beta") == -10)return;
        if (await GM.getValue("viewProblems") == -10) return;
        var problems = [];
        var allDivs = document.getElementsByTagName("DIV");
        for (var i = 0; i < allDivs.length; ++i) {
            if (allDivs[i].className.indexOf("problem-card") != -1 && allDivs[i].className.indexOf("problem-card") == allDivs[i].className.length - 12) problems[problems.length] = allDivs[i];
        }
        if (problems.length == 0) return;
        var check = document.getElementById('viewAllProblem');
        if (check != null) return;
        var btView = document.createElement('button');
        btView.setAttribute('class', 'bp4-button bp4-intent-primary');
        btView.setAttribute('id', 'viewAllProblem');
        btView.innerHTML = "View All Problems";
        problems[0].parentNode.appendChild(btView);
        btView.addEventListener("click", viewAllProblem, false);
    }

    async function copyButton() {
        if (await GM.getValue("copy") != 10) return;
        var arr = document.getElementsByTagName("PRE");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].getElementsByTagName("DIV").length != 0) continue;
            var zNode = document.createElement('div');
            zNode.innerHTML = '<button id="btCopy' + i + '" type="button" class="btCopy">' +
                'Copy</button>';
            zNode.setAttribute('id', 'btCopyContainer');
            arr[i].prepend(zNode);

            function copy(zEvent) {
                var res = zEvent.path[2].innerText;
                res = res.substr(5);
                navigator.clipboard.writeText(res);
                toast("Copied!");
            }
            document.getElementById("btCopy" + i).addEventListener(
                "click", copy, false
            );
        }
    }

    function turnon() {
        GM.setValue("dark", 10);
        applyLight();
        applyDark();
        setTimeout(() => {
            turnon();
        }, 86400000);
    }

    function turnoff() {
        GM.setValue("dark", -10);
        applyLight();
        applyDark();
        setTimeout(() => {
            turnoff();
        }, 86400000);
    }

    async function autos() {
        // if(await GM.getValue("beta") != 10){
        //   await GM.setValue("auto", -10);
        //   return;
        // }
        if (await GM.getValue("auto") != 10) return;
        var d = new Date();
        var cur = d.getHours() * 3600;
        cur += d.getMinutes() * 60;
        cur += d.getSeconds();
        var toOn = await GM.getValue("on") - cur;
        if (toOn < 0) toOn += 86400;
        var toOff = await GM.getValue("off") - cur;
        if (toOff < 0) toOff += 86400;

        var timeon = await GM.getValue("on");
        var timeoff = await GM.getValue("off");
        if (timeon > timeoff) {
            if (cur <= timeoff) cur += 86400;
            timeoff += 86400;
        }

        if (toOn > toOff) {
            GM.setValue("dark", 10);
            applyLight();
            applyDark();
        } else {
            console.log("TES");
            GM.setValue("dark", -10);
            applyLight();
            applyDark();
        }

        setTimeout(() => {
            turnon();
        }, toOn * 1000);

        setTimeout(() => {
            turnoff();
        }, toOff * 1000);
    }

    autos();

    function gmMain() {
        console.log('new page');
        window.setTimeout(() => {
            problemPage();
            sc();
            copyButton();
        }, 3000);
    };

    document.addEventListener('keydown', function(event) {
        if (event.altKey && (event.keyCode === 38 || event.keyCode === 40)) {
            var tab = document.getElementsByClassName("bp4-tabs bp4-vertical");
            if (tab.length != 1) return;
            tab = tab[0];
            tab = tab.getElementsByClassName('bp4-tab-list');
            if (tab.length != 1) return;
            tab = tab[0];
            var arr = tab.querySelectorAll(".bp4-tab");
            var indx = -1;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].ariaExpanded == "true") {
                    indx = i;
                    break;
                }
            }
            if (indx == -1) return;
            if (event.keyCode === 38) {
                indx--;
                if (indx < 0) {
                    indx = arr.length - 1;
                }
            } else {
                indx++;
                if (indx >= arr.length) {
                    indx = 0;
                }
            }
            var press = arr[indx].getElementsByTagName("A");
            if (press.length != 1) return;
            press = press[0];
            press.click();
        }
    });

    async function init2() {
        if (await GM.getValue("init") != 1) {
            alert('After pressing ok, a pop-up asking "A userscript wants to access a cross-origin resource." will appear (if you have never got one before).\nPlease press "Always allow".\nThis is to ensure that you will not receive these pop-ups on Contest.\nPS: this is used to access TLX\'s API for the delta predictor.');
            GM_xmlhttpRequest({
                method: "GET",
                url: 'https://api.tlx.toki.id/api/v2',
                onload: function(response) {

                }
            });
            GM.setValue("init", 1);
        }
    }

    init2();

})();