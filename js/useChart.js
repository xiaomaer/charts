window.onload = function() {
	var bar = document.getElementById("bar"),
		data = {
			label: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],//x轴的标题
			dataSets: [{
				bDistance: 30, //绘制的边框距离画布边框的距离
				bInterval: 20, //两个柱状图之间的距离
				values: [300, 50, 100, 50, 80, 150, 120], //对应标签的值
				fillColor: "rgba(0,0,255,0.5)" //矩形填充颜色
			}, {
				txtfont: "14px microsoft yahei",//绘制文本的字体
				txtalgin: "center",//文本对齐方式
				txtbaseline: "middle"//文本的基线
			}, {
				fillColor: "black", //矩形填充颜色
				xtitle: "订单总数（个）", //x轴标题
				ytitle: "星期几" //y轴标题
			}]
		};
	barChart(bar, data); //画柱状图
	var pie = document.getElementById("pie"),
		datasets = {
			colors: ["blue", "yellow", "black", "red", "green"], //颜色
			labels: ["第一周", "第二周", "第三周", "第四周", "第五周"], //标签
			values: [30, 60, 80, 70, 150], //值
			x: 125, //圆心x坐标
			y: 125, //圆心y坐标
			radius: 100 //半径
		};
	pieChart(pie, datasets); //画饼状图
	var line = document.getElementById("line"),
		datas = {
			labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],//标签
			values: [50, 180, 100, 150, 110, 130, 30],//值
			txtSet: {//绘制文本设置
				txtfont: "14px microsoft yahei",
				txtalgin: "center",
				txtbaseline: "middle",
				txtColor:"#000000"
			},
			bgSet:{//绘制背景线设置
				lineColor:"#C0C0C0",
				lineWidth:1,
				
			},
			lineColor:"#000000",//折线颜色
			circleColor:"blue",//折线上原点颜色
			yAxis:{//y轴表示什么，及绘制文本的位置
				x:50,
				y:11,
				title:"完成件数（个）"
			}
		},
		newData = {
			labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			values: [100, 40, 200, 50, 10, 80, 100],
			txtSet: {
				txtfont: "14px microsoft yahei",
				txtalgin: "center",
				txtbaseline: "middle",
				txtColor:"#000000"
			},
			bgSet:{
				lineColor:"#C0C0C0",
				lineWidth:1,
			},
			lineColor:"blue",
			circleColor:"red",
			yAxis:{
				x:50,
				y:11,
				title:"完成件数（个）"
			}
		};
	lineChart(line,datas);//画折线图
	//lineChart(line,newData);//在同一个canvas画第二条折线图
	//curveChart();//绘制曲线
	var bg = document.getElementById("curve")
	linedata = {
		labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],//标签
		datas: [115, 35, 210, 100, 300, 220, 40],//数据
		xTitle: "月份",//x轴标题
		yTitle: "产量(个)",//y轴标题
		ctxSets:{
			strokeColor:"#C0C0C0",//背景线颜色
			lineWidth:1,//线的宽度
			txtColor:"#000000",//绘制文本颜色
			txtFont:"12px microsoft yahei",//字体
			txtAlign:"center",//对齐方式
			txtBase:"middle",//基线
			lineColor:"blue",//折线颜色
			circleColor:"#FF0000"//折线上圆点颜色	
		}
	};
	setBg(bg,linedata);//绘制图标背景及折线
}