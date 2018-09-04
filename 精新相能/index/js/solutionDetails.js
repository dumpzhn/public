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
        var wyid =   window.sessionStorage.getItem("i");

        var ids =    window.sessionStorage.getItem("t1");
        var url = "http://out.ccsc58.cc/DATA_PORT_JINGXINXIANGNENG_1.01/jxxn/public/index.php/index/appmessage/index";
        $.ajax({
            url:url,
            type:"post",
            dataType:"JSON",
            data:{
                type:ids,
                id:wyid
            },
            success:function(res){
                var p = res.data.message[0];
                //console.log(p,9)
                var data = res.data.right;
                console.log(data,999)
                var dataArr =[],
                    dataBrr = [];
                dataCrr = [];
                dataArr2 = [];
                tArr =[];
                tArr.push(
                    `<h4 style="padding: 0px 20px;border-left: 2px solid orangered;font-weight: 800; font-size: 20px;margin-bottom: 30px;" >
                      ${data[0].type}
                    </h4>`
                )
                $("#title").html(tArr.join(''))

                dataArr.push(
                    `<h5><a href="#">${p.type}&gt;${p.title}</a></h5>`
                )
                $("#tities").html(dataArr.join(''));

                dataBrr.push(
                    `<div style="border-bottom: 1px solid #cccccc; margin:30px 0px;">`,
                    ` <h3 class="col-xs-12 col-md-12">${p.title}</h3>`,
                    `<div style="margin:20px 0px;">`,


                    `<span>发布日期：${p.time}</span>`,
                    ` </div>`,
                    `</div>`

                )
                $("#authour").html(dataBrr.join(''))
                dataCrr.push(
                    `<div style="text-align: center;">`,

                    ` </div>`,
                    `<div  >`,
                    `<p>${p.content}</p>`,

                    `</div>`
                )
                $("#cotents").html(dataCrr.join(''))
                var dataArr2 = [];
                console.log(res,"箱变");
                $.each(data,function (index,key) {
                    dataArr2.push(

                        `<div class="row" style="margin-bottom:40px;" data_details ="${key.id}">`,

                        `<ul style="padding:0;line-height:2;">`,

                        `<li class="col-md-3  col-md-offset-1 padding-0">`,
                        `<a class="default" ><img src="${key.picture1}" alt="" class="img-responsive"></a>`,
                        `</li>`,
                        `<li class="col-md-8 padding-0">`,
                        `<a class="default"  style="text-decoration: none;"> ${key.title} </a>`,
                        `</li>`,
                        `<li class="col-md-8" >${key.brief_introduction}</li>`,
                        `</ul>`,
                        `</div>`
                    )
                    $("#rightTitle").html(dataArr2.join(''))
                })

            }
        })

    }

    this.jobTiao = function () {
    /*    $(document).delegate("#rightTitle a", "click", function () {
            alert(5)






        });*/
    }
}
$(function () {
    var qst = new questionController();
    qst.init();
})