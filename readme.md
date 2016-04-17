#Bootstrap-treeselect
###基于boostrap和jquery的下拉树控件

###使用方式(how to use)
    $("#bs-treeetable").bstreeselect({
        data:data,//tree data order by parentid
		treenodeselect:function(data){
			console.log(JSON.stringify(data));
		},
		onclear:function(){
			console.log("clear");
		}
    });
###对应data数据格式(data format)
注意按照pid升序排序(data order by pid asc)
    var data = [
		{name:"test",id:1,pid:0,innercode:1},
		{name:"test",id:12,pid:0,innercode:12},
		{name:"test",id:13,pid:0,innercode:12},
		{name:"test",id:14,pid:0,innercode:12},
		{name:"test",id:15,pid:0,innercode:12},
		{name:"test",id:16,pid:0,innercode:12},
		{name:"test",id:17,pid:0,innercode:12},
		{name:"test",id:18,pid:0,innercode:12},
		{name:"test",id:19,pid:0,innercode:12},
		{name:"test",id:20,pid:0,innercode:12},
		{name:"test",id:21,pid:0,innercode:12},
		{name:"test2",id:2,pid:0,innercode:2},
		{name:"test3",id:3,pid:0,innercode:3},
		{name:"test4",id:4,pid:1,innercode:4},
		{name:"test5",id:5,pid:1,innercode:5},
		{name:"test6",id:6,pid:4,innercode:6},
		{name:"test7",id:7,pid:4,innercode:7},
		{name:"test8",id:8,pid:4,innercode:8},
		{name:"test9",id:9,pid:4,innercode:9},
		{name:"test10",id:10,pid:6,innercode:10},
		{name:"test11",id:11,pid:7,innercode:11},
    ];