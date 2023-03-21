/* eslint-disable no-inner-declarations */
{
  ('use strict');

  const opts = {
    tagSize: {
      count: 5,
      classPrefix: 'tag-size-'
    }
  };

  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a.active[href^="#tag-"]',
        authors: 'a.active[href^="#"'
      }
    },
    title: '.post-title',
    article: {
      tags: '.post-tags .list',
      author: '.post-author'
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list'
    }
  };

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

  function generateTitleList(customSelector = '') {
    /* remove content of titleList */
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';

    /* FOR EACH ARTICLE */
    const articles = document.querySelectorAll(
      select.all.articles + customSelector
    );

    let html = '';

    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(select.title).innerHTML;

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

  function calculateTagParams(tags) {
    let params = { min: 999999, max: 0 };

    for (let tag in tags) {
      console.log(`${tag} is used ${tags[tag]} times`);
      params.max = tags[tag] > params.max ? tags[tag] : params.max;
      params.min = tags[tag] < params.min ? tags[tag] : params.min;
    }

    return params;
  }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const persentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(persentage * (opts.tagSize.count - 1) + 1);

    return classNumber;
  }

  function generateTags() {
    /* create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(select.article.tags);
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

        /* check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);

    /* create variable for all links HTML code */
    const tagsParams = calculateTagParams(allTags);
    console.log('tagsParams', tagsParams);
    let allTagsHTML = '';

    /* START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* generate code of a link and add it to allTagsHTML */
      allTagsHTML += `<li><a class="${
        opts.tagSize.classPrefix
      }${calculateTagClass(
        allTags[tag],
        tagsParams
      )}" href="#tag-${tag}">${tag}</a></li>`;
      /* END LOOP: for each tag in allTags: */
    }
    /*add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
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

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll(select.all.linksTo.tags);

    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {
      /* remove class active */
      activeTagLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(`a[href="${href}"]`);

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
    /* create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* START LOOP: for every article */
    for (let article of articles) {
      /* find author wrapper */
      const authorWrapper = article.querySelector(select.article.author);
      authorWrapper.innerHTML = '';

      /* make html variable with empty string */
      let html = '';

      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');

      /* generate HTML of the link */
      const linkHTML = `<a href="#${articleAuthor}">${articleAuthor}</a>`;

      /* add generated code to html variable */
      html = linkHTML;

      /* check if this link is NOT already in allAuthors */
      if (!allAuthors[articleAuthor]) {
        /* add generated code to allAuthors object */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      /* insert HTML of the link into the author wrapper */
      authorWrapper.innerHTML = `by ${html}`;

      /* END LOOP: for every article */
    }

    /* find list of authors in right column */
    const authorsList = document.querySelector(select.listOf.authors);

    /* create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* START LOOP: for each articleAuthor in allAuthors: */
    for (let articleAuthor in allAuthors) {
      /* generate code of a link and add it to allAuthorsHTML */
      allAuthorsHTML += `<li><a class="author-name" href="#${articleAuthor}">${articleAuthor}</a> (${allAuthors[articleAuthor]})</li>`;

      /* END LOOP: for each articleAuthor in allAuthors: */
    }

    /* add HTML from allAuthorsHTML to authorsList */
    authorsList.innerHTML = allAuthorsHTML;
  }

  function authorClickHandler(e) {
    /* prevent default action for this event */
    e.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#', '');

    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll(
      select.all.linksTo.authors
    );

    /* START LOOP: for each active author link */
    for (let activeAuthorLink of activeAuthorLinks) {
      /* remove class active */
      activeAuthorLink.classList.remove('active');

      /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll(`a[href="${href}"]`);

    /* START LOOP: for each found author link */
    for (let authorLink of authorLinks) {
      /* add class active */
      authorLink.classList.add('active');

      /* END LOOP: for each found author link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleList(`[data-author="${author}"]`);
  }

  function addClickListenersToAuthors() {
    /* find all links to authors */
    const authorLinks = document.querySelectorAll('.post-author a');

    /* START LOOP: for each link */
    for (let authorLink of authorLinks) {
      /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  }

  generateTitleList();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenersToAuthors();
}
