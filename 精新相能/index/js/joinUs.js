/*
Created  by Mwq  on  2018/4/13
*/
var questionController = function() {
    var that = this;
    this.init = function () {
        this.regEvent();


    }
    this.regEvent = function () {

        that.initDataList();

    }
    this.initDataList = function () {
        var wyid =   window.sessionStorage.getItem("q");

        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/recruit/index";
        $.ajax({
            url:url,
            type:"post",
            dataType:"JSON",
            data:{
                id:wyid
            },
            success:function(res){
                var p = res.data.info[0];
                console.log(p,9)
                dataBrr = [];
                dataCrr = [];
                dataArr2 = []
                dataBrr.push(
               `<div class="row" style="padding: 30px 0px;">`,
                    `<span class="col-md-6 col-xs-offset-1" style="font-size: 24px;">${p.job}</span>`,
                    `<span class="col-md-3 col-xs-12"style="text-align:right;padding-left:0;">发布时间：${p.time}</span>`,
                `</div>`,
                `<div class="row" style="padding: 30px 0px;margin-left: 1px;">${p.pag}</div>`

                )
                $("#authour").html(dataBrr.join(''))
                dataCrr.push(
                `<div class="col-md-10 padding-0" >`,
                    `<a class="default"  >${p.describe}</a>`,
               ` </div>`
                )
                $("#describe").html(dataCrr.join(''))
                var dataArr2 = [];
                dataArr2.push(
                    `<div class="col-md-10 padding-0">`,
                    `<a class="default"  >${p.requirement}</a>`,
                    ` </div>`
                )
                $("#requirement").html(dataArr2.join(''))

            }
        })

    }
}
$(function () {
    var qst = new questionController();
    qst.init();
})

