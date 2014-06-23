/**
 * jQuery Table of Contents generator for Jekyll
 * 
 * Verion: 1.0 (20/06/2014)
 * Author: heroandtn3
 * Requires: jQuery v1.7+
 * Copyright (c) 2014 heroandtn3
 * Licensed under the GNU General Public License
*/
(function($) {
    var indices = [0];
    var icon = '<i class="fa fa-link">&raquo;</i>';
    var $toc = $('#toc');

    var tocHTML = '<ul class="toc">';

    $("#post-content").find("h1, h2, h3, h4, h5, h6").each(function (i, el) {
        var $el, id;
        $el = $(el);
        id = $el.attr('id');

        var currIndex = parseInt($el.prop('tagName').substring(1)) - 1;
        
        if (indices.length > currIndex + 1) { // up level
            var d = indices.length - currIndex - 1;
            for (i = 0; i < d; i++) {
                tocHTML += '</ul>';
            }
            indices = indices.slice(0, currIndex + 1);
        } else if (indices.length < currIndex + 1) { //down level
            var d = currIndex + 1 - indices.length;
            for (i = 0; i < d; i++) {
                tocHTML += '<ul>';
            }
            indices[currIndex] = 0;
        }

        // count +1 at current level
        indices[currIndex]++;

        
        var size = indices.length;
        var sliceIndex = 0;
        for (i = 0; i < size; i++) {
            if (indices[i] != undefined && indices[i] != 0) {
                sliceIndex = i;
                break;
            }
        }
        indicesClone = indices.slice(sliceIndex, indices.length + 1)
        var size = indicesClone.length;
        for (i = 0; i < size; i++) {
            if (indicesClone[i] == undefined || indicesClone[i] == 0) {
                indicesClone[i] = 1;
            }
        }
        tocHTML += '<li><a href="%1">%2</a></li>'
                    .replace('%1', '#' + id + '-' + indicesClone.join('.'))
                    .replace('%2', indicesClone.join('.') + ' ' + $el.text());

        $el.attr('id', id + '-' + indicesClone.join('.'));

        $el.prepend($("<a />", {
            class: "header-link",
            href: '#' + id + '-' + indicesClone.join('.'),
        }).html(icon));
    });
    tocHTML += "</ul>";
    $toc.html(tocHTML);
})(jQuery);