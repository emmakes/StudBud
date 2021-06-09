class Navigation {
  constructor(links, pages) {
    this.links = links;
    this.pages = pages;
    this.currentPage = null;
  }

  getLinks() {
    console.log(this.links);
  }

  setPage(pageID) {
    this.currentPage = pageID;
    console.log(this.currentPage);

    this.links.forEach((link) => {
      link.classList.remove("active");
      if (this.getHash(link) === pageID) {
        link.classList.add("active");
      }
    });

    this.pages.forEach((page) => {
      page.style.display = "none";
    });

    document.getElementById(pageID).style.display = "block";
  }

  getHash(link) {
    return link.href.split("#")[1];
  }
}

export default Navigation;
