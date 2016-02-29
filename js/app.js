$(function()
{
    console.log("Lets Go!");

    console.log(generate5Number(5));
    $(".drop").droppable(
    {
        accept: "#drag"
    });
    $("#drag").draggable(
    {
    	containment: ".drop",
        snap: true,
        snapTolerance: 5
    });
   
})

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
