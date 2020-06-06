$(function () {

    // ! 警告 重点 或 多次忘记的内容
    // ? 存疑
    // todo 需要复习的内容
    // * 思路
    // 步骤


    // 2 按回车把内容传到数组里
    load(); // 9不用按回车就显示出来
    $("#title").on("keydown", function (event) {
        if($(this).val() === ""){
            alert(" 请输入你的todolist");
        }
        else {
            var local = getDate();
            local.push({
                title: $(this).val(),
                done: false
            }); // 3插入新的内容到数组里
            saveDate(local); // 5执行函数，更新本地存储的数组 把local传进去就不用设定全局变量了
            load();
            $(this).val("");
        }

    })
    // 1 读取本地存储的数据到一个数组里
    function getDate() {
        var date = localStorage.getItem("todolist");
        if (date !== null) {
            return JSON.parse(date);
        } else {
            return [];
        }
    }
    // ! todolist里面是一个小li里有一个a，不是亲兄弟所以不能用$(this)
    // 11删除选中的那个li对应的数组里的本地数据
    // ? 因为是动态所以要用on()
    $("ol,ul").on("click", "a", function () {

        var date = getDate();
        console.log(date);
        // 13 获取点了哪个小a的id
        var index = $(this).attr("id");
        console.log(index);

        // * 但是没法直接对本地存储的数据进行修改，所以通过改变数组，然后重新装回本地，再重新渲染出来

        // todo 数组删除元素：splice(从哪个位置开始删除，删除几个元素)
        // 14删除index对应的在数组里的数据
        date.splice(index, 1);
        saveDate(date); // 删完了要存到本地
        load(); // 然后再渲染一次就实现删除操作了
    })

    //?  是根据local.push({title:$(this).val(),done:false});这个里面的done属性来决定放到ol还是ul里面的

    // 15 改变复选框的值
    $("ol,ul").on("click", "input", function () {
        var date = getDate();
        // ? input和a在同一个li里，然后a是有id索引号的，可以拿到a的索引号
        //! this 是指input呀 这个分清楚
        //todo 自定义属性通过attr()获取
        var index = $(this).siblings("a").attr("id");

        //todo 自有属性通过prop来获取checked是false还是true
        date[index].done = $(this).prop("checked");
        saveDate(date);
        load();
    })


    // 4建立一个函数功能是更新本地数据，即把新数组的内容给本地存储
    function saveDate(date) {
        localStorage.setItem("todolist", JSON.stringify(date));
    }

    //6渲染加载页面的功能
    function load() {
        var date = getDate(); // 7读取本地数据
        // 10遍历之前需要清空，否则数据会重复出现
        $("ol,ul").empty();

        // 17 统计个数
        var todoCount = 0;
        var doneCount = 0;
        

        $.each(date, function (i, n) {
            // console.log(n);
            //16这里新增判断复选框属性值来决定他是在ol里还是ul里
            if (n.done) {
                $("ul").prepend("<li ><input type='checkbox' checked = 'checked'> <p>" + n.title + " </p> <a href='javascript:;' id = " + i + "></a></li>");
                doneCount ++;
            } else {
                $("ol").prepend("<li ><input type='checkbox' > <p>" + n.title + " </p> <a href='javascript:;' id = " + i + "></a></li>");
                todoCount++;
            }
            // 8插入li 并把数据添加进去引引加加
            // 12给小a 加索引号 以便删除的时候用
            // ! 每次都忘记 引引加加 然后处理得很复杂  
        });

        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }




})