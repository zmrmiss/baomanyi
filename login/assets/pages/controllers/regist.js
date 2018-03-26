/**
 * Created by wangys on 2016/12/3.
 */

var flag = true;
$(function () {
    $('.register-form').show();
    $('.register-form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "",
        rules: {

            mobile: {
                required: true,
                mobile: true
            },
            password: {
                required: true
            },
            // imageCode: {
            //     required: true
            // },
            smsCode: {
                required: true
            },
            rePassword: {
                equalTo: "#password"
            },
            // tnc: {
            //     required: true
            // }
        },

        messages: { // custom messages for radio buttons and checkboxes
            mobile: {
                required: '请输入您的手机号.'
            },
            password: {
                required: '请输入您的密码'
            },
            rePassword: {
                required: '请确认密码',
                equalTo: '两次密码不一致'
            },
            smsCode: {
                required: '请输入您的手机验证码'
            },
            // tnc: {
            //     required: "请勾选是否同意协议."
            // }
        },

        invalidHandler: function(event, validator) { //display error alert on form submit

        },

        highlight: function(element) { // hightlight error inputs
            $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
        },

        success: function(label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },

        errorPlacement: function(error, element) {
            if (element.attr("name") == 'smsCode') {
                error.insertAfter($('#register_smsCode_error'));
            } else if (element.closest('.input-icon').size() === 1) {
                error.insertAfter(element.closest('.input-icon'));
            } else {
                error.insertAfter(element);
            }

            // if (element.attr("name") == "tnc") { // insert checkbox errors after the container
            //     error.insertAfter($('#register_tnc_error'));
            // } else if (element.closest('.input-icon').size() === 1) {
            //     error.insertAfter(element.closest('.input-icon'));
            // } else {
            //     error.insertAfter(element);
            // }
        },

        submitHandler: function(form) {
                // form[0].submit();
                if (flag) {
                    $('#register-submit-btn').text('请稍候......');
                    $('#register-submit-btn').attr('disabled', 'disabled');
                    $.ajax({
                        type: "POST",
                        url: "signup",
                        data: JSON.stringify({
                            mobile:$("#mobile").val(),
                            password:$("#password").val(),
                            smsCode: $('#smsCode').val()
                        }),
                        dataType: "json",
                        contentType: 'application/json;charset=UTF-8',
                        success: function(data){
                            if (data.code == 200) {
                                window.location.href = 'http://cr.1cloudsp.com/assets/pages/controllers/regist/success';
                            } else {
                                layer.msg(data.codeInfo, {time: 1000, icon: 2})
                            }
                            $('#register-submit-btn').text('确认注册');
                            $('#register-submit-btn').removeAttr('disabled');
                        }
                    });
                }
            }
    });

    $('.register-form input').keypress(function(e) {
        if (e.which == 13) {
            if ($('.register-form').validate().form()) {
                // $('.register-form').submit();
            }
            return false;
        }
    });

});

    function checkMobile() {
        var regex = /^1([3578]\d|4[57])\d{8}$/;
        var mobile = $('#mobile').val();
        if (!regex.test(mobile)) {
            flag = false;
            return flag;
        }
        $.ajax({
            type: "POST",
            url: "common/mobile/check",
            data: JSON.stringify({
                mobile: mobile
            }),
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                if (data.code == 200) {
                    flag = true;
                    $('#mobileMsg').hide();
                } else if (data.code == 3004) {
                    flag = false;
                    //                    layer.msg('该手机号已经被注册，请更换手机号', {time: 1000, icon: 2})
                    $('#mobileMsg').show();
                    $('#mobileMsg').html('该手机号已经被注册，请更换手机号');
                } else {
                    flag = false;
                    //                    layer.msg(data.codeInfo + "错误代码：" + data.code, {time: 1000, icon:2})
                    $('#mobileMsg').show();
                    $('#mobileMsg').html(data.codeInfo + "错误代码：" + data.code, {time: 1000, icon: 2});
                }
            }
        });
    }
    function sendCode() {
        var regex = /^1([3578]\d|4[57])\d{8}$/;
        if (!regex.test($('#mobile').val())) {
            layer.msg('请输入正确的手机号', {time: 1000, icon: 2});
            return false;
        }
        if (!flag) {
            return false;
        }
        $.ajax({
            type: "POST",
            url: "common/captcha/sms",
            data: JSON.stringify({
                mobile:$("#mobile").val(),
                imgCode: $('#imageCode').val()
            }),
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function(data){

                if (data.code == 200) {
                    setDisabled(60, $('#sendBtn'));
                    layer.msg('验证码短信已发送，请及时查看', {time: 1000, icon: 1})
                } else {
                    layer.msg(data.codeInfo + "错误代码：" + data.code, {time: 1000, icon:2})
                }
            }
        });
    }

    // 发送倒计时
    function setDisabled(seconds, o) {
        if (seconds <= 0) {
            o.removeAttr("disabled");
            o.html('发送验证码');
        } else {
            o.attr('disabled', true);

            o.html('重新发送 ( ' + (seconds < 10 ? '0': '') + seconds + ' )');
            seconds --;
            setTimeout(function () {
                setDisabled(seconds, o);
            }, 1000);
        }
    }

