function getBase64(file){
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        const base64String = reader.result
            .replace("data:", "")
            .replace(/^.+,/, "");;
        console.log(base64String);
        return base64String;
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}




var settings2 = {
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

        var file = document.querySelector('#MyFile').files[0];
        var result=getBase64(file); // prints the base64 string

        var settings1 = {
            "url": "http://3.38.89.188:20115/api/image/upload",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "extension": "png",
                "base64": result
            }),
        };

        $.ajax(settings1).done(function (response) {
            alert('사진이 업로드 되었습니다.');
            console.log(response);
            window.location.href='/';
            // console.log(response);
        }).fail(function (error){
            alert('실패');
            //console.log(error);
        });
    },

};




$.ajax(settings2).done(function (response) {
    //console.log(response);
    array1 = Object.values(response);
    array2 = Object.values(array1[2]);
   // console.log(array2);
    // const main = document.querySelector("#main");
    array2.forEach(function (item){
         //var tag = "<article class='thumb'><a class='image' style='background-image: url('"+item+"'); cursor: pointer; outline: 0px;'><img src='"+item+"'alt='' style='display: none;'></a><h2>&nbsp</h2></article>"

        // var tag = "<article className= 'thumb'><a class='image' style='background-image: url(&quot;"+item+"&quot;); cursor: pointer; outline: 0px;'><img src='"+item+"'alt='' style='display: none;'></a><h2>&nbsp</h2></article>";

          var tag ="<article class='thumb'><a href='"+item+"' class='image'><img src='"+item+"' alt=''/></a><h2>&nbsp</h2></article>";
        // var tag = "<article><a className=\"image\" style=\"cursor: pointer; outline: 0px;\"><img src=\""+item+"\" alt=\"\" style=\"display: none;\"></a><h2>&nbsp</h2></article>"

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
   // console.log('로드실패');
});
main.init();


