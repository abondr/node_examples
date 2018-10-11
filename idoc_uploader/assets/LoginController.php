<?php

class LoginController extends Controller
{
	public function actionCheck_session(){
		echo 1;
	}
	public function actionAuth(){
		echo "{\"code\":200"
			.",\"msg\":\"Your have successfully logged into the system\""
			.",\"title\":\"Authentication Successfully\",\"status\":null"
			.",\"session_id\":\"mdsa4vse0rtsh6lpgsl8am4ds0\","
			."\"full_name\":\"System Administrator\"}";
	}
	public function actionSave(){
		echo '{"code":108,"msg":"Data has been updated successfully.",'
			.'"title":"Update Successfully","status":"1",'
			.'"record":{"id":"eebc33f8-1781-458d-918e-3b0d6ecc9693",'
				.'"total_steps":0,"step":0},"parameters":[],"task":null}';
	}
}