window.onload=function(){
	var cal=new Vue({
		el:".v-calendar",
		data:{
			d:new Date(),
			m:[new Date().getMonth()+1],
			y:[new Date().getFullYear()],
			day:[],
			dCount:[],
			calNum:12,
			//交互日期
			dCur:new Date().getDate(),
			mCur:new Date().getMonth()+1,
			yCur:new Date().getFullYear(),
			//真实日期
			dTrue:new Date().getDate(),
			mTrue:new Date().getMonth()+1,
			yTrue:new Date().getFullYear(),
		},
		methods:{
			//依次下月变量
			nextCal:function(n){
				let setY=new Date().getFullYear(),
					setM=new Date().getMonth()+1+n;
				//判断月分数以获取正确年月
				if(setM>12){
					setY+=parseInt((setM-1)/12);
					setM%12==0?setM=12:setM=setM%12;
				};
				this.y.push(setY);
				this.m.push(setM);
				
			},
			//渲染日历
			calendar:function(y,m){
					//每月天数
					if(y%4==0){
						this.dCount=[31,29,31,30,31,30,31,31,30,31,30,31]
					}else{
						this.dCount=[31,28,31,30,31,30,31,31,30,31,30,31]
					};
					//每月首天 渲染空格
					this.day.push(new Date(y,m-1).getDay());
			},
			//点击日历
			calTab:function(e){
				
				if(Date.parse(new Date(e.currentTarget.dataset.d))>=Date.parse(new Date(this.yTrue+"/"+this.mTrue+"/"+this.dTrue))){
					this.dCur=new Date(e.currentTarget.dataset.d).getDate();
					this.mCur=new Date(e.currentTarget.dataset.d).getMonth()+1;
					this.yCur=new Date(e.currentTarget.dataset.d).getFullYear();
					
					console.log(e.currentTarget.dataset.d)
				}
			}
		},
		mounted(){
				//先渲染一个月，后面依次循环
				this.calendar(this.y[0],this.m[0]);
				for(let i=1;i<this.calNum;i++){
					this.nextCal(i);
					this.calendar(this.y[i],this.m[i]);
				};
		},
	})
}
