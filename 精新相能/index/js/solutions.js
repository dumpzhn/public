/*
Created  by Mwq  on  2018/4/13
*/
var questionController = function () {
    var that = this;
    this.init = function () {
        this.regEvent()
    }
    this.regEvent = function () {
        that.initXr();
        that.initDataList();
        this.initSlab();
        this.initThermometer();
        this.NewsDetails();
         this. NewsDetails2();
         this.initGnXuan()


    }
    this.initXr = function () {
        box();
    }
    this.initDataList = function () {
        $(document).delegate("#materials", "click", function () {
            box();
        })
    }

    function box() {
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/solution/index";
        $.ajax({
            url: url,
            type: "post",
            dataType: "JSON",
            success: function (res) {
                console.log(res)
                var data1 = (res.data.info[0]);
                var r = (res.data.honor);
                var s = res.data.xbcl;
                // var t =s[0].type;
                //console.log(t,8)
                // window.sessionStorage.setItem("t1",t);

                var p = res.data.xbcn;
                // var t2 = p[0].type;
                // console.log(t2);
                // window.sessionStorage.setItem("t2",t2);




                var dataBrr = [];
                var dataArr = [];
                var dataCrr = [];
                var dataDrr = [];
                var data = [];
                var d = [];
                var a =[];
                var m = []
                $.each(s,function (i,k) {
                    a.push(
                        `<li><a href="#"  data_details ="${k.id} style="cursor: pointer;">${k.title}</a></li>`
                    )
                    $("#xbcl").html(a.join(''))

                });
                $.each(p,function (i,k) {
                    m.push(
                       `<li><a href="#"  data_details ="${k.id} style="cursor: pointer;">${k.title}</a></li>`
                       /* `<li  data_details ="${k.id}">${k.title}</li>`*/
                    )
                    $("#xbcn").html(m.join(''))

                });
                d.push(
                    `<img src="${data1.banner}" alt="" class="img-responsive" style="width: 100%;margin-bottom: 50px;">`
                )

                $("#banee").html(d.join(''))

                dataBrr.push(
                    `<p class="">${data1.xbcl}</p>`
                )
                $("#contentBWX").html(dataBrr.join(''))
                dataArr.push(
                    `<img src="${data1.picture1}" alt="" class="img-responsive">`
                )

                $("#picturl").html(dataArr.join(''))

                dataCrr.push(
                    `<img src="${data1.picture2}" alt="" class="img-responsive col-md-10">`
                )
                $("#pppp").html(dataCrr.join(''))
                dataDrr.push(
                    `<img src="${data1.picture3}" alt="" class="img-responsive col-md-6">`
                )
                $("#qyys").html(dataDrr.join(''))

                $.each(r, function (i, k) {
                    data.push(
                        `<div class="col-md-3 honor ">`,
                        `<div class="number-wrapper">`,
                        `<img src="${k.picture}" alt="" class="img-responsive">`,
                        `</div>`,
                        `<h4 class="title">${k.content}</h4>`,
                        `</div>`
                    )
                    $("#hoore").html(data.join(''))
                })


            }
        })
    }
    that.NewsDetails =function(){
        //console.log("#NewsDetails")
        $(document).delegate("#xbcl li a","click",function () {
            var id=($(this).attr("data_details"));
            window.sessionStorage.setItem("i",id);
            window.sessionStorage.removeItem("t1");
            window.sessionStorage.setItem("t1",'相变材料应用');

           var t1 =   window.sessionStorage.getItem("t1");


            $.ajax({
                url:"http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/appmessage/index",
                dataType:"JSON",
                type:"post",
                data:{id:id,
                    type:t1
                  },
                success:function (res) {
                    console.log(res,222222222)

                    var data=(res.data.message);
                    console.log(data,333)
                window.location.href="solutionDetails.html";

                }
            })
        })
    }
    that.NewsDetails2 =function(){
        //console.log("#NewsDetails")
        $(document).delegate("#xbcn li a","click",function () {
            var id=($(this).attr("data_details"));
            console.log(id)
            window.sessionStorage.setItem("i",id);
            window.sessionStorage.setItem("t1",'相变储能材料');

             var p =   window.sessionStorage.getItem("t1");


            $.ajax({
                url:"http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/appmessage/index",
                dataType:"JSON",
                type:"post",
                data:{
                    id:id,
                    type:p,
                },
                success:function (res) {
                    console.log(res,222222222)
                    var data=(res.data.message);
                    console.log(data,333)
                  window.location.href="solutionDetails.html";

                }
            })
        })
    }
    this.initSlab = function () {
        $(document).delegate("#cloud", "click", function () {
            var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/solution/index";
            $.ajax({
                url: url,
                type: "post",
                dataType: "JSON",
                success: function (res) {
                    //console.log(res)
                    var data = (res.data.info[0]);
                    console.log(data)
                    var dataBrr = [];

                    dataBrr.push(
                        `<p class="">${data.ypt}</p>`
                    )
                    $("#contentBWX").html(dataBrr.join(''))


                }
            })
        })

    }

    this.initThermometer = function () {
        $(document).delegate("#Logistics", "click", function () {
            var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/solution/index";
            $.ajax({
                url: url,
                type: "post",
                dataType: "JSON",
                success: function (res) {
                    var data = (res.data.info[0]);
                    //console.log(data)

                    var dataBrr = [];

                    dataBrr.push(
                        `<p class="">${data.wlw}</p>`
                    )
                    $("#contentBWX").html(dataBrr.join(''))


                }
            })
        })
    }

    this.initGnXuan = function () {
        $("#xbcnn a").on("click",function () {
            var id=($(this).data("name"));
            window.sessionStorage.setItem("t1",id);

             window.location .href="solutionList.html"

        })
    }


}
$(function () {
    var qst = new questionController();
    qst.init();

})