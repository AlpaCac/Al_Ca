window.onload = function()
{
	init();

    var oneword_container=document.getElementById("oneword_container");
    var now=1;var len=21;
    
    function next()
    {
        var newleft=parseInt(oneword_container.offsetLeft)-1110 + "px";
        oneword_container.style.left=newleft;
        now++;
        console.log(now);
        if(now==20)
        {
            now=1;oneword_container.style.left="-1110px";
        }
    }
    setInterval(next,10000);
    
    var sum_container=document.getElementById("sum_container");
    var page_now=1;
    var right_button=document.getElementById("right_button");
    var left_button=document.getElementById("left_button");
    
    // console.log("OK!!!");
    function next_page()
    {
        console.log("next");
        if(page_now==3)return ;
        if(page_now==1){page_now=2;sum_container.style.left="-1120px";}
        else if(page_now==2){page_now=3;sum_container.style.left="-2240px";}
    }
    function pre_page()
    {
        console.log("pre "+now+" px");
        if(page_now==1)return ;
        if(page_now==2){page_now=1;sum_container.style.left="0";}
        else if(page_now==3){page_now=2;sum_container.style.left="-1120px";}
    }
    right_button.onclick=next_page;
	left_button.onclick=pre_page;
}

