/* eslint-disable no-inner-declarations */
{
  ('use strict');

  const titleClickHandler = function (e) {
    e.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicled link */
    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' tp the correct article */
    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector = '.post-tags .list';

  const generateTitleList = function () {
    /* remove content of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* FOR EACH ARTICLE */
    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;

      /* insert link into html variable */
      html = html + linkHTML;
    }
    /* insert link into titleList */
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links', links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagSelector);
      tagsWrapper.innerHTML = '';

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log('tag', tag);
        /* generate HTML of the link */
        const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;

        /* add generated code to html variable */
        html = html + linkHTML;

        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      /* END LOOP: for every article: */
    }
  }

  generateTitleList();
  generateTags();
}
