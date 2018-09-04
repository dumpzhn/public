/*
Created  by Mwq  on  2018/4/13
*/
var questionController = function() {
    var that = this;
    this.init = function () {
        this.regEvent();


    }
    this.regEvent = function () {
        that.navBannerImage();
        that.advocacyBoard();
        that.initDataList();
        that.initParents();
        that.latestNews();
        that.hot_message();
        that.NewsDetails();
        that.Details();
    }
    //bannner 图片的渲染
    this.navBannerImage = function () {
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/";
        $.ajax({
            url: url,
            type: "post",
            dataType: "JSON",
            success: function (data) {
                var data = (data.data.banner[0]);
               // console.log(data.picture);
                var html = [];
                html.push(
                    '<img src="' + data.picture + '" alt="" class="img-responsive"  style="width: 1920px;!important;">'
                )

                $("#Navbanner").html(html.join(''))//首页轮播渲染

            },
            error: function () {
                alert("网络很慢请稍后重试！")
            }
        });
    }

    //企业风采
    this.advocacyBoard = function () {

        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/";
        $.ajax({
            url: url,
            type: "post",
            dataType: "JSON",
            success: function (data) {
                //console.log(data)
                var data = (data.data.xc);
                //console.log(data);
                var dateArr = [];
                $.each(data, function (ind, key) {
                   // console.log(key.title);
                    var picture = key.picture;
                    dateArr.push(
                        '<div class="col-lg-2 col-xs-6 our-data-item sum-rate">',
                        '<div class="number-wrapper">',
                        '<img src="' + picture + '" alt="">',
                        '</div>',
                        '<h4 class="title">', key.title, '</h4>',
                        '</div>'
                    )
                    $("#featuredProduct").html(dateArr.join(''));
                })

            },
            error: function () {
                alert("网络很慢请稍后重试！")
            }
        });

    }
    //产品展示无缝滚动的渲染
    this.lubo =function () {
        //新闻轮播图js执行效果
        $(document).ready(function() {
            var swiper = new Swiper('.swiper-container', {
                slidesPerView: 4,
                spaceBetween: 30,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
               autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });

        });

    }
    this.initDataList = function () {
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/";
        $.ajax({
            url: url,
            type: "post",
            dataType: "JSON",
            success: function (data) {
                var data = (data.data.product);
               // console.log(data)
                var dateArr = [];
                $.each(data, function (ind, key) {
                    var picture = key.picture;
                    console.log(picture)
                    dateArr.push(
                   `<div class="swiper-slide"><img src=${picture} alt="" class="img-responsive"></div>`
                    )
                     $(".swiper-wrapper").html(dateArr.join(''));
                })
                that.lubo();
            },
            error: function () {
                alert("网络很慢请稍后重试！")
            }
        });

    }




//最新资讯的渲染
    this.latestNews = function () {
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/";
        $.ajax({
            url: url,
            type: "post",
            dataType: "JSON",
            success: function (data) {
                var data = (data.data.new_message);
                var dateArr = [];
                var dataBrr = [];

                var type =(data[0].type)
                dataBrr.push(
                    '<p class="active col-md-10 col-sm-10 col-xs-12 col-sm-offset-1">' ,
                    '<span style="">',type,'</span>' ,
                    '<a  class="pull-right col-lg-2 "  data_detailss = "',type,'" style="padding:10px 20px;cursor: pointer;">查看更多</a>',
                    '</p>'
                )
                $("#newZX").html(dataBrr.join(''))//最新资讯title渲染
                $.each(data, function (ind, key) {
                   // console.log(key.title);
                    dateArr.push(

                        '<div class="row tz" >',
                        '<span style="width: 10px;height: 10px;background-color: orangered;border-radius: 50%;display: block;float: left;margin-left: 10px;"></span>',
                        '<li>',key.title,'</li>',
                        '<span class="col-md-7" style="width: 480px;overflow: hidden;">...................................................................................................................</span>',
                        ' <a class="pull-right col-xs-4 col-md-5 col-lg-2 col-sm-4" data_details ="',key.id,'" style="padding:10px;cursor: pointer;">查看详情</a>',
                        '</div>'


                    )
                    $("#News").html(dateArr.join(''));

                })

            },
            error: function () {
                alert("网络很慢请稍后重试！")
            }

        })
        that.NewsDetails =function(){
            //console.log("#NewsDetails")
            $(document).delegate("#News a,#hot_message a","click",function () {
            var id=($(this).attr("data_details"));
            console.log(id)

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
    this.Details = function () {
        $(document).delegate("#newZX a,#rmZXA a","click",function () {
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
                    window.location.href="IndustryDetails.html";


                }
            })

        })

    }

    //热门资讯的渲染
    this.hot_message = function () {
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/";
        $.ajax({
            url: url,
            type: "post",
            dataType: "JSON",
            success: function (data) {
                var data = (data.data.hot_message);
               // console.log(data)
                var dateArr = [];
                var dataCrr = [];
                var type =(data[0].type);
                //console.log(type);
                $.each(data, function (ind, key) {
                   // console.log(key.title);
                    dateArr.push(
                        '<div class="row tz" >',
                        '<span style="width: 10px;height: 10px;background-color: orangered;border-radius: 50%;display: block;float: left;margin-left: 10px;"></span>',
                        '<li>',key.title,'</li>',
                        '<span class="col-md-7" style="width: 480px;overflow: hidden;">...................................................................................................................</span>',
                        ' <a class="pull-right col-xs-4 col-md-5 col-lg-2 col-sm-4" data_details ="',key.id,'" style="padding:10px;cursor: pointer;">查看详情</a>',
                        '</div>'
                    )
                    $("#hot_message").html(dateArr.join(''));
                })

                dataCrr.push(
                    '<p class="active col-md-10 col-sm-10 col-xs-12 col-sm-offset-1">' ,
                    '<span style="">',type,'</span>' ,
                    '<a  class="pull-right col-lg-2 "  data_detailss = "',type,'" style="padding:10px 20px;cursor: pointer;">查看更多</a>',
                    '</p>'
                )
                $("#rmZXA").html(dataCrr.join('') //热门资讯title渲染
                )

            },
            error: function () {
                alert("网络很慢请稍后重试！")
            }
        })
    }

//合作伙伴的渲染
    this.initParents = function () {
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/";
        $.ajax({
            url: url,
            type: "post",
            dataType: "JSON",
            success: function (data) {
                var data = (data.data.link);
               // console.log(data)
                var dateArr = [];
                $.each(data, function (ind, key) {
                    //console.log(key.title);
                    var picture = key.picture;
                    dateArr.push(
                   ' <div class="col-xs-6 col-sm-3 col-md-3 our-client-item">',
                        '<div class="our-client-logo">',
                             '<img  class="img-responsive center-block" src="' + picture + '" alt="" class="img-responsive">',
                        '</div>',
                    '</div>'
                    )
                    $("#Parents").html(dateArr.join(''));
                })
            },
            error: function () {
                alert("网络很慢请稍后重试！")
            }
        })
    }
}
$(function () {
    var qst = new questionController();
    qst.init();
})