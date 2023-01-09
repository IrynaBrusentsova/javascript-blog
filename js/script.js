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
  optTitleListSelector = '.titles';


function generateTitleLinks(){
   
  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log (titleList);

  function clearMessages(){
    titleList.querySelectorAll('*').forEach((titleList)=> titleList.remove());
  }clearMessages();
  

  /*[DONE] for each article */
   const articles = document.querySelectorAll(optArticleSelector);
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







