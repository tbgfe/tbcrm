// data tables
var handleDataTableSelect = function() {
    "use strict";
    if ( $('.data-table').length !== 0 || $('.data-table2').length !== 0 ) {
        $('.data-table').DataTable({
            select: true,
            responsive: true,
            searching: true,
            paging: false
        });
        $('.data-table2').DataTable({
            select: true,
            responsive: true,
            searching: false,
            paging: false
        });
    }
};
var TableManageTableSelect = function () {
    "use strict";
    return {
        //main function
        init: function () {
            handleDataTableSelect();
        }
    };
}();

$(document).ready(function(){
    // custom scrollbar
    $(window).on('load',function(){
        $('.customscroll').mCustomScrollbar({
            alwaysShowScrollbar: 1
        });
    });

    // infinite tabs
    $('.infinite-tabs .list a').on('click',function(){
        $(this).parent().addClass('active').siblings().removeClass('active');
        var subStr = $(this).attr('href').substring(1);
        var clickedTab = '.tab.' + subStr;
        $(clickedTab).addClass('active').siblings().removeClass('active');
        return false;
    });

    // tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // presets
    $('.caption h2 a').on('click', function(){
        $('.caption-expand').slideToggle();
        return false;
    });

    // FILTERS & SORTING
    $('.group-sort .filters a').on('click', function() {
        $('.group-sort-expand').slideToggle();
        $('.caption .status').hide();
        $('.caption .status-changed').show();
        return false;
    });
    // close options
    $('.group-sort-expand li .close').on('click', function(){
        $(this).parent().fadeOut();
        return false;
    });
    // make them sortable
    $('.sortable').sortable({
        cancel: '.add'
    });
    // add new column
    $('.group-sort-expand .columns li.add a').on('click', function(){
        $('.group-sort-expand .columns .sort-list').hide().next().show();
        return false;
    });
    // cancel new column
    $('.group-sort-expand .columns .sort-add .cancel').on('click', function(){
        $('.group-sort-expand .columns .sort-list').show().next().hide();
        return false;
    });
    // add new filter
    $('.group-sort-expand .filters li.add a').on('click', function(){
        $('.group-sort-expand .filters .filters-list').hide().next().show();
        return false;
    });
    // cancel new column
    $('.group-sort-expand .filters .filter-add .cancel').on('click', function(){
        $('.group-sort-expand .filters .filters-list').show().next().hide();
        return false;
    });

    // populate overall row count of data tables
    $('.table-responsive').each(function(){
        $(this).parent().prev('.table-caption')
            .find('.options').find('.selected').find('.all')
                    .html(
                        $(this).find('tbody tr').length
                    )
            .parent().parent().parent()
                .find('h3 span')
                .html(
                    $(this).find('tbody tr').length
                )
    });
    // update table selected rows
    $('.table-responsive').on('click', function(){
        $(this).parent().prev('.table-caption').find('.options').find('.selected').find('.count').html(
            $(this).find('.data-table').DataTable().rows('.selected').data().length
        )
        // $(this).parent().parent().parent().prev().find('.options').find('.selected').find('.all').html(
        //     $(this).DataTable().rows().data().length
        // )
    });

    // toggle named tables
    $('.table-caption h3.named a').on('click', function(){
        $(this).parent().parent().next().toggle();
        var text = $(this).next('i').text();
        $(this).next('i').text( text == 'keyboard_arrow_up' ? 'keyboard_arrow_down' : 'keyboard_arrow_up' );
        return false;
    });

    // datepicker
    $('.datepicker').datepicker({
        autoclose: true,
        format: "dd-M-yyyy"
    });

    // remove filter
    $('.cases-filters .names a.remove').on('click', function(){
        $(this).parent().fadeOut();
        return false;
    });

    // remove st owner
    $('.footer-tabs .tab-content .top .leftside .field a.remove').on('click',function(){
        $(this).parent().fadeOut();
        return false;
    });

    // approve or discard buttons
    $('.tab-content .leftside .doc-list .item .left .status a').on('click',function(){
        $(this).parents('.item').fadeOut();
        return false;
    });
    // good or bad buttons
    $('.tab-content .leftside .doc-list .item .left .type a').on('click',function(){
        $(this).parents('.item').fadeOut();
        return false;
    });

    // show hidden phones/emails
    $('.customer-details-cols a.showall').on('click', function(){
        $(this).toggleClass('active').parent().next('.list')
            .toggleClass('expanded').toggleClass('collapsed');
        return false;
    });

    // split body with options
    $('.newcase .btn-options').on('click', function(){
        $('.content').toggleClass('split');
        return false;
    });
    // close sidebar
    $('.content .split-left .close').on('click', function(){
        $('.content').removeClass('split');
        return false;
    });

    // EDITABLE FIELDS
    // select focus
    let initialSelectText;
    let finalSelectText;
    $('.editable.select').on('dblclick', function(){
        initialSelectText = $(this).text();
        $(this).hide().next().show().focus();
    });
    // select blur
    $('.editable-select').on('blur', function(){
        finalSelectText = $(this).find('option:selected').text();
        if ( initialSelectText != finalSelectText ) {
            $(this).hide().prev().show().text(finalSelectText).addClass('edited');
        } else {
            $(this).hide().prev().show().text(finalSelectText);
        }
    });
    // textarea focus
    let initialTextareaText;
    let editableTextareaHeight;
    let finalTextareaText;
    $('.editable.textarea').on('dblclick', function(){
        initialTextareaText = $(this).text();
        editableTextareaHeight = $(this).height() + 'px';
        $(this).hide()
            .next().css('height',editableTextareaHeight).val(initialTextareaText).show().focus();
    });
    // textarea blur
    $('.editable-textarea').on('blur', function(){
        finalTextareaText = $(this).val();
        if ( initialTextareaText != finalTextareaText ) {
            $(this).hide().prev().text(finalTextareaText).show().addClass('edited');
        } else {
            $(this).hide().prev().text(finalTextareaText).show();
        }
    });
    // text focus
    let initialInputText;
    let editableInputWidth;
    let finalInputText;
    $('.editable.text').on('dblclick', function(){
        initialInputText = $(this).text();
        editableInputWidth = $(this).width() + 7 + 'px';
        $(this).hide().next().css('width', editableInputWidth).val(initialInputText).show().focus();
    });
    // text blur
    $('.editable-text').on('blur', function(){
        if ( !$(this).hasClass('date') ) {
            finalInputText = $(this).val();
            if ( initialInputText != finalInputText ) {
                $(this).hide().prev().text(finalInputText).show().addClass('edited');
            } else {
                $(this).hide().prev().text(finalInputText).show();
            }
        }
    });
    // date change
    $('.editable-text.date').on('change', function(){
        finalInputText = $(this).val();
        if ( initialInputText != finalInputText && finalInputText ) {
            $(this).hide().prev().text(finalInputText).show().addClass('edited');
        } else if ( initialInputText != finalInputText && !finalInputText ) {$(this).hide().prev().text(initialInputText).show();
        } else {
            $(this).hide().prev().text(finalInputText).show();
        }
    });

    // accordion
    $('.accordion .item .item-title a').on('click', function(){
        if ( $(this).parent().parent().hasClass('active') ) {
            $(this).parent().parent().removeClass('active')
                .find('.item-body').first().slideUp();
        } else {
            $(this).parent().parent().siblings().removeClass('active')
                .find('.item-body').slideUp();
            $(this).parent().parent().addClass('active')
                .find('.item-body').first().slideDown();
        }
        return false;
    });

    $('.accordion .item.sub .item-title').on('click', function(){
        $(this).parents('.tpl-list').removeClass('in');
        return false;
    });

    // expandable box
    $('.section.expandable .title a').on('click',function(){
        $(this).parent().parent().next('.box').slideToggle();
        return false;
    });

    // create MultiSelect from select HTML element
    $(".multiselect").kendoMultiSelect().data("kendoMultiSelect");

    // On/Off switch
    $('.section .title .switch').on('click',function(){
        var switchText = $('.section .title .switch .onoff').text();
        $('.section .title .switch .onoff').text(
            switchText == "On" ? "Off" : "On"
        );
        return fase;
    });

});

    //drawer menu
    function openNav(koeDaOtvorya) {
        if(koeDaOtvorya==='case') {
            document.getElementById("rightMenuAssign").style.width = "0";
            document.getElementById("rightMenu").style.width = "350px";
            $("button[name=assignTo]").removeClass("active");
            $("button[name=checkCase]").addClass("active");
        } else if (koeDaOtvorya==='assign') {
            document.getElementById("rightMenu").style.width = "0";
            document.getElementById("rightMenuAssign").style.width = "350px";
            $("button[name=checkCase]").removeClass("active");
            $("button[name=assignTo]").addClass("active");
        }
        document.getElementById("content").style.marginRight = "350px";
    }

    function closeNav(koeDaZatvorya) {
        if(koeDaZatvorya==='case') {
            document.getElementById("rightMenu").style.width = "0";
            $("button[name=checkCase]").removeClass("active");
        } else if (koeDaZatvorya==='assign') {
            document.getElementById("rightMenuAssign").style.width = "0";
            $("button[name=assignTo]").removeClass("active");
        }
        document.getElementById("content").style.marginRight= "0";
    }