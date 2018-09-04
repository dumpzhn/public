/*
Created  by Mwq  on  2018/4/13
*/
var questionController = function () {
    var that = this;
    this.init = function () {
        this.regEvent()
    }
    this.regEvent =function () {
        that.initXr();
        that.initDataList();
        this.initSlab();
        this.initThermometer();
        this.initcloudPlatform();
        this.initGnXuan();
        this.zxtelephone()
        
    }
    this.initXr = function(){
        box();
    }
    this.initDataList = function () {
        $(document).delegate("#bwx","click",function () {

            box();
        })
    }
    function box() {
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/product/bwx";
        $.ajax({
            url: url,
            type: "post",
            dataType: "JSON",
            success: function (res) {
                var content =(res.data.content[0]);
                var data =(res.data.bwx);

                var dataArr = [];
                var dataBrr = [];
                var dataCrr = [];
                $.each(data,function (index,key) {
                    // console.log(key.picture)
                    dataArr.push(
                        `<div class="col-sm-4 col-sm-offset-1 col-xs-6  our-data-item sum-rate" style="margin-bottom:100px;">`,
                        `<div class="number-wrapper">`,
                        `<img src="${key.picture}" alt="" class="img-responsive">`,
                        `</div>`,
                        `<h4 class="title" style="text-align: center;!important;">${key.title}</h4>`,
                        `</div>`

                    )
                    $("#bwxPicture").html(dataArr.join(''))

                })
                dataBrr.push(
                    `<p class="col-sm-10 col-sm-offset-1">${content.content}</p>`
                )
                $("#contentBWX").html(dataBrr.join(''))
                dataCrr.push(
                    `<p class="col-sm-12" >${content.type}</p>`,
                    `<p class="col-sm-2 col-md-3 col-lg-1 col-xs-4"  style="  border-top: 2px solid orangered;display: inline-block;"></p>`,
                    `<p class="col-sm-10" style="margin-bottom: 50px;"></p>`
                )
                $("#titleH").html(dataCrr.join(''))

            }
        })
    }
  this.initSlab = function () {
      $(document).delegate("#slab","click",function () {
          $("#bwx a").css('background','');

          var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/product/bb";
          $.ajax({
              url: url,
              type: "post",
              dataType: "JSON",
              success: function (res) {
                  console.log(res)
                  var content =(res.data.content[0]);
                  var data =(res.data.bb);
                  //console.log(data)
                  var dataArr = [];
                  var dataBrr = [];
                  var dataCrr = [];
                  $.each(data,function (index,key) {
                      // console.log(key.picture)
                      dataArr.push(
                          `<div class="col-sm-4 col-sm-offset-1 col-xs-6  our-data-item sum-rate" style="margin-bottom:100px;">`,
                          `<div class="number-wrapper">`,
                          `<img src="${key.picture}" alt="" class="img-responsive">`,
                          `</div>`,
                          `<h4 class="title" style="text-align: center;!important;">${key.title}</h4>`,
                          `</div>`

                      )
                      $("#bwxPicture").html(dataArr.join(''))

                  })
                  dataBrr.push(
                      `<p class="col-sm-10 col-sm-offset-1">${content.content}</p>`
                  )
                  $("#contentBWX").html(dataBrr.join(''))
                  dataCrr.push(
                      `<p class="col-sm-12" >${content.type}</p>`,
                      `<p class="col-sm-2 col-md-3 col-lg-1 col-xs-4"  style="  border-top: 2px solid orangered;display: inline-block;"></p>`,
                      `<p class="col-sm-10" style="margin-bottom: 50px;"></p>`
                  )
                  $("#titleH").html(dataCrr.join(''))





              }
          })
      })
      
  }

    this.initThermometer = function () {
        $(document).delegate("#initThermometer","click",function () {
            $("#bwx a").css('background','');
            var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/product/wdj";
            $.ajax({
                url: url,
                type: "post",
                dataType: "JSON",
                success: function (res) {
                    console.log(res)
                    var content =(res.data.content[0]);
                    var data =(res.data.wdj);
                    //console.log(data)
                    var dataArr = [];
                    var dataBrr = [];
                    var dataCrr = [];
                    $.each(data,function (index,key) {
                        // console.log(key.picture)
                        dataArr.push(
                            `<div class="col-sm-4 col-sm-offset-1 col-xs-6  our-data-item sum-rate" style="margin-bottom:100px;">`,
                            `<div class="number-wrapper">`,
                            `<img src="${key.picture}" alt="" class="img-responsive">`,
                            `</div>`,
                            `<h4 class="title" style="text-align: center;!important;">${key.title}</h4>`,
                            `</div>`

                        )
                        $("#bwxPicture").html(dataArr.join(''))

                    })
                    dataBrr.push(
                        `<p class="col-sm-10 col-sm-offset-1">${content.content}</p>`

                    )
                    $("#contentBWX").html(dataBrr.join(''))
                    dataCrr.push(
                        `<p class="col-sm-12" >${content.type}</p>`,
                        `<p class="col-sm-2 col-md-3 col-lg-1 col-xs-4"  style="  border-top: 2px solid orangered;display: inline-block;"></p>`,
                        `<p class="col-sm-10" style="margin-bottom: 50px;"></p>`

                    )
                    $("#titleH").html(dataCrr.join(''))





                }
            })
        })
    }





    this.initcloudPlatform = function () {
        $(document).delegate("#initcloudPlatform","click",function () {
            $("#bwx a").css('background','');

            var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/product/ypt";
            $.ajax({
                url: url,
                type: "post",
                dataType: "JSON",
                success: function (res) {
                    console.log(res)
                    var content =(res.data.content[0]);
                    var data =(res.data.ypt);
                    //console.log(data)
                    var dataArr = [];
                    var dataBrr = [];
                    var dataCrr = [];
                    $.each(data,function (index,key) {
                        // console.log(key.picture)
                        dataArr.push(
                            `<div class="col-sm-4 col-sm-offset-1 col-xs-6  our-data-item sum-rate" style="margin-bottom:100px;">`,
                            `<div class="number-wrapper">`,
                            `<img src="${key.picture}" alt="" class="img-responsive">`,
                            `</div>`,
                            `<h4 class="title" style="text-align: center;!important;">${key.title}</h4>`,
                            `</div>`

                        )
                        $("#bwxPicture").html(dataArr.join(''))

                    })
                    dataBrr.push(
                        `<p class="col-sm-8 col-sm-offset-2" style="margin-bottom: 50px;">${content.content}</p>`

                    )
                    $("#contentBWX").html(dataBrr.join(''))
                    dataCrr.push(
                        `<p class="col-sm-12" >${content.type}</p>`,
                        `<p class="col-sm-2 col-md-3 col-lg-1 col-xs-4"  style="  border-top: 2px solid orangered;display: inline-block;"></p>`,
                        `<p class="col-sm-10" style="margin-bottom: 50px;"></p>`
                    )
                    $("#titleH").html(dataCrr.join(''))





                }
            })
        })
    }
    //资讯热线渲染
    this.zxtelephone = function () {
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/hotline/index";
        $.ajax({
            url:url,
            data:"post",
            dataType:"JSON",
            success:function (res) {
                var dataArr = [];
                var data =res.data.hotline;
                $.each(data,function (i,k) {
                    dataArr.push(
                    `<p>${k.name}</p>`
                    )
             $("#zxtelephone").html(dataArr.join(''))
                })

            }
        })
    }



    
    this.initGnXuan = function () {
        $("#XrTz a").on("click",function () {
            var id=($(this).data("name"));
           // alert(id)
            window.sessionStorage.setItem("ids",id)
            window.location .href="productList.html"
        })
    }
    }
    $(function () {
        var qst = new questionController();
        qst.init();

    })