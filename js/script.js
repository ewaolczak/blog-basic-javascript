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
    optArticleTagSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

  function generateTitleList(customSelector = '') {
    /* remove content of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* FOR EACH ARTICLE */
    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );

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

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

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

  function tagClickHandler(e) {
    /* prevent default action for this event */
    e.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag', tag);

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {
      /* remove class active */
      activeTagLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(`a[href="$${href}"]`);

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleList(`[data-tags~="${tag}"]`);
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const tagsLinks = document.querySelectorAll('.post-tags a');

    /* START LOOP: for each link */
    for (let tagLink of tagsLinks) {
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }

  function generateAuthors() {
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      authorWrapper.innerHTML = '';

      let html = '';

      const articleAuthor = article.getAttribute('data-author');

      const authorLink = `<a href="#${articleAuthor}">${articleAuthor}</a>`;

      html = authorLink;

      authorWrapper.innerHTML = `by ${html}`;
    }
  }

  function authorClickHandler(e) {
    e.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#', '');
    const clickedAuthors = document.querySelectorAll('a.active p[href^="#"]');

    for (let clickedAuthor of clickedAuthors) {
      clickedAuthor.classList.remove('active');
    }

    const authorLinks = document.querySelectorAll(`a[href="${href}"]`);

    for (let authorLink of authorLinks) {
      authorLink.classList.add('active');
      console.log('authorLink', authorLink);
    }

    generateTitleList(`[data-author="${author}"]`);
  }

  function addClickListenersToAuthors() {
    const authorLinks = document.querySelectorAll('.post-author a');
    console.log('authorLinks', authorLinks);

    for (let authorLink of authorLinks) {
      authorLink.addEventListener('click', authorClickHandler);
    }
  }

  generateTitleList();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenersToAuthors();
}
