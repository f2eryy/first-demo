/**
 * Project          : PWP-Personal work platform
 * Version      : 1.0
 * Author           :front-end web developer(FED)   zhuyangyang
 * create:2014-9-15
 * last updata :2014-9-15
 */
var http = require('http');
var url = require('url');
var logger=require("../module/logHelper.js").helper;
var updateVersion=require("../controllers/updateVersion.js");
/*处理请求*/
http.createServer(function(req,res){
    var NDT=new Date().getTime();
    var pathname = url.parse(req.url,true).pathname;
    var params =  url.parse(req.url,true).query;
    var path = req.url; 
    var rhh=req.headers.host;
    var rhu=req.headers['user-agent'];
    var cb = params.callback?params.callback:'';
    //logger.writeDebug(req);
    var reqObj={
    	NDT:NDT,
    	path:path,
    	rhh:rhh,
    	rhu:rhu,
    	params:params
    }
    logger.writeDebug(reqObj);
    /*处理网站默认图标请求*/
    if(pathname=="/favicon.ico"){
        //
    }
    /*更新版本号*/
    else if(pathname == "/update"){
    	updateVersion(reqObj,function(err){
    		if(err){
            	res.end(err);
    		}
    		else{
    			res.end(cb+'({"state":1})');
    		}
    	});
    }
    /*else if(pathname=="/reqapi"){
        console.log(typeof(req));
        console.log(JSON.stringify(req));
        logger.writeInfo(JSON.stringify(req)+"成功");
        res.end(JSON.stringify(req));
    }*/
    /*请求地址不存在或者参数错误*/
    else{
        res.end(cb+'({"state":404,"errMsg":"请求地址不存在"})');
        logger.writeErr(NDT+"请求地址不存在");
    }   
    
}).listen(3001);
