var file = document.querySelector('MyFile');
var result;

var reader = new FileReader(file);
reader.onload = function() {
    result = reader.result;
}

// 실패할 경우 에러 출력하기
reader.onerror = function (error) {
    console.log('Error');
};

var settings = {
    "url": "http://3.38.89.188:20115/api/image/upload",
    "method": "POST",
    "dataType" : "json",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    },
    "data": JSON.stringify({
        "extension": "png",
        "base64": result
    }),
};
var settings = {
    "url": "http://3.38.89.188:20115/api/image/",
    "method": "GET",
    "dataType" : "json",
    "timeout": 0,
};

var main ={
    init : function () {
        var _this =this;
        $('#btn-upload').on('click', function () {
            _this.upload();
        });
    },
    upload : function (){
        $.ajax(settings).done(function (response) {
            alert('사진이 업로드 되었습니다.');
            window.location.href='/';
            // console.log(response);
        }).fail(function (error){
            alert('실패');
        });
    },

};

$.ajax(settings).done(function (response) {
    console.log(response);
    array1 = Object.values(response);
    array2 = Object.values(array1[2]);
    console.log(array2);
    // const main = document.querySelector("#main");
    array2.forEach(function (item){
         //var tag = "<article class='thumb'><a class='image' style='background-image: url('"+item+"'); cursor: pointer; outline: 0px;'><img src='"+item+"'alt='' style='display: none;'></a><h2>&nbsp</h2></article>"

        // var tag = "<article className= 'thumb'><a class='image' style='background-image: url(&quot;"+item+"&quot;); cursor: pointer; outline: 0px;'><img src='"+item+"'alt='' style='display: none;'></a><h2>&nbsp</h2></article>";

          var tag = "<article className= 'thumb'><a href='"+ item +"' className='image'><img src='"+item+"' alt=''/></a><h2>&nbsp</h2></article>";

          // const article = document.createElement("article");
        // article.className="thumb";
        // const a = document.createElement("a");
        // a.className="img";
        // a.setAttribute('href',item);
        // const img = document.createElement("img");
        // img.src=item;
        // img.alt="";
        // const h2 = document.createElement("h2");
        // h2.innerText="&nbsp";
        //
        // a.appendChild(img);
        // article.appendChild(a);
        // article.appendChild(h2);
        //
        // $('#main').appendChild(article);

        $('#main').append(tag);
    });

}).fail(function (error){
    console.log('로드실패');
});
main.init();


