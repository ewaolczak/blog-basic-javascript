'use strict';

/*
po kliknięciu linka:
  1 ustaw klasy linków:
    - usuń klasę active ze wszystkich linków na liście tytułów,
    - dodaj klasę active do klikniętego linka,
  2 ukryj wszystkie artykuły:
    - usuń klasę active ze wszystkich artykułów,
  3 znajdź artykuł do wyświetlenia:
    - z klikniętego linka weź zawartość atrybutu href, np. #article-2,
    - znajdź na stronie element pasujący do selektora takiego, jak wartość atrybutu href, np. #article-2 – czyli szukamy elementu o id="article-2",
  4 wyświetl znaleziony artykuł:
    - dodaj klasę active do znalezionego artykułu.
*/

/* document.getElementById('test-button').addEventListener('click', function () {
  const links = document.querySelectorAll('.titles a');
  console.log('links', links);
}); */

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

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
