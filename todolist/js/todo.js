$(function () {
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
    load();
    $("#title").on("keydown", function (event) {
        if (event.keyCode == 13) {
            if ($(this).val() == "") {
                alert("请输入你要完成的todolist");
            } else {
                var local = getData();
                local.push({
                    title: $(this).val(),
                    done: false
                })
                setData(local); //!这里忘记传参数 别人怎么存嘛
                load();
                $(this).val("");
            }
        }
    })

    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data); //! 老是忘记json这个写法
        } else {
            return [];
        }
    }

    function setData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    function load() {
        var data = getData();
        $("ol,ul").empty();
        var todocount = 0;

        var donecount = 0;

        $.each(data, function (i, n) { //!这里的data不用括号！老是记不住！！
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href=javascript:; id = " + i + "></a>  </li>");
                donecount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href=javascript:; id = " + i + "></a>  </li>");
                todocount++;
            }

            $("#todocount").text(todocount); //!这里赋值都不会！
            $("#donecount").text(donecount);

        })
    }

    $("ol,ul").on("click", "a", function () {
        var data = getData();
        var index = $(this).attr("id");
        data.splice(index, 1); //!这个删除函数也忘了 搞个屁屁
        setData(data);
        load();
    })

    $("ol,ul").on("click", "input:first", function () {
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked"); //!这里的prop是jquery的方法
        setData(data);
        load();
    })

    $("ol,ul").on("dblclick", "p", function () {
        // var str = $(this).text();
        // console.log(str);
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        var str = data[index].title;
        // console.log(str);
        // window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        $(this).html('<input type = "text"  value=' + str + '>');
        
        
        $(this).on("keydown",function(event) {
            if(event.keyCode === 13){
                alert( $(this).val());//todo 为什么这里的this指的是window？
            }
            
            data[index].title = $(this).val();
            setData(date);
            console.log(getDate());
            
        })


    })
})