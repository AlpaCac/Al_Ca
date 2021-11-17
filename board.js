var datatable =null;
var db=openDatabase('MyData1' , '','My Database',102400); 
if (!db) 
{
    console.log("数据库创建失败！");
} 
else 
{
    console.log("数据库创建成功！");
}
function init()
{
    datatable = document.getElementById("datatable");
    showAllData();
}
/*
    //removeChild() 方法指定元素的某个指定的子节点。
    // 以 Node 对象返回被删除的节点，如果节点不存在则返回 null。
<ul id="myList"><li>Coffee</li><li>Tea</li><li>Milk</li></ul>
    <button onclick="myFunction()">删除</button>
    function myFunction()
    {
    var list=document.getElementById("myList");
    for(var i=list.childNodes.length-1;i>=0;i--){
    list.removeChild(list.childNodes[i]);
    }

}*/
function removeAllData()
{
    //这就是用来删除项目用的
    for(var i= datatable.childNodes.length-1;i>=0;i--)
	{
        datatable.removeChild(datatable.childNodes[i]);//i是从0开始
    }

    var tr =  document.createElement('tr');
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');
    th1.innerHTML ='姓名';
    th2.innerHTML ='留言';
    th3.innerHTML ='时间';
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    datatable.appendChild(tr);
}
function showData(row)
{
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.innerHTML = row.name;
    var td2 = document.createElement('td');
    td2.innerHTML = row.message;
    var td3 = document.createElement('td');
    var t = new Date();
    t.setTime(row.time);
    td3.innerHTML= t.toLocaleDateString() +"" + t.toLocaleTimeString();
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    datatable.appendChild(tr);
}
function showAllData()
{
    db.transaction(function(tx)
	{
        //debugger;
        tx.executeSql('CREATE TABLE IF NOT EXISTS MsgData(name TEXT,message TEXT, time INTEGER)',[],
                function(tx,rs){ console.log('创建MsgData表成功'); },
                function(tx, error){ console.log('创建MsgData表失败:' + error.message);}
        );//在数据库中创建一个数据表
        tx.executeSql("SELECT * from MsgData",[],function(tx,rs){
            //debugger;//从MagData数据表中获取全部数据,成功之后获取回调函数
            //console.log(rs.rows.length);
            removeAllData();
            for(var i =0;i<rs.rows.length;i++){//rs.rows是获取的所有行
                showData(rs.rows.item(i));
            }
        })
    })
}
function addData(name,message,time)
{
    db.transaction(function(tx)//这是访问数据库的transaction方法
	{
        tx.executeSql('INSERT INTO MsgData VALUES(?,?,?)',[name,message,time],function(tx,rs){//成功时执行的回调函数。返回两个参数：tx和执行的结果。
            console.log("ok");
        },function(tx,error){
            console.log("查询失败"+"::"+error.message+"2")

        })
    })
}
function saveData()
{
    var name=document.getElementById('name').value;
    var memo=document.getElementById('memo').value;
    var time = new Date().getTime();
    addData(name,memo,time);
    showAllData();
}