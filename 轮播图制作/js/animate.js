// 需要调用到这个缓慢动画函数
// window.addEventListener('load',function(){
// })  不需要写这个 因为本来函数不调用就不会执行 只要调用了 ，那网页肯定加载完了

function animate(obj,target,callback){

    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step)  : Math.floor(step);
        if (obj.offsetLeft == target){
            clearInterval(obj.timer);
            // 回调函数写在停止定时器后。
            // 执行完这个函数之后，再执行传进去的这个函数
            callback && callback(); //  如果有回调函数，那就执行。否则第一个callback就暂停了
        }

        obj.style.left = obj.offsetLeft + step + 'px';

    },15);
    // alert(2);  测试可否引用，结果是可以的
}