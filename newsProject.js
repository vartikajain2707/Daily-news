console.log("hello");
// ab9e9017ab7f4df699fc5e13d688af6e
// grab the news container
let newsAccordion = document.getElementById("newsAccordion");

// create a request
const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=ab9e9017ab7f4df699fc5e13d688af6e",
  true
);
// xhr.getResponseHeader('content-type','application/json');
xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    let articles = json.articles;
    let newsHtml=""
    articles.forEach(function(element,ind) {
        const d2 = new Date(element["publishedAt"]).toDateString();
        let news = `
                    <div class="accordion-item">
                            <h2 class="accordion-header" id="heading${ind}">
                                <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse${ind}"
                                aria-expanded="true"
                                aria-controls="collapse${ind}"
                                >
                                <b>Breaking News ${ind+1 }</b>:   ${ element["title"]}
                                </button>
                            </h2>
                            <div
                                id="collapse${ind}"
                                class="accordion-collapse collapse"
                                aria-labelledby="heading${ind}"
                                data-bs-parent="#newsAccordian"
                            >
                                <div class="accordion-body">
                                <div><i>${d2}</i></div>
                                <br>
                                ${element["content"]}. <a href="${element["url"]}" target="_blank">Read more here</a>
                                </div>
                            </div>
                            </div>
                            `;
                            newsHtml+=news;

    });
    
    newsAccordion.innerHTML=newsHtml;
    console.log(json);
  } else {
    console.log("some error occured");
  }
};
xhr.send();
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let accordionItems = document.getElementsByClassName("accordion-item");
  Array.from(accordionItems).forEach(function (element) {
    let accordionTxt = element.getElementsByTagName("button")[0].innerHTML;
    
    if (accordionTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});