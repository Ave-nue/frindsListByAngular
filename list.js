let listControllerClass = (rootScope, AAR, Copy, Save) => {
	rootScope.newOne = {
		img:"http://pic.qiantucdn.com/58pic/14/00/69/66858PICNfJ_1024.jpg",
		name:"No.0",
		others:"others"
	};
	rootScope.searchKeyword = "";
	rootScope.add = () => {
		let newOne = Copy(rootScope.newOne);
		AAR.add(newOne, rootScope.friends);
		Save(rootScope.friends);
	};
	rootScope.delete = (index) => {
		AAR.remove(index, rootScope.friends);
		Save(rootScope.friends);
	};
}
listControllerClass.$inject = ['$rootScope', 'listAAndR', 'deepCopy', 'dataSave'];
angular.module("QQFriendsList", [])
.run(($rootScope) => {
	if(localStorage.friends){
		$rootScope.friends = $.parseJSON(localStorage.friends);
		console.log($rootScope.friends);
	}else{
		$rootScope.friends = [{
			img:"http://pic.qiantucdn.com/58pic/14/00/69/66858PICNfJ_1024.jpg",
			name:"No.1",
			others:"others"
		},{
			img:"http://pic.qiantucdn.com/58pic/14/00/69/66858PICNfJ_1024.jpg",
			name:"No.2",
			others:"others"
		},{
			img:"http://pic.qiantucdn.com/58pic/14/00/69/66858PICNfJ_1024.jpg",
			name:"No.3",
			others:"others"
		},{
			img:"http://pic.qiantucdn.com/58pic/14/00/69/66858PICNfJ_1024.jpg",
			name:"No.4",
			others:"others"
		}];
	}
})
.factory("listAAndR", () => {
	let A = (newOne, list) => {
		list.push(newOne);
	};
	let M = (index, list) => {
		list.splice(index, 1);
	};
	return {
		add:A,
		remove:M
	};
})
.factory("deepCopy", () => {
	return(source) => {
		let result = {};
		for(let key in source){
			result[key] = typeof source[key]==='object'?deepCopy(source[key]):source[key];
		}
		return result;
	};
})
.factory("dataSave", () => {
	return(data) => {
		let dataStr = angular.toJson(data);
		localStorage.friends = dataStr;
	};
})
.config(() => {
	console.log("I'm ready!!!!!!!!!!I'm ready!!!!!!!!!!!!I'm ready!!!!!!!");
})
.controller("listController", listControllerClass)
.directive("friendsList", () => {
	return{
		restrict:"E",
		template:`
		<ul id="friendsList">
		<li ng-repeat='friend in friends | filter:{name:searchKeyword}'>
		<img src="{{friend.img}}">
		<div><h3>{{friend.name}}</h3>
		<p>{{friend.others}}</p></div>
		<button ng-click="delete($index)">删除</button>
		</li>
		</ul>`
	}
})
.directive("friendAdder", () => {
	return{
		restrict:"E",
		template:`
		<div>
		头像:<input type="text" ng-model="newOne.img"/>
		昵称:<input type="text" ng-model="newOne.name"/>
		简介:<input type="text" ng-model="newOne.others"/>
		<button ng-click="add()">确认</button>
		</div>`
	}
})
.directive("friendSearcher", () => {
	return{
		restrict:"E",
		template:`
		查找<input type="text" ng-model="searchKeyword"/>`
	}
});