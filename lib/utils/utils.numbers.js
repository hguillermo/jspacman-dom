//
//
//    
function IsNumeric( sText )
{
    var ValidChars = "0123456789.";
    var isNumber=true;
    var Char;

    for (i = 0; i < sText.length && isNumber; i++) 
    { 
        Char = sText.charAt(i); 
        if (ValidChars.indexOf(Char) == -1) 
        {
            isNumber = false;
        }
    }
    
    return isNumber;
}