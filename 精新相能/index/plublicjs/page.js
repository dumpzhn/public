// JavaScript Document
(function($){
	$.fn.creatPage=function(option){
		//将用户传入的数据与默认设置的参数合并
		var ops=$.extend({
			current:1,
			prev:"上一页",
		    next:"下一页",
		    pageSize:"",
			callback:function(page){
		    }
		},option||{});
		var ms={
		    param:ops,
			createHtml:function(obj,data){
				 //生成HTML代码	 
				obj.empty();//清空当前对象
				var str="";
				//上一页
				if(data.current==1){
					str+='<span href="###" class="link prev">'+data.prev+'</span>';
				}else{
					str+='<a href="###" class="link prev">'+data.prev+'</a>';
				}
				//中间的数字
				if(data.pageSize<=6){
					for(var i=0;i<data.pageSize;i++){
						if(i==data.current-1){
						  str+='<span href="###" class="link nLink active">'+(i+1)+'</span>'
					   }else{
						  str+='<a href="###" class="link nLink">'+(i+1)+'</a>';
					   }
					}
				}else{
					if(data.current<=2){
					   for(var i=0;i<data.pageSize;i++){
						   if(i==data.current-1){
							  str+='<span href="###" class="link nLink active">'+(i+1)+'</span>'
						   }else{
							   if(i<4){
								   str+='<a href="###" class="link nLink">'+(i+1)+'</a>';
								}else if(i==data.pageSize-1){
									str+='<span>...</span><a href="###" class="link nLink">'+(i+1)+'</a>';
								} 
						   }
						}
					}else if(data.current>data.pageSize-2){
						for(var i=0;i<data.pageSize;i++){
						   if(i==data.current-1){
							  str+='<span href="###" class="link nLink active">'+(i+1)+'</span>'
						   }else{
							   if(i>data.pageSize-5){
								   str+='<a href="###" class="link nLink">'+(i+1)+'</a>';
								}else if(i==0){
									str+='<a href="###" class="link nLink">'+(i+1)+'</a><span>...</span>';
								} 
						   }
						}
					}else{
						for(var i=0;i<data.pageSize;i++){
						   if(i==data.current-1){
							  str+='<span href="###" class="link nLink active">'+(i+1)+'</span>'
						   }else{
							   if(i>data.current-4&&i<data.current+2){
								   str+='<a href="###" class="link nLink">'+(i+1)+'</a>';
								}else if(i==0){
									str+='<a href="###" class="link nLink">'+(i+1)+'</a><span>...</span>';
								}else if(i==data.pageSize-1){
									str+='<span>...</span><a href="###" class="link nLink">'+(i+1)+'</a>';
								} 
						   }
						}
					}
				}
				//下一页
				if(data.current==data.pageSize){
					str+='<span href="###" class="link next">'+data.next+'</span>';
				}else{
					str+='<a href="###" class="link next">'+data.next+'</a>';
				}
				obj.append(str);
			},
			addEvent:function(obj,param){
			 //绑定点击事件
			 obj.on('click',"a.nLink",function(){//未来元素的点击绑定
			    var number=parseInt($(this).text());
				param.current=number;
				ms.createHtml(obj,param);
				param.callback(number);
				
			 });
			 obj.on('click',"a.next",function(){//未来元素的点击绑定
			    var number=parseInt(obj.find(".active").text());
				param.current=number+1;
				ms.createHtml(obj,param);
                 param.callback(number);
			 });
			  obj.on('click',"a.prev",function(){//未来元素的点击绑定
			    var number=parseInt(obj.find(".active").text());
			    //alert(number);
				param.current=number-1;
				ms.createHtml(obj,param);
                  param.callback(number);
			 });
			 
			}
	    }
		ms.createHtml(this,ms.param);
		ms.addEvent(this,ms.param);
	};
	
})(jQuery)