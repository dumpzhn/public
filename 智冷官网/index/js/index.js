/*
Created  by Mwq  on  2018/6/5
*/
var questionController = function () {
    var that = this;
    this.init = function () {
        this.regEvent();

    }
    this.lunbo = function () {
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
        });


    }
    this.regEvent =function () {

        that.initDataList();
        this.NewsDetails();
        this.initXr()
    }
    this.initXr = function() {
        var url = "http://out.ccsc58.cc/DATA_PORT_ZHONGJIZHILENG_1.01/public/";
        $.ajax({
            url: url,
            type: "post",
            dataType: "JSON",
            success: function (data) {
                var lunboArr = [];
                $.each(data.carousel, function (ind, key) {
                    lunboArr.push(
                        `<div class="swiper-slide"><img src="${key.carousel}" alt="" class="img-responsive"> </div>`
                    )
                    $(".swiper-wrapper").html(lunboArr.join(''));
                })
                that.lunbo();


                //公司简介的介绍
                var gsjjArr = [];
                console.log(data)
                gsjjArr.push(
                    `<li>${data.content}</li>`
                )
                $(".wzjl").html(gsjjArr.join(''))

                //产品中心的渲染
                var productArr = [];
                $.each(data.product,function (i,k) {
                    productArr.push(
                    `<a data_details ="${k.id}" style="cursor: pointer;">`,
                        `<li>`,
                        `<img src="${k.picture1}" alt="" class="img-responsive">`,
                        `<div class="bbbb">`,
                        `<p><a data_details ="${k.id}" style="cursor: pointer;">${k.title}</a></p>`,
                  
                      ` <p>${k.brief}</p>`,
                    `</div>`,

                    `</li>`,
                    `</a>`
                    )
                })
                $(".pro").html(productArr.join(''))

                //新闻中心的渲染

                var newsArr = [];
                $.each(data.news,function (i,k) {
                    newsArr.push(
                    `<div class="row" style="margin: 0px 0px 40px 0px;">`,
                       ` <div class="col-md-5 col-xs-12 " style="padding: 0px;" id="mewss" >`,
                        `<div class="soultionImg">`,
                        `<img src="${k.picture}" alt="" class="img-responsive">`,
                        `</div>`,
                        `</div>`,
                        `<div class="col-md-6 col-xs-12 ijfja"  style="padding: 0"  id="ijfja2" >`,
                        `<a  href="${k.link}"><strong><p class="firstWeight" style="font-size: 16px;color: #232323;margin-bottom:0px;">${k.title}</p></strong></a>`,
                   ` <div class="p-c-c">`,
                        `<uL style="padding-left: 0px;">`,
                        `<a href="" style="font-size: 10px;color:#9c9c9c"><li class="active glyphicon glyphicon-star"  style="padding: 10px 0px">${k.update_time}</li></a>`,
                    `<li class="slh" style="list-style: none;">${k.descript}</li>`,
                    `</uL>`,
                   ` <div><a style="color: #348fdb" href="${k.link}">MORE&gt&gt</a></div>`,
                    `</div>`,
                    `</div>`,
                    `</div>`

                    )
                    $("#newsT").html(newsArr.join(''))

                })

                //合作伙伴的渲染
                var parentsArr = [];
                $.each(data.link,function (i,k) {
                    parentsArr.push(
                    `<div class="col-xs-3 col-sm-3 col-md-3  col-lg-3 our-client-item" style="">`,
                        `<div class="our-client-logo">`,
                        `<img  class="img-responsive center-block" src="${k.link}" alt="" class="img-responsive">`,
                        `</div>`,
                        `</div>`
                    )
                    $("#Parents2").html(parentsArr.join(''))

                })


            },
            error: function () {
               alert("网络错误请稍后……")
            }

        })

        box();
        box2()
    }
    that.NewsDetails =function(){

        $(document).delegate(".pro a","click",function () {

            var id=($(this).attr("data_details"));
            console.log(id)

           $.ajax({
                url : "http://out.ccsc58.cc/DATA_PORT_ZHONGJIZHILENG_1.01/public/index.php/index/product/index",
                dataType:"JSON",
                type:"post",
                data:{id:id},
                success:function (res) {
                    console.log(res,222222222)
                    var data=(res.info);
                    window.sessionStorage.setItem("data",JSON.stringify(data[0]));
                    window.location.href="product.html";

                }
            })
        })
    }

    $(function () {
        $("#submit").click(function () {
            var  name = $("#name").val(),
                telephone = $("#telephone").val(),
                email = $("#email").val(),
                content = $("#content").val()


            if($.trim(name)==""){
                $("#emailMess").html("请输入用户名")
                $("#name").focus();
                return false

            }else if($.trim(telephone)==""){content
                $("#phone").focus();
                return false

            }else if($.trim(content)==""){
                $("#emailMess").html("请输入留言信息")
                $("#").focus();
                return false

            } else if($.trim(email)==""){
                $("#emailMess").html("请输入用户邮箱");
                $("#email").focus();
                return false


            } else  if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/))
            {
                $("#emailMess").html("请输入正确邮箱");
                $("#email1").focus();
                return false
            }else{
                 var url = "http://out.ccsc58.cc/DATA_PORT_ZHONGJIZHILENG_1.01/public/index.php/index/message/add"
                 $.ajax({
                        url : url,
                        dataType:"JSON",
                        type:"post",
                        data:{
                            data: JSON.stringify(
                               data ={
                                   name:name,
                                   telephone:telephone,
                                   email:email,
                                   content:content
                               }
                            )
                        },

                    success:function (data) {
                        alert("提交成功")
                        $("#name").val("");
                        $("#email").val("");
                        $("#content").val("");
                        $("#telephone").val("");
                        $("#emailMess").html("");

                    }
                    }
                )
            }


        })



    })
    $(document).delegate(".yyys","click",function () {
        box()
    })
    $(document).delegate(".yyysB","click",function () {

        box2()
    })
    function box() {
        var arr1 =[];
        arr1.push(
            `<div class="col-md-6 col-xs-12" style="padding: 0">`,
            `<div class="soultionImg">`,
            `<img src="img/solimg.jpg" alt="" class="img-responsive">`,
            `</div>`,
            `</div>`,
            `<div class="col-md-5 col-xs-12" id="ijfja" style="padding: 0;">`,
            `<div class="soultionContent">`,
            `<div class="media-body">`,
            `<p style="color: #ffffff;line-height: 2;">中集智冷根据医药行业客户的实际需求，严格遵守国家GSP操作规范，从医药产品的包装到运输、过程温控、数据的采集和存储等整个流程，利用自主开发的云信息平台和多种冷链温控设备等，控制药品的标准温度和环境。同时每个环节的数据都通过云信息平台实现可视化数据监测，数据安全可追溯，为客户提供医药行业冷链一体化服务解决方案。帮助客户全程把握药品状态和信息，并提供数据支持，温控数据可为客户保留五年。</p>`,
            `<a style="color:#ffffff;font-size: 13px;"><button style="background-color: transparent;    padding: 3px 10px;" data-toggle="modal" data-target="#myModal2">MORE&gt&gt</button></a>`,
            `</div>`,

            `</div>`,
            `</div>`
        )
        $("#fzlic").html(arr1.join(''))
        $("#sajjj span.yyys").css("background","#2f92e2")

    }
    function box2() {
        var arr2 =[];
        arr2.push(
        `<div class="col-md-4 col-md-offset-1 col-xs-12" style="padding: 0">`,
            `<div class="soultionImg">`,
            `<img src="img/sj.png" alt="" class="img-responsive">`,
            `</div>`,
            `</div>`,
            `<div class="col-md-5 col-md-offset-1 col-xs-12 ijfja" id="" style="padding: 0;">`,
            `<div >`,
            `<div class="media-body">`,
            `<a style="color:#ffffff;font-size: 20px;" >中集智冷</a>`,
            `<p style="margin:22px 0px  30px 0px;"><img src="img/WSDJK.png" alt="" class="img-responsive"></p>`,
            `<p class="center margin1 " style="color: #ffffff;margin-bottom: 30px;">全程冷链监控，24小时监控设备信息的云平台<br>主要是对冷链物流过程中的货物和设备进行温度、湿度、位置、运行状态等全方位的实时监控，用户操作简单，可以实时查看设备当前运行状态、温湿度曲线、行驶轨迹、报警推送等</p>`,
            `<div  style="display: flex;" class="soultionContent">`,

            `<div><img src="img/下载安卓-小.png" alt="" class="bqs a" xz="1"><div class='fdsa'><img src='' alt='' class="img-responsive"></div></div>`,
            `<div><img src="img/下载苹果-小.png" alt="" class="bqs" xz="2"><div class='fdsa'><img src='' alt='' class="img-responsive"></div></div>`,

            `</div>`,
            `</div>`,
            `</div>`,
            `</div>`
        )

        $("#fzlic2").html(arr2.join(''))

        $("#sajjj1 span.yyysB").css("background","#2f92e2")
        $(".bqs").mouseover(function () {

            let xz = $(this).attr('xz');
            if(xz == 1){
                // 安卓
                $(this).next().children().attr('src','img/anzhuo.png');


            }else{
                // 苹果
                $(this).next().children().attr('src','img/apple.png');
            }

        }).mouseout(function () {
            $(this).next().children().attr('src','');
        })

    }
    that.initDataList = function () {

        $(".yyys2").click(function () {

            var arr =[];
            arr.push(
                `<div class="col-md-6 col-xs-12" style="padding: 0">`,
                `<div class="soultionImg">`,
                `<img src="img/生鲜方案.jpg" alt="" class="img-responsive">`,
                `</div>`,
                `</div>`,
                `<div class="col-md-5 col-xs-12" id="ijfja" style="padding: 0;">`,
                `<div class="soultionContent">`,
                `<div class="media-body">`,
                `<p style="color: #ffffff;line-height: 2;">为满足食品安全法规和条例日益严格的要求，保证食品在生产、加工、贮藏、运输、销售过程中对特殊温度、湿度的全程控制及数据记录，中集智冷针对食品行业特性和国家规定及标准，运用冷链温度监控设备与系统、云服务平台、冷藏设备等多种技术手段，为客户提供定制化的行业解决方案。</p>`,
                `<a style="color:#ffffff;font-size: 13px;"><button style="background-color: transparent;    padding: 3px 10px;"data-toggle="modal" data-target="#myModal22">MORE&gt&gt</button></a>`,
                `</div>`,
                `</div>`,
                `</div>`
            )
            $("#fzlic").html(arr.join(''))


        })
        $(".yyys2B").click(function () {

            var arr1 =[];
            arr1.push(
                `<div class="col-md-4 col-md-offset-1 col-xs-12" style="padding: 0">`,
                `<div class="soultionImg">`,
                `<img src="img/bqs2.png" alt="" class="img-responsive">`,
                `</div>`,
                `</div>`,
                `<div class="col-md-5 col-xs-12 col-md-offset-1 ijfja" id="" style="padding: 0;">`,
                `<div>`,
                `<div class="media-body">`,
                `<a style="color:#ffffff;font-size: 20px;" >冰骑士</a>`,
                `<p style="margin:22px 0px  30px 0px;"><img src="img/WSDJK.png" alt="" class="img-responsive"></p>`,
                `<p class="center margin1 " style="color: #ffffff;margin-bottom: 30px;">冰骑士是一款国内首家实现医药冷链一体化配送服务的APP，是中集冷云为医药冷链行业搭建的服务共享平台，实现了医药冷链物流到达“最后一公里”的服务场景</p>`,
                `<div  style="display: flex;"  class="soultionContent">`,

                `<div><img src="img/下载安卓-小.png" alt=""  class="bqs a" xz="1"><div class='fdsa'><img src='' alt='' class="img-responsive"></div></div>`,
                `<div><img src="img/下载苹果-小.png" alt="" class="bqs" xz="2"><div class='fdsa'><img src='' alt=''  class="img-responsive"></div></div>`,

                `</div>`,
                `</div>`,
                `</div>`,
                `</div>`
            )
            $("#fzlic2").html(arr1.join(''))
            $(".bqs").mouseover(function () {
                let xz = $(this).attr('xz');
                 if(xz == 1){
                     // 安卓
                     $(this).next().children().attr('src','img/az1.jpg');
                 }else{
                     // 苹果
                     $(this).next().children().attr('src','img/pg1.png');
                 }
            }).mouseout(function () {
                $(this).next().children().attr('src','');
            })
        })
    }


}
$(function () {
    var qst = new questionController();
    qst.init();
})
