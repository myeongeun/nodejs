var express = require('express');
var router = express.Router();

const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;



const ynaGetHtml = async () => {
  try {
    return await axios.get("https://www.yna.co.kr/sports/all");
  } catch (error) {
    console.error(error);
  }
};

const naverGetHtml = async () => {
  try {
    let html =  await axios.get("https://movie.naver.com/movie/bi/mi/review.nhn?code=136900#reviewTab");
    
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("ul.rvw_list_area").children("li");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('a strong').text(),
          url: $(this).find('a').attr('href'),
          summary: $(this).find('p').text().slice(0, -11),
          date: $(this).find('.user a +em').text()
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  } catch (error) {
    console.error(error);
  }
};

router.get('/', function(req, res){
	ynaGetHtml()
	  .then(html => {
	    let ulList = [];
	    const $ = cheerio.load(html.data);
	    const $bodyList = $("div.headline-list ul").children("li.section02");

	    $bodyList.each(function(i, elem) {
	      ulList[i] = {
	          title: $(this).find('strong.news-tl a').text(),
	          url: $(this).find('strong.news-tl a').attr('href'),
	          image_url: $(this).find('p.poto a img').attr('src'),
	          image_alt: $(this).find('p.poto a img').attr('alt'),
	          summary: $(this).find('p.lead').text().slice(0, -11),
	          date: $(this).find('span.p-time').text()
	      };
	    });

	    const data = ulList.filter(n => n.title);
	    return data;
	  })
	  .then(res => log(res));
	
	res.send("hello world hooho!!!!");

});

// load : 인자로 html 문자열을 받아 cheerio 객체를 반환합니다.
// children : 인자로 html selector를 문자열로 받아 cheerio 객체에서 선택된 html 문자열에서 해당하는 모든 태그들의 배열을 반환합니다.
// each : 인자로 콜백 함수를 받아 태그들의 배열을 순회 하면서 콜백함수를 실행합니다.
// find : 인자로 html selector 를 문자열로 받아 해당하는 태그를 반환합니다.


router.get('/review', async function(req, res){
	var type  = req.query.type;
	if(type=='naver'){
		var result = await naverGetHtml();
	}else{
		var result = [];
	}
	
	
	 // .then(res => log(res));
	res.json(result);
	//res.send("hello world hooho2222!!!!");

});

/*getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.headline-list ul").children("li.section02");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('strong.news-tl a').text(),
          url: $(this).find('strong.news-tl a').attr('href'),
          image_url: $(this).find('p.poto a img').attr('src'),
          image_alt: $(this).find('p.poto a img').attr('alt'),
          summary: $(this).find('p.lead').text().slice(0, -11),
          date: $(this).find('span.p-time').text()
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));
*/



/*
router.get('/test', function(req, res){
	res.send("hello world hooho123123!!!!");
});*/
module.exports = router;