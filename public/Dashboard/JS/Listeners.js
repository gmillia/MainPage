/*
Illia Shershun

File contains key listeners
*/
document.addEventListener("keydown", keyboardListen);

function keyboardListen(evt)
{
	//Switch possession to T1
	if(evt.code == "Digit1")
	{
		$(".poss-team")[0].innerHTML = "T1"
	}
	if(evt.code == "Digit2")
	{
		$(".poss-team")[0].innerHTML = "T2"
	}
}