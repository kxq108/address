//获取各级数据对应的数组
let cityData = require('city.js');
let AreaData = cityData.citys;
function getData( defaultSelect,SelectDataSource){
	function getDataArr(checkArr,AreaData){
		var result=[];
		var AreaData2=AreaData;
		for(var r in checkArr){
			var result_one=[];
			//console.log(JSON.stringify(AreaData2));
			if(Object.prototype.toString.call(AreaData2)=='[object Array]'&&!CheckArrValueNoObj(AreaData2)){
				result.push(AreaData2);
				break;
			}
			var AreaData3=AreaData2;
			for(var i in AreaData3){
				var thisKey=getObjName(AreaData3[i]);
				//console.log(thisKey)
				result_one.push(thisKey);
				if(thisKey==checkArr[r]){
					AreaData2=getObjValue(AreaData3[i]);
				}
			}
			result.push(result_one);
			if(!CheckValueInArr(checkArr[r],result_one)){
				break;
			}
			
		}
		//console.log(JSON.stringify(result))
		return result;
	}
	// 获取json的键
	function getObjName(obj){
		for(var w in obj){
			if(parseInt(w)===w){
				console.warn('传入的参数发现异常错误');
			}
			return w
		}
	}
	// 获取json的值
	function getObjValue(obj){
		for(var w in obj){
			return obj[w]
		}
	}
	// 检查值存在于数组中
	function CheckValueInArr(value,Arr){
		var res=false;
		for(var w in Arr){
			if(value==Arr[w]){
				res=true;
			}
		}
		return res;
	}
	//检查数组中的值是否不是object
	function CheckArrValueNoObj(Arr){
		var res=false;
		for(var w in Arr){
			if(parseInt(w)!=w||typeof Arr[w]=='object'){
				res=true;
			}
		}
		return res;
	}
	return getDataArr(defaultSelect,SelectDataSource);
}
//获取index
function getIndexArr(data,Arr){
	let result=[];
	for(let i in Arr){
		for(let j in Arr[i]){
			if(Arr[i][j]==data[i]){
				result.push(j)
			}
		}
	}
	return result
}

let  defaultAddress=['重庆','重庆市','九龙坡区'];
let  defaultAddressArr=getData(defaultAddress,AreaData);
let  defaultAddressIndex=getIndexArr(defaultAddress,defaultAddressArr);
Page({
  data: {
    provinces: defaultAddressArr[0],
    citys: defaultAddressArr[1],
    countys: defaultAddressArr[2],

	province: defaultAddress[0],
    city: defaultAddress[1],
    county: defaultAddress[2],
    val:defaultAddressIndex,
  },
  bindChange: function(e) {
    const val = e.detail.value;
    let thisProvinces=this.data.provinces;
    let thisCitys=this.data.citys;
    let thisCountys=this.data.countys;
    let thisVal=this.data.val;
    let _this=this;

    if(val[0]!=thisVal[0]){
    	let thisData=thisProvinces[val[0]];
    	let thisAddressArr=getData([thisData,""],AreaData);
    	let thisAddressArrNow=getData([thisData,thisAddressArr[1][0],""],AreaData);
    	_this.setData({
    		val:[val[0],0,0],
		    citys: thisAddressArrNow[1],
		    countys: thisAddressArrNow[2],
			province: thisData,
		    city: thisAddressArrNow[1][0],
		    county: thisAddressArrNow[2][0],
    	})
    }
    if(val[1]!=thisVal[1]){
    	let thisData=thisCitys[val[1]];
    	let thisAddressArrNow=getData([thisProvinces[val[0]],thisData,""],AreaData);
    	_this.setData({
    		val:[val[0],val[1],0],
		    countys: thisAddressArrNow[2],
		    city: thisData,
		    county: thisAddressArrNow[2][0],
    	})
    }
    if(val[2]!=thisVal[2]){
    	let thisData=thisCitys[val[2]];
    	_this.setData({
    		val:val,
    		county: thisCountys[val[2]],
    	})
    }
  }
})
