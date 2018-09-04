/*
creat by mwq 2018/4/18*/
var questionController  = function () {
    var that =this;
    this.init = function () {
        this.regEvent();


    }
    this.regEvent = function () {
        this.initDataList();
        this.hot_message();
        this.rmtj();
        this.zxgg();
        this.xszx();
        this.ztjlh();
        this.jobTiao();
        this.Details();
        this.NewsDetails();
        this.lunbo()
    }
   this.initDataList = function () {
       var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/school/index";
       $.ajax({
           url:url,
           dataType:"JSON",
           type:"post",
           success:function(res){
               //console.log(res)
             var data = (res.data.hyzx[0]);
             var res =(res.data.new_message);
             // console.log(res[0].type,5);
             var dataArr = [];
             var dataBrr = [];
             var dataCrr = [];
             dataArr.push(
             `<img src="${data.picture}" alt="" class="img-responsive" style="width: 600px;">`
             )
               $("#hyzx").html(dataArr.join(''))
             $.each(res,function (index,key) {
                 //console.log(key.title)
                 dataBrr.push(
                     `<div> `,
                 `<span class="col-md-8 col-sm-7 col-xs-7 padding-0">`,
                     `<a  class="default" href="#" data_details ="${key.id}" style="cursor: pointer;">${key.title}</a>`,
                 `</span>`,
                 `<span class="col-md-4 col-sm-5 col-xs-5" style="text-align:right;padding-left:0;">`,
                     `<a href="#" class="default"  data_details ="${key.id}" style="cursor: pointer">${key.time}</a>`,
                 `</span>`,
                     `</div>`
                 )
                 $("#zxzxDetails").html(dataBrr.join(''))

             });
               dataCrr.push(
               `<span class="col-md-8 col-sm-7 padding-0 col-xs-7" id="zzxtitle">`,
                   `<h4>${res[0].type}</h4>`,
                   `</span>`,
                   `<span class="col-md-4 col-sm-5 col-xs-5" style="text-align:right;padding-left:0;">`,
                   `<a href="#" data_detailss = "${res[0].type}" style="cursor: pointer;margin-top: 20px;"  >查看更多>></a>`,
                   `</span>`
               )
               $("#zxzxDetail").html(dataCrr.join(''))
       }

       })
   }

    function  a() {
        var swiper = new Swiper('.swiper-container', {
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });


    }
    this.lunbo = function (res) {
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/school/index";
        $.ajax({
            url:url,
            type:"post",
            dataType:"JSON",
            success:function (res) {
                var data = (res.data.carousel);
                var dataArr = [];
                $.each(data, function (ind, key) {
                    dataArr.push(
                        `<div class="swiper-slide"><img src="${key.picture}" class="img-responsive"/></div>`

                    )
                    $(".swiper-wrapper").html(dataArr.join(''));

                })
              a()




            }
        })

    }

 this.hot_message   = function () {
     var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/school/index";
     $.ajax({
         url: url,
         dataType: "JSON",
         type: "post",
         success: function (res) {
             console.log(res.data,999999)
             var res =(res.data.hot_message);
             var dataBrr =[];
             var dataCrr = []
               $.each(res,function (index,key) {
                  // console.log(key.title)

                   dataBrr.push(
                       `<div> `,
                       `<span class="col-md-8 col-sm-7  col-xs-7 padding-0">`,
                       `<a href="#"  class="default" data_details ="${key.id}"  style="cursor: pointer">${key.title}</a>`,
                       `</span>`,
                       `<span class="col-md-4 col-sm-5 col-xs-5" style="text-align:right;padding-left:0;">`,
                       `<a href="#" class="default"  data_details ="${key.id}"  style="cursor: pointer">${key.time}</a>`,
                       `</span>`,
                      ` </div>`
                   )
                   $("#zxDetails").html(dataBrr.join(''))

               });


             dataCrr.push(
                 `<span class="col-md-8 col-sm-7 col-xs-7" id="zzxtitle" style="margin:20px 0px 0px 0px;">`,
                 `<h4>${res[0].type}</h4>`,
                 `</span>`,
                 `<span class="col-md-4 col-sm-5 col-xs-5" style="text-align:right;padding-left:0;margin:20px 0px 0px 0px;">`,
                 `<a href="#" data_detailss = "${res[0].type}" style="cursor: pointer;" >查看更多>></a>`,
                 `</span>`
             )
             $("#zrzxtitle").html(dataCrr.join(''))
         }
     })
}
  this.rmtj = function () {
      var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/school/index";
      $.ajax({
          url: url,
          dataType: "JSON",
          type: "post",
          success: function (res) {
              //console.log(res.data)
              var res =(res.data.recommend_message);
              var dataBrr =[]
              $.each(res,function (index,key) {
                  //console.log(key.title)

                  dataBrr.push(
                 `<li class="col-md-10 padding-0" >`,
                      `<a href="#" class="default"  data_details ="${key.id}" style="cursor: pointer;">${key.title}</a>`,
                  `</li>`

                  )
                  $("#rmtj").html(dataBrr.join(''))

              })
          }
  })
}

    this.zxgg = function () {
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/school/index";
        $.ajax({
            url: url,
            dataType: "JSON",
            type: "post",
            success: function (res) {
                // console.log(res.data)
                var res =(res.data.notice_message);
                var dataBrr =[]
                $.each(res,function (index,key) {

                    dataBrr.push(
                        `<li class="col-md-10 padding-0" >`,
                        `<a href="#" class="default"  data_details ="${key.id}" style="cursor: pointer；">${key.title}</a>`,
                        `</li>`



                    )
                    $("#zxgg").html(dataBrr.join(''))

                })
            }
        })
    }
    //
    this.xszx = function () {
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/school/index";
        $.ajax({
            url: url,
            dataType: "JSON",
            type: "post",
            success: function (res) {
                 var S = res.data.learning_message[0].type;
                var res1 =res.data.learning_message;

                var dataBrr =[];
                var dataArr = [];
                dataArr.push(
                    `<span class="col-md-8 col-sm-7 padding-0 col-xs-6" style="padding: 0px 20px;border-left: 2px solid orangered;font-weight: 800; font-size: 20px;margin-left:10px;">${S}</span><span class="col-md-8 col-sm-5 col-xs-5" style="text-align: right;padding-left: 0;"><a data_detailss = ${S}>查看更多&gt;&gt;</a></span>`

                )
                $("#xszz").html(dataArr.join(''))
                $.each(res1,function (index,key) {

                    dataBrr.push(
                    `<div class="item col-md-5" style="margin:20px 0px 20px 15px;">`,
                        `<div class="row">`,
                        `<div>`,
                        `<div class="row">`,
                        `<div class="col-md-3">`,
                        `<img src="${key.picture}" alt="" class="img-responsive">`,
                        `</div>`,
                        `<div class="col-md-5">`,
                        `<span style="font-weight: 800;">${key.title}</span>`,
                        `<p style="margin: 20px 0px;">${key.brief_introduction}</p>`,
                    `</div>`,
                    `</div>`,
                    `</div>`,
                    `</div>`,
                    `</div>`

                    )
                    $("#xszx").html(dataBrr.join(''))

                })
            }
        })
    }


    this.ztjlh = function () {
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/school/index";
        $.ajax({
            url: url,
            dataType: "JSON",
            type: "post",
            success: function (res) {
                var S = res.data.zuotan[0].type;
                console.log(S)
                // console.log(res.data)
                var res =(res.data.zuotan);
                var dataArr = [];
                var dataBrr =[];
                dataArr.push(
                    `<span class="col-md-8 col-sm-7 padding-0 col-xs-6" style="padding: 0px 20px;border-left: 2px solid orangered;font-weight: 800; font-size: 20px;margin-left:10px;">${S}</span><span class="col-md-10 col-lg-8 col-sm-8 col-xs-5" style="text-align: right;padding-left: 0;margin-top: "><a data_detailss = ${S}>查看更多&gt;&gt;</a></span>`
                )
                $("#ztjlh1").html(dataArr.join(''))
                $.each(res,function (index,key) {
                    dataBrr.push(

                    `<div class="col-lg-4 col-xs-6 our-data-item sum-rate">`,
                        `<div class="number-wrapper">`,
                    `<img src="${key.picture}" alt="" class="img-responsive">`,
                        `</div>`,
                        `<p class="title">${key.title}</p>`,
                        `<p class="title">${key.brief_introduction}</h4>`,
                        `</div>`

                    )
                    $("#ztjlh").html(dataBrr.join(''))

                });
            }
        })
    }
    this.jobTiao = function () {
        $(document).delegate("#rmtj a,#zxgg a", "click", function () {
           var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/message/index";
            var id=($(this).attr("data_details"));
            //console.log(id)
           $.ajax({
               url:url,
               type:"post",
               dataType:"JSON",
               data:{id:id},
               success:function (res) {
                   var data=(res.data.message);
                  // console.log(data,333)
                   var res = (res.data.hot_message);
                   window.sessionStorage.setItem("dataRm",JSON.stringify(res))
                   window.sessionStorage.setItem("data",JSON.stringify(data[0]));
                   window.location.href="IndustryInformation.html";

               }
           })

        });
    }
    this.Details = function () {
        $(document).delegate("#zrzxtitle a,#zxzxDetail a,#xszz a,#ztjlh1 a","click",function () {
            var type = ($(this).attr("data_detailss"));
            window.sessionStorage.setItem("type",type);
            $.ajax({
                url:"http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/article/index",
                dataType:"JSON",
                type:"post",
                data:{type:type},
                success:function (res) {
                    // console.log(res)
                    var res=(res.data.message);
                    //console.log(res);
                    window.sessionStorage.setItem("key",JSON.stringify(res));
                    window.location.href="businessDetails.html";


                }
            })

        })

    }
    that.NewsDetails =function(){
        //console.log("#NewsDetails")
        $(document).delegate("#zxzxDetails a,#zxDetails a","click",function () {
            var id=($(this).attr("data_details"));
            console.log(id,8888888)

            $.ajax({
                url:"http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/message/index",
                dataType:"JSON",
                type:"post",
                data:{id:id},
                success:function (res) {
                    //console.log(res,222222222)

                    var data=(res.data.message);
                    console.log(data,333)
                    var res = (res.data.hot_message);
                    window.sessionStorage.setItem("dataRm",JSON.stringify(res))



                    window.sessionStorage.setItem("data",JSON.stringify(data[0]));
                    window.location.href="IndustryInformation.html";

                }
            })
        })
    }

}

    $(function () {
        var qst = new questionController();
        qst.init();
    });

