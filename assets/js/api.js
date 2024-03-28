
const api_key ='b312672ddaa46a98b9480929eb87777d';

const imageBaseURL='https://image.tmdb.org/t/p/';

const fetchDataFromServer = function (url,callback,optionalParam){
    fetch(url).then(response=> response.json()).then(data=>callback(data,optionalParam));
}


export{imageBaseURL,api_key,fetchDataFromServer};