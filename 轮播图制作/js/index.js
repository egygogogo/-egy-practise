// 该js 控制轮播效果
window.addEventListener('load',function(){
    
    var focus = document.querySelector('.focus');
    var arrow_l = focus.querySelector('.arrow-l');
    var arrow_r = focus.querySelector('.arrow-r');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    var num = 0;

    // mouseenter 和 mouseleave 是不会冒泡的，只针对这个元素
    focus.addEventListener('mouseenter',function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 因为不用了，所以清空
    })

    focus.addEventListener('mouseleave',function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function(){
            arrow_r.click();
        },2000);
    })

    // 小圆圈的数量不对，先让小圆圈的数量和图片数量一致
    // 即有多少个图片 就生成多少个小圆圈
    for(var i = 0; i <ul.children.length;i++){
        var li = document.createElement('li');
        // 记录小li的索引号，以后可以引用
        li.setAttribute('index',i);
        ol.appendChild(li);


        //既然先写到了小圆圈，就把小圆圈的功能先写上
        // 在创建li的时候就顺便为其添加事件：小圆圈点击后，样式会改变，使用排他思想。
        li.addEventListener('click',function(){
            for (var i = 0; i <ol.children.length;i++){
                ol.children[i].className = '';
            }
            this.className = 'current';

            var index = this.getAttribute('index');
            console.log(focusWidth);
            console.log(index);
            num = index;
            circle = index; // 这两个是因为num 和 li.click事件分开，无法同步
            
            // 以及点击小圆圈，图片会跟着滑动，使用到animate函数
            animate(ul,- index * focusWidth);// 用这个的话 缓慢过度
            // ul.style.left = - index * focusWidth + 'px'; 也有效果呀，但是是直接生硬的变化
        })   
    }
    ol.children[0].className = 'current'; // 默认第一个孩子是实心
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    
    
    var circle = 0;
    var flag = true;
    arrow_r.addEventListener('click',function(){
        if (flag == true){
            flag = false;
            if(num == ul.children.length - 1){
                ul.style.left = 0;
                num = 0;
            }
           num++;
           animate(ul,- num * focusWidth,function(){
               flag = true;
           });
    
           circle++;
           if(circle == ol.children.length){
               circle = 0;
           }
           circlechange();
        }
    });

    arrow_l.addEventListener('click',function(){
        if(flag == true){
            flag = false;
            if(num == 0){
                num = ul.children.length - 1;
                ul.style.left = - num * focusWidth + 'px';// 如果这里用ul.offsetWidth 会变化的很慢
            }
           num--;
           animate(ul, -num * focusWidth,function(){
               flag = true;
           });
    
           circle--;
        //    if(circle < 0){
               circle = circle < 0 ? ol.children.length -1 : circle;
        //    }
           circlechange();
        }
    });

    function circlechange(){
        for(var i =0;i < ol.children.length;i++){
            ol.children[i].className = ''; 
        }
        ol.children[circle].className = 'current';
    }

    var timer = setInterval(function(){
        arrow_r.click();
    },1000);


})