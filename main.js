//seach appearing
var searchCnt;
var searchText;
var searchBut;
var mainCnt;
var searchItems;
var selectCnt, option1, option2, option3;
var opt1 = 5, opt2 = 10, opt3 = 20; 
var indexSelected = 0;



function createSearchHeader(){
    searchCnt = document.createElement('div');
    searchCnt.className = 'searchcnt';

    document.body.appendChild(searchCnt);
    
    
    //Input field creation
    searchText = document.createElement('input');
    searchText.className = 'searchtext';

    searchCnt.appendChild(searchText);

    //Items quantity field creation
    searchItems = document.createElement('div');
    searchItems.className = 'searchItems';
    searchItems.textContent = 'Items: ';
    
    selectCnt = document.createElement('select');
    
    option1 = document.createElement('option');
    option1.className = 'vid5';
    option1.textContent = opt1;

    option2 = document.createElement('option');
    option2.className = 'vid10';
    option2.textContent = opt2;

    option3 = document.createElement('option');
    option3.className = 'vid20';
    option3.textContent = opt3;

    selectCnt.appendChild(option1);
    selectCnt.appendChild(option2);
    selectCnt.appendChild(option3);

    searchItems.appendChild(selectCnt);

    searchCnt.appendChild(searchItems);


    //Search button creation
    searchBut = document.createElement('div');
    searchBut.className = 'searchbut';
    searchBut.textContent = 'Search!';

    searchCnt.appendChild(searchBut);

    
    //Main cnt for videos creation
    mainCnt = document.createElement('div');
    mainCnt.className = 'mainCnt';
    document.body.appendChild(mainCnt);

};

window.onload = function(){
    // document.body.innerHTML = '';
    createSearchHeader();
    console.log(selectCnt);
    selectCnt.onchange = function(){
        indexSelected = selectCnt.selectedIndex;
        console.log(indexSelected);
    }
    searchBut.addEventListener('click', getAjaxJson);
}



// var searchVal;
function getSearchVal(){
    var searchVal = searchText.value;
    var re = / /g;
    var qVal = searchVal.replace(re, '+');
    console.log('qVal: ',qVal);
    return qVal;
}


function getQrequest(){
    var searchQ;
    switch(indexSelected){
        case 0: 
        searchQ = 'maxResults=5&';
        break; 
        case 1:
        searchQ = 'maxResults=10&';
        break; 
        case 2:
        searchQ = 'maxResults=20&';
        break; 
    }
    console.log(searchQ);
    return searchQ;
}


function organizeReq(){ 
    var searchQresult = getQrequest();
    console.log(searchQresult);   
    var searchVidName = getSearchVal();
    var requestName = 'https://www.googleapis.com/youtube/v3/search?part=snippet&' +
    searchQresult + 'q=' + searchVidName + 
    '&type=video&key=AIzaSyDE182_mvRjZnl7zz-i0gE72MMyqm5Czx8';
    console.log('request name: ', requestName);
    return requestName;
}

var responseJson;

function  getAjaxJson(){
    var req = new XMLHttpRequest();
    req.onload = function(){
        responseJson = JSON.parse(req.responseText);
        console.log(responseJson);
        mainCnt.innerHTML = '';
        for(i = 0; i < responseJson.items.length; i++){
            createView(i);
        }
    }

    var requestVid = organizeReq();
    console.log('final requst', requestVid);
    req.open('GET', requestVid);
    req.send();
};

function createView(i){
    var cnt = document.createElement('div');
    cnt.className = 'cnt';

    var imgCnt = document.createElement('div');
    imgCnt.className = 'imgCnt';

    imgCnt.onclick = function(){
        createVideoWin(i);
    }

    // vidCnt.textContent = 'video ID: ' + responseJson.items[i].id.videoId; 
    // var videoPath = 'https://www.youtube.com/embed/' + responseJson.items[i].id.videoId
    // console.log('videoPath: ', videoPath);

    var imgPath = responseJson.items[i].snippet.thumbnails.medium.url;

    var thumbImg = document.createElement('img');
    thumbImg.className = 'thumbimg';
    thumbImg.width = 320;
    thumbImg.height = 180;
    thumbImg.src = imgPath;

    var textCnt = document.createElement('div');
    textCnt.className = 'textCnt';

    var nameCnt = document.createElement('div');
    nameCnt.className = ('nameCnt');
    nameCnt.textContent = responseJson.items[i].snippet.title;
    // console.log('title', responseJson.items[i].snippet.title);

    var descCnt = document.createElement('div');
    descCnt.className = 'descCnt';
    descCnt.textContent = responseJson.items[i].snippet.description;

    cnt.appendChild(imgCnt);
    cnt.appendChild(textCnt);

    textCnt.appendChild(nameCnt);
    textCnt.appendChild(descCnt);

    imgCnt.appendChild(thumbImg);

    mainCnt.appendChild(cnt);
}



var winFrame;
var closeButFrame;
function createVideoWin(i){
    winFrame = document.createElement('div');
    winFrame.className = 'winFrame';

    var vidFrame = document.createElement('div');
    vidFrame.className = 'vidFrame';

    //help data dimesions
    var w=window,
    d=document,
    e=d.documentElement,
    g=d.getElementsByTagName('body')[0],
    x=w.innerWidth||e.clientWidth||g.clientWidth,
    y=w.innerHeight||e.clientHeight||g.clientHeight;

    var vidHeight = Math.round(0.9 * y);
    var vidWidth = Math.round(vidHeight * 4 / 3);
    

    winWidth = Math.round(vidWidth + 50);
    winOffsetX = Math.round((x - winWidth )/2);
    winOffsetY = Math.round((y - vidHeight)/2);
    
    winFrame.style.cssText = 'width: ' + winWidth +'px; height: ' +
    vidHeight + 'px; left: ' + winOffsetX + 'px; top: ' + winOffsetY +
    'px';

    //help data video path
    var videoPath = 'https://www.youtube.com/embed/' + responseJson.items[i].id.videoId;
    console.log('videoPath: ', videoPath);

    var iFrame = document.createElement('iframe');
    iFrame.width = vidWidth;
    iFrame.height = vidHeight;
    iFrame.src = videoPath;



    closeButFrame = document.createElement('div'); 
    closeButFrame.className = 'closeButFrame';

    

    var xBut = document.createElement('i');
    xBut.className = 'far fa-times-circle';




    document.body.appendChild(winFrame);
    winFrame.appendChild(vidFrame);
    winFrame.appendChild(closeButFrame);

    vidFrame.appendChild(iFrame);
    closeButFrame.appendChild(xBut);


    closeButFrame.onclick = function(){
        winFrame.style.display = 'none';
    }
}






