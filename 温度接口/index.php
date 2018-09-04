<?php
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");//解决跨域问题
include "connA.inc";

////////////////地址转换函数1
function zhuanhua02($address){
	 $url = 'http://api.map.baidu.com/geocoder/v2/';
	 $post_data['callback']       = 'renderReverse';
     $post_data['output']       = 'json';
	 $post_data['ak']      = 'XP1alssWsEscC3NfYAhj6YfqKvgQgUXF';
	 $post_data['pois']='0';
 	 $post_data['location']=$address;
	 $o = "";
        foreach ( $post_data as $k => $v ) 
        { 
            $o.= "$k=" . urlencode( $v ). "&" ;
        }
        $post_data = substr($o,0,-1);
        $res = request_post($url, $post_data);       
        return $res;
    }
///////////////地址转换函数2
function zhuanhua01($data){
	 $url = 'http://api.map.baidu.com/geoconv/v1/';
	 $post_data['from']       = '1';
     $post_data['to']       = '5';
	 $post_data['ak']      = 'XP1alssWsEscC3NfYAhj6YfqKvgQgUXF';
	 $post_data['coords']=$data;
 	 
	 $o = "";
        foreach ( $post_data as $k => $v ) 
        { 
            $o.= "$k=" . urlencode( $v ). "&" ;
        }
        $post_data = substr($o,0,-1);
        $res = request_post($url, $post_data);       
        return $res;
    }
	
function request_post($url = '', $param = '') {
        if (empty($url) || empty($param)) {
            return false;
        }
        $postUrl = $url;
        $curlPost = $param;
        $ch = curl_init();//初始化curl
        curl_setopt($ch, CURLOPT_URL,$postUrl);//抓取指定网页
        curl_setopt($ch, CURLOPT_HEADER, 0);//设置header
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
        curl_setopt($ch, CURLOPT_POST, 0);//post提交方式
        curl_setopt($ch, CURLOPT_POSTFIELDS, $curlPost);
        $data = curl_exec($ch);//运行curl
        curl_close($ch);
        return $data;
    }

function ReturnAddress($x,$y)
{
$hanzi_address=$x.",".$y;
$hanzi_data=zhuanhua01($hanzi_address);
$hanzi_obj=json_decode($hanzi_data,true);
$hanzi_address=$hanzi_obj['result'][0]['y'].','.$hanzi_obj['result'][0]['x'];
$hanzi_data=zhuanhua02($hanzi_address);
$hanzi_obj=json_decode($hanzi_data,true);
return $hanzi_obj['result']['formatted_address'].$hanzi_obj['result']['sematic_description']; 
}
////地址转换函数


$admin_permit=$_POST[admin_permit];       //访问允许号码3d66cee22ee391327247648df53c21a9e6357acef
$SheBeiBianHao=$_POST[SheBeiBianHao];     //设备编号
$StartTime=$_POST[StartTime];             //起始时间
$EndTime=$_POST[EndTime];                 //结束时间
$Low_T=$_POST[Low_T];                     //温度下限
$Hight_T=$_POST[Hight_T];                 //温度上限

$StartNo=$_POST[StartNo];                
$Length=$_POST[Length];

$device_sql=mysql_query("select guigexinghao,suoshujigou,fasong_jiange_minute from tb_device where shebeibianhao='$SheBeiBianHao'");

$row=mysql_fetch_object($device_sql);
if(!$row){$PasswordOk=0;}	
else {
$PasswordOk=1;
$suoshujigou=$row->suoshujigou;
$suoshujigou_6=substr($row->suoshujigou,0,6);
$fasong_jiange_minute=$row->fasong_jiange_minute; //发送间隔时间
}
/////////////////////////////////////////
//echo $PasswordOk."-$suoshujigou-\n";
//echo "select guigexinghao,suoshujigou,fasong_jiange_minute from tb_device where shebeibianhao='$SheBeiBianHao'\n";

$arr=array();
if(($PasswordOk==1)&&($admin_permit=="3d66cee22ee391327247648df53c21a9e6357acef")){
//如果输入参数缺失
if((trim($SheBeiBianHao)=='')||(trim($StartTime)=='')||(trim($EndTime)=='')||(trim($StartNo)=='')||(trim($Length=='')))
{
$arr[code]=30000;
$arr[message]='CheckFalse';
$arr[resultCode]='null';
}
else {
$arr[code]=10000;
$arr[message]='success';

$guigexinghao=$row->guigexinghao; //返回规格型号
$arr[guigexinghao]=$guigexinghao;

$arr[two_temperature]=0; //双温探头=0
if(strpos($guigexinghao,"TT")>0){
$arr[two_temperature]=1; //双温探头=1
			}
///////////////////////////////////////////////////////
$sql=mysql_query("select id,shebeibianhao,time,servicetime,temperature01/10,temperature02/10,humidity/10,jingdu,weidu,power,yuliu01,yuliu02,shujuchangdu from tb_data_".$suoshujigou_6."  where shebeibianhao='$SheBeiBianHao'and time >'$StartTime' and time <'$EndTime' group by time order by time desc limit $StartNo,$Length");

$row=mysql_fetch_row($sql);
if(!$row){
	$arr[resultCode]='null';
}
else {

$mintemperature01=999999;
$maxtemperature01=-999999;
$avgtemperature01=0;

$mintemperature02=999999;
$maxtemperature02=-999999;
$avgtemperature02=0;

$minhumidity=999999;
$maxhumidity=-999999;
$avghumidity=0;

$datalength=0; //数据长度
$L_datalength=0; //低于温度的数据点数
$H_datalength=0; //高于温度的数据点数

$json=array(); 
$arr_1=array();
do{
$datalength=$datalength+1;

$arr_1[id]=$row[0];
$arr_1[shebeibianhao]=$row[1];
$arr_1[time]=$row[2];

if($datalength==1)$Start_datetime=$arr_1[time];//开始时间
$End_datetime=$arr_1[time];//结束时间
$arr_1[servicetime]=$row[3];
$arr_1[temperature01]=$row[4];

if($mintemperature01>$arr_1[temperature01])$mintemperature01=(float)$arr_1[temperature01];
if($maxtemperature01<$arr_1[temperature01])$maxtemperature01=(float)$arr_1[temperature01];
$avgtemperature01=$avgtemperature01+(float)$arr_1[temperature01];

if($arr_1[temperature01]<$Low_T)$L_datalength=$L_datalength+1;  //低温点数

if($arr_1[temperature01]>$Hight_T)$H_datalength=$H_datalength+1;//高温点数

$arr_1[temperature02]=$row[5];
if($mintemperature02>$arr_1[temperature02])$mintemperature02=(float)$arr_1[temperature02];
if($maxtemperature02<$arr_1[temperature02])$maxtemperature02=(float)$arr_1[temperature02];
$avgtemperature02=$avgtemperature02+(float)$arr_1[temperature02];

$arr_1[humidity]=$row[6];
if($minhumidity>$arr_1[humidity])$minhumidity=(float)$arr_1[humidity];
if($maxhumidity<$arr_1[humidity])$maxhumidity=(float)$arr_1[humidity];
$avghumidity=$avghumidity+(float)$arr_1[humidity];

$arr_1[speed]=$row[12];
$arr_1[jingdu]=$row[7];$arr_1[weidu]=$row[8];
$PositionX=$arr_1[jingdu];$Positiony=$arr_1[weidu];

$arr_1[power]=$row[9];
$arr_1[shujuleixingbiaozhi]=$row[10];
$arr_1[xiangzistate]=$row[11];
//--------------------------------------------------------------------------------------
//$arr_1[shebeibianhao],看低四位  1       1      1       1 
//分别代表                     温度    湿度    速度    状态
if(($arr_1[shujuleixingbiaozhi]&128)!=0)$arr_1[net_leixing]='GPS';
else if(($arr_1[shujuleixingbiaozhi]&64)!=0)$arr_1[net_leixing]='GPRS';
else $arr_1[net_leixing]='No Net';

if(($arr_1[shujuleixingbiaozhi]&1)!=0){
if(($row[11]&128)==0)$arr_1[xiangzistate]='close';
else $arr_1[xiangzistate]='open';
}
else $arr_1[xiangzistate]='close';

$arr_1[xinghaoqiangdu]=($row[11])&31;
//------------------------------------------------------------------------------------
$oldtime=$arr_1[time];
$json[]=$arr_1; 
}while($row=mysql_fetch_row($sql));

$Send_date=$current_time=date("Y-m-d H:i:s");//报告创建时间

$Position=ReturnAddress($PositionX,$PositionY);

$arr[Send_date]=$Send_date;//报告创建时间
$arr[Position]=$Position;//GSP坐标，目前为汉字信息

$arr[Temp_no]=$SheBeiBianHao;//设备编号
$arr[Temp_na]="";//设备名称

$arr[Temp_l]=number_format($mintemperature01,2);//最低温度
$arr[Temp_h]=number_format($maxtemperature01,2);//最高温度
$arr[Temp_avg]=number_format($avgtemperature01/$datalength,2);//平均温度
$arr[Start_datetime]=$Start_datetime;//起始时间
$arr[End_datetime]=$End_datetime;//结束时间
$arr[Point_num]=$datalength;//总点数

$Point_time=$datalength*$fasong_jiange_minute;
$arr[Point_time]=(string)($Point_time)."分钟";//记录总时长
$arr[Temp_l_wp]=$H_datalength;//高温警告点数
$arr[Temp_h_wp]=$L_datalength;//低温警告点数
$Temp_l_wt=$H_datalength*$fasong_jiange_minute;
$arr[Temp_l_wt]=$Temp_l_wt."分钟";//高温警告时长
$Temp_h_wt=$L_datalength*$fasong_jiange_minute;
$arr[Temp_h_wt]=$Temp_h_wt."分钟";//低温警告时长
$arr[state]="正常";//报告状态

if(($H_datalength+$L_datalength)>0)$arr[state]="警告";//报告状态
//$arr[resultCode]=$json;

      }

if($arr[resultCode]=='null')$arr[message]='noData';//如果数据为空，则返回'noDate'
}
}
else{
$arr[code]=30000;
$arr[message]='fail';
$arr[resultCode]='Nopermit';
	}
$returns=json_encode($arr);
echo $returns;
?>
