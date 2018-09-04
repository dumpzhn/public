/*
Created  by Mwq  on  2018/4/13
*/
var questionController = function () {
    var that = this;
    this.init = function () {
        this.regEvent()
    }
    this.regEvent =function () {
        that.initDataList();
        that.lunbo();
        that.JobInfo();
        that.jobTiao();



    }
    this.initDataList = function(){
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/company/index";
        $.ajax({
            url:url,
            type:"post",
            dataType:"JSON",
            success:function (res) {
                var data =(res.data.company[0]);
                console.log(data.history,999999);
                var dataArr = [];
                var dataBrr = [];
                var dataCrr = [];
                var dataDrr = [];
                var dataErr = []
                dataArr.push(
                    '<img src="' + data.picture + '" alt="" class="img-responsive" >'
                )
                $("#lunboBanner").html(dataArr.join(''))
                dataBrr.push(
                    '<li>',data.introduction,' <li>'
                )
                $("#productDetails").html(dataBrr.join(''))
                dataCrr.push(
                    '<p >',data.style,'</p>'
                )
                $("#teamMien11").html(dataCrr.join(''))
                //人才理念渲染
                dataDrr.push(
                    '<p >',data.talent_idea,'</p>'
                )
                $("#talent_idea").html(dataDrr.join(''))
                dataErr.push(
                    '<img src="' + data.history + '" alt="" class="img-responsive" >'
                )
                $("#fzlic").html(dataErr.join(''))
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
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/company/index";
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


    this.JobInfo = function(){
        var url ="http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/company/index";
        $.ajax({
            url:url,
            type:"post",
            dataType:"JSON",
            success:function (res) {
                var dataArr = [];
                var data=( res.data.recruit);
               // console.log(data)
                $.each(data,function (index,key) {
                    dataArr.push(
                    `<li class="col-md-10 col-xs-offset-1 padding-0"  data_details ="${key.id}">`,
                    `<a href="#" class="default"  style="cursor: pointer;">${key.job}</a>`,
                       `</li>`
                    )
                    $("#JobInfo").html(dataArr.join(''))
                    $("#JobInfo2").html(dataArr.join(''))

                })

            }
        })
    }
    
    this.jobTiao = function () {
        $(document).delegate("#JobInfo li, #JobInfo2 li", "click", function () {
            var o = ($(this).attr("data_details"));
            window.sessionStorage.setItem("q",o );
            window.location.href="JoinUs.html";
        });
    }







}
$(function () {
    var qst = new questionController();
    qst.init();
})
