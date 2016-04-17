/*!
 * bootstrap-treetable - jQuery plugin for bootstrapview treeselect
 *
 * Copyright (c) 2016 songhlc
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://github.com/songhlc/bootstrap-treeselect
 *
 * Version:  1.0.0
 * see http://songhlc:9091/cdn/js/plugins/bstreeselect/index.html for example
 */
(function($){
    $.fn.bstreeselect = function(options){
        var element = this;
        var settings = {
            container:window,
            data:[],
            extfield:[],
            maxlevel:4,
            treenodeselect:function(data){},
            onclear:function(){},
            inputCls:"",
            inputIconCls:"fa fa-angle-down",
            itemRightIconCls:"fa fa-caret-right"
        };
        if(options) {
            $.extend(settings, options);
        }
        var treeSelectCtn =$("<div class='treeselect'></div>");
        /*输入框*/
        var inputItem = $("<input class='form-control'/>").addClass(settings.inputCls);
        /*下拉按钮*/
        var selectIcon = $("<i class='i-angle-down'></i>").addClass(settings.inputIconCls);
        treeSelectCtn.append(inputItem);
        treeSelectCtn.append(selectIcon);
        var treedataCtn = $("<div class='treedatactn'></div>");
        //根据数据生成下拉内容
        generateTreeData(treedataCtn);
        var operationCtn = $('<div class="operation"></div>')
            .append(' <span class="clearselect pull-left">清空选择</span>')
            .append(' <span class="j-ok btn btn-primary btn-sm pull-right">确定</span>')
            .append('<div class="clearfix"></div>');
        treedataCtn.append(operationCtn);
        treeSelectCtn.append(treedataCtn);

        element.html(treeSelectCtn);

        /*默认加载树形数据*/
        function generateTreeData(treedatactn){

            for(var i=0;i<settings.maxlevel;i++){
                var category_list = $("<ul class='category_list'></ul>");
                category_list.attr("data-level",i+1).addClass("col-level-"+Math.round(100/settings.maxlevel));
                treedatactn.append(category_list);
            }
            generateLevelData(0,1,treedatactn.find("ul[data-level=1]"));
            treedatactn.append($("<div class='clearfix'></div>"))
        }
        function generateLevelData(pid,_level,_element){
            element.find(".category_list").each(function(){
                if($(this).attr("data-level")-_level>0){
                    $(this).html('');
                }
            });
            //for循环遍历出所有符合pid的节点，然后append到ul之中
            var _data = settings.data;
            var _hasChildren = false;
            for(var i=0;i<_data.length;i++){
                if(pid==_data[i].pid){
                    var _item = $("<li></li>");
                    _item.html(_data[i].name).attr("data-innercode",_data[i].innercode).attr("data-name",_data[i].name).attr("data-id",_data[i].id).attr("pid",pid).append("<i class='i-caret-right pull-right "+settings.itemRightIconCls+"'></i>");
                    _element.append(_item);
                    _hasChildren = true;
                }
            }
            return _hasChildren;
        }
        element.delegate(".category_list li","click",function(){
            var _level = $(this).parent().attr("data-level")-0+1;
            var _element = element.find("ul[data-level="+_level+"]");
            var _pid = $(this).attr("data-id");
            $(this).parent().find("li").removeClass("active");
            $(this).addClass("active");


            generateLevelData(_pid,_level-1,_element);
            if(settings.treenodeselect){
                settings.treenodeselect(
                    {
                        name:$(this).attr("data-name"),
                        id:$(this).attr("data-id"),
                        pid:_pid,
                        innercode:$(this).attr("data-innercode")
                    });
            }
            /*设置input显示内容*/
            var inputText = "";
            element.find("li").each(function(){
                if($(this).hasClass("active")){
                    inputText+=$(this).attr("data-name")+" > ";
                }
            });
            element.find("input").val(inputText.substring(0,inputText.length-2));
        });
        var _timeout;
        element.delegate(".treeselect input","focus",function(){
            element.find(".treedatactn").css("display","block");
        });
        element.delegate(".treeselect input","blur",function(){
            if(_timeout){
                clearTimeout(_timeout);
            }
            _timeout = setTimeout(function(){
                element.find(".treedatactn").css("display","none");
            },200);
        });
        element.delegate(".treedatactn","click",function(){
            if(_timeout){
                clearTimeout(_timeout);
            }
        });
        /*绑定清除事件*/
        element.delegate(".clearselect","click",function(){
            element.find("input").val('');
            settings.onclear();
            element.find(".treedatactn").css("display","none");
        });
        element.delegate(".j-ok","click",function(){
            element.find(".treedatactn").css("display","none");
        });
        /*todo:change click on body to mouseleave on element*/
        $("body").on("click",function(el){
            if($(el.target).parents(".treeselect").length==0){
                if(_timeout){
                    clearTimeout(_timeout);
                }
                _timeout = setTimeout(function(){
                    element.find(".treedatactn").css("display","none");
                },200);
            }

        });

    }
})(jQuery);