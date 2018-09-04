<?php
header("Content-type: text/html;charset=GBK");
header("Access-Control-Allow-Origin: *");//解决跨域问题
date_default_timezone_set("PRC");
//连接蓝怡中间数据库
$serverName_ailex = "116.236.253.18:2468";//服务器地址加端口号
$userName_ailex = "ailex_zj";//数据库用户名
$passWord_ailex = "!@#qweASDzxc";//数据库密码
$link_ailex = mssql_connect($serverName_ailex,$userName_ailex,$passWord_ailex);
if(!$link_ailex){echo "中间库连接失败";die;}
if (!mssql_select_db('ailex_zj_interface',$link_ailex)) {echo '数据库选取失败';die;}

//连接中集数据库  目前是测试数据库  稍后完成后再更改
$serverName_zj = "rm-2zet8l11r91d5tfbp9o.sqlserver.rds.aliyuncs.com:3433";//服务器地址加端口号
$userName_zj = "test001";//数据库用户名
$passWord_zj = 'SJN~!20090827A_TEST_OK!';//数据库密码
$Database_zj = "COO1";//数据库名字
$link_zj = mssql_connect($serverName_zj,$userName_zj,$passWord_zj);
if(!$link_zj){echo "中集数据库连接失败";die;}
if (!mssql_select_db('COO1',$link_zj)) {echo '数据库选取失败';}

//循环取出蓝怡中间库里面的state=1的数据
$result_select_ailex = mssql_query("select * from ailex_zj_interface.dbo.bill_inf_main where State = 1",$link_ailex);
while ($res_select_ailex = mssql_fetch_array($result_select_ailex,MSSQL_ASSOC)) {
    $arr_select_ailex[] = $res_select_ailex;
}
//如果数据为空结束这个脚本
if (empty($arr_select_ailex)) {die;}
//循环插入中集的数据库
foreach ($arr_select_ailex as $key => $value) {
    //定义字段 与中集的对应上
    $Name4 = '使用'; //使用温度计
    $XMNO = $value['Bill_no_ailex'];   //蓝怡登记号
    $OrderTime = $value['Bill_no_zj_date'];   //揽收完整日期
    //=========将时间格式取到后面的时分秒单独存放===========
    $OrderTimes = date('H:i:s',strtotime($OrderTime));  //揽收的具体时间
    $GetCompany = $value['SHdw'];   //收货单位
    $GetDepart = $value['SHSF'];    //收货省份
    $GetCity = $value['SHCS'];    //收货城市
    $GetAddress = $value['SHdz'];   //收货地址
    $GetName    = $value['SHr'];	//收货人
    //判断一下是否有收货电话 有的话存成  5964589/13526465698这样的格式
    if(empty($value['SHdh'])){
        $GetTelephone = $value['SHRsj'];
    } else {
        $GetTelephone = $value['SHdh'] . '/' . $value['SHRsj'];
    }
    //====================判断发货人信息====================
    $Depart = $value['FHSF'];       //发货省份
    $City   = $value['FHCS'];		//发货城市
    //通过发货城市确定客户号
    if  ($City == '上海') {
        $AccountNumber  =  '20160175';   //上海客户
    } else {
        $AccountNumber  =  '20160176';   //嘉善客户
    }
    $Company = $value['FHdw'];		//发货单位
    $Address = $value['FHdz'];		//发货地址
    $Manager = $value['FHr'];		//发货人
    //判断一下是否有发货电话 有的话存成  5964589/13526465698这样的格式
    if (empty($value['FHdh'])) {
        $Telephone = $value['FHRsj'];
    } else {
        $Telephone = $value['FHdh'] . '/' . $value['FHRsj'];
    }
    //==================收货站点====================
    $NetDepart    =   '上海';
    $NetCity      =   '上海';
    $CompanyNet   =   '中集冷云上海公司';
    //====================一些杂项===================
    $Note1   =    $value['BZ_ailex'];    //蓝怡备注
    $Condition=  '指令下达';
    $Jian   =   $value['Amount'];     //纸箱总数

    //=============通过登记号来查看箱子的型号以及对应的数量=====================
    $sql_box_ailex = "select TEMP,MODEL,Amount from ailex_zj_interface.dbo.bill_cargo_inf where Bill_no_ailex = '$XMNO'";
    $res_box_ailex = mssql_query($sql_box_ailex,$link_ailex);
    while($result_box_ailex = mssql_fetch_array($res_box_ailex,MSSQL_ASSOC)){
        $arr_box[] = $result_box_ailex;
    }
    if (!empty($arr_box)) {
        //这里来写三个情况  日后在改进
        $WDQJ = $arr_box['0']['TEMP'];  //温度区间要存进去
        if (count($arr_box) == '1') {
            $A1 = $arr_box['0']['MODEL']; $B1 = $arr_box['0']['Amount'];
            $sql_insert_zj = "insert into COO1.dbo.SendsTmp(Name4,WDQJ,XMNO,OrderTime,OrderTimes,GetDepart,GetCity,GetCompany,GetAddress,GetName,GetTelephone,Depart,City,Company,Address,Manager,Telephone,note1,Condition,Jian,NetDepart,NetCity,CompanyNet,AccountNumber,A1,B1)values('$Name4','$WDQJ','$XMNO','$OrderTime','$OrderTimes','$GetDepart','$GetCity','$GetCompany','$GetAddress','$GetName','$GetTelephone','$Depart','$City','$Company','$Address','$Manager','$Telephone','$Note1','$Condition','$Jian','$NetDepart','$NetCity','$CompanyNet','$AccountNumber','$A1','$B1')";
        } else if (count($arr_box) == '2') {
            $A1 = $arr_box['0']['MODEL']; $B1 = $arr_box['0']['Amount'];$A2 = $arr_box['1']['MODEL']; $B2 = $arr_box['1']['Amount'];
            $sql_insert_zj = "insert into COO1.dbo.SendsTmp(Name4,WDQJ,XMNO,OrderTime,OrderTimes,GetDepart,GetCity,GetCompany,GetAddress,GetName,GetTelephone,Depart,City,Company,Address,Manager,Telephone,note1,Condition,Jian,NetDepart,NetCity,CompanyNet,AccountNumber,A1,B1,A2,B2)values('$Name4','$WDQJ','$XMNO','$OrderTime','$OrderTimes','$GetDepart','$GetCity','$GetCompany','$GetAddress','$GetName','$GetTelephone','$Depart','$City','$Company','$Address','$Manager','$Telephone','$Note1','$Condition','$Jian','$NetDepart','$NetCity','$CompanyNet','$AccountNumber','$A1','$B1','$A2','$B2')";
        } else {
            $A1 = $arr_box['0']['MODEL']; $B1 = $arr_box['0']['Amount'];$A2 = $arr_box['1']['MODEL']; $B2 = $arr_box['1']['Amount'];$A3 = $arr_box['2']['MODEL']; $B3 = $arr_box['2']['Amount'];
            $sql_insert_zj = "insert into COO1.dbo.SendsTmp(Name4,WDQJ,XMNO,OrderTime,OrderTimes,GetDepart,GetCity,GetCompany,GetAddress,GetName,GetTelephone,Depart,City,Company,Address,Manager,Telephone,note1,Condition,Jian,NetDepart,NetCity,CompanyNet,AccountNumber,A1,B1,A2,B2,A3,B3)values('$Name4','$WDQJ','$XMNO','$OrderTime','$OrderTimes','$GetDepart','$GetCity','$GetCompany','$GetAddress','$GetName','$GetTelephone','$Depart','$City','$Company','$Address','$Manager','$Telephone','$Note1','$Condition','$Jian','$NetDepart','$NetCity','$CompanyNet','$AccountNumber','$A1','$B1','$A2','$B2','$A3','$B3')";
        }
    } else {
        echo '没有数据,请重新选择箱子';die;
    }
    $result_insert_zj = mssql_query($sql_insert_zj,$link_zj);
      //判断一下有没有插入成功
      if ($result_insert_zj) {
          $sql_last_id = "select top 1 id from COO1.dbo.SendsTmp order by id desc";
          $last_id = mssql_fetch_array(mssql_query($sql_last_id,$link_zj),MSSQL_ASSOC)['id'];
          //下面将箱子的数据分别循环存到A_00_01表中
          foreach ($arr_box as $key => $value) {
              $WDQJ = $value['TEMP'];
              $PackageName = $value['MODEL'];
              $Jian = $value['Amount'];
              $sql_A00 = "insert into COO1.dbo.A_00_01(AccountNumber,WTID,OrderTime,WDQJ,PackageName,Company,Depart,City,Jian)values('$AccountNumber','$last_id','$OrderTime','$WDQJ','$PackageName','$CompanyNet','$NetDepart','$NetCity','$Jian')";
              mssql_query($sql_A00,$link_zj);
          }
          //=======================将中间库状态state改为2==============================
          $sql_ailex = "update ailex_zj_interface.dbo.bill_inf_main set State = 2 where Bill_no_ailex = '$XMNO'";
          mssql_query($sql_ailex,$link_ailex);
      }
      $arr_box = [];
}



