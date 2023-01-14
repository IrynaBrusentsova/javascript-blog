'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /*[DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /*[DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  /*[DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

// ====================
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';
  
function generateTitleLinks() {
  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  function clearMessages() {
  titleList.querySelectorAll('*').forEach((titleList) => titleList.remove());
  } clearMessages();
  /*[DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  articles.forEach((article) => {
  /*[DONE] get the article id */
  const articleId = article.id;
  /*[DONE] find the title element */
  const articleTitle = article.querySelector(optTitleSelector);
  /*[DONE] get the title from the title element */
  const title = articleTitle.innerHTML;
  /*[DONE] create HTML of the link */
  const link = '<li><a href="#' + articleId + '"><span>' + title + '</span></a></li>';
  /*[DONE] insert link into titleList */
  titleList.innerHTML = titleList.innerHTML + link;

  });
}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

// =====MODULE 6 =============
function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = ' ';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
  for (let tag of articleTagsArray) {
    /* generate HTML of the link */
    const link = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
    /* add generated code to html variable */
    let html = ' ' + link;
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = tagWrapper.innerHTML + html;
    }
    /* END LOOP: for each tag */
    /* END LOOP: for every article: */
  }
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.querySelectorAll('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {
    /* remove class active */
    tagLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = href.querySelectorAll('href');
  /* START LOOP: for each found tag link */
  for (let tagLink of allTagLinks){
    /* add class active */
    tagLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const allTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let  allTagLink of  allTagLinks){
    /* add tagClickHandler as event listener for that link */
    allTagLink.addEventListener('click', tagClickHandler);
  }/* END LOOP: for each link */
}
addClickListenersToTags();

// ===============AUTHOR 

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
    for (let article of articles){
      /* find tags wrapper */
      const tagWrapperAuthor = article.querySelector(optArticleAuthorSelector);
      /* make html variable with empty string */
      let html = ' ';
       /* get tags from data-author attribute */
      const articleTagsAuthor = article.getAttribute('data-author');
      /* generate HTML of the link */
      const link = '<a href="#' + articleTagsAuthor + '">' + articleTagsAuthor + '</a>';
      /* add generated code to html variable */
       html = ' ' + link;
      /* insert HTML of all the links into the tags wrapper */
      tagWrapperAuthor.innerHTML =  tagWrapperAuthor.innerHTML + html;
      /* END LOOP: for every article: */
  }   
}
generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.querySelectorAll('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#author', '');
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#author"]');
  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {
    /* remove class active */
    tagLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = href.querySelectorAll('href');
  /* START LOOP: for each found tag link */
  for (let tagLink of allTagLinks){
    /* add class active */
    tagLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */
 /* execute function "generateAuthor" with article selector as argument */
  generateAuthor('[data-author="' + articleTagsAuthor + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const allTagLinks = document.querySelectorAll('a.active[href^="#author"]');
  /* START LOOP: for each link */
  for(let  allTagLink of  allTagLinks){
  /* add tagClickHandler as event listener for that link */
  allTagLink.addEventListener('click', authorClickHandler);
  }/* END LOOP: for each link */
}
addClickListenersToAuthors();



// ============TAG CLOUD
const optTagsListSelector = '.tags.list';

//========TEMPLATES

// ========END TEMPLATES

const blockForMouse = document.querySelector('.posts')
blockForMouse.addEventListener("mouseover", function (event) {
  let target = event.target.closest('.post-title');
  // переход не на <.post-title> - ігнорувати
  if (!target) return;
  target.style.cssText = `background-color: #77608d`;
});

blockForMouse.addEventListener("mouseout", function (event) {
  let target = event.target.closest('.post-title');
  // переход не на <.post-title> - ігнорувати
  if (!target) return;
  target.style.cssText = ``;
})





