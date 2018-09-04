<?php
//更改，2018-06-29，修正了一个小bug，涉及Update 中的引号问题
//更改，2018-06-20 增加了取消温度上下限报警
//2018-05-31更改，关联了平台报警参数为0。
//2018-03-24更改，将数据库由125服务器移植到阿里云上的服务器
//修改采集时间

header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");//解决跨域问题
include "connW.inc";

$admin_permitS= "3d66cee22eb39927242348df53c21a9e" ;
$admin_permit=$_GET['admin_permit'];   //序列码
$WaybillNumber=$_GET['WaybillNumber']; //运单号码
$SignTime=$_GET['SignTime'];           //签收时间
$state=1;                              //状态=1，表示已处于签收状态

$arr=array();

if((trim($admin_permit)=='')||(trim($WaybillNumber)=='')||(trim($SignTime)==''))
{
$arr[code]=30000;
$arr[message]='CheckFalse';
$arr[resultCode]='null';
$returns=json_encode($arr);
echo $returns;
exit();
}

if($admin_permit!=$admin_permitS)
{
$arr[code]=30000;
$arr[message]='fail';
$arr[resultCode]='permitted pass is wrong';
$returns=json_encode($arr);
echo $returns;
exit();
}


$INS=mysql_query("
update tb_PutData_Tms set SignTime='$SignTime',state='$state' where WaybillNumber='$WaybillNumber'");

		///////////////////////////////////////将输出微信报警的记录，当做一个文件进行存放
		// $servicetime=date("Y-m-d H:i:s");
		// $log_filename="/root/inputdata/baojing_record/baojing_send_TMS_weixing_from_device(".substr($servicetime,0,4).substr($servicetime,5,2).substr($servicetime,8,2).").txt";
		// $log_file = fopen($log_filename,"a");
		// fputs($log_file,"SignTime=".$SignTime.",state=".$state.",WaybillNumber=".$WaybillNumber.",servicetime=".$servicetime."\n");
		// fclose($log_file);
		//////////////////////////////////////
		
		
//将所有设备号属于小tp的，置为30分钟开启模式
				$caiji_jiange_minute=30;//采集间隔时间
				$fasong_jiange_minute=30;//发送间隔时间
				$flag=1;                //修改标志
				
				$tb_PutData_Tms_sql=mysql_query("select SheBeiBianHao from tb_PutData_Tms  where WaybillNumber='$WaybillNumber'");
				$tb_PutData_Tms_row=mysql_fetch_object($tb_PutData_Tms_sql);
				if($tb_PutData_Tms_row)
				{      
				//读出设备号组，并进行处理
						$SheBeiBianHao_array=explode(',',$tb_PutData_Tms_row->SheBeiBianHao);
						$SheBeiBianHao_length=count($SheBeiBianHao_array);
						//读取每一个设备编号
						for($SheBeiBianHao_i=0;$SheBeiBianHao_i<$SheBeiBianHao_length;$SheBeiBianHao_i++)
						{
								$SheBeiBianHao_part=trim($SheBeiBianHao_array[$SheBeiBianHao_i]);  //读出每一个设备编号
								$Device_sql=mysql_query("select shebeibianhao,guigexinghao from tb_device where shebeibianhao='$SheBeiBianHao_part'");//所有型号设备都可进行妥投操作
								$Device_row=mysql_fetch_row($Device_sql);
								if($Device_row){
								 //将此设备设置为5分钟开启模式
								// $Device_INS=mysql_query("update tb_device set caiji_jiange_minute='$caiji_jiange_minute',fasong_jiange_minute='$fasong_jiange_minute',flag='$flag' where shebeibianhao='$SheBeiBianHao_part'");
		//更改，2018-06-20 增加了取消温度上下限报警
		$WaybillNumber_S="$WaybillNumber"."(已签收)";
		$Device_INS=mysql_query("update tb_device set fasong_jiange_minute='$fasong_jiange_minute',qidongpingtaibaojing='0',baojingwendu_shangxian_baojing='0',baojingwendu_xiaxian_baojing='0',yewubianhao='$WaybillNumber_S',flag='$flag' where shebeibianhao='$SheBeiBianHao_part'");
		
				//更换了报警文件存放地址；
		$log_filename="/data/wwwroot/default/json/17_00_PutData_Tms_SignTime.txt";
		$log_file = fopen($log_filename,"a");
		fputs($log_file,date("Y-m-d H:i:s").":update tb_device set fasong_jiange_minute='$fasong_jiange_minute',qidongpingtaibaojing='0',baojingwendu_shangxian_baojing='0',baojingwendu_xiaxian_baojing='0',yewubianhao='$WaybillNumber_S',flag='$flag' where shebeibianhao='$SheBeiBianHao_part'"."\n");
		fclose($log_file);
		//////////////////////////////////////
		
								
												}	
								else {
									   //代表没有，就是什么都不干
									 }				
						}
				}
//////////////////////////////////////////////////////////设备妥投功能设置结束

if($INS==true){
$arr[code]=10000;
$arr[message]='success';
$arr[resultCode]='success';
			}
else {
$arr[code]=30000;
$arr[message]='fail';
$arr[resultCode]='fail';
	}
	
$returns=json_encode($arr);
echo $returns;
exit();

/*
http://www.ccsc58.com/json/17_00_PutData_Tms_SignTime.php?admin_permit=3d66cee22eb39927242348df53c21a9e&WaybillNumber=23412341234&SignTime=2018-01-02%2018:00:00
*/
	
	
	
?>