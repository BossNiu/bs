<?php
namespace app\api\controller;
use think\Controller;
use think\Request;
use think\Db;
class Apidata extends Controller
{
  
    /* 导航和 电话*/
    public function get_address_byuid() {
    	$request = Request::instance();
    	$uid =  $request->param('uid');//获取所有参数，最全
    	if(isset($uid)){
    	}else{
    		$uid = 1;
    	}
    	if(!$uid) {
    		$this->error('uid不合法');
    	}
    	// 通过uid获取 对应账号的 菜单样式
    	$data = [
    	'status' => 1,
    	'id' => $uid,
    	 
    	];
    
    	$uinfo= Db::table('o2o_user')->where($data)
    	->find();
    	 
    	if(!$uinfo) {
    		return show(0,'error');
    	}
    	return show(1,'success', $uinfo);
    }
///////////////////////////////////////////////////////////

    public function add_test_new(){
    	$request = Request::instance();
    	$method = $request->method();//获取上传方式
    	$title = $request->param('title');
    	$content = $request->param('content');
    	//$title = '223名陕西返程医疗队员到太白山尚境温泉进行隔离休养';
    	//$content = '   3月24号下午，从武汉凯旋的陕西第四批和第五批援助湖北医疗队223名医疗队员，抵达太白山景区尚境温泉酒店，进行为期14天的隔离休养。';
    	$status = 1;
    	$creat_time = time();
        $data = array(
        		
            'title' => $title,		
    		'content' => $content,
    		'status' => $status,
    		'create_time' => $creat_time,
    );
    Db::table('o2o_test_news')->insert($data);
    $info =  Db::table('o2o_test_news')->getLastSql();
    return show(1,'success', $info);
    }
    

    public function get_test_new(){
    	//http://182.92.173.180:8080/api/apidata/get_test_data?new=1
    	$request = Request::instance();
    	$flag = $request->param('new');
    	if($flag == 1){
    		$where = array(
    				'status' => 1,
    		);
    		$info =  Db::table('o2o_test_news')->where($where)->select();
    		return show(1,'success', $info);
    	}
    }
    

  ////////////////////////////////////////////////////////////////////// 
    public function add_test_trends(){
    	$request = Request::instance();
    	$method = $request->method();//获取上传方式
    	
    	$title = $request->param('title');
    	$content = $request->param('content');
    	
    	if(empty($title) || empty($content) ){
    		return show(0,'error','请填写完整信息');
    	}
    	
    	$temp = $request->param('temp');//zhai yao
    	$keyword = $request->param('keyword'); // guan jian ci 
    	$recog = $request->param('recog');//推荐
    	
    	$link = $request->param('link'); // guan jian ci
    	
    	
    	//$img_path = $request->param('img_path');//推荐
    	
    	$status = 1;
    	$creat_time = time();
    	
    	$file = request()->file('img');
			if($file){
				$source = upload($file);
				if(isset($source['error'])){
					$img_path ='none';
				}else{
					$img_path = $source['path'];
				}
			}else{
				$img_path ='none';
			}
    	
    	
    	$data = array(
    			'title' => $title,
    			'content' => $content,
    			'status' => $status,
    			'create_time' => $creat_time,
    			'temp'   =>$temp,
    			'keyword' =>$keyword,
    			'recog' =>$recog,
    			'link' =>$link,
    			'img_path' =>'http://182.92.173.180:8080'.$img_path,
    			'mark' =>'recog字段的含义1;头条;2新浪;3未审核'
    	);
    	
    	//var_dump($data);die();
    	Db::table('o2o_test_write')->insert($data);
    	$info =  Db::table('o2o_test_write')->getLastSql();
    	return show(1,'success', $info);
    }
    
    public function get_test_trends(){
    	//http://182.92.173.180:8080/api/apidata/get_test_data?new=1
    	$request = Request::instance();
    	$flag = $request->param('trends');
    	if($flag == 1){
    		$where = array(
    				'status' => 1,
    		);
    		$info =  Db::table('o2o_test_write')->where($where)->select();
    		return show(1,'success', $info);
    	}
    }
    
//////////////////////////////////////////////////////////////////
    public function add_test_nums(){
    	$request = Request::instance();
    	$method = $request->method();//获取上传方式
    	
    	$per_jdrs = $request->param('per_jdrs');
    	$day_ts = $request->param('day_ts');
    	
    	$dkjds = $request->param('dkjds');
    	
    	$qdz = $request->param('qdz');
    	$name = $request->param('name');//景区 ，总人数
    	
    	$sell_num = $request->param('sell_num');
    	
    
        $status = 1;
    	$creat_time = time();
    	$data = array(
    			'per_jdrs' => $per_jdrs,
    			'day_ts' => $day_ts,
    			'dkjds' =>$dkjds,
    			'qdz'=>$qdz,
    			'sell_num'=>$sell_num,
    			'name' => $name,
    			'status' => $status,
    			'create_time' => $creat_time,
    	);
    	Db::table('o2o_test_nums')->insert($data);
    	$info =  Db::table('o2o_test_nums')->getLastSql();
    	
    	return show(1,'success', $info);
    }
    
    
    
    public function get_test_nums(){
    	$request = Request::instance();
    	$flag = $request->param('nums');
    	if($flag == 1){
    		$where = array(
    				'status' => 1,
    		);
    		$info =  Db::table('o2o_test_nums')->where($where)->select();
    		return show(1,'success', $info);
    	}
    	
    }

}


