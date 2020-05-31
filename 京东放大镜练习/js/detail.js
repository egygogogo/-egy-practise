// window.addEventListener('load', function() {
//     var preview_img = document.querySelector('.preview_img');
//     var mask = document.querySelector('.mask');
//     var big = document.querySelector('.big');
//     // 1. 当我们鼠标经过 preview_img 就显示和隐藏 mask 遮挡层 和 big 大盒子
//     preview_img.addEventListener('mouseover', function() {
//         mask.style.display = 'block';
//         big.style.display = 'block';
//     })
//     preview_img.addEventListener('mouseout', function() {
//             mask.style.display = 'none';
//             big.style.display = 'none';
//         })
//         // 2. 鼠标移动的时候，让黄色的盒子跟着鼠标来走
//     preview_img.addEventListener('mousemove', function(e) {
//         // (1). 先计算出鼠标在盒子内的坐标
//         var x = e.pageX - this.offsetLeft;
//         var y = e.pageY - this.offsetTop;
//         // console.log(x, y);
//         // mask.style.left = x + 'px'; 1
//         // mask.style.top = y + 'px';  1
//         // mask.style.left = x - 150 + 'px'; 2 
//         // mask.style.top = y - 150 + 'px';  2为了让鼠标在盒子的中间位置
//         // mask.style.left = x - mask.offsetWidth/2 + 'px'; 3 
//         // mask.style.top = y - mask.offsetHeight/2 + 'px'; 3写成活的，盒子的一半
//         // (2) 减去盒子高度 300的一半 是 150 就是我们mask 的最终 left 和top值了
//         // (3) 我们mask 移动的距离
//         var maskX = x - mask.offsetWidth / 2;
//         var maskY = y - mask.offsetHeight / 2;
//         // (4) 如果x 坐标小于了0 就让他停在0 的位置
//         // 遮挡层的最大移动距离
//         var maskMax = preview_img.offsetWidth - mask.offsetWidth;
//         if (maskX <= 0) {
//             maskX = 0; 
//         } else if (maskX >= maskMax) {
//             maskX = maskMax;
//         }
//         if (maskY <= 0) {
//             maskY = 0;
//         } else if (maskY >= maskMax) {
//             maskY = maskMax;
//         }
//         mask.style.left = maskX + 'px';
//         mask.style.top = maskY + 'px';
//         // 3. 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
//         // 大图
//         var bigIMg = document.querySelector('.bigImg');
//         // 大图片最大移动距离
//         var bigMax = bigIMg.offsetWidth - big.offsetWidth;
//         // 大图片的移动距离 X Y
//         var bigX = maskX * bigMax / maskMax;
//         var bigY = maskY * bigMax / maskMax;
//         bigIMg.style.left = -bigX + 'px';
//         bigIMg.style.top = -bigY + 'px';

//     })

// })

//在html和css加载完之后再执行js代码 
window.addEventListener('load',function(){
    //1 获取元素
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big'); 
    
    //2 鼠标经过preview_img 黄盒子和大盒子显示
    preview_img.addEventListener('mouseover',function(){
        mask.style.display = 'block';
        big.style.display = 'block';
    })

    //3 鼠标离开的时候 黄盒子和大盒子隐藏
    preview_img.addEventListener('mouseout',function(){
        mask.style.display = 'none';
        big.style.display = 'none';
    })

    
    //4 黄色盒子跟随鼠标移动而移动
    preview_img.addEventListener('mousemove',function(e){
        var x = e.pageX - this.offsetLeft; // 距离浏览器左边多少，需要一层层审查父元素有无定位
        var y = e.pageY - this.offsetTop;

        // mask.style.left = moveX + 'px';
        // mask.style.top = moveY + 'px';
        // 5 单单这样肯定不ok，鼠标要在黄色盒子中央
        // mask.style.left = x - mask.offsetWidth/2 + 'px';
        // mask.style.top = y - mask.offsetHeight/2 + 'px';

        // 6 以上写完发现盒子会飞到框框外面，限制一下黄色盒子的移动范围
        // 思路是，如果盒子移动的距离超过了多少 就定一个0值和大盒子减去黄盒子的距离
        // 判断盒子移动的距离
        var maskX = x - mask.offsetWidth/2;
        var maskY = y - mask.offsetHeight/2;

        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        
        if (maskX <= 0){
            maskX = 0;
        }
        else if(maskX >=  maskMax){
            maskX = maskMax;
        }
        if (maskY <= 0){
            maskY = 0;
        }
        else if(maskY >=  maskMax){
            maskY = maskMax;
        }

        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 7 以上写完，盒子已经固定在方框里了。接下来开始写大图片跟随盒子移动而移动
        // 8 需要得到大图片的参数
        var bigIMg = preview_img.querySelector('.bigImg');
        var bigMax = bigIMg.offsetWidth - big.offsetWidth;
        // 9 为什么不动！为什么不动！！很暴躁！！
        // 要记得给bigimg添加left和top啊，不给属性怎么赋值嘛。
        bigIMg.style.left = - maskX * bigMax / maskMax + 'px';
        bigIMg.style.top =  - maskY * bigMax / maskMax + 'px';

    }) 

})