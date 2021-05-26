// Navigation and Sub Navigation

import Navigation from './components/navigation';
import './components/tasklist';
import './components/pomodoro';
import './components/stopwatch';
import './components/popupwindow';

const links = document.querySelectorAll('.nav_links > li > a');
const pages = document.querySelectorAll('.page-container');

var nav = new Navigation(links, pages);
nav.getLinks();

nav.links.forEach(function(link) {
  link.addEventListener('click', function() {
    let pageID = nav.getHash(link);
    nav.setPage(pageID);
  })
}) 
// ^^ Each time the user clicks a page, it will get the correct # 
// and set the page to the correct link

const subLinks = document.querySelectorAll('.sub_nav > ul > li > a');
const subPages = document.querySelectorAll('.sub-page-container');

var subNav = new Navigation(subLinks, subPages);

subNav.links.forEach((link) => {
  link.addEventListener('click', function () {
    let pageID = subNav.getHash(link);
    subNav.setPage(pageID);
  })
})
// ^^ Each time the user clicks a page, it will get the correct # 
// and set the page to the correct link

