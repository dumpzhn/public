<?php
//2018-05-31更改，主要是对设备上下限温度进行了完善，并关联了平台报警参数为1。
//2018-05-08更改，增加公司名称
//2018-03-24更改，将数据库由125服务器移植到阿里云上的服务器

header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");//解决跨域问题
include "connW.inc";

$admin_permitS= "3d66cee22eb39927242348df53c21a9e" ;
$admin_permit=$_GET['admin_permit'];   //序列码
$WaybillNumber=$_GET['WaybillNumber']; //运单号码
$SheBeiBianHao=$_GET['SheBeiBianHao']; //设备编号
$PickTime=$_GET['PickTime'];           //发货时间
$StartAddress=$_GET['StartAddress'];   //发货地址
$EndAddress=$_GET['EndAddress'];       //结束地址
$Company=$_GET['Company'];             //公司名称2018-05-08
$Tel=$_GET['Tel'];                     //客服电话
$T_low=$_GET['T_low'];                 //温度上限
$T_hign=$_GET['T_hign'];               //温度上限

$state=0;                              //状态=0，表示还没有处于签收状态

/*
PasswordOk=2 设备不是用户的设备
PasswordOk=3 访问时间没有间隔5天
PasswordOk=4 无访问权限
PasswordOk=5 用户输入参数不对
*/

$arr=array();

if((trim($admin_permit)=='')||(trim($WaybillNumber)=='')||(trim($SheBeiBianHao)=='')||(trim($PickTime)=='')||(trim($StartAddress==''))||(trim($EndAddress==''))||(trim($Tel==''))||(trim($T_low==''))||(trim($T_hign=='')))
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

//将所有设备号属于小tp的，置为5分钟开启模式
//第一步：读出设备号组，并进行处理
				$caiji_jiange_minute=5;//采集间隔时间
				$fasong_jiange_minute=5;//发送间隔时间
				$flag=1;                //修改标志

				$SheBeiBianHao_array=explode(',',$SheBeiBianHao);
				$SheBeiBianHao_length=count($SheBeiBianHao_array);
				//读取每一个设备编号
				for($SheBeiBianHao_i=0;$SheBeiBianHao_i<$SheBeiBianHao_length;$SheBeiBianHao_i++)
				{
						$SheBeiBianHao_part=$SheBeiBianHao_array[$SheBeiBianHao_i];  //读出每一个设备编号
						//$Device_sql=mysql_query("select shebeibianhao,guigexinghao from tb_device where shebeibianhao='$SheBeiBianHao_part' and guigexinghao='ZL-TT10TP'");//只有10TP型号设备方可进行妥投操作
						$Device_sql=mysql_query("select shebeibianhao,guigexinghao from tb_device where shebeibianhao='$SheBeiBianHao_part'");//2018-07-05 改正，都可以进行妥投操作，不仅是型号
						
						$Device_row=mysql_fetch_row($Device_sql);
						if($Device_row){
                         //将此设备设置为5分钟开启模式
						 $WaybillNumber_S="$WaybillNumber"."(".$StartAddress."-".$EndAddress.")";
						 
						 $Device_INS=mysql_query("update tb_device set caiji_jiange_minute='$caiji_jiange_minute',fasong_jiange_minute='$fasong_jiange_minute',baojingwendu_shangxian='$T_hign',baojingwendu_shangxian_baojing='1',baojingwendu_xiaxian='$T_low',baojingwendu_xiaxian_baojing='1',qidongpingtaibaojing='1',yewubianhao='$WaybillNumber_S',
						 flag='$flag' where shebeibianhao='$SheBeiBianHao_part'");
										}	
						else {
                               //代表没有，就是什么都不干
								}				
				}
//////////////////////////////////////////////设备妥投功能设置结束

$INS=mysql_query("insert Into tb_PutData_Tms(WaybillNumber,SheBeiBianHao,PickTime,SignTime,StartAddress,EndAddress,Tel,state,T_low,T_hign,Company) Values ('$WaybillNumber','$SheBeiBianHao','$PickTime','$SignTime','$StartAddress','$EndAddress','$Tel','$state','$T_low','$T_hign','$Company')");

if($INS==true){
$arr[code]=10000;
$arr[message]='success';
$arr[resultCode]='success';
/////////////////////////////
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
http://www.ccsc58.com/json/17_00_PutData_Tms_PickTime.php?admin_permit=3d66cee22eb39927242348df53c21a9e&WaybillNumber=123456&SheBeiBianHao=123123,100234,00583&PickTime=2018-01-02%2012:00:00&StartAddress=杭州&EndAddress=上海&Tel=13581726522&T_low=-12&T_hign=3
*/
	
?>