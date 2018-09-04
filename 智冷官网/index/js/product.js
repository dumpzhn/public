
/*
Created  by Mwq  on  2018/6/7
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
        let data = JSON.parse(window.sessionStorage.getItem("data"));
        var dataBrr = [];
        var dataPicture2 = []

       console.log(data)
        dataBrr.push(
            `<div class="container" >`,
            `<div>`,
            `<p style="color:#348fdb;font-size: 24px;margin:36px 0px;" class="animated fadeInLeft">${data.title}</p>`,
            `</div>`,
            `</div>`,
            `<div class="container" style="min-height: 42px;margin-bottom: 30px;">`,
            `<p style="min-height: 42px;line-height: 42px;font-size: 14px;color:#333333;margin:0px;background-color: #f3f3f3;" > <span style="padding: 0px 15px">${data.content}</span> </p>`,
            `</div>`,
            `<div class="container" style="padding: 0">`,
            `<div class="row" style="margin: 0px 0px 70px 0px;" id="fzlic">`,
            `<div class="col-md-6 col-xs-12" >`,
            `<div class="loadingImg animated fadeInLeft">`,
            `<img src="${data.picture2}" alt="" class="img-responsive "> `,
            `</div>`,
            `</div>`,
            `<div class="col-md-5 col-xs-12" id="ijfja" >`,
            `<div class="soultionContent">`,
            `<div class="media-body">` ,
            `<p style="color:#ffffff;font-size: 14px;" >产品名称：${data.title}</p>`,
            `<p style="color:#ffffff;font-size: 14px;" >产品型号：${data.model}</p>`,
            `<p style="color:#ffffff;font-size: 14px;" >产品特点：${data.tedian}</p>`,
            `<p style="color:#ffffff;font-size: 14px;" >应用场景：${data.scene}</p>`,
            `<a style="color:#ffffff;font-size: 13px;" href="http://out.ccsc58.cc/DATA_PORT_ZHONGJIZHILENG_1.01/public/index.php/index/product/download?file=${data.description}"><button style="background-color: #999;color:#ffffff;width: 100px;height: 30px;">说明书下载</button></a>`,
            `</div>`,
            `</div>`,
            `</div>`,
            `</div>`,
            `</div>`


        )
        $("#p_content").html(dataBrr.join(''))

        dataPicture2.push(

        `<img src="${data.param}" class="img-responsive  animated rollIn" >`

        )
        $("#picture22").html(dataPicture2.join(''))
    }





}
$(function () {
    var qst = new questionController();
    qst.init()
})