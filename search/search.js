// search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lalal:'',
    orderData: [{
      id: "1",
      name: "一楼"
    }, {
      id: "2",
      name: "2楼"
    }, {
      id: "3",
      name: "3楼"
    }, {
      id: "4",
      name: "4楼"
    }],
   
    bulidingData:'',
    bulidingtotal:'',
    bulidname:'',
    bulidingordertotal:''
  },
  //data数据------
  onLoad: function () {
    this.setData({
      bulidingtotal:[
        {
          id: "9",
          name: "2fghjkl楼"
        },  {
          id: "10",
          name: "2fghjkghjkl楼"
        },  {
          id: "11",
          name: "2fghjkghjkl楼"
        },  {
          id: "12",
          name: "2fhjklghjkl楼"
        },  {
          id: "13",
          name: "bvc 2fghjkl楼"
        },  {
          id: "14",
          name: "hbgvfcx2fghjkl楼"
        },  {
          id: "15",
          name: "jkl2fghjkl楼"
        },  {
          id: "16",
          name: "kl;2fghjkl楼"
        }
      ]
    })
    this.setData({
      bulidingordertotal:[
        {
          id: "1",
          name: "一楼"
        }, {
          id: "2",
          name: "2楼"
        }, {
          id: "3",
          name: "3楼"
        }, {
          id: "4",
          name: "4楼"
        }
      ]
    })
  },
  //input 发生变化
  inputName: function (e) {
    console.log(e)
    this.setData({
    lalal: e.detail.value
   
    })
    console.log(this.data.lalal)
    let bulidingData = this.searchByIndexOf(this.data.lalal,this.data.bulidingtotal)
    if(this.data.lalal){
      this.setData({
        bulidingData:bulidingData
      })
    }else{
      this.setData({
        bulidingData:""
      })
    }
  },
  getVal: function(e){
    let item = {}
    let val = e.currentTarget.dataset.val.id
    for(let i = 0;i<this.data.bulidingtotal.length;i++){
      if(this.data.bulidingtotal[i].id == val){
        item = this.data.bulidingtotal[i]
      }
    }

    this.setData({
      bulidname:item.name
    })

    console.log(this.data.lalal)
  },
  getorderVal:function(e){
    let item = {}
    let val = e.currentTarget.dataset.val.id
    for(let i = 0;i<this.data.bulidingordertotal.length;i++){
      if(this.data.bulidingordertotal[i].id == val){
        item = this.data.bulidingordertotal[i]
      }
    }
    this.setData({
      bulidname:item.name
    })
  },









  //模糊匹配方法
// 	searchByRegExp : function (keyWord, list){
//     if(!(list instanceof Array)){
//         return ;
//     }
//     var len = list.length;
//     var arr = [];
//     var reg = new RegExp(keyWord);
//     for(var i=0;i<len;i++){
//         //如果字符串中不包含目标字符会返回-1
//         if(list[i].match(reg)){
//             arr.push(list[i]);
//         }
//     }
//     return arr;
// }
searchByIndexOf :function (keyWord, list){
  // if(!(list instanceof Array)){
  //     return ;
  // }
  var len = list.length;
  var arr = [];
  for(var i=0;i<len;i++){
      //如果字符串中不包含目标字符会返回-1
      if(list[i].name.indexOf(keyWord)>=0){
          arr.push(list[i]);
      }
  }
  return arr;
}

// console.log(searchByRegExp(str,fruits))


  /**
   * 生命周期函数--监听页面显示--监听页面卸载--监听页面初次渲染完成-监听页面加载
   */






})