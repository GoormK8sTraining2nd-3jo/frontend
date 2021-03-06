

var settings2 = {
    "url": "http://3.38.89.188:20115/api/image/",
    "method": "GET",
    "dataType" : "json",
    "timeout": 0,
};

const GetBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.replace("data:", "")
        .replace(/^.+,/, ""));
    reader.onerror = error => reject(error);
});

const GetFiletype = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.replace("data:image/", "")
        .replace(/;.*/, ""));
    reader.onerror = error => reject(error);
});


var start ={
    init : function () {
        var _this =this;
        $('#btn-upload').on('click', function () {
            _this.upload();
        });
    },
    upload : async function (){
        var file = document.querySelector('#MyFile').files[0];

        const base64String =await GetBase64(file);
        const filetype = await GetFiletype(file);

        var settings1 = {
            "url": "http://3.38.89.188:20115/api/image/upload",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "extension": filetype,
                "base64": base64String
            }),
        };
        $.ajax(settings1).done(function (response) {
            alert('사진이 업로드 되었습니다.');
            window.location.href='/';
        }).fail(function (error){
            alert('실패');
        });
    },

};

$.ajax(settings2).done(function (response) {
    const array1 = Object.values(response);
    const array2 = Object.values(array1[2]);
    array2.forEach(function (item){

        var newElement = $('<article>').attr('class','thumb');
        $(newElement).append($('<a>',{
            href : item,
            class : 'image'
        }).append($('<img/>',{
            src : item,
            alt : ''
        })));
        $(newElement).append($('<h2>',{
            innerText : '&nbsp'
        }));


        $('#main').append(newElement);



        // var tag ="<article class='thumb'><a href='"+item+"' class='image'><img src='"+item+"' alt=''/></a><h2>&nbsp</h2></article>";
        // $('#main').append(tag);
    });
}).fail(function (error){
    console.log('로드실패');
});

start.init();


