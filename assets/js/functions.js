(function ($) {
    window.totalE = window.totalE || {};
    $cache = {};
    $(document).ready(function () {
        $cache.window = $(window);
        $cache.wrapper = $('#wrapper');
        pgResize();
        // 禁止拖动img元素
        $(document.images).on('dragstart', function(e){
            return false;
        });
        // 输入框 提示信息 兼容性处理
        $("input[tipMsg]").each(function() {
            var $self = $(this);
            if ($self.val() == "") {
                var oldVal = $self.attr("tipMsg");
                if ($self.val() == "") {
                    $self.attr("value", oldVal).addClass('tip');
                }
                $self.addClass('tip').focus(function() {
                    if ($self.val() != oldVal) {
                        $self.removeClass('noTip');
                    } else {
                        $self.val("").addClass('tip');
                    }
                }).blur(function() {
                    if ($self.val() == "") {
                        $self.val(oldVal).addClass('tip');
                    }
                }).keydown(function() {
                    $self.removeClass('tip');
                });
            }
        });
        // tab 切换
        $cache.swTab = $('#center .swTab li');
        $cache.centTab = $('#center .centTable li');

        $cache.swTab.each(function(i){
            var $self = $(this);
            $self.on('click', function(e){
               $cache.swTab.removeClass('active').eq(i).addClass('active');
               $cache.centTab.removeClass('active').eq(i).addClass('active');
            });
        });
        //预约试驾
        $cache.tryBox = $('#bt .tryBox');
        $cache.tryBtn = $('.submit', $cache.tryBox);
        $cache.tryName = $('.name', $cache.tryBox);
        $cache.tryPhone = $('.phone', $cache.tryBox);

        $cache.tryBtn.data('lock', false);
        $cache.tryBtn.on('click', function(e){
            if($cache.tryBtn.data('lock')){
                return false;
            }
            var name = $cache.tryName.val();
            var phone = $cache.tryPhone.val();
            if($.trim(name).length == 0 || name == '填写姓名')
            {
                alert('请输入姓名!')	;
                $cache.tryName.focus();
                return false;
            }
            if(!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(phone))
            {
                alert('手机号码输入有误!');
                $cache.tryPhone.focus();
                return;
            }
            $cache.tryBtn.data('lock', true);
            var cccdata = {
                car:7,
                dealer:'1536',
                email:'',
                mobile: phone,
                name: name,
                pro:'1',
                purchase_intention:'三个月内'
            };
            $(window.totalE).trigger('tryBefore', {});
            $.getJSON('http://www.chevrolet.com.cn/brandsite/ccc/try_order_sync.ashx?callback=?', cccdata, function(data){
                if (data.result == "success") {
                    if (data.jsonResponse == 0) {
                        alert("提交失败");
                    } else if (data.jsonResponse == 1) {
                        $(window.totalE).trigger('trySuccess', {
                            car: cccdata.car,
                            name: cccdata.name,
                            phone: cccdata.mobile,
                            record_id: data.record_id
                        });
                        alert('提交成功');
                    }
                } else {
                    alert("提交失败");
                }
                $cache.tryBtn.data('lock', false);
            });
        });
    });
     $(window).load(function() {
         
     });
     $(window).resize(function() {
        pgResize();
     });

    function pgResize(){
         var winW = $cache.window.width();
         var winH = $cache.window.height();
         if(winH < 630){
             $cache.wrapper.css({
                height: "630px"
            });
         }else{
             $cache.wrapper.css({
                height: "100%"
            });
         }
         if(winW < 1000){
             $cache.wrapper.css({
                 width: '1000px'
             });
         }else{
             $cache.wrapper.css({
                 width: '100%'
             });
         }
    }
})(window.jQuery);