'use strict';


function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /*[DONE] add class 'active' to the clicked link */
   console.log('clickedElement:', clickedElement);
   clickedElement.classList.add('active');

  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /*[DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log (articleSelector);

  /*[DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log (targetArticle);

  /* [DONE] add class 'active' to the correct article */
   targetArticle.classList.add('active');
}



// ====================
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector =  '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.authors.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';
  


  function generateTitleLinks(customSelector = ''){
   
  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log (titleList);

  function clearMessages(){
    titleList.querySelectorAll('*').forEach((titleList)=> titleList.remove());
  }clearMessages();
  

  /*[DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log (articles);

   articles.forEach((article)=>{

  /*[DONE] get the article id */
    const articleId = article.id;
    console.log (articleId);

  /*[DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector);
    console.log (articleTitle);

  /*[DONE] get the title from the title element */
    const title = articleTitle.innerHTML;
    console.log (title);

  /*[DONE] create HTML of the link */
     const link = '<li><a href="#' + articleId + '"><span>' + title + '</span></a></li>';

  /*[DONE] insert link into titleList */
    titleList.innerHTML = titleList.innerHTML + link;
   });
     
  }
generateTitleLinks();


const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

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
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  const result= `${optCloudClassPrefix}${classNumber}`;
  return result; 
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector );

  /* START LOOP: for every article: */
for (let article of articles){
  /* find tags wrapper */
  const tagWrapper = article.querySelector(optArticleTagsSelector);
  console.log(tagWrapper);
  /* make html variable with empty string */
  let html = ' ';
   /* get tags from data-tags attribute */
   const articleTags = article.getAttribute('data-tags');
   console.log(articleTags); 
  /* split tags into array */
  const articleTagsArray = articleTags.split (' ');
  console.log(articleTagsArray); 
/* START LOOP: for each tag */
  for (let tag of articleTagsArray){
  /* generate HTML of the link */
   const linkHTML =  '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

  
  console.log(linkHTML);
 /* add generated code to html variable */
  html = html + linkHTML;
   console.log( html);  

    /* [NEW] check if this link is NOT already in allTags */
    if(!allTags.hasOwnProperty(tag)){
      /* [NEW] add tag to allTags object */
              allTags [tag] = 1; 
            }else{
              allTags [tag]++;
            }
            

  } /* END LOOP: for each tag */
  /* insert HTML of all the links into the tags wrapper */
  tagWrapper.innerHTML = tagWrapper.innerHTML +  html;
  console.log(tagWrapper);
} /* END LOOP: for every article: */

/* [NEW] find list of tags in right column */
const tagList = document.querySelector(optTagsListSelector);

const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);

/* [NEW] create variable for all links HTML code */
 let allTagsHTML = ' ';


/* [NEW] START LOOP: for each tag in allTags: */
for (let tag in allTags){
  /* [NEW] generate code of a link and add in to  allTagsHTML */
   allTagsHTML +='<li><a class=' + calculateTagClass(allTags[tag], tagsParams)+ '  href="#tag-' + tag + '">' +  tag + '(' + allTags[tag] + ')' + '</a></li>';  
  
}/* [NEW] END LOOP: for each tag in allTags: */

/* [NEW] add html from allTagsHTML to tagList */
   tagList.innerHTML += allTagsHTML;
     
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tagLinks);


  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {
    /* remove class active */
    tagLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(allTagLinks);

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
  const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log(linksToTags); 
  /* START LOOP: for each link */
  for (let linksToTag of linksToTags) {
    /* add tagClickHandler as event listener for that link */
    linksToTag.addEventListener('click', tagClickHandler);
  }/* END LOOP: for each link */
}
addClickListenersToTags();


// AUTHOR
function generateAuthors(){
   /* [NEW] create a new variable with an empty object */
   let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log( articles);

  /* START LOOP: for every article: */
  for (let article of articles){
    /* find author wrapper */
    const wrapperAuthor = article.querySelector(optArticleAuthorSelector);
    console.log(wrapperAuthor);

    /* make html variable with empty string */
    let html = ' ';

    /* get author from data-author attribute */
    const articleTagsAuthor = article.getAttribute('data-author');
    console.log(articleTagsAuthor);
    
    /* generate HTML of the link */

     const linkHTML = '<a href="#author-' + articleTagsAuthor + '">' + 'to ' +articleTagsAuthor + '</a>';
     
    
      /* add generated code to html variable */
      html = html + linkHTML;

      if(!allAuthors.hasOwnProperty(articleTagsAuthor)){
        /* [NEW] add tag to allTags object */
        allAuthors [articleTagsAuthor] = 1;
              }else{
                allAuthors [articleTagsAuthor]++;
              }

    /* insert HTML of all the links into the tags wrapper */
    wrapperAuthor.innerHTML = html;
    console.log(wrapperAuthor);
  }/* END LOOP: for every article: */

 /* [NEW] find list of tags in right column */
 const tagListAuthor = document.querySelector(optAuthorsListSelector);
 console.log (tagListAuthor);
  let allAuthorsHTML = ' ';

/* [NEW] START LOOP: for each author in allAuthors */
for (let author in allAuthors){
  /* [NEW] generate code of a link and add in to  allAuthorsHTML */
   const allAuthorsLinkHTML = '<li><a href="#author-' + author + '">' + author + '('+ allAuthors[author] + ')  </a></li>';
  console.log(allAuthorsLinkHTML);
  allAuthorsHTML+= allAuthorsLinkHTML;
}
/* [NEW] END LOOP: for each tag in allTags: */
/* [NEW] add html from allAuthorsLinkHTM to wrapperAuthor */
tagListAuthor.innerHTML= allAuthorsHTML;

}

generateAuthors();


function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  

  /* find all tag links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(authorLinks);

  /* START LOOP: for each active author link */
  for (let authorLink of authorLinks) {
    /* remove class active */
    authorLink.classList.remove('active');
  }

  /* END LOOP: for each active tag link */

  /* find all author links with "href" attribute equal to the "href" constant */
  const allAuthorLinks = document.querySelectorAll('a[href="'+ href +'"]');
  console.log(allAuthorLinks);


  /* START LOOP: for each found author link */
  for (let allAuthorLink of allAuthorLinks) {
    /* add class active */
    allAuthorLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
  
  console.log('[data-author="' + author + '"]');

}


function addClickListenersToAuthors() {
  /* find all links to tags */
  const allTagLinksAuthors = document.querySelectorAll('a[href^="#author-"]'); 
  console.log(allTagLinksAuthors);
  /* START LOOP: for each link */
  for (let allTagLinksAuthor of allTagLinksAuthors) {
    /* add tagClickHandler as event listener for that link */
    allTagLinksAuthor.addEventListener('click', authorClickHandler);
  }/* END LOOP: for each link */
}
addClickListenersToAuthors();








// =================

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

// ==================================================








