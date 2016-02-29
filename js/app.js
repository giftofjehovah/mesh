var n = 0;
var countNumber = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13];

$(function()
{
    console.log("Lets Go!");


    // createNumberHex("answer");
    hexagon.createDropEvent("hex","hex")
    addDrag(createNumberHex("answer"));
    hexagon.setOfNumbers(4);
    fillHexWithNumbers(4);
    $('#answer .middle').text(1);


})

var generateNumber = {
    two: generate2Number,
    three: generate3Number,
    four: generate4Number,
    five: generate5Number
}

var hexagon = {
    addDragEvent: addDrag,
    randomGird: randomGird,
    createDropEvent: createDrop,
    createHex: createNumberHex,
    setOfNumbers: setOfNumbers,
    fillHexWithNumbers: fillHexWithNumbers
}

function fillHexWithNumbers(set)
{
	var filled = document.getElementsByClassName("filled");
	var numbers;
	switch(set)
	{
		case 2:
		numbers = generateNumber.two(1)
		break;
		case 3:
		numbers = generateNumber.three(1);
		break;
		case 4:
		numbers = generateNumber.four(1);
		break;
		case 5:
		numbers = generateNumber.five(1);
		break;
	}
	numbers.forEach(function(number,i)
	{
		$('#n'+i+' .middle').text(number);	
	})

}

function resetArray()
{
    countNumber = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13];
    n = 0;
}

function setOfNumbers(set)
{
    for (i = 0; i < set; i++)
    {
        hexagon.addDragEvent(hexagon.createHex("numbers"));
    }
    resetArray();
}

function createDrop(className, scopeName)
{
    $("." + className).droppable(
    {
        scope: scopeName
    });
}

function addDrag(idName)
{
    var random;
    var top, left;
    if (idName == "answer")
    {
        random = 6;
    }
    else
    {
        random = hexagon.randomGird();
    }
    left = $("#" + random).position().left;
    if (random == 1 || random == 3 || random == 6 || random == 9 || random == 12)
    {
        top = $("#" + random).position().top + 53;
    }
    else
    {
        top = $("#" + random).position().top;
    }
    // console.log($("#" + idName));
    $("#" + idName).draggable(
    {
        containment: "main",
        snap: ".hex",
        snapTolerance: 50,
        snapMode: "inner",
        revert: "invalid",
        revertDuration: 100,
        scope: "hex",
        create: function(event, ui)
        {
            $('#' + idName).css(
            {
                position: 'absolute',
                top: top,
                left: left
            });
        }
    })
}

function randomGird()
{
    var index = Math.floor(Math.random() * countNumber.length);
    var gird = countNumber.splice(index, 1)[0];
    return gird;
}


function createNumberHex(type)
{
    var className;
    if (type == "answer")
    {
        className = "answer";
        id = "answer";
        var hex = $("<div>").addClass("hex").attr("id", className);
    }
    else
    {
    	var random = Math.floor(Math.random() * 2);
    	if(random==1)
    	{
    		className = "colorA";
    	}
    	else
    	{
    		className = "colorB";
    	}
        id = "n" + n;
        n++;
        var hex = $("<div>").addClass("hex").addClass(className).attr("id", id);
        // hex = hex.addClass("filled");
    }

    $("<div>").addClass("left").appendTo(hex);
    $("<div>").addClass("middle").appendTo(hex);
    $("<div>").addClass("right").appendTo(hex);
    hex.appendTo($('main'));
    
    return id;
}

function generate5Number(number)
{
    var firstSet = generate4Number(number);
    var large = 0;
    var index;
    firstSet.forEach(function(number, i)
    {
        if (number > large)
        {
            large = number;
            index = i;
        }
    })
    var secondSet = generate2Number(large);
    firstSet.splice(index, 1);
    firstSet.push(secondSet[0]);
    firstSet.push(secondSet[1]);

    return firstSet;
}

function generate4Number(number)
{
    var firstSet = generate2Number(number);
    var secondSet = generate2Number(number);

    firstSet.push(secondSet[0]);
    firstSet.push(secondSet[1]);

    return firstSet;
}

function generate3Number(number)
{
    var firstSet = generate2Number(number);
    var firstNo = firstSet[0];
    var secondNo = firstSet[1];
    var split;
    var thirdNo;

    if (firstNo > secondNo)
    {
        split = firstNo;
        thirdNo = secondNo;
    }
    else
    {
        split = secondNo;
        thirdNo = firstNo;
    }
    var newSet = generate2Number(split);
    newSet.push(thirdNo);
    return newSet;
}

function generate2Number(number)
{
    var firstNo = Math.floor(Math.random() * 9) + 1;
    var operator = Math.floor(Math.random() * 2);
    var secondNo;

    if (firstNo === number)
    {
        firstNo++
    }

    function addition()
    {
        return secondNo = number - firstNo;
    }

    function substraction()
    {
        return secondNo = firstNo - number;
    }
    if (operator === 0)
    {
        if (addition() < 1)
        {
            substraction()
        }
    }
    else if (operator === 1)
    {
        if (substraction() < 1)
        {
            addition();
        }
    }
    return [firstNo, secondNo];
}
