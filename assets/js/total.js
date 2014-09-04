$(document).ready(function(){
    window.totalE = window.totalE || {};
    mz.pgName = "PC端-经典科鲁兹官网-配置表";
    mz.pv(mz.pgName + '-首页');
    $('#top .cruzeLogo').on('click', function(e){
        mz.event(mz.pgName + '-科鲁兹logo');
    });
    $('#top .chevroletLogo').on('click', function(e){
        mz.event(mz.pgName + '-雪佛兰logo');
    });
    $('#bt .curze1').on('click', function(e){
        mz.event(mz.pgName + '-经典款科鲁兹');
    });
    $('#bt .curze2').on('click', function(e){
        mz.event(mz.pgName + '-新科鲁兹');
    });
    $('#bt .curze3').on('click', function(e){
        mz.event(mz.pgName + '-科鲁兹掀背车');
    });
    $(window.totalE).bind('tryBefore', function(e, data){
        mz.event(mz.pgName + '-立即申请');
    });
    $(window.totalE).bind('trySuccess', function(e, data){
        mz.event(mz.pgName + '-立即申请-成功页面');
        mz.trycar(data.name, data.phone , data.record_id);
    });
});