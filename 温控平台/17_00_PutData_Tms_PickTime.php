<?php
//2018-05-31���ģ���Ҫ�Ƕ��豸�������¶Ƚ��������ƣ���������ƽ̨��������Ϊ1��
//2018-05-08���ģ����ӹ�˾����
//2018-03-24���ģ������ݿ���125��������ֲ���������ϵķ�����

header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");//�����������
include "connW.inc";

$admin_permitS= "3d66cee22eb39927242348df53c21a9e" ;
$admin_permit=$_GET['admin_permit'];   //������
$WaybillNumber=$_GET['WaybillNumber']; //�˵�����
$SheBeiBianHao=$_GET['SheBeiBianHao']; //�豸���
$PickTime=$_GET['PickTime'];           //����ʱ��
$StartAddress=$_GET['StartAddress'];   //������ַ
$EndAddress=$_GET['EndAddress'];       //������ַ
$Company=$_GET['Company'];             //��˾����2018-05-08
$Tel=$_GET['Tel'];                     //�ͷ��绰
$T_low=$_GET['T_low'];                 //�¶�����
$T_hign=$_GET['T_hign'];               //�¶�����

$state=0;                              //״̬=0����ʾ��û�д���ǩ��״̬

/*
PasswordOk=2 �豸�����û����豸
PasswordOk=3 ����ʱ��û�м��5��
PasswordOk=4 �޷���Ȩ��
PasswordOk=5 �û������������
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

//�������豸������Сtp�ģ���Ϊ5���ӿ���ģʽ
//��һ���������豸���飬�����д���
				$caiji_jiange_minute=5;//�ɼ����ʱ��
				$fasong_jiange_minute=5;//���ͼ��ʱ��
				$flag=1;                //�޸ı�־

				$SheBeiBianHao_array=explode(',',$SheBeiBianHao);
				$SheBeiBianHao_length=count($SheBeiBianHao_array);
				//��ȡÿһ���豸���
				for($SheBeiBianHao_i=0;$SheBeiBianHao_i<$SheBeiBianHao_length;$SheBeiBianHao_i++)
				{
						$SheBeiBianHao_part=$SheBeiBianHao_array[$SheBeiBianHao_i];  //����ÿһ���豸���
						//$Device_sql=mysql_query("select shebeibianhao,guigexinghao from tb_device where shebeibianhao='$SheBeiBianHao_part' and guigexinghao='ZL-TT10TP'");//ֻ��10TP�ͺ��豸���ɽ�����Ͷ����
						$Device_sql=mysql_query("select shebeibianhao,guigexinghao from tb_device where shebeibianhao='$SheBeiBianHao_part'");//2018-07-05 �����������Խ�����Ͷ�������������ͺ�
						
						$Device_row=mysql_fetch_row($Device_sql);
						if($Device_row){
                         //�����豸����Ϊ5���ӿ���ģʽ
						 $WaybillNumber_S="$WaybillNumber"."(".$StartAddress."-".$EndAddress.")";
						 
						 $Device_INS=mysql_query("update tb_device set caiji_jiange_minute='$caiji_jiange_minute',fasong_jiange_minute='$fasong_jiange_minute',baojingwendu_shangxian='$T_hign',baojingwendu_shangxian_baojing='1',baojingwendu_xiaxian='$T_low',baojingwendu_xiaxian_baojing='1',qidongpingtaibaojing='1',yewubianhao='$WaybillNumber_S',
						 flag='$flag' where shebeibianhao='$SheBeiBianHao_part'");
										}	
						else {
                               //����û�У�����ʲô������
								}				
				}
//////////////////////////////////////////////�豸��Ͷ�������ý���

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
http://www.ccsc58.com/json/17_00_PutData_Tms_PickTime.php?admin_permit=3d66cee22eb39927242348df53c21a9e&WaybillNumber=123456&SheBeiBianHao=123123,100234,00583&PickTime=2018-01-02%2012:00:00&StartAddress=����&EndAddress=�Ϻ�&Tel=13581726522&T_low=-12&T_hign=3
*/
	
?>