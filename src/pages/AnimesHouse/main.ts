import { pageInterface } from "./../pageInterface";

let film = false;

export const AnimesHouse: pageInterface = {
  name: "AnimesHouse",
  domain: "https://animeshouse.net",
  type: "anime",
  isSyncPage: function(url) {
    return true;
  },
  sync: {
    getTitle: function(url){
      if(!film) {
        return j.$("#info > h1.epih1").text();
      } else {
        return j.$("div.sheader > div.data > h1").text();
      }
    },
    getIdentifier: function(url) {
      if(!film) {
        return AnimesHouse.sync.getTitle(url).toLowerCase().replace(/\s+/g, "_");
      } else {
        return url.split("/")[4]
      }
    },
    getOverviewUrl: function(url){
      if(!film) {
        return j.$("div.pag_episodes > div:nth-child(2) > a").attr("href");
      } else {
        return url;
      }
    },
    getEpisode: function(url){
      if(!film) {
        return j.$("#info > div > h3.epih3").text().replace(/\D+/g, "");
      } else {
        return 1;
      }
    }
  },
  init(page){
    if(document.title == "Just a moment..."){
      con.log("loading");
      page.cdn();
      return;
    }
    api.storage.addStyle(require('!to-string-loader!css-loader!less-loader!./style.less').toString());
    j.$(document).ready(function(){
      if(page.url.split("/")[4] !== undefined && page.url.split("/")[4].length > 0) {
        if (page.url.split("/")[3] === "episodio") {
          let episodeText = j.$("#info > div > h3.epih3").text().toLowerCase();
          if(episodeText.length && (episodeText.indexOf("episódio") !== -1 || episodeText.indexOf("episodio") !== -1) && episodeText.indexOf("ona") == -1 && episodeText.indexOf("ova") == -1 && episodeText.indexOf("special") == -1 && episodeText.indexOf("oad") == -1 && episodeText.indexOf("oav") == -1) {
            page.handlePage();
          }
        }
        if (page.url.split("/")[3] === "filme") {
          film = true;
          page.handlePage();
        }
      }
    });
  }
};
