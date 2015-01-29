/**
 * Project          : PWP-Personal work platform
 * Version      : 1.0
 * Author           :front-end web developer(FED)   zhuyangyang
 * create:2014-9-15
 * last updata :2014-9-15
 */
var fs = require("fs");
var logger=require("../module/logHelper.js").helper;


function updateVersion(obj,callback){
    //var defsign=obj.NDT+"::"+obj.rhh+"::"+obj.rhu+"::"+obj.path+"::"+obj.params;
    logger.writeInfo(obj);
    logger.writeInfo("#######################################################");
    logger.writeInfo(obj.NDT+"host:"+obj.rhh);
    logger.writeInfo(obj.NDT+"ua:"+obj.rhu);
    logger.writeInfo(obj.NDT+"path:"+obj.path);
    logger.writeInfo(obj.NDT+"::"+"传入的版本号是："+obj.params.version);
    var cb = obj.params.callback?obj.params.callback:'';
    var writeString = obj.params.version;
    var versionObj={
        path:"/assets/pwp/",
        //path:"c:assets",
        file:"versionnum.js"
        //file:"c:assets/versionnum.js"
    }
    if(obj.params.version){
        fs.exists(versionObj.path,function(exists){
            logger.writeInfo(obj.NDT+"文件夹是否存在:"+exists);
            if(exists){
                writeVersionNum("var versionnum='"+writeString+"'");
            }
            else{
                fs.mkdir(versionObj.path,function(err){
                    if(!err){
                        logger.writeInfo(obj.NDT+"创建存储版本号文件的文件夹成功！");
                        writeVersionNum(writeString);
                    }
                    else{
                        callback(cb+'({"state":0,"errMsg":"创建存储版本号文件的文件夹失败！"})');
                        logger.writeInfo(obj.NDT+"创建存储版本号文件的文件夹失败！");
                    }
                });
            }
        });
        
    }
    else{
        //res.end(cb+'({"state":0,"errMsg":"请求地址或者参数错误"})');
        if(typeof callback==='function'){
            callback(cb+'({"state":0,"errMsg":"请求地址或者参数错误"})');
        }
        logger.writeErr(obj.NDT+"请求地址或者参数错误");
        logger.writeInfo("#######################################################");
    }
    function writeVersionNum(vum){
        fs.exists(versionObj.path+versionObj.file,function(exists){
            logger.writeInfo(obj.NDT+"文件是否存在:"+exists);
            /*本意想判断文件是否存在再进行读写操作，后来发现不用判断*/
            //if(exists){
                fs.writeFile(versionObj.path+versionObj.file, vum,encoding='utf8', function (error) {
                    if (error){
                        logger.writeErr(obj.NDT+"::"+"向文件写入版本号时出错");
                        if(typeof callback==='function'){
                            callback(cb+'({"state":0,"errMsg":"向文件写入版本号时出错"})');
                        }
                    } else {
                        //res.end(cb+'({"state":1})');
                        if(typeof callback==='function'){
                            callback();
                        }
                        logger.writeInfo(obj.NDT+"::"+"更新版本号操作成功！");
                        
                    }
                    var ndt2=new Date().getTime();
                    var ndt3=ndt2-obj.NDT;
                    logger.writeInfo("处理请求消耗时间："+ndt3+"毫秒");
                    logger.writeInfo("#######################################################"); 
                });
            //}
         });
    }
}
module.exports = updateVersion;
