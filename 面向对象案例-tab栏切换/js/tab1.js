// 面向对象：首先抽取对象 
// tab 对象
// 分析功能：有切换、添加、删除、修改功能(其实就是方法)
var that = "";
class Tab {
    constructor(id) { // cnstructor接受参数
        // 开始获取元素
        that = this;
        this.main = document.querySelector(id); //这个id是constructor里的id
        // this.lis = this.main.querySelectorAll('li');
        // this.sections = this.main.querySelectorAll('section');
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        this.fsection = this.main.querySelector('.tabscon'); //!每次都不知道增加新的元素
        // this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.init();

    }

    init() {
        // 事件绑定
        this.updateNode(); //* 获取新的元素，再重新事件绑定
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab; //!这里后面不要加小括号，否则就直接调用了
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;

        }
    }

    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }

    toggleTab() {
        // console.log(this.index);        
        that.clearClass(); //!这里的调用也很讲究。
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive'; //! 如果用this的话这里显示错误
        //! 首先现在toggleTab的this是指向lis的，因为lis调用了他。但是this.sections的意思是lis.sections，但是没有这个属性呀
        //*解决方法是：定义一个that的全局变量，然后that=this；在这里用that
    }


    clearClass() {
        for (var i = 0; i < this.lis.length; i++) { // 这里不要忘记是lis.length
            //!这里的this为啥没问题？👆因为是that.clearClass。
            this.lis[i].className = '';
            this.sections[i].className = ''; // 这里的i也不要写成this.index
        }
    }

    addTab() {
        //* 点了添加按钮之后，要重新获取所有的lis和sections，然后为这些添加事件，否则新增的li和section都没有切换的功能
        //* 页面一开始打开，会执行一次init
        //* 然后点击添加按钮之后，再执行一次init，init里面又重新获取新的lis和sections

        that.clearClass();
        var random = Math.random();
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试1' + random + '</section>';
        that.ul.insertAdjacentHTML('beforeend', li); //!原先写的this，指向的是这个add.onclick按钮事件，add是没有ul的，所以还是需要使用that
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();//* 这里要添加完之后再执行事件绑定
    }
    removeTab(e) {
        e.stopPropagation();
        var index = this.parentNode.index;//! 为啥这里就用this呢？this指向removetap的使用者 remove(icon-guanbi).onclick,icon-guanbi的父亲
        console.log(index);  
        that.lis[index].remove();
        that.sections[index].remove();  
        that.init();  
        if(document.querySelector('.liactive'))return;
        index--;//! 本来想着判断index是否小于-1，再判断下面是否执行。但是用&&就可以直接解决
        that.lis[index] && that.lis[index].click(); //! 本来想着这么写that.lis[index]className = 'liactive';但是直接用这个click(),不需要鼠标触发，自动执行了这个事件
        
    }
    editTab() {
        var str = this.innerHTML; // this指向span
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type = "text" >';//!是这个input，它的父亲是span
        var input = this.children[0];
        input.value = str;      
        input.select();
        input.onblur = function(){
            this.parentNode.innerHTML = this.value; //!this.value的this指的是input。所以是input的父亲span
        }
        input.onkeyup = function(e){
            if(e.keyCode === 13){
                this.blur();
            }
        }

    }
}
new Tab('#tab');