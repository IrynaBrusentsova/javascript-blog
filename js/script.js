'use strict';
// для посилання на статтю, розміщеного в лівій колонці,
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML)
}

// для посилання на тег, розміщеного в кінці кожної статті,
const templates1 = {
  articleLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML)
}

// для посилання на автора, розміщеного під заголовком кожної статті,
const templates2 = {
  articleLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
}
// для посилання на тег, розміщеного в хмарі тегів у правій колонці,
const templates3 = {
  articleLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
}

// для посилання на автора, розміщеного у списку, в правій колонці.


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
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.authors.list',
  cloudClassCount = 5,
  cloudClassPrefix = 'tag-size-';


  function generateTitleLinks(customSelector = '') {
    /*[DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    function clearMessages() {
      titleList.querySelectorAll('*').forEach((titleList) => titleList.remove());
    } clearMessages();
    /*[DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    articles.forEach((article) => {
      /*[DONE] get the article id */
      const articleId = article.id;
      /*[DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector);
      /*[DONE] get the title from the title element */
      const title = articleTitle.innerHTML;
      /*[DONE] create HTML of the link */
      // const link = '<li><a href="#' + articleId + '"><span>' + title + '</span></a></li>';

      const linkData = {id: articleId, title: title};
      const link = templates.articleLink(linkData);

      /*[DONE] insert link into titleList */
      titleList.innerHTML = titleList.innerHTML + link;
    });
    
      const links = document.querySelectorAll('.titles a');
  
      for (let link of links) {
        link.addEventListener('click', titleClickHandler);
      }
  }
  generateTitleLinks();



// =====MODULE 6 =============


function calculateTagsParams(tags) {
  const params =  {'min':999999, 'max':0};
  
  for (let tag in tags){
    if (tags[tag] < params.min)
    {
      params.min=tags[tag];
    } 
  }
  for (let tag in tags)
  {
    if (tags[tag]> params.max)
    {
      params.max=tags[tag];
    } 
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );
  const result= `${opts.cloudClassPrefix}${classNumber}`;
  return result; 
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  /* find tags wrapper */
    for (let article of articles){
      const tagWrapper = article.querySelector(optArticleTagsSelector);
  /* make html variable with empty string */
    let html = ' '; 
    // let html = {};
  /* get tags from data-tags attribute */
  const articleTags = article.getAttribute('data-tags');
   /* split tags into array */
  const articleTagsArray = articleTags.split (' ');
  /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
  /* generate HTML of the link */
  //  const link = '<li><a href="#tags-' + tag + '">' + tag + '</a></li>';

  const linkData = {id: tag, title: tag};
  const link = templates.articleLink(linkData);
  /* add generated code to html variable */
   html = html + link;

  /* [NEW] check if this link is NOT already in allTags */
       if(!allTags.hasOwnProperty(tag)){
  /* [NEW] add tag to allTags object */
          allTags [tag] = 1; 
        }else{
          allTags [tag]++;
        }
    }/* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = tagWrapper.innerHTML +  html;
   }/* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);


/* [NEW] create variable for all links HTML code */
let allTagsHTML = ' ';


/* [NEW] START LOOP: for each tag in allTags: */
for (let tag in allTags){
  /* [NEW] generate code of a link and add in to  allTagsHTML */
  allTagsHTML +='<li><a href="#tag-' + tag + '">' +  tag + '(' + allTags[tag] + ')' + '</a></li>'; 
  console.log(allTagsHTML);

}
/* [NEW] END LOOP: for each tag in allTags: */

 /* [NEW] add html from allTagsHTML to tagList */
 tagList.innerHTML += allTagsHTML;
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
  const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of allTagLinks) {
    /* add class active */
    tagLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log('[data-tags~="' + tag + '"]');  
}

function addClickListenersToTags() {
  /* find all links to tags */
  const allTagLinks = document.querySelectorAll('.post-tags a');
  /* START LOOP: for each link */
  for (let allTagLink of allTagLinks) {
    /* add tagClickHandler as event listener for that link */
    allTagLink.addEventListener('click', tagClickHandler);
  }/* END LOOP: for each link */
}
addClickListenersToTags();

// ===============AUTHOR 

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors= {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
   
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagWrapperAuthor = article.querySelector(optArticleAuthorSelector);
   /* make html variable with empty string */
    let html = ' ';
    /* get tags from data-author attribute */
    const articleTagsAuthor = article.getAttribute('data-author');
    /* generate HTML of the link */
    // const link = '<li><a href="' + articleTagsAuthor + '">' + articleTagsAuthor + '</a></li>';

    const linkData = {id: articleTagsAuthor, title: articleTagsAuthor};
    const link = templates.articleLink(linkData);  

    /* add generated code to html variable */
    html = html + link;
   
    if(!allAuthors.hasOwnProperty(articleTagsAuthor)){
      /* [NEW] add tag to allTags object */
      allAuthors [articleTagsAuthor] = 1;
            }else{
              allAuthors [articleTagsAuthor]++;
            }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapperAuthor.innerHTML =  tagWrapperAuthor.innerHTML + html; 
    /* END LOOP: for every article: */
  }
      
  /* [NEW] find list of tags in right column */
  const tagListAuthor = document.querySelector(optAuthorsListSelector);
  console.log (tagListAuthor);
   let allAuthorsHTML = ' ';
   for (let articleTagsAuthor in allAuthors ){
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    const allAuthorsLinkHTML = '<li><a href="#author-' + articleTagsAuthor + '">' + articleTagsAuthor + '('+ allAuthors[articleTagsAuthor] + ')  </a></li>';
    console.log('allAuthorsLinkHTML:',allAuthorsLinkHTML );
    allAuthorsHTML+= allAuthorsLinkHTML;
   }
   tagListAuthor.innerHTML= allAuthorsHTML;
}
generateAuthors();



function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
 
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('author-', '');
  
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="author-"]');
  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {
    /* remove class active */
    tagLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */
  
  /* find all tag links with "href" attribute equal to the "href" constant */
   const allTagLinks = document.querySelectorAll('a[href="'+ href +'"]');
  console.log(allTagLinks);

  tagLinks.innerHTML=allTagLinks;
 

  
 
  /* START LOOP: for each found tag link */
  for (let allTagLink of allTagLinks) {
    /* add class active */
    allTagLink.classList.add('active');
  }
  
  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
   generateTitleLinks('[data-author="' + tag + '"]');
  console.log('[data-author="' +  tag + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const allTagLinksAuthors = document.querySelectorAll('.post-author a'); 
  /* START LOOP: for each link */
  for (let allTagLinksAuthor of allTagLinksAuthors) {
    /* add tagClickHandler as event listener for that link */
    allTagLinksAuthor.addEventListener('click', authorClickHandler);
  }/* END LOOP: for each link */
}
addClickListenersToAuthors();




const blockForMouse = document.querySelector('.posts')
blockForMouse.addEventListener("mouseover", function (event) {
  let target = event.target.closest('.post-title');
  // transition not to <.post-title> - ignore
  if (!target) return;
  target.style.cssText = `background-color: #77608d`;
});

blockForMouse.addEventListener("mouseout", function (event) {
  let target = event.target.closest('.post-title');
  // transition not to <.post-title> - ignore
  if (!target) return;
  target.style.cssText = ``;
})





