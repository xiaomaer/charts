//数组sort()排序传的参数为该函数（降序排列），绘制柱状图需要
function compare(value1, value2) {
		return value2 - value1;
	}
/*柱状图
 * elem:要操作的画布元素
 * data:所需格式的数据*/
function barChart(elem, data) {
		if (elem.getContext) {
			var ctx = elem.getContext("2d"),
				mywidth = elem.width, //画布的宽高
				myheight = elem.height,
				bDistance = parseInt(data.dataSets[0].bDistance), //图标边框到画布间距
				bInterval = data.dataSets[0].bInterval, //矩形间间距
				labels = data.label, //矩形对应标题
				len = labels.length,//标签/数据个数
				//矩形宽度
				bWidth = Math.floor((mywidth - bDistance * 2 - (len + 1) * bInterval) / len),
				bheight = myheight - bDistance * 2, //边框高度
				values = data.dataSets[0].values, //绘图的值
				sortValues = values.slice(0), //基于当前数组中的一个或多个项创建一个新数组（解决了该数组排序原数组也被排序的问题）
				serialValues = new Array(); //用于存储序列化后的值
			sortValues.sort(compare);
			if (sortValues[0] > bheight) {
				(function() {
					//数值超过边框高度时序列化值
					for (var i = 0; i < len; i++) {
						serialValues[i] = values[i] * bheight / sortValues[0];
					}
				})(); //块级作用域
			}
			//绘制边框
			ctx.beginPath(); //要绘制路径，必须先调用该方法，表示开始绘制新路径
			ctx.moveTo(bDistance, bDistance);
			ctx.lineTo(bDistance, myheight - bDistance);
			ctx.lineTo(mywidth - bDistance, myheight - bDistance);
			ctx.stroke(); //把图形绘制到画布上
			//绘制矩形，组成条形图
			ctx.fillStyle = data.dataSets[0].fillColor;
			//绘制文字
			ctx.font = data.dataSets[1].txtfont; //字体样式、大小、字体
			ctx.textAlign = data.dataSets[1].txtalgin; //文本对齐方式
			ctx.textBaseline = data.dataSets[1].txtbaseline; //文本的基线
			for (var i = 0; i < len; i++) {
				var x = (bInterval + bDistance) + i * (bWidth + bInterval),
					y = myheight - serialValues[i] - bDistance,
					x1 = x + Math.round(bWidth / 2);
				y1 = myheight - bDistance + 15,
					y2 = y - 10;
				ctx.fillRect(x, y, bWidth, serialValues[i]); //x,y,width,height单位都为px
				ctx.fillText(labels[i], x1, y1); //绘制标题文字
				ctx.fillText(values[i], x1, y2); //绘制柱状图数据
			}
			ctx.fillStyle = data.dataSets[2].fillColor;
			ctx.fillText(data.dataSets[2].xtitle, 49, 7); //x轴代表什么
			ctx.fillText(data.dataSets[2].ytitle, mywidth - bDistance, myheight - bDistance + 15); //y轴代表什么
		}
	}
	//求和，计算百分比（画饼图时需要）

function sumFunc(data) {
		var sum = 0;
		for (var i = 0, len = data.length; i < len; i++) {
			sum += data[i];
		}
		return sum;
	}
/*饼图
 * elem:要操作的画布元素
 * data:所需格式的数据*/

function pieChart(elem, data) {
	if (elem.getContext) {
		var ctx = elem.getContext("2d"),
			vdata = data.values, //绘图数据
			sum = sumFunc(vdata), //对绘图数据求和，用于计算百分比
			startangle = 0, //绘制扇形的开始角度
			labels = data.labels, //绘图的对应文字
			x = data.x, //圆心x坐标
			y = data.y, //圆心y坐标
			rad = data.radius, //圆半径
			x1 = x + rad + 30, //绘制右侧文字和标注的x坐标
			y1 = y - rad, //绘制右侧文字和标注的y坐标
			endangle; //绘制扇形的结束角度
		for (var i = 0, len = vdata.length; i < len; i++) {
			//绘制饼图
			//计算下一次绘制扇形的结束角度，即根据绘制数据占有总数据和的比例求的弧度
			var percent = vdata[i] / sum;
			endangle = startangle + Math.PI * 2 * (percent);
			ctx.beginPath(); //开始绘制新路径
			ctx.fillStyle = data.colors[i]; //绘制颜色
			ctx.moveTo(x, y); //移动到圆心(注：画饼图一定要回到圆心，不然会有问题)
			ctx.arc(x, y, rad, startangle, endangle, false); //画扇形
			//绘制右侧文字和标注
			ctx.moveTo(x1, y1); //移动到绘制文字和标注的位置
			ctx.fillRect(x1, y1, 30, 14); //绘制矩形表示比列图
			//计算四舍五入后的扇形每份的百分比
			var perc = (percent * 100).toFixed(2) + "%"; //tofixed()自动四舍五入返回指定小数位数的字符串
			//设置绘制文字的属性
			ctx.font = "bold 12px microsoft yahei";
			ctx.txtalgin = "center";
			ctx.textBaseline = "top";
			//绘制文字
			ctx.fillText(labels[i] + ":" + perc, x1 + 35, y1);
			ctx.fill(); //指定颜色填充以上绘制
			startangle = endangle; //下一次绘制扇形的开始角度
			y1 += 20; //下一次绘制文字和标注的y坐标
		}
	}
}
/*绘制折线
 elem:操作的元素
 data：所需格式数据*/
function lineChart(elem, data) {
	if (elem.getContext) {
		var ctx = elem.getContext("2d"),
			labels = data.labels,//数值对应标签
			values = data.values,//数值
			len = labels.length,//标签/数值个数
			elemWidth = elem.width,//画布宽度
			elemHeight = elem.height,//画布高度
			gridHeight = Math.ceil(elemHeight / 5),//每行之间高度
			gridWidth = Math.floor(elemWidth / len),//每列之间看度
			actualHeight = 4 * gridHeight + 20;//绘制区域实际高度
		//设置绘制直线的属性
		ctx.strokeStyle = data.bgSet.lineColor;
		ctx.lineWidth = data.bgSet.lineWidth;
		//设置绘制文本的属性
		ctx.font = data.txtSet.txtfont;
		ctx.textAlign = data.txtSet.txtalgin;
		ctx.txtbaseline = data.txtSet.txtbaseline;
		//绘制背景
		//绘制背景横线
		ctx.beginPath();
		for (var i = 0; i < 5; i++) {
			var hgridY = gridHeight * i + 20,
				hgridX = gridWidth * len;
			ctx.moveTo(0, hgridY);
			ctx.lineTo(hgridX, hgridY);
		}
		ctx.stroke();

		//绘制背景的竖线，表示每个label
		ctx.beginPath();
		for (var j = 0; j < len + 1; j++) {
			var vgridX = gridWidth * j,
				vgridY = actualHeight;
			ctx.moveTo(vgridX, vgridY);
			ctx.lineTo(vgridX, vgridY + 10);
		}
		ctx.stroke();
		//绘制标签文字
		ctx.fillStyle = data.txtSet.txtColor;
		for (var k = 0; k < len; k++) {
			var txtX = gridWidth * (k + 0.5),
				txtY = actualHeight + 15;
			ctx.fillText(labels[k], txtX, txtY);
		}
		ctx.fill();


		//获取画图数据的最大值用于序列换数据
		var maxValue = 0,
			cData = new Array();
		for (var i = 0; i < len; i++) {
			if (values[i] > maxValue) {
				maxValue = values[i];
			}
		}
		//当最大值大于画布可绘制区域的高度时，对数据进行转化，然后进行画图
		if ((4 * gridHeight) < maxValue) {
			for (var i = 0; i < len; i++) {
				//转换后的数据
				cData[i] = values[i] * 4 * gridHeight / maxValue;
			}
		} else {
			cData = values;
		}
		//绘制折线
		ctx.strokeStyle = data.lineColor;
		ctx.beginPath();
		var pointX = gridWidth / 2,
			pointY = actualHeight - cData[0];
		ctx.moveTo(pointX, pointY);
		for (var i = 1; i < len; i++) {
			pointX += gridWidth;
			pointY = actualHeight - cData[i];
			ctx.lineTo(pointX, pointY);
		}
		ctx.stroke();
		//绘制坐标圆形
		ctx.beginPath();
		ctx.fillStyle = data.circleColor; //圆点的颜色
		for (var i = 0; i < len; i++) {
			var circleX = gridWidth / 2 + gridWidth * i,
				circleY = actualHeight - cData[i];
			ctx.moveTo(circleX, circleY); //假如不每次绘制之前确定开始绘制新路径，可以每次绘制之前移动到新的圆心
			ctx.arc(circleX, circleY, 4, 0, Math.PI * 2, false);
		}
		ctx.fill();
		//绘制坐标圆形对应的值
		ctx.beginPath();
		ctx.fillStyle = data.txtSet.txtColor;; //文本颜色
		for (var i = 0; i < len; i++) {
			var circleX = gridWidth / 2 + gridWidth * i,
				circleY = actualHeight - cData[i];
			ctx.fillText(values[i], circleX, circleY - 8);

		}
		ctx.fill();
		//绘制y轴代表什么
		ctx.fillText(data.yAxis.title, data.yAxis.x, data.yAxis.y);
		ctx.fill();

	}
}

function curveChart() {
		var elem = document.getElementById("curve");
		if (elem.getContext) {
			var ctx = elem.getContext("2d");
			//			ctx.lineWidth = 2;
			ctx.lineCap = "square";
			ctx.beginPath();
			ctx.moveTo(100, 70);
			ctx.bezierCurveTo(120, 150, 150, 150, 200, 60); //三次贝赛尔曲线
			ctx.moveTo(40, 100);
			ctx.quadraticCurveTo(60, 60, 100, 70); //二次贝塞尔曲线
			ctx.moveTo(200, 60);
			ctx.arcTo(240, 40, 300, 50, 50); //绘制弧线
			ctx.stroke();

		}
	}
	/*	绘制背景
	 * elem:要操作的元素
	 * data:所需格式的数据*/


function setBg(elem, data) {

	if (elem.getContext) {
		var ctx = elem.getContext("2d"),//获取元素上下文
			startX = 40,//左上角开始绘制的x坐标
			startY = 40,//左上角开始绘制的y坐标
			labels = data.labels,//对应数据的标签，即列数
			cols = labels.length,//数据个数
			datas = data.datas,//数据
			gWidth = elem.width - 80,//背景总宽度,elem.width为画布宽度
			gHeight = elem.height - 80,//背景总长度
			pgWidth = gWidth / cols,//背景每个格的宽度
			rows = 10,//背景表格行数
			pgHeight = gHeight / rows;//背景表格高度


		//绘制背景
		ctx.beginPath(); //开始绘制新路径
		ctx.strokeStyle = data.ctxSets.strokeColor;//描边颜色
		ctx.lineWidth = data.ctxSets.lineWidth;//描边线条宽度
		//绘制横线
		for (var i = 0; i < rows; i++) {
			var pY = startX + pgHeight * i;
			ctx.moveTo(startX, pY); //移动到绘制的起点
			ctx.lineTo(gWidth + startX, pY);
		}
		//最后一根横线
		var pY1 = startY + pgHeight * rows;
		ctx.moveTo(startX, pY1); //移动到绘制的起点
		ctx.lineTo(gWidth + startX + 20, pY1);
		//绘制竖线
		//第一根竖线
		ctx.moveTo(startX, startY - 20); //移动到绘制的起点
		ctx.lineTo(startX, gHeight + startY + 10);
		for (var i = 1; i < cols + 1; i++) {
			var pX = startX + pgWidth * i;
			ctx.moveTo(pX, startY); //移动到绘制的起点
			ctx.lineTo(pX, gHeight + startY + 10);
		}

		ctx.stroke();//把图形绘制到画布上
		//绘制文字
		ctx.fillStyle = data.ctxSets.txtColor;//填充颜色
		ctx.font = data.ctxSets.txtFont;//文本字体
		ctx.textAlign = data.ctxSets.txtAlign;//文本对齐方式
		ctx.textBaseline = data.ctxSets.txtBase;//文本基线
		//绘制横轴文字
		for (var i = 0; i < cols; i++) {
			var px = startX + pgWidth / 2 + pgWidth * i;
			ctx.fillText(labels[i], px, startY + gHeight + 10);
		}
		//绘制竖轴文字
		//判断最大值是否大于行高，确定每行的数值
		var maxValue = 0,
			newValues = new Array(),
			j = 0;
		for (var i = 0; i < cols; i++) {
			if (datas[i] > maxValue) {
				maxValue = datas[i];
			}
		}
		//重新计算每隔数据值及转换值
		if (maxValue > gHeight) {
			pgValues = maxValue / rows;
			for (var i = 0; i < cols; i++) {
				newValues[i] = datas[i] * gHeight / maxValue;
			}
		} else {
			pgValues = pgHeight;
			newValues = datas;
		}
		//绘制竖轴文字
		for (var i = rows; i >= 0; i--) {
			ctx.fillText(pgValues * i, 20, startY + pgHeight * j);
			j++;
		}

		//绘制标题
		//x轴标题	
		ctx.fillText(data.xTitle, gWidth + startX + 15, gHeight + startY + 10);
		//y轴标题
		ctx.fillText(data.yTitle, startX + 25, startY - 10);
		
		
		//画图
		//绘制折线
		ctx.strokeStyle = data.ctxSets.lineColor;;
		ctx.beginPath();
		var pointX = pgWidth / 2 + startX,
			pointY = startY + gHeight - newValues[0];
		ctx.moveTo(pointX, pointY);
		for (var i = 1; i < cols; i++) {
			pointX += pgWidth;
			pointY = startY + gHeight - newValues[i];
			ctx.lineTo(pointX, pointY);
		}
		ctx.stroke();
		//绘制坐标圆形
		ctx.beginPath();
		ctx.fillStyle = data.ctxSets.circleColor;; //圆点的颜色
		for (var i = 0; i < cols; i++) {
			var circleX = pgWidth / 2 + startX + pgWidth * i,
				circleY = startY + gHeight - newValues[i];
			ctx.moveTo(circleX, circleY); //假如不每次绘制之前确定开始绘制新路径，可以每次绘制之前移动到新的圆心
			ctx.arc(circleX, circleY, 4, 0, Math.PI * 2, false);
		}
		ctx.fill();
		//绘制坐标圆形对应的值
		ctx.beginPath();
		ctx.fillStyle = data.ctxSets.txtColor; //文本颜色
		for (var i = 0; i < cols; i++) {
			var circleX = pgWidth / 2 + startX + pgWidth * i,
				circleY = startY + gHeight - newValues[i];
			ctx.fillText(datas[i], circleX, circleY - 10);
		}
		ctx.fill();

	}

}