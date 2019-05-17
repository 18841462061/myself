import $ from 'jquery'

$(function(){
    $(".nav li").click(function(){
        $(this).attr("class","active")
        $(this).siblings().attr("class","")
    }) 
  })