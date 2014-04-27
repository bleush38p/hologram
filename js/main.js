$(document).ready(function () {
    controlsVisible = true;
    $('#handle').click(function() {
        if (controlsVisible) {
            $('#controls').animate({
                bottom: '-150px'
            }, 500, 'swing');
            $('.tab-handle').css('border-bottom', '1px solid #bebebe');
            $('.tab-handle').css('border-top', '1px solid #393939');
        } else {
            $('#controls').animate({
                bottom: "-117px"
            }, 500, 'swing');
            $('.tab-handle').css('border-top', '1px solid #bebebe');
            $('.tab-handle').css('border-bottom', '1px solid #393939');
        }
        controlsVisible = !controlsVisible;
    });
    
    var isDown = false;
    var colorSelected = 'white';
    
    $('#colorSelector').change(function() {
        colorSelected = $(this).val();
        isDown = false;
    });
    
    $(document).mousedown(function() {isDown = true;}).mouseup(function() {isDown = false;});
    
    var myID;
    
    $('button, select').mouseenter(function() {
        myID = $(this).attr('id');
        $(this).css('backgroundImage', 'url(style/image/buttonactivetile.png)');
        $('#' + myID + 'pre').css('backgroundImage', 'url(style/image/buttonactiveleft.png)');
        $('#' + myID + 'post').css('backgroundImage', 'url(style/image/buttonactiveright.png)');
    }).mouseleave(function() {
        myID = $(this).attr('id');
        $(this).css('backgroundImage', 'url(style/image/buttontile.png)');
        $('#' + myID + 'pre').css('backgroundImage', 'url(style/image/buttonleft.png)');
        $('#' + myID + 'post').css('backgroundImage', 'url(style/image/buttonright.png)');
    });
    
    
    var basicEntryE = $('#basicentry');
    var fullText, lines, lineNo, line, charNo, char;
    
    function generateTextSet() {
        fullText = $.trim(basicEntryE.val());
        lines = fullText.split(/\n/);
//        console.log(lines);
        char = [];
        for (var lineNo in lines) {
            line = $.trim(lines[lineNo]);
            char[lineNo] = line.split('');
        }
//        console.log(char);
        
        $('.row').remove(); // First get rid the existing block, if any
        
        for (var lineNo in char) {
            createRow(lineNo);
            line = char[lineNo];
            for (var charNo in line) {
                createChar(lineNo, charNo, line[charNo]).mouseenter(function() {
                    $(this).css('textShadow', '0 0 3px #333');
                        if (isDown) {
                            $(this).removeClass('black darkBlue darkGreen darkAqua darkRed darkPurple gold gray darkGray blue green aqua red lightPurple yellow white')
                            .addClass(colorSelected);
                        }
                    }).mouseleave(function() {
                        $(this).css('textShadow', '');
                    }).mousedown(function() {
                        $(this).removeClass('black darkBlue darkGreen darkAqua darkRed darkPurple gold gray darkGray blue green aqua red lightPurple yellow white')
                        .addClass(colorSelected);
                    });
            }
        }
    }
    
    function createRow(n) {
        $('#edit-container').append('<div id="row' + n + '" class="row"></div>');
    }
    function createChar(r,n,c) {
        $('#row' + r).append('<span id="' + r + 'x' + n + '" class="char white">' + c + '</span>');
        return($('#' + r + 'x' + n));
    }
    var name;
    var colors = 'black darkBlue darkGreen darkAqua darkRed darkPurple gold gray darkGray blue green aqua red lightPurple yellow white'.split(/\s+/);
    var reps = '0123456789abcdef'.split('');
    function colorOf(name) {
        return(reps[colors.indexOf(name)]);
    }
    
    var editContainer, output, thisColor, thisClass, thisChar;
    
    function createOutput() {
        output = '';
        $('#edit-container').children().each(function (idx, val) {
            if (idx)
                output = output + '^nl';
            $(this).children().each(function(idx,val){
                $(this).removeClass('char');
                thisClass = $(this).attr('class');
                $(this).addClass('char');
                thisColor = colorOf(thisClass);
                thisChar = $(this).text();
                output = output + '^' + thisColor + thisChar
            });
        });
        $('#output').val(output);
    }
    
    $('#toColoring').click(function() {
        generateTextSet();
    });
    
    $('#toOutput').click(function() {
        createOutput();
    })
    
    $('#showHelp').click(function() {
        $('#controls').animate({
            bottom: "0px"
        }, 500, 'swing');
        $('.tab-handle').css('border-top', '1px solid #bebebe');
        $('.tab-handle').css('border-bottom', '1px solid #393939');
        controlsVisible = false;
    })
    
    
});